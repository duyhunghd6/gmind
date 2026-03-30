# Screen: Approval Gates (desktop)
## State: default
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── approval.queue.list [data-ds-id="approval.queue.list"]
│   ├── queue-item: bd-a21
│   ├── queue-item: pr-48
│   └── queue-item: bd-k09
├── approval.panel.aggregate [data-ds-id="approval.panel.aggregate"]
│   ├── test-results
│   ├── code-diff-summary
│   ├── beads-id-links
│   ├── prd-links
│   └── github-pr-status
├── approval.panel.context [data-ds-id="approval.panel.context"]
│   ├── phase-boundary
│   ├── coverage-status
│   └── blocker-reason
├── approval.form.comment [data-ds-id="approval.form.comment"]
│   ├── comment-input
│   └── helper-text
├── approval.action.approve [data-ds-id="approval.action.approve"]
├── approval.action.reject [data-ds-id="approval.action.reject"]
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: loading
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── approval.state.loading-skeleton
│   ├── queue-skeleton
│   ├── aggregate-skeleton
│   └── context-and-form-skeleton
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: error
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── approval.state.error
│   ├── error-banner
│   ├── cause-text
│   ├── retry-action
│   └── partial-evidence-summary
├── approval.action.manual-override [data-ds-id="approval.action.manual-override"]
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: empty
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── approval.state.empty
│   ├── empty-message
│   └── empty-status-copy
├── approval.state.empty-cta
│   ├── completed-approvals-action
│   └── open-tasks-action
└── shell.footer [data-ds-id="workspace.shell.footer"]
## State: offline
├── shell.header [data-ds-id="workspace.shell.header"]
├── shell.sidebar [data-ds-id="workspace.shell.sidebar"]
├── approval.state.offline
│   ├── offline-banner
│   ├── cached-queue-item
│   └── read-only-copy
├── approval.action.approve [data-ds-id="approval.action.approve"]
│   └── disabled-state
├── approval.action.reject [data-ds-id="approval.action.reject"]
│   └── disabled-state
└── shell.footer [data-ds-id="workspace.shell.footer"]
