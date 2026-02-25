## [Emergent Minds | paddo.dev](/)

[ Home ](/) [ About ](/about) [ Search ](/search)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

![](/_astro/from-beads-to-tasks.B2ZaXjZf_Z2iaYci.webp)

23-JAN-26[5 MIN]

[ai-coding](/tags/ai-coding/)[claude-code](/tags/claude-code/)[dev-tools](/tags/dev-tools/)[workflow](/tags/workflow/)[automation](/tags/automation/)

# From Beads to Tasks: Anthropic Productizes Agent Memory

LAST UPDATED: 25-JAN-26 

An Anthropic engineer [tweeted](https://x.com/AntoineBrgt/status/1881823631787950095) about the new task system in Claude Code v2.1.16:

> We took inspiration from projects like Beads by Steve Yegge. 
> 
> — Antoine Brugeat, Anthropic

That single line says everything. The community builds patterns. Anthropic productizes them. The [pattern-to-product cycle](/blog/agent-harnesses-from-diy-to-product) continues.

## Why Todos Weren’t Enough

Claude Code has had todos since forever. Opus 4.5 is good enough at tracking state that simple todos became redundant for small tasks.

But projects got longer. Multi-session work. Subagents. Context window boundaries. The problem shifted from “what do I need to do” to “how do I coordinate complex work across sessions and agents.”

Todos don’t solve that. You need:

  * **Dependencies** \- task A blocks task B
  * **Persistence** \- survives session boundaries
  * **Coordination** \- multiple agents, same source of truth



That’s what Beads solved. Now it’s what Tasks solves, built in.

## What Tasks Actually Does

From the [changelog](https://github.com/anthropics/claude-code/releases/tag/v2.1.16): “Added new task management system, including new capabilities like dependency tracking.”

The key features:

  * **Dependencies and blockers** \- task A can block task B. Claude won’t start B until A is done.
  * **Session-isolated by default** \- each `claude` invocation gets a fresh task list. Close session = tasks gone.
  * **Opt-in persistence** \- set `CLAUDE_CODE_TASK_LIST_ID=my-project` to persist tasks to `~/.claude/tasks/<id>/`
  * **Multi-session coordination** \- when using the same task list ID, updates broadcast to all sessions. Multiple Claudes, one source of truth.
  * **Subagent support** \- works with `claude -p` and the AgentSDK



Shared task lists

The `CLAUDE_CODE_TASK_LIST_ID` environment variable opts you into persistence and coordination. Without it, each session is isolated. With it, tasks persist to `~/.claude/tasks/<id>/` and multiple terminals see the same state.

This isn’t a Jira replacement. It’s session-level coordination for agentic workflows.

## The Pattern Recognition

This validates a running thesis. Look at what’s been built:

  * **[Beads](/blog/beads-memory-for-coding-agents)** : Agent memory via Git-native issue tracking. Wake up, ask what’s next, the agent knows.
  * **[Flux](/blog/flux-kanban-for-ai-agents)** : Task coordination via MCP-first Kanban. CLI-first, web dashboard, multi-project.
  * **[Agent Harnesses](/blog/agent-harnesses-from-diy-to-product)** : Anthropic’s two-agent pattern with progress files. External artifacts become agent memory.



Tasks is Anthropic’s answer to the same problem. The solution converged because the problem is real.

> All they know is what’s on disk. If you got competing documents, obsolete documents, conflicting documents - they get dementia. 
> 
> — Steve Yegge (via the Beads thesis)

## Different Layers, Not Competition

The honest take: Tasks doesn’t obsolete Beads or Flux. They solve different layers.

Tool| Scope| Storage| Integration  
---|---|---|---  
**Tasks**|  Session-level| `~/.claude/tasks`| Built into Claude Code  
**Beads**|  Project-level| Git repo| Any agent that reads files  
**Flux**|  Team-level| Git sync or SQLite| MCP server + web UI  
  
Analogy: Tasks is SQLite. Beads/Flux are PostgreSQL. Different scale, both valid.

If you’re coordinating work within a Claude Code session or across a few terminals: Tasks.

If you need project memory that survives across weeks and works with multiple agents: Beads.

If you need team-level visibility with a web dashboard: Flux.

Layering works

Nothing stops you from using Tasks for immediate session work while Beads tracks longer-term project memory. They’re complementary, not competing.

## Caveats

Being honest about where this is:

  * **No repo awareness** \- tasks are identified by list ID only. If you use the same `CLAUDE_CODE_TASK_LIST_ID` across different repos, Claude could pick up tasks from repo A while working in repo B. Use repo-specific IDs to avoid this.
  * **Early days** \- format may change
  * **No MCP server** \- unlike Flux, you can’t query tasks from other tools via MCP (yet)
  * **No web UI** \- unlike Flux, there’s no dashboard to visualize dependencies (yet)
  * **Tightly coupled** \- works with Claude Code and AgentSDK, not arbitrary agents



The “yet” qualifiers are intentional. This is v1. Anthropic ships fast.

## The Moat Question

A friend sent me this today: Claude proactively offering to save a task for later. “Want me to add that now, or create a task for later?”

It’s in the system prompt now. That changes everything.

When behavior is baked into the model’s default prompting, wrappers become redundant. This is how Anthropic absorbs community innovations: spot the pattern, productize it, ship it as native behavior.

The CLI tooling layer has no moat. Any good pattern that fits in a system prompt becomes native. The real moat is the non-CLI human experience: IDEs, web UIs, dashboards, integrations that aren’t just Claude in a terminal.

## Why This Matters

The [CNC machine](/blog/yegge-kim-divers-and-cnc-machines) is taking shape.

Yegge predicted orchestrated swarms with external memory. Not one giant diver with a bigger oxygen tank, but specialized divers coordinated by something that understands the workflow.

Tasks is a piece of that. Built-in memory and coordination at the session level. Dependencies that block work until preconditions are met. State that survives context compaction.

The infrastructure for agentic work - memory, dependencies, coordination - is becoming core product. Not DIY scaffolding.

> The next generation of tools needs to lower that barrier, not just expand context windows. 

That’s happening. Patterns built by the community are becoming native features. The cycle continues.

## Try It

Update to Claude Code 2.1.16+. Tasks are available via the `TaskCreate`, `TaskUpdate`, `TaskList`, and `TaskGet` tools.

For shared task lists across sessions:
    
    
    CLAUDE_CODE_TASK_LIST_ID=my-project claude

Works with `claude -p` for scripted workflows and the AgentSDK for custom agents.

* * *

The broader pattern: external memory for agents is no longer optional. Anthropic agreeing with Yegge’s thesis enough to productize it tells you where this is going. The scaffolding becomes the foundation.

Share This Article

×

### Share this article

An Anthropic engineer tweeted: "We took inspiration from projects like Beads by Steve Yegge." That line says everything. The community built the pattern. Anthropic productized it. Claude Code's new task system adds: \- Dependencies and blockers (task A blocks task B) \- Session-isolated by default (fresh list per invocation) \- Opt-in persistence via CLAUDE_CODE_TASK_LIST_ID env var \- Multi-session coordination when sharing task list IDs This isn't a replacement for Beads or Flux. It's a different layer: \- Tasks: session-level coordination, built into Claude Code \- Beads: project-level memory, Git-native, agent-agnostic \- Flux: team-level coordination, MCP server, web dashboard The CNC machine is taking shape. Yegge predicted orchestrated swarms with external memory. Anthropic is building it. 

Full breakdown: <https://paddo.dev/blog/from-beads-to-tasks/>

Copy Full Summary ✓ Copied! Copy Title + Link ✓ Copied!

## Related Posts

[![Claude Code 2.1: The Pain Points? Fixed.](/_astro/claude-code-21-fixes.BRfGJSeF_Z2qI7oo.webp)](/blog/claude-code-21-pain-points-addressed/)

08-JAN-26[6 MIN]

### [Claude Code 2.1: The Pain Points? Fixed.](/blog/claude-code-21-pain-points-addressed/)

Skills controllability, hooks limitations, plan mode friction - 2.1 addresses the documented pain points. Here's what changed and what's still missing.

[claude-code](/tags/claude-code/)[ai-coding](/tags/ai-coding/)[dev-tools](/tags/dev-tools/)

[![Visual Verification: Making Agents Prove Their Work](/_astro/visual-verification.2Rt86sJH_Z2o0LCC.webp)](/blog/multimodal-validation-visual-verification/)

16-DEC-25[5 MIN]

### [Visual Verification: Making Agents Prove Their Work](/blog/multimodal-validation-visual-verification/)

Screenshots as source of truth, reference comparison to catch agent lies, and video capture for temporal bugs. How multimodal validation changes coding agent workflows.

[ai-coding](/tags/ai-coding/)[automation](/tags/automation/)[workflow](/tags/workflow/)

[![claude-tools: A Plugin Marketplace for Claude Code](/_astro/claude-tools-marketplace.DhHmL3eu_2cB3dd.webp)](/blog/claude-tools-plugin-marketplace/)

13-DEC-25[5 MIN]

### [claude-tools: A Plugin Marketplace for Claude Code](/blog/claude-tools-plugin-marketplace/)

Six plugins that extend Claude Code with specialized external tools: Gemini for visual analysis, Codex for architecture thinking, Headless for browser automation, Mobile for native app testing, DNS for multi-provider management, and Miro for board reading.

[claude-code](/tags/claude-code/)[ai-coding](/tags/ai-coding/)[dev-tools](/tags/dev-tools/)

© 2026 paddo.dev. All rights reserved. • [Privacy Policy](/privacy) • [Games 🎮](/games)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

>_CTRL+K

▣ NAVIGATION TERMINAL v2.0 

×

0% READ

>_

AVAILABLE SECTIONS:

────────────────────────────────────────

  * →[01]Why Todos Weren’t Enough
  * →[02]What Tasks Actually Does
  * →[03]The Pattern Recognition
  * →[04]Different Layers, Not Competition
  * →[05]Caveats
  * →[06]The Moat Question
  * →[07]Why This Matters
  * →[08]Try It



────────────────────────────────────────

RELATED POSTS:

────────────────────────────────────────

  * [→[R1]Claude Skills: The Controllability Problem](/blog/claude-skills-controllability-problem/)
  * [→[R2]Ralph Wiggum: Autonomous Loops for Claude Code](/blog/ralph-wiggum-autonomous-loops/)
  * [→[R3]Skills Auto-Activation via Hooks (Does It Solve the Problem?)](/blog/claude-skills-hooks-solution/)



────────────────────────────────────────

TYPE TO SEARCH | ↑↓ NAVIGATE | ENTER SELECT | ESC EXIT 
