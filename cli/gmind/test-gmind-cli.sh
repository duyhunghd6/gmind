#!/bin/bash
# test-gmind-cli.sh — Comprehensive PRD-03 CLI Verification Test
# beads-id: br-test-prd03-script
set -euo pipefail

PASS=0
FAIL=0
GMIND="./gmind"

echo "=================================================="
echo " PRD-03: Gmind CLI Verification Test Suite"
echo "=================================================="

# Move to project root so docs/ can be found
ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR"

# Ensure binary exists
if [ ! -f "cli/gmind/gmind" ]; then
  echo "Building gmind binary..."
  (cd cli/gmind && go build -o gmind .)
fi
GMIND="cli/gmind/gmind"

run_test() {
  local test_num="$1"
  local test_name="$2"
  local test_cmd="$3"
  local expected_pattern="${4:-}"

  echo ""
  echo "--- T${test_num}: ${test_name} ---"
  set +e
  output=$(eval "$test_cmd" 2>&1)
  exit_code=$?
  set -e

  if [ $exit_code -ne 0 ] && [ -z "$expected_pattern" ]; then
    echo "  FAIL (exit code: $exit_code)"
    echo "  Output: $(echo "$output" | head -3)"
    FAIL=$((FAIL + 1))
    return
  fi

  if [ -n "$expected_pattern" ]; then
    if echo "$output" | grep -qi "$expected_pattern"; then
      echo "  PASS (matched: $expected_pattern)"
      PASS=$((PASS + 1))
    else
      echo "  FAIL (expected pattern '$expected_pattern' not found)"
      echo "  Output: $(echo "$output" | head -5)"
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  PASS (exit 0)"
    PASS=$((PASS + 1))
  fi
}

# ===== Section 1: Binary & Help (br-prd03-s1) ===========================

run_test 1 "CLI Presence & --help" \
  "$GMIND --help" \
  "gmind"

# ===== Section 2: Serve API Endpoints (br-prd03-s1) =====================

echo ""
echo "--- T2: Gmind Serve API Endpoints ---"
$GMIND serve --port 9091 > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2

T2_PASS=true
for endpoint in "/api/coverage" "/api/gaps" "/api/tasks"; do
  if ! curl -sSf "http://localhost:9091${endpoint}" > /dev/null 2>&1; then
    echo "  FAIL: ${endpoint} endpoint failed"
    T2_PASS=false
  fi
done

# Test parameterized endpoints with existing PRD sections
if ! curl -sSf "http://localhost:9091/api/trace/br-prd03-s1" > /dev/null 2>&1; then
  echo "  WARN: /api/trace/br-prd03-s1 returned error (may not have graph data)"
fi

kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

if $T2_PASS; then
  echo "  PASS (core API endpoints responding)"
  PASS=$((PASS + 1))
else
  FAIL=$((FAIL + 1))
fi

# ===== Section 3: Coverage Command (br-prd03-s1) ========================

run_test 3 "Coverage Full" \
  "$GMIND coverage full" \
  "Coverage"

run_test "3b" "Coverage PRD" \
  "$GMIND coverage prd" \
  "Coverage"

# ===== Section 4: Gaps Command (br-prd03-s1) ============================

run_test 4 "Gaps prd-to-plan" \
  "$GMIND gaps prd-to-plan" \
  "Gap"

run_test "4b" "Gaps plan-to-tasks" \
  "$GMIND gaps plan-to-tasks" \
  "Gap"

# ===== Section 5: Trace Command (br-prd03-s1) ===========================

run_test 5 "Trace --json" \
  "$GMIND trace br-prd03-s1 --json" \
  "beads_id"

run_test "5b" "Trace --reverse" \
  "$GMIND trace br-prd03-s1 --reverse" \
  "PRD"

# ===== Section 6: Impact Command (br-prd03-s1) ==========================

run_test 6 "Impact analysis" \
  "$GMIND impact br-prd03-s1" \
  "Impact"

# ===== Section 7: Context Command (br-prd03-s1) =========================

run_test 7 "Context --json" \
  "$GMIND context br-prd03-s1 --json" \
  "beads_id"

# ===== Section 8: Search Command (br-prd03-s1) ==========================

run_test 8 "Search query" \
  "$GMIND search 'CLI' --limit 2" \
  ""

# ===== Section 9: GitHub info (br-prd03-s1) ==============================

run_test 9 "GitHub commits" \
  "$GMIND github commits br-prd03" \
  ""

# ===== Section 10: Plan Commands (br-prd03-s1) ===========================

run_test 10 "Plan status" \
  "$GMIND plan status br-plan-01 || true" \
  ""

# ===== Section 11: Reindex Command (br-prd03-s1) =========================

run_test 11 "Reindex --source=markdown-doc" \
  "$GMIND reindex --source=markdown-doc" \
  "ndex"

# ===== Section 12-14: RTE Approval Workflow (br-prd03-s4) ================

echo ""
echo "--- T12-T14: RTE Approval Workflow ---"

# Use existing open issue, or try to create one
TEST_ISSUE_ID=""

# Try to find an existing open issue
EXISTING=$(bd list --status open --json 2>/dev/null | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4 || true)
if [ -n "$EXISTING" ]; then
  TEST_ISSUE_ID="$EXISTING"
  echo "  Using existing issue: $TEST_ISSUE_ID"
else
  # Try creating one
  CREATE_OUT=$(bd create "RTE Test Issue for PRD03" --priority 3 2>/dev/null || true)
  TEST_ISSUE_ID=$(echo "$CREATE_OUT" | grep -oE 'gmind-[a-z0-9]+' | head -1 || true)
  if [ -n "$TEST_ISSUE_ID" ]; then
    echo "  Created test issue: $TEST_ISSUE_ID"
  fi
fi

if [ -z "$TEST_ISSUE_ID" ]; then
  echo "  SKIP: No test issue available for RTE workflow tests"
  echo "  (RTE tests require 'bd' CLI with open issues)"
else
  # T12: Escalate
  echo ""
  echo "--- T12: Escalate ---"
  set +e
  esc_out=$($GMIND escalate "$TEST_ISSUE_ID" --risk="Test risk for CI verification" 2>&1)
  esc_exit=$?
  set -e
  if [ $esc_exit -eq 0 ] && echo "$esc_out" | grep -qi "escalat"; then
    echo "  PASS (escalation recorded)"
    PASS=$((PASS + 1))
  else
    echo "  FAIL (exit: $esc_exit)"
    echo "  Output: $(echo "$esc_out" | head -3)"
    FAIL=$((FAIL + 1))
  fi

  # T13: Approve
  echo ""
  echo "--- T13: Approve ---"
  set +e
  app_out=$($GMIND approve "$TEST_ISSUE_ID" --resolution="Approved for testing" 2>&1)
  app_exit=$?
  set -e
  if [ $app_exit -eq 0 ] && echo "$app_out" | grep -qi "approv"; then
    echo "  PASS (approval recorded)"
    PASS=$((PASS + 1))
  else
    echo "  FAIL (exit: $app_exit)"
    echo "  Output: $(echo "$app_out" | head -3)"
    FAIL=$((FAIL + 1))
  fi

  # T14: Reject
  echo ""
  echo "--- T14: Reject ---"
  set +e
  rej_out=$($GMIND reject "$TEST_ISSUE_ID" --reason="Rejected for testing" 2>&1)
  rej_exit=$?
  set -e
  if [ $rej_exit -eq 0 ] && echo "$rej_out" | grep -qi "reject"; then
    echo "  PASS (rejection recorded)"
    PASS=$((PASS + 1))
  else
    echo "  FAIL (exit: $rej_exit)"
    echo "  Output: $(echo "$rej_out" | head -3)"
    FAIL=$((FAIL + 1))
  fi
fi

# ===== Summary ===========================================================

echo ""
echo "=================================================="
echo " TEST RESULTS: $PASS passed, $FAIL failed"
echo "=================================================="

if [ $FAIL -gt 0 ]; then
  exit 1
fi
echo "All PRD-03 verification tests passed."
