# Stage 2 QA Test Plan — WebUI PM Workspace Iteration 4

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter4-plan -->

## Scope

Independent QA acceptance for `apps/website/src/app/design-system/webui-pm-workspace/page.tsx` against `docs/design/contracts/webui-and-pm-workspace/ui-contract.md`, PRD-04 §8.1A route coverage, sliced storyboard/component evidence, DS manifest, preview output, and browser evidence.

## Test Mapping

| Suite | Contract evidence | Implementation evidence | Acceptance |
| --- | --- | --- | --- |
| T1 Storyboard Replay | `storyboards.json`, `context-slices/storyboards/*.yaml` when present, Mermaid events | `data-ds-id`, `data-state`, event handlers in page source | All trajectory targets, states, and events implementable |
| T2 Contract Components | YAML block in `ui-contract.md`, `component-map.json`, component slices | DS IDs, screen IDs, routes, labels, bindings in source | All mapped IDs and routes present; YAML is block-style |
| T3 State Matrix | `ui-contract.md` state contracts, fenced Mermaid in `flow.md` | `ViewState`, state controls, `StatePanel`, `data-state`/`data-contract-state` | Required default/loading/empty/error/offline/forbidden/partial/saving/not_found/success states represented |
| T4 DS Token Audit | `ds-manifest.txt` tokens/classes | `var(--*)`, DS classes, absence of hardcoded colors/font-family | Token usage rate >= 90%; no conflicting invented tokens |
| T5 Accessibility | Contract assertion hooks and structural a11y expectations | landmarks, heading, forms, buttons, aria-live, focus-visible | Structural checks pass |
| T6 Preview/Browser Consistency | `artifact-index.json`, `preview/preview-manifest.json`, `preview/index.html`, browser evidence | warning counts, nine preview tabs, screenshot metadata, probes | Preview warnings resolved and browser artifact exists; probe misses triaged |
| T7 Live Render | `http://localhost:9993/design-system/webui-pm-workspace` | curl status and source-renderability checks | 200 = pass; 404/app error = fail; unavailable server = skip |

## QA Focus

- Determine whether audit interaction-probe misses are source/UI defects or probe/evidence selector issues.
- Confirm PRD-04 §8.1A Core WebUI plus showcase route coverage is present with stable attributes.
- Confirm no P0 issue blocks Gate B.
