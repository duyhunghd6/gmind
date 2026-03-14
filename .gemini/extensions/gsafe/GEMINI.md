# GSAFe 6.0 Extension Context

This extension implements GSAFe 6.0 (Agentic Software Engineering) workflows in Gemini CLI.

## Core Principles

1. **Beads ID Tracking:** Every markdown file and code section must be linked via `beads-id`.
2. **Continuous Exploration:** Always research, architect, and synthesize before implementing.
3. **Ralph Loop:** Use the staged UI/UX iteration loop for frontend tasks.

## Universal ID Convention

- PRDs: `br-prd{File#}-s{Section#}`
- Plans: `br-plan-{ID} | satisfies: br-prd{File#}-s{Section#}`
- Spikes: `bd-xxx` (created via `bd create`)
- Commits: Must include `Beads-ID: br-xxx, bd-xxx` trailer.

## Workflow Orchestration

- Use `/init` to start a new GSAFe project structure.
- Use `/research` to start a Continuous Exploration research spike.
- Use `/ralph-loop <prd-path>` to run the full UI/UX Ralph Loop pipeline.
- Use `/satisfy-matrix` to generate a Requirements Traceability Matrix.
- Use `/aiworkflows-ingest` to ingest AI Workflows into the showcase website.

## Ralph Loop Architecture (SubAgent Spawn-Loop)

The `/ralph-loop` command makes YOU (the main model) the Master Orchestrator:

1. **Stage 1 Loop:** You spawn `ralph_stage1_evaluator` N times. Each spawn runs one contract iteration and returns a JSON scorecard. You collect scores and check convergence (≥90). Then you present Gate A to the human.
2. **Stage 2 Loop:** You spawn `ralph_stage2_builder` N times. Each spawn runs one build+audit iteration and returns a JSON scorecard. You check convergence (≥95, zero P0). Then you present Gate B to the human.

**SubAgents get fresh context per spawn.** Inter-iteration state travels via:
- Disk artifacts (contract files, HTML, scorecards) that persist between spawns
- Previous scorecard JSON passed in the SubAgent invocation prompt

## Available SubAgents

- `ralph_stage1_evaluator` — Stage 1: one-iteration contract generator + 6-pillar scorer.
- `ralph_stage2_builder` — Stage 2: one-iteration HTML/CSS builder + 100-pt DoD auditor.
- `browser_subagent` — Headless browser rendering and screenshot capture.
- `gsafe_manager` — SAFe lifecycle status checker and coordinator.
- `prd_writer_agent` — PRD gap-filling and conflict resolution.

## Key Skills (External)

These skills are located in `.agents/skills/` and activated by the main model:

- `design-system-gatecheck` — The Evaluator: 12-step QA pipeline, 100-pt scoring.
- `agenticse-design-system` — The Implementor: HTML/CSS generation from contracts.

## Methodology Source

Root methodology: `docs/researches/spikes/spike-design-system-ralph-loop-agent.md`
