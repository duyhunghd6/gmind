# Stage 2 QA Results: webui-and-pm-workspace Iteration 3

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter3-results -->

## Summary

Status: QA_FAIL. The core contract surfaces render and source has strong DS/a11y coverage, but acceptance is blocked by browser evidence showing a React hydration mismatch on hash URLs and two individual hash panels not matching expected screen metadata. Task-list storyboard completeness also remains short of the context-slice requirements.

## Results

| Suite | Status | Evidence | Fix |
| --- | --- | --- | --- |
| T1 Storyboard Replay | FAIL | Source implements many storyboard actions via `data-action`, hash navigation, dashboard drill-down/trace, approval decisions, doc/task/trace transitions. Browser evidence confirms 8/8 hashes change active surfaces. However task-list storyboard/context slice requirements are incomplete: no pagination, no board/list toggle, no CSV export, and task-list state options omit `saving`. | Add task-list pagination, board/list toggle, CSV export control, and `saving` state. |
| T2 Contract Components | PASS | `ui-contract.md` has block-style fenced YAML. Required UI contract ds_ids are present: `ds:global_shell`, `ds:component:header`, `ds:screen:rtm-dashboard`, `ds:screen:approval-001`. Contract labels/actions are implemented except minor visible text drift for `Logo`, with functional Gmind PM logo link present. | Optional: align visible logo text if strict label matching is desired. |
| T3 State Matrix | PASS | Required states `default`, `loading`, `empty`, `error`, `offline`, `insufficient-evidence`, and `decision-submitted` are represented by selectors/placeholders or normalized underscore variants. Dashboard `view_drilldown` and `view_trace`; approval decision states; permission/recovery states are present. | None blocking. |
| T4 DS Token Audit | PASS | 18/18 source `var(--*)` tokens resolve to DS manifest; no invented tokens; no hardcoded hex/rgb/hsl colors; no raw `font-family`; registry classes reused for buttons, badges, data tables, graph nodes, heatmap cells, path tree, and skeletons. | None. |
| T5 A11y Structural | PASS | Source includes `main`, `header`, `nav`, `aside`, `footer`, search role, per-hash active h1 in browser metadata, labeled controls, `aria-live`/status and alert regions, skip link, Ctrl+K/Escape keyboard paths, and focus-visible classes. | None blocking. |
| T6 Preview/Browser Consistency | FAIL | Preview manifest has zero warnings and preview HTML includes all 9 tabs. Browser metadata exists and shows 8/8 expected hashes render distinct panels. Blocking issues: console contains React hydration mismatch for docs sidebar active class; `#surface-tasks` and `#surface-docs` report `hasMatchingVisibleScreen=false` despite visible panels. | Stabilize server/client active route derivation for hash URLs; align screen id aliases/metadata for task-list and doc-viewer. |
| T7 Live Render | PASS | `curl http://localhost:9993/design-system/webui-pm-workspace` returned 200; source contains expected renderable `data-ds-id` values. | None. |

## Blocking Issues

1. P0 T6: Hash URL hydration mismatch in docs sidebar active class, reproduced in browser metadata console errors.
2. P0 T6: Individual hash URL screen matching fails for `#surface-tasks` and `#surface-docs` (`hasMatchingVisibleScreen=false`).
3. P1 T1: Task-list dummy app is missing required storyboard controls: pagination, board/list toggle, CSV export, and `saving` state option.

## Recommended Routing

Route back to `build_layout` for hydration/hash active state stabilization and to `build_components`/`build_states` for task-list screen alignment and missing task-list controls/state.
