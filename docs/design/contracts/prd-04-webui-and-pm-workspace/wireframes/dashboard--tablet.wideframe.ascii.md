# Screen: RTM Dashboard (tablet)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; dashboard.kpi.row; dashboard.panel.coverage; dashboard.panel.progress; dashboard.panel.graph; dashboard.panel.gaps; dashboard.surface.create-plan
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.kpi.row"] [data-ds-id="dashboard.panel.coverage"] [data-ds-id="dashboard.panel.progress"] [data-ds-id="dashboard.panel.graph"] [data-ds-id="dashboard.panel.gaps"] [data-ds-id="dashboard.surface.create-plan"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤ [7%|93%]
│ Rail │ [Online] [Dashboard] [30d ▼]                       │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌────────────────────┬────────────────────────────┐ │
│      │ │ Coverage 78%       │ Done 104 / Gaps 7         │ │
│      │ │ 12 PRDs linked     │ Blocked 9 / Plans due 3   │ │
│      │ └────────────────────┴────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Coverage Panel                                  │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ PRD-00 92%  PRD-02 76%  PRD-04 61%         │ │ │
│      │ │ │ s6 88%  s10 54%  [Open linked tasks]       │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Progress Panel                                  │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ Done 104 | In Prog 22 | Blocked 9          │ │ │
│      │ │ │ Timeline W1 14  W2 19  W3 8                │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Graph Panel                                     │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ ●PRD──◆Plan──■Task──○PR                     │ │ │
│      │ │ │ [Open full trace] [Node details]            │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Gap Panel                                       │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ Missing plan / stale tests / blocked >5d   │ │ │
│      │ │ │ [Create Plan] [Route to source]            │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; dashboard.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Dashboard] [Loading]                              │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌────────────────────┬────────────────────────────┐ │
│      │ │ ████████████████   │ ████████████████████████   │ │
│      │ └────────────────────┴────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ ██████████████████████████████████████████████  │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ █████ graph skeleton ████████████████████████   │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; dashboard.state.error; dashboard.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.state.error"] [data-ds-id="dashboard.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: retry dashboard__________] [Bell] [Ava]   │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Error: Dashboard services unavailable] [Retry]    │
│      │ [dashboard.state.retry] [Cached] [Open docs]       │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Cached Summary                                  │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ Coverage 61% | Done 103 | Gaps 7           │ │ │
│      │ │ │ Cause: /api/gaps failed                    │ │ │
│      │ │ │ [Use cached snapshot]                      │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; dashboard.state.empty; dashboard.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.state.empty"] [data-ds-id="dashboard.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: import data____________] [Bell] [Ava]     │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Dashboard] [No dashboard data yet]                │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Empty Workspace                                  │ │
│      │ │ ┌─────────────────────────────────────────────┐ │ │
│      │ │ │ Add PRDs, tasks, and trace links            │ │ │
│      │ │ │ Coverage / progress / graph will appear     │ │ │
│      │ │ └─────────────────────────────────────────────┘ │ │
│      │ │ [Import PRDs] [Create first task] [Help]       │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
