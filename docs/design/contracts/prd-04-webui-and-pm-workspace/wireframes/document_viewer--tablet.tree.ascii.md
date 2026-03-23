# Screen: Document Viewer (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── docs.filter.source-type [data-ds-id="docs.filter.source-type"]
│   ├── source-type-selector
│   └── date-range-selector
├── docs.tree.nav [data-ds-id="docs.tree.nav"]
│   ├── top-doc-selector
│   └── grouped-source-preview
├── docs.content.breadcrumb [data-ds-id="docs.content.breadcrumb"]
├── docs.content.body [data-ds-id="docs.content.body"]
│   ├── document-title
│   ├── rendered-content
│   └── search-within-doc
├── docs.content.beads-links [data-ds-id="docs.content.beads-links"]
│   ├── linked-id: br-prd04-s5
│   └── linked-id: br-prd04-s10
├── docs.content.coverage-indicator [data-ds-id="docs.content.coverage-indicator"]
├── docs.action.open-trace [data-ds-id="docs.action.open-trace"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── docs.state.loading-skeleton
│   ├── selector-skeleton
│   └── content-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── docs.state.error
│   ├── error-banner
│   ├── retry-action
│   └── reindex-action
├── docs.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── docs.state.empty
│   ├── empty-message
│   └── indexing-hint
├── docs.state.empty-cta
│   ├── run-reindex-action
│   └── setup-guide-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
