"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

/* SSR-safe: Sigma needs `window` */
const KnowledgeGraphViewer = dynamic(
  () => import("@/components/KnowledgeGraphViewer"),
  { ssr: false, loading: () => <div style={{ height: 520, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}><span style={{ color: "var(--text-dim)" }}>Đang tải đồ thị...</span></div> }
);

/* ─── Graph Data ─── */
const TYPE_COLORS: Record<string, string> = {
  prd: "#ff7b72", plan: "#d29922", task: "#3fb9a0", commit: "#d2a8ff", document: "#00e5ff",
};

const EDGE_STYLES: Record<string, { label: string; color: string }> = {
  satisfies: { label: "satisfies", color: "#d29922" },
  implements: { label: "implements", color: "#3fb9a0" },
  blocks: { label: "blocks", color: "#ff7b72" },
};

const graphData = {
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

export default function KnowledgeGraphScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((id: string | null) => setSelected(id), []);

  const selectedNode = selected ? graphData.nodes.find((n) => n.id === selected) : null;

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>🧠 Knowledge Graph</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Sigma.js (WebGL) + Graphology — kéo nodes, zoom/pan, hover highlight neighbors. PRD → Plan → Task → Commit.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {selected && selectedNode && (
            <div style={{ padding: "8px 12px", marginBottom: "12px", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
              🔍 Selected: <strong>{selectedNode.label}</strong> ({selectedNode.type}) — <span style={{ fontFamily: "var(--font-mono)" }}>{selectedNode.id}</span>
            </div>
          )}

          <KnowledgeGraphViewer data={graphData} onSelect={handleSelect} />

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "12px", fontSize: "0.75rem", color: "var(--text-dim)" }}>
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
                {type}
              </span>
            ))}
            <span style={{ color: "var(--border)" }}>|</span>
            {Object.entries(EDGE_STYLES).map(([type, s]) => (
              <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: 16, height: 2, background: s.color, display: "inline-block", borderRadius: 1 }} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {state === "loading" && <div className="ve-card" style={{ padding: "24px" }}><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={5} /></div></div>}
      {state === "empty" && <EmptyState icon="🧠" title="Đồ thị trống" desc="Chưa có document nào được liên kết. Tạo liên kết PRD → Plan → Task qua Beads ID."><button className="btn-primary">+ Tạo liên kết</button></EmptyState>}
      {state === "error" && <ErrorBanner title="Lỗi truy vấn đồ thị" message="Graph query timeout after 5000ms. Dữ liệu quá lớn hoặc FrankenSQLite bị lock." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Mất kết nối — Đồ thị hiển thị cache cũ<span className="offline-banner__timer">10s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền Architect</div><div className="forbidden-gate__desc">Knowledge Graph chỉ dành cho vai trò Architect và PMO.</div><div className="forbidden-gate__code">HTTP 403 — role:architect required</div></div>}
    </div>
  );
}
