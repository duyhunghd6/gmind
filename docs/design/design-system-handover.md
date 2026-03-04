# Design System — Trạng thái Handover

> **Ngày:** 2026-03-04  
> **Version:** v1.4.0 (registry bump pending)  
> **Mục đích:** Handover cho agent tiếp theo

---

## 1. Tổng quan

| Hạng mục         | Trạng thái                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| Components CSS   | ✅ **33 thành phần** (10 gốc + 10 Batch 1-3 + 13 mới)                  |
| Layouts CSS      | ✅ **12 bố cục** (8 gốc + 4 mới)                                       |
| React Wrappers   | ✅ **14 components** (5 Batch 1 + 4 infrastructure + 5 mới)            |
| Registry         | ✅ v1.3.0 (cần bump lên v1.4.0 cho 13 comp mới)                        |
| Showcase Website | ✅ **7 screens riêng biệt** + Hub index                                |
| State Matrix     | ✅ **6 states/screen** (Default/Loading/Empty/Error/Offline/Forbidden) |
| Knowledge Graph  | ✅ **Sigma.js 3.0.2 (WebGL)** + Graphology + ForceAtlas2               |
| Light mode       | ⚠️ StateToggleBar có, các screens khác chưa test                       |

## 2. Kiến trúc Screens

```
/design-system              → Hub index (grid cards)
/design-system/terminal     → Terminal + Mosaic layout (2×2)
/design-system/git-graph    → Git Branch Graph (SVG)
/design-system/kanban       → Kanban Board (click-to-move interactive)
/design-system/knowledge-graph → Sigma.js WebGL force-directed graph
/design-system/approval     → Approval Panel + RTM + Heatmap
/design-system/timeline     → Activity Feed + File Lease + Timeline
/design-system/components   → Catalog (Modal, Dropdown, Accordion, DataTable...)
```

## 3. Cấu trúc thư mục

```
packages/design-system/
├── index.css               # Barrel import (59 dòng)
├── registry.json           # v1.3.0 (cần update thêm 13 comp)
├── tokens/                 # colors, typography, spacing
├── components/             # 33 files
│   ├── [10 gốc]           # card, button, badge, tooltip, label, ...
│   ├── [10 Batch 1-3]     # terminal, git-graph, kanban-column, ...
│   └── [13 mới]           # skeleton, empty-state, error-banner,
│                            # offline-banner, forbidden-gate, state-toggle-bar,
│                            # modal, dropdown, accordion, data-table,
│                            # progress-bar, status-dot, avatar-stack
└── layouts/                # 12 files

apps/website/src/
├── app/design-system/
│   ├── layout.tsx          # Shared sidebar layout
│   ├── page.tsx            # Hub index (grid cards)
│   ├── terminal/page.tsx
│   ├── git-graph/page.tsx
│   ├── kanban/page.tsx
│   ├── knowledge-graph/page.tsx  # Sigma.js dynamic import
│   ├── approval/page.tsx
│   ├── timeline/page.tsx
│   └── components/page.tsx
├── components/
│   ├── KnowledgeGraphViewer.tsx  # Sigma.js + Graphology + ForceAtlas2
│   ├── StateToggleBar.tsx        # 6-state pills bar
│   ├── Skeleton.tsx, EmptyState.tsx, ErrorBanner.tsx
│   ├── Terminal.tsx, GitGraph.tsx, KanbanColumn.tsx
│   ├── ActivityItem.tsx, TabPanel.tsx
│   └── [existing: Navbar, Footer, Button, Badge, ...]
```

## 4. Dependencies mới (Knowledge Graph)

```json
"sigma": "^3.0.2",
"graphology": "^0.26.0",
"@react-sigma/core": "^5.0.6",
"@react-sigma/layout-forceatlas2": "^5.0.6",
"graphology-layout-forceatlas2": "^0.10.1",
"graphology-types": "^0.24.8"
```

## 5. Việc cần làm (cho iteration tiếp theo)

### Ưu tiên cao

- [ ] Bump `registry.json` → v1.4.0, thêm 13 components mới
- [ ] Light mode audit cho tất cả screens (chỉ mới có StateToggleBar)
- [ ] Responsive test: mobile 375px / tablet 768px

### Ưu tiên trung bình

- [ ] Knowledge Graph: thêm search/filter nodes, zoom controls UI
- [ ] Kanban: drag-and-drop thật (HTML5 DnD API) thay vì click-to-move
- [ ] Storyboard demos: typing animation trong Terminal, merge flow trong Git Graph
- [ ] Element Diff Protocol (before/after HTML)

### Ưu tiên thấp

- [ ] React wrappers cho Batch 3 (approval, rtm-row, heatmap-cell, graph-node, file-lease)
- [ ] Tokens showcase screen riêng (`/design-system/tokens`)
- [ ] Changelog (`changes/changelog.json`)

## 6. Quy tắc

| Rule        | Chi tiết                                       |
| ----------- | ---------------------------------------------- |
| Ngôn ngữ UI | Tiếng Việt                                     |
| File size   | < 400 dòng                                     |
| CSS ID      | `/* ID: ds-comp-xxx */` + states               |
| SSR         | Sigma.js dùng `dynamic import` (cần `window`)  |
| Git         | KHÔNG push khi chưa có approval từ PMO         |
| Dev server  | `./scripts/dev-showcase.sh` → `localhost:9993` |
