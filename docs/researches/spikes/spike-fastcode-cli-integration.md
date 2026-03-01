# Spike: FastCode CLI Integration — Thay thế Zvec cho Code Intelligence

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- FastCode CLI (`fastcode`) đã hoàn thiện, tích hợp sẵn AST parsing (tree-sitter), graph analysis, BM25 keyword search, vector embeddings, và LLM-powered iterative retrieval
- Zvec **không còn cần** cho việc parsing AST và lưu code graph — FastCode đã xử lý toàn bộ
- Zvec chỉ còn vai trò **truy vấn docs** (markdown files, chat history)
- `fastcode query --repo . "<message>"` thay thế `gmind search` cho code intelligence

## Research Sessions

### Session 1 (2026-02-28)

**Findings:**

#### A. FastCode CLI — Kiến trúc nội bộ

FastCode v0.1.0-dev (Go binary) bao gồm 3 commands chính:

| Command              | Mục đích                                                  |
| -------------------- | --------------------------------------------------------- |
| `fastcode index .`   | Parse, analyze, index repository (AST + BM25 + embedding) |
| `fastcode query`     | Hỏi đáp về codebase đã indexed (LLM iterative retrieval)  |
| `fastcode serve-mcp` | MCP server cho IDE integration                            |

Nội bộ FastCode đã tích hợp đầy đủ pipeline:

```
┌─────────────┐     ┌───────────────────┐     ┌───────────┐
│ Source Code │────>│ Tree-sitter Parser│────>│ AST Nodes │
└─────────────┘     └───────────────────┘     └─────┬─────┘
                                                    │
                                                    ▼
                                        ┌───────────────────────┐
                                        │ Definition Extractor  │
                                        │ Call Extractor        │
                                        │ Import Extractor      │
                                        └───────────┬───────────┘
                                                    │
                                                    ▼
                                        ┌───────────────────────┐
                                        │ Graph Builder         │
                                        │ (dependency graph)    │
                                        └───────────┬───────────┘
                                                    │
                                                    ▼
                                        ┌───────────────────────┐
                                        │ Global Index          │
                                        │ (BM25 + opt. Vector)  │
                                        └───────────┬───────────┘
                                                    │
                                                    ▼
                                        ┌───────────────────────┐
                                        │ Iterative Agent       │
                                        │ (LLM multi-round)     │
                                        └───────────┬───────────┘
                                                    │
                                                    ▼
                                        ┌───────────────────────┐
                                        │ Answer Generator      │
                                        └───────────┴───────────┘
                                                    │
                                                    ▼
                                             Final Response
```

**Key modules** (từ reference Python source + Go re-implementation):

- `tree_sitter_parser` — AST parsing trực tiếp
- `graph_builder` — Dependency graph từ code references
- `retriever` — BM25 + vector + graph-based hybrid retrieval
- `iterative_agent` — LLM-driven multi-round tool-calling retrieval
- `answer_generator` — Tổng hợp answer từ retrieved context

#### B. So sánh: Flow cũ (PRDs hiện tại) vs Flow mới (FastCode)

| Chức năng                | Flow cũ (PRDs)                          | Flow mới (FastCode)                           |
| ------------------------ | --------------------------------------- | --------------------------------------------- |
| AST parsing              | Tree-sitter → embed vào Zvec            | FastCode nội bộ (tree-sitter built-in)        |
| Code Graph               | Graph Nodes → Zvec (Hybrid Search)      | FastCode `graph_builder` → internal index     |
| Code search query        | `gmind search <query>` → route tới Zvec | `fastcode query --repo . "<query>"`           |
| BM25 keyword search      | Không có (chỉ vector search)            | ✅ Built-in, default mode (`--no-embeddings`) |
| Vector embeddings        | Zvec (C++ in-process)                   | FastCode optional (`--embedding-model`)       |
| LLM iterative retrieval  | Không có                                | ✅ Multi-round tool-calling agent             |
| Docs/Chat history search | Zvec                                    | Zvec (KHÔNG đổi)                              |
| MCP integration          | Không có                                | `fastcode serve-mcp` port 9999                |

#### C. Tác động lên vai trò Zvec

**Trước (PRDs hiện tại):**

```
┌──────────────────────────────────────────────────────────┐
│  Zvec = Code AST Nodes + Docs + Chat History             │
│  (mọi thứ semantic)                                      │
└──────────────────────────────────────────────────────────┘
```

**Sau (với FastCode):**

```
┌──────────────────────────────────────────────────────────┐
│  Zvec = Docs + Chat History ONLY                         │
│  (semantic search cho docs)                              │
├──────────────────────────────────────────────────────────┤
│  FastCode = Code Intelligence                            │
│  (AST + Graph + BM25/Vector + LLM)                       │
└──────────────────────────────────────────────────────────┘
```

**Zvec KHÔNG còn:**

- ❌ Nhận AST nodes từ Tree-sitter
- ❌ Lưu trữ Code Graph Nodes
- ❌ Phục vụ code search queries

**Zvec VẪN làm:**

- ✅ Index `docs/*.md` (PRDs, spikes, architecture, etc.)
- ✅ Lưu Chat History / Agent logs
- ✅ Phục vụ `gmind search <query>` cho docs (không phải code)

#### D. Tác động lên `gmind` CLI — Thiết kế `gmind search-codebase`

> ✅ **Human Decision (2026-02-28):** `gmind search-codebase` là unified command, tự điều phối FastCode bên trong. Agent KHÔNG gọi `fastcode` trực tiếp.

**Thiết kế:**

| Command mới                     | Mô tả                                             |
| ------------------------------- | ------------------------------------------------- |
| `gmind search-codebase <query>` | **Orchestrator** — tự gọi fastcode index + query  |
| `gmind search <query>`          | Giữ nguyên — chỉ query Zvec cho docs/chat history |
| `gmind context <id> --depth`    | Giữ nguyên — FrankenSQLite + Zvec                 |
| `gmind github <subcmd>`         | Không thay đổi                                    |

**Flow nội bộ của `gmind search-codebase`:**

```
┌───────────────────────────────────────────────────────────────┐
│  gmind search-codebase "how does auth work?"                  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Kiểm tra fastcode binary (exec.LookPath)                  │
│     └─ Nếu không → lỗi: "fastcode not found"                  │
│                                                               │
│  2. Kiểm tra index cache (~/.fastcode/cache/)                 │
│     ├─ Chưa có → exec: fastcode index --no-embeddings .       │
│     └─ Có rồi → skip (hoặc --force nếu yêu cầu)               │
│                                                               │
│  3. Exec: fastcode query --repo . "<query>"                   │
│     └─ Trả kết quả cho agent/caller                           │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

**Lợi ích:**

1. **Agent đơn giản hóa:** Chỉ cần gọi 1 command `gmind search-codebase`, không cần biết fastcode tồn tại
2. **Tự quản lý lifecycle:** gmind tự kiểm tra + tự index khi cần → agent skill đơn giản hơn
3. **Single entry point:** Mọi codebase intelligence đều qua `gmind` → nhất quán API surface
4. **FastCode = implementation detail:** Có thể thay thế FastCode bằng tool khác trong tương lai mà không đổi agent workflow

**Tham số mở rộng (optional):**

```
gmind search-codebase <query> [flags]
  --force-reindex    Force re-index (bỏ qua cache)
  --json             Output JSON format
  --debug            Enable debug logging (forward tới fastcode --debug)
```

#### E. FastCode flags được gmind sử dụng nội bộ

| Flag              | Default             | Mô tả                                       |
| ----------------- | ------------------- | ------------------------------------------- |
| `--no-embeddings` | `true`              | BM25 only, nhanh, không cần embedding model |
| `--debug`         | `false`             | Trace LLM iterative retrieval steps         |
| `--repo`          | `.` (implicit)      | Path tới repository                         |
| `--json`          | forward từ gmind    | Output JSON (for programmatic use)          |
| `--cache-dir`     | `~/.fastcode/cache` | Cache index data                            |

**Open Items:**

- (None — research complete)

## Recommendation

1. **`gmind search-codebase`** là unified orchestrator cho code intelligence — agent CHỈ gọi gmind
2. **FastCode = internal dependency** — gmind tự gọi fastcode, tự quản lý index lifecycle
3. **Zvec simplified** — chỉ còn docs/chat history search, phục vụ `gmind search`
4. **Loại bỏ Tree-sitter dependency** khỏi gmind core — FastCode đã handle
5. **2 lệnh search tách biệt:** `gmind search` (docs/Zvec) vs `gmind search-codebase` (code/FastCode)

## Đề xuất thay đổi PRDs

### PRD-01 (Overview)

1. **Mermaid diagram:**
   - Loại bỏ node `AST["Tree-sitter AST<br/>Code Graph"] --> Zvec`
   - Thêm `FastCode` node: `Gmind --- FastCode["fastcode CLI<br/>Code Intelligence (internal)"]`
   - Zvec description: `"Docs & Chat History"` (loại bỏ AST reference)
2. **Tooling Layer:** `gmind search-codebase` tự gọi FastCode — agent không gọi fastcode trực tiếp
3. **Ultimate Approval Panel** (line 98): `Code Diff (AST/Git)` → `Code Diff (FastCode/Git)`

### PRD-02 (Storage)

1. **Section 1 Mermaid:**
   - Loại bỏ `AST["Tree-Sitter Parser..."] --> Zvec`
   - Thêm FastCode node kết nối với Gmind (internal dependency)
2. **Zvec description:** `"Semantic Memory"` → `"Docs & Chat History Semantic Search"` (thu hẹp scope)
3. **Section 3 "Graph RAG":** Refactor → `"Code Intelligence (FastCode)"` — giải thích rằng gmind delegates code analysis cho fastcode nội bộ
4. **Agent query route:** `gmind search-codebase` cho code, `gmind search` cho docs
5. **API endpoint:** `GET /api/docs/search?q=...` → source vẫn là Zvec, clarify chỉ docs

### PRD-03 (CLI & Workflow)

1. **`gmind search <query>`:** Thu hẹp scope — chỉ query Zvec cho docs, loại bỏ "AST Code snippet"
2. **Thêm `gmind search-codebase <query>`:** Orchestrator command, tự gọi fastcode index+query
3. **`gmind context <id>`:** Cập nhật: code context lấy thông qua `gmind search-codebase`, docs/chat từ Zvec
4. **Agent Workflow diagram:** Thêm bước `gmind search-codebase "<task>"` trong Execution phase (KHÔNG phải fastcode trực tiếp)

## Decision

- ✅ Human quyết định (2026-02-28): `gmind search-codebase` là entry point duy nhất cho code intelligence
- ✅ FastCode là internal dependency, không exposed trực tiếp cho agent
- Pending: Human review PRD changes

## Open Items → Next Spikes

- Không có spike mới cần thiết — FastCode đã hoàn thiện, chỉ cần cập nhật PRDs
