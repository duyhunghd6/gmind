import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Kiến trúc — Gmind",
  description:
    "Kiến trúc Agentic Software Engineering: gmind là tầng Agent Memory Layer kết nối Agentic IDE, GSAFe 6.0 Workflow, Codebase, và LLM.",
};

/* ───── Flow Diagram Data ───── */
const flowNodes = [
  {
    id: "expert",
    emoji: "👨‍💻",
    title: "Agentic Coding Expert",
    subtitle: "Human Developer",
    desc: "Ra yêu cầu, phê duyệt kết quả, quyết định kiến trúc. Giữ quyền L3 Approval tại mọi ranh giới giai đoạn.",
    accent: "--accent-rose",
  },
  {
    id: "ide",
    emoji: "⚡",
    title: "Agentic IDE",
    subtitle: "Cursor · Windsurf · Kilo Code",
    desc: "Giao diện coding tích hợp AI Agent. IDE gửi yêu cầu tới Agent, Agent gọi gmind để lấy ngữ cảnh trước khi sinh code.",
    accent: "--accent-amber",
  },
  {
    id: "gsafe",
    emoji: "🔄",
    title: "AgenticSE GSAFe 6.0 Workflow",
    subtitle: "CE → PI Planning → Execution → Verification",
    desc: "Quy trình phát triển phần mềm có cấu trúc: Spike Research → PRD → Plan → Task Decomposition → Code → CI/CD Gate. Nguyên tắc Bốn Mắt và Escalation 5 cấp.",
    accent: "--accent-teal",
  },
  {
    id: "gmind",
    emoji: "🧠",
    title: "gmind — Agent Memory Layer",
    subtitle: "Context Gateway · Knowledge Graph · Universal Tracking",
    desc: "Tầng trung tâm: thu thập, tổng hợp, và tối ưu ngữ cảnh từ toàn bộ hệ thống. Agent chỉ cần gọi gmind — không truy cập trực tiếp bất kỳ nguồn dữ liệu nào.",
    accent: "--accent-cyan",
    isCenter: true,
    commands: ["search-codebase", "context", "trace", "coverage", "gaps", "impact", "escalate"],
  },
];

const bottomNodes = [
  {
    id: "codebase",
    emoji: "💾",
    title: "Codebase & Storage",
    items: [
      "FrankenSQLite — State SSOT (MVCC)",
      "Zvec — Semantic Search (Docs/Chat)",
      "FastCode — AST Code Intelligence",
      "Git + GitHub — VCS & CI/CD",
      "JSONL — Git-synced backup",
    ],
    accent: "--accent-cyan",
  },
  {
    id: "llm",
    emoji: "🤖",
    title: "LLM Providers",
    items: [
      "Gemini 3 Pro — Primary reasoning",
      "Claude 4 — Code generation",
      "GPT-4.1 — Specialized tasks",
      "Routing: gmind tối ưu prompt & context window",
      "Token optimization: TOON format nén 40%",
    ],
    accent: "--accent-amber",
  },
];



/* ───── Arrow Component ───── */
function FlowArrow({ color = "var(--accent-teal)", bidirectional = true }: { color?: string; bidirectional?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color,
        fontSize: "1.2rem",
        lineHeight: 1,
        opacity: 0.7,
      }}>
        {bidirectional && <span>↑</span>}
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>│</span>
        <span>↓</span>
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* Hero */}
      <header className="animate-fade-up">
        <SectionLabel text="Agentic Software Engineering · Architecture" />
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>
          Kiến trúc Agentic SE
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", maxWidth: "750px", marginBottom: "2rem" }}>
          <strong>gmind</strong> là <em>Agent Memory Layer</em> — tầng trung tâm kết nối
          Agentic Coding Expert, GSAFe 6.0 Workflow, Codebase, và LLM.
          Mọi ngữ cảnh đều đi qua gmind trước khi đến AI Agent.
        </p>
      </header>

      {/* ═══ Agentic SE Flow Diagram ═══ */}
      <section className="animate-fade-up delay-1">
        <SectionLabel text="Sơ đồ Kiến trúc Tổng thể" accent="cyan" />
        <h2 style={{ marginBottom: "24px" }}>Luồng Agentic Software Engineering</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Top flow nodes: Expert → IDE → GSAFe → gmind */}
          {flowNodes.map((node, idx) => (
            <div key={node.id}>
              <div
                className="ve-card"
                style={{
                  borderLeft: node.isCenter ? `4px solid var(${node.accent})` : `3px solid var(${node.accent})`,
                  ...(node.isCenter ? {
                    background: `var(${node.accent}-dim)`,
                    border: `2px solid var(${node.accent})`,
                    borderRadius: "12px",
                    padding: "20px 24px",
                  } : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{node.emoji}</span>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "2px" }}>{node.title}</h3>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: `var(${node.accent})`,
                    }}>
                      {node.subtitle}
                    </span>
                  </div>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: node.commands ? "12px" : "0" }}>
                  {node.desc}
                </p>
                {node.commands && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {node.commands.map((cmd) => (
                      <code
                        key={cmd}
                        style={{
                          fontSize: "0.75rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "var(--bg-card)",
                          color: `var(${node.accent})`,
                          border: `1px solid var(${node.accent})`,
                        }}
                      >
                        gmind {cmd}
                      </code>
                    ))}
                  </div>
                )}
              </div>
              {idx < flowNodes.length - 1 && (
                <FlowArrow color={`var(${flowNodes[idx + 1].accent})`} />
              )}
            </div>
          ))}

          {/* Fork arrow: gmind → codebase + LLM */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "12px",
            alignItems: "start",
            marginTop: "4px",
          }}>
            {/* Left: arrow down to codebase */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FlowArrow color="var(--accent-cyan)" />
              <div
                className="ve-card"
                style={{ borderLeft: "3px solid var(--accent-cyan)", width: "100%" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{bottomNodes[0].emoji}</span>
                  <h3 style={{ fontSize: "1rem" }}>{bottomNodes[0].title}</h3>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {bottomNodes[0].items.map((item, i) => (
                    <li key={i} style={{
                      color: "var(--text-dim)",
                      fontSize: "0.85rem",
                      padding: "2px 0 2px 14px",
                      position: "relative",
                    }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--accent-cyan)" }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Center spacer */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "40px",
              color: "var(--text-dim)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              writingMode: "vertical-rl",
              opacity: 0.5,
            }}>
              ←── gmind queries ──→
            </div>

            {/* Right: arrow down to LLM */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FlowArrow color="var(--accent-amber)" />
              <div
                className="ve-card"
                style={{ borderLeft: "3px solid var(--accent-amber)", width: "100%" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{bottomNodes[1].emoji}</span>
                  <h3 style={{ fontSize: "1rem" }}>{bottomNodes[1].title}</h3>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {bottomNodes[1].items.map((item, i) => (
                    <li key={i} style={{
                      color: "var(--text-dim)",
                      fontSize: "0.85rem",
                      padding: "2px 0 2px 14px",
                      position: "relative",
                    }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--accent-amber)" }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ Gmind Architecture Diagram ═══ */}
      <section className="animate-fade-up delay-2">
        <SectionLabel text="Sơ đồ Kiến trúc Chi tiết" />
        <h2 style={{ marginBottom: "0.5rem" }}>Gmind — Agent Memory Layer</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "8px" }}>
          gmind là tầng trung tâm kết nối Coding IDE, LLM, GitHub, Vector Search (Zvec),
          GraphRAG (FastCode), và Beads (FrankenSQLite). Mọi luồng dữ liệu đều đi qua gmind.
        </p>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "24px", fontStyle: "italic" }}>
          Mũi tên chuyển động thể hiện hướng luồng dữ liệu thực tế trong hệ thống.
        </p>

        <div style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <object
            type="image/svg+xml"
            data="/images/gmind-architecture.svg"
            aria-label="Gmind Architecture — Agent Memory Layer kết nối Coding IDE, GitHub, Zvec, FastCode, Beads, và LLM"
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          >
            Gmind Architecture Diagram
          </object>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ Monorepo Directory Structure ═══ */}
      <section className="animate-fade-up">
        <SectionLabel text="Monorepo Đa ngôn ngữ" accent="cyan" />
        <h2 style={{ marginBottom: "0.5rem" }}>Cấu trúc Thư mục</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "16px" }}>
          Go (<code>go.work</code>) · Rust (<code>Cargo.toml</code>) · TypeScript (<code>pnpm-workspace.yaml</code>).
          Điều phối bởi <strong>Turborepo</strong>.
        </p>

        <div className="grid-2" style={{ alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-cyan)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>cli/</code> — gmind Context Layer
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>gmind/</code> Go CLI (Cổng Ngữ cảnh) · <code>beads_rust/</code> Issue Tracker (Rust) · <code>mcp_mail/</code> Agent Coordination
              </p>
            </div>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-teal)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>apps/</code> — Ứng dụng Web
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>website/</code> Showcase Next.js (Vercel) · <code>webui/</code> PM Dashboard (RTM, SAFe views)
              </p>
            </div>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-amber)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>packages/</code> — Thư viện Chia sẻ
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>design-system/</code> UI Tokens · <code>fastcode/</code> AST Engine · <code>core-types/</code> Shared DTOs
              </p>
            </div>
          </div>

          <div className="path-tree">
            <strong>/gmind/</strong><br />
            ├── <strong>cli/</strong> <span style={{ color: "var(--accent-cyan)" }}>⬡ Middle Layer</span><br />
            │ &nbsp;&nbsp;├── gmind/ <span style={{ color: "var(--accent-cyan)" }}>// Go Context Gateway</span><br />
            │ &nbsp;&nbsp;├── beads_rust/ <span style={{ color: "var(--accent-cyan)" }}>// Rust Issue Tracker</span><br />
            │ &nbsp;&nbsp;└── mcp_mail/ <span style={{ color: "var(--accent-cyan)" }}>// Agent Coordination</span><br />
            ├── <strong>apps/</strong><br />
            │ &nbsp;&nbsp;├── website/ <span style={{ color: "var(--accent-teal)" }}>// Showcase (Vercel)</span><br />
            │ &nbsp;&nbsp;└── webui/ <span style={{ color: "var(--accent-teal)" }}>// PM Dashboard</span><br />
            ├── <strong>packages/</strong><br />
            │ &nbsp;&nbsp;├── design-system/ <span style={{ color: "var(--accent-amber)" }}>// Shared UI</span><br />
            │ &nbsp;&nbsp;├── fastcode/ <span style={{ color: "var(--accent-amber)" }}>// AST Engine</span><br />
            │ &nbsp;&nbsp;└── core-types/ <span style={{ color: "var(--accent-amber)" }}>// Shared DTOs</span><br />
            ├── <strong>.agents/</strong><br />
            │ &nbsp;&nbsp;├── skills/ <span style={{ color: "#10b981" }}>// 30+ Agent Skills</span><br />
            │ &nbsp;&nbsp;└── workflows/ <span style={{ color: "#10b981" }}>// GSafe Workflows</span><br />
            └── <strong>docs/</strong><br />
            &nbsp;&nbsp;&nbsp;&nbsp;├── <strong>PRDs/</strong> <span style={{ color: "var(--text-dim)" }}>// 6 PRDs (core-gmind)</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;└── researches/ <span style={{ color: "var(--text-dim)" }}>// 16 Spikes</span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ Beads-ID Tracking (kept) ═══ */}
      <section className="animate-fade-up">
        <SectionLabel text="Theo dõi Phổ quát" accent="teal" />
        <h2 style={{ marginBottom: "0.5rem" }}>Beads-ID: Chiếc Chìa Khoá Duy Nhất</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Beads-ID (<code>br-xxx</code> / <code>bd-xxx</code>) là Nút Đồ thị Phổ quát — 
          Khoá Chính xuyên suốt mọi lớp và mọi nguồn dữ liệu.
        </p>

        <div className="grid-3">
          {[
            { emoji: "📋", title: "Mục PRD", code: "br-prd01-s4.2", link: "YAML front matter" },
            { emoji: "📐", title: "Phần tử Kế hoạch", code: "br-plan-42", link: "satisfies → PRD" },
            { emoji: "✅", title: "Task / Issue", code: "bd-x1y2", link: "implements → Kế hoạch" },
            { emoji: "💾", title: "Git Commit", code: "Beads-ID: trailer", link: "committed-for → Task" },
            { emoji: "💬", title: "Chat / Cuộc họp", code: "thread_id", link: "discussed-in → Task" },
            { emoji: "🔀", title: "Pull Request", code: "gh pr search", link: "pr-for → Task" },
          ].map((item) => (
            <div key={item.title} className="ve-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{item.emoji}</div>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>{item.title}</h3>
              <code style={{ fontSize: "0.8rem" }}>{item.code}</code>
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>{item.link}</p>
            </div>
          ))}
        </div>

        <div className="code-block" style={{ marginTop: "24px", textAlign: "center" }}>
          <pre style={{ margin: 0, color: "var(--text-dim)" }}>
            <code>
{`Mục PRD      ←──satisfies──  Phần tử KH   ←──implements──  Task      ←──Beads-ID──  Commit
(br-prd02-s1)                (br-plan-01)                  (bd-a1b2)                (git log)`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
