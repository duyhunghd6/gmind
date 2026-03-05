"use client";

import { AITrackingWorkflow } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";

interface PromptsSidebarProps {
  workflows: AITrackingWorkflow[];
  setupGuides: SetupGuide[];
  theoryTopics: TheoryTopic[];
  
  activeSection: "workflows" | "setup" | "theory";
  activeWorkflowId: string | null;
  activeStepId: string | null;
  activeGuideId: string | null;
  activeTheoryId: string | null;
  
  onSelectWorkflow: (workflowId: string) => void;
  onSelectStep: (stepId: string) => void;
  onSelectSetup: (guideId: string) => void;
  onSelectTheory: (theoryId: string) => void;
}

export default function PromptsSidebar({
  workflows,
  setupGuides,
  theoryTopics,
  
  activeSection,
  activeWorkflowId,
  activeStepId,
  activeGuideId,
  activeTheoryId,
  
  onSelectWorkflow,
  onSelectStep,
  onSelectSetup,
  onSelectTheory,
}: PromptsSidebarProps) {

  return (
    <aside className="docs-sidebar" role="complementary" aria-label="Library Navigation">
      
      {/* GROUP 1: GETTING STARTED */}
      <div className="docs-sidebar__group" role="navigation" aria-label="Getting Started">
        <div className="docs-sidebar__group-title" style={{ marginTop: "10px" }}>{"> Getting Started"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          
          {/* Setup Links */}
          {setupGuides.map((guide) => (
            <button
              key={guide.id}
              className={`docs-sidebar__item ${activeSection === "setup" && activeGuideId === guide.id ? "active" : ""}`}
              onClick={() => onSelectSetup(guide.id)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span aria-hidden="true" style={{ opacity: 0.7 }}>⚡️</span>
                {guide.title}
              </span>
            </button>
          ))}

          {/* Theory Links */}
          {theoryTopics.map((topic) => (
            <button
              key={topic.id}
              className={`docs-sidebar__item ${activeSection === "theory" && activeTheoryId === topic.id ? "active" : ""}`}
              onClick={() => onSelectTheory(topic.id)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span aria-hidden="true" style={{ opacity: 0.7 }}>📚</span>
                {topic.title}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* GROUP 2: WORKFLOWS */}
      <div className="docs-sidebar__group" role="navigation" aria-label="Workflows">
        <div className="docs-sidebar__group-title">{"> AI Workflows"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {workflows.map((wf) => {
            const isActiveWf = activeSection === "workflows" && activeWorkflowId === wf.id;
            return (
              <div key={wf.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <button
                  className={`docs-sidebar__item ${isActiveWf && !activeStepId ? "active" : ""}`}
                  onClick={() => onSelectWorkflow(wf.id)}
                  aria-expanded={isActiveWf}
                  style={{ fontWeight: isActiveWf ? 600 : 400, justifyContent: "space-between" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span aria-hidden="true" style={{ opacity: 0.7 }}>
                      {isActiveWf ? "📂" : "📁"}
                    </span>
                    {wf.title}
                  </span>
                </button>

                {isActiveWf && (
                  <div style={{ display: "flex", flexDirection: "column", paddingLeft: "16px", gap: "2px", marginTop: "4px" }}>
                    {wf.steps.map((step) => {
                      const isActiveStep = activeSection === "workflows" && activeStepId === step.id;
                      return (
                        <button
                          key={step.id}
                          className={`docs-sidebar__item ${isActiveStep ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectStep(step.id);
                          }}
                          style={{
                            fontSize: "0.85rem",
                            padding: "6px 12px",
                            opacity: isActiveStep ? 1 : 0.8,
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span aria-hidden="true" style={{ opacity: 0.5, fontSize: "0.7rem" }}>↳</span>
                            {step.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
