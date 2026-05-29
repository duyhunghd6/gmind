# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 10

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter10-plan -->

## Scope
- Page: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Component helper: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/workspace-components.tsx`
- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Live URL: `http://localhost:9993/design-system/webui-pm-workspace`
- Browser evidence: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/stage2-browser-evidence/webui-pm-workspace-stage2-browser-evidence.json`

## Test Mapping
1. T1 Storyboard Replay: read context storyboard YAML slices, verify `data_ds_id`, states, and actions are implementable in page source.
2. T2 Contract Component Completeness: verify `ui-contract.md` fenced YAML is block-style; compare component map and context-slice DS IDs to page/source implementation.
3. T3 State Matrix: parse `ui-contract.md` YAML states and fenced Mermaid in `flow.md`; verify required states and transitions have deterministic source representation.
4. T4 Design System Token/Class Audit: compare page `var(--*)` usage and classes against DS manifest; flag hardcoded Tailwind color classes and unused registry components.
5. T5 Accessibility Structural Test: check landmarks, h1 hierarchy, button/link/input labels, dynamic-region semantics, focus-visible styling, and keyboard-reachable handlers.
6. T6 Preview/Browser Consistency: validate preview manifest warnings, nine preview tabs, and supplied browser evidence vs implemented surfaces.
7. T7 Live Render: verify dev-server route returns HTTP 200 and rendered source can expose expected `data-ds-id` elements.
