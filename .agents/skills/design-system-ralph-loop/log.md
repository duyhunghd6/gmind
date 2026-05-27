# Ralph Loop Skill Continuity Log

<!-- beads-id: br-skill-ralph-loop-log -->

## Purpose

This log captures implementation context for future agents improving the unified schema-driven Ralph Loop skill. Use it as the handoff record before changing `.claude/skills/design-system-ralph-loop`, `.claude/agents/ralph_stage*`, or the AgenticSE design-system skills.

## Current Capability Snapshot

<!-- beads-id: br-skill-ralph-loop-log-s1 -->

- The unified command skill lives at `.claude/skills/design-system-ralph-loop/SKILL.md`.
- The command accepts `init`, `auto`, `stage1`, and `stage2` as the first argument.
- The human-preview converter and Mermaid validator are merged into `.claude/skills/design-system-ralph-loop/`.
- The preview script is `.claude/skills/design-system-ralph-loop/scripts/contract_to_ui.py`.
- The Mermaid validator is `.claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py`.
- The canonical Stage 1 source is `docs/design/contracts/{feature}/ui-contract.md`.
- `ui-contract.md` must contain exactly one YAML View Blueprint fenced block and exactly one Mermaid Logic Machine fenced block.
- Legacy `contract.yaml`, ASCII wireframes, and ASCII user-flow artifacts are explicitly non-canonical.

## Completed Migration Notes

<!-- beads-id: br-skill-ralph-loop-log-s2 -->

- Consolidated the prior command skills into one `design-system-ralph-loop` skill.
- Preserved the Stage 1 generator/evaluator/QA and Stage 2 builder/auditor/QA subagent orchestration model.
- Merged the Python preview generator and Mermaid validator into the unified Ralph Loop skill.
- Added `preview` and `validate-mermaid` actions for human preview rendering and post-generation Mermaid checks.
- Updated AgenticSE gatecheck/create skill docs and rules to avoid stale source-of-truth language.
- Kept the RFT session logger as an opt-in hook helper for readable RFT session traces.

## Verification Already Performed

<!-- beads-id: br-skill-ralph-loop-log-s3 -->

- Preview script happy-path fixture generated `preview/index.html` and `preview/preview-manifest.json`.
- Preview script malformed-contract checks produced clear failures for missing or duplicate YAML/Mermaid fenced blocks.
- A traversal bug was fixed so YAML actions nested under `screens[].layout` are detected.
- Focused stale-reference scan found only explicit legacy-prohibition language after the final design-system doc updates.

## Known Follow-Ups

<!-- beads-id: br-skill-ralph-loop-log-s4 -->

- Consider adding legacy command shims only if users need backwards-compatible aliases.
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

When a failure recurs, update the relevant skill/subagent prompt rather than patching only the generated artifact. Preserve the thin-dispatcher design: the unified skill orchestrates, subagents generate/evaluate, and the preview script performs mechanical human-review rendering.
