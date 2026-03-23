# Journey 1 — Dashboard gap resolution and task drill-down

```text
[J1-A] Dashboard Home                    ──[click coverage row]──►                    [J1-B] Coverage Drill-down
+====================================+                                              +====================================+
| Dashboard Home                     |                                              | Coverage Drill-down                |
| Header: Global Search Ctrl+K       |                                              | Breadcrumb: Dashboard > PRD-04     |
| Sidebar: Dashboard active          |                                              | Coverage bars + section breakdown  |
| KPI: 47.2% 128 tasks 9 gaps        |                                              | Section br-prd04-s6 expanded       |
| Coverage / Progress / Graph        |                                              | Linked task side panel             |
| Gap panel: [Create Plan]           |                                              | [Open task bd-x1y2] [Back]         |
+====================================+                                              +====================================+
          │                                                                                     │
          │ ──[click Create Plan]──►                                                             │ ──[open task bd-x1y2]──►
          │                                                                                     ▼
          │                                                                        [J1-C] Task Detail
          │                                                                        +====================================+
          │                                                                        | Task Detail                        |
          │                                                                        | Header: bd-x1y2 In Progress        |
          │                                                                        | Tabs: Detail Activity Graph        |
          │                                                                        | Dependency: br-plan-42             |
          │                                                                        | [Open Full Graph] [Back]           |
          │                                                                        | RTE context + activity             |
          │                                                                        +====================================+
          │                                                                                     │
          │                                                                                     │ ──[open full graph]──►
          ▼                                                                                     ▼
[J1-D] Create Plan Side Panel                                                      [J1-E] Trace Explorer
+====================================+                                              +====================================+
| Create Plan Side Panel             |                                              | Trace Explorer                     |
| Gap context pinned in rail         |                                              | Breadcrumb: Trace > bd-x1y2        |
| Plan title: [                 ]    |                                              | Toolbar depth=2 filters            |
| Notes: [                      ]    |                                              | Graph canvas + node legend         |
| [Save plan] [Close panel]          |                                              | Node detail: PRD-04 s6             |
+====================================+                                              | [Back to task]                     |
          │                                                                         +====================================+
          │ ──[save with empty title]──►                                                       │
          ▼                                                                                   │ ──[breadcrumb Back to task]──►
[J1-F] Create Plan Validation                                                                   │
+====================================+                                                          │
| Create Plan Validation             |                                                          │
| Error: Plan title required         |                                                          │
| Field outline + helper text        |                                                          │
| Cursor returned to title           |                                                          │
| [Fix title] [Close panel]          |                                                          │
+====================================+                                                          │
          │                                                                                     │
          │ ──[Fix title]──►                                                                     │
          └─────────────────────────────────────────────────────────────────────────────────────┘

[J1-D] Create Plan Side Panel          ──[save valid plan]──►                    [J1-G] Dashboard Reloaded
+====================================+                                              +====================================+
| Create Plan Side Panel             |                                              | Dashboard Reloaded                 |
| Gap context pinned in rail         |                                              | Success toast: Plan created        |
| Plan title: Gap resolution plan    |                                              | Gap count 9 -> 8                   |
| Notes: owner + due date set        |                                              | Updated gap list + CTA             |
| [Save plan] [Close panel]          |                                              | New plan linked in panel           |
+====================================+                                              +====================================+
          │                                                                                     │
          │ ──[Close panel / Esc]──►                                                             │ ──[continue after success]──►
          ▼                                                                                     ▼
[J1-A] Dashboard Home                                                              [J1-H] Terminal: Plan Created
+====================================+                                              +====================================+
| Dashboard Home                     |                                              | Terminal: Plan Created             |
| Returned via close or escape       |                                              | Gap resolved in dashboard          |
| User can inspect other panels      |                                              | User can continue elsewhere        |
| Navigation context preserved       |                                              | No blocking actions remain         |
+====================================+                                              +====================================+

[J1-A] Dashboard Home                    ──[dashboard fetch fails]──►               [J1-I] Dashboard Error
+====================================+                                              +====================================+
| Dashboard Home                     |                                              | Dashboard Error                    |
| Header + Sidebar still visible     |                                              | Banner: Cannot connect             |
| Main panels waiting on data        |                                              | [Retry] [Go to Tasks]              |
| User is blocked from gap actions   |                                              | Recovery steps listed              |
+====================================+                                              | Contact support link shown         |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[Retry]──►
                                                                                                 ▼
                                                                                   [J1-A] Dashboard Home
                                                                                   +====================================+
                                                                                   | Dashboard Home                     |
                                                                                   | Data reload requested             |
                                                                                   | Same route and shell restored     |
                                                                                   | User retries the journey          |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[Contact support]──►
                                                                                                 ▼
                                                                                   [J1-J] Terminal: Support Escalation
                                                                                   +====================================+
                                                                                   | Terminal: Support Escalation      |
                                                                                   | Incident report submitted         |
                                                                                   | Await backend recovery            |
                                                                                   | User exits current journey        |
                                                                                   +====================================+
```