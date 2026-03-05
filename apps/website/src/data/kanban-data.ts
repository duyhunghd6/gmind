/* ─── Kanban Board Data ─── */

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  assigneeColor?: string;
  priority: "P0" | "P1" | "P2" | "P3";
  labels?: string[];
  beadsId?: string;
  dueDate?: string;
  escalationLevel?: number;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  wipLimit?: number;
  cards: KanbanCard[];
}

export interface KanbanBoard {
  id: string;
  label: string;
  description: string;
  columns: KanbanColumnData[];
}

const PRIORITY_COLORS: Record<string, string> = {
  P0: "#ff7b72",
  P1: "#ffa657",
  P2: "#d29922",
  P3: "#8b949e",
};

export { PRIORITY_COLORS };

/* ─── Board 1: Sprint Board ─── */
const sprintBoard: KanbanBoard = {
  id: "sprint",
  label: "Sprint Board",
  description: "Sprint 2026-W10 — 12 tasks, 4 agents",
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      cards: [
        { id: "s1", title: "Thiết kế API Gateway schema", assignee: "—", priority: "P1", labels: ["api", "design"], beadsId: "bd-001", dueDate: "Mar 10" },
        { id: "s2", title: "Tạo schema migration v2", assignee: "—", priority: "P2", labels: ["database"], beadsId: "bd-002", dueDate: "Mar 12" },
        { id: "s3", title: "Viết docs cho mcp_mail", description: "Tài liệu API endpoints và auth flow", assignee: "—", priority: "P3", labels: ["docs"], beadsId: "bd-007" },
        { id: "s4", title: "Setup monitoring dashboard", assignee: "—", priority: "P2", labels: ["infra", "monitoring"], beadsId: "bd-011", dueDate: "Mar 14" },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      wipLimit: 4,
      cards: [
        { id: "s5", title: "Implement Beads ID generator", description: "UUID v7 + prefix system", assignee: "Claude-02", assigneeColor: "#d2a8ff", priority: "P1", labels: ["core"], beadsId: "bd-009", dueDate: "Mar 8" },
        { id: "s6", title: "RTM query endpoint", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P1", labels: ["api", "rtm"], beadsId: "bd-010", dueDate: "Mar 9" },
      ],
    },
    {
      id: "inProgress",
      title: "Đang Làm",
      wipLimit: 3,
      cards: [
        { id: "s7", title: "Implement FrankenSQLite driver", description: "MVCC layer + vector index support", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P0", labels: ["storage", "core"], beadsId: "bd-003", dueDate: "Mar 7" },
        { id: "s8", title: "Agent Lease Manager", description: "15-min file lease với auto-renew", assignee: "Claude-02", assigneeColor: "#d2a8ff", priority: "P1", labels: ["agent", "orchestration"], beadsId: "bd-012", dueDate: "Mar 9" },
      ],
    },
    {
      id: "review",
      title: "Review",
      wipLimit: 3,
      cards: [
        { id: "s9", title: "Setup CI/CD pipeline", description: "GitHub Actions + Turborepo cache", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P1", labels: ["devops", "ci"], beadsId: "bd-004", dueDate: "Mar 6" },
        { id: "s10", title: "Viết unit tests cho Zvec", assignee: "QA", assigneeColor: "#7ee787", priority: "P2", labels: ["test", "zvec"], beadsId: "bd-005" },
      ],
    },
    {
      id: "qa",
      title: "QA",
      wipLimit: 2,
      cards: [
        { id: "s11", title: "Event Stream integration", assignee: "QA", assigneeColor: "#7ee787", priority: "P1", labels: ["agent", "test"], beadsId: "bd-013" },
      ],
    },
    {
      id: "done",
      title: "Hoàn Thành",
      cards: [
        { id: "s12", title: "Khởi tạo monorepo", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P1", labels: ["infra"], beadsId: "bd-006" },
        { id: "s13", title: "Setup pnpm workspace", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P2", labels: ["infra"], beadsId: "bd-008" },
        { id: "s14", title: "Design System tokens", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P2", labels: ["design", "ui"], beadsId: "bd-014" },
      ],
    },
  ],
};

/* ─── Board 2: Release Board ─── */
const releaseBoard: KanbanBoard = {
  id: "release",
  label: "Release Board",
  description: "Release v1.0 Checklist — giai đoạn phát hành",
  columns: [
    {
      id: "backlog",
      title: "Chưa bắt đầu",
      cards: [
        { id: "r1", title: "Viết Release Notes v1.0", priority: "P1", labels: ["docs"], beadsId: "bd-r01" },
        { id: "r2", title: "Update README + CHANGELOG", priority: "P2", labels: ["docs"], beadsId: "bd-r02" },
        { id: "r3", title: "Benchmark performance report", priority: "P2", labels: ["perf"], beadsId: "bd-r03" },
      ],
    },
    {
      id: "todo",
      title: "Chuẩn Bị",
      wipLimit: 3,
      cards: [
        { id: "r4", title: "Security audit — dependency scan", assignee: "QA", assigneeColor: "#7ee787", priority: "P0", labels: ["security"], beadsId: "bd-r04", dueDate: "Mar 5" },
        { id: "r5", title: "Load test 1000 concurrent ops", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P1", labels: ["perf", "test"], beadsId: "bd-r05", dueDate: "Mar 6" },
      ],
    },
    {
      id: "inProgress",
      title: "Đang Kiểm Tra",
      wipLimit: 2,
      cards: [
        { id: "r6", title: "Integration test suite — full run", description: "42 tests, expected 100% pass", assignee: "QA", assigneeColor: "#7ee787", priority: "P0", labels: ["test", "integration"], beadsId: "bd-r06", dueDate: "Mar 5" },
      ],
    },
    {
      id: "review",
      title: "Chờ Phê Duyệt",
      wipLimit: 2,
      cards: [
        { id: "r7", title: "API contract freeze", description: "Lock API v1 interface", assignee: "PMO", assigneeColor: "#58a6ff", priority: "P0", labels: ["api", "release"], beadsId: "bd-r07" },
        { id: "r8", title: "Database migration script", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P1", labels: ["database", "migration"], beadsId: "bd-r08" },
      ],
    },
    {
      id: "qa",
      title: "Staging Deploy",
      wipLimit: 1,
      cards: [
        { id: "r9", title: "Deploy to staging environment", description: "Vercel Preview + DB staging", assignee: "DevOps", assigneeColor: "#79c0ff", priority: "P0", labels: ["deploy", "staging"], beadsId: "bd-r09" },
      ],
    },
    {
      id: "done",
      title: "Hoàn Thành",
      cards: [
        { id: "r10", title: "Feature freeze announcement", assignee: "PMO", assigneeColor: "#58a6ff", priority: "P1", labels: ["process"], beadsId: "bd-r10" },
        { id: "r11", title: "Backup production database", assignee: "DevOps", assigneeColor: "#79c0ff", priority: "P0", labels: ["ops"], beadsId: "bd-r11" },
      ],
    },
  ],
};

/* ─── Board 3: Bug Triage ─── */
const bugBoard: KanbanBoard = {
  id: "bugs",
  label: "Bug Triage",
  description: "Phân loại và xử lý bug reports — severity-based workflow",
  columns: [
    {
      id: "backlog",
      title: "Mới Báo",
      cards: [
        { id: "b1", title: "UI flicker khi switch dark/light mode", priority: "P2", labels: ["ui", "theme"], beadsId: "bd-b01" },
        { id: "b2", title: "Tooltip không tắt khi scroll nhanh", priority: "P3", labels: ["ui"], beadsId: "bd-b02" },
        { id: "b3", title: "Memory leak sau 100+ graph re-renders", description: "Sigma.js canvas không cleanup", priority: "P1", labels: ["perf", "memory"], beadsId: "bd-b03" },
        { id: "b4", title: "Kanban card drag ghost offset sai", priority: "P2", labels: ["ui", "dnd"], beadsId: "bd-b04" },
      ],
    },
    {
      id: "todo",
      title: "Đã Phân Loại",
      wipLimit: 3,
      cards: [
        { id: "b5", title: "FrankenSQLite deadlock on concurrent writes", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P0", labels: ["critical", "storage"], beadsId: "bd-b05", dueDate: "Mar 5", escalationLevel: 2 },
        { id: "b6", title: "Git graph SVG overflow trên mobile", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P2", labels: ["ui", "responsive"], beadsId: "bd-b06" },
      ],
    },
    {
      id: "inProgress",
      title: "Đang Sửa",
      wipLimit: 2,
      cards: [
        { id: "b7", title: "CORS error khi fetch remote branches", description: "API gateway missing headers", assignee: "Claude-02", assigneeColor: "#d2a8ff", priority: "P1", labels: ["api", "security"], beadsId: "bd-b07", dueDate: "Mar 5" },
      ],
    },
    {
      id: "review",
      title: "Chờ Verify",
      wipLimit: 3,
      cards: [
        { id: "b8", title: "Terminal cursor blink không sync", assignee: "QA", assigneeColor: "#7ee787", priority: "P3", labels: ["ui", "terminal"], beadsId: "bd-b08" },
        { id: "b9", title: "Beads ID collision khi tạo batch", assignee: "QA", assigneeColor: "#7ee787", priority: "P1", labels: ["core", "data"], beadsId: "bd-b09" },
      ],
    },
    {
      id: "qa",
      title: "QA Regression",
      wipLimit: 2,
      cards: [
        { id: "b10", title: "RTM heatmap sai % coverage", description: "Off-by-one trong aggregation query", assignee: "QA", assigneeColor: "#7ee787", priority: "P2", labels: ["rtm", "math"], beadsId: "bd-b10" },
      ],
    },
    {
      id: "done",
      title: "Đã Đóng",
      cards: [
        { id: "b11", title: "Timezone hiển thị sai UTC+0", assignee: "Claude-01", assigneeColor: "#3fb9a0", priority: "P2", labels: ["i18n"], beadsId: "bd-b11" },
        { id: "b12", title: "Build fail trên Node 22", assignee: "Claude-03", assigneeColor: "#f78166", priority: "P1", labels: ["devops"], beadsId: "bd-b12" },
        { id: "b13", title: "Missing CSS var --accent-cyan", assignee: "Claude-02", assigneeColor: "#d2a8ff", priority: "P3", labels: ["design"], beadsId: "bd-b13" },
      ],
    },
  ],
};

export const kanbanBoards: KanbanBoard[] = [sprintBoard, releaseBoard, bugBoard];
