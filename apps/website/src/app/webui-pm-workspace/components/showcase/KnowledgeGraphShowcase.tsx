"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { graphPresets, TYPE_COLORS, EDGE_STYLES } from "@/data/knowledge-graph-data";

/* SSR-safe: Sigma needs `window` */
const KnowledgeGraphViewer = dynamic(
  () => import("@/components/KnowledgeGraphViewer"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: 420, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <span style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Đang tải đồ thị...</span>
      </div>
    )
  }
);

export function KnowledgeGraphShowcase({
  state = "default",
  onAction,
}: {
  state?: string;
  onAction?: (e: string, target?: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [presetId, setPresetId] = useState("simple");

  /* Auto-select preset from URL hash (on mount + on hash change) */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && graphPresets.some((p) => p.id === hash)) {
        setPresetId(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const handleSelect = useCallback((id: string | null) => setSelected(id), []);

  const preset = graphPresets.find((p) => p.id === presetId) || graphPresets[0];
  const selectedNode = selected ? preset.data.nodes.find((n) => n.id === selected) : null;

  return (
    <div aria-label="Knowledge Graph Screen">
      {state === "default" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Preset Selector */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            {graphPresets.map((p) => (
              <button
                key={p.id}
                className={`state-toggle-bar__btn${presetId === p.id ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => {
                  setPresetId(p.id);
                  setSelected(null);
                  if (onAction) onAction("EVENT_HASH_NAVIGATE", p.id);
                }}
                style={{ fontSize: "0.75rem" }}
              >
                {p.label}
                <span style={{ fontSize: "0.65rem", opacity: 0.7, marginLeft: "4px" }}>
                  ({p.data.nodes.length} nodes)
                </span>
              </button>
            ))}
            <DsIdBadge id="ds:knowledgeGraph:presetSelector-001" />
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", margin: 0 }}>{preset.description}</p>

          {selected && selectedNode && (
            <div style={{ padding: "8px 12px", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
              🔍 Selected: <strong>{selectedNode.label}</strong> ({selectedNode.type}) — <span style={{ fontFamily: "var(--font-mono)" }}>{selectedNode.id}</span>
            </div>
          )}

          <div style={{ position: "relative", height: "420px" }}>
            <KnowledgeGraphViewer key={presetId} data={preset.data} onSelect={handleSelect} />
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "0.75rem", color: "var(--text-dim)" }}>
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
          <div style={{ display: "flex", gap: "16px", fontSize: "0.7rem", color: "var(--text-dim)" }}>
            <span>📊 {preset.data.nodes.length} nodes</span>
            <span>🔗 {preset.data.edges.length} edges</span>
            <span>📦 {[...new Set(preset.data.nodes.map((n) => n.type))].length} types</span>
          </div>
        </div>
      )}

      {state === "loading" && (
        <div className="ve-card" style={{ padding: "24px" }}>
          <Skeleton variant="card" />
          <div style={{ marginTop: "16px" }}><Skeleton count={5} /></div>
        </div>
      )}

      {state === "empty" && (
        <EmptyState
          icon="🧠"
          title="Đồ thị trống"
          desc="Chưa có document nào được liên kết. Tạo liên kết PRD → Plan → Task qua Beads ID."
        >
          <button className="btn-primary">+ Tạo liên kết</button>
        </EmptyState>
      )}

      {state === "error" && (
        <ErrorBanner
          title="Lỗi truy vấn đồ thị"
          message="Graph query timeout after 5000ms. Dữ liệu quá lớn hoặc FrankenSQLite bị lock."
          onRetry={() => onAction && onAction("EVENT_REFRESH")}
          fullpage
        />
      )}

      {state === "offline" && (
        <div className="offline-banner">
          <span className="offline-banner__icon">📡</span>Mất kết nối — Đồ thị hiển thị cache cũ
          <span className="offline-banner__timer">10s</span>
        </div>
      )}

      {state === "forbidden" && (
        <div className="forbidden-gate">
          <div className="forbidden-gate__icon">🔒</div>
          <div className="forbidden-gate__title">Cần quyền Architect</div>
          <div className="forbidden-gate__desc">Knowledge Graph chỉ dành cho vai trò Architect và PMO.</div>
          <div className="forbidden-gate__code">HTTP 403 — role:architect required</div>
        </div>
      )}
    </div>
  );
}
