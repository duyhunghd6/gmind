---
description: Ralph Loop Stage 2 — Hi-Fi Implementation through Gate B. Orchestrates BUILD↔AUDIT loop, Agile Refine, and Final Human Approval.
---

# Ralph Loop Stage 2: Contract → Hi-Fi Implementation → Gate B

<!-- beads-id: br-workflow-ralph-loop-stage2 -->

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 3-LAYER AGENT COMPREHENSION PYRAMID                        │
│                                                                             │
│                    /\        LAYER 1: ROOT METHODOLOGY                     │
│                   /  \       spike-design-system-ralph-loop-agent.md        │
│                  /    \      "WHY & WHAT" — Theory, DoD, RFT, 3-Tier Eval  │
│                 /──────\                                                    │
│                /        \    LAYER 2: ORCHESTRATION                         │
│               /          \   gsafe-uiux-ralph-loop-antigravity.md (main)    │
│              /            \                                                 │
│             /   Sub-wf:    \  ├── gsafe-uiux-ralph-loop-stage1.md          │
│            /   YOU ARE HERE \ └── gsafe-uiux-ralph-loop-stage2.md ◄── HERE │
│           /──────────────────\                                              │
│          /                    \  LAYER 3: EXECUTOR SKILLS                  │
│         / Gatecheck (Evaluator) \ design-system-gatecheck/                 │
│        / Implementor (Builder)   \ agenticse-design-system/                │
│       /──────────────────────────\ "HOW" — Rules, Steps, Standards         │
│                                                                             │
│  >> AGENT DIRECTIVE:                                                       │
│  >> You are at LAYER 2 (sub-workflow). This file orchestrates Stage 2.     │
│  >> For BUILD steps: read agenticse-design-system skill rules.             │
│  >> For AUDIT steps: read design-system-gatecheck skill rules.             │
│  >> Each step below tells you EXACTLY which rule file to read.             │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **SAFe 6.0 Phase:** Continuous Integration — Iterate & Learn
> **Skills Used:** `agenticse-design-system` (Implementor) + `design-system-gatecheck` (Evaluator)
> **Outcome:** Human-approved Hi-Fi UI, merge-ready

## Preconditions

- [ ] Gate A approved (Stage 1 complete)
- [ ] The following immutable contract artifacts exist (using GAP-46 subdirectory convention):
  - `docs/design/contracts/{feature-x}/contract.yaml`
  - `docs/design/contracts/{feature-x}/wireframes/` (ASCII wireframe files)
  - `docs/design/contracts/{feature-x}/user-flows/` (ASCII user flow files)
  - `docs/design/contracts/{feature-x}/storyboards.json`
  - `docs/design/contracts/{feature-x}/layout-rules.json`
  - `docs/design/contracts/{feature-x}/component-map.json`
  - `docs/design/test-plans/feature-x.assertion-checklist.md`
  - `docs/design/test-plans/feature-x.coverage-matrix.csv`

## Architecture Overview

```text
┌═══════════════════════════════════════════════════════════════════════════════┐
║                        RALPH LOOP STAGE 2 (Hi-Fi)                           ║
║                                                                              ║
║  ┌─ W0 PLAN DECLARATION GATE ──────────────────────────────────────────┐    ║
║  │ Implementor emits plan-declaration.json                             │    ║
║  │ Evaluator validates: all data-ds-id in build_sequence?              │    ║
║  │ PLAN_REJECTED → revise plan BEFORE any code                        │    ║
║  └──────────────────────────────────────┬──────────────────────────────┘    ║
║                                         │ PLAN_APPROVED                      ║
║                                         v                                    ║
║  ┌─ Sub-Task 2A: BUILD ─────────────────────────────────────────────┐      ║
║  │ Implementor (agenticse-design-system): W1→W2                     │      ║
║  │ Read layout-rules.json → Write HTML/CSS/Tokens                   │      ║
║  │ Self-Verification: CSS lint → Playwright preview → log           │      ║
║  └──────────────────────────────────────┬───────────────────────────┘      ║
║                                         v                                    ║
║  ┌─ Sub-Task 2B: AUDIT ─────────────────────────────────────────────┐      ║
║  │ Evaluator (design-system-gatecheck): g3→g8                       │      ║
║  │ g3: Env setup → g4: DOM Conformance → g5: Visual Diff            │      ║
║  │ g6: Flow Nav → g7: A11y → g8: Scoring (100-pt DoD)               │      ║
║  └──────────────────────────────────────┬───────────────────────────┘      ║
║                                         v                                    ║
║  ┌─ ADAPTIVE CONVERGENCE DECISION ──────────────────────────────────┐      ║
║  │ Score ≥ 95 AND P0 == 0  → GATE_B_READY                           │      ║
║  │ Score improves ≥ 5 pts  → +1 retry (max 6)                       │      ║
║  │ Plateau ≤ 1 pt for 2×   → LOOP_STALLED → escalate               │      ║
║  │ score[N] < score[N-1]   → REGRESSION → restore N-1 snapshot      │      ║
║  │ wall_clock > 30min      → LOOP_TIMEOUT → escalate                │      ║
║  └─────────────┬────────────────────────────────────┬───────────────┘      ║
║     CONTINUE   │                                    │ GATE_B_READY          ║
║     (Fix Queue)│                                    v                        ║
║         ▲      │                          ┌──────────────────┐              ║
║         └──────┘                          │ Task 3: Agile    │              ║
║                                           │ Refine (PRD Sync)│              ║
║                                           └────────┬─────────┘              ║
║                                                    v                         ║
║                                           ┌──────────────────┐              ║
║                                           │ 🚧 GATE B        │              ║
║                                           │ Human Scorecard   │              ║
║                                           └────────┬─────────┘              ║
╚════════════════════════════════════════════════════╪══════════════════════════╝
                                                     │ APPROVE
                                                     v
                                               ✅ MERGE & DEPLOY
```

---

## Step-by-Step Execution

### W0: Plan Declaration Gate

**Skill rule:** Read `skills/agenticse-design-system/rules/w1-discover-plan.md` (Section W0)

**`task_boundary` call:**
```
TaskName: "Stage 2 — W0 Plan Declaration"
Mode: EXECUTION
```

**Actions:**

1. Implementor emits `docs/design/plan-declaration.json`:
   ```json
   {
     "rollout_id": "rl-YYYY-MM-DD-NNN",
     "prd_beads_id": "br-xxx",
     "contract_path": "docs/design/contracts/{feature-x}/contract.yaml",
     "build_sequence": [
       { "step": 1, "component": "ds:comp:top-nav-001", "type": "structural" },
       { "step": 2, "component": "ds:comp:kpi-cards-001", "type": "data-display" }
     ],
     "states_to_implement": ["default", "loading", "empty", "error"],
     "risks": ["..."],
     "tool_budget_estimate": 6
   }
   ```

2. Evaluator validates: every `data-ds-id` in the contract's `components.required[]` MUST appear in `build_sequence`

3. **If `PLAN_REJECTED`** → Implementor revises plan. No HTML/CSS is written until plan is approved.

**Exit condition:** Plan validated. Proceed to BUILD.

---

### Sub-Task 2A: BUILD (Implementor)

**Skill rules:**
- Read `skills/agenticse-design-system/rules/w1-discover-plan.md`
- Read `skills/agenticse-design-system/rules/w2-create-build.md`

**`task_boundary` call:**
```
TaskName: "Stage 2 — BUILD: Implementing UI"
Mode: EXECUTION
```

**Actions:**

1. **W1 (Discover & Plan):** Read `layout-rules.json` as immutable contract input. Read `PRD_DS_CONFLICT` resolution log. Plan build sequence per `plan-declaration.json`.

2. **W2 (Create & Build):** Write HTML/CSS/Tokens strictly following the DS token system. Every component gets a `data-ds-id` attribute. Code against exact component map from contract.

3. **Self-Verification** (earns +5 bonus pts in DoD):
   - CSS lint run
   - Rendered page opened in Playwright preview
   - Pre-submission checklist logged

**Exit condition:** UI built and self-verified. Proceed to Browser Render Gate.

---

### Browser Render Gate (GAP-51) — Mandatory Before AUDIT

> **Problem solved:** Previously, the AUDIT step scored Visual Diff and Flow Navigation without ever rendering the HTML in a browser. This gate ensures a real browser render + screenshot exists before any scoring begins.

**`task_boundary` call:**
```
TaskName: "Stage 2 — Browser Render Gate"
Mode: EXECUTION
```

**Actions:**

1. **Open HTML in browser** via Antigravity's `browser_subagent` tool:
   - Use `browser_subagent` to navigate to the generated HTML file (e.g., `file:///path/to/docs/design/screens/{feature}/index.html`)
   - This is Antigravity's built-in browser control tool — NOT the Gemini CLI SubAgent of the same name
   - Wait for full render (all CSS applied, no pending animations)

2. **Capture screenshots** for each state defined in `contract.yaml`:
   - Default state → `docs/design/reports/{feature}/screenshots/default-iter-{N}.webp`
   - Loading state → set `data-state="loading"` and capture
   - Error state → set `data-state="error"` and capture
   - Empty state → set `data-state="empty"` and capture

3. **Viewport matrix** (if contract defines multiple viewports):
   - Resize browser to each viewport (mobile 390px, tablet 768px, desktop 1440px)
   - Capture screenshot per viewport × state combination

4. **Save all screenshots** to `docs/design/reports/{feature}/screenshots/`

**Gate Enforcement:**
- If NO screenshot artifacts exist after this step → Sub-Task 2B (AUDIT) g5 (Visual Diff) scores `SKIPPED_NO_RENDER` (0 pts)
- If screenshots exist but fewer than expected → g5 scores proportionally (e.g., 3/4 states captured = 75% of visual diff score)

**Exit condition:** At least 1 screenshot artifact exists. Proceed to AUDIT.

---

### Sub-Task 2B: AUDIT (Evaluator)

**Skill rules:** Read the following gatecheck rules:
- `skills/design-system-gatecheck/rules/g3-env-deterministic.md`
- `skills/design-system-gatecheck/rules/g4-conformance-test.md`
- `skills/design-system-gatecheck/rules/g5-visual-diff.md`
- `skills/design-system-gatecheck/rules/g6-flow-navigation.md`
- `skills/design-system-gatecheck/rules/g7-a11y-contrast.md`
- `skills/design-system-gatecheck/rules/g8-scoring-policy.md`

**`task_boundary` call:**
```
TaskName: "Stage 2 — AUDIT: Evaluating UI"
Mode: VERIFICATION
```

**Actions:**

| Step | Rule | Description | Gate Enforcement |
|------|------|-------------|------------------|
| g3 | `g3-env-deterministic` | Lock browser, fonts, mock data, disable animations | — |
| g4 | `g4-conformance-test` | Tier 1: DOM Conformance — component existence, hierarchy, overlap | FAIL_P0 → SKIP g5-g7 |
| g5 | `g5-visual-diff` | Tier 2: Screenshot comparison across viewport×theme×state matrix | FAIL_P0 → SKIP g6 |
| g6 | `g6-flow-navigation` | Tier 2: Storyboard trajectory execution, dead-end detection | — |
| g7 | `g7-a11y-contrast` | Tier 1: axe-core/pa11y WCAG AA audit | SKIPPED_TOOL_ERROR if axe fails |
| g8 | `g8-scoring-policy` | 100-pt DoD scoring engine — 6 pillars + anti-hacking + safety | Emits scorecard v1.2 |

**Tool-Verified Scoring Mandate (GAP-52):**

> **Rule:** Each pillar MUST have at least 1 mechanical tool call producing evidence. If `tool_evidence[]` is empty for a pillar, that pillar is **auto-capped at 50%**.

| Pillar | Required Tool Check | Tool |
|--------|-------------------|------|
| Contract Conformance | `grep_search` for each `data-ds-id` in HTML vs `contract.yaml` required list | `grep_search` |
| Visual & Token Fidelity | Compare Browser Render Gate screenshot against contract wireframes | `browser_subagent` screenshot (from Render Gate) |
| Accessibility | DOM inspection for focus order, ARIA landmarks, contrast check | `browser_subagent` DOM query |
| Flow & State Integrity | Navigate between states in rendered browser, verify transitions work | `browser_subagent` state toggle |
| Efficiency & Anti-Hacking | Count tool calls in trajectory, verify genuine creation | Conversation trace analysis |

**Scorecard output includes (v1.2):**
- `total_score` (0-100), `p0_violations`, gradient penalty
- Prioritized `p0_fixes → p1_fixes → p2_fixes` queue
- `pillar_deltas` per iteration, `rollout_id`, `reasoning_trace_score`
- `component_attribution` (implementor | evaluator_env | unknown)
- `autonomy_score`, `wall_clock_ms`, `total_tokens`
- **`tool_evidence[]`** — array of `{pillar, tool_name, tool_args, result_summary, score_impact}` (NEW in v1.2)
- Graceful degradation: `TOOL_FAILURE` events logged (not crashed)

**Exit condition:** Scorecard emitted with `tool_evidence[]` populated. Proceed to Convergence Decision.

---

### Adaptive Convergence Decision

| Condition | Action |
|-----------|--------|
| Score ≥ 95 AND P0 == 0 | → `GATE_B_READY` — proceed to Task 3 |
| Score improves ≥ 5 pts | → +1 retry allowed (max cap: 6) |
| Score plateau ≤ 1 pt for 2 consecutive | → `LOOP_STALLED` → escalate to Gate B |
| score[N] < score[N-1] | → `REGRESSION_DETECTED` → restore N-1 snapshot, send regression delta to Implementor |
| wall_clock > 30min (std) / 60min (complex) | → `LOOP_TIMEOUT` → freeze best snapshot, escalate to Gate B |

**On CONTINUE:** Send Prioritized Fix Queue back to Sub-Task 2A (BUILD). Implementor reads `skills/agenticse-design-system/rules/w3-refine-align.md` for fix application.

**Snapshot/Restore Protocol (for REGRESSION_DETECTED):**

1. **After each BUILD iteration**, the agent saves the current HTML/CSS output to `docs/design/screens/{feature}/snapshot-iter-{N}/`
2. **On `REGRESSION_DETECTED`:** the agent copies `snapshot-iter-{N-1}/` back to the working directory and sends ONLY the regression delta (score[N-1] scorecard minus score[N] scorecard) to the Implementor
3. The Implementor then applies targeted fixes to the restored snapshot — it does NOT re-build from scratch
4. The snapshot directory also serves as the RFT training data input (each iteration is a separate rollout)

**On GATE_B_READY / STALL / TIMEOUT:** Proceed to Task 3.

---

### Task 3: Agile Refine (PRD-DS Sync)

**`task_boundary` call:**
```
TaskName: "Stage 2 — Task 3: Agile Refine"
Mode: VERIFICATION
```

**Actions:**

1. Compare final UI code against original PRD
2. Generate **PRD Journey Coverage Matrix** (`prd-coverage-matrix.csv`):
   - For each user journey: storyboard exists? was executed? did it pass?
   - Any `NOT_COVERED` journey **blocks Gate B approval**
3. Generate `latest-ui-handover.md` with `text_output_match_score`
4. Generate missing states list and PRD refinement recommendations
5. Compute **Task Success Rate:** `TSR = converged_runs / total_runs`

**Cross-Stage Route — Missing UI States:**

If Task 3 discovers missing UI states that cannot be addressed by the Implementor alone (e.g., entirely missing user journeys, states not defined in the PRD's state matrix):

1. The agent emits `MISSING_PRD_STATES` with a list of the gaps
2. The agent calls `task_boundary(TaskName: "Stage 1 — PRD Intake & Normalization", Mode: EXECUTION)`
3. The agent re-enters Stage 1 Step 0 (PRD Completeness Sub-Loop) to update the PRD
4. After PRD update, the agent re-enters Stage 1 TASK 1A to regenerate affected contract artifacts
5. Modified contract artifacts flow back into Stage 2 BUILD for the affected components only
6. **This is a partial re-run** — the agent does NOT restart the full pipeline from scratch

> **Anti-pattern:** Do NOT use this route for minor HTML/CSS fixes. Only use when the PRD itself is missing requirements that block implementation.

**Exit condition:** Coverage matrix complete. Proceed to Gate B.

---

### 🚧 GATE B: Final Human Approval

**Skill rule:** Read `skills/design-system-gatecheck/rules/gate-b-result-approval.md`

**`task_boundary` call:**
```
TaskName: "Stage 2 — Gate B: Final Approval"
Mode: VERIFICATION
```

**Present to Human** via `notify_user` with `BlockedOnUser: true`:

**Structured Human Scorecard:**

| Criteria | Scale | Required Minimum |
|----------|-------|-------------------|
| Visual brand fit | 1–5 | ≥ 3 |
| Copy clarity | 1–5 | ≥ 3 |
| Interaction intuitiveness | 1–5 | ≥ 3.5 |
| Safety / edge case handling | 1–5 | ≥ 4 |
| Production readiness | 1–5 | ≥ 3.5 |

**Minimum average: 3.5/5 to approve.**

**Also disclosed:**
- Pillar delta convergence curves
- `TOOL_FAILURE` events
- `NOT_COVERED` PRD journeys
- Autonomy score

### Gate B Decision Routing

| Decision | Action | Route |
|----------|--------|-------|
| ✅ **APPROVE** | UI passes all criteria | → Merge & Deploy |
| 🔄 **REQUEST_FIX** | Issues found | → Return to Sub-Task 2A (BUILD) within the Ralph Loop |
| ✅ **APPROVE_WITH_BASELINE_UPDATE** | UI approved, baselines need refresh | → Merge + run baseline governance (g9) |

**Output:** `docs/design/reports/feature-x-approval-log.md`

---

## Post-Approval: Stage 2 Complete

On **APPROVE**, the full Ralph Loop pipeline is complete:
- CI pipeline (`.github/workflows/ralph-loop-ci.yml`) runs on merge
- Scorecard artifact uploaded for audit trail
- RFT training data stored at `docs/rft-dataset/{prd_id}/`
- Baseline governance executed via `g9-baseline-governance.md`

---

## Hierarchy Cross-Reference

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  WHERE TO GO FROM HERE:                                                 │
│                                                                         │
│  ▲ UP (Layer 1 — Methodology):                                         │
│    spike-design-system-ralph-loop-agent.md  Section 5                   │
│    → Full theoretical basis for the 100-pt DoD Scoring Engine,          │
│      RFT dataset collection, adaptive convergence, anti-hacking         │
│                                                                         │
│  ◄ BACK (Layer 2 — Main Activator):                                    │
│    gsafe-uiux-ralph-loop-antigravity.md                                 │
│    → Pipeline routing: how Stage 2 receives Gate A approved artifacts   │
│                                                                         │
│  ◄ PREV (Layer 2 — Stage 1 sub-workflow):                              │
│    gsafe-uiux-ralph-loop-stage1.md                                      │
│    → Produces the immutable contract artifacts consumed here            │
│                                                                         │
│  ▼ DOWN (Layer 3 — Executor Skills):                                   │
│    agenticse-design-system/ (BUILD: w1-*, w2-*, w3-*)                   │
│    design-system-gatecheck/ (AUDIT: g3-*, g4-*, ..., g8-*, gate-b-*)   │
│    → Step-level instructions for implementation and evaluation          │
└─────────────────────────────────────────────────────────────────────────┘
```
