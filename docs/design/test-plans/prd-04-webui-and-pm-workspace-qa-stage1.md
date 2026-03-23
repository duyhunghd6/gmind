# Stage 1 QA Test Plan: prd-04-webui-and-pm-workspace

- Feature: `prd-04-webui-and-pm-workspace`
- Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/`
- PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- Evaluator self-score: `85`
- Warning flag: `TIMEOUT`

## Files to be tested

- Contract manifest: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`
- Component map: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/component-map.json`
- Storyboards: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/storyboards.json`
- Layout rules: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/layout-rules.json`
- Wireframes: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/wireframes/*`
- User flows: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/user-flows/*`
- PRD source: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`

## Test suites

### T1. Wireframe Structure Integrity
Checks:
- Count `┌` and `┘` in every wireframe file and verify counts match.
- Check whether complex screens have at least 3 nesting levels.
- Check for broken box edges and orphaned `│` / `─` without enclosing corners.

Pass criteria:
- Every wireframe file has balanced box counts.
- Complex screens have nesting depth >= 3.
- No broken box-edge usage exists.

### T2. Screen x State Coverage Matrix
Checks:
- Extract screens and state expectations from the PRD and contract.
- Enumerate wireframe files.
- Verify every PRD/contract screen has wireframes for `default`, `loading`, and `error`.
- Note extra states such as `empty`, `offline`, `partial`, `saving`, `not-found`, `bulk-processing` when present.

Pass criteria:
- Every required screen has default + loading + error coverage.

### T3. Component Mapping Completeness
Checks:
- Read `component-map.json`.
- For each component entry, search all wireframe files for the mapped component name / selector.
- Identify any selectors declared in the component map that never appear in wireframes.

Pass criteria:
- 100% of component-map entries appear in at least one wireframe.

### T4. User Flow Continuity
Checks:
- Read all ASCII user-flow files.
- Extract node identifiers and arrow usage.
- Verify arrows connect existing nodes and flag dangling connectors.
- Verify each flow contains at least one terminal state.

Pass criteria:
- All flows are connected and contain at least one terminal node.
- No dangling arrows remain unresolved.

### T5. Storyboard Trajectory Validation
Checks:
- Parse `storyboards.json` as JSON.
- Verify root is an array of trajectories.
- Verify each trajectory has `storyboard_id` and `trajectory_plan` with at least 2 steps.
- Verify each step has numeric `step`, string `state`, and `action` or `assertion`.
- Verify each `target` uses the `ds:` prefix pattern.

Pass criteria:
- JSON parses successfully and all trajectories satisfy schema expectations.

### T6. Layout Rules Cross-Check
Checks:
- Parse `layout-rules.json` as JSON.
- Cross-check viewport coverage against `contract.yaml`.
- Cross-check breakpoint values against PRD specs: desktop >= 1024 / canonical 1440, tablet 768-1023 / canonical 1024, mobile < 768 / canonical 390.
- Verify `contract.yaml` itself is structurally valid enough to support the viewport cross-check.

Pass criteria:
- Layout rules parse successfully.
- All required viewports are covered.
- Breakpoint values match PRD specs.
- `contract.yaml` is syntactically valid for reliable cross-checking.
