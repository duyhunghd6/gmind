# Screen: Task Detail (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"]
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
    │   ├── route-title: Task Detail
    │   ├── section: Editable header
    │   │   ├── Task header [data-ds-id="task-detail.header.summary"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   ├── Status field [data-ds-id="task-detail.field.status"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   ├── Assignee field [data-ds-id="task-detail.field.assignee"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   ├── Priority field [data-ds-id="task-detail.field.priority"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── QA status field [data-ds-id="task-detail.field.qa-status"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Primary tabs
    │   │   ├── Detail tab [data-ds-id="task-detail.tab.detail"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Activity tab [data-ds-id="task-detail.tab.activity"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Trace and delivery context
    │       ├── Graph tab [data-ds-id="task-detail.tab.graph"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Code tab [data-ds-id="task-detail.tab.code"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── RTE context block [data-ds-id="task-detail.rte.context"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.loading-skeleton"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="task-detail.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.error"] | [selector="task-detail.state.retry"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="task-detail.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="task-detail.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.empty"] | [selector="task-detail.state.empty-cta"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: empty
    │   │   ├── Empty task shell [selector="task-detail.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="task-detail.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: offline
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.offline"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: offline
    │   │   ├── Offline banner [selector="task-detail.state.offline"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Read-only mode [selector="task-detail.state.read-only"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: saving
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.saving"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: saving
    │   │   └── Saving strip [selector="task-detail.state.saving"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: not-found
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.not-found"] | [selector="task-detail.state.back-link"]
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
    │   ├── route-title: Task Detail
    │   ├── state-surface: not-found
    │   │   ├── Not found panel [selector="task-detail.state.not-found"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Back link [selector="task-detail.state.back-link"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Task header [data-ds-id="task-detail.header.summary"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
