# Screen: Task Detail (desktop)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.header.summary; task-detail.field.status; task-detail.field.assignee; task-detail.field.priority; task-detail.field.qa-status; task-detail.tab.detail; task-detail.tab.activity; task-detail.tab.graph; task-detail.tab.code; task-detail.rte.context
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.header.summary"] [data-ds-id="task-detail.field.status"] [data-ds-id="task-detail.field.assignee"] [data-ds-id="task-detail.field.priority"] [data-ds-id="task-detail.field.qa-status"] [data-ds-id="task-detail.tab.detail"] [data-ds-id="task-detail.tab.activity"] [data-ds-id="task-detail.tab.graph"] [data-ds-id="task-detail.tab.code"] [data-ds-id="task-detail.rte.context"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: task, dependency________] [Bell] [Ava]       │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [← Back to Tasks] bd-x1y2 [Status: In Prog ▼]        │
│ Board        │ Title: Change button icon   Priority [P1 ▼]          │
│ Tasks        │ Assignee [DevBot01 ▼]       QA [pending ▼]           │
│ Trace        ├───────────────────────────────────────────────────────┤
│ Docs         │ [Detail] [Activity] [Graph] [Code]                   │
│ Approval     ├───────────────────────────────┬───────────────────────┤ [70%|30%]
│──────────────│ Detail Workspace              │ Right Rail            │
│ Online       │ ┌───────────────────────────┐ │ RTE Context           │
│ Footer       │ │ Detail Tab                │ │ Status none           │
│              │ │ Description markdown      │ │ Decision text         │
│              │ │ Dependencies              │ │ Constraints           │
│              │ │ - implements br-plan-42   │ │ approved by           │
│              │ │ - satisfies br-prd04-s11  │ │ [Open approval]       │
│              │ │ Labels [ui][admin][icon]  │ ├───────────────────────┤
│              │ │ Escalation Team           │ │ Activity Preview      │
│              │ │ [Save field] [Open trace] │ │ 09:12 status change   │
│              │ ├───────────────────────────┤ │ 09:20 commit          │
│              │ │ Graph Tab Preview         │ │ 09:35 QA note         │
│              │ │ ●PRD ─ ◆Plan ─ ■Task      │ └───────────────────────┘
│              │ │ [Open full page trace]    │                         │
│              │ └───────────────────────────┘                         │
└══════════════┴───────────────────────────────┴───────────────────────┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ [← Back to Tasks] ███████████████████████████████    │
│              ├───────────────────────────────────────────────────────┤
│              │ [Detail] [Activity] [Graph] [Code]                   │
│              ├───────────────────────────────┬───────────────────────┤
│              │ ███████ detail ██████████████ │ █████ context ██████  │
│              │ █████████████████████████████ │ ████████████████████  │
│              └───────────────────────────────┴───────────────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.error; task-detail.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.error"] [data-ds-id="task-detail.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: task retry____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ [Error: Cannot load task details] [Retry] [Back]     │
│              │ [Cause: /api/tasks/:id failed]                       │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Last known snapshot                               │ │
│              │ │ Status In Progress | Assignee DevBot01            │ │
│              │ │ [Open task list] [Open trace]                     │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.empty; task-detail.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.empty"] [data-ds-id="task-detail.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: create task____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No task content yet                               │ │
│              │ │ Description, dependencies, and activity empty     │ │
│              │ │ [Add description] [Link dependency]               │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: offline
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.offline; task-detail.state.read-only
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.offline"] [data-ds-id="task-detail.state.read-only"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: cached task____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ [Offline mode: edits queued locally]                 │
│              │ [Save Offline] [Read-only fields marked]             │
│              ├───────────────────────────────┬───────────────────────┤
│              │ Detail tab read-only         │ RTE Context cached    │
│              │ status lock icon             │ [Reconnect]           │
│              │ pending clock on assignee    │                      │
│              └───────────────────────────────┴───────────────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
## State: saving
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.saving
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.saving"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: task save_____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ [Saving status change...]                            │
│              │ [Status field shows inline pending bar]              │
│              ├───────────────────────────────────────────────────────┤
│              │ Detail tab remains visible                           │
│              │ Status [In Review ▼] locked until response           │
│              │ Activity appends pending update row                  │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: not-found
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; task-detail.state.not-found; task-detail.state.back-link
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="task-detail.state.not-found"] [data-ds-id="task-detail.state.back-link"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: beads id______________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Task shell   │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Task not found or deleted                         │ │
│              │ │ Beads ID: bd-missing-44                           │ │
│              │ │ [Back to Tasks] [Search another ID]               │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
