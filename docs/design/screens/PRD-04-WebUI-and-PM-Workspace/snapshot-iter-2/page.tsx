"use client";

import React, { useState } from "react";
import { 
  RTMDashboard, 
  SafeBoard, 
  ApprovalGates, 
  SearchResults 
} from "./components/DashboardScreens";
import { 
  TaskList, 
  TaskDetail, 
  TraceExplorer, 
  DocViewer 
} from "./components/TaskScreens";

export default function PRD04WebUIPMWorkspace() {
  const [activeScreen, setActiveScreen] = useState("rtm_dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("detail");
  const [approvalStatus, setApprovalStatus] = useState("Pending");

  const [screenStates, setScreenStates] = useState<Record<string, string>>({
    global_shell: "default",
    rtm_dashboard: "default",
    safe_board: "default",
    task_list: "default",
    task_detail: "default",
    trace_explorer: "default",
    doc_viewer: "default",
    approval_gates: "default",
    search_results: "default",
  });

  const [isOffline, setIsOffline] = useState(false);

  const navigateTo = (screenId: string) => {
    setActiveScreen(screenId);
    setScreenStates(prev => ({ ...prev, [screenId]: "loading" }));
    setTimeout(() => {
      setScreenStates(prev => ({ ...prev, [screenId]: "default" }));
    }, 600);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigateTo("search_results");
    }
  };

  const retryLoad = (screenId: string) => {
    setScreenStates(prev => ({ ...prev, [screenId]: "loading" }));
    setTimeout(() => {
      setScreenStates(prev => ({ ...prev, [screenId]: "default" }));
    }, 600);
  };

  const toggleOffline = () => {
    setIsOffline(!isOffline);
    setScreenStates(prev => ({ ...prev, global_shell: !isOffline ? "offline" : "default" }));
  };
  
  const setTestState = (screenId: string, state: string) => {
    setScreenStates(prev => ({ ...prev, [screenId]: state }));
  };

  const renderStateContent = (screenId: string, content: React.ReactNode) => {
    const currentState = screenStates[screenId] || "default";
    
    if (currentState === "loading") {
      return (
        <div aria-live="polite" aria-busy="true" style={{ padding: "var(--spacing-6)", display: "flex", flexDirection: "column", gap: "16px", opacity: 0.7, transition: "opacity 0.3s ease", willChange: "opacity" }}>
          <div style={{ width: "30%", height: "2rem", backgroundColor: "var(--border)", borderRadius: "var(--radius-sm)", animation: "pulse 1.5s infinite" }} />
          <div style={{ width: "100%", height: "150px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", animation: "pulse 1.5s infinite" }} />
          <div style={{ width: "100%", height: "300px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", animation: "pulse 1.5s infinite" }} />
        </div>
      );
    }
    
    if (currentState === "error") {
      return (
        <div aria-live="assertive" role="alert" style={{ padding: "var(--spacing-8)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", minHeight: "100dvh", justifyContent: "center" }}>
          <h2 style={{ margin: 0, color: "var(--text-danger)" }}>Failed to load data</h2>
          <p style={{ color: "var(--text-dim)" }}>There was an error communicating with the GMind gateway. Please check your connection.</p>
          <button onClick={() => retryLoad(screenId)} style={{ padding: "8px 16px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "600", transition: "transform 0.1s" }}>
            Retry Loading
          </button>
        </div>
      );
    }
    
    if (currentState === "empty") {
      return (
        <div aria-live="polite" style={{ padding: "var(--spacing-8)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", minHeight: "100dvh", justifyContent: "center" }}>
          <h2 style={{ margin: 0 }}>No Data Available</h2>
          <p style={{ color: "var(--text-dim)" }}>Get started by syncing your Git repositories or adding new requirements via the CLI.</p>
          <button onClick={() => retryLoad(screenId)} style={{ padding: "8px 16px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "600" }}>
            Import Data
          </button>
        </div>
      );
    }
    
    if (currentState === "not_found") {
      return (
        <div aria-live="assertive" role="alert" style={{ padding: "var(--spacing-8)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", minHeight: "100dvh", justifyContent: "center" }}>
          <h2 style={{ margin: 0, color: "var(--text-danger)" }}>Not Found</h2>
          <p style={{ color: "var(--text-dim)" }}>The requested item could not be found or you do not have permission.</p>
          <button onClick={() => navigateTo("rtm_dashboard")} style={{ padding: "8px 16px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "600" }}>
            Return Home
          </button>
        </div>
      );
    }

    return (
      <div style={{ opacity: 1, transition: "opacity 0.3s ease", transform: "translateY(0)", animation: "fadeIn 0.4s ease-out", display: "flex", flexDirection: "column", height: "100%" }}>
        {content}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text)", minHeight: "100dvh", fontFamily: "var(--font-sans)" }}>
      <a href="#main-content" style={{ position: "absolute", top: "-40px", left: "0", background: "var(--accent-cyan)", color: "white", padding: "8px", zIndex: 100, transition: "top 0.2s" }} onFocus={(e) => e.currentTarget.style.top = "0"} onBlur={(e) => e.currentTarget.style.top = "-40px"}>
        Skip to main content
      </a>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        *:focus-visible { outline: 2px solid var(--accent-cyan); outline-offset: 2px; }
      `}} />

      {/* GLOBAL SHELL */}
      <div 
        data-screen-id="global_shell" 
        data-state={screenStates["global_shell"]} 
        data-ds-id="ds:global_shell"
        className="layout-shell" 
        style={{ display: "flex", flexDirection: "column", height: "100dvh" }}
      >
        <header role="banner" data-ds-id="ds:shell_header" className="ds-lay-navbar" style={{ display: "flex", alignItems: "center", padding: "var(--spacing-4)", borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
           <button aria-label="Home" data-ds-id="ds:logo_btn" className="ds-comp-button btn-primary" style={{ background: "none", border: "none", color: "var(--text)", fontWeight: "bold", fontSize: "1.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} onClick={() => navigateTo("rtm_dashboard")}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "var(--accent-cyan)", borderRadius: "4px" }}></div>
              GMind PM
           </button>
           <nav role="search" style={{ flex: 1, margin: "0 var(--spacing-6)" }}>
             <input 
               type="search" 
               aria-label="Search"
               data-ds-id="ds:global_search" 
               placeholder="Search tasks, docs, beads-id..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={handleSearch}
               style={{ width: "100%", maxWidth: "480px", padding: "var(--spacing-2) var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", backgroundColor: "var(--bg)", color: "var(--text)" }} 
             />
           </nav>
           
           <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
             <button onClick={toggleOffline} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Toggle Offline</button>
             <button onClick={() => setTestState(activeScreen, "error")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Error</button>
             <button onClick={() => setTestState(activeScreen, "empty")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Empty</button>
             <button onClick={() => setTestState(activeScreen, "bulk_processing")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Bulk</button>
             <button onClick={() => setTestState(activeScreen, "not_found")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Not Found</button>
             <button onClick={() => setTestState(activeScreen, "saving")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Saving</button>
             <button onClick={() => setTestState(activeScreen, "partial")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Partial</button>
             <button onClick={() => setTestState(activeScreen, "insufficient_evidence")} style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Test Evidence</button>
             
             {isOffline ? (
                <div aria-live="polite" data-ds-id="ds:offline_status_indicator" className="ds-comp-badge badge-rose" style={{ fontSize: "0.875rem", padding: "4px 8px", backgroundColor: "var(--accent-rose-dim)", color: "var(--accent-rose)", borderRadius: "12px", border: "1px solid var(--accent-rose-dim)", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "var(--accent-rose)", borderRadius: "50%", marginRight: "6px" }}></span>
                  Offline Mode
                </div>
             ) : (
                <div aria-live="polite" data-ds-id="ds:offline_status_indicator" className="ds-comp-badge badge-teal" style={{ fontSize: "0.875rem", padding: "4px 8px", backgroundColor: "var(--accent-teal-dim)", color: "var(--accent-teal)", borderRadius: "12px", border: "1px solid var(--accent-teal-dim)", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "var(--accent-teal)", borderRadius: "50%", marginRight: "6px" }}></span>
                  System Online
                </div>
             )}
           </div>
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <aside role="navigation" aria-label="Main Navigation" data-ds-id="ds:shell_sidebar" style={{ width: "240px", borderRight: "1px solid var(--border)", backgroundColor: "var(--surface)", padding: "var(--spacing-4)", overflowY: "auto" }}>
            <nav data-ds-id="ds:nav_menu" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
              {[
                { id: "rtm_dashboard", label: "RTM Dashboard" },
                { id: "safe_board", label: "SAFe Board" },
                { id: "task_list", label: "Task Backlog" },
                { id: "doc_viewer", label: "Knowledge Base" },
                { id: "approval_gates", label: "Approval Gates" }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  aria-current={activeScreen === item.id ? "page" : undefined}
                  style={{ 
                    textAlign: "left", 
                    padding: "10px 12px", 
                    borderRadius: "var(--radius-sm)", 
                    border: "none",
                    backgroundColor: activeScreen === item.id ? "var(--bg)" : "transparent",
                    color: activeScreen === item.id ? "var(--text)" : "var(--text-dim)",
                    cursor: "pointer",
                    fontWeight: activeScreen === item.id ? "600" : "normal",
                    transition: "background-color 0.2s"
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <main id="main-content" role="main" style={{ flex: 1, overflowY: "auto", padding: "var(--spacing-6)", backgroundColor: "var(--bg)" }}>
            {activeScreen === "rtm_dashboard" && (
              <section data-screen-id="rtm_dashboard" data-state={screenStates["rtm_dashboard"]} data-ds-id="ds:dashboard_grid" className="ds-lay-grid" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)", height: "100%" }}>
                {renderStateContent("rtm_dashboard", <RTMDashboard navigateTo={navigateTo} />)}
              </section>
            )}

            {activeScreen === "safe_board" && (
              <section data-screen-id="safe_board" data-state={screenStates["safe_board"]} data-ds-id="ds:kanban_layout" className="ds-lay-kanban-board" style={{ height: "100%" }}>
                {renderStateContent("safe_board", <SafeBoard navigateTo={navigateTo} />)}
              </section>
            )}

            {activeScreen === "task_list" && (
              <section data-screen-id="task_list" data-state={screenStates["task_list"]} data-ds-id="ds:task_list_layout" className="layout-table_view" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", height: "100%" }}>
                {renderStateContent("task_list", <TaskList navigateTo={navigateTo} />)}
              </section>
            )}

            {activeScreen === "task_detail" && (
              <section data-screen-id="task_detail" data-state={screenStates["task_detail"]} data-ds-id="ds:task_detail_layout" className="layout-details" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", height: "100%" }}>
                {renderStateContent("task_detail", <TaskDetail navigateTo={navigateTo} activeTab={activeTab} setActiveTab={setActiveTab} state={screenStates["task_detail"]} />)}
              </section>
            )}

            {activeScreen === "trace_explorer" && (
              <section data-screen-id="trace_explorer" data-state={screenStates["trace_explorer"]} data-ds-id="ds:trace_explorer_layout" className="ds-lay-split-panel" style={{ display: "flex", height: "100%", gap: "var(--spacing-4)" }}>
                {renderStateContent("trace_explorer", <TraceExplorer navigateTo={navigateTo} />)}
              </section>
            )}

            {activeScreen === "doc_viewer" && (
              <section data-screen-id="doc_viewer" data-state={screenStates["doc_viewer"]} data-ds-id="ds:doc_viewer_layout" className="ds-lay-docs-layout" style={{ height: "100%" }}>
                {renderStateContent("doc_viewer", <DocViewer navigateTo={navigateTo} />)}
              </section>
            )}

            {activeScreen === "approval_gates" && (
              <section data-screen-id="approval_gates" data-state={screenStates["approval_gates"]} data-ds-id="ds:approval_layout" className="ds-comp-approval-panel" style={{ height: "100%" }}>
                {renderStateContent("approval_gates", <ApprovalGates approvalStatus={approvalStatus} setApprovalStatus={setApprovalStatus} state={screenStates["approval_gates"]} />)}
              </section>
            )}

            {activeScreen === "search_results" && (
              <section data-screen-id="search_results" data-state={screenStates["search_results"]} data-ds-id="ds:search_results_layout" className="ds-lay-split-panel" style={{ height: "100%" }}>
                {renderStateContent("search_results", <SearchResults navigateTo={navigateTo} searchQuery={searchQuery} />)}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
