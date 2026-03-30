# PRD ↔ Design System Conflict Report

Feature: `prd-04-webui-and-pm-workspace`
Source PRD: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Compared against:
- `/Users/steve/duyhunghd6/gmind/.agents/agent-org/org-memory.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`

## Summary
Detected 2 active conflicts where PRD presentation guidance still needs normalization to current design-system and organization rules.
Route structure, back navigation, error recovery, empty-state CTAs, shell continuity, and responsive drawer behavior are aligned with the current contract.

## Conflicts

### 1) Spinner-first loading language conflicts with skeleton-first DS guidance
- PRD evidence:
  - Dashboard §6 says graph loading shows a spinner.
  - Document Viewer §9 says content loading uses a spinner.
  - Trace Explorer §10 says spinner appears while querying 5 data sources.
  - Task Detail §11 says saving state shows a small spinner.
- DS / org evidence:
  - Organization memory says: "DO NOT use circular spinners for loading — use skeleton loaders matching layout".
  - Contract already encodes `*.state.loading-skeleton` across route screens.
- Resolution direction:
  - Use layout-matching skeletons for page and panel loading.
  - Keep save progress as inline status text or another tokenized progress affordance instead of spinner-centric behavior.

### 2) Hardcoded semantic color language conflicts with tokenized styling
- PRD evidence:
  - Coverage heatmap specifies green/yellow/red thresholds.
  - Graph legend specifies named colors and explicit shape-color pairings.
  - Board, search, and approval descriptions reference red badges and direct color semantics.
- DS / org evidence:
  - Organization memory says: "DO NOT hardcode hex colors — always use `var(--*)` DS tokens".
  - Accessibility rules require color-only indicators to include text labels.
- Resolution direction:
  - Replace direct color prescriptions with semantic tokens such as success, warning, danger, and info plus visible text labels.
  - Preserve threshold meaning without binding flows or implementation to raw color instructions.

## Normalized decisions

### Dashboard create-plan interaction
- PRD evidence:
  - Dashboard §6 Journey 2 requires a create-plan modal.
- DS / org evidence:
  - Organization memory says: "DO NOT use modals for simple actions — prefer inline editing or slide-over panels".
- Normalized decision used in flow artifacts:
  - Desktop/tablet: right-side create-plan panel.
  - Mobile: full-screen create-plan overlay.
  - Focus trap and focus restore stay required for overlay states.
- Result:
  - This is treated as resolved presentation normalization, not an active blocker.
  - Contract selector `dashboard.surface.create-plan` is consistent with this normalized behavior.

## No-conflict notes
- Breadcrumbs and explicit back navigation are present across detail and sub-pages.
- Empty-state CTA flows and error recovery paths are represented for dashboard, docs, and approval journeys.
- Offline/read-only behavior in shell and task detail remains aligned with PRD and contract defaults.
- API-only data access is consistent between PRD requirements and the contract.