---
name: ralph-loop-stage-1
description: Run Stage 1 of the schema-driven Ralph Loop to generate, evaluate, QA, and route ui-contract.md artifacts before Gate A.
argument-hint: "<prd-path> <feature-name>"
---

<!-- beads-id: br-skill-ralph-loop-stage-1 -->

# Ralph Loop Stage 1 Skill

Use this skill to create and verify the low-fi contract package for Gate A.

Arguments: `$ARGUMENTS`

## Dispatcher Rules

You are a dispatcher, not a generator. Use `Agent()` calls for all artifact generation, evaluation, QA, and BA routing. Do not parse the PRD inline and do not score artifacts inline.

## Stage 1 Sequence

1. Dispatch `ralph_stage1_gen_contracts` to create or update `ui-contract.md` metadata and YAML View Blueprint.
2. Dispatch `ralph_stage1_gen_flows` to create or update the Mermaid Logic Machine and derived `flow.md`, `storyboards.json`, `component-map.json`, and `prd-ds-conflicts.md`.
3. Dispatch `ralph_stage1_gen_wireframes` to generate Mermaid review diagrams from `ui-contract.md`; no ASCII artifacts.
4. Run the preview script from `.claude/skills/ralph-ui-contract-to-ui/scripts/contract_to_ui.py` only as a mechanical preview check, not as a replacement for subagent QA.
5. Dispatch `ralph_stage1_evaluator` for schema-first scoring.
6. Dispatch `ralph_stage1_ba` after every evaluator run.
7. When BA returns `GATE_A_READY`, dispatch `ralph_stage1_qa`.
8. If QA passes, present Gate A package to the user. If QA fails, route back through BA and selectively respawn responsible generators.

## Mermaid Artifact Rules

- Mermaid artifacts must be Markdown files containing fenced `mermaid` blocks.
- Standalone `*.mmd` files are invalid and must route back to the responsible generator.
- Stage 1 QA must validate or route fixes for Mermaid syntax before Gate A.

## Gate A Package

Include these artifacts:

- `docs/design/contracts/{feature}/ui-contract.md`
- `review-diagrams.md` and optional `review-diagrams/*.md`
- `flow.md`
- `storyboards.json`
- `layout-rules.json`
- `component-map.json`
- `prd-ds-conflicts.md`
- assertion checklist
- `preview/index.html` and `preview-manifest.json`

## Rejection Routing

- `REJECT_FIX_CONTRACT` routes to YAML View Blueprint, Mermaid Logic Machine, or derived artifact owner.
- `REJECT_FIX_PRD` routes to `prd_writer_agent`.
- `APPROVE` unlocks `/ralph-loop-stage-2`.
