# Stage 1 QA Test Results: webui-and-pm-workspace

<!-- beads-id: br-plan-qa-stage1-results-webui-and-pm-workspace | satisfies: br-prd04-s18 -->

## Convergence Status: QA_FAIL

## Test Suite Results

### T1: Contract Container Integrity
- **Status:** PASS
- **Evidence:** `ui-contract.md` contains 1 YAML block and 1 Mermaid block. Blocks are parseable.

### T2: YAML View Blueprint Schema
- **Status:** FAIL
- **Evidence:** Multiple screens (portfolio, kanban, pi_planning, approval, trace_explorer, doc_viewer, search, terminal, timeline, git_graph, storyboards) are missing explicit `states` declarations in `ui-contract.md`. Ralph Loop requires these for wireframe generation.

### T3: Component and ds_id Traceability
- **Status:** FAIL
- **Evidence:** The following `ds_id` values in YAML are missing from `component-map.json`:
  - `ds:kpi:tasks`
  - `ds:kpi:gaps`
  - `ds:chart:progress`
  - `ds:roadmap:timeline`
  - `ds:hub:evidence`
  - `ds:panel:node_detail`
  - `ds:editor:description`
  - `ds:timeline:activity`
  - `ds:timeline:main`
  - `ds:graph:git`
  - `ds:storyboard:viewer`
  - `ds:shell:search`

### T4: Mermaid Logic Coverage
- **Status:** PASS
- **Evidence:** `flow.md` and `review-diagrams.md` passed `validate_mermaid_markdown.py`. Logic covers all PRD required journeys.

### T5: Storyboard Trajectory Validation
- **Status:** FAIL
- **Evidence:** `storyboards.json` is missing trajectories for:
  - PI Planning journey (J2)
  - Portfolio Review journey (J3)

### T6: Layout Rules and Review Diagrams
- **Status:** PASS
- **Evidence:** `layout-rules.json` is consistent. `split_mermaid_subgraphs.py` confirmed no unsplit blocks in `review-diagrams.md`.

### T7: Conflict Report and Preview Output
- **Status:** PASS
- **Evidence:** `prd-ds-conflicts.md` contains valid resolutions. Preview artifacts exist.

### T8: Artifact Budget and Slice Availability
- **Status:** FAIL
- **Evidence:** `artifact-index.json` is missing `machine_evidence` and `lookup_only` policy metadata for large JSON files (`storyboards.json`, `component-map.json`, `layout-rules.json`).

## Fix Queue
- **P0 | T2**: Add `states` to all screens in `ui-contract.md`. (Responsible: `gen_contracts`)
- **P0 | T3**: Map missing `ds_id` values in `component-map.json`. (Responsible: `gen_flows`)
- **P1 | T5**: Add trajectories for PI Planning and Portfolio in `storyboards.json`. (Responsible: `gen_flows`)
- **P2 | T8**: Update `artifact-index.json` with machine policy metadata. (Responsible: `gen_wireframes`)
