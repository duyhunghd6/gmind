# Stage 1 QA Test Plan: WebUI PM Workspace

<!-- beads-id: br-agent-ralph-stage1-qa -->

## Files under test
- `docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- `docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- `docs/design/contracts/webui-and-pm-workspace/flow.md`
- `docs/design/contracts/webui-and-pm-workspace/review-diagrams.md` and optional split diagram Markdown files
- `docs/design/contracts/webui-and-pm-workspace/storyboards.json`
- `docs/design/contracts/webui-and-pm-workspace/layout-rules.json`
- `docs/design/contracts/webui-and-pm-workspace/component-map.json`
- `docs/design/contracts/webui-and-pm-workspace/preview/index.html`
- `docs/design/contracts/webui-and-pm-workspace/preview/preview-manifest.json`
- `docs/design/contracts/webui-and-pm-workspace/artifact-index.json`
- `docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage1-iter-2.json`
- `docs/design/pipeline-state/webui-and-pm-workspace/stage1-routing-decision.json`

## T1 Contract Container Integrity
Pass if `ui-contract.md` exists, contains exactly one block-style YAML fence and one Mermaid fence, and preview parsing has no fatal errors.

## T2 YAML View Blueprint Schema
Pass if metadata, viewports, screens, screen routes/states/layout, component `type`, and stable DS IDs exist where applicable.

## T3 Component and DS ID Traceability
Pass if every YAML `ds_id` appears in `component-map.json`, no duplicates exist, entries reference valid screens, and DS types are present.

## T4 Mermaid Logic Coverage
Pass if `flow.md` contains exactly one Mermaid block matching/faithefully extracting the UI contract logic, actions/events round-trip, required success/error/retry/cancel/back paths exist, validator passes, and no standalone `.mmd` exists.

## T5 Storyboard Trajectory Validation
Pass if `storyboards.json` parses and each trajectory has ID, PRD journey reference, ordered steps, state/action/assertion fields, and `ds:` targets where applicable, with route-family/error recovery coverage.

## T6 Layout Rules and Review Diagrams
Pass if `layout-rules.json` parses, viewport names match YAML, review diagrams contain required Mermaid blocks, split-subgraph check reports no pending changes, validator passes, and no standalone `.mmd` exists.

## T7 Conflict Report and Preview Output
Pass if conflicts are resolved/assigned/deferred and preview artifacts exist with OK status and zero warnings.

## T8 Artifact Budget and Slice Availability
Pass if `artifact-index.json` separates human review artifacts from machine evidence and machine evidence has lookup/summary load policies or context-slice refs; required context slices exist and Gate A review does not require raw JSON review.
