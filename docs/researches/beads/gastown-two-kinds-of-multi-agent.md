## [Emergent Minds | paddo.dev](/)

[ Home ](/) [ About ](/about) [ Search ](/search)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

![](/_astro/two-kinds-multi-agent.de08B_qm_ZFaxBp.webp)

17-JAN-26[4 MIN]

[ai-coding](/tags/ai-coding/)[workflow](/tags/workflow/)[dev-tools](/tags/dev-tools/)[productivity](/tags/productivity/)

# GasTown and the Two Kinds of Multi-Agent

Ten days ago, I wrote [The 19-Agent Trap](/blog/the-19-agent-trap). Complex AI scaffolding appeals to people who understand traditional SDLC. Phase gates, handoffs, specialized roles. But it optimizes for explainability, not effectiveness.

Then Steve Yegge shipped [Gas Town](https://github.com/steveyegge/gastown).

An orchestrator running 20-30 Claude Code instances in parallel. Built on [Beads](/blog/beads-memory-for-coding-agents), the memory framework I praised a month ago. The [CNC machine](/blog/yegge-kim-divers-and-cnc-machines) he predicted was coming in 2026.

Is Gas Town the trap I warned about? Or something different?

## The Two Architectures

**BMAD and SpecKit** simulate org charts. Analyst agent hands off to PM agent, which hands off to Architect agent, which hands off to Developer agent. Each role has a persona, defined responsibilities, phase gates. The AI mimics how humans coordinate.

**Gas Town** uses operational roles. Mayor orchestrates work distribution, Polecats execute tasks in parallel, Witness and Deacon monitor system health, Refinery manages merges. Each worker gets a Git worktree, a task from Beads, and runs until completion. State lives externally, not in bloated context windows.

The key distinction

BMAD simulates how humans coordinate - SDLC phases with handoffs between specialized personas. Gas Town simulates how systems coordinate - operational roles with external state management. One recreates org chart friction. The other distributes work across isolated environments.

19-Agent Trap| Gas Town  
---|---  
SDLC personas (Analyst, PM, Dev)| Operational roles (Mayor, Polecat, Witness)  
Sequential handoffs| Parallel execution  
Phase gates as quality control| Git-based persistence  
Context pollution from role prompts| External memory (Beads)  
  
## Where Gas Town Diverges

Gas Town avoids several traps that plague BMAD-style scaffolding:

  * **External memory over context bloat.** Beads handles task tracking outside the agent’s context window. Roles are operational, not elaborate SDLC personas competing for attention.
  * **Operational roles, not SDLC simulation.** Mayor coordinates, Polecats execute, Witness monitors. No confusion about whether you’re in the “requirements phase” or “implementation phase.”
  * **GUPP principle.** Git Up, Pull, Push. Deterministic handoffs through version control, not LLM-judged phase gates.
  * **Git worktrees for isolation.** Each agent works in its own directory. Crashes don’t corrupt shared state.



This is the orchestrated swarm Yegge predicted. Not bigger tanks for a single diver - multiple divers with their own tanks, coordinated from above.

## The Chaos Is Real

But let’s not romanticize it. Gas Town is two weeks old and the chaos is palpable.

> This is my third $200/month Claude Pro Max plan. My first two have maxed out their weekly limits, and now I’m about to hit a session limit in my third one. And I’m trying to dial UP my usage, with Gas Town.
> 
> — Steve Yegge, on X

[DoltHub’s experience](https://www.dolthub.com/blog/2026-01-15-a-day-in-gas-town/) running Gas Town included:

  * **$100/hour token burn rate** at peak
  * **Auto-merging failing tests** into main
  * **“Murderous rampaging Deacon”** \- an agent deleting code unpredictably
  * **5 force pushes to main** to recover from corrupted state



This isn’t dismissible as growing pains. These are real costs. [Justin Abrahms](https://justin.abrah.ms/blog/2026-01-05-wrapping-my-head-around-gas-town.html) notes Gas Town requires constant steering - it’s not a hands-off system.

The architecture is different from BMAD. The complexity costs are still real.

## The Reconciliation

Here’s how I square these positions:

**The 19-agent trap is still a trap.** Cargo cult SDLC. Persona prompts competing for context. Sequential handoffs recreating human coordination friction. Optimizing for explainability over effectiveness.

**Gas Town is a different architecture.** Operational roles with external state. Git-based isolation. Parallel execution without SDLC phase gates. The problems are engineering challenges, not architectural mistakes.

**Boris’s vanilla approach is still optimal for most.** [His setup](/blog/how-boris-uses-claude-code) \- Plan Mode, focused CLAUDE.md, verification loops, parallel sessions - handles what most developers need. No orchestration layer required.

**Gas Town is for a specific ambition level.** Massive parallelization across a large codebase. Automated issue triage, planning, and implementation at scale. If you’re not operating at that level, the complexity isn’t worth it.

The honest take

Gas Town isn’t the trap. But it’s also not ready. Two weeks of development, wild chaos on real codebases, $100/hour burns. Yegge’s vision is directionally correct. Execution is early.

## What This Means

If your PM sends you a link to BMAD or SpecKit, my advice is unchanged. [Start vanilla](/blog/stop-speedrunning-claude-code). The scaffolding that mimics org charts is solving the wrong problem.

If you’re watching Gas Town, watch it closely. The architecture is sound. External memory, parallel execution, Git-based coordination. These are the right primitives for orchestrated agent swarms.

But don’t mistake “different architecture” for “ready for production.” DoltHub’s experience shows the gap between vision and execution. The murderous Deacon and $100/hour burns aren’t bugs to dismiss - they’re the current state of the art.

For now, Boris wins. Plan Mode, focused context, verification loops. Add complexity when you hit real limits, not theoretical ones.

Gas Town isn’t the trap. It’s the future, still under construction.

Share This Article

×

### Share this article

Last week I wrote that 19-agent scaffolding (BMAD, SpecKit) is a trap. Then Yegge shipped Gas Town - an orchestrator running 20-30 Claude Code instances in parallel. Am I contradicting myself? No. They're solving different problems with different architectures. The trap: simulating human org structure with SDLC personas. Analyst → PM → Architect → Dev → QA. Sequential handoffs, phase gates, role confusion. Gas Town: operational roles for coordination and execution. Mayor orchestrates, Polecats execute in parallel, Witness and Deacon monitor. External state via Beads, Git worktrees for isolation. But Gas Town's chaos is real: $100/hour burn rate, auto-merged failing tests, "murderous rampaging Deacon." Two weeks old and wild. For most developers, Boris's vanilla approach still wins. Gas Town is for a specific ambition level - and even then, it's not ready yet. 

Full post: <https://paddo.dev/blog/gastown-two-kinds-of-multi-agent/>

Copy Full Summary ✓ Copied! Copy Title + Link ✓ Copied!

## Related Posts

[![The Quiet Features That Shipped With Opus 4.6](/_astro/quiet-features-opus-4-6.gWdJsnEr_10F3ER.webp)](/blog/quiet-features-opus-4-6/)

08-FEB-26[4 MIN]

### [The Quiet Features That Shipped With Opus 4.6](/blog/quiet-features-opus-4-6/)

Auto memory, fast mode, and agent team refinements all shipped in the same week as Opus 4.6. They tell you more about where Claude Code is heading than the headline model.

[claude-code](/tags/claude-code/)[ai-coding](/tags/ai-coding/)[workflow](/tags/workflow/)

[![The 19-Agent Trap](/_astro/19-agent-trap.I6jwsouT_ZuxEF1.webp)](/blog/the-19-agent-trap/)

07-JAN-26[4 MIN]

### [The 19-Agent Trap](/blog/the-19-agent-trap/)

Complex AI scaffolding tools appeal to people who understand traditional SDLC. But AI collapses the phases that made those models useful.

[ai-coding](/tags/ai-coding/)[workflow](/tags/workflow/)[dev-tools](/tags/dev-tools/)

[![The Terminal Renaissance](/_astro/terminal-renaissance._9TJ975A_ZHTKfA.webp)](/blog/terminal-renaissance/)

17-DEC-25[4 MIN]

### [The Terminal Renaissance](/blog/terminal-renaissance/)

The real revolution isn't AI in your terminal. It's moving at the speed of thought from a single interface. When friction exists, build a CLI.

[ai-coding](/tags/ai-coding/)[cli](/tags/cli/)[dev-tools](/tags/dev-tools/)

© 2026 paddo.dev. All rights reserved. • [Privacy Policy](/privacy) • [Games 🎮](/games)

[ GitHub ](https://github.com/paddo) [ RSS Feed ](/rss.xml "RSS Feed")

>_CTRL+K

▣ NAVIGATION TERMINAL v2.0 

×

0% READ

>_

AVAILABLE SECTIONS:

────────────────────────────────────────

  * →[01]The Two Architectures
  * →[02]Where Gas Town Diverges
  * →[03]The Chaos Is Real
  * →[04]The Reconciliation
  * →[05]What This Means



────────────────────────────────────────

RELATED POSTS:

────────────────────────────────────────

  * [→[R1]Claude Skills: The Controllability Problem](/blog/claude-skills-controllability-problem/)
  * [→[R2]The Terminal Renaissance](/blog/terminal-renaissance/)
  * [→[R3]The Quiet Features That Shipped With Opus 4.6](/blog/quiet-features-opus-4-6/)



────────────────────────────────────────

TYPE TO SEARCH | ↑↓ NAVIGATE | ENTER SELECT | ESC EXIT 
