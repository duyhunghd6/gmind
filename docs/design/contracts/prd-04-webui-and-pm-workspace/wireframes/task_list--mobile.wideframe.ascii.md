# Screen: Task List (mobile)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-list.header.view-toggle; task-list.filter.row; task-list.action.csv-export; task-list.table.main; task-list.table.row; task-list.pagination.controls; task-list.bulk.actions
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.header.view-toggle"] [data-ds-id="task-list.filter.row"] [data-ds-id="task-list.table.main"] [data-ds-id="task-list.table.row"] [data-ds-id="task-list.pagination.controls"] [data-ds-id="task-list.bulk.actions"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.action.csv-export"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐ [100%]
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Board] [List active] [Filter ▼]             │
│ [CSV] [Sort: Updated ▼]                      │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Task card bd-x1y2                        │ │
│ │ Change button icon                       │ │
│ │ Status In Prog | Pri P1                  │ │
│ │ Assignee DevBot01 | QA pending           │ │
│ │ [Select] [Open]                          │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Task card bd-c3d4                        │ │
│ │ Migrate legacy icons                     │ │
│ │ Status Open | Pri P2                     │ │
│ │ Assignee -- | QA --                      │ │
│ │ [Select] [Open]                          │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Pagination 1-20 of 147                   │ │
│ │ [Prev] [Next]                            │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Bulk bar (2 selected)                    │ │
│ │ [Assign] [Status] [Priority]             │ │
│ └──────────────────────────────────────────┘ │
│ [Footer: synced 3s ago]                     │
└══════════════════════════════════════════════┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-list.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [List loading...]                            │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ █████ task card skeleton ███████████████ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ █████ task card skeleton ███████████████ │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-list.state.error; task-list.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.state.error"] [data-ds-id="task-list.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: retry________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Error: Cannot load task list]               │
│ [Retry] [Open board]                         │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Cached count 147 tasks                   │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-list.state.empty; task-list.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.state.empty"] [data-ds-id="task-list.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: create________] [Bell]   │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ No tasks match filters                   │ │
│ │ [Clear filters] [Create task]            │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: bulk-processing
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-list.state.bulk-processing; task-list.bulk.actions
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.bulk.actions"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-list.state.bulk-processing"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: bulk________] [Bell]     │
├══════════════════════════════════════════════┤
│ [Applying bulk action to selected]           │
│ [Selected cards show pending bar]            │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Assigning 2 tasks to DevBot02            │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
