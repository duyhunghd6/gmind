import PillarCard from "@/components/PillarCard";
import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* Hero */}
      <header className="animate-fade-up">
        <SectionLabel text="Kỹ thuật Phần mềm Tác tử · 2026" />
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "0.5rem" }}>
          Gmind Monorepo & Showcase
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-dim)", maxWidth: "800px", marginBottom: "2rem" }}>
          Cấu trúc hóa dự án Gmind dưới dạng Monorepo Đa ngôn ngữ (Go, Rust, TypeScript),
          trình diễn tầm nhìn Agentic SE — nơi AI Agent điều phối tự động qua
          Theo dõi Phổ quát (Beads-ID), Trí tuệ Mã nguồn (FastCode AST), và
          Cổng Xác minh SAFe 6.0 CI/CD.
        </p>
      </header>

      {/* 4 Trụ cột */}
      <section className="ve-card ve-card--hero animate-fade-up delay-1">
        <SectionLabel text="4 Trụ cột Cốt lõi — Showcase" />
        <h2 style={{ marginBottom: "0.25rem" }}>gmind.gscfin.com</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Trang web tĩnh (SSG) — trình diễn 4 trụ cột &ldquo;tinh túy&rdquo;
          được nghiên cứu qua 15+ Spike trước khi viết dòng code đầu tiên.
        </p>

        <div className="grid-2">
          <PillarCard
            accent="cyan"
            label="Trụ cột A: Trí tuệ Mã nguồn"
            title="FastCode AST + Graph RAG"
            description='Giải pháp chống "mất trí nhớ cục bộ" của AI. FastCode tích hợp sẵn Tree-sitter AST → Graph Builder → BM25/Vector → LLM Iterative Retrieval. Agent chỉ cần gọi'
            codeSnippets={["gmind search-codebase"]}
          />
          <PillarCard
            accent="teal"
            label="Trụ cột B: Theo dõi SSOT"
            title="FrankenSQLite + Git JSONL"
            description="MVCC ghi đồng thời trong tiến trình. Cột SQL first-class (indexed, type-safe) thay JSON blob. Đồng bộ qua Git: SQLite → JSONL export → git push. Theo dõi Phổ quát qua"
            codeSnippets={["Beads-ID:", "Git Trailer"]}
          />
          <PillarCard
            accent="amber"
            label="Trụ cột C: Xác minh & SAFe 6.0"
            title="Lớp 4: Cổng CI/CD + RTM"
            description="Agent KHÔNG thể tự đóng task — bắt buộc qua Nút Xác minh. Nguyên tắc Bốn Mắt: Code Agent ≠ Reviewer Agent. RTM 3 lớp:"
            codeSnippets={["PRD ↔ Kế hoạch ↔ Task ↔ Commit"]}
          />
          <PillarCard
            accent="rose"
            label="Trụ cột D: Hệ sinh thái"
            title="Agent Village & Knowledge Graph"
            description="Beads-ID = Nút Đồ thị Phổ quát. gmind xây Knowledge Graph tại thời điểm truy vấn từ 5+ nguồn (FrankenSQLite, Git, Zvec, GitHub, YAML). Khoá tệp Lease Timeout 15 phút qua"
            codeSnippets={["mcp_agent_mail"]}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Kiến trúc 5+1 Lớp */}
      <section className="animate-fade-up delay-2">
        <SectionLabel text="Kiến trúc Hệ thống" />
        <h2 style={{ marginBottom: "0.5rem" }}>Kiến trúc 5+1 Lớp</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Kiến trúc phân tách triệt để — mỗi lớp có trách nhiệm riêng biệt,
          giao tiếp qua giao diện rõ ràng.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              num: "1",
              title: "Lớp Lưu trữ",
              desc: "FrankenSQLite (Trạng thái SSOT, MVCC) + Zvec (Bộ nhớ Ngữ nghĩa cho Tài liệu/Chat)",
              accent: "var(--accent-cyan)",
            },
            {
              num: "2",
              title: "Lớp Công cụ Cốt lõi",
              desc: "gmind CLI (Cổng Ngữ cảnh) + beads_rust (Trình theo dõi Issue) + FastCode (Trí tuệ Mã nguồn) + mcp_agent_mail (Phối hợp)",
              accent: "var(--accent-teal)",
            },
            {
              num: "3",
              title: "Lớp Thực thi / Agent",
              desc: "AI Agent xử lý task: Tìm kiếm → Ngữ cảnh → Khoá → Code → Kiểm tra. Tích hợp gmind trace để lấy toàn bộ ngữ cảnh Knowledge Graph.",
              accent: "var(--accent-amber)",
            },
            {
              num: "4",
              title: "Lớp Xác minh",
              desc: "Cổng CI/CD qua GitHub Actions. Test + Linting bắt buộc trước khi hoàn thành. Sub-agent Reviewer kiểm tra và phê duyệt.",
              accent: "var(--accent-rose)",
            },
            {
              num: "5",
              title: "Lớp API Gateway",
              desc: "Go REST API + nhúng FrankenSQLite. Giới hạn tốc độ, xác thực. Web UI KHÔNG đọc DB trực tiếp.",
              accent: "var(--accent-cyan)",
            },
            {
              num: "6",
              title: "Lớp Trình bày (Web UI)",
              desc: "Bảng Kanban, Góc nhìn SAFe, Cổng Phê duyệt Cấp 3, Đồ thị Tài liệu HITL, Bản đồ Nhiệt Độ phủ, Phân tích Tác động.",
              accent: "var(--accent-teal)",
            },
          ].map((layer) => (
            <div key={layer.num} className="arch-layer">
              <div className="layer-number">{layer.num}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: layer.accent,
                    background: `${layer.accent}15`,
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Lớp {layer.num}
                </span>
                <h3 style={{ fontSize: "1.1rem" }}>{layer.title}</h3>
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Cấu trúc Monorepo */}
      <section className="animate-fade-up delay-3">
        <SectionLabel text="Bố cục Kiến trúc Monorepo" />
        <h2 style={{ marginBottom: "0.5rem" }}>Tổ chức Không gian Làm việc Thống nhất</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Monorepo Đa ngôn ngữ: Go (<code>go.work</code>) + Rust (<code>Cargo.toml workspace</code>) + TypeScript (<code>pnpm-workspace.yaml</code>).
          Điều phối bởi <strong>Turborepo</strong> — không cần Bazel.
        </p>

        <div className="grid-2" style={{ alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-cyan)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>apps/</code> — Ứng dụng Web
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>website/</code> Showcase Next.js (Vercel) · <code>webui/</code> Bảng điều khiển PM (RTM, góc nhìn SAFe)
              </p>
            </div>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-teal)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>cli/</code> — Công cụ CLI Cốt lõi
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>gmind/</code> Cổng Ngữ cảnh Go · <code>beads_rust/</code> Trình theo dõi Rust · <code>mcp_mail/</code> Hệ thống Khoá
              </p>
            </div>
            <div className="ve-card" style={{ borderLeft: "3px solid var(--accent-amber)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                <code>packages/</code> — Thư viện Chia sẻ
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                <code>design-system/</code> Token UI · <code>fastcode/</code> Động cơ AST · <code>core-types/</code> DTO Chia sẻ
              </p>
            </div>
          </div>

          <div className="path-tree">
            <strong>/gmind/</strong><br />
            ├── <strong>apps/</strong><br />
            │ &nbsp;&nbsp;├── website/ <span style={{ color: "var(--accent-teal)" }}>// Showcase Vercel</span><br />
            │ &nbsp;&nbsp;└── webui/ <span style={{ color: "var(--accent-teal)" }}>// Bảng điều khiển React</span><br />
            ├── <strong>cli/</strong><br />
            │ &nbsp;&nbsp;├── gmind/ <span style={{ color: "var(--accent-cyan)" }}>// Go CLI</span><br />
            │ &nbsp;&nbsp;├── beads_rust/ <span style={{ color: "var(--accent-cyan)" }}>// Trình theo dõi Rust</span><br />
            │ &nbsp;&nbsp;└── mcp_mail/ <span style={{ color: "var(--accent-cyan)" }}>// Hệ thống Khoá</span><br />
            ├── <strong>packages/</strong><br />
            │ &nbsp;&nbsp;├── design-system/ <span style={{ color: "var(--accent-amber)" }}>// UI chia sẻ</span><br />
            │ &nbsp;&nbsp;├── fastcode/ <span style={{ color: "var(--accent-amber)" }}>// Động cơ AST</span><br />
            │ &nbsp;&nbsp;└── core-types/ <span style={{ color: "var(--accent-amber)" }}>// DTO chia sẻ</span><br />
            ├── <strong>.agents/</strong><br />
            │ &nbsp;&nbsp;├── skills/ <span style={{ color: "#10b981" }}>// visual-explainer</span><br />
            │ &nbsp;&nbsp;└── workflows/ <span style={{ color: "#10b981" }}>// gsafe-research</span><br />
            └── <strong>docs/</strong><br />
            &nbsp;&nbsp;&nbsp;&nbsp;├── <strong>PRDs/</strong> <span style={{ color: "var(--text-dim)" }}>// Phân vùng theo hệ thống con</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;└── researches/ <span style={{ color: "var(--text-dim)" }}>// 15+ Spike</span>
          </div>
        </div>
      </section>
    </div>
  );
}
