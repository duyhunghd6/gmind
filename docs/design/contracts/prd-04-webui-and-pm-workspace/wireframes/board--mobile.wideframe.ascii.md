# Screen: SAFe Board Views (mobile)
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
┌══════════════════════════════════════════════┐ [100%]
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Board: Team ▼] [Swipe list]                 │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ View tabs [Portfolio][ART][Team]         │ │
│ │ Active Team | [PI Planning]              │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Task card bd-a12                         │ │
│ │ Todo | P1 | Assignee Mira                │ │
│ │ [Open] [Move status]                     │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Task card bd-r44                         │ │
│ │ In Progress | RTE escalated              │ │
│ │ [Open drawer] [ROAM]                     │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ PI Planning summary                      │ │
│ │ Capacity 34/40 | Risks 6                 │ │
│ │ [Vote] [Open ROAM]                       │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Full-screen RTE overlay trigger          │ │
│ │ 3 messages | constraint summary          │ │
│ │ [Approve] [Reject]                       │ │
│ └──────────────────────────────────────────┘ │
│ [Footer: online | sync 3s]                  │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Board: Team ▼] [Loading]                    │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ ████████████████████████████████████████ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ ███████ card skeleton ██████████████████ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ █████ sandbox skeleton █████████████████ │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: retry________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Error: Board data unavailable]              │
│ [Retry] [Open Tasks] [Cached board]          │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Cached count: Todo 11 / InProg 7         │ │
│ │ RTE actions disabled until sync          │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: create________] [Bell]   │
├══════════════════════════════════════════════┤
│ [Board: PI Planning ▼]                       │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ No tasks or risks in this board          │ │
│ │ Start with one work item                 │ │
│ │ [Create task] [Import backlog]           │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
