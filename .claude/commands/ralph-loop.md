# Ralph Loop Master Orchestration Protocol

You are the Master Orchestrator for the Ralph Loop UI/UX pipeline.

**Target PRD:** $ARGUMENTS

## SubAgent Registry

These are the EXACT agent names you MUST use when dispatching. If any agent is NOT FOUND, STOP immediately and report the error — **NEVER fall back to inline execution.**

| Agent Name | Role | Stage |
|------------|------|-------|
| `ralph_stage1_evaluator` | Contract generation & self-evaluation | Stage 1 |
| `ralph_stage1_qa` | Independent contract QA testing | Stage 1 |
| `ralph_stage2_builder` | HTML/CSS implementation & self-audit | Stage 2 |
| `ralph_stage2_qa` | Independent acceptance testing | Stage 2 |
| `browser_subagent` | Headless browser render & screenshot | Stage 2 |
| `prd_writer_agent` | PRD gap-filling on REJECT_FIX_PRD | Both |

> **CRITICAL RULES:**
> 1. Run each SubAgent in the **FOREGROUND** (NOT background).
> 2. **WAIT** for a SubAgent to **fully complete** before dispatching the next.
> 3. NEVER have two SubAgents running at the same time.
> 4. If an agent dispatch returns an error, STOP and report — do NOT continue.

## Iteration Policy (BOTH STAGES)

```
MIN_ITER = 5      ← Convergence checks are SKIPPED until iteration 5
MAX_ITER = 10     ← Hard ceiling — exit with TIMEOUT after 10 iterations
```

**Convergence rules (applied AFTER each iteration, IN ORDER):**

1. **FLOOR GUARD:** If `iter < MIN_ITER` → **ALWAYS CONTINUE** (ignore score entirely)
2. **CEILING:** If `iter >= MAX_ITER` → **EXIT** with `TIMEOUT` warning
3. **CONVERGED:** If `score >= threshold` AND quality gates met AND `iter >= MIN_ITER` → **EXIT** (success)
4. **REGRESSION (2 consecutive):** If score decreased for 2 consecutive iterations AND `iter >= MIN_ITER` → **EXIT** with `REGRESSION` warning
5. **PLATEAU (3 consecutive):** If `score delta ≤ 1` for 3 consecutive iterations AND `iter >= MIN_ITER` → **EXIT** with `STALL` warning
6. **OTHERWISE:** → **CONTINUE** (increment iter, spawn new SubAgent)

## Pipeline Task List

Create this task list at the start and update it as you progress:

- [ ] Stage 1: Contract Generation (min 5, max 10 iterations)
- [ ] Stage 1 QA: Contract Testing (independent QA)
- [ ] Gate A: Human UX Concept Approval
- [ ] Stage 2 W0: Plan Declaration Gate
- [ ] Stage 2: Implementation (min 5, max 10 iterations)
- [ ] Stage 2: Browser Render & Screenshot Capture
- [ ] Stage 2 QA: Acceptance Testing (independent QA)
- [ ] Gate B: Final Human Approval

## Step 0: Preconditions

1. Read the PRD file at the path above. Confirm it exists.
2. Verify `.agents/skills/agenticse-design-system-gatecheck/` exists.
3. Verify `.agents/skills/agenticse-design-system-create/` exists.
4. Extract `feature_name` as a lowercase slug from the PRD filename.
5. Check if Design System exists: `ls packages/design-system/ 2>/dev/null`. Store as `ds_path`.
6. **Discover DS showcase URL:** If `ds_path` exists, check if the Next.js dev server is running:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:9993/design-system 2>/dev/null
   ```
   - If HTTP 200: store `ds_dev_url = "http://localhost:9993/design-system"`
   - If not running: **force-kill any stale process on port 9993 first**, then start the dev server:
     ```bash
     lsof -ti:9993 | xargs kill -9 2>/dev/null || true
     cd apps/website && npm run dev &
     ```
     Wait ~5s, recheck with curl. Store URL or set `ds_dev_url = "none"`

If any precondition fails, tell the user and stop.

---

## Step 0.5: DS Manifest Extraction (MANDATORY before Stage 2)

If `ds_path` exists (i.e., `packages/design-system/` is present), you MUST compile a **DS_MANIFEST** by reading these files BEFORE dispatching any Stage 2 SubAgent:

1. **Read `{ds_path}/registry.json`** — extract ALL token IDs, component IDs (with their class names/variants), and layout IDs.
2. **Read `{ds_path}/tokens/colors.css`** — extract every `--variable-name` declaration (e.g., `--bg`, `--surface`, `--accent-cyan`, etc.)
3. **Read `{ds_path}/tokens/typography.css`** — extract font tokens (e.g., `--font-body`, `--font-mono`)
4. **Read `{ds_path}/tokens/spacing.css`** — extract spacing/shadow/transition tokens (e.g., `--space-md`, `--radius`, `--shadow-card`, `--ease-out`)
5. **Read `apps/website/src/app/globals.css`** — extract any theme overrides and the font stack

Compile into this **DS_MANIFEST** format (example from the real monorepo):

```
DS_MANIFEST:
  COLOR_TOKENS: --bg, --bg-gradient, --surface, --surface-elevated, --border, --border-highlight, --text, --text-dim, --accent-cyan, --accent-cyan-dim, --accent-teal, --accent-teal-dim, --accent-amber, --accent-amber-dim, --accent-rose, --accent-rose-dim, --blueprint-line
  TYPOGRAPHY_TOKENS: --font-body ("DM Sans", system-ui, sans-serif), --font-mono ("Fira Code", monospace)
  SPACING_TOKENS: --space-xs (4px), --space-sm (8px), --space-md (16px), --space-lg (24px), --space-xl (40px), --space-2xl (60px), --radius (6px), --radius-lg (12px)
  SHADOW_TOKENS: --shadow-hero, --shadow-card, --shadow-glow-cyan
  TRANSITION_TOKENS: --ease-out, --duration-fast (150ms), --duration-normal (250ms), --duration-slow (500ms)
  COMPONENT_CLASSES: .ve-card, .ve-card--hero, .ve-card--pillar, .label, .divider, .code-block, .prompt-card, .arch-layer, .path-tree, .btn-primary, .btn-secondary, .btn-danger, .btn-sm, .badge-cyan, .badge-teal, .badge-amber, .badge-rose, .tooltip, .terminal, .git-graph, .kanban-column, .activity-item, .tab-panel, .approval-panel, .rtm-row, .heatmap-cell, .graph-node, .file-lease, .skeleton, .empty-state, .error-banner, .offline-banner, .forbidden-gate, .state-toggle-bar, .modal, .dropdown, .accordion, .data-table, .progress-bar, .status-dot, .avatar-stack, .ds-id-badge
  LAYOUT_CLASSES: .navbar, .footer, .grid, .glass, .hero, .section, .docs-layout, .kanban-board, .terminal-mosaic, .timeline, .split-panel
  FONT_STACK: "DM Sans", system-ui, sans-serif (body) | "Fira Code", monospace (code)
  GLOBALS_OVERRIDES: --color-background: var(--bg), --color-foreground: var(--text), --radius-custom: 6px
```

Store this compiled `DS_MANIFEST` string. You will inject it into **every Stage 2 SubAgent prompt** (W0, Builder, and QA).

If `ds_path` does NOT exist, set `DS_MANIFEST` to `"NONE — no existing DS found. Builder must create its own tokens."`

---

## STAGE 1: Contract Generation Ralph Loop

**Threshold:** `score >= 90` AND `convergence_status == "GATE_A_READY"`
**Min iterations:** 5 | **Max iterations:** 10

### Iteration Loop

Initialize:
```
iter = 1
prev_score = 0
prev_prev_delta = 999
prev_delta = 999
score_history = []
```

For each iteration, dispatch `ralph_stage1_evaluator` with this EXACT prompt:

> Run Stage 1 iteration {iter} for feature "{feature_name}".
>
> prd_path: {absolute path to PRD}
> feature_name: {feature_name}
> iteration: {iter}
> previous_scorecard: {paste FULL JSON scorecard from last iteration, or 'null'}
> fix_queue: {paste fix_queue array from last scorecard, or '[]'}
>
> Read the PRD, generate/refine ALL contract artifacts under docs/design/contracts/{feature_name}/, then evaluate with the 6-pillar scoring engine. Output ONLY the JSON scorecard as your final message.

**Run in FOREGROUND. Wait until fully complete.** Parse the JSON scorecard.

### After Each Iteration: Convergence Check

```
delta = score - prev_score
score_history.append({iter, score, delta})
LOG: "Stage 1 iter {iter}: score={score} (Δ={delta})"

# 1. FLOOR GUARD — ALWAYS run at least MIN_ITER iterations
IF iter < 5:
  → CONTINUE (spawn next iteration)

# 2. CEILING
IF iter >= 10:
  → EXIT LOOP → proceed to Stage 1 QA with TIMEOUT warning

# 3. CONVERGED
IF score >= 90 AND convergence_status == "GATE_A_READY":
  → EXIT LOOP → proceed to Stage 1 QA

# 4. REGRESSION (2 consecutive drops)
IF delta < 0 AND prev_delta < 0:
  → EXIT LOOP → proceed to Stage 1 QA with REGRESSION warning

# 5. PLATEAU (3 consecutive deltas ≤ 1)
IF abs(delta) <= 1 AND abs(prev_delta) <= 1 AND abs(prev_prev_delta) <= 1:
  → EXIT LOOP → proceed to Stage 1 QA with STALL warning

# 6. OTHERWISE
  → prev_prev_delta = prev_delta
  → prev_delta = delta
  → prev_score = score
  → iter += 1
  → CONTINUE (spawn next iteration)
```

### Stage 1 QA: Independent Testing

After the evaluator loop exits, dispatch `ralph_stage1_qa`:

> Run QA tests on Stage 1 contract artifacts for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> prd_path: {absolute path to PRD}
> evaluator_score: {latest evaluator score}
>
> Write a test plan, execute all 6 test suites (T1-T6), write results, then output the QA scorecard JSON.

**Run in FOREGROUND. Wait for completion.** Parse QA scorecard.

**QA Convergence Check:**
- **`QA_PASS`:** All tests passed → proceed to Gate A.
- **`QA_FAIL`:** Extract `fix_queue`, feed back into evaluator loop as P0 items. Re-run evaluator (1 fix iteration, not subject to MIN_ITER), then re-run QA. Max 2 QA retry cycles.

### 🚧 GATE A: Human UX Concept Approval

Present to the human:
1. Score progression: `score_history` (show ALL iterations, should be ≥5)
2. Latest evaluator scorecard (total score, pillar breakdown)
3. QA test results (PASS/FAIL per suite)
4. ALL files under `docs/design/contracts/{feature_name}/`
5. Any TIMEOUT/REGRESSION/STALL warnings

Ask: **"APPROVE, REJECT_FIX_CONTRACT, or REJECT_FIX_PRD?"**

- **APPROVE** → Proceed to Stage 2
- **REJECT_FIX_CONTRACT** → Take feedback, re-enter Stage 1 loop from iter=1
- **REJECT_FIX_PRD** → Dispatch `prd_writer_agent` with feedback, then re-enter Stage 1

---

## STAGE 2: Implementation Ralph Loop

**Threshold:** `score >= 95` AND `p0_count == 0`
**Min iterations:** 5 | **Max iterations:** 10

### Stage 2 W0: Plan Declaration Gate (MANDATORY — Before Any Code)

Dispatch `ralph_stage2_builder` with this W0 prompt:

> Run W0 Plan Declaration for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> ds_path: {ds_path}
> mode: PLAN_ONLY
>
> **DESIGN SYSTEM MANIFEST (use these exact tokens):**
> {paste DS_MANIFEST here}
>
> Read the contract and Design System. Output a plan-declaration.json with:
> {"components": [...], "build_sequence": [...], "ds_tokens_planned": [...], "ds_components_reused": [...], "risks": [...], "tool_budget_estimate": N}
> Do NOT write any HTML/CSS. ONLY output the plan JSON.

**Run in FOREGROUND.** Parse the plan. Verify all `data-ds-id` values from `component-map.json` are in `build_sequence`. If missing, ask builder to revise.

### Stage 2 Iteration Loop

Initialize:
```
iter = 1
prev_score = 0
prev_prev_delta = 999
prev_delta = 999
score_history = []
```

Each cycle dispatches 3 SubAgents in sequence: **Builder → Browser Render → QA.**

### Step A: Dispatch Builder

Dispatch `ralph_stage2_builder`:

> Run Stage 2 iteration {iter} for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> page_path: apps/website/src/app/design-system/{feature_name}/page.tsx
> iteration: {iter}
> previous_scorecard: {previous scorecard JSON or 'null'}
> fix_queue: {merged fix_queue from builder + QA, or '[]'}
>
> **DESIGN SYSTEM MANIFEST (MANDATORY — use these exact tokens):**
> {paste DS_MANIFEST here}
>
> FIRST: Read the Design System at "{ds_path}" and the shared layout at apps/website/src/app/design-system/layout.tsx.
> THEN: Build/fix NextJS page at apps/website/src/app/design-system/{feature_name}/page.tsx using ONLY DS tokens.
> THEN: Self-audit with the 100-pt DoD scoring engine.
> Output ONLY the JSON scorecard as your final message.

**Run in FOREGROUND. Wait for completion.**

### Step A.5: Browser Render & Screenshot (MANDATORY)

Dispatch `browser_subagent`:

> Render the built UI for feature "{feature_name}" on the NextJS showcase.
>
> url: http://localhost:9993/design-system/{feature_name}
> screenshot_path: docs/design/reports/{feature_name}-render-iter-{iter}.webp
> viewport: {width: 1440, height: 900}
> storyboard_path: docs/design/contracts/{feature_name}/storyboards.json
>
> 1. Open the NextJS page at the URL above.
> 2. Capture a full-page screenshot.
> 3. Execute storyboard trajectories and capture post-interaction screenshots.
> 4. Report results as JSON.

**Run in FOREGROUND.** Handle result:
- `success` → store `screenshot_path` for QA
- `failure` → log as `RENDER_FAILED`, QA visual checks score `SKIPPED_NO_RENDER`
- `skipped` → log warning, continue

### Step A.6: DS Baseline Screenshot (If ds_dev_url exists)

If `ds_dev_url` is NOT "none", dispatch `browser_subagent` to capture the **live Design System showcase** as a visual baseline:

> Capture the live Design System showcase for visual baseline comparison.
>
> url: {ds_dev_url}
> screenshot_path: docs/design/reports/{feature_name}-ds-baseline-iter-{iter}.webp
> viewport: {width: 1440, height: 900}
>
> 1. Navigate to the Design System showcase URL (Next.js dev server).
> 2. Wait for full page load (networkidle).
> 3. Capture a full-page screenshot of the live DS.
> 4. Report results as JSON.

**Run in FOREGROUND.** Store `ds_baseline_screenshot_path`.
If `ds_dev_url` is "none", set `ds_baseline_screenshot_path = "none"`.

### Step B: Dispatch QA

Dispatch `ralph_stage2_qa`:

> Run QA acceptance tests on Stage 2 build for feature "{feature_name}".
>
> feature_name: {feature_name}
> contract_path: docs/design/contracts/{feature_name}/
> page_path: apps/website/src/app/design-system/{feature_name}/page.tsx
> live_url: http://localhost:9993/design-system/{feature_name}
> iteration: {iter}
> builder_score: {builder score from Step A}
> ds_path: {ds_path}
> screenshot_path: {screenshot_path from Step A.5, or 'none'}
> ds_baseline_screenshot_path: {ds_baseline_screenshot_path from Step A.6, or 'none'}
> ds_dev_url: {ds_dev_url or 'none'}
>
> **DESIGN SYSTEM MANIFEST (audit against these exact tokens):**
> {paste DS_MANIFEST here}
>
> Execute all 7 acceptance test suites (T1-T7). T1-T6 test page.tsx source code. T7 tests the LIVE rendered page at localhost:9993. Output the QA scorecard JSON.

**Run in FOREGROUND. Wait for completion.**

### Step C: Convergence Decision

Merge builder scorecard + QA results. Apply convergence rules:

```
delta = builder_score - prev_score
score_history.append({iter, builder_score, qa_status, delta})
LOG: "Stage 2 cycle {iter}: builder={builder_score}, QA={passed}/{total} (Δ={delta})"

# 0. SCORE SANITY CHECK — prevent builder inflation
IF prev_qa_status == "QA_FAIL" AND builder_score == 100:
  LOG: "WARNING: Builder claims 100 but previous QA found failures. Capping at 95."
  builder_score = min(builder_score, 95)

# 0.1. QA RETRY LIMIT — max 2 QA→fix→rerun cycles
IF qa_retry_count >= 2 AND qa_status == "QA_FAIL":
  → EXIT LOOP → Gate B with QA_TIMEOUT warning ("Max QA retries exceeded")

# 1. FLOOR GUARD — ALWAYS run at least MIN_ITER cycles
IF iter < 5:
  → Merge QA fix_queue into builder fix_queue → CONTINUE

# 2. CEILING
IF iter >= 10:
  → EXIT LOOP → Gate B with TIMEOUT warning

# 3. CONVERGED
IF builder_score >= 95 AND p0_count == 0 AND qa_status == "QA_PASS":
  → EXIT LOOP → Gate B

# 4. REGRESSION (2 consecutive drops)
IF delta < 0 AND prev_delta < 0:
  → Restore snapshot: cp -r .../snapshot-iter-{iter-1}/* .../
  → EXIT LOOP → Gate B with REGRESSION warning

# 5. PLATEAU (3 consecutive deltas ≤ 1)
IF abs(delta) <= 1 AND abs(prev_delta) <= 1 AND abs(prev_prev_delta) <= 1:
  → EXIT LOOP → Gate B with STALL warning

# 6. QA FAIL (merge fixes and continue)
IF qa_status == "QA_FAIL":
  → Merge QA fix_queue into builder fix_queue as P0 items
  → qa_retry_count += 1
  → CONTINUE

# 7. OTHERWISE
  → prev_prev_delta = prev_delta
  → prev_delta = delta
  → prev_score = builder_score
  → iter += 1
  → CONTINUE
```

### 🚧 GATE B: Final Human Approval

Present to the human:
1. Latest builder scorecard (total, pillars, P0/P1/P2)
2. Latest QA test results (PASS/FAIL per suite with evidence)
3. Score progression across ALL cycles (should be ≥5 data points)
4. Browser screenshots (if available)
5. Files under `docs/design/screens/{feature_name}/`
6. Any STALL/REGRESSION/TIMEOUT warnings

Ask for structured ratings:

| Criteria | Scale (1-5) | Minimum |
|----------|-------------|---------|
| Visual brand fit | 1-5 | ≥ 3 |
| Copy clarity | 1-5 | ≥ 3 |
| Interaction intuitiveness | 1-5 | ≥ 3.5 |
| Safety / edge cases | 1-5 | ≥ 4 |
| Production readiness | 1-5 | ≥ 3.5 |

**YOU MUST WAIT FOR THE HUMAN TO RESPOND. DO NOT self-score. Present deliverables and STOP.**

- **APPROVE** → Log to `docs/design/reports/{feature_name}-approval-log.md`. Done!
- **REQUEST_FIX** → Take feedback, add to fix_queue, re-enter Stage 2 loop

---

## Final Summary

After completion, write `docs/design/reports/{feature_name}-pipeline-summary.md`:
- Stage 1: total iterations (expected ≥5), final score, score_history
- Stage 2: total cycles (expected ≥5), final score, final QA results
- Gate A and Gate B decisions
