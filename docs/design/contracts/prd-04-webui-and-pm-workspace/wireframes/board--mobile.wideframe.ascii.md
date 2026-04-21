# Screen: SAFe Board (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: SAFe Board | Focus help | Shortcut Ctrl+K                         |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: hamburger drawer over content [100%]                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=default | viewport=mobile                             |    |   |
|   |  |Layout intent: preserved shell with route workspace for SAFe Board             |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Board controls                                                        |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Board view switcher [board.header.view-switcher]            |    |    |   |
|   |  |  |Detail: portfolio | ART | team | PI                                    |    |    |   |
|   |  |  |Detail: board/list toggle + current cadence                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Kanban workspace                                                      |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Kanban columns [board.kanban.columns]                       |    |    |   |
|   |  |  |Detail: todo | in-progress | review | done                             |    |    |   |
|   |  |  |Detail: WIP counts + horizontal scroll                                 |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task card [board.card.task]                                 |    |    |   |
|   |  |  |Detail: title + assignee + priority                                    |    |    |   |
|   |  |  |Detail: RTE badge + drag handle                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: PI planning and escalation                                            |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: PI planning sandbox [board.pi.sandbox]                      |    |    |   |
|   |  |  |Detail: capacity lanes + constraints                                   |    |    |   |
|   |  |  |Detail: business value scoring inputs                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: ROAM board [board.pi.roam]                                  |    |    |   |
|   |  |  |Detail: risk cards by roam status                                      |    |    |   |
|   |  |  |Detail: owner + mitigation date                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Confidence vote panel [board.pi.confidence-vote]            |    |    |   |
|   |  |  |Detail: vote choices 1-5                                               |    |    |   |
|   |  |  |Detail: confirmation summary + quorum note                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: RTE discussion drawer [board.rte.drawer]                    |    |    |   |
|   |  |  |Detail: thread messages + decisions                                    |    |    |   |
|   |  |  |Detail: approved-by + timestamp + constraints                          |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: loading
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: SAFe Board | Focus help | Shortcut Ctrl+K                         |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: hamburger drawer over content [100%]                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=loading | viewport=mobile                             |    |   |
|   |  |Layout intent: preserved shell with route workspace for SAFe Board             |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [board.state.loading-skeleton]             |    |    |   |
|   |  |  |Detail: column skeletons                                               |    |    |   |
|   |  |  |Detail: sandbox and vote placeholders                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Board view switcher [board.header.view-switcher]            |    |    |   |
|   |  |  |Detail: portfolio | ART | team | PI                                    |    |    |   |
|   |  |  |Detail: board/list toggle + current cadence                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: error
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.error"] | [selector="board.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: SAFe Board | Focus help | Shortcut Ctrl+K                         |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: hamburger drawer over content [100%]                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=error | viewport=mobile                               |    |   |
|   |  |Layout intent: preserved shell with route workspace for SAFe Board             |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [board.state.error]                            |    |    |   |
|   |  |  |Detail: cannot load board data                                         |    |    |   |
|   |  |  |Detail: last known column counts shown                                 |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [board.state.retry]                           |    |    |   |
|   |  |  |Detail: reload board                                                   |    |    |   |
|   |  |  |Detail: open escalation log                                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Board view switcher [board.header.view-switcher]            |    |    |   |
|   |  |  |Detail: portfolio | ART | team | PI                                    |    |    |   |
|   |  |  |Detail: board/list toggle + current cadence                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: empty
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="board.header.view-switcher"] | [data-ds-id="board.kanban.columns"] | [data-ds-id="board.card.task"] | [data-ds-id="board.pi.sandbox"] | [data-ds-id="board.pi.roam"] | [data-ds-id="board.pi.confidence-vote"] | [data-ds-id="board.rte.drawer"] | [selector="board.state.empty"] | [selector="board.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: SAFe Board | Focus help | Shortcut Ctrl+K                         |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: hamburger drawer over content [100%]                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=empty | viewport=mobile                               |    |   |
|   |  |Layout intent: preserved shell with route workspace for SAFe Board             |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty board [board.state.empty]                             |    |    |   |
|   |  |  |Detail: no tasks for selected level                                    |    |    |   |
|   |  |  |Detail: column totals all zero                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [board.state.empty-cta]                           |    |    |   |
|   |  |  |Detail: create task from board                                         |    |    |   |
|   |  |  |Detail: switch level or remove filter                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Board view switcher [board.header.view-switcher]            |    |    |   |
|   |  |  |Detail: portfolio | ART | team | PI                                    |    |    |   |
|   |  |  |Detail: board/list toggle + current cadence                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
