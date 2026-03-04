import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import { colorTokens, spacingTokens, typographyTokens, animationTokens } from "@/data/design-system-data";

export default function TokensTab() {
  return (
    <div className="animate-fade-up">
      {/* Colors */}
      <div id="colors">
      <SectionLabel text="Bảng Màu" accent="cyan" />
      <h2 style={{ marginBottom: "16px" }}>Màu sắc</h2>
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        {colorTokens.map((token) => (
          <div key={token.name} className="ve-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ height: "48px", background: token.value, borderBottom: "1px solid var(--border)" }} />
            <div style={{ padding: "12px 16px" }}>
              <code style={{ fontSize: "0.8rem" }}>{token.name}</code>
              <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>
                {token.label} · <span style={{ fontFamily: "var(--font-mono)" }}>{token.value}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>

      <SectionDivider />

      {/* Spacing */}
      <div id="spacing">
      <SectionLabel text="Khoảng cách" accent="teal" />
      <h2 style={{ marginBottom: "16px" }}>Thang Khoảng cách</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        {spacingTokens.map((token) => (
          <div key={token.name} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <code style={{ fontSize: "0.8rem", width: "120px", flexShrink: 0 }}>{token.name}</code>
            <div style={{ width: token.value, height: "24px", background: "var(--accent-cyan)", borderRadius: "4px", opacity: 0.6 }} />
            <span style={{ color: "var(--text-dim)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>{token.value}</span>
          </div>
        ))}
      </div>
      </div>

      <SectionDivider />

      {/* Typography */}
      <div id="typography">
      <SectionLabel text="Kiểu chữ" accent="amber" />
      <h2 style={{ marginBottom: "16px" }}>Font</h2>
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        {typographyTokens.map((token) => (
          <div key={token.name} className="ve-card">
            <code style={{ fontSize: "0.8rem" }}>{token.name}</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: "4px", marginBottom: "12px" }}>{token.value}</p>
            <p style={{ fontFamily: token.value, fontSize: "1.5rem" }}>{token.sample}</p>
          </div>
        ))}
      </div>
      </div>

      <SectionDivider />

      {/* Animations */}
      <div id="animations">
      <SectionLabel text="Hoạt ảnh" accent="rose" />
      <h2 style={{ marginBottom: "16px" }}>Hiệu ứng Chuyển động</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr>
              {["Tên", "Thời lượng", "Easing", "Công dụng"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--border-highlight)", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {animationTokens.map((a) => (
              <tr key={a.name} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 14px" }}><code>{a.name}</code></td>
                <td style={{ padding: "10px 14px", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{a.duration}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{a.easing}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-dim)" }}>{a.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionDivider />

      {/* Utilities */}
      <SectionLabel text="Tiện ích" accent="cyan" />
      <h2 style={{ marginBottom: "16px" }}>Token Khác</h2>
      <div className="grid-3">
        <div className="ve-card">
          <code>--radius</code>
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>6px — Bo góc mặc định</p>
          <div style={{ width: "60px", height: "60px", background: "var(--accent-cyan)", borderRadius: "6px", marginTop: "12px", opacity: 0.5 }} />
        </div>
        <div className="ve-card">
          <code>--radius-lg</code>
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>12px — Bo góc lớn</p>
          <div style={{ width: "60px", height: "60px", background: "var(--accent-teal)", borderRadius: "12px", marginTop: "12px", opacity: 0.5 }} />
        </div>
        <div className="ve-card">
          <code>--shadow-card</code>
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>Đổ bóng thẻ</p>
          <div style={{ width: "60px", height: "60px", background: "var(--surface-elevated)", borderRadius: "6px", marginTop: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }} />
        </div>
      </div>
      </div>
    </div>
  );
}
