# PRD/Design-System Conflict Report: WebUI and PM Workspace

<!-- beads-id: br-design-conflicts-webui-pm-workspace | satisfies: br-prd04-s14a -->

Generated from `ui-contract.md`, `flow.md`, and `PRD-04-WebUI-and-PM-Workspace.md` during Stage 1 flow/map regeneration.

## Unresolved conflicts

None.

## Resolved decisions

| ID | Source | Resolution | Owner/status |
| --- | --- | --- | --- |
| C1 | `br-prd04-s5`, `br-prd04-s6`, `br-prd04-s10`, contract `system_boundaries` | Browser UI receives graph, search, enrichment, task, approval, and document data through Go REST APIs only; browser code must not directly call local git, GitHub `gh`, FastCode, CLI, FrankenSQLite, or Zvec. | PMO + backend/API owner decision reflected in PRD and contract. |
| C2 | `br-prd04-s5`, `br-prd04-s10`, contract `loading_rule` | Graph and loading states use layout-matched skeletons plus progress messaging; standalone centered spinner-only UI is not allowed. | Design-system decision reflected in PRD and contract. |

## Contract readiness notes

- Approval insufficient-evidence behavior is modeled with disabled Approve, reason tooltip, refresh evidence CTA, and authorized Reject path.
- RTE escalation badge states are modeled as visible critical, discussing, and resolved variants that open the RTE drawer/thread.
