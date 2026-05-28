<!-- beads-id: br-design-conflicts-webui-pm-workspace -->
# PRD/DS Conflicts: WebUI PM Workspace

| ID | Source | Conflict | Proposed owner | Stage 1 resolution |
| --- | --- | --- | --- | --- |
| ds-conflict-001 | PRD §6.4 vs showcase route map | PRD implementation architecture names Vanilla JS, D3, Chart.js, and custom CSS, while the Ralph Loop showcase target is the Next.js design-system implementation. | PMO + Stage 2 implementer | Treat PRD §6.4 as Core WebUI distribution guidance for `gmind serve`; Stage 2 showcase remains Next.js and must preserve API-only browser boundary. |
| ds-conflict-002 | PRD §8 route map vs acceptance AC15 | AC15 lists `/design-system/webui-pm-workspace` without `/design-system/storyboard/:id`, while §8 includes dynamic storyboard detail. | PRD owner | Contract includes both overview and detail because §8.1 and AC18 require dynamic storyboard E2E alignment metadata. |

No unresolved component identity gaps remain for the requested showcase routes. Portfolio and PI Planning retain their PRD-provided Beads-style identities (`br-ds-*`) while exposing stable screen `ds_id` values for test selectors.
