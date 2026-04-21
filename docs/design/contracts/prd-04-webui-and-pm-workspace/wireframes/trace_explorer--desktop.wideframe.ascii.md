# Screen: Beads Trace Explorer (desktop)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"]
+===============================================================================================+
| App shell [100%] viewport 1440px | nav expanded sidebar 240px [18%|82%] | header full header  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Beads Trace Explorer | Focus help | Shortcut Ctrl+K               |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: expanded sidebar 240px [18%|82%]                            |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=default | viewport=desktop                            |    |   |
|   |  |Layout intent: preserved shell with route workspace for Beads Trace Explorer   |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Trace controls                                                        |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Trace toolbar [trace.toolbar.root]                          |    |    |   |
|   |  |  |Detail: root id + depth selector                                       |    |    |   |
|   |  |  |Detail: type filters + query time                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Graph legend [trace.canvas.legend]                          |    |    |   |
|   |  |  |Detail: node type keys                                                 |    |    |   |
|   |  |  |Detail: visible filter summary                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Graph exploration                                                     |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Graph canvas [trace.canvas.graph]                           |    |    |   |
|   |  |  |Detail: nodes + edges                                                  |    |    |   |
|   |  |  |Detail: pan zoom + node focus ring                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Node inspection                                                       |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Node detail panel [trace.panel.node-detail]                 |    |    |   |
|   |  |  |Detail: excerpt + coverage                                             |    |    |   |
|   |  |  |Detail: linked entities + breadcrumbs                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Connected nodes list [trace.panel.connected-nodes]          |    |    |   |
|   |  |  |Detail: upstream/downstream groups                                     |    |    |   |
|   |  |  |Detail: jump links + counts                                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Impact action [trace.action.impact]                         |    |    |   |
|   |  |  |Detail: open impact summary                                            |    |    |   |
|   |  |  |Detail: create follow-up task CTA                                      |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 1440px | nav expanded sidebar 240px [18%|82%] | header full header  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Beads Trace Explorer | Focus help | Shortcut Ctrl+K               |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: expanded sidebar 240px [18%|82%]                            |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=loading | viewport=desktop                            |    |   |
|   |  |Layout intent: preserved shell with route workspace for Beads Trace Explorer   |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [trace.state.loading-skeleton]             |    |    |   |
|   |  |  |Detail: toolbar skeleton                                               |    |    |   |
|   |  |  |Detail: canvas shimmer + panel placeholders                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Trace toolbar [trace.toolbar.root]                          |    |    |   |
|   |  |  |Detail: root id + depth selector                                       |    |    |   |
|   |  |  |Detail: type filters + query time                                      |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.error"] | [selector="trace.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 1440px | nav expanded sidebar 240px [18%|82%] | header full header  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Beads Trace Explorer | Focus help | Shortcut Ctrl+K               |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: expanded sidebar 240px [18%|82%]                            |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=error | viewport=desktop                              |    |   |
|   |  |Layout intent: preserved shell with route workspace for Beads Trace Explorer   |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [trace.state.error]                            |    |    |   |
|   |  |  |Detail: trace query failed                                             |    |    |   |
|   |  |  |Detail: graph service timed out                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [trace.state.retry]                           |    |    |   |
|   |  |  |Detail: retry same root                                                |    |    |   |
|   |  |  |Detail: reduce depth and reload                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Trace toolbar [trace.toolbar.root]                          |    |    |   |
|   |  |  |Detail: root id + depth selector                                       |    |    |   |
|   |  |  |Detail: type filters + query time                                      |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.empty"] | [selector="trace.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 1440px | nav expanded sidebar 240px [18%|82%] | header full header  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Beads Trace Explorer | Focus help | Shortcut Ctrl+K               |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: expanded sidebar 240px [18%|82%]                            |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=empty | viewport=desktop                              |    |   |
|   |  |Layout intent: preserved shell with route workspace for Beads Trace Explorer   |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty graph [trace.state.empty]                             |    |    |   |
|   |  |  |Detail: root has no linked entities                                    |    |    |   |
|   |  |  |Detail: canvas stays available for filters                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [trace.state.empty-cta]                           |    |    |   |
|   |  |  |Detail: choose another root                                            |    |    |   |
|   |  |  |Detail: open docs for source context                                   |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Trace toolbar [trace.toolbar.root]                          |    |    |   |
|   |  |  |Detail: root id + depth selector                                       |    |    |   |
|   |  |  |Detail: type filters + query time                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
## State: partial
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="trace.toolbar.root"] | [data-ds-id="trace.canvas.graph"] | [data-ds-id="trace.canvas.legend"] | [data-ds-id="trace.panel.node-detail"] | [data-ds-id="trace.panel.connected-nodes"] | [data-ds-id="trace.action.impact"] | [selector="trace.state.partial"] | [selector="trace.state.partial-badge"]
+===============================================================================================+
| App shell [100%] viewport 1440px | nav expanded sidebar 240px [18%|82%] | header full header  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Beads Trace Explorer | Focus help | Shortcut Ctrl+K               |           |
|   +-------------------------------------------------------------------------------+           |
|   +-------------------------------------------------------------------------------+           |
|   |Shell navigation [workspace.shell.sidebar]                                     |           |
|   |Nav set: [Dashboard] [Board] [Tasks] [Trace] [Docs] [Approval]                 |           |
|   |Viewport behavior: expanded sidebar 240px [18%|82%]                            |           |
|   +-------------------------------------------------------------------------------+           |
|   +---------------------------------------------------------------------------------------+   |
|   |Route shell [workspace region]                                                         |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Route workspace                                                                |    |   |
|   |  |Route frame [100%] state=partial | viewport=desktop                            |    |   |
|   |  |Layout intent: preserved shell with route workspace for Beads Trace Explorer   |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: partial                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Partial data banner [trace.state.partial]                   |    |    |   |
|   |  |  |Detail: some edge types hidden                                         |    |    |   |
|   |  |  |Detail: graph still interactive                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Partial badge [trace.state.partial-badge]                   |    |    |   |
|   |  |  |Detail: showing cached nodes                                           |    |    |   |
|   |  |  |Detail: refresh for complete trace                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Trace toolbar [trace.toolbar.root]                          |    |    |   |
|   |  |  |Detail: root id + depth selector                                       |    |    |   |
|   |  |  |Detail: type filters + query time                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
