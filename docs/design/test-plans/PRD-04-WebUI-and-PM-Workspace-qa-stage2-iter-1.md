# Stage 2 QA Test Plan for PRD-04-WebUI-and-PM-Workspace (Iter 1)

## T1: Storyboard Replay
- Replay all trajectories defined in `storyboards.json` (`trajectory_navigate_board`, `trajectory_offline_mode`, `trajectory_drill_down_graph`, `trajectory_approve_gate`).
- Verify each target `ds_id` exists in `page.tsx` and each action updates the UI state correctly.

## T2: Contract Component Completeness
- Extract list of `ds_id`s from `component-map.json` and cross-reference with `page.tsx`.
- Identify any missing components defined in the contract.

## T3: State Matrix
- Verify that states defined in the Mermaid state machine and YAML blueprint are represented in `page.tsx`.
- Ensure all screens handle their specific states (e.g., `offline`, `empty`, `error`, `loading`, `not_found`, `saving`, `bulk_processing`, `partial`).

## T4: Design System Token and Class Audit
- Audit `page.tsx` for hardcoded styles (colors, fonts).
- Verify usage of tokens from `registry.json`.
- Ensure token usage rate >= 90%.

## T5: Accessibility Structural Test
- Check for structural `<main>`, `<header>`, `<nav>`, `<aside>` landmarks.
- Ensure correct `<h1>` heading hierarchy.
- Validate `aria-label` or `aria-live` usage.
- Check focus-visible CSS definitions.

## T6: Preview and Browser Artifact Consistency
- Validate `preview-manifest.json` warnings.
- Determine if any warnings correlate with implementation gaps.
- Verify browser screenshot exists.

## T7: Live Render Test
- Perform a HTTP GET to `http://localhost:9993/design-system/PRD-04-WebUI-and-PM-Workspace`.
- Verify response code is 200.
