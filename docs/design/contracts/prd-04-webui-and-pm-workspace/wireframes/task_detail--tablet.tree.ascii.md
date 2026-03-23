# Screen: Task Detail (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.header.summary [data-ds-id="task-detail.header.summary"]
│   ├── back-link
│   ├── task-id
│   ├── status-field
│   ├── priority-field
│   ├── assignee-field
│   └── qa-field
├── task-detail.tab.detail [data-ds-id="task-detail.tab.detail"]
│   ├── description-markdown
│   ├── dependency-links
│   └── labels-and-escalation
├── task-detail.tab.activity [data-ds-id="task-detail.tab.activity"]
│   └── timeline-list
├── task-detail.tab.graph [data-ds-id="task-detail.tab.graph"]
│   └── mini-graph-preview
├── task-detail.tab.code [data-ds-id="task-detail.tab.code"]
│   └── file-group-list
├── task-detail.rte.context [data-ds-id="task-detail.rte.context"]
│   ├── decision-text
│   └── constraints
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.loading-skeleton
│   ├── header-skeleton
│   ├── tab-row-skeleton
│   └── detail-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.error
│   ├── error-banner
│   ├── retry-action
│   └── back-link
├── task-detail.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.empty
│   ├── empty-message
│   └── empty-copy
├── task-detail.state.empty-cta
│   ├── add-description-action
│   └── link-dependency-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.offline
│   ├── offline-banner
│   └── queue-status-copy
├── task-detail.state.read-only
│   ├── locked-fields
│   └── pending-clock-icons
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: saving
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.saving
│   ├── saving-banner
│   └── field-spinner
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: not-found
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.not-found
│   ├── missing-id-message
│   └── explanation-copy
├── task-detail.state.back-link
└── shell.footer [data-ds-id="workspace.shell.footer"]
