"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import DsIdBadge from "@/components/DsIdBadge";

export default function WebUIPMWorkspacePage() {
  const [activeRoute, setActiveRoute] = useState("/");
  const [globalState, setGlobalState] = useState("default"); // default, offline, loading
  const [screenState, setScreenState] = useState("default"); // default, loading, empty, error

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "/";
      setActiveRoute(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
        window.location.hash = "#/";
    } else {
        handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#${path}`;
  };

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const renderStateSwitcher = () => (
    <section 
      role="region" 
      aria-label="Development Controls" 
      style={{ marginBottom: "var(--spacing-4)", padding: "var(--spacing-3)", background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}
    >
      <div style={{ display: "flex", gap: "var(--spacing-3)", alignItems: "center", marginBottom: "var(--spacing-3)" }}>
        <span id="global-state-label" style={{ fontWeight: 600, color: "var(--text)" }}>Shell State:</span>
        <div role="group" aria-labelledby="global-state-label" style={{ display: "flex", gap: "var(--spacing-2)" }}>
          {["default", "loading", "offline"].map((state) => (
            <button
              key={state}
              onClick={() => setGlobalState(state)}
              aria-pressed={globalState === state}
              style={{
                padding: "var(--spacing-1) var(--spacing-3)",
                background: globalState === state ? "var(--accent-cyan)" : "var(--surface)",
                color: globalState === state ? "var(--bg)" : "var(--text-dim)",
                border: "1px solid var(--border-highlight)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              {state}
            </button>
          ))}
        </div>

        <span id="screen-state-label" style={{ fontWeight: 600, color: "var(--text)", marginLeft: "var(--spacing-4)" }}>Screen State:</span>
        <div role="group" aria-labelledby="screen-state-label" style={{ display: "flex", gap: "var(--spacing-2)" }}>
          {["default", "loading", "empty", "error", "partial", "not_found", "insufficient_evidence"].map((state) => (
            <button
              key={state}
              onClick={() => setScreenState(state)}
              aria-pressed={screenState === state}
              style={{
                padding: "var(--spacing-1) var(--spacing-3)",
                background: screenState === state ? "var(--accent-teal)" : "var(--surface)",
                color: screenState === state ? "var(--bg)" : "var(--text-dim)",
                border: "1px solid var(--border-highlight)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "var(--spacing-3)", alignItems: "center" }}>
        <span id="active-route-label" style={{ fontWeight: 600, color: "var(--text)" }}>Active Route:</span>
        <nav role="navigation" aria-labelledby="active-route-label" style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
          {[
            { label: "Dashboard (/)", path: "/" }, 
            { label: "SAFe Board (/board)", path: "/board" },
            { label: "Tasks (/tasks)", path: "/tasks" },
            { label: "Task Detail (/tasks/1)", path: "/tasks/1" },
            { label: "Trace (/trace/1)", path: "/trace/1" },
            { label: "Docs (/docs)", path: "/docs" },
            { label: "Approval (/approval)", path: "/approval" },
            { label: "Search (/search)", path: "/search" },
          ].map((route) => (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              aria-pressed={activeRoute === route.path}
              style={{
                padding: "var(--spacing-1) var(--spacing-3)",
                background: activeRoute === route.path ? "var(--accent-amber)" : "var(--surface)",
                color: activeRoute === route.path ? "var(--bg)" : "var(--text-dim)",
                border: "1px solid var(--border-highlight)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              {route.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );

  const renderTopNav = () => (
    <header 
      role="banner" 
      data-ds-id="ds:shell_header" 
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-3)", background: "var(--surface)", borderBottom: "1px solid var(--border)", position: "relative" }}
    >
      <DsIdBadge id="ds:shell_header" />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}>
        <button 
            data-ds-id="ds:logo_btn" 
            onClick={() => navigate("/")}
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
            Gmind WebUI Workspace
        </button>
      </div>
      
      <div style={{ display: "flex", gap: "var(--spacing-4)", alignItems: "center" }}>
        <div data-ds-id="ds:global_search" role="search" style={{ display: "flex", gap: "var(--spacing-2)", position: "relative" }}>
            <DsIdBadge id="ds:global_search" />
            <input 
                type="search" 
                aria-label="Global search"
                placeholder="Search..." 
                onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
                style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", width: "250px" }}
                disabled={globalState === "loading" || globalState === "offline"}
            />
            <button 
                onClick={() => navigate("/search")}
                aria-label="Submit search"
                disabled={globalState === "loading" || globalState === "offline"} 
                style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface-elevated)", color: "var(--text)", cursor: "pointer" }}
            >
            Search
            </button>
        </div>

        <div aria-live="polite" style={{ display: "flex", alignItems: "center" }}>
          {globalState === "offline" && (
              <div data-ds-id="ds:offline_status_indicator" style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)", color: "var(--accent-amber)" }}>
                  <DsIdBadge id="ds:offline_status_indicator" />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-amber)", display: "inline-block" }}></span>
                  Offline Mode
              </div>
          )}
        </div>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside data-ds-id="ds:shell_sidebar" style={{ width: "240px", borderRight: "1px solid var(--border)", background: "var(--surface)", display: "flex", flexDirection: "column", padding: "var(--spacing-4)", position: "relative" }}>
      <DsIdBadge id="ds:shell_sidebar" />
      <nav data-ds-id="ds:nav_menu" role="navigation" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", position: "relative" }}>
        <DsIdBadge id="ds:nav_menu" />
        {[
            { id: "home", label: "Dashboard", path: "/" },
            { id: "board", label: "SAFe Board", path: "/board" },
            { id: "tasks", label: "Task List", path: "/tasks" },
            { id: "docs", label: "Doc Viewer", path: "/docs" },
            { id: "approval", label: "Approval Gates", path: "/approval" },
        ].map(item => (
            <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                    textAlign: "left",
                    padding: "var(--spacing-2)",
                    borderRadius: "var(--radius-sm)",
                    background: activeRoute === item.path || (item.path !== "/" && activeRoute.startsWith(item.path)) ? "var(--accent-teal-dim)" : "transparent",
                    color: activeRoute === item.path || (item.path !== "/" && activeRoute.startsWith(item.path)) ? "var(--text)" : "var(--text-dim)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: activeRoute === item.path ? 600 : 400
                }}
            >
                {item.label}
            </button>
        ))}
      </nav>
    </aside>
  );

  // Common UI State Handlers
  const renderScreenState = () => {
    if (screenState === "loading") {
        return <div role="status" aria-live="polite" style={{ padding: "var(--spacing-8)", color: "var(--text-dim)", textAlign: "center" }}>Loading data...</div>;
    }
    if (screenState === "error") {
        return <div role="alert" aria-live="assertive" style={{ padding: "var(--spacing-8)", color: "var(--accent-rose)", textAlign: "center" }}>Error loading data. <button onClick={() => setScreenState("default")} style={{ marginLeft: "var(--spacing-2)" }}>Retry</button></div>;
    }
    if (screenState === "empty") {
        return <div role="status" aria-live="polite" style={{ padding: "var(--spacing-8)", color: "var(--text-dim)", textAlign: "center" }}>No records found.</div>;
    }
    if (screenState === "not_found") {
        return <div role="status" aria-live="polite" style={{ padding: "var(--spacing-8)", color: "var(--accent-amber)", textAlign: "center" }}>404 - Resource not found.</div>;
    }
    if (screenState === "insufficient_evidence") {
        return <div role="status" aria-live="polite" style={{ padding: "var(--spacing-8)", color: "var(--accent-amber)", textAlign: "center", border: "1px solid var(--accent-amber)", borderRadius: "var(--radius-md)" }}>Missing evidence to proceed.</div>;
    }
    return null;
  };

  // Screens
  const renderRtmDashboard = () => (
    <div data-ds-id="ds:dashboard_grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-4)", position: "relative" }}>
        <DsIdBadge id="ds:dashboard_grid" />
        <h1 style={{ gridColumn: "1 / -1", color: "var(--text)", margin: 0, fontSize: "1.5rem" }}>Dashboard</h1>
        
        <div data-ds-id="ds:kpi_metrics" style={{ gridColumn: "1 / -1", display: "flex", gap: "var(--spacing-4)", position: "relative", padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
            <DsIdBadge id="ds:kpi_metrics" />
            <div style={{ flex: 1, padding: "var(--spacing-2)" }}>
                <div style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Total PRDs</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>12</div>
            </div>
            <div style={{ flex: 1, padding: "var(--spacing-2)", borderLeft: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Covered Tasks</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-teal)" }}>85%</div>
            </div>
            <div style={{ flex: 1, padding: "var(--spacing-2)", borderLeft: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>RTE Escalations</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-rose)" }}>3</div>
            </div>
        </div>

        <div data-ds-id="ds:heatmap_panel" style={{ padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", position: "relative" }}>
            <DsIdBadge id="ds:heatmap_panel" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)" }}>Coverage Heatmap</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "var(--spacing-1)" }}>
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} style={{ aspectRatio: "1", background: `rgba(0, 150, 136, ${Math.random() * 0.8 + 0.2})`, borderRadius: "var(--radius-sm)" }} />
                ))}
            </div>
        </div>

        <div data-ds-id="ds:task_progress_panel" style={{ padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", position: "relative" }}>
            <DsIdBadge id="ds:task_progress_panel" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)" }}>Task Progress</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
                {["Authentication", "Database Migration", "UI Components"].map(task => (
                    <div key={task} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-2)", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                        <span style={{ color: "var(--text)" }}>{task}</span>
                        <Badge accent="cyan">In Progress</Badge>
                    </div>
                ))}
            </div>
        </div>

        <div data-ds-id="ds:mini_graph_panel" style={{ padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", position: "relative", cursor: "pointer" }} onClick={() => navigate("/trace/overview")}>
            <DsIdBadge id="ds:mini_graph_panel" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)" }}>Trace Graph</h3>
            <div style={{ height: "150px", border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", gap: "var(--spacing-4)", position: "relative" }}>
                    <div style={{ padding: "var(--spacing-1)", background: "var(--surface-elevated)", border: "2px solid var(--accent-amber)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)", fontSize: "0.5rem" }}>PRD</div>
                    <div style={{ width: 40, height: 2, background: "var(--border)", alignSelf: "center" }}></div>
                    <div style={{ padding: "var(--spacing-1)", background: "var(--surface-elevated)", border: "2px solid var(--accent-teal)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)", fontSize: "0.5rem" }}>Plan</div>
                </div>
            </div>
        </div>

        <div data-ds-id="ds:gap_analysis_panel" style={{ padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", position: "relative" }}>
            <DsIdBadge id="ds:gap_analysis_panel" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)" }}>Gap Analysis</h3>
            <p style={{ color: "var(--text-dim)" }}>2 PRD sections are missing implementation plans.</p>
            <button style={{ marginTop: "var(--spacing-2)", padding: "var(--spacing-2) var(--spacing-3)", background: "var(--accent-cyan)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Generate Gap Plan</button>
        </div>
    </div>
  );

  const renderSafeBoard = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "var(--spacing-4)" }}>
        <h1 style={{ color: "var(--text)", margin: 0, fontSize: "1.5rem" }}>SAFe Board</h1>
        <div data-ds-id="ds:kanban_layout" style={{ display: "flex", gap: "var(--spacing-4)", flex: 1, overflowX: "auto", position: "relative" }}>
            <DsIdBadge id="ds:kanban_layout" />
            {["To Do", "In Progress", "Review", "Done"].map(col => (
            <div key={col} data-ds-id="ds:kanban_column" style={{ minWidth: "300px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", display: "flex", flexDirection: "column", gap: "var(--spacing-3)", position: "relative" }}>
                <DsIdBadge id="ds:kanban_column" />
                <h3 style={{ color: "var(--text)", borderBottom: "1px solid var(--border)", paddingBottom: "var(--spacing-2)" }}>{col}</h3>
                
                {[1, 2].map(task => (
                    <div key={task} data-ds-id="ds:task_card" onClick={() => navigate("/tasks/1")} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--spacing-3)", cursor: "pointer", position: "relative" }}>
                        <DsIdBadge id="ds:task_card" />
                        <div style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginBottom: "var(--spacing-1)" }}>br-plan-0{task}</div>
                        <div style={{ color: "var(--text)", fontWeight: 600 }}>Task Title {task}</div>
                        {col === "In Progress" && task === 1 && (
                            <div data-ds-id="ds:rte_badge" style={{ marginTop: "var(--spacing-2)", position: "relative" }}>
                                <DsIdBadge id="ds:rte_badge" />
                                <Badge accent="rose">RTE: Blocked</Badge>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            ))}
        </div>
    </div>
  );
  const renderTaskList = () => (
    <div data-ds-id="ds:task_list_layout" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
        <DsIdBadge id="ds:task_list_layout" />
        <h1 style={{ color: "var(--text)", margin: 0, fontSize: "1.5rem" }}>Task List</h1>
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div data-ds-id="ds:task_filters" style={{ display: "flex", gap: "var(--spacing-2)", position: "relative" }}>
                <DsIdBadge id="ds:task_filters" />
                <select style={{ padding: "var(--spacing-2)", background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                    <option>Status: All</option>
                    <option>In Progress</option>
                </select>
                <select style={{ padding: "var(--spacing-2)", background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                    <option>Assignee: All</option>
                </select>
            </div>
            
            <div data-ds-id="ds:task_bulk_actions" style={{ display: "flex", gap: "var(--spacing-2)", position: "relative" }}>
                <DsIdBadge id="ds:task_bulk_actions" />
                <button style={{ padding: "var(--spacing-2) var(--spacing-4)", background: "var(--accent-teal)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Bulk Complete</button>
            </div>
        </div>

        <div data-ds-id="ds:task_table" style={{ width: "100%", overflowX: "auto", position: "relative" }}>
            <DsIdBadge id="ds:task_table" />
            <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text)", textAlign: "left" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                        <th style={{ padding: "var(--spacing-2)" }}><input type="checkbox" /></th>
                        <th style={{ padding: "var(--spacing-2)" }}>ID</th>
                        <th style={{ padding: "var(--spacing-2)" }}>Title</th>
                        <th style={{ padding: "var(--spacing-2)" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map(row => (
                        <tr key={row} style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }} onClick={() => navigate(`/tasks/${row}`)}>
                            <td style={{ padding: "var(--spacing-2)" }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                            <td style={{ padding: "var(--spacing-2)" }}>br-plan-0{row}</td>
                            <td style={{ padding: "var(--spacing-2)" }}>Implementation Plan {row}</td>
                            <td style={{ padding: "var(--spacing-2)" }}><Badge accent="cyan">Active</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div data-ds-id="ds:task_pagination" style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)", position: "relative" }}>
            <DsIdBadge id="ds:task_pagination" />
            <button style={{ padding: "var(--spacing-1) var(--spacing-3)", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "var(--radius-sm)" }}>Prev</button>
            <button style={{ padding: "var(--spacing-1) var(--spacing-3)", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "var(--radius-sm)" }}>Next</button>
        </div>
    </div>
  );

  const renderTaskDetail = () => (
    <div data-ds-id="ds:task_detail_layout" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
        <DsIdBadge id="ds:task_detail_layout" />
        
        <div data-ds-id="ds:task_detail_header" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--spacing-4)", position: "relative" }}>
            <DsIdBadge id="ds:task_detail_header" />
            <div style={{ color: "var(--text-dim)", fontSize: "0.875rem", marginBottom: "var(--spacing-2)" }}>br-plan-01 | Satisfies: br-prd04-s1</div>
            <h1 style={{ color: "var(--text)", marginBottom: "var(--spacing-2)", fontSize: "1.5rem" }}>Implement Dashboard Grid</h1>
            <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
                <Badge accent="cyan">In Progress</Badge>
                <Badge accent="amber">High Priority</Badge>
            </div>
        </div>

        <div data-ds-id="ds:task_detail_tabs" style={{ display: "flex", gap: "var(--spacing-4)", borderBottom: "1px solid var(--border)", paddingBottom: "var(--spacing-2)", position: "relative" }}>
            <DsIdBadge id="ds:task_detail_tabs" />
            {["Detail", "Activity", "Graph", "Code"].map((tab, i) => (
                <button 
                    key={tab} 
                    data-ds-id={tab === "Activity" ? "ds:tab_activity" : tab === "Graph" ? "ds:tab_graph" : tab === "Code" ? "ds:tab_code" : undefined}
                    style={{ background: "transparent", border: "none", color: i === 0 ? "var(--accent-teal)" : "var(--text-dim)", fontWeight: i === 0 ? 600 : 400, cursor: "pointer", padding: "0 var(--spacing-2)" }}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div data-ds-id="ds:tab_detail" style={{ padding: "var(--spacing-2)", position: "relative" }}>
            <DsIdBadge id="ds:tab_detail" />
            <h4 style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}>Description</h4>
            <p style={{ color: "var(--text-dim)", marginBottom: "var(--spacing-4)", lineHeight: 1.5 }}>
                Setup the layout.grid component according to the Stage 2 Build UI Contract.
            </p>
            <button onClick={() => navigate("/trace/br-plan-01")} style={{ padding: "var(--spacing-2)", background: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                View in Trace Explorer
            </button>
        </div>
    </div>
  );

  const renderTraceExplorer = () => (
    <div data-ds-id="ds:trace_explorer_layout" style={{ display: "flex", gap: "var(--spacing-4)", height: "calc(100vh - 150px)", position: "relative" }}>
        <DsIdBadge id="ds:trace_explorer_layout" />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--spacing-2)", position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
            <div data-ds-id="ds:graph_controls" style={{ padding: "var(--spacing-3)", borderBottom: "1px solid var(--border)", position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DsIdBadge id="ds:graph_controls" />
                <h1 style={{ color: "var(--text)", margin: 0, fontSize: "1rem" }}>Trace Graph: br-plan-01</h1>
                <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
                    <button style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "var(--radius-sm)", padding: "var(--spacing-1) var(--spacing-2)" }}>Zoom In</button>
                    <button style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "var(--radius-sm)", padding: "var(--spacing-1) var(--spacing-2)" }}>Zoom Out</button>
                </div>
            </div>
            
            <div data-ds-id="ds:d3_canvas" style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DsIdBadge id="ds:d3_canvas" />
                <div style={{ display: "flex", gap: "var(--spacing-8)", position: "relative" }}>
                    <div onClick={() => navigate("/docs")} style={{ padding: "var(--spacing-3)", background: "var(--surface-elevated)", border: "2px solid var(--accent-amber)", borderRadius: "50%", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)", cursor: "pointer" }}>PRD-04</div>
                    <div style={{ width: 100, height: 2, background: "var(--border)", alignSelf: "center" }}></div>
                    <div onClick={() => navigate("/tasks/1")} style={{ padding: "var(--spacing-3)", background: "var(--surface-elevated)", border: "2px solid var(--accent-teal)", borderRadius: "50%", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)", cursor: "pointer" }}>Plan-01</div>
                </div>
            </div>
        </div>

        <div data-ds-id="ds:node_detail_drawer" style={{ width: "350px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
            <DsIdBadge id="ds:node_detail_drawer" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)" }}>Node Details</h3>
            <div style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}><strong>ID:</strong> br-plan-01</div>
            <div style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}><strong>Type:</strong> Task / Plan</div>
            <div style={{ color: "var(--text-dim)", lineHeight: 1.5 }}>This node represents the execution plan for satisfying the dashboard requirements.</div>
        </div>
    </div>
  );

  const renderDocViewer = () => (
    <div data-ds-id="ds:doc_viewer_layout" style={{ display: "flex", gap: "var(--spacing-4)", height: "calc(100vh - 150px)", position: "relative" }}>
        <DsIdBadge id="ds:doc_viewer_layout" />
        
        <div data-ds-id="ds:doc_tree_sidebar" style={{ width: "250px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
            <DsIdBadge id="ds:doc_tree_sidebar" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)", fontSize: "1rem" }}>Documents</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-dim)" }}>
                <li style={{ padding: "var(--spacing-2) 0", color: "var(--text)", fontWeight: 600 }}>PRD-04-WebUI</li>
                <li style={{ padding: "var(--spacing-2) 0", paddingLeft: "var(--spacing-3)" }}>1. Feature Summary</li>
                <li style={{ padding: "var(--spacing-2) 0", paddingLeft: "var(--spacing-3)" }}>2. UI Contract</li>
            </ul>
        </div>

        <div data-ds-id="ds:markdown_viewer" style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-6)", position: "relative", overflowY: "auto" }}>
            <DsIdBadge id="ds:markdown_viewer" />
            <h1 style={{ color: "var(--text)", borderBottom: "1px solid var(--border)", paddingBottom: "var(--spacing-2)", marginBottom: "var(--spacing-4)" }}>UI Contract: Giao diện PM</h1>
            <div onClick={() => navigate("/trace/br-ui-contract-prd04")} style={{ display: "inline-block", background: "var(--surface-elevated)", border: "1px dashed var(--accent-teal)", color: "var(--accent-teal)", padding: "var(--spacing-1) var(--spacing-2)", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", marginBottom: "var(--spacing-4)", cursor: "pointer" }}>
                &lt;!-- beads-id: br-ui-contract-prd04 --&gt; (Click to Trace)
            </div>
            <p style={{ color: "var(--text)", lineHeight: 1.6, marginBottom: "var(--spacing-4)" }}>
                This feature introduces the Web UI and PM Workspace for the gmind system...
            </p>
        </div>
    </div>
  );

  const renderApprovalGates = () => (
    <div data-ds-id="ds:approval_layout" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)", position: "relative" }}>
        <DsIdBadge id="ds:approval_layout" />
        <h1 style={{ color: "var(--text)", margin: 0, fontSize: "1.5rem" }}>Approval Gates</h1>
        
        {screenState === "insufficient_evidence" && (
            <div style={{ background: "var(--accent-amber-dim)", color: "var(--accent-amber)", padding: "var(--spacing-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--accent-amber)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Missing test execution evidence for Gate A approval.</span>
                <button onClick={() => setScreenState("default")} style={{ background: "transparent", border: "1px solid var(--accent-amber)", color: "var(--accent-amber)", padding: "var(--spacing-1) var(--spacing-2)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Refresh Data</button>
            </div>
        )}

        <div data-ds-id="ds:prd_context_panel" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
            <DsIdBadge id="ds:prd_context_panel" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}>Target: br-plan-01</h3>
            <p style={{ color: "var(--text-dim)" }}>Satisfies: br-prd04-s1 (Dashboard View)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-4)" }}>
            <div data-ds-id="ds:code_diff_panel" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
                <DsIdBadge id="ds:code_diff_panel" />
                <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}>Code Diff</h3>
                <div style={{ background: "var(--bg)", padding: "var(--spacing-3)", borderRadius: "var(--radius-sm)", fontFamily: "monospace", color: "var(--text-dim)", fontSize: "0.875rem", overflowX: "auto" }}>
                    <div style={{ color: "var(--accent-teal)" }}>+ &lt;div data-ds-id="ds:dashboard_grid"&gt;</div>
                    <div style={{ color: "var(--accent-teal)" }}>+   &lt;h1&gt;Dashboard&lt;/h1&gt;</div>
                    <div style={{ color: "var(--accent-teal)" }}>+ &lt;/div&gt;</div>
                </div>
            </div>
            
            <div data-ds-id="ds:test_logs_panel" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
                <DsIdBadge id="ds:test_logs_panel" />
                <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-2)" }}>Test Logs (QA Pass)</h3>
                <div style={{ background: "var(--bg)", padding: "var(--spacing-3)", borderRadius: "var(--radius-sm)", fontFamily: "monospace", color: "var(--text-dim)", fontSize: "0.875rem" }}>
                    <div>[PASS] Rendering global_shell</div>
                    <div>[PASS] Navigation to /board works</div>
                    <div>[PASS] No accessibility violations</div>
                </div>
            </div>
        </div>

        <div data-ds-id="ds:approval_action_bar" style={{ display: "flex", gap: "var(--spacing-4)", justifyContent: "flex-end", padding: "var(--spacing-4)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", position: "relative" }}>
            <DsIdBadge id="ds:approval_action_bar" />
            <button data-ds-id="ds:reject_btn" onClick={() => navigate("/")} style={{ padding: "var(--spacing-2) var(--spacing-6)", background: "var(--surface-elevated)", color: "var(--accent-rose)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "bold" }}>
                Reject
            </button>
            <button data-ds-id="ds:approve_btn" onClick={() => navigate("/")} style={{ padding: "var(--spacing-2) var(--spacing-6)", background: "var(--accent-teal)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "bold" }}>
                Approve (Gate A)
            </button>
        </div>
    </div>
  );

  const renderSearchResults = () => (
    <div data-ds-id="ds:search_results_layout" style={{ display: "flex", gap: "var(--spacing-4)", height: "calc(100vh - 150px)", position: "relative" }}>
        <DsIdBadge id="ds:search_results_layout" />
        
        <div data-ds-id="ds:search_filter_sidebar" style={{ width: "250px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative" }}>
            <DsIdBadge id="ds:search_filter_sidebar" />
            <h3 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)", fontSize: "1rem" }}>Filters</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
                <label style={{ color: "var(--text)", display: "flex", gap: "var(--spacing-2)" }}><input type="checkbox" defaultChecked /> Tasks</label>
                <label style={{ color: "var(--text)", display: "flex", gap: "var(--spacing-2)" }}><input type="checkbox" defaultChecked /> Documents</label>
                <label style={{ color: "var(--text)", display: "flex", gap: "var(--spacing-2)" }}><input type="checkbox" defaultChecked /> Commits</label>
            </div>
        </div>

        <div data-ds-id="ds:search_results_list" style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--spacing-4)", position: "relative", overflowY: "auto" }}>
            <DsIdBadge id="ds:search_results_list" />
            <h1 style={{ color: "var(--text)", marginBottom: "var(--spacing-4)", fontSize: "1.5rem" }}>Results for "dashboard"</h1>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
                <div onClick={() => navigate("/tasks/1")} style={{ padding: "var(--spacing-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                    <div style={{ color: "var(--accent-teal)", fontWeight: 600, marginBottom: "var(--spacing-1)" }}>Task: Implement Dashboard Grid (br-plan-01)</div>
                    <div style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Setup the layout.grid component according to...</div>
                </div>
                
                <div onClick={() => navigate("/docs")} style={{ padding: "var(--spacing-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                    <div style={{ color: "var(--accent-amber)", fontWeight: 600, marginBottom: "var(--spacing-1)" }}>Doc: PRD-04-WebUI-and-PM-Workspace</div>
                    <div style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>...This feature introduces the Web UI and PM Workspace...</div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderContent = () => {
    // If state is not default, render the state UI instead
    if (screenState !== "default" && screenState !== "partial") {
        return renderScreenState();
    }

    if (activeRoute === "/") return renderRtmDashboard();
    if (activeRoute === "/board") return renderSafeBoard();
    if (activeRoute === "/tasks") return renderTaskList();
    if (activeRoute.startsWith("/tasks/")) return renderTaskDetail();
    if (activeRoute.startsWith("/trace/")) return renderTraceExplorer();
    if (activeRoute === "/docs") return renderDocViewer();
    if (activeRoute === "/approval") return renderApprovalGates();
    if (activeRoute === "/search") return renderSearchResults();

    return <div style={{ padding: "var(--spacing-8)", color: "var(--accent-amber)", textAlign: "center" }}>Page not found. Select a valid route.</div>;
  };

  if (globalState === "loading") {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
            {renderStateSwitcher()}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)" }}>
                Loading Application...
            </div>
        </div>
    );
  }

  return (
    <div data-state={globalState} data-ds-id="ds:global_shell" style={{ fontFamily: "var(--font-family-base)", background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <DsIdBadge id="ds:global_shell" />
      <style>{`
        button:focus-visible, input:focus-visible, a:focus-visible, select:focus-visible {
          outline: 2px solid var(--accent-cyan);
          outline-offset: 2px;
        }
      `}</style>
      
      {renderStateSwitcher()}
      {renderTopNav()}
      
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {renderSidebar()}
        <main role="main" style={{ flex: 1, padding: "var(--spacing-4)", overflowY: "auto" }}>
            {renderContent()}
        </main>
      </div>

      <Modal open={showModal} onClose={closeModal} title={modalTitle}>
        <div style={{ padding: "var(--spacing-4)" }}>
            {modalContent}
            <div style={{ marginTop: "var(--spacing-4)", display: "flex", justifyContent: "flex-end" }}>
            <button 
                onClick={closeModal} 
                aria-label="Close modal"
                style={{ padding: "var(--spacing-2) var(--spacing-4)", background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--text)" }}
            >
                Close
            </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}