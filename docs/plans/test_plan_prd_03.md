# Test Plan & Validation: PRD-03 (CLI & Agent Execution)

<!-- beads-id: br-test-prd03 -->

## 1. Overview
This document outlines the QA Strategy, Test Plan, and Validation Scripts for verifying the completion of the `gmind` CLI and Agent Execution module as defined in **[PRD-03-CLI-and-Agent-Execution](../PRDs/core-gmind/PRD-03-CLI-and-Agent-Execution.md)**.

The testing scope focuses on 4 main layers:
1. `gmind` CLI Context API Gateway
2. Agent Workflow & Execution Directives
3. CI/CD Verification Layer
4. RTE Approval Workflow

## 2. Test Plan Matrix

### 2.1 `gmind` CLI Core Commands
**Beads-ID:** `gmind-3hm`
| Feature | Test Case | Expected Result |
| --- | --- | --- |
| `search` | Run `gmind search "architecture"` | Returns relevant markdown docs and chat history from Zvec |
| `search-codebase` | Run `gmind search-codebase --json "main loop"` | Triggers `fastcode query` internally; returns AST results in JSON |
| `context` | Run `gmind context br-123 --depth 0` | Returns consolidated context (DB + Code + Zvec) compressed for LLM |
| `github` | Run `gmind github info br-xxx` | Internal exec to `git` and `gh`, no panics, yields commit & PR info |
| `trace` | Run `gmind trace br-123 --reverse` | Renders a reverse AST tree graph of Plan -> PRD mapping |
| `coverage` | Run `gmind coverage full` | Outputs a table identifying covered / uncovered requirements |
| `impact` | Run `gmind impact br-prd03-s1` | Outputs affected plan elements and tasks |
| `gaps` | Run `gmind gaps plan-to-tasks` | Warns if Plan elements lack tasks |
| `plan` | Run `gmind plan create --from-prd=br-prd03-s1`| Generates `docs/plans/plan-X-slug.md` |
| `serve` | Run `gmind serve --port 8080` | Starts embedded WebUI at `localhost:8080` (API & D3.js frontend) |
| `reindex` | Run `gmind reindex --force` | Zvec pipeline processes Markdown, Git, PRs, and Traces into the db |

### 2.2 Agent Workflow & Verification Layer
**Beads-ID:** `gmind-18j`
| Feature | Test Case | Expected Result |
| --- | --- | --- |
| **Traceability Tags** | `bd create "Test" --tag="implements:br-plan-01"` | CLI validates tracking tags are correct |
| **Verification Gate** | Agent calls `br close` but unit tests fail | Denied. CI layer reflects red state and restricts completion |
| **File Lease Timeout** | Lock file for > 15 minutes | Lock automatically expires, allowing manual "Human release" via DB |

### 2.3 RTE Approval Workflow
**Beads-ID:** `gmind-27b`
| Workflow Step | Command | Expected Result |
| --- | --- | --- |
| **Escalate** | `gmind escalate br-123 --risk="Arch risk"` | DB state updates to `escalated`, RTM Dashboard shows alert |
| **Approve** | `gmind approve br-123 --resolution="..."` | DB state reverts to execution. Trace context is appended |
| **Reject** | `gmind reject br-123 --reason="..."` | State changes, Agent notified to retry |

---

## 3. Automation Validation Test Script

This script serves as a fast CI integration test to validate the endpoints of the compiled `gmind` binary.

```bash
#!/bin/bash
# test-gmind-cli.sh

# beads-id: br-test-prd03-script

echo "Starting PRD-03 Verification Test..."

# Test 1: Binary Existence & Basic Command
echo "1. Testing CLI Presence..."
gmind --help > /dev/null
if [ $? -ne 0 ]; then echo "FAIL: gmind binary not found or error"; exit 1; fi

# Test 2: Gmind Serve API 
echo "2. Testing gmind serve API endpoints..."
gmind serve --port 9090 &
SERVER_PID=$!
sleep 2 # wait for start

curl -sSf http://localhost:9090/api/coverage > /dev/null
if [ $? -ne 0 ]; then echo "FAIL: /api/coverage endpoint failed"; kill $SERVER_PID; exit 1; fi
kill $SERVER_PID

# Test 3: Coverage and Gaps
echo "3. Testing Coverage & Gaps Commands..."
gmind coverage full | grep -q "Status"
gmind gaps prd-to-plan | grep -q "gap"

# Test 4: Trace and Impact
echo "4. Testing Trace functionality..."
gmind trace br-test-prd03 --json > /dev/null

echo "All basic PRD-03 smoke tests passed."
```

## 4. Manual QA Verification Checklist for Agents
- [ ] Agent initiates task with `bd create ...` including mandatory `satisfies` and `implements` tags.
- [ ] Agent runs `gmind search-codebase` to establish context.
- [ ] Agent deliberately makes a failing test to verify the CI Verification Layer blocks `br close`.
- [ ] Agent triggers `gmind escalate` and waits for a simulated human/RTE `gmind approve` response.
- [ ] Ensure that `gmind serve` properly starts and renders the React/D3 Dashboard without JS console errors.

---
*QA Author: Agentic QA System*
*References: PRD-00, PRD-01, PRD-03*
