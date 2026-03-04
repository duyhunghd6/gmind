import Link from "next/link";
import DsIdBadge from "@/components/DsIdBadge";
import { usecases, USECASE_MAP } from "@/data/usecase-data";
import { notFound } from "next/navigation";

/* Static params for SSG */
export function generateStaticParams() {
  return usecases.map((uc) => ({ id: uc.id }));
}

export default async function UsecaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uc = USECASE_MAP[id];
  if (!uc) return notFound();

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
          {uc.icon} {uc.title}
        </h1>
        <DsIdBadge id={uc.dsId} />
      </div>

      {/* Journey + Role context */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.75rem", padding: "3px 10px", borderRadius: "12px",
          background: `${uc.journeyColor}18`, color: uc.journeyColor,
          border: `1px solid ${uc.journeyColor}44`,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: uc.journeyColor }} />
          {uc.journey}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          👤 {uc.role}
        </span>
      </div>

      {/* Summary */}
      <p style={{ color: "var(--text-dim)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "680px" }}>
        {uc.summary}
      </p>

      {/* Step-by-step flow */}
      <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: "12px" }}>
        Luồng thực hiện ({uc.steps.length} bước)
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {uc.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", position: "relative" }}>
            {/* Timeline line + dot */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "32px", flexShrink: 0 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: uc.journeyColor, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              {i < uc.steps.length - 1 && (
                <div style={{ width: 2, flex: 1, background: `${uc.journeyColor}33`, minHeight: "16px" }} />
              )}
            </div>

            {/* Step card */}
            <div className="ve-card" style={{ flex: 1, padding: "14px 18px", marginBottom: "0" }}>
              {/* Screen badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Link
                  href={step.screen}
                  style={{
                    fontSize: "0.7rem", padding: "2px 8px", borderRadius: "4px",
                    background: "rgba(0,229,255,0.08)", color: "var(--accent-cyan)",
                    textDecoration: "none", fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(0,229,255,0.2)",
                  }}
                >
                  {step.screenLabel} →
                </Link>
                {step.state && (
                  <span style={{
                    fontSize: "0.65rem", padding: "1px 6px", borderRadius: "3px",
                    background: "rgba(139,148,158,0.1)", color: "var(--text-dim)",
                  }}>
                    {step.state}
                  </span>
                )}
              </div>

              {/* Action */}
              <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text)", marginBottom: "4px" }}>
                {step.action}
              </div>

              {/* Outcome */}
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.4 }}>
                → {step.outcome}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Related Usecases */}
      {uc.relatedUsecases.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>
            🔗 Usecase liên quan
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {uc.relatedUsecases.map((relId) => {
              const rel = USECASE_MAP[relId];
              if (!rel) return null;
              return (
                <Link
                  key={relId}
                  href={`/design-system/storyboard/${relId}`}
                  className="ve-card"
                  style={{
                    padding: "10px 16px", textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "8px",
                    borderLeft: `3px solid ${rel.journeyColor}`,
                  }}
                >
                  <span>{rel.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text)" }}>{rel.title}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>{rel.journey}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Back to overview */}
      <div style={{ marginTop: "24px" }}>
        <Link
          href="/design-system/storyboard"
          style={{
            fontSize: "0.8125rem", color: "var(--accent-cyan)", textDecoration: "none",
          }}
        >
          ← Quay về Storyboard Overview
        </Link>
      </div>
    </div>
  );
}
