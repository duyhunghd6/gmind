"use client";

import React, { useState } from "react";
import {
  RTMDashboard,
  SafeBoard,
  ApprovalGates,
  SearchResults,
} from "./components/DashboardScreens";
import {
  TaskList,
  TaskDetail,
  TraceExplorer,
  DocViewer,
} from "./components/TaskScreens";

export default function PRD04WebUI() {
  const [activeScreen, setActiveScreen] = useState("rtm_dashboard");
  const [shellState, setShellState] = useState("default");
  
  // Tab and approval states needed by components
  const [taskActiveTab, setTaskActiveTab] = useState("detail");
  const [approvalStatus, setApprovalStatus] = useState("Pending Review");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  // Handlers bridging YAML actions to State
  const navigateHome = () => {
    setActiveScreen("rtm_dashboard");
  };
  
  const triggerSearch = () => {
    setSearchQuery(searchInputValue);
    setActiveScreen("search_results");
  };
  
  const navigateBoard = () => {
    setActiveScreen("safe_board");
  };
  
  const navigateTasks = () => {
    setActiveScreen("task_list");
  };
  
  const navigateDocs = () => {
    setActiveScreen("doc_viewer");
  };
  
  const navigateApproval = () => {
    setActiveScreen("approval_gates");
  };

  const toggleOffline = () => {
    setShellState((s) => (s === "default" ? "offline" : "default"));
  };

  return (
    <div
      data-ds-id="ds:global_shell"
      data-state={shellState}
      data-screen-id="global_shell"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        fontFamily: "var(--font-sans, sans-serif)",
        backgroundColor: "var(--bg, #0f172a)",
        color: "var(--text, #f8fafc)",
      }}
    >
      {/* Global Shell Sidebar */}
      <aside
        data-ds-id="ds:shell_sidebar"
        style={{
          width: "260px",
          borderRight: "1px solid var(--border, #334155)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--surface, #1e293b)",
        }}
      >
        {/* Header */}
        <div
          data-ds-id="ds:shell_header"
          style={{
            padding: "var(--space-md, 16px)",
            borderBottom: "1px solid var(--border, #334155)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            data-ds-id="ds:logo_btn"
            onClick={navigateHome}
            style={{
              fontFamily: "inherit",
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "var(--accent-cyan, #22d3ee)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            gmind
          </button>
          {shellState === "offline" && (
            <span
              data-ds-id="ds:offline_status_indicator"
              title="Offline"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-rose, #f43f5e)",
                boxShadow: "0 0 8px var(--accent-rose, #f43f5e)",
              }}
            ></span>
          )}
        </div>

        {/* Search */}
        <div style={{ padding: "var(--space-md, 16px)" }}>
          <input
            type="text"
            placeholder="Search..."
            data-ds-id="ds:global_search"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
            style={{
              width: "100%",
              borderRadius: "var(--radius, 4px)",
              padding: "8px 12px",
              fontSize: "0.875rem",
              backgroundColor: "var(--bg, #0f172a)",
              borderColor: "var(--border, #334155)",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "inherit",
              outline: "none",
            }}
          />
        </div>

        {/* Navigation Menu */}
        <nav
          data-ds-id="ds:nav_menu"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-md, 16px)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <NavButton
            label="RTM Dashboard"
            active={activeScreen === "rtm_dashboard"}
            onClick={navigateHome}
          />
          <NavButton
            label="SAFe Board"
            active={activeScreen === "safe_board"}
            onClick={navigateBoard}
          />
          <NavButton
            label="Task List"
            active={activeScreen === "task_list"}
            onClick={navigateTasks}
          />
          <NavButton
            label="Doc Viewer"
            active={activeScreen === "doc_viewer"}
            onClick={navigateDocs}
          />
          <NavButton
            label="Approval Gates"
            active={activeScreen === "approval_gates"}
            onClick={navigateApproval}
          />
        </nav>

        {/* Footer Toggle */}
        <div
          style={{
            padding: "var(--space-md, 16px)",
            borderTop: "1px solid var(--border, #334155)",
          }}
        >
          <button
            onClick={toggleOffline}
            style={{
              fontSize: "0.875rem",
              opacity: 0.7,
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "inherit",
              textAlign: "left",
              padding: 0,
              width: "100%",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            Toggle Offline Test
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg, 24px)",
          padding: "var(--space-lg, 24px)",
          overflowY: "auto",
          position: "relative",
          backgroundColor: "var(--bg, #0f172a)",
        }}
      >
        {activeScreen === "rtm_dashboard" && (
          <RTMDashboard navigateTo={setActiveScreen} />
        )}
        {activeScreen === "safe_board" && (
          <SafeBoard navigateTo={setActiveScreen} />
        )}
        {activeScreen === "task_list" && (
          <TaskList navigateTo={setActiveScreen} />
        )}
        {activeScreen === "task_detail" && (
          <TaskDetail
            navigateTo={setActiveScreen}
            activeTab={taskActiveTab}
            setActiveTab={setTaskActiveTab}
            state={shellState === "offline" ? "saving" : undefined}
          />
        )}
        {activeScreen === "trace_explorer" && (
          <TraceExplorer
            navigateTo={setActiveScreen}
            state={shellState === "offline" ? "partial" : undefined}
          />
        )}
        {activeScreen === "doc_viewer" && (
          <DocViewer navigateTo={setActiveScreen} />
        )}
        {activeScreen === "approval_gates" && (
          <ApprovalGates
            approvalStatus={approvalStatus}
            setApprovalStatus={setApprovalStatus}
            state={shellState === "offline" ? "insufficient_evidence" : undefined}
          />
        )}
        {activeScreen === "search_results" && (
          <SearchResults
            navigateTo={setActiveScreen}
            searchQuery={searchQuery}
          />
        )}
      </main>
    </div>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "8px 12px",
        borderRadius: "var(--radius, 4px)",
        transition: "background-color 0.2s, color 0.2s",
        backgroundColor: active
          ? "var(--accent-cyan-dim, rgba(14, 165, 233, 0.1))"
          : "transparent",
        color: active
          ? "var(--accent-cyan, #22d3ee)"
          : "var(--text-dim, #94a3b8)",
        border: "none",
        cursor: "pointer",
        fontWeight: active ? "600" : "normal",
        fontFamily: "inherit",
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor =
            "var(--surface-elevated, rgba(255, 255, 255, 0.05))";
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {label}
    </button>
  );
}
