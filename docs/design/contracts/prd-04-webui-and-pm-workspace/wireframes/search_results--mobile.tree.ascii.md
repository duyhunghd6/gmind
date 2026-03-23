# Screen: Search Results (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── search.header.query [data-ds-id="search.header.query"]
│   ├── query-input
│   ├── submit-action
│   └── filter-drawer-trigger
├── search.filter.panel [data-ds-id="search.filter.panel"]
│   ├── mobile-filter-drawer
│   ├── type-counts
│   └── date-and-status-filters
├── search.results.group [data-ds-id="search.results.group"]
│   ├── group: Tasks
│   ├── group: Docs
│   └── group: Commits-and-PRs-and-Chats
├── search.results.card [data-ds-id="search.results.card"]
│   ├── result-title
│   ├── snippet-highlight
│   └── destination-link
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── search.state.loading-skeleton
│   ├── filter-trigger-skeleton
│   └── result-card-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── search.state.error
│   ├── error-banner
│   ├── retry-action
│   └── clear-filters-action
├── search.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── search.state.empty
│   ├── no-results-message
│   └── query-echo
├── search.state.empty-suggestions [data-ds-id="search.state.empty-suggestions"]
│   ├── suggestion-chip: icon
│   ├── suggestion-chip: button
│   └── suggestion-chip: svg
└── shell.footer [data-ds-id="workspace.shell.footer"]
