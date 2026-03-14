# Ingest AI Workflows into Showcase Website

Follow the Prompt Palettes (AI Workflows) ingestion process for: $ARGUMENTS

## Reference

Read the PRD specification first: `docs/PRDs/apps-website/PRD-01-Prompts-Library.md`

Check existing workflows: `ls apps/website/src/data/workflows/`

## Steps

1. Read the PRD above for category and format rules.
2. Categorize the new workflow:
   - A. Khởi tạo Projects
   - B. One-shot AI Coding
   - C. XP Agentic Coding
   - D. SAFe 6.0 AgenticSE
3. Assign a submenu ID: `{Category}.{Sequence}` (e.g., D.2).
4. Create the workflow JSON in `apps/website/src/data/workflows/`.
5. Register the workflow in `workflow-prompts.ts` under `workflowCategories`.
6. Ensure the JSON includes: `id`, `title`, `description`, and `steps[]` (with `promptText`, `guidanceContext`, `nextSteps`).
