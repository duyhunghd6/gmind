# Screen: Approval Gates (mobile)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── approval.queue.list [data-ds-id="approval.queue.list"]
│   ├── queue-count
│   └── active-item
├── approval.panel.context [data-ds-id="approval.panel.context"]
│   ├── phase-boundary
│   └── coverage-status
├── approval.panel.aggregate [data-ds-id="approval.panel.aggregate"]
│   ├── evidence-summary
│   ├── quick-open-actions
│   └── pr-status
├── approval.form.comment [data-ds-id="approval.form.comment"]
│   ├── sticky-input
│   └── helper-text
├── approval.action.approve [data-ds-id="approval.action.approve"]
├── approval.action.reject [data-ds-id="approval.action.reject"]
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── approval.state.loading-skeleton
│   ├── context-skeleton
│   └── evidence-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── approval.state.error
│   ├── error-banner
│   ├── retry-action
│   └── partial-evidence-summary
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── approval.state.empty
│   ├── empty-message
│   └── queue-history-copy
├── approval.state.empty-cta
│   ├── review-history-action
│   └── open-tasks-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── approval.state.offline
│   ├── offline-banner
│   └── cached-snapshot
├── approval.action.disabled
│   ├── approve-disabled
│   └── reject-disabled
└── shell.footer [data-ds-id="workspace.shell.footer"]
