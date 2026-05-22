# Storyboards Review

## Journey 1: Board Navigation and Task Interaction
1. **global_shell [default_shell]** -> `navigate_board`
2. **safe_board [loading_board]** -> `EVENT_LOAD_SUCCESS`
3. **safe_board [default_board]** -> `click_task_card`
4. **task_detail [loading_task_detail]** -> `EVENT_LOAD_SUCCESS`
5. **task_detail [default_task_detail]** -> `click_trace_link`
6. **trace_explorer [loading_trace]** -> `EVENT_LOAD_SUCCESS`

## Journey 2: Offline detection and recovery
1. **global_shell [default_shell]** -> `EVENT_OFFLINE_DETECTED`
2. **global_shell [offline_shell]** -> `EVENT_ONLINE_DETECTED`
3. **global_shell [default_shell]** -> `trigger_search`
4. **search_results [loading_search]** -> `EVENT_LOAD_SUCCESS`

## Journey 3: Approval missing evidence and refresh
1. **global_shell [default_shell]** -> `navigate_approval`
2. **approval_gates [loading_approval]** -> `EVENT_MISSING_EVIDENCE`
3. **approval_gates [insufficient_evidence]** -> `trigger_refresh`
4. **approval_gates [loading_approval]** -> `EVENT_LOAD_SUCCESS`
5. **approval_gates [default_approval]** -> `trigger_reject`

## Journey 4: Trace Explorer to Docs View
1. **trace_explorer [default_trace]** -> `click_doc_node`
2. **doc_viewer [loading_doc]** -> `EVENT_LOAD_SUCCESS`
3. **doc_viewer [default_doc]** -> `click_beads_id`
4. **trace_explorer [loading_trace]** -> `EVENT_LOAD_SUCCESS`
