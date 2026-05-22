# Review Diagrams: WebUI and PM Workspace

<!-- beads-id: br-design-webui-pm-review-diagrams -->

## Screen inventory and routes

<!-- beads-id: br-design-webui-pm-review-diagrams-s1 -->

```mermaid
flowchart LR
    Shell["Global Shell\nds:webui.shell.root"]
    Header["Header + global search\nds:webui.shell.header"]
    Sidebar["Primary navigation\nds:webui.shell.sidebar"]
    Boundary["Permission boundary\nscreen_route_permission_denied\n*permission-denied"]

    Shell --> Header
    Shell --> Sidebar
    Shell --> Boundary

    Sidebar --> Dashboard["RTM Dashboard\nscreen_dashboard_rtm\n/"]
    Sidebar --> Board["SAFe Board\nscreen_safe_board\n/board"]
    Sidebar --> Tasks["Task List\nscreen_task_list\n/tasks"]
    Tasks --> TaskDetail["Task Detail\nscreen_task_detail\n/tasks/:id"]
    Sidebar --> Trace["Beads Trace Explorer\nscreen_trace_explorer\n/trace/:id"]
    Sidebar --> Docs["Document Viewer\nscreen_docs_viewer\n/docs"]
    Sidebar --> Approval["Approval Gates\nscreen_approval_gates\n/approval"]
    Header --> Search["Search Results\nscreen_search_results\n/search"]

    Dashboard --> Trace
    Docs --> Trace
    TaskDetail --> Trace
    Board --> Approval
    Search --> Tasks
    Search --> Docs
```

## Per-screen component hierarchy from YAML View Blueprint

<!-- beads-id: br-design-webui-pm-review-diagrams-s2 -->

```mermaid
flowchart TB
    ShellRoot["AppShell\nds:webui.shell.root"] --> ShellHeader["Navbar\nds:webui.shell.header"]
    ShellHeader --> GlobalSearch["SearchInput\nds:webui.shell.global_search"]
    ShellHeader --> ConnectionBadge["Badge\nds:webui.shell.connection_badge"]
    ShellRoot --> ShellSidebar["Sidebar\nds:webui.shell.sidebar"]
    ShellSidebar --> NavDashboard["NavItem Dashboard\nds:webui.shell.nav_dashboard"]
    ShellSidebar --> NavBoard["NavItem Board\nds:webui.shell.nav_board"]
    ShellSidebar --> NavTasks["NavItem Tasks\nds:webui.shell.nav_tasks"]
    ShellSidebar --> NavTrace["NavItem Trace\nds:webui.shell.nav_trace"]
    ShellSidebar --> NavDocs["NavItem Docs\nds:webui.shell.nav_docs"]
    ShellSidebar --> NavApproval["NavItem Approval\nds:webui.shell.nav_approval"]
    ShellRoot --> OfflineBanner["OfflineBanner\nds:webui.shell.offline_banner"]
    ShellRoot --> ShellFooter["Footer\nds:webui.shell.footer"]

    subgraph Dashboard["screen_dashboard_rtm"]
        DashboardRoot["DashboardPage\nds:webui.dashboard.root"] --> KpiRow["KpiRow\nds:webui.dashboard.kpi_row"]
        KpiRow --> KpiCoverage["Coverage card\nds:webui.dashboard.kpi_coverage"]
        KpiRow --> KpiDone["Done card\nds:webui.dashboard.kpi_done"]
        KpiRow --> KpiGaps["Gaps card\nds:webui.dashboard.kpi_gaps"]
        DashboardRoot --> CoveragePanel["HeatmapPanel\nds:webui.dashboard.coverage_panel"]
        DashboardRoot --> ProgressPanel["TaskProgressPanel\nds:webui.dashboard.progress_panel"]
        DashboardRoot --> GraphPanel["KnowledgeGraphWidget\nds:webui.dashboard.graph_panel"]
        DashboardRoot --> GapPanel["GapListPanel\nds:webui.dashboard.gap_panel"]
    end

    subgraph Board["screen_safe_board"]
        BoardRoot["BoardPage\nds:webui.board.root"] --> LevelTabs["SegmentControl\nds:webui.board.level_tabs"]
        BoardRoot --> TodoColumn["KanbanColumn Todo\nds:webui.board.todo_column"]
        BoardRoot --> ProgressColumn["KanbanColumn In Progress\nds:webui.board.progress_column"]
        BoardRoot --> BlockedColumn["KanbanColumn Blocked\nds:webui.board.blocked_column"]
        BoardRoot --> DoneColumn["KanbanColumn Done\nds:webui.board.done_column"]
        BoardRoot --> RteCard["RTE task card\nds:webui.board.rte_task_card"]
        RteCard --> RteBadge["RTE escalation badge\nds:webui.board.rte_escalation_badge"]
        BoardRoot --> VoteButton["Confidence Vote\nds:webui.board.confidence_vote_button"]
    end

    subgraph Approval["screen_approval_gates"]
        ApprovalRoot["ApprovalPage\nds:webui.approval.root"] --> EvidencePanel["ApprovalPanel\nds:webui.approval.evidence_panel"]
        ApprovalRoot --> PrdContext["PRD context\nds:webui.approval.prd_context"]
        ApprovalRoot --> ApproveButton["Approve button\nds:webui.approval.approve_button"]
        ApprovalRoot --> RejectButton["Reject button\nds:webui.approval.reject_button"]
    end

    subgraph Docs["screen_docs_viewer"]
        DocsRoot["DocsPage\nds:webui.docs.root"] --> DocTree["DocTree\nds:webui.docs.tree"]
        DocsRoot --> DocContent["MarkdownContent\nds:webui.docs.content"]
        DocsRoot --> CoverageBadge["Coverage badge\nds:webui.docs.coverage_badge"]
    end

    subgraph Trace["screen_trace_explorer"]
        TraceRoot["TracePage\nds:webui.trace.root"] --> TraceToolbar["Toolbar\nds:webui.trace.toolbar"]
        TraceRoot --> GraphCanvas["GraphCanvas\nds:webui.trace.graph_canvas"]
        TraceRoot --> DetailPanel["DetailPanel\nds:webui.trace.detail_panel"]
    end

    subgraph TaskDetail["screen_task_detail"]
        TaskRoot["TaskDetailPage\nds:webui.task_detail.root"] --> TaskHeader["Header card\nds:webui.task_detail.header_card"]
        TaskRoot --> TaskTabs["TabPanel\nds:webui.task_detail.tabs"]
        TaskTabs --> TaskTabList["TabList\nds:webui.task_detail.tab_list"]
        TaskTabList --> TaskTabDetail["Tab Detail\nds:webui.task_detail.tab_detail"]
        TaskTabList --> TaskTabActivity["Tab Activity\nds:webui.task_detail.tab_activity"]
        TaskTabList --> TaskTabGraph["Tab Graph\nds:webui.task_detail.tab_graph"]
        TaskTabList --> TaskTabCode["Tab Code\nds:webui.task_detail.tab_code"]
        TaskTabs --> TaskDetailPanel["DetailTabPanel\nds:webui.task_detail.detail_panel"]
        TaskTabs --> ActivityTimeline["ActivityTimeline\nds:webui.task_detail.activity_timeline"]
        TaskTabs --> TaskGraph["KnowledgeGraphWidget\nds:webui.task_detail.graph_widget"]
        TaskTabs --> CodePanel["CodeTabPanel\nds:webui.task_detail.code_panel"]
        CodePanel --> CodeFileList["CodeFileList\nds:webui.task_detail.code_file_list"]
        TaskRoot --> RteContext["Execution Context\nds:webui.task_detail.rte_context"]
    end

    subgraph TaskList["screen_task_list"]
        TasksRoot["TaskListPage\nds:webui.tasks.root"] --> FilterBar["FilterBar\nds:webui.tasks.filter_bar"]
        TasksRoot --> DataTable["DataTable\nds:webui.tasks.table"]
        TasksRoot --> BulkBar["BulkActionBar\nds:webui.tasks.bulk_bar"]
    end

    subgraph Search["screen_search_results"]
        SearchRoot["SearchPage\nds:webui.search.root"] --> SearchFilters["FilterSidebar\nds:webui.search.filters"]
        SearchRoot --> SearchResults["ResultGroupList\nds:webui.search.results"]
    end

    subgraph Boundary["screen_route_permission_denied"]
        BoundaryRoot["BoundaryPage\nds:webui.boundary.permission_root"] --> BackButton["Back button\nds:webui.boundary.permission_back_button"]
    end

    ShellRoot --> DashboardRoot
    ShellRoot --> BoardRoot
    ShellRoot --> ApprovalRoot
    ShellRoot --> DocsRoot
    ShellRoot --> TraceRoot
    ShellRoot --> TaskRoot
    ShellRoot --> TasksRoot
    ShellRoot --> SearchRoot
    ShellRoot --> BoundaryRoot
```

## State coverage per screen

<!-- beads-id: br-design-webui-pm-review-diagrams-s3 -->

```mermaid
flowchart LR
    Default["default"]
    Loading["loading"]
    Empty["empty"]
    Error["error"]
    Offline["offline"]
    InsufficientEvidence["insufficient_evidence"]
    Partial["partial"]
    NotFound["not_found"]
    Saving["saving"]
    BulkProcessing["bulk_action_processing"]
    PermissionDenied["permission_denied"]

    Dashboard["screen_dashboard_rtm"]
    Board["screen_safe_board"]
    Approval["screen_approval_gates"]
    Docs["screen_docs_viewer"]
    Trace["screen_trace_explorer"]
    TaskDetail["screen_task_detail"]
    TaskList["screen_task_list"]
    Search["screen_search_results"]
    Boundary["screen_route_permission_denied"]

    Default --> Dashboard
    Loading --> Dashboard
    Empty --> Dashboard
    Error --> Dashboard
    Offline --> Dashboard

    Default --> Board
    Loading --> Board
    Empty --> Board
    Error --> Board
    Offline --> Board

    Default --> Approval
    Loading --> Approval
    InsufficientEvidence --> Approval
    Empty --> Approval
    Error --> Approval

    Default --> Docs
    Loading --> Docs
    Empty --> Docs
    Error --> Docs

    Default --> Trace
    Loading --> Trace
    Empty --> Trace
    Error --> Trace
    Partial --> Trace

    Default --> TaskDetail
    Loading --> TaskDetail
    NotFound --> TaskDetail
    Offline --> TaskDetail
    Saving --> TaskDetail
    Error --> TaskDetail

    Default --> TaskList
    Loading --> TaskList
    Empty --> TaskList
    Error --> TaskList
    BulkProcessing --> TaskList
    Offline --> TaskList

    Default --> Search
    Loading --> Search
    Empty --> Search
    Error --> Search

    PermissionDenied --> Boundary
```

## Action-to-event links between YAML actions and Mermaid events

<!-- beads-id: br-design-webui-pm-review-diagrams-s4 -->

```mermaid
flowchart TB
    subgraph ShellAndNavActions["Global shell and navigation actions complete"]
        A01["action_shell_open_nav\nclick"] --> T01["target shell.sidebar"]
        A02["action_shell_focus_search\nkeyboard shortcut"] --> T02["route /search"]
        A03["action_shell_submit_search\nsubmit"] --> T03["route /search"]
        A04["action_nav_dashboard\nclick"] --> T04["route /"]
        A05["action_nav_board\nclick"] --> T05["route /board"]
        A06["action_nav_tasks\nclick"] --> T06["route /tasks"]
        A07["action_nav_trace\nclick"] --> T07["route /trace/:id"]
        A08["action_nav_docs\nclick"] --> T08["route /docs"]
        A09["action_nav_approval\nclick"] --> T09["route /approval"]
        A10["action_shell_retry_connection\nclick"] --> T10["GET /api/health"]
    end
```

```mermaid
flowchart TB
    subgraph DashboardActions["Dashboard actions complete"]
        D01["action_dashboard_expand_prd\nclick"] --> DT01["coverage.section_rows"]
        D02["action_dashboard_open_section_tasks\nclick"] --> DT02["dashboard.side_panel"]
        D03["action_dashboard_filter_by_status\nclick"] --> DT03["route /tasks"]
        D04["action_dashboard_select_graph_node\nclick"] --> DT04["dashboard.graph_detail_panel"]
        D05["action_dashboard_create_plan\nclick"] --> DT05["dashboard.create_plan_drawer"]
    end
```

```mermaid
flowchart TB
    subgraph BoardActions["Board and RTE actions complete"]
        B01["action_board_switch_level\nclick"] --> BT01["GET /api/tasks board level"]
        B02["action_board_drag_task\ndrag_drop"] --> BT02["PUT /api/tasks/:id"]
        B03["action_board_open_rte_drawer\nclick"] --> BT03["board.rte_drawer"]
        B04["action_board_submit_confidence_vote\nclick"] --> BT04["POST /api/pi-planning/confidence-vote"]
    end
```

```mermaid
flowchart TB
    subgraph ApprovalActions["Approval gate actions complete"]
        P01["action_approval_refresh_evidence\nclick"] --> PT01["POST /api/approvals/:id/refresh"]
        P02["action_approval_open_diff\nclick"] --> PT02["approval.diff_section"]
        P03["action_approval_approve_task\nclick"] --> PT03["POST /api/approvals/:id/approve"]
        P04["action_approval_reject_task\nclick"] --> PT04["POST /api/approvals/:id/reject"]
    end
```

```mermaid
flowchart TB
    subgraph DocsActions["Document viewer actions complete"]
        DOC01["action_docs_select_document\nclick"] --> DOCT01["GET /api/docs/:source_type"]
        DOC02["action_docs_open_trace\nclick"] --> DOCT02["route /trace/:id"]
        DOC03["action_docs_copy_beads_id\nclick"] --> DOCT03["clipboard"]
    end
```

```mermaid
flowchart TB
    subgraph TraceActions["Trace explorer actions complete"]
        TR01["action_trace_change_root\nsubmit"] --> TRT01["GET /api/trace/:id"]
        TR02["action_trace_filter_node_types\nclick"] --> TRT02["trace.graph_canvas"]
        TR03["action_trace_select_node\nclick"] --> TRT03["trace.detail_panel"]
        TR04["action_trace_open_node_route\ndouble click"] --> TRT04["node.route"]
        TR05["action_trace_fit_view\nclick"] --> TRT05["trace.graph_canvas"]
        TR06["action_trace_view_impact\nclick"] --> TRT06["GET /api/impact/:section"]
    end
```

```mermaid
flowchart TB
    subgraph TaskListActions["Task list actions complete"]
        TL01["action_tasks_apply_filter\nchange"] --> TLT01["GET /api/tasks filters"]
        TL02["action_tasks_export_csv\nclick"] --> TLT02["GET /api/tasks/export.csv"]
        TL03["action_tasks_toggle_board_list\nclick"] --> TLT03["route /board"]
        TL04["action_tasks_sort_column\nclick"] --> TLT04["GET /api/tasks sort"]
        TL05["action_tasks_open_detail\nclick"] --> TLT05["route /tasks/:id"]
        TL06["action_tasks_select_row\nclick"] --> TLT06["tasks.selection"]
        TL07["action_tasks_bulk_assign\nsubmit"] --> TLT07["PUT /api/tasks/bulk"]
        TL08["action_tasks_bulk_status\nsubmit"] --> TLT08["PUT /api/tasks/bulk"]
    end
```

```mermaid
flowchart TB
    subgraph TaskDetailActions["Task detail actions complete"]
        TD01["action_task_update_status\nchange"] --> TDT01["PUT /api/tasks/:id"]
        TD02["action_task_update_assignee\nchange"] --> TDT02["PUT /api/tasks/:id"]
        TD03["action_task_update_priority\nchange"] --> TDT03["PUT /api/tasks/:id"]
        TD04["action_task_open_dependency_trace\nclick"] --> TDT04["route /trace/:id"]
        TD05["action_task_open_full_trace\nclick"] --> TDT05["route /trace/:id"]
        TD06["action_task_switch_tab\nclick"] --> TDT06["task_detail.active_tab"]
    end
```

```mermaid
flowchart TB
    subgraph SearchAndBoundaryActions["Search and boundary actions complete"]
        S01["action_search_apply_filter\nchange"] --> ST01["GET /api/search"]
        S02["action_search_open_result\nclick"] --> ST02["result.route"]
        S03["action_search_retry\nclick"] --> ST03["GET /api/search"]
        S04["action_boundary_back_dashboard\nclick"] --> ST04["route /"]
    end
```

## Responsive layout intent by viewport

<!-- beads-id: br-design-webui-pm-review-diagrams-s5 -->

```mermaid
flowchart LR
    Desktop["Desktop 1440px\nexpanded sidebar\nmulti-column panels"]
    Tablet["Tablet 1024px\ncompact sidebar\ntwo-column or bottom sheet"]
    Mobile["Mobile 390px\nhamburger overlay\none-column and full-screen overlays"]

    Shell["Global shell\nds:webui.shell.sidebar"]
    Dashboard["Dashboard panels\nds:webui.dashboard.root"]
    Board["Board layout\nds:webui.board.root"]
    Graph["Graph detail panels\nds:webui.trace.detail_panel"]
    Approval["Approval actions\nds:webui.approval.approve_button"]
    Tasks["Task table\nds:webui.tasks.table"]
    Docs["Docs layout\nds:webui.docs.root"]
    Search["Search filters\nds:webui.search.filters"]

    Desktop --> ShellExpanded["240px sidebar with labels"]
    Tablet --> ShellCompact["60px icon rail with tooltips"]
    Mobile --> ShellOverlay["hidden sidebar plus overlay nav"]
    Shell --> ShellExpanded
    Shell --> ShellCompact
    Shell --> ShellOverlay

    Desktop --> DashDesktop["KPI row plus 2x2 grid"]
    Tablet --> DashTablet["KPI wrap plus two-row panels"]
    Mobile --> DashMobile["single-column cards and panels"]
    Dashboard --> DashDesktop
    Dashboard --> DashTablet
    Dashboard --> DashMobile

    Desktop --> BoardDesktop["horizontal Kanban plus PI sandbox"]
    Tablet --> BoardTablet["horizontal scroll condensed cards"]
    Mobile --> BoardMobile["vertical card list"]
    Board --> BoardDesktop
    Board --> BoardTablet
    Board --> BoardMobile

    Desktop --> GraphDesktop["70 percent canvas and 30 percent detail"]
    Tablet --> GraphTablet["bottom-sheet detail panel"]
    Mobile --> GraphMobile["tree view plus full-screen detail"]
    Graph --> GraphDesktop
    Graph --> GraphTablet
    Graph --> GraphMobile

    Desktop --> ApprovalDesktop["right-side evidence actions"]
    Tablet --> ApprovalTablet["stacked evidence plus sticky bar"]
    Mobile --> ApprovalMobile["single-column cards plus sticky bar"]
    Approval --> ApprovalDesktop
    Approval --> ApprovalTablet
    Approval --> ApprovalMobile

    Desktop --> TasksDesktop["full table and sticky bulk bar"]
    Tablet --> TasksTablet["condensed expandable rows"]
    Mobile --> TasksMobile["task cards replace table"]
    Tasks --> TasksDesktop
    Tasks --> TasksTablet
    Tasks --> TasksMobile

    Desktop --> DocsDesktop["280px doc tree plus content"]
    Tablet --> DocsTablet["document selector above content"]
    Mobile --> DocsMobile["content first plus back to list"]
    Docs --> DocsDesktop
    Docs --> DocsTablet
    Docs --> DocsMobile

    Desktop --> SearchDesktop["240px filter sidebar plus grouped results"]
    Tablet --> SearchTablet["expandable top filter panel"]
    Mobile --> SearchMobile["filter dropdown and full-width results"]
    Search --> SearchDesktop
    Search --> SearchTablet
    Search --> SearchMobile
```
