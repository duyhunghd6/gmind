# Screen: RTM Dashboard (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── mobile-menu-trigger
│   ├── logo
│   ├── global-search [data-ds-id="workspace.shell.search"]
│   └── notifications [data-ds-id="workspace.shell.notifications"]
├── shell.status-strip [data-ds-id="workspace.shell.connection-status"]
│   ├── connection-pill
│   ├── route-label
│   └── refresh-hint
├── dashboard.kpi.row [data-ds-id="dashboard.kpi.row"]
│   ├── kpi-card: coverage_percent
│   └── kpi-card-stack
│       ├── kpi-card: tasks_done_count
│       └── kpi-card: gaps_found_count
├── dashboard.panel.coverage [data-ds-id="dashboard.panel.coverage"]
│   ├── heatmap-summary
│   ├── section-chip-row
│   └── open-linked-tasks-action
├── dashboard.panel.progress [data-ds-id="dashboard.panel.progress"]
│   ├── status-bars
│   └── timeline-mini-strip
├── dashboard.panel.graph [data-ds-id="dashboard.panel.graph"]
│   ├── graph-mini-preview
│   ├── node-details-action
│   └── open-trace-action
├── dashboard.panel.gaps [data-ds-id="dashboard.panel.gaps"]
│   ├── gap-summary-list
│   ├── create-plan-action
│   └── source-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
    ├── sync-status
    └── version
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.status-strip [data-ds-id="workspace.shell.connection-status"]
├── dashboard.state.loading-skeleton
│   ├── kpi-skeleton-card
│   ├── panel-skeleton: coverage
│   ├── panel-skeleton: progress
│   └── panel-skeleton: graph
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── dashboard.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── open-docs-action
│   └── cached-snapshot-card
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.status-strip [data-ds-id="workspace.shell.connection-status"]
├── dashboard.state.empty
│   ├── empty-message
│   ├── setup-copy
│   └── onboarding-card
├── dashboard.state.empty-cta
│   ├── import-prds-action
│   ├── run-reindex-action
│   └── view-guide-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
