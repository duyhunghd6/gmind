"use client";

import { WorkflowStep, AITrackingWorkflow } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";
import SectionLabel from "./SectionLabel";
import CodeBlock from "./CodeBlock";
import Terminal from "./Terminal";

interface PromptViewerProps {
  activeSection: "workflows" | "setup" | "theory";
  
  workflow?: AITrackingWorkflow;
  step?: WorkflowStep | null;
  
  setupGuide?: SetupGuide;
  theoryTopic?: TheoryTopic;
}

export default function PromptViewer({
  activeSection,
  workflow,
  step,
  setupGuide,
  theoryTopic
}: PromptViewerProps) {

  // ==========================================
  // VIEW: SETUP GUIDE
  // ==========================================
  if (activeSection === "setup" && setupGuide) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Hướng dẫn Cài đặt" accent="amber" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{setupGuide.title}</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {setupGuide.description}
        </p>

        <div style={{ marginTop: "2rem", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          <Terminal 
            title="bash"
            lines={setupGuide.terminalLines} 
            state="typing"
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: THEORY
  // ==========================================
  if (activeSection === "theory" && theoryTopic) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Lý thuyết & Bối cảnh" accent="teal" />
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{theoryTopic.title}</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {theoryTopic.description}
        </p>

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
          {theoryTopic.content}
        </div>

        {theoryTopic.roles && theoryTopic.roles.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", marginTop: "2rem" }}>Các Vai trò (Roles)</h3>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {theoryTopic.roles.map((role, idx) => (
                <div key={idx} style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: `var(--accent-${role.color}-dim)`,
                  border: `1px solid rgba(var(--accent-${role.color}-rgb), 0.2)`
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "1.5rem" }}>👤</span>
                    <h4 style={{ fontSize: "1.15rem", color: `var(--accent-${role.color})` }}>{role.name}</h4>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", lineHeight: "1.5" }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
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
          {/* Vertical Line for timeline */}
          <div style={{ position: "absolute", left: "24px", top: "0", bottom: "0", width: "2px", background: "var(--color-blueprint-line)", zIndex: 0 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 1 }}>
            {workflow.steps.map((s, index) => (
              <div key={s.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s`, display: "flex", gap: "24px" }}>
                
                {/* Timeline Node */}
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
                
                {/* Content Card */}
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
