# Screen: Document Viewer (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"]
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
    │   ├── route-title: Document Viewer
    │   ├── section: Navigation controls
    │   │   ├── Document tree [data-ds-id="docs.tree.nav"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Source filter [data-ds-id="docs.filter.source-type"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Document context
    │   │   ├── Breadcrumb [data-ds-id="docs.content.breadcrumb"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Coverage indicator [data-ds-id="docs.content.coverage-indicator"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Document reading surface
    │       ├── Content panel [data-ds-id="docs.content.body"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Beads autolinks [data-ds-id="docs.content.beads-links"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Open trace action [data-ds-id="docs.action.open-trace"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.loading-skeleton"]
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
    │   ├── route-title: Document Viewer
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="docs.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Document tree [data-ds-id="docs.tree.nav"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.error"] | [selector="docs.state.retry"]
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
    │   ├── route-title: Document Viewer
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="docs.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="docs.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Document tree [data-ds-id="docs.tree.nav"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.empty"] | [selector="docs.state.empty-cta"]
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
    │   ├── route-title: Document Viewer
    │   ├── state-surface: empty
    │   │   ├── Empty docs view [selector="docs.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="docs.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Document tree [data-ds-id="docs.tree.nav"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
