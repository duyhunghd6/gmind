import Link from "next/link";

const screens = [
  { href: "/design-system/terminal", title: "Terminal", icon: "💻", desc: "Cửa sổ terminal — title bar, ANSI colors, cursor blink, mosaic layout" },
  { href: "/design-system/git-graph", title: "Đồ thị Git", icon: "🌿", desc: "Trực quan nhánh Git — SVG commit graph, branch colors, tag badges" },
  { href: "/design-system/kanban", title: "Kanban Board", icon: "📋", desc: "Bảng quản trị dự án — drag columns, card stack, WIP limits" },
  { href: "/design-system/knowledge-graph", title: "Knowledge Graph", icon: "🧠", desc: "Đồ thị tri thức D3.js — force-directed, PRD → Task → Commit nodes" },
  { href: "/design-system/approval", title: "Phê duyệt & RTM", icon: "✅", desc: "Approval Panel, Requirements Traceability Matrix, Coverage Heatmap" },
  { href: "/design-system/timeline", title: "Timeline", icon: "📅", desc: "Nhật ký hoạt động — event feed, File Lease, alternating timeline" },
  { href: "/design-system/components", title: "Components", icon: "🧩", desc: "Thành phần cơ bản — Card, Button, Badge, Modal, Accordion, DataTable" },
];

export default function DesignSystemHub() {
  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>
        Hệ thống Thiết kế Gmind
      </h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.9375rem", marginBottom: "32px", maxWidth: "600px", lineHeight: 1.6 }}>
        Mỗi screen là một showcase tương tác riêng biệt với <strong>6 trạng thái</strong> (Mặc định / Đang tải / Trống / Lỗi / Ngoại tuyến / Cấm). Click để khám phá.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {screens.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{ textDecoration: "none" }}
          >
            <div className="ve-card" style={{ cursor: "pointer", height: "100%", transition: "transform 150ms, border-color 150ms" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
