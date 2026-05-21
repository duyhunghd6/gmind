# Stage 1 QA Results: webui-and-pm-workspace

<!-- beads-id: br-qa-stage1-webui-pm-workspace-results | satisfies: br-prd04-s14 -->

Generated: 2026-05-21

Contract directory: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
Pipeline state: `/Users/steve/duyhunghd6/gmind/docs/design/pipeline-state/webui-and-pm-workspace`

Overall: QA_FAIL (6/7 passed)

## T1_contract_container: PASS

Evidence: ui-contract exists=True; YAML blocks=1; Mermaid blocks=1; preview parser return=0; stdout={
  "status": "OK",
  "out": "/tmp/webui-and-pm-workspace-preview-qa-final",
  "warnings": 119
}

## T2_yaml_schema: PASS

Evidence: metadata/viewports/screens present=True; screens=8; schema issues=0; ds components missing type=0

## T3_component_traceability: PASS

Evidence: YAML ds_ids=79 unique=79; component-map components=79; missing=0; duplicate yaml=0; duplicate map=0; invalid screens=0; missing types=0

## T4_mermaid_logic: PASS

Evidence: flow.mmd matches fenced Mermaid=True; component-map events covered=65/65; Mermaid action events mapped back=67/67 including guarded `_DENIED` derivatives for `approval.approve_request` and `approval.manual_override`; journey keywords={'error': True, 'retry': True, 'back': True, 'success': True, 'offline': True, 'approve': True, 'reject': True, 'permission_denied': True}

## T5_storyboards: FAIL

Evidence: trajectories=32; PRD requirements covered=11; recovery trajectories=8; replay shape issues=276

Fix instructions:
- dashboard_coverage_drill step 1 missing action
- dashboard_coverage_drill step 1 missing assertion
- dashboard_coverage_drill step 2 missing action
- dashboard_coverage_drill step 2 missing assertion
- dashboard_coverage_drill step 3 missing action
- dashboard_coverage_drill step 3 missing assertion
- dashboard_coverage_drill step 4 missing action
- dashboard_coverage_drill step 4 missing assertion
- dashboard_coverage_drill step 5 missing action
- dashboard_coverage_drill step 5 missing assertion
- dashboard_coverage_drill step 6 missing action
- dashboard_coverage_drill step 6 missing assertion
- dashboard_coverage_drill step 7 missing action
- dashboard_coverage_drill step 7 missing assertion
- dashboard_gap_resolution step 1 missing action
- dashboard_gap_resolution step 1 missing assertion
- dashboard_gap_resolution step 2 missing action
- dashboard_gap_resolution step 2 missing assertion
- dashboard_gap_resolution step 3 missing action
- dashboard_gap_resolution step 3 missing assertion
- dashboard_gap_resolution step 4 missing action
- dashboard_gap_resolution step 4 missing assertion
- dashboard_graph_impact step 1 missing action
- dashboard_graph_impact step 1 missing assertion
- dashboard_graph_impact step 2 missing action

## T6_layout_review_diagrams: PASS

Evidence: YAML viewports=['desktop', 'mobile', 'tablet']; layout viewports=['desktop', 'mobile', 'tablet']; review diagram required sections={'screen inventory': True, 'component hierarchy': True, 'state coverage': True, 'action': True, 'event': True}

## T7_conflicts_preview: PASS

Evidence: conflicts resolved=True; preview/index.html exists=True; manifest screens=8; warnings=119; known preview warning shape=True

## Non-blocking Warnings

- Preview manifest contains 119 warnings and empty `components`, `ds_ids`, and `actions` arrays. This matches the known BA/evaluator P1 warning and is treated as non-blocking because the converter exits OK and `preview/index.html` exists.
