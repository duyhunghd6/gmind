"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const roamRisks = [
  { id: "r-01", desc: "API Limit từ Binance", status: "Resolved", owner: "Steve" },
  { id: "r-02", desc: "Thiếu AWS Credits", status: "Owned", owner: "DevOps Team" },
  { id: "r-03", desc: "Deadlock trong SQLite", status: "Accepted", owner: "—" },
  { id: "r-04", desc: "Độ trễ Network nội bộ", status: "Mitigated", owner: "Network Admin" },
  { id: "r-05", desc: "Dependency conflict React 19", status: "Unassigned", owner: "—" },
];

export default function PiPlanningScreen() {
  const [state, setState] = useState<ScreenState>("default");
  
  // Hydration safe state
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  type FeatureItem = { id: string; content: string; points: number; };
  type ColumnData = { id: string; title: string; capacity?: number; items: FeatureItem[] };

  const [columns, setColumns] = useState<ColumnData[]>([
    {
      id: "backlog", title: "Feature Backlog", items: [
        { id: "feat-01", content: "Agentic Flywheel", points: 13 },
        { id: "feat-02", content: "Real-time RTM", points: 8 },
        { id: "feat-03", content: "Beads Sync", points: 5 },
      ]
    },
    { id: "sprint-1", title: "Sprint 1 (Current)", capacity: 20, items: [] },
    { id: "sprint-2", title: "Sprint 2", capacity: 25, items: [] }
  ]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns(prev => {
      const next = prev.map(c => ({ ...c, items: [...c.items] }));
      const srcCol = next.find(c => c.id === source.droppableId);
      const dstCol = next.find(c => c.id === destination.droppableId);
      if (!srcCol || !dstCol) return prev;

      const [moved] = srcCol.items.splice(source.index, 1);
      dstCol.items.splice(destination.index, 0, moved);
      return next;
    });
  };

  return (
    <div aria-label="PI Planning Sandbox Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🎯 PI Planning Sandbox</h1>
        <DsIdBadge id="br-ds-pi-planning" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Không gian tương tác cho lễ PI Planning: Strategic Sandbox & ROAM Board.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "24px" }}>
          
          {/* Main Area: Strategic Sandbox */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card" style={{ padding: "20px", minHeight: "300px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Strategic Sandbox (Kéo thả Capacity)</h3>
                <span className="badge badge--success" style={{ fontSize: "0.75rem" }}>Capacity: 80%</span>
              </div>
              
              {!isMounted ? (
                <div style={{ padding: "40px", textAlign: "center", border: "2px dashed var(--border)", borderRadius: "8px", color: "var(--text-dim)" }}>
                  <p>Đang tải Drag & Drop Sandbox...</p>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    {columns.map(col => (
                      <div key={col.id} style={{ display: "flex", flexDirection: "column", gap: "8px", background: "var(--surface-elevated)", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{col.title}</span>
                          <span className="badge" style={{ fontSize: "0.65rem" }}>{col.items.length}</span>
                        </div>
                        <Droppable droppableId={col.id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                minHeight: "150px",
                                borderRadius: "6px",
                                background: snapshot.isDraggingOver ? "rgba(0, 229, 255, 0.05)" : "rgba(0,0,0,0.1)",
                                border: snapshot.isDraggingOver ? "1px dashed var(--accent-cyan)" : "1px dashed var(--border)",
                                padding: "8px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                              }}
                            >
                              {col.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(dragProvided, dragSnapshot) => (
                                    <div
                                      ref={dragProvided.innerRef}
                                      {...dragProvided.draggableProps}
                                      {...dragProvided.dragHandleProps}
                                      style={{
                                        ...dragProvided.draggableProps.style,
                                        background: dragSnapshot.isDragging ? "var(--surface)" : "var(--bg)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "4px",
                                        padding: "8px 12px",
                                        fontSize: "0.8rem",
                                        color: "var(--text)",
                                        boxShadow: dragSnapshot.isDragging ? "var(--shadow-card)" : "none",
                                        userSelect: "none"
                                      }}
                                    >
                                      <div style={{ fontWeight: 500, marginBottom: "4px" }}>{item.content}</div>
                                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-dim)" }}>
                                        <span>{item.id}</span>
                                        <span style={{ background: "var(--surface-elevated)", padding: "2px 4px", borderRadius: "2px" }}>{item.points} pts</span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        {col.capacity && (
                           <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textAlign: "right", marginTop: "4px" }}>
                              Total: {col.items.reduce((s, i) => s + i.points, 0)} / {col.capacity} pts
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                </DragDropContext>
              )}
            </div>

            <div className="card" style={{ padding: "20px" }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Business Value Scoring</h3>
              </div>
              <div className="data-table-container">
                 <table className="data-table" style={{ width: "100%", textAlign: "left" }}>
                   <thead>
                     <tr>
                       <th>Feature</th>
                       <th>Planned Value</th>
                       <th>Actual Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="data-table__row">
                       <td style={{ fontWeight: 500 }}>Tích hợp Agent Flywheel</td>
                       <td><span className="badge badge--surface">8.5</span></td>
                       <td><span className="badge badge--surface">—</span></td>
                     </tr>
                     <tr className="data-table__row">
                       <td style={{ fontWeight: 500 }}>Báo cáo RTM Real-time</td>
                       <td><span className="badge badge--surface">9.0</span></td>
                       <td><span className="badge badge--surface">—</span></td>
                     </tr>
                   </tbody>
                 </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar: ROAM Board & Confidence */}
          <div>
             <div className="card" style={{ padding: "20px", marginBottom: "24px", background: "var(--surface)" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: "0 0 16px" }}>Confidence Vote</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", marginBottom: "16px" }}>
                   Bắt buộc có xác nhận Level 3 Approval trước khi khởi chạy PI.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                   {[1, 2, 3, 4, 5].map(v => (
                     <button key={v} className="btn-secondary" style={{ width: "40px", height: "40px", padding: 0, borderRadius: "50%", fontWeight: "bold" }}>
                       {v}
                     </button>
                   ))}
                </div>
                <button className="btn-primary" style={{ width: "100%", marginTop: "16px", padding: "10px" }} disabled>Khởi chạy PI</button>
             </div>

             <div className="card" style={{ padding: "20px", borderColor: "rgba(255,166,87,0.3)" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                   <span>⚠️</span> ROAM Board
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                   {roamRisks.map(r => (
                      <div key={r.id} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "6px", background: "var(--surface)", fontSize: "0.8125rem" }}>
                         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontWeight: 600, color: "var(--text)" }}>{r.id}</span>
                            <span className="badge" style={{ padding: "2px 6px", fontSize: "0.65rem", backgroundColor: r.status === "Unassigned" ? "rgba(255,123,114,0.15)" : "rgba(139,148,158,0.15)", color: r.status === "Unassigned" ? "#ff7b72" : "var(--text-dim)" }}>
                               {r.status}
                            </span>
                         </div>
                         <div style={{ color: "var(--text-dim)", marginBottom: "6px" }}>{r.desc}</div>
                         <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", display: "flex", justifyContent: "flex-end" }}>👤 {r.owner}</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {state === "loading" && <div style={{ display: "flex", gap: "24px" }}><div style={{ flex: 1 }}><Skeleton variant="card" /></div><div style={{ width: "350px" }}><Skeleton variant="card" /></div></div>}
      {state === "empty" && <EmptyState icon="🎯" title="Chưa có PI nào được lập kế hoạch" desc="Bắt đầu PI Planning bằng cách thêm Epic từ Backlog." />}
      {state === "error" && <ErrorBanner title="Lỗi tải ROAM Board" message="Lỗi kết nối CSDL phân tán." onRetry={() => setState("default")} fullpage />}
    </div>
  );
}
