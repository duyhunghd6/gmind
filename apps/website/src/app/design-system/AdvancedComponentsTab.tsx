"use client";

import Terminal from "@/components/Terminal";
import GitGraph from "@/components/GitGraph";
import KanbanColumn from "@/components/KanbanColumn";
import ActivityItem from "@/components/ActivityItem";
import TabPanel from "@/components/TabPanel";

/* ═══════════════════════════════════════════
   DEMO DATA
   ═══════════════════════════════════════════ */

const terminalLines = [
  { prompt: "$", text: "gmind search-codebase \"FrankenSQLite driver\"", type: "command" as const },
  { text: "Đang tìm kiếm trong 2,847 files...", type: "output" as const },
  { text: "✓ Tìm thấy 12 kết quả trong 0.34s", type: "success" as const },
  { prompt: "$", text: "bd create \"Setup MVCC layer\" --tag=\"implements:br-plan-01\"", type: "command" as const },
  { text: "Đã tạo task bd-a1b2 (priority: P2)", type: "success" as const },
];

const gitBranches = [
  { name: "master", color: "#58a6ff", className: "master" },
  { name: "develop", color: "#d2a8ff", className: "develop" },
  { name: "feature/storage", color: "#3fb9a0", className: "feature-1" },
  { name: "hotfix/fix-mvcc", color: "#ff7b72", className: "hotfix" },
];

const gitCommits = [
  { id: "c1", branch: "master", x: 60, y: 40, tag: "v0.1" },
  { id: "c2", branch: "master", x: 200, y: 40 },
  { id: "c3", branch: "master", x: 440, y: 40, tag: "v1.0" },
  { id: "c4", branch: "develop", x: 120, y: 100 },
  { id: "c5", branch: "develop", x: 260, y: 100 },
  { id: "c6", branch: "develop", x: 360, y: 100 },
  { id: "c7", branch: "feature/storage", x: 180, y: 160 },
  { id: "c8", branch: "feature/storage", x: 280, y: 160 },
  { id: "c9", branch: "hotfix/fix-mvcc", x: 140, y: 210 },
];

const gitConnections = [
  { from: { x: 60, y: 40 }, to: { x: 200, y: 40 }, branch: "master" },
  { from: { x: 200, y: 40 }, to: { x: 440, y: 40 }, branch: "master" },
  { from: { x: 60, y: 40 }, to: { x: 120, y: 100 }, branch: "develop" },
  { from: { x: 120, y: 100 }, to: { x: 260, y: 100 }, branch: "develop" },
  { from: { x: 260, y: 100 }, to: { x: 360, y: 100 }, branch: "develop" },
  { from: { x: 360, y: 100 }, to: { x: 440, y: 40 }, branch: "develop" },
  { from: { x: 120, y: 100 }, to: { x: 180, y: 160 }, branch: "feature/storage" },
  { from: { x: 180, y: 160 }, to: { x: 280, y: 160 }, branch: "feature/storage" },
  { from: { x: 280, y: 160 }, to: { x: 360, y: 100 }, branch: "feature/storage" },
  { from: { x: 60, y: 40 }, to: { x: 140, y: 210 }, branch: "hotfix/fix-mvcc" },
  { from: { x: 140, y: 210 }, to: { x: 200, y: 40 }, branch: "hotfix/fix-mvcc" },
];

const kanbanData = {
  backlog: [
    { id: "t1", title: "Thiết kế API Gateway", meta: "bd-001 · P1" },
    { id: "t2", title: "Tạo schema migration", meta: "bd-002 · P2" },
  ],
  inProgress: [
    { id: "t3", title: "Implement FrankenSQLite driver", meta: "bd-003 · P0" },
  ],
  review: [
    { id: "t4", title: "Setup CI/CD pipeline", meta: "bd-004 · P1" },
    { id: "t5", title: "Viết unit tests cho Zvec", meta: "bd-005 · P2" },
  ],
  done: [
    { id: "t6", title: "Khởi tạo monorepo", meta: "bd-006 · P1 · ✓" },
  ],
};

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function AdvancedComponentsTab() {
  return (
    <div>
      {/* ──── Terminal ──── */}
      <section id="terminal">
        <h2 className="section-label accent-cyan">
          <span className="section-dot" />
          Terminal
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          <code>ds-comp-terminal</code> — Cửa sổ terminal với title bar, ANSI colors, cursor blink.
          States: <code>default</code>, <code>typing</code>, <code>success</code>, <code>error</code>.
        </p>
        <div style={{ display: "grid", gap: "16px" }}>
          <Terminal title="gmind — Agent Console" lines={terminalLines} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Terminal
              title="Success State"
              lines={[
                { prompt: "$", text: "pnpm build", type: "command" },
                { text: "✓ Build hoàn thành (12.3s)", type: "success" },
              ]}
              state="success"
            />
            <Terminal
              title="Error State"
              lines={[
                { prompt: "$", text: "pnpm test", type: "command" },
                { text: "✗ 2 tests failed", type: "error" },
              ]}
              state="error"
            />
          </div>
        </div>
      </section>

      <div className="section-divider"><span>▼</span></div>

      {/* ──── Git Graph ──── */}
      <section id="git-graph">
        <h2 className="section-label accent-teal">
          <span className="section-dot" />
          Đồ thị Git
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          <code>ds-comp-git-graph</code> — Đồ thị nhánh Git SVG, color-coded branches, tag badges.
        </p>
        <div className="ve-card" style={{ padding: "16px" }}>
          <GitGraph
            branches={gitBranches}
            commits={gitCommits}
            connections={gitConnections}
            width={520}
            height={240}
          />
        </div>
      </section>

      <div className="section-divider"><span>▼</span></div>

      {/* ──── Kanban ──── */}
      <section id="kanban">
        <h2 className="section-label accent-amber">
          <span className="section-dot" />
          Bảng Kanban
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          <code>ds-comp-kanban-column</code> + <code>ds-lay-kanban-board</code> — Bảng quản trị dự án.
        </p>
        <div className="kanban-board">
          <div className="kanban-board__columns">
            <KanbanColumn title="Backlog" cards={kanbanData.backlog} />
            <KanbanColumn title="Đang làm" cards={kanbanData.inProgress} />
            <KanbanColumn title="Review" cards={kanbanData.review} />
            <KanbanColumn title="Hoàn thành" cards={kanbanData.done} />
          </div>
        </div>
      </section>

      <div className="section-divider"><span>▼</span></div>

      {/* ──── Activity Feed ──── */}
      <section id="activity-feed">
        <h2 className="section-label accent-rose">
          <span className="section-dot" />
          Nhật ký Hoạt động
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          <code>ds-comp-activity-item</code> — Event log với timeline connector, 4 biến thể màu.
        </p>
        <div className="ve-card" style={{ padding: "16px" }}>
          <ActivityItem
            agent="Claude-Agent-01"
            action="đã khóa file src/storage/driver.go"
            time="14:23"
            variant="info"
            detail="Lease timeout: 15 phút · reason: bd-003"
          />
          <ActivityItem
            agent="Claude-Agent-02"
            action="đã hoàn thành task bd-004"
            time="14:18"
            variant="success"
          />
          <ActivityItem
            agent="QA-Reviewer"
            action="phát hiện lỗi regression"
            time="14:10"
            variant="error"
            detail="Test suite: storage_test.go — 2/15 FAILED"
          />
          <ActivityItem
            agent="Orchestrator"
            action="escalation level 2 cho bd-005"
            time="13:55"
            variant="warning"
          />
        </div>
      </section>

      <div className="section-divider"><span>▼</span></div>

      {/* ──── Tab Panel ──── */}
      <section id="tab-panel-demo">
        <h2 className="section-label accent-cyan">
          <span className="section-dot" />
          Panel Tab
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          <code>ds-comp-tab-panel</code> — Bảng tab chuyển đổi nội dung với fade animation.
        </p>
        <div className="ve-card" style={{ padding: "16px" }}>
          <TabPanel
            tabs={[
              {
                id: "overview",
                label: "Tổng quan",
                badge: 3,
                content: (
                  <div>
                    <p style={{ color: "var(--text)", fontSize: "0.875rem" }}>
                      Tab tổng quan hiển thị thông tin chính của dự án. Số lượng badge cho biết có 3 mục cần chú ý.
                    </p>
                  </div>
                ),
              },
              {
                id: "details",
                label: "Chi tiết",
                content: (
                  <div>
                    <p style={{ color: "var(--text)", fontSize: "0.875rem" }}>
                      Nội dung chi tiết với các thông số kỹ thuật và cấu hình hệ thống.
                    </p>
                  </div>
                ),
              },
              {
                id: "disabled",
                label: "Bị khóa",
                disabled: true,
                content: <div />,
              },
            ]}
          />
        </div>
      </section>

      <div className="section-divider"><span>▼</span></div>

      {/* ──── PRD Components Preview ──── */}
      <section id="prd-components">
        <h2 className="section-label accent-teal">
          <span className="section-dot" />
          Thành phần PRD (Xem trước)
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px", fontSize: "0.875rem" }}>
          Các thành phần bổ sung: Approval Panel, RTM Row, Heatmap Cell, Graph Node, File Lease.
        </p>

        {/* File Lease indicators */}
        <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "16px 0 8px" }}>
          Chỉ báo Khóa tệp
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <span className="file-lease file-lease--unlocked">
            <span className="file-lease__icon" />
            <span className="file-lease__agent">Trống</span>
          </span>
          <span className="file-lease file-lease--locked">
            <span className="file-lease__icon" />
            <span className="file-lease__agent">Claude-01</span>
            <span className="file-lease__timer">12:45</span>
          </span>
          <span className="file-lease file-lease--expiring">
            <span className="file-lease__icon" />
            <span className="file-lease__agent">Agent-02</span>
            <span className="file-lease__timer">01:30</span>
          </span>
          <span className="file-lease file-lease--expired">
            <span className="file-lease__icon" />
            <span className="file-lease__agent">Agent-03</span>
            <span className="file-lease__timer">00:00</span>
          </span>
        </div>

        {/* Heatmap preview */}
        <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "16px 0 8px" }}>
          Heatmap Coverage
        </h3>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          <span className="heatmap-cell heatmap-cell--0">0%</span>
          <span className="heatmap-cell heatmap-cell--25">25%</span>
          <span className="heatmap-cell heatmap-cell--50">50%</span>
          <span className="heatmap-cell heatmap-cell--75">75%</span>
          <span className="heatmap-cell heatmap-cell--100">100%</span>
        </div>

        {/* Graph Nodes preview */}
        <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "16px 0 8px" }}>
          Graph Nodes
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          <span className="graph-node graph-node--document">
            <span className="graph-node__icon" />
            <span className="graph-node__label">PRD-01</span>
            <span className="graph-node__id">br-prd01</span>
          </span>
          <span className="graph-node graph-node--task">
            <span className="graph-node__icon" />
            <span className="graph-node__label">Setup MVCC</span>
            <span className="graph-node__id">bd-a1b2</span>
          </span>
          <span className="graph-node graph-node--commit">
            <span className="graph-node__icon" />
            <span className="graph-node__label">feat(storage)</span>
            <span className="graph-node__id">c81b32f</span>
          </span>
          <span className="graph-node graph-node--selected">
            <span className="graph-node__icon" style={{ background: "var(--node-prd)" }} />
            <span className="graph-node__label">Selected</span>
          </span>
          <span className="graph-node graph-node--dimmed">
            <span className="graph-node__icon" style={{ background: "var(--node-plan)" }} />
            <span className="graph-node__label">Dimmed</span>
          </span>
        </div>

        {/* RTM Row preview */}
        <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "16px 0 8px" }}>
          Ma trận Truy vết (RTM)
        </h3>
        <div className="rtm-table">
          <div className="rtm-row rtm-row--header">
            <span className="rtm-row__cell">PRD Section</span>
            <span className="rtm-row__cell">Plan Element</span>
            <span className="rtm-row__cell">Task</span>
            <span className="rtm-row__cell">Trạng thái</span>
          </div>
          <div className="rtm-row">
            <span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s1</span> Lớp Lưu trữ</span>
            <span className="rtm-row__cell"><span className="rtm-row__id">br-plan-01</span> Setup driver</span>
            <span className="rtm-row__cell"><span className="rtm-row__id">bd-a1b2</span> MVCC layer</span>
            <span className="rtm-row__badge rtm-row__badge--covered">Covered</span>
          </div>
          <div className="rtm-row">
            <span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s2</span> PM Fields</span>
            <span className="rtm-row__cell"><span className="rtm-row__id">br-plan-02</span> Schema migration</span>
            <span className="rtm-row__cell">—</span>
            <span className="rtm-row__badge rtm-row__badge--partial">Partial</span>
          </div>
          <div className="rtm-row">
            <span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s3</span> Universal Tracking</span>
            <span className="rtm-row__cell">—</span>
            <span className="rtm-row__cell">—</span>
            <span className="rtm-row__badge rtm-row__badge--gap">Gap</span>
          </div>
        </div>

        {/* Approval Panel preview */}
        <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "20px 0 8px" }}>
          Panel Phê duyệt
        </h3>
        <div className="approval-panel approval-panel--pending">
          <div className="approval-panel__section">
            <div className="approval-panel__section-header">
              <span className="approval-panel__section-icon">🧪</span>
              <span className="approval-panel__section-title">Test Result</span>
            </div>
            <div className="approval-panel__section-body">15/15 passed · 0 failed</div>
          </div>
          <div className="approval-panel__section">
            <div className="approval-panel__section-header">
              <span className="approval-panel__section-icon">📝</span>
              <span className="approval-panel__section-title">Code Diff</span>
            </div>
            <div className="approval-panel__section-body">+142 / -38 lines · 3 files</div>
          </div>
          <div className="approval-panel__section">
            <div className="approval-panel__section-header">
              <span className="approval-panel__section-icon">🔗</span>
              <span className="approval-panel__section-title">Beads ID</span>
            </div>
            <div className="approval-panel__section-body" style={{ fontFamily: "var(--font-mono)" }}>bd-a1b2</div>
          </div>
          <div className="approval-panel__section">
            <div className="approval-panel__section-header">
              <span className="approval-panel__section-icon">🚀</span>
              <span className="approval-panel__section-title">CI Status</span>
            </div>
            <div className="approval-panel__section-body">
              <span className="approval-panel__status">⏳ Đang chờ phê duyệt</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
