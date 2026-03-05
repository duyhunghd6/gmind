"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const portfolios = [
  { id: "epic-001", title: "Phát triển Tính năng Nâng cao", budget: "$50k", progress: 65, status: "Tích cực", owner: "Tran Linh", date: "Q1 2026" },
  { id: "epic-002", title: "Cải thiện Hiệu năng CSDL", budget: "$30k", progress: 90, status: "Sắp hoàn thành", owner: "Tuan Le", date: "Q1 2026" },
  { id: "epic-003", title: "Tích hợp AI Agents", budget: "$120k", progress: 20, status: "Bị chậm", owner: "Steve", date: "Q2 2026" },
  { id: "epic-004", title: "Bảo mật & Phân quyền", budget: "$45k", progress: 0, status: "Chưa bắt đầu", owner: "QA Team", date: "Q3 2026" },
];

export default function PortfolioScreen() {
  const [state, setState] = useState<ScreenState>("default");

  return (
    <div aria-label="Portfolio View Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>📈 Portfolio View</h1>
        <DsIdBadge id="br-ds-portfolio-view" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Giao diện tổng quan dành cho CEO/CTO xem Epic, Budget, và Roadmap chiến lược.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Danh mục Đầu tư (Epics)</h3>
              <button className="btn-primary btn-sm">+ Tạo Epic Mới</button>
            </div>
            
            <div className="data-table-container">
              <table className="data-table" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên Epic</th>
                    <th>Chủ sở hữu</th>
                    <th>Tiến độ</th>
                    <th>Ngân sách</th>
                    <th>Trạng thái</th>
                    <th>Dự kiến</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolios.map(p => (
                    <tr key={p.id} className="data-table__row">
                      <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>{p.id}</td>
                      <td style={{ fontWeight: 500 }}>{p.title}</td>
                      <td>{p.owner}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div className="progress-bar" style={{ width: "60px", height: "6px" }}><div className="progress-bar__fill" style={{ width: `${p.progress}%` }}></div></div>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: "var(--font-mono)" }}>{p.budget}</td>
                      <td><span className={`badge ${p.progress === 0 ? "badge--outline" : p.progress > 80 ? "badge--success" : p.progress < 30 ? "badge--danger" : "badge--warning"}`}>{p.status}</span></td>
                      <td style={{ color: "var(--text-dim)" }}>{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ padding: "20px" }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Roadmap Kế hoạch</h3>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "10px", borderLeft: "1px solid var(--border)", paddingLeft: "20px", position: "relative" }}>
               <div style={{ color: "var(--text-dim)", fontWeight: 600, paddingTop: "10px" }}>Q1 2026</div>
               <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
                  <div style={{ background: "rgba(0,229,255,0.1)", border: "1px solid var(--accent-cyan)", padding: "12px", borderRadius: "6px", width: "40%" }}>
                     <div style={{ fontWeight: 600, color: "var(--accent-cyan)" }}>Phát triển Tính năng Nâng cao</div>
                     <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px" }}>65% Hoàn thành</div>
                  </div>
                  <div style={{ background: "rgba(139,148,158,0.1)", border: "1px solid var(--border)", padding: "12px", borderRadius: "6px", width: "60%" }}>
                     <div style={{ fontWeight: 600, color: "var(--text)" }}>Cải thiện Hiệu năng CSDL</div>
                     <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px" }}>90% Hoàn thành</div>
                  </div>
               </div>
               
               <div style={{ color: "var(--text-dim)", fontWeight: 600, paddingTop: "10px" }}>Q2 2026</div>
               <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
                  <div style={{ background: "rgba(255,166,87,0.1)", border: "1px solid #ffa657", padding: "12px", borderRadius: "6px", width: "80%" }}>
                     <div style={{ fontWeight: 600, color: "#ffa657" }}>Tích hợp AI Agents</div>
                     <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px" }}>Cảnh báo: Bị chậm tiến độ</div>
                  </div>
               </div>

               <div style={{ color: "var(--text-dim)", fontWeight: 600, paddingTop: "10px" }}>Q3 2026</div>
               <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
                  <div style={{ background: "transparent", border: "1px dashed var(--border)", padding: "12px", borderRadius: "6px", width: "50%", opacity: 0.7 }}>
                     <div style={{ fontWeight: 600, color: "var(--text-dim)" }}>Bảo mật & Phân quyền</div>
                     <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px" }}>Chưa bắt đầu</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {state === "loading" && <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}><Skeleton variant="card" /><Skeleton count={3} /></div>}
      {state === "empty" && <EmptyState icon="📈" title="Chưa có dữ liệu Portfolio" desc="Tạo Epic đầu tiên để hiển thị Roadmap." />}
      {state === "error" && <ErrorBanner title="Không thể tải Portfolio" message="API Gateway timeout." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Sync bị gián đoạn<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__title">Yêu cầu quyền Executive</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
