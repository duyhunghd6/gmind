import React from "react";

export function RTMDashboard({ navigateTo }: { navigateTo: (id: string) => void }) {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Traceability Matrix Dashboard</h1>
      
      <div data-ds-id="ds:kpi_metrics" className="widget-kpi_row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-md)" }}>
        {[
          { label: "Total PRDs Active", value: "14", trend: "+2 this week" },
          { label: "Test Coverage", value: "87.4%", trend: "+1.2% this week" },
          { label: "Traceability Score", value: "92/100", trend: "Stable" },
          { label: "Pending Approvals", value: "3", trend: "-1 since yesterday", color: "var(--accent-rose)" }
        ].map((kpi, i) => (
          <div key={i} className="ds-comp-card" style={{ padding: "var(--space-md)", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--text-dim)", marginBottom: "8px" }}>{kpi.label}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: kpi.color || "var(--text)" }}>{kpi.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px" }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
        <article data-ds-id="ds:heatmap_panel" className="panel-coverage ds-comp-card" style={{ padding: "var(--space-md)", minHeight: "300px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Requirement Coverage Heatmap</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "4px" }}>
            {Array.from({length: 50}).map((_, i) => (
              <div key={i} title={`Requirement br-prd0${Math.floor(i/10)+1}-s${(i%10)+1}`} style={{ height: "24px", backgroundColor: i % 7 === 0 ? "var(--accent-rose)" : i % 5 === 0 ? "var(--accent-amber)" : "var(--accent-teal)", borderRadius: "2px" }}></div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", fontSize: "0.875rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "var(--accent-teal)" }}></span> Full Coverage</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "var(--accent-amber)" }}></span> Partial</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "12px", backgroundColor: "var(--accent-rose)" }}></span> Missing Tests</span>
          </div>
        </article>
        <article data-ds-id="ds:task_progress_panel" className="panel-progress ds-comp-card" style={{ padding: "var(--space-md)", minHeight: "300px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
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
                  <div style={{ height: "100%", width: `${epic.progress}%`, backgroundColor: epic.progress === 100 ? "var(--accent-teal)" : "var(--accent-cyan)" }}></div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-md)" }}>
        <article data-ds-id="ds:mini_graph_panel" className="panel-graph ds-comp-card" onClick={() => navigateTo("trace_explorer")} style={{ padding: "var(--space-md)", minHeight: "400px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent-cyan)"} onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Trace Explorer Snapshot (Click to Expand)</h3>
          <div style={{ height: "300px", border: "1px dashed var(--border)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", backgroundColor: "var(--accent-cyan)", borderRadius: "50%", zIndex: 2 }}></div>
            <div style={{ position: "absolute", top: "30%", left: "30%", width: "24px", height: "24px", backgroundColor: "var(--accent-teal)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", top: "70%", left: "70%", width: "24px", height: "24px", backgroundColor: "var(--accent-amber)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", top: "20%", left: "60%", width: "30px", height: "30px", backgroundColor: "var(--accent-cyan)", borderRadius: "4px" }}></div>
            <svg aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
              <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="var(--border)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="var(--border)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="60%" y2="20%" stroke="var(--border)" strokeWidth="2" />
            </svg>
            <div style={{ position: "absolute", bottom: "16px", right: "16px", fontSize: "0.875rem", backgroundColor: "var(--surface-elevated)", color: "var(--text)", padding: "4px 8px", borderRadius: "4px" }}>Interactive Graph View</div>
          </div>
        </article>
        <article data-ds-id="ds:gap_analysis_panel" className="panel-gaps ds-comp-card" style={{ padding: "var(--space-md)", minHeight: "400px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>Gap Analysis</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", backgroundColor: "var(--accent-rose-dim)", borderLeft: "4px solid var(--accent-rose)", borderRadius: "0 4px 4px 0" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "var(--accent-rose)" }}>Orphaned Requirement</div>
              <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>br-prd04-s7 lacks tests</div>
            </div>
            <div style={{ padding: "12px", backgroundColor: "var(--accent-amber-dim)", borderLeft: "4px solid var(--accent-amber)", borderRadius: "0 4px 4px 0" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "var(--accent-amber)" }}>Broken Trace</div>
              <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>bd-task-891 references missing plan</div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export function SafeBoard({ navigateTo }: { navigateTo: (id: string) => void }) {
  return (
    <>
      <div style={{ display: "flex", gap: "var(--space-md)", height: "100%", overflowX: "auto", paddingBottom: "var(--space-md)" }}>
        {[
          { name: "Backlog", tasks: [{ id: "TSK-401", title: "Implement API Gateway", points: 5 }, { id: "TSK-402", title: "Setup FrankenSQLite Models", points: 3 }] },
          { name: "In Progress", tasks: [{ id: "TSK-399", title: "Web UI Dashboard Layout", points: 8, escalation: true }] },
          { name: "Review", tasks: [{ id: "TSK-385", title: "Update Design System Tokens", points: 2 }] },
          { name: "Done", tasks: [{ id: "TSK-370", title: "Scaffold Monorepo", points: 5 }] }
        ].map((col: any) => (
          <div key={col.name} data-ds-id="ds:kanban_column" className="ds-comp-kanban-column" style={{ minWidth: "320px", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
            <header style={{ padding: "var(--space-md)", borderBottom: "1px solid var(--border)", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{col.name}</span>
              <span style={{ fontSize: "0.75rem", padding: "2px 8px", backgroundColor: "var(--bg)", borderRadius: "12px" }}>{col.tasks.length}</span>
            </header>
            <div style={{ padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-sm)", flex: 1, overflowY: "auto" }}>
              {col.tasks.map((task: any) => (
                <article key={task.id} data-ds-id="ds:task_card" className="ds-comp-card" onClick={() => navigateTo("task_detail")} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("task_detail"); }} tabIndex={0} style={{ padding: "var(--space-md)", backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{task.id}</span>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "2px 6px", borderRadius: "4px" }}>{task.points} pts</span>
                  </div>
                  <div style={{ fontWeight: "500", marginBottom: "12px", lineHeight: "1.4" }}>{task.title}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {task.escalation && <div data-ds-id="ds:rte_badge" className="ds-comp-badge badge-rose" style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--accent-rose-dim)", color: "var(--accent-rose)", borderRadius: "4px", border: "1px solid var(--accent-rose-dim)" }}>RTE Escalated</div>}
                    <div className="ds-comp-badge" style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--accent-cyan-dim)", color: "var(--accent-cyan)", borderRadius: "4px" }}>Frontend</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ApprovalGates({ approvalStatus, setApprovalStatus, state }: { approvalStatus: string, setApprovalStatus: (status: string) => void, state?: string }) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", height: "100%" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Gate B Approval: Feature PRD-04</h1>
        
        {state === "insufficient_evidence" ? (
          <div aria-live="assertive" style={{ padding: "var(--space-md)", backgroundColor: "var(--accent-rose-dim)", color: "var(--accent-rose)", borderRadius: "var(--radius)", border: "1px solid var(--accent-rose-dim)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>!</span>
            <div>
              <div style={{ fontWeight: "bold" }}>Insufficient Evidence for Approval</div>
              <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>Missing required test coverage or PRD trace links. Please review the gap analysis and submit missing evidence.</div>
            </div>
          </div>
        ) : (
          <div data-ds-id="ds:approval_action_bar" className="toolbar-approval_actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontWeight: "600" }}>Status:</span>
              <span style={{ padding: "4px 10px", backgroundColor: approvalStatus === "Approved" ? "var(--accent-teal-dim)" : approvalStatus === "Rejected" ? "var(--accent-rose-dim)" : "var(--accent-amber-dim)", color: approvalStatus === "Approved" ? "var(--accent-teal)" : approvalStatus === "Rejected" ? "var(--accent-rose)" : "var(--accent-amber)", borderRadius: "16px", fontSize: "0.875rem", border: `1px solid ${approvalStatus === "Approved" ? "var(--accent-teal-dim)" : approvalStatus === "Rejected" ? "var(--accent-rose-dim)" : "var(--accent-amber-dim)"}` }}>{approvalStatus}</span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button data-ds-id="ds:approve_btn" onClick={() => setApprovalStatus("Approved")} className="ds-comp-button btn-primary" style={{ padding: "8px 16px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "500" }}>Approve Gate B</button>
              <button data-ds-id="ds:reject_btn" onClick={() => setApprovalStatus("Rejected")} className="ds-comp-button btn-danger" style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid var(--accent-rose)", backgroundColor: "transparent", color: "var(--accent-rose)", cursor: "pointer", fontWeight: "500" }}>Reject Iteration</button>
            </div>
          </div>
        )}
        
        <div style={{ display: "flex", gap: "var(--space-md)", flex: 1, minHeight: "400px" }}>
          <article data-ds-id="ds:code_diff_panel" className="panel-diff ds-comp-card" style={{ flex: 2, padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem" }}>Visual Diff / Scorecard</h3>
            <div style={{ flex: 1, backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px", padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.875rem", overflowY: "auto" }}>
              <div style={{ color: "var(--accent-teal)", marginBottom: "8px" }}>✓ All 14 components matched contract ds_ids</div>
              <div style={{ color: "var(--accent-teal)", marginBottom: "8px" }}>✓ State machine handlers fully wired</div>
              <div style={{ color: "var(--accent-amber)", marginBottom: "8px" }}>! Warning: Contrast ratio on task_badge slightly low (4.2:1)</div>
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed var(--border)" }}>
                <div>Overall Gate B Score: <strong style={{ color: "var(--accent-teal)" }}>94/100</strong></div>
              </div>
            </div>
          </article>
          
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <article data-ds-id="ds:test_logs_panel" className="panel-test_logs ds-comp-terminal" style={{ flex: 1, padding: "var(--space-md)", backgroundColor: "var(--surface-elevated)", color: "var(--text)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflowY: "auto" }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "var(--text)" }}>E2E Test Logs</h3>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: "1.6" }}>
                <div>&gt; running cypress E2E...</div>
                <div style={{ color: "var(--accent-teal)" }}>[PASS] navigation flow</div>
                <div style={{ color: "var(--accent-teal)" }}>[PASS] state diagram transition (offline -&gt; default)</div>
                <div style={{ color: "var(--accent-teal)" }}>[PASS] graph render integration</div>
                <div>&gt; 24 tests passed in 12.4s</div>
              </div>
            </article>
            <article data-ds-id="ds:prd_context_panel" className="panel-prd_context ds-comp-card" style={{ flex: 1, padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflowY: "auto" }}>
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
    </>
  );
}

export function SearchResults({ navigateTo, searchQuery }: { navigateTo: (id: string) => void, searchQuery: string }) {
  return (
    <>
      <div style={{ display: "flex", gap: "var(--space-md)", height: "100%", minHeight: "500px" }}>
        <aside aria-label="Search Filters" data-ds-id="ds:search_filter_sidebar" className="sidebar-search_filters ds-comp-card" style={{ width: "250px", padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>Filter Results</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" defaultChecked /> All Types</label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> Tasks</label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> PRDs / Docs</label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}><input type="checkbox" /> Commits</label>
          </div>
        </aside>
        <div data-ds-id="ds:search_results_list" className="list-search_items ds-comp-card" style={{ flex: 1, padding: "var(--space-md)", backgroundColor: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "1.25rem" }}>Results for &quot;{searchQuery}&quot;</h2>
          
          <div onClick={() => navigateTo("task_detail")} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("task_detail"); }} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer", backgroundColor: "var(--bg)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--accent-cyan-dim)", color: "var(--accent-cyan)", borderRadius: "4px" }}>Task</span>
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>TSK-399</span>
            </div>
            <div style={{ fontWeight: "500", marginBottom: "4px" }}>Web UI Dashboard Layout</div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>Implement the RTM dashboard layout according to the ui-contract.md definition...</div>
          </div>

          <div onClick={() => navigateTo("doc_viewer")} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') navigateTo("doc_viewer"); }} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer", backgroundColor: "var(--bg)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", padding: "2px 6px", backgroundColor: "var(--accent-teal-dim)", color: "var(--accent-teal)", borderRadius: "4px" }}>Document</span>
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>br-prd04</span>
            </div>
            <div style={{ fontWeight: "500", marginBottom: "4px" }}>PRD-04: Web UI and PM Workspace</div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-dim)" }}>This document outlines the requirements for the unified Web UI and Project Management workspace...</div>
          </div>
        </div>
      </div>
    </>
  );
}
