---
name: ralph-loop-stage-2
description: Run Stage 2 of the schema-driven Ralph Loop to build, audit, QA, browser-render, and route UI implementation against ui-contract.md.
argument-hint: "<prd-path> <feature-name>"
---

<!-- beads-id: br-skill-ralph-loop-stage-2 -->

# Ralph Loop Stage 2 Skill

Use this skill after Gate A approval.

Arguments: `$ARGUMENTS`

## Preconditions

Require these Stage 1 artifacts before building:

- `docs/design/contracts/{feature}/ui-contract.md`
- `review-diagrams.md`
- `flow.md`
- `storyboards.json`
- `layout-rules.json`
- `component-map.json`
- `preview/index.html`

If any are missing, return to `/ralph-loop-stage-1` instead of guessing.
When consuming `flow.md` or `review-diagrams.md`, use only fenced `mermaid` blocks as diagram sources.

## Context Budget Protocol

- Builders use `ui-contract.md` as the LLM-facing source of truth; JSON artifacts are compiled outputs for machines.
- Do not inject full `storyboards.json`, `layout-rules.json`, or `component-map.json` into builder prompts when a YAML/Mermaid source or small slice is sufficient.
- For Stage 2 fixes, pass only the routed `fix_queue` plus targeted screen/state/viewport/`ds_id` slices, preferably restated as compact YAML/TOON.
- Auditors and QA may scan full JSON mechanically, but their LLM-facing evidence should be diff-only: counts, missing IDs, failed trajectories, and line/path references.

## Stage 2 Sequence

1. Compile DS manifest from `packages/design-system/registry.json`, token CSS files, and `apps/website/src/app/globals.css` when available.
2. Dispatch `ralph_stage2_build_layout` to create the page skeleton from YAML View Blueprint and targeted layout-rule slices.
3. Dispatch `ralph_stage2_build_components` to fill components, data, and actions from YAML/Mermaid plus targeted component/storyboard slices.
4. Dispatch `ralph_stage2_build_states` to implement state variants, accessibility, and DS polish from YAML/Mermaid plus targeted assertion slices.
5. Dispatch `browser_subagent` to render the built UI and capture screenshots.
6. Dispatch `ralph_stage2_builder` for 100-point DoD audit.
7. Dispatch `ralph_stage2_qa` for independent acceptance checks.
8. Dispatch `ralph_stage2_ba` after each audit/QA cycle to route fixes.
9. Present Gate B only when score ≥95, zero P0, and QA passes.

## Guardrails

- Do not read old ASCII wireframes or ASCII user flows as source artifacts.
- Do not silently resolve PRD ↔ DS conflicts; use the conflict report.
- Do not push or create commits without explicit user approval.
