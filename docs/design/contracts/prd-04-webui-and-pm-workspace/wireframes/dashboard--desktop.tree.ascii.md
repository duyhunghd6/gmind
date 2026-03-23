# Screen: RTM Dashboard (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── logo
│   ├── global-search [data-ds-id="workspace.shell.search"]
│   ├── notifications [data-ds-id="workspace.shell.notifications"]
│   └── user-avatar
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
│   ├── nav-link: Dashboard
│   ├── nav-link: Board
│   ├── nav-link: Tasks
│   ├── nav-link: Trace
│   ├── nav-link: Docs
│   ├── nav-link: Approval
│   └── connection-status [data-ds-id="workspace.shell.connection-status"]
├── dashboard.kpi.row [data-ds-id="dashboard.kpi.row"]
│   ├── kpi-card: coverage_percent
│   ├── kpi-card: tasks_done_count
│   └── kpi-card: gaps_found_count
├── dashboard.panel.coverage [data-ds-id="dashboard.panel.coverage"]
│   ├── prd-bar-list
│   ├── section-drilldown
│   │   ├── section-row: br-prd04-s6
│   │   ├── section-row: br-prd04-s10
│   │   └── open-linked-tasks-action
│   └── refresh-control
├── dashboard.panel.progress [data-ds-id="dashboard.panel.progress"]
│   ├── status-counts
│   ├── timeline-summary
│   └── status-filter-action
├── dashboard.panel.graph [data-ds-id="dashboard.panel.graph"]
│   ├── graph-filter-bar
│   ├── graph-canvas-preview
│   ├── node-detail-peek
│   └── open-full-trace-action
└── dashboard.panel.gaps [data-ds-id="dashboard.panel.gaps"]
    ├── gap-list
    │   ├── gap-item: missing-plan
    │   ├── gap-item: no-tests
    │   └── gap-item: low-coverage
    ├── create-plan-action
    └── source-route-link
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── logo
│   ├── global-search-skeleton
│   ├── notifications
│   └── user-avatar
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
│   ├── nav-link-set
│   └── connection-status
├── dashboard.state.loading-skeleton
│   ├── kpi-skeleton-row
│   ├── coverage-panel-skeleton
│   ├── progress-panel-skeleton
│   ├── graph-panel-skeleton
│   └── gap-panel-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
    ├── version
    └── uptime
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── dashboard.state.error
│   ├── error-banner
│   │   ├── cause-text
│   │   ├── retry-action
│   │   └── logs-action
│   ├── cached-coverage-panel
│   ├── cached-progress-panel
│   └── recovery-steps
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── dashboard.state.empty
│   ├── empty-message
│   ├── empty-metrics-summary
│   └── empty-illustration-slot
├── dashboard.state.empty-cta
│   ├── run-reindex-action
│   ├── import-prds-action
│   └── view-guide-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
