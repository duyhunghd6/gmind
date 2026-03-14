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
- Use `/ralph-loop` to run the full UI/UX Ralph Loop pipeline.
- Use `/satisfy-matrix` to generate a Requirements Traceability Matrix.
- Use `/aiworkflows-ingest` to ingest AI Workflows into the showcase website.

## Available SubAgents

- `antigravity_orchestrator` — Ralph Loop pipeline planner (reads PRD → outputs structured plan).
- `browser_subagent` — Headless browser rendering and screenshot capture.
- `gsafe_manager` — SAFe lifecycle status checker and coordinator.
- `prd_writer_agent` — PRD gap-filling and conflict resolution.

## Key Skills (External)

These skills are located in `.agents/skills/` and activated by the main model:

- `design-system-gatecheck` — The Evaluator: 12-step QA pipeline, 100-pt scoring.
- `agenticse-design-system` — The Implementor: HTML/CSS generation from contracts.

## Methodology Source

Root methodology: `docs/researches/spikes/spike-design-system-ralph-loop-agent.md`
