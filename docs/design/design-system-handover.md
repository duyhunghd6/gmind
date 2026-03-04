# Design System — Trạng thái Handover

> **Ngày:** 2026-03-04
> **Version:** v1.5.0
> **Mục đích:** Handover cho agent tiếp theo

---

## 1. Tổng quan

| Hạng mục         | Trạng thái                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| Components CSS   | ✅ **33 thành phần** (10 gốc + 10 Batch 1-3 + 13 mới)                  |
| Layouts CSS      | ✅ **12 bố cục** (8 gốc + 4 mới)                                       |
| React Wrappers   | ✅ **14 components** (5 Batch 1 + 4 infrastructure + 5 mới)            |
| Registry         | ✅ v1.5.0 — **~90 granular IDs** (ds-registry.ts)                      |
| Showcase Website | ✅ **28 pages** (18 static + 10 SSG usecase pages)                     |
| State Matrix     | ✅ **6 states/screen** (Default/Loading/Empty/Error/Offline/Forbidden) |
| Knowledge Graph  | ✅ **Sigma.js 3.0.2 (WebGL)** + Graphology + ForceAtlas2               |
| Beads Git Graph  | ✅ **10 scenarios** (5 Git workflows + 5 Beads ID worktrees)           |
| Storyboard       | ✅ **10 usecase detail pages** with step-by-step flows                 |
| DS IDs           | ✅ **~90 IDs** — screen/section/component/usecase level                |
| Light mode       | ⚠️ StateToggleBar có, các screens khác chưa test                       |

## 2. Kiến trúc Screens (28 pages)

```
/design-system                      → Hub index (grid cards)
/design-system/terminal             → Terminal + Mosaic layout (2×2)
/design-system/git-graph            → Beads: Đồ thị Git (10 scenarios)
/design-system/kanban               → Kanban Board (3 boards: Sprint/Release/Bug)
/design-system/knowledge-graph      → Sigma.js WebGL force-directed graph
/design-system/approval             → Approval Panel + RTM + Heatmap
/design-system/timeline             → Activity Feed + File Lease + Timeline
/design-system/components           → Component Catalog
/design-system/doc-viewer           → Document Viewer
/design-system/explorer             → Gmind Explorer
/design-system/beads-traversal      → Beads ID Traversal
/design-system/storyboard           → Storyboard Overview (6 journeys, 10 UC cards)
/design-system/storyboard/uc-01-*   → UC-01: PM Sprint Review
/design-system/storyboard/uc-02-*   → UC-02: PM Trace & Approve
/design-system/storyboard/uc-03-*   → UC-03: Dev Code Search
/design-system/storyboard/uc-04-*   → UC-04: Dev Pick Task
/design-system/storyboard/uc-05-*   → UC-05: QA Bug Detection
/design-system/storyboard/uc-06-*   → UC-06: QA Code Review
/design-system/storyboard/uc-07-*   → UC-07: Architect Spike Discovery
/design-system/storyboard/uc-08-*   → UC-08: Release Deploy
/design-system/storyboard/uc-09-*   → UC-09: Bug Triage Fix
/design-system/storyboard/uc-10-*   → UC-10: Bug Hotfix Verify
```

## 3. Cấu trúc thư mục

```
apps/website/src/
├── app/design-system/
│   ├── layout.tsx              # 3-level sidebar (4 categories, submenu, usecase links)
│   ├── page.tsx                # Hub index
│   ├── terminal/page.tsx
│   ├── git-graph/page.tsx      # "Beads: Đồ thị Git" — 10 scenarios
│   ├── kanban/page.tsx         # 3 boards
│   ├── knowledge-graph/page.tsx
│   ├── approval/page.tsx
│   ├── timeline/page.tsx
│   ├── components/page.tsx
│   ├── doc-viewer/page.tsx
│   ├── explorer/page.tsx
│   ├── beads-traversal/page.tsx
│   ├── storyboard/page.tsx     # Overview + 10 UC grid
│   └── storyboard/[id]/page.tsx # Dynamic usecase detail (async params)
├── components/                  # DsIdBadge, StateToggleBar, Terminal, etc.
├── data/
│   ├── ds-registry.ts          # ~90 IDs — single source of truth
│   ├── usecase-data.ts         # 10 usecases with steps, screens, cross-refs
│   ├── git-graph-data.ts       # 10 scenarios (5 Git + 5 Beads)
│   └── [other data files]
```

## 4. DS ID System (~90 IDs)

**Format:** `ds:<type>:<sectionName-NNN>`

| Type         | Count | Example                                            |
| ------------ | ----- | -------------------------------------------------- |
| `hub`        | 2     | `ds:hub:overview-001`                              |
| `screen`     | 11    | `ds:screen:terminal-001`                           |
| `terminal`   | 6     | `ds:terminal:agentConsole-001`                     |
| `gitGraph`   | 10    | `ds:gitGraph:beadsPrdTrace-001`                    |
| `kanban`     | 3     | `ds:kanban:sprintBoard-001`                        |
| `approval`   | 3     | `ds:approval:rtmMatrix-001`                        |
| `timeline`   | 3     | `ds:timeline:activityFeed-001`                     |
| `storyboard` | 7     | `ds:storyboard:pmOverview-001`                     |
| `comp`       | 14    | `ds:comp:card-001`                                 |
| `token`      | 5     | `ds:token:colors-001`, `ds:token:utilities-001`    |
| `layout`     | 6     | `ds:layout:glass-001`                              |
| `state`      | 2     | `ds:state:matrix-001`, `ds:state:tokenUsage-001`   |
| `flow`       | 5     | `ds:flow:explore-001`, `ds:flow:pageStructure-001` |
| `usecase`    | 10    | `ds:usecase:pmSprintReview-001`                    |

## 5. Dependencies

```json
"sigma": "^3.0.2",
"graphology": "^0.26.0",
"@react-sigma/core": "^5.0.6",
"@react-sigma/layout-forceatlas2": "^5.0.6",
"graphology-layout-forceatlas2": "^0.10.1",
"graphology-types": "^0.24.8"
```

## 6. Iteration tiếp theo — UI/UX Refining Phase

> [!IMPORTANT]
> **Next iteration = UX Refining Phase.** Tập trung cải thiện trải nghiệm người dùng,
> không thêm feature mới. Mục tiêu: polish, responsiveness, micro-interactions.

### 🔴 Ưu tiên cao — UX Critical

- [ ] **Light mode audit:** Test TOÀN BỘ 28 pages ở light mode. Hiện chỉ mới StateToggleBar hoạt động đúng. Nhiều component có contrast issues, text-dim không đủ readable.
- [ ] **Responsive design:** Mobile 375px + Tablet 768px. Sidebar collapse, card grid responsive, usecase steps stack vertically.
- [ ] **Kanban UX:** Drag-and-drop thật (HTML5 DnD / @hello-pangea/dnd) thay vì click-to-move. Column width và scrolling issues.
- [ ] **Button/Badge contrast:** Primary buttons kém readable ở light mode. Badge colors cần audit.
- [ ] **Terminal title contrast:** Title text thiếu contrast ở cả dark lẫn light mode.

### 🟡 Ưu tiên trung bình — UX Polish

- [ ] **Micro-animations:** Slide transitions giữa usecase pages, tab change animations, card hover micro-feedback.
- [ ] **Usecase step-flow UX:** Thêm progress indicator, highlight current step, click-to-navigate cải thiện flow.
- [ ] **Git Graph interactivity:** Click node → tooltip với Beads ID details, hover highlight branch paths.
- [ ] **Knowledge Graph UX:** Search/filter nodes, zoom controls UI rõ àng hơn, legend.
- [ ] **Sidebar UX:** Active state rõ hơn, scroll position preserve, expand/collapse animations.
- [ ] **Typography audit:** Heading hierarchy consistency, line-height/spacing đồng nhất.

### 🟢 Ưu tiên thấp — Cosmetic

- [ ] **Loading states:** Skeleton quality cho mỗi screen cụ thể (not generic).
- [ ] **Empty states:** Richer empty state illustrations thay vì single emoji.
- [ ] **Storyboard crosslinks UX:** Visual connector lines giữa related usecases.
- [ ] **Changelog:** `changes/changelog.json` for DS evolution tracking.

## 7. Quy tắc

| Rule        | Chi tiết                                                                          |
| ----------- | --------------------------------------------------------------------------------- |
| Ngôn ngữ UI | Tiếng Việt                                                                        |
| File size   | < 400 dòng                                                                        |
| DS ID       | `ds:<type>:<sectionName-NNN>` in ds-registry.ts                                   |
| SSR         | Sigma.js dùng `dynamic import` (cần `window`)                                     |
| Next.js 16  | Params phải `await` — `async function Page({ params }: { params: Promise<...> })` |
| Git         | KHÔNG push khi chưa có approval từ PMO                                            |
| Dev server  | `./scripts/dev-showcase.sh` → `localhost:9993`                                    |
