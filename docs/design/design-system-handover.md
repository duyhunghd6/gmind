# Design System — Trạng thái Handover

> **Ngày:** 2026-03-04
> **Agent:** Antigravity (phiên hiện tại)
> **Mục đích:** Handover cho agent tiếp theo tiếp tục phát triển Design System

---

## 1. Tổng quan trạng thái

| Hạng mục                          | Trạng thái                                            |
| --------------------------------- | ----------------------------------------------------- |
| Token (Màu, Spacing, Typography)  | ✅ Hoàn thành — tách files                            |
| Components (10 thành phần)        | ✅ Hoàn thành — tách files, có metadata ID            |
| Layouts (8 bố cục)                | ✅ Hoàn thành — tách files                            |
| Registry (`registry.json`)        | ✅ Hoàn thành v1.2.0 — ID cho tất cả thành phần       |
| Showcase Website `/design-system` | ✅ Hoàn thành — 3-column docs layout                  |
| Dọn dẹp file cũ (monolithic)      | ✅ Hoàn thành — `tokens.css`, `components.css` đã xóa |
| States đầy đủ (4 states)          | ✅ Hoàn thành — PromptCard, ArchLayer đã bổ sung      |
| Element Diff Protocol             | ❌ Chưa triển khai                                    |
| Storyboard (interactive demos)    | ❌ Chưa triển khai                                    |
| Light mode testing                | ❌ Chưa test                                          |

## 2. Cấu trúc thư mục hiện tại

```
packages/design-system/
├── index.css               # Barrel import (32 dòng)
├── registry.json           # Đăng ký ID + states cho mọi thành phần (v1.2.0)
├── package.json            # @gmind/design-system v1.1.0
├── tokens/
│   ├── colors.css          # ds-tok-colors (53 dòng)
│   ├── typography.css      # ds-tok-typography (50 dòng)
│   └── spacing.css         # ds-tok-spacing (31 dòng)
├── components/
│   ├── card.css            # ds-comp-card — 4 states, 3 variants (56 dòng)
│   ├── code-block.css      # ds-comp-code-block — 3 states (51 dòng)
│   ├── label.css           # ds-comp-label — 4 variants (32 dòng)
│   ├── divider.css         # ds-comp-divider (24 dòng)
│   ├── prompt-card.css     # ds-comp-prompt-card — 4 states (59 dòng)
│   ├── arch-layer.css      # ds-comp-arch-layer — 4 states (49 dòng)
│   ├── path-tree.css       # ds-comp-path-tree (20 dòng)
│   ├── button.css          # ds-comp-button — 4 states, 3 variants + sm (98 dòng) [MỚI]
│   ├── badge.css           # ds-comp-badge — 4 variants (53 dòng) [MỚI]
│   └── tooltip.css         # ds-comp-tooltip — CSS hover trigger (81 dòng) [MỚI]
└── layouts/
    ├── navbar.css           # ds-lay-navbar (120 dòng)
    ├── footer.css           # ds-lay-footer (51 dòng)
    ├── grid.css             # ds-lay-grid (34 dòng)
    ├── glass.css            # ds-lay-glass (12 dòng)
    ├── animations.css       # ds-lay-animations (45 dòng)
    ├── hero.css             # ds-lay-hero — Hero section layout (63 dòng)
    ├── section.css          # ds-lay-section — Section wrapper (45 dòng)
    └── docs-layout.css      # ds-lay-docs-layout — 3-column grid layout (170 dòng) [MỚI]
```

## 3. Website Showcase Pages

```
apps/website/src/
├── app/
│   ├── layout.tsx            # Root layout (lang="vi")
│   ├── page.tsx              # Trang chủ
│   ├── architecture/page.tsx # Kiến trúc 5+1 lớp
│   ├── prompts/page.tsx      # Prompts & Quy trình
│   ├── research/page.tsx     # Nghiên cứu (PRDs + Spikes)
│   └── design-system/
│       ├── page.tsx           # 3-column layout compositor
│       ├── TokensTab.tsx      # Tokens content (with id anchors)
│       ├── ComponentsTab.tsx  # Components content (with id anchors)
│       ├── StatesTab.tsx      # Ma trận Trạng thái
│       └── FlowsTab.tsx      # Luồng Người dùng
├── components/
│   ├── Navbar.tsx            # 6 links (incl. Design System)
│   ├── Footer.tsx            # 4 links (incl. Design System)
│   ├── CodeBlock.tsx         # Nút "Sao chép"
│   ├── PillarCard.tsx
│   ├── SectionLabel.tsx
│   ├── SectionDivider.tsx
│   ├── Button.tsx            # React wrapper cho button.css
│   ├── Badge.tsx             # React wrapper cho badge.css
│   ├── Tooltip.tsx           # React wrapper cho tooltip.css
│   ├── DocsSidebar.tsx       # Left sidebar — 5 nhóm chính [MỚI]
│   └── DocsToc.tsx           # Right sidebar TOC [MỚI]
└── data/
    ├── design-system-data.ts # Data cho showcase
    ├── prompts-data.ts
    └── research-data.ts
```

## 4. Quy tắc quan trọng

- **Ngôn ngữ:** Toàn bộ UI bằng tiếng Việt (xem `gsafe-showcase-website.md` rule)
- **File size:** Giữ < 400 dòng (GEMINI.md rule)
- **Metadata ID:** Mỗi CSS file có header `/* ID: ds-xxx-yyy */` + states
- **Skill tham chiếu:** `.agents/skills/agenticse-design-system/SKILL.md`
- **Dev server:** `./scripts/dev-showcase.sh` → `http://localhost:9993`

## 5. Việc cần làm tiếp (cho agent tiếp theo)

### Ưu tiên cao

- [ ] **Test light mode:** Kiểm tra website với `prefers-color-scheme: light`
- [ ] **Responsive audit:** Test mobile 375px / tablet 768px

### Ưu tiên trung bình

- [ ] **Element Diff Protocol:** Triển khai before/after HTML cho mỗi sửa đổi UI
- [x] ~~**3-column layout:** Chuyển từ tab bar ngang sang docs layout 3 cột~~

### Ưu tiên thấp

- [ ] **Storyboard:** Demo tương tác (kéo thả, hover sequences)
- [ ] **Changelog:** Tạo `changes/changelog.json` theo Hub spec
- [ ] **Thêm components mới:** Modal, Dropdown, Accordion (nếu website cần)

## 6. Cách chạy

```bash
# Dev server
cd /Users/steve/duyhunghd6/gmind
./scripts/dev-showcase.sh
# → http://localhost:9993

# Xem Design System
# → http://localhost:9993/design-system
```

## 7. Tham chiếu

| Tài liệu            | Đường dẫn                                                               |
| ------------------- | ----------------------------------------------------------------------- |
| Design System Skill | `.agents/skills/agenticse-design-system/SKILL.md`                       |
| Component Rules     | `.agents/skills/agenticse-design-system/rules/enterprise-components.md` |
| Hub Rules           | `.agents/skills/agenticse-design-system/rules/design-system-hub.md`     |
| Workflow            | `.agents/workflows/gsafe-showcase-website.md`                           |
| Registry            | `packages/design-system/registry.json`                                  |
