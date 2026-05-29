# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 7

<!-- beads-id: br-ds-qa-stage2-webui-pm-workspace-iter7-plan -->

## Scope

<!-- beads-id: br-ds-qa-stage2-webui-pm-workspace-iter7-plan-scope -->

Target page: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
Live route: `http://localhost:9993/design-system/webui-pm-workspace`
Browser evidence: `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/stage2-browser-evidence-20260529.json`

## Test Mapping

<!-- beads-id: br-ds-qa-stage2-webui-pm-workspace-iter7-plan-mapping -->

- T1 Storyboard Replay: parse `context-slices/storyboards/*.yaml` and `storyboards.json`; verify referenced `data_ds_id`, expected states, and events against `page.tsx`.
- T2 Contract Components: verify `ui-contract.md` YAML fencing and block style; compare `component-map.json` plus `context-slices/components/*.yaml` ds IDs and YAML layout bindings against `page.tsx`.
- T3 State Matrix: parse YAML screen states and only fenced Mermaid blocks in `flow.md`; verify default, loading, empty, error, permission, offline, saving, success, validation, and conflict branches.
- T4 DS Token/Class Audit: compare `var(--*)` use in source against `ds-manifest.txt`; flag hardcoded colors and raw font-family declarations.
- T5 Accessibility Structural: inspect source for landmarks, single H1, heading progression, labels, aria-live/status/alert regions, visible button/link text, and focus-visible styles.
- T6 Preview/Browser Consistency: inspect `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html` tabs, and supplied browser evidence screenshots/JSON.
- T7 Live Render: request the live URL and classify as PASS, FAIL, or SKIP when the dev server is unavailable.
