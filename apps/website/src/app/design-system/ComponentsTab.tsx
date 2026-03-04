"use client";

import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import PillarCard from "@/components/PillarCard";
import CodeBlock from "@/components/CodeBlock";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Tooltip from "@/components/Tooltip";

export default function ComponentsTab() {
  return (
    <div className="animate-fade-up">
      {/* Cards */}
      <SectionLabel text="Thẻ (Cards)" accent="cyan" />
      <h2 style={{ marginBottom: "16px" }}>Các biến thể Thẻ</h2>
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>.ve-card</p>
          <div className="ve-card">
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Thẻ Tiêu chuẩn</h3>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Di chuột để xem hiệu ứng hover: viền sáng, nâng lên, đổ bóng.</p>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>.ve-card.ve-card--hero</p>
          <div className="ve-card ve-card--hero">
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Thẻ Hero</h3>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Nền nổi, viền highlight, đổ bóng hero. Không có hiệu ứng nâng khi hover.</p>
          </div>
        </div>
      </div>

      {/* Pillar Cards */}
      <SectionLabel text="Thẻ Trụ cột" accent="teal" />
      <h2 style={{ marginBottom: "16px" }}>PillarCard — 4 Biến thể Màu</h2>
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        <PillarCard accent="cyan" label="accent=cyan" title="Trí tuệ Mã nguồn" description="Viền trái cyan, nhãn cyan" codeSnippets={["gmind search-codebase"]} />
        <PillarCard accent="teal" label="accent=teal" title="Theo dõi SSOT" description="Viền trái teal, nhãn teal" codeSnippets={["Beads-ID:"]} />
        <PillarCard accent="amber" label="accent=amber" title="Xác minh SAFe" description="Viền trái amber, nhãn amber" codeSnippets={["CI/CD Gate"]} />
        <PillarCard accent="rose" label="accent=rose" title="Hệ sinh thái" description="Viền trái rose, nhãn rose" codeSnippets={["mcp_agent_mail"]} />
      </div>

      <SectionDivider />

      {/* Buttons */}
      <SectionLabel text="Nút (Buttons)" accent="cyan" />
      <h2 style={{ marginBottom: "16px" }}>Button — 3 Biến thể</h2>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
        <Button variant="primary">Nút Chính</Button>
        <Button variant="secondary">Nút Phụ</Button>
        <Button variant="danger">Nút Nguy hiểm</Button>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>Kích thước nhỏ (btn-sm) + Disabled</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
        <Button variant="primary" size="sm">Nhỏ Primary</Button>
        <Button variant="secondary" size="sm">Nhỏ Secondary</Button>
        <Button variant="primary" disabled>Đã vô hiệu</Button>
        <Button variant="danger" disabled>Danger Disabled</Button>
      </div>

      <SectionDivider />

      {/* Badges */}
      <SectionLabel text="Nhãn trạng thái (Badge)" accent="teal" />
      <h2 style={{ marginBottom: "16px" }}>Badge — 4 Biến thể Màu</h2>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
        <Badge accent="cyan">Hoạt động</Badge>
        <Badge accent="teal">Hoàn thành</Badge>
        <Badge accent="amber">Đang chờ</Badge>
        <Badge accent="rose">Lỗi</Badge>
      </div>

      <SectionDivider />

      {/* Tooltip */}
      <SectionLabel text="Chú thích (Tooltip)" accent="amber" />
      <h2 style={{ marginBottom: "16px" }}>Tooltip — CSS-only Hover</h2>
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "32px", paddingTop: "48px" }}>
        <Tooltip text="Chú thích phía trên" position="top">
          <Button variant="secondary">Di chuột (trên)</Button>
        </Tooltip>
        <Tooltip text="Chú thích phía dưới" position="bottom">
          <Button variant="secondary">Di chuột (dưới)</Button>
        </Tooltip>
      </div>

      <SectionDivider />

      {/* Labels & Dividers */}
      <SectionLabel text="Nhãn & Phân cách" accent="amber" />
      <h2 style={{ marginBottom: "16px" }}>SectionLabel — 4 Biến thể</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
        <SectionLabel text="Nhãn mặc định (cyan)" />
        <SectionLabel text="Nhãn teal" accent="teal" />
        <SectionLabel text="Nhãn amber" accent="amber" />
        <SectionLabel text="Nhãn rose" accent="rose" />
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>SectionDivider</p>
      <SectionDivider />

      {/* Code Block */}
      <SectionLabel text="Khối Mã nguồn" accent="cyan" />
      <h2 style={{ marginBottom: "16px" }}>CodeBlock — Nút Sao chép</h2>
      <CodeBlock
        code={`# Ví dụ: Agent gọi gmind trước khi sửa code
gmind search-codebase "cách auth middleware hoạt động?"
gmind context br-123 --depth 0
gmind trace bd-x1y2`}
        title="CODE BLOCK VÍ DỤ"
      />

      <div style={{ marginTop: "32px" }} />

      {/* Prompt Card */}
      <SectionLabel text="Thẻ Prompt" accent="teal" />
      <h2 style={{ marginBottom: "16px" }}>PromptCard</h2>
      <div className="prompt-card" style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-teal)", background: "var(--accent-teal-dim)", padding: "4px 10px", borderRadius: "4px" }}>
            quy trình
          </span>
          <h3 style={{ fontSize: "1.1rem" }}>Ví dụ Prompt Card</h3>
        </div>
        <p style={{ color: "var(--text-dim)", marginBottom: "8px" }}>Di chuột để xem gradient trên cùng xuất hiện và thẻ nâng lên.</p>
      </div>

      <SectionDivider />

      {/* Layout Grid */}
      <SectionLabel text="Bố cục Lưới" accent="amber" />
      <h2 style={{ marginBottom: "16px" }}>Grid-2, Grid-3, Glassmorphism</h2>
      <div className="grid-3" style={{ marginBottom: "24px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="ve-card" style={{ textAlign: "center" }}>
            <code>.grid-3</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>Ô {i}/3</p>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        {[1, 2].map((i) => (
          <div key={i} className="ve-card" style={{ textAlign: "center" }}>
            <code>.grid-2</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>Ô {i}/2</p>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>.glass (Glassmorphism)</p>
      <div className="glass" style={{ padding: "24px", borderRadius: "var(--radius-lg)", marginBottom: "16px" }}>
        <p>Hiệu ứng kính mờ (backdrop-filter: blur) — dùng cho Navbar.</p>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-teal)", marginBottom: "8px" }}>.path-tree</p>
      <div className="path-tree">
        <strong>/gmind/</strong><br />
        ├── <strong>apps/</strong> <span style={{ color: "var(--accent-teal)" }}>// Ứng dụng</span><br />
        ├── <strong>packages/</strong> <span style={{ color: "var(--accent-amber)" }}>// Thư viện</span><br />
        └── <strong>docs/</strong> <span style={{ color: "var(--text-dim)" }}>// Tài liệu</span>
      </div>
    </div>
  );
}
