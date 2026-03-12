- Rules to put to git: Do not push to git without the agreement of me or PMO.
- Project techstack: Go
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage (instead of SQLite).
- Keep code file smaller than 400 lines, split into multiple files if necessary. Keep docs files smaller than 1000 lines.
- Markdown Rules (\*.md): When writing/modifying/removing documentation files → read and run: @/Users/steve/duyhunghd6/gmind/.agents/workflows/arch-review-docs-add-beads.md
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
