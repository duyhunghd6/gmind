# Screen: Task Detail (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.header.summary [data-ds-id="task-detail.header.summary"]
│   ├── back-link
│   ├── task-id
│   ├── status-field
│   ├── priority-field
│   ├── assignee-field
│   └── qa-field
├── task-detail.tab.detail [data-ds-id="task-detail.tab.detail"]
│   ├── accordion-trigger
│   ├── description-markdown
│   └── dependency-links
├── task-detail.tab.activity [data-ds-id="task-detail.tab.activity"]
│   ├── accordion-trigger
│   └── timeline-list
├── task-detail.tab.graph [data-ds-id="task-detail.tab.graph"]
│   ├── accordion-trigger
│   └── mini-graph-preview
├── task-detail.tab.code [data-ds-id="task-detail.tab.code"]
│   ├── accordion-trigger
│   └── file-group-list
├── task-detail.rte.context [data-ds-id="task-detail.rte.context"]
│   ├── overlay-trigger
│   └── decision-preview
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.loading-skeleton
│   ├── header-skeleton
│   └── accordion-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.error
│   ├── error-banner
│   ├── retry-action
│   └── back-link
├── task-detail.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.empty
│   ├── empty-message
│   └── empty-copy
├── task-detail.state.empty-cta
│   ├── add-description-action
│   └── link-dependency-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.offline
│   ├── offline-banner
│   └── save-offline-copy
├── task-detail.state.read-only
│   ├── locked-fields
│   └── pending-clock-icons
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: saving
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.saving
│   ├── saving-banner
│   ├── field-spinner
│   └── pending-activity-entry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: not-found
├── shell.header [data-ds-id="workspace.shell.header"]
├── task-detail.state.not-found
│   ├── missing-id-message
│   └── explanation-copy
├── task-detail.state.back-link
└── shell.footer [data-ds-id="workspace.shell.footer"]
