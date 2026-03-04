"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { graphPresets, TYPE_COLORS, EDGE_STYLES } from "@/data/knowledge-graph-data";

/* SSR-safe: Sigma needs `window` */
const KnowledgeGraphViewer = dynamic(
  () => import("@/components/KnowledgeGraphViewer"),
  { ssr: false, loading: () => <div style={{ height: 520, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}><span style={{ color: "var(--text-dim)" }}>Đang tải đồ thị...</span></div> }
);

export default function KnowledgeGraphScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [selected, setSelected] = useState<string | null>(null);
  const [presetId, setPresetId] = useState("simple");

  const handleSelect = useCallback((id: string | null) => setSelected(id), []);

  const preset = graphPresets.find((p) => p.id === presetId) || graphPresets[0];
  const selectedNode = selected ? preset.data.nodes.find((n) => n.id === selected) : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Knowledge Graph</h1>
        <DsIdBadge id="ds:screen:knowledge-graph-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Sigma.js (WebGL) + Graphology — kéo nodes, zoom/pan, hover highlight neighbors. PRD → Plan → Task → Commit.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* Preset Selector */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            {graphPresets.map((p) => (
              <button
                key={p.id}
                className={`state-toggle-bar__btn${presetId === p.id ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => { setPresetId(p.id); setSelected(null); }}
              >
                {p.label}
                <span style={{ fontSize: "0.65rem", opacity: 0.7, marginLeft: "4px" }}>
                  ({p.data.nodes.length} nodes)
                </span>
              </button>
            ))}
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginBottom: "12px" }}>{preset.description}</p>

          {selected && selectedNode && (
            <div style={{ padding: "8px 12px", marginBottom: "12px", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
              🔍 Selected: <strong>{selectedNode.label}</strong> ({selectedNode.type}) — <span style={{ fontFamily: "var(--font-mono)" }}>{selectedNode.id}</span>
            </div>
          )}

          <KnowledgeGraphViewer key={presetId} data={preset.data} onSelect={handleSelect} />

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "12px", fontSize: "0.75rem", color: "var(--text-dim)" }}>
            {Object.entries(TYPE_COLORS)
              .filter(([type]) => preset.data.nodes.some((n) => n.type === type))
              .map(([type, color]) => (
                <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
                  {type}
                </span>
              ))}
            <span style={{ color: "var(--border)" }}>|</span>
            {Object.entries(EDGE_STYLES)
              .filter(([type]) => preset.data.edges.some((e) => e.type === type))
              .map(([type, s]) => (
                <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: 16, height: 2, background: s.color, display: "inline-block", borderRadius: 1 }} />
                  {s.label}
                </span>
              ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "16px", marginTop: "12px", fontSize: "0.7rem", color: "var(--text-dim)" }}>
            <span>📊 {preset.data.nodes.length} nodes</span>
            <span>🔗 {preset.data.edges.length} edges</span>
            <span>📦 {[...new Set(preset.data.nodes.map((n) => n.type))].length} types</span>
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
