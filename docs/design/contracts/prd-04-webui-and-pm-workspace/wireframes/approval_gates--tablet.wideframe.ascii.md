# Screen: Approval Gates (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Approval Gates | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Approval Gates         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Queue and evidence                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval queue [approval.queue.list]                        |    |    |   |
|   |  |  |Detail: pending gate items by type                                     |    |    |   |
|   |  |  |Detail: status chips + age + owner                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Aggregate evidence panel [approval.panel.aggregate]         |    |    |   |
|   |  |  |Detail: test results + diff summary                                    |    |    |   |
|   |  |  |Detail: beads links + PR status                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Decision context                                                      |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval context panel [approval.panel.context]             |    |    |   |
|   |  |  |Detail: phase boundary + blockers                                      |    |    |   |
|   |  |  |Detail: coverage status + release note                                 |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Comment form [approval.form.comment]                        |    |    |   |
|   |  |  |Detail: required comment field                                         |    |    |   |
|   |  |  |Detail: mention helper + validation note                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Approval actions                                                      |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approve action [approval.action.approve]                    |    |    |   |
|   |  |  |Detail: enabled when checks pass                                       |    |    |   |
|   |  |  |Detail: primary CTA + loading guard                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Reject action [approval.action.reject]                      |    |    |   |
|   |  |  |Detail: requires comment                                               |    |    |   |
|   |  |  |Detail: secondary CTA + reason note                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Manual override [approval.action.manual-override]           |    |    |   |
|   |  |  |Detail: admin permission only                                          |    |    |   |
|   |  |  |Detail: audit trail + justification                                    |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Approval Gates | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Approval Gates         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [approval.state.loading-skeleton]          |    |    |   |
|   |  |  |Detail: queue skeleton rows                                            |    |    |   |
|   |  |  |Detail: evidence and context placeholders                              |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval queue [approval.queue.list]                        |    |    |   |
|   |  |  |Detail: pending gate items by type                                     |    |    |   |
|   |  |  |Detail: status chips + age + owner                                     |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.error"] | [selector="approval.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Approval Gates | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Approval Gates         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [approval.state.error]                         |    |    |   |
|   |  |  |Detail: approval context failed to load                                |    |    |   |
|   |  |  |Detail: manual review required                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Manual override [approval.action.manual-override]           |    |    |   |
|   |  |  |Detail: override decision path                                         |    |    |   |
|   |  |  |Detail: admin audit comment                                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval queue [approval.queue.list]                        |    |    |   |
|   |  |  |Detail: pending gate items by type                                     |    |    |   |
|   |  |  |Detail: status chips + age + owner                                     |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.empty"] | [selector="approval.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Approval Gates | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Approval Gates         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty queue [approval.state.empty]                          |    |    |   |
|   |  |  |Detail: no items pending approval                                      |    |    |   |
|   |  |  |Detail: all stage gates satisfied                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval queue [approval.queue.list]                        |    |    |   |
|   |  |  |Detail: pending gate items by type                                     |    |    |   |
|   |  |  |Detail: status chips + age + owner                                     |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="approval.queue.list"] | [data-ds-id="approval.panel.aggregate"] | [data-ds-id="approval.panel.context"] | [data-ds-id="approval.form.comment"] | [data-ds-id="approval.action.approve"] | [data-ds-id="approval.action.reject"] | [data-ds-id="approval.action.manual-override"] | [selector="approval.state.offline"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Approval Gates | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Approval Gates         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: offline                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Offline banner [approval.state.offline]                     |    |    |   |
|   |  |  |Detail: write actions disabled                                         |    |    |   |
|   |  |  |Detail: queued comments stay local only                                |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Disabled actions [approval.action.disabled]                 |    |    |   |
|   |  |  |Detail: approve and reject disabled                                    |    |    |   |
|   |  |  |Detail: manual override hidden until reconnect                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Approval queue [approval.queue.list]                        |    |    |   |
|   |  |  |Detail: pending gate items by type                                     |    |    |   |
|   |  |  |Detail: status chips + age + owner                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
