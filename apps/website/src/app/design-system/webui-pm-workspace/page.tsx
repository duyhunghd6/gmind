"use client";

import React, { useState } from "react";

export default function WebUIPMWorkspace() {
  const [activeScreen, setActiveScreen] = useState("rtm_dashboard");
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div 
      data-screen-id="global_shell" 
      data-state={isOffline ? "offline" : "default"}
      data-ds-id="ds:global_shell"
      className="flex flex-col h-screen w-full bg-[var(--bg)] text-[var(--text)] font-sans overflow-hidden"
    >
      <header 
        data-ds-id="ds:shell_header" 
        className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] shrink-0"
      >
        <div data-ds-id="ds:logo_btn" className="font-bold text-lg cursor-pointer text-[var(--accent-cyan)]">
          Gmind WebUI
        </div>
        
        <div data-ds-id="ds:global_search" className="flex-1 max-w-md mx-4">
          <input 
            type="text" 
            placeholder="Search tasks, docs, beads..." 
            className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-custom)] focus:outline-none focus:border-[var(--accent-teal)]"
          />
        </div>

        {isOffline && (
          <div data-ds-id="ds:offline_status_indicator" className="text-[var(--accent-amber)] text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse"></span>
            OFFLINE
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside 
          data-ds-id="ds:shell_sidebar" 
          className="w-64 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col shrink-0"
        >
          <nav data-ds-id="ds:nav_menu" className="flex-1 py-4 flex flex-col gap-2 px-2 overflow-y-auto">
            <button onClick={() => setActiveScreen("rtm_dashboard")} className={`px-3 py-2 rounded text-left ${activeScreen === 'rtm_dashboard' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>RTM Dashboard</button>
            <button onClick={() => setActiveScreen("safe_board")} className={`px-3 py-2 rounded text-left ${activeScreen === 'safe_board' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>SAFe Board</button>
            <button onClick={() => setActiveScreen("task_list")} className={`px-3 py-2 rounded text-left ${activeScreen === 'task_list' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Task List</button>
            <button onClick={() => setActiveScreen("task_detail")} className={`px-3 py-2 rounded text-left ${activeScreen === 'task_detail' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Task Detail</button>
            <button onClick={() => setActiveScreen("trace_explorer")} className={`px-3 py-2 rounded text-left ${activeScreen === 'trace_explorer' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Trace Explorer</button>
            <button onClick={() => setActiveScreen("doc_viewer")} className={`px-3 py-2 rounded text-left ${activeScreen === 'doc_viewer' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Doc Viewer</button>
            <button onClick={() => setActiveScreen("approval_gates")} className={`px-3 py-2 rounded text-left ${activeScreen === 'approval_gates' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Approval Gates</button>
            <button onClick={() => setActiveScreen("search_results")} className={`px-3 py-2 rounded text-left ${activeScreen === 'search_results' ? 'bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)]' : 'hover:bg-[var(--bg)]'}`}>Search Results</button>
          </nav>
        </aside>

        <main className="flex-1 relative bg-[var(--bg)] overflow-y-auto">
          {activeScreen === "rtm_dashboard" && (
            <section data-screen-id="rtm_dashboard" data-state="default" data-ds-id="ds:dashboard_grid" className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article data-ds-id="ds:kpi_metrics" className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-mono text-sm text-[var(--text-dim)] mb-2">KPI Metrics</h3>
                <div className="h-16 bg-[var(--bg)] rounded flex items-center justify-center text-xs text-[var(--text-dim)]">[Widget: KPI Row]</div>
              </article>
              <article data-ds-id="ds:heatmap_panel" className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] shadow-sm lg:col-span-2">
                <h3 className="font-mono text-sm text-[var(--text-dim)] mb-2">Coverage Heatmap</h3>
                <div className="h-48 bg-[var(--bg)] rounded flex items-center justify-center text-xs text-[var(--text-dim)]">[Panel: Coverage Heatmap]</div>
              </article>
              <article data-ds-id="ds:task_progress_panel" className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-mono text-sm text-[var(--text-dim)] mb-2">Task Progress</h3>
                <div className="h-32 bg-[var(--bg)] rounded flex items-center justify-center text-xs text-[var(--text-dim)]">[Panel: Progress]</div>
              </article>
              <article data-ds-id="ds:mini_graph_panel" className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-mono text-sm text-[var(--text-dim)] mb-2">Mini Graph</h3>
                <div className="h-32 bg-[var(--bg)] rounded flex items-center justify-center text-xs text-[var(--text-dim)]">[Panel: Graph]</div>
              </article>
              <article data-ds-id="ds:gap_analysis_panel" className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] shadow-sm">
                <h3 className="font-mono text-sm text-[var(--text-dim)] mb-2">Gap Analysis</h3>
                <div className="h-32 bg-[var(--bg)] rounded flex items-center justify-center text-xs text-[var(--text-dim)]">[Panel: Gaps]</div>
              </article>
            </section>
          )}

          {activeScreen === "safe_board" && (
            <section data-screen-id="safe_board" data-state="default" data-ds-id="ds:kanban_layout" className="p-6 h-full flex flex-col">
              <header className="mb-4">
                <h2 className="text-xl font-bold">SAFe Board</h2>
              </header>
              <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
                <article data-ds-id="ds:kanban_column" className="w-80 shrink-0 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-custom)] flex flex-col p-3">
                  <h3 className="font-mono text-sm font-semibold mb-3 border-b border-[var(--border)] pb-2">TO DO</h3>
                  <div data-ds-id="ds:task_card" className="p-3 border border-[var(--border)] bg-[var(--bg)] rounded-[var(--radius-custom)] cursor-pointer hover:border-[var(--accent-cyan)] transition-colors">
                    <div className="text-sm">Implement layout skeleton</div>
                    <div data-ds-id="ds:rte_badge" className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-rose)]/10 text-[var(--accent-rose)]">Escalated</div>
                  </div>
                </article>
                <article data-ds-id="ds:kanban_column" className="w-80 shrink-0 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-custom)] flex flex-col p-3">
                  <h3 className="font-mono text-sm font-semibold mb-3 border-b border-[var(--border)] pb-2">IN PROGRESS</h3>
                  <div className="flex items-center justify-center h-full text-xs text-[var(--text-dim)] font-mono">Drop here</div>
                </article>
              </div>
            </section>
          )}

          {activeScreen === "task_list" && (
            <section data-screen-id="task_list" data-state="default" data-ds-id="ds:task_list_layout" className="p-6 h-full flex flex-col">
              <div data-ds-id="ds:task_filters" className="flex gap-2 mb-4 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-custom)]">
                <div className="text-sm font-mono text-[var(--text-dim)]">[Toolbar: Filters]</div>
              </div>
              <div data-ds-id="ds:task_table" className="flex-1 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] overflow-hidden flex flex-col">
                <div className="h-10 border-b border-[var(--border)] bg-[var(--bg)] flex items-center px-4 font-mono text-xs text-[var(--text-dim)]">Table Header</div>
                <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                  <div className="p-3 border border-[var(--border)] rounded-[var(--radius-custom)] hover:bg-[var(--accent-cyan-dim)] cursor-pointer transition-colors text-sm text-[var(--text)]">Task Row 1</div>
                  <div className="p-3 border border-[var(--border)] rounded-[var(--radius-custom)] hover:bg-[var(--accent-cyan-dim)] cursor-pointer transition-colors text-sm text-[var(--text)]">Task Row 2</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div data-ds-id="ds:task_bulk_actions" className="text-sm font-mono text-[var(--text-dim)]">[Toolbar: Bulk Actions]</div>
                <div data-ds-id="ds:task_pagination" className="text-sm font-mono text-[var(--text-dim)]">[Toolbar: Pagination]</div>
              </div>
            </section>
          )}

          {activeScreen === "task_detail" && (
            <section data-screen-id="task_detail" data-state="default" data-ds-id="ds:task_detail_layout" className="p-6 h-full flex flex-col">
              <header data-ds-id="ds:task_detail_header" className="mb-6 p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)]">
                <h2 className="text-2xl font-bold">Task: T-1024</h2>
                <p className="text-[var(--text-dim)] text-sm">Implement Stage 2 Ralph Loop builder components</p>
              </header>
              <div data-ds-id="ds:task_detail_tabs" className="flex gap-4 border-b border-[var(--border)] mb-4 px-2">
                <button data-ds-id="ds:tab_detail" className="px-4 py-2 border-b-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] font-medium">Detail</button>
                <button data-ds-id="ds:tab_activity" className="px-4 py-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors">Activity</button>
                <button data-ds-id="ds:tab_graph" className="px-4 py-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors">Graph</button>
                <button data-ds-id="ds:tab_code" className="px-4 py-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors">Code</button>
              </div>
              <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-custom)] p-6">
                <div className="text-sm text-[var(--text-dim)] font-mono">[Tab Content Placeholder]</div>
              </div>
            </section>
          )}

          {activeScreen === "trace_explorer" && (
            <section data-screen-id="trace_explorer" data-state="default" data-ds-id="ds:trace_explorer_layout" className="h-full flex flex-col">
              <div data-ds-id="ds:graph_controls" className="p-3 border-b border-[var(--border)] bg-[var(--surface)] text-sm font-mono text-[var(--text-dim)] flex items-center justify-between">
                <span>[Toolbar: Graph Controls]</span>
                <span className="px-2 py-1 rounded bg-[var(--accent-teal-dim)] text-[var(--accent-teal)]">Zoom: 100%</span>
              </div>
              <div className="flex-1 flex overflow-hidden">
                <div data-ds-id="ds:d3_canvas" className="flex-1 bg-[var(--bg)] relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-cyan-dim)] border-2 border-[var(--accent-cyan)] flex items-center justify-center absolute shadow-[0_0_15px_var(--color-blueprint-line)]">
                    <span className="text-xs font-mono font-bold text-[var(--accent-cyan)]">Node</span>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-dim)] opacity-50">[Canvas: Force Directed Graph]</div>
                </div>
                <aside data-ds-id="ds:node_detail_drawer" className="w-80 border-l border-[var(--border)] bg-[var(--surface)] p-4 overflow-y-auto">
                  <h3 className="font-mono text-sm font-semibold border-b border-[var(--border)] pb-2 mb-4">Node Details</h3>
                  <div className="text-xs text-[var(--text-dim)]">[Panel: Node Details]</div>
                </aside>
              </div>
            </section>
          )}

          {activeScreen === "doc_viewer" && (
            <section data-screen-id="doc_viewer" data-state="default" data-ds-id="ds:doc_viewer_layout" className="h-full flex overflow-hidden">
              <aside data-ds-id="ds:doc_tree_sidebar" className="w-72 border-r border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col overflow-y-auto">
                <h3 className="font-mono text-sm font-semibold mb-4 text-[var(--text-dim)] uppercase tracking-wider">Documentation</h3>
                <div className="text-sm font-mono text-[var(--text-dim)] space-y-2">
                  <div className="pl-2 border-l-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] cursor-pointer">PRD-04-WebUI.md</div>
                  <div className="pl-2 border-l-2 border-transparent hover:border-[var(--border)] cursor-pointer">Architecture.md</div>
                </div>
              </aside>
              <article data-ds-id="ds:markdown_viewer" className="flex-1 p-8 bg-[var(--bg)] overflow-y-auto prose prose-invert max-w-none">
                <h1>Web UI & PM Workspace</h1>
                <p className="text-[var(--text-dim)]">Markdown viewer placeholder...</p>
                <div className="mt-4 p-4 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-sm">
                  <span className="text-[var(--accent-teal)]">{"<!--"} beads-id: br-prd04-s1 {"-->"}</span>
                </div>
              </article>
            </section>
          )}

          {activeScreen === "approval_gates" && (
            <section data-screen-id="approval_gates" data-state="default" data-ds-id="ds:approval_layout" className="max-w-4xl mx-auto p-6 space-y-6">
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text)]">Approval Gate B: WebUI PM Workspace</h2>
              </header>
              <div data-ds-id="ds:prd_context_panel" className="p-5 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)]">
                <h3 className="font-mono text-sm mb-3">PRD Context</h3>
                <div className="text-sm text-[var(--text-dim)]">[Panel: Traceability Matrix Checks]</div>
              </div>
              <div data-ds-id="ds:code_diff_panel" className="p-5 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)]">
                <h3 className="font-mono text-sm mb-3">Code Diff Summary</h3>
                <div className="text-sm font-mono bg-[var(--bg)] p-3 rounded border border-[var(--border)] text-[var(--accent-teal)]">
                  + 243 lines, - 12 lines
                </div>
              </div>
              <div data-ds-id="ds:test_logs_panel" className="p-5 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)]">
                <h3 className="font-mono text-sm mb-3">Test Execution Logs</h3>
                <div className="text-sm font-mono text-[var(--accent-cyan)] bg-[var(--bg)] p-3 rounded border border-[var(--border)]">
                  PASS: 42/42 tests completed successfully.
                </div>
              </div>
              <div data-ds-id="ds:approval_action_bar" className="flex items-center justify-end gap-4 p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] mt-8 sticky bottom-6 shadow-lg shadow-[var(--bg)]">
                <button data-ds-id="ds:reject_btn" className="px-6 py-2 rounded font-medium text-[var(--accent-rose)] hover:bg-[var(--accent-rose)]/10 transition-colors">Reject & Route Back</button>
                <button data-ds-id="ds:approve_btn" className="px-6 py-2 rounded font-medium bg-[var(--accent-teal)] text-[#000] hover:bg-[var(--accent-teal)]/90 transition-colors shadow-[0_0_10px_var(--color-accent-teal-dim)]">Approve Gate</button>
              </div>
            </section>
          )}

          {activeScreen === "search_results" && (
            <section data-screen-id="search_results" data-state="default" data-ds-id="ds:search_results_layout" className="h-full flex overflow-hidden">
              <aside data-ds-id="ds:search_filter_sidebar" className="w-64 border-r border-[var(--border)] bg-[var(--surface)] p-4 overflow-y-auto">
                <h3 className="font-mono text-sm font-semibold mb-4 text-[var(--text-dim)] uppercase">Filters</h3>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[var(--accent-cyan)]" /> Tasks</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[var(--accent-cyan)]" /> Documents</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-[var(--accent-cyan)]" /> Commits</label>
                </div>
              </aside>
              <div data-ds-id="ds:search_results_list" className="flex-1 p-6 bg-[var(--bg)] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-6">Search Results for <span className="text-[var(--accent-cyan)]">"layout builder"</span></h2>
                <div className="space-y-4">
                  <div className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] hover:border-[var(--accent-cyan)] cursor-pointer transition-colors">
                    <h4 className="font-medium text-[var(--accent-cyan)]">Task T-1024</h4>
                    <p className="text-sm text-[var(--text-dim)] mt-1">Implement Stage 2 Ralph Loop builder components...</p>
                  </div>
                  <div className="p-4 border border-[var(--border)] rounded-[var(--radius-custom)] bg-[var(--surface)] hover:border-[var(--accent-cyan)] cursor-pointer transition-colors">
                    <h4 className="font-medium text-[var(--accent-cyan)]">ui-contract.md</h4>
                    <p className="text-sm text-[var(--text-dim)] mt-1">Found in docs/design/contracts/PRD-04-WebUI-and-PM-Workspace...</p>
                  </div>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
