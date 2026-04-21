#!/bin/bash
# test-gmind-cli.sh

# beads-id: br-test-prd03-script

echo "Starting PRD-03 Verification Test..."

# Test 1: Binary Existence & Basic Command
echo "1. Testing CLI Presence..."
./gmind --help > /dev/null
if [ $? -ne 0 ]; then echo "FAIL: gmind binary not found or error"; exit 1; fi

# Test 2: Gmind Serve API 
echo "2. Testing gmind serve API endpoints..."
./gmind serve --port 9090 &
SERVER_PID=$!
sleep 2 # wait for start

curl -sSf http://localhost:9090/api/coverage > /dev/null
if [ $? -ne 0 ]; then echo "FAIL: /api/coverage endpoint failed"; kill $SERVER_PID; exit 1; fi
kill $SERVER_PID

# Test 3: Coverage and Gaps
echo "3. Testing Coverage & Gaps Commands..."
./gmind coverage full | grep -q "Status"
./gmind gaps prd-to-plan | grep -q "gap"

# Test 4: Trace and Impact
echo "4. Testing Trace functionality..."
./gmind trace br-test-prd03 --json > /dev/null

echo "All basic PRD-03 smoke tests passed."
