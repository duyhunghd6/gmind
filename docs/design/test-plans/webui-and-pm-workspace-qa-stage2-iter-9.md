# Stage 2 QA Test Plan: WebUI and PM Workspace Iteration 9

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter9-plan -->

## Scope

Independent Stage 2 QA rerun after selective fixes for `webui-and-pm-workspace`.

- Page under test: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Live URL: `http://localhost:9993/design-system/webui-pm-workspace`
- Browser evidence: `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/stage2-browser-evidence-20260529-fixed-rerun.json`
- Audit scorecard: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage2-iter-8.json`

## Focus Areas

1. Component-map usability and `data-ds-id` audit.
2. Exact YAML layout `ds_id` bindings or deterministic alias markers.
3. Exact `ds:screen:beads-traversal-001` presence or deterministic alias marker.
4. `bulk_action_processing` state coverage.

## Test Mapping

| Test | Contract source | Implementation evidence | Acceptance |
| --- | --- | --- | --- |
| T1 Storyboard Replay | `storyboards.json`, `context-slices/storyboards/*.yaml`, Mermaid events in `flow.md` | `data-ds-id`, `data-state`, event handlers in `page.tsx` | All storyboard steps are implementable in source. |
| T2 Contract Component Completeness | `ui-contract.md`, `component-map.json`, `context-slices/components/*.yaml` | Exact `ds_id` strings or deterministic aliases in `page.tsx` | Component map is usable and mapped ids/screens match contract. |
| T3 State Matrix | YAML states in `ui-contract.md`; fenced Mermaid in `flow.md` | `ViewState`, `allStates`, `data-state`, branch copy, recovery controls | Required states including default/loading/error/empty/success/permission/validation are represented. |
| T4 DS Token/Class Audit | `/docs/design/pipeline-state/webui-and-pm-workspace/ds-manifest.txt` | `var(--*)` references and class strings in `page.tsx` | Token usage rate >= 90%, no invented conflicting tokens, no hardcoded colors/font-family. |
| T5 Accessibility Structural | UI contract landmarks and dynamic states | Source landmarks, heading hierarchy, labels, focus styles, live regions | Structural accessibility checks pass. |
| T6 Preview/Browser Consistency | `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html`, browser evidence JSON | Preview tabs, warning status, screenshot/evidence paths | Preview warnings are resolved or non-blocking; browser artifact exists. |
| T7 Live Render | Live route | HTTP status and route availability | Route returns 200; skip only if dev server is unavailable. |
