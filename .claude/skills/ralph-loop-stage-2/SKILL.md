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
- `review-diagrams.mmd`
- `storyboards.json`
- `layout-rules.json`
- `component-map.json`
- `preview/index.html`

If any are missing, return to `/ralph-loop-stage-1` instead of guessing.

## Stage 2 Sequence

1. Compile DS manifest from `packages/design-system/registry.json`, token CSS files, and `apps/website/src/app/globals.css` when available.
2. Dispatch `ralph_stage2_build_layout` to create the page skeleton from YAML View Blueprint and layout rules.
3. Dispatch `ralph_stage2_build_components` to fill components, data, and actions from component map and Mermaid/storyboard bindings.
4. Dispatch `ralph_stage2_build_states` to implement state variants, accessibility, and DS polish from Mermaid states and storyboards.
5. Dispatch `browser_subagent` to render the built UI and capture screenshots.
6. Dispatch `ralph_stage2_builder` for 100-point DoD audit.
7. Dispatch `ralph_stage2_qa` for independent acceptance checks.
8. Dispatch `ralph_stage2_ba` after each audit/QA cycle to route fixes.
9. Present Gate B only when score ≥95, zero P0, and QA passes.

## Guardrails

- Do not read old ASCII wireframes or ASCII user flows as source artifacts.
- Do not silently resolve PRD ↔ DS conflicts; use the conflict report.
- Do not push or create commits without explicit user approval.
