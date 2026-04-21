# Screen: Task Detail (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=default | viewport=tablet                             |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Editable header                                                       |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Status field [task-detail.field.status]                     |    |    |   |
|   |  |  |Detail: current status + allowed values                                |    |    |   |
|   |  |  |Detail: inline save affordance                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Assignee field [task-detail.field.assignee]                 |    |    |   |
|   |  |  |Detail: owner selector                                                 |    |    |   |
|   |  |  |Detail: agent and human options                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Priority field [task-detail.field.priority]                 |    |    |   |
|   |  |  |Detail: priority selector                                              |    |    |   |
|   |  |  |Detail: policy hint + validation                                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: QA status field [task-detail.field.qa-status]               |    |    |   |
|   |  |  |Detail: QA state selector                                              |    |    |   |
|   |  |  |Detail: latest gate result                                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Primary tabs                                                          |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Detail tab [task-detail.tab.detail]                         |    |    |   |
|   |  |  |Detail: description + dependencies                                     |    |    |   |
|   |  |  |Detail: labels + escalation level                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Activity tab [task-detail.tab.activity]                     |    |    |   |
|   |  |  |Detail: timeline entries                                               |    |    |   |
|   |  |  |Detail: actor + timestamp + diff note                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Trace and delivery context                                            |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Graph tab [task-detail.tab.graph]                           |    |    |   |
|   |  |  |Detail: mini graph widget                                              |    |    |   |
|   |  |  |Detail: open full page trace CTA                                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Code tab [task-detail.tab.code]                             |    |    |   |
|   |  |  |Detail: files touched + last commit                                    |    |    |   |
|   |  |  |Detail: lines changed + PR links                                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: RTE context block [task-detail.rte.context]                 |    |    |   |
|   |  |  |Detail: decision text + constraints                                    |    |    |   |
|   |  |  |Detail: approved by + approved at                                      |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=loading | viewport=tablet                             |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [task-detail.state.loading-skeleton]       |    |    |   |
|   |  |  |Detail: header skeleton                                                |    |    |   |
|   |  |  |Detail: tab bodies as placeholder blocks                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.error"] | [selector="task-detail.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=error | viewport=tablet                               |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [task-detail.state.error]                      |    |    |   |
|   |  |  |Detail: task detail request failed                                     |    |    |   |
|   |  |  |Detail: stale summary may remain visible                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [task-detail.state.retry]                     |    |    |   |
|   |  |  |Detail: retry task fetch                                               |    |    |   |
|   |  |  |Detail: return to task list                                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.empty"] | [selector="task-detail.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=empty | viewport=tablet                               |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty task shell [task-detail.state.empty]                  |    |    |   |
|   |  |  |Detail: task loaded without content                                    |    |    |   |
|   |  |  |Detail: detail tabs collapsed                                          |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [task-detail.state.empty-cta]                     |    |    |   |
|   |  |  |Detail: add first note                                                 |    |    |   |
|   |  |  |Detail: link task to plan                                              |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: offline
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.offline"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=offline | viewport=tablet                             |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: offline                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Offline banner [task-detail.state.offline]                  |    |    |   |
|   |  |  |Detail: editing disabled while offline                                 |    |    |   |
|   |  |  |Detail: queued field changes unavailable                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Read-only mode [task-detail.state.read-only]                |    |    |   |
|   |  |  |Detail: fields show current values                                     |    |    |   |
|   |  |  |Detail: save buttons replaced with reconnect note                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: saving
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.saving"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=saving | viewport=tablet                              |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: saving                                                          |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Saving strip [task-detail.state.saving]                     |    |    |   |
|   |  |  |Detail: saving changed fields                                          |    |    |   |
|   |  |  |Detail: optimistic badge + undo disabled                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: not-found
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-detail.header.summary"] | [data-ds-id="task-detail.field.status"] | [data-ds-id="task-detail.field.assignee"] | [data-ds-id="task-detail.field.priority"] | [data-ds-id="task-detail.field.qa-status"] | [data-ds-id="task-detail.tab.detail"] | [data-ds-id="task-detail.tab.activity"] | [data-ds-id="task-detail.tab.graph"] | [data-ds-id="task-detail.tab.code"] | [data-ds-id="task-detail.rte.context"] | [selector="task-detail.state.not-found"] | [selector="task-detail.state.back-link"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task Detail | Focus help | Shortcut Ctrl+K                        |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: icon rail 60px + content [10%|90%]                          |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=not-found | viewport=tablet                           |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task Detail            |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: not-found                                                       |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Not found panel [task-detail.state.not-found]               |    |    |   |
|   |  |  |Detail: task id does not exist                                         |    |    |   |
|   |  |  |Detail: possibly deleted or access revoked                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Back link [task-detail.state.back-link]                     |    |    |   |
|   |  |  |Detail: return to task list                                            |    |    |   |
|   |  |  |Detail: open search for similar task                                   |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task header [task-detail.header.summary]                    |    |    |   |
|   |  |  |Detail: task id + title + badges                                       |    |    |   |
|   |  |  |Detail: status + assignee + priority summary                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
