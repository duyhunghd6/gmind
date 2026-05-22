## Assertion Checklist — PRD-04-WebUI-and-PM-Workspace

<!-- beads-id: br-test-prd04-assertions -->

- [ ] `ds:global_shell` renders layout with `ds:shell_header` and `ds:shell_sidebar`.
- [ ] `ds:shell_header` contains `ds:logo_btn` and `ds:global_search`.
- [ ] `EVENT_FETCH_DATA` transitions from `default_shell` to `loading_shell`.
- [ ] `ds:offline_status_indicator` is visible in `offline` state.
- [ ] `ds:dashboard_grid` displays KPI metrics and heatmap panel.
- [ ] `navigate_board` transitions from `default_shell` to `safe_board`.
- [ ] `EVENT_LOAD_SUCCESS` transitions `loading_board` to `default_board`.
- [ ] `ds:task_card` contains `ds:rte_badge`.
- [ ] `EVENT_BULK_ACTION` triggers `bulk_processing_task_list` state.
- [ ] `click_task_node` in `ds:d3_canvas` navigates to `task_detail`.
- [ ] `click_trace_link` navigates to `trace_explorer`.
- [ ] `EVENT_MISSING_EVIDENCE` transitions `approval_gates` to `insufficient_evidence`.
- [ ] `ds:approval_action_bar` renders approve and reject buttons.