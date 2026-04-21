# Screen: Search Results (tablet)
## State: default
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Search Results | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Search Results         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Search controls                                                       |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Search bar [search.header.query]                            |    |    |   |
|   |  |  |Detail: query field + suggestions                                      |    |    |   |
|   |  |  |Detail: scope chip + submit CTA                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Filter panel [search.filter.panel]                          |    |    |   |
|   |  |  |Detail: type counts + date range                                       |    |    |   |
|   |  |  |Detail: task status + owner filters                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Grouped results                                                       |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Result groups [search.results.group]                        |    |    |   |
|   |  |  |Detail: tasks | docs | commits | PRs | chats                           |    |    |   |
|   |  |  |Detail: group headers + counts                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Result card [search.results.card]                           |    |    |   |
|   |  |  |Detail: title + snippet + type badge                                   |    |    |   |
|   |  |  |Detail: destination route + status                                     |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.loading-skeleton"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Search Results | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Search Results         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: loading                                                         |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Loading skeleton [search.state.loading-skeleton]            |    |    |   |
|   |  |  |Detail: query chip skeleton                                            |    |    |   |
|   |  |  |Detail: result groups placeholder rows                                 |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Search bar [search.header.query]                            |    |    |   |
|   |  |  |Detail: query field + suggestions                                      |    |    |   |
|   |  |  |Detail: scope chip + submit CTA                                        |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.error"] | [selector="search.state.retry"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Search Results | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Search Results         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: error                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Error banner [search.state.error]                           |    |    |   |
|   |  |  |Detail: search service unavailable                                     |    |    |   |
|   |  |  |Detail: filters preserved for retry                                    |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Retry actions [search.state.retry]                          |    |    |   |
|   |  |  |Detail: retry current query                                            |    |    |   |
|   |  |  |Detail: clear failed filter set                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Search bar [search.header.query]                            |    |    |   |
|   |  |  |Detail: query field + suggestions                                      |    |    |   |
|   |  |  |Detail: scope chip + submit CTA                                        |    |    |   |
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
Traceability: [data-ds-id="workspace.shell.header"] | [data-ds-id="workspace.shell.search"] | [data-ds-id="workspace.shell.notifications"] | [data-ds-id="workspace.shell.sidebar"] | [data-ds-id="workspace.shell.connection-status"] | [data-ds-id="workspace.shell.footer"] | [data-ds-id="search.header.query"] | [data-ds-id="search.filter.panel"] | [data-ds-id="search.results.group"] | [data-ds-id="search.results.card"] | [data-ds-id="search.state.empty-suggestions"] | [selector="search.state.empty"] | [selector="search.state.empty-cta"]
+===============================================================================================+
| App shell [100%] viewport 1024px | nav icon rail 60px + content [10%|90%] | header condensed  |
|   +-------------------------------------------------------------------------------+           |
|   |Shell header [workspace.shell.header]                                          |           |
|   |Primary row: [Logo] [workspace.shell.search] [workspace.shell.notifications]   |           |
|   |Route title: Search Results | Focus help | Shortcut Ctrl+K                     |           |
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
|   |  |Layout intent: preserved shell with route workspace for Search Results         |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |State surface: empty                                                           |    |   |
|   |  |State handling keeps shell visible and route region distinct                   |    |   |
|   |  |Sub-grid: route-area -> state-surface -> state-component                       |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Empty results [search.state.empty]                          |    |    |   |
|   |  |  |Detail: no matches across sources                                      |    |    |   |
|   |  |  |Detail: recent query preserved                                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Suggestions [search.state.empty-suggestions]                |    |    |   |
|   |  |  |Detail: search by beads id                                             |    |    |   |
|   |  |  |Detail: remove narrow filters or shorten query                         |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   |  |Section: Persistent context                                                    |    |   |
|   |  |Section span: [100%] with nested modules mechanically countable                |    |   |
|   |  |Sub-grid: route-area -> section -> component                                   |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  |  |Component: Search bar [search.header.query]                            |    |    |   |
|   |  |  |Detail: query field + suggestions                                      |    |    |   |
|   |  |  |Detail: scope chip + submit CTA                                        |    |    |   |
|   |  |  +-----------------------------------------------------------------------+    |    |   |
|   |  +-------------------------------------------------------------------------------+    |   |
|   +---------------------------------------------------------------------------------------+   |
|   +-------------------------------------------------------------------------------+           |
|   |Footer [workspace.shell.footer]                                                |           |
|   |[workspace.shell.connection-status] API-only data access note                  |           |
|   |Accessibility help | focus outline note | reconnect status                     |           |
|   +-------------------------------------------------------------------------------+           |
+===============================================================================================+
