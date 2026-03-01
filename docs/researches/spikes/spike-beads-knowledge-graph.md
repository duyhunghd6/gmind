# Spike: Beads Knowledge Graph Engine — Beads ID as Universal Graph Node

**Beads ID:** (pending)
**Tác giả:** Researcher Agent + Human (Steve)
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- Beads ID không chỉ là task ID — **nó là Universal Graph Node** kết nối mọi artifact trong hệ thống
- Mọi entity (PRD section, Plan element, Task, Commit, Chat log, Meeting note, Code file) đều có thể liên kết qua Beads ID
- Tag workaround (`--tag="satisfies:"`) và native dependency types đều **quá hẹp** — chỉ giải quyết 1 loại edge
- Cần một **Graph Query Engine** traverse across heterogeneous data sources (FrankenSQLite, Git, Zvec, File system, MCP Agent Mail)
- **Zvec** không chỉ index chat logs — mà index **mọi dữ liệu unstructured**: git commits, git logs, docs, chat sessions, meeting notes — bất cứ dữ liệu nào có thể bóc tách để lấy thông tin

## Research Sessions

### Session 1 (2026-03-01)

**Findings:**

#### A. SAFe 6.0 Enterprise Workflow — Full Lifecycle Traceability

Ví dụ thực tế: Stakeholder yêu cầu "Đổi icon của một nút bấm"

```
┌──────────────────────────────────────────────────────────────────────┐
│  PHASE 1: REQUEST → PMO TRIAGE                                       │
│                                                                      │
│  [User] Stakeholder: "Đổi icon nút bấm"                              │
│    └── Chat/Meeting log → indexed trong Zvec (mention Beads ID)      │
│                       │                                              │
│                       ▼                                              │
│  [PMO] PMO nhận yêu cầu → Kiểm tra:                                  │
│    ├── Xung đột modules? ← query graph: PRDs + Plans + Tasks         │
│    ├── Technical debt?   ← query graph: commits + code deps          │
│    └── Phê duyệt → Bổ sung PRD section (br-prd01-s4.2)               │
├──────────────────────────────────────────────────────────────────────┤
│  PHASE 2: PLAN → TASK DECOMPOSITION                                  │
│                                                                      │
│  [Plan] Plan element (br-plan-42) → satisfies: br-prd01-s4.2         │
│    └── Task decomposition:                                           │
│        └── [Task] Issue (bd-x1y2) → implements: br-plan-42           │
├──────────────────────────────────────────────────────────────────────┤
│  PHASE 3: DEV SUBAGENT EXECUTION                                     │
│                                                                      │
│  [Agent] Dev SubAgent nhận task bd-x1y2 → TRACE NGƯỢC:               │
│    ├── bd-x1y2 → br-plan-42 → br-prd01-s4.2   (scope Plan + PRD)     │
│    ├── br-prd01-s4.2 → chat/meeting logs       (yêu cầu gốc)         │
│    ├── br-plan-42 → related plans cùng module   (tránh xung đột)     │
│    ├── git log --grep='Beads-ID:' → commits     (code history)       │
│    └── related beads → existing code features   (đọc context)        │
│                       │                                              │
│                       ▼                                              │
│  Triển khai code → Viết Unit Tests → Commits (chờ review)            │
├──────────────────────────────────────────────────────────────────────┤
│  PHASE 4: RISK DISCOVERY (nếu có)                                    │
│                                                                      │
│  [RISK] Phát hiện rủi ro tiềm tàng?                                  │
│    └── YES: Kích hoạt buổi thảo luận với RTE Team                    │
│         ├── Discussion thread_id = bd-x1y2                           │
│         ├── RTE Team xem xét, thảo luận, phê duyệt phương án         │
│         ├── Nội dung phê duyệt → CƠ SỞ LIÊN QUAN để triển khai       │
│         └── Meeting/Chat logs → lưu trong Zvec với Beads ID          │
│              └── Trở thành context cho agent tiếp tục code           │
├──────────────────────────────────────────────────────────────────────┤
│  PHASE 5: REVIEW → CI/CD → CLOSE                                     │
│                                                                      │
│  Code review (Sub-agent Reviewer / Human)                            │
│    └── Đẩy PRs (mention Beads-ID: bd-x1y2)                           │
│         └── CI/CD (GitHub Actions: test + lint)                      │
│              ├── PASS → br close bd-x1y2                             │
│              └── FAIL → Trả về Dev SubAgent sửa lỗi                  │
└──────────────────────────────────────────────────────────────────────┘
```

**Điểm cốt lõi:** Mọi phase đều tạo ra artifacts được gắn/liên kết Beads ID → tất cả trở thành nodes trong Knowledge Graph.

---

#### B. Beads ID = Universal Graph Node — Mọi thứ là Node

| Node Type    | Ví dụ                    | Beads ID         | Lưu ở đâu         |
| ------------ | ------------------------ | ---------------- | ----------------- |
| PRD Section  | "Giao diện Quản trị"     | `br-prd01-s4.2`  | YAML front matter |
| Plan Element | "Redesign admin icons"   | `br-plan-42`     | Plan document     |
| Task/Issue   | "Change button icon"     | `bd-x1y2`        | FrankenSQLite     |
| Commit       | `feat: update icon`      | Git Trailer      | Git               |
| Chat Log     | Stakeholder request      | `thread_id`      | Zvec              |
| Meeting Note | Risk discussion with RTE | mention Beads ID | Zvec              |
| Code File    | `button.go`              | via `git log`    | Git + FastCode    |
| PR           | `#42 Change icon`        | mention in body  | GitHub            |
| CI Run       | Test results             | linked via PR    | GitHub Actions    |
| RTE Approval | Phương án được phê duyệt | discussion logs  | Zvec              |

---

#### C. Edge Types — Relationships giữa các Nodes

Edges được phát hiện **tự động** qua nhiều cơ chế:

| Edge Type       | Cơ chế phát hiện                                 | Ví dụ                      |
| --------------- | ------------------------------------------------ | -------------------------- |
| `satisfies`     | Tag / YAML / dependency                          | Plan → PRD Section         |
| `implements`    | Tag / dependency                                 | Task → Plan Element        |
| `committed-for` | Git Trailer `Beads-ID:`                          | Commit → Task              |
| `discussed-in`  | Zvec search: mention Beads ID trong chat/meeting | Chat Log → Task            |
| `approved-by`   | RTE meeting log kết quả phê duyệt                | Approval → Task            |
| `code-touches`  | FastCode: file ↔ commit ↔ Beads ID               | Code File → Task           |
| `pr-for`        | `gh pr list --search "br-xxx"`                   | PR → Task                  |
| `blocks`        | Beads dependency (native)                        | Task A → Task B            |
| `parent-child`  | Beads dependency (native)                        | Epic → Feature → Task      |
| `discovered-in` | Chat/meeting log reference                       | Risk → Task                |
| `context-from`  | Zvec: docs used as AI context                    | Research Ref → PRD Section |

**Phát hiện tự động** nghĩa là không cần agent gõ tag thủ công cho mọi edge — `gmind` tự scan:

- Git log → extract `Beads-ID:` trailers
- Zvec → search mentions of `br-xxx` hoặc `bd-xxx` trong mọi indexed content
- FrankenSQLite → query `dependencies` table
- YAML front matter → parse `beads-id:` fields
- GitHub → `gh pr list --search`, `gh run list`

---

#### D. Zvec — Universal Unstructured Data Indexer

> [RISK] **Mở rộng vai trò Zvec:** Zvec KHÔNG chỉ index chat logs. Zvec index **mọi dữ liệu unstructured** có thể bóc tách để lấy thông tin:

| Loại dữ liệu        | Source                     | Cách index vào Zvec                |
| ------------------- | -------------------------- | ---------------------------------- |
| Docs (PRDs, spikes) | `docs/*.md`                | `gmind reindex` → parse markdown   |
| Chat Sessions       | MCP Agent Mail logs        | Auto-index khi session kết thúc    |
| Meeting Notes       | Markdown meeting logs      | `gmind reindex` → parse markdown   |
| Git Commits         | `git log --format`         | Extract message + trailers → index |
| Git Diff Summaries  | `git diff --stat`          | Summarize changes → index          |
| PR Descriptions     | `gh pr view --json body`   | Extract body + comments → index    |
| CI/CD Logs          | `gh run view --log`        | Extract test results → index       |
| RTE Approvals       | Discussion resolution logs | Parse approval + rationale → index |
| Agent Decision Logs | Agent reasoning traces     | Auto-capture → index               |

**Key insight:** Zvec trở thành **"bộ nhớ tổng hợp"** — bất kỳ text nào mention Beads ID đều trở thành node trong Knowledge Graph, searchable qua semantic query.

**Index strategy:**

```
┌──────────────────────────────────────────────────────────────────────┐
│  Zvec Indexing Pipeline                                              │
│                                                                      │
│  Sources:                                                            │
│  ├── docs/*.md          ─┐                                           │
│  ├── chat sessions       │                                           │
│  ├── meeting notes       │     ┌──────────────────┐                  │
│  ├── git log messages    ├────>│ Beads ID Tagger  │──> Zvec Index    │
│  ├── PR descriptions     │     │ (auto-detect     │    (semantic +   │
│  ├── CI/CD summaries     │     │  br-xxx / bd-xxx │    beads-id tag) │
│  ├── RTE approvals       │     │  in every chunk) │                  │
│  └── agent traces       ─┘     └──────────────────┘                  │
│                                                                      │
│  Mỗi chunk trong Zvec được gắn metadata:                             │
│  {                                                                   │
│    "source": "chat-session-42",                                      │
│    "beads_ids": ["bd-x1y2", "br-plan-42"],                           │
│    "type": "meeting-note",                                           │
│    "timestamp": "2026-03-01T19:00:00Z"                               │
│  }                                                                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

#### E. Graph Query Engine — `gmind trace` hoạt động thế nào

Khi Dev SubAgent gọi `gmind trace bd-x1y2`, gmind sẽ query **song song** tất cả data sources:

```
┌──────────────────────────────────────────────────────────────────────┐
│  gmind trace bd-x1y2 --depth=full                                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─── Query FrankenSQLite ───┐                                       │
│  │ issues, dependencies,     │                                       │
│  │ issue_tags, labels        │                                       │
│  └────────────┬──────────────┘                                       │
│               │                                                      │
│  ┌─── Query Git ─────────────┐                                       │
│  │ git log --grep=           │                                       │
│  │ 'Beads-ID: bd-x1y2'       │       ┌────────────────────────┐      │
│  └────────────┬──────────────┘       │                        │      │
│               ├─────────────────────>│  Graph Assembler       │      │
│  ┌─── Query Zvec ────────────┐       │  (merge + deduplicate  │      │
│  │ semantic search:          │       │   nodes from all       │      │
│  │ "bd-x1y2" OR "br-plan-42" │       │   sources)             │      │
│  └────────────┬──────────────┘       │                        │      │
│               │                      └───────────┬────────────┘      │
│  ┌─── Query GitHub ──────────┐                   │                   │
│  │ gh pr list --search       │                   ▼                   │
│  │ gh run list               │       ┌────────────────────────┐      │
│  └────────────┘              │       │  Connected Subgraph    │      │
│                              │       │  (all nodes + edges    │      │
│  ┌─── Parse YAML ───────────┐│       │   related to bd-x1y2)  │      │
│  │ PRD front matter         ││       └────────────────────────┘      │
│  │ beads-id: br-prd01-s4.2  ││                                       │
│  └───────────────────────────┘                                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Output mẫu:**

```
TRACE: bd-x1y2 "Change button icon"
│
├── implements: br-plan-42 "Redesign admin icons"
│   └── satisfies: br-prd01-s4.2 "Giao diện Quản trị"
│       └── context: chat-session-23 "Stakeholder yêu cầu đổi icon..." (Zvec)
│
├── commits (3):
│   ├── a1b2c3d "feat(ui): replace icon set" (2026-03-01)
│   ├── e4f5g6h "test(ui): add icon render tests" (2026-03-01)
│   └── i7j8k9l "fix(ui): icon alignment on mobile" (2026-03-02)
│
├── discussions (1):
│   └── thread-42 "RTE review: icon set compatibility risk"
│       └── approval: "RTE phê duyệt: dùng Material Icons v3" (Zvec)
│
├── PRs (1):
│   └── #42 "feat: redesign admin button icons" [merged]
│       └── CI: ✅ all tests passed
│
├── related tasks (cùng parent br-plan-42):
│   ├── bd-a1b2 "Update icon asset pipeline" [closed]
│   └── bd-c3d4 "Migrate legacy icons" [open]
│
└── code files touched:
    ├── ui/components/button.go (3 commits)
    ├── ui/assets/icons/ (2 commits)
    └── ui/components/button_test.go (1 commit)
```

---

#### F. So sánh: Tag Workaround vs Native Deps vs Knowledge Graph

| Đặc điểm                  | Tag Workaround      | Native Deps (beads_rust) | Knowledge Graph (đề xuất) |
| ------------------------- | ------------------- | ------------------------ | ------------------------- |
| Referential integrity     | ❌ No               | ✅ FK constraint         | ✅ Multi-source validate  |
| Graph traversal           | ❌ String parsing   | ✅ SQL JOIN              | ✅ Cross-source traverse  |
| Edge discovery            | ❌ Manual tags only | ❌ Manual deps only      | ✅ Auto-detect mentions   |
| Chat/Meeting logs visible | ❌ Not linked       | ❌ Not linked            | ✅ Zvec semantic search   |
| Git history visible       | ❌ Tách biệt        | ❌ Tách biệt             | ✅ Git trailer scan       |
| PR/CI status visible      | ❌ Tách biệt        | ❌ Tách biệt             | ✅ gh CLI integration     |
| Code file tracing         | ❌ Manual           | ❌ Manual                | ✅ FastCode + git log     |
| Cần sửa beads_rust?       | ❌ Không            | ✅ Cần sửa               | ❌ Không (gmind handles)  |
| Nơi logic nằm             | Agent skill rules   | beads_rust binary        | **gmind CLI** (Go)        |
| Data model                | Single table (tags) | Single table (deps)      | **Multi-source graph**    |

---

#### G. Kiến trúc đề xuất — gmind là Graph Query Engine

```
┌──────────────────────────────────────────────────────────────────────┐
│                         gmind CLI (Go)                               │
│                    "Context API Gateway"                             │
│                                                                      │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌──────────┐  │
│  │ gmind trace   │ │ gmind         │ │ gmind impact  │ │ gmind    │  │
│  │ <beads-id>    │ │ coverage      │ │ <section-id>  │ │ gaps     │  │
│  └───────┬───────┘ └───────┬───────┘ └───────┬───────┘ └────┬─────┘  │
│          └─────────────────┼─────────────────┼──────────────┘        │
│                            ▼                                         │
│                ┌───────────────────────┐                             │
│                │   Graph Assembler     │                             │
│                │   (query-time build)  │                             │
│                └───────────┬───────────┘                             │
│          ┌─────────────────┼─────────────────┐                       │
│          ▼                 ▼                  ▼                      │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────────┐        │
│  │ FrankenSQLite  │ │ Git + GitHub   │ │ Zvec (Universal    │        │
│  │ (tasks, deps)  │ │ (commits,      │ │  Unstructured      │        │
│  │                │ │  PRs, CI)      │ │  Data Indexer)     │        │
│  └────────────────┘ └────────────────┘ └────────────────────┘        │
│                                                                      │
│  + YAML Parser (PRD front matter) + FastCode (code intelligence)     │
└──────────────────────────────────────────────────────────────────────┘
```

**gmind KHÔNG lưu graph riêng** — nó **build graph at query time** bằng cách query song song tất cả data sources. Lý do:

- Data đã tồn tại ở 5+ sources → duplicate = sync nightmare
- Query-time build đảm bảo always-fresh data
- Performance acceptable vì mọi source đều local (FrankenSQLite in-process, git local, Zvec in-process)

---

#### H. Implementation Phases

| Phase | Nội dung                                        | Dependencies       |
| ----- | ----------------------------------------------- | ------------------ |
| 1     | Graph Assembler core: query FrankenSQLite + Git | gmind CLI exists   |
| 2     | Zvec integration: index git commits, chat, docs | Zvec indexer ready |
| 3     | `gmind trace` + `gmind coverage` commands       | Phase 1 + 2        |
| 4     | GitHub integration: PRs, CI via `gh` CLI        | Phase 1            |
| 5     | `gmind impact` + `gmind gaps` commands          | Phase 3            |
| 6     | Web UI: RTM dashboard, coverage heatmap         | Phase 3 + 4 + 5    |

---

## Recommendation

### Kết luận: **gmind = Graph Query Engine, Beads ID = Universal Graph Node**

1. **Không sửa beads_rust** — giữ nguyên tag workaround cho `satisfies`/`implements`. Beads_rust là task tracker, không cần biết về traceability graph
2. **gmind xây Graph Assembler** — query-time graph build từ 5+ data sources
3. **Zvec mở rộng** thành Universal Unstructured Data Indexer — index mọi thứ có text: git commits, PR descriptions, chat sessions, meeting notes, CI logs
4. **Auto-detect edges** — scan Beads ID mentions trong mọi indexed content thay vì bắt agent gõ tag thủ công
5. **gmind trace = killer feature** — cho Dev SubAgent full context bằng 1 lệnh duy nhất

### Impact lên PRDs hiện tại

| PRD    | Section cần update    | Nội dung mới                                                          |
| ------ | --------------------- | --------------------------------------------------------------------- |
| PRD-01 | §4.4 Document Graph   | Mở rộng: Graph Assembler query-time build, multi-source traversal     |
| PRD-02 | §1 Storage Layer      | Zvec: mở rộng vai trò thành Universal Unstructured Data Indexer       |
| PRD-02 | §3 Universal Tracking | Beads ID = Universal Graph Node, auto-detect edges                    |
| PRD-03 | §1 gmind CLI          | Graph Assembler architecture, query-time build                        |
| PRD-03 | §2 Agent Workflow     | Dev SubAgent workflow: trace → code → test → review → PR → CI → close |

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

1. **Zvec Indexer Pipeline:** Chi tiết cách index git commits, PR descriptions, CI logs vào Zvec — chunk size, metadata schema, auto-detect Beads IDs
2. **Graph Assembler Performance:** Benchmark query-time graph build với 1000+ Beads IDs — có cần cache layer không?
3. **RTE Approval Workflow:** Chi tiết quy trình kích hoạt thảo luận RTE, lưu approval, biến approval thành execution context
4. **Web UI RTM Dashboard:** Wireframe cho Requirements Traceability Matrix visualization
5. **Plan Document Format:** Chuẩn hóa format cho Plan documents — structured markdown, YAML markers, hay Beads issues?
