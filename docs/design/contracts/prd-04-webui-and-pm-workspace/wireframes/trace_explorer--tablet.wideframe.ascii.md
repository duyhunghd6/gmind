# Screen: Beads Trace Explorer (tablet)
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
┌════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤ [7%|93%]
│ Rail │ [Root: br-prd04-s5 ▼] [Depth 2 ▼]                  │
│      │ [PRD][Plan][Task][Commit][PR]                      │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Graph Canvas                                    │ │
│      │ │ ● PRD ─ ◆ Plan ─ ■ Task ─ ○ Commit              │ │
│      │ │ ▲ Chat ─ ⬡ PR ─ ★ RTE                           │ │
│      │ │ [Zoom +] [Zoom -] [Fit]                         │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Bottom Sheet Detail Panel                       │ │
│      │ │ br-prd04-s5 | Coverage 78%                      │ │
│      │ │ excerpt + connected nodes                       │ │
│      │ │ [Open Doc] [View Impact]                        │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Root: br-prd04-s5 ▼]                              │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ ████████ graph skeleton ██████████████████████  │ │
│      │ │ █████ querying data sources ██████████████████  │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: retry trace____________] [Bell] [Ava]     │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Error: Trace query failed] [Retry]                │
│      │ [Change root] [Open docs]                          │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ No graph data loaded                            │ │
│      │ │ [Open docs] [Open tasks]                        │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: trace id____________] [Bell] [Ava]        │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ ┌─────────────────────────────────────────────────┐ │
│      │ │ No linked entities for this root                │ │
│      │ │ [Change root] [Clear filters]                   │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
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
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: github sync__________] [Bell] [Ava]       │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Partial: local graph ready, GitHub loading]       │
│      │ [Retry GitHub]                                     │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Graph Canvas local nodes live                   │ │
│      │ │ PR badges pending                               │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
