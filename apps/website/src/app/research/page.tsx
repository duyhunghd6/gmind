import { researchItems } from "@/data/research-data";
import SectionLabel from "@/components/SectionLabel";
import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Nghiên cứu & Spike — Gmind",
  description:
    "Danh mục đầy đủ nghiên cứu Khám phá Liên tục: 3 PRD và 8+ Spike thực hiện trước khi viết dòng code triển khai đầu tiên.",
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    completed: { bg: "var(--accent-teal-dim)", text: "var(--accent-teal)" },
    approved: { bg: "var(--accent-cyan-dim)", text: "var(--accent-cyan)" },
    pending: { bg: "var(--accent-amber-dim)", text: "var(--accent-amber)" },
  };
  const labels: Record<string, string> = {
    completed: "hoàn thành",
    approved: "phê duyệt",
    pending: "đang chờ",
  };
  const c = colors[status] || colors.pending;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: c.text,
        background: c.bg,
        padding: "3px 10px",
        borderRadius: "4px",
      }}
    >
      {labels[status] || status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    prd: "var(--accent-cyan)",
    spike: "var(--accent-teal)",
    reference: "var(--accent-amber)",
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: colors[type] || "var(--text-dim)",
        border: `1px solid ${colors[type] || "var(--border)"}`,
        padding: "2px 8px",
        borderRadius: "4px",
      }}
    >
      {type}
    </span>
  );
}

export default function ResearchPage() {
  const prds = researchItems.filter((r) => r.type === "prd");
  const completedSpikes = researchItems.filter(
    (r) => r.type === "spike" && r.status === "completed"
  );
  const pendingSpikes = researchItems.filter(
    (r) => r.type === "spike" && r.status === "pending"
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      <header className="animate-fade-up">
        <SectionLabel text="Khám phá Liên tục — SAFe 6.0" />
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>
          Danh mục Nghiên cứu
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", maxWidth: "750px", marginBottom: "1rem" }}>
          Tổng hợp toàn bộ nghiên cứu đã thực hiện trong phiên Khám phá Liên tục
          trước khi viết dòng code đầu tiên. Mỗi Spike là một phiên nghiên cứu
          có giả thuyết, phát hiện, và kết luận rõ ràng.
        </p>
        <div style={{ display: "flex", gap: "24px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            <span style={{ color: "var(--accent-cyan)", fontSize: "1.5rem", fontWeight: 700 }}>
              {prds.length}
            </span>{" "}
            <span style={{ color: "var(--text-dim)" }}>PRD Đã phê duyệt</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            <span style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 700 }}>
              {completedSpikes.length}
            </span>{" "}
            <span style={{ color: "var(--text-dim)" }}>Spike Hoàn thành</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            <span style={{ color: "var(--accent-amber)", fontSize: "1.5rem", fontWeight: 700 }}>
              {pendingSpikes.length}
            </span>{" "}
            <span style={{ color: "var(--text-dim)" }}>Spike Đang chờ</span>
          </div>
        </div>
      </header>

      {/* Phần PRDs */}
      <section className="animate-fade-up delay-1">
        <SectionLabel text="Tài liệu Yêu cầu Sản phẩm" accent="cyan" />
        <h2 style={{ marginBottom: "16px" }}>PRDs — Bản Thiết kế</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {prds.map((item) => (
            <div key={item.id} className="ve-card" style={{ borderLeft: "3px solid var(--accent-cyan)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <TypeBadge type={item.type} />
                <StatusBadge status={item.status} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                  {item.date}
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "12px" }}>
                {item.summary}
              </p>
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "0.85rem", color: "var(--accent-cyan)" }}>Kết luận Chính:</strong>
                <ul style={{ listStyle: "none", padding: 0, marginTop: "6px" }}>
                  {item.conclusions.map((c, i) => (
                    <li
                      key={i}
                      style={{
                        color: "var(--text-dim)",
                        fontSize: "0.85rem",
                        padding: "3px 0 3px 16px",
                        position: "relative",
                      }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "var(--accent-teal)" }}>›</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                <strong style={{ color: "var(--accent-amber)" }}>Tác động:</strong> {item.impact}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Spike Hoàn thành */}
      <section className="animate-fade-up delay-2">
        <SectionLabel text="Spike Đã hoàn thành" accent="teal" />
        <h2 style={{ marginBottom: "16px" }}>Phiên Nghiên cứu — Hoàn tất</h2>
        <div className="grid-2">
          {completedSpikes.map((item) => (
            <div key={item.id} className="ve-card">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                <TypeBadge type={item.type} />
                <StatusBadge status={item.status} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)" }}>
                  {item.date}
                </span>
              </div>
              <h3 style={{ fontSize: "1rem", marginBottom: "6px" }}>{item.title}</h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "10px" }}>
                {item.summary}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {item.conclusions.slice(0, 3).map((c, i) => (
                  <li
                    key={i}
                    style={{
                      color: "var(--text-dim)",
                      fontSize: "0.8rem",
                      padding: "2px 0 2px 14px",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-teal)" }}>›</span>
                    {c}
                  </li>
                ))}
                {item.conclusions.length > 3 && (
                  <li style={{ color: "var(--text-dim)", fontSize: "0.75rem", paddingLeft: "14px", marginTop: "4px" }}>
                    +{item.conclusions.length - 3} kết luận nữa
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {pendingSpikes.length > 0 && (
        <>
          <SectionDivider />

          {/* Spike Đang chờ */}
          <section className="animate-fade-up delay-3">
            <SectionLabel text="Spike Đang chờ" accent="amber" />
            <h2 style={{ marginBottom: "16px" }}>Nghiên cứu Trong hàng đợi</h2>
            <div className="grid-2">
              {pendingSpikes.map((item) => (
                <div key={item.id} className="ve-card" style={{ opacity: 0.7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <TypeBadge type={item.type} />
                    <StatusBadge status={item.status} />
                  </div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>{item.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
