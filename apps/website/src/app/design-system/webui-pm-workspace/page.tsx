"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import DsIdBadge from "@/components/DsIdBadge";

export default function WebUIPMWorkspacePage() {
  const [activeRoute, setActiveRoute] = useState("/");
  const [globalState, setGlobalState] = useState("default");

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && (hash === "/" || hash.startsWith("/tasks/"))) {
        setActiveRoute(hash);
      } else if (hash === "/trace-explorer") {
        setActiveRoute(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
        window.location.hash = "#/";
    } else {
        handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
        <span id="global-state-label" style={{ fontWeight: 600, color: "var(--text)" }}>Global State:</span>
        <div role="group" aria-labelledby="global-state-label" style={{ display: "flex", gap: "var(--spacing-2)" }}>
          {["default", "loading", "error", "offline", "empty"].map((state) => (
            <button
              key={state}
              data-ds-id="btn"
              onClick={() => setGlobalState(state)}
              aria-pressed={globalState === state}
              style={{
                padding: "var(--spacing-1) var(--spacing-3)",
                background: globalState === state ? "var(--accent-cyan)" : "var(--surface)",
                color: globalState === state ? "var(--bg)" : "var(--text-dim)",
                border: "1px solid var(--border-highlight)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                outlineOffset: "2px"
              }}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "var(--spacing-3)", alignItems: "center" }}>
        <span id="active-route-label" style={{ fontWeight: 600, color: "var(--text)" }}>Active Route:</span>
        <nav role="navigation" aria-labelledby="active-route-label" style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
          {[
            { label: "Dashboard (/)", path: "/" }, 
            { label: "Task Detail (/tasks/:id)", path: "/tasks/124" },
            { label: "Trace Explorer (/trace-explorer)", path: "/trace-explorer" }
          ].map((route) => (
            <button
              key={route.path}
              data-ds-id="sidebar-link"
              onClick={() => { window.location.hash = `#${route.path}`; setActiveRoute(route.path); }}
              aria-pressed={activeRoute === route.path || (activeRoute.startsWith("/tasks/") && route.path.startsWith("/tasks/"))}
              style={{
                padding: "var(--spacing-1) var(--spacing-3)",
                background: activeRoute === route.path || (activeRoute.startsWith("/tasks/") && route.path.startsWith("/tasks/")) ? "var(--accent-teal)" : "var(--surface)",
                color: activeRoute === route.path || (activeRoute.startsWith("/tasks/") && route.path.startsWith("/tasks/")) ? "var(--bg)" : "var(--text-dim)",
                border: "1px solid var(--border-highlight)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                outlineOffset: "2px"
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
      data-ds-id="top-navigation" 
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-3)", background: "var(--surface)", borderBottom: "1px solid var(--border)", position: "relative" }}
    >
      <DsIdBadge id="top-navigation" />
      <h1 data-ds-id="dashboard" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text)", margin: 0 }}>Gmind WebUI Workspace</h1>
      
      <div data-ds-id="global-search-bar" role="search" style={{ display: "flex", gap: "var(--spacing-2)", position: "relative" }}>
        <DsIdBadge id="global-search-bar" />
        <input 
          data-ds-id="search"
          type="search" 
          aria-label="Global search"
          placeholder="Search..." 
          style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", outlineOffset: "2px" }}
          disabled={globalState === "loading" || globalState === "offline"}
        />
        <button 
          data-ds-id="btn"
          aria-label="Submit search"
          disabled={globalState === "loading" || globalState === "offline"} 
          style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface-elevated)", color: "var(--text)", cursor: "pointer", outlineOffset: "2px" }}
        >
          Search
        </button>
      </div>

      <div data-ds-id="rte-escalation-badge" role="status" style={{ position: "relative" }}>
        <DsIdBadge id="rte-escalation-badge" />
        <Badge variant={globalState === "error" ? "error" : "warning"}>
          {globalState === "error" ? "RTE Escalation: Critical" : "RTE Escalation: Active"}
        </Badge>
      </div>
    </header>
  );

  const renderContent = () => {
    if (globalState === "loading") {
      return (
        <div role="alert" aria-busy="true" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "var(--spacing-8)", color: "var(--text-dim)" }}>
          Loading workspace...
        </div>
      );
    }
    if (globalState === "error") {
      return (
        <div role="alert" style={{ padding: "var(--spacing-8)", color: "var(--accent-rose)", textAlign: "center" }}>
          <h2>Error Loading Workspace</h2>
          <p>There was a critical error fetching the necessary data. Please try again.</p>
        </div>
      );
    }
    if (globalState === "offline") {
      return (
        <div role="alert" style={{ padding: "var(--spacing-8)", color: "var(--accent-amber)", textAlign: "center" }}>
          <h2>You are Offline</h2>
          <p>Showing cached data. Some features may not be available.</p>
        </div>
      );
    }
    if (globalState === "empty") {
      return (
        <div role="status" style={{ padding: "var(--spacing-8)", color: "var(--text-dim)", textAlign: "center" }}>
          <h2>No Data Available</h2>
          <p>There is nothing to display for this surface.</p>
        </div>
      );
    }

    if (activeRoute === "/") {
      return (
        <div data-ds-id="board" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "var(--spacing-4)", padding: "var(--spacing-4)" }}>
          <div data-ds-id="kpi-cards-row" role="region" aria-label="KPI Metrics" style={{ position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
            <DsIdBadge id="kpi-cards-row" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 data-ds-id="link" style={{ color: "var(--text)" }}>KPI Metrics</h3>
                <select data-ds-id="view-selector" aria-label="Select View" style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", padding: "var(--spacing-1)", borderRadius: "var(--radius-sm)" }}>
                    <option>ART View</option>
                    <option>Team View</option>
                </select>
            </div>
            <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
              <div style={{ flex: 1, padding: "var(--spacing-3)", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                <h4 style={{ color: "var(--text)" }}>Active Sprints</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>3</p>
              </div>
              <div style={{ flex: 1, padding: "var(--spacing-3)", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                <h4 style={{ color: "var(--text)" }}>Escalations</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-rose)" }}>2</p>
              </div>
            </div>
          </div>

          <div data-ds-id="coverage-heatmap" role="region" aria-label="Coverage Heatmap" style={{ position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
            <DsIdBadge id="coverage-heatmap" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: "var(--text)" }}>Coverage Heatmap</h3>
                <button data-ds-id="tab" style={{ background: "var(--accent-cyan-dim)", border: "none", color: "var(--text-dim)", cursor: "pointer", padding: "var(--spacing-1)", borderRadius: "var(--radius-sm)" }}>Options</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "var(--spacing-1)", marginTop: "var(--spacing-3)" }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} data-ds-id="heatmap-row" aria-hidden="true" style={{ aspectRatio: "1", background: Math.random() > 0.5 ? "var(--accent-teal)" : "var(--accent-teal-dim)", borderRadius: "var(--radius-sm)" }} />
              ))}
            </div>
            <div data-ds-id="prd-section" style={{ marginTop: "var(--spacing-3)" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Selected PRD Details</p>
            </div>
          </div>

          <div data-ds-id="task-progress-panel" role="region" aria-label="Task Progress" style={{ position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
            <DsIdBadge id="task-progress-panel" />
            <h3 style={{ color: "var(--text)" }}>Task Progress Panel</h3>
            <div data-ds-id="task-list" style={{ marginTop: "var(--spacing-3)", display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
              {['Backend API', 'UI Components', 'Database Schema'].map(taskItem => (
                <div key={taskItem} data-ds-id="task-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-2)", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
                    <input type="checkbox" data-ds-id="checkbox" aria-label={`Select ${taskItem}`} />
                    <span data-ds-id="task" style={{ color: "var(--text)" }}>{taskItem}</span>
                  </div>
                  <Badge variant="info">In Progress</Badge>
                </div>
              ))}
            </div>
          </div>

          <div data-ds-id="gap-analysis-panel" role="region" aria-label="Gap Analysis" style={{ position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <DsIdBadge id="gap-analysis-panel" />
            <div data-ds-id="gap-panel">
              <h3 style={{ color: "var(--text)" }}>Gap Analysis Panel</h3>
              <p style={{ marginTop: "var(--spacing-2)", color: "var(--text-dim)" }}>Review missing requirements and coverage gaps.</p>
            </div>
            <button 
              data-ds-id="create-btn"
              onClick={() => openModal("Create Plan", (
                  <form data-ds-id="modal-form" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
                      <p style={{ color: "var(--text)" }}>Fill in the gap plan details here.</p>
                      <input data-ds-id="input" type="text" placeholder="Plan Title" aria-label="Plan Title" style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)" }} />
                  </form>
              ))} 
              aria-haspopup="dialog"
              style={{ alignSelf: "flex-start", marginTop: "var(--spacing-3)", padding: "var(--spacing-2) var(--spacing-3)", background: "var(--accent-cyan)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", outlineOffset: "2px" }}
            >
              Create Plan
            </button>
          </div>
        </div>
      );
    } else if (activeRoute.startsWith("/tasks/")) {
      return (
        <div style={{ padding: "var(--spacing-4)" }}>
          <div data-ds-id="detail-panel" role="region" aria-label="Task Detail Panel" style={{ position: "relative", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
            <DsIdBadge id="detail-panel" />
            <h2 style={{ color: "var(--text)" }}>Task-124: Update Authentication Flow</h2>
            <div style={{ display: "flex", gap: "var(--spacing-2)", marginTop: "var(--spacing-2)", marginBottom: "var(--spacing-4)" }}>
              <Badge variant="warning">High Priority</Badge>
              <Badge variant="info">In Review</Badge>
            </div>
            <div data-ds-id="panel" style={{ color: "var(--text)", background: "var(--bg)", padding: "var(--spacing-3)", borderRadius: "var(--radius-sm)" }}>
              <p>This task involves updating the OAuth 2.0 flow to support the new providers.</p>
              
              <div data-ds-id="thread" style={{ marginTop: "var(--spacing-4)", background: "var(--surface)", padding: "var(--spacing-3)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                  <h4 style={{ marginBottom: "var(--spacing-2)", color: "var(--text)" }}>Discussion Thread</h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Review escalated risk thread here.</p>
              </div>

              <div style={{ marginTop: "var(--spacing-4)", display: "flex", gap: "var(--spacing-2)", alignItems: "center" }}>
                <select data-ds-id="dropdown" aria-label="Task status" style={{ padding: "var(--spacing-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)" }}>
                    <option>In Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </select>
                <button data-ds-id="btn" onClick={() => setGlobalState("success")} aria-label="Approve task" style={{ padding: "var(--spacing-2) var(--spacing-3)", background: "var(--accent-teal)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", outlineOffset: "2px" }}>Approve</button>
                <button data-ds-id="btn" onClick={() => setGlobalState("error")} aria-label="Reject task" style={{ padding: "var(--spacing-2) var(--spacing-3)", background: "var(--accent-rose)", color: "var(--bg)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", outlineOffset: "2px" }}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeRoute === "/trace-explorer") {
      return (
        <div style={{ padding: "var(--spacing-4)", height: "60vh" }}>
          <div data-ds-id="document-graph-canvas" role="region" aria-label="Document Trace Graph" style={{ position: "relative", width: "100%", height: "100%", background: "var(--surface)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <DsIdBadge id="document-graph-canvas" />
            <h3 style={{ color: "var(--text)" }}>Document Graph Canvas</h3>
            <div style={{ display: "flex", gap: "var(--spacing-8)", marginTop: "var(--spacing-6)", position: "relative" }}>
              <button 
                data-ds-id="node"
                aria-haspopup="dialog"
                style={{ padding: "var(--spacing-3)", background: "var(--bg)", border: "1px solid var(--accent-cyan)", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--text)", outlineOffset: "2px" }} 
                onClick={() => openModal("Impact Analysis", <div data-ds-id="panel"><p style={{ color: "var(--text)" }}>PRD impacts 3 tasks and 1 test plan.</p></div>)}
              >
                PRD-04
              </button>
              <div aria-hidden="true" style={{ alignSelf: "center", width: "50px", height: "2px", background: "var(--border-highlight)" }} />
              <div data-ds-id="node" style={{ padding: "var(--spacing-3)", background: "var(--bg)", border: "1px solid var(--accent-amber)", borderRadius: "var(--radius-sm)", color: "var(--text)" }}>
                Task-124
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div role="alert">Select a route</div>;
  };

  return (
    <div data-state={globalState} style={{ fontFamily: "var(--font-family-base)", background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        button:focus-visible, input:focus-visible, a:focus-visible, select:focus-visible {
          outline: 2px solid var(--accent-cyan);
          outline-offset: 2px;
        }
      `}</style>
      {renderStateSwitcher()}
      {renderTopNav()}
      <main role="main" style={{ flex: 1 }}>
        {renderContent()}
      </main>
      <footer role="contentinfo" style={{ padding: "var(--spacing-4)", textAlign: "center", borderTop: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-dim)" }}>
        <p>&copy; {new Date().getFullYear()} Gmind WebUI Workspace. All rights reserved.</p>
      </footer>

      <Modal isOpen={showModal} onClose={closeModal} title={modalTitle}>
        <div data-ds-id="modal">
            {modalContent}
            <div style={{ marginTop: "var(--spacing-4)", display: "flex", justifyContent: "flex-end" }}>
            <button 
                data-ds-id="btn"
                onClick={closeModal} 
                aria-label="Close modal"
                style={{ padding: "var(--spacing-2) var(--spacing-4)", background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--text)", outlineOffset: "2px" }}
            >
                Close
            </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}
