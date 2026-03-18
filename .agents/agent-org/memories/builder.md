# Agent Memory: builder (Stage 2 Auditor)
<!-- beads-id: bd-agent-mem-builder -->
Last updated: (not yet run)

## Auditing Patterns
- Always verify DS token usage mechanically (grep for var(--)
- Attribution must specify exact `responsible_builder`, not just category
- Check all 4 data-state attributes with tool (grep, not visual scanning)

## Common Auditing Errors to Avoid
- Accepting page.tsx without checking for hallucinated tokens
- Scoring a11y without verifying aria-label presence via tool
- Vague fix_queue items — always specify exact line/component

## Human Feedback Themes
- (populated after first Gate B rejection)

## Score Trajectory Across Features
- (populated after first pipeline run)
