"use client";

import { AITrackingWorkflow, WorkflowCategory } from "@/data/workflow-prompts";
import { SetupGuide, TheoryTopic } from "@/data/setup-theory-data";
import { useState } from "react";

interface PromptsSidebarProps {
  workflowCategories: WorkflowCategory[];
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
  workflowCategories,
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

  // Track which workflow categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // Auto-expand the category that contains the active workflow
    const initial = new Set<string>();
    if (activeWorkflowId) {
      const cat = workflowCategories.find(c => c.workflows.some(w => w.id === activeWorkflowId));
      if (cat) initial.add(cat.id);
    }
    return initial;
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  // Auto-expand when a workflow becomes active
  const activeCat = activeWorkflowId
    ? workflowCategories.find(c => c.workflows.some(w => w.id === activeWorkflowId))
    : null;
  if (activeCat && !expandedCategories.has(activeCat.id)) {
    // Use a scheduled update to avoid updating state during render
    setTimeout(() => setExpandedCategories(prev => new Set(prev).add(activeCat.id)), 0);
  }

  return (
    <aside className="docs-sidebar" role="complementary" aria-label="Library Navigation">
      
      {/* GROUP 1: GETTING STARTED */}
      <div className="docs-sidebar__group" role="navigation" aria-label="Getting Started">
        <div className="docs-sidebar__group-title" style={{ marginTop: "10px" }}>{"> GETTING STARTED"}</div>
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
        </div>
      </div>

      {/* GROUP 2: LÝ THUYẾT SOFTWARE ENGINEERING */}
      <div className="docs-sidebar__group" role="navigation" aria-label="Lý thuyết Software Engineering">
        <div className="docs-sidebar__group-title">{"> Lý thuyết Software Engineering"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          
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

      {/* GROUP 3: AI WORKFLOWS — Categorized */}
      <div className="docs-sidebar__group" role="navigation" aria-label="AI Workflows">
        <div className="docs-sidebar__group-title">{"> AI Workflows"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {workflowCategories.map((cat) => {
            const isExpanded = expandedCategories.has(cat.id);
            const hasActiveChild = activeSection === "workflows" && cat.workflows.some(w => w.id === activeWorkflowId);
            
            return (
              <div key={cat.id} style={{ display: "flex", flexDirection: "column" }}>
                {/* Category parent item */}
                <button
                  className={`docs-sidebar__item ${hasActiveChild ? "active" : ""}`}
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isExpanded}
                  style={{ fontWeight: 600, justifyContent: "space-between" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span aria-hidden="true" style={{ opacity: 0.7 }}>{cat.icon}</span>
                    {cat.label}
                  </span>
                  <span style={{ fontSize: "0.7rem", opacity: 0.5, marginLeft: "auto", paddingLeft: "4px" }}>
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>
                
                {/* Sub-items: individual workflows */}
                {isExpanded && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginTop: "2px",
                    paddingLeft: "12px",
                    borderLeft: "2px solid var(--border-color)",
                    marginLeft: "14px",
                    marginBottom: "6px",
                  }}>
                    {cat.workflows.map((wf) => {
                      const isActiveWf = activeSection === "workflows" && activeWorkflowId === wf.id;
                      return (
                        <button
                          key={wf.id}
                          className={`docs-sidebar__item ${isActiveWf ? "active" : ""}`}
                          onClick={() => onSelectWorkflow(wf.id)}
                          style={{
                            padding: "5px 8px",
                            fontSize: "0.85rem",
                            fontWeight: isActiveWf ? 600 : 400,
                            minHeight: "auto",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            {wf.title}
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
