# Stage 1 QA Test Plan: webui-and-pm-workspace

<!-- beads-id: br-plan-qa-stage1-webui-and-pm-workspace | satisfies: br-prd04-s18 -->

## Overview
This plan defines the Stage 1 QA validation for the 'webui-and-pm-workspace' feature. It ensures that the design contracts (Markdown and JSON) are consistent with PRD-04, traceably linked, and mechanically valid for the Ralph Loop pipeline.

## Files Under Test
- `docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- `docs/design/contracts/webui-and-pm-workspace/flow.md`
- `docs/design/contracts/webui-and-pm-workspace/component-map.json`
- `docs/design/contracts/webui-and-pm-workspace/storyboards.json`
- `docs/design/contracts/webui-and-pm-workspace/layout-rules.json`
- `docs/design/contracts/webui-and-pm-workspace/review-diagrams.md`
- `docs/design/contracts/webui-and-pm-workspace/prd-ds-conflicts.md`
- `docs/design/contracts/webui-and-pm-workspace/artifact-index.json`

## Test Suites

### T1: Contract Container Integrity
- Verify `ui-contract.md` exists.
- Verify exactly one fenced YAML block and one fenced Mermaid block.
- Verify the fenced YAML block is block-style YAML.
- Pass if container is parseable and block counts are correct.

### T2: YAML View Blueprint Schema
- Verify `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]` exist in YAML.
- Verify each screen has `id`, `route`, `states`, and `layout`.
- Pass if required schema fields exist for every declared screen.

### T3: Component and ds_id Traceability
- Verify all `ds_id` in YAML appear in `component-map.json`.
- Verify no duplicate `ds_id`s.
- Pass if all YAML components are mapped once.

### T4: Mermaid Logic Coverage
- Verify `flow.md` Mermaid block matches `ui-contract.md` logic or is a faithful extraction.
- Verify `EVENT_*` values map back to YAML actions.
- Verify behavioral graph covers all required journeys from PRD.
- Run `validate_mermaid_markdown.py` on `flow.md`.

### T5: Storyboard Trajectory Validation
- Validate `storyboards.json` syntax and trajectory shape.
- Verify at least one trajectory per PRD journey.
- Pass if trajectories are replayable from YAML/Mermaid source.

### T6: Layout Rules and Review Diagrams
- Verify viewport names in `layout-rules.json` match YAML.
- Run `split_mermaid_subgraphs.py` on `review-diagrams.md`.
- Run `validate_mermaid_markdown.py` on `review-diagrams.md`.
- Pass if layout and diagrams are consistent and Mermaid validates.

### T7: Conflict Report and Preview Output
- Verify `prd-ds-conflicts.md` resolutions are documented.
- Verify `preview/index.html` and `preview/preview-manifest.json` exist.

### T8: Artifact Budget and Slice Availability
- Verify large machine artifacts are marked `machine_evidence` in `artifact-index.json`.
- Verify `context-slices/` directory structure exists.
