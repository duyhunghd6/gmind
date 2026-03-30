# Stage 1 QA Test Plan: prd-04-webui-and-pm-workspace

- Feature: `prd-04-webui-and-pm-workspace`
- Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/`
- PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- Evaluator self-score: 88
- Warning flag: `STALL`

## Files to be tested

- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/component-map.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/storyboards.json`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/layout-rules.json`
- All wireframes in `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/wireframes/`
- All user flows in `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/user-flows/`
- `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`

## Test suites

### T1. Wireframe Structure Integrity
Expected checks:
- Every wireframe file has balanced ASCII box corners (`┌` count equals `┘` count)
- Complex screens with more than 3 components show at least 3 nesting levels
- No broken box edges or orphaned line characters without enclosing structure

Pass criteria:
- All wireframe files are balanced and structurally intact
- Every complex screen satisfies minimum nesting depth

### T2. Screen × State Coverage Matrix
Expected checks:
- Extract screens and states from the PRD and route contract
- Cross-check all screen wireframes in the contract
- Confirm every required PRD screen has `default`, `loading`, and `error` coverage in the wireframe set
- Note extra states such as `empty`, `hover`, or `focused` when present

Pass criteria:
- Every PRD screen has wireframes covering `default`, `loading`, and `error`

### T3. Component Mapping Completeness
Expected checks:
- Parse `component-map.json`
- For every mapped component identifier, verify at least one wireframe references that component name

Pass criteria:
- 100% of component map entries appear in at least one wireframe

### T4. User Flow Continuity
Expected checks:
- Parse all ASCII user flow diagrams
- Extract nodes and arrows
- Verify no dangling connections
- Verify each flow includes at least one terminal state

Pass criteria:
- All flows are connected and include a terminal state

### T5. Storyboard Trajectory Validation
Expected checks:
- Parse `storyboards.json`
- Confirm top-level structure is an array
- Each trajectory contains `storyboard_id`
- Each `trajectory_plan` has at least 2 steps
- Each step includes `step`, `state`, and either `action` or `assertion`
- Every `target` field uses the `ds:` prefix pattern

Pass criteria:
- JSON parses and all trajectories satisfy schema and target conventions

### T6. Layout Rules Cross-Check
Expected checks:
- Parse `layout-rules.json`
- Confirm every viewport in `contract.yaml` has matching layout rules
- Confirm breakpoint values match the PRD or contract-declared specifications

Pass criteria:
- Layout rules are valid JSON, all declared viewports are covered, and breakpoint values align with specifications
