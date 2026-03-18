# Organization Memory: Ralph Loop Agent Team
<!-- beads-id: bd-agent-org-memory -->
Last updated: 2026-03-18

## Cross-Agent Correlations
- (populated after 3+ features — tracks which agent failures predict downstream failures)

## Team Performance Baselines
- (populated after 3+ features — median first-iter scores, iterations to converge)

## Routing Intelligence
- (populated after 5+ features — identifies bottleneck agents and optimization opportunities)

## Anti-Patterns (organization-wide)

### Pipeline Anti-Patterns
- DO NOT let scorer feedback say "needs more detail" without specifying WHERE
- DO NOT re-spawn all 3 generators when only 1 failed (cost: 3× per iteration)
- DO NOT skip snapshot creation before re-spawn (prevents regression detection)
- DO NOT accept self-scores without tool_evidence[] (GAP-52 anti-inflation rule)
- DO NOT write placeholder code (`// ...`, `// TODO`) — hooks will BLOCK it

### Content Anti-Patterns (from taste-skill AI TELLS)
- DO NOT use "John Doe", "Jane Smith", "Sarah Chan" — use diverse, creative names
- DO NOT use "Acme Corp", "Nexus", "SmartFlow" — invent premium brand names
- DO NOT use fake round numbers (`50%`, `99.99%`, `$100`) — use organic data
- DO NOT use AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- DO NOT use "Oops!" or "Something went wrong!" — be direct and specific
- DO NOT use Lorem Ipsum — write real draft copy
- DO NOT use same avatar/image for multiple users

### Visual Anti-Patterns (from taste-skill Forbidden Patterns)
- DO NOT use pure `#000000` — use DS token `var(--text)` or off-black
- DO NOT use generic 3-column card grids — follow the wireframe layout
- DO NOT use `border + shadow + white-bg` card pattern — use elevation only when needed
- DO NOT use modals for simple actions — prefer inline editing or slide-over panels
- DO NOT use circular spinners for loading — use skeleton loaders matching layout
- DO NOT hardcode hex colors — always use `var(--*)` DS tokens
- DO NOT use generic "sun/moon" dark mode toggle icon

### Code Quality Anti-Patterns
- DO NOT use div soup — every element must be semantic HTML
- DO NOT use hardcoded pixel widths — use relative units or DS tokens
- DO NOT use arbitrary z-index (`9999`) — follow the design system scale
- DO NOT leave commented-out dead code in production
- DO NOT import components that don't exist in package.json (import hallucination)
