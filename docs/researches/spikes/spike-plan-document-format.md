# Spike: Plan Document Format — Structured Markdown, YAML Markers, or Beads Issues?

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Parent Spike:** spike-beads-knowledge-graph.md (Open Item #5)

## Hypothesis

- Plan documents cần được chuẩn hóa format để Graph Assembler có thể parse và liên kết với PRDs + Tasks
- 3 phương án: (A) Structured Markdown với YAML markers, (B) Pure Beads Issues, (C) Hybrid
- Phương án tốt nhất cần: human-readable, machine-parseable, Git-friendly, và tự động liên kết với Beads IDs

## Research Sessions

### Session 1 (2026-03-02)

**Findings:**

#### A. So sánh 3 Phương án

| Tiêu chí             | A: Structured MD + YAML  | B: Pure Beads Issues  | C: Hybrid (MD + Beads) |
| -------------------- | ------------------------ | --------------------- | ---------------------- |
| Human readable       | Excellent                | Good (via br list)    | Excellent              |
| Machine parseable    | Good (YAML front matter) | Excellent (SQL query) | Excellent              |
| Git-friendly         | Excellent (text diff)    | Poor (binary DB)      | Good                   |
| Beads ID native      | Via YAML markers         | Native (issue ID)     | Both                   |
| Dependency tracking  | Manual YAML links        | Native br dep         | Both                   |
| Visualization        | Need parser              | br/bv built-in        | Both                   |
| Code review friendly | Excellent (PR readable)  | Poor (DB changes)     | Good                   |
| Agent workflow       | Parse markdown           | br CLI                | Both CLI options       |

#### B. Phương án A: Structured Markdown + YAML Markers

**Format:**

```markdown
---
beads-id: br-plan-42
title: "Redesign Admin Icons"
satisfies:
  - br-prd01-s4.2
  - br-prd01-s4.3
status: in-progress
owner: dev-team
created: 2026-03-01
---

# Plan: Redesign Admin Icons

## Elements

### PLAN-01: Replace icon library {#br-plan-42-e01}

<!-- beads-id: br-plan-42-e01 -->
<!-- satisfies: br-prd01-s4.2 -->

- **Scope:** Migrate from FontAwesome to Material Icons v3
- **Effort:** 2 story points
- **Status:** in-progress
- **Tasks:**
  - bd-x1y2: Change button icon (in-progress)
  - bd-a1b2: Update icon asset pipeline (done)

### PLAN-02: Update icon rendering {#br-plan-42-e02}

<!-- beads-id: br-plan-42-e02 -->
<!-- satisfies: br-prd01-s4.3 -->

- **Scope:** Ensure all icons render correctly on mobile
- **Effort:** 3 story points
- **Status:** not-started
- **Tasks:**
  - bd-c3d4: Migrate legacy icons (open)
```

**Ưu điểm:**

- Đọc được trực tiếp trên GitHub, VS Code, bất kỳ markdown viewer nào
- Git diff rõ ràng khi thay đổi
- YAML front matter + HTML comments cho machine parsing
- Beads IDs embedded trực tiếp trong document

**Nhược điểm:**

- Cần custom parser để extract YAML markers
- Dependency links là text, không có referential integrity
- Sync với FrankenSQLite cần 2-way

#### C. Phương án B: Pure Beads Issues

**Format:** Mỗi plan element là một Beads issue

```bash
# Tao plan
br create "Plan: Redesign Admin Icons" --type=plan --tag="satisfies:br-prd01-s4.2"

# Tao plan elements
br create "PLAN-01: Replace icon library" --parent=br-plan-42 --type=plan-element \
    --tag="satisfies:br-prd01-s4.2"

# Tao tasks
br create "Change button icon" --parent=br-plan-42-e01 --type=task \
    --tag="implements:br-plan-42-e01"
```

**Ưu điểm:**

- Native Beads ID cho mỗi element
- FrankenSQLite lưu trữ, query instant
- `bv` graph visualization built-in
- `br dep` dependency tracking native

**Nhược điểm:**

- Không đọc được trên GitHub (data trong FrankenSQLite)
- Git diff không thấy nội dung (chỉ JSONL changes)
- Code review khó (không có Markdown PR)
- Quản lý complex: nhiều Beads issues cho 1 plan

#### D. Phương án C: Hybrid (ĐỀ XUẤT)

> **Plan document = Structured Markdown (SSOT) + Auto-sync sang Beads Issues**

```
┌──────────────────────────────────────────────────────────────┐
│  Hybrid Plan Flow                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: PMO viết Plan.md                                    │
│  ├── File: docs/plans/plan-42-redesign-icons.md              │
│  ├── Format: Structured Markdown + YAML markers              │
│  └── Git-tracked, review-friendly                            │
│                                                              │
│  Step 2: gmind plan sync                                     │
│  ├── Parse Plan.md → extract elements + beads-ids            │
│  ├── Create/update Beads issues từ plan elements             │
│  ├── Establish dependencies (satisfies, implements)          │
│  └── Sync status bidirectional                               │
│                                                              │
│  Step 3: Day-to-day                                          │
│  ├── PMO edit Plan.md → gmind plan sync → Beads updated      │
│  ├── Agent closes task → gmind plan sync → Plan.md updated   │
│  └── Git diff shows plan changes clearly                     │
│                                                              │
│  Plan.md (human)    ←──── gmind plan sync ────→  Beads DB    │
│  (Markdown SSOT)         (bidirectional)         (queryable) │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Ưu điểm hybrid:**

- Human đọc 1 file Markdown → hiểu toàn bộ plan
- Machine query FrankenSQLite → trace, coverage, gaps
- Git diff → review plan changes trong PRs
- Beads IDs → full Graph Assembler integration
- Single source of truth: **Plan.md** (Beads issues là derived)

#### E. Plan Document Template (Chuẩn hóa)

```
┌──────────────────────────────────────────────────────────────┐
│  Plan Document Structure                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  docs/plans/plan-{number}-{slug}.md                          │
│                                                              │
│  Sections:                                                   │
│  ├── YAML Front Matter (beads-id, satisfies, status)         │
│  ├── Overview (goal, scope, timeline)                        │
│  ├── Elements (each with <!-- beads-id --> comment)          │
│  │   ├── Element name + scope description                    │
│  │   ├── Effort estimate                                     │
│  │   ├── Status                                              │
│  │   ├── Dependencies (satisfies PRD sections)               │
│  │   └── Tasks list (Beads IDs, linked to issues)            │
│  ├── Risks + Mitigations                                     │
│  ├── Dependencies (external)                                 │
│  └── Approval History                                        │
│                                                              │
│  Naming: plan-{number}-{kebab-case-title}.md                 │
│  Location: docs/plans/                                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### F. gmind plan sync — Command Design

| Command                                  | Mục đích                                |
| ---------------------------------------- | --------------------------------------- |
| `gmind plan sync <file>`                 | Sync Plan.md → Beads issues + ngược lại |
| `gmind plan sync --all`                  | Sync tất cả plans trong docs/plans/     |
| `gmind plan status <plan-id>`            | Show plan progress summary              |
| `gmind plan create --from-prd=<section>` | Bootstrap plan từ PRD section           |

**Sync algorithm:**

1. Parse Plan.md → extract elements với beads-ids
2. For each element:
   - Nếu Beads issue chưa tồn tại → `br create` với type=plan-element
   - Nếu đã tồn tại → compare status, update if changed
3. For each task listed in element:
   - Verify Beads issue exists, link parent
4. Reverse sync: update Plan.md status markers từ Beads DB
5. Git auto-commit if changes made (optional, --auto-commit flag)

**Open Items:**

- (None — research complete)

## Recommendation

1. **Hybrid approach (Phương án C)** — Plan.md là SSOT (human-readable), Beads issues là derived (machine-queryable)
2. **Structured Markdown** với YAML front matter + HTML comment markers cho beads-ids
3. **`gmind plan sync`** bidirectional sync giữa markdown và FrankenSQLite
4. **Location:** `docs/plans/plan-{number}-{slug}.md`
5. **Plan.md Git-tracked** — mọi thay đổi plan tạo PR, reviewable
6. **Template chuẩn hóa** — consistency across all plans

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

- Không có spike mới — format đủ rõ để implement
