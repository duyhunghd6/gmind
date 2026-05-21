# Ralph Loop Stage 1 QA Test Plan: webui-and-pm-workspace

<!-- beads-id: br-qa-stage1-webui-and-pm-workspace -->

## Scope

<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-scope -->

Feature: `webui-and-pm-workspace`
Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Evaluator scorecard: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage1-iter-5.json` (94/100)
BA routing decision: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/stage1-routing-decision.json`

## Files Under Test

<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-files -->

- `ui-contract.md`
- `component-map.json`
- `flow.md`
- `storyboards.json`
- `layout-rules.json`
- `review-diagrams.md`
- `prd-ds-conflicts.md`
- `preview/index.html`
- `preview/preview-manifest.json`

## Test Suites and Pass Criteria

<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-suites -->

### T1: Contract Container Integrity

PASS if `ui-contract.md` exists, contains exactly one fenced YAML block and exactly one fenced Mermaid block, and the Stage 1 preview parsing checks complete without fatal extraction errors.

### T2: YAML View Blueprint Schema

PASS if the YAML blueprint contains `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]`; each screen contains `id`, `route`, `states`, and `layout`; and component nodes that map to DS components include `type` and stable `ds_id` values.

### T3: Component and `ds_id` Traceability

PASS if every YAML `ds_id` is present exactly once in `component-map.json`, no duplicate YAML `ds_id` values exist, and component-map entries reference valid screen IDs and DS component types.

### T4: Mermaid Logic Coverage

PASS if the Mermaid Logic Machine in `ui-contract.md` is faithfully extracted to `flow.md`, YAML action values are represented as Mermaid events or explicitly documented as non-transition actions, Mermaid events map back to YAML actions, and PRD-required success, error, retry, cancel/back, and recovery paths exist.

### T5: Storyboard Trajectory Validation

PASS if `storyboards.json` is valid JSON; each trajectory has a stable ID, PRD journey reference, ordered steps, state/action/assertion fields, and `ds:` targets where applicable; and the artifact includes at least one replayable trajectory per PRD journey plus error/recovery coverage.

### T6: Layout Rules and Review Diagrams

PASS if `layout-rules.json` is valid JSON, layout viewport names match YAML `viewports[]`, and review diagrams include screen inventory, component hierarchy, state coverage, and action/event links consistent with `ui-contract.md`.

### T7: Conflict Report and Preview Output

PASS if `prd-ds-conflicts.md` documents all PRD/DS conflicts as resolved, assigned, or explicitly deferred with reasons; preview artifacts exist; and preview-manifest warnings are zero or documented in the QA results with owners.
