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
/project:ralph-loop stage2 for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md , and note that the Stage 2 output for @docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md must be written to ./docs/design/contracts/webui-and-pm-workspace.
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
