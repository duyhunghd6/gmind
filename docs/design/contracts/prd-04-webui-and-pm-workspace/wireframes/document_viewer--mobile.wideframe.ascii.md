# Screen: Document Viewer (mobile)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Document Viewer | Focus help | Shortcut Ctrl+K                    |           |
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
|   |  |Layout intent: preserved shell with route workspace for Document Viewer        |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Navigation controls                                                   |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Document tree [docs.tree.nav]                               |    |    |   |
|   |  |  |Detail: PRDs | plans | chats | RTE                                     |    |    |   |
|   |  |  |Detail: selected doc highlight + badges                                |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Source filter [docs.filter.source-type]                     |    |    |   |
|   |  |  |Detail: source type + date range                                       |    |    |   |
|   |  |  |Detail: coverage-only toggle                                           |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Document context                                                      |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Breadcrumb [docs.content.breadcrumb]                        |    |    |   |
|   |  |  |Detail: workspace / source / document                                  |    |    |   |
|   |  |  |Detail: copy path + metadata chip                                      |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Coverage indicator [docs.content.coverage-indicator]        |    |    |   |
|   |  |  |Detail: coverage percent badge                                         |    |    |   |
|   |  |  |Detail: uncovered sections count                                       |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Document reading surface                                              |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Content panel [docs.content.body]                           |    |    |   |
|   |  |  |Detail: rendered markdown or HTML                                      |    |    |   |
|   |  |  |Detail: headings + tables + callouts                                   |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Beads autolinks [docs.content.beads-links]                  |    |    |   |
|   |  |  |Detail: inline beads chips                                             |    |    |   |
|   |  |  |Detail: hover preview + route hint                                     |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Open trace action [docs.action.open-trace]                  |    |    |   |
|   |  |  |Detail: open current root in trace explorer                            |    |    |   |
|   |  |  |Detail: copy beads id shortcut                                         |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Document Viewer | Focus help | Shortcut Ctrl+K                    |           |
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
|   |  |Layout intent: preserved shell with route workspace for Document Viewer        |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [docs.state.loading-skeleton]              |    |    |   |
|   |  |  |Detail: tree placeholders                                              |    |    |   |
|   |  |  |Detail: content block skeletons                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Document tree [docs.tree.nav]                               |    |    |   |
|   |  |  |Detail: PRDs | plans | chats | RTE                                     |    |    |   |
|   |  |  |Detail: selected doc highlight + badges                                |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.error"] | [selector="docs.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Document Viewer | Focus help | Shortcut Ctrl+K                    |           |
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
|   |  |Layout intent: preserved shell with route workspace for Document Viewer        |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [docs.state.error]                             |    |    |   |
|   |  |  |Detail: document source unavailable                                    |    |    |   |
|   |  |  |Detail: selected source type failed                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [docs.state.retry]                            |    |    |   |
|   |  |  |Detail: retry fetch                                                    |    |    |   |
|   |  |  |Detail: return to source list                                          |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Document tree [docs.tree.nav]                               |    |    |   |
|   |  |  |Detail: PRDs | plans | chats | RTE                                     |    |    |   |
|   |  |  |Detail: selected doc highlight + badges                                |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="docs.tree.nav"] | [data-ds-id="docs.filter.source-type"] | [data-ds-id="docs.content.breadcrumb"] | [data-ds-id="docs.content.body"] | [data-ds-id="docs.content.beads-links"] | [data-ds-id="docs.content.coverage-indicator"] | [data-ds-id="docs.action.open-trace"] | [selector="docs.state.empty"] | [selector="docs.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 390px | nav hamburger drawer over content [100%] | header stacked m |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Document Viewer | Focus help | Shortcut Ctrl+K                    |           |
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
|   |  |Layout intent: preserved shell with route workspace for Document Viewer        |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty docs view [docs.state.empty]                          |    |    |   |
|   |  |  |Detail: no documents match current filter                              |    |    |   |
|   |  |  |Detail: tree remains visible for navigation                            |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty CTA [docs.state.empty-cta]                            |    |    |   |
|   |  |  |Detail: clear filters                                                  |    |    |   |
|   |  |  |Detail: open latest PRD                                                |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Document tree [docs.tree.nav]                               |    |    |   |
|   |  |  |Detail: PRDs | plans | chats | RTE                                     |    |    |   |
|   |  |  |Detail: selected doc highlight + badges                                |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
