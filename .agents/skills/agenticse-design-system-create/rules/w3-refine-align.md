# Workflow 3: Refine & Align (`design:refine`)

<!-- beads-id: br-design-create-w3 -->

**Goal:** Fix prioritized scorecard or QA issues without reopening the whole design. One invocation equals one pass.

## Steps

### 3.0 Ingest Prioritized Feedback

Read the incoming Stage 2 auditor/QA scorecard. The fix queue is ordered:

```text
p0_fixes -> fix first
p1_fixes -> fix after all P0s verify
p2_fixes -> fix last if still requested
```

1. Parse the scorecard and QA result paths provided by the orchestrator.
2. Log `rollout_id` and `iteration` when present.
3. If `REGRESSION_DETECTED` exists, only address regression P0 items.
4. If normal `RALPH_LOOP_CONTINUE`, complete P0 fixes before P1 fixes.
5. Never fix P2 items before P0 items are resolved.

### 3.1 Re-Read Contract Context for the Failed Area

For each fix, read only the relevant portions of:

- `docs/design/contracts/{feature}/ui-contract.md`
- `docs/design/contracts/{feature}/component-map.json`
- `docs/design/contracts/{feature}/storyboards.json`
- `docs/design/contracts/{feature}/layout-rules.json`
- `docs/design/contracts/{feature}/flow.mmd`
- `docs/design/contracts/{feature}/preview/preview-manifest.json`

Do not use legacy ASCII artifacts to justify a fix.

### 3.2 Apply Fixes and Element Diff Protocol

Any visual change to screens, tokens, or accessibility must follow `element-diff-protocol.md`:

1. Extract `before.html`.
2. Apply the code/token/a11y change.
3. Extract `after.html`.
4. Generate `diff.html`.
5. Log `meta.json`.

### 3.3 Pre-Submission Self-Verification Checklist

Run and log self-checks before handing off:

1. CSS/style lint or equivalent.
2. Browser preview or screenshot when a UI route is available.
3. Pre-submission checklist: token violations, hardcoded colors, P0 fixes resolved, contract IDs still present.

If any check fails, fix it before handoff.

### 3.4 Platform Variants

If required by `ui-contract.md`, create platform variants directly through focused edits.

### 3.5 Cross-Codebase Terminology Sync

Use this route for global copy or terminology changes. Scan relevant HTML, JSON, TS/TSX, and token files before proposing replacements.

### 3.6 Update Showcase Hub

Update the showcase only when the fix touches shared DS components, tokens, or public examples.
Record changes in the hub changelog when applicable.

### 3.7 Iteration Notes

Write iteration notes that link to diffs, scorecard IDs, rollout ID, iteration number, and contract artifact references.

### 3.8 QA and Handover

Return the exact files changed, self-check evidence, and any unresolved risks to the orchestrator for the next audit/QA cycle.
