"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const rtmRows = [
  { prd: "br-prd02-s1", prdLabel: "Lớp Lưu trữ", plan: "br-plan-01", planLabel: "Setup driver", task: "bd-a1b2", taskLabel: "MVCC layer", status: "covered" },
  { prd: "br-prd02-s2", prdLabel: "PM Fields", plan: "br-plan-02", planLabel: "Schema", task: "bd-c3d4", taskLabel: "Migration", status: "covered" },
  { prd: "br-prd02-s3", prdLabel: "Tracking", plan: "br-plan-05", planLabel: "Beads ID", task: "bd-k1l2", taskLabel: "RTM Query", status: "partial" },
  { prd: "br-prd03-s1", prdLabel: "CLI Gateway", plan: "br-plan-03", planLabel: "CLI Setup", task: "bd-e5f6", taskLabel: "gmind CLI", status: "covered" },
  { prd: "br-prd04-s1", prdLabel: "Agent Orchestration", plan: "br-plan-04", planLabel: "Orchestrator", task: "bd-g7h8", taskLabel: "Lease Manager", status: "partial" },
  { prd: "br-prd04-s2", prdLabel: "Event Stream", plan: "br-plan-04", planLabel: "Orchestrator", task: "bd-i9j0", taskLabel: "Event Stream", status: "covered" },
  { prd: "br-prd05-s1", prdLabel: "RTM Engine", plan: "—", planLabel: "", task: "—", taskLabel: "", status: "gap" },
  { prd: "br-prd05-s2", prdLabel: "Heatmap", plan: "br-plan-05", planLabel: "Beads ID", task: "bd-m3n4", taskLabel: "Heatmap Gen", status: "partial" },
  { prd: "br-prd05-s3", prdLabel: "Coverage API", plan: "—", planLabel: "", task: "—", taskLabel: "", status: "gap" },
  { prd: "br-prd02-s4", prdLabel: "Vector Index", plan: "br-plan-01", planLabel: "Setup driver", task: "bd-o5p6", taskLabel: "Vector Index", status: "partial" },
];

const heatmapData = [
  100, 75, 50, 100, 0, 25, 75, 100, 50, 100,
  75, 50, 25, 100, 75, 0, 100, 50, 75, 25,
  100, 100, 75, 50, 0, 100, 25, 75, 50, 100,
];

const approvalPanels = [
  { id: "bd-a1b2", task: "MVCC Layer", tests: "15/15 passed", diff: "+142 / −38 lines · 3 files", prd: "PRD-02 §2.1 (Storage Layer)", ci: "green" },
  { id: "bd-e5f6", task: "gmind CLI Gateway", tests: "22/22 passed", diff: "+287 / −45 lines · 5 files", prd: "PRD-03 §1.1 (CLI Interface)", ci: "green" },
  { id: "bd-g7h8", task: "Lease Manager", tests: "8/10 passed", diff: "+95 / −12 lines · 2 files", prd: "PRD-04 §2.1 (Agent Orchestration)", ci: "warning" },
];

export default function ApprovalScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [approvalStates, setApprovalStates] = useState<Record<string, "pending" | "approved" | "rejected">>({
    "bd-a1b2": "approved",
    "bd-e5f6": "pending",
    "bd-g7h8": "rejected",
  });

  const toggleApproval = (id: string, newState: "pending" | "approved" | "rejected") => {
    setApprovalStates((prev) => ({ ...prev, [id]: newState }));
  };

  // RTM stats
  const covered = rtmRows.filter(r => r.status === "covered").length;
  const partial = rtmRows.filter(r => r.status === "partial").length;
  const gaps = rtmRows.filter(r => r.status === "gap").length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>✅ Phê duyệt & RTM</h1>
        <DsIdBadge id="ds:screen:approval-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-approval-panel</code> + <code>ds-comp-rtm-row</code> + <code>ds-comp-heatmap-cell</code>
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* Multiple Approval Panels */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>Panels Phê duyệt ({approvalPanels.length} tasks)</h3>
            <DsIdBadge id="ds:approval:panels-001" />
          </div>
          <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
            {approvalPanels.map((panel) => {
              const aState = approvalStates[panel.id] || "pending";
              return (
                <div key={panel.id}>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "8px", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>{panel.id}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>— {panel.task}</span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                      {(["pending", "approved", "rejected"] as const).map((s) => (
                        <button key={s} className={`state-toggle-bar__btn${aState === s ? " state-toggle-bar__btn--active" : ""}`} onClick={() => toggleApproval(panel.id, s)} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                          {s === "pending" ? "⏳" : s === "approved" ? "✅" : "❌"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`approval-panel approval-panel--${aState}`}>
                    <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🧪</span><span className="approval-panel__section-title">Tests</span></div><div className="approval-panel__section-body">{panel.tests}</div></div>
                    <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">📝</span><span className="approval-panel__section-title">Diff</span></div><div className="approval-panel__section-body">{panel.diff}</div></div>
                    <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🔗</span><span className="approval-panel__section-title">Beads ID</span></div><div className="approval-panel__section-body" style={{ fontFamily: "var(--font-mono)" }}>{panel.id}</div></div>
                    <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">📋</span><span className="approval-panel__section-title">PRD</span></div><div className="approval-panel__section-body">{panel.prd}</div></div>
                    <div className="approval-panel__section" style={{ gridColumn: "1 / -1" }}><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🚀</span><span className="approval-panel__section-title">CI</span></div><div className="approval-panel__section-body"><span className="approval-panel__status">{aState === "pending" ? "⏳ Đang chờ phê duyệt" : aState === "approved" ? "✅ Đã phê duyệt" : "❌ Bị từ chối"}</span></div></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RTM */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
              Ma trận Truy vết (RTM)
              <span style={{ fontWeight: 400, fontSize: "0.7rem", color: "var(--text-dim)", marginLeft: "8px" }}>
                {covered} covered · {partial} partial · {gaps} gap
              </span>
            </h3>
            <DsIdBadge id="ds:approval:rtmMatrix-001" />
          </div>
          <div className="rtm-table">
            <div className="rtm-row rtm-row--header"><span className="rtm-row__cell">PRD Section</span><span className="rtm-row__cell">Plan Element</span><span className="rtm-row__cell">Task</span><span className="rtm-row__cell">Trạng thái</span></div>
            {rtmRows.map((row, i) => (
              <div key={i} className="rtm-row">
                <span className="rtm-row__cell"><span className="rtm-row__id">{row.prd}</span> {row.prdLabel}</span>
                <span className="rtm-row__cell">{row.plan !== "—" ? <><span className="rtm-row__id">{row.plan}</span> {row.planLabel}</> : "—"}</span>
                <span className="rtm-row__cell">{row.task !== "—" ? <><span className="rtm-row__id">{row.task}</span> {row.taskLabel}</> : "—"}</span>
                <span className={`rtm-row__badge rtm-row__badge--${row.status}`}>{row.status === "covered" ? "Covered" : row.status === "partial" ? "Partial" : "Gap"}</span>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "24px 0 8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>Coverage Heatmap ({heatmapData.length} sections)</h3>
            <DsIdBadge id="ds:approval:coverageHeatmap-001" />
          </div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {heatmapData.map((v, i) => (
              <span key={i} className={`heatmap-cell heatmap-cell--${v}`} style={{ width: "38px", textAlign: "center" }}>{v}%</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px", fontSize: "0.65rem", color: "var(--text-dim)" }}>
            <span>Avg: {Math.round(heatmapData.reduce((a, b) => a + b, 0) / heatmapData.length)}%</span>
            <span>Full: {heatmapData.filter(v => v === 100).length}/{heatmapData.length}</span>
            <span>Gaps: {heatmapData.filter(v => v === 0).length}</span>
          </div>
        </div>
      )}

      {state === "loading" && <div><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={5} /></div></div>}
      {state === "empty" && <EmptyState icon="✅" title="Không có yêu cầu phê duyệt" desc="Chưa có task nào cần Level 3 Approval." />}
      {state === "error" && <ErrorBanner title="Lỗi tải dữ liệu RTM" message="SQL query failed: beads_rust process exited" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Sync mất kết nối — RTM hiển thị dữ liệu cache<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền Reviewer</div><div className="forbidden-gate__desc">Approval Panel chỉ dành cho QA Reviewer và PMO.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
