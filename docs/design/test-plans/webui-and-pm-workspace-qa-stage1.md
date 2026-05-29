# Stage 1 QA Test Plan: webui-and-pm-workspace

<!-- beads-id: br-agent-ralph-stage1-qa-webui-pm-workspace-plan -->

## Scope

<!-- beads-id: br-agent-ralph-stage1-qa-webui-pm-workspace-plan-scope -->

Feature: `webui-and-pm-workspace`
Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
PRD: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Evaluator scorecard: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage1-iter-12.json`

## Files Under Test

<!-- beads-id: br-agent-ralph-stage1-qa-webui-pm-workspace-plan-files -->

- `ui-contract.md`
- `flow.md`
- `review-diagrams.md` and optional `review-diagrams/*.md`
- `storyboards.json`
- `layout-rules.json`
- `component-map.json`
- `artifact-index.json`
- `context-slices/**/*.yaml`
- `storyboards-review.html`
- `prd-ds-conflicts.md`
- `preview/index.html`
- `preview/preview-manifest.json`

## Test Suites

<!-- beads-id: br-agent-ralph-stage1-qa-webui-pm-workspace-plan-suites -->

### T1 Contract Container Integrity
Pass criteria: `ui-contract.md` exists, has exactly one block-style YAML fence and exactly one Mermaid fence, YAML is not JSON/minified/object literal, and preview parser reports no fatal errors.

### T2 YAML View Blueprint Schema
Pass criteria: YAML View Blueprint includes `metadata.feature`, `metadata.satisfies`, `viewports[]`, `screens[]`; each screen has `id`, `route`, `states`, and `layout`; nested DS components use stable `ds_id` and `type`.

### T3 Component and ds_id Traceability
Pass criteria: all YAML `ds_id` values are unique and appear in `component-map.json`; component-map references valid screen IDs and DS types.

### T4 Mermaid Logic Coverage
Pass criteria: `flow.md` has exactly one fenced Mermaid block matching/faitfully extracting the ui-contract logic machine; YAML actions and Mermaid events map bidirectionally; required error/retry/cancel/back/success paths exist; no standalone `.mmd` files exist; Mermaid Markdown validator passes.

### T5 Storyboard Trajectory Validation
Pass criteria: `storyboards.json` is valid JSON with stable trajectory IDs, PRD journey references, ordered steps, state/action/assertion fields, and `ds:` targets where applicable; at least one trajectory per PRD journey and at least one recovery path when relevant.

### T6 Layout Rules and Review Diagrams
Pass criteria: `layout-rules.json` viewport names match YAML; review diagrams include fenced Mermaid blocks for screen inventory, component hierarchy, state coverage, and action/event links; split subgraph check reports no changes; no standalone `.mmd` files; Mermaid Markdown validator passes.

### T7 Conflict Report and Preview Output
Pass criteria: conflict report resolves/assigns/defers every conflict; preview HTML and manifest exist; manifest warnings are zero or documented with owners.

### T8 Artifact Budget and Slice Availability
Pass criteria: large machine artifacts are marked machine evidence with lookup/summary load policy; context slices exist for summary, components, storyboards, and layout; Gate A review outputs are compact summaries or HTML review views, not mandatory raw JSON.
