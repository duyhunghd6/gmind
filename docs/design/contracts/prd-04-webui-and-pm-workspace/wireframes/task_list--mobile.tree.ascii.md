# Screen: Task List (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-list.header.view-toggle [data-ds-id="task-list.header.view-toggle"]
│   ├── board-toggle
│   ├── list-toggle
│   └── mobile-filter-trigger
├── task-list.filter.row [data-ds-id="task-list.filter.row"]
│   ├── filter-drawer
│   └── sort-selector
├── task-list.action.csv-export [data-ds-id="task-list.action.csv-export"]
├── task-list.table.main [data-ds-id="task-list.table.main"]
│   ├── mobile-card-list
│   └── task-list.table.row [data-ds-id="task-list.table.row"]
│       ├── task-id
│       ├── title
│       ├── status-and-priority
│       ├── assignee-and-qa
│       └── row-actions
├── task-list.pagination.controls [data-ds-id="task-list.pagination.controls"]
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-list.state.loading-skeleton
│   ├── list-loading-copy
│   └── card-skeletons
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-list.state.error
│   ├── error-banner
│   ├── retry-action
│   └── open-board-action
├── task-list.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-list.state.empty
│   ├── empty-message
│   └── filter-summary
├── task-list.state.empty-cta
│   ├── clear-filters-action
│   └── create-task-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: bulk-processing
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-list.state.bulk-processing
│   ├── processing-banner
│   └── selected-card-spinners
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
