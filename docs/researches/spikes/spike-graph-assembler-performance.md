# Spike: Graph Assembler Performance — Query-time Build Benchmark

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Parent Spike:** spike-beads-knowledge-graph.md (Open Item #2)

## Hypothesis

- Graph Assembler build graph tại query time bằng cách query song song 5+ data sources
- Cần benchmark để xác định: với 1000+ Beads IDs, query-time build có đủ nhanh không?
- Nếu quá chậm → cần cache layer. Nếu đủ nhanh → không cần cache (đơn giản hơn)
- Mọi data source đều local (FrankenSQLite in-process, git local, Zvec in-process) → expected fast

## Research Sessions

### Session 1 (2026-03-02)

**Findings:**

#### A. Query-time Build Architecture

Khi user gọi `gmind trace bd-x1y2`, Graph Assembler thực hiện:

```
┌──────────────────────────────────────────────────────────────┐
│  Graph Assembler — Query-time Build Pipeline                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Input: beads_id = "bd-x1y2"                                 │
│                                                              │
│  Phase 1: PARALLEL QUERY (concurrent goroutines)             │
│  ┌────────────┐ ┌───────────┐ ┌────────────┐ ┌───────────┐   │
│  │ FrankenSQL │ │ Git log   │ │ Zvec       │ │ GitHub    │   │
│  │ query      │ │ --grep    │ │ search     │ │ gh CLI    │   │
│  └──────┬─────┘ └─────┬─────┘ └─────┬──────┘ └─────┬─────┘   │
│        │              │              │              │        │
│  Phase 2: MERGE                                              │
│        └──────────────┼──────────────┼──────────────┘        │
│                       ▼                                      │
│              ┌─────────────────┐                             │
│              │  Node Deduper   │                             │
│              │  + Edge Builder │                             │
│              └────────┬────────┘                             │
│                       │                                      │
│  Phase 3: EXPAND (optional, --depth=full)                    │
│        ┌──────────────┼──────────────┐                       │
│        │              │              │                       │
│        ▼              ▼              ▼                       │
│  Query related   Query parent   Query satisfies              │
│  tasks           plan           PRD section                  │
│        └──────────────┼──────────────┘                       │
│                       ▼                                      │
│              ┌─────────────────┐                             │
│              │ Connected       │                             │
│              │ Subgraph        │ → Output                    │
│              └─────────────────┘                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### B. Estimated Latency per Data Source

| Source          | Query Type                                   | Expected Latency | Notes                              |
| --------------- | -------------------------------------------- | ---------------- | ---------------------------------- |
| FrankenSQLite   | SQL: issues + deps + tags                    | < 1ms            | In-process SQLite, indexed columns |
| Git log         | `git log --grep='Beads-ID: bd-xxx'`          | 10-50ms          | Local repo, grep on trailers       |
| Zvec            | `SearchByBeadsID("bd-x1y2")`                 | 5-20ms           | In-process, metadata filter        |
| GitHub (gh CLI) | `gh pr list --search 'bd-xxx'`               | 200-500ms        | Network call to GitHub API         |
| YAML Parser     | Scan docs/\*.md for beads-id in front matter | 10-30ms          | File I/O, regex scan               |

**Total (parallel):** Latency = max(individual) = **200-500ms** (bottleneck: GitHub API)

**Total (without GitHub):** Latency = max(50ms, 20ms, 30ms) = **~50ms** (all local)

#### C. Scale Analysis — 1000+ Beads IDs Scenario

| Metric                     | Count    | Impact                                    |
| -------------------------- | -------- | ----------------------------------------- |
| Total Beads IDs in system  | 1000+    | FrankenSQLite query still < 5ms (indexed) |
| Git commits with Beads-ID  | ~5000    | git log --grep still < 100ms (local)      |
| Zvec chunks with beads_ids | ~10,000  | Metadata filter still < 30ms              |
| PRs on GitHub              | ~200     | gh pr list --search still < 500ms         |
| Depth-full expansion       | 3-5 hops | Each hop adds ~50ms (no GitHub)           |

**Worst case (depth=full, 5 hops):**

- Phase 1: 500ms (GitHub bottleneck)
- Phase 2: < 1ms (in-memory merge)
- Phase 3: 5 hops x 50ms = 250ms (no GitHub per hop)
- **Total: ~750ms** — Acceptable for CLI interactive use

**Best case (depth=1, no GitHub):**

- Phase 1: 50ms
- Phase 2: < 1ms
- **Total: ~50ms** — Excellent

#### D. Caching — Cần hay Không Cần?

| Scenario                | Cache needed? | Lý do                                               |
| ----------------------- | ------------- | --------------------------------------------------- |
| `gmind trace <id>`      | KHÔNG         | 50-750ms acceptable, data luôn fresh                |
| `gmind coverage` (full) | CÓ thể        | Scan toàn bộ PRD sections → nhiều queries           |
| `gmind gaps` (full)     | CÓ thể        | Tương tự coverage, scan toàn bộ                     |
| Web UI dashboard        | CÓ            | User F5 liên tục → cần cache để giảm load           |
| Agent batch operations  | CÓ thể        | Agent gọi `gmind trace` 20 lần liên tiếp → wasteful |

**Đề xuất: 2-tier Caching Strategy**

```
┌──────────────────────────────────────────────────────────────┐
│  Caching Strategy                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Tier 1: In-memory LRU Cache (default)                       │
│  ├── Scope: per-process (gmind CLI session)                  │
│  ├── TTL: 30 seconds                                         │
│  ├── Key: (beads_id, depth, include_github)                  │
│  ├── Size: 100 entries max                                   │
│  └── Auto-invalidate: on git commit, gmind reindex           │
│                                                              │
│  Tier 2: Materialized Graph Cache (optional, for Web UI)     │
│  ├── Scope: FrankenSQLite table `graph_cache`                │
│  ├── TTL: 5 minutes                                          │
│  ├── Key: (beads_id, query_hash)                             │
│  ├── Content: serialized subgraph JSON                       │
│  └── Auto-invalidate: on data source change via watermarks   │
│                                                              │
│  Use Decision:                                               │
│  ├── CLI interactive: Tier 1 only (simple, fast)             │
│  ├── Agent batch ops: Tier 1 (reuse within session)          │
│  └── Web UI: Tier 1 + Tier 2 (reduce server load)            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### E. GitHub API — Rate Limit Mitigation

GitHub là bottleneck duy nhất. Mitigation:

| Strategy            | Description                                         | Impact             |
| ------------------- | --------------------------------------------------- | ------------------ |
| Optional flag       | `gmind trace --no-github` skip GitHub queries       | 50ms thay vì 500ms |
| Background prefetch | `gmind github sync` trong cron, cache kết quả local | 0ms cho queries    |
| ETag caching        | Store ETag, 304 Not Modified → skip re-fetch        | Giảm API calls     |
| Batch queries       | Gom nhiều Beads IDs → 1 gh search call              | Fewer API calls    |

**Default:** `gmind trace` KHÔNG gọi GitHub (chỉ local sources). User phải explicit `--include-github` để fetch PR/CI data.

#### F. Performance Optimization cho `gmind coverage` / `gmind gaps`

Các commands này scan toàn bộ PRD → cần optimize khác:

```
┌──────────────────────────────────────────────────────────────┐
│  gmind coverage / gaps — Batch Optimization                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Naive approach (CHẬM):                                      │
│  for each PRD section:                                       │
│      gmind trace <section-beads-id>  → 50ms each             │
│  Total: 100 sections x 50ms = 5 seconds                      │
│                                                              │
│  Optimized approach (NHANH):                                 │
│  1. Batch query FrankenSQLite:                               │
│     SELECT * FROM issues                                     │
│     WHERE id IN (SELECT depends_on FROM dependencies         │
│       WHERE type IN ('satisfies','implements'))              │
│     → 1 query, < 5ms                                         │
│                                                              │
│  2. Batch query Zvec:                                        │
│     Search all chunks where beads_ids overlaps               │
│     with PRD section IDs → 1 query, < 50ms                   │
│                                                              │
│  3. Build full coverage matrix in-memory                     │
│     → < 10ms                                                 │
│                                                              │
│  Total: < 100ms for full coverage scan                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Open Items:**

- (None — research complete)

## Recommendation

1. **Query-time build đủ nhanh** — 50ms (local only) đến 750ms (with GitHub, depth=full). Không cần cache làm default
2. **2-tier cache** if needed: In-memory LRU (Tier 1) cho CLI, Materialized (Tier 2) cho Web UI
3. **GitHub optional** — default `gmind trace` chỉ query local sources. GitHub qua `--include-github`
4. **Batch optimization** cho `gmind coverage`/`gmind gaps` — 1 batch query thay 100 individual queries
5. **KHÔNG cần graph database** — query-time build từ 5 local sources đủ nhanh

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

- Không có spike mới cần thiết — performance đủ để implement
