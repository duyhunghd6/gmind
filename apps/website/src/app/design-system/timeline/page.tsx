"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import ActivityItem from "@/components/ActivityItem";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const activityEvents = [
  { agent: "Claude-01", action: "đã khóa file src/storage/driver.go", time: "14:23", variant: "info" as const, detail: "Lease timeout: 15 phút · reason: bd-003" },
  { agent: "Claude-02", action: "đã hoàn thành task bd-004", time: "14:18", variant: "success" as const },
  { agent: "QA-Reviewer", action: "phát hiện lỗi regression", time: "14:10", variant: "error" as const, detail: "Test suite: storage_test.go — 2/15 FAILED" },
  { agent: "Orchestrator", action: "escalation level 2 cho bd-005", time: "13:55", variant: "warning" as const },
  { agent: "Claude-01", action: "mở file lease cho schema.go", time: "13:40", variant: "info" as const },
  { agent: "PMO-Agent", action: "tạo task mới bd-009", time: "13:30", variant: "success" as const, detail: "bd-009: Implement RTM query endpoint — P1" },
  { agent: "Claude-03", action: "push commit feat(cli): add gmind init", time: "13:15", variant: "success" as const, detail: "3 files changed, +142 −38" },
  { agent: "QA-Reviewer", action: "approved PR #42", time: "13:00", variant: "success" as const, detail: "feat(storage): FrankenSQLite driver v0.1 — LGTM" },
  { agent: "Orchestrator", action: "đã phân phối 4 tasks mới cho Sprint W10", time: "12:45", variant: "info" as const },
  { agent: "Claude-02", action: "bắt đầu task bd-012 Lease Manager", time: "12:30", variant: "info" as const, detail: "File lease acquired: lease_manager.go" },
  { agent: "DevOps-Bot", action: "CI pipeline passed — all green", time: "12:15", variant: "success" as const, detail: "42/42 tests · build 8.7s · security scan clean" },
  { agent: "PMO-Agent", action: "cập nhật RTM coverage: 67% → 72%", time: "12:00", variant: "success" as const },
  { agent: "Claude-01", action: "giải phóng lease cho driver.go", time: "11:45", variant: "info" as const, detail: "Lease expired — auto-released after 15 min" },
  { agent: "QA-Reviewer", action: "tạo bug report bd-b05", time: "11:30", variant: "error" as const, detail: "FrankenSQLite deadlock on concurrent writes — P0 Critical" },
];

const timelineEntries = [
  { time: "08:30", title: "Daily standup", desc: "4 agents report status — 2 blockers identified" },
  { time: "09:00", title: "Sprint khởi động", desc: "Planning meeting — 12 tasks assigned cho Sprint W10" },
  { time: "09:30", title: "Architecture review", desc: "ADR-001 approved: FrankenSQLite chosen over DoltDB" },
  { time: "10:30", title: "First commit merged", desc: "feat(storage): FrankenSQLite driver v0.1 — PR #42" },
  { time: "11:00", title: "Spike completed", desc: "Spike: Zvec Indexer Pipeline — recommend Annoy-based approach" },
  { time: "12:00", title: "CI/CD pipeline green", desc: "All 42 tests passed · Build artifacts uploaded to Vercel" },
  { time: "13:00", title: "Bug escalation", desc: "P0 deadlock detected — Orchestrator escalated to Level 2" },
  { time: "14:00", title: "Code review completed", desc: "PR #43 approved by QA-Reviewer — 3 files, +142/−38 lines" },
  { time: "15:00", title: "Hotfix deployed", desc: "fix(mvcc): resolve deadlock — cherry-picked to release/v1.0" },
  { time: "16:00", title: "Release candidate", desc: "Tag v1.0-rc1 created on master — deploy to staging" },
  { time: "17:00", title: "Sprint retro", desc: "Velocity: 24 points · 3 tasks carried over to next sprint" },
];

export default function TimelineScreen() {
  const [state, setState] = useState<ScreenState>("default");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>📅 Timeline & Activity Feed</h1>
        <DsIdBadge id="ds:screen:timeline-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-activity-item</code> + <code>ds-lay-timeline</code> + <code>ds-comp-file-lease</code>
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* File Lease indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>Chỉ báo Khóa tệp</h3>
            <DsIdBadge id="ds:timeline:fileLease-001" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
            <span className="file-lease file-lease--unlocked"><span className="file-lease__icon" /><span className="file-lease__agent">Trống</span></span>
            <span className="file-lease file-lease--locked"><span className="file-lease__icon" /><span className="file-lease__agent">Claude-01</span><span className="file-lease__timer">12:45</span></span>
            <span className="file-lease file-lease--locked"><span className="file-lease__icon" /><span className="file-lease__agent">Claude-02</span><span className="file-lease__timer">08:30</span></span>
            <span className="file-lease file-lease--expiring"><span className="file-lease__icon" /><span className="file-lease__agent">Claude-03</span><span className="file-lease__timer">01:30</span></span>
            <span className="file-lease file-lease--expired"><span className="file-lease__icon" /><span className="file-lease__agent">Agent-04</span><span className="file-lease__timer">00:00</span></span>
            <span className="file-lease file-lease--locked"><span className="file-lease__icon" /><span className="file-lease__agent">QA</span><span className="file-lease__timer">14:55</span></span>
          </div>

          {/* Activity Feed */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>Nhật ký Hoạt động ({activityEvents.length} events)</h3>
            <DsIdBadge id="ds:timeline:activityFeed-001" />
          </div>
          <div className="ve-card" style={{ padding: "16px", maxHeight: "400px", overflow: "auto" }}>
            {activityEvents.map((evt, i) => (
              <ActivityItem key={i} agent={evt.agent} action={evt.action} time={evt.time} variant={evt.variant} detail={evt.detail} />
            ))}
          </div>

          {/* Alternating Timeline */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "24px 0 8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>Timeline — Sprint Day ({timelineEntries.length} entries)</h3>
            <DsIdBadge id="ds:timeline:sprintDay-001" />
          </div>
          <div className="timeline">
            {timelineEntries.map((item, i) => (
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

      {state === "loading" && <div className="ve-card" style={{ padding: "16px" }}>{[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton-row" style={{ marginBottom: "16px" }}><Skeleton variant="circle" /><div style={{ flex: 1 }}><Skeleton count={2} /></div></div>)}</div>}
      {state === "empty" && <EmptyState icon="📅" title="Chưa có hoạt động" desc="Nhật ký sẽ hiển thị khi các Agent bắt đầu làm việc." />}
      {state === "error" && <ErrorBanner title="Lỗi tải nhật ký" message="Event stream disconnected unexpectedly." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Event stream mất kết nối<span className="offline-banner__timer">3s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Không có quyền</div><div className="forbidden-gate__desc">Cần quyền Observer trở lên để xem Activity Feed.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
