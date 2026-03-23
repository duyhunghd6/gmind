# Screen: Search Results (desktop)
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
┌══════════════════════════════════════════════════════════════════════┐ [100%]
│ [Logo] [Global Search: icon change__________] [Bell] [Ava]          │
├══════════════┬═══════════════════════════════════════════════════════┤ [18%|82%]
│ Dashboard    │ Search [icon change____________] [Search]            │
│ Board        │ Results 23 (12 Tasks, 5 Docs, 3 Commits, 2 PRs)      │
│ Tasks        ├──────────────────────┬────────────────────────────────┤ [26%|74%]
│ Trace        │ Filter Panel         │ Result Groups                  │
│ Docs         │ Type counts          │ ▼ Tasks (12)                  │
│ Approval     │ [x] Tasks 12         │ ┌────────────────────────────┐ │
│──────────────│ [x] Docs 5           │ │ bd-x1y2 Change button      │ │
│ Online       │ [x] Commits 3        │ │ Status In Prog             │ │
│ Footer       │ [x] PRs 2            │ │ snippet "icon change"      │ │
│              │ Date ( )All (o)30d   │ │ [Open task]                │ │
│              │ Status [Open][Prog]  │ └────────────────────────────┘ │
│              │ Assignee [DevBot01]  │ ▼ Docs (5)                    │
│              │ [Clear filters]      │ ┌────────────────────────────┐ │
│              │                      │ │ PRD-04 §1 PM Fields        │ │
│              │                      │ │ snippet highlight          │ │
│              │                      │ │ [Open doc]                 │ │
│              │                      │ └────────────────────────────┘ │
│              │                      │ ▼ Commits / PRs / Chats        │
└══════════════┴──────────────────────┴────────────────────────────────┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search____________________________] [Bell] [Ava]     │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Search shell │ Results loading...                                   │
│              ├──────────────────────┬────────────────────────────────┤
│              │ █████ filter ██████  │ █████ result card ███████████  │
│              │ ██████████████████   │ █████████████████████████████  │
│              └──────────────────────┴────────────────────────────────┘
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: retry query____________] [Bell] [Ava]        │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Search shell │ [Error: Search backends unavailable] [Retry]         │
│              │ [Clear filters] [Use cached results]                 │
│              ├───────────────────────────────────────────────────────┤
│              │ ┌───────────────────────────────────────────────────┐ │
│              │ │ Last query summary                                │ │
│              │ │ 12 task results cached, docs stale               │ │
│              │ │ [Open docs] [Search tasks only]                  │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
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
┌══════════════════════════════════════════════════════════════════════┐
│ [Logo] [Global Search: no matches____________] [Bell] [Ava]         │
├══════════════┬═══════════════════════════════════════════════════════┤
│ Search shell │ ┌───────────────────────────────────────────────────┐ │
│              │ │ No results for "icon change legacy"             │ │
│              │ │ Try fewer filters or a different keyword         │ │
│              │ │ Suggestions: icon / button / svg                │ │
│              │ │ [Clear filters] [Search docs only]               │ │
│              │ └───────────────────────────────────────────────────┘ │
└══════════════┴═══════════════════════════════════════════════════════┘
