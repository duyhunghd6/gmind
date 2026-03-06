import PillarCard from "@/components/PillarCard";
import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";
import DiagramSections from "@/components/DiagramSections";

export default function Home() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* Hero */}
      <header className="animate-fade-up">
        <SectionLabel text="Agentic Software Engineering · 2026" />
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "0.5rem" }}>
          Gmind — Context Layer for Agentic Coding
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-dim)", maxWidth: "800px", marginBottom: "2rem" }}>
          <strong>gmind</strong> là tầng trung gian (<em>middle layer</em>) giữa Agentic IDE
          (Cursor, Windsurf, Kilo Code…) và codebase — cung cấp và tối ưu <strong>ngữ cảnh</strong> để
          AI Agent hiểu đúng yêu cầu, truy vết đầy đủ lịch sử, và thực thi chính xác hơn.
          Kiến trúc Monorepo Đa ngôn ngữ (Go · Rust · TypeScript) tích hợp
          Trí tuệ Mã nguồn (FastCode AST), Theo dõi Phổ quát (Beads-ID), và Verification Gate SAFe 6.0.
        </p>
      </header>

      {/* 4 Trụ cột */}
      <section className="ve-card ve-card--hero animate-fade-up delay-1">
        <SectionLabel text="4 Trụ cột Cốt lõi — Showcase" />
        <h2 style={{ marginBottom: "0.25rem" }}>gmind.gscfin.com</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Trang web tĩnh (SSG) — trình diễn 4 trụ cột &ldquo;tinh túy&rdquo;
          được nghiên cứu qua 16 Spike trước khi viết dòng code đầu tiên.
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
            description="Agent KHÔNG thể tự đóng task — bắt buộc qua Verification Gate. Nguyên tắc Bốn Mắt: Code Agent ≠ Reviewer Agent. RTM 3 lớp:"
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

      {/* Vị trí gmind — Middle Layer */}
      <section className="animate-fade-up delay-3">
        <SectionLabel text="gmind — Middle Layer" accent="cyan" />
        <h2 style={{ marginBottom: "0.5rem" }}>Tầng Ngữ cảnh cho Agentic IDE Coding</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Khi developer sử dụng Agentic IDE (Cursor, Windsurf, Kilo Code…), AI Agent cần <strong>ngữ cảnh chính xác</strong> để
          hiểu yêu cầu và sinh code đúng. <strong>gmind</strong> đóng vai trò <em>middle layer</em> — thu thập, tối ưu, và cung cấp ngữ cảnh
          từ toàn bộ monorepo qua một CLI duy nhất.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div className="ve-card ve-card--hero" style={{ borderLeft: "4px solid var(--accent-teal)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "8px" }}>User + Agentic IDE</p>
            <p style={{ fontSize: "1rem" }}>Developer ra yêu cầu → IDE gửi tới AI Agent</p>
            <div style={{ fontSize: "1.5rem", color: "var(--accent-teal)", margin: "8px 0" }}>↓</div>
            <div style={{
              background: "var(--accent-cyan-dim)",
              border: "2px solid var(--accent-cyan)",
              borderRadius: "8px",
              padding: "16px",
              margin: "0 auto",
              maxWidth: "500px",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-cyan)", marginBottom: "4px" }}>⬡ gmind (Middle Layer)</p>
              <p style={{ fontSize: "0.9rem" }}>
                <code>search-codebase</code> · <code>trace</code> · <code>context</code> · <code>coverage</code> · <code>gaps</code>
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginTop: "4px" }}>Thu thập ngữ cảnh từ FrankenSQLite + Git + Zvec + FastCode + GitHub</p>
            </div>
            <div style={{ fontSize: "1.5rem", color: "var(--accent-cyan)", margin: "8px 0" }}>↓</div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "4px" }}>AI Agent thực thi</p>
            <p style={{ fontSize: "0.9rem" }}>Agent nhận ngữ cảnh tối ưu → sinh code chính xác → qua Verification Gate</p>
          </div>
        </div>

        <SectionDivider />

        {/* Hai Nguyên lý Cốt lõi */}
        <SectionLabel text="Hai Nguyên lý Cốt lõi" accent="teal" />
        <h3 style={{ marginBottom: "0.5rem" }}>Chìa khoá Hiệu quả của Agentic Coding</h3>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Hiểu rõ Agent Loop ở trên, hai nguyên lý sau quyết định hiệu quả thực tế.
        </p>

        <div className="grid-2" style={{ alignItems: "stretch", marginBottom: "24px" }}>
          {/* Key 1 */}
          <div className="ve-card" style={{ borderLeft: "4px solid var(--accent-cyan)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🔑</span>
              <div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent-cyan)",
                  background: "var(--accent-cyan-dim)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}>Nguyên lý 1</span>
                <h4 style={{ fontSize: "1rem", marginTop: "4px" }}>Tái sử dụng Tri thức</h4>
              </div>
            </div>

            <div style={{
              display: "flex",
              gap: "12px",
              marginBottom: "12px",
              fontSize: "0.85rem",
            }}>
              <div style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                background: "var(--accent-rose-dim)",
                border: "1px solid var(--accent-rose)",
              }}>
                <p style={{ color: "var(--accent-rose)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginBottom: "4px" }}>❌ Truyền thống</p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
                  Mỗi lần copy prompt mẫu, tự nhớ workflow, quản lý ràng buộc trong đầu
                </p>
              </div>
              <div style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                background: "var(--accent-teal-dim)",
                border: "1px solid var(--accent-teal)",
              }}>
                <p style={{ color: "var(--accent-teal)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginBottom: "4px" }}>✅ Agentic</p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
                  Prompt engineering <strong>một lần</strong>, đóng gói vào <code>.agents/</code> để tái sử dụng vĩnh viễn
                </p>
              </div>
            </div>

            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-dim)",
              background: "var(--surface-elevated)",
              padding: "10px 14px",
              borderRadius: "6px",
              lineHeight: 1.6,
            }}>
              <span style={{ color: "var(--accent-cyan)" }}>rules/</span> → Guardrails tự động nạp mỗi phiên<br />
              <span style={{ color: "var(--accent-teal)" }}>skills/</span> → Công cụ chuyên biệt, đọc on-demand<br />
              <span style={{ color: "var(--accent-amber)" }}>workflows/</span> → Quy trình đa bước, kích hoạt bằng /slash
            </div>
          </div>

          {/* Key 2 */}
          <div className="ve-card" style={{ borderLeft: "4px solid var(--accent-amber)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent-amber)",
                  background: "var(--accent-amber-dim)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}>Nguyên lý 2</span>
                <h4 style={{ fontSize: "1rem", marginTop: "4px" }}>Mở rộng Tool Call & Kỷ luật Ngữ cảnh</h4>
              </div>
            </div>

            <div style={{ fontSize: "0.8rem", marginBottom: "12px" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "4px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
              }}>
                <span style={{ color: "var(--accent-cyan)" }}>Built-in</span>
                <span style={{ color: "var(--text-dim)" }}>grep · edit_file · list_folder · view_file</span>
                <span style={{ color: "var(--accent-amber)" }}>MCP</span>
                <span style={{ color: "var(--text-dim)" }}>Database · API · External services</span>
                <span style={{ color: "var(--accent-teal)" }}>Skills</span>
                <span style={{ color: "var(--text-dim)" }}>Bash/Script · CLI tools · Tạo file phức tạp</span>
              </div>
            </div>

            <div style={{
              padding: "10px 14px",
              borderRadius: "6px",
              background: "var(--accent-rose-dim)",
              border: "1px dashed var(--accent-rose)",
              marginBottom: "12px",
            }}>
              <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginBottom: "4px" }}>
                <strong style={{ color: "var(--accent-rose)" }}>⚠ Hạn chế:</strong> Context loãng → Hallucination tăng
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>
                Skills/Rules phải <strong>ngắn gọn & vừa đủ</strong>. Workflow chia bước nhỏ có kiểm soát.
              </p>
            </div>

            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              textAlign: "center",
              padding: "8px",
              borderRadius: "6px",
              background: "var(--surface-elevated)",
              color: "var(--accent-teal)",
            }}>
              Ngắn gọn + Vừa đủ = <strong>Linh hoạt cao</strong>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* 32 W/WO Sequence Diagrams — 7 Groups (Sequential Unlock + Global Score) */}
        <DiagramSections />
      </section>
    </div>
  );
}
