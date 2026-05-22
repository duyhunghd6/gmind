# Gate A — Early Concept UX Validation

<!-- beads-id: br-gatecheck-gate-a -->

> **Pipeline position:** Between Step 2 and Step 3 • **BLOCKS pipeline until human approves.**

## Purpose

Gate A is the User Experience checkpoint before Stage 2 implementation. It ensures the human reviewer agrees with the schema-driven low-fidelity contract package: `ui-contract.md`, Mermaid review diagrams, JSON storyboards, layout rules, component map, conflict report, assertion checklist, and preview output.

## Input

All artifacts from Steps 0–2:

| Artifact | Path |
| --- | --- |
| PRD | `docs/PRDs/{feature}.md` or normalized PRD output |
| UI Contract | `docs/design/contracts/{feature}/ui-contract.md` |
| Review diagrams | `docs/design/contracts/{feature}/review-diagrams.md` |
| Flow diagram | `docs/design/contracts/{feature}/flow.md` |
| JSON storyboards | `docs/design/contracts/{feature}/storyboards.json` |
| Component map | `docs/design/contracts/{feature}/component-map.json` |
| Layout rules | `docs/design/contracts/{feature}/layout-rules.json` |
| Conflict report | `docs/design/contracts/{feature}/prd-ds-conflicts.md` |
| Assertion checklist | `docs/design/contracts/{feature}/assertion-checklist.md` |
| Preview | `docs/design/contracts/{feature}/preview/index.html` |
| Preview manifest | `docs/design/contracts/{feature}/preview/preview-manifest.json` |

## Processing

### A.1 Generate Test Plan

Create a comprehensive test plan document:

```markdown
## Test Plan — feature-x

<!-- beads-id: br-test-feature-x-plan -->

### Test Matrix

| Screen | State | Viewport | Theme | Locale |
| --- | --- | --- | --- | --- |
| /dashboard | default | mobile | light | en |
| /dashboard | loading | desktop | dark | en |
| /dashboard | error | mobile | light | en |

### Coverage Summary

- YAML screens covered: 3 / 3
- Mermaid events covered: 12 / 12
- Storyboard trajectories: 4
- Viewports: mobile, tablet, desktop
- Preview warnings: 0

### Severity Policy

- P0: Missing critical component, broken required transition, missing state, unresolved PRD/DS conflict
- P1: Non-critical layout deviation, incomplete preview warning assignment
- P2: Minor copy, spacing, or documentation issue
```

### A.2 Assign Severity Policy

Map P0/P1/P2 severity levels per test category. Use [pass-fail-policy.md](./pass-fail-policy.md).

### A.3 Present to Human Reviewer

Present:

1. The test plan summary.
2. `ui-contract.md`, focusing on YAML view structure and Mermaid state logic.
3. `review-diagrams.md`, focusing on screen/component/state/action coverage.
4. `storyboards.json`, focusing on click paths and recovery logic.
5. `preview/index.html`, focusing on human-checkable structure rather than final visual polish.
6. `prd-ds-conflicts.md`, focusing on human-agreed conflict resolution.
7. Links to all Gate A artifacts.

## Gate Check Decision

| Decision | Action | Next Step |
| --- | --- | --- |
| APPROVE | Contract package is correct and complete | Step 3 (Environment Setup) |
| REJECT — Fix Contract | YAML/Mermaid/derived artifacts have errors | Return to Step 1 or Step 2 |
| REJECT — Fix PRD | PRD is incomplete or contradictory | Return to Step 0 |

## PASS Criteria

- [ ] `ui-contract.md` has exactly one YAML block and one Mermaid block.
- [ ] YAML screens, routes, states, components, `ds_id`s, bindings, and actions match PRD intent.
- [ ] Mermaid Logic Machine covers user actions, API outcomes, retry/error/back paths, and special states.
- [ ] Review diagrams clearly expose screen hierarchy, state coverage, and action/event links.
- [ ] Storyboards include at least one trajectory per major PRD journey and relevant error/recovery paths.
- [ ] Component map covers every YAML `ds_id` exactly once.
- [ ] Layout rules compile without ambiguous references.
- [ ] Preview script has produced `preview/index.html` and `preview-manifest.json`.
- [ ] PRD/DS conflicts are resolved, assigned, or explicitly deferred by human decision.
- [ ] Expected reasoning quality is documented for Stage 2 implementors.

## FAIL Triggers

- Missing PRD screen or required state.
- Duplicate `ds_id`.
- YAML action missing from Mermaid events.
- Mermaid `EVENT_*` missing YAML action source.
- Storyboard target missing from component map.
- Layout rule references unknown viewport/component.
- Unresolved PRD/DS conflict without owner.
- Preview parser fails.

## Attribution Log

Every failed assertion during the Ralph Loop must be attributed:

```markdown
## Attribution Protocol

For each test failure in Steps 4–7, log:
- `attributed_to: "implementor" | "evaluator_env" | "contract" | "unknown"`
- `evidence: "<why this attribution was made>"`

If `attributed_to: "evaluator_env"`, the score is not penalized and the iteration does not count against the retry cap.
```

## Output

| Artifact | Path |
| --- | --- |
| Test plan | `docs/design/test-plans/{feature}.plan.md` |
| Coverage matrix | `docs/design/test-plans/{feature}.coverage-matrix.csv` |

## Next Step After APPROVE

→ [g3-env-deterministic.md](./g3-env-deterministic.md)
