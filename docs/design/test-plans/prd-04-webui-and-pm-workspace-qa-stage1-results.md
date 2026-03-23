# Stage 1 QA Results: prd-04-webui-and-pm-workspace

- Feature: `prd-04-webui-and-pm-workspace`
- Contract path: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/`
- PRD path: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
- Evaluator self-score: `85`
- Overall result: `QA_FAIL`

## T1. Wireframe Structure Integrity — FAIL

Evidence:
- 48 wireframe files checked.
- Multiple `.tree.ascii.md` files use tree connectors (`├`, `└`, `│`) without enclosing `┌ ... ┘` corners, which fails the required box-balance rule.
- Box count mismatches found in wideframes, including:
  - `dashboard--desktop.wideframe.ascii.md`: `┌=33`, `┘=34`
  - `approval_gates--desktop.wideframe.ascii.md`: `┌=27`, `┘=29`
  - `search_results--desktop.wideframe.ascii.md`: `┌=21`, `┘=22`
  - `task_detail--desktop.wideframe.ascii.md`: `┌=32`, `┘=35`
  - `trace_explorer--desktop.wideframe.ascii.md`: `┌=24`, `┘=26`
- Complex tree wireframes also fail the >=3 nesting rule, for example:
  - `board--desktop.tree.ascii.md`: nesting depth `2`
  - `dashboard--desktop.tree.ascii.md`: nesting depth `2`
  - `approval_gates--desktop.tree.ascii.md`: nesting depth `1`

Fix instructions:
- Convert tree wireframes to a structure that satisfies the required box-character validation, or relax the contract/test expectation if tree notation is intended.
- Repair mismatched `┌` / `┘` counts in the affected wideframe files.
- Increase nesting depth in complex tree screens to at least 3 levels where required.

## T2. Screen x State Coverage Matrix — PASS

Evidence:
- 8 contract screens checked: `dashboard`, `board`, `approval_gates`, `document_viewer`, `trace_explorer`, `task_detail`, `search_results`, `task_list`.
- All 8 screens have wireframe coverage for `default`, `loading`, and `error`.
- Coverage total: `8 screens x 3 required states = 24 required state instances`, all present.
- Bonus states are also present in several screens, including `empty`, `offline`, `partial`, `saving`, and `bulk-processing`.

## T3. Component Mapping Completeness — FAIL

Evidence:
- 48 selector-like component-map entries checked.
- 1 component-map entry is missing from all wireframes:
  - `dashboard.modal.create-plan`
- Wireframes use `dashboard.surface.create-plan` instead, which does not match the component-map entry.

Fix instructions:
- Align `component-map.json` and wireframes to the same canonical selector.
- Either replace `dashboard.modal.create-plan` with `dashboard.surface.create-plan` in the component map, or add the missing mapped selector to the relevant dashboard wireframes.

## T4. User Flow Continuity — FAIL

Evidence:
- 3 user-flow files checked.
- All 3 flows include terminal states, but horizontal arrow segments are written on standalone lines without both source and target node references on the same line, leaving dangling connectors under this QA rule.
- Affected files include:
  - `j1-dashboard-gap-resolution.ascii.md` dangling arrow lines: `14, 26, 37, 38, 48, 60, 79, 89`
  - `j2-docs-empty-to-trace.ascii.md` dangling arrow lines: `13, 25, 36, 71, 90, 92, 94, 102`
  - `j3-approval-comment-and-recovery.ascii.md` dangling arrow lines: `13, 24, 35, 62, 70, 79, 98, 100, 102, 104`

Fix instructions:
- Rewrite arrow connections so each arrow clearly connects two existing nodes without relying on ambiguous vertical spacing.
- Keep source and target node references explicit for each transition, especially on multiline diagram branches.
- Preserve terminal states while making branch connectivity machine-verifiable.

## T5. Storyboard Trajectory Validation — PASS

Evidence:
- `storyboards.json` parses successfully.
- Root structure is an array.
- 21 trajectories validated.
- All trajectories have `storyboard_id`.
- All `trajectory_plan` arrays contain at least 2 steps.
- All steps contain numeric `step`, string `state`, and `action` or `assertion`.
- All `target` fields use the required `ds:` prefix.

## T6. Layout Rules Cross-Check — FAIL

Evidence:
- `layout-rules.json` parses successfully.
- Breakpoints in layout rules match PRD specs:
  - desktop min `1024`, canonical `1440`
  - tablet min `768`, max `1023`, canonical `1024`
  - mobile max `767`, canonical `390`
- However, `contract.yaml` is not syntactically valid YAML, so the cross-check cannot be trusted end to end.
- Syntax defect found in `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`:
  - `action:related_task_open`
  - This line is missing a space after `action:` and breaks YAML parsing near the navigation transitions block.

Fix instructions:
- Fix the malformed YAML entry in `contract.yaml` by correcting the `action` key syntax.
- Re-run YAML parsing after the fix and confirm viewport extraction still matches `layout-rules.json` and the PRD.

## Summary of failures

- T1 failed due to box-balance mismatches, tree wireframes not satisfying the strict box rule, and insufficient nesting depth in multiple complex screens.
- T3 failed due to 1 unmapped component selector mismatch: `dashboard.modal.create-plan`.
- T4 failed due to dangling arrow notation across all 3 user-flow diagrams.
- T6 failed because `contract.yaml` contains invalid YAML syntax, blocking a fully reliable layout cross-check.

## Recommended fix queue

1. P0 — Repair `contract.yaml` syntax so contract parsing is reliable.
2. P0 — Fix wireframe structure mismatches and make complex screens satisfy the required nesting rule.
3. P1 — Normalize the create-plan selector between `component-map.json` and dashboard wireframes.
4. P1 — Rewrite user-flow arrows so transitions are explicit and machine-verifiable.
