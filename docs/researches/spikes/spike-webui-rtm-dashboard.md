# Spike: Web UI RTM Dashboard — Requirements Traceability Matrix Visualization

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Parent Spike:** spike-beads-knowledge-graph.md (Open Item #4)

## Hypothesis

- Web UI dashboard cần visualize Requirements Traceability Matrix (RTM) từ Knowledge Graph
- Dashboard giúp PMO/PO nhanh chóng thấy: coverage gaps, impact analysis, task progress
- Data lấy từ `gmind` CLI commands (trace, coverage, gaps, impact) qua API
- UI cần interactive: click node → drill down, filter by status, heatmap colors

## Research Sessions

### Session 1 (2026-03-02)

**Findings:**

#### A. Dashboard Layout — 4 Panels

```
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

#### B. Panel Details

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
| Visualization | Force-directed graph (D3.js hoặc Cytoscape.js)          |
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

#### C. API Layer — gmind serve

Dashboard cần API endpoint từ gmind:

| Endpoint                   | gmind Command              | Response Format |
| -------------------------- | -------------------------- | --------------- |
| `GET /api/coverage`        | `gmind coverage --json`    | JSON            |
| `GET /api/gaps`            | `gmind gaps --json`        | JSON            |
| `GET /api/trace/:id`       | `gmind trace <id> --json`  | JSON            |
| `GET /api/impact/:section` | `gmind impact <id> --json` | JSON            |
| `GET /api/tasks`           | `br list --json`           | JSON            |
| `GET /api/tasks/:id`       | `br show <id> --json`      | JSON            |

**Implementation:**

```
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

#### D. Technology Stack

| Layer     | Tech                    | Lý do                               |
| --------- | ----------------------- | ----------------------------------- |
| Backend   | Go (gmind serve)        | Reuse gmind CLI, single binary      |
| API       | REST JSON               | Simple, curl-friendly               |
| Frontend  | Vanilla JS              | No build step, embed in Go binary   |
| Graph Viz | D3.js force-directed    | Industry standard, flexible         |
| Charts    | Chart.js hoặc D3.js     | Lightweight, responsive             |
| Styling   | CSS custom (dark theme) | Premium feel, consistent with gmind |
| Embedding | Go embed.FS             | Single binary distribution          |

#### E. Graph Visualization — Node Design

```
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

**Open Items:**

- (None — research complete)

## Recommendation

1. **4-panel dashboard**: Coverage Heatmap, Task Progress, Interactive Graph, Gap Analysis
2. **`gmind serve`**: Go HTTP server, embed frontend via embed.FS, single binary
3. **Vanilla JS + D3.js**: No build step, lightweight, embedded in Go binary
4. **REST API**: Thin wrapper calling gmind CLI internally for each endpoint
5. **Dark theme**: Premium design consistent with developer tooling
6. **Interactive graph**: D3.js force-directed, click-to-drill-down, colored by type/status

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

- Không có spike mới — wireframe đủ rõ để bắt đầu implementation
