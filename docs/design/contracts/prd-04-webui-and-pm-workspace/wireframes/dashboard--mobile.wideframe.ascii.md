# Screen: RTM Dashboard (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: RTM Dashboard | Focus help | Shortcut Ctrl+K                      |           |
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
|   |  |Layout intent: preserved shell with route workspace for RTM Dashboard          |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Executive overview                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: KPI row [dashboard.kpi.row]                                 |    |    |   |
|   |  |  |Detail: coverage 84.2%                                                 |    |    |   |
|   |  |  |Detail: tasks done 143 | gaps 7 | roots 28                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Coverage and progress                                                 |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Coverage panel [dashboard.panel.coverage]                   |    |    |   |
|   |  |  |Detail: PRD heatmap                                                    |    |    |   |
|   |  |  |Detail: section drill-down + low-coverage rows                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Progress panel [dashboard.panel.progress]                   |    |    |   |
|   |  |  |Detail: status totals + burnup                                         |    |    |   |
|   |  |  |Detail: timeline chips + due window                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Trace and gap action                                                  |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Graph panel [dashboard.panel.graph]                         |    |    |   |
|   |  |  |Detail: trace mini-canvas                                              |    |    |   |
|   |  |  |Detail: legend PRD | Plan | Task | PR                                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Gap panel [dashboard.panel.gaps]                            |    |    |   |
|   |  |  |Detail: severity table + source links                                  |    |    |   |
|   |  |  |Detail: create-plan entry points                                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Create-plan surface [dashboard.surface.create-plan]         |    |    |   |
|   |  |  |Detail: gap title + owner + notes                                      |    |    |   |
|   |  |  |Detail: save CTA + cancel CTA                                          |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: RTM Dashboard | Focus help | Shortcut Ctrl+K                      |           |
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
|   |  |Layout intent: preserved shell with route workspace for RTM Dashboard          |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [dashboard.state.loading-skeleton]         |    |    |   |
|   |  |  |Detail: KPI skeleton tiles                                             |    |    |   |
|   |  |  |Detail: panel skeleton rows + graph placeholders                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: KPI row [dashboard.kpi.row]                                 |    |    |   |
|   |  |  |Detail: coverage 84.2%                                                 |    |    |   |
|   |  |  |Detail: tasks done 143 | gaps 7 | roots 28                             |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.error"] | [selector="dashboard.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: RTM Dashboard | Focus help | Shortcut Ctrl+K                      |           |
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
|   |  |Layout intent: preserved shell with route workspace for RTM Dashboard          |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [dashboard.state.error]                        |    |    |   |
|   |  |  |Detail: Coverage feed unavailable                                      |    |    |   |
|   |  |  |Detail: stale data badge + recovery note                               |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [dashboard.state.retry]                       |    |    |   |
|   |  |  |Detail: retry dashboard                                                |    |    |   |
|   |  |  |Detail: open logs + back to filters                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: KPI row [dashboard.kpi.row]                                 |    |    |   |
|   |  |  |Detail: coverage 84.2%                                                 |    |    |   |
|   |  |  |Detail: tasks done 143 | gaps 7 | roots 28                             |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="dashboard.kpi.row"] | [data-ds-id="dashboard.panel.coverage"] | [data-ds-id="dashboard.panel.progress"] | [data-ds-id="dashboard.panel.graph"] | [data-ds-id="dashboard.panel.gaps"] | [data-ds-id="dashboard.surface.create-plan"] | [selector="dashboard.state.empty"] | [selector="dashboard.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: RTM Dashboard | Focus help | Shortcut Ctrl+K                      |           |
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
|   |  |Layout intent: preserved shell with route workspace for RTM Dashboard          |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty workspace [dashboard.state.empty]                     |    |    |   |
|   |  |  |Detail: no PRD links match current filter                              |    |    |   |
|   |  |  |Detail: 0 gaps | 0 uncovered | waiting for trace root                  |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [dashboard.state.empty-cta]                       |    |    |   |
|   |  |  |Detail: reset filters                                                  |    |    |   |
|   |  |  |Detail: create first resolution plan                                   |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: KPI row [dashboard.kpi.row]                                 |    |    |   |
|   |  |  |Detail: coverage 84.2%                                                 |    |    |   |
|   |  |  |Detail: tasks done 143 | gaps 7 | roots 28                             |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
