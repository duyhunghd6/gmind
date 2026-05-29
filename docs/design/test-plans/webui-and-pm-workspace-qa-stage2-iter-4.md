# Stage 2 QA Test Plan Iteration 4: webui-and-pm-workspace
<!-- beads-id: br-design-qa-stage2-webui-pm-workspace-iter4-plan -->

## Scope
<!-- beads-id: br-design-qa-stage2-webui-pm-workspace-iter4-plan-scope -->

Independent QA for the WebUI PM Workspace icon iteration at `/design-system/webui-pm-workspace`.

Inputs:
- Contract: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Source: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Components: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/workspace-components.tsx`
- Live URL: `http://localhost:9993/design-system/webui-pm-workspace`
- Browser screenshot: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/webui-pm-workspace-icons.png`
- Builder audit: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage2-iter-4.json`

## Test Mapping
<!-- beads-id: br-design-qa-stage2-webui-pm-workspace-iter4-plan-tests -->

| Test | Contract evidence | Source/live evidence to verify |
| --- | --- | --- |
| T1 Storyboard Replay | `storyboards.json`; Mermaid events in `ui-contract.md` and `flow.md` | Dashboard and approval trajectories implement hash navigation, state exposure, Drill-down, View Trace, Approve/Reject/Request Changes handlers. |
| T2 Contract Component Completeness | YAML View Blueprint and `component-map.json` | All `ds_id` entries and labels/bindings appear in source; YAML block remains block-style YAML. |
| T3 State Matrix | YAML states and fenced Mermaid transitions | Default/loading/error/empty/offline/permission/validation-success variants are reachable via state controls or deterministic branches. |
| T4 DS Token/Class Audit | DS manifest token and class list | `var(--*)` references resolve; no hardcoded colors or raw font-family declarations; DS classes reused for buttons, badges, tables, heatmap, graph, skeleton. |
| T5 Accessibility Structural | Contract labels plus icon iteration scope | Landmarks, one visible h1, navigations, search label, live regions, focus-visible styles, icon labels, collapsed icon-only sidebar aria-labels. |
| T6 Preview/Browser Consistency | `artifact-index.json`, preview manifest, preview HTML tabs, browser screenshot metadata | No preview warnings; all 9 preview tabs present; screenshot/browser render confirms icon counts and hash navigation. |
| T7 Live Render | Live route | `curl` returns 200 and source renders expected `data-ds-id` elements. |

## Acceptance Criteria
<!-- beads-id: br-design-qa-stage2-webui-pm-workspace-iter4-plan-criteria -->

Pass requires no P0/P1 blockers for the icon iteration, no hash-navigation regression, visible icons paired with accessible labels or aria-labels, status icons with text/live semantics, valid DS token usage, and a live 200 route.
