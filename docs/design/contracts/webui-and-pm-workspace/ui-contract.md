---
title: "UI Contract: WebUI & PM Workspace"
description: "Stage 1 Contract Generator Output for PRD-04 WebUI & PM Workspace"
iteration: 3
feature: "webui-and-pm-workspace"
---

# UI Contract: WebUI & PM Workspace
<!-- beads-id: br-design-contract-webui-pm-workspace -->

## Feature Summary
PRD-04 defines the `gmind serve` WebUI and the showcase surfaces that harden its PM workspace design system before Core WebUI integration. The contract covers the Core PM Workspace shell, RTM dashboard, SAFe board, task list/detail, trace explorer, document viewer, approval gates, search, and every `/design-system/*` showcase route required by PRD-04 §8.1A. Browser surfaces consume only Go REST API responses or API-streamed log events; the UI must not call FrankenSQLite, Zvec, local git, `gh`, FastCode, shell commands, or other local tools directly.

## Review Notes
- Canonical Stage 1 source: `docs/design/contracts/webui-and-pm-workspace/ui-contract.md`.
- Feature slug and output root are normalized to `webui-and-pm-workspace`; do not create legacy `PRD-04-WebUI-and-PM-Workspace` contract paths.
- Each screen exposes stable `data-screen-id` and `data-ds-id` selectors for Stage 2 implementation and QA.
- Boundary states use layout-matched skeletons, direct recovery copy, read-only offline behavior, and permission-aware forbidden states where applicable.

## YAML View Blueprint

```yaml
metadata:
  feature: webui-and-pm-workspace
  iteration: 3
  source_prd:
    path: docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md
    title: PRD 04 WebUI and PM Workspace
    beads_id: br-prd04
  satisfies:
    - br-prd04-s1
    - br-prd04-s2
    - br-prd04-s3
    - br-prd04-s4
    - br-prd04-s5
    - br-prd04-s6
    - br-prd04-s7
    - br-prd04-s8
    - br-prd04-s9
    - br-prd04-s10
    - br-prd04-s11
    - br-prd04-s12
    - br-prd04-s13
    - br-prd04-s14
    - br-prd04-s14a
  stakeholders:
    - role: PMO
      needs:
        - portfolio visibility
        - approval gates
        - delivery risk triage
    - role: RTE
      needs:
        - SAFe board health
        - PI confidence vote
        - ROAM risk decisions
    - role: Engineering Manager
      needs:
        - task assignment
        - traceability
        - CI and activity evidence
    - role: Human Approver
      needs:
        - evidence review
        - coverage confidence
        - audit-safe decisions
  system_boundaries:
    browser_may_call:
      - Go REST API served by gmind serve
      - API-streamed logs from gmind serve
      - client-side hash navigation
      - IndexedDB cache for offline read-only views
    browser_must_not_call:
      - FrankenSQLite directly
      - Zvec directly
      - local git directly
      - GitHub gh CLI directly
      - FastCode directly
      - shell commands directly
  selector_contract:
    data_screen_id: required on each screen root
    data_ds_id: required on each reusable region or component root
    ds_id_prefix_rule: "design-system references use ds: prefix unless PRD already defines br-ds id"

viewports:
  - name: desktop
    width: 1440
    min_width: 1280
    layout_rule: persistent shell, expanded sidebar, multi-column content
  - name: tablet
    width: 1024
    min_width: 768
    layout_rule: condensed sidebar, horizontal scroll for dense boards, drawers become bottom sheets
  - name: mobile
    width: 390
    max_width: 767
    layout_rule: hamburger shell, single-column content, tables become cards, drawers become full-screen overlays

shared_boundary_states:
  loading:
    component: skeleton
    copy: Loading current workspace data through gmind serve.
    recovery_action: none
  empty:
    component: empty_state
    copy: No matching workspace records are available yet.
    recovery_action: clear filters or create first item
  error:
    component: error_banner
    copy: The workspace API could not return this view.
    recovery_action: retry request
  offline:
    component: offline_banner
    copy: Offline mode. Read-only cached data is shown and writes are queued.
    recovery_action: reconnect then sync queued changes
  forbidden:
    component: permission_notice
    copy: Your role cannot access this workspace surface.
    recovery_action: request access from PMO or RTE

api_catalog:
  - id: api:coverage
    method: GET
    path: /api/coverage
  - id: api:gaps
    method: GET
    path: /api/gaps
  - id: api:tasks
    method: GET
    path: /api/tasks
  - id: api:tasks-board
    method: GET
    path: /api/tasks?view=board&board=<id>
  - id: api:task-status
    method: PUT
    path: /api/tasks/:id/status
  - id: api:tasks-detail
    method: GET
    path: /api/tasks/:id
  - id: api:tasks-update
    method: PUT
    path: /api/tasks/:id
  - id: api:task-activity
    method: GET
    path: /api/tasks/:id/activity
  - id: api:trace-full
    method: GET
    path: /api/trace/:id?depth=full
  - id: api:trace-git
    method: GET
    path: /api/trace/:id?include=git
  - id: api:docs-grouped
    method: GET
    path: /api/docs?group=source_type
  - id: api:docs-detail
    method: GET
    path: /api/docs/:id
  - id: api:search
    method: GET
    path: /api/search?q=<query>&type=<type>
  - id: api:approval-queue
    method: GET
    path: /api/tasks?status=pending-approval
  - id: api:approval-evidence
    method: GET
    path: /api/approval/:id/evidence
  - id: api:approval-decision
    method: POST
    path: /api/approval/:id/decision
  - id: api:portfolio-epics
    method: GET
    path: /api/portfolio/epics
  - id: api:portfolio-task-epics
    method: GET
    path: /api/tasks?issue_type=epic
  - id: api:pi-features
    method: GET
    path: /api/pi/features
  - id: api:pi-plan
    method: PUT
    path: /api/pi/plan
  - id: api:pi-risks
    method: GET
    path: /api/risks?view=roam
  - id: api:pi-confidence-vote
    method: POST
    path: /api/pi/confidence-vote
  - id: api:git-graph-scenario
    method: GET
    path: /api/git/graph?scenario=<id>
  - id: api:graph-presets
    method: GET
    path: /api/graph/presets
  - id: api:activity
    method: GET
    path: /api/activity
  - id: api:file-leases
    method: GET
    path: /api/file-leases
  - id: api:agent-sessions
    method: GET
    path: /api/agents/sessions
  - id: api:ci-runs
    method: GET
    path: /api/ci/runs
  - id: api:storyboards
    method: GET
    path: /api/storyboards
  - id: api:storyboard-detail
    method: GET
    path: /api/storyboards/:id

screen_defaults:
  all_screens_require:
    - stable data-screen-id
    - stable data-ds-id
    - keyboard reachable primary controls
    - visible text labels for status colors
    - no direct browser access to local tools or storage

machine_event_action_sources:
  - event: EVENT_APP_BOOT
    source_screen: core-global-shell
    source_component: machine_event_source
    action_source: screen lifecycle action for initial gmind serve shell boot
    target: gmind-serve-shell
  - event: EVENT_SHOWCASE_BOOT
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: screen lifecycle action for design-system showcase boot
    target: /design-system/webui-pm-workspace
  - event: EVENT_ROUTE_ENTER
    source_screen: all-screens
    source_component: machine_event_source
    action_source: screen lifecycle action for route hydration/loading
    target: active route
  - event: EVENT_REQUEST_ACCESS_OR_BACK
    source_screen: shared-boundary-state
    source_component: machine_event_source
    action_source: forbidden-state recovery action
    target: previous allowed route
  - event: EVENT_RECONNECT_SYNC
    source_screen: shared-boundary-state
    source_component: machine_event_source
    action_source: offline recovery action
    target: active route loading state
  - event: EVENT_CLEAR_FILTERS_OR_CREATE
    source_screen: shared-boundary-state
    source_component: machine_event_source
    action_source: empty-state recovery action
    target: active route loading state
  - event: EVENT_RETRY_REQUEST
    source_screen: shared-boundary-state
    source_component: machine_event_source
    action_source: error-state retry action
    target: active route loading state
  - event: EVENT_BACK_TO_TASKS
    source_screen: core-task-detail
    source_component: machine_event_source
    action_source: task-detail back action
    target: /tasks
  - event: EVENT_OPEN_FULL_TRACE
    source_screen: core-task-detail
    source_component: machine_event_source
    action_source: open full trace from task detail
    target: /trace/:id
  - event: EVENT_OPEN_DOC_FROM_TRACE
    source_screen: core-trace-explorer
    source_component: machine_event_source
    action_source: open linked document from trace
    target: /docs
  - event: EVENT_BACK_TO_STORYBOARD_OVERVIEW
    source_screen: ds-storyboard-detail
    source_component: machine_event_source
    action_source: return to storyboard overview
    target: /design-system/storyboard
  - event: EVENT_STORYBOARD_OPEN_DETAIL
    source_screen: ds-storyboard
    source_component: machine_event_source
    action_source: open storyboard detail route
    target: /design-system/storyboard/:id
  - event: EVENT_BULK_ACTION
    source_screen: core-task-list
    source_component: machine_event_source
    action_source: legacy bulk action alias for task bulk assignment
    target: api:tasks-update
  - event: EVENT_SAVE_FIELD
    source_screen: core-task-detail
    source_component: machine_event_source
    action_source: legacy save-field alias for task field save
    target: api:tasks-update
  - event: EVENT_REFRESH_EVIDENCE
    source_screen: core-approval-gates
    source_component: machine_event_source
    action_source: refresh approval evidence after incomplete evidence
    target: api:approval-evidence
  - event: EVENT_COMPOSITE_OPEN_DASHBOARD
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens dashboard surface
    target: /
  - event: EVENT_COMPOSITE_OPEN_BOARD
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens board surface
    target: /board
  - event: EVENT_COMPOSITE_OPEN_TASKS
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens task list surface
    target: /tasks
  - event: EVENT_COMPOSITE_OPEN_TRACE
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens trace explorer surface
    target: /trace/:id
  - event: EVENT_COMPOSITE_OPEN_DOCS
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens document viewer surface
    target: /docs
  - event: EVENT_COMPOSITE_OPEN_APPROVAL
    source_screen: ds-webui-pm-workspace
    source_component: machine_event_source
    action_source: integrated workspace opens approval gates surface
    target: /approval
  - event: EVENT_ROUTE_DESIGN_SYSTEM_TERMINAL
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open terminal showcase route
    target: /design-system/terminal
  - event: EVENT_ROUTE_DESIGN_SYSTEM_PORTFOLIO
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open portfolio showcase route
    target: /design-system/portfolio
  - event: EVENT_ROUTE_DESIGN_SYSTEM_PI_PLANNING
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open PI planning showcase route
    target: /design-system/pi-planning
  - event: EVENT_ROUTE_DESIGN_SYSTEM_GIT_GRAPH
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open git graph showcase route
    target: /design-system/git-graph
  - event: EVENT_ROUTE_DESIGN_SYSTEM_KANBAN
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open kanban showcase route
    target: /design-system/kanban
  - event: EVENT_ROUTE_DESIGN_SYSTEM_KNOWLEDGE_GRAPH
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open knowledge graph showcase route
    target: /design-system/knowledge-graph
  - event: EVENT_ROUTE_DESIGN_SYSTEM_APPROVAL
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open approval showcase route
    target: /design-system/approval
  - event: EVENT_ROUTE_DESIGN_SYSTEM_TIMELINE
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open timeline showcase route
    target: /design-system/timeline
  - event: EVENT_ROUTE_DESIGN_SYSTEM_COMPONENTS
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open components showcase route
    target: /design-system/components
  - event: EVENT_ROUTE_DESIGN_SYSTEM_DOC_VIEWER
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open doc viewer showcase route
    target: /design-system/doc-viewer
  - event: EVENT_ROUTE_DESIGN_SYSTEM_EXPLORER
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open explorer showcase route
    target: /design-system/explorer
  - event: EVENT_ROUTE_DESIGN_SYSTEM_BEADS_TRAVERSAL
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open beads traversal showcase route
    target: /design-system/beads-traversal
  - event: EVENT_ROUTE_DESIGN_SYSTEM_STORYBOARD
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open storyboard showcase route
    target: /design-system/storyboard
  - event: EVENT_ROUTE_DESIGN_SYSTEM_STORYBOARD_ID
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open storyboard detail showcase route
    target: /design-system/storyboard/:id
  - event: EVENT_ROUTE_DESIGN_SYSTEM_WEBUI_PM_WORKSPACE
    source_screen: showcase-navigation
    source_component: machine_event_source
    action_source: open integrated WebUI PM workspace showcase route
    target: /design-system/webui-pm-workspace

screens:
  - id: core-global-shell
    route: gmind-serve-shell
    route_family: core-webui
    ds_id: ds:global_shell
    data_screen_id: core-global-shell
    states:
      - default
      - loading
      - offline
      - forbidden
    source_refs:
      - br-prd04-s2
      - br-prd04-s8
    layout:
      type: responsive_shell
      responsive:
        desktop: 240px sidebar with header search and footer sync status
        tablet: 60px icon sidebar with tooltips
        mobile: hamburger overlay sidebar
      children:
        - type: header
          ds_id: ds:core-shell-header
          labels:
            - gmind logo
            - global search
            - offline indicator
          bindings:
            - api:search
          actions:
            - EVENT_CORE_SHELL_SEARCH
        - type: sidebar_nav
          ds_id: ds:core-shell-sidebar
          labels:
            - RTM Dashboard
            - SAFe Board
            - Task List
            - Task Detail
            - Trace Explorer
            - Doc Viewer
            - Approval Gates
            - Search Results
          actions:
            - EVENT_CORE_NAV_DASHBOARD
            - EVENT_CORE_NAV_BOARD
            - EVENT_CORE_NAV_TASKS
            - EVENT_CORE_NAV_TRACE
            - EVENT_CORE_NAV_DOCS
            - EVENT_CORE_NAV_APPROVAL
        - type: router_outlet
          ds_id: ds:core-shell-router-outlet
          labels:
            - active core surface
          bindings:
            - gmind serve routes

  - id: core-rtm-dashboard
    route: /
    route_family: core-webui
    ds_id: ds:screen:core-rtm-dashboard-001
    data_screen_id: core-rtm-dashboard
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s5
      - br-prd04-s6
    layout:
      type: dashboard_grid
      responsive:
        desktop: 2x2 panels below KPI row
        tablet: two stacked rows
        mobile: one panel per row
      children:
        - type: kpi_row
          ds_id: ds:core-rtm-kpi-row
          labels:
            - Coverage
            - Tasks Done
            - Gaps Found
          bindings:
            - api:coverage
            - api:tasks
            - api:gaps
        - type: coverage_heatmap
          ds_id: ds:core-rtm-coverage-heatmap
          bindings:
            - api:coverage
          actions:
            - EVENT_CORE_DASHBOARD_OPEN_SECTION_TRACE
        - type: task_progress
          ds_id: ds:core-rtm-task-progress
          bindings:
            - api:tasks
        - type: knowledge_graph_widget
          ds_id: ds:core-rtm-knowledge-graph-widget
          bindings:
            - api:trace-full
        - type: gap_analysis
          ds_id: ds:core-rtm-gap-analysis
          bindings:
            - api:gaps

  - id: core-safe-board
    route: /board
    route_family: core-webui
    ds_id: ds:screen:core-safe-board-001
    data_screen_id: core-safe-board
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s3
      - br-prd04-s7
    layout:
      type: kanban_board
      responsive:
        desktop: horizontal Portfolio, ART, and Team lanes
        tablet: horizontal scroll lanes
        mobile: stacked task cards
      children:
        - type: board_level_tabs
          ds_id: ds:core-safe-board-level-tabs
          labels:
            - Portfolio
            - ART
            - Team
          bindings:
            - api:tasks-board
        - type: kanban_lanes
          ds_id: ds:core-safe-board-lanes
          labels:
            - Todo
            - In Progress
            - Review
            - Done
          actions:
            - EVENT_CORE_BOARD_DRAG_CARD
        - type: rte_escalation_badge
          ds_id: ds:core-safe-board-rte-badge
          labels:
            - RTE:ESCALATED
            - RTE:DISCUSSING
          bindings:
            - api:task-activity

  - id: core-task-list
    route: /tasks
    route_family: core-webui
    ds_id: ds:screen:core-task-list-001
    data_screen_id: core-task-list
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - processing
    source_refs:
      - br-prd04-s13
    layout:
      type: data_table
      responsive:
        desktop: full sortable table
        tablet: hide lower-priority columns in expandable rows
        mobile: card list with filter drawer
      children:
        - type: filter_bar
          ds_id: ds:core-task-list-filter-bar
          labels:
            - Status
            - Assignee
            - Priority
            - PRD
          bindings:
            - api:tasks
        - type: task_table
          ds_id: ds:core-task-list-table
          labels:
            - ID
            - Title
            - Status
            - Priority
            - Assignee
            - QA
          actions:
            - EVENT_CORE_TASK_LIST_ROW_OPEN
            - EVENT_CORE_TASK_LIST_BULK_ASSIGN

  - id: core-task-detail
    route: /tasks/:id
    route_family: core-webui
    ds_id: ds:screen:core-task-detail-001
    data_screen_id: core-task-detail
    states:
      - default
      - loading
      - not-found
      - error
      - offline
      - forbidden
      - saving
    source_refs:
      - br-prd04-s11
    layout:
      type: tabbed_detail
      responsive:
        desktop: header fields plus tabs
        tablet: scrollable tabs
        mobile: accordion tabs
      children:
        - type: task_header
          ds_id: ds:core-task-detail-header
          labels:
            - Status
            - Priority
            - Assignee
            - QA
          bindings:
            - api:tasks-detail
          actions:
            - EVENT_CORE_TASK_DETAIL_SAVE_FIELD
        - type: tab_panel
          ds_id: ds:core-task-detail-tabs
          labels:
            - Detail
            - Activity
            - Graph
            - Code
          children:
            - type: markdown_detail
              ds_id: ds:core-task-detail-markdown
              bindings:
                - api:tasks-detail
            - type: activity_timeline
              ds_id: ds:core-task-detail-activity
              bindings:
                - api:task-activity
            - type: trace_graph_widget
              ds_id: ds:core-task-detail-graph
              bindings:
                - api:trace-full

  - id: core-trace-explorer
    route: /trace/:id
    route_family: core-webui
    ds_id: ds:screen:core-trace-explorer-001
    data_screen_id: core-trace-explorer
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - partial
    source_refs:
      - br-prd04-s5
      - br-prd04-s10
    layout:
      type: graph_explorer
      responsive:
        desktop: 70 percent graph canvas and 30 percent detail panel
        tablet: graph with bottom sheet detail
        mobile: simplified tree view with full-screen detail overlay
      children:
        - type: trace_toolbar
          ds_id: ds:core-trace-toolbar
          labels:
            - Root
            - Depth
            - Node type filters
          bindings:
            - api:trace-full
        - type: force_graph
          ds_id: ds:core-trace-force-graph
          labels:
            - PRD
            - Plan
            - Task
            - Commit
            - Chat
            - PR
            - RTE Approval
            - CI Run
            - Code File
            - Agent Trace
          actions:
            - EVENT_CORE_TRACE_SELECT_NODE
            - EVENT_CORE_TRACE_OPEN_LINKED_ENTITY
        - type: node_detail_panel
          ds_id: ds:core-trace-node-detail
          labels:
            - Beads ID
            - Coverage
            - Connected nodes

  - id: core-doc-viewer
    route: /docs
    route_family: core-webui
    ds_id: ds:screen:core-doc-viewer-001
    data_screen_id: core-doc-viewer
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s9
    layout:
      type: document_viewer
      responsive:
        desktop: tree and document split view
        tablet: top document selector with content panel
        mobile: document list then selected document
      children:
        - type: document_tree
          ds_id: ds:core-doc-viewer-tree
          labels:
            - Docs
            - Chats
            - Commits
            - RTE
          bindings:
            - api:docs-grouped
        - type: document_panel
          ds_id: ds:core-doc-viewer-panel
          labels:
            - Rendered content
            - Beads ID badges
            - Coverage indicator
          bindings:
            - api:docs-detail
          actions:
            - EVENT_CORE_DOC_OPEN_BEADS_TRACE

  - id: core-approval-gates
    route: /approval
    route_family: core-webui
    ds_id: ds:screen:core-approval-gates-001
    data_screen_id: core-approval-gates
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - insufficient-evidence
    source_refs:
      - br-prd04-s4
      - br-prd04-s7
    layout:
      type: approval_workspace
      responsive:
        desktop: evidence split view with sticky decision panel
        tablet: stacked evidence and decision sections
        mobile: evidence cards with bottom decision bar
      children:
        - type: approval_queue
          ds_id: ds:core-approval-queue
          bindings:
            - api:approval-queue
        - type: evidence_blocks
          ds_id: ds:core-approval-evidence-blocks
          labels:
            - Tests
            - Diff
            - Beads ID
            - PRD
            - CI
          bindings:
            - api:approval-evidence
        - type: decision_controls
          ds_id: ds:core-approval-decision-controls
          labels:
            - Approve
            - Reject
            - Refresh evidence
          actions:
            - EVENT_CORE_APPROVAL_SUBMIT_DECISION

  - id: core-search-results
    route: /search
    route_family: core-webui
    ds_id: ds:screen:core-search-results-001
    data_screen_id: core-search-results
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s12
    layout:
      type: search_results
      responsive:
        desktop: filter sidebar and grouped results
        tablet: expandable filters above results
        mobile: filter dropdown and full-width results
      children:
        - type: search_input
          ds_id: ds:core-search-input
          labels:
            - Search tasks, documents, commits, code
          bindings:
            - api:search
        - type: result_filters
          ds_id: ds:core-search-filters
          labels:
            - all
            - doc
            - commit
            - task
            - adr
            - chat
            - spike
        - type: result_list
          ds_id: ds:core-search-result-list
          actions:
            - EVENT_CORE_SEARCH_OPEN_RESULT

  - id: ds-terminal
    route: /design-system/terminal
    route_family: showcase
    ds_id: ds:screen:terminal-001
    data_screen_id: ds-terminal
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s8
      - br-prd04-s14
    layout:
      type: terminal_workspace
      responsive:
        desktop: scenario tabs above 2x2 mosaic terminal layout
        tablet: two columns then stacked terminals
        mobile: one terminal per row
      children:
        - type: scenario_tabs
          ds_id: ds:terminal-scenario-tabs
          labels:
            - Agent Console
            - Deploy
            - Debug
            - CI/CD
        - type: terminal_line_legend
          ds_id: ds:terminal-line-legend
          labels:
            - command
            - output
            - success
            - error
        - type: terminal_mosaic
          ds_id: ds:terminal-mosaic-2x2
          labels:
            - Claude-01 Storage
            - Claude-02 CLI
            - Claude-03 CI
            - QA-Reviewer
          bindings:
            - api:agent-sessions
            - api:ci-runs
            - api:task-activity
            - API-streamed logs only

  - id: ds-portfolio
    route: /design-system/portfolio
    route_family: showcase
    ds_id: br-ds-portfolio-view
    data_screen_id: ds-portfolio
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s3
    layout:
      type: executive_portfolio
      responsive:
        desktop: table and roadmap side by side
        tablet: table above roadmap
        mobile: epic cards and scrollable roadmap
      children:
        - type: portfolio_table
          ds_id: ds:portfolio-executive-table
          labels:
            - Epic ID
            - owner
            - progress
            - budget
            - status
            - forecast
          bindings:
            - api:portfolio-epics
            - api:portfolio-task-epics
        - type: roadmap
          ds_id: ds:portfolio-roadmap-2026
          labels:
            - Q1 2026
            - Q2 2026
            - Q3 2026

  - id: ds-pi-planning
    route: /design-system/pi-planning
    route_family: showcase
    ds_id: br-ds-pi-planning
    data_screen_id: ds-pi-planning
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s3
    layout:
      type: pi_planning_workspace
      responsive:
        desktop: sandbox, scoring, vote, and ROAM board
        tablet: two stacked planning columns
        mobile: single-column planning cards
      children:
        - type: strategic_sandbox
          ds_id: ds:pi-strategic-sandbox
          labels:
            - drag/drop capacity
          bindings:
            - api:pi-features
          actions:
            - EVENT_PI_SAVE_PLAN
        - type: business_value_scoring
          ds_id: ds:pi-business-value-scoring
          labels:
            - Business Value
            - capacity impact
        - type: confidence_vote
          ds_id: ds:pi-confidence-vote
          labels:
            - 1
            - 2
            - 3
            - 4
            - 5
          actions:
            - EVENT_PI_SUBMIT_CONFIDENCE_VOTE
        - type: roam_board
          ds_id: ds:pi-roam-board
          labels:
            - Resolved
            - Owned
            - Accepted
            - Mitigated
            - Unassigned
          bindings:
            - api:pi-risks

  - id: ds-git-graph
    route: /design-system/git-graph
    route_family: showcase
    ds_id: ds:screen:git-graph-001
    data_screen_id: ds-git-graph
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s5
      - br-prd04-s10
    layout:
      type: git_graph_scenarios
      responsive:
        desktop: scenario rail, graph canvas, stats panel
        tablet: scenario select above canvas
        mobile: stacked scenario list and graph summary
      children:
        - type: hash_scenario_tabs
          ds_id: ds:git-graph-scenario-tabs
          labels:
            - gitflow
            - multi-agent
            - hotfix
            - release-train
            - monorepo
            - beads-prd-trace
            - beads-deadlock
            - beads-ds-comp
            - beads-traversal
            - beads-sprint-review
          bindings:
            - api:git-graph-scenario
            - api:trace-git
        - type: branch_graph
          ds_id: ds:git-graph-canvas
          labels:
            - branches
            - commits
            - connections
            - branch tags

  - id: ds-kanban
    route: /design-system/kanban
    route_family: showcase
    ds_id: ds:screen:kanban-001
    data_screen_id: ds-kanban
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s3
    layout:
      type: showcase_kanban
      responsive:
        desktop: board selector and lanes
        tablet: scrollable lanes
        mobile: card list grouped by status
      children:
        - type: hash_board_selector
          ds_id: ds:kanban-board-selector
          labels:
            - sprint
            - release
            - bug-triage
          bindings:
            - api:tasks-board
        - type: drag_drop_cards
          ds_id: ds:kanban-drag-drop-cards
          labels:
            - WIP badges
            - total stats
            - done stats
            - progress stats
          actions:
            - EVENT_KANBAN_UPDATE_CARD_STATUS

  - id: ds-knowledge-graph
    route: /design-system/knowledge-graph
    route_family: showcase
    ds_id: ds:screen:knowledge-graph-001
    data_screen_id: ds-knowledge-graph
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s5
      - br-prd04-s10
    layout:
      type: client_only_graph_viewer
      responsive:
        desktop: Sigma.js canvas with legends and detail banner
        tablet: canvas with collapsible legends
        mobile: simplified graph with selected-node drawer
      children:
        - type: sigma_graphology_viewer
          ds_id: ds:knowledge-graph-sigma-viewer
          labels:
            - client-only viewer
            - simple preset
            - ecosystem preset
            - sprint preset
          bindings:
            - api:trace-full
            - api:graph-presets
        - type: selected_node_banner
          ds_id: ds:knowledge-graph-selected-node-banner
        - type: graph_legend_stats
          ds_id: ds:knowledge-graph-legend-stats
          labels:
            - node legend
            - edge legend
            - stats

  - id: ds-approval
    route: /design-system/approval
    route_family: showcase
    ds_id: ds:screen:approval-001
    data_screen_id: ds-approval
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - insufficient-evidence
    source_refs:
      - br-prd04-s4
      - br-prd04-s7
    layout:
      type: approval_showcase
      hash_anchors:
        - panels
        - rtm
        - heatmap
      responsive:
        desktop: approval panels, RTM, and heatmap sections
        tablet: stacked panels with sticky toggles
        mobile: accordion evidence panels
      children:
        - type: status_toggles
          ds_id: ds:approval-status-toggles
          labels:
            - pending
            - approved
            - rejected
        - type: escalated_badge
          ds_id: ds:approval-escalated-badge
        - type: evidence_blocks
          ds_id: ds:approval-evidence-blocks
          labels:
            - Tests
            - Diff
            - Beads ID
            - PRD
            - CI
          bindings:
            - api:approval-evidence
        - type: rtm_matrix
          ds_id: ds:approval-rtm-matrix
        - type: coverage_heatmap
          ds_id: ds:approval-coverage-heatmap
          bindings:
            - api:coverage

  - id: ds-timeline
    route: /design-system/timeline
    route_family: showcase
    ds_id: ds:screen:timeline-001
    data_screen_id: ds-timeline
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s1
      - br-prd04-s8
    layout:
      type: timeline_workspace
      hash_anchors:
        - file-lease
        - activity-feed
        - sprint-day
      responsive:
        desktop: three timeline sections
        tablet: stacked timeline sections
        mobile: compact event list
      children:
        - type: file_lease_indicators
          ds_id: ds:timeline-file-lease-indicators
          labels:
            - unlocked
            - locked
            - expiring
            - expired
          bindings:
            - api:file-leases
        - type: activity_feed
          ds_id: ds:timeline-activity-feed
          bindings:
            - api:activity
            - api:task-activity
          polling: 3-5s
        - type: sprint_day_timeline
          ds_id: ds:timeline-sprint-day

  - id: ds-components
    route: /design-system/components
    route_family: showcase
    ds_id: ds:screen:components-001
    data_screen_id: ds-components
    states:
      - default
      - loading
      - empty
      - error
    source_refs:
      - br-prd04-s8
      - br-prd04-s14
    layout:
      type: component_catalog
      responsive:
        desktop: section sidebar and examples grid
        tablet: section tabs and examples
        mobile: hash-scroll sections
      children:
        - type: catalog_sections
          ds_id: ds:components-catalog-sections
          labels:
            - Buttons
            - Badges/Status
            - Progress
            - Avatar Stack
            - Modal
            - Dropdown
            - Accordion
            - Tab Panel
            - Data Table
            - Tooltip
            - Code Block
            - Cards
            - Prompt Card
            - Section Labels
            - Status Dots
            - Skeleton
            - Empty State
            - Error Banner
          actions:
            - EVENT_COMPONENTS_HASH_SCROLL

  - id: ds-doc-viewer
    route: /design-system/doc-viewer
    route_family: showcase
    ds_id: ds:screen:doc-viewer-001
    data_screen_id: ds-doc-viewer
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s9
    layout:
      type: github_like_doc_viewer
      responsive:
        desktop: file tree with selected document panel
        tablet: collapsible tree above panel
        mobile: folder list then document detail
      children:
        - type: github_like_tree
          ds_id: ds:doc-viewer-github-tree
          labels:
            - folders
            - expandable folders
          bindings:
            - api:docs-grouped
        - type: selected_document_panel
          ds_id: ds:doc-viewer-selected-panel
          labels:
            - Beads ID badges
            - covered
            - partial
            - gap
          bindings:
            - api:docs-detail
          actions:
            - EVENT_DOC_VIEWER_OPEN_EXPLORER
            - EVENT_DOC_VIEWER_OPEN_KNOWLEDGE_GRAPH
            - EVENT_DOC_VIEWER_OPEN_CORE_TRACE

  - id: ds-explorer
    route: /design-system/explorer
    route_family: showcase
    ds_id: ds:screen:explorer-001
    data_screen_id: ds-explorer
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s12
    layout:
      type: unified_explorer
      responsive:
        desktop: search, filters, results, and detail sidebar
        tablet: detail sidebar becomes bottom panel
        mobile: results list with detail overlay
      children:
        - type: unified_search
          ds_id: ds:explorer-unified-search
          bindings:
            - api:search
        - type: hash_filter_select
          ds_id: ds:explorer-filter-select
          labels:
            - all
            - doc
            - commit
            - task
            - adr
            - chat
            - spike
        - type: result_list
          ds_id: ds:explorer-result-list
        - type: detail_sidebar
          ds_id: ds:explorer-detail-sidebar
          labels:
            - cross-links
            - Knowledge Graph
            - Beads Traversal
            - Doc Viewer

  - id: ds-beads-traversal
    route: /design-system/beads-traversal
    route_family: showcase
    ds_id: ds:screen:beads-traversal-001
    data_screen_id: ds-beads-traversal
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s10
    layout:
      type: layered_dag
      responsive:
        desktop: four-layer DAG with detail sidebar
        tablet: layered DAG with bottom detail
        mobile: layer cards with linked highlighting
      children:
        - type: layer_columns
          ds_id: ds:beads-traversal-layers
          labels:
            - PRD Sections
            - Plan Elements
            - Tasks
            - Commits
          bindings:
            - api:trace-full
        - type: direction_toggle
          ds_id: ds:beads-traversal-direction-toggle
          labels:
            - forward
            - reverse
        - type: selected_linked_highlighting
          ds_id: ds:beads-traversal-linked-highlighting
        - type: traversal_detail_sidebar
          ds_id: ds:beads-traversal-detail-sidebar
          labels:
            - satisfies
            - implements
            - committed-for
        - type: legend_stats
          ds_id: ds:beads-traversal-legend-stats

  - id: ds-storyboard
    route: /design-system/storyboard
    route_family: showcase
    ds_id: ds:screen:storyboard-001
    data_screen_id: ds-storyboard
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s8
      - br-prd04-s14
    layout:
      type: storyboard_overview
      responsive:
        desktop: journey filter, horizontal flow, guidance panel
        tablet: flow above guidance panel
        mobile: step list with guidance cards
      children:
        - type: journey_filter
          ds_id: ds:storyboard-journey-filter
          bindings:
            - api:storyboards
        - type: horizontal_usecase_flow
          ds_id: ds:storyboard-usecase-flow
        - type: guidance_panel
          ds_id: ds:storyboard-guidance-panel
          labels:
            - Mechanism and Action
            - Considerations
            - Investigating
          actions:
            - EVENT_STORYBOARD_OPEN_REAL_SCREEN

  - id: ds-storyboard-detail
    route: /design-system/storyboard/:id
    route_family: showcase
    ds_id: ds:screen:storyboard-detail-001
    data_screen_id: ds-storyboard-detail
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s8
      - br-prd04-s14
    layout:
      type: storyboard_detail
      responsive:
        desktop: role, journey, timeline, and related use cases
        tablet: stacked detail sections
        mobile: single-column timeline
      children:
        - type: storyboard_role_summary
          ds_id: ds:storyboard-detail-role-summary
          bindings:
            - api:storyboard-detail
        - type: storyboard_step_timeline
          ds_id: ds:storyboard-detail-step-timeline
        - type: related_usecases
          ds_id: ds:storyboard-detail-related-usecases

  - id: ds-webui-pm-workspace
    route: /design-system/webui-pm-workspace
    route_family: showcase
    ds_id: ds:screen:webui-pm-workspace-001
    data_screen_id: ds-webui-pm-workspace
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    source_refs:
      - br-prd04-s2
      - br-prd04-s8
      - br-prd04-s14
    layout:
      type: integrated_pm_workspace_shell
      responsive:
        desktop: header, sidebar nav, and active surface canvas
        tablet: compact sidebar and stacked dashboard modules
        mobile: hamburger nav and one active surface at a time
      children:
        - type: workspace_header
          ds_id: ds:webui-pm-workspace-header
          labels:
            - logo
            - search
            - offline indicator
        - type: workspace_sidebar
          ds_id: ds:webui-pm-workspace-sidebar
          labels:
            - RTM Dashboard
            - SAFe Board
            - Task List
            - Task Detail
            - Trace Explorer
            - Doc Viewer
            - Approval Gates
            - Search Results
        - type: active_surface_router
          ds_id: ds:webui-pm-workspace-active-surface-router
          labels:
            - /
            - /board
            - /tasks
            - /tasks/:id
            - /trace/:id
            - /docs
            - /approval
            - /search
          bindings:
            - gmind serve route mapping
```

## Mermaid Logic Machine

```mermaid
stateDiagram-v2
    direction LR

    [*] --> core_global_shell: EVENT_APP_BOOT
    [*] --> ds_global_shell: EVENT_SHOWCASE_BOOT

    core_global_shell --> core_rtm_dashboard: EVENT_CORE_NAV_DASHBOARD
    core_global_shell --> core_safe_board: EVENT_CORE_NAV_BOARD
    core_global_shell --> core_task_list: EVENT_CORE_NAV_TASKS
    core_global_shell --> core_trace_explorer: EVENT_CORE_NAV_TRACE
    core_global_shell --> core_doc_viewer: EVENT_CORE_NAV_DOCS
    core_global_shell --> core_approval_gates: EVENT_CORE_NAV_APPROVAL
    core_global_shell --> core_search_results: EVENT_CORE_SHELL_SEARCH

    ds_global_shell --> ds_terminal: EVENT_ROUTE_DESIGN_SYSTEM_TERMINAL
    ds_global_shell --> ds_portfolio: EVENT_ROUTE_DESIGN_SYSTEM_PORTFOLIO
    ds_global_shell --> ds_pi_planning: EVENT_ROUTE_DESIGN_SYSTEM_PI_PLANNING
    ds_global_shell --> ds_git_graph: EVENT_ROUTE_DESIGN_SYSTEM_GIT_GRAPH
    ds_global_shell --> ds_kanban: EVENT_ROUTE_DESIGN_SYSTEM_KANBAN
    ds_global_shell --> ds_knowledge_graph: EVENT_ROUTE_DESIGN_SYSTEM_KNOWLEDGE_GRAPH
    ds_global_shell --> ds_approval: EVENT_ROUTE_DESIGN_SYSTEM_APPROVAL
    ds_global_shell --> ds_timeline: EVENT_ROUTE_DESIGN_SYSTEM_TIMELINE
    ds_global_shell --> ds_components: EVENT_ROUTE_DESIGN_SYSTEM_COMPONENTS
    ds_global_shell --> ds_doc_viewer: EVENT_ROUTE_DESIGN_SYSTEM_DOC_VIEWER
    ds_global_shell --> ds_explorer: EVENT_ROUTE_DESIGN_SYSTEM_EXPLORER
    ds_global_shell --> ds_beads_traversal: EVENT_ROUTE_DESIGN_SYSTEM_BEADS_TRAVERSAL
    ds_global_shell --> ds_storyboard: EVENT_ROUTE_DESIGN_SYSTEM_STORYBOARD
    ds_global_shell --> ds_storyboard_detail: EVENT_ROUTE_DESIGN_SYSTEM_STORYBOARD_ID
    ds_global_shell --> ds_webui_pm_workspace: EVENT_ROUTE_DESIGN_SYSTEM_WEBUI_PM_WORKSPACE

    core_rtm_dashboard --> core_safe_board: EVENT_CORE_NAV_BOARD
    core_rtm_dashboard --> core_task_list: EVENT_CORE_NAV_TASKS
    core_task_list --> core_task_detail: EVENT_CORE_TASK_LIST_ROW_OPEN
    core_task_detail --> core_task_list: EVENT_BACK_TO_TASKS
    core_task_detail --> core_trace_explorer: EVENT_OPEN_FULL_TRACE
    core_trace_explorer --> core_doc_viewer: EVENT_OPEN_DOC_FROM_TRACE
    core_doc_viewer --> core_trace_explorer: EVENT_CORE_DOC_OPEN_BEADS_TRACE
    core_global_shell --> core_search_results: EVENT_CORE_SHELL_SEARCH
    ds_doc_viewer --> ds_explorer: EVENT_DOC_VIEWER_OPEN_EXPLORER
    ds_doc_viewer --> ds_knowledge_graph: EVENT_DOC_VIEWER_OPEN_KNOWLEDGE_GRAPH
    ds_doc_viewer --> core_trace_explorer: EVENT_DOC_VIEWER_OPEN_CORE_TRACE
    ds_storyboard --> ds_storyboard_detail: EVENT_STORYBOARD_OPEN_DETAIL
    ds_storyboard_detail --> ds_storyboard: EVENT_BACK_TO_STORYBOARD_OVERVIEW
    ds_webui_pm_workspace --> core_rtm_dashboard: EVENT_COMPOSITE_OPEN_DASHBOARD
    ds_webui_pm_workspace --> core_safe_board: EVENT_COMPOSITE_OPEN_BOARD
    ds_webui_pm_workspace --> core_task_list: EVENT_COMPOSITE_OPEN_TASKS
    ds_webui_pm_workspace --> core_trace_explorer: EVENT_COMPOSITE_OPEN_TRACE
    ds_webui_pm_workspace --> core_doc_viewer: EVENT_COMPOSITE_OPEN_DOCS
    ds_webui_pm_workspace --> core_approval_gates: EVENT_COMPOSITE_OPEN_APPROVAL

    core_global_shell --> core_global_shell_loading: EVENT_ROUTE_ENTER
    core_global_shell_loading --> core_global_shell_default: API_SUCCESS
    core_global_shell_loading --> core_global_shell_forbidden: API_PERMISSION_DENIED
    core_global_shell_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_global_shell_default --> core_global_shell_offline: API_OFFLINE_DETECTED
    core_global_shell_offline --> core_global_shell_loading: EVENT_RECONNECT_SYNC

    core_rtm_dashboard --> core_rtm_dashboard_loading: EVENT_ROUTE_ENTER
    core_rtm_dashboard_loading --> core_rtm_dashboard_default: API_SUCCESS
    core_rtm_dashboard_loading --> core_rtm_dashboard_empty: API_EMPTY
    core_rtm_dashboard_empty --> core_rtm_dashboard_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_rtm_dashboard_loading --> core_rtm_dashboard_error: API_ERROR
    core_rtm_dashboard_error --> core_rtm_dashboard_loading: EVENT_RETRY_REQUEST
    core_rtm_dashboard_loading --> core_rtm_dashboard_forbidden: API_PERMISSION_DENIED
    core_rtm_dashboard_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_rtm_dashboard_default --> core_rtm_dashboard_offline: API_OFFLINE_DETECTED
    core_rtm_dashboard_offline --> core_rtm_dashboard_loading: EVENT_RECONNECT_SYNC

    core_safe_board --> core_safe_board_loading: EVENT_ROUTE_ENTER
    core_safe_board_loading --> core_safe_board_default: API_SUCCESS
    core_safe_board_loading --> core_safe_board_empty: API_EMPTY
    core_safe_board_empty --> core_safe_board_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_safe_board_loading --> core_safe_board_error: API_ERROR
    core_safe_board_error --> core_safe_board_loading: EVENT_RETRY_REQUEST
    core_safe_board_loading --> core_safe_board_forbidden: API_PERMISSION_DENIED
    core_safe_board_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_safe_board_default --> core_safe_board_offline: API_OFFLINE_DETECTED
    core_safe_board_offline --> core_safe_board_loading: EVENT_RECONNECT_SYNC

    core_task_list --> core_task_list_loading: EVENT_ROUTE_ENTER
    core_task_list_loading --> core_task_list_default: API_SUCCESS
    core_task_list_loading --> core_task_list_empty: API_EMPTY
    core_task_list_empty --> core_task_list_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_task_list_loading --> core_task_list_error: API_ERROR
    core_task_list_error --> core_task_list_loading: EVENT_RETRY_REQUEST
    core_task_list_loading --> core_task_list_forbidden: API_PERMISSION_DENIED
    core_task_list_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_task_list_default --> core_task_list_offline: API_OFFLINE_DETECTED
    core_task_list_offline --> core_task_list_loading: EVENT_RECONNECT_SYNC
    core_task_list_default --> core_task_list_processing: EVENT_BULK_ACTION
    core_task_list_processing --> core_task_list_default: API_BULK_SUCCESS
    core_task_list_processing --> core_task_list_error: API_BULK_ERROR

    core_task_detail --> core_task_detail_loading: EVENT_ROUTE_ENTER
    core_task_detail_loading --> core_task_detail_default: API_SUCCESS
    core_task_detail_loading --> core_task_detail_error: API_ERROR
    core_task_detail_error --> core_task_detail_loading: EVENT_RETRY_REQUEST
    core_task_detail_loading --> core_task_detail_forbidden: API_PERMISSION_DENIED
    core_task_detail_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_task_detail_default --> core_task_detail_offline: API_OFFLINE_DETECTED
    core_task_detail_offline --> core_task_detail_loading: EVENT_RECONNECT_SYNC
    core_task_detail_default --> core_task_detail_saving: EVENT_SAVE_FIELD
    core_task_detail_saving --> core_task_detail_default: API_SAVE_SUCCESS
    core_task_detail_saving --> core_task_detail_error: API_SAVE_ERROR
    core_task_detail_loading --> core_task_detail_not_found: API_NOT_FOUND
    core_task_detail_not_found --> core_task_list: EVENT_BACK_TO_TASKS

    core_trace_explorer --> core_trace_explorer_loading: EVENT_ROUTE_ENTER
    core_trace_explorer_loading --> core_trace_explorer_default: API_SUCCESS
    core_trace_explorer_loading --> core_trace_explorer_empty: API_EMPTY
    core_trace_explorer_empty --> core_trace_explorer_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_trace_explorer_loading --> core_trace_explorer_error: API_ERROR
    core_trace_explorer_error --> core_trace_explorer_loading: EVENT_RETRY_REQUEST
    core_trace_explorer_loading --> core_trace_explorer_forbidden: API_PERMISSION_DENIED
    core_trace_explorer_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_trace_explorer_default --> core_trace_explorer_offline: API_OFFLINE_DETECTED
    core_trace_explorer_offline --> core_trace_explorer_loading: EVENT_RECONNECT_SYNC
    core_trace_explorer_loading --> core_trace_explorer_partial: API_ENRICHMENT_TIMEOUT
    core_trace_explorer_partial --> core_trace_explorer_default: API_ENRICHMENT_SUCCESS

    core_doc_viewer --> core_doc_viewer_loading: EVENT_ROUTE_ENTER
    core_doc_viewer_loading --> core_doc_viewer_default: API_SUCCESS
    core_doc_viewer_loading --> core_doc_viewer_empty: API_EMPTY
    core_doc_viewer_empty --> core_doc_viewer_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_doc_viewer_loading --> core_doc_viewer_error: API_ERROR
    core_doc_viewer_error --> core_doc_viewer_loading: EVENT_RETRY_REQUEST
    core_doc_viewer_loading --> core_doc_viewer_forbidden: API_PERMISSION_DENIED
    core_doc_viewer_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_doc_viewer_default --> core_doc_viewer_offline: API_OFFLINE_DETECTED
    core_doc_viewer_offline --> core_doc_viewer_loading: EVENT_RECONNECT_SYNC

    core_approval_gates --> core_approval_gates_loading: EVENT_ROUTE_ENTER
    core_approval_gates_loading --> core_approval_gates_default: API_SUCCESS
    core_approval_gates_loading --> core_approval_gates_empty: API_EMPTY
    core_approval_gates_empty --> core_approval_gates_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_approval_gates_loading --> core_approval_gates_error: API_ERROR
    core_approval_gates_error --> core_approval_gates_loading: EVENT_RETRY_REQUEST
    core_approval_gates_loading --> core_approval_gates_forbidden: API_PERMISSION_DENIED
    core_approval_gates_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_approval_gates_default --> core_approval_gates_offline: API_OFFLINE_DETECTED
    core_approval_gates_offline --> core_approval_gates_loading: EVENT_RECONNECT_SYNC
    core_approval_gates_default --> core_approval_gates_insufficient_evidence: API_EVIDENCE_INCOMPLETE
    core_approval_gates_insufficient_evidence --> core_approval_gates_loading: EVENT_REFRESH_EVIDENCE

    core_search_results --> core_search_results_loading: EVENT_ROUTE_ENTER
    core_search_results_loading --> core_search_results_default: API_SUCCESS
    core_search_results_loading --> core_search_results_empty: API_EMPTY
    core_search_results_empty --> core_search_results_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    core_search_results_loading --> core_search_results_error: API_ERROR
    core_search_results_error --> core_search_results_loading: EVENT_RETRY_REQUEST
    core_search_results_loading --> core_search_results_forbidden: API_PERMISSION_DENIED
    core_search_results_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    core_search_results_default --> core_search_results_offline: API_OFFLINE_DETECTED
    core_search_results_offline --> core_search_results_loading: EVENT_RECONNECT_SYNC

    ds_terminal --> ds_terminal_loading: EVENT_ROUTE_ENTER
    ds_terminal_loading --> ds_terminal_default: API_SUCCESS
    ds_terminal_loading --> ds_terminal_empty: API_EMPTY
    ds_terminal_empty --> ds_terminal_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_terminal_loading --> ds_terminal_error: API_ERROR
    ds_terminal_error --> ds_terminal_loading: EVENT_RETRY_REQUEST
    ds_terminal_loading --> ds_terminal_forbidden: API_PERMISSION_DENIED
    ds_terminal_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_terminal_default --> ds_terminal_offline: API_OFFLINE_DETECTED
    ds_terminal_offline --> ds_terminal_loading: EVENT_RECONNECT_SYNC

    ds_portfolio --> ds_portfolio_loading: EVENT_ROUTE_ENTER
    ds_portfolio_loading --> ds_portfolio_default: API_SUCCESS
    ds_portfolio_loading --> ds_portfolio_empty: API_EMPTY
    ds_portfolio_empty --> ds_portfolio_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_portfolio_loading --> ds_portfolio_error: API_ERROR
    ds_portfolio_error --> ds_portfolio_loading: EVENT_RETRY_REQUEST
    ds_portfolio_loading --> ds_portfolio_forbidden: API_PERMISSION_DENIED
    ds_portfolio_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_portfolio_default --> ds_portfolio_offline: API_OFFLINE_DETECTED
    ds_portfolio_offline --> ds_portfolio_loading: EVENT_RECONNECT_SYNC

    ds_pi_planning --> ds_pi_planning_loading: EVENT_ROUTE_ENTER
    ds_pi_planning_loading --> ds_pi_planning_default: API_SUCCESS
    ds_pi_planning_loading --> ds_pi_planning_empty: API_EMPTY
    ds_pi_planning_empty --> ds_pi_planning_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_pi_planning_loading --> ds_pi_planning_error: API_ERROR
    ds_pi_planning_error --> ds_pi_planning_loading: EVENT_RETRY_REQUEST
    ds_pi_planning_loading --> ds_pi_planning_forbidden: API_PERMISSION_DENIED
    ds_pi_planning_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_pi_planning_default --> ds_pi_planning_offline: API_OFFLINE_DETECTED
    ds_pi_planning_offline --> ds_pi_planning_loading: EVENT_RECONNECT_SYNC

    ds_git_graph --> ds_git_graph_loading: EVENT_ROUTE_ENTER
    ds_git_graph_loading --> ds_git_graph_default: API_SUCCESS
    ds_git_graph_loading --> ds_git_graph_empty: API_EMPTY
    ds_git_graph_empty --> ds_git_graph_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_git_graph_loading --> ds_git_graph_error: API_ERROR
    ds_git_graph_error --> ds_git_graph_loading: EVENT_RETRY_REQUEST
    ds_git_graph_loading --> ds_git_graph_forbidden: API_PERMISSION_DENIED
    ds_git_graph_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_git_graph_default --> ds_git_graph_offline: API_OFFLINE_DETECTED
    ds_git_graph_offline --> ds_git_graph_loading: EVENT_RECONNECT_SYNC

    ds_kanban --> ds_kanban_loading: EVENT_ROUTE_ENTER
    ds_kanban_loading --> ds_kanban_default: API_SUCCESS
    ds_kanban_loading --> ds_kanban_empty: API_EMPTY
    ds_kanban_empty --> ds_kanban_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_kanban_loading --> ds_kanban_error: API_ERROR
    ds_kanban_error --> ds_kanban_loading: EVENT_RETRY_REQUEST
    ds_kanban_loading --> ds_kanban_forbidden: API_PERMISSION_DENIED
    ds_kanban_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_kanban_default --> ds_kanban_offline: API_OFFLINE_DETECTED
    ds_kanban_offline --> ds_kanban_loading: EVENT_RECONNECT_SYNC

    ds_knowledge_graph --> ds_knowledge_graph_loading: EVENT_ROUTE_ENTER
    ds_knowledge_graph_loading --> ds_knowledge_graph_default: API_SUCCESS
    ds_knowledge_graph_loading --> ds_knowledge_graph_empty: API_EMPTY
    ds_knowledge_graph_empty --> ds_knowledge_graph_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_knowledge_graph_loading --> ds_knowledge_graph_error: API_ERROR
    ds_knowledge_graph_error --> ds_knowledge_graph_loading: EVENT_RETRY_REQUEST
    ds_knowledge_graph_loading --> ds_knowledge_graph_forbidden: API_PERMISSION_DENIED
    ds_knowledge_graph_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_knowledge_graph_default --> ds_knowledge_graph_offline: API_OFFLINE_DETECTED
    ds_knowledge_graph_offline --> ds_knowledge_graph_loading: EVENT_RECONNECT_SYNC

    ds_approval --> ds_approval_loading: EVENT_ROUTE_ENTER
    ds_approval_loading --> ds_approval_default: API_SUCCESS
    ds_approval_loading --> ds_approval_empty: API_EMPTY
    ds_approval_empty --> ds_approval_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_approval_loading --> ds_approval_error: API_ERROR
    ds_approval_error --> ds_approval_loading: EVENT_RETRY_REQUEST
    ds_approval_loading --> ds_approval_forbidden: API_PERMISSION_DENIED
    ds_approval_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_approval_default --> ds_approval_offline: API_OFFLINE_DETECTED
    ds_approval_offline --> ds_approval_loading: EVENT_RECONNECT_SYNC
    ds_approval_default --> ds_approval_insufficient_evidence: API_EVIDENCE_INCOMPLETE
    ds_approval_insufficient_evidence --> ds_approval_loading: EVENT_REFRESH_EVIDENCE

    ds_timeline --> ds_timeline_loading: EVENT_ROUTE_ENTER
    ds_timeline_loading --> ds_timeline_default: API_SUCCESS
    ds_timeline_loading --> ds_timeline_empty: API_EMPTY
    ds_timeline_empty --> ds_timeline_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_timeline_loading --> ds_timeline_error: API_ERROR
    ds_timeline_error --> ds_timeline_loading: EVENT_RETRY_REQUEST
    ds_timeline_loading --> ds_timeline_forbidden: API_PERMISSION_DENIED
    ds_timeline_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_timeline_default --> ds_timeline_offline: API_OFFLINE_DETECTED
    ds_timeline_offline --> ds_timeline_loading: EVENT_RECONNECT_SYNC

    ds_components --> ds_components_loading: EVENT_ROUTE_ENTER
    ds_components_loading --> ds_components_default: API_SUCCESS
    ds_components_loading --> ds_components_empty: API_EMPTY
    ds_components_empty --> ds_components_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_components_loading --> ds_components_error: API_ERROR
    ds_components_error --> ds_components_loading: EVENT_RETRY_REQUEST

    ds_doc_viewer --> ds_doc_viewer_loading: EVENT_ROUTE_ENTER
    ds_doc_viewer_loading --> ds_doc_viewer_default: API_SUCCESS
    ds_doc_viewer_loading --> ds_doc_viewer_empty: API_EMPTY
    ds_doc_viewer_empty --> ds_doc_viewer_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_doc_viewer_loading --> ds_doc_viewer_error: API_ERROR
    ds_doc_viewer_error --> ds_doc_viewer_loading: EVENT_RETRY_REQUEST
    ds_doc_viewer_loading --> ds_doc_viewer_forbidden: API_PERMISSION_DENIED
    ds_doc_viewer_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_doc_viewer_default --> ds_doc_viewer_offline: API_OFFLINE_DETECTED
    ds_doc_viewer_offline --> ds_doc_viewer_loading: EVENT_RECONNECT_SYNC

    ds_explorer --> ds_explorer_loading: EVENT_ROUTE_ENTER
    ds_explorer_loading --> ds_explorer_default: API_SUCCESS
    ds_explorer_loading --> ds_explorer_empty: API_EMPTY
    ds_explorer_empty --> ds_explorer_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_explorer_loading --> ds_explorer_error: API_ERROR
    ds_explorer_error --> ds_explorer_loading: EVENT_RETRY_REQUEST
    ds_explorer_loading --> ds_explorer_forbidden: API_PERMISSION_DENIED
    ds_explorer_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_explorer_default --> ds_explorer_offline: API_OFFLINE_DETECTED
    ds_explorer_offline --> ds_explorer_loading: EVENT_RECONNECT_SYNC

    ds_beads_traversal --> ds_beads_traversal_loading: EVENT_ROUTE_ENTER
    ds_beads_traversal_loading --> ds_beads_traversal_default: API_SUCCESS
    ds_beads_traversal_loading --> ds_beads_traversal_empty: API_EMPTY
    ds_beads_traversal_empty --> ds_beads_traversal_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_beads_traversal_loading --> ds_beads_traversal_error: API_ERROR
    ds_beads_traversal_error --> ds_beads_traversal_loading: EVENT_RETRY_REQUEST
    ds_beads_traversal_loading --> ds_beads_traversal_forbidden: API_PERMISSION_DENIED
    ds_beads_traversal_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_beads_traversal_default --> ds_beads_traversal_offline: API_OFFLINE_DETECTED
    ds_beads_traversal_offline --> ds_beads_traversal_loading: EVENT_RECONNECT_SYNC

    ds_storyboard --> ds_storyboard_loading: EVENT_ROUTE_ENTER
    ds_storyboard_loading --> ds_storyboard_default: API_SUCCESS
    ds_storyboard_loading --> ds_storyboard_empty: API_EMPTY
    ds_storyboard_empty --> ds_storyboard_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_storyboard_loading --> ds_storyboard_error: API_ERROR
    ds_storyboard_error --> ds_storyboard_loading: EVENT_RETRY_REQUEST
    ds_storyboard_loading --> ds_storyboard_forbidden: API_PERMISSION_DENIED
    ds_storyboard_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_storyboard_default --> ds_storyboard_offline: API_OFFLINE_DETECTED
    ds_storyboard_offline --> ds_storyboard_loading: EVENT_RECONNECT_SYNC

    ds_storyboard_detail --> ds_storyboard_detail_loading: EVENT_ROUTE_ENTER
    ds_storyboard_detail_loading --> ds_storyboard_detail_default: API_SUCCESS
    ds_storyboard_detail_loading --> ds_storyboard_detail_empty: API_EMPTY
    ds_storyboard_detail_empty --> ds_storyboard_detail_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_storyboard_detail_loading --> ds_storyboard_detail_error: API_ERROR
    ds_storyboard_detail_error --> ds_storyboard_detail_loading: EVENT_RETRY_REQUEST
    ds_storyboard_detail_loading --> ds_storyboard_detail_forbidden: API_PERMISSION_DENIED
    ds_storyboard_detail_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_storyboard_detail_default --> ds_storyboard_detail_offline: API_OFFLINE_DETECTED
    ds_storyboard_detail_offline --> ds_storyboard_detail_loading: EVENT_RECONNECT_SYNC

    ds_webui_pm_workspace --> ds_webui_pm_workspace_loading: EVENT_ROUTE_ENTER
    ds_webui_pm_workspace_loading --> ds_webui_pm_workspace_default: API_SUCCESS
    ds_webui_pm_workspace_loading --> ds_webui_pm_workspace_empty: API_EMPTY
    ds_webui_pm_workspace_empty --> ds_webui_pm_workspace_loading: EVENT_CLEAR_FILTERS_OR_CREATE
    ds_webui_pm_workspace_loading --> ds_webui_pm_workspace_error: API_ERROR
    ds_webui_pm_workspace_error --> ds_webui_pm_workspace_loading: EVENT_RETRY_REQUEST
    ds_webui_pm_workspace_loading --> ds_webui_pm_workspace_forbidden: API_PERMISSION_DENIED
    ds_webui_pm_workspace_forbidden --> core_global_shell: EVENT_REQUEST_ACCESS_OR_BACK
    ds_webui_pm_workspace_default --> ds_webui_pm_workspace_offline: API_OFFLINE_DETECTED
    ds_webui_pm_workspace_offline --> ds_webui_pm_workspace_loading: EVENT_RECONNECT_SYNC

    core_global_shell_default --> core_search_results: EVENT_CORE_SHELL_SEARCH
    core_global_shell_default --> core_rtm_dashboard: EVENT_CORE_NAV_DASHBOARD
    core_global_shell_default --> core_safe_board: EVENT_CORE_NAV_BOARD
    core_global_shell_default --> core_task_list: EVENT_CORE_NAV_TASKS
    core_global_shell_default --> core_trace_explorer: EVENT_CORE_NAV_TRACE
    core_global_shell_default --> core_doc_viewer: EVENT_CORE_NAV_DOCS
    core_global_shell_default --> core_approval_gates: EVENT_CORE_NAV_APPROVAL
    core_rtm_dashboard_default --> core_trace_explorer: EVENT_CORE_DASHBOARD_OPEN_SECTION_TRACE
    core_safe_board_default --> core_safe_board_loading: EVENT_CORE_BOARD_DRAG_CARD
    core_safe_board_loading --> core_safe_board_default: API_TASK-STATUS_SUCCESS
    core_safe_board_loading --> core_safe_board_error: API_TASK-STATUS_ERROR
    core_task_list_default --> core_task_detail: EVENT_CORE_TASK_LIST_ROW_OPEN
    core_task_list_default --> core_task_list_processing: EVENT_CORE_TASK_LIST_BULK_ASSIGN
    core_task_list_processing --> core_task_list_default: API_TASKS-UPDATE_SUCCESS
    core_task_list_processing --> core_task_list_error: API_TASKS-UPDATE_ERROR
    core_task_detail_default --> core_task_detail_saving: EVENT_CORE_TASK_DETAIL_SAVE_FIELD
    core_task_detail_saving --> core_task_detail_default: API_TASKS-UPDATE_SUCCESS
    core_task_detail_saving --> core_task_detail_error: API_TASKS-UPDATE_ERROR
    core_trace_explorer_default --> core_trace_explorer_default: EVENT_CORE_TRACE_SELECT_NODE
    core_trace_explorer_default --> core_trace_explorer_default: EVENT_CORE_TRACE_OPEN_LINKED_ENTITY
    core_doc_viewer_default --> core_trace_explorer: EVENT_CORE_DOC_OPEN_BEADS_TRACE
    core_approval_gates_default --> core_approval_gates_loading: EVENT_CORE_APPROVAL_SUBMIT_DECISION
    core_approval_gates_loading --> core_approval_gates_default: API_APPROVAL-DECISION_SUCCESS
    core_approval_gates_loading --> core_approval_gates_error: API_APPROVAL-DECISION_ERROR
    core_search_results_default --> core_search_results_default: EVENT_CORE_SEARCH_OPEN_RESULT
    ds_pi_planning_default --> ds_pi_planning_loading: EVENT_PI_SAVE_PLAN
    ds_pi_planning_loading --> ds_pi_planning_default: API_PI-PLAN_SUCCESS
    ds_pi_planning_loading --> ds_pi_planning_error: API_PI-PLAN_ERROR
    ds_pi_planning_default --> ds_pi_planning_loading: EVENT_PI_SUBMIT_CONFIDENCE_VOTE
    ds_pi_planning_loading --> ds_pi_planning_default: API_PI-CONFIDENCE-VOTE_SUCCESS
    ds_pi_planning_loading --> ds_pi_planning_error: API_PI-CONFIDENCE-VOTE_ERROR
    ds_kanban_default --> ds_kanban_loading: EVENT_KANBAN_UPDATE_CARD_STATUS
    ds_kanban_loading --> ds_kanban_default: API_TASK-STATUS_SUCCESS
    ds_kanban_loading --> ds_kanban_error: API_TASK-STATUS_ERROR
    ds_components_default --> ds_components_default: EVENT_COMPONENTS_HASH_SCROLL
    ds_doc_viewer_default --> ds_explorer: EVENT_DOC_VIEWER_OPEN_EXPLORER
    ds_doc_viewer_default --> ds_knowledge_graph: EVENT_DOC_VIEWER_OPEN_KNOWLEDGE_GRAPH
    ds_doc_viewer_default --> core_trace_explorer: EVENT_DOC_VIEWER_OPEN_CORE_TRACE
    ds_storyboard_default --> ds_storyboard_default: EVENT_STORYBOARD_OPEN_REAL_SCREEN
```
