# Flow: webui-and-pm-workspace
<!-- beads-id: br-ds-webui-pm-flow -->

Derived Mermaid Logic Machine from `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`.

```mermaid
stateDiagram-v2
    direction LR
    [*] --> ShellLoading
    ShellLoading --> ShellDefault : API_HEALTH_OK
    ShellLoading --> ShellOffline : API_HEALTH_TIMEOUT
    ShellDefault --> ShellForbidden : API_PERMISSION_DENIED
    ShellForbidden --> DashboardDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellOffline --> ShellDefault : EVENT_RETRY_SYNC_OK / action-shell-retry-sync
    ShellOffline --> ShellOffline : EVENT_RETRY_SYNC_ERROR / action-shell-retry-sync
    ShellDefault --> SearchDefault : EVENT_FOCUS_GLOBAL_SEARCH / action-shell-open-search
    ShellDefault --> ShellDefault : EVENT_TOGGLE_PM_NAV / action-shell-toggle-nav
    ShellDefault --> DashboardDefault : EVENT_OPEN_PM_SPACE / action-header-open-pm-space
    ShellDefault --> DesignSystemExternal : EVENT_OPEN_DESIGN_SYSTEM / action-header-open-design-system
    ShellDefault --> DashboardDefault : ROUTE_RTM_DASHBOARD
    DashboardDefault --> DashboardLoading : API_REQUEST_START
    DashboardLoading --> DashboardDefault : API_SUCCESS
    DashboardLoading --> DashboardEmpty : API_SUCCESS_EMPTY
    DashboardEmpty --> DashboardDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    DashboardLoading --> DashboardError : API_ERROR
    DashboardError --> DashboardLoading : EVENT_RETRY_LOAD
    DashboardDefault --> DashboardOffline : API_OFFLINE_DETECTED
    DashboardOffline --> DashboardDefault : API_REHYDRATED
    ShellDefault --> BoardDefault : ROUTE_SAFE_BOARD
    BoardDefault --> BoardLoading : API_REQUEST_START
    BoardLoading --> BoardDefault : API_SUCCESS
    BoardLoading --> BoardEmpty : API_SUCCESS_EMPTY
    BoardEmpty --> BoardDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    BoardLoading --> BoardError : API_ERROR
    BoardError --> BoardLoading : EVENT_RETRY_LOAD
    BoardDefault --> BoardOffline : API_OFFLINE_DETECTED
    BoardOffline --> BoardDefault : API_REHYDRATED
    BoardDefault --> BoardForbidden : API_PERMISSION_DENIED
    BoardForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> TasksDefault : ROUTE_TASK_LIST
    TasksDefault --> TasksLoading : API_REQUEST_START
    TasksLoading --> TasksDefault : API_SUCCESS
    TasksLoading --> TasksEmpty : API_SUCCESS_EMPTY
    TasksEmpty --> TasksDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    TasksLoading --> TasksError : API_ERROR
    TasksError --> TasksLoading : EVENT_RETRY_LOAD
    TasksDefault --> TasksOffline : API_OFFLINE_DETECTED
    TasksOffline --> TasksDefault : API_REHYDRATED
    TasksDefault --> TasksSaving : API_WRITE_START
    TasksSaving --> TasksDefault : API_WRITE_SUCCESS
    TasksSaving --> TasksError : API_WRITE_ERROR
    ShellDefault --> TaskDetailDefault : ROUTE_TASK_DETAIL
    TaskDetailDefault --> TaskDetailLoading : API_REQUEST_START
    TaskDetailLoading --> TaskDetailDefault : API_SUCCESS
    TaskDetailLoading --> TaskDetailError : API_ERROR
    TaskDetailError --> TaskDetailLoading : EVENT_RETRY_LOAD
    TaskDetailDefault --> TaskDetailOffline : API_OFFLINE_DETECTED
    TaskDetailOffline --> TaskDetailDefault : API_REHYDRATED
    TaskDetailDefault --> TaskDetailSaving : API_WRITE_START
    TaskDetailSaving --> TaskDetailDefault : API_WRITE_SUCCESS
    TaskDetailSaving --> TaskDetailError : API_WRITE_ERROR
    TaskDetailLoading --> TaskDetailNotFound : API_NOT_FOUND
    TaskDetailNotFound --> TasksDefault : EVENT_BACK_TO_LIST
    ShellDefault --> TraceDefault : ROUTE_TRACE_EXPLORER
    TraceDefault --> TraceLoading : API_REQUEST_START
    TraceLoading --> TraceDefault : API_SUCCESS
    TraceLoading --> TraceEmpty : API_SUCCESS_EMPTY
    TraceEmpty --> TraceDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    TraceLoading --> TraceError : API_ERROR
    TraceError --> TraceLoading : EVENT_RETRY_LOAD
    TraceDefault --> TraceOffline : API_OFFLINE_DETECTED
    TraceOffline --> TraceDefault : API_REHYDRATED
    TraceDefault --> TraceForbidden : API_PERMISSION_DENIED
    TraceForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    TraceLoading --> TracePartial : API_ENRICHMENT_TIMEOUT
    TracePartial --> TraceDefault : API_ENRICHMENT_SUCCESS
    ShellDefault --> DocsDefault : ROUTE_DOCUMENT_VIEWER
    DocsDefault --> DocsLoading : API_REQUEST_START
    DocsLoading --> DocsDefault : API_SUCCESS
    DocsLoading --> DocsEmpty : API_SUCCESS_EMPTY
    DocsEmpty --> DocsDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    DocsLoading --> DocsError : API_ERROR
    DocsError --> DocsLoading : EVENT_RETRY_LOAD
    DocsDefault --> DocsOffline : API_OFFLINE_DETECTED
    DocsOffline --> DocsDefault : API_REHYDRATED
    DocsDefault --> DocsForbidden : API_PERMISSION_DENIED
    DocsForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> ApprovalDefault : ROUTE_APPROVAL_GATES
    ApprovalDefault --> ApprovalLoading : API_REQUEST_START
    ApprovalLoading --> ApprovalDefault : API_SUCCESS
    ApprovalLoading --> ApprovalEmpty : API_SUCCESS_EMPTY
    ApprovalEmpty --> ApprovalDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    ApprovalLoading --> ApprovalError : API_ERROR
    ApprovalError --> ApprovalLoading : EVENT_RETRY_LOAD
    ApprovalDefault --> ApprovalOffline : API_OFFLINE_DETECTED
    ApprovalOffline --> ApprovalDefault : API_REHYDRATED
    ApprovalDefault --> ApprovalForbidden : API_PERMISSION_DENIED
    ApprovalForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ApprovalDefault --> ApprovalInsufficientEvidence : API_EVIDENCE_INCOMPLETE
    ApprovalInsufficientEvidence --> ApprovalLoading : EVENT_REFRESH_EVIDENCE / action-approval-refresh-evidence
    ApprovalDefault --> ApprovalDecisionSubmitted : API_DECISION_POSTED
    ApprovalDecisionSubmitted --> TaskDetailDefault : EVENT_OPEN_DECISION_TASK
    ShellDefault --> SearchDefault : ROUTE_SEARCH_RESULTS
    SearchDefault --> SearchLoading : API_REQUEST_START
    SearchLoading --> SearchDefault : API_SUCCESS
    SearchLoading --> SearchEmpty : API_SUCCESS_EMPTY
    SearchEmpty --> SearchDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    SearchLoading --> SearchError : API_ERROR
    SearchError --> SearchLoading : EVENT_RETRY_LOAD
    SearchDefault --> SearchOffline : API_OFFLINE_DETECTED
    SearchOffline --> SearchDefault : API_REHYDRATED
    SearchDefault --> SearchForbidden : API_PERMISSION_DENIED
    SearchForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> TerminalDefault : ROUTE_TERMINAL_CONSOLE
    TerminalDefault --> TerminalLoading : API_REQUEST_START
    TerminalLoading --> TerminalDefault : API_SUCCESS
    TerminalLoading --> TerminalEmpty : API_SUCCESS_EMPTY
    TerminalEmpty --> TerminalDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    TerminalLoading --> TerminalError : API_ERROR
    TerminalError --> TerminalLoading : EVENT_RETRY_LOAD
    TerminalDefault --> TerminalOffline : API_OFFLINE_DETECTED
    TerminalOffline --> TerminalDefault : API_REHYDRATED
    TerminalDefault --> TerminalForbidden : API_PERMISSION_DENIED
    TerminalForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> TimelineDefault : ROUTE_TIMELINE_FILE_LEASES
    TimelineDefault --> TimelineLoading : API_REQUEST_START
    TimelineLoading --> TimelineDefault : API_SUCCESS
    TimelineLoading --> TimelineEmpty : API_SUCCESS_EMPTY
    TimelineEmpty --> TimelineDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    TimelineLoading --> TimelineError : API_ERROR
    TimelineError --> TimelineLoading : EVENT_RETRY_LOAD
    TimelineDefault --> TimelineOffline : API_OFFLINE_DETECTED
    TimelineOffline --> TimelineDefault : API_REHYDRATED
    TimelineDefault --> TimelineForbidden : API_PERMISSION_DENIED
    TimelineForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> GitGraphDefault : ROUTE_GIT_GRAPH_EXPLORER
    GitGraphDefault --> GitGraphLoading : API_REQUEST_START
    GitGraphLoading --> GitGraphDefault : API_SUCCESS
    GitGraphLoading --> GitGraphEmpty : API_SUCCESS_EMPTY
    GitGraphEmpty --> GitGraphDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    GitGraphLoading --> GitGraphError : API_ERROR
    GitGraphError --> GitGraphLoading : EVENT_RETRY_LOAD
    GitGraphDefault --> GitGraphOffline : API_OFFLINE_DETECTED
    GitGraphOffline --> GitGraphDefault : API_REHYDRATED
    GitGraphDefault --> GitGraphForbidden : API_PERMISSION_DENIED
    GitGraphForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> KnowledgeGraphDefault : ROUTE_KNOWLEDGE_GRAPH
    KnowledgeGraphDefault --> KnowledgeGraphLoading : API_REQUEST_START
    KnowledgeGraphLoading --> KnowledgeGraphDefault : API_SUCCESS
    KnowledgeGraphLoading --> KnowledgeGraphEmpty : API_SUCCESS_EMPTY
    KnowledgeGraphEmpty --> KnowledgeGraphDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    KnowledgeGraphLoading --> KnowledgeGraphError : API_ERROR
    KnowledgeGraphError --> KnowledgeGraphLoading : EVENT_RETRY_LOAD
    KnowledgeGraphDefault --> KnowledgeGraphOffline : API_OFFLINE_DETECTED
    KnowledgeGraphOffline --> KnowledgeGraphDefault : API_REHYDRATED
    KnowledgeGraphDefault --> KnowledgeGraphForbidden : API_PERMISSION_DENIED
    KnowledgeGraphForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> PortfolioDefault : ROUTE_PORTFOLIO_VIEW
    PortfolioDefault --> PortfolioLoading : API_REQUEST_START
    PortfolioLoading --> PortfolioDefault : API_SUCCESS
    PortfolioLoading --> PortfolioEmpty : API_SUCCESS_EMPTY
    PortfolioEmpty --> PortfolioDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    PortfolioLoading --> PortfolioError : API_ERROR
    PortfolioError --> PortfolioLoading : EVENT_RETRY_LOAD
    PortfolioDefault --> PortfolioOffline : API_OFFLINE_DETECTED
    PortfolioOffline --> PortfolioDefault : API_REHYDRATED
    PortfolioDefault --> PortfolioForbidden : API_PERMISSION_DENIED
    PortfolioForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    ShellDefault --> PIPlanningDefault : ROUTE_PI_PLANNING
    PIPlanningDefault --> PIPlanningLoading : API_REQUEST_START
    PIPlanningLoading --> PIPlanningDefault : API_SUCCESS
    PIPlanningLoading --> PIPlanningEmpty : API_SUCCESS_EMPTY
    PIPlanningEmpty --> PIPlanningDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    PIPlanningLoading --> PIPlanningError : API_ERROR
    PIPlanningError --> PIPlanningLoading : EVENT_RETRY_LOAD
    PIPlanningDefault --> PIPlanningOffline : API_OFFLINE_DETECTED
    PIPlanningOffline --> PIPlanningDefault : API_REHYDRATED
    PIPlanningDefault --> PIPlanningForbidden : API_PERMISSION_DENIED
    PIPlanningForbidden --> ShellDefault : EVENT_BACK_TO_SAFE_ROUTE
    PIPlanningDefault --> PIPlanningSaving : API_WRITE_START
    PIPlanningSaving --> PIPlanningDefault : API_WRITE_SUCCESS
    PIPlanningSaving --> PIPlanningError : API_WRITE_ERROR
    ShellDefault --> StoryboardsDefault : ROUTE_STORYBOARDS_OVERVIEW
    StoryboardsDefault --> StoryboardsLoading : API_REQUEST_START
    StoryboardsLoading --> StoryboardsDefault : API_SUCCESS
    StoryboardsLoading --> StoryboardsEmpty : API_SUCCESS_EMPTY
    StoryboardsEmpty --> StoryboardsDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    StoryboardsLoading --> StoryboardsError : API_ERROR
    StoryboardsError --> StoryboardsLoading : EVENT_RETRY_LOAD
    StoryboardsDefault --> StoryboardsOffline : API_OFFLINE_DETECTED
    StoryboardsOffline --> StoryboardsDefault : API_REHYDRATED
    ShellDefault --> StoryboardDetailDefault : ROUTE_STORYBOARD_DETAIL
    StoryboardDetailDefault --> StoryboardDetailLoading : API_REQUEST_START
    StoryboardDetailLoading --> StoryboardDetailDefault : API_SUCCESS
    StoryboardDetailLoading --> StoryboardDetailEmpty : API_SUCCESS_EMPTY
    StoryboardDetailEmpty --> StoryboardDetailDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    StoryboardDetailLoading --> StoryboardDetailError : API_ERROR
    StoryboardDetailError --> StoryboardDetailLoading : EVENT_RETRY_LOAD
    StoryboardDetailDefault --> StoryboardDetailOffline : API_OFFLINE_DETECTED
    StoryboardDetailOffline --> StoryboardDetailDefault : API_REHYDRATED
    StoryboardDetailLoading --> StoryboardDetailNotFound : API_NOT_FOUND
    StoryboardDetailNotFound --> TasksDefault : EVENT_BACK_TO_LIST
    ShellDefault --> ComponentsDefault : ROUTE_COMPONENTS_CATALOG
    ComponentsDefault --> ComponentsLoading : API_REQUEST_START
    ComponentsLoading --> ComponentsDefault : API_SUCCESS
    ComponentsLoading --> ComponentsEmpty : API_SUCCESS_EMPTY
    ComponentsEmpty --> ComponentsDefault : EVENT_CLEAR_FILTER_OR_GUIDE
    ComponentsLoading --> ComponentsError : API_ERROR
    ComponentsError --> ComponentsLoading : EVENT_RETRY_LOAD
    ShellDefault --> SearchDefault : EVENT_SHELL_OPEN_SEARCH / action-shell-open-search
    ShellDefault --> ShellDefault : EVENT_SHELL_TOGGLE_NAV / action-shell-toggle-nav
    ShellDefault --> ShellDefault : EVENT_SHELL_RETRY_SYNC / action-shell-retry-sync
    ShellDefault --> ShellDefault : EVENT_SHELL_HEADER_PM_SPACE / action-shell-header-pm-space
    ShellDefault --> SearchDefault : EVENT_SHELL_SUBMIT_SEARCH / action-shell-submit-search
    DashboardDefault --> KnowledgeGraphDefault : EVENT_RTM_OPEN_TRACE / action-rtm-open-trace
    DashboardDefault --> TasksDefault : EVENT_RTM_FILTER_TASKS / action-rtm-filter-tasks
    DashboardDefault --> DocsDefault : EVENT_RTM_OPEN_DOC / action-rtm-open-doc
    DashboardDefault --> DashboardDefault : EVENT_RTM_CREATE_GAP_PLAN / action-rtm-create-gap-plan
    BoardDefault --> BoardDefault : EVENT_BOARD_SELECT_BOARD / action-board-select-board
    BoardDefault --> BoardSaving : EVENT_BOARD_DRAG_CARD / action-board-drag-card
    BoardSaving --> BoardDefault : API_STATUS_UPDATED
    BoardSaving --> BoardError : API_CONFLICT_ROLLBACK
    BoardDefault --> TaskDetailDefault : EVENT_BOARD_OPEN_TASK / action-board-open-task
    TasksDefault --> BoardDefault : EVENT_TASKS_TOGGLE_BOARD / action-tasks-toggle-board
    TasksDefault --> TasksDefault : EVENT_TASKS_FILTER / action-tasks-filter
    TasksDefault --> TasksDefault : EVENT_TASKS_SORT / action-tasks-sort
    TasksDefault --> TaskDetailDefault : EVENT_TASKS_OPEN_DETAIL / action-tasks-open-detail
    TasksDefault --> KnowledgeGraphDefault : EVENT_TASKS_OPEN_TRACE / action-tasks-open-trace
    TasksDefault --> TasksSaving : EVENT_TASKS_BULK_ASSIGN / action-tasks-bulk-assign
    TasksDefault --> TasksSaving : EVENT_TASKS_BULK_STATUS / action-tasks-bulk-status
    TasksDefault --> TasksDefault : EVENT_TASKS_EXPORT_CSV / action-tasks-export-csv
    TaskDetailDefault --> TasksDefault : EVENT_TASK_BACK_TO_LIST / action-task-back-to-list
    TaskDetailDefault --> TaskDetailSaving : EVENT_TASK_SAVE_STATUS / action-task-save-status
    TaskDetailDefault --> TaskDetailSaving : EVENT_TASK_SAVE_ASSIGNEE / action-task-save-assignee
    TaskDetailDefault --> ApprovalDefault : EVENT_TASK_OPEN_APPROVAL / action-task-open-approval
    TaskDetailDefault --> KnowledgeGraphDefault : EVENT_TASK_OPEN_TRACE / action-task-open-trace
    TraceDefault --> TraceDefault : EVENT_TRACE_CHANGE_ROOT / action-trace-change-root
    TraceDefault --> TraceDefault : EVENT_TRACE_TOGGLE_DIRECTION / action-trace-toggle-direction
    TraceDefault --> TraceDefault : EVENT_TRACE_SELECT_NODE / action-trace-select-node
    TraceDefault --> DocsDefault : EVENT_TRACE_OPEN_DOC / action-trace-open-doc
    TraceDefault --> TaskDetailDefault : EVENT_TRACE_OPEN_TASK / action-trace-open-task
    TraceDefault --> GitGraphDefault : EVENT_TRACE_OPEN_GIT_GRAPH / action-trace-open-git-graph
    DocsDefault --> DocsDefault : EVENT_DOCS_SELECT_DOCUMENT / action-docs-select-document
    DocsDefault --> KnowledgeGraphDefault : EVENT_DOCS_OPEN_TRACE / action-docs-open-trace
    DocsDefault --> SearchDefault : EVENT_DOCS_OPEN_SEARCH / action-docs-open-search
    DocsDefault --> KnowledgeGraphDefault : EVENT_DOCS_OPEN_KNOWLEDGE_GRAPH / action-docs-open-knowledge-graph
    ApprovalDefault --> ApprovalDefault : EVENT_APPROVAL_SELECT_TASK / action-approval-select-task
    ApprovalDefault --> ApprovalDefault : EVENT_APPROVAL_REFRESH_EVIDENCE / action-approval-refresh-evidence
    ApprovalDefault --> ApprovalDecisionSubmitted : EVENT_APPROVAL_APPROVE / action-approval-approve
    ApprovalDefault --> ApprovalDecisionSubmitted : EVENT_APPROVAL_REJECT / action-approval-reject
    ApprovalDefault --> ApprovalDecisionSubmitted : EVENT_APPROVAL_REQUEST_CHANGES / action-approval-request-changes
    ApprovalDefault --> KnowledgeGraphDefault : EVENT_APPROVAL_OPEN_TRACE / action-approval-open-trace
    SearchDefault --> SearchDefault : EVENT_SEARCH_SUBMIT_QUERY / action-search-submit-query
    SearchDefault --> SearchDefault : EVENT_SEARCH_SELECT_FILTER / action-search-select-filter
    SearchDefault --> TaskDetailDefault : EVENT_SEARCH_OPEN_RESULT_TASK / action-search-open-result-task
    SearchDefault --> DocsDefault : EVENT_SEARCH_OPEN_RESULT_DOC / action-search-open-result-doc
    SearchDefault --> KnowledgeGraphDefault : EVENT_SEARCH_OPEN_RESULT_TRACE / action-search-open-result-trace
    TerminalDefault --> TerminalDefault : EVENT_TERMINAL_SELECT_TAB / action-terminal-select-tab
    TerminalDefault --> TerminalDefault : EVENT_TERMINAL_REFRESH_STREAM / action-terminal-refresh-stream
    TimelineDefault --> TimelineDefault : EVENT_TIMELINE_SELECT_ANCHOR / action-timeline-select-anchor
    TimelineDefault --> TimelineDefault : EVENT_TIMELINE_REFRESH / action-timeline-refresh
    GitGraphDefault --> GitGraphDefault : EVENT_GIT_GRAPH_SELECT_SCENARIO / action-git-graph-select-scenario
    GitGraphDefault --> GitGraphDefault : EVENT_GIT_GRAPH_SELECT_COMMIT / action-git-graph-select-commit
    GitGraphDefault --> KnowledgeGraphDefault : EVENT_GIT_GRAPH_OPEN_TRACE / action-git-graph-open-trace
    KnowledgeGraphDefault --> KnowledgeGraphDefault : EVENT_KNOWLEDGE_SELECT_PRESET / action-knowledge-select-preset
    KnowledgeGraphDefault --> KnowledgeGraphDefault : EVENT_KNOWLEDGE_SELECT_NODE / action-knowledge-select-node
    KnowledgeGraphDefault --> KnowledgeGraphDefault : EVENT_KNOWLEDGE_OPEN_TRACE / action-knowledge-open-trace
    PortfolioDefault --> TasksDefault : EVENT_PORTFOLIO_OPEN_EPIC_TASKS / action-portfolio-open-epic-tasks
    PortfolioDefault --> ExternalRoute : EVENT_PORTFOLIO_OPEN_BUDGET_TRACE / action-portfolio-open-budget-trace
    PIPlanningDefault --> PIPlanningSaving : EVENT_PI_DRAG_FEATURE / action-pi-drag-feature
    PIPlanningDefault --> PIPlanningSaving : EVENT_PI_SCORE_BUSINESS_VALUE / action-pi-score-business-value
    PIPlanningDefault --> PIPlanningSaving : EVENT_PI_SUBMIT_CONFIDENCE_VOTE / action-pi-submit-confidence-vote
    PIPlanningDefault --> PIPlanningDefault : EVENT_PI_OPEN_ROAM / action-pi-open-roam
    StoryboardsDefault --> StoryboardsDefault : EVENT_STORYBOARDS_FILTER_JOURNEY / action-storyboards-filter-journey
    StoryboardsDefault --> StoryboardDetailDefault : EVENT_STORYBOARDS_OPEN_DETAIL / action-storyboards-open-detail
    StoryboardsDefault --> StoryboardsDefault : EVENT_STORYBOARDS_OPEN_SCREEN / action-storyboards-open-screen
    StoryboardDetailDefault --> StoryboardDetailDefault : EVENT_STORYBOARD_DETAIL_OPEN_SCREEN / action-storyboard-detail-open-screen
    StoryboardDetailDefault --> StoryboardsDefault : EVENT_STORYBOARD_DETAIL_BACK / action-storyboard-detail-back
    ComponentsDefault --> ComponentsDefault : EVENT_COMPONENTS_SCROLL_SECTION / action-components-scroll-section
    ComponentsDefault --> ComponentsDefault : EVENT_COMPONENTS_TOGGLE_EXAMPLE / action-components-toggle-example
    ShellDefault --> ExternalRoute : EVENT_HEADER_OPEN_DESIGN_SYSTEM / action-header-open-design-system
    ShellDefault --> ShellDefault : EVENT_HEADER_OPEN_PM_SPACE / action-header-open-pm-space
    TaskDetailDefault --> TasksDefault : EVENT_BACK_TO_TASK_LIST / action-task-back-to-list
    StoryboardDetailDefault --> StoryboardsDefault : EVENT_BACK_TO_STORYBOARDS / action-storyboard-detail-back
    ApprovalInsufficientEvidence --> ApprovalDefault : EVENT_REJECT_WITH_REASON / action-approval-reject
    PIPlanningSaving --> PIPlanningDefault : API_CONFIDENCE_VOTE_ACCEPTED
    PIPlanningSaving --> PIPlanningError : API_PLAN_WRITE_ERROR
    TasksSaving --> TasksDefault : API_BULK_UPDATE_ACCEPTED
    TasksSaving --> TasksError : API_BULK_UPDATE_REJECTED
    ShellOffline --> SyncConflict : API_SYNC_CONFLICT
    SyncConflict --> ShellDefault : EVENT_KEEP_MINE_OR_USE_SERVER
    SyncConflict --> ShellOffline : EVENT_CANCEL_CONFLICT_RESOLUTION
    DesignSystemExternal --> ShellDefault : EVENT_BROWSER_BACK
    ExternalRoute --> ShellDefault : EVENT_ROUTE_NORMALIZED
    DashboardDefault --> [*] : EVENT_EXIT_PM_SPACE
```
