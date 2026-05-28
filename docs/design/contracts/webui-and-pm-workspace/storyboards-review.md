<!-- beads-id: br-design-storyboards-review-webui-pm-workspace -->
# Storyboards Review: WebUI PM Workspace

Generated trajectories: 13

| Trajectory ID | Routes | Recovery |
| --- | --- | --- |
| `core-navigate-task` | / → /tasks → /tasks/:id | no |
| `core-explore-trace` | /tasks/:id → /trace/:id → /docs | no |
| `core-quick-search` | / → /search → /tasks/:id | no |
| `board-drag-success` | /board → /tasks/:id | no |
| `pi-planning-vote` | /design-system/pi-planning | no |
| `approval-approve` | /approval → /design-system/approval | no |
| `approval-insufficient-evidence` | /approval | yes |
| `offline-rehydrate-conflict` | /tasks/:id → /design-system/webui-pm-workspace | yes |
| `doc-to-trace` | /docs → /trace/:id | no |
| `showcase-hash-navigation` | /design-system/git-graph → /design-system/kanban → /design-system/knowledge-graph | no |
| `storyboard-detail-alignment` | /design-system/storyboard → /design-system/storyboard/:id | no |
| `permission-denied-recovery` | /design-system/webui-pm-workspace | yes |
| `not-found-recovery` | /design-system/storyboard/:id → /design-system/storyboard | yes |

## Gate A Review Links

- `core-navigate-task`: `context-slices/storyboards/core-navigate-task.yaml`
- `core-explore-trace`: `context-slices/storyboards/core-explore-trace.yaml`
- `core-quick-search`: `context-slices/storyboards/core-quick-search.yaml`
- `board-drag-success`: `context-slices/storyboards/board-drag-success.yaml`
- `pi-planning-vote`: `context-slices/storyboards/pi-planning-vote.yaml`
- `approval-approve`: `context-slices/storyboards/approval-approve.yaml`
- `approval-insufficient-evidence`: `context-slices/storyboards/approval-insufficient-evidence.yaml`
- `offline-rehydrate-conflict`: `context-slices/storyboards/offline-rehydrate-conflict.yaml`
- `doc-to-trace`: `context-slices/storyboards/doc-to-trace.yaml`
- `showcase-hash-navigation`: `context-slices/storyboards/showcase-hash-navigation.yaml`
- `storyboard-detail-alignment`: `context-slices/storyboards/storyboard-detail-alignment.yaml`
- `permission-denied-recovery`: `context-slices/storyboards/permission-denied-recovery.yaml`
- `not-found-recovery`: `context-slices/storyboards/not-found-recovery.yaml`

## Gate A Schema Adapter

Every trajectory in `storyboards.json` now exposes required Gate A fields directly: `id`, `prd_journey`, `action`, `assertion`, ordered `steps`, `state`, and `ds_targets`. Legacy aliases are preserved with mapping `trajectory_id→id`, `source→prd_journey`, `events/event→action`, `expected_outcome→assertion`, and `screen_ds_id→ds_targets`.
