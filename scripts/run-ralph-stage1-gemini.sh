#!/usr/bin/env bash
set -euo pipefail

RUNS="${1:-10}"
MODEL="gemini-3.1-pro-preview"

if ! [[ "$RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Usage: $0 [positive-run-count]" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PROMPT=$(cat <<'EOF'
/project:ralph-loop stage1 for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md , and note that the Stage 1 output for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md must be written to ./docs/design/contracts/webui-and-pm-workspace . You can edit these subagents for Gemini extension also.
EOF
)

for run in $(seq 1 "$RUNS"); do
  echo "==> Ralph Loop Stage 1 Gemini run ${run}/${RUNS}"
  gemini --yolo --model "$MODEL" -p "$PROMPT"
  echo "==> Completed run ${run}/${RUNS}"
done
