---
description: SAFe 6.0 Agentic UI/UX Convergence Pipeline — Main activator for the Ralph Loop. Routes PRD through Stage 1 (Low-Fi) and Stage 2 (Hi-Fi) to produce human-approved, merge-ready UI.
---

# SAFe 6.0 Agentic UI/UX Convergence Pipeline (Antigravity Task-Mode)

<!-- beads-id: br-workflow-ralph-loop-main -->

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                 3-LAYER AGENT COMPREHENSION PYRAMID                        │
│                                                                             │
│                    /\        LAYER 1: ROOT METHODOLOGY                     │
│                   /  \       spike-design-system-ralph-loop-agent.md        │
│                  /    \      "WHY & WHAT" — Theory, DoD, RFT, 3-Tier Eval  │
│                 /──────\                                                    │
│                /        \    LAYER 2: ORCHESTRATION  ◄── YOU ARE HERE       │
│               /          \   gsafe-uiux-ralph-loop-antigravity.md           │
│              /    THIS    \  "WHEN & WHO" — Task routing, Stage dispatch    │
│             /    FILE      \                                                │
│            /────────────────\    Sub-workflows:                             │
│           /                  \   ├── gsafe-uiux-ralph-loop-stage1.md        │
│          /                    \  └── gsafe-uiux-ralph-loop-stage2.md        │
│         /──────────────────────\                                            │
│        /                        \  LAYER 3: EXECUTOR SKILLS                │
│       / Gatecheck (Evaluator)    \ design-system-gatecheck/                │
│      / Implementor (Builder)      \ agenticse-design-system/               │
│     /──────────────────────────────\ "HOW" — Rules, Steps, Standards       │
│                                                                             │
│  >> AGENT DIRECTIVE:                                                       │
│  >> You are at LAYER 2. This file decides WHEN to trigger each Stage.      │
│  >> Do NOT read Layer 1 (spike) unless building/modifying this workflow.    │
│  >> Do NOT read Layer 3 (skill rules) directly — the Stage sub-workflows   │
│  >>   will instruct you which specific rule files to read at each step.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Naming Convention:** `gsafe-` (Gmind SAFe 6.0) + `uiux-` (front-end) + `ralph-loop-` (100-pt RFT loop) + `antigravity` (single-operator task_boundary model)

## Preconditions

- [ ] A PRD markdown file exists (e.g., `docs/PRDs/feature-x.md`)
- [ ] The `design-system-gatecheck` skill is installed
- [ ] The `agenticse-design-system` skill is installed
- [ ] Design tokens are accessible (`design-tokens.json`)

---

## Pipeline Architecture

```text
================================================================================================
     RALPH LOOP FULL PIPELINE — Main Activator Routing
================================================================================================

  [ 👤 Human Product Owner ]
            | (Provides PRD)
            v
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  📌 TASK 0 (OPTIONAL): BASELINE GROUNDING                             │
  │  Run Implementor on 5-10 PRDs WITHOUT feedback loop.                   │
  │  Record baseline at docs/eval-dataset/baseline-scores.json             │
  │  Only activate RFT training AFTER baseline is documented.              │
  └────────────────────────────────┬────────────────────────────────────────┘
                                   │
                                   v
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  📌 STAGE 1: PRD → Low-Fi Contract → Gate A                           │
  │  Sub-workflow: gsafe-uiux-ralph-loop-stage1.md                         │
  │  Skill: design-system-gatecheck (Evaluator)                            │
  │                                                                         │
  │  g0 (Intake) → g1 (Contract Gen) → g2 (Compile) → 🚧 GATE A          │
  │  Loops: REJECT_FIX_PRD → g0 | REJECT_FIX_CONTRACT → g1               │
  │                                                                         │
  │  Emits: contract.yaml, ASCII wireframes, storyboards.json,             │
  │         layout-rules.json, assertion-checklist.md, coverage-matrix.csv  │
  └────────────────────────────────┬────────────────────────────────────────┘
                                   │ GATE A APPROVED
                                   v
  ┌═════════════════════════════════════════════════════════════════════════┐
  ║  📌 STAGE 2: Implementation ↔ Evaluation → Gate B                      ║
  ║  Sub-workflow: gsafe-uiux-ralph-loop-stage2.md                         ║
  ║  Skills: agenticse-design-system (Implementor)                         ║
  ║          + design-system-gatecheck (Evaluator)                         ║
  ║                                                                         ║
  ║  W0 Plan Gate → BUILD (W1→W2) → AUDIT (g3→g8) → Scorecard             ║
  ║  Loop: Score < 95 → Prioritized Fix Queue → re-BUILD                   ║
  ║  Then: Task 3 (Agile Refine) → 🚧 GATE B                              ║
  ║                                                                         ║
  ║  Emits: Scored UI, prd-coverage-matrix.csv, approval-log.md            ║
  ╚════════════════════════════════╤═════════════════════════════════════════╝
                                   │ GATE B APPROVED
                                   v
                              ✅ MERGE & DEPLOY
================================================================================================
```

### Hierarchy Navigation (Cross-Reference Table)

```text
┌───────────────────────────────────────────────────────────────────────┐
│  LAYER  │  FILE                           │  FUNCTION              │
├─────────┼─────────────────────────────────┼────────────────────────┼
│  1 ROOT │  spike-ds-ralph-loop-agent.md    │  WHY & WHAT (Theory)   │
│  2 ORCH │  THIS FILE (main activator)      │  WHEN & WHO (Routing)  │ ◄ HERE
│  2a Sub │  gsafe-...-stage1.md             │  Stage 1 inner loop    │
│  2b Sub │  gsafe-...-stage2.md             │  Stage 2 inner loop    │
│  3 EXEC │  design-system-gatecheck/        │  HOW (Evaluator)       │
│  3 EXEC │  agenticse-design-system/        │  HOW (Implementor)     │
└─────────┴─────────────────────────────────┴────────────────────────┘
```

---

## Task 0 (Optional): Baseline Grounding

Before activating the Ralph Loop with RFT training, establish baseline performance:

1. **Skip check:** Read `docs/eval-dataset/baseline-scores.json`. If it exists and contains ≥5 scored PRDs, skip Task 0 entirely.
2. If no baseline exists: Run the Implementor (`agenticse-design-system`) on 5–10 PRDs **without** the Evaluator feedback loop
3. Record base scores at `docs/eval-dataset/baseline-scores.json`
4. Only activate RFT training collection **after** baseline is documented

> Skip this task if `docs/eval-dataset/baseline-scores.json` already exists with sufficient entries.

---

## Stage 1: PRD → Low-Fi Contract Ralph Loop → Gate A

**Run sub-workflow:** `.agents/workflows/gsafe-uiux-ralph-loop-stage1.md`

**`task_boundary` call:**
```
TaskName: "Ralph Loop — Stage 1: Low-Fi Contract"
Mode: EXECUTION
```

Stage 1 processes the raw PRD through an **internal Ralph Loop** (same RFT methodology as Stage 2):
- **Step 0 (g0):** Intake & normalize — validates PRD completeness, runs PRD gap sub-loop
- **TASK 1A — GENERATE (g1+g2):** Contract generation + compile — ASCII wireframes, JSON storyboards, layout-rules.json
- **TASK 1B — EVALUATE:** Contract Quality Scoring Engine (5-pillar, 0–100 scale)
  - PRD Coverage (25%) | Traceability (25%) | Storyboard (20%) | Compilability (15%) | Conflict Resolution (15%)
- **Convergence Decision:** Score ≥ 90 with zero AMBIGUOUS_RULE → proceed to Gate A; otherwise self-improve via Prioritized Fix Queue
- **Iteration Policy:** MIN_ITER=5 (floor guard — no convergence before iter 5), MAX_ITER=10 (hard ceiling); LOOP_STALLED on 3-consecutive plateau; REGRESSION restores N-1
- **🚧 Gate A:** Human UX concept approval (`BlockedOnUser: true`)

**On APPROVE** → proceed to Stage 2.
**On REJECT_FIX_CONTRACT** → return to TASK 1A (GENERATE).
**On REJECT_FIX_PRD** → return to Step 0 (PRD Completeness Sub-Loop).

---

## Stage 2: Implementation ↔ Evaluation → Gate B

**Run sub-workflow:** `.agents/workflows/gsafe-uiux-ralph-loop-stage2.md`

**`task_boundary` call:**
```
TaskName: "Ralph Loop — Stage 2: Hi-Fi Implementation"
Mode: EXECUTION
```

Stage 2 takes Gate A's immutable contract and:
- **W0:** Plan Declaration Gate — Implementor emits build plan before any code
- **Task 2:** The Ralph Loop — BUILD (W1→W2) ↔ AUDIT (g3→g8) with adaptive convergence
- **Task 3:** Agile Refine — PRD journey coverage matrix, handover document
- **🚧 Gate B:** Human result approval — structured 5-criterion scorecard (`BlockedOnUser: true`)

**On APPROVE** → merge & deploy.
**On REQUEST_FIX** → returns to the BUILD step within the Ralph Loop.
**On Task 3 MISSING_PRD_STATES** → reverse route back to Stage 1 Step 0 (PRD Completeness Sub-Loop). See Stage 2 Task 3 for detailed protocol.

---

## Post-Merge: CI Integration

After Gate B approval and merge:

1. The CI pipeline (`.github/workflows/ralph-loop-ci.yml`) triggers automatically on merge to the target branch
2. CI runs the deterministic environment (g3) setup and conformance checks (g4) as regression guards
3. Scorecard artifact is uploaded as a build artifact for audit trail
4. RFT training data at `docs/rft-dataset/{prd_id}/` is committed alongside the implementation
5. Baseline governance (`g9-baseline-governance.md`) executes if the approval included `APPROVE_WITH_BASELINE_UPDATE`

---

## Definition of Done

The full pipeline is complete when:
- [ ] Gate A approved (Low-Fi UX contract stable)
- [ ] Gate B approved (Hi-Fi implementation passes 95/100 DoD with zero P0)
- [ ] PRD Journey Coverage Matrix shows 100% journey coverage (all defined user journeys tested)
- [ ] Task Success Rate (TSR) ≥ 80% (converged runs / total runs across the pipeline)
- [ ] Approval log recorded at `docs/design/reports/feature-x-approval-log.md`
- [ ] If eval dataset task: run-log updated at `docs/eval-dataset/run-log.md`
