# Screen: Task List (desktop)
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
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: task, assignee, QA_______] [Bell] [Ava]      │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Board] [List active] Status[All▼] Assignee[▼]       │
│ Board        │ Priority[▼] PRD[▼] QA[▼]               [CSV Export]  │
│ Tasks        ├───────────────────────────────────────────────────────┤
│ Trace        │ ☐ All | ID | Title | Status | Pri | Assignee | QA    │
│ Docs         │───────────────────────────────────────────────────────│
│ Approval     │ ☐ | bd-x1y2 | Change button icon | Prog | P1 |Dev1|⏳│
│──────────────│ ☐ | bd-c3d4 | Migrate legacy...  | Open | P2 | -- |--│
│ Online       │ ☑ | bd-e5f6 | Add test coverage  | Done | P1 | QA |✅│
│ Footer       │ ☐ | bd-g7h8 | Update docs        | Open | P3 | -- |--│
│              │───────────────────────────────────────────────────────│
│              │ 1-50 of 147 tasks                        [Prev][Next] │
│              ├───────────────────────────────────────────────────────┤
│              │ Bulk Actions (3 selected)                           │
│              │ [Assign To ▼] [Change Status ▼] [Change Pri ▼]      │
│              │ [Apply] [Clear selection]                           │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task list nav│ [Board] [List active] █████ filters ██████████████   │
│              ├───────────────────────────────────────────────────────┤
│              │ █████ header row ██████████████████████████████████  │
│              │ █████ row skeleton ████████████████████████████████  │
│              │ █████ row skeleton ████████████████████████████████  │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: task retry____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task list nav│ [Error: Cannot load task list] [Retry]               │
│              │ [Open board] [Use cached list]                       │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Last synced count: 147 tasks                      │ │
│              │ │ Filters cleared until data returns                │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: create task____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task list nav│ ┌───────────────────────────────────────────────────┐ │
│              │ │ No tasks match current filters                    │ │
│              │ │ Status=Done + Assignee=Mira                       │ │
│              │ │ [Clear filters] [Create task]                     │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: bulk assign____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task list nav│ [Applying bulk action to 3 tasks]                    │
│              │ [Assign To: DevBot02] controls disabled              │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Selected rows show pending status bar             │ │
│              │ │ Optimistic assignee update visible                │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
