# Stage 1 QA Test Plan: webui-and-pm-workspace

<!-- beads-id: br-qa-stage1-webui-pm-workspace-plan | satisfies: br-prd04-s14 -->

## Scope

Independent Gate A acceptance testing for the Ralph Loop Stage 1 package.

## Files Under Test

- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/flow.mmd`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/review-diagrams.mmd`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/storyboards.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/layout-rules.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/component-map.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/prd-ds-conflicts.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/index.html`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/preview-manifest.json`
- `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`

## Suites and Pass Criteria

### T1: Contract Container Integrity

PASS if `ui-contract.md` exists, has exactly one fenced YAML block, exactly one fenced Mermaid block, and the preview converter parses it without fatal errors.

### T2: YAML View Blueprint Schema

PASS if metadata, `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]` exist; every screen has `id`, `route`, `states`, and `layout`; and DS-backed nested components have stable `type` and `ds_id`.

### T3: Component and `ds_id` Traceability

PASS if every YAML `ds_id` appears in `component-map.json`, IDs are not duplicated, and component-map entries reference valid screen IDs and DS types.

### T4: Mermaid Logic Coverage

PASS if `flow.mmd` faithfully extracts the fenced Mermaid logic, YAML/component-map action events appear in Mermaid, Mermaid action events map back, and PRD-required error, retry, back/cancel, success, offline, approval, rejection, and permission paths exist.

### T5: Storyboard Trajectory Validation

PASS if `storyboards.json` is valid JSON and each trajectory has stable ID, PRD journey reference, ordered steps, `state`/`action`/`assertion` fields, `ds:` targets where applicable, one trajectory per PRD journey, and at least one error/recovery path when relevant.

### T6: Layout Rules and Review Diagrams

PASS if `layout-rules.json` is valid JSON, viewport names match YAML viewports, and review diagrams include screen inventory, component hierarchy, state coverage, and action/event links.

### T7: Conflict Report and Preview Output

PASS if PRD/DS conflicts are resolved/assigned/deferred, preview artifacts exist, and preview manifest warnings are zero or documented as non-blocking with owners/context.
