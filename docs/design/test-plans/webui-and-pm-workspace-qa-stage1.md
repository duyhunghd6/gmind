# Stage 1 QA Test Plan: webui-and-pm-workspace

<!-- beads-id: br-qa-stage1-webui-pm-workspace -->

## Scope

Canonical contract directory: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
PRD: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Pipeline state root: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace`

## Files Under Test

- `ui-contract.md`
- `component-map.json`
- `flow.md`
- `storyboards.json`
- `layout-rules.json`
- `review-diagrams.md`
- `prd-ds-conflicts.md`
- `preview/index.html`
- `preview/preview-manifest.json`
- `artifact-index.json`
- `context-slices/**`

## T1: Contract Container Integrity

Pass criteria: `ui-contract.md` exists, has exactly one fenced YAML block and one fenced Mermaid block, YAML is block-style/human-reviewable, and the preview parser completes without fatal errors.

## T2: YAML View Blueprint Schema

Pass criteria: YAML includes `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]`; every screen has `id`, `route`, `states`, and `layout`; nested DS components declare `type` and stable `ds_id` where mapped.

## T3: Component and ds_id Traceability

Pass criteria: every YAML `ds_id` is present once in `component-map.json`, no duplicate YAML IDs exist, mapped screen IDs are valid, and mapped DS types are valid/non-empty.

## T4: Mermaid Logic Coverage

Pass criteria: `flow.md` contains exactly one fenced Mermaid block matching or faithfully extracting the logic machine; reusable Mermaid validator passes; YAML actions map to Mermaid events or documented non-transition actions; EVENT_* values map back to actions; required error, retry, cancel/back, and success paths exist; no standalone `.mmd` files exist.

## T5: Storyboard Trajectory Validation

Pass criteria: `storyboards.json` is valid JSON; every trajectory has stable ID, PRD journey reference, ordered steps, state/action/assertion fields, and `ds:` targets where applicable; every step has state; at least one trajectory per PRD journey and relevant error/recovery paths exist.

## T6: Layout Rules and Review Diagrams

Pass criteria: `layout-rules.json` is valid; viewport names match YAML; review diagram Markdown artifacts contain fenced Mermaid blocks for screen inventory, component hierarchy, state coverage, and action/event links; reusable Mermaid validator passes; split subgraph checker reports no changes needed; no standalone `.mmd` files exist.

## T7: Conflict Report and Preview Output

Pass criteria: `prd-ds-conflicts.md` resolves, assigns, or explicitly defers all conflicts; `preview/index.html` and `preview/preview-manifest.json` exist; preview loaded artifacts are complete and warnings are documented with owners.

## T8: Artifact Budget and Slice Availability

Pass criteria: `artifact-index.json` validates; large machine artifacts are marked as machine evidence with lookup/index/summary policy; required context slices exist; preview manifest is indexed; legacy `PRD-04-WebUI-and-PM-Workspace` artifacts are explicitly non-active/metadata-only ignored and are not required for Gate A review.
