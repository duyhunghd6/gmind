# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 1

<!-- beads-id: br-agent-ralph-stage2-qa-webui-and-pm-workspace-iter-1-plan -->

## Scope

Validate `apps/website/src/app/design-system/webui-pm-workspace/page.tsx` and companion workspace components against the Stage 1 contract in `docs/design/contracts/webui-and-pm-workspace`, sliced storyboards, design-system manifest, preview artifacts, browser render evidence, and live route `http://localhost:9993/design-system/webui-pm-workspace`.

## Test Mapping

| Test | Contract inputs | Implementation checks | Acceptance |
|---|---|---|---|
| T1 Storyboard Replay | `context-slices/storyboards/*.yaml`, `storyboards.json`, Mermaid events | `data-ds-id`, `data-state`, hash route/action handlers | Every sliced trajectory is implementable in source. |
| T2 Contract Component Completeness | `ui-contract.md` YAML, `component-map.json`, `context-slices/components/*.yaml` | Expected `ds_id`, labels, bindings, screen IDs/routes | All mapped components exist and match contract; YAML is block-style. |
| T3 State Matrix | YAML states, fenced Mermaid in `ui-contract.md` and `flow.md` | `data-state`/deterministic branches for required states and transitions | Required default/loading/error/empty/success/permission/validation states represented. |
| T4 DS Token/Class Audit | `ds-manifest.txt` | `var(--*)`, registry classes, hardcoded colors/fonts | Token usage >= 90%, no invented/conflicting tokens. |
| T5 Accessibility Structural | Contract labels and rendered source | landmarks, one h1, heading hierarchy, labels, aria-live, focus-visible | Structural a11y checks pass. |
| T6 Preview/Browser Consistency | `artifact-index.json`, `preview/preview-manifest.json`, render JSON/screenshots | warning count, nine preview tabs, browser hashes/components/errors | Preview warnings resolved and browser artifact consistent. |
| T7 Live Render | `http://localhost:9993/design-system/webui-pm-workspace` | HTTP route status and source renderability | 200 if server running; skip if server unavailable. |
