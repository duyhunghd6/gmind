# Screen: Beads Trace Explorer (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── trace.toolbar.root [data-ds-id="trace.toolbar.root"]
│   ├── root-selector
│   ├── depth-selector
│   └── node-filter-set
├── trace.canvas.graph [data-ds-id="trace.canvas.graph"]
│   ├── graph-canvas
│   ├── zoom-controls
│   └── query-time-ms
├── trace.canvas.legend [data-ds-id="trace.canvas.legend"]
├── trace.panel.node-detail [data-ds-id="trace.panel.node-detail"]
│   ├── bottom-sheet-header
│   ├── coverage
│   └── action-row
├── trace.panel.connected-nodes [data-ds-id="trace.panel.connected-nodes"]
│   └── connected-node-list
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── trace.state.loading-skeleton
│   ├── toolbar-skeleton
│   ├── graph-skeleton
│   └── bottom-sheet-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── trace.state.error
│   ├── error-banner
│   ├── retry-action
│   └── change-root-action
├── trace.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── trace.state.empty
│   ├── empty-message
│   └── filter-hint
├── trace.state.empty-cta
│   ├── change-root-action
│   └── clear-filters-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: partial
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── trace.state.partial
│   ├── partial-banner
│   └── retry-github-action
├── trace.state.partial-badge
└── shell.footer [data-ds-id="workspace.shell.footer"]
