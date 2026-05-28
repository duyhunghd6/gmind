#!/usr/bin/env bash
set -euo pipefail

RUNS="${1:-5}"
MODEL="${CLAUDE_MODEL:-}"
RETRIES="${CLAUDE_RETRIES:-3}"
CLAUDE_VERBOSE="${CLAUDE_VERBOSE:-1}"

if ! [[ "$RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Usage: $0 [positive-run-count]" >&2
  exit 1
fi

if ! [[ "$RETRIES" =~ ^[1-9][0-9]*$ ]]; then
  echo "CLAUDE_RETRIES must be a positive integer" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%dT%H:%M:%S%z')" "$*" >&2
}

PROMPT=$(cat <<'EOF'
/project:ralph-loop stage2 for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md , and note that the Stage 2 output for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md must be written to ./docs/design/contracts/webui-and-pm-workspace . You can edit these subagents for Gemini extension (and Claude Code subagents / workflow) also. This is the hi-fi UI version: an interactable UI with separated screens and separated URLs. These stage2 result must coverages all these routes::: |
   URL | Icon / DS ID | UI/UX bắt buộc | Data flow tương ứng trong Core WebUI |
   | --- | --- | --- | --- |
   | `/design-system/terminal` | 💻 `ds:screen:terminal-001` | Terminal scenario tabs: Agent Console, Deploy, Debug, CI/CD; terminal line types command/output/success/error; 2x2 Mosaic Layout cho Claude-01 Storage, Claude-02 CLI, Claude-03 CI, QA-Reviewer; states loading/empty/error/offline/forbidden. | Showcase dùng static terminal lines; Core dùng `GET /api/agents/sessions`, `GET /api/ci/runs`, `GET /api/tasks/:id/activity`, stream log events qua API, không gọi shell trực tiếp từ browser. |
   | `/design-system/portfolio` | 📈 `br-ds-portfolio-view` | Executive Portfolio table gồm Epic ID, owner, progress bar, budget, status badge, forecast; Roadmap Kế hoạch chia Q1/Q2/Q3 2026; states loading/empty/error/offline/forbidden. | Showcase dùng static `portfolios`; Core dùng `GET /api/portfolio/epics`, `GET /api/tasks?issue_type=epic`, budget/roadmap từ first-class PM columns và labels. |
   | `/design-system/pi-planning` | 🎯 `br-ds-pi-planning` | PI Planning Sandbox 2 cột: Strategic Sandbox drag/drop capacity bằng `@hello-pangea/dnd`, Business Value Scoring, Confidence Vote 1-5, ROAM Board rủi ro Resolved/Owned/Accepted/Mitigated/Unassigned. | Showcase dùng local React state; Core dùng `GET /api/pi/features`, `PUT /api/pi/plan`, `GET /api/risks?view=roam`, `POST /api/pi/confidence-vote`. |
   | `/design-system/git-graph` | 🌿 `ds:screen:git-graph-001` | Hash-selected scenarios: gitflow, multi-agent, hotfix, release-train, monorepo, beads-prd-trace, beads-deadlock, beads-ds-comp, beads-traversal, beads-sprint-review; render branches/commits/connections, branch tags, stats. | Showcase dùng `gitScenarios`; Core dùng Go API aggregation from local git + Beads trailers: `GET /api/git/graph?scenario=<id>` and `GET /api/trace/:id?include=git`. |
   | `/design-system/kanban` | 📋 `ds:screen:kanban-001` | Board selector hash routes sprint/release/bug-triage; drag/drop cards with WIP limit badges; stats total/done/progress; states loading/empty/error/offline/forbidden. | Showcase dùng `kanbanBoards`; Core dùng `GET /api/tasks?view=board&board=<id>`, `PUT /api/tasks/:id/status`, WIP từ policy config/labels. |
   | `/design-system/knowledge-graph` | 🧠 `ds:screen:knowledge-graph-001` | Sigma.js/Graphology viewer loaded client-only; presets simple/ecosystem/sprint via hash; selected-node banner, node/edge legends, stats; states loading/empty/error/offline/forbidden. | Showcase dùng graph presets; Core dùng Graph Assembler `GET /api/trace/:id?depth=full` and `GET /api/graph/presets`, enriched from FrankenSQLite, Zvec, git, GitHub, FastCode. |
   | `/design-system/approval` | ✅ `ds:screen:approval-001` | Approval Panels with pending/approved/rejected toggles; escalated badge; evidence blocks Tests, Diff, Beads ID, PRD, CI; RTM matrix; Coverage Heatmap; hash anchors panels/rtm/heatmap. | Showcase dùng `approvalPanels`, `rtmRows`, heatmap data; Core dùng `GET /api/tasks?status=pending-approval`, `GET /api/coverage`, `GET /api/approval/:id/evidence`, `POST /api/approval/:id/decision`. |
   | `/design-system/timeline` | 📅 `ds:screen:timeline-001` | File Lease indicators unlocked/locked/expiring/expired, Activity Feed, Sprint Day timeline; hash anchors file-lease/activity-feed/sprint-day; states loading/empty/error/offline/forbidden. | Showcase dùng static activity arrays; Core dùng `GET /api/activity`, `GET /api/file-leases`, `GET /api/tasks/:id/activity`, polling events table every 3-5s. |
   | `/design-system/components` | 🧩 `ds:screen:components-001` | Components Catalog đủ 18 sections: Buttons, Badges/Status, Progress, Avatar Stack, Modal, Dropdown, Accordion, Tab Panel, Data Table, Tooltip, Code Block, Cards, Prompt Card, Section Labels, Status Dots, Skeleton, Empty State, Error Banner; hash scroll and interactive examples. | Showcase dùng `componentSections`; Core treats these as shared primitives/tokens. Every production screen must compose these states/components instead of one-off styling. |
   | `/design-system/doc-viewer` | 📄 `ds:screen:doc-viewer-001` | GitHub-like file tree, expandable folders, selected document panel, Beads ID badges, section status covered/partial/gap, links to Explorer and Knowledge Graph; states loading/empty/error/offline/forbidden. | Showcase uses `docTree`/`docContents`; Core uses `GET /api/docs?group=source_type`, `GET /api/docs/:id`, Beads regex auto-link to `/trace/:id`. |
   | `/design-system/explorer` | 🔍 `ds:screen:explorer-001` | Unified search with query input, type filters all/doc/commit/task/adr/chat/spike, result list, detail sidebar, cross-links to Knowledge Graph, Beads Traversal, Doc Viewer; hash selects filter. | Showcase uses `explorerItems`; Core uses `GET /api/search?q=<query>&type=<type>` backed by Zvec, FrankenSQLite, FastCode. |
   | `/design-system/beads-traversal` | 🔗 `ds:screen:beads-traversal-001` | Layered DAG PRD Sections → Plan Elements → Tasks → Commits; forward/reverse direction toggle; selected/linked node highlighting; detail sidebar with parent/children links; legends and stats; hash scroll by layer. | Showcase uses `beadsNodes`/`beadsEdges`; Core uses `GET /api/trace/:id?depth=full` and graph edge types `satisfies`, `implements`, `committed-for`. |
   | `/design-system/storyboard` | 🗺️ `ds:screen:storyboard-001` | Journey filter, horizontal use-case flow nodes, Guidance Panel with Mechanism & Action, Considerations, Investigating, CTA to real screen; dynamic route `/design-system/storyboard/:id` shows role, journey, step timeline, related usecases. | Showcase uses `usecases`; Core uses PRD-derived storyboards from Ralph Loop artifacts and E2E alignment metadata (`GET /api/storyboards`, `GET /api/storyboards/:id`). |
   | `/design-system/webui-pm-workspace` | 🧭 `ds:global_shell` | Integrated PM Workspace shell: header logo/search/offline indicator, sidebar nav, active surfaces RTM Dashboard, SAFe Board, Task List, Task Detail, Trace Explorer, Doc Viewer, Approval Gates, Search Results; each surface carries stable `data-screen-id` and `data-ds-id`. | Showcase is the Ralph Loop Hi-Fi composite; Core maps the same surfaces to `/`, `/board`, `/tasks`, `/tasks/:id`, `/trace/:id`, `/docs`, `/approval`, `/search` through `gmind serve`. |
EOF
)

PROMPT_LINES="$(printf '%s\n' "$PROMPT" | wc -l | tr -d ' ')"
PROMPT_BYTES="$(printf '%s' "$PROMPT" | wc -c | tr -d ' ')"

run_claude_once() {
  local -a claude_args=(--dangerously-skip-permissions -p)

  if [[ "$CLAUDE_VERBOSE" != "0" ]]; then
    claude_args=(--dangerously-skip-permissions --verbose -p)
  fi

  if [[ -n "$MODEL" ]]; then
    claude_args=(--dangerously-skip-permissions --model "$MODEL" "${claude_args[@]:1}")
  fi

  printf '%s\n' "$PROMPT" | claude "${claude_args[@]}"
}

run_claude_with_retry() {
  local attempt=1
  local delay=2
  local status=0
  local output_file=""

  while true; do
    log "Claude Code attempt ${attempt}/${RETRIES}: processing Stage 2 with model=${MODEL:-default}, verbose=${CLAUDE_VERBOSE}, prompt_lines=${PROMPT_LINES}, prompt_bytes=${PROMPT_BYTES}"
    output_file="$(mktemp)"
    set +e
    run_claude_once 2>&1 | tee "$output_file"
    status=${PIPESTATUS[0]}
    set -e

    if [[ "$status" -eq 0 ]]; then
      log "Claude Code attempt ${attempt}/${RETRIES}: completed successfully"
      rm -f "$output_file"
      return 0
    fi

    log "Claude Code attempt ${attempt}/${RETRIES}: exited with status ${status}"

    if ! grep -q "socket connection was closed unexpectedly" "$output_file" || [[ "$attempt" -ge "$RETRIES" ]]; then
      rm -f "$output_file"
      return "$status"
    fi

    rm -f "$output_file"
    echo "==> Claude API socket closed; retrying in ${delay}s (${attempt}/${RETRIES})" >&2
    sleep "$delay"
    attempt=$((attempt + 1))
    delay=$((delay * 2))
  done
}

log "Ralph Loop Stage 2 Claude Code runner started"
log "Working directory: ${ROOT_DIR}"
log "Processing PRD: docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md"
log "Contract output: docs/design/contracts/webui-and-pm-workspace"
log "Page target: apps/website/src/app/design-system/webui-pm-workspace/page.tsx"
log "Routes in scope: terminal, portfolio, pi-planning, git-graph, kanban, knowledge-graph, approval, timeline, components, doc-viewer, explorer, beads-traversal, storyboard, webui-pm-workspace"

for run in $(seq 1 "$RUNS"); do
  log "Ralph Loop Stage 2 Claude Code run ${run}/${RUNS}: started"
  run_claude_with_retry
  log "Ralph Loop Stage 2 Claude Code run ${run}/${RUNS}: completed"
done
