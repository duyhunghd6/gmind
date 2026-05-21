---
name: design-system-ralph-loop
description: Unified schema-driven Ralph Loop command for design-system UI workflows. Use action=init, auto, stage1, stage2, preview, or validate-mermaid.
argument-hint: "<action=init|auto|stage1|stage2|preview|validate-mermaid> <prd-path|contract-path> [feature-name]"
---

<!-- beads-id: br-skill-design-system-ralph-loop -->

# Design System Ralph Loop

Arguments: `$ARGUMENTS`

Use this single command for the schema-driven GSAFe Ralph Loop UI/UX pipeline. The first argument is the action:

- `init` — prepare feature paths, pipeline state, and design-system context.
- `auto` — run init, Stage 1, human Gate A handoff, Stage 2, and Gate B routing.
- `stage1` — generate/evaluate/QA the contract package before Gate A.
- `stage2` — build/audit/QA the UI implementation after Gate A approval.
- `preview` — render a human-checkable static preview from `ui-contract.md`.
- `validate-mermaid` — validate fenced Mermaid blocks in Markdown artifacts.

## Unified Dispatcher Contract

<!-- beads-id: br-skill-ralph-loop -->

You are a thin dispatcher. Do not parse PRDs inline, generate artifacts inline, score artifacts inline, or write UI implementation yourself. Use the configured Ralph subagents, disk artifacts, scorecards, and BA routing decisions.

Source-of-truth rules:

- Canonical contract source: `docs/design/contracts/{feature}/ui-contract.md`.
- `ui-contract.md` must contain exactly one YAML View Blueprint fenced block and exactly one Mermaid Logic Machine fenced block.
- The YAML View Blueprint fence must use human-reviewable block-style YAML only: top-level keys such as `metadata:`, `viewports:`, and `screens:` on separate lines with indented nested fields and `-` list items.
- JSON, minified JSON, JSON object/array literals, or one-line serialized objects inside the `yaml` fence are invalid, even when a YAML parser accepts them.
- Generated artifacts are derived outputs: `review-diagrams.md`, `flow.md`, `storyboards.json`, `layout-rules.json`, `component-map.json`, `prd-ds-conflicts.md`, assertion checklist, and preview output.
- Mermaid artifacts must be Markdown files containing fenced `mermaid` blocks; do not create standalone `*.mmd` files.
- Do not create hand-authored ASCII wireframes or ASCII user-flow artifacts.

## Action: init

<!-- beads-id: br-skill-ralph-loop-design-init -->

Use before Stage 1 or `auto` when the feature state has not been initialized.

1. Confirm the PRD path exists without parsing the full PRD inline.
2. Derive `feature_name` from the explicit third argument or from the PRD filename.
3. Confirm required directories exist:
   - `.claude/agents/`
   - `.claude/skills/design-system-ralph-loop/scripts/contract_to_ui.py`
   - `.claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py`
   - `.agents/skills/agenticse-design-system-gatecheck/`
   - `.agents/skills/agenticse-design-system-create/`
4. Initialize pipeline state under `docs/design/pipeline-state/{feature_name}/`.
5. Establish contract paths:
   - `docs/design/contracts/{feature_name}/ui-contract.md`
   - `docs/design/contracts/{feature_name}/review-diagrams.md`
   - `docs/design/contracts/{feature_name}/storyboards.json`
   - `docs/design/contracts/{feature_name}/layout-rules.json`
   - `docs/design/contracts/{feature_name}/component-map.json`
   - `docs/design/contracts/{feature_name}/preview/index.html`
6. Discover Design System context from `packages/design-system/registry.json` and the website showcase at `http://localhost:9993/design-system` when available.
7. Return a short initialization report with `feature_name`, PRD path, contract directory, DS registry status, preview script path, and next action.

Guardrails: do not delete or overwrite existing contract artifacts without user approval; preserve existing `<!-- beads-id: ... -->` markers in Markdown.

## Action: stage1

<!-- beads-id: br-skill-ralph-loop-stage-1 -->

Use to create and verify the low-fi contract package for Gate A.

1. Dispatch `ralph_stage1_gen_contracts` to create or update `ui-contract.md` metadata and block-style YAML View Blueprint.
2. Dispatch `ralph_stage1_gen_flows` to create or update the Mermaid Logic Machine and derived `flow.md`, `storyboards.json`, `component-map.json`, and `prd-ds-conflicts.md` only after the YAML fence is confirmed to be block-style YAML. Require it to run `python3 .claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py {contract_path}/flow.md` before returning `DONE`.
3. Dispatch `ralph_stage1_gen_wireframes` to generate Mermaid review diagrams from `ui-contract.md`; no ASCII artifacts. Require it to run `python3 .claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py {contract_path}/review-diagrams.md` before returning `DONE`.
4. Run `.claude/skills/design-system-ralph-loop/scripts/contract_to_ui.py` only as a mechanical preview check.
5. Dispatch `ralph_stage1_evaluator` for schema-first scoring.
6. Dispatch `ralph_stage1_ba` after every evaluator run.
7. When BA returns `GATE_A_READY`, dispatch `ralph_stage1_qa`.
8. If QA passes, present the Gate A package. If QA fails, route back through BA and selectively respawn responsible generators.

Gate A package: `ui-contract.md`, `review-diagrams.md`, optional `review-diagrams/*.md`, `flow.md`, `storyboards.json`, `layout-rules.json`, `component-map.json`, optional `context-slices/**/*.yaml`, `prd-ds-conflicts.md`, assertion checklist, `preview/index.html`, and `preview-manifest.json`.

Rejection routing: `REJECT_FIX_CONTRACT` routes to the responsible contract/flow/diagram generator; `REJECT_FIX_PRD` routes to `prd_writer_agent`; `APPROVE` unlocks `stage2`.

## Action: preview

<!-- beads-id: br-skill-ralph-ui-contract-to-ui -->

Use when the user or Stage 1 needs a quick human-checkable UI preview from `ui-contract.md`.

Run:

```bash
python3 .claude/skills/design-system-ralph-loop/scripts/contract_to_ui.py --contract docs/design/contracts/{feature}/ui-contract.md --out docs/design/contracts/{feature}/preview
```

Inputs: the contract file must contain exactly one fenced YAML block for the View Blueprint and exactly one fenced Mermaid block for the Logic Machine.

Outputs:

- `index.html` — static human preview of screens, states, components, actions, and transitions
- `preview-manifest.json` — parsed summary and warnings

This is not a production Next.js generator. If parsing fails, fix the contract instead of bypassing the preview.

## Action: validate-mermaid

<!-- beads-id: br-skill-design-system-ralph-loop-validate-mermaid -->

Use after any subagent generates or changes Mermaid-in-Markdown artifacts.

Run:

```bash
python3 .claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py docs/design/contracts/{feature}/flow.md docs/design/contracts/{feature}/review-diagrams.md
```

The validator extracts fenced `mermaid` blocks from Markdown, rejects standalone `.mmd` artifacts in the contract directory, runs Mermaid CLI (`mmdc`) when available, and falls back to deterministic Python checks when it is not installed.

## Action: stage2

<!-- beads-id: br-skill-ralph-loop-stage-2 -->

Use after Gate A approval.

Preconditions:

- `docs/design/contracts/{feature}/ui-contract.md`
- `review-diagrams.md`
- `flow.md`
- `storyboards.json`
- `layout-rules.json`
- `component-map.json`
- `preview/index.html`

If any are missing, return to `stage1` instead of guessing. If the YAML fence is JSON, minified JSON, a JSON object/array literal, or a one-line serialized object, return to `stage1` before building.

Sequence:

1. Compile DS manifest from `packages/design-system/registry.json`, token CSS files, and `apps/website/src/app/globals.css` when available.
2. Dispatch `ralph_stage2_build_layout` to create the page skeleton from YAML View Blueprint and targeted layout-rule slices.
3. Dispatch `ralph_stage2_build_components` to fill components, data, and actions from YAML/Mermaid plus targeted component/storyboard slices.
4. Dispatch `ralph_stage2_build_states` to implement state variants, accessibility, and DS polish from YAML/Mermaid plus targeted assertion slices.
5. Dispatch `browser_subagent` to render the built UI and capture screenshots.
6. Dispatch `ralph_stage2_builder` for 100-point DoD audit.
7. Dispatch `ralph_stage2_qa` for independent acceptance checks.
8. Dispatch `ralph_stage2_ba` after each audit/QA cycle to route fixes.
9. Present Gate B only when score ≥95, zero P0, and QA passes.

Context budget protocol: builders use `ui-contract.md` as the LLM-facing source of truth; pass only routed `fix_queue` plus targeted screen/state/viewport/`ds_id` slices, preferably compact YAML/TOON. Auditors and QA may scan full JSON mechanically, but their LLM-facing evidence should be diff-only.

Guardrails: do not read old ASCII wireframes or ASCII user flows as source artifacts; do not silently resolve PRD ↔ DS conflicts; do not push or create commits without explicit user approval.

## Action: auto

<!-- beads-id: br-skill-design-system-ralph-loop-auto -->

Run `init`, then `stage1`. Stop for the human Gate A package before entering `stage2` unless the user already granted Gate A approval in the current instruction. After `stage2` passes, show Gate B scorecard, screenshots, acceptance results, and known residual risks.
