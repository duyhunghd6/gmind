# Screen: RTM Dashboard (mobile)
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
┌══════════════════════════════════════════════┐ [100%]
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Online] [Dashboard] [Pull to refresh]       │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ KPI Coverage 78%                         │ │
│ │ 12 PRDs linked                           │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ KPI Tasks Done 104                       │ │
│ │ Blocked 9 | Gaps 7                       │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Coverage Panel                           │ │
│ │ ┌──────────────────────────────────────┐ │ │
│ │ │ PRD-00 92%  PRD-04 61%              │ │ │
│ │ │ Sections s6 88% / s10 54%           │ │ │
│ │ └──────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Progress Panel                           │ │
│ │ ┌──────────────────────────────────────┐ │ │
│ │ │ Done / In Prog / Blocked bars        │ │ │
│ │ │ Timeline mini strip                  │ │ │
│ │ └──────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Graph Panel ●──◆──■──○                   │ │
│ │ [Open trace] [Node details]              │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Gap Panel                                │ │
│ │ Missing plan / no tests / blocked >5d    │ │
│ │ [Create Plan] [Source]                   │ │
│ └──────────────────────────────────────────┘ │
│ [Footer: sync <5s | v0.4]                    │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Dashboard] [Loading]                        │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ ████████████████████████████████████████ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ ████████████████████████████████████████ │ │
│ │ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ █████ graph skeleton ███████████████████ │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: retry________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Error: gmind serve unavailable]             │
│ [dashboard.state.retry] [Retry] [Use cached] │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Cached snapshot                           │ │
│ │ Coverage 61% | Done 103 | Gaps 7          │ │
│ │ Cause: /api/trace timeout                 │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: start________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Dashboard] [No data yet]                    │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Empty Workspace                           │ │
│ │ Import PRDs and sync tasks                │ │
│ │ [Import PRDs] [Run reindex]               │ │
│ │ [View setup guide]                        │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
