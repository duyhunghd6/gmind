# Screen: Task List (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-list.header.view-toggle [data-ds-id="task-list.header.view-toggle"]
│   ├── board-toggle
│   └── list-toggle
├── task-list.filter.row [data-ds-id="task-list.filter.row"]
│   ├── status-filter
│   ├── assignee-filter
│   ├── priority-filter
│   └── csv-shortcut
├── task-list.table.main [data-ds-id="task-list.table.main"]
│   ├── compressed-columns
│   ├── task-list.table.row [data-ds-id="task-list.table.row"]
│   │   ├── title-and-status
│   │   └── expandable-details-trigger
│   └── expanded-row-details
├── task-list.pagination.controls [data-ds-id="task-list.pagination.controls"]
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.loading-skeleton
│   ├── filter-row-skeleton
│   ├── header-row-skeleton
│   └── row-skeletons
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.error
│   ├── error-banner
│   ├── retry-action
│   └── cached-count-copy
├── task-list.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.empty
│   ├── empty-message
│   └── filter-summary
├── task-list.state.empty-cta
│   ├── clear-filters-action
│   └── create-task-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: bulk-processing
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-list.state.bulk-processing
│   ├── processing-banner
│   └── selected-row-spinners
├── task-list.bulk.actions [data-ds-id="task-list.bulk.actions"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
