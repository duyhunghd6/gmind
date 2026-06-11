# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 4
<!-- beads-id: br-ds-webui-pm-qa-stage2-iter4-plan -->

## Scope
<!-- beads-id: br-ds-webui-pm-qa-stage2-iter4-plan-scope -->

Target sources:
- `/Users/steve/duyhunghd6/gmind/apps/website/src/app/webui-pm-workspace/page.tsx`
- `/Users/steve/duyhunghd6/gmind/apps/website/src/app/webui-pm-workspace/WebUIPMWorkspacePage.tsx`
- `/Users/steve/duyhunghd6/gmind/apps/website/src/app/webui-pm-workspace/workspace-components.tsx`
- `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`

Contract root: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`.
Live URLs: `http://localhost:9993/webui-pm-workspace` and `http://localhost:9993/design-system/webui-pm-workspace`.
Browser artifacts: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/webui-pm-workspace-capture-report.json`.

## Suites
<!-- beads-id: br-ds-webui-pm-qa-stage2-iter4-plan-suites -->

1. T1 Storyboard replay: mechanically read storyboard YAML slices, map action ids to component-map events, and check source handlers/routes/states.
2. T2 Contract component completeness: validate ui-contract YAML block style; compare all component-map `ds_id` strings against source; check labels/routes/bindings evidence.
3. T3 State matrix: parse YAML/flow Mermaid state requirements and verify required states plus correct normal-entry defaults.
4. T4 DS token and class audit: compare `var(--*)` source references to DS manifest and flag hardcoded colors or raw font-family declarations.
5. T5 Accessibility structural test: check landmarks, one h1, navigation, labels, aria-live, focus-visible, and keyboard-reachable actions.
6. T6 Preview/browser consistency: inspect artifact index, preview manifest/tab coverage, and puppeteer render metadata for unresolved warnings or layout violations.
7. T7 Live render: curl live PM workspace and design-system alias routes for HTTP 200 without application error.
