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
  - anchor: "8-acceptance-criteria"
    title: "Tiêu chí Nghiệm thu"
    beads-id: br-prd04-s8
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

## 3. Các Giao diện Quản trị (SAFe & Board Views)

<!-- beads-id: br-prd04-s3 -->

- **Portfolio View:** Dành cho CEO/CTO xem Epic, Budget, Roadmap.
- **ART View:** Kanban tổng cho Orchestrator (RTE) / PMO quản lý.
- **Team View:** Bảng Kanban riêng rẽ cho từng Feature Team (VD: `Platform`, `Connectors`, `Quant`).
- **PI Planning Interactive UI:** Không gian tương tác cho lễ PI Planning. Bao gồm **Strategic Sandbox** (kéo thả rủi ro/bài toán để tính Capacity), **Business Value Scoring**, **ROAM Board** để xử lý rủi ro, và phím bấm **[Confidence Vote]** bắt buộc từ Human trước khi khởi chạy Sprint.

## 4. Cổng Phê duyệt Cấp 3 (Level 3 Approval Gates) & Không gian Phê duyệt

<!-- beads-id: br-prd04-s4 -->

Giao diện chặn (Checkpoint) yêu cầu **Bắt buộc Phê duyệt bởi Con người** khi:

1.  **Chuyển Phase (Phase Boundaries):** Từ Planning (Continuous Exploration) sang Execution (Continuous Integration), hoặc qua Release.
2.  **The Ultimate Approval Panel:** Khi Agent đệ trình PR hoặc Task, Web UI gọp chung 5 luồng dữ liệu vào một màn hình duy nhất để Human xem xét: `Test Result (Từ Zvec QA Log)` + `Code Diff (FastCode/Git)` + `Beads ID (br-xxx)` + `PRD Requirements liên kết` + `GitHub PR & CI Status (từ gh CLI)`.

## 5. Đồ thị Tài liệu & Lịch sử HITL (Human-in-the-Loop Document Graph)

<!-- beads-id: br-prd04-s5 -->

- **Document Tree & Commit Lineage:** Hiển thị trực quan lịch sử thay đổi của một tài liệu dưới dạng cây đồ thị liên kết trực tiếp tới từng `git commit` (qua `Beads-ID:` Git Trailer) và thuộc tính `beads ID`. Truy vấn local: `git log --grep='Beads-ID: br-xxx'`.
- **Knowledge Context Linking:** Trỏ ngược từ Yêu cầu (Requirement) sang các Tài liệu tham chiếu (Research references) đã được AI dùng làm Context, giúp con người dễ dàng bổ sung thêm tham chiếu để điều chỉnh Spec.
- **GitHub Enrichment:** Mỗi Beads task hiển thị linked PRs (`gh pr list --search "br-xxx"`), CI status (`gh run list`), và commit history (`git log --grep`). Tất cả query trực tiếp từ local git + `gh` CLI.
- **Requirements Traceability Matrix (RTM):** Hiển thị trực quan liên kết 3 tầng **PRD Section ↔ Plan Element ↔ Task**. Mỗi PRD section có Beads ID riêng (VD: `br-prd01-s1`), Plan elements link ngược qua `satisfies:`, Tasks link ngược qua `implements:`. Cho phép truy vết xuôi (PRD → Code) và ngược (Task → PRD). Xem chi tiết: PRD-02 §3.
- **Coverage Heatmap:** Dashboard hiển thị mức độ cover của từng PRD section: bao nhiêu PRD sections có Plan elements? Bao nhiêu Plan elements đã decompose thành Tasks? Highlight các gaps (sections chưa covered) bằng màu đỏ. Dữ liệu từ `gmind coverage full`.
- **Impact Analysis View:** Khi Human sửa/cập nhật một PRD section, hiển thị cascading impact: Plan elements nào bị ảnh hưởng → Tasks nào cần review/pause/rework → Commits nào liên quan. Dữ liệu từ `gmind impact <prd-section-id>`.

## 6. RTM Dashboard — 4-Panel Requirements Visibility

<!-- beads-id: br-prd04-s6 -->

> ✅ **Nghiên cứu đã được chấp nhận (2026-03-02 → 2026-03-13):** Nội dung từ [spike-webui-rtm-dashboard.md](../../researches/spikes/spike-webui-rtm-dashboard.md) đã được merge vào PRD làm yêu cầu chính thức.

### 6.1. Dashboard Layout — 4 Panels

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
| Interaction   | Click PRD → expand sections, click section → show linked tasks     |
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
| Data source   | `gmind trace <id> --json --depth=full`                  |
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
| Interaction   | Click gap → navigate to source, action button "Create" |

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

## 7. RTE Approval — UI Integration

<!-- beads-id: br-prd04-s7 -->

> ✅ **Nghiên cứu đã được chấp nhận (2026-03-02 → 2026-03-13):** Nội dung từ [spike-rte-approval-workflow.md](../../researches/spikes/spike-rte-approval-workflow.md) đã được merge. Phần CLI commands nằm tại PRD-03 §4. Phần UI integration đặc tả dưới đây.

Khi Agent escalate rủi ro, Web UI cần hiển thị **RTE Approval Panel** trong Document Graph (§5) và Board Views (§3):

- **Escalation Badge:** Task card hiển thị badge 🔴 `RTE:ESCALATED` khi `rte_status = 'escalated'`
- **Discussion Thread View:** Click task → expand panel hiển thị conversation thread từ Zvec (lọc theo `source_type: rte-discussion`, `beads_ids: [<task-id>]`)
- **Approval Context Display:** Khi `rte_status = 'approved'`, hiển thị **Execution Context block** với:
  - Risk description gốc
  - Decision text (from `rte_resolution`)
  - Constraints list
  - Approved by + timestamp (`rte_approved_by`, `rte_approved_at`)
- **Impact Indicator:** Nếu RTE decision ảnh hưởng PRD scope → highlight PRD section liên quan trên Coverage Heatmap

## 8. Acceptance Criteria (Tiêu chí Nghiệm thu)

<!-- beads-id: br-prd04-s8 -->

- **AC1 (Data Source):** Web UI tuyệt đối không gọi Read/Write trực tiếp vào DB, chỉ thông qua Go REST API.
- **AC2 (Real-time):** Thao tác assignee/status cập nhật lên UI trong vòng dưới 5 giây (qua polling events table).
- **AC3 (Level 3 Gate):** Phải có nút chặn (disable) nếu chưa đủ test logs hoặc 5 luồng dữ liệu lỗi.
- **AC4 (RTM Traceability):** Tỷ lệ coverage và biểu đồ Heatmap phải khớp dữ liệu từ `gmind coverage --json`.
- **AC5 (Dashboard Panels):** Cả 4 panels (Coverage, Task Progress, Knowledge Graph, Gap Analysis) phải render đúng data source tương ứng.
- **AC6 (Graph Interaction):** Click node trên Knowledge Graph phải mở side panel chi tiết; drag-to-rearrange hoạt động mượt.
- **AC7 (RTE Approval):** Escalation badge, discussion thread view, và approval context display phải hoạt động đúng theo `rte_status` trong FrankenSQLite.
- **AC8 (Single Binary):** Toàn bộ frontend phải embed được qua `embed.FS` — distribution là single Go binary.
