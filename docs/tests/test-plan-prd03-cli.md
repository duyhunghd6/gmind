---
beads-id: br-test-prd03
title: "Test Plan: PRD-03 CLI & Agent Execution"
satisfies:
  - br-prd03-s1
  - br-prd03-s2
  - br-prd03-s3
  - br-prd03-s4
---

# Test Plan: PRD-03 — CLI & Agent Execution

<!-- beads-id: br-test-prd03 -->

## 1. Scope

This test plan validates ALL commands and workflows defined in [PRD-03](../../PRDs/core-gmind/PRD-03-CLI-and-Agent-Execution.md).

**Covered Beads Issues:**
- `gmind-3hm`: CLI Core Commands
- `gmind-18j`: Agent Workflow & Verification Layer
- `gmind-27b`: RTE Approval Workflow

## 2. Test Layers

| Layer | Tool | Location |
|-------|------|----------|
| Unit Tests | `go test` | `cli/gmind/internal/{graph,storage,rtm}/*_test.go` |
| Integration Tests | Bash script | `cli/gmind/test-gmind-cli.sh` |
| Manual Verification | Human review | Agent Workflow + RTE Approval |

## 3. Unit Tests

### 3.1 Graph Package (`internal/graph/graph_test.go`)

| Test | Function | Validates |
|------|----------|-----------|
| Parser: PRD file | `TestParserParseFile_PRD` | YAML frontmatter → Node extraction |
| Parser: Plan file | `TestParserParseFile_Plan` | Plan + satisfies links |
| Parser: Empty file | `TestParserParseFile_Empty` | No false positives |
| Trace: render tree | `TestTraceNode_RenderTree` | Forward tree rendering |
| Trace: reverse | `TestTraceNode_RenderTree_Reverse` | Reverse parent traversal |
| TraceNode convert | `TestConvertToTraceNode` | Node → TraceNode conversion |
| Cycle protection | `TestConvertToTraceNode_CycleProtection` | No infinite loops |
| Icon mapping | `TestGetIcon` | All NodeType icons |
| Impact: no downstream | `TestImpact_NoDownstream` | Isolated node edge case |

### 3.2 Storage Package (`internal/storage/frankensqlite_test.go`)

| Test | Function | Validates |
|------|----------|-----------|
| InitSchema | `TestInitSchema` | `rte_metadata` + `index_watermarks` tables created |
| InitSchema idempotent | `TestInitSchema_Idempotent` | Double call doesn't error |
| UpdateIssueRTE | `TestUpdateIssueRTE` | Insert RTE metadata |
| RTE Upsert | `TestUpdateIssueRTE_Upsert` | Update existing RTE record |
| Watermark roundtrip | `TestWatermark_RoundTrip` | Write + read watermark |
| Watermark update | `TestWatermark_Update` | Upsert watermark |
| GetIssueDetails | `TestGetIssueDetails_FromBeadsDB` | Issue + RTE enrichment |
| GetIssueState | `TestGetIssueState` | Status retrieval |

### 3.3 RTM Package (`internal/rtm/syncManager_test.go`)

| Test | Function | Validates |
|------|----------|-----------|
| Extract target IDs | `TestExtractTargetIDs` | Beads ID regex extraction |
| No IDs | `TestExtractTargetIDs_NoIDs` | Zero result on plain .md |
| Empty dir | `TestExtractTargetIDs_EmptyDir` | Empty dir handling |
| Non-markdown | `TestExtractTargetIDs_IgnoresNonMarkdown` | .go files ignored |
| FindRootDir | `TestFindRootDir_Fallback` | Fallback to cwd |

## 4. Integration Tests (`test-gmind-cli.sh`)

<!-- beads-id: br-test-prd03-script -->

| # | PRD Section | Command | Expected |
|---|-------------|---------|----------|
| T1 | §1 | `gmind --help` | Exit 0, contains "gmind" |
| T2 | §1 | `gmind serve --port 9091` | `/api/coverage`, `/api/gaps`, `/api/tasks` return 200 |
| T3 | §1 | `gmind coverage full` | Output contains "Coverage" |
| T3b | §1 | `gmind coverage prd` | Output contains "Coverage" |
| T4 | §1 | `gmind gaps prd-to-plan` | Output contains "Gap" |
| T4b | §1 | `gmind gaps plan-to-tasks` | Output contains "Gap" |
| T5 | §1 | `gmind trace br-prd03-s1 --json` | Contains "beads_id" |
| T5b | §1 | `gmind trace br-prd03-s1 --reverse` | Contains "PRD" |
| T6 | §1 | `gmind impact br-prd03-s1` | Contains "Impact" |
| T7 | §1 | `gmind context br-prd03-s1 --json` | Contains "beads_id" |
| T8 | §1 | `gmind search 'CLI' --limit 2` | Exit 0 |
| T9 | §1 | `gmind github commits br-prd03` | Exit 0 |
| T10 | §1 | `gmind plan status br-plan-01` | Exit 0 |
| T11 | §1 | `gmind reindex --source=markdown-doc` | Contains "ndex" |
| T12 | §4 | `gmind escalate <id> --risk=...` | Escalation recorded |
| T13 | §4 | `gmind approve <id> --resolution=...` | Approval recorded |
| T14 | §4 | `gmind reject <id> --reason=...` | Rejection recorded |

## 5. Manual Verification

### 5.1 Agent Workflow (br-prd03-s2)
- Verify `bd create` with `--tag="implements:..."` creates traceability links
- Verify `gmind search-codebase` delegates to `fastcode` (requires fastcode binary)
- Verify `br close <id>` blocked when tests haven't passed

### 5.2 CI/CD Verification Layer (br-prd03-s3)
- Verify `go test ./...` passes before task completion
- Verify `golangci-lint run` passes (if configured)

## 6. Pass/Fail Criteria

- **P0 (Must Pass):** T1-T6, T11 — CLI core commands functional
- **P1 (Should Pass):** T7-T10 — Dependent on external tools (`fastcode`, `gh`)
- **P2 (Best Effort):** T12-T14 — RTE workflow depends on `bd` CLI availability
- **Overall:** All P0 tests must pass for issue closure
