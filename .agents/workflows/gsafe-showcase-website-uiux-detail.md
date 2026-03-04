---
description: UI/UX detail audit and improvement workflow for Gmind Showcase Website — keyboard interactions, close/dismiss, interactive states, color contrast, alignment, focus visibility, ARIA/A11y
---

# /gsafe-showcase-website-uiux-detail — UI/UX Detail Workflow

> **SAFe 6.0 Phase 2: UX Refining Iteration**
> Mục đích: Kiểm tra và cải thiện chi tiết UI/UX cho Showcase Website dựa trên UX State Matrix.
> Tham chiếu: `docs/design/design-system-handover.md`, `docs/design/ux-state-matrix.md`

---

## 1. Preconditions

- Đã đọc handover report: `docs/design/design-system-handover.md`
- Đã đọc UX State Matrix: `docs/design/ux-state-matrix.md`
- Dev server chạy: `./scripts/dev-showcase.sh 9993`
- Sử dụng skill: `/agenticse-design-system`

## 2. UX Audit Criteria (8 cột)

| #   | Tiêu chí                   | Mục tiêu | Mô tả                                           |
| --- | -------------------------- | :------: | ----------------------------------------------- |
| C1  | **ESC/Enter Keyboard**     |   100%   | ESC = close/cancel, Enter = confirm/OK          |
| C2  | **Close/Dismiss (X)**      |   100%   | Nút X trên modal/popover/overlay, ESC để đóng   |
| C3  | **Interactive States**     |   100%   | 4-state: Default/Hover/Active/Disabled          |
| C4  | **Color Contrast (Dark)**  |   ≥95%   | WCAG 2.1 AA — ratio ≥4.5:1 text, ≥3:1 UI        |
| C5  | **Color Contrast (Light)** |   ≥95%   | Phải test riêng cho light mode                  |
| C6  | **Component Alignment**    |   ≥95%   | Grid/flex, 4px spacing rhythm, visual balance   |
| C7  | **Focus Visible**          |   100%   | `:focus-visible` ring cho keyboard nav          |
| C8  | **ARIA/A11y**              |   ≥80%   | `aria-label`, `role`, `tabIndex`, semantic HTML |

## 3. Workflow Steps

// turbo-all

### Step 1: Đọc Handover Report + UX Matrix

```bash
cat docs/design/design-system-handover.md
cat docs/design/ux-state-matrix.md
```

Xác định screens/components có score thấp nhất → ưu tiên fix.

### Step 2: Fix Priority 1 — Keyboard & Focus (C1 + C7)

**2a. Global Keyboard Handler**

- Thêm `useEffect` listener cho `Escape` và `Enter` vào layout hoặc root component
- ESC: dismiss popover/modal/sidebar-mobile
- Enter: confirm active action

**2b. Focus Visible Global CSS**

- Thêm `:focus-visible` outline vào `packages/design-system/index.css`:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
  }
  ```
- Áp dụng cho: buttons, links, cards, tabs, sidebar items

### Step 3: Fix Priority 1 — ARIA/A11y (C8)

- Thêm `role`, `tabIndex`, `aria-label` cho tất cả interactive components
- `aria-expanded` cho sidebar toggles
- `aria-current="page"` cho active sidebar links
- Kiểm tra semantic HTML: heading hierarchy, landmark regions

### Step 4: Fix Priority 1 — Close/Dismiss (C2)

- Tạo `Modal.tsx` wrapper cho `modal.css` (đã có CSS, chưa có React)
- Support: ESC to close, backdrop click, X button, Enter to confirm
- Register `ds:comp:modal-001`
- Áp dụng cho ErrorBanner: thêm close button

### Step 5: Fix Priority 2 — Light Mode Audit (C5)

Với mỗi CSS file:

1. Kiểm tra `@media (prefers-color-scheme: light)` block
2. Thêm overrides cho: `--text`, `--bg`, `--border`, `--surface`
3. Test visual trên browser (switch OS to light mode)

```bash
# Danh sách files cần audit
ls packages/design-system/components/*.css
ls packages/design-system/layouts/*.css
```

### Step 6: Fix Priority 2 — Interactive States (C3)

- Đảm bảo 4-state (hover/active/disabled) cho MỌI component
- Kiểm tra danh sách component có score < 50%: Badge, Terminal, Footer, Tooltip, ActivityItem

### Step 7: Contrast Measurement (C4 + C5)

- Chạy browser audit với DevTools Lighthouse → Accessibility score
- Hoặc check manual bằng contrast ratio tools
- Target: ≥ 4.5:1 text, ≥ 3:1 UI elements

### Step 8: Alignment Audit (C6)

- Kiểm tra grid/flex alignment trên mỗi screen
- Verify 4px spacing rhythm (`var(--space-xs)` = 4px, `--space-sm` = 8px...)
- Check responsive breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop)

### Step 9: Update UX State Matrix

Sau khi fix, cập nhật `docs/design/ux-state-matrix.md`:

- Tăng % coverage cho các cells đã fix
- Tính lại Overall Score
- Mục tiêu: Overall ≥ 80%

### Step 10: Update Handover Report

```bash
# Cập nhật trạng thái trong handover
vi docs/design/design-system-handover.md
```

Thêm section về UX Refining Phase completion.

### Step 11: Verification & Walkthrough

- Build check: `pnpm --filter website build`
- Browser test: Duyệt tất cả 28 pages
- Tab-through test cho keyboard nav
- Light mode test
- Tạo `walkthrough.md`

---

## 4. Output Mong Đợi (Definition of Done)

- [ ] Overall UX Score ≥ 80% (hiện tại: 35%)
- [ ] ESC/Enter keyboard ≥ 80% trên tất cả interactive screens
- [ ] Focus Visible 100% — mọi interactive element có focus ring
- [ ] ARIA/A11y ≥ 80% — `aria-label`, `role`, `tabIndex` đủ
- [ ] Close/Dismiss 100% — mọi overlay/modal có nút X + ESC
- [ ] Light mode ≥ 90% — tất cả components readable
- [ ] UX State Matrix cập nhật
- [ ] Handover report cập nhật

---

## 5. Rules

| Rule        | Chi tiết                                 |
| ----------- | ---------------------------------------- |
| Ngôn ngữ UI | Tiếng Việt                               |
| File size   | < 400 dòng                               |
| DS ID       | `ds:<type>:<name-NNN>` in ds-registry.ts |
| Git         | KHÔNG push khi chưa approval             |
| Skill       | Sử dụng `/agenticse-design-system`       |
| Handover    | Đọc trước khi làm, cập nhật sau khi xong |
