# Screen: Beads Trace Explorer (desktop)
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
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: beads, plan, task________] [Bell] [Ava]      │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Root: br-prd04-s5 ▼] [Depth: 2 ▼] [Impact] [Refresh]│
│ Board        │ [PRD][Plan][Task][Commit][PR][Chat]                  │
│ Tasks        ├───────────────────────────────────────┬───────────────┤ [70%|30%]
│ Trace        │ Graph Canvas                          │ Detail Panel  │
│ Docs         │ ┌───────────────────────────────────┐ │ br-prd04-s5   │
│ Approval     │ │ ● PRD-04-s5 ──── ◆ Plan-01       │ │ Type PRD Sec  │
│──────────────│ │      ╲          ╱   ╲            │ │ Coverage 78%  │
│ Online       │ │       ■ Task-bd-x1   ○ a1b2c3    │ │ Excerpt text  │
│ Footer       │ │        ╲          ╲   ⬡ PR #48   │ │ Plans 3       │
│              │ │         ▲ chat-23   ★ RTE App    │ │ Tasks 12      │
│              │ ├───────────────────────────────────┤ │ Connected     │
│              │ │ Zoom [+][-] [Fit] [Pan]          │ │ - Plan-01     │
│              │ │ Legend ●PRD ◆Plan ■Task ○Commit  │ │ - bd-x1       │
│              │ │       ▲Chat ⬡PR ★RTE             │ │ [Open Doc]    │
│              │ │ Query 48ms | 12 nodes | 15 edges │ │ [View Impact] │
│              │ └───────────────────────────────────┘ │               │
└══════════════┴───────────────────────────────────────┴───────────────┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Trace nav    │ [Root: br-prd04-s5 ▼] [Depth: 2 ▼]                   │
│              ├───────────────────────────────────────┬───────────────┤
│              │ █████████ graph skeleton ████████████ │ ████████████  │
│              │ █████ querying 5 data sources ███████ │ ████████████  │
│              └───────────────────────────────────────┴───────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: trace retry____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Trace nav    │ [Error: gmind trace query failed]                    │
│              │ [Retry] [Change ID] [Open docs]                      │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No graph data loaded                              │ │
│              │ │ Check Beads ID format or API health               │ │
│              │ │ [Open tasks] [Use previous root]                  │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: new trace____________] [Bell] [Ava]          │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Trace nav    │ [Root: bd-unknown ▼]                                 │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No linked entities found for this Beads ID        │ │
│              │ │ Try another root or reduce filters                │ │
│              │ │ [Change root] [Open docs] [Open tasks]            │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: trace github___________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Trace nav    │ [Partial: GitHub data still loading] [Retry GitHub]  │
│              ├───────────────────────────────────────┬───────────────┤
│              │ Local graph ready                     │ Detail Panel  │
│              │ ● PRD ─ ◆ Plan ─ ■ Task               │ PR badges     │
│              │ ○ Commit loaded | ⬡ PR pending...     │ loading badge │
│              │ [Zoom controls] [Filter toolbar]      │ [Open Doc]    │
│              └───────────────────────────────────────┴───────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
