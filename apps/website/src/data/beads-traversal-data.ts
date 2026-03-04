/* ─── Beads Traversal — 3-Layer DAG Data ─── */

export type BeadsNodeType = "prd-section" | "plan" | "task" | "commit";

export interface BeadsNode {
  id: string;
  type: BeadsNodeType;
  label: string;
  description: string;
  status: "covered" | "partial" | "gap" | "done" | "in-progress" | "open" | "merged";
  meta?: Record<string, string>;
}

export interface BeadsEdge {
  source: string;
  target: string;
  type: "satisfies" | "implements" | "commit-for";
}

export const NODE_TYPE_META: Record<BeadsNodeType, { icon: string; color: string; label: string }> = {
  "prd-section": { icon: "📋", color: "#ff7b72", label: "PRD Section" },
  plan: { icon: "📐", color: "#d29922", label: "Plan Element" },
  task: { icon: "✅", color: "#3fb9a0", label: "Task" },
  commit: { icon: "⏺", color: "#d2a8ff", label: "Commit" },
};

export const EDGE_TYPE_META: Record<string, { color: string; label: string }> = {
  satisfies: { color: "#d29922", label: "satisfies" },
  implements: { color: "#3fb9a0", label: "implements" },
  "commit-for": { color: "#d2a8ff", label: "commit-for" },
};

export const beadsNodes: BeadsNode[] = [
  // PRD Sections (Layer 1)
  { id: "br-prd02-s1", type: "prd-section", label: "Lớp Lưu trữ", description: "PRD-02 §1: Kiến trúc Hybrid SSOT — FrankenSQLite + Zvec + FastCode", status: "covered" },
  { id: "br-prd02-s2", type: "prd-section", label: "PM Custom Fields", description: "PRD-02 §2: First-class SQL columns cho PM metadata", status: "covered" },
  { id: "br-prd02-s3", type: "prd-section", label: "Universal Tracking", description: "PRD-02 §3: Beads ID, Section-level IDs, satisfies/implements links", status: "partial" },
  { id: "br-prd02-s4", type: "prd-section", label: "Sync & GC", description: "PRD-02 §4: Lazy Cleanup, Memory Compaction", status: "gap" },
  { id: "br-prd02-s5", type: "prd-section", label: "GitHub Sync", description: "PRD-02 §5: Local-first, JSONL git-tracked, Beads-ID Git Trailer", status: "covered" },
  { id: "br-prd01-s3", type: "prd-section", label: "CI/CD Verification", description: "PRD-01 §3: Agent must pass CI/CD before br close", status: "covered" },
  { id: "br-prd01-s4", type: "prd-section", label: "Presentation Layer", description: "PRD-01 §4: Web UI — Portfolio/ART/Team views, Approval Gates", status: "partial" },
  { id: "br-prd03-s1", type: "prd-section", label: "gmind CLI Gateway", description: "PRD-03 §1: search, context, github, trace, coverage, impact, gaps", status: "partial" },

  // Plan Elements (Layer 2)
  { id: "br-plan-01", type: "plan", label: "FrankenSQLite Setup", description: "Setup FrankenSQLite driver with MVCC and vector index support", status: "done" },
  { id: "br-plan-02", type: "plan", label: "PM Schema Migration", description: "Add first-class PM columns: assignee, priority, qa_status, escalation", status: "done" },
  { id: "br-plan-03", type: "plan", label: "CLI Gateway Setup", description: "Implement gmind CLI: search, search-codebase, context, github subcommands", status: "in-progress" },
  { id: "br-plan-04", type: "plan", label: "Agent Orchestrator", description: "File leasing, agent coordination, mcp_agent_mail integration", status: "in-progress" },
  { id: "br-plan-05", type: "plan", label: "Beads ID Tracking", description: "Section-level IDs, RTM query, coverage analysis, impact analysis", status: "open" },

  // Tasks (Layer 3)
  { id: "bd-a1b2", type: "task", label: "MVCC Layer", description: "Implement page-level MVCC concurrent writers for FrankenSQLite", status: "done", meta: { assignee: "Claude-01", priority: "P0" } },
  { id: "bd-c3d4", type: "task", label: "Schema Migration", description: "Add PM columns to issues table via SQL migration", status: "done", meta: { assignee: "Claude-01", priority: "P1" } },
  { id: "bd-e5f6", type: "task", label: "gmind CLI", description: "Implement gmind init, search, context subcommands", status: "done", meta: { assignee: "Claude-02", priority: "P1" } },
  { id: "bd-g7h8", type: "task", label: "Lease Manager", description: "15-min file lease with auto-renew and timeout alert", status: "in-progress", meta: { assignee: "Claude-02", priority: "P1" } },
  { id: "bd-k1l2", type: "task", label: "RTM Query", description: "Go REST endpoint for Requirements Traceability Matrix", status: "in-progress", meta: { assignee: "Claude-03", priority: "P1" } },
  { id: "bd-o5p6", type: "task", label: "Vector Index", description: "Integrate Zvec vector index with FrankenSQLite storage", status: "open", meta: { assignee: "—", priority: "P2" } },
  { id: "bd-004", type: "task", label: "CI/CD Pipeline", description: "GitHub Actions: lint, test, build, security scan, deploy", status: "done", meta: { assignee: "Claude-03", priority: "P1" } },

  // Commits (Layer 4)
  { id: "c-01", type: "commit", label: "feat(storage): driver", description: "Initial FrankenSQLite driver with MVCC — 3 files, +142/−38", status: "merged", meta: { sha: "c8f2a1b", date: "2026-03-02" } },
  { id: "c-02", type: "commit", label: "feat(storage): migration", description: "Add PM columns migration — 2 files, +67/−3", status: "merged", meta: { sha: "d9a3b2c", date: "2026-03-02" } },
  { id: "c-03", type: "commit", label: "feat(cli): gmind init", description: "Implement gmind CLI gateway — 5 files, +287/−45", status: "merged", meta: { sha: "e0b4c3d", date: "2026-03-02" } },
  { id: "c-04", type: "commit", label: "fix(mvcc): deadlock", description: "Resolve page-level lock contention — 1 file, +23/−8", status: "merged", meta: { sha: "f1c5d4e", date: "2026-03-03" } },
];

export const beadsEdges: BeadsEdge[] = [
  // Plan → PRD (satisfies)
  { source: "br-plan-01", target: "br-prd02-s1", type: "satisfies" },
  { source: "br-plan-02", target: "br-prd02-s2", type: "satisfies" },
  { source: "br-plan-03", target: "br-prd03-s1", type: "satisfies" },
  { source: "br-plan-04", target: "br-prd01-s4", type: "satisfies" },
  { source: "br-plan-05", target: "br-prd02-s3", type: "satisfies" },
  { source: "br-plan-01", target: "br-prd02-s5", type: "satisfies" },

  // Task → Plan (implements)
  { source: "bd-a1b2", target: "br-plan-01", type: "implements" },
  { source: "bd-c3d4", target: "br-plan-02", type: "implements" },
  { source: "bd-e5f6", target: "br-plan-03", type: "implements" },
  { source: "bd-g7h8", target: "br-plan-04", type: "implements" },
  { source: "bd-k1l2", target: "br-plan-05", type: "implements" },
  { source: "bd-o5p6", target: "br-plan-01", type: "implements" },
  { source: "bd-004", target: "br-plan-03", type: "implements" },

  // Commit → Task (commit-for)
  { source: "c-01", target: "bd-a1b2", type: "commit-for" },
  { source: "c-02", target: "bd-c3d4", type: "commit-for" },
  { source: "c-03", target: "bd-e5f6", type: "commit-for" },
  { source: "c-04", target: "bd-a1b2", type: "commit-for" },
];
