# Screen: Document Viewer (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── docs.filter.source-type [data-ds-id="docs.filter.source-type"]
│   ├── source-type-selector
│   └── date-range-selector
├── docs.tree.nav [data-ds-id="docs.tree.nav"]
│   ├── source-group: Docs
│   │   ├── doc-node: PRD-00
│   │   └── doc-node: PRD-04
│   ├── source-group: Chats
│   │   └── doc-node: session-rte-21
│   ├── source-group: Commits
│   │   └── doc-node: a1b2c3d
│   └── source-group: RTE
│       └── doc-node: approval-12
├── docs.content.breadcrumb [data-ds-id="docs.content.breadcrumb"]
│   ├── crumb: Docs
│   └── crumb: PRDs
├── docs.content.body [data-ds-id="docs.content.body"]
│   ├── document-title
│   ├── source-metadata
│   ├── rendered-content
│   └── search-within-doc
├── docs.content.beads-links [data-ds-id="docs.content.beads-links"]
│   ├── linked-id: br-prd04-s1
│   └── linked-id: br-prd04-s10
├── docs.content.coverage-indicator [data-ds-id="docs.content.coverage-indicator"]
│   ├── coverage-bar
│   └── coverage-label
├── docs.action.open-trace [data-ds-id="docs.action.open-trace"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── docs.state.loading-skeleton
│   ├── tree-skeleton
│   ├── breadcrumb-skeleton
│   └── content-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── docs.state.error
│   ├── error-banner
│   ├── retry-action
│   └── reindex-action
├── docs.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── docs.state.empty
│   ├── empty-message
│   └── indexing-hint
├── docs.state.empty-cta
│   ├── run-reindex-action
│   └── setup-guide-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
