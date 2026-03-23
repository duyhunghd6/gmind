# Screen: Task Detail (mobile)
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
┌══════════════════════════════════════════════┐ [100%]
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [← Tasks] bd-x1y2                            │
│ Status [In Prog ▼]                           │
│ Priority [P1 ▼]                              │
│ Assignee [DevBot01 ▼]                        │
│ QA [pending ▼]                               │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Accordion: Detail                        │ │
│ │ markdown desc + dependencies             │ │
│ │ labels + escalation                      │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Accordion: Activity                      │ │
│ │ status change / commit / QA note         │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Accordion: Graph                         │ │
│ │ mini graph + [Open full trace]           │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Accordion: Code                          │ │
│ │ files touched + lines changed            │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ RTE Context overlay trigger              │ │
│ │ decision text + constraints              │ │
│ └──────────────────────────────────────────┘ │
│ [Footer: online | autosave API]             │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ ████████████████████████████████████████████ │
│ ████████████████████████████████████████████ │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ █████ accordion skeleton ███████████████ │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: retry________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Error: Cannot load task details]            │
│ [Retry] [Back to Tasks]                      │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Snapshot: Status In Progress             │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: task________] [Bell]     │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ No task content yet                      │ │
│ │ [Add description] [Link dependency]      │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: cache________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Offline mode] [Save Offline]                │
│ [Fields read-only with pending clock]        │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Cached task detail                        │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: save________] [Bell]     │
├══════════════════════════════════════════════┤
│ [Saving field update...]                     │
│ [Edited control shows pending bar]           │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Activity adds pending entry              │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: id__________] [Bell]     │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Task not found: bd-missing-44            │ │
│ │ [Back to Tasks] [Search another]         │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
