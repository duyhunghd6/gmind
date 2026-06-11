# Stage 2 QA Acceptance Test Plan: webui-and-pm-workspace Iteration 5

<!-- beads-id: br-agent-ralph-stage2-qa-webui-pm-workspace-iter5-plan -->

## Scope

Validate the WebUI PM Workspace implementation after selective fixes without editing implementation files.

Targets:

- Implementation: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/webui-pm-workspace/`
- Design-system alias: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Browser report: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/webui-pm-workspace-stage2-rerender-report.json`
- Live routes: `http://localhost:9993/webui-pm-workspace`, `http://localhost:9993/design-system/webui-pm-workspace`

## Test Mapping

| Test | Contract evidence | Implementation evidence | Acceptance check |
| --- | --- | --- | --- |
| T1 Storyboard Replay | `storyboards.json`, storyboard slices | `data-action-id`, `data-event`, state controllers | All storyboard trajectories have reachable actions/events and states. |
| T2 Contract Components | `ui-contract.md`, `component-map.json`, component slices | `data-ds-id`, route/screen IDs, labels | All component-map IDs render; YAML block remains block-style. |
| T3 State Matrix | Mermaid blocks in `ui-contract.md` and `flow.md` | `data-state`, state arrays/selectors, default state initialization | Required default/loading/error/empty/success/permission/validation variants are represented. |
| T4 DS Token Audit | DS manifest tokens | `var(--*)`, class reuse | Usage rate at least 90%; no hardcoded colors or conflicting invented tokens. |
| T5 A11y Structural | Contract landmark and interaction requirements | `<main>`, navigation, headings, labels, aria-live, focus-visible | Structural accessibility checks pass. |
| T6 Preview and Browser Consistency | `artifact-index.json`, `preview/preview-manifest.json`, preview HTML, browser report | Render metadata and screenshots | Preview warnings are resolved; all 9 tabs exist; browser artifact matches route/layout expectations. |
| T7 Live Render | Live dev server | HTTP response and source renderability | Routes return 200 and do not expose application error output. |

## Prior Blocker Rechecks

- T1: Verify 22 unique storyboard action IDs and generated `EVENT_*` names are present.
- T2: Verify `ds:webui.header.top-level` appears in source and browser report.
- T3: Verify task detail and trace explorer default states initialize to `default`.
- T6: Verify 390px mobile viewport has `scrollWidth` equal to 390.
