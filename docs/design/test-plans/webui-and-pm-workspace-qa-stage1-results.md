# Stage 1 QA Results: webui-and-pm-workspace
<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-results -->

Evaluator score: 98
Convergence status: QA_PASS
Passed: 7/7

## T1_contract_container
Status: PASS
Evidence: ui-contract exists=True; YAML blocks=1; Mermaid blocks=1; preview parser OK ({   "status": "OK",   "out": "/tmp/webui-stage1-qa-preview",   "warnings": 4 })

## T2_yaml_schema
Status: PASS
Evidence: 9 screens checked; 3 viewports; required fields present

## T3_component_traceability
Status: PASS
Evidence: 67 YAML ds_id values; 67 component-map entries; duplicates=0; missing=0

## T4_mermaid_logic
Status: PASS
Evidence: flow blocks=1; YAML transition actions covered=135/135; Mermaid events=135; validator=PASS parser=mmdc; standalone_mmd=0

## T5_storyboards
Status: PASS
Evidence: 22 trajectories validated; PRD journey refs=11; error/recovery present=True

## T6_layout_review_diagrams
Status: PASS
Evidence: layout viewports=['desktop', 'mobile', 'tablet']; YAML viewports=['desktop', 'mobile', 'tablet']; review Mermaid blocks=5; validator=PASS; standalone_mmd=0

## T7_conflicts_preview
Status: PASS
Evidence: conflicts report exists=True; preview artifacts exist=True; manifest warnings=4 documented: owner=gen_flows: YAML action not found in Mermaid events: EVENT_HEALTH_OFFLINE; owner=gen_flows: YAML action not found in Mermaid events: EVENT_HEALTH_OK; owner=gen_flows: Mermaid event not found in YAML actions: EVENT_HEALTH_OFFLINE / show offline banner; owner=gen_flows: Mermaid event not found in YAML actions: EVENT_HEALTH_OK / route=/

## Manifest warnings documented with owners
<!-- beads-id: br-qa-stage1-webui-and-pm-workspace-results-warnings -->
- Owner `gen_flows`: YAML action not found in Mermaid events: EVENT_HEALTH_OFFLINE
- Owner `gen_flows`: YAML action not found in Mermaid events: EVENT_HEALTH_OK
- Owner `gen_flows`: Mermaid event not found in YAML actions: EVENT_HEALTH_OFFLINE / show offline banner
- Owner `gen_flows`: Mermaid event not found in YAML actions: EVENT_HEALTH_OK / route=/
