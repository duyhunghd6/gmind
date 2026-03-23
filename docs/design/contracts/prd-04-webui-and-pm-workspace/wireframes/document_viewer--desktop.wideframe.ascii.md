# Screen: Document Viewer (desktop)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; docs.tree.nav; docs.filter.source-type; docs.content.breadcrumb; docs.content.body; docs.content.beads-links; docs.content.coverage-indicator; docs.action.open-trace
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="docs.tree.nav"] [data-ds-id="docs.filter.source-type"] [data-ds-id="docs.content.breadcrumb"] [data-ds-id="docs.content.body"] [data-ds-id="docs.content.beads-links"] [data-ds-id="docs.content.coverage-indicator"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="docs.action.open-trace"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: PRD, commit, session_______] [Bell] [Ava]    │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ [Docs] [Type: All ▼] [Date: 30d ▼] [Search in doc]   │
│ Board        ├──────────────────────┬────────────────────────────────┤ [32%|68%]
│ Tasks        │ Doc Tree / Filters   │ Document Content               │
│ Trace        │ ┌──────────────────┐ │ Breadcrumb Docs > PRDs > PRD-04│
│ Docs         │ │ ▼ PRDs           │ │ ┌────────────────────────────┐ │
│ Approval     │ │   PRD-00         │ │ │ # PRD 04 WebUI            │ │
│──────────────│ │   PRD-04         │ │ │ metadata + source type     │ │
│ Online       │ │ ▼ Chats          │ │ │ rendered markdown body     │ │
│ Footer       │ │   session-rte-21 │ │ │ br-prd04-s5 autolink       │ │
│              │ │ ▼ Commits        │ │ │ coverage 78% [bar]         │ │
│              │ │   a1b2c3d        │ │ │ [Open Trace] [Copy ID]     │ │
│              │ │ [Collapse all]   │ │ └────────────────────────────┘ │
│              │ ├──────────────────┤ │ Linked IDs                    │
│              │ │ Type filter      │ │ br-prd04-s1 br-prd04-s10      │
│              │ │ Source count     │ │                                │
│              │ └──────────────────┘ │                                │
└══════════════┴──────────────────────┴────────────────────────────────┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; docs.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="docs.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Docs nav     │ ┌──────────────────────┬────────────────────────────┐ │
│              │ │ ███████ tree ██████  │ │ █████ title ███████████  │ │
│              │ │ ██████░░░░░░░░░░░░░  │ │ ███████████████████████  │ │
│              │ └──────────────────────┴────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; docs.state.error; docs.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="docs.state.error"] [data-ds-id="docs.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: docs retry____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Docs nav     │ [Error: Cannot load documents from Zvec]             │
│              │ [Retry] [Run reindex] [Use cached doc]               │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Last opened doc snapshot                          │ │
│              │ │ PRD-04 cached 18m ago                             │ │
│              │ │ [Open Trace] [Copy cached ID]                     │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; docs.state.empty; docs.state.empty-cta
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="docs.state.empty"] [data-ds-id="docs.state.empty-cta"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: index docs____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Docs nav     │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No indexed documents found                        │ │
│              │ │ Run gmind reindex to populate Docs viewer         │ │
│              │ │ [Run reindex] [Open setup guide]                  │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
