# Screen: Approval Gates (desktop)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.queue.list; approval.panel.aggregate; approval.panel.context; approval.form.comment; approval.action.approve; approval.action.reject; approval.action.manual-override
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="approval.queue.list"] [data-ds-id="approval.panel.aggregate"] [data-ds-id="approval.panel.context"] [data-ds-id="approval.form.comment"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="approval.action.approve"] [data-ds-id="approval.action.reject"] [data-ds-id="approval.action.manual-override"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: approval, PR, task________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Approval Queue 7] [Filter: pending ▼]               │
│ Board        ├───────────────────────────────┬───────────────────────┤
│ Tasks        │ Queue / Evidence Stream       │ Approval Context      │ [60%|40%]
│ Trace        │ ┌───────────────────────────┐ │ Phase Exec→Release    │
│ Docs         │ │ Queue                     │ │ Coverage 91%          │
│ Approval     │ │ 1. bd-a21 pending        │ │ Blocker none          │
│──────────────│ │ 2. PR #48 pending        │ │ GitHub CI pass        │
│ Online       │ │ 3. bd-k09 failed tests   │ ├───────────────────────┤
│ Footer       │ └───────────────────────────┘ │ Decision Form         │
│              │ ┌───────────────────────────┐ │ Comment [__________]  │
│              │ │ Aggregate Evidence        │ │ [Approve] [Reject]    │
│              │ │ ┌───────────────────────┐ │ │ [Manual override]     │
│              │ │ │ Test logs 42 P / 1 F  │ │ │ [View related task]   │
│              │ │ │ Code diff 14 files    │ │ └───────────────────────┘
│              │ │ │ Beads br-prd04-s7     │ │
│              │ │ │ PRD links 3 matched   │ │
│              │ │ │ PR status checks live │ │
│              │ │ └───────────────────────┘ │
│              │ │ [Open diff] [Open logs]   │
│              │ └───────────────────────────┘ │
└══════════════┴───────────────────────────────┴───────────────────────┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="approval.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Approval nav │ ┌───────────────────────────────┬───────────────────┐ │
│              │ │ ████████████████████████████  │ │ ███████████████ │ │
│              │ ├───────────────────────────────┼───────────────────┤ │
│              │ │ █████ evidence skeleton ████  │ │ █████ form ████ │ │
│              │ └───────────────────────────────┴───────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.error; approval.action.manual-override
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="approval.state.error"] [data-ds-id="approval.action.manual-override"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: approval retry________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Approval nav │ [Error: CI/GitHub evidence unavailable] [Retry]      │
│              │ [Use manual override] [Open task]                    │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Partial evidence loaded                           │ │
│              │ │ Test logs cached | PRD links loaded               │ │
│              │ │ Code diff unavailable                             │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.empty
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="approval.state.empty"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: approvals___________] [Bell] [Ava]           │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Approval nav │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No approval requests waiting                      │ │
│              │ │ Phase gates are clear and queue is empty          │ │
│              │ │ [View completed approvals] [Open tasks]           │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: offline
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.offline; approval.action.disabled
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="approval.state.offline"] [data-ds-id="approval.action.disabled"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: cached approvals_______] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Approval nav │ [Offline Mode: read-only queue cache]                │
│              │ [Writes queued disabled] [Reconnect to approve]      │
│              ├───────────────────────────────┬───────────────────────┤
│              │ Cached approval item          │ Actions disabled      │
│              │ bd-a21 | last sync 4m         │ [Approve grey]        │
│              │ Evidence snapshot loaded      │ [Reject grey]         │
│              └───────────────────────────────┴───────────────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
