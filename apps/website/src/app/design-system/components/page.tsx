"use client";

import { useState, useEffect } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import TabPanel from "@/components/TabPanel";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { componentSections } from "@/data/components-data";

export default function ComponentsScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [modalOpen, setModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Scroll to hash target (on mount + on hash change) */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const el = document.getElementById(hash);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const sectionTitle = (sec: typeof componentSections[0]) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>{sec.label}</h3>
      <DsIdBadge id={sec.dsId} />
    </div>
  );

  const sec = (id: string) => componentSections.find((s) => s.id === id)!;

  return (
    <div aria-label="Components Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧩 Components Catalog</h1>
        <DsIdBadge id="ds:screen:components-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Tất cả 18 thành phần — tương tác trực tiếp trên showcase.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gap: "32px" }}>
          {/* 1. Buttons */}
          <section id="buttons">
            {sectionTitle(sec("buttons"))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button className="btn-primary">Primary</button>
              <button className="btn-secondary">Secondary</button>
              <button className="btn-danger">Danger</button>
              <button className="btn-primary btn-sm">Small</button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </section>

          {/* 2. Badges */}
          <section id="badges">
            {sectionTitle(sec("badges"))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <span className="badge badge-cyan">Cyan</span>
              <span className="badge badge-teal">Teal</span>
              <span className="badge badge-amber">Amber</span>
              <span className="badge badge-rose">Rose</span>
              <span style={{ margin: "0 8px", color: "var(--border)" }}>|</span>
              <span className="status-label"><span className="status-dot status-dot--online" />Online</span>
              <span className="status-label"><span className="status-dot status-dot--away" />Away</span>
              <span className="status-label"><span className="status-dot status-dot--busy" />Busy</span>
              <span className="status-label"><span className="status-dot status-dot--offline" />Offline</span>
            </div>
          </section>

          {/* 3. Progress Bars */}
          <section id="progress">
            {sectionTitle(sec("progress"))}
            <div style={{ display: "grid", gap: "12px" }}>
              <div className="progress-bar-labeled"><div className="progress-bar"><div className="progress-bar__fill" style={{ width: "75%" }} /></div><span className="progress-bar__label">75%</span></div>
              <div className="progress-bar-labeled"><div className="progress-bar progress-bar--success"><div className="progress-bar__fill" style={{ width: "100%" }} /></div><span className="progress-bar__label">100%</span></div>
              <div className="progress-bar-labeled"><div className="progress-bar progress-bar--warning"><div className="progress-bar__fill" style={{ width: "45%" }} /></div><span className="progress-bar__label">45%</span></div>
              <div className="progress-bar-labeled"><div className="progress-bar progress-bar--indeterminate"><div className="progress-bar__fill" /></div><span className="progress-bar__label">...</span></div>
            </div>
          </section>

          {/* 4. Avatar Stack */}
          <section id="avatar">
            {sectionTitle(sec("avatar"))}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div className="avatar-stack">
                <div className="avatar-stack__item avatar-stack__overflow">+3</div>
                <div className="avatar-stack__item" style={{ background: "#3fb9a0" }}>QA</div>
                <div className="avatar-stack__item" style={{ background: "#d2a8ff", color: "#111" }}>C2</div>
                <div className="avatar-stack__item" style={{ background: "#58a6ff" }}>C1</div>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>4 agents hoạt động</span>
            </div>
          </section>

          {/* 5. Modal */}
          <section id="modal">
            {sectionTitle(sec("modal"))}
            <button className="btn-primary" onClick={() => setModalOpen(true)}>Mở Modal</button>
            <div className={`modal-backdrop${modalOpen ? " modal-backdrop--open" : ""}`} onClick={() => setModalOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header"><span className="modal__title">Xác nhận Phê duyệt</span><button className="modal__close" onClick={() => setModalOpen(false)}>×</button></div>
                <div className="modal__body">Bạn có chắc muốn phê duyệt task <strong>bd-a1b2</strong>? Hành động này không thể hoàn tác.</div>
                <div className="modal__footer"><button className="btn-secondary" onClick={() => setModalOpen(false)}>Hủy</button><button className="btn-primary" onClick={() => setModalOpen(false)}>Phê duyệt</button></div>
              </div>
            </div>
          </section>

          {/* 6. Dropdown */}
          <section id="dropdown">
            {sectionTitle(sec("dropdown"))}
            <div className={`dropdown${dropdownOpen ? " dropdown--open" : ""}`}>
              <button className="btn-secondary dropdown__trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>Menu ▾</button>
              <div className="dropdown__menu">
                <button className="dropdown__item" onClick={() => setDropdownOpen(false)}>📋 Xem chi tiết</button>
                <button className="dropdown__item" onClick={() => setDropdownOpen(false)}>✏️ Chỉnh sửa</button>
                <div className="dropdown__separator" />
                <button className="dropdown__item dropdown__item--danger" onClick={() => setDropdownOpen(false)}>🗑️ Xóa</button>
              </div>
            </div>
          </section>

          {/* 7. Accordion */}
          <section id="accordion">
            {sectionTitle(sec("accordion"))}
            <div className="accordion" style={{ border: "1px solid var(--border)", borderRadius: "8px" }}>
              {[
                { title: "FrankenSQLite là gì?", body: "FrankenSQLite là SQLite build tùy chỉnh cho Gmind, hỗ trợ MVCC, vector embeddings, và Git-lineage tracking. Nó là SSOT cho toàn bộ PM data." },
                { title: "Beads ID hoạt động thế nào?", body: "Mỗi entity (task, plan, commit, PRD section) có một Beads ID duy nhất (format: bd-xxxx). ID này được track qua Git commit trailers và SQL columns." },
                { title: "Agent Village là gì?", body: "Agent Village là mô hình orchestration cho multi-agent: mỗi agent giữ file lease 15 phút, activity được log vào event stream, và Orchestrator phân phối tasks." },
              ].map((item, i) => (
                <div key={i} className={`accordion__item${accordionOpen === i ? " accordion__item--open" : ""}`}>
                  <button className="accordion__trigger" onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}>
                    {item.title}
                    <span className="accordion__chevron">▼</span>
                  </button>
                  <div className="accordion__content"><div className="accordion__body">{item.body}</div></div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Tab Panel */}
          <section id="tabs">
            {sectionTitle(sec("tabs"))}
            <div className="ve-card" style={{ padding: "16px" }}>
              <TabPanel tabs={[
                { id: "overview", label: "Tổng quan", badge: 3, content: <p style={{ color: "var(--text)", fontSize: "0.875rem" }}>Hiển thị tổng quan dự án với 3 thông báo mới.</p> },
                { id: "details", label: "Chi tiết", content: <p style={{ color: "var(--text)", fontSize: "0.875rem" }}>Thông số kỹ thuật và cấu hình hệ thống.</p> },
                { id: "locked", label: "Bị khóa", disabled: true, content: <div /> },
              ]} />
            </div>
          </section>

          {/* 9. Data Table */}
          <section id="table">
            {sectionTitle(sec("table"))}
            <table className="data-table">
              <thead><tr><th>ID</th><th>Task</th><th>Agent</th><th>Priority</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>bd-a1b2</td><td>MVCC Layer</td><td>Claude-01</td><td><span className="badge badge-rose">P0</span></td><td><span className="status-label"><span className="status-dot status-dot--online" />Active</span></td></tr>
                <tr><td style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>bd-c3d4</td><td>Schema Migration</td><td>Claude-02</td><td><span className="badge badge-amber">P1</span></td><td><span className="status-label"><span className="status-dot status-dot--away" />Review</span></td></tr>
                <tr><td style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>bd-e5f6</td><td>CLI Gateway</td><td>Claude-03</td><td><span className="badge badge-teal">P2</span></td><td><span className="status-label"><span className="status-dot status-dot--offline" />Done</span></td></tr>
              </tbody>
            </table>
          </section>

          {/* 10. Tooltip */}
          <section id="tooltip">
            {sectionTitle(sec("tooltip"))}
            <div style={{ display: "flex", gap: "32px", padding: "24px 0" }}>
              <span className="tooltip-trigger">
                <button className="btn-secondary">Hover (Top)</button>
                <span className="tooltip tooltip--top">Tooltip phía trên</span>
              </span>
              <span className="tooltip-trigger">
                <button className="btn-secondary">Hover (Bottom)</button>
                <span className="tooltip tooltip--bottom">Tooltip phía dưới</span>
              </span>
              <span className="tooltip-trigger">
                <button className="btn-primary">Beads ID</button>
                <span className="tooltip tooltip--top">bd-a1b2 — MVCC Layer</span>
              </span>
            </div>
          </section>

          {/* 11. Code Block */}
          <section id="codeblock">
            {sectionTitle(sec("codeblock"))}
            <div className="code-block">
              <button
                className={`copy-btn${copied ? " copied" : ""}`}
                onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
              <pre style={{ margin: 0 }}>{`$ bd create "Implement MVCC" --type=task
  → Created bd-a1b2 (task)
  → Linked to plan bd-p001

$ bd status bd-a1b2
  Type:   task
  Status: in-progress
  Agent:  Claude-01`}</pre>
            </div>
          </section>

          {/* 12. Cards */}
          <section id="cards">
            {sectionTitle(sec("cards"))}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div className="ve-card" style={{ padding: "16px" }}>
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "8px" }}>Base Card</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Default card with hover effect</p>
              </div>
              <div className="ve-card ve-card--hero" style={{ padding: "16px" }}>
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "8px" }}>Hero Card</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Elevated with glow border</p>
              </div>
              <div className="ve-card ve-card--pillar accent-cyan" style={{ padding: "16px" }}>
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "8px" }}>Pillar Cyan</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Left accent border</p>
              </div>
              <div className="ve-card ve-card--pillar accent-rose" style={{ padding: "16px" }}>
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "8px" }}>Pillar Rose</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Critical accent</p>
              </div>
            </div>
          </section>

          {/* 13. Prompt Card */}
          <section id="promptcard">
            {sectionTitle(sec("promptcard"))}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div className="prompt-card">
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px" }}>🔍 Code Search</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Tìm implementation của MVCC trong FrankenSQLite</p>
              </div>
              <div className="prompt-card">
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px" }}>📋 Sprint Summary</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Tổng hợp các task hoàn thành trong sprint hiện tại</p>
              </div>
              <div className="prompt-card disabled" aria-disabled="true">
                <h4 style={{ color: "var(--text)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px" }}>🔒 Admin Only</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Cần quyền admin để sử dụng</p>
              </div>
            </div>
          </section>

          {/* 14. Section Labels */}
          <section id="labels">
            {sectionTitle(sec("labels"))}
            <div style={{ display: "grid", gap: "12px" }}>
              <span className="section-label accent-cyan">Architecture</span>
              <span className="section-label accent-teal">Implementation</span>
              <span className="section-label accent-amber">Review Required</span>
              <span className="section-label accent-rose">Critical Path</span>
            </div>
          </section>

          {/* 15. Status Dots */}
          <section id="statusdot">
            {sectionTitle(sec("statusdot"))}
            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <span className="status-label"><span className="status-dot status-dot--online" />Online</span>
              <span className="status-label"><span className="status-dot status-dot--away" />Away</span>
              <span className="status-label"><span className="status-dot status-dot--busy" />Busy</span>
              <span className="status-label"><span className="status-dot status-dot--offline" />Offline</span>
              <span style={{ margin: "0 8px", color: "var(--border)" }}>|</span>
              <span className="status-label"><span className="status-dot status-dot--online status-dot--lg" />Large Online</span>
              <span className="status-label"><span className="status-dot status-dot--busy status-dot--lg" />Large Busy</span>
            </div>
          </section>

          {/* 16. Skeleton */}
          <section id="skeleton">
            {sectionTitle(sec("skeleton"))}
            <div style={{ display: "grid", gap: "16px" }}>
              <div><span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "4px", display: "block" }}>Text skeleton:</span><Skeleton variant="text" /></div>
              <div><span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "4px", display: "block" }}>Bar skeleton:</span><Skeleton variant="bar" width="200px" /></div>
              <div><span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "4px", display: "block" }}>Card skeleton:</span><Skeleton variant="card" /></div>
            </div>
          </section>

          {/* 17. Empty State */}
          <section id="emptystate">
            {sectionTitle(sec("emptystate"))}
            <EmptyState icon="📭" title="Không có dữ liệu" desc="Chưa có items nào trong danh sách. Thêm item đầu tiên để bắt đầu." />
          </section>

          {/* 18. Error Banner */}
          <section id="errorbanner">
            {sectionTitle(sec("errorbanner"))}
            <ErrorBanner title="Database Connection Failed" message="Could not connect to FrankenSQLite — MVCC lock timeout after 30s. Retry or check server logs." onRetry={() => {}} />
          </section>
        </div>
      )}

      {state === "loading" && <div style={{ display: "grid", gap: "24px" }}>{[1, 2, 3].map(i => <div key={i}><Skeleton variant="bar" width="120px" /><div style={{ marginTop: "8px" }}><Skeleton variant="card" /></div></div>)}</div>}
      {state === "empty" && <EmptyState icon="🧩" title="Không có components" desc="Registry trống. Chạy seed script để tạo components mẫu." />}
      {state === "error" && <ErrorBanner title="Lỗi tải components" message="Failed to read registry.json — invalid JSON format" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Đang offline — một số components có thể không render đúng<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Không có quyền</div><div className="forbidden-gate__desc">Design System chỉ dành cho Developers.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
