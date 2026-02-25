[ joe blubaugh ](/)

  * [About](/about)
  * [Professional](/professional)


  * [About](/about)
  * [Professional](/professional)



# Introducing nvim-beads: Manage beads in neovim

## 

2026-01-14 

A few days ago my [co-worker Bob](https://www.linkedin.com/in/bobfromdenver) turned me on to [Beads](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a). Beads is a step up from things like `PLAN.md` when managing work for coding agents, because it provides more structure, is easy for agents to parse, and provides things like progress tracking for multi-agent workflows.

I was intrigued by the setup because it seemed like a way to improve my agent’s ability to work autonomously, but I needed a way to try it out without stepping on top of some complex multi-person projects at work. I decided to use `bd` and a coding agent to implement a neovim plugin for managing beads.

The result is [nvim-beads](https://github.com/joeblubaugh/nvim-beads). Implementing this took about 106 commits over 3 hours of pairing between me and the Claude CLI. It’s written in technologies I know about but am not good at: Lua and the Neovim API. There’s no way I would have built something with this level of complexity in this environment in less than a week of good, solid work. It has tests - which I wouldn’t know how to write.

I don’t think it would have gotten built without Beads, either. The workflow of building a `PLAN.md` and then having an agent execute it works OK, but if the plan is large, you’re wasting a lot of context using it over and over again. Beads’ structure wastes less context on large plans, and make it easy to either blow away an agent and start again, or makes conversation compaction less of an issue. It also makes parallel agent workflows on multiple git worktrees easier to manage, because the agents can share beads state on one beads-specific branch while doing their work implementing those beads on feature branches.

I think the tech is worth trying, and [this post from the author Steve Yegge](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a) is a good place to start. After that, [read the best practices post](https://steve-yegge.medium.com/beads-best-practices-2db636b9760c).

Other posts

* * *

[ ← Multi-agent coding and the resurgence of the terminal ](/blog/2026_02_multi-agent-coding-and-the-resurgence-of-the-terminal/) [ Podcasting is dominated by warm applesauce → ](/blog/2026_01_podcasting-is-dominated-by-warm-applesauce/)

© 2016-2026 Joe Blubaugh

[Find me on Hachyderm.io](https://hachyderm.io/@joeblubaugh)
