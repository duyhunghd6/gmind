---
beads-id: br-prd02
title: "PRD 02: Tracking Đa năng & Ma trận Truy vết (Universal Tracking & RTM)"
sections:
  - anchor: "1-chi-luoc-dinh-danh"
    title: "Chiến lược Định danh Duy nhất"
    beads-id: br-prd02-s1
  - anchor: "2-section-level-ids"
    title: "Section-level Beads IDs"
    beads-id: br-prd02-s2
  - anchor: "3-dependency-links"
    title: "Dependency Link Types"
    beads-id: br-prd02-s3
  - anchor: "4-rtm"
    title: "Requirements Traceability Matrix (RTM)"
    beads-id: br-prd02-s4
  - anchor: "5-plan-format"
    title: "Plan Document Format"
    beads-id: br-prd02-s5
  - anchor: "6-github-sync"
    title: "GitHub Sync Strategy"
    beads-id: br-prd02-s6
---

# PRD 02: Tracking Đa năng & Ma trận Truy vết (Universal Tracking & RTM)

<!-- beads-id: br-prd02 -->

## 1. Universal Tracking Strategy (Chiến lược Định danh Duy nhất)

<!-- beads-id: br-prd02-s1 -->

Trái tim của hệ thống liên kết là **Beads ID** (VD: `br-123`). Đây là Primary Key xuyên suốt mọi layer và 2 Cơ sở Dữ liệu.

- **mcp_agent_mail & File Leasing:** Agent dùng MCP khóa file với tham số `reason="br-123"`. Khởi tạo thảo luận nhóm dùng `thread_id="br-123"`.
- **Git Hook:** Mọi commit từ bot phải gắn `Beads-ID:` Git Trailer (VD: `Beads-ID: br-123`).

## 2. Section-level Beads IDs trong Documents

<!-- beads-id: br-prd02-s2 -->

> ✅ **Thêm mới (2026-03-01):** Mở rộng Beads ID từ task/issue level xuống document section level. Xem [spike-beads-id-in-docs.md](../researches/spikes/spike-beads-id-in-docs.md).

Mỗi PRD section và Plan element được gắn Beads ID riêng thông qua **YAML front matter**:

```yaml
---
beads-id: br-prd01
title: "PRD 01: Lớp Lưu trữ & Graph Engine"
sections:
  - anchor: "1-lop-luu-tru"
    title: "Lớp Lưu trữ"
    beads-id: br-prd01-s1
  - anchor: "2-knowledge-graph"
    title: "Knowledge Graph Engine"
    beads-id: br-prd01-s2
---
```

**ID Convention:**

| Loại         | Format                      | Ví dụ           |
| ------------ | --------------------------- | --------------- |
| PRD Section  | `br-prd{NN}-s{M}`           | `br-prd01-s1`   |
| Subsection   | `br-prd{NN}-s{M}.{K}`       | `br-prd01-s1.1` |
| Plan Element | `br-plan-{NN}`              | `br-plan-01`    |
| Task         | `bd-{hash}` (auto by beads) | `bd-a1b2`       |

## 3. Dependency Link Types: satisfies & implements

<!-- beads-id: br-prd02-s3 -->

Hai dependency link types mới để kết nối 3 tầng truy vết:

- **`satisfies`**: Plan Element → PRD Section (Plan này đáp ứng yêu cầu nào trong PRD)
- **`implements`**: Task → Plan Element (Task này triển khai phần nào trong Plan)

**Cách sử dụng (Phase 1 — Tag workaround, không cần sửa beads_rust):**

```bash
# Tạo task với traceability tags
bd create "Setup FrankenSQLite driver" \
  --tag="implements:br-plan-01" \
  --tag="satisfies:br-prd01-s1"

# Hoặc thêm tag sau khi tạo
bd tag add bd-a1b2 "implements:br-plan-01"
bd tag add bd-a1b2 "satisfies:br-prd01-s1"
```

**Mở rộng tương lai (Phase 2 — Native dependency types):**

```bash
# Khi beads_rust hỗ trợ native dependency types
bd dep add bd-a1b2 br-plan-01 --type=implements
bd dep add br-plan-01 br-prd01-s1 --type=satisfies
```

## 4. Requirements Traceability Matrix (RTM) — Mô hình 3 tầng

<!-- beads-id: br-prd02-s4 -->

Hệ thống truy vết 3 tầng cho phép liên kết xuyên suốt từ Requirements đến Code:

```
PRD Section  ←──satisfies──  Plan Element  ←──implements──  Task  ←──Beads-ID──  Commit
(br-prd01-s1)                (br-plan-01)                  (bd-a1b2)            (git log)
```

**Forward Tracing (Xuôi):** PRD Section → Plan Elements → Tasks → Commits
**Backward Tracing (Ngược):** Task → Plan Element → PRD Section

**Coverage Analysis:** Trả lời 3 câu hỏi quan trọng:

1. **PRD Coverage:** Plan đã cover hết tất cả PRD sections chưa? (`gmind coverage prd`)
2. **Plan Coverage:** Tasks đã decompose hết Plan elements chưa? (`gmind coverage plan`)
3. **Task Progress:** Bao nhiêu tasks đã hoàn thành theo từng PRD section? (`gmind coverage full`)

**Impact Analysis:** Khi sửa PRD section, `gmind impact <prd-section-id>` hiển thị cascading impact lên Plan elements → Tasks → Commits.

**Gap Detection:** `gmind gaps prd-to-plan` / `gmind gaps plan-to-tasks` phát hiện PRD sections hoặc Plan elements chưa có downstream coverage.

## 5. Plan Document Format — Hybrid Approach

<!-- beads-id: br-prd02-s5 -->

> ✅ **Thêm mới (2026-03-02):** Plan documents sử dụng **hybrid approach**: Markdown = SSOT (human-readable, git-tracked), auto-synced sang Beads Issues qua `gmind plan sync`. Xem [spike-plan-document-format.md](../researches/spikes/spike-plan-document-format.md).

**File location:** `docs/plans/plan-{number}-{slug}.md`

**Cấu trúc Plan Document:**

```yaml
---
beads-id: br-plan-01
title: "Plan: Setup Storage Layer"
satisfies:
  - br-prd01-s1
  - br-prd01-s2
status: in-progress
---
```

Mỗi Plan element trong file sử dụng `<!-- beads-id -->` HTML comment markers:

```markdown
## 1. Setup FrankenSQLite Driver <!-- br-plan-01-e1 -->

Description of element...

## 2. Create PM Schema Migration <!-- br-plan-01-e2 -->

Description of element...
```

**Bidirectional sync (qua `gmind plan sync`):**

1. **Plan.md → Beads Issues**: Parse YAML markers, tạo hoặc cập nhật Beads Issues cho mỗi element.
2. **Beads Issues → Plan.md**: Reverse-sync status (done/in-progress) từ FrankenSQLite ngược lại vào Plan.md metadata.
3. **Git diff**: Mọi thay đổi Plan.md đều git-tracked — cho phép review qua PR.

## 6. GitHub Sync Strategy — Cái gì đẩy lên git, cái gì ở local?

<!-- beads-id: br-prd02-s6 -->

> ✅ **Nguyên tắc (2026-02-28):** Hệ thống chạy **local-first** trên máy Human (ThanhVV, HungBD). Server tập trung chỉ dành cho CI/CD và deploy. Mọi thứ có thể đẩy lên GitHub. Xem [spike-github-integration.md](../researches/spikes/spike-github-integration.md).

| Loại                                  | Sync lên GitHub?           | Lý do                                              |
| ------------------------------------- | -------------------------- | -------------------------------------------------- |
| `docs/` (PRDs, spikes, architecture)  | ✅ git-tracked             | Source of truth cho requirements                   |
| `.beads/issues.jsonl`                 | ✅ git-tracked             | SSOT cho Beads task state — FrankenSQLite là cache |
| `src/` (source code)                  | ✅ git-tracked             | Core codebase                                      |
| `.github/` (Actions workflows)        | ✅ git-tracked             | CI/CD pipeline                                     |
| `.agents/` (skills, workflows, rules) | ✅ git-tracked             | Agent configuration                                |
| `packages/design-system/`             | ✅ git-tracked             | Shared UI tokens & components (Polyglot Monorepo)  |
| `docs/plans/` (Plan documents)        | ✅ git-tracked             | SSOT cho Plans — sync với Beads Issues             |
| `turbo.json`, `pnpm-workspace.yaml`   | ✅ git-tracked             | Monorepo orchestrator config                       |
| `.beads/beads.db` (FrankenSQLite)     | ❌ local-only              | Cache — rebuild từ JSONL khi `git pull`            |
| Zvec DB                               | ❌ local-only              | Temp semantic index — rebuild via `gmind reindex`  |
| FastCode cache (`~/.fastcode/cache/`) | ❌ local-only              | Code index — rebuild via `gmind search-codebase`   |
| `.beads/config.yaml`, daemon files    | ❌ local-only (.gitignore) | Machine-specific config                            |

**Quy tắc commit:** Mọi commit PHẢI có `Beads-ID:` Git Trailer để link commit ↔ Beads task:

```
feat(storage): implement MVCC layer

Beads-ID: br-a1b2
```

Truy vấn ngược: `git log --all --grep='Beads-ID: br-a1b2'`.
