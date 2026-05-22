"use client";

import React, { useState } from "react";

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
          <button onClick={() => retryLoad(screenId)} style={{ padding: "8px 16px", backgroundColor: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "600", transition: "transform 0.1s" }}>
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
          <button onClick={() => retryLoad(screenId)} style={{ padding: "8px 16px", backgroundColor: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "600" }}>
            Import Data
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
      <a href="#main-content" style={{ position: "absolute", top: "-40px", left: "0", background: "var(--color-primary)", color: "white", padding: "8px", zIndex: 100, transition: "top 0.2s" }} onFocus={(e) => e.currentTarget.style.top = "0"} onBlur={(e) => e.currentTarget.style.top = "-40px"}>
        Skip to main content
      </a>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        *:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
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
              <div style={{ width: "24px", height: "24px", backgroundColor: "var(--color-primary)", borderRadius: "4px" }}></div>
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
             
             {isOffline ? (
                <div aria-live="polite" data-ds-id="ds:offline_status_indicator" className="ds-comp-badge badge-rose" style={{ fontSize: "0.875rem", padding: "4px 8px", backgroundColor: "rgba(225, 29, 72, 0.1)", color: "rgb(225, 29, 72)", borderRadius: "12px", border: "1px solid rgba(225, 29, 72, 0.2)", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "rgb(225, 29, 72)", borderRadius: "50%", marginRight: "6px" }}></span>
                  Offline Mode
                </div>
             ) : (
                <div aria-live="polite" data-ds-id="ds:offline_status_indicator" className="ds-comp-badge badge-teal" style={{ fontSize: "0.875rem", padding: "4px 8px", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "rgb(16, 185, 129)", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "rgb(16, 185, 129)", borderRadius: "50%", marginRight: "6px" }}></span>
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
                {renderStateContent("rtm_dashboard", <>
                  <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Traceability Matrix Dashboard</h1>
                  
                  <div data-ds-id="ds:kpi_metrics" className="widget-kpi_row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--spacing-4)" }}>
                    {[
                      { label: "Total PRDs Active", value: "14", trend: "+2 this week" },
                      { label: "Test Coverage", value: "87.4%", trend: "+1.2% this week" },
                      { label: "Traceability Score", value: "92/100", trend: "Stable" },
                      { label: "Pending Approvals", value: "3", trend: "-1 since yesterday", color: "var(--text-danger)" }
                    ].map((kpi, i) => (
                      <div key={i} className="ds-comp-card" style={{ padding: "var(--spacing-4)", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-dim)", marginBottom: "8px" }}>{kpi.label}</div>
                        <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: kpi.color || "var(--text)" }}>{kpi.value}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px" }}>{kpi.trend}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-4)" }}>
                    <article data-ds-id="ds:heatmap_panel" className="panel-coverage ds-comp-card" style={{ padding: "var(--spacing-4)", minHeight: "300px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Requirement Coverage Heatmap</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "4px" }}>
                        {Array.from({length: 50}).map((_, i) => (
                          <div key={i} title={`Requirement br-prd0${Math.floor(i/10)+1}-s${(i%10)+1}`} style={{ height: "24px", backgroundColor: i % 7 === 0 ? "rgba(239, 68, 68, 0.8)" : i % 5 === 0 ? "rgba(245, 158, 11, 0.8)" : "rgba(16, 185, 129, 0.8)", borderRadius: "2px" }}></div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "16px", marginTop: "16px", fontSize: "0.875rem" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "rgba(16, 185, 129, 0.8)" }}></span> Full Coverage</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "rgba(245, 158, 11, 0.8)" }}></span> Partial</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "rgba(239, 68, 68, 0.8)" }}></span> Missing Tests</span>
                      </div>
                    </article>
                    <article data-ds-id="ds:task_progress_panel" className="panel-progress ds-comp-card" style={{ padding: "var(--spacing-4)", minHeight: "300px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Epic Progress</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {[
                          { title: "Implement Web UI Workspace (PRD-04)", progress: 65 },
                          { title: "Database Schema Migration", progress: 90 },
                          { title: "Authentication Flow Redesign", progress: 25 },
                          { title: "Design System Tokens Sync", progress: 100 }
                        ].map((epic, i) => (
                          <div key={i}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "4px" }}>
                              <span>{epic.title}</span>
                              <span>{epic.progress}%</span>
                            </div>
                            <div style={{ height: "8px", backgroundColor: "var(--bg)", borderRadius: "4px", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${epic.progress}%`, backgroundColor: epic.progress === 100 ? "rgb(16, 185, 129)" : "var(--color-primary)" }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--spacing-4)" }}>
                    <article data-ds-id="ds:mini_graph_panel" className="panel-graph ds-comp-card" onClick={() => navigateTo("trace_explorer")} style={{ padding: "var(--spacing-4)", minHeight: "400px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--color-primary)"} onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Trace Explorer Snapshot (Click to Expand)</h3>
                      <div style={{ height: "300px", border: "1px dashed var(--border)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", backgroundColor: "var(--color-primary)", borderRadius: "50%", zIndex: 2 }}></div>
                        <div style={{ position: "absolute", top: "30%", left: "30%", width: "24px", height: "24px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                        <div style={{ position: "absolute", top: "70%", left: "70%", width: "24px", height: "24px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                        <div style={{ position: "absolute", top: "20%", left: "60%", width: "30px", height: "30px", backgroundColor: "#6366f1", borderRadius: "4px" }}></div>
                        <svg aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
                          <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="var(--border)" strokeWidth="2" />
                          <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="var(--border)" strokeWidth="2" />
                          <line x1="50%" y1="50%" x2="60%" y2="20%" stroke="var(--border)" strokeWidth="2" />
                        </svg>
                        <div style={{ position: "absolute", bottom: "16px", right: "16px", fontSize: "0.875rem", backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>Interactive Graph View</div>
                      </div>
                    </article>
                    <article data-ds-id="ds:gap_analysis_panel" className="panel-gaps ds-comp-card" style={{ padding: "var(--spacing-4)", minHeight: "400px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Gap Analysis</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ padding: "12px", backgroundColor: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid rgb(239, 68, 68)", borderRadius: "0 4px 4px 0" }}>
                          <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "rgb(239, 68, 68)" }}>Orphaned Requirement</div>
                          <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>br-prd04-s7 lacks tests</div>
                        </div>
                        <div style={{ padding: "12px", backgroundColor: "rgba(245, 158, 11, 0.05)", borderLeft: "4px solid rgb(245, 158, 11)", borderRadius: "0 4px 4px 0" }}>
                          <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "rgb(245, 158, 11)" }}>Broken Trace</div>
                          <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>bd-task-891 references missing plan</div>
                        </div>
                      </div>
                    </article>
                  </div>
                </>)}
              </section>
            )}

            {activeScreen === "safe_board" && (
              <section data-screen-id="safe_board" data-state={screenStates["safe_board"]} data-ds-id="ds:kanban_layout" className="ds-lay-kanban-board" style={{ height: "100%" }}>
                {renderStateContent("safe_board", <>
                  <div style={{ display: "flex", gap: "var(--spacing-4)", height: "100%", overflowX: "auto", paddingBottom: "var(--spacing-4)" }}>
                    {[
                      { name: "Backlog", tasks: [{ id: "TSK-401", title: "Implement API Gateway", points: 5 }, { id: "TSK-402", title: "Setup FrankenSQLite Models", points: 3 }] },
                      { name: "In Progress", tasks: [{ id: "TSK-399", title: "Web UI Dashboard Layout", points: 8, escalation: true }] },
                      { name: "Review", tasks: [{ id: "TSK-385", title: "Update Design System Tokens", points: 2 }] },
                      { name: "Done", tasks: [{ id: "TSK-370", title: "Scaffold Monorepo", points: 5 }] }
                    ].map(col => (
                      <div key={col.name} data-ds-id="ds:kanban_column" className="ds-comp-kanban-column" style={{ minWidth: "320px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
                        <header style={{ padding: "var(--spacing-4)", borderBottom: "1px solid var(--border)", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>{col.name}</span>
                          <span style={{ fontSize: "0.75rem", padding: "2px 8px", backgroundColor: "var(--bg)", borderRadius: "12px" }}>{col.tasks.length}</span>
                        </header>
                        <div style={{ padding: "var(--spacing-4)", display: "flex", flexDirection: "column", gap: "var(--spacing-3)", flex: 1, overflowY: "auto" }}>
                          {col.tasks.map(task => (
                            <article key={task.id} data-ds-id="ds:task_card" className="ds-comp-card" onClick={() => navigateTo("task_detail")} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("task_detail"); }} tabIndex={0} style={{ padding: "var(--spacing-4)", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{task.id}</span>
                                <span style={{ fontSize: "0.75rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "2px 6px", borderRadius: "4px" }}>{task.points} pts</span>
                              </div>
                              <div style={{ fontWeight: "500", marginBottom: "12px", lineHeight: "1.4" }}>{task.title}</div>
                              <div style={{ display: "flex", gap: "8px" }}>
                                {task.escalation && <div data-ds-id="ds:rte_badge" className="ds-comp-badge badge-rose" style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "rgba(225, 29, 72, 0.1)", color: "rgb(225, 29, 72)", borderRadius: "4px", border: "1px solid rgba(225, 29, 72, 0.2)" }}>RTE Escalated</div>}
                                <div className="ds-comp-badge" style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "rgb(99, 102, 241)", borderRadius: "4px" }}>Frontend</div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>)}
              </section>
            )}

            {activeScreen === "task_list" && (
              <section data-screen-id="task_list" data-state={screenStates["task_list"]} data-ds-id="ds:task_list_layout" className="layout-table_view" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", height: "100%" }}>
                {renderStateContent("task_list", <>
                  <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Task Backlog</h1>
                  
                  <header data-ds-id="ds:task_filters" className="toolbar-filters" style={{ padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", gap: "16px" }}>
                    <select aria-label="Filter by Status" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", color: "var(--text)" }}>
                      <option>All Statuses</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                    <select aria-label="Filter by Assignee" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", color: "var(--text)" }}>
                      <option>All Assignees</option>
                      <option>Alice Chen</option>
                      <option>Bob Smith</option>
                    </select>
                    <button style={{ marginLeft: "auto", padding: "8px 16px", borderRadius: "4px", border: "none", backgroundColor: "var(--color-primary)", color: "#fff", cursor: "pointer" }}>Filter</button>
                  </header>

                  <div data-ds-id="ds:task_table" className="table-data ds-comp-data-table" style={{ flex: 1, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", backgroundColor: "var(--surface)", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
                          <th style={{ padding: "12px 16px", fontWeight: "600" }}>ID</th>
                          <th style={{ padding: "12px 16px", fontWeight: "600" }}>Title</th>
                          <th style={{ padding: "12px 16px", fontWeight: "600" }}>Status</th>
                          <th style={{ padding: "12px 16px", fontWeight: "600" }}>Assignee</th>
                          <th style={{ padding: "12px 16px", fontWeight: "600" }}>Linked PRD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "TSK-401", title: "Implement API Gateway routes", status: "Open", assignee: "Alice C.", prd: "br-prd04-s3" },
                          { id: "TSK-399", title: "Web UI Dashboard Layout", status: "In Progress", assignee: "Bob S.", prd: "br-prd04-s1" },
                          { id: "TSK-385", title: "Update Design System Tokens", status: "Review", assignee: "Alice C.", prd: "br-prd01-s5" }
                        ].map((row, i) => (
                          <tr key={i} tabIndex={0} style={{ borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "background-color 0.1s" }} onClick={() => navigateTo("task_detail")} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("task_detail"); }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                            <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>{row.id}</td>
                            <td style={{ padding: "12px 16px", fontWeight: "500" }}>{row.title}</td>
                            <td style={{ padding: "12px 16px" }}><span style={{ padding: "4px 8px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }}>{row.status}</span></td>
                            <td style={{ padding: "12px 16px" }}>{row.assignee}</td>
                            <td style={{ padding: "12px 16px" }}><span onClick={(e) => { e.stopPropagation(); navigateTo("doc_viewer"); }} style={{ color: "var(--color-primary)", textDecoration: "underline", cursor: "pointer" }}>{row.prd}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <footer data-ds-id="ds:task_pagination" className="toolbar-pagination" style={{ padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Showing 1-3 of 24 tasks</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button aria-label="Previous Page" style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Prev</button>
                      <button aria-label="Next Page" style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Next</button>
                    </div>
                  </footer>
                </>)}
              </section>
            )}

            {activeScreen === "task_detail" && (
              <section data-screen-id="task_detail" data-state={screenStates["task_detail"]} data-ds-id="ds:task_detail_layout" className="layout-details" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", height: "100%" }}>
                {renderStateContent("task_detail", <>
                  <header data-ds-id="ds:task_detail_header" className="header-task" style={{ padding: "var(--spacing-6)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", backgroundColor: "var(--surface)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", marginBottom: "8px" }}>TSK-399</div>
                      <h1 style={{ margin: "0 0 16px 0", fontSize: "1.75rem" }}>Web UI Dashboard Layout</h1>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ padding: "4px 10px", backgroundColor: "rgba(245, 158, 11, 0.1)", color: "rgb(245, 158, 11)", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "4px", fontSize: "0.875rem" }}>In Progress</span>
                        <span style={{ padding: "4px 10px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "0.875rem" }}>Assignee: Bob S.</span>
                      </div>
                    </div>
                    <button style={{ padding: "8px 16px", borderRadius: "4px", border: "none", backgroundColor: "var(--color-primary)", color: "#fff", cursor: "pointer" }}>Edit Task</button>
                  </header>

                  <nav role="tablist" data-ds-id="ds:task_detail_tabs" className="ds-comp-tab-panel" style={{ display: "flex", gap: "var(--spacing-6)", paddingBottom: "var(--spacing-2)", borderBottom: "1px solid var(--border)" }}>
                    <button role="tab" aria-selected={activeTab === "detail"} data-ds-id="ds:tab_detail" onClick={() => setActiveTab("detail")} className="tab-detail" style={{ background: "none", border: "none", color: activeTab === "detail" ? "var(--text)" : "var(--text-dim)", padding: "var(--spacing-2) 0", cursor: "pointer", borderBottom: activeTab === "detail" ? "2px solid var(--text)" : "2px solid transparent", fontWeight: activeTab === "detail" ? "600" : "normal" }}>Detail</button>
                    <button role="tab" aria-selected={activeTab === "activity"} data-ds-id="ds:tab_activity" onClick={() => setActiveTab("activity")} className="tab-activity" style={{ background: "none", border: "none", color: activeTab === "activity" ? "var(--text)" : "var(--text-dim)", padding: "var(--spacing-2) 0", cursor: "pointer", borderBottom: activeTab === "activity" ? "2px solid var(--text)" : "2px solid transparent" }}>Activity</button>
                    <button role="tab" aria-selected={false} data-ds-id="ds:tab_graph" onClick={() => navigateTo("trace_explorer")} className="tab-graph" style={{ background: "none", border: "none", color: "var(--text-dim)", padding: "var(--spacing-2) 0", cursor: "pointer", borderBottom: "2px solid transparent" }}>Graph</button>
                  </nav>

                  <div role="tabpanel" style={{ flex: 1, backgroundColor: "var(--surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", overflowY: "auto" }}>
                    {activeTab === "detail" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div>
                          <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Description</h3>
                          <p style={{ color: "var(--text-dim)", lineHeight: "1.6", margin: 0 }}>Implement the RTM dashboard layout according to the ui-contract.md definition. This includes setting up the CSS Grid areas, importing the core design system components, and mapping the state interactions.</p>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Traceability Links</h3>
                          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px" }}>Satisfies</span>
                              <span onClick={() => navigateTo("doc_viewer")} style={{ color: "var(--color-primary)", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-mono)" }}>br-prd04-s1</span>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px" }}>Tested By</span>
                              <span onClick={() => navigateTo("doc_viewer")} style={{ color: "var(--color-primary)", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-mono)" }}>br-test-rtm-01</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeTab === "activity" && (
                      <div style={{ color: "var(--text-dim)" }}>
                        <p>Yesterday - Bob S. moved task to In Progress</p>
                        <p>2 days ago - Alice C. created task</p>
                      </div>
                    )}
                  </div>
                </>)}
              </section>
            )}

            {activeScreen === "trace_explorer" && (
              <section data-screen-id="trace_explorer" data-state={screenStates["trace_explorer"]} data-ds-id="ds:trace_explorer_layout" className="ds-lay-split-panel" style={{ display: "flex", height: "100%", gap: "var(--spacing-4)" }}>
                {renderStateContent("trace_explorer", <>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                     <header data-ds-id="ds:graph_controls" className="toolbar-graph_controls" style={{ padding: "var(--spacing-4)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                       <div style={{ fontWeight: "bold" }}>Knowledge Graph Explorer</div>
                       <div style={{ display: "flex", gap: "8px" }}>
                         <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Zoom In</button>
                         <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Zoom Out</button>
                       </div>
                     </header>
                     <div data-ds-id="ds:d3_canvas" className="canvas-force_directed" style={{ flex: 1, minHeight: "500px", position: "relative", backgroundColor: "#0f172a" }}>
                        <svg aria-label="Knowledge Graph Visualization" style={{ width: "100%", height: "100%" }}>
                          <line x1="50%" y1="40%" x2="35%" y2="60%" stroke="#475569" strokeWidth="2" />
                          <line x1="50%" y1="40%" x2="65%" y2="60%" stroke="#475569" strokeWidth="2" />
                          <line x1="65%" y1="60%" x2="80%" y2="40%" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                          
                          <circle cx="50%" cy="40%" r="24" fill="#3b82f6" style={{ cursor: "pointer" }} onClick={() => navigateTo("doc_viewer")} />
                          <text x="50%" y="30%" fill="#94a3b8" fontSize="12" textAnchor="middle">br-prd04</text>
                          
                          <circle cx="35%" cy="60%" r="16" fill="#10b981" style={{ cursor: "pointer" }} onClick={() => navigateTo("task_detail")} />
                          <text x="35%" y="70%" fill="#94a3b8" fontSize="12" textAnchor="middle">TSK-399</text>
                          
                          <rect x="62%" y="57%" width="6%" height="6%" rx="4" fill="#f59e0b" style={{ cursor: "pointer" }} onClick={() => navigateTo("task_detail")} />
                          <text x="65%" y="70%" fill="#94a3b8" fontSize="12" textAnchor="middle">br-plan-04</text>
                        </svg>
                     </div>
                  </div>
                  <aside aria-label="Node Details" data-ds-id="ds:node_detail_drawer" className="panel-node_details ds-comp-card" style={{ width: "350px", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", padding: "var(--spacing-4)" }}>
                    <h3 style={{ margin: "0 0 16px 0", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>Node Details</h3>
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Type</div>
                      <div style={{ fontWeight: "500" }}>Requirement (PRD)</div>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Beads ID</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>br-prd04</div>
                    </div>
                    <button onClick={() => navigateTo("doc_viewer")} style={{ width: "100%", padding: "8px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Open Document</button>
                  </aside>
                </>)}
              </section>
            )}

            {activeScreen === "doc_viewer" && (
              <section data-screen-id="doc_viewer" data-state={screenStates["doc_viewer"]} data-ds-id="ds:doc_viewer_layout" className="ds-lay-docs-layout" style={{ height: "100%" }}>
                {renderStateContent("doc_viewer", <>
                  <div style={{ display: "flex", height: "100%", minHeight: "600px", gap: "var(--spacing-4)" }}>
                    <aside aria-label="Document Tree" data-ds-id="ds:doc_tree_sidebar" className="ds-comp-path-tree" style={{ width: "300px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", overflowY: "auto" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>Knowledge Base</h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
                        <li style={{ fontWeight: "600" }}>📁 PRDs</li>
                        <li style={{ paddingLeft: "16px", color: "var(--text-dim)", cursor: "pointer" }} onClick={() => navigateTo("doc_viewer")}>📄 PRD-01-Prompts</li>
                        <li style={{ paddingLeft: "16px", color: "var(--color-primary)", fontWeight: "500", cursor: "pointer" }}>📄 PRD-04-WebUI</li>
                        <li style={{ fontWeight: "600", marginTop: "8px" }}>📁 Plans</li>
                        <li style={{ paddingLeft: "16px", color: "var(--text-dim)", cursor: "pointer" }}>📄 plan-01-storage</li>
                      </ul>
                    </aside>
                    <article data-ds-id="ds:markdown_viewer" className="view-markdown ds-comp-code-block" style={{ flex: 1, backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-8)", overflowY: "auto" }}>
                      <h1 style={{ marginTop: 0 }}>PRD-04: Web UI and PM Workspace</h1>
                      <p style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "0.875rem", marginBottom: "24px" }}>
                        <span onClick={() => navigateTo("trace_explorer")} style={{ cursor: "pointer", textDecoration: "underline" }}>&lt;!-- beads-id: br-prd04 --&gt;</span>
                      </p>
                      
                      <h2>1. Introduction</h2>
                      <p style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                        <span onClick={() => navigateTo("trace_explorer")} style={{ cursor: "pointer", textDecoration: "underline" }}>&lt;!-- beads-id: br-prd04-s1 --&gt;</span>
                      </p>
                      <p style={{ lineHeight: "1.6" }}>This document outlines the requirements for the unified Web UI and Project Management workspace for GMind.</p>
                      
                      <h2>2. Core Features</h2>
                      <p style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                        <span onClick={() => navigateTo("trace_explorer")} style={{ cursor: "pointer", textDecoration: "underline" }}>&lt;!-- beads-id: br-prd04-s2 --&gt;</span>
                      </p>
                      <ul style={{ lineHeight: "1.6", paddingLeft: "24px" }}>
                        <li>Requirements Traceability Matrix Dashboard</li>
                        <li>SAFe 6.0 Kanban Boards</li>
                        <li>Universal Trace Explorer (Graph View)</li>
                      </ul>
                    </article>
                  </div>
                </>)}
              </section>
            )}

            {activeScreen === "approval_gates" && (
              <section data-screen-id="approval_gates" data-state={screenStates["approval_gates"]} data-ds-id="ds:approval_layout" className="ds-comp-approval-panel" style={{ height: "100%" }}>
                {renderStateContent("approval_gates", <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", height: "100%" }}>
                    <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Gate B Approval: Feature PRD-04</h1>
                    
                    <div data-ds-id="ds:approval_action_bar" className="toolbar-approval_actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontWeight: "600" }}>Status:</span>
                        <span style={{ padding: "4px 10px", backgroundColor: approvalStatus === "Approved" ? "rgba(16, 185, 129, 0.1)" : approvalStatus === "Rejected" ? "rgba(239, 68, 68, 0.1)" : "rgba(245, 158, 11, 0.1)", color: approvalStatus === "Approved" ? "rgb(16, 185, 129)" : approvalStatus === "Rejected" ? "rgb(239, 68, 68)" : "rgb(245, 158, 11)", borderRadius: "16px", fontSize: "0.875rem", border: `1px solid ${approvalStatus === "Approved" ? "rgba(16,185,129,0.3)" : approvalStatus === "Rejected" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}` }}>{approvalStatus}</span>
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <button data-ds-id="ds:approve_btn" onClick={() => setApprovalStatus("Approved")} className="ds-comp-button btn-primary" style={{ padding: "8px 16px", borderRadius: "4px", border: "none", backgroundColor: "rgb(16, 185, 129)", color: "#fff", cursor: "pointer", fontWeight: "500" }}>Approve Gate B</button>
                        <button data-ds-id="ds:reject_btn" onClick={() => setApprovalStatus("Rejected")} className="ds-comp-button btn-danger" style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid rgb(239, 68, 68)", backgroundColor: "transparent", color: "rgb(239, 68, 68)", cursor: "pointer", fontWeight: "500" }}>Reject Iteration</button>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "var(--spacing-4)", flex: 1, minHeight: "400px" }}>
                      <article data-ds-id="ds:code_diff_panel" className="panel-diff ds-comp-card" style={{ flex: 2, padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
                        <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem" }}>Visual Diff / Scorecard</h3>
                        <div style={{ flex: 1, backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.875rem", overflowY: "auto" }}>
                          <div style={{ color: "rgb(16, 185, 129)", marginBottom: "8px" }}>✓ All 14 components matched contract ds_ids</div>
                          <div style={{ color: "rgb(16, 185, 129)", marginBottom: "8px" }}>✓ State machine handlers fully wired</div>
                          <div style={{ color: "rgb(245, 158, 11)", marginBottom: "8px" }}>! Warning: Contrast ratio on task_badge slightly low (4.2:1)</div>
                          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed var(--border)" }}>
                            <div>Overall Gate B Score: <strong style={{ color: "rgb(16, 185, 129)" }}>94/100</strong></div>
                          </div>
                        </div>
                      </article>
                      
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
                        <article data-ds-id="ds:test_logs_panel" className="panel-test_logs ds-comp-terminal" style={{ flex: 1, padding: "var(--spacing-4)", backgroundColor: "#0f172a", color: "#e2e8f0", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", overflowY: "auto" }}>
                          <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "#fff" }}>E2E Test Logs</h3>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: "1.6" }}>
                            <div>&gt; running cypress E2E...</div>
                            <div style={{ color: "#34d399" }}>[PASS] navigation flow</div>
                            <div style={{ color: "#34d399" }}>[PASS] state diagram transition (offline -&gt; default)</div>
                            <div style={{ color: "#34d399" }}>[PASS] graph render integration</div>
                            <div>&gt; 24 tests passed in 12.4s</div>
                          </div>
                        </article>
                        <article data-ds-id="ds:prd_context_panel" className="panel-prd_context ds-comp-card" style={{ flex: 1, padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", overflowY: "auto" }}>
                          <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem" }}>Target Requirements</h3>
                          <ul style={{ paddingLeft: "16px", fontSize: "0.875rem", margin: 0, color: "var(--text-dim)", lineHeight: "1.6" }}>
                            <li>br-prd04-s1: Shell Layout</li>
                            <li>br-prd04-s2: Dashboard widgets</li>
                            <li>br-prd04-s6: Approval Panel with diffs</li>
                          </ul>
                        </article>
                      </div>
                    </div>
                  </div>
                </>)}
              </section>
            )}

            {activeScreen === "search_results" && (
              <section data-screen-id="search_results" data-state={screenStates["search_results"]} data-ds-id="ds:search_results_layout" className="ds-lay-split-panel" style={{ height: "100%" }}>
                {renderStateContent("search_results", <>
                  <div style={{ display: "flex", gap: "var(--spacing-4)", height: "100%", minHeight: "500px" }}>
                    <aside aria-label="Search Filters" data-ds-id="ds:search_filter_sidebar" className="sidebar-search_filters ds-comp-card" style={{ width: "250px", padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>Filter Results</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" defaultChecked /> All Types</label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> Tasks</label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> PRDs / Docs</label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> Commits</label>
                      </div>
                    </aside>
                    <div data-ds-id="ds:search_results_list" className="list-search_items ds-comp-card" style={{ flex: 1, padding: "var(--spacing-4)", backgroundColor: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h2 style={{ margin: "0 0 16px 0", fontSize: "1.25rem" }}>Results for "{searchQuery}"</h2>
                      
                      <div onClick={() => navigateTo("task_detail")} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("task_detail"); }} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", backgroundColor: "var(--bg)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "rgba(59, 130, 246, 0.1)", color: "rgb(59, 130, 246)", borderRadius: "4px" }}>Task</span>
                          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>TSK-399</span>
                        </div>
                        <div style={{ fontWeight: "500", marginBottom: "4px" }}>Web UI Dashboard Layout</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Implement the RTM dashboard layout according to the ui-contract.md definition...</div>
                      </div>

                      <div onClick={() => navigateTo("doc_viewer")} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("doc_viewer"); }} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", backgroundColor: "var(--bg)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "rgb(16, 185, 129)", borderRadius: "4px" }}>Document</span>
                          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>br-prd04</span>
                        </div>
                        <div style={{ fontWeight: "500", marginBottom: "4px" }}>PRD-04: Web UI and PM Workspace</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>This document outlines the requirements for the unified Web UI and Project Management workspace...</div>
                      </div>
                    </div>
                  </div>
                </>)}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}