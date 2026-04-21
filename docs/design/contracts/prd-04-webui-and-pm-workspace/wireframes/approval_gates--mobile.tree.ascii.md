# Screen: Approval Gates (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"]
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
    │   ├── route-title: Approval Gates
    │   ├── section: Queue and evidence
    │   │   ├── Approval queue [data-ds-id="approval.queue.list"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Aggregate evidence panel [data-ds-id="approval.panel.aggregate"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Decision context
    │   │   ├── Approval context panel [data-ds-id="approval.panel.context"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Comment form [data-ds-id="approval.form.comment"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Approval actions
    │       ├── Approve action [data-ds-id="approval.action.approve"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Reject action [data-ds-id="approval.action.reject"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Manual override [data-ds-id="approval.action.manual-override"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.loading-skeleton"]
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
    │   ├── route-title: Approval Gates
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="approval.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Approval queue [data-ds-id="approval.queue.list"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.error"] | [selector="approval.state.retry"]
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
    │   ├── route-title: Approval Gates
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="approval.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Manual override [selector="approval.action.manual-override"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Approval queue [data-ds-id="approval.queue.list"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.empty"] | [selector="approval.state.empty-cta"]
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
    │   ├── route-title: Approval Gates
    │   ├── state-surface: empty
    │   │   └── Empty queue [selector="approval.state.empty"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Approval queue [data-ds-id="approval.queue.list"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: offline
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.offline"]
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
    │   ├── route-title: Approval Gates
    │   ├── state-surface: offline
    │   │   ├── Offline banner [selector="approval.state.offline"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Disabled actions [selector="approval.action.disabled"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Approval queue [data-ds-id="approval.queue.list"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
