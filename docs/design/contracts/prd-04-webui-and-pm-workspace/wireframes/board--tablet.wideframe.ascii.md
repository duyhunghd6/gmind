# Screen: SAFe Board Views (tablet)
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
┌════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤ [7%|93%]
│ Rail │ [Board: Team ▼] [Portfolio][ART][Team][PI]         │
│      │ [Swipe columns] [Confidence Vote]                  │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌────────────┬────────────┬────────────┐            │
│      │ │ Todo 12    │ In Prog 8  │ Review 5   │            │
│      │ │ bd-a12     │ bd-r44     │ bd-k98     │            │
│      │ └────────────┴────────────┴────────────┘            │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ PI Planning Sandbox                              │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ Capacity 34/40 | Risks 6 | BV lanes        │ │ │
│      │ │ │ ROAM [Owned][Mitigated][Accepted]          │ │ │
│      │ │ │ Vote [1][2][3][4][5]                       │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Bottom Drawer: RTE Context                       │ │
│      │ │ bd-r44 escalated | 3 thread messages             │ │
│      │ │ [Approve] [Reject] [Open task]                  │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Board: Team ▼]                                    │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌────────────┬────────────┬────────────┐            │
│      │ │ ████████   │ ████████   │ ████████   │            │
│      │ └────────────┴────────────┴────────────┘            │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ █████ sandbox skeleton ████████████████████████ │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: retry board____________] [Bell] [Ava]     │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Error: Cannot load Team board] [Retry]            │
│      │ [Open Tasks] [Use cached]                          │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Cached board summary                            │ │
│      │ │ Todo 11 | In Progress 7 | Review 6             │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: create work____________] [Bell] [Ava]     │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Board: Portfolio ▼]                               │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ No work items in this level                     │ │
│      │ │ [Create epic] [Import backlog] [Switch level]  │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
