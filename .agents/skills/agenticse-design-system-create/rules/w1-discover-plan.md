# Workflow 1: Discover & Plan (`design:discover`)

<!-- beads-id: br-design-create-w1 -->

**Goal:** Understand requirements, ingest the Stage 1 schema-driven contract package, plan components, analyze platform needs, and map state edge cases before writing UI code.

## Steps

### W0 — Plan Declaration Gate

The Implementor must emit a structured Plan Declaration JSON before writing UI code. Gatecheck validates it against `ui-contract.md` and `component-map.json`.

Save to `docs/design/plan-declaration.json`:

```json
{
  "rollout_id": "rl-2026-03-12-001",
  "prd_beads_id": "br-xxx",
  "contract_source": "docs/design/contracts/feature-x/ui-contract.md",
  "build_sequence": [
    { "step": 1, "component": "ds:layout:dashboard-shell-001", "type": "structural", "tokens_first": true },
    { "step": 2, "component": "ds:comp:kpi-cards-001", "type": "data-display" },
    { "step": 3, "component": "ds:comp:positions-table-001", "type": "data-display" }
  ],
  "states_to_implement": ["default", "loading", "empty", "error"],
  "mermaid_events_to_wire": ["EVENT_REFRESH_CLICK"],
  "risks": [
    "Table may overflow on mobile; verify responsive layout-rules.json",
    "Loading skeleton must match populated component dimensions"
  ],
  "tool_budget_estimate": 6
}
```

Evaluator validation rule: every critical `ds_id` in the YAML View Blueprint and `component-map.json` must appear in `build_sequence` or be explicitly assigned to a later builder.

### 1.1 Read PRD and Stage 1 Artifacts

Read:

- `docs/design/contracts/{feature}/ui-contract.md`
- `docs/design/contracts/{feature}/component-map.json`
- `docs/design/contracts/{feature}/storyboards.json`
- `docs/design/contracts/{feature}/layout-rules.json`
- `docs/design/contracts/{feature}/flow.mmd`
- `docs/design/contracts/{feature}/prd-ds-conflicts.md`
- `docs/design/contracts/{feature}/preview/preview-manifest.json`

Understand target platforms: Web, Mobile Web/PWA, or Mobile App.
If Mobile App, enforce safe areas, tap targets, and platform navigation conventions.

### 1.2 State and Flow Alignment

For every screen in YAML:

- Map declared states to implementation branches.
- Map Mermaid events to handlers, links, or form submissions.
- Map storyboard trajectories to UI test paths.
- Include Default, Loading, Empty, Error, Offline, Permission Denied, Validation, and Success states when declared.

### 1.3 Component Triage

Use the DS registry/manifest first. Add new local components only when:

- No existing DS component fits.
- The PRD requirement is explicit.
- The conflict report permits the addition or local override.

### 1.4 RFCs

If a new reusable DS component is needed, draft an RFC applying the Rule of 3.

### 1.5 Output Discovery Brief

Finalize:

- `docs/design/discovery-brief.md`
- `component-triage.md`
- `state-matrix-plan.md`
- `rfcs/RFC-<name>.md` when needed
- `issue-log.md`
- `docs/design/plan-declaration.json`

### 1.6 Eval Dataset Awareness

If `docs/eval-dataset/` exists and this PRD is listed, record timestamp and tool budget plan in `docs/eval-dataset/run-log.md`.
Do not use simplified shortcuts for official eval datapoints.

### 1.7 Handover

Notify the orchestrator or QA owner that discovery is complete, including the rollout ID and plan declaration path.
