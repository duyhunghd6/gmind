# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 2

<!-- beads-id: br-qa-stage2-webui-and-pm-workspace-iter-2-plan -->

## Scope
- Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Page target: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Live URL: `http://localhost:9993/design-system/webui-pm-workspace`
- Browser evidence: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/browser-render/iteration-2-browser-metadata.json`

## Test Mapping
| Suite | Evidence | Acceptance focus |
|---|---|---|
| T1 Storyboard Replay | `storyboards.json`, `context-slices/storyboards/*.yaml`, Mermaid events | ds_id targets, state reachability, action handlers/links |
| T2 Contract Components | `ui-contract.md`, `component-map.json`, component slices | YAML block-style contract, ds_id presence, exact component labels |
| T3 State Matrix | YAML states, fenced Mermaid blocks in `ui-contract.md` and `flow.md` | default/loading/error/empty/offline/approval states |
| T4 DS Token Audit | `ds-manifest.txt`, source `var(--*)` usage | >=90% valid tokens, no invented/conflicting tokens/colors |
| T5 Accessibility | Source landmarks/headings/labels/live regions/focus styles | structural a11y and keyboard reachability |
| T6 Preview/Browser | `artifact-index.json`, preview manifest/html, browser metadata/screenshots | preview warnings resolved, 9 tabs present, screenshots/anchors consistent |
| T7 Live Render | `curl` against live URL | route returns 200 or skip if server unavailable |
