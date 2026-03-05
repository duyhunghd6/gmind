"use client";

import { useState } from "react";
import { WorkflowStep, AITrackingWorkflow } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";
import { performanceIssuesResearch } from "@/data/issues-research-data";
import SectionLabel from "./SectionLabel";
import CodeBlock from "./CodeBlock";
import Terminal from "./Terminal";

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

  // ==========================================
  // VIEW: SETUP GUIDE (TASK 1)
  // ==========================================
  if (activeSection === "setup" && setupGuide) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Hướng dẫn Cài đặt" accent="amber" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{setupGuide.title}</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {setupGuide.description}
        </p>

        {setupGuide.hasOsTabs && (
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
        )}

        <div style={{ marginTop: "1rem", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          <Terminal 
            title={activeOsTab === "windows" ? "powershell" : "bash"}
            lines={
              setupGuide.hasOsTabs 
                ? (activeOsTab === "macOs" ? setupGuide.macOSTerminalLines! : activeOsTab === "linux" ? setupGuide.linuxTerminalLines! : setupGuide.windowsTerminalLines!)
                : setupGuide.terminalLines!
            } 
            state="typing"
          />
        </div>
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

        {/* WORKFLOW STEPS (VISUAL TIMELINE) */}
        {theoryTopic.visualWorkflowSteps && (
          <div style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Workflow Cốt lõi</h3>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "24px", top: "0", bottom: "0", width: "2px", background: "var(--color-blueprint-line)", zIndex: 0 }} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 1 }}>
                {theoryTopic.visualWorkflowSteps.map((s, index) => (
                  <div key={index} style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <div style={{ 
                      flexShrink: 0, width: "50px", height: "50px", borderRadius: "50%", 
                      background: `var(--accent-${s.color}-dim)`, 
                      border: `2px solid var(--accent-${s.color})`, color: `var(--accent-${s.color})`,
                      display: "flex", alignItems: "center", justifyContent: "center", 
                      fontWeight: "bold", fontSize: "1.2rem", boxShadow: "0 0 15px rgba(0,0,0,0.1)"
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1, padding: "16px 20px", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(5px)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{s.title}</h4>
                        <span style={{ fontSize: "0.8rem", color: `var(--accent-${s.color})`, background: `var(--accent-${s.color}-dim)`, padding: "4px 10px", borderRadius: "99px", fontWeight: "bold" }}>{s.role}</span>
                      </div>
                      <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          {performanceIssuesResearch.map((category) => (
            <div key={category.id} style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              border: `1px solid var(--accent-${category.colorToken}-dim)`,
              overflow: "hidden"
            }}>
              {/* Card Header Colored */}
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
                    {category.issueCount} Issues • {category.description}
                  </div>
                </div>
                <div style={{ 
                  background: `var(--accent-${category.colorToken})`, color: "#000",
                  padding: "4px 12px", borderRadius: "99px", fontWeight: "bold", fontSize: "0.8rem"
                }}>
                  {category.severityLevel}
                </div>
              </div>

              {/* Card Body Issues List */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Các Issue Điển hình:</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                  {category.topIssues.map(issue => (
                    <div key={issue.id} style={{ 
                      padding: "16px", background: "var(--bg)", 
                      borderRadius: "8px", border: "1px solid var(--border-color)"
                    }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "8px", color: "var(--text)" }}>{issue.name}</h4>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: "1.5" }}>{issue.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: WORKFLOW (Overview)
  // ==========================================
  if (activeSection === "workflows" && workflow && !step) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Trực quan hóa Luồng" accent="cyan" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem", background: "linear-gradient(90deg, #0ea5e9, #14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {workflow.title}
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "3rem", lineHeight: "1.6" }}>
          {workflow.description}
        </p>
        
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: "0", bottom: "0", width: "2px", background: "var(--color-blueprint-line)", zIndex: 0 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 1 }}>
            {workflow.steps.map((s, index) => (
              <div key={s.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s`, display: "flex", gap: "24px" }}>
                
                <div style={{ 
                  flexShrink: 0, width: "50px", height: "50px", borderRadius: "50%", 
                  background: s.role === "User" ? "var(--accent-cyan-dim)" : "var(--bg-surface)", 
                  border: `2px solid ${s.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)"}`,
                  color: s.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)", 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  fontWeight: "bold", fontSize: "1.2rem",
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)"
                }}>
                  {index + 1}
                </div>
                
                <div style={{ 
                  flex: 1, padding: "24px", 
                  background: "rgba(255,255,255,0.02)", 
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px", 
                  border: "1px solid var(--border-color)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <h4 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{s.title}</h4>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                      color: s.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)",
                      background: s.role === "User" ? "var(--accent-cyan-dim)" : "var(--accent-amber-dim)",
                      padding: "4px 10px", borderRadius: "999px", fontWeight: 600
                    }}>
                      {s.role}
                    </span>
                  </div>
                  <p style={{ fontSize: "1rem", color: "var(--text-dim)", lineHeight: "1.6" }}>{s.description}</p>
                  
                  {s.promptText && (
                    <div style={{ marginTop: "16px", padding: "12px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9rem", color: "var(--text-dim)" }}>
                      <span style={{ color: "var(--accent-cyan)", marginRight: "8px" }}>{"->"}</span>
                      Có mẫu Prompt đính kèm. Khám phá luồng chi tiết để sao chép.
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: WORKFLOW STEP (Detail)
  // ==========================================
  if (activeSection === "workflows" && workflow && step) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Chi tiết Bước luồng" accent="cyan" />
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{step.title}</h2>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: step.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)",
              background: step.role === "User" ? "var(--accent-cyan-dim)" : "var(--accent-amber-dim)",
              padding: "4px 10px",
              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {step.role}
          </span>
          <span style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
            Thuộc luồng: {workflow.title}
          </span>
        </div>

        <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {step.description}
        </p>

        {step.promptText ? (
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Mẫu Prompt:</h3>
            <div style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)", borderRadius: "12px", overflow: "hidden" }}>
              <CodeBlock code={step.promptText} title={`Prompt: ${step.title}`} />
            </div>
          </div>
        ) : (
          <div style={{ 
            marginTop: "2rem", padding: "32px", 
            background: "linear-gradient(145deg, var(--bg-surface) 0%, rgba(20, 184, 166, 0.05) 100%)", 
            borderRadius: "16px", border: "1px dashed var(--accent-teal)", 
            textAlign: "center", color: "var(--text-dim)" 
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "16px" }}>🤖</span>
            <p style={{ fontSize: "1.1rem" }}>Bước này không yêu cầu User Prompt cụ thể.<br/>Hệ thống / Agent sẽ tự động phân tích và xử lý (Autonomous).</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
