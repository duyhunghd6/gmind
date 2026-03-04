import { promptTemplates } from "@/data/prompts-data";
import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "Prompts & Quy trình — Gmind",
  description: "Bộ sưu tập Mẫu Prompt và Quy tắc Quy trình Agent cho nền tảng Agentic SE Gmind. Sao chép và sử dụng ngay.",
};

export default function PromptsPage() {
  const workflows = promptTemplates.filter((p) => p.category === "workflow");
  const agentRules = promptTemplates.filter((p) => p.category === "agent-rule");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      <header className="animate-fade-up">
        <SectionLabel text="Nhà máy Prompts & Quy trình" />
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>
          Mẫu Prompt cho Agent
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", maxWidth: "700px", marginBottom: "2rem" }}>
          Bộ sưu tập prompt, quy trình, và quy tắc agent được sử dụng bởi Gmind.
          Mỗi mẫu sao chép ngay — nhấn <strong>&ldquo;Sao chép&rdquo;</strong> để áp dụng tức thì.
        </p>
      </header>

      {/* Phần Quy trình */}
      <section className="animate-fade-up delay-1">
        <SectionLabel text="Quy trình" accent="teal" />
        <h2 style={{ marginBottom: "16px" }}>Quy trình SAFe 6.0</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {workflows.map((prompt) => (
            <div key={prompt.id} className="prompt-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent-teal)",
                    background: "var(--accent-teal-dim)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                  }}
                >
                  quy trình
                </span>
                <h3 style={{ fontSize: "1.1rem" }}>{prompt.name}</h3>
              </div>
              <p style={{ color: "var(--text-dim)", marginBottom: "12px" }}>{prompt.description}</p>
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "16px" }}>
                <strong style={{ color: "var(--accent-cyan)" }}>Cách dùng:</strong> {prompt.usage}
              </p>
              <CodeBlock code={prompt.code} title={prompt.name} />
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Phần Quy tắc Agent */}
      <section className="animate-fade-up delay-2">
        <SectionLabel text="Quy tắc Agent & Lệnh CLI" accent="amber" />
        <h2 style={{ marginBottom: "16px" }}>Quy tắc Thực thi</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Mọi AI Agent hoạt động trong Gmind phải tuân thủ các quy tắc này.
          Chúng đảm bảo tính nhất quán, truy vết được, và Nguyên tắc Bốn Mắt.
        </p>

        <div className="grid-2">
          {agentRules.map((prompt) => (
            <div key={prompt.id} className="prompt-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent-amber)",
                    background: "var(--accent-amber-dim)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                  }}
                >
                  quy tắc
                </span>
                <h3 style={{ fontSize: "1rem" }}>{prompt.name}</h3>
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "12px" }}>{prompt.description}</p>
              <CodeBlock code={prompt.code} title={prompt.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
