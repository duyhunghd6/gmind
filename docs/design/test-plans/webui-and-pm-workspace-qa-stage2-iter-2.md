# Stage 2 QA Test Plan: WebUI and PM Workspace Iteration 2
<!-- beads-id: br-agent-ralph-stage2-qa -->

## Scope
Validate Stage 2 implementation for `webui-and-pm-workspace` against the current Stage 1 contract and refreshed browser evidence.

## Targets
- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- UI contract: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/ui-contract.md`
- Page source: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Live route: `http://localhost:9993/design-system/webui-pm-workspace`
- Browser evidence: `/Users/steve/duyhunghd6/gmind/tmp/webui-pm-workspace-evidence/evidence.json`

## Test Mapping
- T1 Storyboard replay: extract storyboard slices/YAML and verify `ds_id`, state reachability, and event handlers in source.
- T2 Contract components: verify block-style YAML contract, component-map IDs, screen routes, labels/bindings, stable DS IDs, and absence of legacy ASCII-only assumptions.
- T3 State matrix: parse YAML and fenced Mermaid blocks only; verify default/loading/error/empty/success/permission/validation variants and current acceptance state variants.
- T4 Design-system token/class audit: compare `var(--*)` usage to manifest-derived tokens; flag hardcoded colors, raw font-family, invented/conflicting tokens, and class reuse.
- T5 Accessibility structural test: verify landmarks, headings, labels, alt text, aria-live, keyboard-reachable actions, and focus-visible styles.
- T6 Preview/browser consistency: inspect artifact index, preview manifest warning counts/IDs, 9 preview tabs, and refreshed screenshots/evidence consistency.
- T7 Live render: curl the dev-server route and verify source/evidence can render expected `data-ds-id` and `data-screen-id` coverage.

## Acceptance Focus
Route coverage, stable unique DS IDs, Go REST boundary affordances, required state variants, keyboard/focus/accessibility, interactions, responsive behavior, and acceptance criteria from current contract IDs.
