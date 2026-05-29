# Stage 2 QA Results: WebUI and PM Workspace Iteration 9

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter9-results -->

## Summary

- QA type: Stage 2 independent acceptance rerun
- Feature: `webui-and-pm-workspace`
- Iteration: 9
- Convergence: `QA_FAIL`
- Passed: 5 / 7
- Failed: 1 / 7
- Skipped: 1 / 7
- P0 blockers: 0
- P1 blockers: 3

## Results

| Test | Status | Evidence | Fix guidance |
| --- | --- | --- | --- |
| T1 Storyboard Replay | PASS | 22 storyboard slices checked; 18 storyboard `data_ds_id` values all appear in `page.tsx`; storyboard events appear in source. `loading_to_default` is represented by deterministic loading-to-default handlers rather than an exact state literal. | None. |
| T2 Contract Component Completeness | FAIL | `component-map.json` is still `{"components":[]}`; mechanical component-map audit has 0 usable rows. Current `ui-contract.md` YAML contains 26 `ds_id` bindings; 25 exact ids are absent from `page.tsx`. Exact `ds:screen:beads-traversal-001` is also absent. | Populate `component-map.json`; render exact YAML `ds_id` values or explicit deterministic aliases; add exact `ds:screen:beads-traversal-001` or a deterministic alias marker. |
| T3 State Matrix | PASS | Required default/loading/empty/error/offline/forbidden/partial/saving/not_found and bulk action states are represented through `ViewState`, `allStates`, `StateList`, `data-state`, `BoundaryNotice`, `RegionContent`, and handlers. `bulk_action_processing`, `bulk-action-processing`, `EVENT_SAVE_BULK`, `PUT /api/tasks/bulk`, and write-lock coverage are present. | None. |
| T4 DS Token/Class Audit | PASS | 18/18 `var(--*)` references resolve against the DS manifest; no hardcoded `#`, `rgb`, `rgba`, `hsl`, or raw `font-family` declarations found. | Keep using manifest tokens; optionally increase explicit registry class reuse in a future readability pass. |
| T5 Accessibility Structural | PASS | Source includes one `<main>`, nav landmark, one `<h1>`, ordered `h2`/`h3`/`h4` usage, 18 `aria-label` references, 5 `aria-live` references, status/alert semantics, focus-visible styles, labeled form controls, and keyboard handlers. | None. |
| T6 Preview/Browser Consistency | PASS | `preview/index.html` includes all 9 required tabs. `preview-manifest.json` status is OK with duplicate header/sidebar warnings only. Browser evidence JSON exists and reports 7/7 interactions successful, final root state `decision_submitted`, and 0 console/runtime errors. | None. |
| T7 Live Render | SKIP | `http://localhost:9993/design-system/webui-pm-workspace` connection was refused during QA; dev server was not running. Browser evidence from orchestrator is available for rendered route behavior. | Start the website dev server before the next live-route-only QA gate if a fresh HTTP 200 is required. |

## P1 Fix Queue

1. `component-map.json` is unusable for acceptance because it has an empty `components` array. Populate it from the component inventory with stable `ds_id` rows.
2. Current YAML layout ids from `ui-contract.md` are not bound exactly in `page.tsx`; missing examples include `ds:container:task-list`, `ds:toolbar:task-filters`, `ds:table:tasks`, `ds:container:task-detail`, `ds:header:task-header`, `ds:tabs:task-tabs`, `ds:container:search-results`, `ds:sidebar:search-filters`, `ds:list:search-items`, `ds:container:knowledge-graph`, `ds:canvas:graph`, `ds:panel:graph-detail`, `ds:container:terminal`, `ds:tabs:terminal-scenarios`, `ds:grid:terminal-mosaic`, `ds:container:timeline`, `ds:panel:file-leases`, `ds:panel:activity-feed`, `ds:panel:sprint-day`, `ds:container:git-graph`, `ds:sidebar:git-scenarios`, `ds:container:storyboards`, `ds:sidebar:journey-filter`, `ds:flow:usecase-flow`, and `ds:panel:guidance`.
3. Add exact `ds:screen:beads-traversal-001` or an explicit deterministic alias marker. The current source contains the screen-level alias `screen:ds-beads-traversal` mapped to `screen:trace-explorer`, but not the required `ds:screen:*` marker.

## Recommended Routing

Route back to `build_components` for P1 contract-conformance fixes. No P0 source blockers were found, and state/token/accessibility/browser evidence checks are acceptable.
