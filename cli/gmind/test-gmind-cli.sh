#!/bin/bash
# test-gmind-cli.sh
set -e

# beads-id: br-test-prd03-script

echo "Starting PRD-03 Verification Test..."

# Move to root so docs/ can be found
ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR"

# Test 1: Binary Existence & Basic Command
echo "1. Testing CLI Presence..."
./cli/gmind/gmind --help > /dev/null

# Test 2: Gmind Serve API 
echo "2. Testing gmind serve API endpoints..."
./cli/gmind/gmind serve --port 9090 > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2 # wait for start

if ! curl -sSf http://localhost:9090/api/coverage > /dev/null; then
    echo "FAIL: /api/coverage endpoint failed"
    kill $SERVER_PID
    exit 1
fi
kill $SERVER_PID

# Test 3: Coverage and Gaps
echo "3. Testing Coverage & Gaps Commands..."
./cli/gmind/gmind coverage full | grep -iq "Status"
./cli/gmind/gmind gaps prd-to-plan | grep -iq "gap"

# Test 4: Trace and Impact
echo "4. Testing Trace functionality..."
./cli/gmind/gmind trace br-prd03-s4 --json > /dev/null

echo "All basic PRD-03 smoke tests passed."
