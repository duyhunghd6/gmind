"use client";

import { useState } from "react";
import Link from "next/link";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { beadsNodes, beadsEdges, NODE_TYPE_META, EDGE_TYPE_META, type BeadsNode } from "@/data/beads-traversal-data";

/* Group nodes by layer */
const layers: { type: string; label: string; color: string }[] = [
  { type: "prd-section", label: "PRD Sections", color: "#ff7b72" },
  { type: "plan", label: "Plan Elements", color: "#d29922" },
  { type: "task", label: "Tasks", color: "#3fb9a0" },
  { type: "commit", label: "Commits", color: "#d2a8ff" },
];

function getChildren(nodeId: string): string[] {
  return beadsEdges.filter((e) => e.target === nodeId).map((e) => e.source);
}

function getParents(nodeId: string): string[] {
  return beadsEdges.filter((e) => e.source === nodeId).map((e) => e.target);
}

export default function BeadsTraversalScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");

  const selected = selectedId ? beadsNodes.find((n) => n.id === selectedId) : null;
  const children = selectedId ? getChildren(selectedId) : [];
  const parents = selectedId ? getParents(selectedId) : [];

  const statusColor = (s: string) => {
    const map: Record<string, string> = { covered: "#3fb9a0", done: "#3fb9a0", merged: "#3fb9a0", partial: "#d29922", "in-progress": "#d29922", gap: "#ff7b72", open: "#8b949e" };
    return map[s] || "#8b949e";
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🔗 Beads Traversal</h1>
        <DsIdBadge id="ds:screen:beads-traversal-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Universal ID — chuỗi liên kết cứng 3 tầng: <code>PRD Section</code> ← satisfies ← <code>Plan</code> ← implements ← <code>Task</code> ← commit-for ← <code>Commit</code>
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 300px" : "1fr", gap: "16px" }}>
          {/* Main DAG View */}
          <div>
            {/* Direction Toggle */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
              <button className={`state-toggle-bar__btn${direction === "forward" ? " state-toggle-bar__btn--active" : ""}`} onClick={() => setDirection("forward")} style={{ fontSize: "0.75rem" }}>
                ↓ Forward (PRD → Commit)
              </button>
              <button className={`state-toggle-bar__btn${direction === "reverse" ? " state-toggle-bar__btn--active" : ""}`} onClick={() => setDirection("reverse")} style={{ fontSize: "0.75rem" }}>
                ↑ Reverse (Commit → PRD)
              </button>
            </div>

            {/* Layer-based DAG */}
            {(direction === "forward" ? layers : [...layers].reverse()).map((layer) => {
              const layerNodes = beadsNodes.filter((n) => n.type === layer.type);
              if (layerNodes.length === 0) return null;
              return (
                <div key={layer.type} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: layer.color, display: "inline-block" }} />
                    <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text)" }}>{layer.label}</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>({layerNodes.length})</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "20px", borderLeft: `2px solid ${layer.color}33` }}>
                    {layerNodes.map((node) => {
                      const isSelected = node.id === selectedId;
                      const isLinked = selectedId ? children.includes(node.id) || parents.includes(node.id) : false;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedId(isSelected ? null : node.id)}
                          className="ve-card"
                          style={{
                            cursor: "pointer", padding: "8px 12px", minWidth: "140px", textAlign: "left",
                            borderColor: isSelected ? "var(--accent-cyan)" : isLinked ? `${layer.color}88` : undefined,
                            background: isSelected ? "rgba(0,229,255,0.06)" : isLinked ? `${layer.color}08` : undefined,
                            opacity: selectedId && !isSelected && !isLinked ? 0.4 : 1,
                            transition: "opacity 200ms, border-color 200ms",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <span>{NODE_TYPE_META[node.type].icon}</span>
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)" }}>{node.label}</span>
                          </div>
                          <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "2px" }}>{node.id}</div>
                          <span style={{ fontSize: "0.6rem", padding: "1px 5px", borderRadius: "3px", background: `${statusColor(node.status)}22`, color: statusColor(node.status) }}>{node.status}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Connection arrows between layers */}
                  {direction === "forward" && layer.type !== "commit" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", color: "var(--text-dim)", fontSize: "0.65rem" }}>
                      <span style={{ width: 16, height: 1, background: "var(--border)", display: "inline-block" }} />
                      {layer.type === "prd-section" ? "← satisfies —" : layer.type === "plan" ? "← implements —" : "← commit-for —"}
                    </div>
                  )}
                  {direction === "reverse" && layer.type !== "prd-section" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", color: "var(--text-dim)", fontSize: "0.65rem" }}>
                      <span style={{ width: 16, height: 1, background: "var(--border)", display: "inline-block" }} />
                      {layer.type === "commit" ? "— commit-for →" : layer.type === "task" ? "— implements →" : "— satisfies →"}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "12px" }}>
              {layers.map((l) => <span key={l.type}>{NODE_TYPE_META[l.type as keyof typeof NODE_TYPE_META]?.icon} {beadsNodes.filter((n) => n.type === l.type).length} {l.label}</span>)}
              <span>🔗 {beadsEdges.length} edges</span>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px", fontSize: "0.65rem", color: "var(--text-dim)" }}>
              {Object.entries(EDGE_TYPE_META).map(([type, meta]) => (
                <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: 16, height: 2, background: meta.color, display: "inline-block", borderRadius: 1 }} />
                  {meta.label}
                </span>
              ))}
            </div>
          </div>

          {/* Detail Sidebar */}
          {selected && (
            <div className="ve-card" style={{ padding: "16px", alignSelf: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.25rem" }}>{NODE_TYPE_META[selected.type].icon}</span>
                <button onClick={() => setSelectedId(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>✕</button>
              </div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{selected.label}</h3>
              <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "8px" }}>{selected.id}</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.5, marginBottom: "12px" }}>{selected.description}</p>

              <div style={{ fontSize: "0.75rem", marginBottom: "12px" }}>
                <div style={{ marginBottom: "4px" }}><strong style={{ color: "var(--text)" }}>Status:</strong> <span style={{ color: statusColor(selected.status) }}>{selected.status}</span></div>
                {selected.meta && Object.entries(selected.meta).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: "2px", color: "var(--text-dim)" }}><strong style={{ color: "var(--text)" }}>{k}:</strong> {v}</div>
                ))}
              </div>

              {/* Connections */}
              {parents.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>Parent ↑</div>
                  {parents.map((pid) => {
                    const pn = beadsNodes.find((n) => n.id === pid);
                    return pn ? <button key={pid} onClick={() => setSelectedId(pid)} style={{ display: "block", fontSize: "0.7rem", color: "var(--accent-cyan)", background: "none", border: "none", cursor: "pointer", padding: "2px 0", textAlign: "left" }}>{NODE_TYPE_META[pn.type].icon} {pn.label} ({pn.id})</button> : null;
                  })}
                </div>
              )}
              {children.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>Children ↓</div>
                  {children.map((cid) => {
                    const cn = beadsNodes.find((n) => n.id === cid);
                    return cn ? <button key={cid} onClick={() => setSelectedId(cid)} style={{ display: "block", fontSize: "0.7rem", color: "var(--accent-cyan)", background: "none", border: "none", cursor: "pointer", padding: "2px 0", textAlign: "left" }}>{NODE_TYPE_META[cn.type].icon} {cn.label} ({cn.id})</button> : null;
                  })}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                <Link href="/design-system/knowledge-graph" style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", textDecoration: "none" }}>🧠 View in Knowledge Graph →</Link>
                <Link href="/design-system/explorer" style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", textDecoration: "none" }}>🔍 Search in Explorer →</Link>
              </div>
            </div>
          )}
        </div>
      )}

      {state === "loading" && <div className="ve-card" style={{ padding: "16px" }}><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={8} /></div></div>}
      {state === "empty" && <EmptyState icon="🔗" title="Chưa có liên kết Beads" desc="Gắn satisfies/implements tags khi tạo task: bd create --tag='implements:br-plan-01'" />}
      {state === "error" && <ErrorBanner title="Lỗi truy vết" message="gmind trace failed: beads_rust database locked. Retry after lock release." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Hiển thị cache — một số nodes có thể outdated<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền Architect</div><div className="forbidden-gate__desc">Beads Traversal yêu cầu vai trò Architect hoặc PMO.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
