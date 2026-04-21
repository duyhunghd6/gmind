# Screen: Task List (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"]
root
└── shell [workspace.root]
    ├── header [data-ds-id="workspace.shell.header"]
    │   ├── logo
    │   ├── global-search [data-ds-id="workspace.shell.search"]
    │   └── notifications [data-ds-id="workspace.shell.notifications"]
    ├── navigation [data-ds-id="workspace.shell.sidebar"]
    │   ├── nav-link: Dashboard
    │   ├── nav-link: Board
    │   ├── nav-link: Tasks
    │   ├── nav-link: Trace
    │   ├── nav-link: Docs
    │   └── nav-link: Approval
    ├── route-shell
    │   ├── viewport: tablet
    │   ├── route-title: Task List
    │   ├── section: List controls
    │   │   ├── View toggle [data-ds-id="task-list.header.view-toggle"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   ├── Filter row [data-ds-id="task-list.filter.row"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── CSV export [data-ds-id="task-list.action.csv-export"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Task table
    │   │   ├── Task table [data-ds-id="task-list.table.main"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Task row [data-ds-id="task-list.table.row"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Bulk and paging
    │       ├── Pagination controls [data-ds-id="task-list.pagination.controls"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Bulk action bar [data-ds-id="task-list.bulk.actions"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.loading-skeleton"]
root
└── shell [workspace.root]
    ├── header [data-ds-id="workspace.shell.header"]
    │   ├── logo
    │   ├── global-search [data-ds-id="workspace.shell.search"]
    │   └── notifications [data-ds-id="workspace.shell.notifications"]
    ├── navigation [data-ds-id="workspace.shell.sidebar"]
    │   ├── nav-link: Dashboard
    │   ├── nav-link: Board
    │   ├── nav-link: Tasks
    │   ├── nav-link: Trace
    │   ├── nav-link: Docs
    │   └── nav-link: Approval
    ├── route-shell
    │   ├── viewport: tablet
    │   ├── route-title: Task List
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="task-list.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── View toggle [data-ds-id="task-list.header.view-toggle"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.error"] | [selector="task-list.state.retry"]
root
└── shell [workspace.root]
    ├── header [data-ds-id="workspace.shell.header"]
    │   ├── logo
    │   ├── global-search [data-ds-id="workspace.shell.search"]
    │   └── notifications [data-ds-id="workspace.shell.notifications"]
    ├── navigation [data-ds-id="workspace.shell.sidebar"]
    │   ├── nav-link: Dashboard
    │   ├── nav-link: Board
    │   ├── nav-link: Tasks
    │   ├── nav-link: Trace
    │   ├── nav-link: Docs
    │   └── nav-link: Approval
    ├── route-shell
    │   ├── viewport: tablet
    │   ├── route-title: Task List
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="task-list.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="task-list.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── View toggle [data-ds-id="task-list.header.view-toggle"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.empty"] | [selector="task-list.state.empty-cta"]
root
└── shell [workspace.root]
    ├── header [data-ds-id="workspace.shell.header"]
    │   ├── logo
    │   ├── global-search [data-ds-id="workspace.shell.search"]
    │   └── notifications [data-ds-id="workspace.shell.notifications"]
    ├── navigation [data-ds-id="workspace.shell.sidebar"]
    │   ├── nav-link: Dashboard
    │   ├── nav-link: Board
    │   ├── nav-link: Tasks
    │   ├── nav-link: Trace
    │   ├── nav-link: Docs
    │   └── nav-link: Approval
    ├── route-shell
    │   ├── viewport: tablet
    │   ├── route-title: Task List
    │   ├── state-surface: empty
    │   │   ├── Empty list [selector="task-list.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="task-list.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── View toggle [data-ds-id="task-list.header.view-toggle"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: bulk-processing
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.bulk-processing"]
root
└── shell [workspace.root]
    ├── header [data-ds-id="workspace.shell.header"]
    │   ├── logo
    │   ├── global-search [data-ds-id="workspace.shell.search"]
    │   └── notifications [data-ds-id="workspace.shell.notifications"]
    ├── navigation [data-ds-id="workspace.shell.sidebar"]
    │   ├── nav-link: Dashboard
    │   ├── nav-link: Board
    │   ├── nav-link: Tasks
    │   ├── nav-link: Trace
    │   ├── nav-link: Docs
    │   └── nav-link: Approval
    ├── route-shell
    │   ├── viewport: tablet
    │   ├── route-title: Task List
    │   ├── state-surface: bulk-processing
    │   │   ├── Bulk processing strip [selector="task-list.state.bulk-processing"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Bulk action bar [selector="task-list.bulk.actions"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── View toggle [data-ds-id="task-list.header.view-toggle"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
