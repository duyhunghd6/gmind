# Spike: Zvec Indexer Pipeline — Universal Unstructured Data Indexer

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Parent Spike:** spike-beads-knowledge-graph.md (Open Item #1)

## Hypothesis

- Zvec có thể mở rộng từ "Docs & Chat History" sang **Universal Unstructured Data Indexer** — index bất kỳ text nào có chứa Beads ID
- Cần xác định chunk size, metadata schema, và cơ chế auto-detect Beads IDs cho từng loại data source
- Pipeline cần tự động và incremental — không re-index toàn bộ mỗi lần có thay đổi

## Research Sessions

### Session 1 (2026-03-02)

**Findings:**

#### A. Data Sources và Extraction Strategy

| Source              | Extraction Command                           | Output Format  | Update Frequency       |
| ------------------- | -------------------------------------------- | -------------- | ---------------------- |
| Docs (\*.md)        | `find docs/ -name '*.md'`                    | Markdown text  | On `gmind reindex`     |
| Chat Sessions       | MCP Agent Mail export                        | JSON → text    | On session end         |
| Meeting Notes       | `find meetings/ -name '*.md'`                | Markdown text  | On `gmind reindex`     |
| Git Commits         | `git log --format='%H\|%s\|%b\|%(trailers)'` | Pipe-delimited | On `git pull` / commit |
| Git Diff Summaries  | `git diff --stat HEAD~N`                     | Text summary   | On commit              |
| PR Descriptions     | `gh pr view <N> --json body,comments`        | JSON → text    | On `gmind github sync` |
| CI/CD Logs          | `gh run view <id> --log`                     | Plain text     | On `gmind github sync` |
| RTE Approvals       | Discussion thread export                     | Markdown text  | On resolution          |
| Agent Decision Logs | Agent trace files                            | JSON → text    | On agent session end   |

#### B. Chunk Strategy — Adaptive Chunking

Không phải mọi data source dùng cùng chunk size. Strategy:

| Data Type           | Chunk Size          | Overlap   | Lý do                                            |
| ------------------- | ------------------- | --------- | ------------------------------------------------ |
| Markdown docs       | 512 tokens          | 64 tokens | Standard RAG chunking, context preservation      |
| Git commit messages | 1 commit = 1 chunk  | 0         | Mỗi commit là 1 đơn vị logic, không nên cắt      |
| PR descriptions     | 512 tokens          | 64 tokens | Long PR descriptions cần chia nhỏ                |
| PR comments         | 1 comment = 1 chunk | 0         | Mỗi comment là 1 đơn vị context                  |
| Chat sessions       | 1 message = 1 chunk | 0         | Mỗi message là 1 turn, context từ thread_id      |
| CI/CD logs          | 256 tokens          | 0         | Logs dài nhưng dense, chunk nhỏ để target search |
| Agent traces        | 1 step = 1 chunk    | 0         | Mỗi reasoning step là 1 đơn vị                   |

**Principle:** Prefer **semantic boundaries** (commit, message, comment) over fixed-size chunking khi data tự nhiên đã có logical units.

#### C. Metadata Schema cho mỗi Chunk

Mỗi chunk khi index vào Zvec sẽ có metadata:

```json
{
  "chunk_id": "zvec-<hash>",
  "source_type": "git-commit | pr-description | chat-message | markdown-doc | ci-log | rte-approval | agent-trace",
  "source_ref": "commit:a1b2c3d | pr:42 | chat:session-23:msg-5 | file:docs/PRD-01.md:L45-L80",
  "beads_ids": ["bd-x1y2", "br-plan-42"],
  "timestamp": "2026-03-01T19:00:00Z",
  "author": "steve | agent:dev-subagent | github:actions",
  "content_preview": "First 100 chars..."
}
```

**Trường bắt buộc:**

- `source_type` — để filter query (ví dụ: "chỉ tìm trong git commits")
- `source_ref` — để truy nguyên về original data
- `beads_ids` — để Graph Assembler liên kết
- `timestamp` — để sắp xếp theo thời gian

#### D. Auto-detect Beads IDs trong Content

Beads ID có 2 format cần detect:

| Pattern          | Regex                                  | Ví dụ               |
| ---------------- | -------------------------------------- | ------------------- |
| Beads Rust ID    | `br-[a-zA-Z0-9-]+`                     | `br-prd01-s4.2`     |
| Beads Issue ID   | `bd-[a-zA-Z0-9]+`                      | `bd-x1y2`           |
| Git Trailer      | `Beads-ID: <id>`                       | `Beads-ID: bd-x1y2` |
| Tag reference    | `--tag="(satisfies\|implements):<id>"` | In commands         |
| Markdown mention | Inline text referencing IDs            | "See br-plan-42"    |

**Implementation:**

```
┌──────────────────────────────────────────────────────────────┐
│  Beads ID Tagger — Auto-detect Pipeline                      │
│                                                              │
│  Input: raw text chunk                                       │
│    │                                                         │
│    ├── Step 1: Regex scan for br-xxx / bd-xxx patterns       │
│    │   └── Extract all matches → beads_ids[]                 │
│    │                                                         │
│    ├── Step 2: Git trailer parse (if source_type=git-commit) │
│    │   └── Parse "Beads-ID:" trailer → add to beads_ids[]    │
│    │                                                         │
│    ├── Step 3: Tag reference parse (if source_type=command)  │
│    │   └── Parse --tag="satisfies:xxx" → add to beads_ids[]  │
│    │                                                         │
│    └── Step 4: Deduplicate beads_ids[]                       │
│                                                              │
│  Output: chunk + metadata{beads_ids, source_type, ...}       │
└──────────────────────────────────────────────────────────────┘
```

#### E. Incremental Index Strategy

Full reindex toàn bộ data trên mỗi thay đổi là không cần thiết. Strategy:

| Trigger                    | Action                             | Scope                   |
| -------------------------- | ---------------------------------- | ----------------------- |
| `gmind reindex`            | Re-scan all docs/\*.md             | Markdown files only     |
| Git commit (post-hook)     | Index new commit message + diff    | 1 commit                |
| `gmind github sync`        | Index new/updated PRs + CI logs    | Changed PRs only (ETag) |
| Agent session end          | Index agent traces + chat messages | Current session         |
| Manual `gmind index <src>` | Force re-index specific source     | Specified source        |

**Zvec internal tracking:**

Zvec lưu 1 table `index_watermarks` để tracking đã index đến đâu:

```sql
CREATE TABLE index_watermarks (
    source_type TEXT PRIMARY KEY,
    last_indexed TEXT,  -- timestamp hoặc commit hash
    chunk_count INTEGER
);
-- Ví dụ:
-- ('git-commit', 'a1b2c3d', 342)
-- ('pr-description', '2026-03-01T19:00:00Z', 28)
```

#### F. gmind reindex — Orchestrator Flow

```
┌──────────────────────────────────────────────────────────────┐
│  gmind reindex [--source=<type>] [--force]                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Đọc sources (docs/*.md, meetings/*.md)                   │
│     ├── Scan modified files since last watermark             │
│     ├── Chunk: 512 tokens, 64 overlap                        │
│     ├── Tag: auto-detect Beads IDs per chunk                 │
│     └── Upsert into Zvec                                     │
│                                                              │
│  2. Git commits                                              │
│     ├── git log since last indexed commit hash               │
│     ├── Chunk: 1 commit = 1 chunk                            │
│     ├── Tag: parse trailers + scan body                      │
│     └── Upsert into Zvec                                     │
│                                                              │
│  3. GitHub data (PRs, CI)                                    │
│     ├── gh pr list --state=all --json (ETag conditional)     │
│     ├── Chunk: PR body=512tok, comments=1each                │
│     ├── Tag: auto-detect Beads IDs                           │
│     └── Upsert into Zvec                                     │
│                                                              │
│  4. Agent traces + chat sessions                             │
│     ├── Scan new session files since watermark               │
│     ├── Chunk: 1 message/step = 1 chunk                      │
│     ├── Tag: extract thread_id + Beads IDs                   │
│     └── Upsert into Zvec                                     │
│                                                              │
│  5. Update index_watermarks table                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### G. Query Interface cho Graph Assembler

Graph Assembler cần query Zvec theo 2 cách:

| Method                        | Use Case                           | Ví dụ                               |
| ----------------------------- | ---------------------------------- | ----------------------------------- |
| `zvec.search_by_beads_id(id)` | Tìm tất cả chunks mention beads ID | "Tìm mọi context liên quan bd-x1y2" |
| `zvec.semantic_search(query)` | Tìm theo nội dung semantic         | "Authentication flow explanation"   |

**API (Go interface):**

```go
type ZvecSearchResult struct {
    ChunkID     string   `json:"chunk_id"`
    SourceType  string   `json:"source_type"`
    SourceRef   string   `json:"source_ref"`
    BeadsIDs    []string `json:"beads_ids"`
    Content     string   `json:"content"`
    Score       float64  `json:"score"`
    Timestamp   string   `json:"timestamp"`
}

// Search by Beads ID — exact match on metadata
func (z *Zvec) SearchByBeadsID(id string) ([]ZvecSearchResult, error)

// Semantic search — vector similarity
func (z *Zvec) SemanticSearch(query string, limit int) ([]ZvecSearchResult, error)
```

**Open Items:**

- (None — research complete)

## Recommendation

1. **Adaptive chunking**: Semantic boundaries (1 commit = 1 chunk, 1 message = 1 chunk) ưu tiên hơn fixed-size chunking
2. **Metadata schema**: 4 trường bắt buộc (source_type, source_ref, beads_ids, timestamp) + optional fields
3. **Auto-detect pipeline**: 4-step regex-based Beads ID detection — không cần LLM, fast & deterministic
4. **Incremental index**: Watermark-based tracking, chỉ index data mới — không full reindex
5. **`gmind reindex`**: Orchestrator command, xử lý tất cả source types, gọi nội bộ

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

- Không có spike mới — findings đủ để implement
