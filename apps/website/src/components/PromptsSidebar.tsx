"use client";

import { AITrackingWorkflow } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";

interface PromptsSidebarProps {
  workflows: AITrackingWorkflow[];
  setupGuides: SetupGuide[];
  theoryTopics: TheoryTopic[];
  
  activeSection: "workflows" | "setup" | "theory" | "research";
  activeWorkflowId: string | null;
  activeGuideId: string | null;
  activeTheoryId: string | null;
  activeResearchId: string | null;
  
  onSelectWorkflow: (workflowId: string) => void;
  onSelectSetup: (guideId: string) => void;
  onSelectTheory: (theoryId: string) => void;
  onSelectResearch: (researchId: string) => void;
}

export default function PromptsSidebar({
  workflows,
  setupGuides,
  theoryTopics,
  
  activeSection,
  activeWorkflowId,
  activeGuideId,
  activeTheoryId,
  activeResearchId,
  
  onSelectWorkflow,
  onSelectSetup,
  onSelectTheory,
  onSelectResearch,
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
          {theoryTopics.map((topic) => {
            const isActiveTheory = activeSection === "theory" && activeTheoryId === topic.id;
            return (
              <div key={topic.id} style={{ display: "flex", flexDirection: "column" }}>
                <button
                  className={`docs-sidebar__item ${isActiveTheory ? "active" : ""}`}
                  onClick={() => onSelectTheory(topic.id)}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span aria-hidden="true" style={{ opacity: 0.7 }}>📚</span>
                    {topic.title}
                  </span>
                </button>
                {isActiveTheory && topic.subItems && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px", paddingLeft: "16px", borderLeft: "2px solid var(--border-color)", marginLeft: "14px" }}>
                    {topic.subItems.map((sub) => (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        className="docs-sidebar__item docs-sidebar__item--sub"
                        style={{ padding: "4px 8px", fontSize: "0.85rem", color: "var(--text-dim)", textDecoration: "none", background: "transparent", minHeight: "auto" }}
                      >
                        • {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Research Spike Link */}
          <button
              className={`docs-sidebar__item ${activeSection === "research" ? "active" : ""}`}
              onClick={() => onSelectResearch("500-issues")}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span aria-hidden="true" style={{ opacity: 0.7 }}>🔍</span>
                Nghiên cứu: 500 Vấn đề
              </span>
          </button>

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
                  className={`docs-sidebar__item ${isActiveWf ? "active" : ""}`}
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
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
