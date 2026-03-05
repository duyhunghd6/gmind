"use client";

import { useState, useEffect } from "react";
import { WorkflowStep, AITrackingWorkflow } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";
import { performanceIssuesResearch } from "@/data/issues-research-data";
import SectionLabel from "./SectionLabel";
import CodeBlock from "./CodeBlock";
import Terminal from "./Terminal";

// --- CUSTOM SVG FLOWCHART OVERLAY ---
const FlowchartSVGOverlay = ({ steps, activeSection }: { steps: WorkflowStep[], activeSection: string }) => {
  const [lines, setLines] = useState<{ id: string, sx: number, sy: number, ex: number, ey: number, label?: string, isLoop?: boolean }[]>([]);

  useEffect(() => {
    const updateLines = () => {
      const container = document.getElementById("flowchart-container");
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      const newLines: any[] = [];
      steps.forEach(s => {
        if (!s.nextSteps) return;
        const startEl = document.getElementById(`node-${s.id}`);
        if (!startEl) return;
        const startRect = startEl.getBoundingClientRect();

        s.nextSteps.forEach((next, i) => {
          const endEl = document.getElementById(`node-${next.nextNodeId}`);
          if (!endEl) return;
          const endRect = endEl.getBoundingClientRect();

          const isLoop = next.isLoopBack;
          let sx, sy, ex, ey;

          if (isLoop) {
            // Loop: curve from right side to right side
            sx = startRect.right - containerRect.left;
            sy = startRect.top + startRect.height / 2 - containerRect.top;
            ex = endRect.right - containerRect.left;
            ey = endRect.top + endRect.height / 2 - containerRect.top;
          } else {
            // Linear: bottom to top
            sx = startRect.left + startRect.width / 2 - containerRect.left;
            sy = startRect.bottom - containerRect.top;
            ex = endRect.left + endRect.width / 2 - containerRect.left;
            ey = endRect.top - containerRect.top;
          }

          newLines.push({
            id: `${s.id}-${next.nextNodeId}-${i}`,
            sx, sy, ex, ey,
            label: next.conditionLabel,
            isLoop
          });
        });
      });
      setLines(newLines);
    };

    // Delay slightly to ensure DOM is painted and fonts loaded
    const timeoutId = setTimeout(updateLines, 100);
    // Observe resize events
    window.addEventListener("resize", updateLines);
    
    // Create an observer to watch for DOM changes inside flowchart-container (e.g. accordion open/close)
    const container = document.getElementById("flowchart-container");
    const observer = new MutationObserver(updateLines);
    if (container) observer.observe(container, { childList: true, subtree: true, attributes: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateLines);
      observer.disconnect();
    };
  }, [steps, activeSection]);

  if (lines.length === 0) return null;

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "visible" }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-teal)" />
        </marker>
        <marker id="arrowhead-loop" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-rose)" />
        </marker>
      </defs>
      {lines.map((l) => {
        let pathD = "";
        if (l.isLoop) {
          // Curved path for loopback
          pathD = `M ${l.sx} ${l.sy} C ${l.sx + 150} ${l.sy - 20}, ${l.ex + 150} ${l.ey + 20}, ${l.ex + 10} ${l.ey}`;
        } else {
          // Straight path with subtle cubic bezier for nice connections
          pathD = `M ${l.sx} ${l.sy} C ${l.sx} ${l.sy + 30}, ${l.ex} ${l.ey - 30}, ${l.ex} ${l.ey - 10}`;
        }

        const color = l.isLoop ? "var(--accent-rose)" : "var(--accent-teal)";
        const marker = l.isLoop ? "url(#arrowhead-loop)" : "url(#arrowhead)";

        return (
          <g key={l.id}>
            <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeDasharray={l.isLoop ? "6,6" : "none"} markerEnd={marker} opacity={0.6} />
            {l.label && (
              <text 
                x={l.isLoop ? Math.max(l.sx, l.ex) + 80 : (l.sx + l.ex) / 2 + 10} 
                y={(l.sy + l.ey) / 2} 
                fill={color} 
                fontSize="12" 
                fontWeight="bold"
                textAnchor={l.isLoop ? "start" : "start"}
                style={{
                  textShadow: "1px 1px 0 var(--bg), -1px -1px 0 var(--bg), 1px -1px 0 var(--bg), -1px 1px 0 var(--bg)",
                  background: "var(--bg)" // fallback for Safari
                }}
              >
                {l.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
// ------------------------------------


interface PromptViewerProps {
  activeSection: "workflows" | "setup" | "theory" | "research";
  
  workflow?: AITrackingWorkflow;
  step?: WorkflowStep | null;
  
  setupGuide?: SetupGuide;
  theoryTopic?: TheoryTopic;
  researchId?: string | null;
}

export default function PromptViewer({
  activeSection,
  workflow,
  step,
  setupGuide,
  theoryTopic,
  researchId
}: PromptViewerProps) {
  
  const [activeOsTab, setActiveOsTab] = useState<"macOs" | "linux" | "windows">("macOs");
  
  // Local state for Modals (Shared across workflows, setup, theory, research)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Global Escape key handler for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNodeId(null);
    };
    if (selectedNodeId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId]);

  // ==========================================
  // VIEW: SETUP GUIDE (TASK 1 - INTERACTIVE)
  // ==========================================
  if (activeSection === "setup" && setupGuide) {
    const activeSetupStep = setupGuide.steps.find(s => s.id === selectedNodeId);

    const renderSetupNode = (s: typeof setupGuide.steps[0], index: number) => (
      <div 
        key={s.id} 
        className="animate-fade-up flowchart-node" 
        style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer", position: "relative" }}
        onClick={() => setSelectedNodeId(s.id)}
      >
        <div style={{ 
          padding: "20px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)",
          borderRadius: "16px", border: "1px solid var(--border-color)",
          transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "var(--accent-amber)";
          e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 15px rgba(245, 158, 11, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}>
          {/* Node Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text)" }}>
              {s.title}
            </h4>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-amber)", background: "var(--accent-amber-dim)", padding: "4px 10px", borderRadius: "999px", fontWeight: 600 }}>
              {s.role}
            </span>
          </div>
          
          {/* Node I/O Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ color: "var(--accent-teal)", fontWeight: "bold", minWidth: "40px" }}>IN:</span>
              <span style={{ color: "var(--text-dim)" }}>{s.input || "N/A"}</span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ color: "var(--accent-rose)", fontWeight: "bold", minWidth: "40px" }}>OUT:</span>
              <span style={{ color: "var(--text-dim)" }}>{s.output || "N/A"}</span>
            </div>
          </div>
        </div>
        
        {/* Down Arrow for Flow */}
        <div style={{ textAlign: "center", color: "var(--text-dim)", opacity: 0.5, margin: "8px 0" }}>↓</div>
      </div>
    );

    return (
      <div className="animate-fade-up" style={{ position: "relative" }}>
        <SectionLabel text="Hướng dẫn Cài đặt" accent="amber" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{setupGuide.title}</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "3rem", lineHeight: "1.6" }}>
          {setupGuide.description}
        </p>

        {/* FLOWCHART RENDERER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px", margin: "0 auto" }}>
          {setupGuide.steps.map((s, idx) => renderSetupNode(s, idx))}
        </div>

        {/* SETUP MODAL OVERLAY */}
        {activeSetupStep && (
          <div 
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
              zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
            }}
            onClick={() => setSelectedNodeId(null)}
          >
            <div 
              style={{
                background: "var(--bg)", width: "100%", maxWidth: "800px", maxHeight: "90vh",
                overflowY: "auto", borderRadius: "16px", border: "1px solid var(--border-color)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", padding: "32px", position: "relative"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedNodeId(null)}
                style={{ position: "absolute", top: "20px", right: "24px", background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "1.5rem", cursor: "pointer" }}
              >✕</button>

              <SectionLabel text="Chi tiết Cài đặt" accent="amber" />
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", paddingRight: "40px" }}>{activeSetupStep.title}</h2>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--accent-amber)", background: "var(--accent-amber-dim)", padding: "4px 10px", borderRadius: "4px", fontWeight: 600 }}>
                  {activeSetupStep.role}
                </span>
                <span style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Thuộc luồng: {setupGuide.title}</span>
              </div>

              <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", marginBottom: "2rem", lineHeight: "1.6" }}>
                {activeSetupStep.description}
              </p>

              {/* OS Tabs inside Modal */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <button 
                  onClick={() => setActiveOsTab("macOs")}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontWeight: 500,
                    background: activeOsTab === "macOs" ? "var(--accent-cyan-dim)" : "var(--bg-surface)",
                    color: activeOsTab === "macOs" ? "var(--accent-cyan)" : "var(--text-dim)",
                    border: `1px solid ${activeOsTab === "macOs" ? "var(--accent-cyan)" : "var(--border-color)"}`
                  }}
                >macOS</button>
                <button 
                  onClick={() => setActiveOsTab("linux")}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontWeight: 500,
                    background: activeOsTab === "linux" ? "var(--accent-amber-dim)" : "var(--bg-surface)",
                    color: activeOsTab === "linux" ? "var(--accent-amber)" : "var(--text-dim)",
                    border: `1px solid ${activeOsTab === "linux" ? "var(--accent-amber)" : "var(--border-color)"}`
                  }}
                >Linux</button>
                <button 
                  onClick={() => setActiveOsTab("windows")}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontWeight: 500,
                    background: activeOsTab === "windows" ? "var(--accent-teal-dim)" : "var(--bg-surface)",
                    color: activeOsTab === "windows" ? "var(--accent-teal)" : "var(--text-dim)",
                    border: `1px solid ${activeOsTab === "windows" ? "var(--accent-teal)" : "var(--border-color)"}`
                  }}
                >Windows</button>
              </div>

              <div style={{ marginTop: "1rem", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                <Terminal 
                  title={activeOsTab === "windows" ? "powershell" : "bash"}
                  lines={
                    activeOsTab === "macOs" ? activeSetupStep.macOSTerminalLines! : 
                    activeOsTab === "linux" ? activeSetupStep.linuxTerminalLines! : 
                    activeSetupStep.windowsTerminalLines!
                  } 
                  state="typing"
                />
              </div>

            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: THEORY (TASK 2)
  // ==========================================
  if (activeSection === "theory" && theoryTopic) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Lý thuyết & Bối cảnh" accent="teal" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{theoryTopic.title}</h2>
        
        <div style={{ 
          padding: "24px", 
          background: "var(--bg-surface)", 
          borderRadius: "12px", 
          border: "1px solid var(--border-color)", 
          marginBottom: "2rem",
          whiteSpace: "pre-line",
          lineHeight: "1.8",
          fontSize: "1.05rem"
        }}>
          <b>Tóm tắt: </b> {theoryTopic.description}
          <br/><br/>
          {theoryTopic.content}
        </div>

        {/* WORKFLOW STEPS (FLOWCHART NODES) */}
        {theoryTopic.visualWorkflowSteps && (
          <div style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Workflow Cốt lõi</h3>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px", margin: "0 auto" }}>
              {theoryTopic.visualWorkflowSteps.map((s, index) => (
                <div 
                  key={index} 
                  className="animate-fade-up flowchart-node" 
                  style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer", position: "relative", width: "100%" }}
                  onClick={() => setSelectedNodeId(s.id)}
                >
                  <div style={{ 
                    padding: "20px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)",
                    borderRadius: "16px", border: "1px solid var(--border-color)",
                    transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "var(--accent-teal)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 15px rgba(20, 184, 166, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    {/* Node Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text)" }}>
                        {index + 1}. {s.title}
                      </h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--accent-teal)", background: "var(--accent-teal-dim)", padding: "4px 10px", borderRadius: "999px", fontWeight: 600 }}>
                        {s.role}
                      </span>
                    </div>
                    
                    {/* Node I/O Badges */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                        <span style={{ color: "var(--accent-indigo)", fontWeight: "bold", minWidth: "40px" }}>IN:</span>
                        <span style={{ color: "var(--text-dim)" }}>{s.input || "N/A"}</span>
                      </div>
                      <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                        <span style={{ color: "var(--accent-rose)", fontWeight: "bold", minWidth: "40px" }}>OUT:</span>
                        <span style={{ color: "var(--text-dim)" }}>{s.output || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Down Arrow for Flow */}
                  <div style={{ textAlign: "center", color: "var(--text-dim)", opacity: 0.5, margin: "8px 0" }}>↓</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THEORY MODAL OVERLAY */}
         {selectedNodeId && theoryTopic.visualWorkflowSteps && (
          (() => {
            const activeTheoryStep = theoryTopic.visualWorkflowSteps.find(s => s.id === selectedNodeId);
            if (!activeTheoryStep) return null;

            return (
              <div 
                style={{
                  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
                  zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
                }}
                onClick={() => setSelectedNodeId(null)}
              >
                <div 
                  style={{
                    background: "var(--bg)", width: "100%", maxWidth: "800px", maxHeight: "90vh",
                    overflowY: "auto", borderRadius: "16px", border: "1px solid var(--border-color)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", padding: "32px", position: "relative"
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedNodeId(null)}
                    style={{ position: "absolute", top: "20px", right: "24px", background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "1.5rem", cursor: "pointer" }}
                  >✕</button>

                  <SectionLabel text="Chi tiết Lý thuyết" accent="teal" />
                  <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", paddingRight: "40px" }}>{activeTheoryStep.title}</h2>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--accent-teal)", background: "var(--accent-teal-dim)", padding: "4px 10px", borderRadius: "4px", fontWeight: 600 }}>
                      {activeTheoryStep.role}
                    </span>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Thuộc luồng: {theoryTopic.title}</span>
                  </div>

                  <div style={{ display: "flex", gap: "24px", marginBottom: "2rem", padding: "16px", background: "var(--bg-surface)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ display: "block", color: "var(--accent-indigo)", fontWeight: "bold", marginBottom: "4px", fontSize: "0.85rem", textTransform: "uppercase" }}>Input</span>
                      <span style={{ color: "var(--text)" }}>{activeTheoryStep.input || "N/A"}</span>
                    </div>
                    <div style={{ width: "1px", background: "var(--border-color)" }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ display: "block", color: "var(--accent-rose)", fontWeight: "bold", marginBottom: "4px", fontSize: "0.85rem", textTransform: "uppercase" }}>Output</span>
                      <span style={{ color: "var(--text)" }}>{activeTheoryStep.output || "N/A"}</span>
                    </div>
                  </div>

                  <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", marginBottom: "2rem", lineHeight: "1.6" }}>
                    {activeTheoryStep.description}
                  </p>
                </div>
              </div>
            );
          })()
        )}

        {/* ROLES BADGES */}
        {theoryTopic.roles && theoryTopic.roles.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Các Vai trò (Roles)</h3>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {theoryTopic.roles.map((role, idx) => (
                <div key={idx} style={{
                  padding: "20px", borderRadius: "12px",
                  background: `var(--accent-${role.color}-dim)`, border: `1px solid rgba(var(--accent-${role.color}-rgb), 0.2)`
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "1.5rem" }}>👤</span>
                    <h4 style={{ fontSize: "1.15rem", color: `var(--accent-${role.color})` }}>{role.name}</h4>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: "1.5" }}>{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: 500 ISSUES RESEARCH (TASK 3)
  // ==========================================
  if (activeSection === "research" && researchId === "500-issues") {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Phân tích Spike" accent="rose" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>500 Vấn đề Làm Suy Giảm Hiệu Suất SE</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          Tổng hợp từ 10 phiên truy vấn NotebookLM phân tích hàng nghìn trang học thuật về Software Engineering Management. Dưới đây là 10 nhóm nguyên nhân gốc rễ (Root Causes) tàn phá năng suất, chất lượng và tinh thần của tổ chức phát triển phần mềm, được xếp từ mức độ <b>Critical</b> đến <b>Medium</b>.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {performanceIssuesResearch.map((category, index) => (
            <div 
              key={category.id} 
              className="animate-fade-up flowchart-node"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                border: `1px solid var(--accent-${category.colorToken}-dim)`,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                animationDelay: `${index * 0.05}s`
              }}
              onClick={() => setSelectedNodeId(category.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = `var(--accent-${category.colorToken})`;
                e.currentTarget.style.boxShadow = `var(--shadow-lg), 0 0 15px rgba(var(--accent-${category.colorToken}-rgb), 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = `var(--accent-${category.colorToken}-dim)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ 
                background: `var(--accent-${category.colorToken}-dim)`, 
                padding: "20px 24px", 
                borderBottom: `1px solid var(--accent-${category.colorToken}-dim)`,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", color: `var(--accent-${category.colorToken})`, margin: 0 }}>
                    {category.title}
                  </h3>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-dim)", marginTop: "4px" }}>
                    {category.issueCount} Issues • Chạm để xem chi tiết
                  </div>
                </div>
                <div style={{ 
                  background: `var(--accent-${category.colorToken})`, color: "#000",
                  padding: "4px 12px", borderRadius: "99px", fontWeight: "bold", fontSize: "0.8rem"
                }}>
                  {category.severityLevel}
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                <p style={{ margin: 0, color: "var(--text-dim)", lineHeight: "1.5" }}>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 500 ISSUES MODAL OVERLAY */}
        {selectedNodeId && performanceIssuesResearch.find(c => c.id === selectedNodeId) && (
          (() => {
            const activeCategory = performanceIssuesResearch.find(c => c.id === selectedNodeId);
            if (!activeCategory) return null;

            return (
              <div 
                style={{
                  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
                  zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
                }}
                onClick={() => setSelectedNodeId(null)}
              >
                <div 
                  style={{
                    background: "var(--bg)", width: "100%", maxWidth: "900px", maxHeight: "90vh",
                    overflowY: "auto", borderRadius: "16px", border: `1px solid var(--accent-${activeCategory.colorToken}-dim)`,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", padding: "32px", position: "relative"
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedNodeId(null)}
                    style={{ position: "absolute", top: "20px", right: "24px", background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "1.5rem", cursor: "pointer" }}
                  >✕</button>

                  <SectionLabel text="Chi tiết Danh sách Lỗi" accent={activeCategory.colorToken} />
                  <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", paddingRight: "40px", color: `var(--accent-${activeCategory.colorToken})` }}>
                    {activeCategory.title}
                  </h2>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.85rem", background: `var(--accent-${activeCategory.colorToken})`, color: "#000", padding: "4px 10px", borderRadius: "4px", fontWeight: "bold", textTransform: "uppercase" }}>
                      Mức độ: {activeCategory.severityLevel}
                    </span>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Tổng số: {activeCategory.issueCount} Issues</span>
                  </div>

                  <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: "1.6" }}>
                    {activeCategory.description}
                  </p>

                  <span style={{ fontSize: "0.95rem", color: `var(--accent-${activeCategory.colorToken})`, textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold", display: "block", marginBottom: "16px" }}>
                    Các Điểm Tắc nghẽn Điển hình:
                  </span>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "16px" }}>
                    {activeCategory.topIssues.map(issue => (
                      <div key={issue.id} style={{ 
                        padding: "20px", background: "var(--bg-surface)", 
                        borderRadius: "12px", border: `1px solid var(--border-color)`,
                        borderLeft: `4px solid var(--accent-${activeCategory.colorToken})`
                      }}>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "var(--text)" }}>{issue.name}</h4>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: "1.5" }}>{issue.desc}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })()
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: WORKFLOW (Overview - Flowchart)
  // ==========================================
  if (activeSection === "workflows" && workflow) {
    // 1. Group steps by loopGroup ("Planning", "Execution", "None")
    const stepsByGroup: Record<string, typeof workflow.steps> = {
      None: [],
      Planning: [],
      Execution: [],
    };
    workflow.steps.forEach(s => {
      const g = s.loopGroup || "None";
      if (!stepsByGroup[g]) stepsByGroup[g] = [];
      stepsByGroup[g].push(s);
    });

    const activeModalStep = workflow.steps.find(s => s.id === selectedNodeId);

    const renderNode = (s: typeof workflow.steps[0], index: number) => {
      const isSelected = selectedNodeId === s.id;
      return (
      <div 
        key={s.id} 
        id={`node-${s.id}`} /* ID added for SVG logic */
        className="animate-fade-up flowchart-node" 
        style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer", position: "relative", zIndex: 1, marginBottom: "3rem" }} /* Added margin-bottom instead of arrow gap */
        onClick={() => setSelectedNodeId(s.id)}
      >
        <div style={{ 
          padding: "20px", 
          background: isSelected ? "var(--bg-surface)" : "rgba(255,255,255,0.03)", 
          backdropFilter: "blur(12px)",
          borderRadius: "16px", 
          border: isSelected ? "2px solid var(--accent-cyan)" : "1px solid var(--border-color)",
          boxShadow: isSelected ? "var(--shadow-lg), 0 0 15px rgba(20, 184, 166, 0.4)" : "none",
          transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "var(--accent-cyan)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 15px rgba(20, 184, 166, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}>
          {/* Node Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
              {s.icon && <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>}
              <span>{index + 1}. {s.title}</span>
            </h4>
            <span style={{
              fontSize: "0.75rem",
              color: s.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)",
              background: s.role === "User" ? "var(--accent-cyan-dim)" : "var(--accent-amber-dim)",
              padding: "4px 10px", borderRadius: "999px", fontWeight: 600
            }}>
              {s.role}
            </span>
          </div>
          
          {/* Node I/O Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", marginBottom: s.promptText ? "16px" : "0" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ color: "var(--accent-teal)", fontWeight: "bold", minWidth: "40px" }}>IN:</span>
              <span style={{ color: "var(--text-dim)" }}>{s.input || "N/A"}</span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ color: "var(--accent-rose)", fontWeight: "bold", minWidth: "40px" }}>OUT:</span>
              <span style={{ color: "var(--text-dim)" }}>{s.output || "N/A"}</span>
            </div>
          </div>

          {/* Task 1: Inline Prompts */}
          {s.promptText && (
            <div 
              onClick={(e) => e.stopPropagation()} /* Prevent triggering modal when interacting with prompt */
              style={{
                marginTop: "16px",
                padding: "16px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Mẫu Prompt</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(s.promptText!);
                    // Simple visual feedback without extra state
                    const btn = document.getElementById(`copy-btn-${s.id}`);
                    if (btn) {
                      const original = btn.innerText;
                      btn.innerText = "Copied!";
                      setTimeout(() => btn.innerText = original, 2000);
                    }
                  }}
                  id={`copy-btn-${s.id}`}
                  style={{
                    background: "var(--accent-cyan-dim)",
                    color: "var(--accent-cyan)",
                    border: "1px solid var(--accent-cyan)",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Copy Prompt
                </button>
              </div>
              <pre style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--text)",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontFamily: "monospace"
              }}>
                {s.promptText}
              </pre>
            </div>
          )}
          
          {/* Task 3 Loop Condition text removed because we now draw SVG text explicitly */}
        </div>
      </div>
    );
  };

    // Task 2: Project State Journey Extraction
    const journeyNodes = workflow.steps.filter(s => s.projectStateScenario);

    return (
      <div className="animate-fade-up" style={{ position: "relative" }}>
        
        <SectionLabel text="Trực quan hóa Flowchart" accent="cyan" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
          {workflow.title}
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {workflow.description}
        </p>

        {/* Task 2: Journey Map UI */}
        {journeyNodes.length > 0 && (
          <div style={{
            marginBottom: "3rem",
            padding: "24px",
            background: "linear-gradient(to right, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05))",
            borderRadius: "16px",
            border: "1px solid var(--accent-teal-dim)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.5rem" }}>🗺️</span>
              <h3 style={{ fontSize: "1.2rem", color: "var(--text)", margin: 0 }}>Gợi ý: Hành trình & Điểm xuất phát</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {journeyNodes.map((jn, idx) => (
                <div key={`journey-${jn.id}`} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{
                    minWidth: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-teal)", 
                    color: "#000", display: "flex", alignItems: "center", justifyContent: "center", 
                    fontSize: "0.8rem", fontWeight: "bold", marginTop: "2px"
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <span style={{ display: "block", color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: "4px" }}>
                      Tình huống: <strong style={{ color: "var(--text)" }}>{jn.projectStateScenario}</strong>
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--accent-teal)" }}>
                      → Bắt đầu sử dụng từ: <strong style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setSelectedNodeId(jn.id)}>Node {jn.title}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-COLUMN LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: "2rem", alignItems: "start" }}>
          
          {/* COLUMN 1: FLOWCHART RENDERER */}
          <div id="flowchart-container" style={{ position: "relative", width: "100%", paddingBottom: "100px" }}>
            
            {/* TASK 2: SVG ARROWS DRAWN ON TOP/BEHIND OF DOM EXTENTS */}
            <FlowchartSVGOverlay steps={workflow.steps} activeSection={activeSection} />

            {/* No Loop Nodes First */}
            {stepsByGroup.None.map((s, idx) => renderNode(s, idx))}

            {/* Planning Loop Box */}
            {stepsByGroup.Planning.length > 0 && (
              <div style={{
                width: "100%", padding: "40px", paddingBottom: "24px", margin: "16px 0", marginBottom: "3rem",
                border: "2px dashed var(--accent-indigo)", borderRadius: "20px",
                background: "var(--accent-indigo-dim)", position: "relative", zIndex: 0
              }}>
                <div style={{ 
                  position: "absolute", top: "-14px", left: "24px", 
                  background: "var(--bg)", padding: "0 12px", 
                  color: "var(--accent-indigo)", fontWeight: "bold", fontSize: "0.9rem",
                  border: "1px solid var(--accent-indigo)", borderRadius: "99px"
                }}>
                  ↻ Planning Loop
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {stepsByGroup.Planning.map((s, idx) => renderNode(s, idx + stepsByGroup.None.length))}
                </div>
              </div>
            )}

            {/* Execution Loop Box */}
            {stepsByGroup.Execution.length > 0 && (
              <div style={{
                width: "100%", padding: "40px", paddingBottom: "24px", margin: "16px 0", marginBottom: "3rem",
                border: "2px dashed var(--accent-emerald)", borderRadius: "20px",
                background: "var(--accent-emerald-dim)", position: "relative", zIndex: 0
              }}>
                <div style={{ 
                  position: "absolute", top: "-14px", left: "24px", 
                  background: "var(--bg)", padding: "0 12px", 
                  color: "var(--accent-emerald)", fontWeight: "bold", fontSize: "0.9rem",
                  border: "1px solid var(--accent-emerald)", borderRadius: "99px"
                }}>
                  ↻ Execution Loop
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {stepsByGroup.Execution.map((s, idx) => renderNode(s, idx + stepsByGroup.None.length + stepsByGroup.Planning.length))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 2: GUIDANCE PANEL */}
          <div style={{ position: "sticky", top: "120px", height: "fit-content" }}>
            {activeModalStep ? (
              <div style={{
                background: "var(--bg-surface)",
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid var(--accent-cyan)",
                padding: "32px",
                boxShadow: "var(--shadow-lg)"
              }}>
                <SectionLabel text="Guidance Context" accent="cyan" />
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px", color: "var(--text)" }}>
                  {activeModalStep.icon && <span>{activeModalStep.icon}</span>}
                  {activeModalStep.title}
                </h3>

                <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: "0.80rem", color: "var(--accent-teal)", background: "var(--accent-teal-dim)",
                    padding: "4px 8px", borderRadius: "4px", fontWeight: "bold"
                  }}>
                    IN: {activeModalStep.input || "N/A"}
                  </span>
                  <span style={{
                    fontSize: "0.80rem", color: "var(--accent-rose)", background: "var(--accent-rose-dim)",
                    padding: "4px 8px", borderRadius: "4px", fontWeight: "bold"
                  }}>
                    OUT: {activeModalStep.output || "N/A"}
                  </span>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <p style={{ color: "var(--text-dim)", lineHeight: "1.6", fontSize: "1.05rem", fontStyle: "italic", borderLeft: "3px solid var(--border-color)", paddingLeft: "16px" }}>
                    "{activeModalStep.description}"
                  </p>
                </div>

                {activeModalStep.guidanceContext && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ color: "var(--accent-cyan)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Nguyên lý hoạt động</h4>
                    <p style={{ color: "var(--text)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                      {activeModalStep.guidanceContext}
                    </p>
                  </div>
                )}

                {activeModalStep.exampleDetails && (
                  <div style={{
                    background: "rgba(0,0,0,0.2)",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px dashed var(--accent-cyan-dim)"
                  }}>
                    <h4 style={{ color: "var(--text-dim)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "8px" }}>Ví dụ / Templates</h4>
                    <p style={{ color: "var(--text)", lineHeight: "1.5", fontSize: "0.9rem" }}>
                      {activeModalStep.exampleDetails}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              <div style={{ 
                padding: "32px", 
                background: "linear-gradient(145deg, var(--bg-surface) 0%, rgba(20, 184, 166, 0.05) 100%)", 
                borderRadius: "16px", border: "1px dashed var(--accent-teal)", 
                textAlign: "center", color: "var(--text-dim)",
                boxShadow: "var(--shadow-md)"
              }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "16px", filter: "grayscale(0.5)" }}>🤖</span>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--text)" }}>Agentic Process Explorer</p>
                <p style={{ fontSize: "0.95rem", marginTop: "8px", lineHeight: "1.5" }}>Bấm vào bất kỳ Node nào trong Flowchart bên trái để xem Contextual Guidance chi tiết.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
