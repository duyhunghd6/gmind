# Screen: Beads Trace Explorer (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"]
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
    │   ├── route-title: Beads Trace Explorer
    │   ├── section: Trace controls
    │   │   ├── Trace toolbar [data-ds-id="trace.toolbar.root"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Graph legend [data-ds-id="trace.canvas.legend"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Graph exploration
    │   │   └── Graph canvas [data-ds-id="trace.canvas.graph"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Node inspection
    │       ├── Node detail panel [data-ds-id="trace.panel.node-detail"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Connected nodes list [data-ds-id="trace.panel.connected-nodes"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Impact action [data-ds-id="trace.action.impact"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.loading-skeleton"]
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
    │   ├── route-title: Beads Trace Explorer
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="trace.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Trace toolbar [data-ds-id="trace.toolbar.root"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.error"] | [selector="trace.state.retry"]
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
    │   ├── route-title: Beads Trace Explorer
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="trace.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="trace.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Trace toolbar [data-ds-id="trace.toolbar.root"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.empty"] | [selector="trace.state.empty-cta"]
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
    │   ├── route-title: Beads Trace Explorer
    │   ├── state-surface: empty
    │   │   ├── Empty graph [selector="trace.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="trace.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Trace toolbar [data-ds-id="trace.toolbar.root"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: partial
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.partial"] | [selector="trace.state.partial-badge"]
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
    │   ├── route-title: Beads Trace Explorer
    │   ├── state-surface: partial
    │   │   ├── Partial data banner [selector="trace.state.partial"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Partial badge [selector="trace.state.partial-badge"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Trace toolbar [data-ds-id="trace.toolbar.root"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
