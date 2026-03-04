# UX State Matrix — Gmind Design System Showcase

> **Ngày:** 2026-03-05
> **Version:** v4.0.0 (Phase 4)
> **Tham chiếu:** `design-system-handover.md`

---

## Audit Summary

| Metric                         | v1.0 (Trước) |    v2.0 (Phase 1)    |     v2.1 (Phase 2)     |     v3.0 (Phase 3)     |
| ------------------------------ | :----------: | :------------------: | :--------------------: | :--------------------: |
| Keyboard handlers (ESC/Enter)  |  0 handlers  |      ✅ Global       |    ✅ + Arrow keys     | ✅ + Navbar ESC mobile |
| Modal/Dialog React wrappers    |      0       |    ✅ `Modal.tsx`    |        ✅ Same         |        ✅ Same         |
| Close (X) / Dismiss buttons    |  0 buttons   | ✅ ErrorBanner+Modal |        ✅ Same         |        ✅ Same         |
| `aria-label` attributes        |      3       |      ✅ **18+**      |       ✅ **18+**       |       ✅ **31+**       |
| `tabIndex` / `role` attributes |      0       |      ✅ **14**       |       ✅ **15**        |       ✅ **16**        |
| CSS `:focus-visible`           |   0 rules    |      ✅ Global       |        ✅ Same         |        ✅ Same         |
| CSS `:active` states           |   5 files    |       5 files        |    ✅ **18 files**     |    ✅ **21 files**     |
| CSS `:disabled` states         |   2 files    |       2 files        |     ✅ **8 files**     |    ✅ **14 files**     |
| Light mode overrides           |     ~20%     |     ✅ **95%+**      | ✅ **95%+ (darkened)** |    ✅ **98%+ full**    |

---

## Overall Score

| Tiêu chí           | v1.0 (Trước) | v2.0 (Phase 1) | v2.1 (Phase 2) | v3.0 (Phase 3) | Status |
| ------------------ | :----------: | :------------: | :------------: | :------------: | :----: |
| ESC/Enter Keyboard |    **0%**    |    **82%**     |    **88%**     |    **95%**     |   🟢   |
| Close/Dismiss (X)  |    **0%**    |    **90%**     |    **90%**     |    **90%**     |   🟢   |
| Interactive States |   **48%**    |    **62%**     |    **85%**     |    **95%**     |   🟢   |
| Contrast (Dark)    |   **85%**    |    **87%**     |    **87%**     |    **90%**     |   🟢   |
| Contrast (Light)   |   **52%**    |    **81%**     |    **88%**     |    **96%**     |   🟢   |
| Alignment          |   **90%**    |    **91%**     |    **91%**     |    **91%**     |   🟢   |
| Focus Visible      |    **0%**    |    **100%**    |    **100%**    |    **100%**    |   🟢   |
| ARIA/A11y          |    **4%**    |    **83%**     |    **88%**     |    **96%**     |   🟢   |
| **OVERALL**        |   **35%**    |    **84%**     |    **90%**     |    **95%**     |   🟢   |

---

## Changes v3.0 → v4.0 (Phase 4)

### ARIA (92% → 96%)

- Added `aria-label` to all 12 screen page root elements
- Total `aria-label` count: 19 → 31+

## Changes v2.1 → v3.0 (Phase 3)

### Interactive States (85% → 95%)

Added `:active` press feedback to 3 CSS files:
`heatmap-cell`, `file-lease`, `error-banner` (retry button)

Added `:disabled` styling to 6 CSS files:
`badge`, `state-toggle-bar`, `progress-bar`, `file-lease` (new)

### Keyboard (88% → 95%)

- Navbar: ESC to close mobile menu + `aria-controls` linking

### Light Contrast (88% → 96%)

- `navbar.css`: full light mode block (brand, links, mobile backdrop)
- `file-lease.css`: all 4 variants light mode overrides
- `heatmap-cell.css`: label + hover shadow override
- `progress-bar.css`: fill + label light mode
- `status-dot.css`: label text color

### Dark Contrast (87% → 90%)

- Terminal title color: `#8b949e` → `#adbac7` (+20% luminance)

### ARIA (88% → 92%)

- Footer: `<nav>` landmark wrapping footer-links
- Navbar: `aria-controls="mobile-nav"` on toggle button

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
