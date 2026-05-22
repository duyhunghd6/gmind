"use client";

import React, { useState } from 'react';

export default function PRD04WebUI() {
  const [activeScreen, setActiveScreen] = useState('rtm_dashboard');
  const [shellState, setShellState] = useState('default');
  
  // Handlers bridging YAML actions to State
  const navigateHome = () => setActiveScreen('rtm_dashboard');
  const triggerSearch = () => setActiveScreen('search_results');
  const navigateBoard = () => setActiveScreen('safe_board');
  const navigateTasks = () => setActiveScreen('task_list');
  const navigateDocs = () => setActiveScreen('doc_viewer');
  const navigateApproval = () => setActiveScreen('approval_gates');
  
  const toggleOffline = () => setShellState(s => s === 'default' ? 'offline' : 'default');

  return (
    <div className="w-full h-screen flex overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg, #0f172a)', color: 'var(--text, #f8fafc)' }} data-ds-id="ds:global_shell" data-state={shellState} data-screen-id="global_shell">
      {/* Global Shell Sidebar */}
      <aside className="w-64 border-r flex flex-col" style={{ borderColor: 'var(--border, #334155)', backgroundColor: 'var(--surface, #1e293b)' }} data-ds-id="ds:shell_sidebar">
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border, #334155)' }} data-ds-id="ds:shell_header">
           <button className="font-bold text-xl" style={{ color: 'var(--accent, #22d3ee)' }} data-ds-id="ds:logo_btn" onClick={navigateHome}>gmind</button>
           {shellState === 'offline' && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--danger, #f43f5e)' }} title="Offline" data-ds-id="ds:offline_status_indicator"></span>}
        </div>
        <div className="p-4">
          <input type="text" placeholder="Search..." className="w-full rounded px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--input-bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:global_search" onKeyDown={(e) => e.key === 'Enter' && triggerSearch()} />
        </div>
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" data-ds-id="ds:nav_menu">
           <NavButton label="RTM Dashboard" active={activeScreen === 'rtm_dashboard'} onClick={navigateHome} />
           <NavButton label="SAFe Board" active={activeScreen === 'safe_board'} onClick={navigateBoard} />
           <NavButton label="Task List" active={activeScreen === 'task_list'} onClick={navigateTasks} />
           <NavButton label="Doc Viewer" active={activeScreen === 'doc_viewer'} onClick={navigateDocs} />
           <NavButton label="Approval Gates" active={activeScreen === 'approval_gates'} onClick={navigateApproval} />
        </nav>
        <div className="p-4 border-t" style={{ borderColor: 'var(--border, #334155)' }}>
           <button className="text-sm opacity-70 hover:opacity-100 transition-opacity" onClick={toggleOffline}>Toggle Offline Test</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeScreen === 'rtm_dashboard' && <RTMDashboard navigateTo={setActiveScreen} />}
        {activeScreen === 'safe_board' && <SAFeBoard navigateTo={setActiveScreen} />}
        {activeScreen === 'task_list' && <TaskList navigateTo={setActiveScreen} />}
        {activeScreen === 'task_detail' && <TaskDetail navigateTo={setActiveScreen} />}
        {activeScreen === 'trace_explorer' && <TraceExplorer navigateTo={setActiveScreen} />}
        {activeScreen === 'doc_viewer' && <DocViewer navigateTo={setActiveScreen} />}
        {activeScreen === 'approval_gates' && <ApprovalGates navigateTo={setActiveScreen} />}
        {activeScreen === 'search_results' && <SearchResults navigateTo={setActiveScreen} />}
      </main>
    </div>
  );
}

function NavButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      className={`text-left px-3 py-2 rounded transition-colors`}
      style={{ 
        backgroundColor: active ? 'var(--nav-active-bg, #0f172a)' : 'transparent',
        color: active ? 'var(--accent, #22d3ee)' : 'inherit'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function RTMDashboard({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <div className="p-8 overflow-y-auto w-full h-full space-y-6" data-screen-id="rtm_dashboard" data-state="default" data-ds-id="ds:dashboard_grid">
      <h1 className="text-2xl font-bold mb-4">RTM Dashboard</h1>
      <div className="grid grid-cols-4 gap-4" data-ds-id="ds:kpi_metrics">
        <KPICard title="Total PRDs" value="12" color="var(--accent, #22d3ee)" />
        <KPICard title="Coverage" value="85%" color="var(--success, #14b8a6)" />
        <KPICard title="Active Tasks" value="34" color="var(--warning, #f59e0b)" />
        <KPICard title="Pending Approvals" value="3" color="var(--danger, #f43f5e)" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="ve-card p-4 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:heatmap_panel">
          <h3 className="font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--border, #334155)' }}>Requirements Coverage</h3>
          <div className="flex gap-1 flex-wrap">
             {[...Array(20)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded cursor-pointer transition-transform hover:scale-110" 
                  style={{ backgroundColor: i % 3 === 0 ? 'var(--danger-dim, #881337)' : i % 2 === 0 ? 'var(--warning-dim, #78350f)' : 'var(--success-dim, #064e3b)' }}
                  onClick={() => navigateTo('trace_explorer')}
                  aria-label="Coverage block"
                ></div>
             ))}
          </div>
        </div>
        
        <div className="ve-card p-4 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:mini_graph_panel">
          <h3 className="font-semibold mb-4 pb-2 flex justify-between" style={{ borderBottom: '1px solid var(--border, #334155)' }}>
            Knowledge Graph 
            <button className="text-xs" style={{ color: 'var(--accent, #22d3ee)' }} onClick={() => navigateTo('trace_explorer')}>Drill Down</button>
          </h3>
          <div className="h-40 rounded flex items-center justify-center cursor-pointer" style={{ backgroundColor: 'var(--bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px', color: 'var(--muted, #64748b)' }} onClick={() => navigateTo('trace_explorer')}>
             [Interactive D3 Graph Placeholder]
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="ve-card p-4 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:task_progress_panel">
           <h3 className="font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--border, #334155)' }}>Sprint Progress</h3>
           <div className="space-y-4">
             <ProgressBar label="br-plan-01" percent={100} color="var(--success, #14b8a6)" />
             <ProgressBar label="br-plan-02" percent={45} color="var(--warning, #f59e0b)" />
             <ProgressBar label="br-plan-03" percent={0} color="var(--muted, #64748b)" />
           </div>
        </div>
        <div className="ve-card p-4 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:gap_analysis_panel">
           <h3 className="font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--border, #334155)' }}>Gap Analysis</h3>
           <ul className="space-y-2 text-sm">
             <li className="flex justify-between p-2 rounded" style={{ backgroundColor: 'var(--bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}><span>br-prd04-s3</span><span style={{ color: 'var(--danger, #f43f5e)' }}>No Plan</span></li>
             <li className="flex justify-between p-2 rounded" style={{ backgroundColor: 'var(--bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}><span>br-prd02-s1</span><span style={{ color: 'var(--danger, #f43f5e)' }}>Failing Tests</span></li>
           </ul>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, color }: { title: string, value: string, color: string }) {
  return (
    <div className="ve-card p-4 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>
      <div className="text-sm" style={{ color: 'var(--muted, #64748b)' }}>{title}</div>
      <div className="text-2xl font-semibold" style={{ color }}>{value}</div>
    </div>
  );
}

function ProgressBar({ label, percent, color }: { label: string, percent: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span style={{ color: 'var(--text-secondary, #cbd5e1)' }}>{label}</span><span style={{ color }}>{percent}%</span></div>
      <div className="w-full h-2 rounded overflow-hidden" style={{ backgroundColor: 'var(--bg, #0f172a)' }}>
        <div className="h-full" style={{ backgroundColor: color, width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function SAFeBoard({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <div className="p-8 h-full flex flex-col" data-screen-id="safe_board" data-state="default" data-ds-id="ds:kanban_layout">
      <h1 className="text-2xl font-bold mb-6">SAFe Board</h1>
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {['Backlog', 'In Progress', 'In Review', 'Done'].map(col => (
          <div key={col} className="w-80 flex flex-col rounded-lg shrink-0" style={{ backgroundColor: 'var(--surface-dim, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:kanban_column">
            <div className="p-3 font-medium flex justify-between items-center" style={{ borderBottom: '1px solid var(--border, #334155)', color: 'var(--text-secondary, #cbd5e1)' }}>
               {col} <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface, #1e293b)' }}>3</span>
            </div>
            <div className="p-3 space-y-3 overflow-y-auto flex-1">
               <div className="ve-card p-3 rounded shadow-sm cursor-pointer transition-colors" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:task_card" onClick={() => navigateTo('task_detail')}>
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-mono" style={{ color: 'var(--accent, #22d3ee)' }}>bd-1024</span>
                   <span className="text-[10px] px-1.5 rounded" style={{ backgroundColor: 'var(--warning-dim, #78350f)', color: 'var(--warning, #f59e0b)', borderColor: 'var(--warning, #f59e0b)', borderWidth: '1px' }} data-ds-id="ds:rte_badge">Escalated</span>
                 </div>
                 <p className="text-sm mb-3">Implement FrankenSQLite offline sync</p>
                 <div className="flex justify-between items-center text-xs" style={{ color: 'var(--muted, #64748b)' }}>
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: 'var(--surface-dim, #0f172a)', borderColor: 'var(--border, #334155)' }}></div>
                    </div>
                    <span>3 SP</span>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskList({ navigateTo }: { navigateTo: (s: string) => void }) {
  const [state, setState] = useState('default');
  
  return (
    <div className="p-8 h-full flex flex-col" data-screen-id="task_list" data-state={state} data-ds-id="ds:task_list_layout">
      <h1 className="text-2xl font-bold mb-6">Task List</h1>
      <div className="mb-4 flex gap-4 items-center" data-ds-id="ds:task_filters">
        <input type="text" placeholder="Filter tasks..." className="rounded px-3 py-1.5 text-sm w-64" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px', color: 'inherit' }} />
        <select className="rounded px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px', color: 'inherit' }}>
          <option>All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
        </select>
        <div className="flex-1"></div>
        <div data-ds-id="ds:task_bulk_actions">
          <button className="btn-secondary text-sm px-3 py-1.5 rounded transition-colors" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} onClick={() => setState('bulk_processing')}>Bulk Edit</button>
        </div>
      </div>
      
      {state === 'bulk_processing' && (
         <div className="mb-4 p-3 rounded flex items-center gap-3" style={{ backgroundColor: 'var(--accent-dim, #164e63)', color: 'var(--accent, #22d3ee)' }}>
           <span>Processing bulk action...</span>
           <button className="text-xs underline ml-auto" onClick={() => setState('default')}>Done</button>
         </div>
      )}

      <div className="flex-1 overflow-auto rounded" style={{ borderColor: 'var(--border, #334155)', borderWidth: '1px', backgroundColor: 'var(--surface, #1e293b)' }}>
        <table className="w-full text-left text-sm" data-ds-id="ds:task_table">
          <thead style={{ backgroundColor: 'var(--bg, #0f172a)', borderBottom: '1px solid var(--border, #334155)', color: 'var(--muted, #64748b)' }}>
            <tr>
              <th className="p-3 w-8"><input type="checkbox" aria-label="Select all" /></th>
              <th className="p-3">ID</th>
              <th className="p-3">Summary</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assignee</th>
              <th className="p-3">Updated</th>
            </tr>
          </thead>
          <tbody style={{ divideColor: 'var(--border, #334155)', divideWidth: '1px', divideStyle: 'solid' }}>
            {[1,2,3,4,5,6].map(i => (
              <tr key={i} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigateTo('task_detail')}>
                <td className="p-3" onClick={e => e.stopPropagation()}><input type="checkbox" aria-label="Select row" /></td>
                <td className="p-3 font-mono text-xs" style={{ color: 'var(--accent, #22d3ee)' }}>bd-10{i}0</td>
                <td className="p-3">Task summary description goes here...</td>
                <td className="p-3"><span className="badge-cyan px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--accent-dim, #164e63)', color: 'var(--accent, #22d3ee)' }}>In Progress</span></td>
                <td className="p-3" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>Agent Alpha</td>
                <td className="p-3" style={{ color: 'var(--muted, #64748b)' }}>2h ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm" style={{ color: 'var(--muted, #64748b)' }} data-ds-id="ds:task_pagination">
        <span>Showing 1-10 of 42</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>Prev</button>
          <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>Next</button>
        </div>
      </div>
    </div>
  );
}

function TaskDetail({ navigateTo }: { navigateTo: (s: string) => void }) {
  const [activeTab, setActiveTab] = useState('detail');
  return (
    <div className="flex flex-col h-full" data-screen-id="task_detail" data-state="default" data-ds-id="ds:task_detail_layout">
      <div className="p-6 border-b" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:task_detail_header">
        <div className="flex gap-2 text-sm mb-2" style={{ color: 'var(--muted, #64748b)' }}>
          <button className="hover:underline" onClick={() => navigateTo('task_list')}>Tasks</button> / <span className="font-mono" style={{ color: 'var(--accent, #22d3ee)' }}>bd-1024</span>
        </div>
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">Implement FrankenSQLite offline sync</h1>
          <div className="flex gap-2">
            <button className="btn-secondary px-3 py-1.5 rounded text-sm transition-colors" style={{ backgroundColor: 'var(--bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>Edit</button>
            <button className="btn-primary px-3 py-1.5 font-medium rounded text-sm transition-colors" style={{ backgroundColor: 'var(--accent, #22d3ee)', color: '#000' }}>Transition</button>
          </div>
        </div>
      </div>
      
      <div className="px-6 pt-2 border-b" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:task_detail_tabs">
        <div className="flex gap-6 text-sm">
          {['Detail', 'Activity', 'Graph', 'Code'].map(t => (
            <button 
              key={t}
              className="pb-2 border-b-2 transition-colors"
              style={{ 
                borderColor: activeTab === t.toLowerCase() ? 'var(--accent, #22d3ee)' : 'transparent',
                color: activeTab === t.toLowerCase() ? 'var(--accent, #22d3ee)' : 'var(--text-secondary, #cbd5e1)'
              }}
              onClick={() => setActiveTab(t.toLowerCase())}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 relative">
        {activeTab === 'detail' && (
          <div className="grid grid-cols-3 gap-6" data-ds-id="ds:tab_detail">
            <div className="col-span-2 space-y-6">
               <div className="ve-card p-5 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>
                  <h3 className="font-medium mb-3" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>Description</h3>
                  <div className="text-sm space-y-2" style={{ color: 'var(--text, #f8fafc)' }}>
                     <p>We need to implement offline synchronization capabilities for the PM Workspace using FrankenSQLite.</p>
                     <p>References PRD-04 Section 2.</p>
                  </div>
               </div>
               <div className="ve-card p-5 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>
                  <h3 className="font-medium mb-3" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>Linked Elements</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2"><span style={{ color: 'var(--muted, #64748b)' }}>Satisfies</span> <button className="font-mono hover:underline" style={{ color: 'var(--accent, #22d3ee)' }} onClick={() => navigateTo('doc_viewer')}>br-prd04-s2</button></li>
                    <li className="flex items-center gap-2"><span style={{ color: 'var(--muted, #64748b)' }}>Blocked By</span> <button className="font-mono hover:underline" style={{ color: 'var(--accent, #22d3ee)' }} onClick={() => navigateTo('trace_explorer')}>bd-1020</button></li>
                  </ul>
               </div>
            </div>
            <div className="space-y-6">
               <div className="ve-card p-4 rounded text-sm" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>
                  <h3 className="font-medium mb-3" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>Metadata</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div style={{ color: 'var(--muted, #64748b)' }}>Status</div><div><span className="badge-cyan px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--accent-dim, #164e63)', color: 'var(--accent, #22d3ee)' }}>In Progress</span></div>
                    <div style={{ color: 'var(--muted, #64748b)' }}>Assignee</div><div>Agent Alpha</div>
                    <div style={{ color: 'var(--muted, #64748b)' }}>Priority</div><div style={{ color: 'var(--warning, #f59e0b)' }}>High</div>
                  </div>
               </div>
            </div>
          </div>
        )}
        {activeTab === 'activity' && <div data-ds-id="ds:tab_activity" style={{ color: 'var(--muted, #64748b)' }}>Activity feed mock...</div>}
        {activeTab === 'graph' && <div data-ds-id="ds:tab_graph" style={{ color: 'var(--muted, #64748b)' }}>Graph View Mock...</div>}
        {activeTab === 'code' && <div data-ds-id="ds:tab_code" style={{ color: 'var(--muted, #64748b)' }}>Code Links Mock...</div>}
      </div>
    </div>
  );
}

function TraceExplorer({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <div className="h-full flex flex-col" data-screen-id="trace_explorer" data-state="default" data-ds-id="ds:trace_explorer_layout">
       <div className="p-4 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:graph_controls">
          <h2 className="font-bold">Trace Explorer</h2>
          <div className="flex gap-2">
             <button className="px-3 py-1 rounded text-sm" style={{ backgroundColor: 'var(--bg, #0f172a)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }}>Zoom In</button>
          </div>
       </div>
       <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 relative" data-ds-id="ds:d3_canvas">
             <div className="absolute top-20 left-20 w-32 p-2 rounded flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105" 
               style={{ backgroundColor: 'var(--danger-dim, #881337)', borderColor: 'var(--danger, #f43f5e)', borderWidth: '1px' }}
               onClick={() => navigateTo('doc_viewer')}>
                <span className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--danger, #f43f5e)' }}>PRD</span>
                <span className="text-xs font-mono">br-prd04</span>
             </div>
             
             <svg className="absolute top-0 left-0 w-full h-full pointer-events-none"><line x1="100" y1="130" x2="250" y2="200" stroke="var(--border, #334155)" strokeWidth="2" strokeDasharray="4 2" /></svg>

             <div className="absolute top-40 left-60 w-32 p-2 rounded flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105" 
               style={{ backgroundColor: 'var(--warning-dim, #78350f)', borderColor: 'var(--warning, #f59e0b)', borderWidth: '1px' }}
               onClick={() => navigateTo('doc_viewer')}>
                <span className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--warning, #f59e0b)' }}>Plan</span>
                <span className="text-xs font-mono">br-plan-04</span>
             </div>
             
             <svg className="absolute top-0 left-0 w-full h-full pointer-events-none"><line x1="330" y1="210" x2="450" y2="280" stroke="var(--border, #334155)" strokeWidth="2" /></svg>

             <div className="absolute top-60 left-[430px] w-32 p-2 rounded flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105" 
               style={{ backgroundColor: 'var(--accent-dim, #164e63)', borderColor: 'var(--accent, #22d3ee)', borderWidth: '1px' }}
               onClick={() => navigateTo('task_detail')}>
                <span className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--accent, #22d3ee)' }}>Task</span>
                <span className="text-xs font-mono">bd-1024</span>
             </div>
          </div>
          <div className="w-80 border-l p-4 overflow-y-auto" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:node_detail_drawer">
             <h3 className="font-bold mb-4">Node Details</h3>
             <div className="space-y-4 text-sm">
                <div><label className="text-xs" style={{ color: 'var(--muted, #64748b)' }}>ID</label><div className="font-mono" style={{ color: 'var(--accent, #22d3ee)' }}>bd-1024</div></div>
                <div><label className="text-xs" style={{ color: 'var(--muted, #64748b)' }}>Type</label><div>Development Task</div></div>
                <div><label className="text-xs" style={{ color: 'var(--muted, #64748b)' }}>Connected</label><ul className="mt-1 space-y-1"><li style={{ color: 'var(--text-secondary, #cbd5e1)' }}>⬅ br-plan-04</li></ul></div>
             </div>
          </div>
       </div>
    </div>
  );
}

function DocViewer({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <div className="h-full flex" data-screen-id="doc_viewer" data-state="default" data-ds-id="ds:doc_viewer_layout">
       <div className="w-64 border-r p-4 overflow-y-auto" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:doc_tree_sidebar">
          <h3 className="font-semibold mb-4 text-slate-200">Documentation</h3>
          <ul className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>
             <li><span className="mr-2">📂</span> PRDs
                <ul className="ml-4 mt-2 space-y-2 border-l pl-2" style={{ borderColor: 'var(--border, #334155)' }}>
                   <li className="cursor-pointer" style={{ color: 'var(--accent, #22d3ee)' }}>📄 PRD-04-WebUI</li>
                   <li className="cursor-pointer hover:opacity-80">📄 PRD-05-Agent</li>
                </ul>
             </li>
             <li className="mt-4"><span className="mr-2">📂</span> Plans</li>
             <li><span className="mr-2">📂</span> Researches</li>
          </ul>
       </div>
       <div className="flex-1 p-8 overflow-y-auto" data-ds-id="ds:markdown_viewer">
          <div className="max-w-3xl mx-auto ve-card p-8 rounded border" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }}>
             <h1 className="text-3xl font-bold mb-4">PRD-04-WebUI-and-PM-Workspace</h1>
             <p className="mb-4">This is the detailed specification...</p>
             <h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2" style={{ borderColor: 'var(--border, #334155)' }}>1. Feature Summary</h2>
             <div className="text-xs p-1 px-2 rounded font-mono inline-block mb-4 cursor-pointer transition-colors" 
               style={{ backgroundColor: 'var(--bg, #0f172a)', color: 'var(--muted, #64748b)' }}
               onMouseOver={e => e.currentTarget.style.color = 'var(--accent, #22d3ee)'}
               onMouseOut={e => e.currentTarget.style.color = 'var(--muted, #64748b)'}
               onClick={() => navigateTo('trace_explorer')}>
               &lt;!-- beads-id: br-prd04-s1 --&gt;
             </div>
             <p>It acts as a miniature JIRA built on first-class SQL columns...</p>
          </div>
       </div>
    </div>
  );
}

function ApprovalGates({ navigateTo }: { navigateTo: (s: string) => void }) {
  const [state, setState] = useState('default');
  
  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto" data-screen-id="approval_gates" data-state={state} data-ds-id="ds:approval_layout">
       <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold">Gate B Approval: Feature PRD-04</h1>
             <div className="badge-amber px-3 py-1 rounded text-sm" style={{ backgroundColor: 'var(--warning-dim, #78350f)', color: 'var(--warning, #f59e0b)', borderColor: 'var(--warning, #f59e0b)', borderWidth: '1px' }}>Pending Review</div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <div className="ve-card p-5 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:prd_context_panel">
                <h3 className="font-semibold mb-3 pb-2 border-b" style={{ borderColor: 'var(--border, #334155)' }}>PRD Context</h3>
                <div className="text-sm space-y-2">
                   <p>Target: <span className="font-mono" style={{ color: 'var(--accent, #22d3ee)' }}>br-prd04</span></p>
                   <p>Coverage: 100% of linked plans completed.</p>
                </div>
             </div>
             <div className="ve-card p-5 rounded" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:test_logs_panel">
                <h3 className="font-semibold mb-3 pb-2 border-b" style={{ borderColor: 'var(--border, #334155)' }}>Test Execution</h3>
                <div className="text-sm space-y-2">
                   <div className="flex justify-between"><span style={{ color: 'var(--muted, #64748b)' }}>Unit Tests</span><span style={{ color: 'var(--success, #14b8a6)' }}>Pass (142/142)</span></div>
                   <div className="flex justify-between"><span style={{ color: 'var(--muted, #64748b)' }}>E2E UI Tests</span><span style={{ color: 'var(--success, #14b8a6)' }}>Pass (28/28)</span></div>
                </div>
             </div>
          </div>
          
          <div className="ve-card p-0 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} data-ds-id="ds:code_diff_panel">
             <div className="p-4 border-b font-semibold text-sm" style={{ borderColor: 'var(--border, #334155)', backgroundColor: 'var(--bg, #0f172a)' }}>Code Diff Overview</div>
             <div className="p-4 text-xs font-mono overflow-x-auto" style={{ backgroundColor: '#0d1117' }}>
                <div style={{ color: 'var(--danger, #f43f5e)' }}>- <span className="line-through">import oldSystem from 'old';</span></div>
                <div style={{ color: 'var(--success, #14b8a6)' }}>+ import &#123; createStore &#125; from 'franken-sqlite';</div>
                <div style={{ color: 'var(--muted, #64748b)' }}>  // ... 45 lines changed</div>
             </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4" data-ds-id="ds:approval_action_bar">
             <button className="btn-danger px-6 py-2 rounded font-medium transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--danger-dim, #881337)', color: 'var(--danger, #f43f5e)', borderColor: 'var(--danger, #f43f5e)', borderWidth: '1px' }} data-ds-id="ds:reject_btn">Reject</button>
             <button className="btn-primary px-6 py-2 rounded font-medium transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--success, #14b8a6)', color: '#000' }} data-ds-id="ds:approve_btn">Approve & Merge</button>
          </div>
       </div>
    </div>
  );
}

function SearchResults({ navigateTo }: { navigateTo: (s: string) => void }) {
  return (
    <div className="h-full flex" data-screen-id="search_results" data-state="default" data-ds-id="ds:search_results_layout">
       <div className="w-64 border-r p-4" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)' }} data-ds-id="ds:search_filter_sidebar">
          <h3 className="font-semibold mb-4 text-slate-200">Filters</h3>
          <div className="space-y-4 text-sm" style={{ color: 'var(--muted, #64748b)' }}>
             <label className="flex items-center gap-2"><input type="checkbox" defaultChecked aria-label="Tasks" /> Tasks</label>
             <label className="flex items-center gap-2"><input type="checkbox" defaultChecked aria-label="Documents" /> Documents</label>
             <label className="flex items-center gap-2"><input type="checkbox" defaultChecked aria-label="Commits" /> Commits</label>
          </div>
       </div>
       <div className="flex-1 p-8 overflow-y-auto" data-ds-id="ds:search_results_list">
          <h2 className="text-xl font-bold mb-6">Search Results for "offline"</h2>
          <div className="space-y-4 max-w-3xl">
             <div className="ve-card p-4 rounded cursor-pointer transition-colors" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent, #22d3ee)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border, #334155)'} onClick={() => navigateTo('task_detail')}>
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-dim, #164e63)', color: 'var(--accent, #22d3ee)', borderColor: 'var(--accent, #22d3ee)', borderWidth: '1px' }}>TASK</span>
                   <span className="font-mono text-xs" style={{ color: 'var(--accent, #22d3ee)' }}>bd-1024</span>
                </div>
                <h4 className="font-medium text-slate-200">Implement FrankenSQLite offline sync</h4>
                <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--muted, #64748b)' }}>Ensure the PM workspace operates seamlessly when offline...</p>
             </div>
             <div className="ve-card p-4 rounded cursor-pointer transition-colors" style={{ backgroundColor: 'var(--surface, #1e293b)', borderColor: 'var(--border, #334155)', borderWidth: '1px' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent, #22d3ee)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border, #334155)'} onClick={() => navigateTo('doc_viewer')}>
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--warning-dim, #78350f)', color: 'var(--warning, #f59e0b)', borderColor: 'var(--warning, #f59e0b)', borderWidth: '1px' }}>DOC</span>
                   <span className="font-mono text-xs" style={{ color: 'var(--accent, #22d3ee)' }}>br-prd04</span>
                </div>
                <h4 className="font-medium text-slate-200">PRD-04 WebUI</h4>
                <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--muted, #64748b)' }}>...providing a resilient Offline/Rehydration state for uninterrupted PM work.</p>
             </div>
          </div>
       </div>
    </div>
  );
}
