# Assertion Checklist — prd-04-webui-and-pm-workspace

## Layout
- [ ] L1. The global shell shows header, primary navigation, connection status, and footer on every route.
- [ ] L2. The dashboard renders a KPI row above a four-panel workspace.
- [ ] L3. The dashboard uses a 2x2 panel grid on desktop, a stacked two-up layout on tablet, and a single-column stack on mobile.
- [ ] L4. The board shows full kanban columns on desktop, horizontally scrollable compact columns on tablet, and stacked list cards on mobile.
- [ ] L5. The approval route uses split view on desktop and a stacked layout with a sticky action bar on tablet and mobile.
- [ ] L6. The document viewer uses a two-column doc-tree-plus-content layout on desktop, a top selector on tablet, and a drill-in list on mobile.
- [ ] L7. The trace explorer uses a 70/30 graph-to-detail split on desktop, a bottom-sheet detail panel on tablet, and a simplified tree view on mobile.
- [ ] L8. The task detail route keeps a summary header above tab content and converts tabs to accordions on mobile.
- [ ] L9. The search results route places filters beside results on desktop, above results on tablet, and behind a toggle drawer on mobile.
- [ ] L10. The task list shows a full table on desktop, hides secondary columns on tablet, and converts to task cards on mobile.
- [ ] L11. The board RTE discussion surface opens as a right drawer on desktop and tablet and as a full-screen overlay on mobile.
- [ ] L12. The task list bulk action bar appears only when one or more rows are selected.
- [ ] L13. The trace explorer toolbar stays above the graph canvas at all breakpoints.
- [ ] L14. The document viewer breadcrumb stays above the content body and below document-level actions.
- [ ] L15. The dashboard create-plan surface opens as a right side panel on desktop and tablet and as a full-screen overlay on mobile.

## State
- [ ] S1. Every route screen exposes default, loading, error, and empty states.
- [ ] S2. The shell exposes an offline state that preserves navigation while converting write interactions to queued or disabled behavior.
- [ ] S3. Dashboard loading uses panel-aligned skeleton placeholders.
- [ ] S4. Dashboard error shows a direct retry action.
- [ ] S5. Board loading uses card and column skeletons instead of generic spinners.
- [ ] S6. Board empty state offers a create-new CTA.
- [ ] S7. Approval error state explains the failed dependency and shows manual override only when admin permission is present.
- [ ] S8. Document viewer empty state tells the user to run gmind reindex and exposes a recovery CTA.
- [ ] S9. Trace explorer partial state shows local graph data first and displays a GitHub-loading badge.
- [ ] S10. Trace explorer empty state explains that no linked entities were found for the current Beads ID.
- [ ] S11. Task detail supports offline, saving, and not-found states in addition to core route states.
- [ ] S12. Task detail saving state shows field-local progress while a write request is in flight.
- [ ] S13. Search loading state indicates that three backends are being queried.
- [ ] S14. Search empty state suggests clearing filters or trying a different query.
- [ ] S15. Task list bulk-processing disables bulk controls and shows progress feedback.
- [ ] S16. Task list empty state distinguishes between no tasks existing and no tasks matching current filters.
- [ ] S17. Approval actions remain disabled when the required evidence set is incomplete.
- [ ] S18. Board task cards show an RTE escalation badge when rte_status is escalated.
- [ ] S19. Task detail shows an execution-context block when rte_status is approved.
- [ ] S20. Dashboard gap creation returns the user to refreshed dashboard data after plan creation.

## A11y
- [ ] A1. The implementation meets WCAG AA for all contract screens.
- [ ] A2. Keyboard users can reach shell navigation, search, filters, tabs, buttons, rows, and graph detail triggers.
- [ ] A3. Visible focus styling appears on all interactive controls, including sidebar links and result cards.
- [ ] A4. Status, severity, and approval indicators include text labels and are not color-only.
- [ ] A5. Side panel, drawer, bottom-sheet, and full-screen overlay states trap focus and restore it on close.
- [ ] A6. Ctrl+K and slash focus the global search field when the current context allows it.
- [ ] A7. The mobile overlay navigation preserves a logical reading and focus order.
- [ ] A8. Task detail accordion headings on mobile are keyboard-operable and expose expanded/collapsed state.
- [ ] A9. Graph node details are available without requiring drag gestures.
- [ ] A10. Empty-state CTAs and retry actions expose accessible names that reflect their outcomes.

## Navigation
- [ ] N1. The route map includes `/`, `/board`, `/tasks`, `/tasks/:id`, `/trace/:id`, `/docs`, `/approval`, and `/search`.
- [ ] N2. Sidebar active-route styling updates correctly as the user navigates.
- [ ] N3. From dashboard, a user can drill into low-coverage content without leaving the route unless they choose a linked destination.
- [ ] N4. From board, the board/list toggle navigates to `/tasks`.
- [ ] N5. From task list, clicking a row navigates to `/tasks/:id`.
- [ ] N6. From task detail, clicking a dependency link navigates to `/trace/:id`.
- [ ] N7. From task detail graph, the Open Full Page action navigates to `/trace/:id`.
- [ ] N8. From document viewer, clicking an auto-linked Beads ID navigates to `/trace/:id`.
- [ ] N9. From search results, selecting a task result navigates to `/tasks/:id`.
- [ ] N10. From search results, selecting a document result opens the matching document in `/docs`.
- [ ] N11. From trace explorer, double-clicking a task node navigates to `/tasks/:id`.
- [ ] N12. From trace explorer, double-clicking a document or PRD node navigates to `/docs`.
- [ ] N13. From approval gates, opening the linked work item can navigate back to the relevant task detail route.
- [ ] N14. Mobile shell navigation opens from the header hamburger and closes after route selection.
- [ ] N15. Breadcrumbs in the document viewer accurately reflect the selected document hierarchy.
