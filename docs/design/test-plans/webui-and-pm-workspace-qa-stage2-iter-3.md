# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 3

<!-- beads-id: br-qa-stage2-webui-pm-workspace-iter3-plan -->

## Scope

Acceptance target: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx` plus sibling split files.
Live URL: `http://localhost:9993/design-system/webui-pm-workspace`.
Contract source: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace/`.
Browser evidence: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/webui-pm-workspace-stage2/metadata.json`.

## Test Mapping

| Suite | Evidence | Checks |
| --- | --- | --- |
| T1 Storyboard Replay | `context-slices/storyboards/*.yaml`, `storyboards.json`, source | Confirm storyboard ds_id targets, screen/state steps, and action handlers are implementable. |
| T2 Contract Components | `ui-contract.md`, `component-map.json`, component slices, source | Verify block YAML, mapped ds_ids, labels, bindings, and no legacy ASCII-only assumptions. |
| T3 State Matrix | `ui-contract.md` Mermaid/YAML, `flow.md` fenced Mermaid | Verify shell, dashboard, approval, recovery, validation/permission states have deterministic source branches or `data-state`. |
| T4 DS Token Audit | DS manifest, source | Compare `var(--*)` usage, hardcoded colors, raw fonts, and registry class reuse. |
| T5 A11y Structural | source | Check landmarks, one h1 visible per active hash, labels, aria-live/status, keyboard/focus-visible support. |
| T6 Preview/Browser | `artifact-index.json`, `preview-manifest.json`, preview HTML, browser metadata | Check warning resolution, 9 preview tabs, hash-specific render metadata, and console errors. |
| T7 Live Render | curl live URL, source | Confirm route responds 200 and target data-ds-id elements can render. |
