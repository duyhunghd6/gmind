# Screen: Beads Trace Explorer (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── trace.toolbar.root [data-ds-id="trace.toolbar.root"]
│   ├── root-selector
│   ├── depth-selector
│   ├── node-filter-set
│   └── impact-action [data-ds-id="trace.action.impact"]
├── trace.canvas.graph [data-ds-id="trace.canvas.graph"]
│   ├── graph-nodes
│   ├── graph-edges
│   ├── zoom-controls
│   └── query-time-ms
├── trace.canvas.legend [data-ds-id="trace.canvas.legend"]
│   ├── legend-node-types
│   └── hover-help
├── trace.panel.node-detail [data-ds-id="trace.panel.node-detail"]
│   ├── node-metadata
│   ├── excerpt
│   ├── coverage
│   └── open-doc-action
├── trace.panel.connected-nodes [data-ds-id="trace.panel.connected-nodes"]
│   ├── connected-node-item: plan
│   └── connected-node-item: task
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── trace.state.loading-skeleton
│   ├── toolbar-skeleton
│   ├── graph-skeleton
│   └── detail-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── trace.state.error
│   ├── error-banner
│   ├── cause-text
│   ├── retry-action
│   └── change-root-action
├── trace.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── trace.state.empty
│   ├── empty-message
│   └── filter-hint
├── trace.state.empty-cta
│   ├── change-root-action
│   ├── open-docs-action
│   └── open-tasks-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: partial
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── trace.state.partial
│   ├── partial-banner
│   ├── local-data-ready-copy
│   └── retry-github-action
├── trace.state.partial-badge
│   └── github-loading-badge
├── trace.canvas.graph [data-ds-id="trace.canvas.graph"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
