# gmind - Memory Management CLI for Agentic Coding

**gmind** is a specialized Command Line Interface (CLI) designed to manage and orchestrate memory for AI agents in an Agentic Coding ecosystem. It bridges the gap between active agent sessions and long-term project knowledge by employing a hybrid memory management approach.

## 🚀 The Hybrid Approach

`gmind` utilizes a multi-layered, hybrid approach to memory management, ensuring that AI agents have the precise context they need, exactly when they need it:

1.  **Agent Sessions (Short-term context):** Tracks and manages the active memory of ongoing agent interactions, including conversation history, current task state, and immediate workspace context.
2.  **Project Documents (Long-term static context):** Integrates with comprehensive project documentation (`docs/`, architectural decision records, rule files) to ground the agents in the broader system design and guidelines.
3.  **Codebase Analyst (Structural context):** Analyzes and maps the codebase structure, enabling agents to understand the relationships between different modules, components, and dependencies within the project via Software Architecture Recovery (SAR).
4.  **Beads CLI Integration (Graph-based Issue Tracking):** Integrates with `bd` (Beads), the distributed, git-backed graph issue tracker. This allows agents to seamlessly interact with task dependencies, bug reports, and project milestones as part of their working memory.

## 📦 Features

- **Context Unification:** Aggregates memory from sessions, docs, code, and Beads into a cohesive context payload for LLMs.
- **Graph RAG Foundation:** Leverages graph-based retrieval augmented generation to connect disparate concepts across the project lifecycle.
- **MCP Compatibility:** Designed to integrate seamlessly via the Model Context Protocol (MCP) as a dedicated set of Agent Skills.
- **High Performance:** Built for speed to minimize latency in the Agent Flywheel.

## 📚 Documentation

- [Research: Thách Thức Xây Dựng Memory_Graph RAG](docs/researches/Thách%20Thức%20Xây%20Dựng%20Memory_Graph%20RAG.md)
- [Research: Nghiên cứu bộ nhớ agentic coding MCP](docs/researches/Nghiên%20cứu%20bộ%20nhớ%20agentic%20coding%20MCP.md)
- [Beads CLI Integration](docs/researches/beadsCLI-README.md)

## 🛠️ Getting Started

_(Installation and usage instructions will be added here as the CLI is developed)_

## 📄 License

MIT License
