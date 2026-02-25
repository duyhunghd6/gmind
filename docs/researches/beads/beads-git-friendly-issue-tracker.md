[ ](/)

Platform

[ Incident management & on-call Move fast when things break ](/incident-management)[ Uptime monitoring The most reliable uptime monitoring ](/uptime)[ Status page Communicate downtime & build trust ](/status-page)

[ Tracing eBPF-based OpenTelemetry-native tracing ](/tracing)[ Log management Collect insights across your stack ](/log-management)[ Infrastructure monitoring OpenTelemetry-native infrastructure monitoring ](/infrastructure-monitoring)

[ Error tracking AI‑native error tracking built on Better Stack ](/error-tracking)[ Data warehouse Time series data warehouse as an API ](/warehouse)

[ Documentation ](https://betterstack.com/docs/) [ Pricing ](/pricing)

Community

[ Community home ](https://betterstack.com/community)[ Guides ](https://betterstack.com/community/guides)[ Questions ](https://betterstack.com/community/questions)[ Comparisons ](https://betterstack.com/community/comparisons)

Company

[ Work at Better Stack ](/careers)[ Engineering ](/careers/engineering)[ Security ](/security)[ Blog ](https://betterstack.com/community/blog)[ Changelog ](https://betterstack.com/tag/changelog)

[ Enterprise ](/enterprise)

[Sign in](/users/sign-in) [Sign up](/users/sign-up)

Platform  [Documentation](https://betterstack.com/docs/) [Pricing](/pricing) Community  Company  [Enterprise](/enterprise)

Back 

[ Incident management & on-call Move fast when things break ](/incident-management)[ Uptime monitoring The most reliable uptime monitoring ](/uptime)[ Status page Communicate downtime & build trust ](/status-page)

[ Tracing eBPF-based OpenTelemetry-native tracing ](/tracing)[ Log management Collect insights across your stack ](/log-management)[ Infrastructure monitoring OpenTelemetry-native infrastructure monitoring ](/infrastructure-monitoring)

[ Error tracking AI‑native error tracking built on Better Stack ](/error-tracking)[ Data warehouse Time series data warehouse as an API ](/warehouse)

Back  [ Community home ](https://betterstack.com/community)[ Guides ](https://betterstack.com/community/guides)[ Questions ](https://betterstack.com/community/questions)[ Comparisons ](https://betterstack.com/community/comparisons)

Back  [ Work at Better Stack ](/careers)[ Engineering ](/careers/engineering)[ Security ](/security)[ Blog ](https://betterstack.com/community/blog)[ Changelog ](https://betterstack.com/tag/changelog)

Guides 

[ Community ](/community/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents) [ Guides ](/community/guides/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents) [ Questions ](/community/questions/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents) [ Comparisons ](/community/comparisons/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents) [ Blog ](/community/blog/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)

  * [ Community ](/community/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)
  * [ Guides ](/community/guides/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)
  * [ Questions ](/community/questions/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)
  * [ Comparisons ](/community/comparisons/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)
  * [ Blog ](/community/blog/?utm_content&utm_medium=guides&utm_source=community&utm_term=beads-issue-tracker-ai-agents)



[Docs](https://betterstack.com/docs/) [Documentation](https://betterstack.com/docs/)

[ Back to AI guides ](/community/guides/ai/)

#  Beads: A Git-Friendly Issue Tracker for AI Coding Agents 

Stanley Ulili

Updated on December 15, 2025 

###### Contents

  * The context window problem
  * Architecture and core concepts
  * Installation and initialization
  * Creating and organizing issues
  * The development workflow
  * Advanced capabilities
  * Comparison with spec-driven development
  * Final thoughts



AI coding agents have transformed software development workflows, offering the ability to write code, fix bugs, and accelerate project timelines. However, **these agents face a fundamental constraint: finite memory, commonly known as the context window**. As conversations grow and files accumulate, the context window fills up. When you start a new session, the agent loses all previous understanding of the project's goals, progress, and architecture. This creates a persistent challenge in maintaining continuity across development sessions.

**Beads addresses this problem through a structured, Git-native issue tracking system** designed specifically for AI agents. This guide explores how Beads provides persistent memory for AI agents, enabling them to manage complex tasks, understand dependencies, and maintain project context across multiple sessions.

## The context window problem

AI agents operate within a defined context window, representing the maximum amount of text the model can consider simultaneously. This includes your prompts, conversation history, and any provided files.

Consider a typical development workflow: you explain requirements to your AI agent, which then generates code. Through iterative refinement and conversation, the context window gradually fills. Once full, you face two options: remove older conversation segments, potentially losing crucial information, or start a completely new chat session. Starting fresh means the agent has no memory of previous work. When asked "What were we working on?", the agent responds as if the project doesn't exist, because from its perspective, the conversation has just begun.

### Limitations of simple task files

A common workaround involves maintaining a `TASKS.md` file that outlines the project plan. This file gets loaded at the start of each session to provide context. While better than nothing, this approach has significant drawbacks:

**Context consumption** : For large projects, the task file itself can be lengthy, consuming substantial portions of the context window before actual work begins.

**Priority and dependency ambiguity** : A flat markdown list doesn't explicitly define relationships between tasks. An agent might struggle to understand that Task C depends on completing Task A and Task B first. This leads to incorrect execution order or failure to grasp project hierarchy.

**State management issues** : The agent must read, parse, and modify the markdown file to update task completion status. This process is error-prone and inefficient, as the entire file requires reprocessing with every update.

Beads provides a more robust, structured, and context-efficient solution to these challenges.

## Architecture and core concepts

Beads combines the speed of a local database with Git's collaborative power through an elegant three-part architecture.

### SQLite database storage

At its core, Beads uses a local SQLite database (`beads.db`) stored within a `.beads` folder in your project directory. This database holds all issues, their statuses, priorities, descriptions, and relationships. SQLite's lightweight nature enables efficient querying, allowing agents to request specific information (such as "what is the next ready task?") without loading the entire project history into context.

### Git-friendly JSON-L format

Storing binary SQLite files directly in Git creates problems. Binary files aren't human-readable, and any change results in a completely new binary file, making merges and conflict resolution nearly impossible. Beads solves this with a companion file: `issues.jsonl`. JSON-L (JSON Lines) is a text format where each line represents a valid JSON object. When changes occur in the SQLite database, a background daemon automatically exports changes as new lines in the `issues.jsonl` file. This text file is the only issue-related file committed to Git.

### Two-way sync mechanism

![A clear diagram illustrating the two-way sync between a remote Git repo and two local users, each with their own JSON-L file and SQLite database.]()![A clear diagram illustrating the two-way sync between a remote Git repo and two local users, each with their own JSON-L file and SQLite database.](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/c697bb33-9d7f-48ae-4791-a535fc886800/orig)

This dual-system architecture enables seamless collaboration:

**Pushing changes** : When User A closes an issue, the local SQLite database updates. The Beads daemon appends a new JSON object representing this change to `issues.jsonl`. User A commits and pushes this text file to the remote repository.

**Pulling changes** : When User B pulls from the repository, they receive the updated `issues.jsonl` file. Their local Beads daemon detects the change and automatically imports the new information, updating their local SQLite database to match.

This architecture ensures all collaborators, whether human or AI, maintain a perfectly synchronized, up-to-date view of project status while leveraging Git's familiar workflow.

## Installation and initialization

Beads is written in Go, requiring Go installation to build from source. Git is also necessary for version control.

The installation process involves cloning the repository and building the `bd` CLI tool:

Copied!
    
    
    git clone https://github.com/sourcegraph/beads.git
    

Copied!
    
    
    cd beads
    

Copied!
    
    
    go install ./cmd/bd
    

This compiles the source and places the `bd` executable in your Go bin directory, which should be in your system's `PATH`.

### Project initialization

Initializing Beads in a project requires running a single command from the project's root directory:

Copied!
    
    
    bd init
    

This creates the `.beads` directory with all necessary files. You can then configure Beads for your environment and AI model:

Copied!
    
    
    bd onboard
    

Alternatively, for specific models like Claude:

Copied!
    
    
    bd setup claude
    

This guides you through API key setup and other configuration details.

### Understanding the `.beads` directory

![A terminal view showing the list of files inside the newly created `.beads` directory.]()![A terminal view showing the list of files inside the newly created `.beads` directory.](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/4b1524f6-d5ea-4d9e-a22f-a41f1cc7bd00/orig)

The `.beads` folder contains several important files:

`beads.db`: The primary SQLite database storing all project issues locally.

`beads.db-shm` and `beads.db-wal`: Temporary files used by SQLite's Write-Ahead Logging (WAL) mode for improved performance and concurrent read access.

`issues.jsonl`: The text-based log of all database changes. This is the file you commit to Git.

`config.yaml`: Local configuration file containing API keys and model preferences. Typically added to `.gitignore` to avoid committing secrets.

`daemon.*`: Files related to the background daemon process (`daemon.log`, `daemon.pid`, `daemon.lock`) handling automatic synchronization between `beads.db` and `issues.jsonl`.

`bd.sock`: A Unix socket file enabling communication between the `bd` CLI, AI agents, and the Beads database.

## Creating and organizing issues

Beads uses a hierarchical issue structure built around epics, tasks, and dependencies. Consider building a React application for viewing Homebrew packages as an example project.

### Defining the project epic

An epic represents a high-level project goal. Creating an epic involves specifying its title, type, priority, and description:

Copied!
    
    
    bd create "Brew UI" -t epic -p 1 --description="A React application to view, search, and manage Homebrew-installed packages with beautiful UI and dependency visualization"
    

This command creates an issue with: \- Title: "Brew UI" \- Type: `epic` (a large, multi-task feature) \- Priority: `P1` (highest priority) \- Detailed description for AI understanding

Verifying the creation:

Copied!
    
    
    bd stats
    

Output
    
    
    Total Issues: 1
    Open: 1
    Closed: 0
    

### AI-driven task breakdown

Rather than manually decomposing epics into subtasks, you can delegate this planning to an AI agent. The agent queries the database to find the epic, analyzes its description, formulates a plan, and creates linked subtasks automatically.

An agent given the prompt "Read the epic from beads and create issues under the epic that make sense to complete the task" will:

  1. Query the database for the epic
  2. Analyze its requirements
  3. Generate logical subtasks (setup, component creation, dependency visualization)
  4. Execute `bd create` commands linking new issues to the parent epic



### Visualizing project structure

![The terminal output of `bd dep tree`, showing a clean, hierarchical view of the main epic and its sub-t_56.jpg]()![The terminal output of `bd dep tree`, showing a clean, hierarchical view of the main epic and its sub-t_56.jpg](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/2cd19877-964e-44c0-75d7-f8ae4f203400/orig)

Viewing all issues in a flat list:

Copied!
    
    
    bd list
    

For a hierarchical view showing relationships:

Copied!
    
    
    bd dep tree brew-ui-eci --direction=both
    

The tree view displays project structure and task relationships clearly, providing shared understanding for both human developers and AI agents.

## The development workflow

Beads enables a structured, dependency-aware workflow for AI agents.

### Identifying ready tasks

The `bd ready` command queries the database for all open issues with no uncompleted dependencies. This ensures agents always work on tasks in the correct order:

Copied!
    
    
    bd ready
    

Output
    
    
    ID: setup-react-xyz
    Title: Set up React project structure
    Priority: P1
    Status: open
    
    ID: install-deps-abc
    Title: Install required dependencies
    Priority: P1
    Status: open
    

### The agent work loop

An AI agent's workflow becomes a predictable cycle:

  1. **Check for ready work** : Run `bd ready` to get actionable tasks
  2. **Select a task** : Pick the highest priority task from the list
  3. **Update status** : Mark the task as in progress



Copied!
    
    
    bd update <issue-id> --status in_progress
    

  1. **Perform the work** : Write code, create files, or complete required actions
  2. **Mark as complete** : Close the issue after verification



Copied!
    
    
    bd close <issue-id> --reason "Implemented"
    

  1. **Repeat** : Return to step 1, as completing one task may unblock others



This loop continues until `bd ready` returns no open issues, indicating project completion.

## Advanced capabilities

### Web interface

![A screenshot of the clean and simple Beads web UI, listing issues with their status, priority, and type.]()![A screenshot of the clean and simple Beads web UI, listing issues with their status, priority, and type.](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/bca01a60-0f24-46fb-aa05-75a92fad0400/orig)

While the CLI provides power and precision, Beads includes a web UI for graphical overview. The interface presents a table-based view of all issues, allowing quick assessment of project status without terminal commands.

### Jira integration

For teams using Jira as their primary project management tool, Beads provides scripts enabling two-way synchronization. You can import issues from Jira projects into your local Beads database and export Beads-created issues back to Jira. This bridges the gap between agent-friendly local workflows and company-wide project tracking systems.

### Database compaction

![An animation showing the database size being reduced after running the "Compress Closed Issues" action.]()![An animation showing the database size being reduced after running the "Compress Closed Issues" action.](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/c54ae84a-10eb-40e6-f602-2f1e37474000/orig)

Large projects accumulate thousands of issues over time. The `bd compact` command implements "agentic memory decay" to manage database growth:

  1. **Analysis** : Identify old, closed issues (such as those closed more than 30 days ago)
  2. **Summarization** : Use an LLM to read full issue content and generate concise summaries
  3. **Application** : Replace detailed issue content with generated summaries, marking them as "compacted"



This intelligently reduces database size by discarding fine-grained details of completed work while preserving essential context, similar to human memory consolidation.

## Comparison with spec-driven development

Beads differs significantly from spec-driven development methodologies in its approach to managing project context.

### Context efficiency

**Spec-driven development** relies on detailed markdown files describing the entire project. Agents often need to load complete spec files into their context window, which is inefficient and leaves less room for code and conversation.

**Beads** treats the project plan as a queryable database. Agents make small, targeted queries to retrieve only information needed for immediate tasks. This is substantially more context-efficient, especially for large projects. Developers can clear context freely, knowing agents can restore understanding through database queries.

### Dependency management

**Spec-driven development** often describes dependencies implicitly through natural language. Agents must infer that one section depends on another, which can be unreliable and error-prone.

**Beads** makes dependencies explicit first-class citizens of the data model. Relationships are stored structurally in the database. When agents query the dependency graph, there's no ambiguity about execution order.

![The dependency graph shown in the terminal, highlighting how explicit relationships guide the agent.]()![The dependency graph shown in the terminal, highlighting how explicit relationships guide the agent.](https://imagedelivery.betterstackcdn.com/xZXo0QFi-1_4Zimer-T0XQ/bb0e5075-3617-414e-cac8-63c3009c4100/orig)

### Hybrid approaches

A hybrid methodology combines strengths of both approaches:

  1. **Plan with specs** : Create detailed markdown files outlining project goals, user stories, and technical requirements
  2. **Execute with Beads** : Feed the initial plan to an AI agent, instructing it to convert the plan into structured epics, tasks, and dependencies within Beads
  3. **Develop** : Use Beads workflow for day-to-day development, leveraging its context efficiency and robust dependency management



This approach provides detailed upfront planning while maintaining execution efficiency and persistent memory throughout development.

## Final thoughts

Beads transforms AI coding agent collaboration by replacing chat logs and markdown files with a version-controlled database, providing persistent memory for larger projects.

**It reduces context loss, supports dependency tracking, and allows easy collaboration with Git sync**. Its SQLite-JSONL design balances local speed and team collaboration.

With agents querying only needed info, Beads saves context space and makes AI assistants more reliable and long-term.

Got an article suggestion? [Let us know](mailto:hello@betterstack.com?subject=Suggestion%20for%20Beads%3A%20A%20Git-Friendly%20Issue%20Tracker%20for%20AI%20Coding%20Agents&body=)

[ ](https://twitter.com/share?ref_src=twsrc%5Etfw&url=https://betterstack.com/community/guides/ai/beads-issue-tracker-ai-agents/&text=Beads%3A+A+Git-Friendly+Issue+Tracker+for+AI+Coding+Agents+%7C+Better+Stack+Community&via=betterstackhq) [ ](https://www.facebook.com/sharer/sharer.php?u=https://betterstack.com/community/guides/ai/beads-issue-tracker-ai-agents/) [ ](mailto:?subject=Beads%3A%20A%20Git-Friendly%20Issue%20Tracker%20for%20AI%20Coding%20Agents&body=https%3A%2F%2Fbetterstack.com%2Fcommunity%2Fguides%2Fai%2Fbeads-issue-tracker-ai-agents%2F)

Next article

[ TanStack AI: Building Type-Safe, Provider-Agnostic AI Applications Learn how TanStack AI provides a unified, type-safe interface for building AI applications with multiple providers. Explore streaming chat endpoints, tool usage, and function calling with full TypeScript support. → ](/community/guides/ai/tanstack-ai/)

[ ![Licensed under CC-BY-NC-SA]()](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

  1. [Retrieval-Augmented Generation]()

     1. [Building Your First RAG Application](/community/guides/ai/building-rag-application/)

  2. [Model Context Protocol]()

     1. [Understanding MCP](/community/guides/ai/mcp-explained/)

  3. [AI Comparisons]()

     1. [Agentic AI vs Generative AI](/community/guides/ai/agentic-ai-vs-generative-ai/)

     2. [Lovable vs GitHub Spark](/community/guides/ai/lovable-vs-github-spark/)

     3. [GPT-4 vs GPT-4o](/community/guides/ai/gpt-4-vs-gpt-4o/)

     4. [Replit vs GitHub Spark](/community/guides/ai/replit-vs-github-spark/)

     5. [Bolt.new vs GitHub Spark](/community/guides/ai/bolt-new-vs-github-spark/)

     6. [Replit vs Lovable](/community/guides/ai/replit-vs-lovable/)

     7. [GPT-5.3-Codex vs. Claude Opus 4.6](/community/guides/ai/gpt-5-3-codex-vs-claude-opus-4-6/)

     8. [MiniMax M2.5 vs. Claude Opus 4.6](/community/guides/ai/minimax-m2-5-claude-opus/)

     9. [The Superpowers Framework: Structured Development for AI Coding Agents](/community/guides/ai/superpowers-framework/)

     10. [Playwright CLI vs. MCP](/community/guides/ai/playwright-cli-vs-mcp-browser/)

  4. [New Tools & Features]()

     1. [A Look Into Claude Opus 4.5](/community/guides/ai/new-features-ai/claude-opus-4-5/)

     2. [Understanding STARFlow](/community/guides/ai/starflow-apple-open-source/)

     3. [What Is Grok 4.1? A Look at xAI’s Latest AI Upgrade](/community/guides/ai/grok-4-1/)

     4. [BettaFish Explained: How This Multi-Agent AI Analyzes Public Opinion](/community/guides/ai/bettafish-multi-agent/)

     5. [A Look into Gemini 3 Flash](/community/guides/ai/gemini-3-flash-review/)

  5. [AI Development]()

     1. [Supermemory: Adding Long-Term Memory to AI Apps](/community/guides/ai/memory-with-supermemory/)

     2. [IBM Granite models](/community/guides/ai/ibm-granite/)

     3. [Introduction to Google's Gemini 3](/community/guides/ai/gemini-3/)

     4. [Token-Efficient LLM Workflows with TOON](/community/guides/ai/toon-explained/)

     5. [From OpenAI Swarm to AgentKit](/community/guides/ai/openai-swarm-to-agentkit/)

     6. [Cloudflare Vibe SDK: Build AI Web Apps](/community/guides/ai/cloudflare-vibe-sdk/)

     7. [Open-Source Workflow Automation with Activepieces](/community/guides/ai/activepieces-workflow-automation/)

     8. [Beads: A Git-Friendly Issue Tracker for AI Coding Agents](/community/guides/ai/beads-issue-tracker-ai-agents/)

     9. [TanStack AI: Building Type-Safe, Provider-Agnostic AI Applications](/community/guides/ai/tanstack-ai/)

     10. [Microsoft's VibeVoice: Open-Source AI Voice Generation Framework](/community/guides/ai/microsoft-vibevoice/)

     11. [Persistent Memory in Claude Code with claude-mem](/community/guides/ai/claude-mem/)

     12. [just-bash: TypeScript Bash Simulation for AI Agents](/community/guides/ai/just-bash-simulated/)

     13. [Continue.dev: Open-Source AI Code Agent Guide](/community/guides/ai/continue-dev-ai/)

     14. [Multi-Agent AI Development: How 16 Claude Agents Built a C Compiler](/community/guides/ai/anthropic-ai-agents-c-compiler/)

     15. [Aider: Terminal-Based AI Pair Programming Guide](/community/guides/ai/aider-ai-pair-programming/)

     16. [Pencil: Agent-Driven Design Tool for Developers](/community/guides/ai/pencil-ai/)

     17. [GitHub Agentic Workflows: Automating DevOps with AI-Powered GitHub Actions](/community/guides/ai/github-agentic-workflows/)

     18. [WebMCP: The Future of AI and Web Interaction Guide](/community/guides/ai/webmcp-ai-web/)




Solutions

[OpenTelemetry tracing](/tracing)   
[Log management](/telemetry)   
[Infrastructure monitoring](/infrastructure-monitoring)   
[Error tracking](/error-tracking)   
[Incident management](/incident-management)   
[Uptime monitoring](/uptime)   
[Status page](/status-page)   
[Data warehouse](/warehouse)

Company

[Work at Better Stack](/careers)   
[Engineering](/careers/engineering)   
[Security](/security)

Resources

[Help & Support](/help)   
[Documentation](https://betterstack.com/docs/)   
[Enterprise](/enterprise)   
[Integrations](/integrations)   
[Dashboards](/dashboards)

Company

[Work at Better Stack](/careers)   
[Engineering](/careers/engineering)   
[Security](/security)

Resources

[Help & Support](/help)   
[Documentation](https://betterstack.com/docs/)   
[Enterprise](/enterprise)   
[Integrations](/integrations)   
[Dashboards](/dashboards)

Community

[What Is Incident Management? Beginner’s Guide](https://betterstack.com/community/guides/incident-management/what-is-incident-management/) [Best Datadog Alternatives to Consider in 2026](https://betterstack.com/community/comparisons/datadog-log-management-alternatives/) [8 Best Free & Open Source Status Page Tools in 2026](https://betterstack.com/community/comparisons/free-status-page-tools/) [13 Best Sentry Alternatives in 2026](https://betterstack.com/community/comparisons/sentry-alternatives/) [15 Best Grafana Alternatives in 2026](https://betterstack.com/community/comparisons/grafana-alternatives/) [The 10 Best Incident.io Alternatives in 2026](https://betterstack.com/community/comparisons/incident-io-alternative/) [5 Most Used Incident Management Tools](https://betterstack.com/community/comparisons/incident-management-tools/)

30x cheaper than Datadog. Predictable pricing. Exceptional customer support. 

[+1 (628) 900-3830](tel:+1%20\(628\)%20900-3830) [hello@betterstack.com](mailto:hello@betterstack.com)

[](https://www.instagram.com/betterstackhq/) [](https://www.tiktok.com/@betterstack) [](https://www.linkedin.com/company/betterstack) [](https://twitter.com/betterstackhq) [](https://github.com/BetterStackHQ/) [](https://www.youtube.com/@betterstack)

[Terms of Use](/terms) [Privacy Policy](/privacy) [GDPR](/dpa) [ System status ](https://status.betterstack.com/)

[](https://www.instagram.com/betterstackhq/) [](https://www.tiktok.com/@betterstack) [](https://www.linkedin.com/company/betterstack) [](https://twitter.com/betterstackhq) [](https://github.com/BetterStackHQ/) [](https://www.youtube.com/@betterstack)

© 2026 Better Stack, Inc. 

### Please accept cookies

We use cookies to authenticate users, improve the product user experience, and for [personalized ads](https://business.safety.google/privacy/). [Learn more.](/privacy)

Deny Accept required Accept all
