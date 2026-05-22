# Step 2 — Contract Compiler

<!-- beads-id: br-gatecheck-g2 -->

> **Pipeline position:** Step 2 of 12 • Requires → Step 1 output • Leads to → Gate A (Plan Approval)

## Input

- `docs/design/contracts/{feature}/ui-contract.md`
- `docs/design/contracts/{feature}/flow.md`
- `docs/design/contracts/{feature}/component-map.json`
- `docs/design/contracts/{feature}/storyboards.json`
- `docs/design/contracts/{feature}/review-diagrams.md`

## Processing

### 2.1 Validate Contract Container

Verify:

- `ui-contract.md` exists.
- Exactly one fenced YAML block exists.
- Exactly one fenced Mermaid block exists.
- YAML parses to a mapping/object.
- Mermaid contains meaningful transitions.
- YAML actions and Mermaid `EVENT_*` values are mutually covered or documented.

### 2.2 Compile to Executable Layout Rules

Transform the YAML View Blueprint and Mermaid Logic Machine into `layout-rules.json`:

```json
{
  "source": "ui-contract.md",
  "viewports": ["mobile", "tablet", "desktop"],
  "position_rules": [
    { "type": "above", "a": "ds:comp:top-nav-001", "b": "ds:comp:kpi-cards-001" }
  ],
  "visibility_rules": [
    { "component": "ds:comp:primary-cta-001", "states": ["default"], "visible": true },
    { "component": "ds:comp:empty-state-001", "states": ["empty"], "visible": true }
  ],
  "responsive_rules": [
    { "viewport": "mobile", "overrides": [{ "type": "stacked", "components": ["ds:comp:chart-001", "ds:comp:table-001"] }] }
  ],
  "state_transition_rules": [
    { "from": "Loading", "to": "Default", "trigger": "API_SUCCESS" },
    { "from": "Loading", "to": "Error", "trigger": "API_ERROR" }
  ]
}
```

### 2.3 Generate Artifact Index and Context Slices

Always emit `docs/design/contracts/{feature}/artifact-index.json` and YAML slices under `docs/design/contracts/{feature}/context-slices/`:

```text
summary/contract-summary.yaml
components/{ds_id}.yaml
storyboards/{trajectory_id}.yaml
layout/{screen}--{state}--{viewport}.yaml
```

Each slice must reference `source: ui-contract.md` and contain only the rows needed for one build or fix boundary. These slices are for agent context; the JSON artifacts remain the machine-executable test inputs. `artifact-index.json` must classify every artifact as `canonical_source`, `review_artifact`, `machine_evidence`, or `slice`, and must specify `load_policy: full | summary_only | lookup_only`.

Also generate `storyboards-review.html` or `storyboards-review.md` so Gate A reviewers inspect trajectories visually instead of reading raw JSON.

### 2.4 Generate Assertion Checklist

Create a human-readable checklist at `docs/design/test-plans/{feature}.assertion-checklist.md`:

```markdown
## Assertion Checklist — feature-x

<!-- beads-id: br-test-feature-x-assertions -->

- [ ] `ds:comp:top-nav-001` appears above `ds:comp:kpi-cards-001` on desktop and tablet.
- [ ] `ds:comp:chart-001` stacks above `ds:comp:table-001` on mobile.
- [ ] `ds:comp:empty-state-001` is visible in empty state.
- [ ] `EVENT_REFRESH_CLICK` transitions from Default to Loading.
```

### 2.5 Ambiguity Detection

If any rule cannot be compiled unambiguously, flag it and return to Step 1:

```text
AMBIGUOUS_RULE: component ds:comp:sidebar-filter-001 appears in storyboards.json but not in YAML View Blueprint.
```

Common ambiguity causes:

- Component in `component-map.json` missing from YAML.
- Storyboard target has no `ds_id` in the YAML tree.
- Layout rule references a viewport not declared in YAML.
- Mermaid event has no YAML action source.

## Output

| Artifact | Path |
| --- | --- |
| Layout rules machine evidence | `docs/design/contracts/{feature}/layout-rules.json` |
| Artifact index | `docs/design/contracts/{feature}/artifact-index.json` |
| Context slices | `docs/design/contracts/{feature}/context-slices/**/*.yaml` |
| Storyboard review view | `docs/design/contracts/{feature}/storyboards-review.html` or `.md` |
| Assertion checklist | `docs/design/test-plans/{feature}.assertion-checklist.md` |

## Switching Rules

- If `AMBIGUOUS_RULE` is flagged → do not proceed; return to Step 1.
- If large machine artifacts lack `artifact-index.json`, `context-slices/`, or storyboard review output → do not proceed; return to Step 1/2.
- If compile succeeds and preview/review artifacts exist → proceed to Gate A.

## Next Step

→ [gate-a-plan-approval.md](./gate-a-plan-approval.md)
