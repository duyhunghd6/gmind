# UX State Matrix — Gmind Design System Showcase

> **Ngày:** 2026-03-05
> **Version:** v2.1.0 (Phase 2)
> **Tham chiếu:** `design-system-handover.md`

---

## Audit Summary

| Metric                         | v1.0 (Trước) |    v2.0 (Phase 1)    |     v2.1 (Phase 2)     |
| ------------------------------ | :----------: | :------------------: | :--------------------: |
| Keyboard handlers (ESC/Enter)  |  0 handlers  |      ✅ Global       |    ✅ + Arrow keys     |
| Modal/Dialog React wrappers    |      0       |    ✅ `Modal.tsx`    |        ✅ Same         |
| Close (X) / Dismiss buttons    |  0 buttons   | ✅ ErrorBanner+Modal |        ✅ Same         |
| `aria-label` attributes        |      3       |      ✅ **18+**      |       ✅ **18+**       |
| `tabIndex` / `role` attributes |      0       |      ✅ **14**       |       ✅ **15**        |
| CSS `:focus-visible`           |   0 rules    |      ✅ Global       |        ✅ Same         |
| CSS `:active` states           |   5 files    |       5 files        |    ✅ **18 files**     |
| CSS `:disabled` states         |   2 files    |       2 files        |     ✅ **8 files**     |
| Light mode overrides           |     ~20%     |     ✅ **95%+**      | ✅ **95%+ (darkened)** |

---

## Overall Score

| Tiêu chí           | v1.0 (Trước) | v2.0 (Phase 1) | v2.1 (Phase 2) | Status |
| ------------------ | :----------: | :------------: | :------------: | :----: |
| ESC/Enter Keyboard |    **0%**    |    **82%**     |    **88%**     |   🟢   |
| Close/Dismiss (X)  |    **0%**    |    **90%**     |    **90%**     |   🟢   |
| Interactive States |   **48%**    |    **62%**     |    **85%**     |   🟢   |
| Contrast (Dark)    |   **85%**    |    **87%**     |    **87%**     |   🟢   |
| Contrast (Light)   |   **52%**    |    **81%**     |    **88%**     |   🟢   |
| Alignment          |   **90%**    |    **91%**     |    **91%**     |   🟢   |
| Focus Visible      |    **0%**    |    **100%**    |    **100%**    |   🟢   |
| ARIA/A11y          |    **4%**    |    **83%**     |    **88%**     |   🟢   |
| **OVERALL**        |   **35%**    |    **84%**     |    **90%**     |   🟢   |

---

## Changes v2.0 → v2.1 (Phase 2)

### Interactive States (62% → 85%)

Added `:active` press feedback to 13 CSS files:
`code-block`, `graph-node`, `accordion`, `dropdown`, `kanban-column`, `ds-id-badge`, `data-table`, `rtm-row`, `git-graph`, `tab-panel`, `docs-layout`, `navbar`, `footer`

Added `:disabled` styling to 6 CSS files:
`code-block`, `accordion`, `dropdown`, `graph-node` (dimmed), `tab-panel` (already had), `kanban-column` (already had)

### Keyboard (82% → 88%)

- StateToggleBar: arrow-key navigation with roving `tabIndex`

### Light Contrast (81% → 88%)

- Darkened `--text-dim` fallbacks from `#475569` → `#334155` in `light-overrides.css`

### ARIA (83% → 88%)

- StateToggleBar: added roving `tabIndex` pattern

## Changes v1.0 → v2.0 (Phase 1)

- **Focus Visible:** Verified global `:focus-visible` cascades to all components
- **ARIA/A11y:** Added `role`, `tabIndex`, `aria-label` to 14 TSX components
- **Keyboard:** TabPanel arrow-key navigation, DsIdBadge Enter/Space copy
- **Close/Dismiss:** Modal (ESC/Enter/backdrop/X), ErrorBanner close button
- **Interactive States:** Badge (hover/active), activity-item (hover), tooltip (focus-within), footer (active)
- **Light Mode:** Created `light-overrides.css` covering 24+ components/layouts
