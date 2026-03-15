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
5. Check if Design System exists: `ls packages/design-system/ 2>/dev/null`. Store result as `ds_path` ("packages/design-system/" or "none").

If any precondition fails, tell the user and stop.

---

## STAGE 1: Contract Generation Ralph Loop

You will run an iterative ADAPTIVE loop, dispatching the `ralph_stage1_evaluator` subagent.

### Adaptive Convergence Policy

- **Base retries:** 4
- **Bonus retry:** If score improved ≥5 pts between iterations → allow +1 retry (max cap: 6)
- **PLATEAU:** If score improved ≤1 pt for 2 consecutive iterations → STOP (LOOP_STALLED)
- **REGRESSION:** If score decreased → STOP with REGRESSION warning
- Track `prev_score`, `prev_prev_score` for 2-iteration plateau detection.

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

### After Each Iteration: Adaptive Convergence Check

After receiving the scorecard JSON, apply these rules IN ORDER:

1. **CONVERGED:** If `score >= 90` AND `convergence_status == "GATE_A_READY"` → STOP. Proceed to Stage 1 QA.
2. **REGRESSION:** If `score < prev_score` → STOP with REGRESSION warning. Proceed to Stage 1 QA.
3. **PLATEAU (2-consecutive):** If `(prev_score - prev_prev_score) <= 1` AND `(score - prev_score) <= 1` → STOP with LOOP_STALLED. Proceed to Stage 1 QA.
4. **BONUS RETRY:** If `(score - prev_score) >= 5` → grant +1 retry beyond base cap (max 6 total).
5. **MAX RETRIES:** If iteration count >= current max_retries → STOP. Proceed to Stage 1 QA.
6. **OTHERWISE:** Dispatch another iteration with this prompt:

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

### Stage 1 QA: Independent Testing

After the evaluator loop converges, dispatch `ralph_stage1_qa`:

> Run QA tests on Stage 1 contract artifacts for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> prd_path: {absolute path to PRD}
> evaluator_score: {the latest evaluator score}
>
> Write a test plan, execute all 6 test suites (T1-T6), write results, then output the QA scorecard JSON.

**Run in FOREGROUND. Wait for completion.** Parse the QA scorecard JSON.

**QA Convergence Check:**

- **If `convergence_status == "QA_PASS"`:** All tests passed. Proceed to Gate A.
- **If `convergence_status == "QA_FAIL"`:** Extract `fix_queue` from QA results. Feed BACK into the evaluator loop as P0 items. Re-dispatch evaluator with these fixes. After evaluator finishes, re-dispatch QA. Maximum 2 QA retry cycles.

### 🚧 GATE A: Human UX Concept Approval

Present to the human:
1. List ALL files under `docs/design/contracts/{feature_name}/` and `docs/design/test-plans/`
2. Show the latest evaluator scorecard summary (total score, pillar breakdown)
3. Show the QA test results (PASS/FAIL per test suite)
4. Note any REGRESSION or STALL warnings

Ask: **"APPROVE, REJECT_FIX_CONTRACT, or REJECT_FIX_PRD?"**

- **APPROVE** → Proceed to Stage 2
- **REJECT_FIX_CONTRACT** → Take the human's feedback, re-enter Stage 1 from iteration 1 with their feedback added to fix_queue
- **REJECT_FIX_PRD** → Dispatch `prd_writer_agent` to fix the PRD with the human's feedback, then re-enter Stage 1

---

## STAGE 2: Implementation Ralph Loop

You will run an iterative loop with adaptive convergence.
Each cycle dispatches: Builder → Browser Render → QA.

### W0: Plan Declaration Gate (MANDATORY — Before Any Code)

Before the first Builder iteration, dispatch `ralph_stage2_builder` with this special W0 prompt:

> Run W0 Plan Declaration for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> ds_path: {ds_path}
> mode: PLAN_ONLY
>
> Read the contract and Design System. Output a plan-declaration.json with:
> {"components": [...all data-ds-id values], "build_sequence": [...order], "risks": [...], "tool_budget_estimate": N}
> Do NOT write any HTML/CSS. ONLY output the plan JSON.

**Run in FOREGROUND.** Parse the plan. Verify all required `data-ds-id` values from `component-map.json` are listed in `build_sequence`. If any missing, ask the builder to revise the plan. Once the plan is accepted, proceed to cycles.

### Each Cycle = Builder + Browser Render + QA

#### Step A: Dispatch Builder

Dispatch the `ralph_stage2_builder` subagent:

> Run Stage 2 iteration {N} for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> iteration: {N}
> previous_scorecard: {previous builder scorecard JSON or 'null'}
> fix_queue: {merged fix_queue from previous builder + QA, or '[]'}
>
> FIRST: Read the Design System at "{ds_path}" (or create your own if "none").
> THEN: Build/fix HTML/CSS at docs/design/screens/{feature_name}/.
> THEN: Self-audit with the 100-pt DoD scoring engine.
> Output ONLY the JSON scorecard as your final message.

**Run in FOREGROUND. Wait for completion.** Parse the builder scorecard.

#### Step A.5: Browser Render Gate (MANDATORY)

Dispatch the `browser_subagent` subagent:

> Render the built UI for feature "{feature_name}".
>
> html_path: docs/design/screens/{feature_name}/index.html
> screenshot_path: docs/design/reports/{feature_name}-render-iter-{N}.webp
> viewport: {width: 1440, height: 900}
> storyboard_path: docs/design/contracts/{feature_name}/storyboards.json
>
> 1. Open the HTML file in a headless browser.
> 2. Capture a full-page screenshot and save to screenshot_path.
> 3. Read storyboards.json. For each trajectory, simulate the step sequence
>    (click targets, verify state changes) and capture a post-interaction screenshot.
> 4. Report results as JSON.

**Run in FOREGROUND.** Parse result.
- If `status == "success"`: store `screenshot_path` for QA.
- If `status == "failure"`: log as `RENDER_FAILED` warning. QA visual checks will score `SKIPPED_NO_RENDER`.
- If `status == "skipped"` (no Playwright): log warning and continue.

#### Step B: Dispatch QA

Dispatch the `ralph_stage2_qa` subagent:

> Run QA acceptance tests on Stage 2 build for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> screens_path: docs/design/screens/{feature_name}/
> iteration: {N}
> builder_score: {the builder's score from Step A}
> ds_path: {ds_path}
> screenshot_path: {screenshot_path from Step A.5, or 'none'}
>
> Write a test plan, execute all 6 acceptance test suites (T1-T6), write results, then output the QA scorecard JSON.

**Run in FOREGROUND. Wait for completion.** Parse the QA scorecard.

#### Step C: Adaptive Convergence Decision

Merge builder scorecard + QA results. Apply these rules IN ORDER:

1. **CONVERGED:** If builder `score >= 95` AND `p0_count == 0` AND QA `convergence_status == "QA_PASS"`
   → EXIT LOOP → Proceed to Gate B
2. **REGRESSION:** If builder `score < prev_score`
   → Log `REGRESSION_DETECTED`. Restore previous snapshot: `cp -r docs/design/screens/{feature_name}/snapshot-iter-{N-1}/* docs/design/screens/{feature_name}/`. Send ONLY regression delta fixes to next cycle.
3. **PLATEAU (2-consecutive):** If score improved ≤1 pt for 2 consecutive cycles
   → EXIT LOOP with `LOOP_STALLED` warning → Proceed to Gate B
4. **BONUS RETRY:** If score improved ≥5 pts → grant +1 retry (max cap: 8)
5. **QA FAIL:** Merge QA `fix_queue` into builder's `fix_queue` as P0 items → next cycle
6. **MAX RETRIES:** If cycle count >= current max (base 6) → EXIT → Gate B with timeout

Log each: `"Stage 2 cycle {N}: builder={score}, QA={passed}/{total} (delta=+{delta})"`

### 🚧 GATE B: Final Human Approval

Present to the human:
1. Latest builder scorecard (total score, pillar breakdown, P0/P1/P2 counts)
2. Latest QA test results (PASS/FAIL per test suite with evidence)
3. Score progression across all cycles
4. Files under `docs/design/screens/{feature_name}/`
5. Any STALL or REGRESSION warnings

Ask them to rate:

| Criteria | Scale (1-5) | Minimum |
|----------|-------------|---------|
| Visual brand fit | 1-5 | ≥ 3 |
| Copy clarity | 1-5 | ≥ 3 |
| Interaction intuitiveness | 1-5 | ≥ 3.5 |
| Safety / edge cases | 1-5 | ≥ 4 |
| Production readiness | 1-5 | ≥ 3.5 |

**YOU MUST WAIT FOR THE HUMAN TO RESPOND. DO NOT self-score. Present deliverables and STOP.**

- **APPROVE** → Log approval to `docs/design/reports/{feature_name}-approval-log.md`. Done!
- **REQUEST_FIX** → Take feedback, add to fix_queue, re-enter Stage 2 loop

---

## Final Summary

After completion, write `docs/design/reports/{feature_name}-pipeline-summary.md`:
- Total Stage 1 iterations, final evaluator score, QA results
- Total Stage 2 cycles, final builder score, final QA results
- Gate A and Gate B decisions
