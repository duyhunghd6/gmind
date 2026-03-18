# Agent Memory: gen_flows
<!-- beads-id: bd-agent-mem-gen-flows -->
Last updated: (not yet run)

## Patterns That Consistently PASS
- Connected multi-screen diagrams with labeled arrows `──[click]──►`
- Return paths shown (back nav, close, breadcrumb)
- Decision points and error-recovery paths included
- Miniature wireframe contents inside each screen box

## Patterns That Consistently FAIL
- Linear chains `[A] → [B] → [C]` → always REJECTED (PreToolUse hook blocks this)
- Abstract state names instead of wireframe contents inside boxes
- Missing return paths (no back/close arrows)
- Component map with unmapped blocks

## Human Feedback Themes (from Gate A rejections)
- (populated after first Gate A rejection)

## Score Trajectory Across Features
- (populated after first pipeline run)
