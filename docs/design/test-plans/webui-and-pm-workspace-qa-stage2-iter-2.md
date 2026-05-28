# Stage 2 QA Acceptance Test Plan: WebUI PM Workspace

<!-- beads-id: br-agent-ralph-stage2-qa-webui-pm-workspace-iter2-plan -->

## Scope

Feature: `webui-and-pm-workspace`.
Page target: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`.
Contract SSOT: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`.
Iteration: 2.

## Test Mapping

- T1 Storyboard replay: use `/context-slices/storyboards/*.yaml` and `storyboards.json`; verify declared `ds_id`, state, and action event implementation in `page.tsx`.
- T2 Contract component completeness: parse `ui-contract.md` fenced YAML and `component-map.json`; compare expected `data-screen-id`/`data-ds-id`, routes, labels, and REST bindings against source.
- T3 State matrix: parse YAML state contracts plus fenced Mermaid blocks from `ui-contract.md` and `flow.md`; verify default, loading, empty, error, offline, forbidden, partial, saving, not-found, and success source branches.
- T4 Design system audit: compare `var(--*)` references to `packages/design-system` token definitions and check DS component class reuse, hardcoded colors, and raw font declarations.
- T5 Accessibility structural: verify landmark, heading, navigation, form labels, live regions, visible button/link labels, focus-visible styles, and image alt requirements.
- T6 Preview/browser consistency: check `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html` tabs, and browser screenshots/metadata under `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/`.
- T7 Live render: curl `http://localhost:9993/design-system/webui-pm-workspace`; pass on 200, skip if dev server is not running, fail on 404/application error.

## Acceptance Focus

- PRD-04 §8.1A routes represented with exact contract DS IDs and REST data-flow mapping.
- Composite shell includes global shell, search, offline indicator, sidebar, active surfaces, state controls, and stable markers.
- Required states and browser metadata interactions are represented.
- Browser evidence has no console errors and does not imply direct browser access to shell, FrankenSQLite, Zvec, local git, gh, or FastCode.
