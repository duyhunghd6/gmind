---
description: Post-pipeline analysis — collects logs from a Claude Code or GeminiCLI pipeline run, structures them for debugging, and provides prompts for the AI Agent Architect to improve the system.
---

# /analyze-pipeline-run

## Prerequisites

- A completed (or failed) Ralph Loop pipeline run
- Know the `feature_name` used in the pipeline (e.g., `webui-pm-workspace`)

## Step 1: Identify the feature name

Ask the user:
> What is the `feature_name` from the pipeline run? (e.g., `webui-pm-workspace`, `kanban`, `docs-viewer`)

Store as `FEATURE`.

## Step 2: Collect pipeline state files

// turbo
Read the following files if they exist:

```bash
echo "=== Pipeline State ===" && \
ls -la docs/design/pipeline-state/${FEATURE}/ 2>/dev/null || echo "No pipeline-state directory found" && \
echo "" && \
echo "=== Scorecards ===" && \
ls -la docs/design/pipeline-state/${FEATURE}/scorecards/ 2>/dev/null || echo "No scorecards found" && \
echo "" && \
echo "=== Pipeline Log ===" && \
cat docs/design/pipeline-state/${FEATURE}/pipeline-log.jsonl 2>/dev/null || echo "No pipeline-log found" && \
echo "" && \
echo "=== Task Board ===" && \
cat docs/design/pipeline-state/${FEATURE}/task-board.json 2>/dev/null || echo "No task-board found"
```

## Step 3: Collect Claude Code conversation log

// turbo
If the pipeline was run via Claude Code, capture the conversation:

```bash
# Find the most recent Claude conversation file
LATEST_CONV=$(ls -t ~/.claude/projects/*/conversations/*.json 2>/dev/null | head -1)
if [ -n "$LATEST_CONV" ]; then
  echo "Found conversation: $LATEST_CONV"
  # Copy to reports directory for analysis
  mkdir -p docs/design/reports/${FEATURE}
  cp "$LATEST_CONV" docs/design/reports/${FEATURE}/claude-conversation.json
  echo "Copied to docs/design/reports/${FEATURE}/claude-conversation.json"
else
  echo "No Claude conversation found. If using terminal output:"
  echo "  tmux capture-pane -p -S -10000 > docs/design/reports/${FEATURE}/terminal-log.txt"
fi
```

## Step 4: Collect GeminiCLI log (if applicable)

// turbo
If the pipeline was run via GeminiCLI:

```bash
# Check for GeminiCLI iteration logs
ls -la docs/design/reports/${FEATURE}/*iteration*.log 2>/dev/null || \
ls -la docs/design/reports/${FEATURE}/*geminicli*.log 2>/dev/null || \
echo "No GeminiCLI logs found in docs/design/reports/${FEATURE}/"
```

## Step 5: Collect contract artifacts and scorecards

// turbo
```bash
echo "=== Contract Artifacts ===" && \
ls -la docs/design/contracts/${FEATURE}/ 2>/dev/null || echo "No contracts found" && \
echo "" && \
echo "=== Wireframes ===" && \
ls -la docs/design/contracts/${FEATURE}/wireframes/ 2>/dev/null || echo "No wireframes found" && \
echo "" && \
echo "=== User Flows ===" && \
ls -la docs/design/contracts/${FEATURE}/user-flows/ 2>/dev/null || echo "No user flows found" && \
echo "" && \
echo "=== Built Page ===" && \
ls -la apps/website/src/app/design-system/${FEATURE}/page.tsx 2>/dev/null || echo "No page.tsx found" && \
echo "" && \
echo "=== Snapshots ===" && \
ls -la docs/design/screens/${FEATURE}/ 2>/dev/null || echo "No snapshots found"
```

## Step 6: Generate the analysis report

Create `docs/design/reports/${FEATURE}/pipeline-analysis.md` with this structure:

```markdown
# Pipeline Analysis: ${FEATURE}
Date: ${TODAY}
Runtime: Claude Code / GeminiCLI (pick one)

## Pipeline Overview
- Total Stage 1 iterations: ___ (from pipeline-log or manual count)
- Total Stage 2 iterations: ___
- Final Stage 1 score: ___
- Final Stage 2 score: ___
- Gate A result: APPROVE / REJECT
- Gate B result: APPROVE / REJECT
- Total pipeline time: ___ minutes

## Issues Identified

### Format Regressions
- Did any wideframe revert to tree-indent? (check if hooks blocked anything)
- Did any user flow lose connected-screen arrows?
- Were any hallucinated DS tokens used?

### Wasted Iterations
- How many iterations were spent on the same fix?
- Which agent was re-spawned the most?
- Were golden examples injected on fix iterations?

### Memory Protocol
- Did agents read the task-board? (check pipeline-log for READ events)
- Did agents read their MEMORY.md? (check agent output)
- Were org anti-patterns followed?

### Scoring Quality
- Were tool_evidence fields populated for all pillars?
- Any score inflation detected? (score > 80 on iter 1 without tool evidence)
- Did the scorer use mechanical char counting for format regression?

## Agent Performance Table

| Agent | Iterations | First Score | Final Score | Main Issues |
|-------|-----------|-------------|-------------|-------------|
| gen_contracts | | | | |
| gen_wireframes | | | | |
| gen_flows | | | | |
| evaluator | | | | |
| build_layout | | | | |
| build_components | | | | |
| build_states | | | | |
| builder | | | | |

## Recommendations
- (filled by analyzing agent — what to update in MEMORY.md, org-memory, hooks, or SubAgent prompts)
```

## Step 7: Provide the analysis prompt

After collecting all data, give the user this prompt to paste into the AI Agent Architect (Antigravity) session:

```
Analyze the pipeline run for feature "${FEATURE}".

Files to read:
1. docs/design/reports/${FEATURE}/pipeline-analysis.md (overview)
2. docs/design/pipeline-state/${FEATURE}/pipeline-log.jsonl (event timeline)
3. docs/design/pipeline-state/${FEATURE}/task-board.json (final agent states)
4. docs/design/pipeline-state/${FEATURE}/scorecards/ (all scorecards)
5. docs/design/reports/${FEATURE}/claude-conversation.json OR terminal-log.txt (full log)

Based on this data:
1. Identify the top 3 bottlenecks (which agents wasted the most iterations?)
2. Identify any format regressions that hooks should have caught
3. Update .agents/agent-org/memories/{agent}.md for each agent that had issues
4. Update .agents/agent-org/org-memory.md with any new cross-agent correlations
5. Update .agents/agent-org/baselines.json with this run's scores
6. Suggest any hook or SubAgent prompt improvements
```

## Step 8: After analysis is complete

// turbo
Verify that agent memories were updated:

```bash
echo "=== Agent Memories (check Last updated dates) ===" && \
head -3 .agents/agent-org/memories/*.md && \
echo "" && \
echo "=== Org Memory ===" && \
head -5 .agents/agent-org/org-memory.md && \
echo "" && \
echo "=== Baselines ===" && \
cat .agents/agent-org/baselines.json
```
