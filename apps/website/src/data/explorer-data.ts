/* ─── Explorer Mock Data ─── */

export type ExplorerItemType = "doc" | "commit" | "task" | "adr" | "chat" | "spike";

export interface ExplorerItem {
  id: string;
  type: ExplorerItemType;
  title: string;
  excerpt: string;
  beadsId?: string;
  date: string;
  author?: string;
  tags?: string[];
  status?: string;
}

export const TYPE_META: Record<ExplorerItemType, { icon: string; color: string; label: string }> = {
  doc: { icon: "📄", color: "#58a6ff", label: "Document" },
  commit: { icon: "⏺", color: "#d2a8ff", label: "Commit" },
  task: { icon: "📋", color: "#3fb9a0", label: "Task" },
  adr: { icon: "📐", color: "#ffa657", label: "ADR" },
  chat: { icon: "💬", color: "#bc8cff", label: "Agent Chat" },
  spike: { icon: "🔬", color: "#f78166", label: "Spike" },
};

export const explorerItems: ExplorerItem[] = [
  // Documents
  { id: "e1", type: "doc", title: "PRD-01: Giới thiệu & Tổng quan Hệ thống", excerpt: "Executive Summary & Architecture — 5 lớp hệ thống, Verification Layer, API Gateway", beadsId: "br-prd01", date: "2026-02-28", author: "PMO", tags: ["prd", "architecture"] },
  { id: "e2", type: "doc", title: "PRD-02: Lớp Lưu trữ & Chiến lược Định danh", excerpt: "Storage Layer — FrankenSQLite, Zvec, Universal Tracking, Section-level Beads IDs", beadsId: "br-prd02", date: "2026-03-01", author: "PMO", tags: ["prd", "storage"] },
  { id: "e3", type: "doc", title: "PRD-03: CLI & Agent Workflow", excerpt: "gmind CLI commands, Agent Skills, Role-Based Authorization, File Locking", beadsId: "br-prd03", date: "2026-03-01", author: "PMO", tags: ["prd", "cli"] },
  { id: "e4", type: "doc", title: "Architecture.md", excerpt: "Kiến trúc tổng thể: 5-layer system, API Gateway, Hybrid Storage", beadsId: "br-arch-01", date: "2026-02-28", author: "Architect", tags: ["architecture"] },

  // Commits
  { id: "e5", type: "commit", title: "feat(storage): implement FrankenSQLite driver", excerpt: "Add MVCC layer, page-level concurrent writes, JSONL export. 3 files, +142/−38", beadsId: "bd-a1b2", date: "2026-03-02", author: "Claude-01", tags: ["storage", "mvcc"] },
  { id: "e6", type: "commit", title: "feat(cli): add gmind init command", excerpt: "Initialize gmind project with config, .beads directory, git hooks", beadsId: "bd-e5f6", date: "2026-03-02", author: "Claude-02", tags: ["cli", "init"] },
  { id: "e7", type: "commit", title: "fix(mvcc): resolve deadlock on concurrent writes", excerpt: "Fix page-level lock contention when 3+ agents write simultaneously", beadsId: "bd-a1b2", date: "2026-03-03", author: "Claude-01", tags: ["storage", "bugfix"] },
  { id: "e8", type: "commit", title: "feat(api): add RTM query endpoint", excerpt: "GET /api/rtm — returns 3-layer traceability matrix with coverage stats", beadsId: "bd-k1l2", date: "2026-03-03", author: "Claude-03", tags: ["api", "rtm"] },

  // Tasks
  { id: "e9", type: "task", title: "Setup FrankenSQLite driver", excerpt: "Implement beads_rust storage driver with MVCC + vector index support", beadsId: "bd-a1b2", date: "2026-03-01", author: "Claude-01", tags: ["P0", "storage"], status: "done" },
  { id: "e10", type: "task", title: "Implement Beads ID generator", excerpt: "UUID v7 + prefix system for universal tracking across all layers", beadsId: "bd-009", date: "2026-03-02", author: "Claude-02", tags: ["P1", "core"], status: "in-progress" },
  { id: "e11", type: "task", title: "Agent Lease Manager", excerpt: "15-min file lease with auto-renew, timeout alert, manual release", beadsId: "bd-012", date: "2026-03-02", author: "Claude-02", tags: ["P1", "orchestration"], status: "in-progress" },
  { id: "e12", type: "task", title: "RTM Query Endpoint", excerpt: "Go REST API endpoint for Requirements Traceability Matrix", beadsId: "bd-k1l2", date: "2026-03-03", author: "Claude-03", tags: ["P1", "api"], status: "review" },

  // ADRs
  { id: "e13", type: "adr", title: "ADR-001: FrankenSQLite chosen over DoltDB", excerpt: "In-process MVCC, JSONL git-friendly sync, 5-8MB binary vs 30MB+", beadsId: "br-adr-001", date: "2026-02-28", author: "Architect", tags: ["storage", "decision"] },
  { id: "e14", type: "adr", title: "ADR-002: git + gh CLI over Go API library", excerpt: "Local-first approach, zero dependencies, Beads-ID Git Trailer convention", beadsId: "br-adr-002", date: "2026-02-28", author: "Architect", tags: ["github", "decision"] },

  // Agent Chat Sessions
  { id: "e15", type: "chat", title: "Claude-01 ↔ Claude-02: MVCC Lock Conflict", excerpt: "Agents negotiated file lock for schema.go — resolved via mcp_agent_mail thread", beadsId: "bd-a1b2", date: "2026-03-02", author: "Claude-01", tags: ["conflict", "resolution"] },
  { id: "e16", type: "chat", title: "QA-Reviewer: Storage Test Regression", excerpt: "QA found 2 failing tests in storage_test.go, escalated to Level 2", beadsId: "bd-b05", date: "2026-03-03", author: "QA-Reviewer", tags: ["bug", "escalation"] },
  { id: "e17", type: "chat", title: "PMO-Agent: Sprint W10 Planning", excerpt: "Distributed 12 tasks across 4 agents, set WIP limits, assigned priorities", date: "2026-03-01", author: "PMO-Agent", tags: ["planning", "sprint"] },

  // Spikes
  { id: "e18", type: "spike", title: "Spike: FrankenSQLite vs DoltDB", excerpt: "Evaluated MVCC, sync model, binary size. Recommendation: FrankenSQLite", beadsId: "br-spike-001", date: "2026-02-27", author: "Architect", tags: ["storage", "research"] },
  { id: "e19", type: "spike", title: "Spike: Beads ID in Documents", excerpt: "Section-level IDs, satisfies/implements links, RTM 3-layer model", beadsId: "br-spike-004", date: "2026-03-01", author: "PMO", tags: ["tracking", "research"] },
];
