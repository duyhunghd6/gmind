# Screen: Search Results (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"]
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
    │   ├── viewport: mobile
    │   ├── route-title: Search Results
    │   ├── section: Search controls
    │   │   ├── Search bar [data-ds-id="search.header.query"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Filter panel [data-ds-id="search.filter.panel"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Grouped results
    │       ├── Result groups [data-ds-id="search.results.group"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Result card [data-ds-id="search.results.card"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.loading-skeleton"]
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
    │   ├── viewport: mobile
    │   ├── route-title: Search Results
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="search.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Search bar [data-ds-id="search.header.query"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.error"] | [selector="search.state.retry"]
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
    │   ├── viewport: mobile
    │   ├── route-title: Search Results
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="search.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="search.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Search bar [data-ds-id="search.header.query"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.empty"] | [selector="search.state.empty-cta"]
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
    │   ├── viewport: mobile
    │   ├── route-title: Search Results
    │   ├── state-surface: empty
    │   │   ├── Empty results [selector="search.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Suggestions [selector="search.state.empty-suggestions"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Search bar [data-ds-id="search.header.query"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
