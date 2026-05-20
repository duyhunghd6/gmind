# Ralph Loop Skill Continuity Log

<!-- beads-id: br-skill-ralph-loop-log -->

## Purpose

This log captures implementation context for future agents improving the schema-driven Ralph Loop skill suite. Use it as the handoff record before changing `.claude/skills/ralph-loop*`, `.claude/agents/ralph_stage*`, or the AgenticSE design-system skills.

## Current Capability Snapshot

<!-- beads-id: br-skill-ralph-loop-log-s1 -->

- The master skill lives at `.claude/skills/ralph-loop/SKILL.md` and dispatches the full workflow.
- Stage skills live at:
  - `.claude/skills/ralph-loop-design-init/SKILL.md`
  - `.claude/skills/ralph-loop-stage-1/SKILL.md`
  - `.claude/skills/ralph-loop-stage-2/SKILL.md`
- The human-preview converter lives at `.claude/skills/ralph-ui-contract-to-ui/`.
- The preview script is `.claude/skills/ralph-ui-contract-to-ui/scripts/contract_to_ui.py`.
- The canonical Stage 1 source is `docs/design/contracts/{feature}/ui-contract.md`.
- `ui-contract.md` must contain exactly one YAML View Blueprint fenced block and exactly one Mermaid Logic Machine fenced block.
- Legacy `contract.yaml`, ASCII wireframes, and ASCII user-flow artifacts are explicitly non-canonical.

## Completed Migration Notes

<!-- beads-id: br-skill-ralph-loop-log-s2 -->

- Added modern project-local Claude Code skills under `.claude/skills/` instead of adding new `.claude/commands/*.md` files.
- Added a Python preview generator skill that converts `ui-contract.md` YAML and Mermaid blocks into a simple static UI preview for human verification.
- Updated Stage 1 subagents to produce and validate schema-driven contracts and derived artifacts.
- Updated Stage 2 subagents to consume `ui-contract.md`, `component-map.json`, `storyboards.json`, `layout-rules.json`, `flow.mmd`, review diagrams, and preview manifest.
- Updated AgenticSE gatecheck/create skill docs and rules to avoid stale source-of-truth language.
- Added `.claude/skills/ralph-loop/hooks/rft_session_logger.py` as an opt-in hook helper for readable RFT session traces.

## Verification Already Performed

<!-- beads-id: br-skill-ralph-loop-log-s3 -->

- Preview script happy-path fixture generated `preview/index.html` and `preview/preview-manifest.json`.
- Preview script malformed-contract checks produced clear failures for missing or duplicate YAML/Mermaid fenced blocks.
- A traversal bug was fixed so YAML actions nested under `screens[].layout` are detected.
- Focused stale-reference scan found only explicit legacy-prohibition language after the final design-system doc updates.

## Known Follow-Ups

<!-- beads-id: br-skill-ralph-loop-log-s4 -->

- Consider converting `.claude/commands/ralph-loop.md` into a compatibility shim if duplicate `/ralph-loop` discovery causes confusion.
- Improve the preview script with richer validation for Mermaid event coverage, storyboard consistency, and layout-rule drift.
- Add fixture-based tests for the preview script once the repository has a stable test location for skill scripts.
- If enabling the RFT hook, install it only after deciding the privacy policy for prompt/tool logging.
- Keep generated RFT datasets separate from design contracts so training traces do not become contract source artifacts.

## RFT Iteration Guidance

<!-- beads-id: br-skill-ralph-loop-log-s5 -->

Future agents should evaluate each Ralph Loop iteration by comparing:

1. The PRD and normalized intent.
2. The `ui-contract.md` YAML/Mermaid source.
3. Derived artifacts and preview output.
4. Stage 1 evaluator and QA scorecards.
5. Stage 2 builder/auditor and QA scorecards.
6. Human Gate A/Gate B acceptance or rejection notes.

When a failure recurs, update the relevant skill/subagent prompt rather than patching only the generated artifact. Preserve the thin-dispatcher design: skills orchestrate, subagents generate/evaluate, and the preview script performs mechanical human-review rendering.
