# Workflow 2: Create & Build (`design:create`)

<!-- beads-id: br-design-create-w2 -->

**Goal:** Build UI implementation from the schema-driven Stage 1 contract package using DS tokens/classes, establish baseline snapshots, and update showcase artifacts when needed.

## Steps

### 2.1 Optional 3D Scene Build/Update

If 3D is required, code the scene, capture screenshots, and extract a style brief before aligning 2D UI.

### 2.2 Token Architecture

Use the project DS manifest, registry, and token CSS as the styling source. Do not invent tokens when a DS token already exists.

### 2.3 UI Implementation

For each feature, read these before coding:

- `docs/design/contracts/{feature}/ui-contract.md`
- `docs/design/contracts/{feature}/flow.md`
- `docs/design/contracts/{feature}/review-diagrams.md`
- `docs/design/contracts/{feature}/preview/preview-manifest.json`

Use `component-map.json`, `storyboards.json`, and `layout-rules.json` only through targeted extraction for the current screen/state/viewport/`ds_id`, or through mechanical parity checks. Restate extracted rows as compact YAML/TOON notes before coding.

Build the target page or prototype defined by the orchestrator.

Rules:

- Match YAML screens, routes, layout tree, labels, bindings, and actions.
- Add `data-ds-id="ds:<type>:<name-NNN>"` for every YAML component, verified against targeted component-map slices.
- Wire Mermaid events to handlers, links, forms, or deterministic state transitions.
- Cover all states declared in YAML/Mermaid/storyboards.
- Use DS tokens/classes only; avoid hardcoded hex/rgb/hsl colors.
- Keep implementation files under the project line limit; split when necessary.
- Do not use legacy ASCII wireframes or ASCII user flows as source artifacts.

### 2.4 Ralph Loop Feedback

If iteration ≥ 2 and a `RALPH_LOOP_CONTINUE` scorecard exists:

1. Read prioritized fixes in order: P0, then P1, then P2.
2. Fix only the routed issues.
3. Do not restyle or refactor passing areas.
4. Preserve previously passing assertions.

### 2.5 Element Baseline Versioning

For visual changes requiring human review:

- Extract `before.html` and `after.html` snippets.
- Generate `diff.html` and `meta.json`.
- Update `versions.json` for the screen or component.

### 2.6 Showcase Build

Create or update the Design System showcase when the task explicitly includes hub/showcase work.
Sections may include Token Library, Component Gallery, Composite Layouts, Storyboard, Screen Inventory, Flow Map, State Matrix, Change Log, and Decision History.
