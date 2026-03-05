"use client";

import { useState } from "react";
import { aiWorkflows } from "@/data/workflow-prompts";
import { setupGuides, theoryTopics } from "@/data/setup-theory-data";
import PromptsSidebar from "@/components/PromptsSidebar";
import PromptViewer from "@/components/PromptViewer";

export default function PromptsPage() {
  const [activeSection, setActiveSection] = useState<"workflows" | "setup" | "theory">("setup");
  
  const [activeGuideId, setActiveGuideId] = useState<string | null>(setupGuides[0].id);
  const [activeTheoryId, setActiveTheoryId] = useState<string | null>(null);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // Data Selectors
  const activeGuide = setupGuides.find((g) => g.id === activeGuideId);
  const activeTheory = theoryTopics.find((t) => t.id === activeTheoryId);
  const activeWorkflow = aiWorkflows.find((wf) => wf.id === activeWorkflowId);
  const activeStep = activeStepId && activeWorkflow 
    ? activeWorkflow.steps.find((s) => s.id === activeStepId) || null 
    : null;

  // Handlers
  const handleSelectSetup = (guideId: string) => {
    setActiveSection("setup");
    setActiveGuideId(guideId);
    // Reset others
    setActiveTheoryId(null);
    setActiveWorkflowId(null);
    setActiveStepId(null);
  };

  const handleSelectTheory = (theoryId: string) => {
    setActiveSection("theory");
    setActiveTheoryId(theoryId);
    // Reset others
    setActiveGuideId(null);
    setActiveWorkflowId(null);
    setActiveStepId(null);
  };

  const handleSelectWorkflow = (workflowId: string) => {
    setActiveSection("workflows");
    setActiveWorkflowId(workflowId);
    setActiveStepId(null);
    // Reset others
    setActiveGuideId(null);
    setActiveTheoryId(null);
  };

  const handleSelectStep = (stepId: string) => {
    setActiveSection("workflows");
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
          setupGuides={setupGuides}
          theoryTopics={theoryTopics}
          
          activeSection={activeSection}
          activeWorkflowId={activeWorkflowId}
          activeStepId={activeStepId}
          activeGuideId={activeGuideId}
          activeTheoryId={activeTheoryId}
          
          onSelectWorkflow={handleSelectWorkflow}
          onSelectStep={handleSelectStep}
          onSelectSetup={handleSelectSetup}
          onSelectTheory={handleSelectTheory}
        />
      </div>
      <main className="docs-content" style={{ padding: "40px 20px 80px", minWidth: 0 }}>
        <PromptViewer 
          activeSection={activeSection}
          workflow={activeWorkflow} 
          step={activeStep} 
          setupGuide={activeGuide}
          theoryTopic={activeTheory}
        />
      </main>
    </div>
  );
}
