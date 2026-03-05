"use client";

import { useState } from "react";
import { aiWorkflows } from "@/data/workflow-prompts";
import PromptsSidebar from "@/components/PromptsSidebar";
import PromptViewer from "@/components/PromptViewer";

export default function PromptsPage() {
  const [activeWorkflowId, setActiveWorkflowId] = useState(aiWorkflows[0].id);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const activeWorkflow = aiWorkflows.find((wf) => wf.id === activeWorkflowId) || aiWorkflows[0];
  const activeStep = activeStepId 
    ? activeWorkflow.steps.find((s) => s.id === activeStepId) || null 
    : null;

  const handleSelectWorkflow = (workflowId: string) => {
    setActiveWorkflowId(workflowId);
    setActiveStepId(null);
  };

  const handleSelectStep = (stepId: string) => {
    setActiveStepId(stepId);
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "300px minmax(0, 1fr)",
      maxWidth: "1600px",
      margin: "0 auto",
      gap: "2rem",
      minHeight: "calc(100vh - 80px)",
      alignItems: "start"
    }}>
      <div style={{ position: "sticky", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto", borderRight: "1px solid var(--border-color)", padding: "20px 0" }}>
        <PromptsSidebar
          workflows={aiWorkflows}
          activeWorkflowId={activeWorkflowId}
          activeStepId={activeStepId}
          onSelectWorkflow={handleSelectWorkflow}
          onSelectStep={handleSelectStep}
        />
      </div>
      <main className="docs-content" style={{ padding: "40px 20px 80px", minWidth: 0 }}>
        <PromptViewer workflow={activeWorkflow} step={activeStep} />
      </main>
    </div>
  );
}
