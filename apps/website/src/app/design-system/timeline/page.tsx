"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import ActivityItem from "@/components/ActivityItem";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

export default function TimelineScreen() {
  const [state, setState] = useState<ScreenState>("default");

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>📅 Timeline & Activity Feed</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-activity-item</code> + <code>ds-lay-timeline</code> + <code>ds-comp-file-lease</code>
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* File Lease indicators */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px" }}>Chỉ báo Khóa tệp</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
            <span className="file-lease file-lease--unlocked"><span className="file-lease__icon" /><span className="file-lease__agent">Trống</span></span>
            <span className="file-lease file-lease--locked"><span className="file-lease__icon" /><span className="file-lease__agent">Claude-01</span><span className="file-lease__timer">12:45</span></span>
            <span className="file-lease file-lease--expiring"><span className="file-lease__icon" /><span className="file-lease__agent">Agent-02</span><span className="file-lease__timer">01:30</span></span>
            <span className="file-lease file-lease--expired"><span className="file-lease__icon" /><span className="file-lease__agent">Agent-03</span><span className="file-lease__timer">00:00</span></span>
          </div>

          {/* Activity Feed */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px" }}>Nhật ký Hoạt động</h3>
          <div className="ve-card" style={{ padding: "16px" }}>
            <ActivityItem agent="Claude-01" action="đã khóa file src/storage/driver.go" time="14:23" variant="info" detail="Lease timeout: 15 phút · reason: bd-003" />
            <ActivityItem agent="Claude-02" action="đã hoàn thành task bd-004" time="14:18" variant="success" />
            <ActivityItem agent="QA-Reviewer" action="phát hiện lỗi regression" time="14:10" variant="error" detail="Test suite: storage_test.go — 2/15 FAILED" />
            <ActivityItem agent="Orchestrator" action="escalation level 2 cho bd-005" time="13:55" variant="warning" />
            <ActivityItem agent="Claude-01" action="mở file lease cho schema.go" time="13:40" variant="info" />
            <ActivityItem agent="PMO-Agent" action="tạo task mới bd-009" time="13:30" variant="success" detail="bd-009: Implement RTM query endpoint — P1" />
          </div>

          {/* Alternating Timeline */}
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "24px 0 8px" }}>Timeline (Xen kẽ)</h3>
          <div className="timeline">
            {[
              { time: "09:00", title: "Sprint khởi động", desc: "Planning meeting — 12 tasks assigned" },
              { time: "10:30", title: "First commit merged", desc: "feat(storage): FrankenSQLite driver v0.1" },
              { time: "12:00", title: "CI/CD pipeline green", desc: "All 42 tests passed" },
              { time: "14:00", title: "Code review completed", desc: "PR #43 approved by QA-Reviewer" },
              { time: "16:00", title: "Release candidate", desc: "Tag v1.0-rc1 created on master" },
            ].map((item, i) => (
              <div key={i} className="timeline__item">
                <span className="timeline__dot" />
                <div className="timeline__content">
                  <div className="timeline__time">{item.time}</div>
                  <div className="timeline__title">{item.title}</div>
                  <div className="timeline__desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state === "loading" && <div className="ve-card" style={{ padding: "16px" }}>{[1, 2, 3, 4].map(i => <div key={i} className="skeleton-row" style={{ marginBottom: "16px" }}><Skeleton variant="circle" /><div style={{ flex: 1 }}><Skeleton count={2} /></div></div>)}</div>}
      {state === "empty" && <EmptyState icon="📅" title="Chưa có hoạt động" desc="Nhật ký sẽ hiển thị khi các Agent bắt đầu làm việc." />}
      {state === "error" && <ErrorBanner title="Lỗi tải nhật ký" message="Event stream disconnected unexpectedly." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Event stream mất kết nối<span className="offline-banner__timer">3s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Không có quyền</div><div className="forbidden-gate__desc">Cần quyền Observer trở lên để xem Activity Feed.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
