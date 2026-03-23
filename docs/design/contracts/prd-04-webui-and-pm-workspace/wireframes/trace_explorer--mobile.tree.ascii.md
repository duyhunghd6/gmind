# Screen: Beads Trace Explorer (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── trace.toolbar.root [data-ds-id="trace.toolbar.root"]
│   ├── root-selector
│   ├── depth-selector
│   └── mobile-filter-chips
├── trace.canvas.graph [data-ds-id="trace.canvas.graph"]
│   ├── simplified-tree-view
│   ├── pinch-zoom-hint
│   └── overlay-trigger
├── trace.panel.node-detail [data-ds-id="trace.panel.node-detail"]
│   ├── full-screen-overlay-trigger
│   ├── coverage
│   └── action-row
├── trace.panel.connected-nodes [data-ds-id="trace.panel.connected-nodes"]
│   └── linked-node-count
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── trace.state.loading-skeleton
│   ├── toolbar-skeleton
│   └── graph-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── trace.state.error
│   ├── error-banner
│   ├── retry-action
│   └── change-root-action
├── trace.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── trace.state.empty
│   ├── empty-message
│   └── filter-hint
├── trace.state.empty-cta
│   ├── change-root-action
│   └── clear-filters-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: partial
├── shell.header [data-ds-id="workspace.shell.header"]
├── trace.state.partial
│   ├── partial-banner
│   └── retry-github-action
├── trace.state.partial-badge
└── shell.footer [data-ds-id="workspace.shell.footer"]
