<!-- beads-id: br-design-storyboards-review-webui-pm-workspace -->
# Storyboards Review: WebUI PM Workspace

Generated trajectories: 16. Each trajectory links to machine evidence in `storyboards.json` and compact YAML slices.

| Trajectory | Role | Entry | Events | Screens | Error recovery |
| --- | --- | --- | --- | --- | --- |
| `core-navigate-task` | PM | `/tasks/:id` | EVENT_ROUTE_ENTER, EVENT_VIEW_TASK | screen:global-shell, screen:rtm-dashboard, screen:task-list, screen:task-detail | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `core-explore-trace` | PMO | `/trace/bd-x1y2` | EVENT_HASH_NAVIGATE, EVENT_VIEW_TRACE | screen:task-detail, screen:document-graph-widget, screen:trace-explorer | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `core-quick-search` | PM | `/search?q=coverage` | EVENT_SEARCH, EVENT_VIEW_DOC, EVENT_VIEW_TRACE | screen:global-shell, screen:search-explorer | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `board-drag-success` | RTE | `/board#sprint` | EVENT_HASH_NAVIGATE, EVENT_MOVE_CARD, EVENT_VIEW_TASK | screen:safe-board, screen:task-detail | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `pi-planning-vote` | RTE | `/pi-planning` | EVENT_PI_PLAN_SAVE, EVENT_CONFIDENCE_VOTE | screen:pi-planning | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `portfolio-review` | Executive | `/portfolio` | EVENT_VIEW_TASK, EVENT_VIEW_TRACE | screen:portfolio, screen:task-list, screen:trace-explorer | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `approval-approve` | Human approver | `/approval#panels` | EVENT_APPROVAL_DECISION | screen:approval-gates | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `approval-insufficient-evidence` | Human approver | `/approval#rtm` | EVENT_REFRESH, EVENT_APPROVAL_DECISION | screen:approval-gates | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `offline-rehydrate-conflict` | PM | `/tasks/bd-x1y2` | EVENT_DISCONNECT, EVENT_RECONNECT, EVENT_KEEP_LOCAL, EVENT_USE_SERVER | screen:global-shell, screen:task-detail | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `doc-to-trace` | Analyst | `/docs/br-prd04` | EVENT_VIEW_DOC, EVENT_VIEW_TRACE | screen:doc-viewer, screen:trace-explorer | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `showcase-hash-navigation` | Designer | `/design-system/git-graph#beads-traversal` | EVENT_HASH_NAVIGATE | screen:terminal-console, screen:git-graph, screen:components-catalog | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `storyboard-detail-alignment` | QA | `/storyboards/core-navigate-task` | EVENT_ROUTE_ENTER, EVENT_VIEW_TASK | screen:storyboard-overview, screen:storyboard-detail | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `permission-denied-recovery` | Viewer | `/portfolio` | EVENT_ROUTE_ENTER, EVENT_BACK | screen:portfolio, screen:approval-gates | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `not-found-recovery` | PM | `/tasks/missing` | EVENT_ROUTE_ENTER, EVENT_BACK | screen:task-detail, screen:storyboard-detail | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `terminal-browser-boundary` | Engineer | `/terminal#ci-cd` | EVENT_ROUTE_ENTER, EVENT_HASH_NAVIGATE, EVENT_REFRESH | screen:terminal-console | API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |
| `timeline-file-lease-activity` | Release Train Engineer | `/timeline#file-lease` | EVENT_ROUTE_ENTER, EVENT_HASH_NAVIGATE, EVENT_VIEW_TASK, EVENT_REFRESH, EVENT_DISCONNECT, EVENT_RECONNECT | screen:timeline, screen:timeline, screen:timeline, screen:task-detail | API_EMPTY -> EmptyState -> EVENT_REFRESH; API_ERROR -> ErrorState -> EVENT_REFRESH; API_FORBIDDEN -> ForbiddenState -> EVENT_BACK; EVENT_DISCONNECT -> OfflineState -> EVENT_RECONNECT |

## E2E Alignment Metadata

- Every step includes `screen_path`, `data-screen-id`, `data-ds-id`, `expected_state`, `event`, `action`, and `success_signal`.
- CTAs target real Core or showcase routes; no placeholder routes are used.
- `timeline-file-lease-activity` covers `screen:timeline`, `#file-lease`, `#activity-feed`, `#sprint-day`, file lease states, activity feed navigation, sprint day view, and Core API data flow.
