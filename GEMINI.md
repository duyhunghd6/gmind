<!-- beads-id: br-gemini-instructions -->
- Rules to put to git: Do not push to git without the agreement of me or PMO.
- Project techstack: Go
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage (instead of SQLite).
- Keep code file smaller than 400 lines, split into multiple files if necessary. Keep docs files smaller than 1000 lines.
- Markdown Rules (*.md): When writing/modifying/removing documentation files → read and run: @/Users/steve/duyhunghd6/gmind/.agents/workflows/arch-review-docs-add-beads.md
- Temporary Files & Scripts: All temporary scripts, mock files, test runners, and outputs (such as `test_puppeteer_dir`, which must be placed at `./tmp/test_puppeteer_dir`) must be located inside the `./tmp` directory. Do not create temporary working files or run programmatic tool calls that output scripts/temporary artifacts directly in the root project directory.
- SSOT & Documentation (File Level): The `./docs` subdirectory acts as the Single Source of Truth (SSOT). All projects must adhere to this file-level structure:
  - `./docs/PRDs/`: Product Requirement Documents defining features, architecture, and system specs.
    - `./docs/PRDs/core-gmind/`: Core Gmind system specs (e.g. `PRD-00-Vision-and-Architecture.md`, `PRD-01-Storage-and-Graph-Engine.md`, `PRD-02-Universal-Tracking-and-RTM.md`, `PRD-03-CLI-and-Agent-Execution.md`, `PRD-04-WebUI-and-PM-Workspace.md`, `PRD-05-GSafe-Workflow-and-Implementation.md`).
    - `./docs/PRDs/apps-website/`: Showcase and documentation website requirements (e.g. `PRD-00-Website-Structure.md`, `PRD-01-Prompts-Library.md`).
    - `./docs/PRDs/apps-webui/`: Workspace-specific requirement specifications.
  - `./docs/plans/`: Implementation plans and execution checklists mapped from PRDs.
  - `./docs/researches/`: Spikes, research topics, and technical investigations.
    - `./docs/researches/spikes/`: Technical spikes exploring specific features (e.g., `spike-design-system-ralph-loop-agent.md`, `spike-frankensqlite-vs-doltdb.md`, `spike-beads-knowledge-graph.md`).
    - `./docs/researches/beads/`: Reference materials and context on Beads implementation (e.g. `beads-memory-for-coding-agents.md`, `introducing-nvim-beads.md`).
    - `./docs/researches/SAFe 6.0 Framework/`: SAFe 6.0 organization structure and development processes.
  - `./docs/tests/`: QA test plans and validation test scripts (e.g. `test-plan-prd03-cli.md`).
  - `./docs/design/`: UI/UX designs, system mockups, and interface specification logic.
    - `./docs/design/contracts/`: UI Contract schemas, storyboards, and mocks (e.g. `webui-and-pm-workspace/storyboards.json`, `webui-and-pm-workspace/preview/`).
    - `./docs/design/screens/`: Screen assets, wireframes, and layouts.
    - `./docs/design/test-plans/`: Test plans and validation results for different UI stages (e.g. `webui-and-pm-workspace-qa-stage2-iter-1.md`).
    - `./docs/design/pipeline-state/`: State files, scores, and logs for automated UI pipeline execution (e.g. `ds-manifest.txt`, `stage2-routing-decision.json`).
  - `./docs/eval-dataset/`: Dataset collections for evaluating AI pipelines and workflows.
  - `./docs/assets/`: Static documentation files, image assets, and media.
    - `./docs/assets/images/`: Images, charts, and diagrams explaining Gmind concepts (e.g. `agile-explain-svg/`, `explain-gmind/`).
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

## Methodology Source

Root methodology: `docs/researches/spikes/spike-design-system-ralph-loop-agent.md`

## Project Techstack

- Go (primary language)
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage.
- Keep code files < 400 lines, docs files < 1000 lines.
- Running website showcase at port http://localhost:9993/
- Git commits must be in English, include `Beads-ID:` trailer on last line.
- Put all temporary scripts/files inside `./tmp` (e.g. `./tmp/test_puppeteer_dir`). Do not create them in the root directory.

## Design System ↔ Ralph Loop Integration: - WebUI PM Workspace: To extend, edit [PRD-04](docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md), then run `/project:ralph-loop` (PRD: `"webui-and-pm-workspace"`) to auto-update `apps/website/src/app/design-system/webui-pm-workspace/page.tsx`.
