# Stage 1 QA Test Plan: webui-and-pm-workspace
<!-- beads-id: br-qa-stage1-webui-and-pm-workspace -->

## Scope
<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-scope -->

Files under test:
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/component-map.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/flow.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/storyboards.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/layout-rules.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/review-diagrams.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/prd-ds-conflicts.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/index.html`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/preview/preview-manifest.json`

## Suites
<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-suites -->

### T1 Contract Container Integrity
PASS when `ui-contract.md` exists, contains exactly one fenced YAML block and one fenced Mermaid block, and the preview generator parses without fatal error.

### T2 YAML View Blueprint Schema
PASS when parsed YAML includes `metadata.feature`, `metadata.satisfies`, `viewports[]`, `screens[]`, and every screen has `id`, `route`, `states`, and `layout`.

### T3 Component and ds_id Traceability
PASS when every YAML `ds_id` is present in `component-map.json`, no YAML `ds_id` duplicates exist, and component-map entries reference valid screens and DS component types.

### T4 Mermaid Logic Coverage
PASS when `flow.md` has exactly one Mermaid block matching or faithfully extracting the UI contract logic, YAML actions and Mermaid events map bidirectionally, required success/error/retry/back paths exist, Markdown Mermaid validates, and no standalone `.mmd` files exist.

### T5 Storyboard Trajectory Validation
PASS when `storyboards.json` is valid JSON, each trajectory has stable ID, PRD journey reference, ordered steps with state/action/assertion fields, DS targets where applicable, one trajectory per PRD journey family, and at least one error/recovery path.

### T6 Layout Rules and Review Diagrams
PASS when `layout-rules.json` is valid, viewport names match YAML, review diagram Markdown artifacts contain valid fenced Mermaid blocks, required diagram topics are covered, and no standalone `.mmd` files exist.

### T7 Conflict Report and Preview Output
PASS when conflict report exists with resolved/assigned/deferred status for all conflicts, preview artifacts exist, and manifest warnings are zero or documented with owners in QA output.
