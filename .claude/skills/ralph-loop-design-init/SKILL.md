---
name: ralph-loop-design-init
description: Initialize a schema-driven Ralph Loop run for a PRD by preparing feature paths, pipeline state, and design-system context.
argument-hint: "<prd-path> [feature-name]"
---

<!-- beads-id: br-skill-ralph-loop-design-init -->

# Ralph Loop Design Init

Use this skill before Stage 1 or the full Ralph Loop.

Arguments: `$ARGUMENTS`

## What to Do

1. Confirm the PRD path exists without parsing the full PRD inline.
2. Derive `feature_name` from the explicit second argument or from the PRD filename.
3. Confirm required directories exist:
   - `.claude/agents/`
   - `.claude/skills/ralph-ui-contract-to-ui/`
   - `.agents/skills/agenticse-design-system-gatecheck/`
   - `.agents/skills/agenticse-design-system-create/`
4. Initialize pipeline state under `docs/design/pipeline-state/{feature_name}/`.
5. Establish contract paths:
   - `docs/design/contracts/{feature_name}/ui-contract.md`
   - `docs/design/contracts/{feature_name}/review-diagrams.mmd`
   - `docs/design/contracts/{feature_name}/storyboards.json`
   - `docs/design/contracts/{feature_name}/layout-rules.json`
   - `docs/design/contracts/{feature_name}/component-map.json`
   - `docs/design/contracts/{feature_name}/preview/index.html`
6. Discover Design System context from `packages/design-system/registry.json` and the website showcase at `http://localhost:9993/design-system` when available.

## Guardrails

- Do not delete or overwrite existing contract artifacts without user approval.
- Do not use `.claude/commands/*.md` as the command source for new Ralph workflows.
- Preserve existing `<!-- beads-id: ... -->` markers in any Markdown you touch.

## Output

Return a short initialization report containing `feature_name`, PRD path, contract directory, DS registry status, preview script path, and next recommended command.
