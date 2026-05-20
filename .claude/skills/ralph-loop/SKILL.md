---
name: ralph-loop
description: Run the full schema-driven Ralph Loop UI/UX workflow by dispatching init, Stage 1, and Stage 2 subagents for a target PRD.
argument-hint: "<prd-path> [feature-name]"
---

<!-- beads-id: br-skill-ralph-loop -->

# Ralph Loop Master Skill

Use this skill when the user asks to run the full GSAFe Ralph Loop UI/UX pipeline for a PRD.

Arguments: `$ARGUMENTS`

## Dispatcher Contract

You are a thin dispatcher. Do not parse PRDs inline, generate artifacts inline, score artifacts inline, or write UI implementation yourself. Use the configured Ralph subagents and route through the stage skills below:

1. `/ralph-loop-design-init` — initialize feature slug, pipeline state, DS context, and artifact paths.
2. `/ralph-loop-stage-1` — produce and verify the schema-driven `ui-contract.md` and derived review artifacts.
3. `/ralph-loop-stage-2` — build, audit, QA, browser-render, and route final Gate B results.

## Source-of-Truth Rules

- Canonical contract source: `docs/design/contracts/{feature}/ui-contract.md`.
- `ui-contract.md` must contain exactly one YAML View Blueprint fenced block and exactly one Mermaid Logic Machine fenced block.
- Generated artifacts are derived outputs: `review-diagrams.mmd`, `flow.mmd`, `storyboards.json`, `layout-rules.json`, `component-map.json`, `prd-ds-conflicts.md`, assertion checklist, and preview output.
- Do not create new hand-authored ASCII wireframes or ASCII user-flow artifacts.

## Required Handoff

After Stage 1 passes QA, show the human Gate A package: `ui-contract.md`, review diagrams, storyboards, layout rules, component map, conflicts, and preview HTML. After Stage 2 passes QA, show Gate B scorecard, screenshots, acceptance results, and known residual risks.
