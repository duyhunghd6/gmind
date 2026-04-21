# Stage 1 QA Test Plan: prd-04-webui-and-pm-workspace

## Inputs
- Feature: `prd-04-webui-and-pm-workspace`
- Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace`
- PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- Evaluator score: `pending-restart-iter-7`

## Files to be tested
- `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/component-map.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/storyboards.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/layout-rules.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/user-flows/`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/wireframes/`

## Test Suites

### T1: Wireframe Structure Integrity
Expected checks:
- Count `┌` and `┘` in each wireframe file and verify counts match.
- Inspect wireframes for broken box edges or orphaned line characters.
- Check whether complex screens with more than 3 components show at least 3 nesting levels.

Pass criteria:
- Every wireframe file has balanced `┌` and `┘` counts.
- No broken box-edge patterns are found.
- Every complex screen satisfies the minimum nesting depth.

### T2: Screen × State Coverage Matrix
Expected checks:
- Extract screens and required states from the PRD.
- Inventory all wireframe files.
- Confirm every PRD screen has wireframes covering `default`, `loading`, and `error`.
- Note extra states such as `empty`, `hover`, and `focused` as bonus coverage.

Pass criteria:
- Every PRD screen has wireframes for default, loading, and error states.

### T3: Component Mapping Completeness
Expected checks:
- Parse `component-map.json`.
- For each component entry, search wireframes for the component name.
- Identify any component map entries absent from all wireframes.

Pass criteria:
- 100% of component-map entries appear in at least one wireframe.

### T4: User Flow Continuity
Expected checks:
- Read all ASCII user-flow files.
- Extract node names from boxes and arrow transitions.
- Verify every arrow connects valid nodes and no transitions dangle.
- Confirm each flow has at least one terminal node with no outgoing transitions.

Pass criteria:
- All user flows form connected diagrams with valid nodes and at least one terminal state.

### T5: Storyboard Trajectory Validation
Expected checks:
- Parse `storyboards.json` as JSON.
- Confirm root is an array.
- Validate each trajectory contains `storyboard_id`, a `trajectory_plan` with at least 2 steps, and valid step fields.
- Confirm all `target` values use `ds:` prefixed identifiers.

Pass criteria:
- JSON is valid.
- All trajectories contain required fields and at least 2 steps.
- All targets match the expected `ds:` identifier pattern.

### T6: Layout Rules Cross-Check
Expected checks:
- Parse `layout-rules.json` as JSON.
- Extract viewports from `contract.yaml`.
- Confirm every declared viewport has a corresponding layout rule entry.
- Compare breakpoint values against PRD specifications.

Pass criteria:
- `layout-rules.json` parses successfully.
- Every contract viewport is covered.
- Breakpoint values align with the PRD.
