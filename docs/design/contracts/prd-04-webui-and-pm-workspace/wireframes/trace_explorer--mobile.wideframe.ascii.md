# Screen: Beads Trace Explorer (mobile)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; trace.toolbar.root; trace.canvas.graph; trace.canvas.legend; trace.panel.node-detail; trace.panel.connected-nodes; trace.action.impact
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="trace.toolbar.root"] [data-ds-id="trace.canvas.graph"] [data-ds-id="trace.canvas.legend"] [data-ds-id="trace.panel.node-detail"] [data-ds-id="trace.panel.connected-nodes"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="trace.action.impact"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐ [100%]
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Root: br-prd04-s5 ▼] [Depth 2 ▼]            │
│ [PRD][Plan][Task][PR]                        │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Simplified Graph / Tree View             │ │
│ │ br-prd04-s5                              │ │
│ │ ├ Plan-01                                │ │
│ │ │ └ Task-bd-x1                           │ │
│ │ │   └ Commit-a1b2                        │ │
│ │ │     └ PR-48                            │ │
│ │ └ Chat-23                                │ │
│ │ [Pinch zoom] [Open overlay]              │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Full-screen Detail Overlay trigger       │ │
│ │ Coverage 78% | linked nodes 12           │ │
│ │ [Open Doc] [Impact]                      │ │
│ └──────────────────────────────────────────┘ │
│ [Footer: 12 nodes | 48ms]                   │
└══════════════════════════════════════════════┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; trace.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="trace.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search________] [Bell]           │
├══════════════════════════════════════════════┤
│ [Root: br-prd04-s5 ▼]                        │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ █████ graph skeleton ███████████████████ │ │
│ │ █████ querying sources █████████████████ │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; trace.state.error; trace.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="trace.state.error"] [data-ds-id="trace.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: retry________] [Bell]    │
├══════════════════════════════════════════════┤
│ [Error: Trace query failed]                  │
│ [Retry] [Change root] [Open docs]            │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ No graph data loaded                      │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; trace.state.empty; trace.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="trace.state.empty"] [data-ds-id="trace.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: id__________] [Bell]     │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ No linked entities for this root          │ │
│ │ [Change root] [Clear filters]             │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
## State: partial
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; trace.state.partial; trace.state.partial-badge
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="trace.state.partial"] [data-ds-id="trace.state.partial-badge"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════┐
│ [☰] [Logo] [Search: github________] [Bell]   │
├══════════════════════════════════════════════┤
│ [Partial: local graph ready]                 │
│ [GitHub data loading...] [Retry]             │
├══════════════════════════════════════════════┤
│ ┌──────────────────────────────────────────┐ │
│ │ Tree view live, PR badges pending         │ │
│ └──────────────────────────────────────────┘ │
└══════════════════════════════════════════════┘
