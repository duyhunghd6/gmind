# Screen: RTM Dashboard (desktop)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"]
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
    │   ├── viewport: desktop
    │   ├── route-title: RTM Dashboard
    │   ├── section: Executive overview
    │   │   └── KPI row [data-ds-id="dashboard.kpi.row"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Coverage and progress
    │   │   ├── Coverage panel [data-ds-id="dashboard.panel.coverage"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Progress panel [data-ds-id="dashboard.panel.progress"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: Trace and gap action
    │       ├── Graph panel [data-ds-id="dashboard.panel.graph"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Gap panel [data-ds-id="dashboard.panel.gaps"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── Create-plan surface [data-ds-id="dashboard.surface.create-plan"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.loading-skeleton"]
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
    │   ├── viewport: desktop
    │   ├── route-title: RTM Dashboard
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="dashboard.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── KPI row [data-ds-id="dashboard.kpi.row"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.error"] | [selector="dashboard.state.retry"]
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
    │   ├── viewport: desktop
    │   ├── route-title: RTM Dashboard
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="dashboard.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="dashboard.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── KPI row [data-ds-id="dashboard.kpi.row"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.empty"] | [selector="dashboard.state.empty-cta"]
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
    │   ├── viewport: desktop
    │   ├── route-title: RTM Dashboard
    │   ├── state-surface: empty
    │   │   ├── Empty workspace [selector="dashboard.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="dashboard.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── KPI row [data-ds-id="dashboard.kpi.row"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
