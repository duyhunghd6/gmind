# Screen: RTM Dashboard (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── logo
│   ├── global-search [data-ds-id="workspace.shell.search"]
│   ├── notifications [data-ds-id="workspace.shell.notifications"]
│   └── user-avatar
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
│   ├── nav-icon: Dashboard
│   ├── nav-icon: Board
│   ├── nav-icon: Tasks
│   ├── nav-icon: Trace
│   ├── nav-icon: Docs
│   ├── nav-icon: Approval
│   └── connection-status [data-ds-id="workspace.shell.connection-status"]
├── dashboard.kpi.row [data-ds-id="dashboard.kpi.row"]
│   ├── kpi-card: coverage_percent
│   └── kpi-card-group
│       ├── kpi-card: tasks_done_count
│       └── kpi-card: gaps_found_count
├── dashboard.panel.coverage [data-ds-id="dashboard.panel.coverage"]
│   ├── heatmap-bars
│   ├── section-list
│   └── open-linked-tasks-action
├── dashboard.panel.progress [data-ds-id="dashboard.panel.progress"]
│   ├── progress-bars
│   ├── timeline-strip
│   └── filter-action
├── dashboard.panel.graph [data-ds-id="dashboard.panel.graph"]
│   ├── graph-preview
│   ├── node-details-preview
│   └── open-full-trace-action
└── dashboard.panel.gaps [data-ds-id="dashboard.panel.gaps"]
    ├── gap-list
    ├── create-plan-action
    └── source-link-set
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── dashboard.state.loading-skeleton
│   ├── kpi-skeleton-row
│   ├── stacked-panel-skeleton: coverage
│   ├── stacked-panel-skeleton: progress
│   ├── stacked-panel-skeleton: graph
│   └── stacked-panel-skeleton: gaps
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── dashboard.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── cached-summary-card
│   └── route-links
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── dashboard.state.empty
│   ├── empty-message
│   ├── setup-checklist
│   └── helper-copy
├── dashboard.state.empty-cta
│   ├── import-prds-action
│   ├── create-first-task-action
│   └── help-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
