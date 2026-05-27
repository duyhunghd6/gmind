# Assertion Checklist: WebUI & PM Workspace
<!-- beads-id: br-design-assertions-webui-pm-workspace -->

## Gate A Flow Fix Assertions

- [x] Canonical contract directory is `docs/design/contracts/webui-and-pm-workspace`.
- [x] `flow.md` contains exactly one fenced `mermaid` block.
- [x] Mermaid logic starts with `stateDiagram-v2` and includes `direction LR`.
- [x] Every Mermaid `EVENT_*` token has a YAML action source in the View Blueprint.
- [x] `component-map.json` includes `ds:screen:webui-pm-workspace-001` for the integrated shell screen.
- [x] Component-map `ds_id` values are stable and unique where traceability requires uniqueness.
- [x] Canonical screen-root DS IDs are preserved; duplicated layout rows use stable suffixes and keep `canonical_ds_id` or semantic fields.
- [x] No standalone Mermaid `.mmd` file is generated.

## Preview Artifact Readiness

- [x] Source contract: `ui-contract.md`.
- [x] Flow evidence: `flow.md`.
- [x] Storyboard evidence: `storyboards.json` and `storyboards-review.html`.
- [x] Component evidence: `component-map.json` and component context slices.
- [x] Layout evidence: `layout-rules.json` and layout context slices.
- [x] Conflict evidence: `prd-ds-conflicts.md`.
- [x] Assertion evidence: `assertion-checklist.md`.
