# Spike: Requirements Traceability Matrix — 3-Layer Beads ID Linkage (PRD ↔ Plan ↔ Tasks)

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

---

## Hypothesis

- Beads ID (`br-xxx`) có thể trở thành **Universal ID** xuyên suốt mọi artifact: từ PRD sections → Plan elements → Tasks → Code Commits → Bugs
- Bằng cách gắn Beads ID ở **mức section/element** (không chỉ document level), ta có thể tạo ra một **Requirements Traceability Matrix (RTM)** hoàn chỉnh, cho phép:
  - **Forward tracing:** PRD section → Plan element → Task → Code → Test
  - **Backward tracing:** Task `bd-xxx` → Plan element nào? → PRD section nào?
  - **Coverage analysis:** PRD đã được cover hết trong Plan chưa? Plan đã được decompose hết thành Tasks chưa?

---

## Research Sessions

### Session 1 (2026-03-01) — Deep Research: 3-Layer Traceability Model

---

### A. VẤN ĐỀ HIỆN TẠI — "Đứt gãy truy vết"

Hiện tại, luồng từ PRD → Code thiếu **granular linkage**:

```
PRD-01-Overview.md (toàn bộ file)
    ↓ (KHÔNG CÓ LINK chính thức)
Plan (CHƯA TỒN TẠI dạng structured)
    ↓ (KHÔNG CÓ LINK chính thức)
Task bd-xxx (chỉ gắn vào code commit)
    ↓
Code Commit (Beads-ID: bd-xxx Git Trailer) ← Đã có
```

**Hệ quả cụ thể:**

1. Human hỏi: "Task `bd-a1b2` đáp ứng phần nào của PRD?" → **Không trả lời được**
2. Human hỏi: "PRD Section 3 đã được implement hết chưa?" → **Không trả lời được**
3. Human hỏi: "Plan element nào chưa có task?" → **Không trả lời được**
4. Human muốn thay đổi PRD Section 2 → **Không biết những task nào bị ảnh hưởng**

---

### B. MÔ HÌNH YÊU CẦU — 3 Tầng (PRD ↔ Plan ↔ Tasks)

#### B.1. Tổng quan kiến trúc truy vết

```
┌──────────────────────────────────────────────────────────────────────┐
│  TẦNG 1: PRD (Requirements)                                          │
│                                                                      │
│  PRD-01-Overview.md                                                  │
│  ├── §1 Bối cảnh & Vấn đề .............. REQ: br-prd01-s1            │
│  ├── §2 Tổng quan Hệ thống ............. REQ: br-prd01-s2            │
│  ├── §3 Lớp Xác minh CI/CD ............. REQ: br-prd01-s3            │
│  ├── §4 Kiến trúc Giao diện ............ REQ: br-prd01-s4            │
│  │   ├── §4.1 API Gateway .............. REQ: br-prd01-s4.1          │
│  │   ├── §4.2 Giao diện Quản trị ...... REQ: br-prd01-s4.2           │
│  │   ├── §4.3 Cổng Phê duyệt Level 3 .. REQ: br-prd01-s4.3           │
│  │   └── §4.4 Đồ thị Tài liệu HITL ... REQ: br-prd01-s4.4            │
│  └── (tổng: 8 REQ IDs cho PRD-01)                                    │
│                                                                      │
│  PRD-02-Storage.md                                                   │
│  ├── §1 Lớp Lưu trữ ................... REQ: br-prd02-s1             │
│  ├── §2 PM Custom Fields ............... REQ: br-prd02-s2            │
│  ├── §3 Universal Tracking ............. REQ: br-prd02-s3            │
│  ├── §4 Sync & GC ...................... REQ: br-prd02-s4            │
│  └── §5 GitHub Sync .................... REQ: br-prd02-s5            │
│                                                                      │
│  PRD-03-CLI-and-Workflow.md                                          │
│  ├── §1 gmind CLI ...................... REQ: br-prd03-s1            │
│  ├── §2 Agent Workflow ................. REQ: br-prd03-s2            │
│  └── §3 Phân quyền Agent .............. REQ: br-prd03-s3             │
├──────────────────────────────────────────────────────────────────────┤
│  TẦNG 2: PLAN (Design Elements)                                      │
│                                                                      │
│  Plan sẽ có N elements, mỗi element có Beads ID riêng:               │
│                                                                      │
│  PLAN-01: "Implement FrankenSQLite adapter"                          │
│    beads-id: br-plan-01                                              │
│    satisfies: [br-prd02-s1]  <-- link ngược lên PRD Section          │
│                                                                      │
│  PLAN-02: "Build gmind search-codebase command"                      │
│    beads-id: br-plan-02                                              │
│    satisfies: [br-prd03-s1]  <-- link ngược lên PRD Section          │
│                                                                      │
│  PLAN-03: "Design API Gateway REST endpoints"                        │
│    beads-id: br-plan-03                                              │
│    satisfies: [br-prd01-s4.1] <-- link ngược PRD 4.1                 │
│                                                                      │
│  ...                                                                 │
├──────────────────────────────────────────────────────────────────────┤
│  TẦNG 3: TASKS (Execution Beads)                                     │
│                                                                      │
│  Task decomposition từ Plan elements:                                │
│                                                                      │
│  bd-a1b2:  "Setup FrankenSQLite embedded driver"                     │
│    type: task                                                        │
│    implements: br-plan-01  <-- link ngược lên Plan element           │
│    satisfies: [br-prd02-s1] <-- transitive link lên PRD              │
│                                                                      │
│  bd-c3d4:  "Write MVCC page-level lock tests"                        │
│    type: task                                                        │
│    implements: br-plan-01                                            │
│    satisfies: [br-prd02-s1]                                          │
│                                                                      │
│  bd-e5f6:  "Implement gmind search-codebase orchestrator"            │
│    type: task                                                        │
│    implements: br-plan-02                                            │
│    satisfies: [br-prd03-s1]                                          │
└──────────────────────────────────────────────────────────────────────┘
```

#### B.2. Luồng truy vết hoàn chỉnh (Bidirectional)

```
FORWARD TRACING (↓):
  PRD Section br-prd02-s1  "Lớp Lưu trữ"
    └──satisfied by──→  Plan br-plan-01  "Implement FrankenSQLite adapter"
        └──implemented by──→  Task bd-a1b2  "Setup FrankenSQLite driver"
            └──committed as──→  commit abc123 (Beads-ID: bd-a1b2)
        └──implemented by──→  Task bd-c3d4  "Write MVCC tests"
            └──committed as──→  commit def456 (Beads-ID: bd-c3d4)

BACKWARD TRACING (↑):
  Task bd-a1b2 "Setup FrankenSQLite driver"
    └──implements──→  Plan br-plan-01  "Implement FrankenSQLite adapter"
        └──satisfies──→  PRD Section br-prd02-s1  "Lớp Lưu trữ"

  Human query: "bd-a1b2 thuộc phần nào của PRD?"
  → Answer: PRD-02 Section 1 "Lớp Lưu trữ" (qua Plan br-plan-01)
```

---

### C. THIẾT KẾ CHI TIẾT — Cách gắn Beads ID vào từng tầng

#### C.1. Tầng 1: PRD — Section-level Beads ID

**Nguyên tắc:** Mỗi section chính (## heading) trong PRD được gắn 1 Beads ID duy nhất.

**Cách 1: YAML Front Matter + Section Registry (Đề xuất MVP)**

Thêm vào đầu mỗi PRD:

```yaml
---
type: prd
beads-id: br-prd01 # Document-level ID
sections: # Section-level registry
  - anchor: "§1"
    title: "Bối cảnh & Vấn đề"
    beads-id: br-prd01-s1
  - anchor: "§2"
    title: "Tổng quan Hệ thống"
    beads-id: br-prd01-s2
  - anchor: "§3"
    title: "Lớp Xác minh CI/CD"
    beads-id: br-prd01-s3
  - anchor: "§4"
    title: "Kiến trúc Giao diện"
    beads-id: br-prd01-s4
    subsections:
      - anchor: "§4.1"
        title: "API Gateway"
        beads-id: br-prd01-s4.1
      - anchor: "§4.2"
        title: "Giao diện Quản trị"
        beads-id: br-prd01-s4.2
      - anchor: "§4.3"
        title: "Cổng Phê duyệt Level 3"
        beads-id: br-prd01-s4.3
      - anchor: "§4.4"
        title: "Đồ thị Tài liệu HITL"
        beads-id: br-prd01-s4.4
---
# PRD 01: Giới thiệu & Tổng quan Hệ thống
...
```

**Ưu điểm:**

- ✅ **Structured + machine-parseable** — Go `gopkg.in/yaml.v3` parse dễ dàng
- ✅ **Không sửa nội dung markdown body** — chỉ thêm header
- ✅ Git-friendly — thay đổi front matter = diff rõ ràng
- ✅ `gmind context br-prd01-s3` → trả đúng section "Lớp Xác minh CI/CD"
- ✅ Web UI parse YAML → render section navigation với Beads ID links

**ID Convention:**

```
br-prd{NN}-s{M}      → PRD section chính      VD: br-prd01-s3
br-prd{NN}-s{M}.{K}  → PRD subsection          VD: br-prd01-s4.2
```

---

#### C.2. Tầng 2: Plan — Element-level Beads ID

**Nguyên tắc:**

- Plan KHÔNG PHẢI markdown tự do — Plan là **structured document** với từng element traceable
- Mỗi Plan element (feature/component/module để implement) được gắn Beads ID
- Mỗi Plan element PHẢI link `satisfies:` ngược lên PRD section(s)

**Cấu trúc Plan Document:**

```yaml
---
type: plan
beads-id: br-plan
pi: PI-1
source-prds: [br-prd01, br-prd02, br-prd03]
created: 2026-03-01
---
# Implementation Plan — PI-1

## Elements
```

Tiếp theo là danh sách plan elements theo structured format:

```markdown
### PLAN-01: Implement FrankenSQLite Storage Adapter

<!-- beads: br-plan-01 | satisfies: br-prd02-s1 -->

**Mô tả:** Tạo Go package `internal/storage/frankensqlite` với embedded FrankenSQLite.
Hỗ trợ MVCC page-level concurrent writes cho multi-agent scenarios.

**Acceptance Criteria:**

- [ ] FrankenSQLite embedded thành công trong Go binary
- [ ] MVCC concurrent write test pass (10 writers)
- [ ] JSONL export/import hoạt động

**Estimated Effort:** 5 story points

---

### PLAN-02: Build `gmind search-codebase` Command

<!-- beads: br-plan-02 | satisfies: br-prd03-s1 -->

**Mô tả:** Implement `gmind search-codebase` orchestrator.
Auto-detect FastCode binary, auto-index, delegate query.

**Acceptance Criteria:**

- [ ] `gmind search-codebase "query"` trả kết quả đúng
- [ ] Auto-reindex khi source thay đổi
- [ ] `--json` output format

**Estimated Effort:** 3 story points

---

### PLAN-03: Design API Gateway REST Endpoints

<!-- beads: br-plan-03 | satisfies: br-prd01-s4.1 -->

**Mô tả:** Go REST API server với embedded FrankenSQLite.
Endpoints cho Web UI: tasks, docs, search, github enrichment.

**Acceptance Criteria:**

- [ ] CRUD endpoints cho tasks
- [ ] Docs rendering via Goldmark
- [ ] Rate limiting & auth middleware

**Estimated Effort:** 8 story points

---

### PLAN-04: Build Level 3 Approval Gate UI

<!-- beads: br-plan-04 | satisfies: br-prd01-s4.3 -->

**Mô tả:** Web UI component cho Human approval.
Ultimate Approval Panel: Test Result + Code Diff + Beads ID + PRD link + GitHub CI.

**Acceptance Criteria:**

- [ ] Approval panel renders 5 data streams
- [ ] Human click approve/reject → update Beads task
- [ ] Audit trail logged

**Estimated Effort:** 5 story points

---

### PLAN-05: Implement Document Graph Visualization

<!-- beads: br-plan-05 | satisfies: br-prd01-s4.4 -->

**Mô tả:** Web UI Document Graph: commit lineage + knowledge context linking.
Parse YAML front matter → vẽ doc ↔ task edges.

**Acceptance Criteria:**

- [ ] Interactive graph render
- [ ] Click node → navigate to doc/task
- [ ] Git commit lineage per document

**Estimated Effort:** 5 story points
```

**Parse Format cho Inline Markers:**

```
<!-- beads: {beads-id} | satisfies: {prd-section-id1}, {prd-section-id2} -->
```

Go regex: `<!--\s*beads:\s*([\w-]+)\s*\|\s*satisfies:\s*([\w-,\s]+)\s*-->`

**ID Convention:**

```
br-plan-{NN}   → Plan element    VD: br-plan-01, br-plan-02
```

---

#### C.3. Tầng 3: Tasks — Beads Issues với `implements` và `satisfies` links

**Nguyên tắc:**

- Task decomposition tạo Beads tasks từ Plan elements
- Mỗi task PHẢI có `implements:` link lên Plan element
- `satisfies:` link transitively lên PRD section (tính từ plan element)

**Cách implement trong beads_rust:**

Sử dụng **Beads dependency types có sẵn** + mở rộng:

```
BEADS DEPENDENCY TYPES (có sẵn):
  blocks        → Task A blocks Task B
  parent-child  → Epic → Feature → Story hierarchy
  relates_to    → Loose association
  discovered-from → Bug discovered during Task X

MỞ RỘNG CHO TRACEABILITY (mới):
  implements    → Task implements Plan element
  satisfies     → Plan element satisfies PRD section
```

**Cách sử dụng `bd` CLI:**

```bash
# 1. Tạo Plan element như Beads issue (type: plan-element)
bd create "PLAN-01: Implement FrankenSQLite adapter" \
    --type=plan-element \
    --tag="satisfies:br-prd02-s1"

# 2. Task decomposition từ Plan element
bd create "Setup FrankenSQLite embedded driver" \
    --type=task \
    --parent=br-plan-01 \
    --tag="implements:br-plan-01" \
    --tag="satisfies:br-prd02-s1"

bd create "Write MVCC page-level lock tests" \
    --type=task \
    --parent=br-plan-01 \
    --tag="implements:br-plan-01" \
    --tag="satisfies:br-prd02-s1"

# 3. Task hoàn thành → commit với Git Trailer
git commit -m "feat(storage): setup FrankenSQLite driver" \
    --trailer "Beads-ID: bd-a1b2"
```

**Alternative: Dùng `bd dep add` thay tag:**

```bash
# Thay vì tag, dùng dependency link type "implements"
bd dep add bd-a1b2 br-plan-01 --type=implements
bd dep add br-plan-01 br-prd02-s1 --type=satisfies
```

> ⚠️ **Lưu ý:** Beads hiện tại hỗ trợ `blocks`, `parent-child`, `relates_to`, `discovered-from`. Dependency types `implements` và `satisfies` là **mở rộng mới** cần thêm vào beads_rust. Nếu không muốn sửa beads_rust, dùng `--tag` workaround.

---

### D. COVERAGE ANALYSIS — "Đã cover hết chưa?"

#### D.1. PRD Coverage — "Plan đã cover hết PRD chưa?"

**Query:**

```sql
-- Tìm tất cả PRD sections CHƯA có Plan element nào satisfies
SELECT prd_section_id, prd_section_title
FROM prd_sections
WHERE prd_section_id NOT IN (
    SELECT DISTINCT tag_value
    FROM issue_tags
    WHERE tag_key = 'satisfies'
    AND issue_type = 'plan-element'
);
```

**Kết quả mẫu:**

```
PRD COVERAGE REPORT — PI-1

PRD Section      Title                         Status
───────────────  ────────────────────────────  ──────────────────
br-prd01-s1      Boi canh & Van de             Context-only
br-prd01-s2      Tong quan He thong            Covered (5 PEs)
br-prd01-s3      Lop Xac minh CI/CD            Covered (2 PEs)
br-prd01-s4.1    API Gateway                   Covered (1 PE)
br-prd01-s4.2    Giao dien Quan tri            NOT COVERED
br-prd01-s4.3    Cong Phe duyet Level 3        Covered (1 PE)
br-prd01-s4.4    Do thi Tai lieu HITL          Covered (1 PE)
br-prd02-s1      Lop Luu tru                   Covered (1 PE)
br-prd02-s2      PM Custom Fields              NOT COVERED
br-prd02-s3      Universal Tracking            NOT COVERED
br-prd02-s4      Sync & GC                     NOT COVERED
br-prd02-s5      GitHub Sync                   Covered (1 PE)
br-prd03-s1      gmind CLI                     Covered (1 PE)
br-prd03-s2      Agent Workflow                NOT COVERED
br-prd03-s3      Phan quyen Agent              NOT COVERED
───────────────  ────────────────────────────  ──────────────────
TONG: 16 sections | 9 covered | 6 NOT covered | 1 context
PRD COVERAGE: 56.25% (9/16)

--> ACTION: Can bo sung Plan elements cho 6 uncovered sections
```

**Human actions khi thấy report này:**

- `br-prd01-s4.2` NOT COVERED → Thêm Plan element cho "Giao diện Quản trị"
- `br-prd02-s2` NOT COVERED → Thêm Plan element cho "PM Custom Fields"
- Hoặc: Xem xét loại bỏ section khỏi PRD nếu không cần cho PI này

---

#### D.2. Plan Coverage — "Task đã cover hết Plan chưa?"

**Query:**

```sql
-- Tìm Plan elements CHƯA có task nào implements
SELECT pe.id, pe.title
FROM issues pe
WHERE pe.issue_type = 'plan-element'
AND pe.status != 'closed'
AND pe.id NOT IN (
    SELECT DISTINCT tag_value
    FROM issue_tags
    WHERE tag_key = 'implements'
    AND issue_type = 'task'
);
```

**Kết quả mẫu:**

```
PLAN --> TASK COVERAGE REPORT — PI-1

Plan Element   Title                        # Tasks
─────────────  ───────────────────────────  ─────────────
br-plan-01     FrankenSQLite adapter        3 tasks  [OK]
br-plan-02     gmind search-codebase        2 tasks  [OK]
br-plan-03     API Gateway                  0 tasks  [!!]
br-plan-04     Level 3 Approval Gate        0 tasks  [!!]
br-plan-05     Document Graph               1 task   [OK]
─────────────  ───────────────────────────  ─────────────
TONG: 5 PEs | 3 decomposed | 2 NOT decomposed
PLAN COVERAGE: 60% (3/5)

--> ACTION: Decompose br-plan-03 va br-plan-04 thanh tasks
```

---

#### D.3. Task Progress — "Đang thực hiện đến đâu?"

**Query:**

```sql
-- Per PRD section: % tasks completed
SELECT
    t.satisfies_prd AS prd_section,
    COUNT(*) AS total_tasks,
    SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS completed,
    ROUND(100.0 * SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct
FROM issues
JOIN issue_tags t ON issues.id = t.issue_id AND t.tag_key = 'satisfies'
WHERE issues.issue_type = 'task'
GROUP BY t.satisfies_prd;
```

**Kết quả mẫu:**

```
TASK PROGRESS BY PRD SECTION — PI-1

PRD Section      Plan Elements     TS  Done  Progress
───────────────  ────────────────  ──  ────  ──────────────
br-prd02-s1      br-plan-01         3     2  ######-  67%
br-prd03-s1      br-plan-02         2     1  #####--  50%
br-prd01-s4.1    br-plan-03         0     0  -------   0%
br-prd01-s4.3    br-plan-04         0     0  -------   0%
br-prd01-s4.4    br-plan-05         1     0  -------   0%
───────────────  ────────────────  ──  ────  ──────────────
OVERALL: 6 tasks | 3 done | 50% complete
```

---

### E. LUỒNG THAY ĐỔI — Impact Analysis

Khi Human muốn **thay đổi PRD**, truy vết giúp đánh giá impact:

```
HUMAN: "Tôi muốn thay đổi PRD-01 Section 4.1 — thêm WebSocket support cho API Gateway"

IMPACT ANALYSIS:
  1. PRD section bị ảnh hưởng: br-prd01-s4.1
  2. Plan elements satisfies br-prd01-s4.1:
     → br-plan-03 "API Gateway REST Endpoints"
     → CẦN CẬP NHẬT Plan: thêm WebSocket element
  3. Tasks implements br-plan-03:
     → bd-xxx, bd-yyy (nếu đã tạo)
     → CẦN REVIEW: tasks hiện tại còn valid không?
  4. Commits linked:
     → git log --grep='Beads-ID: bd-xxx' → code cần refactor?

ACTIONS:
  ① Update PRD-01 Section 4.1
  ② Update/Add Plan element: br-plan-03-ws "WebSocket support"
  ③ bd create tasks mới cho WebSocket implementation
  ④ Mark affected tasks as needs-review
```

**CLI hỗ trợ:**

```bash
# Xem tất cả Plan elements và Tasks liên quan đến PRD section
gmind trace br-prd01-s4.1

# Output:
# PRD Section: br-prd01-s4.1 "API Gateway"
# └── Plan: br-plan-03 "API Gateway REST Endpoints"
#     ├── Task: bd-a1b2 "Setup REST server" [closed]
#     ├── Task: bd-c3d4 "Implement CRUD endpoints" [in_progress]
#     └── Task: bd-e5f6 "Add auth middleware" [open]
# Commits: 3 (abc123, def456, ghi789)
```

---

### F. LUỒNG LIFECYCLE ĐẦY ĐỦ — Từ PRD đến Code và ngược lại

```
TẦNG 1: PRDs (Requirements)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ br-prd01-s1  │  │ br-prd01-s2  │  │ br-prd01-s3  │
│ Bối cảnh     │  │ Tổng quan    │  │ CI/CD        │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│ br-prd02-s1  │  │ br-prd03-s1  │
│ Storage      │  │ CLI          │
└──────┬───────┘  └──────┬───────┘
       │                 │
       │ satisfies ←     │ satisfies ←
       │                 │
       ▼                 ▼
TẦNG 2: Plan (Design)
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ br-plan-01      │  │ br-plan-02      │  │ br-plan-03      │
│ FrankenSQLite   │  │ search-codebase │  │ API Gateway     │
│ adapter         │  │ command         │  │ endpoints       │
└──┬──────────┬───┘  └────────┬────────┘  └─────────────────┘
   │          │               │
   │ implements ←             │ implements ←
   │          │               │
   ▼          ▼               ▼
TẦNG 3: Tasks (Execution)
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│ bd-a1b2      │  │ bd-c3d4      │  │ bd-e5f6          │
│ Setup FSQL   │  │ MVCC tests   │  │ search-codebase  │
│ driver       │  │              │  │ impl             │
└──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
       │                 │                    │
       │ Beads-ID        │ Beads-ID           │ Beads-ID
       │ trailer         │ trailer            │ trailer
       │                 │                    │
       ▼                 ▼                    ▼
TẦNG 4: Code (Git)
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│ commit       │  │ commit       │  │ commit           │
│ abc123       │  │ def456       │  │ ghi789           │
└──────────────┘  └──────────────┘  └──────────────────┘
```

---

### G. IMPLEMENTATION — Cách triển khai trong gmind

#### G.1. Không cần sửa beads_rust (Workaround với Tags)

Thay vì thêm dependency type mới vào beads_rust, dùng **tag convention**:

```bash
# PRD sections → tạo như issue type "req"
bd create "PRD-01 §1: Bối cảnh & Vấn đề" --type=req --tag="prd:PRD-01" --tag="section:s1"

# Plan elements → tạo như issue type "plan-element"
bd create "PLAN-01: FrankenSQLite adapter" --type=plan-element \
    --tag="satisfies:br-prd02-s1"

# Tasks → link ngược
bd create "Setup FrankenSQLite driver" --type=task \
    --parent=br-plan-01 \
    --tag="implements:br-plan-01" \
    --tag="satisfies:br-prd02-s1"
```

**Tag conventions:**

```
satisfies:<prd-section-id>    → Plan element → PRD section
implements:<plan-element-id>  → Task → Plan element
prd:<prd-file>                → Identifies which PRD
section:<section-anchor>      → Section identifier
```

#### G.2. gmind CLI Commands cho Traceability

```bash
# ═══════════ COVERAGE QUERIES ═══════════

# PRD coverage: Plan đã cover PRD sections nào?
gmind coverage prd
# Output: bảng PRD sections + covered/not-covered

# Plan coverage: Tasks đã cover Plan elements nào?
gmind coverage plan
# Output: bảng Plan elements + #tasks + progress%

# Full coverage: PRD → Plan → Tasks cross-ref
gmind coverage full
# Output: RTM table đầy đủ

# ═══════════ TRACING QUERIES ═══════════

# Forward trace: PRD section → Plan → Tasks → Commits
gmind trace br-prd02-s1
# Output: hierarchy tree

# Backward trace: Task → Plan → PRD
gmind trace bd-a1b2 --reverse
# Output: bd-a1b2 → br-plan-01 → br-prd02-s1

# Impact analysis: nếu PRD section thay đổi
gmind impact br-prd01-s4.1
# Output: affected Plans + Tasks + Commits

# ═══════════ GAP ANALYSIS ═══════════

# Tìm PRD sections không có Plan element
gmind gaps prd-to-plan
# Output: list uncovered PRD sections

# Tìm Plan elements không có Tasks
gmind gaps plan-to-tasks
# Output: list undecomposed Plan elements
```

#### G.3. Web UI — Traceability Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  REQUIREMENTS TRACEABILITY MATRIX   [PI-1] [Updated: 5m ago] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PRD Coverage:  ######----  56%  (9/16 sections)             │
│  Plan Coverage: ########--  60%  (3/5 elements)              │
│  Task Progress: #####-----  50%  (3/6 tasks done)            │
│                                                              │
│  PRD-01 Section       Plan             Tasks                 │
│  ───────────────────  ───────────────  ──────────────        │
│  S1 Boi canh     [-]                                         │
│  S2 Tong quan    [x]  PLAN-03 [x]     bd-xxx [x]             │
│  S3 CI/CD        [x]  PLAN-06 [x]     bd-yyy [/]             │
│  S4.1 API GW     [x]  PLAN-03 [x]     bd-zzz [!]             │
│  S4.2 Quan tri   [!]  -- MISSING --   -- MISSING --          │
│  S4.3 Level 3    [x]  PLAN-04 [/]     -- NOT YET --          │
│  S4.4 Doc Graph  [x]  PLAN-05 [/]     bd-aaa [/]             │
│                                                              │
│  [-] Context-only  [x] Covered  [!] Gap  [/] In Progress     │
│                                                              │
│  [Trace]  [Export RTM]  [Show Gaps]  [Update PRD]            │
└──────────────────────────────────────────────────────────────┘
```

---

### H. CÂU HỎI CỦA HUMAN — TRẢ LỜI TRỰC TIẾP

> **Q: "Đang thực hiện task bd-xxx-yyy, tôi xem được items nào trong plan liên quan?"**

```bash
gmind trace bd-xxx-yyy --reverse

# Output:
# Task: bd-xxx-yyy "Setup FrankenSQLite driver"
#   └── implements: br-plan-01 "FrankenSQLite adapter"
#       └── satisfies: br-prd02-s1 "Lớp Lưu trữ"
#
# Related Plan Items (cùng parent br-plan-01):
#   - bd-c3d4 "Write MVCC tests" [in_progress]
#   - bd-g7h8 "JSONL export function" [open]
```

> **Q: "Phần nào trong PRD sẽ được đáp ứng khi task này hoàn thành?"**

→ Answer ngay từ tag `satisfies:br-prd02-s1` → PRD-02 Section 1 "Lớp Lưu trữ"

> **Q: "Tasks đã cover hết Plan chưa? Plan cover hết PRD chưa?"**

```bash
gmind coverage full

# Output:
# PRD COVERAGE:  56% (9/16 sections covered by Plan)
# PLAN COVERAGE: 60% (3/5 elements decomposed to Tasks)
# TASK PROGRESS: 50% (3/6 tasks completed)
#
# GAPS:
# ❌ PRD-01 §4.2 "Giao diện Quản trị" → No Plan element
# ❌ PRD-02 §2 "PM Custom Fields" → No Plan element
# ❌ Plan br-plan-03 "API Gateway" → 0 tasks
# ❌ Plan br-plan-04 "Level 3 Approval" → 0 tasks
#
# ACTIONS REQUIRED:
# 1. Bổ sung Plan elements cho 6 uncovered PRD sections
# 2. Decompose br-plan-03 và br-plan-04 thành tasks
```

> **Q: "Khi tôi điều chỉnh PRD → ảnh hưởng gì?"**

```bash
gmind impact br-prd01-s4.1

# Output:
# IMPACT OF CHANGING br-prd01-s4.1 "API Gateway":
#
# Affected Plan Elements: 1
#   └── br-plan-03 "API Gateway REST Endpoints" → REVIEW NEEDED
#
# Affected Tasks: 3
#   ├── bd-a1b2 "Setup REST server" [closed] → MAY NEED REWORK
#   ├── bd-c3d4 "CRUD endpoints" [in_progress] → PAUSE & REVIEW
#   └── bd-e5f6 "Auth middleware" [open] → HOLD
#
# Affected Commits: 5
#   → git log --grep='Beads-ID: bd-a1b2' --grep='Beads-ID: bd-c3d4'
```

---

### I. SO SÁNH VỚI INDUSTRY STANDARDS

| Feature           | JIRA + Confluence   | Azure DevOps RTM        | **gmind + Beads (đề xuất)**          |
| ----------------- | ------------------- | ----------------------- | ------------------------------------ |
| RTM               | Manual spreadsheet  | Built-in linking        | **Automated via Beads graph**        |
| Granularity       | Epic → Story → Task | Requirement → Work Item | **PRD section → Plan → Task**        |
| Document linkage  | Page link (manual)  | Work item link (manual) | **YAML front matter (auto-parse)**   |
| Coverage analysis | Report plugin ($$$) | Test plan coverage      | **`gmind coverage` CLI (free)**      |
| Impact analysis   | Manual search       | Cross-refs              | **`gmind impact` CLI (automated)**   |
| Git integration   | None                | Commit link             | **`Beads-ID:` Git Trailer (native)** |
| Agent-friendly    | ❌ API heavy        | ❌ Complex API          | **✅ CLI-first, JSON output**        |
| Local-first       | ❌ Cloud only       | ❌ Cloud only           | **✅ FrankenSQLite + JSONL**         |
| Cost              | $$$$ (per user)     | $$ (per user)           | **$0 (open source)**                 |

---

## Recommendation

### Kết luận: **Hoàn toàn khả thi — và đây là killer feature của gmind**

Đề xuất triển khai theo 3 giai đoạn:

#### Phase 1 — MVP: YAML + Tags (ngay bây giờ, trong CE)

1. **Thêm YAML front matter** vào PRDs hiện tại với section-level Beads IDs
2. **Plan document** sử dụng structured format với inline `<!-- beads: -->` markers
3. **Task creation** sử dụng `--tag="implements:..."` và `--tag="satisfies:..."` convention
4. **Không cần sửa beads_rust** — dùng tag workaround

#### Phase 2 — CLI Commands (khi implement gmind)

1. `gmind coverage prd|plan|full` — Coverage analysis
2. `gmind trace <beads-id> [--reverse]` — Bidirectional tracing
3. `gmind impact <prd-section-id>` — Change impact analysis
4. `gmind gaps prd-to-plan|plan-to-tasks` — Gap detection

#### Phase 3 — Web UI Dashboard (Beads Viewer PM Edition)

1. RTM visualization dashboard
2. Interactive coverage heatmap
3. Gap alerts & notifications
4. Impact analysis workflow

### Impact lên PRDs hiện tại

| PRD    | Section cần update    | Nội dung mới                                                        |
| ------ | --------------------- | ------------------------------------------------------------------- |
| PRD-01 | §4.4 Document Graph   | Mở rộng: parse YAML front matter + traceability graph               |
| PRD-02 | §3 Universal Tracking | Thêm: Section-level Beads IDs, `satisfies`/`implements` links       |
| PRD-03 | §1 gmind CLI          | Thêm: `gmind trace`, `gmind coverage`, `gmind impact`, `gmind gaps` |
| PRD-03 | §2 Agent Workflow     | Thêm: Rule bắt buộc `--tag=implements:` và `--tag=satisfies:`       |

---

## Decision

- ✅ **Approved (2026-03-01):** Human đồng ý phương án 3-layer traceability. Đã tích hợp vào PRD-01 §4.4, PRD-02 §3, PRD-03 §1 & §2.

## Open Items → Next Spikes

1. **Beads_rust extension:** Có nên thêm `implements` và `satisfies` dependency types native? Hay tag workaround đủ? (→ spike mới nếu cần)
2. **Auto-detection:** `gmind` có thể auto-detect section headings trong PRDs và tự generate Beads IDs? (→ giảm manual effort)
3. **Plan format:** Chuẩn hóa Plan document format — structured Markdown, YAML, hay dùng Beads issues luôn?
4. **Test traceability:** Mở rộng RTM thêm tầng Test (PRD → Plan → Task → Code → Test)?
