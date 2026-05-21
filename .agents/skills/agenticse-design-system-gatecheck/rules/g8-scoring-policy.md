# Step 8 — Scoring & Policy Engine

<!-- beads-id: br-gatecheck-g8 -->

> **Pipeline position:** Step 8 of 12 • Requires → Steps 4–7 reports • Leads to → Gate B (Result Approval)

## Input

All test reports from Steps 4–7 plus the Stage 1 contract package:

| Report | Source Step |
| --- | --- |
| `<e2e-testing-root>/uiux-gatecheck/reports/conformance.json` | Step 4 |
| `<e2e-testing-root>/uiux-gatecheck/reports/visual-summary.json` | Step 5 |
| `<e2e-testing-root>/uiux-gatecheck/reports/navigation-graph.json` | Step 6 |
| `<e2e-testing-root>/uiux-gatecheck/reports/a11y.json` | Step 7 |
| `<e2e-testing-root>/uiux-gatecheck/reports/contrast.csv` | Step 7 |
| `docs/design/contracts/{feature}/ui-contract.md` | Stage 1 |
| `docs/design/contracts/{feature}/component-map.json` | Stage 1 |
| `docs/design/contracts/{feature}/storyboards.json` | Stage 1 |

## Processing

### 8.1 Normalize Defects by Taxonomy

| Category | Examples |
| --- | --- |
| Contract | Missing `data-ds-id`, wrong screen state, handler absent for Mermaid event |
| Layout | Element ordering wrong, overflow, spacing deviation |
| Visual | Pixel diff above threshold, wrong token, font mismatch |
| Navigation | Dead-end, modal trap, broken back/retry path |
| Accessibility | Missing labels, contrast failure, no focus indicator |
| Responsive | Mobile layout broken, safe-area violation |

### 8.2 Calculate Ralph Loop DoD Score

Apply the strict 100-point matrix. P0 violations deduct proportionally; they do not force a binary zero score. Gate B approval remains blocked while any P0 exists.

| Pillar | Category | Max Score | Guidelines |
| --- | --- | ---: | --- |
| 1 | Contract Conformance | 30 | Components, `data-ds-id`, labels, bindings, and handlers match `ui-contract.md` and `component-map.json` |
| 2 | Visual & Token Fidelity | 20 | DS token/class use, visual diff pass, rhythm/spacing |
| 3 | Accessibility & Contrast | 20 | WCAG, focus, ARIA, keyboard operation |
| 4 | Flow & State Integrity | 15 | Mermaid transitions, storyboards, and state matrix are implemented |
| 5 | Efficiency & Completeness | 10 | No stubs, no placeholder hacks, file-size and tool budget discipline |
| 6 | Self-Verification Bonus | +5 | Lint/check run, browser preview, pre-submission checklist |

Final normalized score is capped at 100.

### 8.3 Tool-Verified Scoring Mandate

Each pillar must have at least one mechanical evidence check. If a pillar has no evidence, cap that pillar at 50%.

| Pillar | Required Evidence |
| --- | --- |
| Contract Conformance | grep `data-ds-id` in implementation vs `component-map.json` and YAML `ds_id`s |
| Visual & Token Fidelity | extract `var(--*)` tokens and compare to DS manifest; inspect screenshot diff |
| Accessibility | DOM/source check for landmarks, headings, labels, focus, contrast report |
| Flow & State Integrity | verify storyboards and Mermaid events map to handlers/states |
| Efficiency & Completeness | scan for TODO/stub placeholders and validate file-size split |

For Stage 1 contract quality scoring, required checks are:

| Pillar | Required Evidence |
| --- | --- |
| Container Validity | `ui-contract.md` has exactly one YAML and one Mermaid block |
| PRD Coverage | YAML screens/routes/states trace PRD requirements |
| Component Traceability | unique `ds_id`s and `component-map.json` parity |
| Logic Coverage | Mermaid events cover YAML actions and recovery paths |
| Derived Artifact Consistency | storyboards, layout rules, flow, review diagrams, and preview derive from `ui-contract.md` |
| Conflict & Preview Readiness | conflict report actionable and preview manifest warnings resolved/assigned |

### 8.4 Convergence Threshold

| Condition | Action |
| --- | --- |
| Score ≥ 95 and P0 == 0 and QA_PASS | Propose `GATE_B_READY` |
| Score < 95 or P0 > 0 | Propose `RALPH_LOOP_CONTINUE` with prioritized fix queue |
| P1 > 1 | Continue unless explicitly accepted by human reviewer |
| score[N] < score[N-1] | Emit `REGRESSION_DETECTED` and route targeted fixes |

### 8.5 Cross-Iteration Regression Check

For each iteration ≥ 2:

1. Load the prior scorecard.
2. Re-execute previously passing assertions.
3. If any fail, add a P0 `REGRESSION` fix.
4. Include `regressions_detected` in the scorecard.

### 8.6 Generate Summary Report

Create a unified report with:

- Overall score and convergence recommendation.
- Pillar deltas for iterations ≥ 2.
- Trajectory/tool-call stats.
- Defects sorted by severity.
- Screenshot evidence.
- Links to `ui-contract.md`, implementation files, and mechanical evidence summaries from `component-map.json`, `storyboards.json`, and `layout-rules.json`.

## Output

| Artifact | Path |
| --- | --- |
| UIUX report | `docs/design/reports/{feature}-uiux-report.html` |
| Scorecard | `docs/design/reports/{feature}-scorecard.json` |
| Iter snapshot | `docs/design/reports/{feature}-scorecard-iter-{N}.json` |
| PR comment | Auto-generated summary for PR |

## Scorecard JSON Schema

```json
{
  "scorecard_schema_version": "1.3",
  "rollout_id": "rl-2026-03-12-001",
  "iteration": 2,
  "total_score": 88,
  "status": "RALPH_LOOP_CONTINUE",
  "p0_violations": 1,
  "p1_violations": 2,
  "regressions_detected": [],
  "pillar_scores": {
    "contract_conformance": 25,
    "visual_token_fidelity": 18,
    "accessibility_contrast": 15,
    "flow_state_integrity": 12,
    "efficiency_completeness": 8,
    "self_verification_bonus": 5
  },
  "tool_evidence": [
    {
      "pillar": "contract_conformance",
      "tool": "grep_search",
      "result": "found 14 data-ds-id values, expected 14 from component-map.json",
      "score_impact": "full"
    }
  ],
  "p0_fixes": [
    "REGRESSION: ds:comp:top-nav-001 missing; it passed in iter-1."
  ],
  "self_verification_signals": {
    "lint_run": true,
    "browser_preview": true,
    "pre_submission_log": true,
    "bonus_awarded": 5
  }
}
```

## Switching Rules

- Score ≥ 95 and P0 == 0 → propose `GATE_B_READY` at Gate B.
- Score < 95 or any P0 → output `RALPH_LOOP_CONTINUE` with prioritized fixes.
- `REGRESSION_DETECTED` → route only regression deltas.
- Loop SLA exceeded → emit `LOOP_TIMEOUT` and escalate with best snapshot.

## Next Step

→ [gate-b-result-approval.md](./gate-b-result-approval.md)
