# gmind - Memory Management CLI for Agentic Coding

**gmind** is a specialized Command Line Interface (CLI) designed to manage and orchestrate memory for AI agents within the Agentic Coding ecosystem. This tool bridges the gap between active agent working sessions and long-term project knowledge by using a hybrid memory management approach.

## 🚀 Hybrid Approach

`gmind` uses a multi-layered, combined memory management approach, ensuring that AI agents always have the precise context they need, at the right time:

1.  **Agent Sessions (Short-term Context):** Tracks and manages the dynamic memory of agent interaction sessions, including conversation history, current work state, and immediate workspace context.
2.  **Project Documents (Long-term Static Context):** Integrates with comprehensive project documentation (the `docs/` directory, architectural decisions, rule files) to ground agents in the overall system design and principles.
3.  **Codebase Analyst (Structural Context):** Analyzes and maps the source code structure, allowing agents to understand the relationships between modules, components, and various dependencies within the project through Software Architecture Recovery (SAR).
4.  **Beads CLI Integration (Graph-based Issue Tracking):** Integrates with `bd` (Beads), a distributed, git-based graph issue tracker. This allows agents to seamlessly interact with task dependencies, bug reports, and project milestones as part of their working memory.

## 📦 Key Features

- **Context Unification:** Aggregates memory from sessions, documents, source code, and Beads into a unified context payload for LLMs.
- **Graph RAG Foundation:** Leverages a Graph-based Retrieval Augmented Generation (Graph RAG) architecture to connect individual concepts across the entire project lifecycle.
- **MCP Compatible:** Designed for seamless integration through the Model Context Protocol (MCP) as a dedicated set of Agent Skills.
- **High Performance:** Optimized for speed to minimize latency in the Agent Flywheel.

## 📚 References

- [Research: Challenges of Building Memory_Graph RAG](docs/researches/Thách%20Thức%20Xây%20Dựng%20Memory_Graph%20RAG.md)
- [Research: Agentic Coding MCP Memory Research](docs/researches/Nghiên%20cứu%20bộ%20nhớ%20agentic%20coding%20MCP.md)
- [Beads CLI Integration](docs/researches/beadsCLI-README.md)

## 🛠️ Usage Guide

_(Installation and usage instructions will be updated as the CLI is developed)_

## 📄 License

MIT License
