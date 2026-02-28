# Iteration 001 — Đánh giá beads_rust + FrankenSQLite vs DoltDB theo PRD

**Ngày:** 2026-02-28
**Tác giả:** Researcher & BA Agent
**Phase:** Continuous Exploration (SAFe 6.0)

## Mục tiêu (Objectives)

- Đánh giá beads_rust + FrankenSQLite có đáp ứng **từng yêu cầu cụ thể** trong PRD-01, PRD-02, PRD-03 không
- So sánh trực tiếp với DoltDB cho nghiệp vụ metadata/task management
- Xác định gaps cần giải quyết nếu chuyển sang beads_rust

## Phát hiện (Findings)

### 1. PRD-01: Kiến trúc 5 Lớp — Đánh giá từng lớp

| Lớp                 | Yêu cầu PRD-01                           | DoltDB         | beads_rust + FrankenSQLite          | Đánh giá                  |
| ------------------- | ---------------------------------------- | -------------- | ----------------------------------- | ------------------------- |
| **1. Storage**      | SSOT cho State & Issues                  | ✅ Dolt DB     | ✅ FrankenSQLite (MVCC)             | **Tương đương**           |
| **2. Tooling**      | `bd` CLI ↔ Dolt, `gmind` CLI ↔ Dolt+Zvec | ✅ bd → Dolt   | ✅ br → SQLite, gmind → SQLite+Zvec | **beads_rust có sẵn CLI** |
| **3. Execution**    | Agents update state, coordinate          | ✅ SQL writes  | ✅ br CLI `--json`                  | **Tương đương**           |
| **4. Verification** | CI/CD gate → mark task complete          | ✅ SQL update  | ✅ `br update --status closed`      | **Tương đương**           |
| **5. API Gateway**  | Dolt Webhook / REST API                  | ✅ Dolt native | ⚠️ **Cần build** REST wrapper       | **Gap — cần phát triển**  |
| **6. Web UI**       | Kanban, Approval Gates, Document Graph   | ✅ Dolt query  | ⚠️ Cần API layer                    | **Gap — cần phát triển**  |

### 2. PRD-02: Storage Layer & Metadata — Đánh giá chi tiết

#### A. Yêu cầu Cell-level Merge

| Kịch bản                            | DoltDB                       | beads_rust                                      |
| ----------------------------------- | ---------------------------- | ----------------------------------------------- |
| 2 agents cập nhật status CÙNG issue | ✅ Cell-level merge, tự động | ⚠️ MVCC page-level, last-writer-wins hoặc retry |
| 2 agents cập nhật KHÁC issue        | ✅ Không conflict            | ✅ MVCC parallel (page khác nhau)               |
| Agent query `dolt_diff_<table>`     | ✅ Native                    | ⚠️ Qua events audit trail + JSONL git diff      |

> **Kết luận:** Cell-level merge chỉ thực sự cần khi 2+ agents sửa **cùng 1 row** đồng thời. Trong thực tế gmind, mỗi agent được gán task riêng (`bd-123`), rất hiếm khi 2 agent sửa cùng 1 issue. beads_rust's MVCC **đủ dùng** cho use-case này.

#### B. Yêu cầu Metadata JSON (PRD-02 Section 2)

| Field PRD-02                          | Cách dùng DoltDB                            | Cách dùng beads_rust                      | Gap?                                |
| ------------------------------------- | ------------------------------------------- | ----------------------------------------- | ----------------------------------- |
| `$.assignee`                          | `JSON_SET(metadata, '$.assignee', 'Steve')` | Cột `assignee` SQL native, indexed        | ✅ **Tốt hơn** (first-class column) |
| `$.role_required`                     | `JSON_EXTRACT(metadata, '$.role_required')` | Labels: `role:developer`                  | ⚠️ Convention, không có cột riêng   |
| `$.dependencies.blocked_by`           | JSON nested object                          | Bảng `dependencies` riêng, typed          | ✅ **Tốt hơn** (relational)         |
| `$.dependencies.blocks`               | JSON nested object                          | Reverse query trên `dependencies`         | ✅ **Tốt hơn**                      |
| `$.qa_verification.status`            | `JSON_EXTRACT`                              | ⚠️ **Cần thêm cột** `qa_status`           | ⚠️ Gap nhẹ — migration đơn giản     |
| `$.qa_verification.verified_by`       | `JSON_EXTRACT`                              | ⚠️ **Cần thêm cột** `qa_verified_by`      | ⚠️ Gap nhẹ                          |
| `$.qa_verification.test_logs_zvec_id` | `JSON_EXTRACT`                              | ⚠️ **Cần thêm cột** `test_logs_ref`       | ⚠️ Gap nhẹ                          |
| `$.qa_verification.coverage`          | `JSON_EXTRACT`                              | ⚠️ **Cần thêm cột** `coverage`            | ⚠️ Gap nhẹ                          |
| `$.escalation_level`                  | `JSON_EXTRACT`                              | Map vào `priority` (0-4) hoặc thêm cột    | ⚠️ Gap nhẹ                          |
| `JSON_SET()` / `JSON_EXTRACT()`       | ✅ Native MySQL                             | ❌ Không cần — dùng SQL columns trực tiếp | ✅ Đổi paradigm: columns > JSON     |

> **Phát hiện quan trọng từ NotebookLM:** _"Building agentic memory with SQLite+JSONL is essentially reaching for Dolt without knowing about it"_ — nghĩa là beads_rust đã implement phần lớn capabilities của Dolt nhưng theo cách native SQLite. Sự khác biệt: Dolt dùng JSON blob linh hoạt (schema-less), beads_rust dùng typed columns (schema-strict nhưng hiệu năng cao hơn).

#### C. Yêu cầu Sync & Garbage Collection (PRD-02 Section 4)

| Yêu cầu                           | DoltDB                                      | beads_rust                                           |
| --------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Lazy Cleanup (orphaned data Zvec) | `dolt diff HEAD~1 HEAD` detect deleted rows | `events` table audit trail + `dirty_issues` tracking |
| Memory Compaction                 | Dolt GC                                     | JSONL re-export (compact)                            |
| Cross-DB sync (Dolt ↔ Zvec)       | Dolt webhook trigger                        | Polling `events` table hoặc `dirty_issues`           |

### 3. PRD-03: CLI & Workflow — Đánh giá

| Yêu cầu                        | DoltDB                      | beads_rust                           |
| ------------------------------ | --------------------------- | ------------------------------------ |
| `gmind context <id> --depth N` | Query Dolt + Zvec           | Query SQLite + Zvec (cách tương tự)  |
| `bv --robot-triage`            | Đọc JSONL (không dùng Dolt) | ✅ **Tương thích** — bv đọc JSONL    |
| File Locking (MCP)             | `reason="bd-123"`           | ✅ Tương thích — cùng Beads ID       |
| Sub-agent Permissions          | `bd close` restricted       | `br close` restricted (cùng pattern) |
| Verification → `bd close`      | SQL update status           | `br update --status closed`          |

## Quyết định (Decisions Made)

### ✅ beads_rust có thể thay thế DoltDB cho gmind, với trade-offs sau:

**Được (Gains):**

1. Loại bỏ Dolt binary (~30MB) + Go runtime dependency
2. First-class SQL columns thay JSON blob → hiệu năng query tốt hơn
3. JSONL git-friendly sync → team workflow đơn giản hơn (1 VCS thay vì 2)
4. In-process MVCC → latency thấp hơn MySQL protocol
5. `bv` viewer **không bị ảnh hưởng** — đọc JSONL bất kể backend

**Mất (Losses):**

1. Cell-level merge → chấp nhận page-level MVCC (đủ cho single-machine)
2. `dolt diff` → thay bằng events audit trail + JSONL git diff
3. Database branching → thay bằng git branching + JSONL
4. `JSON_SET()`/`JSON_EXTRACT()` dynamic → thay bằng SQL ALTER TABLE migrations
5. Dolt Webhook → cần build API layer riêng

**Cần bổ sung (Gaps to Fill):**

1. ~5 PM columns: `qa_status`, `qa_verified_by`, `test_logs_ref`, `coverage`, `escalation_level`
2. Embed FrankenSQLite trực tiếp vào `gmind` Go binary (qua CGo/FFI)
3. Polling `events` table mỗi 3-5 giây cho real-time updates (thay Dolt webhook)

**Quyết định đã được Human approve (2026-02-28):**

1. ✅ **bv compatibility:** Đã xác nhận tương thích — cùng tác giả (Jeffrey Emanuel) code cả `bv` và `beads_rust`
2. ✅ **API Gateway:** Embed FrankenSQLite trực tiếp vào `gmind` Go binary, KHÔNG dùng subprocess wrapper
3. ✅ **Real-time updates:** Polling `events` table (đơn giản, đủ cho MVP)
4. ✅ **Zvec sync:** `gmind context` chưa viết → thiết kế đúng từ đầu query FrankenSQLite, scope refactor = 0

## Câu hỏi mở (Open Questions)

> ✅ **Tất cả câu hỏi đã được Human resolve — xem Decisions Made bên trên.**

## Đề xuất cho Iteration tiếp theo

1. **Schema migration:** Thêm 5 PM columns vào beads_rust schema (`qa_status`, `qa_verified_by`, `test_logs_ref`, `coverage`, `escalation_level`)
2. **Embed FrankenSQLite:** Thiết kế CGo/FFI bridge cho `gmind` Go binary
3. **PRD update:** Cập nhật PRD-01 + PRD-02 thay Dolt bằng beads_rust + FrankenSQLite
4. **`gmind context` design:** Thiết kế query flow: FrankenSQLite (issues) + Zvec (docs/chat)
