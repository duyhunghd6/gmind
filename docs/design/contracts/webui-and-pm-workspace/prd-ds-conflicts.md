# PRD/Design-System Conflicts: WebUI and PM Workspace

<!-- beads-id: br-design-webui-pm-conflicts -->

## Resolved / Assigned Conflicts

1. **Styling ownership conflict**
   - PRD source: `br-prd04-s6.4` says frontend styling is `CSS custom (dark theme)`.
   - Contract source: `metadata.design_system_registry` restricts UI to `@gmind/design-system` components and DS tokens.
   - Resolution owner: Design System owner with PMO approval.
   - Accepted resolution: Treat custom CSS as layout glue only; visual styling must use DS tokens and registered DS components.
   - Status: assigned for Stage 2 implementation; no unresolved Stage 1 flow blocker.

2. **Loading spinner conflict**
   - PRD source: `br-prd04-s9.3` says Document Viewer uses a spinner for content loading.
   - Contract source: `boundary_content.loading` requires layout-matched skeletons and disallows standalone centered spinner-only pages.
   - Resolution owner: Ralph Stage 1 evaluator and UX reviewer.
   - Accepted resolution: Allow a small inline progress indicator inside the content skeleton, but reject spinner-only loading states.
   - Status: assigned for Stage 2 implementation; no unresolved Stage 1 flow blocker.

## Unresolved Conflicts

None for Stage 1 flow/map generation.
