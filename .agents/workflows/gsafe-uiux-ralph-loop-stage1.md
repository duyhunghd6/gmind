---
description: Ralph Loop Stage 1 — PRD Intake through Gate A (Low-Fi UX Concept Approval). Orchestrates g0→GENERATE→EVALUATE→Convergence→Gate A with rejection loops.
---

# Ralph Loop Stage 1: PRD → Low-Fi Contract → Gate A

<!-- beads-id: br-workflow-ralph-loop-stage1 -->

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
│             /   Sub-wf:    \  ├── gsafe-uiux-ralph-loop-stage1.md ◄── HERE │
│            /   YOU ARE HERE \ └── gsafe-uiux-ralph-loop-stage2.md          │
│           /──────────────────\                                              │
│          /                    \  LAYER 3: EXECUTOR SKILLS                  │
│         / Gatecheck (Evaluator) \ design-system-gatecheck/                 │
│        / Implementor (Builder)   \ agenticse-design-system/                │
│       /──────────────────────────\ "HOW" — Rules, Steps, Standards         │
│                                                                             │
│  >> AGENT DIRECTIVE:                                                       │
│  >> You are at LAYER 2 (sub-workflow). This file orchestrates Stage 1.     │
│  >> For each step below, read ONLY the specific gatecheck rule file cited. │
│  >> Do NOT read agenticse-design-system rules — Stage 1 is Evaluator-only. │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **SAFe 6.0 Phase:** Continuous Exploration — Hypothesize & Architect
> **Skill Used:** `design-system-gatecheck` (The Evaluator Agent)
> **Outcome:** Human-approved Low-Fi UX Contract ready for Stage 2 implementation

## Preconditions

Before starting this workflow, ensure:

- [ ] A PRD markdown file exists (e.g., `docs/PRDs/feature-x.md`)
- [ ] The Design System token definitions are accessible (`design-tokens.json`)
- [ ] The `design-system-gatecheck` skill is available and its `SKILL.md` has been read

## Architecture Overview

```text
┌═════════════════════════════════════════════════════════════════════════════┐
║                  RALPH LOOP STAGE 1 (Low-Fi Contract RFT Loop)            ║
║                                                                            ║
║  ┌──────────────┐                                                         ║
║  │ Step 0: g0   │                                                         ║
║  │ Intake &     │─── PRD Gap Sub-Loop (if gaps) ──► fill & retry          ║
║  │ Normalize    │                                                         ║
║  └──────┬───────┘                                                         ║
║         │                                                                  ║
║         ▼                                                                  ║
║  ┌─ TASK 1A: GENERATE ──────────────────────────────────────┐             ║
║  │ g1: Contract Gen (ASCII + Storyboards + Component Map)   │             ║
║  │ g2: Contract Compile (layout-rules.json + checklist)     │             ║
║  └──────────────────────────────────┬───────────────────────┘             ║
║                                     │                                      ║
║                                     ▼                                      ║
║  ┌─ TASK 1B: EVALUATE (Contract Quality Scoring Engine) ─┐               ║
║  │ 5-Pillar Score (0-100):                                │               ║
║  │  PRD Coverage 25% | Traceability 25% | Storyboard 20% │               ║
║  │  Compilability 15% | Conflict Resolution 15%           │               ║
║  │ + Regression check + Pillar Deltas + RFT data          │               ║
║  └──────────────────────────────────┬─────────────────────┘               ║
║                                     │                                      ║
║                                     ▼                                      ║
║  ┌─ CONVERGENCE DECISION ──────────────────────────────┐                  ║
║  │ ≥ 90 + 0 AMBIGUOUS → GATE_A_READY                   │                  ║
║  │ +5pt improve       → retry (max 4)                   │                  ║
║  │ plateau/regress    → escalate to Gate A              │                  ║
║  └───────┬──────────────────────────────────┬──────────┘                  ║
║   RETRY  │                                  │ GATE_A_READY                ║
║     ▲    │                                  ▼                              ║
║     └────┘ (Fix Queue)             ┌──────────────┐                       ║
║                                    │  🚧 GATE A   │                       ║
║         ▲                          │  Human UX    │                       ║
║         │  REJECT_FIX_PRD          │  Approval    │                       ║
║         │  (back to g0)            └──────┬───────┘                       ║
║         │                                 │                                ║
║         │          ▲ REJECT_FIX_CONTRACT  │                                ║
║         │          │  (back to TASK 1A)   │                                ║
║         └──────────┴──────────────────────┘                                ║
║                                    │ APPROVE                               ║
╚════════════════════════════════════╪════════════════════════════════════════╝
                                     │
                                     ▼
                           Stage 2 (Ralph Loop 2)
                           Implementor ↔ Evaluator
```

---

## Step-by-Step Execution

### Step 0: PRD Intake & Normalization

**Skill rule:** Read `skills/design-system-gatecheck/rules/g0-intake-normalize.md`

**`task_boundary` call:**
```
TaskName: "Stage 1 — PRD Intake & Normalization"
Mode: EXECUTION
```

**Actions:**

1. Parse the PRD markdown into structured sections:
   - Extract `beads-id` from HTML comments
   - Identify screens/routes, user journeys, state matrix
   - Identify breakpoints and accessibility requirements

2. Validate completeness against schema checklist:
   | Field | Required |
   |-------|----------|
   | Routes/screens | ✅ |
   | State matrix (≥ default + error per screen) | ✅ |
   | Measurable acceptance criteria | ✅ |
   | Breakpoints (≥ mobile + desktop) | ✅ |

3. **If gaps found** → Enter PRD Completeness Sub-Loop:
   - Generate `docs/PRDs/feature-x.gap-list.md`
   - **Agent Directive:** Do NOT halt the pipeline. You must act as the **PRD Writer Agent**.
   - Proactively draft reasonable, logical defaults for the missing information (standard state matrices, explicit WCAG AA targets, responsive breakpoints, testable acceptance criteria).
   - Write these additions directly into the original PRD markdown file (`docs/PRDs/feature-x.md`).
   - Re-evaluate Step 0 until the `PRD_GAP_LIST` is empty.
   - *Only halt if core business logic (e.g., pricing, APIs) is missing.*

4. **If complete** → Emit `docs/PRDs/feature-x.normalized.json`

**Exit condition:** PRD fully validated with zero gaps. Proceed to TASK 1A.

---

### TASK 1A: GENERATE (Contract Generation + Compile)

**Skill rules:**
- Read `skills/design-system-gatecheck/rules/g1-contract-generation.md`
- Read `skills/design-system-gatecheck/rules/g2-contract-compile.md`

**`task_boundary` call:**
```
TaskName: "Stage 1 — GENERATE: Contract & Layout Rules"
Mode: EXECUTION
```

**Actions (g1 — Contract Generation):**

1. **Generate `contract.yaml`** — Feature name, beads_id, routes, required components (with `data-ds-id`), viewports, visual diff policy, accessibility level, state transitions

2. **Generate ASCII Wireframes (GAP-41/42)** — One **detailed** diagram per screen × state (default, loading, error, empty minimum). Every block MUST map to a real `data-ds-id` component. Wireframes MUST include:
   - ≥3 nesting levels for screens with >3 components
   - Column ratio annotations (`[60%]` / `[40%]`), padding markers (`(16px)`)
   - Internal structure: column headers, button labels, placeholder text — no stub blocks
   - Per-state structural variations (skeleton for loading, error banner for error, empty illustration for empty)

3. **Generate ASCII User Flow Diagrams (GAP-44)** — ⚠️ MANDATORY. One flow per major user journey. Each box shows miniature wireframe contents with labeled transition arrows (`──[trigger]──►`) and return paths.

4. **Generate Mermaid Flow Diagram** — State/navigation flow as `stateDiagram-v2`

5. **Generate JSON Storyboard Trajectories** — ⚠️ MANDATORY. Gate A auto-rejects if absent.
   - ≥ 1 trajectory per user journey in the PRD
   - Each trajectory: step number, state, action, target (`ds:comp:*`), reasoning checkpoint
   - Include recovery tests for error states

6. **Generate Component Map** — Maps ASCII block names → `data-ds-id` selectors

7. **Run PRD ↔ DS Conflict Detection** — Compare PRD style directives against `design-tokens.json`

**Actions (g2 — Contract Compile):**

8. **Compile to `layout-rules.json`** — position, visibility, overlap, responsive, state_transition rules

9. **Generate Assertion Checklist** — Human-readable markdown checklist

10. **Ambiguity Detection** — Flag `AMBIGUOUS_RULE` for unmapped ASCII blocks

**Outputs:**

| Artifact | Path |
|----------|------|
| Contract YAML | `docs/design/contracts/feature-x.contract.yaml` |
| ASCII Wireframes | `docs/design/contracts/feature-x.ascii.md` |
| ASCII User Flows | `docs/design/contracts/feature-x.user-flows.ascii.md` |
| Flow Diagram | `docs/design/contracts/feature-x.flow.mmd` |
| JSON Storyboards | `docs/design/contracts/feature-x.storyboards.json` |
| Component Map | `docs/design/contracts/feature-x.component-map.json` |
| Conflict Report | `docs/design/contracts/feature-x.prd-ds-conflicts.md` |
| Layout Rules | `docs/design/contracts/feature-x.layout-rules.json` |
| Assertion Checklist | `docs/design/test-plans/feature-x.assertion-checklist.md` |

**Exit condition:** All artifacts generated. Proceed to TASK 1B.

---

### TASK 1B: EVALUATE (Contract Quality Scoring Engine)

**`task_boundary` call:**
```
TaskName: "Stage 1 — EVALUATE: Contract Quality Score"
Mode: VERIFICATION
```

**Contract Quality Score (0–100) — 6-Pillar Model (GAP-43):**

| Pillar | Weight | Checks |
|--------|--------|--------|
| **PRD Coverage** | 20% | Every screen + state + journey in PRD → matching wireframe + storyboard |
| **Component Traceability** | 20% | Every ASCII block → `data-ds-id` in `component-map.json` |
| **Storyboard Completeness** | 15% | Every user journey has ≥1 trajectory; error recovery paths present |
| **Layout Compilability** | 15% | `layout-rules.json` parses cleanly; zero `AMBIGUOUS_RULE` flags |
| **Conflict Resolution** | 15% | All `PRD_DS_CONFLICT` items detected and surfaced for Gate A |
| **Wireframe & Flow Articulation** | **15%** | **NEW (GAP-41–45)** — Diagram depth + User Flow quality. See checks below |

**Wireframe & Flow Articulation Checks (15 pts):**
- (5 pts) **Nesting depth:** Wireframes with >3 components show ≥3 nesting levels (page→section→component→sub-element)
- (3 pts) **Annotation completeness:** Column ratio markers (`[60%]`/`[40%]`), padding annotations (`(16px)`) present
- (3 pts) **State variation:** Per-state wireframe variations exist (default, loading, error, empty) — not just one view
- (2 pts) **ASCII User Flow:** ≥1 ASCII flow diagram per major user journey with labeled transition arrows and return paths
- (2 pts) **No stub blocks:** Complex components (tables, forms, card grids) show internal structure, not just a label

> **DIAGRAM_TOO_SHALLOW flag:** If Wireframe & Flow Articulation pillar < 60% (< 9 pts), emit `DIAGRAM_TOO_SHALLOW` in the Prioritized Fix Queue. The agent MUST specifically re-generate more detailed wireframes — not just add missing components.

**Scoring Mechanics (mirroring Stage 2 DoD):**
- Gradient penalty: missing_items × (weight / total_items_expected)
- No binary pass/fail — every improvement is rewarded

**Additional signals emitted:**
- `rollout_id: rl-stage1-YYYY-MM-DD-NNN` (per iteration)
- `pillar_deltas`: score delta per pillar vs previous iteration (now 6 pillars)
- Cross-iteration regression check (iteration ≥ 2)
- Attribution: `evaluator_contract` | `prd_gap` | `diagram_shallow` | `unknown`
- All graded rollouts → `docs/rft-dataset/{prd_id}/stage1/`

**Exit condition:** Score computed. Proceed to Convergence Decision.

---

### Adaptive Convergence Decision

| Condition | Action |
|-----------|--------|
| Score ≥ 90 AND zero `AMBIGUOUS_RULE` | → `GATE_A_READY` — proceed to Gate A |
| Score improves ≥ 5 pts | → +1 retry allowed (max cap: 4) |
| Score plateau ≤ 1 pt for 2 consecutive | → `LOOP_STALLED` → escalate to Gate A with warning |
| score[N] < score[N-1] | → `REGRESSION` → restore N-1 artifacts, send regression delta |
| Wireframe & Flow Articulation < 60% | → `DIAGRAM_TOO_SHALLOW` → agent must detail wireframes (GAP-45) |
| wall_clock > 15min | → `TIMEOUT` → freeze best artifacts, escalate to Gate A |

**On CONTINUE:** Send Prioritized Fix Queue back to TASK 1A (GENERATE):
- Which pillar scored lowest
- Specific missing wireframes, storyboards, or unmapped components
- **If `DIAGRAM_TOO_SHALLOW`:** Explicitly instruct agent to add nesting levels, annotations, placeholder text, and per-state variations to ASCII diagrams — not just add new artifacts
- Agent re-generates ONLY the flagged artifacts (not from scratch)

**On GATE_A_READY / STALL / TIMEOUT:** Proceed to Gate A.

---

### 🚧 GATE A: Human UX Concept Approval

**Skill rule:** Read `skills/design-system-gatecheck/rules/gate-a-plan-approval.md`

**`task_boundary` call:**
```
TaskName: "Stage 1 — Gate A: UX Concept Approval"
Mode: VERIFICATION
```

**Actions:**

1. **Generate Test Plan** (`docs/design/test-plans/feature-x.plan.md`)
2. **Generate Coverage Matrix** (`docs/design/test-plans/feature-x.coverage-matrix.csv`)

3. **Run Gate A Checklist** — ALL must pass before presenting to human:
   - [ ] Contract Quality Score ≥ 90 (or escalated with warning)
   - [ ] `storyboard_trajectories[]` present (≥ 1 entry)
   - [ ] `PRD_DS_CONFLICT` list resolved or surfaced for human decision
   - [ ] Meta-Evaluation: `layout-rules.json` parses without schema errors
   - [ ] Reasoning quality baseline declared
   - [ ] Attribution Protocol declared in test plan

4. **Present to Human** via `notify_user`:
   ```
   BlockedOnUser: true
   PathsToReview: [
     "docs/design/contracts/feature-x.contract.yaml",
     "docs/design/contracts/feature-x.ascii.md",
     "docs/design/contracts/feature-x.storyboards.json",
     "docs/design/contracts/feature-x.layout-rules.json",
     "docs/design/test-plans/feature-x.plan.md",
     "docs/design/test-plans/feature-x.assertion-checklist.md"
   ]
   ```

### Gate A Decision Routing

| Decision | Action | Route |
|----------|--------|-------|
| ✅ **APPROVE** | Contract is correct and complete | → **Exit Stage 1.** Emit artifacts for Stage 2 |
| 🔄 **REJECT_FIX_CONTRACT** | Wireframes/storyboards need changes | → **Return to TASK 1A (GENERATE).** Re-enter the scoring loop. |
| 🔄 **REJECT_FIX_PRD** | PRD is incomplete or wrong | → **Return to Step 0.** Re-enter PRD Completeness Sub-Loop. |

---

## Post-Approval: Stage 1 Complete

When Gate A returns **APPROVE**, Stage 1 is complete. The following artifacts are now the **immutable contract** for Stage 2:

```text
Emitted Artifacts (Immutable Input for Ralph Loop 2):
├── docs/design/contracts/feature-x.contract.yaml
├── docs/design/contracts/feature-x.ascii.md
├── docs/design/contracts/feature-x.flow.mmd
├── docs/design/contracts/feature-x.storyboards.json
├── docs/design/contracts/feature-x.component-map.json
├── docs/design/contracts/feature-x.layout-rules.json
├── docs/design/test-plans/feature-x.plan.md
├── docs/design/test-plans/feature-x.assertion-checklist.md
└── docs/design/test-plans/feature-x.coverage-matrix.csv
```

The Implementor Agent (`agenticse-design-system`) consumes these as **read-only inputs** — it does NOT re-interpret the PRD independently.

**Next workflow:** `gsafe-uiux-ralph-loop-stage2.md` (Ralph Loop 2: Implementation ↔ Evaluation)

---

## Hierarchy Cross-Reference

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  WHERE TO GO FROM HERE:                                                 │
│                                                                         │
│  ▲ UP (Layer 1 — Methodology):                                         │
│    spike-design-system-ralph-loop-agent.md  Section 5                   │
│    → Full theoretical basis for the 5-Pillar Scoring Engine,            │
│      RFT dataset collection, and convergence policy rationale           │
│                                                                         │
│  ◄ BACK (Layer 2 — Main Activator):                                    │
│    gsafe-uiux-ralph-loop-antigravity.md                                 │
│    → Pipeline routing: how Stage 1 output feeds into Stage 2            │
│                                                                         │
│  ► NEXT (Layer 2 — Stage 2 sub-workflow):                              │
│    gsafe-uiux-ralph-loop-stage2.md                                      │
│    → Consumes Stage 1 artifacts as immutable contract                   │
│                                                                         │
│  ▼ DOWN (Layer 3 — Executor Skill):                                    │
│    design-system-gatecheck/ (rules/g0-*, g1-*, g2-*, gate-a-*)         │
│    → Step-level instructions for each gatecheck rule                    │
└─────────────────────────────────────────────────────────────────────────┘
```
