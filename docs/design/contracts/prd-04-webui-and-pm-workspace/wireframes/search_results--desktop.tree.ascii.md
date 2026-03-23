# Screen: Search Results (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── search.header.query [data-ds-id="search.header.query"]
│   ├── query-input
│   ├── submit-action
│   └── results-count-summary
├── search.filter.panel [data-ds-id="search.filter.panel"]
│   ├── type-counts
│   ├── date-range-filters
│   ├── task-status-filters
│   ├── assignee-filter
│   └── clear-filters-action
├── search.results.group [data-ds-id="search.results.group"]
│   ├── result-group: Tasks
│   │   └── search.results.card [data-ds-id="search.results.card"]
│   ├── result-group: Docs
│   │   └── search.results.card [data-ds-id="search.results.card"]
│   ├── result-group: Commits
│   │   └── search.results.card [data-ds-id="search.results.card"]
│   └── result-group: PRs
│       └── search.results.card [data-ds-id="search.results.card"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── search.state.loading-skeleton
│   ├── filter-skeleton
│   ├── result-card-skeleton
│   └── backend-status-copy
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── search.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── clear-filters-action
│   └── cached-results-summary
├── search.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── search.state.empty
│   ├── no-results-message
│   ├── query-echo
│   └── alternate-keywords
├── search.state.empty-suggestions [data-ds-id="search.state.empty-suggestions"]
│   ├── suggestion-chip: icon
│   ├── suggestion-chip: button
│   └── suggestion-chip: svg
└── shell.footer [data-ds-id="workspace.shell.footer"]
