# Screen: SAFe Board Views (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
│   ├── mobile-menu-trigger
│   ├── logo
│   ├── global-search [data-ds-id="workspace.shell.search"]
│   └── notifications [data-ds-id="workspace.shell.notifications"]
├── board.header.view-switcher [data-ds-id="board.header.view-switcher"]
│   ├── active-level-selector
│   ├── view-tab-row
│   └── pi-planning-toggle
├── board.kanban.columns [data-ds-id="board.kanban.columns"]
│   ├── mobile-card-list
│   │   ├── board.card.task [data-ds-id="board.card.task"]
│   │   └── board.card.task [data-ds-id="board.card.task"]
│   └── status-move-actions
├── board.pi.sandbox [data-ds-id="board.pi.sandbox"]
│   ├── capacity-summary
│   ├── board.pi.roam [data-ds-id="board.pi.roam"]
│   │   ├── risk-counts
│   │   └── open-roam-action
│   └── board.pi.confidence-vote [data-ds-id="board.pi.confidence-vote"]
│       ├── vote-action
│       └── confirmation-state
├── board.rte.drawer [data-ds-id="board.rte.drawer"]
│   ├── full-screen-overlay-trigger
│   ├── message-count
│   └── approval-actions
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── board.state.loading-skeleton
│   ├── view-switcher-skeleton
│   ├── card-list-skeleton
│   └── sandbox-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── board.state.error
│   ├── error-banner
│   ├── retry-action
│   ├── open-tasks-action
│   └── cached-count-summary
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── board.state.empty
│   ├── empty-message
│   ├── setup-hint
│   └── board-placeholder
├── board.state.empty-cta
│   ├── create-task-action
│   └── import-backlog-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
