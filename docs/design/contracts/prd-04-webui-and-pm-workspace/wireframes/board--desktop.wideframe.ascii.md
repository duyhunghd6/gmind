# Screen: SAFe Board Views (desktop)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; board.header.view-switcher; board.kanban.columns; board.card.task; board.pi.sandbox; board.pi.roam; board.pi.confidence-vote; board.rte.drawer
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="board.header.view-switcher"] [data-ds-id="board.kanban.columns"] [data-ds-id="board.card.task"] [data-ds-id="board.pi.sandbox"] [data-ds-id="board.pi.roam"] [data-ds-id="board.pi.confidence-vote"] [data-ds-id="board.rte.drawer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: team, PI, risk____________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Board: ART ▼] [Portfolio][ART][Team][PI] [List view]│
│ Board        │ [Filter: PI-12] [Confidence Vote]                    │
│ Tasks        ├───────────────────────────────────────────────────────┤
│ Trace        │ ┌─────────────────────────────────────┬─────────────┐ │ [70%|30%]
│ Docs         │ │ Kanban Workspace                    │ RTE Drawer  │ │
│ Approval     │ │ ┌──────────┬──────────┬──────────┐ │ Esc bd-r44  │ │
│──────────────│ │ │ Todo 12  │ InProg 8 │ Review 5 │ │ Thread      │ │
│ Online       │ │ │ bd-a12   │ bd-r44   │ bd-k98   │ │ 09:14 Nhi   │ │
│ Footer       │ │ │ Mira P1  │ Escalated│ QA wait  │ │ 09:17 Agent │ │
│              │ │ │ [Drag]   │ [Open]   │ [Move]   │ │ Constraint 3│ │
│              │ │ ├──────────┼──────────┼──────────┤ │ [Approve]   │ │
│              │ │ │ Done 19  │ Risks 6  │ Parked 3 │ │ [Reject]    │ │
│              │ │ │ merged   │ ROAM #12 │ backlog  │ │ [Open task] │ │
│              │ │ └──────────┴──────────┴──────────┘ │             │ │
│              │ ├─────────────────────────────────────┤             │ │
│              │ │ PI Planning Sandbox                 │             │ │
│              │ │ ┌─────────────────────────────────┐ │             │ │
│              │ │ │ Capacity Team A 34/40          │ │             │ │
│              │ │ │ Risks API lag / test debt      │ │             │ │
│              │ │ │ BV Auth 13 | Graph 8           │ │             │ │
│              │ │ │ [Rebalance] [Run ROAM]         │ │             │ │
│              │ │ ├─────────────────────────────────┤ │             │ │
│              │ │ │ Confidence Vote [1][2][3][4][5]│ │             │ │
│              │ │ │ ROAM Resolved 4 / Owned 2      │ │             │ │
│              │ │ └─────────────────────────────────┘ │             │ │
│              │ └─────────────────────────────────────┴─────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; board.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="board.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Board nav    │ [Board: ART ▼] [PI Planning]                         │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌─────────────────────────────────────┬─────────────┐ │
│              │ │ ┌──────────┬──────────┬──────────┐ │ ███████████ │ │
│              │ │ │ ████████ │ ████████ │ ████████ │ │ ███████████ │ │
│              │ │ └──────────┴──────────┴──────────┘ │ ███████████ │ │
│              │ │ █████████ sandbox skeleton ███████ │             │ │
│              │ └─────────────────────────────────────┴─────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; board.state.error; board.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="board.state.error"] [data-ds-id="board.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: board retry____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Board nav    │ [Error: Cannot load board data] [Retry] [Use cached] │
│              │ [Cause: /api/tasks?view=board failed]                │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Cached Board Snapshot                             │ │
│              │ │ ┌───────────────────────────────────────────────┐ │ │
│              │ │ │ Todo 11 | In Progress 7 | Review 6           │ │ │
│              │ │ │ PI vote locked until live data returns       │ │ │
│              │ │ │ [Open task list] [Open cached board]         │ │ │
│              │ │ └───────────────────────────────────────────────┘ │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; board.state.empty; board.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="board.state.empty"] [data-ds-id="board.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: create board____________] [Bell] [Ava]       │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Board nav    │ [Board: Team ▼]                                      │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Empty Board View                                  │ │
│              │ │ No tasks or risks in this level                   │ │
│              │ │ PI sandbox waits for imported work items          │ │
│              │ │ [Create task] [Switch level] [Import backlog]     │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
