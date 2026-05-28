---
beads-id: br-prd04
title: "PRD 04: Giao diện PM & Quản lý Không gian làm việc (Web UI & PM Workspace)"
sections:
  - anchor: "1-pm-custom-fields"
    title: "Quản lý Project Tasks (PM Custom Fields)"
    beads-id: br-prd04-s1
  - anchor: "2-web-ui-architecture"
    title: "Kiến trúc Giao diện Người dùng"
    beads-id: br-prd04-s2
  - anchor: "3-safe-board-views"
    title: "Các Giao diện Quản trị"
    beads-id: br-prd04-s3
  - anchor: "4-level3-approval"
    title: "Cổng Phê duyệt Cấp 3"
    beads-id: br-prd04-s4
  - anchor: "5-document-graph"
    title: "Đồ thị Tài liệu & Lịch sử HITL"
    beads-id: br-prd04-s5
  - anchor: "6-rtm-dashboard"
    title: "RTM Dashboard"
    beads-id: br-prd04-s6
  - anchor: "7-rte-approval-ui"
    title: "RTE Approval — UI Integration"
    beads-id: br-prd04-s7
  - anchor: "8-navigation-route-map"
    title: "Điều hướng & Bản đồ Route"
    beads-id: br-prd04-s8
  - anchor: "9-document-viewer"
    title: "Trình xem Tài liệu (Document Viewer)"
    beads-id: br-prd04-s9
  - anchor: "10-beads-trace-explorer"
    title: "Beads Trace Explorer — Khám phá Đồ thị Toàn trang"
    beads-id: br-prd04-s10
  - anchor: "11-task-detail-view"
    title: "Chi tiết Task (Task Detail View)"
    beads-id: br-prd04-s11
  - anchor: "12-search-filter-ui"
    title: "Tìm kiếm & Lọc (Search & Filter)"
    beads-id: br-prd04-s12
  - anchor: "13-task-list-view"
    title: "Danh sách Task (Task List View)"
    beads-id: br-prd04-s13
  - anchor: "14-agent-ci-terminal"
    title: "Bảng điều khiển Agent & CI (Terminal Console)"
    beads-id: br-prd04-s14
  - anchor: "15-timeline-file-leases"
    title: "Dòng thời gian & File Leases (Timeline)"
    beads-id: br-prd04-s15
  - anchor: "16-git-graph-explorer"
    title: "Khám phá Git Graph & Đa kịch bản"
    beads-id: br-prd04-s16
  - anchor: "17-storyboard-journey"
    title: "Bản đồ Hành trình & Storyboard"
    beads-id: br-prd04-s17
  - anchor: "18-acceptance-criteria"
    title: "Tiêu chí Nghiệm thu"
    beads-id: br-prd04-s18
---

# PRD 04: Giao diện PM & Quản lý Không gian làm việc (Web UI & PM Workspace)

<!-- beads-id: br-prd04 -->

> **3-LAYER PYRAMID CONTEXT — Layer 3 (Detail / Implementation)**
>
> - **Vị trí:** Layer 3 — UI Implementation spec cho Web UI & PM Workspace
> - **Layer 1 (Map):** [PRD-00: Vision & Architecture](./PRD-00-Vision-and-Architecture.md) — Kiến trúc tổng thể
> - **Layer 2 (Orchestration):** [PRD-02: Tracking & RTM](./PRD-02-Universal-Tracking-and-RTM.md) — Beads ID & coverage logic | [PRD-03: CLI](./PRD-03-CLI-and-Agent-Execution.md) — `gmind serve` REST API mà UI consume
> - **Layer 3 (Peer):** [PRD-01: Storage](./PRD-01-Storage-and-Graph-Engine.md) — Data model (FrankenSQLite schema, Zvec)
> - **UI/UX Methodology:** [Spike Ralph Loop](../../researches/spikes/spike-design-system-ralph-loop-agent.md) — Contract-driven UI pipeline (Stage 1: Low-Fi, Stage 2: Hi-Fi)
>
> **>> AGENT DIRECTIVE:** Bạn đang ở Layer 3 (UI Detail). Data contract đến từ PRD-03 (CLI/API). Data model từ PRD-01 (Storage). Nếu implementing UI, sử dụng Ralph Loop workflow: `/gsafe-uiux-ralph-loop-antigravity`.
> **>> NOTE:** if execute workflow design-system, these prd name = "webui-and-pm-workspace"

## 1. Quản lý Project Tasks (PM Custom Fields) qua First-class SQL Columns

<!-- beads-id: br-prd04-s1 -->

Để thiết lập hệ thống gán việc như một "JIRA thu nhỏ", beads_rust sử dụng **first-class SQL columns** thay vì JSON blob. Các trường PM là cột indexed, type-safe, queryable trực tiếp — hiệu năng tốt hơn `JSON_EXTRACT()`.

### Schema beads_rust — PM Fields

```sql
-- Bảng issues đã có sẵn trong beads_rust
CREATE TABLE issues (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    priority INTEGER NOT NULL DEFAULT 2,    -- 0=P0 Critical → 4=P4 Backlog
    assignee TEXT,                           -- Người được gán (first-class!)
    owner TEXT DEFAULT '',                   -- Chủ sở hữu task
    issue_type TEXT NOT NULL DEFAULT 'task', -- task, bug, feature, epic, ...
    -- ... (35+ cột khác)

    -- PM columns mở rộng (cần thêm qua migration)
    qa_status TEXT DEFAULT '',               -- PASSED, FAILED, PENDING
    qa_verified_by TEXT DEFAULT '',           -- CuongPT.QA
    test_logs_ref TEXT DEFAULT '',            -- zvec-doc-99281
    coverage TEXT DEFAULT '',                 -- 85%
    escalation_level INTEGER DEFAULT 0,      -- 0: Auto, 1: Team, 2: Human, 3: Approval

    -- RTE Approval columns (spike-rte-approval-workflow)
    rte_status TEXT DEFAULT '',               -- escalated, discussing, approved, rejected
    rte_resolution TEXT DEFAULT '',           -- free-text: phương án đã phê duyệt (= Execution Context)
    rte_approved_at TEXT DEFAULT '',          -- timestamp phê duyệt
    rte_approved_by TEXT DEFAULT ''           -- ai phê duyệt (RTE agent/Human)
);

-- Bảng dependencies riêng (first-class relational!)
CREATE TABLE dependencies (
    issue_id TEXT NOT NULL,
    depends_on_id TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'blocks',   -- blocks, parent-child, related, ...
    FOREIGN KEY (issue_id) REFERENCES issues(id)
);
```

### So sánh paradigm: JSON blob (cũ) → SQL columns (mới)

| Thao tác        | ~~DoltDB (cũ)~~                                       | beads_rust (mới)                                      |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| Gán assignee    | `JSON_SET(metadata, '$.assignee', 'Steve')`           | `UPDATE issues SET assignee = 'Steve'`                |
| Lọc theo role   | `JSON_EXTRACT(metadata, '$.role_required')`           | `SELECT * FROM labels WHERE label = 'role:developer'` |
| Xem blockers    | `JSON_EXTRACT(metadata, '$.dependencies.blocked_by')` | `SELECT * FROM dependencies WHERE type = 'blocks'`    |
| QA verification | `JSON_EXTRACT(metadata, '$.qa_verification.status')`  | `SELECT qa_status FROM issues WHERE id = ?`           |
| Escalation      | `JSON_EXTRACT(metadata, '$.escalation_level')`        | `SELECT escalation_level FROM issues WHERE id = ?`    |

### Luồng Hoạt động (Workflow) và Xử lý Xung đột qua Web UI

```mermaid
sequenceDiagram
    participant Team as 🤖 Feature Team (Dev/QA)
    participant Web as 🌐 Beads Viewer PM
    participant SSOT as 🗄️ beads_rust (FrankenSQLite)
    participant Human as 🧑 Human Manager

    Note over Web, Human: Gán việc & Phân quyền
    Web->>SSOT: SQL UPDATE issues SET assignee = 'Steve' WHERE id = 'br-123'
    SSOT-->>Team: br update br-123 --status review_requested

    Note over Team, SSOT: Phản ứng báo cáo Escalation
    Team->>SSOT: Update br-105: status='blocked', escalation_level=2
    SSOT-->>Web: Polling events table → real-time update

    Note over Web, Human: Xử lý Deadlock (Human-in-the-Loop)
    Web->>Human: 🔴 Alert: Deadlock Dependency
    Note over Web, Human: Human xem Dependency Graph (DAG) trên UI
    Human->>Web: Re-assign or Change Priority
    Web->>SSOT: UPDATE issues SET assignee = 'NewAgent' WHERE id = 'br-105'
    SSOT-->>Team: Agent mới nhận việc
```

**Nguyên tắc thao tác:**

- PM metadata được lưu dưới dạng **first-class SQL columns** (indexed, type-safe) trên beads_rust.
- Web UI dùng `WHERE` clause trực tiếp để lọc, tìm kiếm và hiển thị dữ liệu — nhanh hơn `JSON_EXTRACT`.
- Cập nhật thông qua Go REST API → SQL `UPDATE` trực tiếp.
- Real-time updates qua **polling `events` table** mỗi 3-5 giây.

## 2. Kiến trúc Giao diện Người dùng (Presentation Layer)

<!-- beads-id: br-prd04-s2 -->

Phiên bản **Beads Viewer PM Edition** đóng vai trò là một dự án mở rộng, tập trung vào trải nghiệm Người quản lý (Human-in-the-Loop Supervision) với các thành phần chính:

### 2.1. API Gateway (Lớp Bảo vệ Dữ liệu)

- Mọi request từ Web UI phải đi qua **Go REST API** (embedded FrankenSQLite).
- Gateway xác thực quyền truy cập, kiểm soát rate-limit, và đảm bảo tính toàn vẹn dữ liệu.
- **Không cho phép UI read/write trực tiếp vào FrankenSQLite/Zvec.**

### 2.2. Offline & Rehydration State (Interactions & Transitions)

- **Offline State:**
  - **Transition:** Khi hệ thống phát hiện mất kết nối (thông qua ping hoặc failed request), UI ngay lập tức chuyển hiệu ứng fade-in một banner màu vàng "Offline Mode" ở trên cùng màn hình.
  - **Interaction:** Chuyển sang chế độ read-only cho hầu hết các biểu đồ (dựa trên IndexedDB/cached data). Các thao tác ghi quan trọng (VD: Update status, Assign) không bị block hoàn toàn mà thay vào đó hiển thị biểu tượng "Pending/Clock" bên cạnh, và được lưu vào hàng đợi local (Local Queue). Nút Submit đổi thành "Save Offline".
- **Rehydration State:**
  - **Transition:** Khi có kết nối mạng trở lại (WebSocket reconnected hoặc successful health check), banner "Offline Mode" chuyển màu xanh và đổi text thành "Syncing...".
  - **Interaction:** Hệ thống xử lý ngầm (background sync) để đẩy hàng đợi local lên Go REST API. Các icon "Pending/Clock" tại các thẻ task chuyển thành "spinner" và sau đó biến mất khi xác nhận server thành công.
  - **Conflict Resolution:** Nếu có xung đột dữ liệu (VD: người khác đã sửa task trong lúc offline), UI hiển thị Modal "Sync Conflict" yêu cầu User chọn "Keep Mine" hoặc "Use Server Version".

## 3. Các Giao diện Quản trị (SAFe & Board Views)

<!-- beads-id: br-prd04-s3 -->

- **Portfolio View:** Dành cho CEO/CTO xem Epic, Budget, Roadmap, forecast và trạng thái ngân sách theo quý.
- **ART View:** Kanban tổng cho Orchestrator (RTE) / PMO quản lý, có WIP limit, board selector, và progress statistics.
- **Team View:** Bảng Kanban riêng rẽ cho từng Feature Team (VD: `Platform`, `Connectors`, `Quant`), giữ cùng card model với ART View nhưng filter theo team/assignee.
- **PI Planning Interactive UI:** Không gian tương tác cho lễ PI Planning. Bao gồm **Strategic Sandbox** (kéo thả rủi ro/bài toán để tính Capacity), **Business Value Scoring**, **ROAM Board** để xử lý rủi ro, và phím bấm **[Confidence Vote]** bắt buộc từ Human trước khi khởi chạy Sprint.

### 3.1. Portfolio View (Executive Dashboard)
Route: `/portfolio`

- **Executive Portfolio Table:** Bảng hiển thị thông tin cấp độ Epic, bao gồm `Epic ID`, `owner`, thanh tiến độ (`progress bar`), `budget`, `status badge`, và `forecast`.
- **Roadmap:** Kế hoạch phân chia theo quý (Q1/Q2/Q3 2026).
- **Data Source:** `GET /api/portfolio/epics`, `GET /api/tasks?issue_type=epic`. Ngân sách (budget) và roadmap được truy xuất từ first-class PM columns và các nhãn (labels).

```text
┌─────────────────┐     ┌─────────────────┐
│ Portfolio Table │     │ Roadmap         │
│ epic owner      │     │ q1 q2 q3        │
│ progress budget │     │ milestones      │
│ status forecast │     │ risk markers    │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └────────executive drilldown───────┐
                                            ▼
                                   ┌─────────────────┐
                                   │ Epic Detail     │
                                   │ blocked tasks   │
                                   │ budget notes    │
                                   └─────────────────┘
```

### 3.2. PI Planning Interactive UI
Route: `/pi-planning`

- **Strategic Sandbox:** Khu vực kéo thả (drag/drop) 2 cột sử dụng thư viện `@hello-pangea/dnd` để phân bổ capacity.
- **Scoring & Voting:** Chấm điểm Business Value Scoring và Confidence Vote 1-5. Nút **[Confidence Vote]** bắt buộc từ Human trước khi khởi chạy Sprint.
- **ROAM Board:** Phân tích và giải quyết rủi ro theo chuẩn ROAM (Resolved, Owned, Accepted, Mitigated, Unassigned).
- **Data Source:** `GET /api/pi/features`, `PUT /api/pi/plan`, `GET /api/risks?view=roam`, `POST /api/pi/confidence-vote`.

```text
┌─────────────────┐     ┌─────────────────┐
│ Strategic Pool  │────>│ Capacity Plan   │
│ features risks  │     │ team load       │
│ drag source     │     │ sprint slots    │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Value Scoring   │     │ Confidence Vote │
│ business value  │     │ score 1 to 5    │
│ priority        │     │ human required  │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └──────────┬────────────┘
                    ▼
            ┌─────────────────┐
            │ ROAM Board      │
            │ resolved owned  │
            │ accepted mitig  │
            └─────────────────┘
```

### 3.3. SAFe Board / Kanban View

<!-- beads-id: br-prd04-s3.3 -->

Route: `/board`
Showcase: `/design-system/kanban` (`ds:screen:kanban-001`)

- **Board Selector:** Hash routes `#sprint`, `#release`, `#bug-triage` chọn board hiện tại mà không mất Global Shell state.
- **Card Model:** Mỗi card hiển thị Beads ID, title, owner/assignee avatar, priority, RTE escalation badge nếu có, QA status, linked PRD/Plan chips, và blocked/dependency marker.
- **Drag/drop:** Kéo card giữa columns gọi `PUT /api/tasks/:id/status`; UI optimistic update nhưng rollback nếu backend trả conflict hoặc policy violation.
- **WIP Policy:** Column header hiển thị WIP limit badge; khi vượt WIP, badge chuyển critical và drop vào column đó bị chặn nếu policy `hard_limit=true`.
- **Stats Strip:** Hiển thị total/done/progress/blocked theo board, tính từ `GET /api/tasks?view=board&board=<id>`.

```text
┌───────────────┐     ┌───────────────────────────────────────┐
│ Board Select  │────>│ Kanban Columns                        │
│ sprint        │     │ todo | in progress | review | done    │
│ release       │     │ wip  | wip badge   | wip    | stats   │
│ bug triage    │     │ drag cards with policy checks         │
└───────────────┘     └───────────────────┬───────────────────┘
                                          │ click or drop
                                          ▼
                                  ┌───────────────┐
                                  │ Task Card     │
                                  │ beads owner   │
                                  │ prd qa rte    │
                                  └───────────────┘
```

### 3.4. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Hiển thị các bảng Kanban, Portfolio, hoặc PI Sandbox với dữ liệu đầy đủ, hỗ trợ tương tác mượt mà. |
| **Loading** | Hiển thị skeleton loaders cho các thẻ công việc, bảng điều khiển và danh sách. |
| **Empty** | Hiển thị "Chưa có dự án/task" kèm nút CTA để tạo mới. |
| **Error** | Hiển thị thông báo "Không thể tải dữ liệu Board" kèm nút "Thử lại". |
| **Offline** | Hiển thị banner Offline, vô hiệu hóa các tính năng kéo thả (drag/drop) để tránh lỗi sync. |
| **Forbidden** | Người dùng không đủ quyền truy cập (vd: xem Budget trên Portfolio). |

**Breakpoints (Responsive):**
- **Desktop (≥ 1024px):** Hiển thị đầy đủ các cột Kanban ngang (Kanban Board) và PI Planning Sandbox.
- **Tablet (768px - 1023px):** Thu hẹp các cột Kanban, cho phép trượt ngang (horizontal scroll).
- **Mobile (< 768px):** Hiển thị dạng List view dọc thay vì Kanban ngang, các thẻ công việc xếp chồng lên nhau. PI Planning Sandbox sẽ chuyển sang dạng accordion.

### 3.5. User Journeys

- **Journey 1 (Board Navigation):** User truy cập `/board` -> Chọn ART View -> Kéo thả (Drag & Drop) một task card từ 'Todo' sang 'In Progress' -> Cập nhật trạng thái thành công.
- **Journey 2 (PI Planning Vote):** User mở thẻ PI Planning -> Xem danh sách rủi ro (ROAM) -> Click nút [Confidence Vote] -> Xác nhận lựa chọn -> Ghi nhận kết quả vote.
- **Journey 3 (Portfolio Review):** CEO truy cập `/portfolio` -> Xem tổng quan ngân sách và tiến độ Epic -> Phát hiện Epic bị chậm tiến độ (màu vàng/đỏ) -> Click vào Epic để truy xuất danh sách blocked tasks.

## 4. Cổng Phê duyệt Cấp 3 (Level 3 Approval Gates) & Không gian Phê duyệt

<!-- beads-id: br-prd04-s4 -->

Giao diện chặn (Checkpoint) yêu cầu **Bắt buộc Phê duyệt bởi Con người** khi:

1.  **Chuyển Phase (Phase Boundaries):** Từ Planning (Continuous Exploration) sang Execution (Continuous Integration), hoặc qua Release.
2.  **The Ultimate Approval Panel:** Khi Agent đệ trình PR hoặc Task, Web UI gọp chung 5 luồng dữ liệu vào một màn hình duy nhất để Human xem xét: `Test Result (Từ Zvec QA Log)` + `Code Diff (FastCode/Git)` + `Beads ID (br-xxx)` + `PRD Requirements liên kết` + `GitHub PR & CI Status (từ gh CLI)`.

**Showcase/Core contract:** `/design-system/approval` (`ds:screen:approval-001`) chuẩn hóa route `/approval`. Màn hình phải có toggles `pending`/`approved`/`rejected`, escalated badge, evidence blocks Tests/Diff/Beads ID/PRD/CI, RTM matrix, Coverage Heatmap, và hash anchors `#panels`, `#rtm`, `#heatmap`. Core WebUI lấy danh sách queue bằng `GET /api/tasks?status=pending-approval`, evidence bằng `GET /api/approval/:id/evidence`, coverage bằng `GET /api/coverage`, và ghi quyết định bằng `POST /api/approval/:id/decision`.

**Decision controls:** [Approve] chỉ enabled khi required evidence hợp lệ hoặc user có quyền Admin override với audit reason. [Reject] luôn yêu cầu reason. [Request Changes] tạo activity event gắn với task/PR và chuyển task về trạng thái `changes-requested` hoặc policy tương đương.

### 4.0. Layout — Approval Gates Screen

<!-- beads-id: br-prd04-s4.0 -->

```text
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Queue Panel   │   │ Evidence Hub  │   │ Decision Box  │
│ pending       │   │ tests diff    │   │ approve       │
│ approved      │   │ prd ci rtm    │   │ reject        │
│ rejected      │   │ heatmap       │   │ request       │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └──────────select task and evidence─────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Audit Receipt │
                    │ actor time    │
                    │ reason link   │
                    └───────────────┘
```

### 4.1. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Hiển thị Panel phê duyệt với 5 luồng evidence do Go REST API tổng hợp (Test, Code Diff, Beads ID, PRD, GitHub PR/CI). |
| **Loading** | Skeleton loaders trong quá trình aggregate dữ liệu từ nhiều nguồn. |
| **Insufficient Evidence** | Nếu test logs thiếu, đang lỗi, hoặc bất kỳ luồng evidence bắt buộc nào chưa có trạng thái hợp lệ, nút [Approve] bị disabled, có tooltip/lý do ngắn và CTA "Refresh evidence"; [Reject] vẫn khả dụng nếu có quyền. |
| **Empty** | "Không có yêu cầu phê duyệt nào đang chờ"; toggle approved/rejected vẫn cho phép xem lịch sử nếu user có quyền. |
| **Decision Submitted** | Sau approve/reject/request-changes, panel chuyển sang receipt state với decision ID, actor, timestamp, audit reason/comment, và link về task/PR. |
| **Error** | "Lỗi kết nối đến dịch vụ CI/CD hoặc GitHub"; [Approve] disabled trừ khi Admin chọn luồng "Bỏ qua & Phê duyệt thủ công" có audit reason. |

**Breakpoints (Responsive):**
- **Desktop (≥ 1024px):** Split-view: Bên trái là luồng dữ liệu (Diff, Test logs), bên phải là PRD context và nút Phê duyệt.
- **Tablet (768px - 1023px) & Mobile (< 768px):** Stack dọc: PRD context ở trên, tiếp đến là luồng dữ liệu, và nút Phê duyệt cố định ở bottom-bar.

### 4.2. User Journeys

- **Journey 1 (Review & Approve):** User mở The Ultimate Approval Panel -> Cuộn qua Code Diff và Test Results -> Kiểm tra PRD Coverage -> Click [Approve] khi đủ evidence -> Điền comment xác nhận -> Hệ thống tự động merge nhánh và close task.
- **Journey 2 (Insufficient Evidence):** User mở Panel -> Thấy Test Logs hoặc GitHub PR/CI chưa đủ -> [Approve] disabled với lý do cụ thể -> Click "Refresh evidence" hoặc [Reject] để trả feedback.
- **Journey 3 (Review & Reject):** User mở Panel -> Phát hiện Test Failed (màu đỏ) -> Click [Reject] -> Hệ thống yêu cầu điền lý do -> Push feedback về Task/PR tương ứng.

## 5. Đồ thị Tài liệu & Lịch sử HITL (Human-in-the-Loop Document Graph)

<!-- beads-id: br-prd04-s5 -->

> Phần này mô tả **panel nhúng** (embedded widget) trong các trang khác (Dashboard §6 Panel 3, Task Detail §11 tab Graph). Để xem đặc tả **trang đồ thị toàn trang** (full-page explorer), xem §10 Beads Trace Explorer.

### 5.0. Layout Tổng quan — Document Graph Widget

```text
┌──────────────────────────────────────────────────────────────┐
│  Document Graph Widget (Nhúng trong RTM Dashboard Panel 3   │
│  hoặc Task Detail → Tab Graph)                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────────────┐  │
│  │  Graph Canvas         │  │  Side Panel (Chi tiết Node)  │  │
│  │                       │  │                              │  │
│  │  [D3.js force-        │  │  Tiêu đề: <Node Title>       │  │
│  │   directed graph]     │  │  Loại: PRD / Plan / Task /   │  │
│  │                       │  │    Commit / PR / Chat        │  │
│  │   ● PRD section       │  │  Status: ● Done / In Prog    │  │
│  │   ◆ Plan element     │  │  ─────────────────────        │  │
│  │   ■ Task/Issue       │  │  [Chi tiết theo loại node:]   │  │
│  │   ○ Commit            │  │                              │  │
│  │   ▲ Chat/Meeting      │  │  • PRD: section text excerpt │  │
│  │   ⬡ PR/CI            │  │  • Task: assignee, priority  │  │
│  │                       │  │  • Commit: message, author   │  │
│  │  Zoom/Pan controls    │  │  • PR: CI status, reviewers  │  │
│  │  Filter: [Type ▼]     │  │  • Chat: last message preview│  │
│  │                       │  │                              │  │
│  │  [Open Full Page ↗]   │  │  [Mở chi tiết ↗] (link to   │  │
│  │                       │  │   §10 Trace Explorer)        │  │
│  └──────────────────────┘  └──────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 5.1. Các tính năng chính

- **Document Tree & Commit Lineage:** Hiển thị lịch sử thay đổi của tài liệu qua `Beads-ID:` Git Trailer và thuộc tính `beads ID`; browser chỉ nhận dữ liệu đã tổng hợp từ Go REST API, backend mới được phép truy vấn local git.
- **Knowledge Context Linking:** Trỏ ngược từ Requirement sang Research references đã được AI dùng làm Context.
- **GitHub Enrichment:** Mỗi Beads task hiển thị linked PRs, CI status, và commit history do backend/API tổng hợp qua `gmind serve`; UI không gọi trực tiếp local git, GitHub `gh`, FastCode, CLI, FrankenSQLite, hoặc Zvec.
- **Requirements Traceability Matrix (RTM):** Hiển thị liên kết **PRD Section ↔ Plan Element ↔ Task** qua `satisfies:` / `implements:`; cho phép truy vết xuôi và ngược. Xem PRD-02 §3.
- **Coverage Heatmap:** Dashboard hiển thị mức độ cover của từng PRD section và highlight gaps bằng màu đỏ. Dữ liệu qua `GET /api/coverage`.
- **Impact Analysis View:** Khi Human sửa PRD section, hiển thị cascading impact tới Plan elements, Tasks, Commits liên quan. Dữ liệu qua `GET /api/impact/:section`.

### 5.2. Side Panel — Nội dung theo Loại Node

| Loại Node | Trường hiển thị trong Side Panel |
| --- | --- |
| **PRD Section** | Tiêu đề section, Beads ID, nội dung excerpt (200 chars), coverage %, danh sách Plan elements liên kết |
| **Plan Element** | Tiêu đề, Beads ID, `satisfies:` PRD links, status, danh sách Tasks liên kết |
| **Task/Issue** | Title, status badge, priority, assignee, QA status, `implements:` Plan link |
| **Commit** | Message, author, date, files changed count, link to PR (nếu có) |
| **PR** | Title, status (open/merged/closed), CI status (✅/❌), reviewer list |
| **Chat/Meeting** | Last message preview (100 chars), participant count, timestamp |
| **RTE Approval** | Risk description, decision text, approved by, constraints list |

### 5.3. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Cây đồ thị render toàn bộ node và edge (PRD, Plan, Task, Commit) rõ ràng và tương tác được. |
| **Loading** | Hiển thị layout-matched skeleton cho graph canvas và side panel, kèm progress text ngắn như "Đang tải đồ thị..."; không dùng standalone centered spinner. |
| **Empty** | "Chưa có liên kết tài liệu hoặc biểu đồ trống" kèm theo lời khuyên "Bắt đầu link PRD với Tasks". |
| **Error** | "Lỗi truy xuất đồ thị từ gmind" với nút "Tải lại đồ thị". |

**Breakpoints (Responsive):**
- **Desktop (≥ 1024px):** Hiển thị Đồ thị ở vùng trung tâm lớn, Side Panel chứa chi tiết node ở bên phải, Panel điều hướng/tùy chọn (Zoom/Filter) ở góc màn hình.
- **Tablet (768px - 1023px):** Side Panel hiển thị dưới dạng bottom sheet hoặc overlay nhẹ để tiết kiệm diện tích biểu đồ.
- **Mobile (< 768px):** Không khuyến khích dùng đồ thị phức tạp. Thay thế bằng danh sách Tree-view thu gọn (collapsible list) hoặc đồ thị đơn giản hỗ trợ pinch-to-zoom và pan (vuốt, thu phóng).

## 6. RTM Dashboard — 4-Panel Requirements Visibility

<!-- beads-id: br-prd04-s6 -->

> ✅ **Nghiên cứu đã được chấp nhận (2026-03-02 → 2026-03-13):** Nội dung từ [spike-webui-rtm-dashboard.md](../../researches/spikes/spike-webui-rtm-dashboard.md) đã được merge vào PRD làm yêu cầu chính thức.

### 6.1. Dashboard Layout — 4 Panels

**Route:** `/` (Dashboard chính)

**Global Components:**
- **Top Navigation:** Chứa Logo, các links điều hướng (Dashboard, Tasks, Reports), và User Avatar.
- **KPI Cards Row:** Hiển thị list 3 thẻ chỉ số tổng quan đặt phía trên các panels (Coverage %, Tasks Done, Gaps Found).

```text
┌──────────────────────────────────────────────────────────────┐
│  gmind Web UI — RTM Dashboard                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────┐ ┌────────────────────────────┐  │
│  │  Panel 1:               │ │  Panel 2:                  │  │
│  │  Coverage Heatmap       │ │  Task Progress             │  │
│  │                         │ │                            │  │
│  │  PRD-01 [====90%====]   │ │  Total: 142 tasks          │  │
│  │  PRD-02 [===75%===..]   │ │  Done: 98 (69%)            │  │
│  │  PRD-03 [==60%==....]   │ │  In Progress: 24 (17%)     │  │
│  │                         │ │  Blocked: 8 (6%)           │  │
│  │  Section drill-down:    │ │  Not Started: 12 (8%)      │  │
│  │  s1.1 [====100%====]    │ │                            │  │
│  │  s1.2 [===80%===...]    │ │  [Gantt-like timeline]     │  │
│  │  s1.3 [=40%=........]   │ │                            │  │
│  │                         │ │                            │  │
│  └─────────────────────────┘ └────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────┐ ┌────────────────────────────┐  │
│  │  Panel 3:               │ │  Panel 4:                  │  │
│  │  Knowledge Graph        │ │  Gap Analysis              │  │
│  │                         │ │                            │  │
│  │  [Interactive graph]    │ │  Gaps Found: 5             │  │
│  │                         │ │                            │  │
│  │  PRD -> Plan -> Task    │ │  ! PRD-02 s3.4: no plan    │  │
│  │   |      |       |      │ │  ! PRD-03 s2.1: no tasks   │  │
│  │   +Docs  +Code   +CI    │ │  ! Plan-15: no PRD link    │  │
│  │                         │ │  ! bd-a1: blocked 5 days   │  │
│  │  Click node -> details  │ │  ! bd-c3: no unit tests    │  │
│  │                         │ │                            │  │
│  └─────────────────────────┘ └────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 6.2. Panel Details (Đặc tả chi tiết từng Panel)

**Panel 1: Coverage Heatmap**

| Feature       | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| Data source   | `gmind coverage --json`                                            |
| Visualization | Horizontal bars, color-coded (green=90%+, yellow=60-89%, red=<60%) |
| Interaction   | Click PRD → expand sections (click lại để collapse), click section → show linked tasks ở side panel (side panel đóng bằng nút X hoặc click outside) |
| Refresh       | Auto-refresh every 60s hoặc manual                                 |

**Panel 2: Task Progress**

| Feature       | Description                             |
| ------------- | --------------------------------------- |
| Data source   | `br list --json` (FrankenSQLite issues) |
| Visualization | Pie chart + progress bars + timeline    |
| Grouping      | By PRD, by Plan, by status, by assignee |
| Interaction   | Click status → filter tasks list        |

**Panel 3: Knowledge Graph (Interactive)**

| Feature       | Description                                             |
| ------------- | ------------------------------------------------------- |
| Data source   | `GET /api/trace/:id?depth=full`                         |
| Visualization | Force-directed graph (D3.js)                            |
| Node types    | PRD (blue), Plan (green), Task (yellow), Commit (gray)  |
| Edge types    | satisfies (solid), implements (dashed), committed-for   |
| Interaction   | Click node → side panel with details, drag to rearrange |

**Panel 4: Gap Analysis**

| Feature       | Description                                            |
| ------------- | ------------------------------------------------------ |
| Data source   | `gmind gaps --json`                                    |
| Visualization | List view with severity icons                          |
| Gap types     | Missing plan, missing tasks, blocked tasks, no tests   |
| Interaction   | Click gap → navigate to source, action button "Create" (Mở modal "Create Plan") |

### 6.3. API Layer — REST Endpoints (`gmind serve`)

| Endpoint                   | gmind Command              | Response Format |
| -------------------------- | -------------------------- | --------------- |
| `GET /api/coverage`        | `gmind coverage --json`    | JSON            |
| `GET /api/gaps`            | `gmind gaps --json`        | JSON            |
| `GET /api/trace/:id`       | `gmind trace <id> --json`  | JSON            |
| `GET /api/impact/:section` | `gmind impact <id> --json` | JSON            |
| `GET /api/tasks`           | `br list --json`           | JSON            |
| `GET /api/tasks/:id`       | `br show <id> --json`      | JSON            |

**Implementation Architecture:**

```text
┌──────────────────────────────────────────────────────────────┐
│  gmind serve --port 8080                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Go HTTP Server (net/http hoặc chi)                          │
│  ├── /api/coverage  → exec gmind coverage --json             │
│  ├── /api/gaps      → exec gmind gaps --json                 │
│  ├── /api/trace/:id → exec gmind trace <id> --json           │
│  ├── /api/impact/:s → exec gmind impact <s> --json           │
│  └── /static/       → serve Web UI (embedded assets)         │
│                                                              │
│  Frontend: Single-page app                                   │
│  ├── Framework: Vanilla JS + D3.js (graph visualization)     │
│  ├── Style: Dark theme, premium design                       │
│  ├── Layout: 4-panel dashboard (responsive grid)             │
│  └── Build: Embedded in Go binary via embed.FS               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 6.4. Technology Stack

| Layer     | Tech                    | Lý do                               |
| --------- | ----------------------- | ----------------------------------- |
| Backend   | Go (gmind serve)        | Reuse gmind CLI, single binary      |
| API       | REST JSON               | Simple, curl-friendly               |
| Frontend  | Vanilla JS              | No build step, embed in Go binary   |
| Graph Viz | D3.js force-directed    | Industry standard, flexible         |
| Charts    | Chart.js hoặc D3.js     | Lightweight, responsive             |
| Styling   | CSS custom (dark theme) | Premium feel, consistent with gmind |
| Embedding | Go embed.FS             | Single binary distribution          |

### 6.5. Graph Node & Edge Design

```text
┌──────────────────────────────────────────────────────────────┐
│  Graph Node Types                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PRD Section     →  Blue circle, size=large                  │
│  Plan Element    →  Green diamond, size=medium               │
│  Task/Issue      →  Yellow square, size based on status      │
│  Commit          →  Gray dot, size=small                     │
│  Chat/Meeting    →  Purple triangle, size=small              │
│  PR              →  Cyan hexagon, size=medium                │
│  CI Run          →  Orange star, size=small                  │
│                                                              │
│  Edge rendering:                                             │
│  satisfies       →  Solid line, arrow up                     │
│  implements      →  Dashed line, arrow up                    │
│  committed-for   →  Dotted line, arrow right                 │
│  discussed-in    →  Wavy line, bidirectional                 │
│  blocks          →  Red solid, arrow                         │
│                                                              │
│  Status colors:                                              │
│  Done            →  Green fill                               │
│  In Progress     →  Yellow fill                              │
│  Blocked         →  Red fill + pulse animation               │
│  Not Started     →  Gray outline only                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 6.6. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Hiển thị đầy đủ 4 panels với data thực tế. |
| **Loading** | Hiển thị skeleton loaders cho các panels; graph dùng layout-matched skeleton canvas + progress messaging, không dùng centered spinner-only UI. |
| **Empty** | Khi không có dữ liệu, hiển thị illustration "Chưa có dữ liệu theo dõi" kèm nút "Hướng dẫn". |
| **Error** | Hiển thị banner lỗi "Không thể kết nối đến gmind serve" kèm nút "Thử lại". |

**Breakpoints (Responsive):**
- **Desktop (≥ 1024px):** Layout hiển thị 2x2 grid (4 panels).
- **Tablet (768px - 1023px):** Stack 2 grid dọc (2x1 hoăc 1x1 tuỳ kích thước).
- **Mobile (< 768px):** Từng panel xếp dọc (1 cột), graph cho phép pan/zoom bằng touch.

### 6.7. Khả năng Tiếp cận (Accessibility)
- **Tiêu chuẩn:** Tuân thủ WCAG AA.
- **Bắt buộc:** Hỗ trợ điều hướng bằng bàn phím (keyboard navigation) cho toàn bộ 4 panels.
- **Focus:** Cần hiển thị rõ focus outline cho các yếu tố tương tác.

### 6.8. User Journeys

- **Journey 1 (Coverage Drilling):** Người dùng mở RTM Dashboard -> Xem Panel 1 (Coverage Heatmap) -> Nhấp vào PRD có coverage thấp (ví dụ: đỏ) -> Mở rộng để xem các section bên trong -> Nhấp vào một section -> Side panel hiện ra danh sách các task liên kết chưa hoàn thành.
- **Journey 2 (Gap Resolution):** Người dùng xem Panel 4 (Gap Analysis) -> Phát hiện cảnh báo "Missing plan" -> Nhấp vào nút "Create" -> Modal "Create Plan" bật lên -> Điền thông tin plan và lưu -> Dashboard tự động tải lại và gap biến mất.
- **Journey 3 (Impact Traceability):** Người dùng tương tác với Panel 3 (Knowledge Graph) -> Chọn một node PRD -> Xem chi tiết ở side panel -> Kéo thả các node liên kết để phân tích luồng ảnh hưởng (Impact) từ PRD sang Code và Test.

## 7. RTE Approval — UI Integration

<!-- beads-id: br-prd04-s7 -->

> ✅ **Nghiên cứu đã được chấp nhận (2026-03-02 → 2026-03-13):** Nội dung từ [spike-rte-approval-workflow.md](../../researches/spikes/spike-rte-approval-workflow.md) đã được merge. Phần CLI commands nằm tại PRD-03 §4. Phần UI integration đặc tả dưới đây.

Khi Agent escalate rủi ro, Web UI cần hiển thị **RTE Approval Panel** trong Document Graph (§5) và Board Views (§3):

- **Escalation Badge:** Task card/list row hiển thị component `rte_escalation_badge` khi `rte_status = 'escalated'`; badge có text `RTE:ESCALATED`, variant critical, visible label (không chỉ màu), aria-label mô tả rủi ro, và click mở RTE drawer/thread. Khi `rte_status = 'discussing'` badge đổi `RTE:DISCUSSING`; khi `approved`/`rejected` badge chuyển sang trạng thái resolved và không dùng pulse critical.
- **Discussion Thread View:** Click task → expand panel hiển thị conversation thread từ API (`GET /api/tasks/:id/activity` hoặc `GET /api/docs?source_type=rte-discussion&beads_id=<task-id>`), backend lọc Zvec theo `source_type: rte-discussion`, `beads_ids: [<task-id>]`.
- **Approval Context Display:** Khi `rte_status = 'approved'`, hiển thị **Execution Context block** với:
  - Risk description gốc
  - Decision text (from `rte_resolution`)
  - Constraints list
  - Approved by + timestamp (`rte_approved_by`, `rte_approved_at`)
- **Impact Indicator:** Nếu RTE decision ảnh hưởng PRD scope → highlight PRD section liên quan trên Coverage Heatmap

### 7.1. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Hiển thị Conversation thread và Execution Context block rõ ràng. |
| **Loading** | Skeleton UI cho các tin nhắn trong thread. |
| **Empty** | "Chưa có thảo luận RTE nào cho Task này." |
| **Error** | "Không thể tải lịch sử thảo luận RTE." |

**Breakpoints:**
- **Desktop/Tablet:** Discussion Thread hiển thị dưới dạng Side Panel mở rộng từ bên phải (Right Drawer) khi click vào Task.
- **Mobile:** Side Panel sẽ phủ toàn màn hình (Full-screen overlay) có nút "Close" ở góc trên.

### 7.2. User Journeys

- **Journey 1 (Review Escalated Risk):** PM/RTE nhận thông báo rủi ro qua hệ thống -> Truy cập Task board -> Thấy badge `RTE:ESCALATED` màu đỏ trên một thẻ -> Nhấp vào thẻ -> Right Drawer mở ra hiển thị "Discussion Thread View" giữa Agent và hệ thống -> RTE đọc bối cảnh.
- **Journey 2 (Approve Escalation):** Sau khi đọc "Discussion Thread View" -> RTE nhập phương án giải quyết vào ô thảo luận -> Nhấn nút [Approve Resolution] -> Cột `rte_status` chuyển thành 'approved' -> "Execution Context block" xuất hiện với Decision text và thông tin người phê duyệt -> Heatmap coverage được highlight (nếu có ảnh hưởng).
- **Journey 3 (Reject Escalation):** RTE đọc luồng thảo luận và thấy rủi ro không hợp lệ -> RTE nhập lý do từ chối -> Nhấn nút [Reject] -> Task được đẩy lại cho Agent kèm theo hướng dẫn xử lý tiếp theo.

## 8. Điều hướng & Bản đồ Route (Navigation & Route Map)

<!-- beads-id: br-prd04-s8 -->

> **Data source:** Tất cả routes phục vụ bởi `gmind serve` (PRD-03). Frontend là SPA (Single Page Application) với client-side routing, embed qua `embed.FS`.

### 8.1. Route Map Tái dựng từ Showcase Website Coverage

Các route dưới đây là Hi-Fi showcase chạy trong `apps/website`, dùng để chuẩn hóa UI/UX trước khi đưa vào Core WebUI qua `gmind serve`. Route map không tách riêng showcase và Core: mỗi dòng phải nêu rõ showcase URL, DS identity, interaction contract, và data flow tương ứng trong Core WebUI.

**Quy tắc bắt buộc cho mọi route:** giữ nguyên icon, route path, hash navigation, state matrix, `DsIdBadge`/`data-ds-id`, keyboard interaction, offline/forbidden handling, và interaction model như implementation showcase hiện tại. Browser chỉ consume Go REST API; mọi truy cập FrankenSQLite, Zvec, local git, GitHub `gh`, FastCode, CI, hoặc shell phải được backend tổng hợp.

| Showcase URL | Icon / DS ID | Core Route(s) | UI/UX bắt buộc | Data flow tương ứng trong Core WebUI |
| --- | --- | --- | --- | --- |
| `/design-system/terminal` | 💻 `ds:screen:terminal-001` | `/terminal` | Terminal scenario tabs: Agent Console, Deploy, Debug, CI/CD; terminal line types `command`/`output`/`success`/`error`; 2x2 Mosaic Layout cho Claude-01 Storage, Claude-02 CLI, Claude-03 CI, QA-Reviewer; states loading/empty/error/offline/forbidden. | Showcase dùng static terminal lines; Core dùng `GET /api/agents/sessions`, `GET /api/ci/runs`, `GET /api/tasks/:id/activity`, stream log events qua API, không gọi shell trực tiếp từ browser. |
| `/design-system/portfolio` | 📈 `br-ds-portfolio-view` | `/portfolio` | Executive Portfolio table gồm Epic ID, owner, progress bar, budget, status badge, forecast; Roadmap Kế hoạch chia Q1/Q2/Q3 2026; states loading/empty/error/offline/forbidden. | Showcase dùng static `portfolios`; Core dùng `GET /api/portfolio/epics`, `GET /api/tasks?issue_type=epic`, budget/roadmap từ first-class PM columns và labels. |
| `/design-system/pi-planning` | 🎯 `br-ds-pi-planning` | `/pi-planning` | PI Planning Sandbox 2 cột: Strategic Sandbox drag/drop capacity bằng `@hello-pangea/dnd`, Business Value Scoring, Confidence Vote 1-5, ROAM Board rủi ro Resolved/Owned/Accepted/Mitigated/Unassigned. | Showcase dùng local React state; Core dùng `GET /api/pi/features`, `PUT /api/pi/plan`, `GET /api/risks?view=roam`, `POST /api/pi/confidence-vote`. |
| `/design-system/git-graph` | 🌿 `ds:screen:git-graph-001` | `/git-graph` | Hash-selected scenarios: `gitflow`, `multi-agent`, `hotfix`, `release-train`, `monorepo`, `beads-prd-trace`, `beads-deadlock`, `beads-ds-comp`, `beads-traversal`, `beads-sprint-review`; render branches/commits/connections, branch tags, stats. | Showcase dùng `gitScenarios`; Core dùng Go API aggregation from local git + Beads trailers: `GET /api/git/graph?scenario=<id>` and `GET /api/trace/:id?include=git`. |
| `/design-system/kanban` | 📋 `ds:screen:kanban-001` | `/board` | Board selector hash routes `sprint`/`release`/`bug-triage`; drag/drop cards with WIP limit badges; stats total/done/progress; states loading/empty/error/offline/forbidden. | Showcase dùng `kanbanBoards`; Core dùng `GET /api/tasks?view=board&board=<id>`, `PUT /api/tasks/:id/status`, WIP từ policy config/labels. |
| `/design-system/knowledge-graph` | 🧠 `ds:screen:knowledge-graph-001` | `/knowledge-graph`, `/trace/:id` | Sigma.js/Graphology viewer loaded client-only; presets `simple`/`ecosystem`/`sprint` qua hash; selected-node banner, node/edge legends, stats; states loading/empty/error/offline/forbidden. | Showcase dùng graph presets; Core dùng Graph Assembler `GET /api/trace/:id?depth=full` and `GET /api/graph/presets`, enriched from FrankenSQLite, Zvec, git, GitHub, FastCode. |
| `/design-system/approval` | ✅ `ds:screen:approval-001` | `/approval`, `/tasks/:id#approval` | Approval Panels with pending/approved/rejected toggles; escalated badge; evidence blocks Tests, Diff, Beads ID, PRD, CI; RTM matrix; Coverage Heatmap; hash anchors `panels`/`rtm`/`heatmap`. | Showcase dùng `approvalPanels`, `rtmRows`, heatmap data; Core dùng `GET /api/tasks?status=pending-approval`, `GET /api/coverage`, `GET /api/approval/:id/evidence`, `POST /api/approval/:id/decision`. |
| `/design-system/timeline` | 📅 `ds:screen:timeline-001` | `/timeline`, `/tasks/:id#activity` | File Lease indicators unlocked/locked/expiring/expired, Activity Feed, Sprint Day timeline; hash anchors `file-lease`/`activity-feed`/`sprint-day`; states loading/empty/error/offline/forbidden. | Showcase dùng static activity arrays; Core dùng `GET /api/activity`, `GET /api/file-leases`, `GET /api/tasks/:id/activity`, polling events table every 3-5s. |
| `/design-system/components` | 🧩 `ds:screen:components-001` | Shared components | Components Catalog đủ 18 sections: Buttons, Badges/Status, Progress, Avatar Stack, Modal, Dropdown, Accordion, Tab Panel, Data Table, Tooltip, Code Block, Cards, Prompt Card, Section Labels, Status Dots, Skeleton, Empty State, Error Banner; hash scroll and interactive examples. | Showcase dùng `componentSections`; Core treats these as shared primitives/tokens. Every production screen must compose these states/components instead of one-off styling. |
| `/design-system/doc-viewer` | 📄 `ds:screen:doc-viewer-001` | `/docs`, `/docs/:id` | GitHub-like file tree, expandable folders, selected document panel, Beads ID badges, section status covered/partial/gap, links to Explorer and Knowledge Graph; states loading/empty/error/offline/forbidden. | Showcase uses `docTree`/`docContents`; Core uses `GET /api/docs?group=source_type`, `GET /api/docs/:id`, Beads regex auto-link to `/trace/:id`. |
| `/design-system/explorer` | 🔍 `ds:screen:explorer-001` | `/search` | Unified search with query input, type filters `all`/`doc`/`commit`/`task`/`adr`/`chat`/`spike`, result list, detail sidebar, cross-links to Knowledge Graph, Beads Traversal, Doc Viewer; hash selects filter. | Showcase uses `explorerItems`; Core uses `GET /api/search?q=<query>&type=<type>` backed by Zvec, FrankenSQLite, FastCode. |
| `/design-system/beads-traversal` | 🔗 `ds:screen:beads-traversal-001` | `/trace/:id`, `/trace/:id?mode=dag` | Layered DAG PRD Sections → Plan Elements → Tasks → Commits; forward/reverse direction toggle; selected/linked node highlighting; detail sidebar with parent/children links; legends and stats; hash scroll by layer. | Showcase uses `beadsNodes`/`beadsEdges`; Core uses `GET /api/trace/:id?depth=full` and graph edge types `satisfies`, `implements`, `committed-for`. |
| `/design-system/storyboard` | 🗺️ `ds:screen:storyboard-001` | `/storyboards` | Journey filter, horizontal use-case flow nodes, Guidance Panel with Mechanism & Action, Considerations, Investigating, CTA to real screen. | Showcase uses `usecases`; Core uses PRD-derived storyboards from Ralph Loop artifacts and E2E alignment metadata via `GET /api/storyboards`. |
| `/design-system/storyboard/:id` | 🗺️ `ds:screen:storyboard-detail-001` | `/storyboards/:id` | Dynamic detail route shows role, journey, step timeline, related usecases, expected state names, and CTA to the corresponding Core route. | Showcase uses selected `usecase`; Core uses `GET /api/storyboards/:id` with screen-path alignment metadata. |
| `/design-system/webui-pm-workspace` | 🧭 `ds:global_shell` | `/`, `/board`, `/tasks`, `/tasks/:id`, `/trace/:id`, `/docs`, `/approval`, `/search` | Integrated PM Workspace shell: header logo/search/offline indicator, active surfaces RTM Dashboard, SAFe Board, Task List, Task Detail, Trace Explorer, Doc Viewer, Approval Gates, Search Results; each surface carries stable `data-screen-id` and `data-ds-id`. In showcase mode, the workspace sidebar is merged with the global Design System layout sidebar. | Showcase is the Ralph Loop Hi-Fi composite; Core maps the same surfaces through `gmind serve` routes and preserves shell state across navigation. |

**Showcase sidebar & navigation rules:** Sidebar categories must match implementation (**Design System**, **Screens**, **Explorer**, **Storyboard**). In showcase mode, PM Workspace surfaces are reached via hash-based sub-items on the main showcase sidebar (for example `/design-system/webui-pm-workspace#surface-rtm-dashboard`) rather than a second inner sidebar. Global keyboard behavior must dispatch Escape handling for modals/dropdowns through the shared keyboard hook.

**Route family layout:**

```text
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Shell         │     │ Work Screens  │     │ Detail Views  │
│ webui pm      │     │ board tasks   │     │ task trace    │
│ search docs   │     │ approval rtm  │     │ docs story    │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Evidence      │     │ Planning      │     │ Showcase Only │
│ terminal git  │     │ portfolio pi  │     │ components    │
│ timeline graph│     │ kanban roam   │     │ ds tokens     │
└───────────────┘     └───────────────┘     └───────────────┘
```

**Components catalog layout (`/design-system/components`):** Production screens must reuse the catalog primitives instead of inventing one-off styles. The catalog must keep 18 anchored sections and expose interactive examples for component states.

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Inputs          │     │ Display         │     │ Feedback        │
│ buttons dropdown│     │ badges progress │     │ skeleton empty  │
│ modal accordion │     │ table cards     │     │ error tooltip   │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └──────────────compose every screen─────────────┘
                                 │
                                 ▼
                       ┌─────────────────┐
                       │ Shared Tokens   │
                       │ color spacing   │
                       │ focus motion    │
                       └─────────────────┘
```

### 8.2. Layout Tổng quan — Global Shell

```text
┌──────────────────────────────────────────────────────────────────┐
│  Header Bar                                                      │
│  ┌────────┐  ┌───────────────────────────────────────┐  ┌─────┐ │
│  │ ☰ Logo │  │ 🔍 Global Search Bar...               │  │ 🔔  │ │
│  └────────┘  └───────────────────────────────────────┘  └─────┘ │
├──────────┬───────────────────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                                    │
│          │                                                       │
│ 📊 Dash  │  (Nội dung thay đổi theo route hiện tại)              │
│ 📋 Board │                                                       │
│ 📝 Tasks │   Ví dụ: RTM Dashboard / Kanban / Task Detail /       │
│ 🔗 Trace │          Document Viewer / Search Results              │
│ 📄 Docs  │                                                       │
│ ✅ Appvl │                                                       │
│          │                                                       │
│──────────│                                                       │
│ ⬤ Online │                                                       │
│ (Status) │                                                       │
├──────────┴───────────────────────────────────────────────────────┤
│  Footer: gmind v<version> | FrankenSQLite sync status | Uptime  │
└──────────────────────────────────────────────────────────────────┘
```

### 8.3. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Sidebar mở rộng với icon + labels, main content render theo route. |
| **Offline** | Header hiển thị banner vàng "Đang offline — chế độ chỉ đọc". Sidebar vẫn hoạt động. Write operations bị disable (xám). |
| **Loading** | Skeleton UI cho main content. Sidebar vẫn interactive. |

**Breakpoints:**
- **Desktop (≥ 1280px):** Sidebar mở rộng (240px) với icon + text labels.
- **Tablet (768px - 1279px):** Sidebar thu gọn chỉ icon (60px). Hover để xem tooltip.
- **Mobile (< 768px):** Sidebar ẩn hoàn toàn. Hamburger menu (☰) ở header để mở overlay sidebar.

### 8.4. User Journeys

- **Journey 1 (Navigate to Task):** User mở `gmind serve` → Thấy Dashboard 4-panel → Click "Tasks" trên sidebar → Thấy Task List (§13) → Click vào 1 task → Thấy Task Detail (§11).
- **Journey 2 (Explore Trace):** User ở Task Detail → Click tab "Graph" → Thấy mini graph widget (§5) → Click "Open Full Page ↗" → Redirect sang `/trace/:id` Beads Trace Explorer (§10).
- **Journey 3 (Quick Search):** User nhập query vào Global Search Bar → Redirect sang `/search?q=<query>` → Xem kết quả grouped by type (§12).

## 9. Trình xem Tài liệu (Document Viewer)

<!-- beads-id: br-prd04-s9 -->

> **Data source:** Zvec Universal Unstructured Data Indexer (PRD-01 §1) index 9 loại dữ liệu: Docs (*.md), Chat sessions, Meeting notes, Git commits, Git diff summaries, PR descriptions, CI/CD logs, RTE approvals, Agent decision logs.
>
> **Lưu ý:** Đây là Document Viewer cho **Core WebUI** (`gmind serve`) — khác với Doc Viewer trên Showcase Website (`apps/website`). Core WebUI Viewer hiển thị dữ liệu dự án thực từ Zvec, Showcase Website chỉ là bản trình diễn tĩnh.

### 9.1. Layout — Document Viewer

```text
┌──────────────────────────────────────────────────────────────────┐
│  Route: /docs                                                    │
├──────────┬───────────────────────────────────────────────────────┤
│ Doc Tree │  Document Content                                     │
│ (Sidebar)│                                                       │
│          │  ┌─────────────────────────────────────────────────┐  │
│ Filter:  │  │  Breadcrumb: Docs > PRDs > PRD-04              │  │
│ [Type ▼] │  ├─────────────────────────────────────────────────┤  │
│          │  │                                                 │  │
│ ▼ Docs   │  │  # PRD 04: WebUI & PM Workspace                │  │
│   PRD-00 │  │                                                 │  │
│   PRD-01 │  │  Rendered Markdown Content...                   │  │
│   PRD-04 │  │                                                 │  │
│   spike-…│  │  Inline Beads IDs auto-detected:                │  │
│ ▼ Chats  │  │  br-prd04-s1 ← clickable → /trace/br-prd04-s1 │  │
│   sess-1 │  │                                                 │  │
│   sess-2 │  │  Coverage indicator: 78% ██████░░ (from RTM)    │  │
│ ▼ Commits│  │                                                 │  │
│   a1b2c3 │  │                                                 │  │
│ ▼ RTE    │  │  [Open in Trace Explorer ↗] [Copy Beads ID]     │  │
│          │  └─────────────────────────────────────────────────┘  │
└──────────┴───────────────────────────────────────────────────────┘
```

### 9.2. Chức năng chính

| Chức năng | Mô tả | API |
| --- | --- | --- |
| **Browse by Type** | Sidebar hiển thị tree view nhóm theo `source_type` (Docs, Chats, Commits, PRs, CI, RTE, Agent traces) | `GET /api/docs?group=source_type` |
| **Rendered Content** | Markdown files render thành HTML. Non-markdown (commits, logs) hiển thị format monospace | Client-side rendering |
| **Beads ID Auto-link** | Tự động scan nội dung tìm pattern `br-xxx`, `bd-xxx` → render thành clickable links sang `/trace/:id` | Client-side regex |
| **Coverage Indicator** | Nếu document là PRD, hiển thị coverage % từ RTM data | `GET /api/coverage?prd=<beads-id>` |
| **Date Filter** | Filter documents theo time range (last 7 days, 30 days, all) | Query params `?since=<date>` |
| **Search within Doc** | Ctrl+F style search highlight trong document content | Client-side |
| **Section Coverage Badges** | Mỗi heading có badge `covered`/`partial`/`gap`, link nhanh sang Explorer và Knowledge Graph | `GET /api/coverage?doc=<id>` |
| **GitHub-like Tree Controls** | Folder expand/collapse, selected file highlight, keyboard up/down/enter, breadcrumb synced với selected document | Client-side + `GET /api/docs?group=source_type` |

### 9.3. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Doc tree loaded, first doc auto-selected and rendered. |
| **Loading** | Skeleton cho doc tree + spinner cho content panel. |
| **Empty** | "Chưa có tài liệu nào được index. Chạy `gmind reindex` để bắt đầu." |
| **Error** | "Không thể tải tài liệu từ Zvec" với nút "Thử lại". |

**Breakpoints:**
- **Desktop (≥ 1024px):** 2-column layout (doc tree 280px + content area).
- **Tablet (768px - 1023px):** Doc tree thu gọn thành dropdown selector ở top.
- **Mobile (< 768px):** Full-width content chỉ. "Back to list" button để quay lại danh sách.

### 9.4. User Journeys

- **Journey 1 (Browse PRDs):** User click "Docs" trên sidebar → Thấy doc tree grouped by type → Expand "Docs" → Click "PRD-04" → Content panel render PRD markdown → User thấy `br-prd04-s5` auto-highlighted → Click `br-prd04-s5` → Redirect sang `/trace/br-prd04-s5`.
- **Journey 2 (Review Chat Session):** User expand "Chats" trong doc tree → Click session → Thấy chat thread rendered trong content panel → Beads IDs trong chat messages auto-linked → Click một beads ID → Mở Trace Explorer (§10).

## 10. Beads Trace Explorer — Khám phá Đồ thị Toàn trang

<!-- beads-id: br-prd04-s10 -->

> **Data source:** `GET /api/trace/:id?depth=full` — Go REST API gọi Graph Assembler để build graph tại thời điểm truy vấn từ các nguồn backend (FrankenSQLite, Zvec, local git, GitHub, FastCode). Browser không truy cập trực tiếp local git, GitHub `gh`, FastCode, CLI, FrankenSQLite, hoặc Zvec. Graph KHÔNG lưu riêng — luôn fresh.

### 10.1. Layout — Beads Trace Explorer Full Page

```text
┌──────────────────────────────────────────────────────────────────┐
│  Route: /trace/:id                                               │
├──────────────────────────────────────────────────────────────────┤
│  Toolbar                                                         │
│  ┌────────────────────────────────────────────────┐  ┌────────┐ │
│  │ Root: br-prd04-s5 "Đồ thị Tài liệu & HITL"   │  │ Depth: │ │
│  │ [Change Root ▼]                                │  │ [2 ▼]  │ │
│  └────────────────────────────────────────────────┘  └────────┘ │
│  Filter: [PRD ☑] [Plan ☑] [Task ☑] [Commit ☐] [Chat ☐] [PR ☑] │
├──────────────────────────────────────────┬───────────────────────┤
│  Graph Canvas (D3.js Force-Directed)     │  Detail Panel          │
│                                          │                       │
│         ●───satisfies──→◆              │  ▎ br-prd04-s5         │
│         PRD-04-s5        Plan-01        │  ▎ Loại: PRD Section   │
│              │                ↓         │  ▎ Status: Active      │
│         context-from   implements       │  ▎─────────────────── │
│              ↓               ↓          │  ▎ Coverage: 78%       │
│         ▲ Chat-23      ■ Task bd-x1y2  │  ▎ Plans: 3 linked     │
│                              │          │  ▎ Tasks: 12 total     │
│                       committed-for     │  ▎ Gaps: 2 uncovered   │
│                              ↓          │  ▎─────────────────── │
│                         ○ Commit a1b2   │  ▎ Content Excerpt:    │
│                              │          │  ▎ "Hiển thị trực     │
│                           pr-for        │  ▎  quan lịch sử..."  │
│                              ↓          │  ▎                     │
│                         ⬡ PR #42 ✅     │  ▎ [Open Doc ↗]        │
│                                          │  ▎ [View Impact ↗]    │
│  ┌────────┐ ┌────────┐ ┌──────────────┐ │                       │
│  │ Zoom + │ │ Zoom - │ │ Fit to View  │ │  ─── Connected Nodes ─│
│  └────────┘ └────────┘ └──────────────┘ │  br-plan-01 ◆ Active  │
│                                          │  bd-x1y2 ■ Done       │
│  Legend:                                 │  chat-23 ▲ 2026-03-01 │
│  ● PRD  ◆ Plan  ■ Task  ○ Commit        │  PR #42 ⬡ Merged ✅   │
│  ▲ Chat  ⬡ PR/CI  ★ RTE Approval       │                       │
├──────────────────────────────────────────┴───────────────────────┤
│  Footer: 12 nodes | 15 edges | Query time: 48ms | Last refresh  │
└──────────────────────────────────────────────────────────────────┘
```

### 10.2. 10 Node Types & 12 Edge Types

**Node Types** (từ spike-beads-knowledge-graph §B):

| Icon | Loại | Source | Màu |
| --- | --- | --- | --- |
| ● | PRD Section | YAML front matter | 🔴 Đỏ |
| ◆ | Plan Element | Plan document | 🔵 Xanh dương |
| ■ | Task/Issue | FrankenSQLite | 🟢 Xanh lá |
| ○ | Commit | Go REST aggregation from local git | ⚪ Xám |
| ▲ | Chat/Meeting | Go REST aggregation from Zvec | 🟡 Vàng |
| ⬡ | PR | Go REST aggregation from GitHub | 🟣 Tím |
| ★ | RTE Approval | Go REST aggregation from Zvec + FrankenSQLite | 🟠 Cam |
| ◇ | CI Run | Go REST aggregation from GitHub | ⚪ Xám nhạt |
| ▢ | Code File | Go REST aggregation from FastCode | 🔵 Xanh nhạt |
| ◎ | Agent Trace | Go REST aggregation from Zvec | 🟤 Nâu |

**Edge Types** (từ spike-beads-knowledge-graph §C):

| Edge | Chiều | Ví dụ |
| --- | --- | --- |
| `satisfies` | Plan → PRD | Plan-01 satisfies PRD-04-s5 |
| `implements` | Task → Plan | Task bd-x1y2 implements Plan-01 |
| `committed-for` | Commit → Task | Commit a1b2 committed-for bd-x1y2 |
| `discussed-in` | Chat → Task | Chat-23 discussed-in bd-x1y2 |
| `approved-by` | RTE → Task | RTE approval approved-by bd-x1y2 |
| `code-touches` | Code → Task | button.go code-touches bd-x1y2 |
| `pr-for` | PR → Task | PR #42 pr-for bd-x1y2 |
| `blocks` | Task → Task | Task A blocks Task B |
| `parent-child` | Epic → Task | Epic parent-child Feature |
| `discovered-in` | Risk → Task | Risk discovered-in bd-x1y2 |
| `context-from` | Ref → PRD | Research context-from PRD section |
| `tested-by` | CI → PR | CI run tested-by PR #42 |

### 10.3. Tương tác

| Hành động | Kết quả |
| --- | --- |
| **Click node** | Side panel hiển thị chi tiết node (theo bảng §5.2) |
| **Double-click node** | Navigate sang trang tương ứng: Task → `/tasks/:id`, PRD/Doc → `/docs`, PR → external GitHub link |
| **Drag node** | Di chuyển node trong graph canvas. Các edge tự cập nhật. |
| **Zoom/Pan** | Mouse wheel zoom, click-drag pan trên canvas. Touch: pinch-to-zoom. |
| **Filter toolbar** | Toggle node types on/off. Graph re-render chỉ hiển thị types đã chọn. |
| **Depth selector** | Thay đổi depth (1-5). Depth=1 chỉ hiện direct connections. Depth=full hiện toàn bộ. |
| **Right-click node** | Context menu: Copy Beads ID, Open in new tab, Show Impact Analysis |

### 10.3A. Knowledge Graph Presets & Beads Traversal Modes

<!-- beads-id: br-prd04-s10.3a -->

`/design-system/knowledge-graph` chuẩn hóa preset viewer cho route `/knowledge-graph`. Viewer phải load Sigma.js/Graphology client-only, chọn preset bằng hash `#simple`, `#ecosystem`, hoặc `#sprint`, và luôn hiển thị selected-node banner, legends, stats, và forbidden/offline states.

```text
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Preset List   │────>│ Graph Canvas  │────>│ Node Banner   │
│ simple        │     │ sigma viewer  │     │ title status  │
│ ecosystem     │     │ pan zoom      │     │ links stats   │
│ sprint        │     │ legends       │     │ actions       │
└───────────────┘     └───────┬───────┘     └───────────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Core Graph    │
                      │ trace presets │
                      │ enrichment    │
                      └───────────────┘
```

`/design-system/beads-traversal` chuẩn hóa DAG mode cho route `/trace/:id?mode=dag`. Mode này không thay thế full graph; nó cung cấp layout tầng để PMO đọc trace theo chuỗi yêu cầu → kế hoạch → task → commit.

```text
┌───────────────┐     satisfies      ┌───────────────┐
│ PRD Sections  │───────────────────>│ Plan Elements │
│ br prd nodes  │                    │ br plan nodes │
└───────┬───────┘                    └───────┬───────┘
        │                                    │ implements
        │ reverse toggle                     ▼
        │                            ┌───────────────┐
        │                            │ Tasks         │
        │                            │ status owner  │
        │                            └───────┬───────┘
        │                                    │ committed for
        ▼                                    ▼
┌───────────────┐                    ┌───────────────┐
│ Detail Panel  │<────select node────│ Commits       │
│ parents child │                    │ hash pr ci    │
└───────────────┘                    └───────────────┘
```

### 10.4. State Matrix & Breakpoints

| State | Mô tả |
| --- | --- |
| **Default** | Graph render với root node highlighted, edges animated trên hover. |
| **Loading** | Layout-matched skeleton graph canvas + detail panel skeleton, kèm progress text "Đang tải đồ thị qua API..."; không dùng standalone centered spinner. |
| **Empty** | "Không tìm thấy liên kết nào cho Beads ID này." + gợi ý kiểm tra ID. |
| **Error** | "Lỗi truy vấn graph từ gmind trace" + nút "Thử lại". |
| **Partial** | Nếu backend GitHub/FastCode enrichment timeout (>2s): hiển thị dữ liệu local đã được API tổng hợp trước, badge "Đang tải enrichment..." |

**Breakpoints:**
- **Desktop (≥ 1280px):** Graph canvas 70% + Detail Panel 30%.
- **Tablet (768px - 1279px):** Detail Panel chuyển thành bottom sheet (slide-up 50% height).
- **Mobile (< 768px):** Graph full-width với simplified layout (tree view thay force-directed). Detail Panel là full-screen overlay khi click node.

### 10.5. User Journeys

- **Journey 1 (Trace from Task):** User ở Task Detail → Click tab Graph → Thấy mini graph → Click "Open Full Page ↗" → Trang `/trace/bd-x1y2` load → Graph hiển thị: Task → Plan → PRD (upstream) + Task → Commits → PRs → CI (downstream) → User click PRD node → Side panel hiển thị PRD section excerpt + coverage % → User double-click → Redirect sang `/docs` với PRD đó.
- **Journey 2 (Impact Analysis):** User nhập PRD section ID vào thanh "Change Root" → Graph hiển thị tất cả Plan elements, Tasks, Commits bị ảnh hưởng → User thấy 2 tasks đang "in-progress" sẽ bị impact → User click task → Side panel hiển thị assignee → User quyết định pause task.

## 11. Chi tiết Task (Task Detail View)

<!-- beads-id: br-prd04-s11 -->

> **Data source:** `GET /api/tasks/:id` (FrankenSQLite first-class SQL columns — §1) + `GET /api/trace/:id` (Graph Assembler — PRD-01 §2). Edits ghi qua `PUT /api/tasks/:id`.

### 11.1. Layout — Task Detail Page

```text
┌──────────────────────────────────────────────────────────────────┐
│  Route: /tasks/:id                                               │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ ← Back to Tasks   |  bd-x1y2  |  Status: [In Progress ▼] │   │
│  │ Title: "Change button icon"                    Priority: P1│   │
│  │ Assignee: [Dev Agent 01 ▼]    QA: [pending ▼]             │   │
│  └───────────────────────────────────────────────────────────┘   │
│  ┌── Tabs ──────────────────────────────────────────────────┐   │
│  │ [Detail] │ [Activity] │ [Graph] │ [Code]                  │   │
│  ├───────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  (Nội dung tab thay đổi theo tab đang chọn)               │   │
│  │                                                           │   │
│  │  Tab Detail:                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │ Description (Markdown editable):                     │ │   │
│  │  │ "Thay đổi icon nút bấm admin panel theo Material..."│ │   │
│  │  │                                                      │ │   │
│  │  │ Dependencies:                                        │ │   │
│  │  │ ├── implements: br-plan-42 "Redesign admin icons"    │ │   │
│  │  │ └── satisfies:  br-prd01-s4.2 "Giao diện Quản trị"  │ │   │
│  │  │                                                      │ │   │
│  │  │ Labels: [ui] [admin] [icon]    Escalation: None      │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 11.2. Nội dung 4 Tabs

| Tab | Nội dung | Data Source |
| --- | --- | --- |
| **Detail** | Markdown description (editable), dependency links (implements/satisfies — clickable sang §10), labels, escalation level, created/updated timestamps | `GET /api/tasks/:id` |
| **Activity** | Timeline dọc: status changes → commits → PR updates → RTE discussions → comments. Mỗi entry có icon + timestamp + actor name | `GET /api/tasks/:id/activity` (new) |
| **Graph** | Mini Document Graph widget (§5) scoped cho task này. Hiển thị upstream (Plan → PRD) + downstream (Commits → PRs → CI) | `GET /api/trace/:id?depth=2` |
| **Code** | Danh sách code files touched: filename, last commit, lines changed. Grouped by directory | `GET /api/trace/:id` → filter `code-touches` edges |

### 11.3. Editable Fields & Validation

| Field | Type | Validation |
| --- | --- | --- |
| `status` | Dropdown | `open`, `in-progress`, `blocked`, `done`, `closed` |
| `assignee` | Dropdown | Danh sách từ `GET /api/agents` |
| `priority` | Dropdown | `P0`, `P1`, `P2`, `P3` |
| `qa_status` | Dropdown | `pending`, `testing`, `passed`, `failed` |
| `description` | Textarea (Markdown) | Max 10,000 chars |
| `labels` | Tag input | Free-text, comma-separated |

> **Write API:** Mỗi field edit gọi `PUT /api/tasks/:id` với payload `{ "field": "value" }`. Optimistic UI update + rollback nếu API lỗi.

### 11.4. State Matrix

| State | Mô tả |
| --- | --- |
| **Default** | Task data loaded, all fields editable, tabs interactive. |
| **Loading** | Skeleton cho header fields + tabs content. |
| **Not Found** | "Task không tồn tại hoặc đã bị xóa. Beads ID: `<id>`" + link về Tasks list. |
| **Offline** | Tất cả fields read-only. Banner "Đang offline — không thể chỉnh sửa." Edits queued locally. |
| **Saving** | Field đang save hiển thị spinner nhỏ bên cạnh. Disable field cho tới khi API respond. |

**Breakpoints:**
- **Desktop:** Full layout như wireframe.
- **Tablet:** Tabs chuyển thành scrollable horizontal tabs.
- **Mobile:** Header fields stack vertically. Tabs thành accordion (expand/collapse).

### 11.5. User Journeys

- **Journey 1 (Edit Task):** User click task từ Task List → Trang load → User click dropdown "Status" → Chọn "Done" → Spinner hiện → API call → Status badge update → Activity tab tự thêm entry mới "Status changed to Done".
- **Journey 2 (Trace Dependencies):** User ở tab Detail → Thấy "implements: br-plan-42" → Click link → Redirect sang `/trace/br-plan-42` Trace Explorer → Thấy full graph context.

## 12. Tìm kiếm & Lọc (Search & Filter)

<!-- beads-id: br-prd04-s12 -->

> **Data source:** 3 search backends: Zvec (semantic/full-text cho docs), FrankenSQLite (structured cho tasks), FastCode (code intelligence). Tất cả qua `GET /api/search?q=<query>&type=<type>` (new endpoint) → backend gọi `gmind search <query> --json`.

### 12.1. Global Search Bar (trong Header — §8.2)

- Luôn hiển thị trên mọi trang (phần của Global Shell).
- Placeholder text: "Tìm tasks, tài liệu, commits, code... (Ctrl+K)"
- Keyboard shortcut: `Ctrl+K` hoặc `/` để focus.
- **Instant suggestions** (debounce 300ms): Top 5 kết quả preview dưới search bar (dropdown).

### 12.2. Trang Search Results (`/search`)

Showcase `/design-system/explorer` (`ds:screen:explorer-001`) là bản chuẩn hóa của `/search`: query input, type filters `all`/`doc`/`commit`/`task`/`adr`/`chat`/`spike`, result list, detail sidebar, hash-selected filter, và cross-links sang Knowledge Graph, Beads Traversal, Doc Viewer.

```text
┌──────────────────────────────────────────────────────────────────┐
│  Route: /search?q=<query>                                        │
├──────────────────────────────────────────────────────────────────┤
│  Search: [icon change                                 ] [🔍]    │
│  Results: 23 found (12 Tasks, 5 Docs, 3 Commits, 2 PRs, 1 Chat)│
│  ┌── Filter Sidebar ──┐  ┌── Results ────────────────────────┐  │
│  │                     │  │                                   │  │
│  │ Type:               │  │ ▼ Tasks (12)                      │  │
│  │ ☑ Tasks (12)       │  │ ┌─────────────────────────────┐   │  │
│  │ ☑ Docs (5)         │  │ │ ■ bd-x1y2 "Change button    │   │  │
│  │ ☑ Commits (3)      │  │ │   icon" — Status: In Prog   │   │  │
│  │ ☑ PRs (2)          │  │ │   ...matched: "icon change" │   │  │
│  │ ☐ CI Logs (0)      │  │ └─────────────────────────────┘   │  │
│  │                     │  │ ┌─────────────────────────────┐   │  │
│  │ Date:               │  │ │ ■ bd-c3d4 "Migrate legacy  │   │  │
│  │ ○ All time          │  │ │   icons" — Status: Open     │   │  │
│  │ ● Last 30 days      │  │ └─────────────────────────────┘   │  │
│  │ ○ Last 7 days       │  │                                   │  │
│  │                     │  │ ▼ Docs (5)                        │  │
│  │ Status (Tasks):     │  │ ┌─────────────────────────────┐   │  │
│  │ ☑ Open             │  │ │ 📄 PRD-04 §1 "PM Custom     │   │  │
│  │ ☑ In Progress      │  │ │   Fields" — ...icon asset... │   │  │
│  │ ☐ Done             │  │ └─────────────────────────────┘   │  │
│  │ ☐ Closed           │  │                                   │  │
│  └─────────────────────┘  └───────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 12.3. Kết quả theo Type

| Type | Hiển thị | Click Action |
| --- | --- | --- |
| **Task** | Icon ■ + Beads ID + Title + Status badge + snippet | → `/tasks/:id` |
| **Doc** | Icon 📄 + File name + Section title + snippet | → `/docs` với doc đó |
| **Commit** | Icon ○ + Hash (7 chars) + Message + Author + Date | → `/trace/:beads-id` |
| **PR** | Icon ⬡ + PR number + Title + Status (open/merged) | → External GitHub link |
| **Chat/Meeting** | Icon ▲ + Session ID + Last message preview | → `/docs` với chat đó |
| **RTE Approval** | Icon ★ + Task ID + Decision text excerpt | → `/tasks/:id` tab Activity |

### 12.4. State Matrix

| State | Mô tả |
| --- | --- |
| **Default** | Results grouped, filter sidebar interactive, snippet highlights. |
| **Loading** | Skeleton cards + "Đang tìm kiếm trong 3 backends..." |
| **Empty** | "Không tìm thấy kết quả cho `<query>`." + gợi ý: "Thử từ khóa khác hoặc bỏ bớt filter." |
| **Error** | "Lỗi kết nối Zvec/FrankenSQLite" + nút "Thử lại". |

**Breakpoints:**
- **Desktop:** 2-column (filter 240px + results).
- **Tablet:** Filter thu gọn thành expandable panel ở top.
- **Mobile:** Filter ẩn, nút "Filter ▼" toggle dropdown. Results full-width.

## 13. Danh sách Task (Task List View)

<!-- beads-id: br-prd04-s13 -->

> **Data source:** `GET /api/tasks?format=list` (FrankenSQLite — PRD-01 §1). Bổ sung cho SAFe Board Views (§3) — Board = Kanban (visual), List = Table (data-dense, bulk ops).

### 13.1. Layout — Task List Table

```text
┌──────────────────────────────────────────────────────────────────┐
│  Route: /tasks                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ┌── Toggle ────┐  ┌── Filters ──────────────────────┐  ┌─────┐│
│  │ [Board] [List]│  │ Status: [All ▼] Assignee: [▼]  │  │ CSV ││
│  └───────────────┘  │ Priority: [▼]  PRD: [▼]        │  │ ↓   ││
│                     └────────────────────────────────┘  └─────┘│
├──────────────────────────────────────────────────────────────────┤
│ ☐ │ ID       │ Title              │ Status │ Pri │ Assignee │ QA│
│───┼──────────┼────────────────────┼────────┼─────┼──────────┼───│
│ ☐ │ bd-x1y2  │ Change button icon │ ● Prog │ P1  │ DevBot01 │ ⏳│
│ ☐ │ bd-c3d4  │ Migrate legacy ... │ ○ Open │ P2  │ —        │ — │
│ ☑ │ bd-e5f6  │ Add test coverage  │ ✅ Done │ P1  │ QABot    │ ✅│
│ ☐ │ bd-g7h8  │ Update docs        │ ○ Open │ P3  │ —        │ — │
│   │          │                    │        │     │          │   │
│───┼──────────┼────────────────────┼────────┼─────┼──────────┼───│
│   │          │ 1-50 of 147 tasks  │        │ [< Prev] [Next >] │
└──────────────────────────────────────────────────────────────────┘
│  Bulk Actions (khi ≥1 task selected):                            │
│  [Assign To ▼] [Change Status ▼] [Change Priority ▼] [Delete]  │
└──────────────────────────────────────────────────────────────────┘
```

### 13.2. Chức năng

| Chức năng | Mô tả |
| --- | --- |
| **Sort** | Click header column → sort ascending/descending (toggle). Default: updated_at DESC. |
| **Filter** | Dropdowns cho Status, Priority, Assignee, PRD link, QA status. Combine = AND logic. |
| **Pagination** | 50 tasks/page. Prev/Next buttons. |
| **Bulk Select** | Checkbox column. Header checkbox = select all visible. |
| **Bulk Assign** | Chọn ≥1 task → dropdown "Assign To" → select agent → `PUT /api/tasks/bulk` |
| **Bulk Status** | Chọn ≥1 task → dropdown "Change Status" → select status → bulk update |
| **CSV Export** | Download CSV hiện tại (filtered/sorted) |
| **Board/List Toggle** | Switch giữa Kanban view (§3) và Table view. Cùng data, khác presentation. |
| **Row Click** | Click row → navigate sang `/tasks/:id` (§11) |

### 13.3. State Matrix

| State | Mô tả |
| --- | --- |
| **Default** | Table loaded, sortable, filterable, pagination active. |
| **Loading** | Skeleton rows (10 rows placeholder). |
| **Empty** | "Không có task nào." (nếu no filter) hoặc "Không tìm thấy task phù hợp filter." (nếu có filter). |
| **Error** | "Không thể tải danh sách task từ FrankenSQLite." + nút "Thử lại". |
| **Bulk Action Processing** | Disabled controls + spinner trên bulk action bar. Optimistic update cho các rows selected. |

**Breakpoints:**
- **Desktop:** Full table với tất cả columns.
- **Tablet:** Ẩn columns ít quan trọng (QA status, PRD link). Hiển thị trong expandable row detail.
- **Mobile:** Chuyển từ table sang card list (mỗi task = 1 card: Title + Status + Assignee). Tap card → expand chi tiết.

### 13.4. User Journeys

- **Journey 1 (Bulk Assign):** User mở `/tasks` → Filter "Status: Open" → Select 5 tasks → Dropdown "Assign To" → Chọn "DevBot01" → Confirm → API bulk update → 5 rows update assignee column.
- **Journey 2 (Export Report):** User filter "Priority: P0" + "Status: not Done" → Click CSV button → Download file `tasks-p0-open-2026-03-17.csv` → Chia sẻ với PMO.

## 14. Bảng điều khiển Agent & CI (Terminal Console)

<!-- beads-id: br-prd04-s14 -->

> **Data source:** `GET /api/agents/sessions`, `GET /api/ci/runs`, `GET /api/tasks/:id/activity`. WebUI hiển thị logs stream qua API, không gọi shell trực tiếp từ browser.

### 14.1. Layout — Terminal Console
Route: `/terminal`

- **Tabs điều hướng:** Agent Console, Deploy, Debug, CI/CD.
- **Mosaic Layout:** Màn hình hỗ trợ chia 2x2 để quan sát đa luồng (ví dụ: Claude-01 Storage, Claude-02 CLI, Claude-03 CI, QA-Reviewer).
- **Line Types:** Hỗ trợ các định dạng dòng hiển thị chuyên biệt: `command`, `output`, `success`, `error`.
- **Scenario Anchors:** Hash/tab state phải deep-link được tới `#agent-console`, `#deploy`, `#debug`, `#ci-cd`; tab active giữ nguyên khi refresh.
- **Security Boundary:** Terminal là read-only log viewer hoặc controlled action surface qua API; browser không có quyền gọi shell, đọc file hệ thống, hoặc inject command.

```text
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Agent Console │   │ Deploy        │   │ Debug         │
│ tab active    │   │ tab           │   │ tab           │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └──────────────scenario tabs────────────┘
                            │
                            ▼
┌─────────────────┐     ┌─────────────────┐
│ Claude 01       │     │ Claude 02       │
│ command output  │     │ success output  │
│ error line      │     │ stream line     │
└─────────────────┘     └─────────────────┘
┌─────────────────┐     ┌─────────────────┐
│ Claude 03       │     │ QA Reviewer     │
│ ci cd output    │     │ failure output  │
│ deploy log      │     │ retry hint      │
└─────────────────┘     └─────────────────┘
```

### 14.2. State Matrix
- **Default:** Terminal hiển thị các logs real-time đang chạy.
- **Loading:** Skeleton UI khi đang kết nối stream hoặc lấy history.
- **Empty:** "Chưa có session nào hoạt động." kèm CTA mở Task List hoặc refresh sessions.
- **Error:** "Không thể tải log stream" kèm retry; error line type vẫn hiển thị trong pane nếu chỉ một session lỗi.
- **Offline:** "Mất kết nối Agent/CI"; giữ read-only logs cache và dừng controlled actions.
- **Forbidden:** Khi User không có quyền truy cập CI pipeline hoặc agent session nhạy cảm.

## 15. Dòng thời gian & File Leases (Timeline)

<!-- beads-id: br-prd04-s15 -->

> **Data source:** `GET /api/activity`, `GET /api/file-leases`, `GET /api/tasks/:id/activity`. Backend sử dụng polling events table (3-5s).

### 15.1. Layout — Timeline
Route: `/timeline`

- **Sprint Day Timeline:** Hiển thị trục thời gian dọc các sự kiện trong ngày của Sprint.
- **File Lease Indicators:** Các file đang được agents edit sẽ có trạng thái: `unlocked`, `locked` (với agent avatar), `expiring`, `expired`.
- **Activity Feed:** Luồng hoạt động cập nhật real-time các tasks được gán, pull request mở, v.v.
- **Hash Anchors:** `#file-lease`, `#activity-feed`, `#sprint-day` scroll tới đúng panel và cập nhật active nav.
- **Freshness Indicator:** Mỗi panel hiển thị last updated; offline state giữ dữ liệu cache với nhãn read-only.

```text
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ File Leases   │     │ Activity Feed │     │ Sprint Day    │
│ unlocked      │     │ task changes  │     │ morning sync  │
│ locked        │     │ pr opened     │     │ build check   │
│ expiring      │     │ ci finished   │     │ demo review   │
│ expired       │     │ rte decision  │     │ retro notes   │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └──────────poll events every 3 to 5s────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Freshness     │
                      │ online cache  │
                      │ offline read  │
                      └───────────────┘
```

### 15.2. State Matrix
- **Default:** Dòng thời gian hiển thị, file leases cập nhật liên tục.
- **Loading:** Skeleton timeline và placeholder lease cards.
- **Empty:** "Chưa có hoạt động trong khoảng thời gian này" kèm CTA clear filters hoặc chuyển sprint day.
- **Error:** "Không thể tải activity/file leases" kèm retry và timestamp lần tải gần nhất nếu có cache.
- **Offline:** Ngừng tự động cập nhật, hiển thị "Dữ liệu cũ - Offline" và chuyển mọi write action sang read-only.
- **Forbidden:** Ẩn activity nhạy cảm nếu user không có quyền xem CI/agent/private file lease.

## 16. Khám phá Git Graph & Đa kịch bản (Git Graph Explorer)

<!-- beads-id: br-prd04-s16 -->

> **Data source:** Go API tổng hợp từ local git và Beads trailers qua `GET /api/git/graph?scenario=<id>` & `GET /api/trace/:id?include=git`.

### 16.1. Layout & Chức năng
Route: `/git-graph`

- Hỗ trợ chọn kịch bản (scenarios) qua URL Hash: `gitflow`, `multi-agent`, `hotfix`, `release-train`, `monorepo`, `beads-prd-trace`, `beads-deadlock`, `beads-ds-comp`, `beads-traversal`, `beads-sprint-review`.
- **Visuals:** Trực quan hóa các nhánh (branches), commits, merge connections, branch tags, và stats (SVG hoặc Canvas).
- Cho phép tương tác (hover/click) vào từng commit để xem chi tiết Beads ID liên kết.
- **Trace Overlay:** Khi scenario có Beads context, commit detail hiển thị `Beads-ID:` trailer, linked PRD/Plan/Task, CI status, và CTA mở `/trace/:id`.

```text
┌───────────────┐     ┌───────────────────────────────┐
│ Scenario List │────>│ Git Graph Canvas              │
│ gitflow       │     │ main     o-----o-----o        │
│ multi agent   │     │ feature     o-----o--m        │
│ hotfix        │     │ release  o-----------o        │
│ beads trace   │     │ tags branches merges stats    │
└───────────────┘     └───────────────┬───────────────┘
                                      │ click commit
                                      ▼
                              ┌───────────────┐
                              │ Commit Detail │
                              │ beads id      │
                              │ pr ci trace   │
                              └───────────────┘
```

### 16.2. State Matrix
- **Default:** Đồ thị render đầy đủ nhánh, commit, branch tags, merge connections, stats.
- **Loading:** Progress bar đang phân tích git history qua Go API.
- **Empty:** "Không có commit phù hợp scenario/filter" kèm CTA reset scenario.
- **Error:** "Không thể đọc dữ liệu local git" kèm retry; browser không hiển thị raw shell error.
- **Offline:** Hiển thị graph cache nếu có; disable refresh/enrichment.
- **Forbidden:** Ẩn commit/branch metadata không được phép nếu backend policy đánh dấu private.

## 17. Bản đồ Hành trình & Storyboard

<!-- beads-id: br-prd04-s17 -->

> **Data source:** Backend tổng hợp từ PRD và E2E alignment metadata qua `GET /api/storyboards` & `GET /api/storyboards/:id`.

### 17.1. Chức năng chính
Route: `/storyboards`

- **Journey Filter:** Lọc các nhóm use-cases và hành trình người dùng.
- **Flow Nodes:** Biểu diễn các bước use-case theo chiều ngang.
- **Guidance Panel:** Chứa Mechanism & Action, Considerations, Investigating. Hướng dẫn Agent cách thao tác E2E.
- **Dynamic Route:** `/storyboards/:id` hiển thị chi tiết role, journey, step timeline, related usecases, expected outcomes, expected state names, và nút Call-To-Action dẫn sang screen thực tế.
- **E2E Guidance:** Guidance Panel phải tách rõ Mechanism & Action, Considerations, Investigating, và CTA để QA/Agent biết điều kiện test nào cần quan sát.
- **Screen Alignment:** Mỗi step có `screen_path`, `data-screen-id`, `expected_state`, và `success_signal`; CTA không được trỏ tới placeholder.

```text
┌───────────────┐     ┌───────────────────────────────┐
│ Journey Filter│────>│ Usecase Flow                  │
│ role          │     │ step 1 --> step 2 --> step 3  │
│ module        │     │ state names and screen paths  │
│ outcome       │     │ cta opens real screen         │
└───────────────┘     └───────────────┬───────────────┘
                                      │ select usecase
                                      ▼
┌───────────────┐             ┌───────────────┐
│ Guidance      │<────────────│ Detail Route  │
│ mechanism     │             │ role journey  │
│ action        │             │ timeline      │
│ investigate   │             │ related cases │
└───────────────┘             └───────────────┘
```

### 17.2. State Matrix
- **Default:** Flow nodes, guidance panel, timeline, related usecases, và CTA hiển thị rõ ràng với tương tác.
- **Loading:** Skeleton cho flow row và guidance panel.
- **Empty:** "Không tìm thấy Storyboard cho module này" kèm CTA quay lại toàn bộ journey.
- **Error:** "Không thể tải storyboard metadata" kèm retry.
- **Offline:** Hiển thị cached storyboard read-only; CTA tới screen thực tế vẫn hoạt động nếu route local có sẵn.

## 18. Acceptance Criteria (Tiêu chí Nghiệm thu)

## 18A. Contract Defaults & Clarifications for Ralph Loop Stage 1

<!-- beads-id: br-prd04-s18a -->

> Phần này bổ sung các giả định thiết kế mức hợp đồng để phục vụ Ralph Loop Stage 1. Đây là các mặc định hợp lý khi PRD chưa mô tả đủ chi tiết cho wireframe/test contract.


- **Canonical viewports:** Desktop `1440px`, Tablet `1024px`, Mobile `390px`.
- **Canonical interaction states dùng để dựng contract:** `default`, `loading`, `empty`, `error`, `offline`, `partial`, `saving`, `not-found`. Mỗi màn hình chỉ bắt buộc áp dụng các state phù hợp với ngữ cảnh đã mô tả ở các mục trước.
- **Design-system selector convention:** Mọi khối UI có thể kiểm thử phải ánh xạ sang `data-ds-id` ổn định theo mẫu `feature.region.element`.
- **Shell consistency rule:** Tất cả routes kế thừa Global Shell (§8.2) gồm header, điều hướng chính, vùng trạng thái kết nối, và footer; các trang toàn màn hình vẫn giữ khả năng quay lại shell.
- **Modal/drawer defaults:** Trên mobile, drawer/phần phụ chuyển thành full-screen overlay; trên tablet là bottom sheet hoặc condensed drawer; trên desktop là side panel cố định nếu PRD không nêu khác.
- **Empty-state CTA rule:** Mọi state `empty` phải có ít nhất 1 CTA khả thi (`create`, `retry`, `clear filters`, hoặc `reindex`).
- **Error-state recovery rule:** Mọi state `error` phải có thông điệp nguyên nhân ngắn + hành động phục hồi trực tiếp.
- **Accessibility defaults:** Focus order theo thứ tự đọc, mọi vùng tương tác chính đều có tên truy cập được, và màu sắc trạng thái phải có nhãn văn bản đi kèm.
- **Annotation rule cho wireframe:** Mỗi wireframe contract phải ghi rõ data source, hành vi responsive, và điều kiện state transition ở phần annotations.


<!-- beads-id: br-prd04-s18 -->

- **AC1 (Data Source):** Web UI tuyệt đối không gọi Read/Write trực tiếp vào DB, chỉ thông qua Go REST API.
- **AC2 (Real-time):** Thao tác assignee/status cập nhật lên UI trong vòng dưới 5 giây (qua polling events table).
- **AC3 (Level 3 Gate):** Phải có nút chặn (disable) nếu chưa đủ test logs hoặc 5 luồng dữ liệu lỗi.
- **AC4 (RTM Traceability):** Tỷ lệ coverage và biểu đồ Heatmap phải khớp dữ liệu từ `gmind coverage --json`.
- **AC5 (Dashboard Panels):** Cả 4 panels (Coverage, Task Progress, Knowledge Graph, Gap Analysis) phải render đúng data source tương ứng.
- **AC6 (Graph Interaction):** Click node trên Knowledge Graph phải mở side panel chi tiết; drag-to-rearrange hoạt động mượt.
- **AC7 (RTE Approval):** Escalation badge, discussion thread view, và approval context display phải hoạt động đúng theo `rte_status` trong FrankenSQLite.
- **AC8 (Single Binary):** Toàn bộ frontend phải embed được qua `embed.FS` — distribution là single Go binary.
- **AC9 (Navigation):** Tất cả routes trong Route Map (§8) phải navigate được; sidebar highlight active route; breadcrumb cập nhật chính xác.
- **AC10 (Document Viewer):** Document Viewer phải render markdown từ Zvec; auto-detect và link Beads IDs; filter theo source_type hoạt động.
- **AC11 (Trace Explorer):** Beads Trace Explorer phải hiển thị ≥ 6 node types; click node mở side panel; double-click navigate đúng; filter toolbar hoạt động; graph render < 2 giây cho ≤ 50 nodes.
- **AC12 (Task Detail):** Task Detail phải hiển thị 4 tabs; editable fields phải save qua API; Activity timeline phải cập nhật real-time; dependency links clickable sang Trace Explorer.
- **AC13 (Search):** Global search bar phải có instant suggestions (< 500ms); search results phải grouped by type; filter sidebar phải hoạt động; Ctrl+K shortcut focus vào search bar.
- **AC14 (Task List):** Task List phải support sort/filter/pagination; bulk select + bulk actions (assign, status change) phải hoạt động; CSV export phải tải file; Board/List toggle phải seamless.
- **AC15 (Showcase Route Coverage):** PRD-04 phải liệt kê đầy đủ các URL showcase: `/design-system/terminal`, `/portfolio`, `/pi-planning`, `/git-graph`, `/kanban`, `/knowledge-graph`, `/approval`, `/timeline`, `/components`, `/doc-viewer`, `/explorer`, `/beads-traversal`, `/storyboard`, và `/webui-pm-workspace`.
- **AC16 (Showcase Fidelity):** Mỗi route showcase phải giữ icon, `DsIdBadge`/`data-ds-id`, hash anchors, state variants, role gate, offline banner, empty/error copy, và interaction model như implementation hiện tại trước khi port sang Core WebUI.
- **AC17 (Showcase-to-Core Data Flow):** Mọi data mock/static trong showcase phải có mapping Core WebUI qua Go REST API; browser không được gọi trực tiếp FrankenSQLite, Zvec, local git, `gh`, FastCode, hoặc shell commands.
- **AC18 (Storyboard E2E Alignment):** Storyboard overview và `/design-system/storyboard/:id` phải map use-case journeys sang screen paths, state names, expected outcomes, and E2E investigation guidance; mỗi CTA phải mở đúng screen thực tế.
