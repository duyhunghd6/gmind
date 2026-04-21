# PRD ↔ Design System Conflict Report

Feature: `prd-04-webui-and-pm-workspace`
Source PRD: `/Users/steve/duyhunghd6/gmind/docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`
Compared against:
- `/Users/steve/duyhunghd6/gmind/.agents/agent-org/org-memory.md`
- `/Users/steve/duyhunghd6/gmind/docs/design/contracts/prd-04-webui-and-pm-workspace/contract.yaml`

## Summary
No active PRD ↔ DS conflicts remain for Stage 1 flow artifacts.
The current flows normalize PRD intent into contract-safe patterns for loading, semantic status styling, and create-plan surfaces.

## Final normalized decisions

### 1) Loading states use skeleton-first layouts instead of spinner-first blockers
- PRD evidence:
  - Dashboard §6.6 mentions graph spinner language during loading.
  - Document Viewer §9.3 mentions spinner language in the content panel.
  - Trace Explorer §10.4 mentions a spinner during graph queries.
  - Task Detail §11.4 mentions a small spinner during save.
- DS / org evidence:
  - Organization memory says: "DO NOT use circular spinners for loading — use skeleton loaders matching layout".
  - Contract encodes loading skeleton states for every route screen.
  - Contract encodes `task-detail.state.saving` as a dedicated save state.
- Final decision:
  - Page, panel, tree, graph, and table loads use layout-matching skeletons.
  - Save progress is represented by a saving state with disabled affordances; any spinner is subordinate, not primary.
- Outcome:
  - Resolved. Not an active conflict.

### 2) Semantic colors are tokenized and paired with text labels
- PRD evidence:
  - Dashboard §6.2 and §6.5 describe direct red, yellow, green, blue, and gray visual semantics.
  - Trace Explorer §10.2 assigns explicit colors to node types.
- DS / org evidence:
  - Organization memory says: "DO NOT hardcode hex colors — always use `var(--*)` DS tokens".
  - Accessibility rules require color-only indicators to include text labels.
- Final decision:
  - Coverage, approval, trace, and task states map to tokenized semantic roles plus text labels, badges, and icon/shape cues.
- Outcome:
  - Resolved. Not an active conflict.

### 3) Create-plan interaction uses responsive panel or overlay behavior instead of a desktop modal
- PRD evidence:
  - Dashboard §6.2 and §6.8 describe a create-plan modal.
- DS / org evidence:
  - Organization memory says: "DO NOT use modals for simple actions — prefer inline editing or slide-over panels".
  - Contract defaults specify side panel on desktop and full-screen overlay on mobile for auxiliary surfaces.
- Final decision:
  - Desktop and tablet use a create-plan side panel.
  - Mobile uses a full-screen overlay with focus trap and focus restore.
- Outcome:
  - Resolved. Not an active conflict.

## No-conflict notes
- Back navigation and breadcrumb recovery are present across detail and sub-pages.
- Empty-state CTA flows are present for dashboard, docs, approvals, and task-based recovery.
- Error recovery paths include retry, return-home, queue return, cache fallback, and support escalation.
- Route behavior remains API-only and consistent with the contract.
