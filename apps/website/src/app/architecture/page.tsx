import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Kiến trúc — Gmind",
  description:
    "Kiến trúc 5+1 Lớp của Nền tảng Agentic SE Gmind: Lưu trữ, Công cụ, Thực thi, Xác minh, API Gateway, và Trình bày.",
};

const layers = [
  {
    num: "1",
    title: "Lớp Lưu trữ",
    accent: "--accent-cyan",
    tech: "beads_rust · FrankenSQLite · Zvec",
    items: [
      "FrankenSQLite: MVCC ghi đồng thời trong tiến trình — khoá mức trang",
      "Cột SQL first-class (indexed, type-safe) — KHÔNG dùng JSON blob",
      "JSONL là SSOT đồng bộ qua git — FrankenSQLite là cache cục bộ",
      "Zvec: Tìm kiếm vector ngữ nghĩa cho tài liệu, lịch sử chat, và dữ liệu phi cấu trúc",
      "FastCode: Động cơ trí tuệ mã nguồn nội bộ AST + Graph + BM25",
    ],
  },
  {
    num: "2",
    title: "Lớp Công cụ Cốt lõi",
    accent: "--accent-teal",
    tech: "gmind CLI · beads_rust · FastCode · mcp_agent_mail",
    items: [
      "gmind CLI: Cổng API Ngữ cảnh duy nhất — agent không gọi gì khác",
      "gmind search: Tài liệu/Lịch sử Chat qua Zvec",
      "gmind search-codebase: Điều phối FastCode nội bộ (AST + Graph RAG + BM25)",
      "gmind context: Ngữ cảnh task đầy đủ — FrankenSQLite + Zvec + tuỳ chọn GitHub",
      "gmind trace: Duyệt Knowledge Graph tại thời điểm truy vấn xuyên 5+ nguồn dữ liệu",
      "beads_rust (br CLI): Trình theo dõi issue với backend FrankenSQLite",
      "mcp_agent_mail: Khoá tệp với Lease Timeout 15 phút",
    ],
  },
  {
    num: "3",
    title: "Lớp Thực thi / Agent",
    accent: "--accent-amber",
    tech: "AI Agent · Phân vai Sub-agent",
    items: [
      "Quy trình: Phân loại → TimCode → NạpNgữCảnh → KhoáTệp → Code → Kiểm tra",
      "Sub-agent Code: Có thể sửa code, chạy test, khoá tệp — KHÔNG THỂ đóng task",
      "Sub-agent Reviewer: Quyền br close độc quyền — Nguyên tắc Bốn Mắt",
      "Tag truy vết bắt buộc: --tag='implements:' và --tag='satisfies:'",
      "Mọi commit phải có Beads-ID: Git Trailer cho theo dõi phổ quát",
    ],
  },
  {
    num: "4",
    title: "Lớp Xác minh — Cổng CI/CD",
    accent: "--accent-rose",
    tech: "GitHub Actions · golangci-lint · go test",
    items: [
      "Agent KHÔNG THỂ tự đóng task — phải qua Nút Xác minh trước",
      "Tự động: Unit test, integration test, linting, kiểm tra định dạng",
      "Đạt → Agent được phép Hoàn thành task (qua Reviewer Agent)",
      "Không đạt → Trả về Code Agent để sửa lỗi",
      "GitHub Checks API: Check run gắn Beads trên commit/PR",
    ],
  },
  {
    num: "5",
    title: "Lớp API Gateway",
    accent: "--accent-cyan",
    tech: "Go REST API · Nhúng FrankenSQLite",
    items: [
      "Mọi request Web UI đều qua Go REST API — không truy cập DB trực tiếp",
      "Nhúng FrankenSQLite — cùng tiến trình, không overhead mạng",
      "Giới hạn tốc độ, xác thực, thực thi toàn vẹn dữ liệu",
      "Cập nhật thời gian thực qua polling bảng events mỗi 3-5 giây",
    ],
  },
  {
    num: "6",
    title: "Lớp Trình bày — Web UI",
    accent: "--accent-teal",
    tech: "Beads Viewer PM Edition · Bảng điều khiển React",
    items: [
      "Góc nhìn Portfolio/ART/Nhóm: Bảng Kanban cho CEO/RTE/Nhóm",
      "Cổng Phê duyệt Cấp 3: Human ký duyệt tại ranh giới giai đoạn",
      "Bảng Phê duyệt Tối cao: Góc nhìn 5-in-1 (Test + Diff + Beads + PRD + CI)",
      "Đồ thị Tài liệu: Lịch sử commit, Liên kết Ngữ cảnh Tri thức",
      "Bảng điều khiển RTM: Bản đồ nhiệt độ phủ Mục PRD ↔ Kế hoạch ↔ Task",
      "Phân tích Tác động: Phân tích thay đổi dây chuyền khi sửa PRD",
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      <header className="animate-fade-up">
        <SectionLabel text="Kiến trúc Hệ thống" />
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>
          Kiến trúc AI 5+1 Lớp
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", maxWidth: "700px", marginBottom: "2rem" }}>
          Kiến trúc phân tách triệt để — mỗi lớp có trách nhiệm riêng biệt.
          Thiết kế qua 3 PRD, 15+ Spike, và Khám phá Liên tục SAFe 6.0.
        </p>
      </header>

      {/* Các Lớp Kiến trúc */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {layers.map((layer) => (
          <div key={layer.num} className="arch-layer animate-fade-up" style={{ animationDelay: `${parseInt(layer.num) * 80}ms` }}>
            <div className="layer-number">{layer.num}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: `var(${layer.accent})`,
                  background: `var(${layer.accent}-dim, rgba(14,165,233,0.1))`,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                Lớp {layer.num}
              </span>
              <h2 style={{ fontSize: "1.25rem" }}>{layer.title}</h2>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "12px" }}>
              {layer.tech}
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {layer.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "0.9rem",
                    padding: "4px 0",
                    paddingLeft: "16px",
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: `var(${layer.accent})` }}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionDivider />

      {/* Phần Theo dõi Phổ quát */}
      <section className="animate-fade-up">
        <SectionLabel text="Theo dõi Phổ quát" accent="teal" />
        <h2 style={{ marginBottom: "0.5rem" }}>Beads-ID: Chiếc Chìa Khoá Duy Nhất</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
          Beads-ID (<code>br-xxx</code> / <code>bd-xxx</code>) là Nút Đồ thị Phổ quát — 
          Khoá Chính xuyên suốt mọi lớp và mọi nguồn dữ liệu.
        </p>

        <div className="grid-3">
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📋</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Mục PRD</h3>
            <code style={{ fontSize: "0.8rem" }}>br-prd01-s4.2</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              YAML front matter
            </p>
          </div>
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📐</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Phần tử Kế hoạch</h3>
            <code style={{ fontSize: "0.8rem" }}>br-plan-42</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              satisfies → PRD
            </p>
          </div>
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>✅</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Task / Issue</h3>
            <code style={{ fontSize: "0.8rem" }}>bd-x1y2</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              implements → Kế hoạch
            </p>
          </div>
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>💾</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Git Commit</h3>
            <code style={{ fontSize: "0.8rem" }}>Beads-ID: trailer</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              committed-for → Task
            </p>
          </div>
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>💬</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Chat / Cuộc họp</h3>
            <code style={{ fontSize: "0.8rem" }}>thread_id</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              discussed-in → Task
            </p>
          </div>
          <div className="ve-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🔀</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Pull Request</h3>
            <code style={{ fontSize: "0.8rem" }}>gh pr search</code>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
              pr-for → Task
            </p>
          </div>
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
