---
description: SAFe 6.0 Agentic UI/UX Convergence Pipeline — full PRD-to-merge cycle using the Ralph Loop (Antigravity Task-Mode)
---

# /gsafe-uiux-ralph-loop-antigravity
> **Architecture Layer:** LAYER 2 (Orchestration Branches) -> LAYER 3 (Details)
> **Formal Title:** SAFe 6.0 Agentic UI/UX Convergence Pipeline (Antigravity Task-Mode)
> **Skills required:** `design-system-gatecheck` · `agenticse-design-system`
> **Reference:** `docs/researches/spikes/spike-design-system-ralph-loop-agent.md`

## 3-Layer Agent Comprehension Pyramid for this Workflow

To execute this workflow without hallucinating, read it top-down:

```text
====================================================================================================
                        WORKFLOW 3-LAYER COMPREHENSION PYRAMID
====================================================================================================

               /\               [ LAYER 1: THE SKELETON (Purpose & Methodology) ]
              /  \              Purpose: Orchestrate full UI/UX PRD-to-Merge cycle.
             /    \             Methodology: Two-Stage Ralph Loop.
            /      \            
           /────────\           
          /          \          [ LAYER 2: THE BRANCHES (ASCII Map of Tasks) ]
         /            \         Function: Look at the map below to understand the sequence of 
        /              \                  Tasks and Gates. Select your branch based on your state.
       /                \       
      /                  \      [ LAYER 3: THE DETAILS (Current Step Execution) ]
     /────────────────────\     Function: The actual markdown instructions below (e.g. Stage 1,
    /                      \              Stage 2). Only read the specific Task/Stage you are in.
====================================================================================================

[ LAYER 2 ASCII MAP: ORCHESTRATION PIPELINE ]
  START
    │
    ▼
[ Stage 1: The PRD / Low-Fi Loop ]
  - Step 0: Intake & Validate
  - Step 1: Text to ASCII UI/UX
  - Step 2: Compile Contract
    │
    ▼
< Gate A: Human UX Approval > ──(Reject)──► Loop back to Stage 1
    │ (Approve)
    ▼
[ Stage 2: The Implementation / Hi-Fi Loop ]
  - Implementor: Builds HTML/CSS
  - Evaluator: Automated QA & Scoring
    │
    ▼
{ DoD Score >= 95 & Zero P0? } ──(No)──► Loop back to Implementor
    │ (Yes)
    ▼
< Gate B: Final Human Approval > ──(Reject)──► Loop back to Evaluator
    │ (Approve)
    ▼
   END
====================================================================================================
```

This workflow orchestrates the full UI/UX implementation cycle: from PRD intake through iterative agent implementation (the **Ralph Loop**) to human-approved merge. The Antigravity Agent self-orchestrates via explicit `task_boundary` declarations — no sub-agents are spawned.

**Agent Comprehension Directive:** As you read this workflow, recognize you are navigating Layer 2 (The Branches) to determine exactly *when* to execute Layer 3 (The detailed rules inside the Agent Skills). Do not hallucinate steps outside of these bounds. Use the ASCII Map above to select your current stage, and ONLY read the instructions for that stage.

---

## When to use this workflow

- Implementing a new UI screen or feature against a PRD
- Running a UI/UX quality gate before merging a design system change
- Collecting graded (positive/negative) rollout trajectories for Agent RFT training
- Auditing an existing implementation against the Design System contract

---

## Pre-conditions (check before starting)

- [ ] PRD exists at `docs/PRDs/<feature-x>.md` with: beads-id, user journeys, acceptance criteria, state matrix, and text-based ASCII User Flows

- [ ] Design System tokens are up-to-date at `packages/design-system/design-tokens.json`
- [ ] Playwright environment is configured (see `design-system-gatecheck` → `g3-env-deterministic.md`)
- [ ] (Optional) Baseline scores documented at `docs/eval-dataset/baseline-scores.json`

---

## Task 0 — Baseline Grounding (First Run Only)

> Skip this task if `docs/eval-dataset/baseline-scores.json` already exists.

Before the first RFT-active Ralph Loop run:

1. Run the Implementor (`agenticse-design-system`) on 5–10 representative PRD tasks **without** any feedback loop.
2. Record the raw DoD scores in `docs/eval-dataset/baseline-scores.json`.
3. Only activate RFT training (positive/negative labeling of trajectories) after baseline is documented.

---

## Stage 1 — The PRD / Low-Fi Ralph Loop

**Agent switches to: `design-system-gatecheck` skill**

```
task_boundary("Stage 1: PRD & Low-Fi Loop", EXECUTION)
```

### Steps

**Step 0 — PRD Normalization (`g0-intake-normalize`)**
- Parse PRD, extract `beads-id`, normalize URIs and states.
- Surface `PRD_DS_CONFLICT` list: any PRD directive that conflicts with an existing Design System token.
- Validate PRD Completeness. If missing required fields, trigger the **PRD Completeness Ralph Loop**: dispatch a PRD Writer Agent to iteratively fix and complete the PRD until all gaps are resolved.
- Present conflicts to human for resolution **before any code is written**.
  - Options: (a) update token, (b) use local CSS override for this feature, (c) update PRD.

**Step 1 — Contract Generation (`g1-contract-generation`)**
- Generate ASCII layout wireframes and ASCII User Flows for each screen/state.
- Generate `storyboard_trajectories[]` — **mandatory**, at least 1 per feature.
- Save: `docs/design/contracts/feature-x.storyboards.json`

**Step 2 — Contract Compile (`g2-contract-compile`)**
- Compile contract to `layout-rules.json` (machine-executable position/visibility/overlap/state rules).
- Generate `assertion-checklist.md`.

**Gate A — Human UX Concept Approval**

```
notify_user(BlockedOnUser: true)
```

Present to human reviewer:
- ASCII wireframes (state layouts and user flows)
- JSON Storyboard click paths
- PRD_DS_CONFLICT resolution log
- Test plan with coverage matrix

Gate A auto-fails if:
- `storyboard_trajectories[]` is absent
- Any `PRD_DS_CONFLICT` is unresolved
- Evaluator self-check fails (axe-core URL valid, layout-rules.json parsed without errors)

Human decisions: `APPROVE` → Task 2 | `REJECT_FIX_CONTRACT` → back to Step 1 | `REJECT_FIX_PRD` → back to Step 0

---

## Stage 2 — The Implementation / Hi-Fi Ralph Loop

**Agent alternates between: `agenticse-design-system` (Build) and `design-system-gatecheck` (Audit)**

```
task_boundary("Stage 2: Hi-Fi Ralph Loop", EXECUTION)
```

This task is explicitly bounded. The agent does NOT run indefinitely.

### W0 — Plan Declaration Gate (Mandatory Before Any Code)

Implementor emits `docs/design/plan-declaration.json`:

```json
{
  "rollout_id": "rl-YYYY-MM-DD-NNN",
  "prd_beads_id": "br-xxx",
  "contract_version": "feature-x.contract.yaml",
  "build_sequence": [
    { "step": 1, "component": "ds:comp:top-nav-001", "type": "structural", "tokens_first": true },
    { "step": 2, "component": "ds:comp:kpi-cards-001", "type": "data-display" }
  ],
  "states_to_implement": ["default", "loading", "empty", "error"],
  "risks": ["..."],
  "tool_budget_estimate": 6
}
```

Gatecheck validates: all `required[]` component IDs from contract present in `build_sequence`.
If `PLAN_REJECTED` → Implementor revises plan before writing any HTML/CSS.

---

### Sub-Task 2A — Build (`agenticse-design-system`)

**Skill workflows invoked:** W1 (Discover & Plan) → W2 (Create & Build)

1. Read `layout-rules.json` and PRD_DS_CONFLICT resolutions.
2. Implement HTML/CSS/Tokens in strict DS token order (no hardcoded hex).
3. **Self-Verification Checklist** before handoff (worth +5 bonus points):
   - `[SELF-CHECK] CSS lint: PASS / N violations`
   - `[SELF-CHECK] Playwright preview captured: path/to/preview.png`
   - `[SELF-CHECK] Pre-submission: token_violations=0, hardcoded_hex=0, P0_from_prior_resolved=true`

---

### Sub-Task 2B — Audit (`design-system-gatecheck`)

**Steps run in sequence with Tier Gate Enforcement:**

| Step | Rule | Tier | Gate Logic |
|---|---|---|---|
| 3 | `g3-env-deterministic` | Setup | Lock fonts, mock data, disable animations |
| 4 | `g4-conformance-test` | Tier 1 | DOM conformance. **If FAIL_P0 → skip Steps 5-7** |
| 5 | `g5-visual-diff` | Tier 2 | Screenshot diff. **If FAIL_P0 → skip Step 6** |
| 6 | `g6-flow-navigation` | Tier 2 | Storyboard trajectories + dynamic state injection |
| 7 | `g7-a11y-contrast` | Tier 1 | axe-core + contrast. `SKIPPED_TOOL_ERROR` if axe crashes |
| 8 | `g8-scoring-policy` | Engine | 6-pillar score, pillar deltas, anti-hacking check |

**Scoring rules:**
- P0 violations: `score -= P0_count × 20` (gradient, never binary zero)
- Safety Pillar 6: injection defense + bias check + implementor self-verification bonus (+5)
- Anti-hacking: 6-class AST + judge-LM check (template cloning, screenshot injection, pre-injected IDs, empty components, token-stuffed traces, circular CSS)
- Every scorecard emission: `rollout_id` + `scorecard_schema_version: "1.1"` + `pillar_deltas`
- At iteration ≥ 2: re-run all previously-passing assertions → any failure = `REGRESSION / P0`

**Scorecard emits prioritized fix queue:** `p0_fixes` → `p1_fixes` → `p2_fixes`
Implementor MUST process `p0_fixes` completely before touching `p1_fixes`.

---

### Loop Convergence Decision

| Condition | Action |
|---|---|
| Score ≥ 95 AND P0 == 0 | `GATE_B_READY` → proceed to Task 3 |
| Score improves ≥ 5 pts | +1 retry allowed (max cap: 6 retries total) |
| Score plateau ≤ 1 pt for 2 consecutive iterations | `LOOP_STALLED` → escalate to Gate B immediately |
| `score[N] < score[N-1]` | `REGRESSION_DETECTED` → restore N-1 snapshot, send only regression delta to Implementor |
| Wall clock > 30 min (standard) / 60 min (complex) | `LOOP_TIMEOUT` → freeze best snapshot, escalate to Gate B |
| High-stakes feature | Run 3 independent rollouts → Best-of-N selected |

All graded rollouts saved to `docs/rft-dataset/{prd_id}/` using schema v1.0 (positive label if score ≥ 95, negative if score < 80).

---

## Task 3 — Agile Refine

**Agent compares implementation against PRD**

```
task_boundary("Task 3: Agile Refine", EXECUTION)
```

1. **PRD Journey Coverage Matrix:** For each user journey in the PRD, verify:
   - Storyboard trajectory exists
   - Trajectory was executed
   - Trajectory passed
   - Output: `docs/design/test-plans/prd-coverage-matrix.csv`
   - Any `NOT_COVERED` journey **blocks Gate B approval**.

2. Generate `docs/design/latest-ui-handover.md`:
   - Must contain `## Missing States` section if any states uncovered
   - Must contain `## PRD Delta` section listing any implementation gaps
   - `text_output_match_score` checked against required sections

3. Compute Task Success Rate:
   - `TSR = converged_runs / total_runs`
   - Log to `docs/eval-dataset/tsr-log.md`
   - Alert if TSR < 70% for 3 consecutive weeks

---

## Task 4 — Gate B & Handoff

**Agent presents structured human scorecard**

```
task_boundary("Task 4: Gate B & Handoff", EXECUTION)
notify_user(BlockedOnUser: true)
```

### What to present

- Overall score + convergence status (`GATE_B_READY` / `LOOP_STALLED` / `LOOP_TIMEOUT`)
- Pillar Delta convergence curves (per-pillar improvement across iterations)
- P0 defects remaining (if any) with attribution (`implementor` vs `evaluator_env`)
- `TOOL_FAILURE` events (graceful degradation log)
- `NOT_COVERED` PRD journeys (blocks approval if present)
- Autonomy score: `human_interruptions` count during the loop
- Visual diff gallery

### Structured Human Scorecard (replaces binary approve/reject)

Rate each criterion **1–5**. Minimum average **3.5 / 5.0** required to approve:

| # | Criterion | Min |
|---|---|---|
| 1 | Visual brand fit | ≥ 3 |
| 2 | Copy clarity | ≥ 3 |
| 3 | Interaction intuitiveness | ≥ 3.5 |
| 4 | Safety & edge case handling | ≥ 4 |
| 5 | Production readiness | ≥ 3.5 |

### Human decisions

| Decision | Code | Condition | Next Step |
|---|---|---|---|
| ✅ Approve | `APPROVE_TEST_RESULT` | avg ≥ 3.5 AND no implementor P0 | → Merge |
| 🔄 Request Fix | `REQUEST_FIX` | any criterion < 2 OR implementor P0 | → back to Task 2, Step 4 |
| ✅ Approve + Update Baseline | `APPROVE_WITH_BASELINE_UPDATE` | intentional UI change, avg ≥ 3.5 | → Update baselines + Merge |

Log decision to `docs/design/reports/feature-x-approval-log.md`.

---

## CI Integration (Continuous Guard)

File: `.github/workflows/ralph-loop-ci.yml`

- **On push:** Tier 1 DOM conformance + A11y tests run automatically
- **On PR:** Tier 1 → (if pass) → Tier 2 trajectory tests → scorecard artifact uploaded
- **Branch protection:** merge blocked if `total_score < 80` OR `p0_violations > 0`

---

## Definition of Done

- [ ] Gate A approved: contract, storyboards, conflict resolutions
- [ ] Ralph Loop converged (Score ≥ 95, P0 == 0) OR human reviewed `LOOP_STALLED`/`LOOP_TIMEOUT` escalation
- [ ] PRD Journey Coverage Matrix shows 100% covered
- [ ] Gate B human scorecard average ≥ 3.5
- [ ] Approval log written to `feature-x-approval-log.md`
- [ ] RFT trajectories saved to `docs/rft-dataset/{prd_id}/`
- [ ] CI pipeline passes

---

## Key Files Reference

| File | Purpose |
|---|---|
| `docs/design/plan-declaration.json` | W0 mandatory plan before code |
| `docs/design/contracts/feature-x.contract.yaml` | UI Contract |
| `docs/design/contracts/feature-x.storyboards.json` | Storyboard trajectories |
| `docs/design/contracts/feature-x.layout-rules.json` | Machine-executable rules |
| `docs/design/reports/feature-x-scorecard.json` | DoD scorecard (v1.1) |
| `docs/design/reports/prd-coverage-matrix.csv` | PRD journey coverage |
| `docs/design/reports/feature-x-approval-log.md` | Gate B decision log |
| `docs/rft-dataset/{prd_id}/` | RFT training trajectories |
| `docs/eval-dataset/baseline-scores.json` | Pre-loop baseline scores |
| `docs/eval-dataset/tsr-log.md` | Task Success Rate history |
