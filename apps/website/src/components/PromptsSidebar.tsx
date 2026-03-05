"use client";

import { AITrackingWorkflow } from "@/data/workflow-prompts";

interface PromptsSidebarProps {
  workflows: AITrackingWorkflow[];
  activeWorkflowId: string;
  activeStepId: string | null;
  onSelectWorkflow: (workflowId: string) => void;
  onSelectStep: (stepId: string) => void;
}

export default function PromptsSidebar({
  workflows,
  activeWorkflowId,
  activeStepId,
  onSelectWorkflow,
  onSelectStep,
}: PromptsSidebarProps) {
  return (
    <aside className="docs-sidebar" role="complementary" aria-label="Workflows Navigation">
      <div className="docs-sidebar__group" role="navigation" aria-label="Workflows">
        <div className="docs-sidebar__group-title">{"> Workflows"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {workflows.map((wf) => {
            const isActiveWf = activeWorkflowId === wf.id;
            return (
              <div key={wf.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <button
                  className={`docs-sidebar__item ${isActiveWf && !activeStepId ? "active" : ""}`}
                  onClick={() => onSelectWorkflow(wf.id)}
                  aria-expanded={isActiveWf}
                  style={{
                    fontWeight: isActiveWf ? 600 : 400,
                    justifyContent: "space-between",
                  }}
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
                      const isActiveStep = activeStepId === step.id;
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
                            <span aria-hidden="true" style={{ opacity: 0.5, fontSize: "0.7rem" }}>
                              ↳
                            </span>
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
