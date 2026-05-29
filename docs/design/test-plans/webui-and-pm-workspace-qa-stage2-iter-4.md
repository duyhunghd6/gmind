# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 4

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter4-plan -->

## Scope

Acceptance target includes `apps/website/src/app/design-system/webui-pm-workspace/page.tsx`, sibling split files in the same route directory, and `apps/website/src/app/design-system/layout.tsx` for the hash hydration fix. Contract evidence is sourced from `docs/design/contracts/webui-and-pm-workspace/`, latest browser metadata from `tmp/test_puppeteer_dir/webui-pm-workspace-stage2-iter4/capture-metadata.json`, and the iteration 4 builder scorecard.

## Test Mapping

| Suite | Contract source | Implementation source | Acceptance check |
| --- | --- | --- | --- |
| T1 Storyboard Replay | `storyboards.json`; storyboard context slices where applicable | `page.tsx`, `workspace-components.tsx`, `layout.tsx` | Target screens, ds ids, states, and actions are reachable through hash navigation, buttons, links, and forms. |
| T2 Contract Component Completeness | `ui-contract.md`, `component-map.json` | route source and browser metadata | YAML is block-style; all contract ds ids and labels/bindings/actions are implemented without legacy ASCII assumptions. |
| T3 State Matrix | YAML states and fenced Mermaid blocks in `ui-contract.md` and `flow.md` | `data-state`, state selectors, state panels | Required default/loading/error/empty/offline/permission/approval/dashboard states are represented. |
| T4 DS Token/Class Audit | DS manifest under pipeline state | route split files and design-system layout | CSS variables resolve to DS tokens; no hardcoded colors or raw font-family; DS utility classes reused. |
| T5 Accessibility Structural | YAML shell and screen expectations | rendered source structure | Landmarks, heading hierarchy, labels, aria-live/status, focus-visible, and keyboard paths exist. |
| T6 Preview/Browser Consistency | `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html`, browser metadata | latest capture metadata | Preview warnings do not expose gaps; 9 tabs exist; hash screens, aliases, console errors, and previous QA blockers are resolved. |
| T7 Live Render | live route `http://localhost:9993/design-system/webui-pm-workspace` | dev server response and source ds ids | Route returns 200 and expected elements can render. |

## Prior Blocking Issues to Recheck

1. Browser console hydration mismatch on hash URLs.
2. Individual hash URLs must render distinct storyboard-aligned screens and panels.
3. Task-list pagination, board/list toggle, CSV export, and saving state coverage.
4. Screen aliases for tasks/docs must align to task-list/doc-viewer.
