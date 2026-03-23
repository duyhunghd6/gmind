# Screen: Search Results (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── search.header.query [data-ds-id="search.header.query"]
│   ├── query-input
│   ├── submit-action
│   └── results-count-summary
├── search.filter.panel [data-ds-id="search.filter.panel"]
│   ├── expandable-filter-trigger
│   ├── type-counts
│   ├── date-range-filters
│   ├── task-status-filters
│   └── assignee-filter
├── search.results.group [data-ds-id="search.results.group"]
│   ├── group: Tasks
│   ├── group: Docs
│   └── group: Commits-and-PRs
├── search.results.card [data-ds-id="search.results.card"]
│   ├── result-title
│   ├── snippet-highlight
│   └── destination-link
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── search.state.loading-skeleton
│   ├── query-header-skeleton
│   ├── filter-panel-skeleton
│   └── result-card-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── search.state.error
│   ├── error-banner
│   ├── retry-action
│   └── clear-filters-action
├── search.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── search.state.empty
│   ├── no-results-message
│   └── query-echo
├── search.state.empty-suggestions [data-ds-id="search.state.empty-suggestions"]
│   ├── suggestion-chip: icon
│   ├── suggestion-chip: button
│   └── suggestion-chip: svg
└── shell.footer [data-ds-id="workspace.shell.footer"]
