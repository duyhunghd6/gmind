"use client";

import { WorkflowStep, AITrackingWorkflow } from "@/data/workflow-prompts";
import SectionLabel from "./SectionLabel";
import CodeBlock from "./CodeBlock";

interface PromptViewerProps {
  workflow: AITrackingWorkflow;
  step: WorkflowStep | null;
}

export default function PromptViewer({ workflow, step }: PromptViewerProps) {
  if (!step) {
    return (
      <div className="animate-fade-up">
        <SectionLabel text="Tổng quan Luồng" accent="teal" />
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{workflow.title}</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
          {workflow.description}
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Các bước trong luồng:</h3>
          {workflow.steps.map((s, index) => (
            <div key={s.id} style={{ display: "flex", gap: "16px", padding: "16px", background: "var(--bg-surface)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <div style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-teal-dim)", color: "var(--accent-teal)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                {index + 1}
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{s.title}</h4>
                <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "8px" }}>Vai trò: <span style={{ fontWeight: 600, color: s.role === "User" ? "var(--accent-cyan)" : "var(--accent-amber)" }}>{s.role}</span></div>
                <p style={{ fontSize: "0.95rem" }}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          <CodeBlock code={step.promptText} title={`Prompt: ${step.title}`} />
        </div>
      ) : (
        <div style={{ marginTop: "2rem", padding: "24px", background: "var(--bg-surface)", borderRadius: "8px", border: "1px dashed var(--border-color)", textAlign: "center", color: "var(--text-dim)" }}>
          <p>Bước này không yêu cầu User Prompt cụ thể. Hệ thống / Agent sẽ tự động xử lý (Autonomous).</p>
        </div>
      )}
    </div>
  );
}
