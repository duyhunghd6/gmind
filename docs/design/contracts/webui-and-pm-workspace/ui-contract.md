# UI Contract: webui-and-pm-workspace
<!-- beads-id: br-ds-webui-pm-contract -->

## Feature Summary

Stage 1 low-fi contract for PRD-04 Web UI & PM Workspace. The canonical showcase entry is `/webui-pm-workspace`, exposed from the Website header as top-level **PM Space** beside **Design System**. Core WebUI routes are served by `gmind serve` under the PM shell and map to the PRD §8 route family: dashboard, board, task list/detail, trace, docs, approval, search, evidence, planning, storyboard, and shared component catalog surfaces. This file intentionally keeps low-fi layout in the schema-driven YAML View Blueprint rather than standalone ASCII wireframes.

## YAML View Blueprint

```yaml
metadata:
  feature: webui-and-pm-workspace
  contract_stage: ralph-loop-stage-1
  canonical_contract: docs/design/contracts/webui-and-pm-workspace/ui-contract.md
  canonical_showcase_entry: /webui-pm-workspace
  legacy_alias_policy: /design-system/webui-pm-workspace may redirect but must not be advertised
  source_prd:
    path: docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md
    sections:
      - id: br-prd04
        title: PRD 04 Web UI and PM Workspace
      - id: br-prd04-s2
        title: Presentation Layer
      - id: br-prd04-s3
        title: SAFe and Board Views
      - id: br-prd04-s4
        title: Level 3 Approval Gates
      - id: br-prd04-s5
        title: Document Graph Widget
      - id: br-prd04-s6
        title: RTM Dashboard
      - id: br-prd04-s8
        title: Navigation and Route Map
      - id: br-prd04-s9
        title: Document Viewer
      - id: br-prd04-s10
        title: Beads Trace Explorer
      - id: br-prd04-s11
        title: Task Detail View
      - id: br-prd04-s12
        title: Search and Filter
      - id: br-prd04-s13
        title: Task List View
      - id: br-prd04-s14
        title: Terminal Console
      - id: br-prd04-s15
        title: Timeline and File Leases
      - id: br-prd04-s16
        title: Git Graph Explorer
      - id: br-prd04-s17
        title: Storyboard Journey
      - id: br-prd04-s18
        title: Acceptance Criteria
  satisfies:
    - br-prd04
    - br-prd04-s2
    - br-prd04-s3
    - br-prd04-s4
    - br-prd04-s5
    - br-prd04-s6
    - br-prd04-s8
    - br-prd04-s9
    - br-prd04-s10
    - br-prd04-s11
    - br-prd04-s12
    - br-prd04-s13
    - br-prd04-s14
    - br-prd04-s15
    - br-prd04-s16
    - br-prd04-s17
    - br-prd04-s18
  stakeholders:
    - PMO reviewer
    - RTE approver
    - Human manager
    - Feature team agent
    - QA reviewer
  system_boundaries:
    browser_must_use:
      - Go REST API from gmind serve
      - client-side routing within embedded SPA
      - cached read-only data while offline
    browser_must_not_call:
      - FrankenSQLite directly
      - Zvec directly
      - local git directly
      - GitHub gh directly
      - FastCode directly
      - shell commands directly
  global_state_names:
    - default
    - loading
    - empty
    - error
    - offline
    - forbidden
    - partial
    - saving
    - not_found

viewports:
  - name: Desktop
    width: 1440
    constraints:
      shell: header plus expanded PM nav plus two-column or grid content
      graph_detail: side panel fixed at right
  - name: Tablet
    width: 1024
    constraints:
      shell: compact PM nav with labels available by tooltip or disclosure
      detail_panels: side panels may become bottom sheets
  - name: Mobile
    width: 390
    constraints:
      shell: PM nav hidden behind header menu
      data_dense_views: tables become cards or accordions
      graph_detail: full-screen detail overlay after node selection

navigation:
  top_level_header:
    type: website_header
    ds_id: ds:webui.header.top-level
    labels:
      brand: Gmind
      design_system: Design System
      pm_space: PM Space
    active_rule: PM Space is active at /webui-pm-workspace and all PM route surfaces
    actions:
      - id: action-header-open-design-system
        label: Open Design System
        target_route: /design-system
      - id: action-header-open-pm-space
        label: Open PM Space
        target_route: /webui-pm-workspace
  core_routes:
    - route: /
      screen_id: rtm-dashboard
    - route: /board
      screen_id: safe-board
    - route: /tasks
      screen_id: task-list
    - route: /tasks/:id
      screen_id: task-detail
    - route: /trace/:id
      screen_id: trace-explorer
    - route: /docs
      screen_id: document-viewer
    - route: /docs/:id
      screen_id: document-viewer
    - route: /approval
      screen_id: approval-gates
    - route: /search
      screen_id: search-results
  evidence_planning_shared_routes:
    - route: /terminal
      screen_id: terminal-console
    - route: /timeline
      screen_id: timeline-file-leases
    - route: /git-graph
      screen_id: git-graph-explorer
    - route: /knowledge-graph
      screen_id: knowledge-graph
    - route: /portfolio
      screen_id: portfolio-view
    - route: /pi-planning
      screen_id: pi-planning
    - route: /storyboards
      screen_id: storyboards-overview
    - route: /storyboards/:id
      screen_id: storyboard-detail
    - route: /components
      screen_id: components-catalog

action_catalog:
- event: EVENT_BACK_TO_SAFE_ROUTE
  classification: recovery
  screen: machine
  surface: system-or-boundary-state
  rationale: Permission-denied recovery sends the user to a safe readable route without a dedicated component action on the
    blocked surface.
- event: EVENT_RETRY_SYNC_OK
  classification: interactive
  action_id: action-shell-retry-sync
  screen: global-shell
  surface: ds:webui.shell.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_RETRY_SYNC_ERROR
  classification: interactive
  action_id: action-shell-retry-sync
  screen: global-shell
  surface: ds:webui.shell.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_FOCUS_GLOBAL_SEARCH
  classification: interactive
  action_id: action-shell-open-search
  screen: global-shell
  surface: ds:webui.shell.root
  target_route: /search
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TOGGLE_PM_NAV
  classification: interactive
  action_id: action-shell-toggle-nav
  screen: global-shell
  surface: ds:webui.shell.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_OPEN_PM_SPACE
  classification: interactive
  action_id: action-header-open-pm-space
  screen: global
  surface: ds:webui.header.top-level
  target_route: /webui-pm-workspace
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_OPEN_DESIGN_SYSTEM
  classification: interactive
  action_id: action-header-open-design-system
  screen: global
  surface: ds:webui.header.top-level
  target_route: /design-system
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_CLEAR_FILTER_OR_GUIDE
  classification: recovery
  screen: machine
  surface: system-or-boundary-state
  rationale: Empty-state recovery clears transient filters or follows the inline guide CTA; the exact control is state-generated
    rather than a persistent screen action.
- event: EVENT_RETRY_LOAD
  classification: recovery
  screen: machine
  surface: system-or-boundary-state
  rationale: Error-state retry repeats the failed GET request from the boundary error banner; it is generated for every loadable
    screen state.
- event: EVENT_BACK_TO_LIST
  classification: navigation
  screen: machine
  surface: system-or-boundary-state
  rationale: Not-found recovery returns to the owning list when the requested detail resource no longer exists.
- event: EVENT_REFRESH_EVIDENCE
  classification: interactive
  action_id: action-approval-refresh-evidence
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_OPEN_DECISION_TASK
  classification: navigation
  screen: machine
  surface: system-or-boundary-state
  rationale: Audit receipt navigation opens the task referenced by the posted approval decision without a separate reusable
    component action.
- event: EVENT_SHELL_OPEN_SEARCH
  classification: interactive
  action_id: action-shell-open-search
  screen: global-shell
  surface: ds:webui.shell.root
  target_route: /search
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SHELL_TOGGLE_NAV
  classification: interactive
  action_id: action-shell-toggle-nav
  screen: global-shell
  surface: ds:webui.shell.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SHELL_RETRY_SYNC
  classification: interactive
  action_id: action-shell-retry-sync
  screen: global-shell
  surface: ds:webui.shell.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SHELL_HEADER_PM_SPACE
  classification: interactive
  action_id: action-shell-header-pm-space
  screen: global-shell
  surface: ds:webui.shell.header
  target_route: /webui-pm-workspace
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SHELL_SUBMIT_SEARCH
  classification: interactive
  action_id: action-shell-submit-search
  screen: global-shell
  surface: ds:webui.shell.global-search
  target_route: /search?q=<query>
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_RTM_OPEN_TRACE
  classification: interactive
  action_id: action-rtm-open-trace
  screen: rtm-dashboard
  surface: ds:webui.rtm.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_RTM_FILTER_TASKS
  classification: interactive
  action_id: action-rtm-filter-tasks
  screen: rtm-dashboard
  surface: ds:webui.rtm.root
  target_route: /tasks?status=<status>
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_RTM_OPEN_DOC
  classification: interactive
  action_id: action-rtm-open-doc
  screen: rtm-dashboard
  surface: ds:webui.rtm.root
  target_route: /docs/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_RTM_CREATE_GAP_PLAN
  classification: interactive
  action_id: action-rtm-create-gap-plan
  screen: rtm-dashboard
  surface: ds:webui.rtm.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_BOARD_SELECT_BOARD
  classification: interactive
  action_id: action-board-select-board
  screen: safe-board
  surface: ds:webui.board.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_BOARD_DRAG_CARD
  classification: interactive
  action_id: action-board-drag-card
  screen: safe-board
  surface: ds:webui.board.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_BOARD_OPEN_TASK
  classification: interactive
  action_id: action-board-open-task
  screen: safe-board
  surface: ds:webui.board.root
  target_route: /tasks/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_TOGGLE_BOARD
  classification: interactive
  action_id: action-tasks-toggle-board
  screen: task-list
  surface: ds:webui.tasks.root
  target_route: /board
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_FILTER
  classification: interactive
  action_id: action-tasks-filter
  screen: task-list
  surface: ds:webui.tasks.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_SORT
  classification: interactive
  action_id: action-tasks-sort
  screen: task-list
  surface: ds:webui.tasks.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_OPEN_DETAIL
  classification: interactive
  action_id: action-tasks-open-detail
  screen: task-list
  surface: ds:webui.tasks.root
  target_route: /tasks/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_OPEN_TRACE
  classification: interactive
  action_id: action-tasks-open-trace
  screen: task-list
  surface: ds:webui.tasks.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_BULK_ASSIGN
  classification: interactive
  action_id: action-tasks-bulk-assign
  screen: task-list
  surface: ds:webui.tasks.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_BULK_STATUS
  classification: interactive
  action_id: action-tasks-bulk-status
  screen: task-list
  surface: ds:webui.tasks.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASKS_EXPORT_CSV
  classification: interactive
  action_id: action-tasks-export-csv
  screen: task-list
  surface: ds:webui.tasks.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASK_BACK_TO_LIST
  classification: interactive
  action_id: action-task-back-to-list
  screen: task-detail
  surface: ds:webui.task-detail.root
  target_route: /tasks
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASK_SAVE_STATUS
  classification: interactive
  action_id: action-task-save-status
  screen: task-detail
  surface: ds:webui.task-detail.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASK_SAVE_ASSIGNEE
  classification: interactive
  action_id: action-task-save-assignee
  screen: task-detail
  surface: ds:webui.task-detail.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASK_OPEN_APPROVAL
  classification: interactive
  action_id: action-task-open-approval
  screen: task-detail
  surface: ds:webui.task-detail.root
  target_route: /tasks/:id#approval
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TASK_OPEN_TRACE
  classification: interactive
  action_id: action-task-open-trace
  screen: task-detail
  surface: ds:webui.task-detail.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_CHANGE_ROOT
  classification: interactive
  action_id: action-trace-change-root
  screen: trace-explorer
  surface: ds:webui.trace.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_TOGGLE_DIRECTION
  classification: interactive
  action_id: action-trace-toggle-direction
  screen: trace-explorer
  surface: ds:webui.trace.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_SELECT_NODE
  classification: interactive
  action_id: action-trace-select-node
  screen: trace-explorer
  surface: ds:webui.trace.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_OPEN_DOC
  classification: interactive
  action_id: action-trace-open-doc
  screen: trace-explorer
  surface: ds:webui.trace.root
  target_route: /docs/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_OPEN_TASK
  classification: interactive
  action_id: action-trace-open-task
  screen: trace-explorer
  surface: ds:webui.trace.root
  target_route: /tasks/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TRACE_OPEN_GIT_GRAPH
  classification: interactive
  action_id: action-trace-open-git-graph
  screen: trace-explorer
  surface: ds:webui.trace.root
  target_route: /git-graph
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_DOCS_SELECT_DOCUMENT
  classification: interactive
  action_id: action-docs-select-document
  screen: document-viewer
  surface: ds:webui.docs.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_DOCS_OPEN_TRACE
  classification: interactive
  action_id: action-docs-open-trace
  screen: document-viewer
  surface: ds:webui.docs.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_DOCS_OPEN_SEARCH
  classification: interactive
  action_id: action-docs-open-search
  screen: document-viewer
  surface: ds:webui.docs.root
  target_route: /search#doc
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_DOCS_OPEN_KNOWLEDGE_GRAPH
  classification: interactive
  action_id: action-docs-open-knowledge-graph
  screen: document-viewer
  surface: ds:webui.docs.root
  target_route: /knowledge-graph
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_SELECT_TASK
  classification: interactive
  action_id: action-approval-select-task
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_REFRESH_EVIDENCE
  classification: interactive
  action_id: action-approval-refresh-evidence
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_APPROVE
  classification: interactive
  action_id: action-approval-approve
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_REJECT
  classification: interactive
  action_id: action-approval-reject
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_REQUEST_CHANGES
  classification: interactive
  action_id: action-approval-request-changes
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_APPROVAL_OPEN_TRACE
  classification: interactive
  action_id: action-approval-open-trace
  screen: approval-gates
  surface: ds:webui.approval.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SEARCH_SUBMIT_QUERY
  classification: interactive
  action_id: action-search-submit-query
  screen: search-results
  surface: ds:webui.search.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SEARCH_SELECT_FILTER
  classification: interactive
  action_id: action-search-select-filter
  screen: search-results
  surface: ds:webui.search.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SEARCH_OPEN_RESULT_TASK
  classification: interactive
  action_id: action-search-open-result-task
  screen: search-results
  surface: ds:webui.search.root
  target_route: /tasks/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SEARCH_OPEN_RESULT_DOC
  classification: interactive
  action_id: action-search-open-result-doc
  screen: search-results
  surface: ds:webui.search.root
  target_route: /docs/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_SEARCH_OPEN_RESULT_TRACE
  classification: interactive
  action_id: action-search-open-result-trace
  screen: search-results
  surface: ds:webui.search.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TERMINAL_SELECT_TAB
  classification: interactive
  action_id: action-terminal-select-tab
  screen: terminal-console
  surface: ds:webui.terminal.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TERMINAL_REFRESH_STREAM
  classification: interactive
  action_id: action-terminal-refresh-stream
  screen: terminal-console
  surface: ds:webui.terminal.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TIMELINE_SELECT_ANCHOR
  classification: interactive
  action_id: action-timeline-select-anchor
  screen: timeline-file-leases
  surface: ds:webui.timeline.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_TIMELINE_REFRESH
  classification: interactive
  action_id: action-timeline-refresh
  screen: timeline-file-leases
  surface: ds:webui.timeline.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_GIT_GRAPH_SELECT_SCENARIO
  classification: interactive
  action_id: action-git-graph-select-scenario
  screen: git-graph-explorer
  surface: ds:webui.git-graph.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_GIT_GRAPH_SELECT_COMMIT
  classification: interactive
  action_id: action-git-graph-select-commit
  screen: git-graph-explorer
  surface: ds:webui.git-graph.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_GIT_GRAPH_OPEN_TRACE
  classification: interactive
  action_id: action-git-graph-open-trace
  screen: git-graph-explorer
  surface: ds:webui.git-graph.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_KNOWLEDGE_SELECT_PRESET
  classification: interactive
  action_id: action-knowledge-select-preset
  screen: knowledge-graph
  surface: ds:webui.knowledge-graph.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_KNOWLEDGE_SELECT_NODE
  classification: interactive
  action_id: action-knowledge-select-node
  screen: knowledge-graph
  surface: ds:webui.knowledge-graph.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_KNOWLEDGE_OPEN_TRACE
  classification: interactive
  action_id: action-knowledge-open-trace
  screen: knowledge-graph
  surface: ds:webui.knowledge-graph.root
  target_route: /trace/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PORTFOLIO_OPEN_EPIC_TASKS
  classification: interactive
  action_id: action-portfolio-open-epic-tasks
  screen: portfolio-view
  surface: ds:webui.portfolio.root
  target_route: /tasks?epic=:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PORTFOLIO_OPEN_BUDGET_TRACE
  classification: interactive
  action_id: action-portfolio-open-budget-trace
  screen: portfolio-view
  surface: ds:webui.portfolio.root
  target_route: /trace/:epic-id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PI_DRAG_FEATURE
  classification: interactive
  action_id: action-pi-drag-feature
  screen: pi-planning
  surface: ds:webui.pi-planning.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PI_SCORE_BUSINESS_VALUE
  classification: interactive
  action_id: action-pi-score-business-value
  screen: pi-planning
  surface: ds:webui.pi-planning.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PI_SUBMIT_CONFIDENCE_VOTE
  classification: interactive
  action_id: action-pi-submit-confidence-vote
  screen: pi-planning
  surface: ds:webui.pi-planning.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_PI_OPEN_ROAM
  classification: interactive
  action_id: action-pi-open-roam
  screen: pi-planning
  surface: ds:webui.pi-planning.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_STORYBOARDS_FILTER_JOURNEY
  classification: interactive
  action_id: action-storyboards-filter-journey
  screen: storyboards-overview
  surface: ds:webui.storyboards.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_STORYBOARDS_OPEN_DETAIL
  classification: interactive
  action_id: action-storyboards-open-detail
  screen: storyboards-overview
  surface: ds:webui.storyboards.root
  target_route: /storyboards/:id
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_STORYBOARDS_OPEN_SCREEN
  classification: interactive
  action_id: action-storyboards-open-screen
  screen: storyboards-overview
  surface: ds:webui.storyboards.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_STORYBOARD_DETAIL_OPEN_SCREEN
  classification: interactive
  action_id: action-storyboard-detail-open-screen
  screen: storyboard-detail
  surface: ds:webui.storyboard-detail.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_STORYBOARD_DETAIL_BACK
  classification: interactive
  action_id: action-storyboard-detail-back
  screen: storyboard-detail
  surface: ds:webui.storyboard-detail.root
  target_route: /storyboards
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_COMPONENTS_SCROLL_SECTION
  classification: interactive
  action_id: action-components-scroll-section
  screen: components-catalog
  surface: ds:webui.components.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_COMPONENTS_TOGGLE_EXAMPLE
  classification: interactive
  action_id: action-components-toggle-example
  screen: components-catalog
  surface: ds:webui.components.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_HEADER_OPEN_DESIGN_SYSTEM
  classification: interactive
  action_id: action-header-open-design-system
  screen: global
  surface: ds:webui.header.top-level
  target_route: /design-system
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_HEADER_OPEN_PM_SPACE
  classification: interactive
  action_id: action-header-open-pm-space
  screen: global
  surface: ds:webui.header.top-level
  target_route: /webui-pm-workspace
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_BACK_TO_TASK_LIST
  classification: interactive
  action_id: action-task-back-to-list
  screen: task-detail
  surface: ds:webui.task-detail.root
  target_route: /tasks
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_BACK_TO_STORYBOARDS
  classification: interactive
  action_id: action-storyboard-detail-back
  screen: storyboard-detail
  surface: ds:webui.storyboard-detail.root
  target_route: /storyboards
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_REJECT_WITH_REASON
  classification: interactive
  action_id: action-approval-reject
  screen: approval-gates
  surface: ds:webui.approval.root
  rationale: Interactive user action declared in the YAML screen action list and referenced by the Mermaid transition.
- event: EVENT_KEEP_MINE_OR_USE_SERVER
  classification: recovery
  screen: machine
  surface: system-or-boundary-state
  rationale: Sync conflict resolution chooses either the local or server payload and is emitted by the conflict resolver,
    not by a normal screen component.
- event: EVENT_CANCEL_CONFLICT_RESOLUTION
  classification: recovery
  screen: machine
  surface: system-or-boundary-state
  rationale: Sync conflict recovery cancels resolver choices and returns to offline read-only shell state.
- event: EVENT_BROWSER_BACK
  classification: system
  screen: machine
  surface: system-or-boundary-state
  rationale: Browser history navigation returns from the external Design System page to the PM shell.
- event: EVENT_ROUTE_NORMALIZED
  classification: system
  screen: machine
  surface: system-or-boundary-state
  rationale: Router guard normalizes external or legacy paths back into the canonical PM shell.
- event: EVENT_EXIT_PM_SPACE
  classification: navigation
  screen: machine
  surface: system-or-boundary-state
  rationale: Top-level PM Space exit closes the embedded PM workflow and leaves the state machine.

screens:
  - id: global-shell
    route: /webui-pm-workspace
    alternate_core_route: '*'
    satisfies:
      - br-prd04-s8
    states:
      - default
      - loading
      - offline
      - forbidden
    layout:
      type: shell
      ds_id: ds:webui.shell.root
      labels:
        title: PM Workspace Shell
        purpose: Persistent header, global search, route nav, status, and footer for all PM screens
      bindings:
        route_state: active core route or hash surface
        sync_status: API health and offline queue state
        user_role: permission policy from Go REST API
      actions:
        - id: action-shell-open-search
          label: Focus global search
          shortcut: Ctrl+K
          target_route: /search
        - id: action-shell-toggle-nav
          label: Toggle PM navigation
        - id: action-shell-retry-sync
          label: Retry sync
      responsive:
        Desktop: expanded 240px PM nav
        Tablet: compact icon nav
        Mobile: header menu opens full-screen PM nav
      boundary_content:
        loading: Layout-matched shell skeleton with nav placeholders
        offline: Read-only banner with queued write count and retry sync action
        forbidden: Permission banner with route-safe back action
      children:
        - type: header
          ds_id: ds:webui.shell.header
          labels:
            title: Website header
            active_item: PM Space
          actions:
            - id: action-shell-header-pm-space
              label: Open /webui-pm-workspace
              target_route: /webui-pm-workspace
        - type: search_combobox
          ds_id: ds:webui.shell.global-search
          labels:
            placeholder: Tìm tasks, tài liệu, commits, code... (Ctrl+K)
          bindings:
            suggestions: GET /api/search?q=<query>&type=all&limit=5
          actions:
            - id: action-shell-submit-search
              label: Search
              target_route: /search?q=<query>
        - type: nav
          ds_id: ds:webui.shell.pm-nav
          labels:
            items: Dashboard, Board, Tasks, Trace, Docs, Approval, Search, Terminal, Timeline, Git Graph, Knowledge Graph, Portfolio, PI Planning, Storyboards, Components
          bindings:
            active_route: client route path and hash
        - type: main_region
          ds_id: ds:webui.shell.main-region
          bindings:
            content: active screen layout
        - type: footer
          ds_id: ds:webui.shell.footer
          labels:
            text: gmind version, FrankenSQLite sync status, API uptime

  - id: rtm-dashboard
    route: /
    showcase_anchor: /webui-pm-workspace#surface-rtm-dashboard
    data_screen_id: rtm-dashboard
    satisfies:
      - br-prd04-s6
    states:
      - default
      - loading
      - empty
      - error
      - offline
    layout:
      type: dashboard_grid
      ds_id: ds:webui.rtm.root
      labels:
        title: RTM Dashboard
        structure: KPI row above four review panels
      bindings:
        coverage: GET /api/coverage
        gaps: GET /api/gaps
        tasks: GET /api/tasks
        trace: GET /api/trace/:id?depth=full
      actions:
        - id: action-rtm-open-trace
          label: Open section trace
          target_route: /trace/:id
        - id: action-rtm-filter-tasks
          label: Filter tasks by status
          target_route: /tasks?status=<status>
        - id: action-rtm-open-doc
          label: Open linked document
          target_route: /docs/:id
        - id: action-rtm-create-gap-plan
          label: Create plan for gap
      responsive:
        Desktop: 2 by 2 panel grid below KPI cards
        Tablet: two stacked rows or one panel per row as space requires
        Mobile: single-column panels with graph touch pan and zoom
      boundary_content:
        loading: Skeleton KPI cards and panel skeletons
        empty: Chưa có dữ liệu theo dõi with guide CTA
        error: Không thể kết nối đến gmind serve with retry action
      children:
        - type: kpi_row
          ds_id: ds:webui.rtm.kpi-row
          labels:
            cards: Coverage percent, Tasks done, Gaps found
        - type: heatmap_panel
          ds_id: ds:webui.rtm.coverage-heatmap
          labels:
            title: Panel 1 Coverage Heatmap
        - type: progress_panel
          ds_id: ds:webui.rtm.task-progress
          labels:
            title: Panel 2 Task Progress
        - type: graph_widget
          ds_id: ds:webui.rtm.knowledge-graph-widget
          labels:
            title: Panel 3 Knowledge Graph
        - type: gap_panel
          ds_id: ds:webui.rtm.gap-analysis
          labels:
            title: Panel 4 Gap Analysis

  - id: safe-board
    route: /board
    data_screen_id: safe-board
    ds_ref: ds:screen:kanban-001
    satisfies:
      - br-prd04-s3
      - br-prd04-s8
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: kanban_board
      ds_id: ds:webui.board.root
      labels:
        title: SAFe Board
        hash_routes: '#sprint, #release, #bug-triage'
      bindings:
        board_data: GET /api/tasks?view=board&board=<hash-board>
        update_status: PUT /api/tasks/:id/status
      actions:
        - id: action-board-select-board
          label: Select board hash route
        - id: action-board-drag-card
          label: Move task card across status columns
        - id: action-board-open-task
          label: Open task detail
          target_route: /tasks/:id
      responsive:
        Desktop: horizontal columns with WIP badges and stats strip
        Tablet: horizontal scroll columns
        Mobile: vertical task card list instead of full kanban
      boundary_content:
        loading: Skeleton task cards inside each column
        empty: Chưa có task trong board này with clear filter CTA
        error: Không thể tải dữ liệu Board with retry action
        offline: Drag and drop disabled, cached cards remain readable
      children:
        - type: segmented_control
          ds_id: ds:webui.board.selector
          labels:
            options: Sprint, Release, Bug Triage
        - type: stats_strip
          ds_id: ds:webui.board.stats-strip
          labels:
            metrics: total, done, progress, blocked
        - type: kanban_columns
          ds_id: ds:webui.board.columns
          labels:
            columns: Todo, In Progress, Review, Done

  - id: task-list
    route: /tasks
    data_screen_id: task-list
    satisfies:
      - br-prd04-s13
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - saving
    layout:
      type: data_table
      ds_id: ds:webui.tasks.root
      labels:
        title: Task List
        columns: id, title, status, priority, assignee, qa
      bindings:
        tasks: GET /api/tasks?format=list
        bulk_update: PUT /api/tasks/bulk
      actions:
        - id: action-tasks-toggle-board
          label: Switch to board view
          target_route: /board
        - id: action-tasks-filter
          label: Apply status assignee priority PRD QA filters
        - id: action-tasks-sort
          label: Sort table column
        - id: action-tasks-open-detail
          label: Open row detail
          target_route: /tasks/:id
        - id: action-tasks-open-trace
          label: Open beads trace
          target_route: /trace/:id
        - id: action-tasks-bulk-assign
          label: Bulk assign selected tasks
        - id: action-tasks-bulk-status
          label: Bulk change selected task status
        - id: action-tasks-export-csv
          label: Export current filtered CSV
      responsive:
        Desktop: full table with bulk action bar
        Tablet: hide QA and PRD columns into expandable row detail
        Mobile: task cards with tap-to-expand details
      boundary_content:
        loading: Ten skeleton rows
        empty: Không tìm thấy task phù hợp filter with clear filters CTA
        error: Không thể tải danh sách task từ FrankenSQLite with retry action
        saving: Bulk action bar disabled with row-level pending markers
      children:
        - type: view_toggle
          ds_id: ds:webui.tasks.view-toggle
          labels:
            options: Board, List
        - type: filter_bar
          ds_id: ds:webui.tasks.filter-bar
        - type: table
          ds_id: ds:webui.tasks.table
        - type: bulk_action_bar
          ds_id: ds:webui.tasks.bulk-actions

  - id: task-detail
    route: /tasks/:id
    data_screen_id: task-detail
    satisfies:
      - br-prd04-s11
      - br-prd04-s7
    states:
      - default
      - loading
      - error
      - offline
      - saving
      - not_found
    layout:
      type: detail_page
      ds_id: ds:webui.task-detail.root
      labels:
        title: Task Detail
        tabs: detail, activity, graph, code, approval
      bindings:
        task: GET /api/tasks/:id
        activity: GET /api/tasks/:id/activity
        trace: GET /api/trace/:id?depth=2
        save_field: PUT /api/tasks/:id
      actions:
        - id: action-task-back-to-list
          label: Back to task list
          target_route: /tasks
        - id: action-task-save-status
          label: Save status field
        - id: action-task-save-assignee
          label: Save assignee field
        - id: action-task-open-approval
          label: Open approval tab
          target_route: /tasks/:id#approval
        - id: action-task-open-trace
          label: Open full trace
          target_route: /trace/:id
      responsive:
        Desktop: task summary header above tab panel
        Tablet: horizontally scrollable tabs
        Mobile: field groups stack and tabs become accordion sections
      boundary_content:
        loading: Header field skeleton and tab content skeleton
        not_found: Task không tồn tại hoặc đã bị xóa with link back to Tasks
        offline: Read-only fields and queued edit messaging
        saving: Inline saving marker beside edited field
      children:
        - type: summary_header
          ds_id: ds:webui.task-detail.summary-header
        - type: tab_list
          ds_id: ds:webui.task-detail.tabs
        - type: activity_timeline
          ds_id: ds:webui.task-detail.activity
        - type: graph_widget
          ds_id: ds:webui.task-detail.graph-widget
        - type: approval_embed
          ds_id: ds:webui.task-detail.approval-embed

  - id: trace-explorer
    route: /trace/:id
    data_screen_id: trace-explorer
    ds_ref: ds:screen:beads-traversal-001
    satisfies:
      - br-prd04-s10
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - partial
      - forbidden
    layout:
      type: graph_explorer
      ds_id: ds:webui.trace.root
      labels:
        title: Beads Trace Explorer
        modes: graph, dag
      bindings:
        trace: GET /api/trace/:id?depth=full
        git_enrichment: GET /api/trace/:id?include=git
      actions:
        - id: action-trace-change-root
          label: Change root Beads ID
        - id: action-trace-toggle-direction
          label: Toggle forward reverse direction
        - id: action-trace-select-node
          label: Select graph node
        - id: action-trace-open-doc
          label: Open document
          target_route: /docs/:id
        - id: action-trace-open-task
          label: Open task
          target_route: /tasks/:id
        - id: action-trace-open-git-graph
          label: Open Git graph scenario
          target_route: /git-graph
      responsive:
        Desktop: graph canvas 70 percent and detail panel 30 percent
        Tablet: detail panel as bottom sheet
        Mobile: simplified tree view with full-screen node detail overlay
      boundary_content:
        loading: Graph canvas and detail panel skeletons with API progress text
        empty: Không tìm thấy liên kết nào cho Beads ID này with ID check hint
        error: Lỗi truy vấn graph từ gmind trace with retry action
        partial: Local graph visible with enrichment still loading badge
      children:
        - type: trace_toolbar
          ds_id: ds:webui.trace.toolbar
        - type: graph_canvas
          ds_id: ds:webui.trace.canvas
        - type: node_detail_panel
          ds_id: ds:webui.trace.detail-panel
        - type: legend_stats
          ds_id: ds:webui.trace.legend-stats

  - id: document-viewer
    route: /docs
    route_variants:
      - /docs/:id
    data_screen_id: document-viewer
    ds_ref: ds:screen:doc-viewer-001
    satisfies:
      - br-prd04-s9
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: document_viewer
      ds_id: ds:webui.docs.root
      labels:
        title: Document Viewer
      bindings:
        doc_tree: GET /api/docs?group=source_type
        document: GET /api/docs/:id
        coverage: GET /api/coverage?doc=<id>
      actions:
        - id: action-docs-select-document
          label: Select document from tree
        - id: action-docs-open-trace
          label: Open Beads trace
          target_route: /trace/:id
        - id: action-docs-open-search
          label: Search in Explorer
          target_route: /search#doc
        - id: action-docs-open-knowledge-graph
          label: Open Knowledge Graph
          target_route: /knowledge-graph
      responsive:
        Desktop: document tree 280px and content panel
        Tablet: document tree becomes top selector
        Mobile: content-first with back-to-list control
      boundary_content:
        loading: Skeleton doc tree and content panel
        empty: Chưa có tài liệu nào được index with run reindex CTA
        error: Không thể tải tài liệu từ Zvec with retry action
      children:
        - type: doc_tree
          ds_id: ds:webui.docs.tree
        - type: rendered_document
          ds_id: ds:webui.docs.content
        - type: section_badges
          ds_id: ds:webui.docs.section-badges

  - id: approval-gates
    route: /approval
    route_variants:
      - /tasks/:id#approval
    data_screen_id: approval-gates
    ds_ref: ds:screen:approval-001
    satisfies:
      - br-prd04-s4
      - br-prd04-s7
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - insufficient_evidence
      - decision_submitted
    layout:
      type: approval_workspace
      ds_id: ds:webui.approval.root
      labels:
        title: Level 3 Approval Gates
        anchors: '#panels, #rtm, #heatmap'
      bindings:
        queue: GET /api/tasks?status=pending-approval
        evidence: GET /api/approval/:id/evidence
        coverage: GET /api/coverage
        decision: POST /api/approval/:id/decision
      actions:
        - id: action-approval-select-task
          label: Select approval task
        - id: action-approval-refresh-evidence
          label: Refresh evidence
        - id: action-approval-approve
          label: Approve with valid evidence
        - id: action-approval-reject
          label: Reject with reason
        - id: action-approval-request-changes
          label: Request changes
        - id: action-approval-open-trace
          label: Open RTM lineage
          target_route: /trace/:id
      responsive:
        Desktop: queue, evidence, and decision columns
        Tablet: stacked evidence and decision with sticky decision bar
        Mobile: single-column review with bottom decision controls
      boundary_content:
        loading: Evidence aggregation skeletons
        empty: Không có yêu cầu phê duyệt nào đang chờ with history toggles
        insufficient_evidence: Approve disabled with missing evidence reason and refresh CTA
        decision_submitted: Audit receipt with decision ID actor timestamp and task link
        error: CI or GitHub evidence connection failure with retry and admin override policy
      children:
        - type: queue_panel
          ds_id: ds:webui.approval.queue
        - type: evidence_hub
          ds_id: ds:webui.approval.evidence-hub
        - type: rtm_matrix
          ds_id: ds:webui.approval.rtm-matrix
        - type: heatmap_panel
          ds_id: ds:webui.approval.coverage-heatmap
        - type: decision_box
          ds_id: ds:webui.approval.decision-box

  - id: search-results
    route: /search
    data_screen_id: search-results
    ds_ref: ds:screen:explorer-001
    satisfies:
      - br-prd04-s12
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: search_workspace
      ds_id: ds:webui.search.root
      labels:
        title: Search Results
        filters: all, doc, commit, task, adr, chat, spike
      bindings:
        results: GET /api/search?q=<query>&type=<type>
      actions:
        - id: action-search-submit-query
          label: Submit query
        - id: action-search-select-filter
          label: Select type filter hash
        - id: action-search-open-result-task
          label: Open task result
          target_route: /tasks/:id
        - id: action-search-open-result-doc
          label: Open document result
          target_route: /docs/:id
        - id: action-search-open-result-trace
          label: Open trace result
          target_route: /trace/:id
      responsive:
        Desktop: filter column, results list, detail sidebar
        Tablet: filters collapse above results
        Mobile: filters hidden behind dropdown and results full width
      boundary_content:
        loading: Result card skeletons with searching backends message
        empty: Không tìm thấy kết quả cho query with query adjustment hint
        error: Lỗi kết nối Zvec hoặc FrankenSQLite with retry action
      children:
        - type: query_input
          ds_id: ds:webui.search.query-input
        - type: type_filters
          ds_id: ds:webui.search.type-filters
        - type: grouped_results
          ds_id: ds:webui.search.results-list
        - type: result_detail
          ds_id: ds:webui.search.detail-sidebar

  - id: terminal-console
    route: /terminal
    data_screen_id: terminal-console
    ds_ref: ds:screen:terminal-001
    satisfies:
      - br-prd04-s14
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: terminal_mosaic
      ds_id: ds:webui.terminal.root
      labels:
        title: Agent and CI Terminal Console
        tabs: agent-console, deploy, debug, ci-cd
      bindings:
        sessions: GET /api/agents/sessions
        ci_runs: GET /api/ci/runs
        task_activity: GET /api/tasks/:id/activity
      actions:
        - id: action-terminal-select-tab
          label: Select terminal scenario tab
        - id: action-terminal-refresh-stream
          label: Refresh log stream
      responsive:
        Desktop: 2 by 2 mosaic panes
        Tablet: two-pane stack
        Mobile: one pane at a time with scenario tabs
      boundary_content:
        loading: Stream connection skeleton panes
        empty: Chưa có session nào hoạt động with Task List CTA
        error: Không thể tải log stream with retry action
        offline: Cached read-only logs and controlled actions disabled
      children:
        - type: scenario_tabs
          ds_id: ds:webui.terminal.tabs
        - type: terminal_pane_grid
          ds_id: ds:webui.terminal.mosaic

  - id: timeline-file-leases
    route: /timeline
    data_screen_id: timeline-file-leases
    ds_ref: ds:screen:timeline-001
    satisfies:
      - br-prd04-s15
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: timeline_workspace
      ds_id: ds:webui.timeline.root
      labels:
        title: Timeline and File Leases
        anchors: '#file-lease, #activity-feed, #sprint-day'
      bindings:
        activity: GET /api/activity
        file_leases: GET /api/file-leases
        task_activity: GET /api/tasks/:id/activity
      actions:
        - id: action-timeline-select-anchor
          label: Select timeline anchor
        - id: action-timeline-refresh
          label: Refresh activity and file leases
      responsive:
        Desktop: three-column file leases, activity feed, sprint day
        Tablet: two-column with sprint day below
        Mobile: stacked accordion sections
      boundary_content:
        loading: Timeline and lease card skeletons
        empty: Chưa có hoạt động trong khoảng thời gian này with clear filters CTA
        error: Không thể tải activity hoặc file leases with retry action
        offline: Stale data label and read-only controls
      children:
        - type: file_lease_list
          ds_id: ds:webui.timeline.file-leases
        - type: activity_feed
          ds_id: ds:webui.timeline.activity-feed
        - type: sprint_day_timeline
          ds_id: ds:webui.timeline.sprint-day

  - id: git-graph-explorer
    route: /git-graph
    data_screen_id: git-graph-explorer
    ds_ref: ds:screen:git-graph-001
    satisfies:
      - br-prd04-s16
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: git_graph_workspace
      ds_id: ds:webui.git-graph.root
      labels:
        title: Git Graph Explorer
        scenarios: gitflow, multi-agent, hotfix, release-train, monorepo, beads-prd-trace, beads-deadlock, beads-ds-comp, beads-traversal, beads-sprint-review
      bindings:
        graph: GET /api/git/graph?scenario=<id>
        trace_overlay: GET /api/trace/:id?include=git
      actions:
        - id: action-git-graph-select-scenario
          label: Select scenario hash
        - id: action-git-graph-select-commit
          label: Select commit detail
        - id: action-git-graph-open-trace
          label: Open Beads trace
          target_route: /trace/:id
      responsive:
        Desktop: scenario list beside graph canvas and commit detail
        Tablet: scenario list collapses above graph
        Mobile: scenario selector and simplified vertical commit list
      boundary_content:
        loading: Progress bar while API analyzes git history
        empty: Không có commit phù hợp scenario or filter with reset CTA
        error: Không thể đọc dữ liệu local git with retry action
        offline: Cached graph visible and refresh disabled
      children:
        - type: scenario_list
          ds_id: ds:webui.git-graph.scenario-list
        - type: git_graph_canvas
          ds_id: ds:webui.git-graph.canvas
        - type: commit_detail
          ds_id: ds:webui.git-graph.commit-detail

  - id: knowledge-graph
    route: /knowledge-graph
    route_variants:
      - /trace/:id
    data_screen_id: knowledge-graph
    ds_ref: ds:screen:knowledge-graph-001
    satisfies:
      - br-prd04-s5
      - br-prd04-s10
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: preset_graph_viewer
      ds_id: ds:webui.knowledge-graph.root
      labels:
        title: Knowledge Graph Presets
        presets: simple, ecosystem, sprint
      bindings:
        presets: GET /api/graph/presets
        enrichment: GET /api/trace/:id?depth=full
      actions:
        - id: action-knowledge-select-preset
          label: Select graph preset hash
        - id: action-knowledge-select-node
          label: Select node for banner
        - id: action-knowledge-open-trace
          label: Open full trace
          target_route: /trace/:id
      responsive:
        Desktop: preset list, graph canvas, selected-node banner
        Tablet: banner becomes bottom sheet
        Mobile: preset picker above touch graph and full-screen selected-node detail
      boundary_content:
        loading: Graph canvas skeleton and preset loading label
        empty: Chưa có liên kết tài liệu hoặc biểu đồ trống with link PRD CTA
        error: Lỗi truy xuất đồ thị từ gmind with retry action
      children:
        - type: preset_list
          ds_id: ds:webui.knowledge-graph.preset-list
        - type: sigma_graph_canvas
          ds_id: ds:webui.knowledge-graph.canvas
        - type: selected_node_banner
          ds_id: ds:webui.knowledge-graph.node-banner

  - id: portfolio-view
    route: /portfolio
    data_screen_id: portfolio-view
    ds_ref: br-ds-portfolio-view
    satisfies:
      - br-prd04-s3
      - br-prd04-s8
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
    layout:
      type: portfolio_dashboard
      ds_id: ds:webui.portfolio.root
      labels:
        title: Executive Portfolio
      bindings:
        epics: GET /api/portfolio/epics
        epic_tasks: GET /api/tasks?issue_type=epic
      actions:
        - id: action-portfolio-open-epic-tasks
          label: Open blocked epic tasks
          target_route: /tasks?epic=:id
        - id: action-portfolio-open-budget-trace
          label: Open budget lineage
          target_route: /trace/:epic-id
      responsive:
        Desktop: portfolio table beside roadmap
        Tablet: roadmap stacks below table
        Mobile: epic summary cards with roadmap accordion
      boundary_content:
        loading: Portfolio row and roadmap skeletons
        empty: Chưa có epic trong portfolio with create or import CTA
        error: Không thể tải portfolio with retry action
        forbidden: Budget and private forecast fields hidden with role message
      children:
        - type: portfolio_table
          ds_id: ds:webui.portfolio.table
        - type: roadmap
          ds_id: ds:webui.portfolio.roadmap

  - id: pi-planning
    route: /pi-planning
    data_screen_id: pi-planning
    ds_ref: br-ds-pi-planning
    satisfies:
      - br-prd04-s3
      - br-prd04-s8
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - forbidden
      - saving
    layout:
      type: pi_planning_workspace
      ds_id: ds:webui.pi-planning.root
      labels:
        title: PI Planning Interactive UI
      bindings:
        features: GET /api/pi/features
        plan_update: PUT /api/pi/plan
        risks: GET /api/risks?view=roam
        confidence_vote: POST /api/pi/confidence-vote
      actions:
        - id: action-pi-drag-feature
          label: Drag feature from strategic pool to capacity plan
        - id: action-pi-score-business-value
          label: Score business value
        - id: action-pi-submit-confidence-vote
          label: Submit confidence vote
        - id: action-pi-open-roam
          label: Open ROAM board anchor
      responsive:
        Desktop: strategic pool and capacity plan side by side with scoring and ROAM below
        Tablet: pool and plan stack with drag handles preserved
        Mobile: PI sections become accordions with controlled drag alternative
      boundary_content:
        loading: Feature pool and capacity skeletons
        empty: Chưa có feature cho PI này with import feature CTA
        error: Không thể tải PI planning data with retry action
        offline: Planning edits disabled and cached plan visible
        saving: Confidence vote and plan update show pending state
      children:
        - type: dnd_strategic_sandbox
          ds_id: ds:webui.pi-planning.strategic-sandbox
        - type: capacity_plan
          ds_id: ds:webui.pi-planning.capacity-plan
        - type: business_value_scoring
          ds_id: ds:webui.pi-planning.value-scoring
        - type: confidence_vote
          ds_id: ds:webui.pi-planning.confidence-vote
        - type: roam_board
          ds_id: ds:webui.pi-planning.roam-board

  - id: storyboards-overview
    route: /storyboards
    data_screen_id: storyboards-overview
    ds_ref: ds:screen:storyboard-001
    satisfies:
      - br-prd04-s17
    states:
      - default
      - loading
      - empty
      - error
      - offline
    layout:
      type: storyboard_overview
      ds_id: ds:webui.storyboards.root
      labels:
        title: Storyboard Journey Map
      bindings:
        storyboards: GET /api/storyboards
      actions:
        - id: action-storyboards-filter-journey
          label: Filter by role module outcome
        - id: action-storyboards-open-detail
          label: Open storyboard detail
          target_route: /storyboards/:id
        - id: action-storyboards-open-screen
          label: Open CTA screen path
      responsive:
        Desktop: journey filter beside horizontal use-case flow and guidance panel
        Tablet: filters collapse above flow
        Mobile: flow nodes become vertical stepper
      boundary_content:
        loading: Flow row and guidance panel skeletons
        empty: Không tìm thấy Storyboard cho module này with show all CTA
        error: Không thể tải storyboard metadata with retry action
        offline: Cached storyboard read-only and local CTAs remain active
      children:
        - type: journey_filter
          ds_id: ds:webui.storyboards.filter
        - type: usecase_flow
          ds_id: ds:webui.storyboards.flow
        - type: guidance_panel
          ds_id: ds:webui.storyboards.guidance-panel

  - id: storyboard-detail
    route: /storyboards/:id
    data_screen_id: storyboard-detail
    ds_ref: ds:screen:storyboard-detail-001
    satisfies:
      - br-prd04-s17
    states:
      - default
      - loading
      - empty
      - error
      - offline
      - not_found
    layout:
      type: storyboard_detail
      ds_id: ds:webui.storyboard-detail.root
      labels:
        title: Storyboard Detail
      bindings:
        storyboard: GET /api/storyboards/:id
      actions:
        - id: action-storyboard-detail-open-screen
          label: Open aligned screen path
        - id: action-storyboard-detail-back
          label: Back to storyboards
          target_route: /storyboards
      responsive:
        Desktop: role and journey summary beside step timeline
        Tablet: summary above timeline
        Mobile: vertical timeline cards
      boundary_content:
        loading: Storyboard detail skeleton
        empty: Storyboard has no steps with back CTA
        not_found: Storyboard ID not found with back CTA
        error: Không thể tải storyboard detail with retry action
      children:
        - type: journey_summary
          ds_id: ds:webui.storyboard-detail.summary
        - type: step_timeline
          ds_id: ds:webui.storyboard-detail.timeline
        - type: related_usecases
          ds_id: ds:webui.storyboard-detail.related-usecases

  - id: components-catalog
    route: /components
    data_screen_id: components-catalog
    ds_ref: ds:screen:components-001
    satisfies:
      - br-prd04-s8
      - br-prd04-s18
    states:
      - default
      - loading
      - empty
      - error
    layout:
      type: component_catalog
      ds_id: ds:webui.components.root
      labels:
        title: Shared Components Catalog
        sections: Buttons, Badges Status, Progress, Avatar Stack, Modal, Dropdown, Accordion, Tab Panel, Data Table, Tooltip, Code Block, Cards, Prompt Card, Section Labels, Status Dots, Skeleton, Empty State, Error Banner
      bindings:
        catalog_sections: shared primitives and tokens
      actions:
        - id: action-components-scroll-section
          label: Scroll to component section hash
        - id: action-components-toggle-example
          label: Interact with component example
      responsive:
        Desktop: section navigation beside examples grid
        Tablet: section navigation becomes sticky top list
        Mobile: single-column anchored examples
      boundary_content:
        loading: Component example skeletons
        empty: No component sections registered with registry review CTA
        error: Component catalog failed to load with retry action
      children:
        - type: section_nav
          ds_id: ds:webui.components.section-nav
        - type: examples_region
          ds_id: ds:webui.components.examples
        - type: token_reference
          ds_id: ds:webui.components.tokens
``` 

## Mermaid Logic Machine Placeholder

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
