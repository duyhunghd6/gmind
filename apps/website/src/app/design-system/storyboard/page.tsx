"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { storyNodes, storyEdges, JOURNEY_COLORS } from "@/data/storyboard-data";
import { usecases } from "@/data/usecase-data";

const journeys = Object.keys(JOURNEY_COLORS);

export default function StoryboardScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [activeJourney, setActiveJourney] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const filteredNodes = useMemo(() => {
    if (!activeJourney) return storyNodes;
    return storyNodes.filter((n) => n.journey === activeJourney);
  }, [activeJourney]);

  const filteredEdges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    return storyEdges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));
  }, [filteredNodes]);

  const selected = selectedNode ? storyNodes.find((n) => n.id === selectedNode) : null;
  const inEdges = selectedNode ? storyEdges.filter((e) => e.target === selectedNode) : [];
  const outEdges = selectedNode ? storyEdges.filter((e) => e.source === selectedNode) : [];

  return (
    <div aria-label="Storyboard Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🗺️ Storyboard</h1>
        <DsIdBadge id="ds:screen:storyboard-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        24 use cases trên 6 hành trình người dùng. Mỗi node = 1 trạng thái screen. Click node → xem chi tiết + điều hướng đến screen thực tế.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 300px" : "1fr", gap: "16px" }}>
          <div>
            {/* Journey Filter */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              <button
                className={`state-toggle-bar__btn${!activeJourney ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => setActiveJourney(null)}
                style={{ fontSize: "0.7rem" }}
              >
                All Journeys ({storyNodes.length})
              </button>
              {journeys.map((j) => (
                <button
                  key={j}
                  className={`state-toggle-bar__btn${activeJourney === j ? " state-toggle-bar__btn--active" : ""}`}
                  onClick={() => setActiveJourney(j)}
                  style={{ fontSize: "0.7rem" }}
                >
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: JOURNEY_COLORS[j], marginRight: "4px" }} />
                  {j} ({storyNodes.filter((n) => n.journey === j).length})
                </button>
              ))}
            </div>

            {/* Graph — Rendered as linked cards per journey */}
            {(activeJourney ? [activeJourney] : journeys).map((journey) => {
              const jNodes = filteredNodes.filter((n) => n.journey === journey);
              if (jNodes.length === 0) return null;
              const jEdges = storyEdges.filter((e) => jNodes.some((n) => n.id === e.source) && jNodes.some((n) => n.id === e.target));

              return (
                <div key={journey} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: JOURNEY_COLORS[journey] }} />
                    <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>{journey}</h3>
                    <DsIdBadge id={`ds:storyboard:${journey === "PM Overview" ? "pmOverview" : journey === "Developer" ? "developer" : journey === "QA/Review" ? "qaReview" : journey === "Architect" ? "architect" : journey === "Release Mgmt" ? "releaseMgmt" : "bugTriage"}-001`} />
                    <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>{jNodes.length} screens · {jEdges.length} transitions</span>
                  </div>

                  {/* Node Flow */}
                  <div style={{ display: "flex", gap: "0", alignItems: "stretch", flexWrap: "wrap" }}>
                    {jNodes.map((node, i) => {
                      const isActive = node.id === selectedNode;
                      const edge = i > 0 ? jEdges.find((e) => e.source === jNodes[i - 1].id && e.target === node.id) : null;
                      return (
                        <div key={node.id} style={{ display: "flex", alignItems: "center" }}>
                          {/* Edge arrow */}
                          {edge && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 4px", minWidth: "40px" }}>
                              <span style={{ fontSize: "0.55rem", color: "var(--text-dim)", textAlign: "center", lineHeight: 1.2, maxWidth: "60px" }}>{edge.action}</span>
                              <span style={{ fontSize: "0.875rem", color: JOURNEY_COLORS[journey] }}>→</span>
                            </div>
                          )}
                          {/* Node card */}
                          <button
                            onClick={() => setSelectedNode(isActive ? null : node.id)}
                            className="ve-card"
                            style={{
                              cursor: "pointer", padding: "10px 14px", minWidth: "130px", maxWidth: "180px",
                              textAlign: "left", borderColor: isActive ? "var(--accent-cyan)" : `${JOURNEY_COLORS[journey]}44`,
                              background: isActive ? "rgba(0,229,255,0.06)" : undefined,
                              borderTop: `3px solid ${JOURNEY_COLORS[journey]}`,
                            }}
                          >
                            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>{node.label}</div>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", lineHeight: 1.3, marginBottom: "4px" }}>{node.description.slice(0, 60)}…</div>
                            {node.state && <span style={{ fontSize: "0.55rem", padding: "1px 5px", borderRadius: "3px", background: "rgba(139,148,158,0.1)", color: "var(--text-dim)" }}>{node.state}</span>}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Cross-journey links */}
            {!activeJourney && (
              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(139,148,158,0.04)", borderRadius: "8px", border: "1px dashed var(--border)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  🔗 Cross-Journey Links
                  <DsIdBadge id="ds:storyboard:crossJourney-001" />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {storyEdges.filter((e) => {
                    const src = storyNodes.find((n) => n.id === e.source);
                    const tgt = storyNodes.find((n) => n.id === e.target);
                    return src && tgt && src.journey !== tgt.journey;
                  }).map((e, i) => {
                    const src = storyNodes.find((n) => n.id === e.source)!;
                    const tgt = storyNodes.find((n) => n.id === e.target)!;
                    return (
                      <span key={i} style={{ fontSize: "0.65rem", padding: "3px 8px", borderRadius: "4px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-dim)" }}>
                        <span style={{ color: JOURNEY_COLORS[src.journey] }}>{src.label}</span>
                        <span style={{ margin: "0 4px" }}>→</span>
                        <span style={{ color: JOURNEY_COLORS[tgt.journey] }}>{tgt.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Usecase Detail Cards */}
            <div style={{ marginTop: "24px" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: "12px" }}>
                📂 Use Cases Chi tiết ({usecases.length})
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
                {usecases.map((uc) => (
                  <Link
                    key={uc.id}
                    href={`/design-system/storyboard/${uc.id}`}
                    className="ve-card"
                    style={{
                      textDecoration: "none", padding: "12px 16px",
                      borderLeft: `3px solid ${uc.journeyColor}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span>{uc.icon}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text)" }}>{uc.title}</span>
                    </div>
                    <div style={{ fontSize: "0.65rem", color: uc.journeyColor, marginBottom: "4px" }}>{uc.journey} · {uc.role}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", lineHeight: 1.3 }}>{uc.steps.length} bước · {uc.steps.map(s => s.screenLabel).filter((v, i, a) => a.indexOf(v) === i).length} screens</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", marginTop: "16px", fontSize: "0.7rem", color: "var(--text-dim)" }}>
              <span>🗺️ {filteredNodes.length} screen states</span>
              <span>🔗 {filteredEdges.length} transitions</span>
              <span>👥 {journeys.length} user journeys</span>
              <span>📂 {usecases.length} use cases</span>
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="ve-card" style={{ padding: "16px", alignSelf: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: selected.journeyColor }} />
                <button onClick={() => setSelectedNode(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>✕</button>
              </div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{selected.label}</h3>
              <div style={{ fontSize: "0.7rem", color: selected.journeyColor, marginBottom: "8px" }}>{selected.journey}</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.5, marginBottom: "12px" }}>{selected.description}</p>
              {selected.state && <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "12px" }}>Preset/State: <strong>{selected.state}</strong></div>}

              {/* Incoming */}
              {inEdges.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>← Đến từ</div>
                  {inEdges.map((e, i) => {
                    const src = storyNodes.find((n) => n.id === e.source);
                    return <div key={i} style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{src?.label} <span style={{ opacity: 0.5 }}>({e.action})</span></div>;
                  })}
                </div>
              )}
              {/* Outgoing */}
              {outEdges.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>→ Đi tới</div>
                  {outEdges.map((e, i) => {
                    const tgt = storyNodes.find((n) => n.id === e.target);
                    return <div key={i} style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{tgt?.label} <span style={{ opacity: 0.5 }}>({e.action})</span></div>;
                  })}
                </div>
              )}

              <Link href={selected.screen} style={{ display: "block", textAlign: "center", padding: "8px 12px", borderRadius: "6px", background: "rgba(0,229,255,0.1)", color: "var(--accent-cyan)", textDecoration: "none", fontSize: "0.8125rem", fontWeight: 600 }}>
                🚀 Mở screen này →
              </Link>
            </div>
          )}
        </div>
      )}

      {state === "loading" && <div className="ve-card" style={{ padding: "16px" }}><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={8} /></div></div>}
      {state === "empty" && <EmptyState icon="🗺️" title="Chưa có storyboard" desc="Tạo use-case screens để bắt đầu xây dựng storyboard." />}
      {state === "error" && <ErrorBanner title="Lỗi tải storyboard" message="Storyboard data corrupted. Check storyboard-data.ts" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Storyboard offline — hiển thị cache<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền PM</div><div className="forbidden-gate__desc">Storyboard chỉ dành cho Project Manager.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
