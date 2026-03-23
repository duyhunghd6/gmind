# Screen: Approval Gates (tablet)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── approval.queue.list [data-ds-id="approval.queue.list"]
│   ├── queue-count
│   └── queue-item-preview
├── approval.panel.context [data-ds-id="approval.panel.context"]
│   ├── phase-boundary
│   └── coverage-status
├── approval.panel.aggregate [data-ds-id="approval.panel.aggregate"]
│   ├── evidence-tabs
│   ├── evidence-summary
│   └── quick-open-actions
├── approval.form.comment [data-ds-id="approval.form.comment"]
│   ├── bottom-bar-input
│   └── helper-text
├── approval.action.approve [data-ds-id="approval.action.approve"]
├── approval.action.reject [data-ds-id="approval.action.reject"]
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── approval.state.loading-skeleton
│   ├── context-skeleton
│   ├── aggregate-skeleton
│   └── action-bar-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── approval.state.error
│   ├── error-banner
│   ├── retry-action
│   └── partial-data-summary
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── approval.state.empty
│   ├── empty-message
│   └── queue-history-copy
├── approval.state.empty-cta
│   ├── review-history-action
│   └── open-tasks-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar-rail [data-ds-id="workspace.shell.sidebar"]
├── approval.state.offline
│   ├── offline-banner
│   └── cached-summary
├── approval.action.disabled
│   ├── approve-disabled
│   └── reject-disabled
└── shell.footer [data-ds-id="workspace.shell.footer"]
