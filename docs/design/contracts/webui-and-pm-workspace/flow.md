<!-- beads-id: br-design-flow-webui-pm-workspace -->
# Flow: WebUI PM Workspace

```mermaid
stateDiagram-v2
    direction LR
    [*] --> GlobalShell
    GlobalShell --> RouteLoading : EVENT_ROUTE_ENTER
    RouteLoading --> CoreSurface : API_SUCCESS_CORE
    RouteLoading --> ShowcaseSurface : API_SUCCESS_SHOWCASE
    RouteLoading --> EmptyState : API_EMPTY
    RouteLoading --> ErrorState : API_ERROR
    RouteLoading --> RecoveryState : API_FORBIDDEN / API_NOT_FOUND
    CoreSurface --> NavigationState : EVENT_HASH_NAVIGATE / EVENT_SEARCH / EVENT_VIEW_TASK / EVENT_VIEW_TRACE / EVENT_VIEW_DOC
    ShowcaseSurface --> NavigationState : EVENT_HASH_NAVIGATE / EVENT_VIEW_TASK / EVENT_VIEW_TRACE / EVENT_VIEW_DOC
    NavigationState --> CoreSurface : API_SUCCESS
    CoreSurface --> SavingState : EVENT_SAVE_TASK / EVENT_SAVE_BULK / EVENT_MOVE_CARD / EVENT_PI_PLAN_SAVE / EVENT_CONFIDENCE_VOTE / EVENT_APPROVAL_DECISION
    SavingState --> SuccessState : API_SUCCESS
    SavingState --> ErrorState : API_ERROR_ROLLBACK_OR_POLICY_OR_INSUFFICIENT_EVIDENCE
    CoreSurface --> CoreSurface : EVENT_OPEN_OVERLAY / EVENT_CLOSE_OVERLAY
    CoreSurface --> OfflineState : EVENT_DISCONNECT
    OfflineState --> RehydratingState : EVENT_RECONNECT
    RehydratingState --> SyncConflictState : API_CONFLICT
    SyncConflictState --> RehydratingState : EVENT_KEEP_LOCAL / EVENT_USE_SERVER
    RehydratingState --> SuccessState : API_SYNC_SUCCESS
    CoreSurface --> PartialGraphState : API_PARTIAL_ENRICHMENT
    PartialGraphState --> SuccessState : API_ENRICHMENT_SUCCESS
    EmptyState --> RouteLoading : EVENT_RETRY / EVENT_REFRESH
    ErrorState --> RouteLoading : EVENT_RETRY / EVENT_REFRESH
    RecoveryState --> RouteLoading : EVENT_RETRY
    RecoveryState --> GlobalShell : EVENT_BACK
```
