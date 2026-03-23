# Screen: Task List (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-list.header.view-toggle [data-ds-id="task-list.header.view-toggle"]
│   ├── board-toggle
│   └── list-toggle
├── task-list.filter.row [data-ds-id="task-list.filter.row"]
│   ├── status-filter
│   ├── assignee-filter
│   ├── priority-filter
│   ├── prd-filter
│   └── qa-status-filter
├── task-list.action.csv-export [data-ds-id="task-list.action.csv-export"]
├── task-list.table.main [data-ds-id="task-list.table.main"]
│   ├── header-checkbox
│   ├── sortable-columns
│   └── task-list.table.row [data-ds-id="task-list.table.row"]
│       ├── row-checkbox
│       ├── task-id
│       ├── title
│       ├── status
│       ├── priority
│       ├── assignee
│       └── qa-status
├── task-list.pagination.controls [data-ds-id="task-list.pagination.controls"]
│   ├── page-summary
│   ├── prev-button
│   └── next-button
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
│   ├── selected-count
│   ├── assign-options
│   ├── status-options
│   ├── priority-options
│   └── apply-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.loading-skeleton
│   ├── filter-row-skeleton
│   ├── header-row-skeleton
│   └── table-row-skeletons
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.error
│   ├── error-banner
│   ├── retry-action
│   └── cached-count-copy
├── task-list.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.empty
│   ├── empty-message
│   ├── filter-summary
│   └── no-results-copy
├── task-list.state.empty-cta
│   ├── clear-filters-action
│   └── create-task-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: bulk-processing
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.bulk-processing
│   ├── processing-banner
│   ├── selected-row-spinners
│   └── optimistic-update-copy
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
