# Screen: SAFe Board Views (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── logo
│   ├── global-search [data-ds-id="workspace.shell.search"]
│   ├── notifications [data-ds-id="workspace.shell.notifications"]
│   └── user-avatar
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
│   ├── nav-link: Dashboard
│   ├── nav-link: Board
│   ├── nav-link: Tasks
│   ├── nav-link: Trace
│   ├── nav-link: Docs
│   ├── nav-link: Approval
│   └── connection-status [data-ds-id="workspace.shell.connection-status"]
├── board.header.view-switcher [data-ds-id="board.header.view-switcher"]
│   ├── level-tab: Portfolio
│   ├── level-tab: ART
│   ├── level-tab: Team
│   ├── level-tab: PI Plan
│   └── list-toggle-action
├── board.kanban.columns [data-ds-id="board.kanban.columns"]
│   ├── column: Todo
│   │   └── board.card.task [data-ds-id="board.card.task"]
│   ├── column: In Progress
│   │   └── board.card.task [data-ds-id="board.card.task"]
│   ├── column: Review
│   │   └── board.card.task [data-ds-id="board.card.task"]
│   ├── column: Done
│   │   └── board.card.task [data-ds-id="board.card.task"]
│   └── column: Risks
│       └── risk-card-list
├── board.pi.sandbox [data-ds-id="board.pi.sandbox"]
│   ├── capacity-items
│   ├── business-value-scores
│   ├── board.pi.roam [data-ds-id="board.pi.roam"]
│   │   ├── risk-item-list
│   │   └── roam-status-summary
│   └── board.pi.confidence-vote [data-ds-id="board.pi.confidence-vote"]
│       ├── vote-options
│       └── confirmation-state
├── board.rte.drawer [data-ds-id="board.rte.drawer"]
│   ├── thread-messages
│   ├── decision-text
│   ├── constraints
│   └── approval-actions
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── board.state.loading-skeleton
│   ├── view-switcher-skeleton
│   ├── kanban-column-skeletons
│   ├── sandbox-skeleton
│   └── rte-drawer-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── board.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── cached-board-summary
│   └── open-task-list-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── board.state.empty
│   ├── empty-message
│   ├── board-level-hint
│   └── sandbox-status-copy
├── board.state.empty-cta
│   ├── create-task-action
│   ├── switch-level-action
│   └── import-backlog-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
