# Screen: Task Detail (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.header.summary [data-ds-id="task-detail.header.summary"]
│   ├── back-link
│   ├── task-id
│   ├── title
│   ├── task-detail.field.status [data-ds-id="task-detail.field.status"]
│   ├── task-detail.field.assignee [data-ds-id="task-detail.field.assignee"]
│   ├── task-detail.field.priority [data-ds-id="task-detail.field.priority"]
│   └── task-detail.field.qa-status [data-ds-id="task-detail.field.qa-status"]
├── task-detail.tab.detail [data-ds-id="task-detail.tab.detail"]
│   ├── description-markdown
│   ├── dependency-links
│   ├── labels
│   └── escalation-level
├── task-detail.tab.activity [data-ds-id="task-detail.tab.activity"]
│   ├── timeline-entry: status-change
│   ├── timeline-entry: commit
│   └── timeline-entry: qa-note
├── task-detail.tab.graph [data-ds-id="task-detail.tab.graph"]
│   ├── mini-graph-preview
│   └── open-full-page-trace-action
├── task-detail.tab.code [data-ds-id="task-detail.tab.code"]
│   ├── file-group-list
│   └── lines-changed-summary
├── task-detail.rte.context [data-ds-id="task-detail.rte.context"]
│   ├── rte-status
│   ├── decision-text
│   ├── constraints
│   └── approved-meta
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.loading-skeleton
│   ├── header-skeleton
│   ├── tabs-skeleton
│   └── content-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.error
│   ├── error-banner
│   ├── retry-action
│   └── back-link
├── task-detail.state.retry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.empty
│   ├── empty-message
│   └── empty-copy
├── task-detail.state.empty-cta
│   ├── add-description-action
│   └── link-dependency-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.offline
│   ├── offline-banner
│   ├── queue-status-copy
│   └── reconnect-action
├── task-detail.state.read-only
│   ├── locked-status-field
│   └── pending-assignee-indicator
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: saving
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.saving
│   ├── saving-banner
│   ├── saving-spinner
│   └── pending-activity-entry
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: not-found
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── task-detail.state.not-found
│   ├── missing-id-message
│   └── explanation-copy
├── task-detail.state.back-link
└── shell.footer [data-ds-id="workspace.shell.footer"]
