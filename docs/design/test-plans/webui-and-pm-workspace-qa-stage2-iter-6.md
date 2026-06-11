# Stage 2 QA Test Plan — webui-and-pm-workspace — Iteration 6

<!-- beads-id: br-agent-ralph-stage2-qa -->

Created: 2026-05-29T16:26:09.437608+00:00

## Scope

Gate B acceptance for WebUI PM Workspace after event catalog and secondary-surface changes. Implementation target is `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`, which aliases `/Users/steve/duyhunghd6/gmind/apps/website/src/app/webui-pm-workspace/WebUIPMWorkspacePage.tsx`.

## Test Mapping

| Suite | Contract/source evidence | Acceptance method |
| --- | --- | --- |
| T1 Storyboard replay | `storyboards.json`, storyboard context slices, Mermaid events | Extract trajectories/actions/states; verify action IDs/events and `data-state`/state controllers in source. |
| T2 Component completeness | `ui-contract.md`, `component-map.json`, component slices | Parse YAML block and component map; verify every `ds_id`, screen ID, route, label/binding assumption has a rendered or catalogued source target. |
| T3 State matrix | YAML screens, Mermaid fenced blocks in `ui-contract.md` and `flow.md` | Verify default/loading/error/empty/success/permission/validation and specialty states are represented by state selectors, placeholders, or rendered panels. |
| T4 DS token audit | `ds-manifest.txt`, page and imported workspace modules | Compare `var(--*)` references with manifest tokens; flag invented tokens, hardcoded colors, font declarations, and class reuse. |
| T5 A11y structural | Page source | Verify main/nav landmarks, headings, labels, aria-live, focus-visible, and keyboard-reachable controls. |
| T6 Preview/browser consistency | `artifact-index.json`, `preview-manifest.json`, preview HTML, render report | Verify preview warning count, nine navigation tabs, screenshot/browser metadata, console errors, and overflow. |
| T7 Live render | `http://localhost:9993/design-system/webui-pm-workspace` | Curl route; pass on 200 plus source-renderable `data-ds-id` coverage. |

## Inputs

- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Scorecard: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/scorecards/stage2-iter-6.json`
- Browser report: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/iter6-webui-pm-workspace-render-report.json`
- Prior QA: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/qa-stage2-iter-5.json`
