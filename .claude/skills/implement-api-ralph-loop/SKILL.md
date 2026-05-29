---
name: implement-api-ralph-loop
description: Unified API Ralph Loop pipeline for implementing Go HTTP endpoints. Actions: init, plan, dev, qa, auto.
argument-hint: "<action=init|plan|dev|qa|auto> <feature-name> [prd-path]"
---

<!-- beads-id: br-skill-implement-api-ralph-loop -->

# API Ralph Loop Agent Skill

Arguments: `$ARGUMENTS`

Use this tool/skill to execute the structured GSAFe API Ralph Loop pipeline for implementing HTTP/REST backends in Go. The first argument specifies the action:

- `init` — Prepare API contract directories, pipeline state files, and analyze PRD contexts.
- `plan` — Dispatch/execute the Planner subagent to design and validate the `api-contract.md`.
- `dev` — Dispatch/execute the Dev subagent to write Go backend handlers, database queries, and migrations.
- `qa` — Dispatch/execute the QA subagent to write/run unit tests and static analysis.
- `auto` — Sequentially execute `init`, `plan`, `dev`, and `qa` to complete the feature implementation.

---

## 📋 General Subagent Architecture & Handoff Rules

<!-- beads-id: br-skill-api-ralph-subagents -->

You will coordinate a simple 3-subagent Swarm to perform this workflow:

1. **Planner Agent:**
   - Canonical contract source: `docs/design/contracts/api-{feature_name}/api-contract.md`.
   - Must detail HTTP methods, exact paths, JSON request/response bodies, query parameters, error responses, database target columns, and `satisfies:` links back to the PRD.
2. **Dev Agent:**
   - Implements code matching the contract.
   - Guardrail: Do not write files longer than **400 lines**. Separate logic across modular Go packages/files if it exceeds this threshold.
3. **QA Agent:**
   - Writes independent tests (e.g. standard Go `*_test.go` handler tests).
   - Validates code style and security using `golangci-lint`.

---

## 🛠 Actions Execution Specs

### Action: init

<!-- beads-id: br-skill-api-ralph-init -->

Initialize the workspace paths and check prerequisites:
1. Confirm the target feature name slug (e.g. `webui-and-pm-workspace`).
2. Create directories if they do not exist:
   - `docs/design/contracts/api-{feature_name}/`
   - `docs/design/pipeline-state/api-{feature_name}/`
3. Scan the designated PRD path (e.g. `docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md`) to extract target database columns and endpoint definitions.

---

### Action: plan (Planner Subagent)

<!-- beads-id: br-skill-api-ralph-plan -->

1. Create or update `docs/design/contracts/api-{feature_name}/api-contract.md`.
2. Format `api-contract.md` using the standard layout with explicit YAML specifications of endpoints for machine readability and HTML preview generation.
3. Ensure every endpoint maps back to a specific requirement using the syntax: `<!-- beads-id: br-plan-xxx | satisfies: br-prdXX-sY -->`.

---

### Action: dev (Dev Subagent)

<!-- beads-id: br-skill-api-ralph-dev -->

1. Retrieve the validated `api-contract.md`.
2. Implement backend handlers in the appropriate path within the codebase (e.g., `cli/gmind/cmd/` or matching server handlers).
3. If database changes are needed, implement clean SQLite schema updates or first-class column migrations.
4. Enforce file size limit: ensure files are strictly **< 400 lines**.

---

### Action: qa (QA Subagent)

<!-- beads-id: br-skill-api-ralph-qa -->

1. Run static checks and syntax checkers:
   ```bash
   golangci-lint run
   ```
2. Write unit/integration tests to verify endpoint handlers under the exact package directory.
3. Execute tests:
   ```bash
   go test -v ./cli/gmind/cmd/...
   ```
4. Verify response bodies against schemas defined in the contract.

---

### Action: auto

<!-- beads-id: br-skill-api-ralph-auto -->

Run `init`, then `plan`. Present the compiled API Contract to the human for approval. Once approved, proceed with `dev` and run `qa` verification. Provide a final verification report.
