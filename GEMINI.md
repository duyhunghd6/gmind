- Rules to put to git: Do not push to git without the agreement of me or PMO.
- Project techstack: Go
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage (instead of SQLite).
- Keep code file smaller than 400 lines, split into multiple files if necessary. Keep docs files smaller than 1000 lines.
- Markdown Rules (*.md): When writing/modifying/removing documentation files → read and run: @/Users/steve/duyhunghd6/gmind/.agents/workflows/arch-review-docs-add-beads.md
- SSOT & Documentation (File Level): The `./docs` subdirectory acts as the Single Source of Truth (SSOT). All projects must adhere to this file-level structure:
  - `./docs/PRDs/`: Product Requirement Documents defining features, architecture, and system specs.
  - `./docs/plans/`: Implementation plans and execution checklists mapped from PRDs.
  - `./docs/researches/`: Spikes, research topics, and technical investigations.
  - `./docs/tests/`: QA test plans and validation test scripts.
  - `./docs/design/`: UI/UX designs, system mockups, and interface specification logic.
  - `./docs/eval-dataset/`: Dataset collections for evaluating AI pipelines and workflows.
  - `./docs/assets/`: Static documentation files, image assets, and media.
- Research / Spike Rules: `.agents/rules/research-rules.md` activates **only** when editing files under `docs/researches/spikes/**`. It enforces SAFe 6.0 CE rules (spike-before-code, read-prior-spikes, no implementation during CE). Outside that path, the rule is inactive.
- Git Commit Rules: Group and split commits into logical clusters (1-3 significant changes per Beads ID: targeting 1 issue, 1 feature, 1 plan, or 1 bug). Commit messages **MUST be in English only**. Each commit message **must** include a Git Trailer with the Universal ID on the last line. Standard format:

  ```
  type(scope): short description of changes

  Detailed description of what was done, why, and impact.

  Beads-ID: br-xxx, bd-xxx, br-ds-xxx
  ```

- Running website showcase at port http://localhost:9993/ ; If you can't connect just run `npm run dev` at folder `apps/website`.
- Prompt Palettes (AI Workflows): Khi tạo/sửa/xóa AI Workflow trên trang `/prompts` → **BẮT BUỘC** đọc PRD trước: @/Users/steve/duyhunghd6/gmind/docs/PRDs/apps-website/PRD-01-Prompts-Library.md. Quy tắc phân chia:
  - **Category (menu cha):** A. Khởi tạo Projects / B. One-shot AI Coding / C. XP Agentic Coding / D. SAFe 6.0 AgenticSE
  - **Submenu (workflow con):** Đánh số `{Ký tự Category}.{Số thứ tự}` (vd: A.1, C.5, D.2)
  - Workflow JSON nằm tại `apps/website/src/data/workflows/`, đăng ký trong `workflow-prompts.ts` → `workflowCategories`
  - Mỗi workflow JSON cần có: `id`, `title`, `description`, `steps[]` (với `promptText`, `guidanceContext`, `nextSteps`)

---

# GSAFe 6.0 Extension Context

This project implements GSAFe 6.0 (Agentic Software Engineering) workflows.

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

- Use `/project:ralph-loop` to run the full UI/UX Ralph Loop pipeline.
- Use `/project:research` to start a Continuous Exploration research spike.
- Use `/project:init` to initialize a GSAFe project structure.
- Use `/project:aiworkflows-ingest` to ingest AI Workflows into the showcase website.
- Use `/project:satisfy-matrix` to generate a Requirements Traceability Matrix.

## Ralph Loop Architecture (SubAgent Spawn-Loop)

The `/project:ralph-loop` command makes YOU the Master Orchestrator:

1. **Stage 1 Loop:** You dispatch `ralph_stage1_evaluator` N times until score ≥90. Then dispatch `ralph_stage1_qa` for independent pass/fail testing. If QA fails, feed failures back to evaluator. If QA passes → Gate A.
2. **Stage 2 Loop:** Each cycle: dispatch `ralph_stage2_builder` (with DS pre-read), then dispatch `ralph_stage2_qa` for acceptance testing. Convergence: builder ≥95 AND zero P0 AND QA all-PASS → Gate B.

**SubAgents get fresh context per dispatch.** Inter-iteration state travels via:
- Disk artifacts (contract files, HTML, scorecards) that persist between dispatches
- Previous scorecard JSON passed in the SubAgent invocation prompt

## Available SubAgents

- `ralph_stage1_evaluator` — Stage 1: one-iteration contract generator + 6-pillar scorer.
- `ralph_stage1_qa` — Stage 1 QA: independent contract tester (writes test plan, runs T1-T6, returns scorecard).
- `ralph_stage2_builder` — Stage 2: one-iteration HTML/CSS builder + 100-pt DoD auditor (reads existing DS first).
- `ralph_stage2_qa` — Stage 2 QA: E2E acceptance tester (storyboard replay, DS audit, a11y, returns scorecard).
- `browser_subagent` — Headless browser rendering and screenshot capture.
- `gsafe_manager` — SAFe lifecycle status checker and coordinator.
- `prd_writer_agent` — PRD gap-filling and conflict resolution.

## Key Skills (Shared with GeminiCLI)

These skills are located in `.agents/skills/` and activated by the model:

- `design-system-gatecheck` — The Evaluator: 12-step QA pipeline, 100-pt scoring.
- `agenticse-design-system` — The Implementor: HTML/CSS generation from contracts.

## Methodology Source

Root methodology: `docs/researches/spikes/spike-design-system-ralph-loop-agent.md`

## Project Techstack

- Go (primary language)
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage.
- Keep code files < 400 lines, docs files < 1000 lines.
- Running website showcase at port http://localhost:9993/
- Git commits must be in English, include `Beads-ID:` trailer on last line.
