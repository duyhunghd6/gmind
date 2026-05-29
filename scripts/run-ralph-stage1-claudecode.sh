#!/usr/bin/env bash
set -euo pipefail

RUNS="${1:-5}"
MODEL="${CLAUDE_MODEL:-}"

if ! [[ "$RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Usage: $0 [positive-run-count]" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PROMPT=$(cat <<'EOF'
/project:ralph-loop stage1 for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md , and note that the Stage 1 output for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md must be written to ./docs/design/contracts/webui-and-pm-workspace
EOF
)

for run in $(seq 1 "$RUNS"); do
  echo "==> Ralph Loop Stage 1 Claude Code run ${run}/${RUNS}"
  if [[ -n "$MODEL" ]]; then
    claude --dangerously-skip-permissions --model "$MODEL" --verbose -p "$PROMPT"
  else
    claude --dangerously-skip-permissions --verbose -p "$PROMPT"
  fi
  echo "==> Completed run ${run}/${RUNS}"
done
