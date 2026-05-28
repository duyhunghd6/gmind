# Stage 1 QA Results: WebUI PM Workspace

<!-- beads-id: br-agent-ralph-stage1-qa -->

Convergence status: QA_FAIL
Gate A readiness: NOT READY
Passed: 4/8

## Suite Results
- **T1_contract_container**: PASS — 1 YAML block, 1 Mermaid block, block-style YAML, preview parser proxy OK
- **T2_yaml_schema**: PASS — 18 screens have required route/states/layout fields; 77 nested DS components checked
- **T3_component_traceability**: PASS — 95 YAML ds_id values mapped in component-map with no duplicates
- **T4_mermaid_logic**: FAIL — Mermaid validator passes; 1 flow.md block; no standalone .mmd; PRD-required retry path absent
  - Fix: Add retry transition/path to ui-contract Mermaid Logic Machine and flow.md
- **T5_storyboards**: FAIL — 16 trajectories parse; requested route families and document-graph-widget coverage present; all 35 steps lack explicit action/event field
  - Fix: Add explicit action or event field to each storyboard step, or document a schema-level mapping from trajectory events to steps
- **T6_layout_review_diagrams**: PASS — 3 viewports covered; 26 review-diagrams Mermaid blocks; split_mermaid_subgraphs files_changed=0; validator passes
- **T7_conflicts_preview**: FAIL — Conflicts artifact exists and warnings are zero, but preview manifest has no explicit OK/status field
  - Fix: Add explicit status/ok field to preview/preview-manifest.json reporting OK
- **T8_artifact_budget_slices**: FAIL — artifact-index parses; slices exist; storyboards/layout/component-map are machine-evidence; preview manifest is role preview-output, not machine-evidence
  - Fix: Mark preview/preview-manifest.json as machine-evidence or document an equivalent machine-evidence role accepted by Gate A

## Fix Queue
- P0 T4 -> gen_flows: Add retry transition/path to ui-contract Mermaid Logic Machine and flow.md
- P0 T5 -> gen_storyboards: Add explicit action/event field to each storyboard step or define accepted step-to-event mapping
- P0 T7 -> gen_preview: preview-manifest.json lacks explicit OK/status field
- P0 T8 -> gen_summary: preview/preview-manifest.json is not marked machine-evidence in artifact-index
