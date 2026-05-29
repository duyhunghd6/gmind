import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import DsIdBadge from "@/components/DsIdBadge";
import { userFlows } from "@/data/design-system-data";

export default function FlowsTab() {
  return (
    <div className="animate-fade-up">
      <SectionLabel text="Luồng Người dùng" accent="rose" />
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <h2>Hành trình Điều hướng</h2>
      </div>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        4 luồng người dùng chính trên website — từ khám phá đến sao chép prompt.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        {userFlows.map((flow) => (
          <div key={flow.name} className="ve-card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.5rem" }}>{flow.icon}</span>
              <h3 style={{ fontSize: "1rem" }}>{flow.name}</h3>
              <DsIdBadge id={`ds:flow:${flow.name === "Luồng 1: Khám phá" ? "explore-001" : flow.name === "Luồng 2: Sao chép Prompt" ? "copy-prompt-001" : flow.name === "Luồng 3: Nghiên cứu" ? "research-001" : "github-visitor-001"}`} />
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
              {flow.path}
            </p>
          </div>
        ))}
      </div>

      <SectionDivider />

      {/* Navigation Map */}
      <SectionLabel text="Bản đồ Điều hướng" accent="cyan" />
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <h2>Cấu trúc Trang</h2>
        <DsIdBadge id="ds:flow:pageStructure-001" />
      </div>

      <div className="path-tree" style={{ textAlign: "center", lineHeight: "1.6" }}>
        <span style={{ color: "var(--accent-cyan)" }}>[Trang chủ]</span>{" · "}
        <span style={{ color: "var(--accent-teal)" }}>[Kiến trúc]</span>{" · "}
        <span style={{ color: "var(--accent-amber)" }}>[Prompts]</span>{" · "}
        <span style={{ color: "var(--accent-rose)" }}>[Nghiên cứu]</span>{" · "}
        <span style={{ color: "var(--text-dim)" }}>[Design System]</span>{" · "}
        <span>[GitHub↗]</span>
        <br /><br />
        <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
          Navbar (cố định trên cùng) → Nội dung trang → Footer (liên kết)
        </span>
      </div>
    </div>
  );
}
