# Organization Memory: Ralph Loop Agent Team
<!-- beads-id: bd-agent-org-memory -->
Last updated: (not yet run — initialized template)

## Cross-Agent Correlations
- (populated after 3+ features — tracks which agent failures predict downstream failures)

## Team Performance Baselines
- (populated after 3+ features — median first-iter scores, iterations to converge)

## Routing Intelligence
- (populated after 5+ features — identifies bottleneck agents and optimization opportunities)

## Anti-Patterns (organization-wide)
- DO NOT let scorer feedback say "needs more detail" without specifying WHERE
- DO NOT re-spawn all 3 generators when only 1 failed (cost: 3× per iteration)
- DO NOT skip snapshot creation before re-spawn (prevents regression detection)
- DO NOT accept self-scores without tool_evidence[] (GAP-52 anti-inflation rule)
