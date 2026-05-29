# Stage 2 QA Results: webui-and-pm-workspace Iteration 1

<!-- beads-id: br-agent-ralph-stage2-qa-webui-and-pm-workspace-iter-1-results -->

## Summary

QA_FAIL. Independent QA confirms the known audit issues and adds broader sliced-storyboard/component-slice coverage gaps. Blocking issues remain in contract route/hash conformance, missing sidebar/toggle behavior, absent explicit flow handlers, duplicate React keys, incomplete broader storyboard/component DS coverage, and heading hierarchy.

## Results

| Test | Status | Evidence | Fix instruction |
|---|---|---|---|
| T1 Storyboard Replay | FAIL | 26 storyboard slices scanned. 9 storyboard screen ds_ids are absent from source: components, document graph widget, git graph, PI planning, portfolio, storyboard overview/detail, terminal, timeline. Mermaid/storyboard actions such as Toggle Sidebar, Drill-down, View Trace as explicit state events, Navigate Dashboard/Approval, and several EVENT_ROUTE_ENTER/API events are not implemented as source handlers. | Implement all selected Stage 2 storyboard surfaces or explicitly narrow the contract slices. Add deterministic handlers for storyboard and Mermaid events. |
| T2 Contract Component Completeness | FAIL | YAML block is block-style. Exact `ds:global_shell` is missing from source, and `ds:screen:rtm-dashboard` is implemented as `ds:screen:rtm-dashboard-001`. Component-map label `Sidebar` is absent. Component slices include `ds:global-shell:sidebar`, `ds:rtm-dashboard:root`, `ds:approval:root`, `ds:task-list:root`, `ds:task-detail:root`, `ds:trace-explorer:root`, `ds:doc-viewer:root`, and `ds:search-explorer:root` that are not emitted. | Preserve exact contract ds_ids or update contract/slices. Add sidebar and root wrappers for slice ds_ids. |
| T3 State Matrix | FAIL | YAML states are represented after hyphen/underscore normalization, but fenced Mermaid states `view_drilldown`, `view_trace`, and transition events Approve/Reject/Request Changes do not have deterministic rendered branches; Toggle Sidebar is absent. | Add state controllers/actions for drilldown, trace, approval decisions, and sidebar toggle. |
| T4 DS Token/Class Audit | PASS | 18/18 `var(--*)` references match DS manifest, no invented tokens, no hardcoded hex/rgb/hsl colors, no raw font-family declarations. Registry classes such as `btn-*`, `badge-*`, `data-table`, `graph-node`, `heatmap-cell`, and `skeleton` are reused. | No token-blocking fix required. |
| T5 Accessibility Structural | FAIL | `<main>`, nav, one `<h1>`, visible labels, `aria-live`, and focus-visible styles exist. Heading hierarchy skips from h2 to repeated h5 headings in `workspace-components.tsx`, and several hash navigation targets do not exist. | Replace panel h5 headings with hierarchical h3/h4 levels and align hash targets. |
| T6 Preview and Browser Consistency | FAIL | Preview manifest warnings are empty and all nine tabs are present. Browser artifact exists, but render evidence shows 6 missing anchors: `surface-board`, `surface-tasks`, `surface-trace`, `surface-docs`, `surface-approval`, `surface-search`. Browser console has 9 duplicate-key errors for `default`, `loading`, and `offline`. | Rename/add exact hash anchors and dedupe `StatePlaceholders` keys. |
| T7 Live Render | SKIP | `http://localhost:9993/design-system/webui-pm-workspace` refused connection during QA. Source and provided browser render indicate the route can render when a dev server is available, but live 9993 was not running. | Re-run with website dev server on port 9993. |

## Line Evidence

- Hash mismatch: expected browser anchors are absent; source uses `surface-safe-board`, `surface-task-list`, `surface-trace-explorer`, `surface-doc-viewer`, `surface-approval-gates`, and `surface-search-results` in `page.tsx:39-45`.
- Duplicate keys: `StatePlaceholders` maps `key={state}` at `page.tsx:133-134`; caller combines `globalStates` and `commonStates` at `page.tsx:84`, duplicating `default`, `loading`, and `offline`.
- Missing sidebar toggle: no `Toggle Sidebar` text or handler was found in source; top navigation is at `page.tsx:100-104`.
- Approval actions are links only, not transition handlers: `workspace-components.tsx:100`.
- Heading skip: h5 panel headings appear throughout `workspace-components.tsx:61,83-86,88,90,96-99,104-106,110`.

## Routing Recommendation

Return to `build_components` and `build_states` before another audit. Not Gate B ready.
