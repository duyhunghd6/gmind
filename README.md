<div align="center">

<!-- <img src="assets/FastCode.svg" alt="FastCode-CLI Logo" width="200"/> -->

<!-- # FastCode-CLI -->

### FastCode-CLI: Accelerating and Streamlining Your Code Understanding

| **⚡ Single Binary** | **💰 Cost Efficient** | **🚀 Goroutine Fast** |

[![Go 1.24+](https://img.shields.io/badge/go-1.24+-00ADD8.svg?logo=go&logoColor=white)](https://go.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Based on FastCode](https://img.shields.io/badge/based%20on-HKUDS%2FFastCode-blueviolet)](https://github.com/HKUDS/FastCode)

[Features](#-why-fastcode-cli) • [Quick Start](#-quick-start) • [Installation](#-installation) • [MCP Server](#mcp-server-use-in-cursor--claude-code--windsurf--antigravity) • [Documentation](#-how-it-works)

</div>

---

## 🎯 Why FastCode-CLI?

FastCode-CLI is a **Go rewrite** of [HKUDS/FastCode](https://github.com/HKUDS/FastCode) — a token-efficient framework for comprehensive code understanding and analysis: delivering **superior speed**, **exceptional accuracy**, and **cost-effectiveness** for large-scale codebases and software architectures.

🚀 **Zero-Dependency Deployment** — A single compiled binary. No Python, no pip, no venv, no Docker required. Just `go build` and ship.

💰 **Significant Cost Savings** — Inherits the same 44-55% cost reduction vs Cursor/Claude Code through smart structural navigation and budget-aware retrieval.

⚡ **Goroutine Concurrency** — Parallel AST parsing, concurrent embedding calls, and multi-file graph building. What takes Python 20s takes Go ~2s.

🎯 **Highest Accuracy** — Same three-phase framework that outperforms Cursor and Claude Code with the highest accuracy score, now compiled to native machine code.

<!-- <div align="center">
<img src="assets/performance.png" alt="FastCode Performance vs Cost" width="850"/>
</div> -->

---

## Key Features of FastCode-CLI

### 🎯 Core Performance Advantages

- 2-4x Faster than competitors (Cursor/Claude Code) — inherited from FastCode framework
- 44-55% Cost Reduction compared to alternatives
- Highest Accuracy Score across benchmarks
- Up to 10x Token Savings through smart structural navigation

### 🛠️ Technical Capabilities

- Large-Scale Repository Analysis — Handle massive codebases efficiently with goroutine concurrency
- Multi-Language Support — Go, Python, JavaScript, TypeScript, Java, Rust, C/C++, C#
- Multi-Repository Reasoning — Cross-repo dependency analysis _(planned)_
- Small Model Support — Local model compatibility (Ollama, qwen3-coder-30b, etc.)

### 💻 User Experience

- **MCP Server** — Use FastCode-CLI directly through MCP integration (Cursor, Claude Code, Windsurf, Antigravity)
- **Powerful CLI** — Cobra-based CLI with `index`, `query`, `serve-mcp` subcommands
- **REST API** — Easy workflow integration _(planned)_
- **Smart Structural Navigation** — Load only what you need, skim the rest

---

## 🎥 See FastCode in Action

<div align="center">

[![Watch FastCode Demo](https://img.youtube.com/vi/NwexLWHPBOY/0.jpg)](https://youtu.be/NwexLWHPBOY)

**Click to watch the original FastCode in action** — The Go version implements the same three-phase framework with identical analysis capabilities.

---

</div>

### Core Technologies Behind FastCode-CLI

FastCode-CLI implements the same groundbreaking **three-phase framework** that transforms how LLMs understand and navigate codebases — rewritten in idiomatic Go:

<!-- <p align="center">
  <img src="assets/framework.png" alt="FastCode Framework" width="100%"/>
</p> -->

## 🏗️ Semantic-Structural Code Representation

### Multi-layered codebase understanding for comprehensive analysis

- **🔍 Hierarchical Code Units** — Advanced multi-level indexing spanning files, classes, functions, and documentation using tree-sitter AST-based parsing across 8+ programming languages. Powered by native [go-tree-sitter](https://github.com/smacker/go-tree-sitter) CGo bindings for maximum performance.

- **🔗 Hybrid Index** — Seamlessly combines semantic embeddings with keyword search (BM25) for robust and precise code retrieval. Vector store uses in-memory cosine similarity with batch embedding via OpenAI-compatible APIs. No FAISS, no PyTorch — just lean Go math.

- **📊 Multi-Layer Graph Modeling** — Three interconnected relationship graphs (Call Graph, Dependency Graph, Inheritance Graph) enabling structural navigation across the entire codebase. Built with native Go graph data structures for zero-dependency traversal.

### 🧭 Lightning-Fast Codebase Navigation

Finding the right code without opening every file — at lightning speed

- **⚡ Two-Stage Smart Search** — Like having a research assistant that first finds potentially relevant code via hybrid retrieval (vector + BM25), then ranks and organizes the best matches for your specific question using LLM-assisted re-ranking.

- **📁 Safe File Browsing** — Explores your project structure securely via Go's `filepath.Walk`, understanding folder organization and file patterns while respecting `.gitignore` without compromising security.

- **🌐 Following Code Connections** — Traces how code pieces connect (up to N hops away) via multi-layer graph traversal, like following a trail of breadcrumbs through your codebase — across imports, function calls, and inheritance chains.

- **🎯 Code Skimming** — Instead of reading entire files, FastCode-CLI just looks at the "headlines" — function names, class definitions, and type hints. This is like reading a book's chapter titles instead of every page, saving massive amounts of processing power.

### 💰 Cost-Efficient Context Management

Getting maximum insight while minimizing costs — automatically

- **📈 Budget-Aware Decision Making** — Considers five key factors before processing: confidence level, query complexity, codebase size, resource cost, and iteration count. Like a cost-conscious financial advisor that weighs all options before making decisions.

- **🔄 Resource-Optimized Learning** — Continuously adapts its approach in real-time, getting more efficient about what information to gather and when to stop. Think of it as an AI that maximizes value and becomes more cost-effective with every query.

- **🎯 Value-First Selection** — Prioritizes high-impact, low-cost information first, like choosing the ripest fruit at the best price. This cost-optimized approach ensures you get maximum value for every token spent until the perfect stopping point is reached.

---

## 📊 Benchmark Performance

FastCode-CLI inherits the same three-phase framework rigorously tested on four major benchmarks representing real-world software engineering challenges:

### 🎯 Evaluation Datasets

| Benchmark    | Focus Area               | What It Tests                        |
| ------------ | ------------------------ | ------------------------------------ |
| SWE-QA       | Software Engineering Q&A | Complex technical question answering |
| LongCodeQA   | Extended Code Analysis   | Long-context code understanding      |
| LOC-BENCH    | Code Localization        | Bug detection & feature requests     |
| GitTaskBench | Real-World Tasks         | Production repository workflows      |

### 🏆 Outstanding Results

- ✅ **Superior Accuracy** — Consistently outperforms state-of-the-art baselines across all benchmarks

- ✅ **10x Token Efficiency** — Achieves better results while using up to 90% fewer tokens

- ✅ **Real-World Validation** — Proven performance on actual production codebases and workflows

### 🐹 Go-Specific Advantages

| Aspect            | Python (FastCode)                | Go (FastCode-CLI)                      |
| ----------------- | -------------------------------- | -------------------------------------- |
| **Deployment**    | Python 3.12 + pip + venv + FAISS | Single binary (`go build`)             |
| **AST Parsing**   | `tree_sitter` Python bindings    | `go-tree-sitter` native CGo bindings   |
| **Vector Search** | FAISS (NumPy/C++) + `.pkl` blobs | In-memory cosine similarity (pure Go)  |
| **Text Search**   | Custom BM25 implementation       | BM25 via native tokenizer              |
| **Graph Library** | NetworkX                         | Native Go graph implementation         |
| **LLM Client**    | `openai` Python SDK              | Custom HTTP client (OpenAI-compatible) |
| **CLI Framework** | `argparse`                       | Cobra                                  |
| **MCP Server**    | `fastmcp` Python library         | Custom JSON-RPC over stdio             |
| **Cache**         | Pickle / `.pkl` files            | Gob encoding (`.gob` files)            |
| **Concurrency**   | `asyncio`                        | Goroutines + channels                  |
| **Startup Time**  | ~2s (Python interpreter)         | ~10ms (compiled binary)                |
| **Memory**        | ~500MB+ (FAISS + PyTorch)        | ~50MB (lean Go runtime)                |

---

## 🚀 Quick Start

Get FastCode-CLI running in under 1 minute:

```bash
# 1. Clone the repository
git clone https://github.com/duyhunghd6/fastcode-cli.git
cd fastcode-cli

# 2. Build the binary
go build -o fastcode ./cmd/fastcode

# 3. Configure your API keys
cp .env.example .env
# Edit .env with your API keys

# 4. Index and query your codebase
./fastcode index /path/to/your/repo
./fastcode query --repo /path/to/your/repo "How does authentication work?"
```

That's it — no virtual environments, no dependency resolution, no Docker. 🎉

---

## 📦 Installation

FastCode-CLI supports **Linux**, **macOS**, and **Windows**. Choose your platform below:

> **💡 Prerequisites:** Only [Go 1.24+](https://go.dev/dl/) and Git are required. No Python, no pip, no venv.

<details>
<summary><b>🐧 Linux Installation</b></summary>

### Prerequisites

- Go 1.24 or higher
- Git

### Step-by-Step Guide

1. **Clone FastCode-CLI**

   ```bash
   git clone https://github.com/duyhunghd6/fastcode-cli.git
   cd fastcode-cli
   ```

2. **Build the Binary**

   ```bash
   go build -o fastcode ./cmd/fastcode

   # Optional: Install globally
   sudo mv fastcode /usr/local/bin/
   ```

3. **Configure Environment**

   ```bash
   cp .env.example .env
   nano .env  # or use your preferred editor
   ```

   Add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MODEL=gpt-4o
   BASE_URL=https://api.openai.com/v1
   ```

4. **Launch FastCode-CLI**

   ```bash
   # Index a codebase
   ./fastcode index /path/to/your/repo

   # Query the codebase
   ./fastcode query --repo /path/to/your/repo "Your question here"

   # Or start the MCP server
   ./fastcode serve-mcp --port 8080
   ```

</details>

<details>
<summary><b>🍎 macOS Installation</b></summary>

### Prerequisites

- Go 1.24 or higher
- Git

### Step-by-Step Guide

1. **Clone FastCode-CLI**

   ```bash
   git clone https://github.com/duyhunghd6/fastcode-cli.git
   cd fastcode-cli
   ```

2. **Build the Binary**

   ```bash
   go build -o fastcode ./cmd/fastcode

   # Optional: Install globally
   sudo mv fastcode /usr/local/bin/
   ```

3. **Configure Environment**

   ```bash
   cp .env.example .env
   nano .env  # or use: open -e .env
   ```

   Add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MODEL=gemini-3-flash
   BASE_URL=https://...
   ```

4. **Launch FastCode-CLI**

   ```bash
   # Index a codebase
   ./fastcode index /path/to/your/repo

   # Query the codebase
   ./fastcode query --repo /path/to/your/repo "Your question here"

   # Or start the MCP server
   ./fastcode serve-mcp --port 8080
   ```

**Note for Apple Silicon (M1/M2/M3/M4):** Go natively supports ARM64. No special configuration needed — `go build` produces an ARM binary automatically.

</details>

<details>
<summary><b>💻 Windows Installation</b></summary>

### Prerequisites

- Go 1.24 or higher
- Git

### Step-by-Step Guide

1. **Clone FastCode-CLI**

   ```cmd
   git clone https://github.com/duyhunghd6/fastcode-cli.git
   cd fastcode-cli
   ```

2. **Build the Binary**

   ```cmd
   go build -o fastcode.exe ./cmd/fastcode
   ```

3. **Configure Environment**

   ```cmd
   copy .env.example .env
   notepad .env
   ```

   Add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MODEL=qwen/qwen3-coder-30b-a3b-instruct
   BASE_URL=https://api.openai.com/v1
   ```

4. **Launch FastCode-CLI**

   ```cmd
   REM Index a codebase
   fastcode.exe index C:\path\to\your\repo

   REM Query the codebase
   fastcode.exe query --repo C:\path\to\your\repo "Your question here"

   REM Or start the MCP server
   fastcode.exe serve-mcp --port 8080
   ```

**Troubleshooting:**

- If CGo build fails: Ensure GCC is installed (via [MSYS2](https://www.msys2.org/) or MinGW)
- For permission errors, run Command Prompt as Administrator
- Tree-sitter requires a C compiler — follow the [go-tree-sitter build instructions](https://github.com/smacker/go-tree-sitter#installation)

</details>

---

## 🎮 Usage

### Command Line Interface (Recommended)

The CLI provides the most streamlined experience:

```bash
# Single repository indexing
./fastcode index /path/to/repo

# Force re-indexing (ignore cache)
./fastcode index /path/to/repo --force

# Index with JSON output (machine-readable)
./fastcode index /path/to/repo --json

# Skip embedding generation (BM25-only mode, no API key needed for indexing)
./fastcode index /path/to/repo --no-embeddings

# Use custom embedding model
./fastcode index /path/to/repo --embedding-model text-embedding-3-large

# Use custom cache directory
./fastcode index /path/to/repo --cache-dir /tmp/fastcode-cache
```

**Querying:**

```bash
# Query the indexed codebase
./fastcode query --repo /path/to/repo "How does the authentication flow work?"

# Query with JSON output (for automation and scripting)
./fastcode query --repo /path/to/repo --json "Where is the payment logic?"
```

**Start asking questions like:**

- "Where is the authentication logic implemented?"
- "How does the payment processing flow work?"
- "What files would be affected if I change the User model?"
- "Explain the dependency between module A and module B"

<details>
<summary><b>REST API</b></summary>

> **Note:** The REST API server is planned for a future release. The Python FastCode REST API specification is included here for reference — the Go version will implement the same endpoints.

Integrate FastCode-CLI into your tools with the comprehensive REST API:

```bash
# Start the API server (planned)
./fastcode serve-api --host 0.0.0.0 --port 8000
```

The API will provide all features available in the CLI. Visit http://localhost:8000/docs for interactive API documentation.

**Key API Endpoints (Planned):**

<details>
<summary><b>Repository Management</b></summary>

```bash
# List available and loaded repositories
GET /repositories

# Load a repository from URL or local path
POST /load
{
  "source": "https://github.com/user/repo",
  "is_url": true
}

# Index the loaded repository
POST /index?force=false

# Load and index in one call
POST /load-and-index
{
  "source": "/path/to/repo",
  "is_url": false
}

# Load multiple existing indexed repositories
POST /load-repositories
{
  "repo_names": ["repo1", "repo2"]
}

# Index multiple repositories at once
POST /index-multiple
{
  "sources": [
    {"source": "https://github.com/user/repo1", "is_url": true},
    {"source": "/path/to/repo2", "is_url": false}
  ]
}

# Delete repositories and their indexes
POST /delete-repos
{
  "repo_names": ["repo1", "repo2"],
  "delete_source": true
}

# Get repository summary
GET /summary
```

</details>

<details>
<summary><b>Query & Conversation</b></summary>

```bash
# Query repository (single response)
POST /query
{
  "question": "How does authentication work?",
  "filters": null,
  "repo_filter": ["repo1"],
  "multi_turn": false,
  "session_id": null
}

# Query with streaming response (SSE)
POST /query-stream
{
  "question": "Explain the database schema",
  "multi_turn": true,
  "session_id": "abc123"
}

# Start a new conversation session
POST /new-session?clear_session_id=old_session

# List all conversation sessions
GET /sessions

# Get conversation history
GET /session/{session_id}

# Delete a conversation session
DELETE /session/{session_id}
```

</details>

<details>
<summary><b>System & Status</b></summary>

```bash
# Health check
GET /health

# Get system status
GET /status?full_scan=false

# Clear cache
POST /clear-cache

# Get cache statistics
GET /cache-stats

# Refresh index cache
POST /refresh-index-cache

# Unload current repository
DELETE /repository
```

</details>

**Example Usage:**

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    // Load and index a repository
    loadBody, _ := json.Marshal(map[string]interface{}{
        "source": "https://github.com/user/repo",
        "is_url": true,
    })
    http.Post("http://localhost:8000/load-and-index", "application/json", bytes.NewBuffer(loadBody))

    // Query the repository
    queryBody, _ := json.Marshal(map[string]interface{}{
        "question":   "Where is the main entry point?",
        "multi_turn": false,
    })
    resp, _ := http.Post("http://localhost:8000/query", "application/json", bytes.NewBuffer(queryBody))

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result["answer"])
    fmt.Printf("Tokens used: %v\n", result["total_tokens"])
}
```

</details>

<a id="mcp-server-use-in-cursor--claude-code--windsurf--antigravity"></a>

<details>
<summary><b>MCP Server (Use in Cursor / Claude Code / Windsurf / Antigravity)</b></summary>

FastCode-CLI includes a built-in [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server, allowing AI coding assistants like **Cursor**, **Claude Code**, **Windsurf**, and **Antigravity** to use FastCode-CLI's repo-level code understanding capabilities directly.

#### Setup

Build FastCode-CLI first — no Python, no venv, just a single binary:

```bash
git clone https://github.com/duyhunghd6/fastcode-cli.git
cd fastcode-cli
go build -o fastcode ./cmd/fastcode
```

The MCP server is launched with `./fastcode serve-mcp`, and it needs `OPENAI_API_KEY`, `MODEL`, and `BASE_URL` as environment variables (or configured in `.env`).

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "fastcode": {
      "command": "/path/to/fastcode",
      "args": ["serve-mcp"],
      "env": {
        "MODEL": "gpt-4o",
        "BASE_URL": "https://api.openai.com/v1",
        "OPENAI_API_KEY": "sk-..."
      }
    }
  }
}
```

**Claude Code** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "fastcode": {
      "command": "/path/to/fastcode",
      "args": ["serve-mcp"],
      "env": {
        "MODEL": "gpt-4o",
        "BASE_URL": "https://api.openai.com/v1",
        "OPENAI_API_KEY": "sk-..."
      }
    }
  }
}
```

Or via `claude mcp add`:

```bash
claude mcp add fastcode -- /path/to/fastcode serve-mcp
```

**Antigravity** (`.gemini/settings.json`):

```json
{
  "mcpServers": {
    "fastcode": {
      "command": "/path/to/fastcode",
      "args": ["serve-mcp"],
      "env": {
        "MODEL": "gemini-3-flash",
        "BASE_URL": "https://...",
        "OPENAI_API_KEY": "your-key"
      }
    }
  }
}
```

**SSE transport** (for remote / shared deployments):

```bash
OPENAI_API_KEY=sk-... MODEL=gpt-4o BASE_URL=https://api.openai.com/v1 \
/path/to/fastcode serve-mcp --port 8080
```

#### Available Tools

| Tool                   | Description                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code_qa`              | Core tool — ask questions about one or more code repositories. Automatically indexes repos that haven't been indexed yet. Supports follow-up queries. |
| `list_indexed_repos`   | List all repositories that have been indexed and are available for querying.                                                                          |
| `delete_repo_metadata` | Delete indexed metadata for a repository (`.gob` cache files) while keeping the repository source code.                                               |

#### `code_qa` Parameters

| Parameter  | Required | Default | Description                                                   |
| ---------- | -------- | ------- | ------------------------------------------------------------- |
| `question` | Yes      | —       | The question to ask about the code                            |
| `repos`    | Yes      | —       | List of repo sources (local paths). Multiple repos supported. |

#### How It Works

1. **Auto-detection**: For each repo in `repos`, FastCode-CLI checks if it's already indexed. If yes, it skips indexing entirely.
2. **Instant startup**: Unlike Python-based MCP servers that need to boot an interpreter + load dependencies, the Go binary starts in milliseconds.
3. **Cache**: Indexed repos are cached to `~/.fastcode/cache/` (configurable). Subsequent queries reuse the cache for near-instant response.

#### Usage Example

In Cursor or Claude Code, simply ask:

```
Use FastCode to analyze what this repository at /path/to/repo_name is for.
```

or

```
Use FastCode to analyze the authentication flow in this project.
```

The AI assistant will call `code_qa`, FastCode-CLI will index the repo (if needed), and return a detailed answer with source references.

For follow-up questions, the assistant continues the conversation naturally:

```
Which files would be affected if I change the User model?
```

</details>

---

## 🔧 Configuration

### Supported LLM Providers

FastCode-CLI works with any **OpenAI-compatible** LLM provider:

<details>
<summary><b>OpenAI</b></summary>

```env
OPENAI_API_KEY=sk-...
MODEL=gpt-4o
BASE_URL=https://api.openai.com/v1
```

</details>

<details>
<summary><b>Google Gemini (via OpenAI-compatible endpoint)</b></summary>

```env
OPENAI_API_KEY=your-gemini-key
MODEL=gemini-3-flash
BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
```

</details>

<details>
<summary><b>OpenRouter (Multiple Models)</b></summary>

```env
OPENAI_API_KEY=sk-or-...
MODEL=google/gemini-flash-1.5
BASE_URL=https://openrouter.ai/api/v1
```

</details>

<details>
<summary><b>Local Models (Ollama)</b></summary>

```env
OPENAI_API_KEY=ollama
MODEL=qwen3-coder-30b
BASE_URL=http://localhost:11434/v1
```

</details>

<details>
<summary><b>Custom / Self-Hosted (vLLM, LiteLLM, etc.)</b></summary>

```env
OPENAI_API_KEY=your-key
MODEL=your-model-name
BASE_URL=http://your-server:8000/v1
```

</details>

### Supported Languages

FastCode-CLI automatically detects and parses:

- 🐹 Go
- 🐍 Python
- 📜 JavaScript / TypeScript
- ☕ Java
- 🦀 Rust
- ⚙️ C / C++
- 💎 C#

---

## 🧠 How It Works

FastCode-CLI uses a novel **scouting-first** approach that fundamentally differs from traditional code reasoning systems:

### Traditional Approach ❌

```
Question → Load Files → Search → Load More Files → Search Again → ... → Answer
💸 High token cost from repeated file loading
```

### FastCode-CLI Approach ✅

```
Question → Parse AST → Build Graphs → Hybrid Search → Skim Targets → Answer
💰 Minimal token cost with precise structural targeting
```

### The Three-Phase Pipeline in Go

**Phase 1 — Semantic-Structural Representation** (`internal/parser` + `internal/graph`)

1. Walk the repository via `internal/loader` — detect languages, respect `.gitignore`
2. Parse each file through `go-tree-sitter` AST extractors
3. Extract hierarchical code units: functions, classes, imports, types
4. Build Call Graph, Dependency Graph, and Inheritance Graph

**Phase 2 — Hybrid Indexing** (`internal/index` + `internal/llm`)

1. Generate dense vector embeddings for each code element (via `internal/llm/embedder.go`)
2. Build BM25 keyword index for text-based search (via `internal/index/bm25.go`)
3. Combine into hybrid retrieval (via `internal/index/hybrid.go`)
4. Cache the entire index to disk (via `internal/cache/cache.go`) for instant reuse

**Phase 3 — Budget-Aware Retrieval** (`internal/agent`)

1. Analyze the query (complexity scoring, keyword extraction via `internal/agent/query.go`)
2. Run iterative multi-round retrieval (via `internal/agent/iterative.go`):
   - Each round uses agent tools: `search`, `browse`, `skim`, `list` (`internal/agent/tools.go`)
   - Traverse graphs to discover connected code
   - Evaluate confidence — stop early when confident or budget is exhausted
3. Generate a structured answer using the LLM with gathered context (`internal/agent/answer.go`)

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│                  fastcode-cli                    │
├─────────────┬───────────────┬───────────────────┤
│  cmd/       │  internal/    │  pkg/             │
│  fastcode   │  parser       │  treesitter       │
│  (Cobra)    │  graph        │                   │
│             │  index        │                   │
│             │  agent        │                   │
│             │  llm          │                   │
│             │  loader       │                   │
│             │  cache        │                   │
│             │  orchestrator │                   │
└─────────────┴───────────────┴───────────────────┘
        │              │               │
   CLI/MCP      AST + Graph      Tree-sitter
   Interface    Engine           Go Bindings
        │              │               │
        ▼              ▼               ▼
   ┌─────────┐  ┌───────────┐  ┌─────────────┐
   │ LLM API │  │ BM25 Text │  │ Vector Store│
   │ (OpenAI │  │ (Keyword  │  │ (Embeddings)│
   │ /Ollama)│  │  Search)  │  │             │
   └─────────┘  └───────────┘  └─────────────┘
```

### Package Layout

| Package                 | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `cmd/fastcode`          | CLI entry point (Cobra): `index`, `query`, `serve-mcp` subcommands       |
| `internal/types`        | Shared data structures: `CodeElement`, `FunctionInfo`, `ClassInfo`, etc. |
| `internal/util`         | Language detection, path normalization, and helper utilities             |
| `internal/loader`       | Repository file walker with `.gitignore` support and language filtering  |
| `internal/parser`       | Tree-sitter AST parsing and code element extraction for 8+ languages     |
| `internal/graph`        | Call Graph, Dependency Graph, Inheritance Graph construction & traversal |
| `internal/index`        | Hybrid indexing engine (vector embeddings + BM25 via cosine similarity)  |
| `internal/llm`          | LLM client abstraction (OpenAI-compatible chat + embedding API)          |
| `internal/agent`        | Iterative retrieval agent with budget-aware context gathering            |
| `internal/cache`        | Disk cache for serialized indexes (gob encoding)                         |
| `internal/orchestrator` | Engine orchestrator: wires loader → parser → graph → index → agent       |
| `pkg/treesitter`        | Tree-sitter Go bindings and language grammar helpers                     |
| `reference/`            | Original Python FastCode source code for reference during porting        |
| `docs/`                 | Research documents, analysis, test reports, and porting plans            |

---

## 📚 Examples

### Example 1: Understanding Authentication Flow

**Query:** "How does user authentication work in this application?"

**FastCode-CLI Process:**

1. 🗺️ Scouts for authentication-related structures via hybrid search
2. 🔍 Identifies `auth/handler.go`, `middleware/auth.go`, `models/user.go`
3. 📊 Traces dependencies between these files via Call Graph
4. 📖 Skims function signatures — loads only relevant functions
5. ✅ Provides comprehensive answer with file paths and line numbers

### Example 2: Impact Analysis

**Query:** "What would break if I change the User model schema?"

**FastCode-CLI Process:**

1. 🗺️ Locates User model definition via hybrid search
2. 🔗 Traces all imports and usages via Dependency Graph
3. 📊 Maps multi-hop dependency chain across files
4. 📖 Loads affected code sections
5. ✅ Lists all impacted files and functions with confidence score

### Example 3: Architecture Understanding

**Query:** "Explain how the API routing is structured"

**FastCode-CLI Process:**

1. 🗺️ Scouts for routing patterns (`router`, `handler`, `endpoint`)
2. 🔍 Identifies route registration files and handler functions
3. 📊 Traces Call Graph from router → handlers → services
4. 📖 Skims middleware chain and authentication guards
5. ✅ Provides a layered architectural explanation

---

## 🗺 Roadmap

### Phase 1: Core Engine ✅

- [x] Tree-sitter AST parsing for Go, Python, JS/TS, Java, Rust, C/C++, C#
- [x] Code unit extraction (functions, classes, imports, types)
- [x] Call Graph, Dependency Graph, Inheritance Graph construction
- [x] Repository file loader with `.gitignore` support

### Phase 2: Indexing ✅

- [x] LLM-based embedding generation (via OpenAI-compatible API)
- [x] BM25 text indexing for keyword search
- [x] Hybrid retrieval (vector + BM25 fusion with weighted scoring)
- [x] Disk cache for index persistence (gob encoding)

### Phase 3: Retrieval Agent ✅

- [x] Budget-aware iterative agent with confidence control
- [x] Code skimming and smart file browsing tools
- [x] Query processor (complexity scoring, keyword extraction)
- [x] Answer generator (LLM-powered with structured context)

### Phase 4: CLI & Integration ✅

- [x] Cobra CLI: `index`, `query`, `serve-mcp`
- [x] MCP Server mode (JSON-RPC over stdio)
- [x] JSON output flag for pipeline integration
- [x] `.env` file support via godotenv

### Phase 5: Ecosystem _(Planned)_

- [ ] REST API server mode (`serve-api`)
- [ ] Multi-repo query support (cross-repository reasoning)
- [ ] Web UI (optional)
- [ ] Pre-built binaries for GitHub Releases
- [ ] `go install` / Homebrew formula support

---

## 🤝 Contributing

We welcome contributions! FastCode-CLI is built for the community, by the community.

### Ways to Contribute

- 🐛 **Report Bugs** — Found an issue? Let us know!
- 💡 **Suggest Features** — Have ideas? We'd love to hear them!
- 📝 **Improve Documentation** — Help others understand FastCode-CLI better
- 🔧 **Submit Pull Requests** — Code contributions are always welcome

### Development Setup

```bash
# Clone and setup
git clone https://github.com/duyhunghd6/fastcode-cli.git
cd fastcode-cli

# Run tests
go test ./... -v -cover

# Build
go build -o fastcode ./cmd/fastcode

# Run
./fastcode --version
```

---

## 📄 License

FastCode-CLI is released under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🌟 Star History

<div align="center">

If FastCode-CLI saves you tokens and time, consider giving us a star! ⭐

**Built with ❤️ in Go for developers who value efficiency**

</div>

<div align="center">
  <a href="https://star-history.com/#duyhunghd6/fastcode-cli&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=duyhunghd6/fastcode-cli&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=duyhunghd6/fastcode-cli&type=Date" />
      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=duyhunghd6/fastcode-cli&type=Date" style="border-radius: 15px; box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);" />
    </picture>
  </a>
</div>

---

## 🙏 Credits

This project is a **Go rewrite** inspired by [**FastCode**](https://github.com/HKUDS/FastCode) by the [HKUDS Lab](https://github.com/HKUDS) at The University of Hong Kong. The original Python implementation introduced the groundbreaking three-phase framework for token-efficient code understanding.

We gratefully acknowledge the original authors and their research contributions.

---

<p align="center">
  <em> Thanks for visiting ✨ FastCode-CLI!</em><br><br>
  <strong>Part of the <a href="https://github.com/duyhunghd6/gmind">Gmind</a> ecosystem — Memory Management for Agentic Coding</strong>
</p>
