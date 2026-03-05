"use client";

import { useState } from "react";
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
          <div>
            <div className="card" style={{ padding: "20px", marginBottom: "24px", minHeight: "300px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Strategic Sandbox (Kéo thả Capacity)</h3>
                <span className="badge badge--success" style={{ fontSize: "0.75rem" }}>Capacity: 80%</span>
              </div>
              <div style={{ padding: "40px", textAlign: "center", border: "2px dashed var(--border)", borderRadius: "8px", color: "var(--text-dim)" }}>
                <p>Khung tương tác Drag & Drop để phân bổ nguồn lực sẽ xuất hiện tại đây.</p>
                <button className="btn-secondary btn-sm" style={{ marginTop: "12px" }}>Mô phỏng DRAG-DROP bằng @hello-pangea/dnd</button>
              </div>
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
