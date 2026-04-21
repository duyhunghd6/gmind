# Screen: Task List (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task List | Focus help | Shortcut Ctrl+K                          |           |
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
|   |  |Layout intent: preserved shell with route workspace for Task List              |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: List controls                                                         |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: View toggle [task-list.header.view-toggle]                  |    |    |   |
|   |  |  |Detail: board | list modes                                             |    |    |   |
|   |  |  |Detail: current view and count                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Filter row [task-list.filter.row]                           |    |    |   |
|   |  |  |Detail: status | assignee | priority | PRD                             |    |    |   |
|   |  |  |Detail: QA status + clear all                                          |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: CSV export [task-list.action.csv-export]                    |    |    |   |
|   |  |  |Detail: file name preview                                              |    |    |   |
|   |  |  |Detail: export current result set                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Task table                                                            |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task table [task-list.table.main]                           |    |    |   |
|   |  |  |Detail: sortable columns + page slice                                  |    |    |   |
|   |  |  |Detail: sticky header + row selection                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Task row [task-list.table.row]                              |    |    |   |
|   |  |  |Detail: id + title + badges                                            |    |    |   |
|   |  |  |Detail: status + priority + assignee + QA                              |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Bulk and paging                                                       |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Pagination controls [task-list.pagination.controls]         |    |    |   |
|   |  |  |Detail: page buttons + page size                                       |    |    |   |
|   |  |  |Detail: result totals + jump input                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Bulk action bar [task-list.bulk.actions]                    |    |    |   |
|   |  |  |Detail: assign | status | priority actions                             |    |    |   |
|   |  |  |Detail: selected count + confirm CTA                                   |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task List | Focus help | Shortcut Ctrl+K                          |           |
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
|   |  |Layout intent: preserved shell with route workspace for Task List              |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [task-list.state.loading-skeleton]         |    |    |   |
|   |  |  |Detail: filter skeleton chips                                          |    |    |   |
|   |  |  |Detail: table rows placeholder                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: View toggle [task-list.header.view-toggle]                  |    |    |   |
|   |  |  |Detail: board | list modes                                             |    |    |   |
|   |  |  |Detail: current view and count                                         |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.error"] | [selector="task-list.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task List | Focus help | Shortcut Ctrl+K                          |           |
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
|   |  |Layout intent: preserved shell with route workspace for Task List              |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [task-list.state.error]                        |    |    |   |
|   |  |  |Detail: task list request failed                                       |    |    |   |
|   |  |  |Detail: last used filters retained                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [task-list.state.retry]                       |    |    |   |
|   |  |  |Detail: reload current page                                            |    |    |   |
|   |  |  |Detail: open board view instead                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: View toggle [task-list.header.view-toggle]                  |    |    |   |
|   |  |  |Detail: board | list modes                                             |    |    |   |
|   |  |  |Detail: current view and count                                         |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.empty"] | [selector="task-list.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task List | Focus help | Shortcut Ctrl+K                          |           |
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
|   |  |Layout intent: preserved shell with route workspace for Task List              |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty list [task-list.state.empty]                          |    |    |   |
|   |  |  |Detail: no tasks match current filters                                 |    |    |   |
|   |  |  |Detail: table replaced by guidance panel                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [task-list.state.empty-cta]                       |    |    |   |
|   |  |  |Detail: clear filters                                                  |    |    |   |
|   |  |  |Detail: create first task                                              |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: View toggle [task-list.header.view-toggle]                  |    |    |   |
|   |  |  |Detail: board | list modes                                             |    |    |   |
|   |  |  |Detail: current view and count                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: bulk-processing
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="task-list.header.view-toggle"] | [data-ds-id="task-list.filter.row"] | [data-ds-id="task-list.action.csv-export"] | [data-ds-id="task-list.table.main"] | [data-ds-id="task-list.table.row"] | [data-ds-id="task-list.pagination.controls"] | [data-ds-id="task-list.bulk.actions"] | [selector="task-list.state.bulk-processing"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Task List | Focus help | Shortcut Ctrl+K                          |           |
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
|   |  |Route frame [100%] state=bulk-processing | viewport=tablet                     |    |   |
|   |  |Layout intent: preserved shell with route workspace for Task List              |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: bulk-processing                                                 |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Bulk processing strip [task-list.state.bulk-processing]     |    |    |   |
|   |  |  |Detail: updating selected rows                                         |    |    |   |
|   |  |  |Detail: progress and failure count                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Bulk action bar [task-list.bulk.actions]                    |    |    |   |
|   |  |  |Detail: selected count locked                                          |    |    |   |
|   |  |  |Detail: cancel disabled until completion                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: View toggle [task-list.header.view-toggle]                  |    |    |   |
|   |  |  |Detail: board | list modes                                             |    |    |   |
|   |  |  |Detail: current view and count                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
