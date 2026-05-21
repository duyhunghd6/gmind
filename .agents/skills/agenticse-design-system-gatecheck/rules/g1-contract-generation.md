# Step 1 — UI Contract Generation

<!-- beads-id: br-gatecheck-g1 -->

> **Pipeline position:** Step 1 of 12 • Requires → Step 0 output • Leads to → Step 2 (Contract Compile)

## Purpose

Generate the schema-driven Stage 1 Gate A contract package. The single source of truth is `docs/design/contracts/{feature}/ui-contract.md`, containing exactly one YAML View Blueprint and exactly one Mermaid Logic Machine.

## Input

- `docs/PRDs/{feature}.md` or normalized PRD output from Step 0
- Design System registry/tokens when available
- Ralph Loop Stage 1 generator outputs when this rule is used as an evaluator checklist

## Processing

### 1.1 Generate `ui-contract.md`

Create the contract container at `docs/design/contracts/{feature}/ui-contract.md`.

The file must include:

1. Human-readable review Markdown summary.
2. Exactly one fenced `yaml` block for the YAML View Blueprint.
3. Exactly one fenced `mermaid` block for the Mermaid Logic Machine.

Minimum YAML shape:

```yaml
metadata:
  feature: feature-x
  satisfies:
    - br-prd01-s1
viewports:
  - name: mobile
    width: 390
  - name: tablet
    width: 768
  - name: desktop
    width: 1440
screens:
  - id: dashboard
    route: /dashboard
    states: [default, loading, empty, error]
    layout:
      type: AppShell
      ds_id: ds:layout:dashboard-shell-001
      children:
        - type: Button
          ds_id: ds:comp:refresh-button-001
          label: Refresh
          action: EVENT_REFRESH_CLICK
```

Minimum Mermaid shape:

```mermaid
stateDiagram-v2
  [*] --> Loading
  Loading --> Default : API_SUCCESS
  Loading --> Error : API_ERROR
  Default --> Loading : EVENT_REFRESH_CLICK
```

### 1.2 YAML View Blueprint Requirements

The YAML block owns:

- Metadata and PRD traceability.
- Viewports and responsive constraints.
- Screen IDs, routes, and states.
- Component hierarchy and DS component types.
- Stable `ds_id` values.
- Data bindings, labels, user actions, and criticality.
- Boundary states such as loading, empty, error, offline, permission denied, and validation states when required.

Rules:

- Every testable DS component must have a unique `ds_id`.
- Do not use placeholders such as lorem ipsum, John Doe, or Acme Corp.
- Do not silently invent DS components when the registry contradicts the PRD; report conflicts.

### 1.3 Mermaid Logic Machine Requirements

The Mermaid block owns:

- User-triggered events.
- API success/error outcomes.
- Retry, cancel, back, and recovery paths.
- Permission or validation branches.
- Journey-level state transitions used by QA.

Rules:

- Every YAML `action` should appear as a Mermaid event unless explicitly documented as non-transition behavior.
- Every Mermaid `EVENT_*` should map back to a YAML component action.
- Error and recovery paths are mandatory when the PRD references asynchronous operations.

### 1.4 Derived Gate A Artifacts

Generate or verify these derived artifacts under `docs/design/contracts/{feature}/`:

| Artifact | Purpose |
| --- | --- |
| `review-diagrams.md` | Human-readable Mermaid review diagrams for screen/component/state/action coverage |
| `flow.md` | Extracted Mermaid Logic Machine in Markdown |
| `storyboards.json` | Replayable trajectories for PRD journeys and error paths |
| `layout-rules.json` | Machine-readable layout and responsive constraints |
| `component-map.json` | YAML component/`ds_id` map for implementation and QA |
| `context-slices/**/*.yaml` | Optional prompt-safe YAML slices derived from large compiled artifacts |
| `prd-ds-conflicts.md` | PRD ↔ DS conflict list and resolution owner |
| `preview/index.html` | Simple human-checkable UI preview |
| `preview/preview-manifest.json` | Parsed preview summary and warnings |

Do not create new ASCII wireframes or ASCII user-flow artifacts for the schema-driven pipeline.

### 1.5 PRD ↔ Design System Conflict Detection

Before Gate A, scan for conflicts:

1. PRD styling requirements that conflict with DS tokens.
2. Required components missing from the DS registry.
3. Layout or interaction requirements unsupported by current DS patterns.

Emit unresolved items in `prd-ds-conflicts.md` with a resolution owner: update token, local override, update PRD, or add DS component.

## Output

| Artifact | Path |
| --- | --- |
| UI Contract | `docs/design/contracts/{feature}/ui-contract.md` |
| Review diagrams | `docs/design/contracts/{feature}/review-diagrams.md` |
| Flow diagram | `docs/design/contracts/{feature}/flow.md` |
| Storyboards | `docs/design/contracts/{feature}/storyboards.json` |
| Layout rules | `docs/design/contracts/{feature}/layout-rules.json` |
| Component map | `docs/design/contracts/{feature}/component-map.json` |
| Context slices | `docs/design/contracts/{feature}/context-slices/**/*.yaml` |
| Conflict report | `docs/design/contracts/{feature}/prd-ds-conflicts.md` |
| Preview | `docs/design/contracts/{feature}/preview/index.html` |
| Preview manifest | `docs/design/contracts/{feature}/preview/preview-manifest.json` |

### Contract Quality Score Template

```json
{
  "contract_quality": {
    "yaml_block_count": 1,
    "mermaid_block_count": 1,
    "duplicate_ds_ids": 0,
    "yaml_actions_without_mermaid_events": 0,
    "storyboard_trajectories_count": 3,
    "conflict_items_resolved_at_gate_a": 1,
    "preview_warnings": 0,
    "quality_score": 90
  }
}
```

## Switching Rules

| Product Type | Additional Requirements |
| --- | --- |
| Web | Routes and responsive breakpoints mandatory |
| Mobile native | Screen IDs, orientation, safe-area rules |
| PWA | Offline and rehydration transitions |

See [product-switching.md](./product-switching.md) for full details.

## Next Step

→ [g2-contract-compile.md](./g2-contract-compile.md)
