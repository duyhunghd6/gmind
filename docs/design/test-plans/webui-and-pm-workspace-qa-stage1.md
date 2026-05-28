# Stage 1 QA Test Plan: WebUI PM Workspace
<!-- beads-id: br-agent-ralph-stage1-qa-plan-webui-pm-workspace -->

## Scope
<!-- beads-id: br-agent-ralph-stage1-qa-plan-webui-pm-workspace-scope -->

Files under test: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/*`, PRD `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`, and pipeline state `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/*`.

## Suites
<!-- beads-id: br-agent-ralph-stage1-qa-plan-webui-pm-workspace-suites -->

- T1 Contract Container Integrity: `ui-contract.md` exists, has exactly one block-style YAML fence and one Mermaid fence, and preview parser has no fatal errors.
- T2 YAML View Blueprint Schema: required metadata, viewport, screen, state, route, and layout fields exist.
- T3 Component and `ds_id` Traceability: YAML `ds_id` values are unique and mapped in `component-map.json` with valid screens/types.
- T4 Mermaid Logic Coverage: `flow.md` contains exactly one Mermaid block matching/extracting the logic machine, actions/events map, PRD paths exist, and no `.mmd` files exist.
- T5 Storyboard Trajectory Validation: `storyboards.json` syntax and trajectory fields are mechanically valid with PRD journey coverage and recovery paths.
- T6 Layout Rules and Review Diagrams: layout viewport coverage, review Mermaid blocks, split-subgraph status, required diagram topics, and no `.mmd` files.
- T7 Conflict Report and Preview Output: conflicts are actionable/resolved and preview artifacts exist with warnings documented.
- T8 Artifact Budget and Slice Availability: large machine artifacts are lookup/summary-only, context slices exist, and Gate A review avoids raw JSON review requirements.

Pass criteria: each suite must satisfy the checks above. Any suite failure produces `QA_FAIL` and a fix queue entry for the responsible generator.
