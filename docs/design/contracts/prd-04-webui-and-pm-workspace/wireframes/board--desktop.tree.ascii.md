# Screen: SAFe Board (desktop)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"]
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
    │   ├── route-title: SAFe Board
    │   ├── section: Board controls
    │   │   └── Board view switcher [data-ds-id="board.header.view-switcher"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   ├── section: Kanban workspace
    │   │   ├── Kanban columns [data-ds-id="board.kanban.columns"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Task card [data-ds-id="board.card.task"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── section: PI planning and escalation
    │       ├── PI planning sandbox [data-ds-id="board.pi.sandbox"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── ROAM board [data-ds-id="board.pi.roam"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       ├── Confidence vote panel [data-ds-id="board.pi.confidence-vote"]
    │       │   ├── slot-a
    │       │   └── slot-b
    │       └── RTE discussion drawer [data-ds-id="board.rte.drawer"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.loading-skeleton"]
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
    │   ├── route-title: SAFe Board
    │   ├── state-surface: loading
    │   │   └── Loading skeleton [selector="board.state.loading-skeleton"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Board view switcher [data-ds-id="board.header.view-switcher"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.error"] | [selector="board.state.retry"]
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
    │   ├── route-title: SAFe Board
    │   ├── state-surface: error
    │   │   ├── Error banner [selector="board.state.error"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Retry actions [selector="board.state.retry"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Board view switcher [data-ds-id="board.header.view-switcher"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.empty"] | [selector="board.state.empty-cta"]
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
    │   ├── route-title: SAFe Board
    │   ├── state-surface: empty
    │   │   ├── Empty board [selector="board.state.empty"]
    │   │   │   ├── slot-a
    │   │   │   └── slot-b
    │   │   └── Empty CTA [selector="board.state.empty-cta"]
    │   │       ├── slot-a
    │   │       └── slot-b
    │   └── persistent-context
    │       └── Board view switcher [data-ds-id="board.header.view-switcher"]
    │           ├── slot-a
    │           └── slot-b
    └── footer [data-ds-id="workspace.shell.footer"]
        ├── connection-status [data-ds-id="workspace.shell.connection-status"]
        ├── accessibility-help
        └── api-only-note
