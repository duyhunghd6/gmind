# Agent Memory: gen_wireframes
<!-- beads-id: bd-agent-mem-gen-wireframes -->
Last updated: (not yet run)

## Patterns That Consistently PASS
- Structured heading hierarchy with `## State:` sections in composite files
- Box-grid with width annotations `[60%]` / `[40%]`
- Including placeholder text inside boxes (not just block names)
- ≥3 nesting levels for complex screens

## Patterns That Consistently FAIL
- Tree-indent format in .wideframe.ascii.md → FORMAT_REGRESSION (PreToolUse hook blocks this)
- Stub blocks (block with only a name, no sub-elements) → always flagged P1
- Missing mobile viewport wireframes → scorer deducts 30%
- Forgetting empty/error state variations → always flagged P0

## Human Feedback Themes (from Gate A rejections)
- (populated after first Gate A rejection)

## Score Trajectory Across Features
- (populated after first pipeline run)
