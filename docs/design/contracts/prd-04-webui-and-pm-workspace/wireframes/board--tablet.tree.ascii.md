# Screen: SAFe Board Views (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
│   ├── nav-icon-set
│   └── connection-status [data-ds-id="workspace.shell.connection-status"]
├── board.header.view-switcher [data-ds-id="board.header.view-switcher"]
│   ├── active-level-selector
│   ├── level-tab-set
│   └── confidence-vote-shortcut
├── board.kanban.columns [data-ds-id="board.kanban.columns"]
│   ├── horizontally-scrollable-columns
│   │   ├── column: Todo
│   │   ├── column: In Progress
│   │   └── column: Review
│   └── board.card.task [data-ds-id="board.card.task"]
├── board.pi.sandbox [data-ds-id="board.pi.sandbox"]
│   ├── capacity-summary
│   ├── board.pi.roam [data-ds-id="board.pi.roam"]
│   │   ├── risk-status-lanes
│   │   └── risk-item-list
│   └── board.pi.confidence-vote [data-ds-id="board.pi.confidence-vote"]
│       ├── vote-buttons
│       └── confirmation-state
├── board.rte.drawer [data-ds-id="board.rte.drawer"]
│   ├── drawer-handle
│   ├── thread-preview
│   └── action-row
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── board.state.loading-skeleton
│   ├── column-skeleton-strip
│   ├── sandbox-skeleton
│   └── drawer-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── board.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── open-tasks-action
│   └── cached-board-summary
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── board.state.empty
│   ├── empty-message
│   ├── level-description
│   └── board-placeholder
├── board.state.empty-cta
│   ├── create-epic-action
│   ├── import-backlog-action
│   └── switch-level-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
