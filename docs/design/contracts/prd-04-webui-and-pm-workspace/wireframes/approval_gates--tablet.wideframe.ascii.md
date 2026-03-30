# Screen: Approval Gates (tablet)
## State: default
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.queue.list; approval.panel.aggregate; approval.panel.context; approval.form.comment; approval.action.approve; approval.action.reject; approval.action.manual-override
+============================================================+ [100%]
| Trace Map                                                  |
+============================================================+
| Shell: [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] |
|        [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] |
| Screen: [data-ds-id="approval.queue.list"] [data-ds-id="approval.panel.aggregate"] [data-ds-id="approval.panel.context"] |
| State:  [data-ds-id="approval.form.comment"] [data-ds-id="approval.action.approve"] [data-ds-id="approval.action.reject"] |
|         [data-ds-id="approval.action.manual-override"]   |
+============================================================+
+============================================================+ [100%]
| [Logo] [Search____________________] [Bell] [Ava]          |
+======+=====================================================+
| Rail | Approval Queue 7                                    | [7%|93%]
|      +-----------------------------------------------------+
|      | +-------------------------------------------------+ |
|      | | Approval Context                                | |
|      | | Phase Exec->Rel | Coverage 91%                  | |
|      | +-------------------------------------------------+ |
|      | +-------------------------------------------------+ |
|      | | Aggregate Evidence                              | |
|      | | Tests | Diff | PRD links | PR status           | |
|      | | [Open diff] [Open logs] [View PRD]             | |
|      | +-------------------------------------------------+ |
|      | +-------------------------------------------------+ |
|      | | Fixed Bottom Action Bar                         | |
|      | | Comment [______________]                        | |
|      | | [Approve] [Reject] [Override]                  | |
|      | +-------------------------------------------------+ |
+======+=====================================================+
## State: loading
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.loading-skeleton
+============================================================+
| Trace Map                                                  |
+============================================================+
| Shell: [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] |
|        [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] |
| State: [data-ds-id="approval.state.loading-skeleton"]    |
+============================================================+
+============================================================+
| [Logo] [Search____________________] [Bell] [Ava]          |
+======+=====================================================+
| Rail | +-------------------------------------------------+ |
|      | | [######## context skeleton ####################] | |
|      | +-------------------------------------------------+ |
|      | +-------------------------------------------------+ |
|      | | [######## evidence skeleton ###################] | |
|      | +-------------------------------------------------+ |
+======+=====================================================+
## State: error
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.error; approval.action.manual-override
+============================================================+
| Trace Map                                                  |
+============================================================+
| Shell: [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] |
|        [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] |
| State: [data-ds-id="approval.state.error"] [data-ds-id="approval.action.manual-override"] |
+============================================================+
+============================================================+
| [Logo] [Search: retry__________] [Bell] [Ava]             |
+======+=====================================================+
| Rail | [Error: GitHub evidence failed]                    |
|      | [Retry] [Manual override]                          |
|      +-----------------------------------------------------+
|      | +-------------------------------------------------+ |
|      | | Partial data: tests + PRD links loaded          | |
|      | | Diff unavailable                                | |
|      | +-------------------------------------------------+ |
+======+=====================================================+
## State: empty
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.empty
+============================================================+
| Trace Map                                                  |
+============================================================+
| Shell: [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] |
|        [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] |
| State: [data-ds-id="approval.state.empty"]               |
+============================================================+
+============================================================+
| [Logo] [Search: approvals________] [Bell] [Ava]           |
+======+=====================================================+
| Rail | +-------------------------------------------------+ |
|      | | No pending approvals                            | |
|      | | [Review history] [Open tasks]                  | |
|      | +-------------------------------------------------+ |
+======+=====================================================+
## State: offline
Selectors: workspace.shell.header; workspace.shell.search; workspace.shell.notifications; workspace.shell.sidebar; workspace.shell.connection-status; workspace.shell.footer; approval.state.offline; approval.action.approve; approval.action.reject
+============================================================+
| Trace Map                                                  |
+============================================================+
| Shell: [data-ds-id="workspace.shell.header"] [data-ds-id="workspace.shell.search"] [data-ds-id="workspace.shell.notifications"] |
|        [data-ds-id="workspace.shell.sidebar"] [data-ds-id="workspace.shell.connection-status"] [data-ds-id="workspace.shell.footer"] |
| State: [data-ds-id="approval.state.offline"] [data-ds-id="approval.action.approve"] [data-ds-id="approval.action.reject"] |
+============================================================+
+============================================================+
| [Logo] [Search: cached__________] [Bell] [Ava]            |
+======+=====================================================+
| Rail | [Offline read-only approval cache]                 |
|      | [Approve disabled] [Reject disabled]               |
|      +-----------------------------------------------------+
|      | +-------------------------------------------------+ |
|      | | Cached approval summary                         | |
|      | | last sync 4m | evidence snapshot                | |
|      | +-------------------------------------------------+ |
+======+=====================================================+
