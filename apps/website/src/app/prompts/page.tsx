"use client";

import { useState, useEffect } from "react";
import { aiWorkflows, workflowCategories } from "@/data/workflow-prompts";
import { setupGuides, theoryTopics } from "@/data/setup-theory-data";
import PromptsSidebar from "@/components/PromptsSidebar";
import PromptViewer from "@/components/PromptViewer";

export default function PromptsPage() {
  const [activeSection, setActiveSection] = useState<"workflows" | "setup" | "theory" | "research">("setup");
  
  const [activeGuideId, setActiveGuideId] = useState<string | null>(setupGuides[0].id);
  const [activeTheoryId, setActiveTheoryId] = useState<string | null>(null);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [activeResearchId, setActiveResearchId] = useState<string | null>(null);

  useEffect(() => {
    // Check hash on mount to correctly navigate to shared links
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    // Check if the hash matches a theory sub-item
    const foundTheory = theoryTopics.find(t => t.subItems?.some(sub => sub.id === hash));
    if (foundTheory) {
      setActiveSection("theory");
      setActiveTheoryId(foundTheory.id);
      setActiveGuideId(null);
      
      // Delay scroll slightly to ensure DOM is rendered
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }

    // Check if it directly matches a theory id
    const foundDirectTheory = theoryTopics.find(t => t.id === hash);
    if (foundDirectTheory) {
      setActiveSection("theory");
      setActiveTheoryId(foundDirectTheory.id);
      setActiveGuideId(null);
      return;
    }

    // Check if it matches an AI Workflow
    const foundWorkflow = aiWorkflows.find(wf => wf.id === hash);
    if (foundWorkflow) {
      setActiveSection("workflows");
      setActiveWorkflowId(foundWorkflow.id);
      setActiveGuideId(null);
      setActiveTheoryId(null);
      return;
    }

    // Check if it matches a setup guide
    const foundGuide = setupGuides.find(g => g.id === hash);
    if (foundGuide) {
      setActiveSection("setup");
      setActiveGuideId(foundGuide.id);
      return;
    }
  }, []);

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
    setActiveResearchId(null);
    window.location.hash = guideId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTheory = (theoryId: string) => {
    setActiveSection("theory");
    setActiveTheoryId(theoryId);
    // Reset others
    setActiveGuideId(null);
    setActiveWorkflowId(null);
    setActiveStepId(null);
    setActiveResearchId(null);
    window.location.hash = theoryId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectResearch = (researchId: string) => {
    setActiveSection("research");
    setActiveResearchId(researchId);
    // Reset others
    setActiveGuideId(null);
    setActiveTheoryId(null);
    setActiveWorkflowId(null);
    setActiveStepId(null);
    window.location.hash = researchId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectWorkflow = (workflowId: string) => {
    setActiveSection("workflows");
    setActiveWorkflowId(workflowId);
    setActiveStepId(null);
    // Reset others
    setActiveGuideId(null);
    setActiveTheoryId(null);
    setActiveResearchId(null);
    window.location.hash = workflowId;
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <style>{`
        .sidebar-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-wrapper::-webkit-scrollbar-thumb {
          background: var(--accent-cyan-dim, rgba(14, 165, 233, 0.1));
          border-radius: 3px;
        }
        .sidebar-wrapper::-webkit-scrollbar-thumb:hover {
          background: var(--accent-cyan, #0ea5e9);
        }
      `}</style>
      <div className="sidebar-wrapper" style={{ position: "sticky", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto", borderRight: "1px solid var(--border-color)", padding: "20px 0" }}>
        <PromptsSidebar
          workflowCategories={workflowCategories}
          setupGuides={setupGuides}
          theoryTopics={theoryTopics}
          
          activeSection={activeSection}
          activeWorkflowId={activeWorkflowId}
          activeGuideId={activeGuideId}
          activeTheoryId={activeTheoryId}
          activeResearchId={activeResearchId}
          
          onSelectWorkflow={handleSelectWorkflow}
          onSelectSetup={handleSelectSetup}
          onSelectTheory={handleSelectTheory}
          onSelectResearch={handleSelectResearch}
        />
      </div>
      <main className="docs-content" style={{ padding: "40px 20px 80px", minWidth: 0, overflowY: "visible" }}>
        <PromptViewer 
          activeSection={activeSection}
          workflow={activeWorkflow} 
          step={activeStep} 
          setupGuide={activeGuide}
          theoryTopic={activeTheory}
          researchId={activeResearchId}
        />
      </main>
    </div>
  );
}
