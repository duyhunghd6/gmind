# Stage 2 QA Test Plan — webui-and-pm-workspace iteration 5

<!-- beads-id: br-agent-ralph-stage2-qa | satisfies: br-prd04-s8 -->

## Scope

Acceptance target: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx` against `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace` and live route `http://localhost:9993/design-system/webui-pm-workspace`.

## Test Mapping

- T1 Storyboard replay: mechanically extract `storyboards.json` trajectories, ds_ids, states, and `EVENT_*` actions; compare to page source handlers and rendered state controls.
- T2 Contract components: validate `ui-contract.md` fenced YAML block style; compare `component-map.json` ds_ids, screen IDs, routes, labels, and bindings to page source.
- T3 State matrix: parse YAML and fenced Mermaid only from `ui-contract.md` and `flow.md`; verify required default/loading/error/empty/success/permission/validation/recovery equivalents are represented in deterministic source branches.
- T4 DS token/class audit: compare `var(--*)` references in page source to `packages/design-system/tokens/*.css`; flag hardcoded colors, raw font declarations, or invented/conflicting tokens.
- T5 Accessibility structural test: verify landmarks, exactly one h1, heading order, labeled controls, dynamic `aria-live`, focus-visible styles, and keyboard-reachable native actions.
- T6 Preview/browser consistency: inspect artifact index, preview manifest warnings, preview tab coverage, and browser render evidence/screenshots under `/Users/steve/duyhunghd6/gmind/tmp/webui-pm-workspace-evidence`.
- T7 Live render: curl the canonical port 9993 route and classify 200 as PASS, 404/app error as FAIL, unavailable dev server as SKIP with reason.
