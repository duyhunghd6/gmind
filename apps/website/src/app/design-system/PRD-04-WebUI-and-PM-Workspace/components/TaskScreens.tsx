import React from "react";

export function TaskList({ navigateTo }: { navigateTo: (id: string) => void }) {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Task Backlog</h1>
      
      <header data-ds-id="ds:task_filters" className="toolbar-filters" style={{ padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", gap: "16px" }}>
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
        <button style={{ marginLeft: "auto", padding: "8px 16px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Filter</button>
      </header>

      <div data-ds-id="ds:task_bulk_actions" style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => console.log('EVENT_BULK_ACTION')} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", cursor: "pointer" }}>Mark as Done</button>
        <button onClick={() => console.log('EVENT_BULK_ACTION')} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", cursor: "pointer", color: "var(--accent-rose)" }}>Delete Selected</button>
      </div>

      <div data-ds-id="ds:task_table" className="table-data ds-comp-data-table" style={{ flex: 1, border: "1px solid var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--surface)", overflow: "hidden" }}>
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
                <td style={{ padding: "12px 16px" }}><span onClick={(e) => { e.stopPropagation(); navigateTo("doc_viewer"); }} style={{ color: "var(--accent-cyan)", textDecoration: "underline", cursor: "pointer" }}>{row.prd}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer data-ds-id="ds:task_pagination" className="toolbar-pagination" style={{ padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Showing 1-3 of 24 tasks</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button aria-label="Previous Page" style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Prev</button>
          <button aria-label="Next Page" style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Next</button>
        </div>
      </footer>
    </>
  );
}

export function TaskDetail({ navigateTo, activeTab, setActiveTab, state }: { navigateTo: (id: string) => void, activeTab: string, setActiveTab: (tab: string) => void, state?: string }) {
  return (
    <>
      <header data-ds-id="ds:task_detail_header" className="header-task" style={{ padding: "var(--space-lg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--surface)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", marginBottom: "8px" }}>TSK-399</div>
          <h1 style={{ margin: "0 0 16px 0", fontSize: "1.75rem" }}>Web UI Dashboard Layout</h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ padding: "4px 10px", backgroundColor: "var(--accent-amber-dim)", color: "var(--accent-amber)", border: "1px solid var(--accent-amber-dim)", borderRadius: "4px", fontSize: "0.875rem" }}>In Progress</span>
            <span style={{ padding: "4px 10px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "0.875rem" }}>Assignee: Bob S.</span>
          </div>
        </div>
        <button disabled={state === "saving"} style={{ padding: "8px 16px", borderRadius: "4px", border: "none", cursor: state === "saving" ? "not-allowed" : "pointer", backgroundColor: state === "saving" ? "var(--bg)" : "var(--surface-elevated)" }}>
          {state === "saving" ? "Saving..." : "Edit Task"}
        </button>
      </header>

      <nav role="tablist" data-ds-id="ds:task_detail_tabs" className="ds-comp-tab-panel" style={{ display: "flex", gap: "var(--space-lg)", paddingBottom: "var(--space-sm)", borderBottom: "1px solid var(--border)" }}>
        <button role="tab" aria-selected={activeTab === "detail"} data-ds-id="ds:tab_detail" onClick={() => setActiveTab("detail")} className="tab-detail" style={{ background: "none", border: "none", color: activeTab === "detail" ? "var(--text)" : "var(--text-dim)", padding: "var(--space-sm) 0", cursor: "pointer", borderBottom: activeTab === "detail" ? "2px solid var(--text)" : "2px solid transparent", fontWeight: activeTab === "detail" ? "600" : "normal" }}>Detail</button>
        <button role="tab" aria-selected={activeTab === "activity"} data-ds-id="ds:tab_activity" onClick={() => setActiveTab("activity")} className="tab-activity" style={{ background: "none", border: "none", color: activeTab === "activity" ? "var(--text)" : "var(--text-dim)", padding: "var(--space-sm) 0", cursor: "pointer", borderBottom: activeTab === "activity" ? "2px solid var(--text)" : "2px solid transparent" }}>Activity</button>
        <button role="tab" aria-selected={activeTab === "code"} data-ds-id="ds:tab_code" onClick={() => setActiveTab("code")} className="tab-code" style={{ background: "none", border: "none", color: activeTab === "code" ? "var(--text)" : "var(--text-dim)", padding: "var(--space-sm) 0", cursor: "pointer", borderBottom: activeTab === "code" ? "2px solid var(--text)" : "2px solid transparent" }}>Code</button>
        <button role="tab" aria-selected={false} data-ds-id="ds:tab_graph" onClick={() => navigateTo("trace_explorer")} className="tab-graph" style={{ background: "none", border: "none", color: "var(--text-dim)", padding: "var(--space-sm) 0", cursor: "pointer", borderBottom: "2px solid transparent" }}>Graph</button>
      </nav>

      <div role="tabpanel" style={{ flex: 1, backgroundColor: "var(--surface)", padding: "var(--space-lg)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflowY: "auto" }}>
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
                  <span onClick={() => navigateTo("doc_viewer")} style={{ color: "var(--accent-cyan)", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-mono)" }}>br-prd04-s1</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px" }}>Tested By</span>
                  <span onClick={() => navigateTo("doc_viewer")} style={{ color: "var(--accent-cyan)", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-mono)" }}>br-test-rtm-01</span>
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
        {activeTab === "code" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Code References</h3>
              <p style={{ color: "var(--text-dim)", lineHeight: "1.6", margin: 0 }}>No code references linked to this task yet.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function TraceExplorer({ navigateTo, state }: { navigateTo: (id: string) => void, state?: string }) {
  return (
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
         <header data-ds-id="ds:graph_controls" className="toolbar-graph_controls" style={{ padding: "var(--space-md)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
           <div style={{ fontWeight: "bold" }}>Knowledge Graph Explorer</div>
           <div style={{ display: "flex", gap: "8px" }}>
             <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Zoom In</button>
             <button style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", cursor: "pointer" }}>Zoom Out</button>
           </div>
         </header>
         {state === "partial" && (
           <div aria-live="polite" style={{ padding: "8px 16px", backgroundColor: "var(--accent-amber-dim)", color: "var(--accent-amber)", fontSize: "0.875rem", borderBottom: "1px solid var(--accent-amber-dim)", display: "flex", alignItems: "center", gap: "8px" }}>
             <span style={{ display: "inline-block", width: "16px", height: "16px", borderRadius: "50%", border: "2px solid currentColor", textAlign: "center", lineHeight: "12px", fontSize: "10px", fontWeight: "bold" }}>!</span>
             Partial Graph Data: Some downstream nodes could not be fully resolved.
           </div>
         )}
         <div data-ds-id="ds:d3_canvas" className="canvas-force_directed" style={{ flex: 1, minHeight: "500px", position: "relative", backgroundColor: "var(--surface-elevated)" }}>
            <svg aria-label="Knowledge Graph Visualization" style={{ width: "100%", height: "100%" }}>
              <line x1="50%" y1="40%" x2="35%" y2="60%" stroke="var(--text-dim)" strokeWidth="2" />
              <line x1="50%" y1="40%" x2="65%" y2="60%" stroke="var(--text-dim)" strokeWidth="2" />
              <line x1="65%" y1="60%" x2="80%" y2="40%" stroke="var(--text-dim)" strokeWidth="2" strokeDasharray="4" />
              
              <circle cx="50%" cy="40%" r="24" fill="var(--accent-cyan)" style={{ cursor: "pointer" }} onClick={() => navigateTo("doc_viewer")} />
              <text x="50%" y="30%" fill="var(--text-dim)" fontSize="12" textAnchor="middle">br-prd04</text>
              
              <circle cx="35%" cy="60%" r="16" fill="var(--accent-teal)" style={{ cursor: "pointer" }} onClick={() => navigateTo("task_detail")} />
              <text x="35%" y="70%" fill="var(--text-dim)" fontSize="12" textAnchor="middle">TSK-399</text>
              
              <rect x="62%" y="57%" width="6%" height="6%" rx="4" fill="var(--accent-amber)" style={{ cursor: "pointer" }} onClick={() => navigateTo("task_detail")} />
              <text x="65%" y="70%" fill="var(--text-dim)" fontSize="12" textAnchor="middle">br-plan-04</text>
            </svg>
         </div>
      </div>
      <aside aria-label="Node Details" data-ds-id="ds:node_detail_drawer" className="panel-node_details ds-comp-card" style={{ width: "350px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "var(--space-md)" }}>
        <h3 style={{ margin: "0 0 16px 0", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>Node Details</h3>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Type</div>
          <div style={{ fontWeight: "500" }}>Requirement (PRD)</div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Beads ID</div>
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>br-prd04</div>
        </div>
        <button onClick={() => navigateTo("doc_viewer")} style={{ width: "100%", padding: "8px", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--text)" }}>Open Document</button>
      </aside>
    </>
  );
}

export function DocViewer({ navigateTo }: { navigateTo: (id: string) => void }) {
  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "600px", gap: "var(--space-md)" }}>
        <aside aria-label="Document Tree" data-ds-id="ds:doc_tree_sidebar" className="ds-comp-path-tree" style={{ width: "300px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "var(--space-md)", overflowY: "auto" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>Knowledge Base</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
            <li style={{ fontWeight: "600" }}>📁 PRDs</li>
            <li style={{ paddingLeft: "16px", color: "var(--text-dim)", cursor: "pointer" }} onClick={() => navigateTo("doc_viewer")}>📄 PRD-01-Prompts</li>
            <li style={{ paddingLeft: "16px", color: "var(--accent-cyan)", fontWeight: "500", cursor: "pointer" }}>📄 PRD-04-WebUI</li>
            <li style={{ fontWeight: "600", marginTop: "8px" }}>📁 Plans</li>
            <li style={{ paddingLeft: "16px", color: "var(--text-dim)", cursor: "pointer" }}>📄 plan-01-storage</li>
          </ul>
        </aside>
        <article data-ds-id="ds:markdown_viewer" className="view-markdown ds-comp-code-block" style={{ flex: 1, backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "var(--space-xl)", overflowY: "auto" }}>
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
    </>
  );
}

