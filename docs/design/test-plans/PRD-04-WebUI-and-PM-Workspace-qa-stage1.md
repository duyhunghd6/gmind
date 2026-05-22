# Stage 1 QA Test Plan for PRD-04-WebUI-and-PM-Workspace

## T1: Contract Container Integrity
- Verify `docs/design/contracts/PRD-04-WebUI-and-PM-Workspace/ui-contract.md` exists.
- Verify exactly one fenced YAML block and one fenced Mermaid block.
- Verify the fenced YAML block is block-style YAML.
- Verify the preview script can parse the file without fatal errors.
- **PASS Criteria**: The container is parseable, block counts are exactly one each, and the YAML fence is human-reviewable block-style YAML.

## T2: YAML View Blueprint Schema
- Parse YAML from `ui-contract.md`.
- Verify `metadata.feature`, `metadata.satisfies`, `viewports[]`, and `screens[]` exist.
- Verify each screen has `id`, `route`, `states`, and `layout`.
- Verify nested components use `type` and stable `ds_id`.
- **PASS Criteria**: Required schema fields exist for every declared screen.

## T3: Component and `ds_id` Traceability
- Read `docs/design/contracts/PRD-04-WebUI-and-PM-Workspace/component-map.json`.
- Cross-check every YAML `ds_id` appears in `component-map.json`.
- Verify no duplicate `ds_id`s.
- **PASS Criteria**: All YAML components are mapped once and no duplicates exist.

## T4: Mermaid Logic Coverage
- Extract Mermaid Logic Machine from `ui-contract.md` and read `flow.md`.
- Verify behavior graph covers all required actions and journeys and required Mermaid Markdown validates.
- **PASS Criteria**: Behavior graph covers all required actions and journeys and required Mermaid Markdown validates.

## T5: Storyboard Trajectory Validation
- Validate `storyboards.json` mechanically.
- Verify at least one trajectory per PRD journey and at least one error/recovery path.
- **PASS Criteria**: Trajectories are replayable from YAML/Mermaid source.

## T6: Layout Rules and Review Diagrams
- Validate `layout-rules.json`.
- Run `split_mermaid_subgraphs.py` without `--write`.
- Verify diagrams include screen inventory, component hierarchy, state coverage.
- **PASS Criteria**: Layout and diagrams are consistent with `ui-contract.md` and required Mermaid Markdown validates.

## T7: Conflict Report and Preview Output
- Read `prd-ds-conflicts.md` and verify resolutions.
- Read `preview-manifest.json` and verify warnings.
- **PASS Criteria**: Preview artifacts exist and conflicts are actionable.

## T8: Artifact Budget and Slice Availability
- Validate `artifact-index.json`.
- Verify large machine artifacts are marked `machine_evidence`.
- **PASS Criteria**: Every large machine artifact has a lookup/slice/review-view path.
