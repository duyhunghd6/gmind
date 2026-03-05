"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { usecases, type Usecase, type UsecaseStep } from "@/data/usecase-data";

// Helper to assign a generic emoji based on the screen path for visual cue
const getScreenIcon = (screen: string) => {
  if (screen.includes("kanban")) return "📋";
  if (screen.includes("terminal")) return "💻";
  if (screen.includes("knowledge-graph")) return "🕸️";
  if (screen.includes("approval")) return "✅";
  if (screen.includes("timeline")) return "⏱️";
  if (screen.includes("explorer")) return "📂";
  if (screen.includes("doc-viewer")) return "📄";
  if (screen.includes("git-graph")) return "🌿";
  if (screen.includes("beads-traversal")) return "🔗";
  return "🖥️";
};

export default function StoryboardScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [activeJourney, setActiveJourney] = useState<string | null>(null);

  // Selection states for Guidance Panel
  const [selectedUsecaseId, setSelectedUsecaseId] = useState<string | null>(null);
  const [selectedStepIdx, setSelectedStepIdx] = useState<number | null>(null);

  // Group usecases by journey
  const journeys = useMemo(() => {
    const map = new Map<string, { color: string; identifier: string; usecases: Usecase[] }>();
    usecases.forEach((uc) => {
      if (!map.has(uc.journey)) {
        // Generate a safe identifier for dsId
        const identifier = uc.journey.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        map.set(uc.journey, { color: uc.journeyColor, identifier, usecases: [] });
      }
      map.get(uc.journey)!.usecases.push(uc);
    });
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }));
  }, []);

  const selectedUsecase = selectedUsecaseId ? usecases.find((u) => u.id === selectedUsecaseId) : null;
  const selectedStep = selectedUsecase && selectedStepIdx !== null ? selectedUsecase.steps[selectedStepIdx] : null;

  return (
    <div aria-label="Storyboard Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🗺️ Storyboard Journeys</h1>
        <DsIdBadge id="ds:screen:storyboard-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Hành trình thao tác End-to-End được mapping trực tiếp từ PRDs. Click vào một điểm chạm (Node) để mở <strong>Guidance Section</strong>.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gridTemplateColumns: selectedStep ? "1fr 340px" : "1fr", gap: "24px", alignItems: "start" }}>
          
          {/* LEFT: MAIN FLOWCHARTS */}
          <div style={{ minWidth: 0 }}>
            {/* Journey Filter */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                className={`state-toggle-bar__btn${!activeJourney ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => { setActiveJourney(null); setSelectedUsecaseId(null); setSelectedStepIdx(null); }}
                style={{ fontSize: "0.75rem" }}
              >
                Tất cả ({journeys.length} Journeys)
              </button>
              {journeys.map((j) => (
                <button
                  key={j.name}
                  className={`state-toggle-bar__btn${activeJourney === j.name ? " state-toggle-bar__btn--active" : ""}`}
                  onClick={() => { setActiveJourney(j.name); setSelectedUsecaseId(null); setSelectedStepIdx(null); }}
                  style={{ fontSize: "0.75rem" }}
                >
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: j.color, marginRight: "4px" }} />
                  {j.name} ({j.usecases.length})
                </button>
              ))}
            </div>

            {/* Render Journey Tracks */}
            {journeys
              .filter((j) => !activeJourney || j.name === activeJourney)
              .map((journey) => (
                <div key={journey.name} style={{ marginBottom: "32px", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  
                  {/* Journey Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", background: journey.color }} />
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{journey.name}</h3>
                    <DsIdBadge id={`ds:storyboard:${journey.identifier}-001`} />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginLeft: "auto" }}>
                      {journey.usecases.length} usecases
                    </span>
                  </div>

                  {/* Usecases inside Journey */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {journey.usecases.map((uc) => (
                      <div key={uc.id} style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", paddingBottom: "12px", alignItems: "stretch", scrollbarWidth: "thin" }}>
                        
                        {/* 1. Usecase Title Header (Left fixed info) */}
                        <div style={{ minWidth: "220px", paddingRight: "20px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <span style={{ fontSize: "1.2rem" }}>{uc.icon}</span>
                            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)" }}>{uc.title}</span>
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", lineHeight: 1.4 }}>
                            {uc.summary}
                          </div>
                        </div>

                        {/* 2. Nodes & Arrows Stream */}
                        <div style={{ display: "flex", alignItems: "center", minWidth: "max-content", paddingLeft: "16px", borderLeft: "2px dashed var(--border)" }}>
                          {uc.steps.map((step, idx) => {
                            const isSelected = selectedUsecaseId === uc.id && selectedStepIdx === idx;
                            const isFirst = idx === 0;

                            return (
                              <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                                
                                {/* Arrow coming into this Node */}
                                {!isFirst && (
                                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", minWidth: "100px" }}>
                                    <span style={{ fontSize: "0.6rem", color: "var(--text-dim)", textAlign: "center", paddingBottom: "2px", fontWeight: 600 }}>{step.action}</span>
                                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke={journey.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                                {isFirst && (
                                  <div style={{ padding: "0 8px" }}>
                                    <div style={{ width: 8, height: 8, background: journey.color, borderRadius: "50%" }}></div>
                                  </div>
                                )}

                                {/* Node Card (Touchpoint Point) */}
                                <button
                                  className="ve-card"
                                  onClick={() => { setSelectedUsecaseId(uc.id); setSelectedStepIdx(idx); }}
                                  style={{
                                    cursor: "pointer", padding: "12px", minWidth: "160px", maxWidth: "200px", textAlign: "left",
                                    borderColor: isSelected ? "var(--accent-cyan)" : "var(--border)",
                                    background: isSelected ? "rgba(0,229,255,0.08)" : "var(--surface)",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                                    <span style={{ fontSize: "1.1rem" }}>{getScreenIcon(step.screen)}</span>
                                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: isSelected ? "var(--accent-cyan)" : "var(--text)" }}>{step.screenLabel}</span>
                                  </div>
                                  <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", lineHeight: 1.4 }}>{step.outcome}</div>
                                  {step.state && (
                                    <div style={{ marginTop: "6px", display: "inline-block", fontSize: "0.55rem", padding: "2px 6px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", color: "var(--text-dim)" }}>
                                      State: {step.state}
                                    </div>
                                  )}
                                </button>
                              </div>
                            );
                          })}

                          {/* Endpoint */}
                          <div style={{ padding: "0 16px" }}>
                            <div style={{ width: 12, height: 12, border: `2px solid ${journey.color}`, borderRadius: "50%" }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* RIGHT: GUIDANCE SECTION PANEL */}
          {selectedStep && selectedUsecase && (
            <div className="ve-card" style={{ position: "sticky", top: "80px", padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 100px)" }}>
              {/* Guidance Header */}
              <div style={{ padding: "16px", background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                   <span style={{ fontSize: "0.7rem", color: selectedUsecase.journeyColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Guidance Panel</span>
                   <button onClick={() => { setSelectedUsecaseId(null); setSelectedStepIdx(null); }} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>×</button>
                 </div>
                 <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                   <span>{getScreenIcon(selectedStep.screen)}</span> {selectedStep.screenLabel}
                 </h2>
                 <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Thuộc usecase: <strong>{selectedUsecase.title}</strong></div>
              </div>

              {/* Guidance Content (Scrollable) */}
              <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
                
                {/* 1. Point Details (Mechanisms) */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.8rem", color: "var(--text)", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--accent-cyan)" }}>⚡</span> Mechanism & Action
                  </h4>
                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "10px", borderRadius: "6px", fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
                    <p style={{ margin: "0 0 6px 0" }}><strong>Điều kiện (Condition):</strong> {selectedStep.action}</p>
                    <p style={{ margin: 0 }}><strong>Phản hồi (Outcome):</strong> {selectedStep.outcome}</p>
                  </div>
                </div>

                {/* 2. Considerations */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.8rem", color: "var(--text)", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--accent-amber)" }}>⚠️</span> Considerations
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
                    <li>Đảm bảo E2E tests bao phủ nhánh Happy Path này trong Cypress.</li>
                    <li>Verify trạng thái Component state Matrix: <code>{selectedStep.state || 'default'}</code>.</li>
                    <li>Liệu có race conditions khi Agent lock file ở bước này?</li>
                  </ul>
                </div>

                {/* 3. Investigating */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.8rem", color: "var(--text)", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--accent-teal)" }}>🔍</span> Investigating (E2E Alignment)
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.5, background: "rgba(0,229,255,0.05)", borderLeft: "2px solid var(--accent-teal)", padding: "8px 12px" }}>
                    Nếu E2E test fail tại đây, hãy inspect <code>data-testid</code> của các elements trên screen <strong>{selectedStep.screen}</strong>.
                  </div>
                </div>

                {/* 4. Link & Call to Action */}
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px dashed var(--border)", textAlign: "center" }}>
                  <Link href={selectedStep.screen} className="btn-primary" style={{ display: "inline-block", width: "100%", textDecoration: "none", fontSize: "0.85rem", padding: "10px" }}>
                    Truy cập Screen Thực tế →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Other Screen States Handling */}
      {state === "loading" && <div className="ve-card" style={{ padding: "24px" }}><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={5} /></div></div>}
      {state === "empty" && <EmptyState icon="🗺️" title="Chưa có storyboard" desc="Tạo use-case screens để bắt đầu xây dựng storyboard." />}
      {state === "error" && <ErrorBanner title="Lỗi tải storyboard" message="Storyboard data corrupted." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Storyboard offline — hiển thị cache<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền PM</div><div className="forbidden-gate__desc">Storyboard chỉ dành cho Project Manager.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
