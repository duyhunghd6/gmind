# Stage 2 QA Acceptance Test Plan: WebUI PM Workspace

<!-- beads-id: br-agent-ralph-stage2-qa-webui-pm-workspace-iter3-plan -->

## Scope

Feature: `webui-and-pm-workspace`

Page target: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`

Contract SSOT: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/`

Live route: `http://localhost:9993/design-system/webui-pm-workspace`

Iteration: 3

## Test Mapping

### T1 Storyboard Replay

Use storyboard context slices and `storyboards.json` mechanically to extract target `ds_id`, states, and actions. Verify each target is present or reachable in `page.tsx`, states are exposed through `data-state` or deterministic controls, and actions have buttons/handlers matching Mermaid event names.

### T2 Contract Component Completeness

Validate `ui-contract.md` fenced YAML as block-style YAML. Extract expected component IDs from `component-map.json` and context slices. Compare expected/missing/extra IDs against rendered `data-ds-id`, `data-prd-ds-id`, aliases, and source constants. Verify screen IDs/routes/labels/bindings and reject legacy ASCII-only assumptions.

### T3 State Matrix

Parse YAML states and fenced Mermaid blocks from `ui-contract.md` and `flow.md`. Verify required default, loading, empty, error, offline, forbidden, saving, success, validation, permission, and not-found variants where contract-required.

### T4 Design System Token and Class Audit

Compare page CSS variable references with DS manifest token families, inspect hardcoded colors/font declarations, and verify DS component/layout classes are reused. Require at least 90% valid token usage and no conflicting invented tokens.

### T5 Accessibility Structural Test

Check for `<main>`, navigation landmarks, exactly one `<h1>`, valid heading order, image alt text, visible labels for controls, `aria-live` on dynamic regions, focus-visible styles, and keyboard-reachable actions.

### T6 Preview and Browser Artifact Consistency

Read artifact index, preview manifest warning counts/IDs, preview navigation tabs, and latest iteration 3 browser metadata/screenshots. Confirm metadata has no console errors and route/state/offline/reconnect interactions remain exercised.

### T7 Live Render Test

Use `curl` against `http://localhost:9993/design-system/webui-pm-workspace`. PASS on HTTP 200 and source-verifiable expected `data-ds-id` render paths; FAIL on 404/app error; SKIP only if server is unavailable.
