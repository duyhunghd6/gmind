# Project Ralph Loop

<!-- beads-id: br-command-project-ralph-loop -->

Run the schema-driven GSAFe Design System Ralph Loop workflow.

**Arguments:** `$ARGUMENTS`

## Dispatch

Use the `design-system-ralph-loop` skill with the exact arguments above. Remain a thin dispatcher: do not parse PRDs inline, generate artifacts inline, score artifacts inline, or write UI implementation directly. Route work through the configured Ralph Loop subagents, scorecards, QA results, and BA routing decisions.

## Feature Naming & Output Path Rule

When the PRD path is `docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`, or the requested feature is WebUI PM Workspace, normalize the feature slug to `webui-and-pm-workspace`.

For that feature:

- Stage 1 contract output root: `docs/design/contracts/webui-and-pm-workspace`
- Pipeline state root: `docs/design/pipeline-state/webui-and-pm-workspace`
- Stage 2 page target: `apps/website/src/app/design-system/webui-pm-workspace/page.tsx`

Do not create or target `docs/design/contracts/PRD-04-WebUI-and-PM-Workspace` for new Stage 1 output unless the user explicitly requests a legacy path migration.
