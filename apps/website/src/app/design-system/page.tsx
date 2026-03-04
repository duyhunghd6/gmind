import Link from "next/link";
import TokensTab from "./TokensTab";
import ComponentsTab from "./ComponentsTab";
import StatesTab from "./StatesTab";
import FlowsTab from "./FlowsTab";
import DsIdBadge from "@/components/DsIdBadge";
import { SCREEN_ID_MAP } from "@/data/ds-registry";

const screens = [
  { href: "/design-system/terminal", title: "Terminal", icon: "💻", desc: "Cửa sổ terminal — title bar, ANSI colors, cursor blink, mosaic layout" },
  { href: "/design-system/git-graph", title: "Đồ thị Git", icon: "🌿", desc: "Trực quan nhánh Git — SVG commit graph, branch colors, tag badges" },
  { href: "/design-system/kanban", title: "Kanban Board", icon: "📋", desc: "Bảng quản trị dự án — drag columns, card stack, WIP limits" },
  { href: "/design-system/knowledge-graph", title: "Knowledge Graph", icon: "🧠", desc: "Đồ thị tri thức Sigma.js — force-directed, PRD → Task → Commit" },
  { href: "/design-system/approval", title: "Phê duyệt & RTM", icon: "✅", desc: "Approval Panel, Requirements Traceability Matrix, Coverage Heatmap" },
  { href: "/design-system/timeline", title: "Timeline", icon: "📅", desc: "Nhật ký hoạt động — event feed, File Lease, alternating timeline" },
  { href: "/design-system/components", title: "Components", icon: "🧩", desc: "Thành phần cơ bản — Card, Button, Badge, Modal, Accordion, DataTable" },
  { href: "/design-system/doc-viewer", title: "Doc Viewer", icon: "📄", desc: "File browser kiểu GitHub — duyệt PRDs, ADRs, Spikes với Beads ID links" },
  { href: "/design-system/explorer", title: "Gmind Explorer", icon: "🔍", desc: "Tìm kiếm thống nhất — docs, commits, tasks, ADR, agent chats" },
  { href: "/design-system/beads-traversal", title: "Beads Traversal", icon: "🔗", desc: "Universal ID — chuỗi liên kết PRD ↔ Plan ↔ Task ↔ Commit" },
  { href: "/design-system/storyboard", title: "Storyboard", icon: "🗺️", desc: "24 use cases trên 6 hành trình — PM, Dev, QA, Architect, Release, Bug" },
];

export default function DesignSystemHub() {
  return (
    <div aria-label="Design System Hub">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)" }}>
          Hệ thống Thiết kế Gmind
        </h1>
        <DsIdBadge id="ds:hub:overview-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.9375rem", marginBottom: "32px", maxWidth: "600px", lineHeight: 1.6 }}>
        Mỗi screen là một showcase tương tác riêng biệt với <strong>6 trạng thái</strong> (Mặc định / Đang tải / Trống / Lỗi / Ngoại tuyến / Cấm). Click để khám phá.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {screens.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <div className="ve-card" style={{ cursor: "pointer", height: "100%", transition: "transform 150ms, border-color 150ms" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                {SCREEN_ID_MAP[s.href] && (
                  <DsIdBadge id={SCREEN_ID_MAP[s.href]} />
                )}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>{s.title}</h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ---- Tokens ---- */}
      <section id="tokens">
        <TokensTab />
      </section>

      {/* ---- Components & Layouts ---- */}
      <section id="components">
        <ComponentsTab />
      </section>

      {/* ---- States ---- */}
      <section id="states">
        <StatesTab />
      </section>

      {/* ---- Flows ---- */}
      <section id="flows">
        <FlowsTab />
      </section>
    </div>
  );
}
