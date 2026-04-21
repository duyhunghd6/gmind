# Contract Package — prd-04-webui-and-pm-workspace

Artifacts in this directory define the Stage 1 contract for PRD-04 Web UI & PM Workspace.

Files:
- `contract.yaml` — route, screen, state, selector, and navigation contract
- `storyboards.json` — interaction trajectories for happy paths and failure paths
- `layout-rules.json` — responsive placement and layout constraints

Associated test plan:
- `/Users/steve/duyhunghd6/gmind/docs/design/test-plans/prd-04-webui-and-pm-workspace.assertion-checklist.md`

Scope check:
- Route-backed screens covered: 8
- Shared shell contract included: yes
- Core states per route screen: default, loading, error, empty
- Authoritative breakpoint table: desktop >=1024px, tablet 768-1023px, mobile <768px
- Canonical viewport widths for artifact review: desktop 1440px, tablet 1024px, mobile 390px
- Desktop-wide sub-band: >=1280px for shell expansion and trace layouts that explicitly need the wider treatment.
