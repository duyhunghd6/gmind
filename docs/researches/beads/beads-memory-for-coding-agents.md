## [Emergent Minds | paddo.dev](/)

[ Home ](/) [ About ](/about) [ Search ](/search)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

![](/_astro/beads-memory.COYT-yGq_Z1teFho.webp)

15-DEC-25[4 MIN]

[ai-coding](/tags/ai-coding/)[dev-tools](/tags/dev-tools/)[workflow](/tags/workflow/)[automation](/tags/automation/)[productivity](/tags/productivity/)

# Beads: Memory for Your Coding Agents

In my [previous post on Yegge](/blog/yegge-kim-divers-and-cnc-machines), I covered his “divers and CNC machines” thesis: current agents burn context like oxygen, and the future is orchestrated swarms. His new project, [Beads](https://github.com/steveyegge/beads), is a step toward that future.

The problem it solves: coding agents have amnesia. Every session is 50 First Dates.

## The Markdown Nightmare

Before Beads, Yegge spent a month drowning in markdown files. Hundreds of them, accumulating:

> All they know is what’s on disk. If you got competing documents, obsolete documents, conflicting documents, ambiguous documents - they get dementia. 
> 
> — Steve Yegge

Agents don’t know what’s current. They can’t distinguish between “we decided this yesterday” and “this was a brainstorm from three weeks ago.” Everything looks equally valid.

The solution: addressable work items. Every task gets an ID, a priority, dependencies, an audit trail. Not a wiki. Not scattered notes. An issue tracker.

## Why Git

Beads stores everything in Git. This seems weird for an ephemeral issue tracker, but the reasoning is solid:

  * **Archived issues stay in history.** Close it, archive it, delete it. Still recoverable.
  * **Works offline.** No external service to depend on.
  * **Agents already know Git.** No new integration needed.



There’s a SQLite cache for fast queries, but the source of truth is version-controlled markdown. The AI designed it that way when Yegge asked what it wanted.

> Claude said ‘you’ve given me memory - I literally couldn’t remember anything before, now I can.’ And I’m like, okay, that sounds good. 
> 
> — Steve Yegge

## Current Work, Not Future Planning

Beads sits in a narrow space:

  * **Future work** : vague, months out, lives in your backlog. Not Beads.
  * **Past work** : done, documented, low risk. Not Beads.
  * **Current work** : what you care about right now, what just finished and might break, what’s blocked. This is Beads.



The framework even prioritizes recently closed work higher by default. If you ship something and find P2 follow-ups, they’ll languish forever without a boost. Beads gives them one automatically.

What Beads doesn't do

Beads isn’t a planning tool, a PRD generator, or Jira. It’s orchestration for what you’re working on today and this week. Different tools solve future planning.

## Land the Plane

The pattern that sold me: “land the plane.”

At the end of every session, Yegge tells his agent: “Let’s land the plane.” This triggers a scripted cleanup:

  1. Update Beads issues with progress
  2. Sync the issue tracker
  3. Clean up Git state (stashes, old branches)
  4. Remove debugging artifacts
  5. Generate a prompt for the next session



That last step is the key. The agent looks at Beads, finds the highest-priority unblocked work, and spits out a ready-to-paste prompt. Next session: copy, paste, go.

> Their reward function biases them for checklists and acceptance criteria. Landing the plane, even if they’re low on context, they’re going to do a good job with it. 
> 
> — Steve Yegge

## The Numbers

Four weeks old. 29 contributors with merged PRs. “Tens of thousands” of users according to Yegge.

People have already built:

  * Web UIs on top of Beads
  * Monitoring systems for automated workflows
  * Integrations with existing GitHub/Jira issues



The adoption is fast because the pain is real. Anyone who’s spent hours re-explaining context to their coding agent every morning gets it immediately.

## What’s Next?

The holy grail: wake up, ask your agents “what’s next?”, and they know.

Not because you briefed them. Because Beads gives them memory. They can see the dependency graph, the priorities, what’s blocked, what just shipped. They orient themselves.

> Man, that to me is the holy grail. And that’s what coding is going to be like next year. 
> 
> — Steve Yegge

## Running in Shoes

Yegge’s metaphor: using coding agents without something like Beads is running in socks. You get flexibility and some protection, but your feet hurt.

Beads is shoes. Opinionated, not appropriate for every situation, but damn useful when they fit.

Try it yourself

Install with `bun add beads`, run `bd init` in your project, then tell your agent to file issues as you work. Works with Claude Code, Codex, AMP, or any agent that can read/write files.

* * *

The broader thesis is the same as [my previous Yegge post](/blog/yegge-kim-divers-and-cnc-machines): bigger context windows aren’t the answer. Better orchestration is. Beads is a piece of that puzzle: persistent memory that survives session boundaries.

Four weeks in, already essential to people’s workflows. Worth watching.

Share This Article

×

### Share this article

Steve Yegge's new open-source project Beads solves the "50 First Dates" problem with coding agents: they wake up with no memory of what you did yesterday. The fix: an issue tracker that lives in Git. Every piece of work gets an addressable ID. Agents can query what's next, file follow-ups, and track dependencies. Key insight: Beads isn't for future planning or past documentation. It magnifies current work. What do I care about right now? What just finished that might break? What's blocking what? The "land the plane" pattern is great: at the end of each session, tell your agent to clean up Git state, update issues, and spit out a prompt for next session. Copy-paste and go. Works with Claude Code, Codex, AMP - any agent that can read/write files. Four weeks old, 29 contributors already. 

Full essay: <https://paddo.dev/blog/beads-memory-for-coding-agents/>

Copy Full Summary ✓ Copied! Copy Title + Link ✓ Copied!

## Related Posts

[![Claude Skills: The Controllability Problem](/_astro/claude-skills-controllability.DtSnrQGL_1Dil5e.webp)](/blog/claude-skills-controllability-problem/)

04-NOV-25[8 MIN]

### [Claude Skills: The Controllability Problem](/blog/claude-skills-controllability-problem/)

Skills are auto-invoked by Claude's judgment. For engineering workflows that need predictability, slash commands give you explicit control.

[claude-code](/tags/claude-code/)[dev-tools](/tags/dev-tools/)[ai-coding](/tags/ai-coding/)

[![Your PM Tool Was Designed for Humans](/_astro/pm-tool-designed-for-humans.DKo0-Yp5_Z25Wwl8.webp)](/blog/your-pm-tool-was-designed-for-humans/)

17-FEB-26[6 MIN]

### [Your PM Tool Was Designed for Humans](/blog/your-pm-tool-was-designed-for-humans/)

Jira, Confluence, standups, sprint planning - all optimized for human coordination overhead. In an agent-native world, the bottleneck isn't status updates. It's whether the agents are unblocked.

[ai-coding](/tags/ai-coding/)[workflow](/tags/workflow/)[automation](/tags/automation/)

[![The Quiet Features That Shipped With Opus 4.6](/_astro/quiet-features-opus-4-6.gWdJsnEr_10F3ER.webp)](/blog/quiet-features-opus-4-6/)

08-FEB-26[4 MIN]

### [The Quiet Features That Shipped With Opus 4.6](/blog/quiet-features-opus-4-6/)

Auto memory, fast mode, and agent team refinements all shipped in the same week as Opus 4.6. They tell you more about where Claude Code is heading than the headline model.

[claude-code](/tags/claude-code/)[ai-coding](/tags/ai-coding/)[workflow](/tags/workflow/)

© 2026 paddo.dev. All rights reserved. • [Privacy Policy](/privacy) • [Games 🎮](/games)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

>_CTRL+K

▣ NAVIGATION TERMINAL v2.0 

×

0% READ

>_

AVAILABLE SECTIONS:

────────────────────────────────────────

  * →[01]The Markdown Nightmare
  * →[02]Why Git
  * →[03]Current Work, Not Future Planning
  * →[04]Land the Plane
  * →[05]The Numbers
  * →[06]What’s Next?
  * →[07]Running in Shoes



────────────────────────────────────────

RELATED POSTS:

────────────────────────────────────────

  * [→[R1]Claude Skills: The Controllability Problem](/blog/claude-skills-controllability-problem/)
  * [→[R2]GasTown and the Two Kinds of Multi-Agent](/blog/gastown-two-kinds-of-multi-agent/)
  * [→[R3]The Terminal Renaissance](/blog/terminal-renaissance/)



────────────────────────────────────────

TYPE TO SEARCH | ↑↓ NAVIGATE | ENTER SELECT | ESC EXIT 
