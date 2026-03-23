# PRD ↔ Design System Conflict Report

Feature: `prd-04-webui-and-pm-workspace`
Source PRD: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Compared against:
- `/Users/steve/duyhunghd6/gmind/.agents/agent-org/org-memory.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`

## Summary
Detected 2 active conflicts where PRD presentation guidance still needs normalization to current design-system rules and organization anti-patterns.
A previously open dashboard create-plan conflict is now normalized for flow artifacts as a non-blocking side panel on desktop/tablet and full-screen overlay on mobile; only the legacy selector name in `contract.yaml` remains as naming debt.

## Conflicts

### 1) Spinner-first loading language conflicts with skeleton-first DS guidance
- PRD evidence:
  - Dashboard §6 state table says graph shows a spinner.
  - Document Viewer §9 says content panel uses a spinner.
  - Trace Explorer §10 says spinner while querying 5 data sources.
  - Task Detail §11 says saving state shows a small spinner.
- DS / org evidence:
  - Organization memory says: "DO NOT use circular spinners for loading — use skeleton loaders matching layout".
  - Contract already encodes loading states as `*.state.loading-skeleton` across route screens.
- Resolution direction:
  - Use layout-matching skeletons for page and panel loading.
  - Keep save progress as inline non-blocking status text or tokenized progress affordance rather than spinner-centric spec language.

### 2) Hardcoded semantic colors and shape language conflict with tokenized styling
- PRD evidence:
  - Coverage heatmap specifies green/yellow/red thresholds.
  - Graph legend specifies named colors and explicit shape-color pairings.
  - Search and board states reference red badges and other direct color semantics.
- DS / org evidence:
  - Organization memory says: "DO NOT hardcode hex colors — always use `var(--*)` DS tokens".
  - It also warns against pure black and direct color dependence without tokens.
  - Contract accessibility rules require color-only indicators to include text labels.
- Resolution direction:
  - Replace direct color prescriptions with DS semantic tokens such as success/warning/danger/info plus text labels and badges.
  - Preserve threshold meaning, but express it through tokens and accessible labels instead of raw color instructions.

## Normalized decisions

### Dashboard create-plan interaction
- PRD evidence:
  - Dashboard §6 Journey 2 explicitly requires modal "Create Plan".
- DS / org evidence:
  - Organization memory says: "DO NOT use modals for simple actions — prefer inline editing or slide-over panels".
- Normalized contract decision for flow artifacts:
  - Use a right-side create-plan panel on desktop/tablet and a full-screen create-plan overlay on mobile.
  - Preserve focus trap and focus restore behavior required for overlays.
  - Continue mapping the surface to `dashboard.modal.create-plan` until contracts are renamed, treating that selector as legacy naming rather than modal behavior.
- Result:
  - This is no longer an open evaluator exception in the flow set; it is a resolved presentation decision with minor selector naming debt.

## No-conflict notes
- Breadcrumbs, back navigation, offline banner, error recovery actions, and empty-state CTAs are aligned with the contract defaults.
- Drawer and overlay behavior across desktop/tablet/mobile is aligned with the PRD responsive guidance.
- Dashboard create-plan behavior is normalized to a side panel / mobile full-screen overlay in the generated flow artifacts.
