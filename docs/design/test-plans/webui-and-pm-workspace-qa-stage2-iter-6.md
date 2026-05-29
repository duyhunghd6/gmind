# Stage 2 QA Acceptance Plan — WebUI PM Workspace Iteration 6

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter-6-plan -->

## Scope

Feature: `webui-and-pm-workspace`.

Source under test: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`.

Contract package: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`.

Live showcase route: `http://localhost:9993/design-system/webui-pm-workspace`.

Browser evidence:
- `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/stage2-browser-20260529-desktop.png`
- `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/stage2-browser-20260529-mobile.png`
- `/Users/steve/duyhunghd6/gmind/docs/design/screens/webui-and-pm-workspace/stage2-browser-20260529-desktop-post-interaction.png`

## Test Mapping

| Suite | Contract Evidence | Acceptance Method |
| --- | --- | --- |
| T1 Storyboard replay | `context-slices/storyboards/*.yaml`, `storyboards.json`, Mermaid events in `flow.md` | Mechanically extract ds_id, state, and event references; verify page source contains data-ds-id targets, state controllers, and event handlers/actions. |
| T2 Contract component completeness | `ui-contract.md`, `component-map.json`, `context-slices/components/*.yaml` | Verify block-style YAML fence; compare expected ds_id/screen/action/component evidence against source. |
| T3 State matrix | YAML screen states plus fenced Mermaid diagrams from `ui-contract.md` and `flow.md` | Verify default/loading/empty/error/offline/forbidden plus specialized states are represented as `data-state` or deterministic branches/recovery controls. |
| T4 DS token/class audit | `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace/ds-manifest.txt` | Extract `var(--*)`; compare against manifest tokens; scan for hardcoded colors, raw font-family, and DS class reuse. |
| T5 Accessibility structural | Contract a11y defaults and source | Check main/nav/search/dialog/status/alert landmarks, single h1, label/aria-label text, aria-live regions, keyboard handlers, and focus-visible styles. |
| T6 Preview/browser consistency | `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html`, screenshots | Verify preview status/warnings, 9 required tabs, browser screenshots, and unresolved gaps. |
| T7 Live render | Showcase route | Curl live route and verify non-404/non-application-error response plus source renderability of expected ds_id elements. |

## Gate Criteria

Gate B QA passes only if all non-skipped suites pass and no P0/P1 defects remain. P2 maintainability findings may remain documented as non-blocking.
