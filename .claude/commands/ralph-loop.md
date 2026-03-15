# Ralph Loop Master Orchestration Protocol

You are the Master Orchestrator for the Ralph Loop UI/UX pipeline.

**Target PRD:** $ARGUMENTS

> **CRITICAL RULE: SEQUENTIAL EXECUTION ONLY.**
> You MUST run each SubAgent in the **foreground** (NOT background).
> You MUST wait for a SubAgent to **fully complete and return its output** before dispatching the next one.
> NEVER have two SubAgents running at the same time.

## Step 0: Preconditions

1. Read the PRD file at the path above. Confirm it exists.
2. Verify `.agents/skills/agenticse-design-system-gatecheck/` exists (run `ls .agents/skills/agenticse-design-system-gatecheck/`).
3. Verify `.agents/skills/agenticse-design-system-create/` exists (run `ls .agents/skills/agenticse-design-system-create/`).
4. Extract the `feature_name` as a short lowercase slug from the PRD filename. Example: `PRD-04-WebUI-and-PM-Workspace.md` → `prd04-webui`.

If any precondition fails, tell the user and stop.

---

## STAGE 1: Contract Generation Ralph Loop

You will run an iterative loop, dispatching the `ralph_stage1_evaluator` subagent up to 4 times.

### Iteration 1

Dispatch the `ralph_stage1_evaluator` subagent with this EXACT prompt (fill in the variables):

> Run Stage 1 iteration 1 for feature "{feature_name}".
>
> prd_path: {the absolute path to the PRD file}
> feature_name: {feature_name}
> iteration: 1
> previous_scorecard: null
> fix_queue: []
>
> Read the PRD, generate ALL contract artifacts under docs/design/contracts/{feature_name}/, then evaluate with the 6-pillar scoring engine. Output ONLY the JSON scorecard as your final message.

**Run this subagent in the FOREGROUND. Wait until it fully completes and stops.** Then read its output. Parse the JSON scorecard from its final message. Do NOT dispatch iteration 2 until iteration 1 has fully stopped.

### After Each Iteration: Convergence Check

After receiving the scorecard JSON, check:

- **If `score >= 90` AND `convergence_status == "GATE_A_READY"`:** STOP the loop. Proceed to Gate A below.
- **If `score` decreased from previous iteration (REGRESSION):** STOP the loop. Proceed to Gate A with a REGRESSION warning.
- **If score improved by less than 5 points AND this is iteration 2+:** STOP (PLATEAU). Proceed to Gate A with a STALL warning.
- **Otherwise:** Dispatch another iteration. Use this prompt for iteration N:

> Run Stage 1 iteration {N} for feature "{feature_name}".
>
> prd_path: {absolute path to PRD}
> feature_name: {feature_name}
> iteration: {N}
> previous_scorecard: {paste the FULL JSON scorecard from the last iteration}
> fix_queue: {paste the fix_queue array from the last scorecard}
>
> Read ONLY the artifacts that need fixing. Apply targeted fixes. Then re-evaluate with the 6-pillar scoring engine. Output ONLY the JSON scorecard as your final message.

Log each iteration: `"Stage 1 iteration {N}: score={score} (delta=+{delta})"`

Maximum 4 iterations total. If still not converged after 4, proceed to Gate A anyway.

### 🚧 GATE A: Human UX Concept Approval

Present to the human:
1. List ALL files under `docs/design/contracts/{feature_name}/` and `docs/design/test-plans/`
2. Show the latest scorecard summary (total score, pillar breakdown)
3. Note any REGRESSION or STALL warnings

Ask: **"APPROVE, REJECT_FIX_CONTRACT, or REJECT_FIX_PRD?"**

- **APPROVE** → Proceed to Stage 2
- **REJECT_FIX_CONTRACT** → Take the human's feedback, re-enter Stage 1 from iteration 1 with their feedback added to fix_queue
- **REJECT_FIX_PRD** → Dispatch `prd_writer_agent` to fix the PRD with the human's feedback, then re-enter Stage 1

---

## STAGE 2: Implementation Ralph Loop

You will run an iterative loop, dispatching the `ralph_stage2_builder` subagent up to 6 times.

### Iteration 1

Dispatch the `ralph_stage2_builder` subagent with this EXACT prompt:

> Run Stage 2 iteration 1 for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> iteration: 1
> previous_scorecard: null
> fix_queue: []
>
> Read the immutable contract artifacts. Build HTML/CSS at docs/design/screens/{feature_name}/. Then audit with the 100-pt DoD scoring engine. Output ONLY the JSON scorecard as your final message.

**Run this subagent in the FOREGROUND. Wait until it fully completes and stops.** Then parse the JSON scorecard. Do NOT dispatch iteration 2 until iteration 1 has fully stopped.

### After Each Iteration: Convergence Check

- **If `score >= 95` AND `p0_count == 0` AND `convergence_status == "GATE_B_READY"`:** STOP. Proceed to Gate B.
- **If score decreased (REGRESSION):** Log `REGRESSION_DETECTED`, continue with targeted delta fixes only.
- **If score improved by less than 5 AND iteration 2+:** STOP (PLATEAU). Proceed to Gate B with STALL warning.
- **Otherwise:** Dispatch next iteration with the same prompt pattern, passing the full previous scorecard and fix_queue.

Maximum 6 iterations. Log each: `"Stage 2 iteration {N}: score={score}, P0={p0_count} (delta=+{delta})"`

### 🚧 GATE B: Final Human Approval

Present to the human:
1. Latest scorecard (total score, pillar breakdown, P0/P1/P2 counts)
2. Score progression across all iterations
3. Files under `docs/design/screens/{feature_name}/`
4. Any STALL or REGRESSION warnings

Ask them to rate:

| Criteria | Scale (1-5) | Minimum |
|----------|-------------|---------|
| Visual brand fit | 1-5 | ≥ 3 |
| Copy clarity | 1-5 | ≥ 3 |
| Interaction intuitiveness | 1-5 | ≥ 3.5 |
| Safety / edge cases | 1-5 | ≥ 4 |
| Production readiness | 1-5 | ≥ 3.5 |

- **APPROVE** → Log approval to `docs/design/reports/{feature_name}-approval-log.md`. Done!
- **REQUEST_FIX** → Take feedback, add to fix_queue, re-enter Stage 2 loop

---

## Final Summary

After completion, write `docs/design/reports/{feature_name}-pipeline-summary.md`:
- Total Stage 1 iterations and final score
- Total Stage 2 iterations and final score
- Gate A and Gate B decisions
