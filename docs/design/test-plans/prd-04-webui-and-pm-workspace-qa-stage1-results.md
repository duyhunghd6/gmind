# Stage 1 QA Results: prd-04-webui-and-pm-workspace

- Feature: `prd-04-webui-and-pm-workspace`
- Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/`
- PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- Evaluator self-score: 88
- Warning flag: `STALL`

## Suite results

### T1. Wireframe Structure Integrity — FAIL
Evidence:
- 48 wireframe files checked
- Unbalanced box-corner counts found in 4 files:
  - `dashboard--desktop.wideframe.ascii.md` (`┌=33`, `┘=34`)
  - `search_results--desktop.wideframe.ascii.md` (`┌=21`, `┘=22`)
  - `task_detail--desktop.wideframe.ascii.md` (`┌=32`, `┘=35`)
  - `trace_explorer--desktop.wideframe.ascii.md` (`┌=24`, `┘=26`)
- Complex-screen nesting depth check did not reach the required minimum of 3 levels across the wireframe set; sampled desktop wideframes topped out below threshold in the automated scan.

Fix instructions:
- Rebalance all ASCII boxes so every opening `┌` has a matching closing `┘`.
- Add or normalize explicit nested box levels for complex screens so the structure clearly reaches at least 3 levels.
- Recheck desktop wideframes first, then replicate corrections across tablet and mobile where relevant.

### T2. Screen × State Coverage Matrix — PASS
Evidence:
- 8 PRD route screens validated: dashboard, board, approval_gates, document_viewer, trace_explorer, task_detail, search_results, task_list
- All 8 screens have wireframe coverage for `default`, `loading`, and `error`
- Coverage count: 8 screens × 3 required states satisfied in screen wireframe sets

### T3. Component Mapping Completeness — PASS
Evidence:
- 75 component selectors extracted from `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/component-map.json`
- 75/75 selectors appeared in at least one wireframe

### T4. User Flow Continuity — PASS
Evidence:
- 3 user-flow files checked
- All 3 flows contained connected edge definitions and at least one terminal state
- Terminal states detected in each flow, including end states such as support escalation, cached doc opened, and override logged

### T5. Storyboard Trajectory Validation — PASS
Evidence:
- `storyboards.json` parsed successfully
- 21 trajectories validated
- All trajectories include `storyboard_id`
- All `trajectory_plan` arrays contain at least 2 steps
- All checked `target` fields use the `ds:` prefix convention
- No invalid step records found in schema validation scan

### T6. Layout Rules Cross-Check — FAIL
Evidence:
- `layout-rules.json` parsed successfully
- Viewport coverage matches contract declarations: desktop, tablet, mobile
- Breakpoints match declared specifications: desktop min 1024, tablet 768–1023, mobile max 767
- However, `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml` is not valid YAML and failed parsing near lines 661-662 because `action:related_task_open` is missing a space after the key separator

Fix instructions:
- Repair YAML syntax in `contract.yaml` by changing `action:related_task_open` to `action: related_task_open`.
- Re-run schema parsing after the fix to confirm the contract is machine-readable.
- Keep layout viewport and breakpoint values unchanged unless the PRD itself changes.

## Summary of failures

- T1 failed due to unbalanced ASCII box structures and insufficient verified nesting depth for complex screens.
- T6 failed because `contract.yaml` is syntactically invalid YAML even though viewport and breakpoint values align.

## Fix queue

1. P0 — T6: Fix invalid YAML in `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml` at lines 661-662.
2. P0 — T1: Rebalance ASCII boxes in the 4 failing desktop wideframes.
3. P1 — T1: Normalize complex-screen nested box depth to at least 3 explicit levels across wireframes.
