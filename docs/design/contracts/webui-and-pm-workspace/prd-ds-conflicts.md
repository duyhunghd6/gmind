# PRD and Design-System Conflicts: webui-and-pm-workspace
<!-- beads-id: br-ds-webui-pm-conflicts -->

## conflict-loading-spinner-copy
- Severity: low
- PRD reference: PRD-04 sections 9.3 and 11.4 mention spinner in loading/saving copy
- Proposed resolution: Use layout-matched skeletons for full-screen loading; allow inline saving marker only for field-level save.
- Resolution owner: gen_contracts/design-system

## conflict-legacy-route-alias
- Severity: medium
- PRD reference: PRD route map keeps legacy /design-system/webui-pm-workspace as redirect only
- Proposed resolution: Advertise /webui-pm-workspace only; never create nested PM workspace route artifacts.
- Resolution owner: build_layout
