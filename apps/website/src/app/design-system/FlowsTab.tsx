import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import { userFlows } from "@/data/design-system-data";

export default function FlowsTab() {
  return (
    <div className="animate-fade-up">
      <SectionLabel text="Luồng Người dùng" accent="rose" />
      <h2 style={{ marginBottom: "8px" }}>Hành trình Điều hướng</h2>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        4 luồng người dùng chính trên website — từ khám phá đến sao chép prompt.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        {userFlows.map((flow) => (
          <div key={flow.name} className="ve-card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.5rem" }}>{flow.icon}</span>
              <h3 style={{ fontSize: "1rem" }}>{flow.name}</h3>
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
      <h2 style={{ marginBottom: "16px" }}>Cấu trúc Trang</h2>

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
