/* ─── Knowledge Graph Presets ─── */

export interface GraphNode {
  id: string;
  label: string;
  type: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphPreset {
  id: string;
  label: string;
  description: string;
  data: GraphData;
}

/* ─── Color Maps ─── */
export const TYPE_COLORS: Record<string, string> = {
  prd: "#ff7b72",
  plan: "#d29922",
  task: "#3fb9a0",
  commit: "#d2a8ff",
  document: "#00e5ff",
  spike: "#f78166",
  agent: "#58a6ff",
  workflow: "#bc8cff",
  test: "#7ee787",
  release: "#79c0ff",
  adr: "#ffa657",
};

export const EDGE_STYLES: Record<string, { label: string; color: string }> = {
  satisfies: { label: "satisfies", color: "#d29922" },
  implements: { label: "implements", color: "#3fb9a0" },
  blocks: { label: "blocks", color: "#ff7b72" },
  triggers: { label: "triggers", color: "#bc8cff" },
  validates: { label: "validates", color: "#7ee787" },
  "depends-on": { label: "depends-on", color: "#58a6ff" },
  references: { label: "references", color: "#8b949e" },
};

/* ─── Preset 1: Đơn giản (Original 12 nodes) ─── */
const simpleData: GraphData = {
  nodes: [
    { id: "prd-01", label: "PRD-01 Overview", type: "prd" },
    { id: "prd-02", label: "PRD-02 Storage", type: "prd" },
    { id: "prd-03", label: "PRD-03 CLI", type: "prd" },
    { id: "plan-01", label: "FrankenSQLite Setup", type: "plan" },
    { id: "plan-02", label: "PM Fields Schema", type: "plan" },
    { id: "plan-03", label: "CLI Gateway", type: "plan" },
    { id: "task-01", label: "bd-a1b2 MVCC Layer", type: "task" },
    { id: "task-02", label: "bd-c3d4 Migration", type: "task" },
    { id: "task-03", label: "bd-e5f6 gmind CLI", type: "task" },
    { id: "commit-01", label: "feat(storage)", type: "commit" },
    { id: "commit-02", label: "feat(cli)", type: "commit" },
    { id: "doc-arch", label: "Architecture.md", type: "document" },
  ],
  edges: [
    { source: "plan-01", target: "prd-02", type: "satisfies" },
    { source: "plan-02", target: "prd-02", type: "satisfies" },
    { source: "plan-03", target: "prd-03", type: "satisfies" },
    { source: "task-01", target: "plan-01", type: "implements" },
    { source: "task-02", target: "plan-02", type: "implements" },
    { source: "task-03", target: "plan-03", type: "implements" },
    { source: "commit-01", target: "task-01", type: "implements" },
    { source: "commit-02", target: "task-03", type: "implements" },
    { source: "prd-01", target: "prd-02", type: "blocks" },
    { source: "prd-01", target: "prd-03", type: "blocks" },
    { source: "doc-arch", target: "prd-01", type: "satisfies" },
  ],
};

/* ─── Preset 2: Hệ sinh thái (30+ nodes) ─── */
const ecosystemData: GraphData = {
  nodes: [
    // PRDs
    { id: "prd-01", label: "PRD-01 Overview", type: "prd" },
    { id: "prd-02", label: "PRD-02 Storage", type: "prd" },
    { id: "prd-03", label: "PRD-03 CLI", type: "prd" },
    { id: "prd-04", label: "PRD-04 Agent Village", type: "prd" },
    { id: "prd-05", label: "PRD-05 RTM & Tracking", type: "prd" },
    // Plans
    { id: "plan-01", label: "FrankenSQLite Setup", type: "plan" },
    { id: "plan-02", label: "PM Fields Schema", type: "plan" },
    { id: "plan-03", label: "CLI Gateway", type: "plan" },
    { id: "plan-04", label: "Agent Orchestration", type: "plan" },
    { id: "plan-05", label: "Beads ID System", type: "plan" },
    // Tasks
    { id: "task-01", label: "bd-a1b2 MVCC Layer", type: "task" },
    { id: "task-02", label: "bd-c3d4 Migration", type: "task" },
    { id: "task-03", label: "bd-e5f6 gmind CLI", type: "task" },
    { id: "task-04", label: "bd-g7h8 Lease Manager", type: "task" },
    { id: "task-05", label: "bd-i9j0 Event Stream", type: "task" },
    { id: "task-06", label: "bd-k1l2 RTM Query", type: "task" },
    { id: "task-07", label: "bd-m3n4 Heatmap Gen", type: "task" },
    { id: "task-08", label: "bd-o5p6 Vector Index", type: "task" },
    // Commits
    { id: "commit-01", label: "feat(storage)", type: "commit" },
    { id: "commit-02", label: "feat(cli)", type: "commit" },
    { id: "commit-03", label: "feat(lease)", type: "commit" },
    { id: "commit-04", label: "feat(rtm)", type: "commit" },
    { id: "commit-05", label: "fix(mvcc): deadlock", type: "commit" },
    // Documents
    { id: "doc-arch", label: "Architecture.md", type: "document" },
    { id: "doc-vision", label: "Vision.md", type: "document" },
    // Spikes
    { id: "spike-01", label: "Spike: FrankenSQLite vs DoltDB", type: "spike" },
    { id: "spike-02", label: "Spike: Zvec Indexer", type: "spike" },
    // Agents
    { id: "agent-01", label: "Claude-01 (Storage)", type: "agent" },
    { id: "agent-02", label: "Claude-02 (CLI)", type: "agent" },
    { id: "agent-03", label: "QA-Reviewer", type: "agent" },
    { id: "agent-orch", label: "Orchestrator", type: "agent" },
    // Workflows
    { id: "wf-ci", label: "CI/CD Pipeline", type: "workflow" },
    { id: "wf-review", label: "Code Review Flow", type: "workflow" },
    // Tests
    { id: "test-01", label: "storage_test.go", type: "test" },
    { id: "test-02", label: "cli_test.go", type: "test" },
    { id: "test-03", label: "lease_test.go", type: "test" },
    // Release
    { id: "rel-01", label: "v1.0-rc1", type: "release" },
    // ADR
    { id: "adr-01", label: "ADR-001 Storage Choice", type: "adr" },
  ],
  edges: [
    // PRD → PRD
    { source: "prd-01", target: "prd-02", type: "blocks" },
    { source: "prd-01", target: "prd-03", type: "blocks" },
    { source: "prd-01", target: "prd-04", type: "blocks" },
    { source: "prd-04", target: "prd-05", type: "depends-on" },
    // Plan → PRD
    { source: "plan-01", target: "prd-02", type: "satisfies" },
    { source: "plan-02", target: "prd-02", type: "satisfies" },
    { source: "plan-03", target: "prd-03", type: "satisfies" },
    { source: "plan-04", target: "prd-04", type: "satisfies" },
    { source: "plan-05", target: "prd-05", type: "satisfies" },
    // Task → Plan
    { source: "task-01", target: "plan-01", type: "implements" },
    { source: "task-02", target: "plan-02", type: "implements" },
    { source: "task-03", target: "plan-03", type: "implements" },
    { source: "task-04", target: "plan-04", type: "implements" },
    { source: "task-05", target: "plan-04", type: "implements" },
    { source: "task-06", target: "plan-05", type: "implements" },
    { source: "task-07", target: "plan-05", type: "implements" },
    { source: "task-08", target: "plan-01", type: "implements" },
    // Commit → Task
    { source: "commit-01", target: "task-01", type: "implements" },
    { source: "commit-02", target: "task-03", type: "implements" },
    { source: "commit-03", target: "task-04", type: "implements" },
    { source: "commit-04", target: "task-06", type: "implements" },
    { source: "commit-05", target: "task-01", type: "implements" },
    // Doc → PRD
    { source: "doc-arch", target: "prd-01", type: "satisfies" },
    { source: "doc-vision", target: "prd-01", type: "references" },
    // Spike → Plan
    { source: "spike-01", target: "plan-01", type: "references" },
    { source: "spike-02", target: "task-08", type: "references" },
    // Agent → Task
    { source: "agent-01", target: "task-01", type: "implements" },
    { source: "agent-01", target: "task-08", type: "implements" },
    { source: "agent-02", target: "task-03", type: "implements" },
    { source: "agent-03", target: "commit-01", type: "validates" },
    { source: "agent-03", target: "commit-02", type: "validates" },
    { source: "agent-orch", target: "agent-01", type: "triggers" },
    { source: "agent-orch", target: "agent-02", type: "triggers" },
    { source: "agent-orch", target: "agent-03", type: "triggers" },
    // Tests
    { source: "test-01", target: "commit-01", type: "validates" },
    { source: "test-02", target: "commit-02", type: "validates" },
    { source: "test-03", target: "commit-03", type: "validates" },
    // Workflow
    { source: "wf-ci", target: "test-01", type: "triggers" },
    { source: "wf-ci", target: "test-02", type: "triggers" },
    { source: "wf-ci", target: "test-03", type: "triggers" },
    { source: "wf-review", target: "agent-03", type: "triggers" },
    // Release
    { source: "rel-01", target: "commit-01", type: "references" },
    { source: "rel-01", target: "commit-02", type: "references" },
    { source: "rel-01", target: "commit-03", type: "references" },
    // ADR
    { source: "adr-01", target: "spike-01", type: "references" },
    { source: "adr-01", target: "plan-01", type: "satisfies" },
  ],
};

/* ─── Preset 3: Sprint View (task-focused) ─── */
const sprintData: GraphData = {
  nodes: [
    // Sprint epicenter
    { id: "sprint-1", label: "Sprint 2026-W10", type: "release" },
    // Tasks with priority
    { id: "task-s1", label: "bd-001 API Gateway", type: "task" },
    { id: "task-s2", label: "bd-002 Schema Migration", type: "task" },
    { id: "task-s3", label: "bd-003 FrankenSQLite Driver", type: "task" },
    { id: "task-s4", label: "bd-004 CI/CD Pipeline", type: "task" },
    { id: "task-s5", label: "bd-005 Zvec Unit Tests", type: "task" },
    { id: "task-s6", label: "bd-006 Lease Manager", type: "task" },
    { id: "task-s7", label: "bd-007 mcp_mail Docs", type: "task" },
    { id: "task-s8", label: "bd-008 RTM Endpoint", type: "task" },
    { id: "task-s9", label: "bd-009 Heatmap Widget", type: "task" },
    { id: "task-s10", label: "bd-010 Agent Metrics", type: "task" },
    // Agents assigned
    { id: "a-claude1", label: "Claude-01", type: "agent" },
    { id: "a-claude2", label: "Claude-02", type: "agent" },
    { id: "a-claude3", label: "Claude-03", type: "agent" },
    { id: "a-qa", label: "QA-Reviewer", type: "agent" },
    { id: "a-pmo", label: "PMO-Agent", type: "agent" },
    // Tests
    { id: "t-api", label: "api_test.go", type: "test" },
    { id: "t-storage", label: "storage_test.go", type: "test" },
    { id: "t-lease", label: "lease_test.go", type: "test" },
    // Commits
    { id: "c-feat1", label: "feat(api): gateway", type: "commit" },
    { id: "c-feat2", label: "feat(storage): driver", type: "commit" },
    { id: "c-feat3", label: "feat(lease): manager", type: "commit" },
    { id: "c-fix1", label: "fix(ci): pipeline", type: "commit" },
    // Workflow
    { id: "wf-sprint", label: "Sprint Pipeline", type: "workflow" },
  ],
  edges: [
    // Sprint → Tasks
    { source: "sprint-1", target: "task-s1", type: "triggers" },
    { source: "sprint-1", target: "task-s2", type: "triggers" },
    { source: "sprint-1", target: "task-s3", type: "triggers" },
    { source: "sprint-1", target: "task-s4", type: "triggers" },
    { source: "sprint-1", target: "task-s5", type: "triggers" },
    { source: "sprint-1", target: "task-s6", type: "triggers" },
    { source: "sprint-1", target: "task-s7", type: "triggers" },
    { source: "sprint-1", target: "task-s8", type: "triggers" },
    { source: "sprint-1", target: "task-s9", type: "triggers" },
    { source: "sprint-1", target: "task-s10", type: "triggers" },
    // Dependencies
    { source: "task-s2", target: "task-s3", type: "depends-on" },
    { source: "task-s5", target: "task-s3", type: "depends-on" },
    { source: "task-s8", target: "task-s6", type: "depends-on" },
    { source: "task-s9", target: "task-s8", type: "depends-on" },
    // Agent assignments
    { source: "a-claude1", target: "task-s1", type: "implements" },
    { source: "a-claude1", target: "task-s3", type: "implements" },
    { source: "a-claude2", target: "task-s2", type: "implements" },
    { source: "a-claude2", target: "task-s6", type: "implements" },
    { source: "a-claude3", target: "task-s4", type: "implements" },
    { source: "a-claude3", target: "task-s7", type: "implements" },
    { source: "a-qa", target: "task-s5", type: "implements" },
    { source: "a-pmo", target: "task-s8", type: "implements" },
    { source: "a-pmo", target: "task-s9", type: "implements" },
    { source: "a-pmo", target: "task-s10", type: "implements" },
    // Commits → Tasks
    { source: "c-feat1", target: "task-s1", type: "implements" },
    { source: "c-feat2", target: "task-s3", type: "implements" },
    { source: "c-feat3", target: "task-s6", type: "implements" },
    { source: "c-fix1", target: "task-s4", type: "implements" },
    // Tests
    { source: "t-api", target: "c-feat1", type: "validates" },
    { source: "t-storage", target: "c-feat2", type: "validates" },
    { source: "t-lease", target: "c-feat3", type: "validates" },
    // Workflow
    { source: "wf-sprint", target: "t-api", type: "triggers" },
    { source: "wf-sprint", target: "t-storage", type: "triggers" },
    { source: "wf-sprint", target: "t-lease", type: "triggers" },
  ],
};

/* ─── Presets ─── */
export const graphPresets: GraphPreset[] = [
  { id: "simple", label: "Đơn giản", description: "12 nodes — PRD → Plan → Task → Commit cơ bản", data: simpleData },
  { id: "ecosystem", label: "Hệ sinh thái", description: "38 nodes — Toàn bộ Gmind: Agents, Workflows, Tests, Spikes, ADRs", data: ecosystemData },
  { id: "sprint", label: "Sprint View", description: "24 nodes — Góc nhìn Sprint: Tasks, Agents, Tests, CI/CD", data: sprintData },
];
