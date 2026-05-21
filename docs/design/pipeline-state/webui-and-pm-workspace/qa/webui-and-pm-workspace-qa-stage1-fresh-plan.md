# Stage 1 QA Acceptance Test Plan — webui-and-pm-workspace

<!-- beads-id: br-agent-ralph-stage1-qa -->

## Scope

Fresh independent Gate A QA after the storyboard QA fix. This plan verifies current artifacts only, not stale QA result files.

## Files Under Test

- `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/flow.mmd`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/review-diagrams.mmd`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/storyboards.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/layout-rules.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/component-map.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/prd-ds-conflicts.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/index.html`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/preview-manifest.json`

## Suites and Pass Criteria

### T1: Contract Container Integrity

Pass if `ui-contract.md` exists, contains exactly one fenced YAML block and exactly one fenced Mermaid block, and the preview/parser path can parse without fatal errors.

### T2: YAML View Blueprint Schema

Pass if parsed YAML includes `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]`; every screen has `id`, `route`, `states`, and `layout`; DS-mapped nested components use `type` and stable `ds_id`.

### T3: Component and `ds_id` Traceability

Pass if every YAML `ds_id` is unique and appears in `component-map.json`, and component-map entries reference valid screen IDs and DS types.

### T4: Mermaid Logic Coverage

Pass if `flow.mmd` is a faithful extraction or equivalent to the fenced Mermaid logic, YAML actions map to Mermaid events or documented non-transition actions, Mermaid events map back to YAML actions, and PRD-required error, retry, cancel/back, and success paths exist.

### T5: Storyboard Trajectory Validation

Pass if `storyboards.json` has valid JSON, stable trajectory IDs, PRD journey references, ordered steps, state/action/assertion fields, DS targets where applicable, at least one trajectory per PRD journey, and error/recovery coverage when relevant.

### T6: Layout Rules and Review Diagrams

Pass if `layout-rules.json` is valid JSON, viewport names match YAML `viewports[]`, and review diagrams include screen inventory, component hierarchy, state coverage, and action/event links.

### T7: Conflict Report and Preview Output

Pass if `prd-ds-conflicts.md` makes every conflict resolved, assigned, or explicitly deferred with reason, preview artifacts exist, and preview-manifest warnings are zero or documented with owner/context as non-blocking.
