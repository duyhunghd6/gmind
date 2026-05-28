# Stage 2 QA Acceptance Results: WebUI PM Workspace

<!-- beads-id: br-agent-ralph-stage2-qa-webui-pm-workspace-iter2-results -->

## Summary

Status: QA_FAIL.
Passed: 4. Failed: 2. Skipped: 1.

## Results

### T1 Storyboard Replay: FAIL

Evidence: 13 storyboard context slices were audited. Actions and states are implementable, but 7 storyboard DS IDs are absent from source: `ds:screen:approval-showcase-001`, `ds:screen:git-graph-showcase-001`, `ds:screen:kanban-showcase-001`, `ds:screen:knowledge-graph-showcase-001`, `ds:screen:pi-planning-showcase-001`, `ds:screen:storyboard-showcase-001`, `ds:screen:webui-pm-workspace-showcase-001`.

Fix: use the exact contract `ds_id` values for storyboard target screen surfaces, or add explicit stable aliases without replacing PRD badge metadata.

### T2 Contract Component Completeness: FAIL

Evidence: `ui-contract.md` has block-style fenced YAML, and all 23 screen IDs/routes are present. `component-map.json` expects 115 DS IDs; 14 exact contract screen DS IDs are missing from `page.tsx`: `ds:screen:terminal-showcase-001`, `ds:screen:portfolio-showcase-001`, `ds:screen:pi-planning-showcase-001`, `ds:screen:git-graph-showcase-001`, `ds:screen:kanban-showcase-001`, `ds:screen:knowledge-graph-showcase-001`, `ds:screen:approval-showcase-001`, `ds:screen:timeline-showcase-001`, `ds:screen:components-showcase-001`, `ds:screen:doc-viewer-showcase-001`, `ds:screen:explorer-showcase-001`, `ds:screen:beads-traversal-showcase-001`, `ds:screen:storyboard-showcase-001`, `ds:screen:webui-pm-workspace-showcase-001`.

Source line evidence: route arrays begin at `page.tsx:21`; showcase entries currently use PRD-facing IDs such as `ds:screen:terminal-001` instead of the contract showcase screen IDs at `page.tsx:33-48`. Rendering anchors are emitted by `ScreenSurface` at `page.tsx:102-103`.

Fix: preserve PRD DS badge metadata separately and set rendered `data-ds-id` to the contract `ds_id` values from `component-map.json`.

### T3 State Matrix: PASS

Evidence: YAML/Mermaid states are represented in source. `ViewState` includes default/loading/empty/error/offline/forbidden/partial/saving/not-found/success at `page.tsx:6`; state controls render `data-state` at `page.tsx:91`; state branch copy and handlers are implemented at `page.tsx:128-142`.

### T4 Design System Token and Class Audit: PASS

Evidence: 19/19 page CSS variable references resolve to design-system token variables. No hardcoded hex colors, no rgba calls, and no raw font-family declarations were found. DS classes reused include `btn-primary`, `btn-secondary`, `badge`, `kanban-column`, `heatmap-cell`, `data-table`, `approval-panel`, `graph-node`, `path-tree`, `terminal`, `file-lease`, and `skeleton`.

### T5 Accessibility Structural Test: PASS

Evidence: source includes `<main>` at `page.tsx:84`, navigation landmarks at `page.tsx:98-99`, exactly one `<h1>` at `page.tsx:87`, form labels and visible buttons, `aria-live` regions at `page.tsx:88` and `page.tsx:142`, focus-visible styles at `page.tsx:14`, and no images requiring alt text.

### T6 Preview and Browser Artifact Consistency: PASS

Evidence: `preview/preview-manifest.json` warning list is empty; `preview/index.html` includes all 9 tabs: Overview, Screens, Flow, Storyboards, Components, Layout, Diagrams, Conflicts, Coverage. Browser metadata reports success, no errors, no console errors, and verified route selection, state toggle, offline, and reconnect interactions. Desktop/mobile screenshots exist under `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/`.

### T7 Live Render Test: SKIP

Evidence: `curl`/HTTP request to `http://localhost:9993/design-system/webui-pm-workspace` failed with connection refused during QA. Prior browser metadata shows the route rendered successfully through the localhost proxy, but live server was not running for this QA pass.

## Fix Queue

- P0 T2: render exact contract screen DS IDs from `component-map.json` for the 14 missing showcase/composite screen anchors.
- P0 T1: ensure storyboard target DS IDs are reachable in source and rendered DOM, especially the 7 missing storyboard screen IDs.
- P1 T7: keep the localhost showcase server running during acceptance so live route can be verified as 200 in the same QA window.

## Residual Risks

- Browser artifacts are from stage2 iteration 1 naming and are accepted as evidence for this iteration, but a fresh iteration 2 browser capture would reduce ambiguity.
- The UI consistently states the no-direct-browser-access boundary, but exact DS ID mismatches can still break automation and downstream trace selectors.
