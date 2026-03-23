# Screen: Search Results (tablet)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; search.header.query; search.filter.panel; search.results.group; search.results.card; search.state.empty-suggestions
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ Screen Structure Trace ──────────────────────────────────────┐ │
│ │ [data-ds-id="search.header.query"] [data-ds-id="search.filter.panel"] [data-ds-id="search.results.group"] [data-ds-id="search.results.card"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="search.state.empty-suggestions"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤ [7%|93%]
│ Rail │ Search [icon change________] [Search]              │
│      │ Results 23                                         │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Expandable Filter Panel                         │ │
│      │ │ Type / Date / Status / Assignee                │ │
│      │ │ [Clear filters]                                │ │
│      │ └─────────────────────────────────────────────────┘ │
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ ▼ Tasks (12)                                    │ │
│      │ │ result card bd-x1y2                             │ │
│      │ │ ▼ Docs (5)                                      │ │
│      │ │ result card PRD-04 §1                           │ │
│      │ │ ▼ Commits / PRs                                 │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; search.state.loading-skeleton
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="search.state.loading-skeleton"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search____________________] [Bell] [Ava]          │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ █████ query header ███████████████████████████████  │
│      ├─────────────────────────────────────────────────────┤
│      │ █████ filter panel ██████████████████████████████  │
│      │ █████ result card ███████████████████████████████  │
└══════┴═════════════════════════════════════════════════════┘
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; search.state.error; search.state.retry
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="search.state.error"] [data-ds-id="search.state.retry"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: retry__________] [Bell] [Ava]             │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ [Error: Search service timeout] [Retry]            │
│      │ [Clear filters]                                    │
│      ├─────────────────────────────────────────────────────┤
│      │ ┌─────────────────────────────────────────────────┐ │
│      │ │ Cached task results available                   │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; search.state.empty; search.state.empty-suggestions
┌─ Trace Map ──────────────────────────────────────────────────────────┐
│ ┌─ Shell Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
│ ┌─ State Trace ─────────────────────────────────────────────────┐ │
│ │ [data-ds-id="search.state.empty"] [data-ds-id="search.state.empty-suggestions"] │ │
│ └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌════════════════════════════════════════════════════════════┐
│ [Logo] [Search: no match____________] [Bell] [Ava]        │
├══════┬═════════════════════════════════════════════════════┤
│ Rail │ ┌─────────────────────────────────────────────────┐ │
│      │ │ No results for this query                       │ │
│      │ │ Suggestions: icon / button / svg               │ │
│      │ │ [Clear filters] [Search docs]                  │ │
│      │ └─────────────────────────────────────────────────┘ │
└══════┴═════════════════════════════════════════════════════┘
