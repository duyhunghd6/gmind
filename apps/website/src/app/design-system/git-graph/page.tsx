"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import GitGraph from "@/components/GitGraph";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const branches = [
  { name: "master", color: "#58a6ff", className: "master" },
  { name: "develop", color: "#d2a8ff", className: "develop" },
  { name: "feature/storage", color: "#3fb9a0", className: "feature-1" },
  { name: "hotfix/fix-mvcc", color: "#ff7b72", className: "hotfix" },
  { name: "release/v1.0", color: "#79c0ff", className: "release" },
];

const commits = [
  { id: "c1", branch: "master", x: 60, y: 40, tag: "v0.1" },
  { id: "c2", branch: "master", x: 200, y: 40 },
  { id: "c3", branch: "master", x: 440, y: 40, tag: "v1.0" },
  { id: "c4", branch: "develop", x: 120, y: 100 },
  { id: "c5", branch: "develop", x: 260, y: 100 },
  { id: "c6", branch: "develop", x: 360, y: 100 },
  { id: "c7", branch: "feature/storage", x: 180, y: 160 },
  { id: "c8", branch: "feature/storage", x: 280, y: 160 },
  { id: "c9", branch: "hotfix/fix-mvcc", x: 140, y: 220 },
  { id: "c10", branch: "release/v1.0", x: 380, y: 220 },
];

const connections = [
  { from: { x: 60, y: 40 }, to: { x: 200, y: 40 }, branch: "master" },
  { from: { x: 200, y: 40 }, to: { x: 440, y: 40 }, branch: "master" },
  { from: { x: 60, y: 40 }, to: { x: 120, y: 100 }, branch: "develop" },
  { from: { x: 120, y: 100 }, to: { x: 260, y: 100 }, branch: "develop" },
  { from: { x: 260, y: 100 }, to: { x: 360, y: 100 }, branch: "develop" },
  { from: { x: 360, y: 100 }, to: { x: 440, y: 40 }, branch: "develop" },
  { from: { x: 120, y: 100 }, to: { x: 180, y: 160 }, branch: "feature/storage" },
  { from: { x: 180, y: 160 }, to: { x: 280, y: 160 }, branch: "feature/storage" },
  { from: { x: 280, y: 160 }, to: { x: 360, y: 100 }, branch: "feature/storage" },
  { from: { x: 60, y: 40 }, to: { x: 140, y: 220 }, branch: "hotfix/fix-mvcc" },
  { from: { x: 140, y: 220 }, to: { x: 200, y: 40 }, branch: "hotfix/fix-mvcc" },
  { from: { x: 360, y: 100 }, to: { x: 380, y: 220 }, branch: "release/v1.0" },
  { from: { x: 380, y: 220 }, to: { x: 440, y: 40 }, branch: "release/v1.0" },
];

export default function GitGraphScreen() {
  const [state, setState] = useState<ScreenState>("default");

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>🌿 Đồ thị Git</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-git-graph</code> — Trực quan hóa nhánh Git với SVG, color-coded branches, tag badges.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          <div className="ve-card" style={{ padding: "16px" }}>
            <GitGraph branches={branches} commits={commits} connections={connections} width={520} height={260} />
          </div>
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, margin: "16px 0 8px" }}>Branch Colors</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {branches.map((b) => (
              <span key={b.name} className="git-graph__tag" style={{ background: `${b.color}22`, color: b.color, border: `1px solid ${b.color}44` }}>
                {b.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {state === "loading" && (
        <div className="ve-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {[1, 2, 3, 4].map(i => <Skeleton key={i} variant="bar" width={`${60 + i * 20}px`} />)}
          </div>
          <Skeleton variant="card" />
        </div>
      )}

      {state === "empty" && <EmptyState icon="🌿" title="Chưa có lịch sử commit" desc="Repository trống. Tạo commit đầu tiên để bắt đầu tracking."><button className="btn-primary">git init</button></EmptyState>}
      {state === "error" && <ErrorBanner title="Không thể đọc git log" message="fatal: not a git repository — .git directory not found" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Không thể fetch remote branches<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Repository riêng tư</div><div className="forbidden-gate__desc">Bạn không có quyền truy cập repository này.</div><div className="forbidden-gate__code">HTTP 403 — Forbidden</div></div>}
    </div>
  );
}
