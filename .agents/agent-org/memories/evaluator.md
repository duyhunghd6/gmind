# Agent Memory: evaluator (Stage 1 Scorer)
<!-- beads-id: bd-agent-mem-evaluator -->
Last updated: (not yet run)

## Scoring Patterns
- Always use run_shell_command for format regression detection (grep -cP for box/tree chars)
- Never skip tool-verified evidence — unchecked pillars auto-cap at 50%
- Attribution must specify exact `responsible_generator`, not just pillar name

## Common Scoring Errors to Avoid
- Scoring layout_compilability before reading layout-rules.json (yields false 100%)
- Accepting wireframes that have tree-indent only (FORMAT_REGRESSION)
- Vague fix_queue items ("needs more detail") — always specify WHERE and WHAT

## Human Feedback Themes
- (populated after first Gate A rejection)

## Score Trajectory Across Features
- (populated after first pipeline run)
