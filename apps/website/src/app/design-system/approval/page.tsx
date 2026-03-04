"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

export default function ApprovalScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [approvalState, setApprovalState] = useState<"pending" | "approved" | "rejected">("pending");

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>✅ Phê duyệt & RTM</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-approval-panel</code> + <code>ds-comp-rtm-row</code> + <code>ds-comp-heatmap-cell</code>
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* Approval State Toggle */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px" }}>Panel Phê duyệt</h3>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {(["pending", "approved", "rejected"] as const).map((s) => (
              <button key={s} className={`state-toggle-bar__btn${approvalState === s ? " state-toggle-bar__btn--active" : ""}`} onClick={() => setApprovalState(s)}>
                {s === "pending" ? "⏳ Pending" : s === "approved" ? "✅ Approved" : "❌ Rejected"}
              </button>
            ))}
          </div>
          <div className={`approval-panel approval-panel--${approvalState}`}>
            <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🧪</span><span className="approval-panel__section-title">Test Result</span></div><div className="approval-panel__section-body">15/15 passed · 0 failed</div></div>
            <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">📝</span><span className="approval-panel__section-title">Code Diff</span></div><div className="approval-panel__section-body">+142 / −38 lines · 3 files</div></div>
            <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🔗</span><span className="approval-panel__section-title">Beads ID</span></div><div className="approval-panel__section-body" style={{ fontFamily: "var(--font-mono)" }}>bd-a1b2</div></div>
            <div className="approval-panel__section"><div className="approval-panel__section-header"><span className="approval-panel__section-icon">📋</span><span className="approval-panel__section-title">PRD Link</span></div><div className="approval-panel__section-body">PRD-02 §2.1 (Storage Layer)</div></div>
            <div className="approval-panel__section" style={{ gridColumn: "1 / -1" }}><div className="approval-panel__section-header"><span className="approval-panel__section-icon">🚀</span><span className="approval-panel__section-title">CI Status</span></div><div className="approval-panel__section-body"><span className={`approval-panel__status`}>{approvalState === "pending" ? "⏳ Đang chờ phê duyệt" : approvalState === "approved" ? "✅ Đã phê duyệt" : "❌ Bị từ chối"}</span></div></div>
          </div>

          {/* RTM */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "24px 0 8px" }}>Ma trận Truy vết (RTM)</h3>
          <div className="rtm-table">
            <div className="rtm-row rtm-row--header"><span className="rtm-row__cell">PRD Section</span><span className="rtm-row__cell">Plan Element</span><span className="rtm-row__cell">Task</span><span className="rtm-row__cell">Trạng thái</span></div>
            <div className="rtm-row"><span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s1</span> Lớp Lưu trữ</span><span className="rtm-row__cell"><span className="rtm-row__id">br-plan-01</span> Setup driver</span><span className="rtm-row__cell"><span className="rtm-row__id">bd-a1b2</span> MVCC layer</span><span className="rtm-row__badge rtm-row__badge--covered">Covered</span></div>
            <div className="rtm-row"><span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s2</span> PM Fields</span><span className="rtm-row__cell"><span className="rtm-row__id">br-plan-02</span> Schema</span><span className="rtm-row__cell">—</span><span className="rtm-row__badge rtm-row__badge--partial">Partial</span></div>
            <div className="rtm-row"><span className="rtm-row__cell"><span className="rtm-row__id">br-prd02-s3</span> Tracking</span><span className="rtm-row__cell">—</span><span className="rtm-row__cell">—</span><span className="rtm-row__badge rtm-row__badge--gap">Gap</span></div>
          </div>

          {/* Heatmap */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "24px 0 8px" }}>Coverage Heatmap</h3>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[0, 25, 50, 75, 100, 75, 50, 100, 0, 25, 100, 75, 50, 25, 100].map((v, i) => (
              <span key={i} className={`heatmap-cell heatmap-cell--${v}`}>{v}%</span>
            ))}
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
