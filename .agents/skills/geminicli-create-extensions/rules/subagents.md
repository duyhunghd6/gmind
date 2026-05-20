# SubAgent Creation Rules

## Prerequisites

Subagents are enabled by default. To disable them, set `enableAgents` to `false` in `settings.json`:

```json
{
  "experimental": { "enableAgents": false }
}
```

> **Warning:** SubAgents operate in "YOLO mode" — they execute tools without individual user confirmation. Restrict tools carefully.

## File Format

Markdown (`.md`) with YAML frontmatter. The body becomes the agent's **System Prompt**.

## Placement

| Scope            | Location                  |
| :--------------- | :------------------------ |
| Project (shared) | `.gemini/agents/*.md`     |
| User (personal)  | `~/.gemini/agents/*.md`   |
| Extension        | `<extension>/agents/*.md` |

## Configuration Schema

| Field          | Type   | Required | Description                                         |
| :------------- | :----- | :------- | :-------------------------------------------------- |
| `name`         | string | **Yes**  | Unique slug used as tool name. Only `[a-z0-9_-]`    |
| `description`  | string | **Yes**  | What the agent does. Used by main agent for routing |
| `kind`         | string | No       | `local` (default) or `remote`                       |
| `tools`        | array  | No       | Whitelist of tool names. Supports wildcards: `*` (all), `mcp_*` (all MCP), `mcp_server_*` (all from a specific server). Omit for inherited tools. |
| `mcpServers`   | object | No       | Inline MCP servers isolated to this specific agent  |
| `model`        | string | No       | e.g. `gemini-3-flash-preview`. Default: `inherit`   |
| `temperature`  | number | No       | 0.0–2.0. Default: `1`                               |
| `max_turns`    | number | No       | Max conversation turns. Default: `30`               |
| `timeout_mins` | number | No       | Max execution time in minutes. Default: `10`        |

## Template

```markdown
---
name: <agent-slug>
description: <clear description of expertise, when to use, example scenarios>
kind: local
tools:
  - read_file
  - grep_search
  - list_directory
model: gemini-2.5-pro
temperature: 0.2
max_turns: 10
---

You are a [role]. Your job is to [task].

Focus on:

1. [area 1]
2. [area 2]
3. [area 3]

When you find [thing], explain it clearly and [action].
```

## Description Optimization

The main agent decides whether to call a sub-agent based on the `description` field. Write descriptions that clearly indicate:

1. **Area of expertise** — what domain does this agent cover?
2. **When to use** — what triggers should invoke this agent?
3. **Example scenarios** — 2-3 concrete examples

**Good example:**

```
Git expert agent which should be used for all local and remote git operations.
For example:
- Making commits
- Searching for regressions with bisect
- Interacting with source control and issues providers such as GitHub
```

## Built-in SubAgents

These already exist — do NOT recreate them:

- `codebase_investigator` — Analyze codebase, reverse engineer, understand dependencies
- `cli_help` — Expert knowledge about Gemini CLI itself
- `generalist` — Broad, resource-heavy subtasks using inherited tool access
- `browser_agent` (experimental) — Automate web browser tasks (requires Chrome 144+)

## Advanced Features

### Forcing a Subagent (@ syntax)
Explicitly direct a task to a specific subagent by using the `@` symbol at the beginning of the prompt:
`@codebase_investigator Map out the relationships in AgentRegistry.`

### Subagent-Specific Policies
Enforce granular rules in `policy.toml` based on the executing subagent's name:
```toml
[[rules]]
name = "Allow pr-creator to push code"
subagent = "pr-creator"
action = "allow"
```

### Remote Subagents (Agent2Agent)
Gemini CLI supports delegating tasks to remote subagents using the Agent-to-Agent (A2A) protocol.

## When NOT to Use SubAgents

- **Simple one-shot tasks** — Use a custom command instead
- **Persistent context needed** — Use `GEMINI.md` or a skill
- **User-invoked shortcuts** — Use a custom command
- **Lifecycle interception** — Use hooks
