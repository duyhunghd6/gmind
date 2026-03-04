import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import CodeBlock from "@/components/CodeBlock";
import { stateMatrix } from "@/data/design-system-data";

export default function StatesTab() {
  return (
    <div className="animate-fade-up">
      <SectionLabel text="Ma trận Trạng thái" accent="amber" />
      <h2 style={{ marginBottom: "8px" }}>Trạng thái Thành phần</h2>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Mỗi thành phần có các trạng thái tương tác khác nhau: Mặc định, Di chuột, và Nhấn/Sao chép.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr>
              {["Thành phần", "Mặc định", "Di chuột", "Nhấn / Sao chép"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 14px", borderBottom: "2px solid var(--border-highlight)", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stateMatrix.map((row) => (
              <tr key={row.component} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 14px", fontWeight: 500 }}><code>{row.component}</code></td>
                <td style={{ padding: "12px 14px", color: "var(--text-dim)" }}>{row.states["Mặc định"]}</td>
                <td style={{ padding: "12px 14px", color: "var(--text-dim)" }}>{row.states["Di chuột"]}</td>
                <td style={{ padding: "12px 14px", color: "var(--text-dim)" }}>{row.states["Nhấn/Sao chép"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionDivider />

      <SectionLabel text="Token CSS đặc trưng" accent="teal" />
      <h2 style={{ marginBottom: "16px" }}>Cách Sử dụng Token</h2>
      <CodeBlock
        code={`.ve-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  transition:
    border-color var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.ve-card:hover {
  border-color: var(--border-highlight);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}`}
        title="VÍ DỤ: VE-CARD"
        language="css"
      />
    </div>
  );
}
