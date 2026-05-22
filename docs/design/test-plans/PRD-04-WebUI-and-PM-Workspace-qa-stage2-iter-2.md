# Stage 2 QA Acceptance Test Plan: PRD-04-WebUI-and-PM-Workspace
**Iteration:** 2
**Builder Score:** 90

## Objective
Verify the implementation of `PRD-04-WebUI-and-PM-Workspace` in `page.tsx` against the UI contract, storyboards, design system, and accessibility standards.

## T1: Storyboard Replay
- Verify target `ds_id`s in `page.tsx` for trajectories: `trajectory_navigate_board`, `trajectory_offline_mode`, `trajectory_drill_down_graph`, `trajectory_approve_gate`.
- Check states (e.g., `loading`, `default`, `offline`).
- Check actions (e.g., `navigate_board`, `drill_down_graph`, `trigger_approve`).

## T2: Contract Component Completeness
- Extract components from `component-map.json` and ensure all components (`ds:*`) are present in `page.tsx` and sub-components.

## T3: State Matrix
- Verify that every state listed in the contract (e.g., `offline`, `empty`, `error`, `not_found`, `saving`, `partial`, `insufficient_evidence`) has a corresponding visual representation or explicit data-state handler.

## T4: Design System Token and Class Audit
- Match all `var(--*)` usages against `registry.json` tokens.
- Verify `ds-comp-*` and `ds-lay-*` classes exist in `registry.json`.

## T5: Accessibility Structural Test
- Check for `<main>`, `role="banner"`, `role="navigation"`, `role="search"`.
- Ensure one `<h1>` exists per view context and heading levels are correct.
- Verify `aria-label` or `aria-labelledby` for inputs/buttons.
- Check for `aria-live` regions.
- Ensure keyboard focus (`tabIndex`) and focus styles are implemented.

## T6: Preview and Browser Artifact Consistency
- Validate against provided browser screenshots. (Skipped per orchestrator).

## T7: Live Render Test
- Curl dev server at `http://localhost:9993/design-system/PRD-04-WebUI-and-PM-Workspace`. (Skipped per orchestrator).
