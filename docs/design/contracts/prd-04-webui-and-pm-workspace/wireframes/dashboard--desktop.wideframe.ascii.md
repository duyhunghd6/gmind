# Screen: RTM Dashboard (desktop)
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
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: PRD, task, trace____________] [Bell] [Ava]  │ ← header
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Online] [Breadcrumb: Dashboard] [Range: 30d ▼]      │
│ Board        ├───────────────────────────────────────────────────────┤
│ Tasks        │ ┌──────────────┬──────────────┬──────────────┐ [100%] │
│ Trace        │ │ Coverage 78% │ Done 104     │ Gaps 7       │        │
│ Docs         │ │ 12 PRDs live │ In Prog 22   │ P0:2 P1:5    │        │
│ Approval     │ │ 184 links     │ Blocked 9    │ Plans due 3  │        │
│──────────────│ └──────────────┴──────────────┴──────────────┘        │
│ Status: Live │ ┌───────────────────────────┬───────────────────────┐ │ [50%|50%]
│ Sync <5s     │ │ Coverage Panel            │ Progress Panel        │ │
│ Footer meta  │ │ ┌───────────────────────┐ │ ┌───────────────────┐ │ │
│              │ │ │ PRD-00  ████████ 92% │ │ │ Done     104 71% │ │ │
│              │ │ │ PRD-02  ██████░░ 76% │ │ │ In Prog   22 15% │ │ │
│              │ │ │ PRD-04  █████░░░ 61% │ │ │ Blocked    9  6% │ │ │
│              │ │ ├───────────────────────┤ │ ├───────────────────┤ │ │
│              │ │ │ Section Drilldown     │ │ │ Timeline Summary  │ │ │
│              │ │ │ s6  ███████░ 88%      │ │ │ W1 14  W2 19 W3 8 │ │ │
│              │ │ │ s10 ████░░░░ 54%      │ │ │ [Filter status ▼] │ │ │
│              │ │ │ [Open linked tasks]   │ │ │ [Export summary]  │ │ │
│              │ │ └───────────────────────┘ │ └───────────────────┘ │ │
│              │ ├───────────────────────────┼───────────────────────┤ │
│              │ │ Graph Panel               │ Gap Panel             │ │
│              │ │ ┌───────────────────────┐ │ ┌───────────────────┐ │ │
│              │ │ │ Node Filter: All ▼    │ │ │ Gap 1 PRD-03 s2   │ │ │
│              │ │ │  ●PRD──◆Plan──■Task   │ │ │ no linked plan    │ │ │
│              │ │ │   ╲        ╲  ○PR     │ │ │ Gap 2 bd-k91      │ │ │
│              │ │ │ [Node detail sidepeek]│ │ │ tests stale 11d   │ │ │
│              │ │ │ [Open full trace]     │ │ │ [Create Plan]     │ │ │
│              │ │ └───────────────────────┘ │ │ [Route to source] │ │ │
│              │ │                           │ └───────────────────┘ │ │
│              │ └───────────────────────────┴───────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Nav live     │ [Dashboard] [Loading latest coverage]                │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌──────────────┬──────────────┬──────────────┐        │
│              │ │ ████████████ │ ████████████ │ ████████████ │        │
│              │ └──────────────┴──────────────┴──────────────┘        │
│              │ ┌───────────────────────────┬───────────────────────┐ │
│              │ │ ┌───────────────────────┐ │ ┌───────────────────┐ │ │
│              │ │ │ ████████████████████  │ │ │ ████████████████  │ │ │
│              │ │ │ ████████░░░░░░░░░░░░  │ │ │ ████████░░░░░░░░  │ │ │
│              │ │ └───────────────────────┘ │ └───────────────────┘ │ │
│              │ │ ┌───────────────────────┐ │ ┌───────────────────┐ │ │
│              │ │ │ █████ graph skeleton  │ │ │ ████████████████  │ │ │
│              │ │ │ ████████████████████  │ │ │ ███████░░░░░░░░░  │ │ │
│              │ │ └───────────────────────┘ │ └───────────────────┘ │ │
│              │ └───────────────────────────┴───────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; dashboard.state.error; dashboard.state.retry; dashboard.panel.coverage; dashboard.panel.progress
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.panel.coverage"] [data-ds-id="dashboard.panel.progress"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="dashboard.state.error"] [data-ds-id="dashboard.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: dashboard retry____________] [Bell] [Ava]    │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Sidebar live │ [Error Banner: Cannot reach /api/coverage] [Retry]   │
│              │ [dashboard.state.retry] [Open docs] [Use cached]     │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────┬───────────────────────┐ │
│              │ │ Cached Coverage Snapshot  │ │ Recovery Checklist   │ │
│              │ │ ┌───────────────────────┐ │ │ 1. Retry dashboard  │ │ │
│              │ │ │ PRD-04 61% 12m ago    │ │ │ 2. Check API health │ │ │
│              │ │ │ s6 88%  s10 54%       │ │ │ 3. Open Trace view  │ │ │
│              │ │ │ [Use cached panel]    │ │ │ [View logs]         │ │ │
│              │ │ └───────────────────────┘ │ └────────────────────┘ │ │
│              │ │ Cached Progress Panel      │                       │ │
│              │ │ Done 103 | In Prog 22      │                       │ │
│              │ └───────────────────────────┴───────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: setup trace______________] [Bell] [Ava]      │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Sidebar      │ [Dashboard] [No RTM data yet]                        │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Empty Workspace                                  │ │
│              │ │ ┌───────────────────────────────────────────────┐ │ │
│              │ │ │ Coverage Heatmap: waiting for first PRD       │ │ │
│              │ │ │ Task Progress: 0 synced work items            │ │ │
│              │ │ │ Graph Panel: no trace roots yet               │ │ │
│              │ │ │ Gap Panel: available after import             │ │ │
│              │ │ └───────────────────────────────────────────────┘ │ │
│              │ │ [Import PRDs] [Run reindex] [View setup guide]   │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
