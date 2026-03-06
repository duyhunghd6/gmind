"use client";

import { useState, useEffect } from "react";
import MermaidDiagram from "./MermaidDiagram";
import InlineQuiz from "./InlineQuiz";
import type { DiagramEntry } from "@/data/diagrams";

/* ──────── Props ──────── */
interface WithWithoutViewerProps {
  diagram: DiagramEntry;
  onQuizAnswered?: (correct: boolean) => void;
  isLast?: boolean;
}

/* ──────── Component ──────── */
export default function WithWithoutViewer({ diagram, onQuizAnswered, isLast }: WithWithoutViewerProps) {
  const [mode, setMode] = useState<"with" | "without">("with");
  const [showHint, setShowHint] = useState(true);
  const [hasClickedWithout, setHasClickedWithout] = useState(false);

  // Auto-dismiss hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleWithoutClick = () => {
    setMode("without");
    setHasClickedWithout(true);
    setShowHint(false);
  };

  return (
    <div style={{ marginBottom: isLast ? "16px" : "32px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "6px",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: `var(--accent-${diagram.accent})`,
          background: `var(--accent-${diagram.accent}-dim)`,
          padding: "3px 10px",
          borderRadius: "6px",
          fontWeight: 700,
          letterSpacing: "0.03em",
        }}>{diagram.id}</span>
        <h4 style={{ fontSize: "1.05rem", margin: 0, color: "var(--text)", fontWeight: 600 }}>{diagram.title}</h4>
      </div>
      <p style={{
        color: "var(--text-dim)",
        fontSize: "0.85rem",
        marginBottom: "14px",
        lineHeight: 1.5,
      }}>{diagram.description}</p>

      {/* Toggle tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <button
          onClick={() => setMode("with")}
          style={{
            padding: "7px 16px",
            borderRadius: "8px",
            border: mode === "with"
              ? "1.5px solid var(--accent-teal)"
              : "1.5px solid var(--border)",
            background: mode === "with" ? "var(--accent-teal-dim)" : "var(--surface-elevated)",
            color: mode === "with" ? "var(--accent-teal)" : "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: mode === "with" ? 700 : 400,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >✅ {diagram.withLabel}</button>

        {/* "Without" button wrapper — contains button + tooltip */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={handleWithoutClick}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              border: mode === "without"
                ? "1.5px solid var(--accent-rose)"
                : "1.5px solid var(--border)",
              background: mode === "without" ? "var(--accent-rose-dim)" : "var(--surface-elevated)",
              color: mode === "without" ? "var(--accent-rose)" : "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: mode === "without" ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
              animation: !hasClickedWithout ? "blinkBorder 1.2s ease-in-out infinite" : "none",
            }}
          >❌ {diagram.withoutLabel}</button>

          {/* Arrow tooltip — positioned to the right of button */}
          {showHint && !hasClickedWithout && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "calc(100% + 12px)",
              transform: "translateY(-50%)",
              padding: "6px 12px",
              borderRadius: "8px",
              background: "var(--accent-amber-dim)",
              border: "1px solid var(--accent-amber)",
              whiteSpace: "nowrap",
              zIndex: 10,
              animation: "fadeInRight 0.3s ease, fadeOut 0.5s ease 4.5s forwards",
              pointerEvents: "none",
            }}>
              {/* Arrow pointing left to button */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "-6px",
                transform: "translateY(-50%) rotate(45deg)",
                width: "10px",
                height: "10px",
                background: "var(--accent-amber-dim)",
                borderBottom: "1px solid var(--accent-amber)",
                borderLeft: "1px solid var(--accent-amber)",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--accent-amber)",
                fontWeight: 600,
                position: "relative",
                zIndex: 1,
              }}>
                ← So sánh Sequence Diagrams!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Diagram */}
      <MermaidDiagram
        key={`${diagram.id}-${mode}`}
        code={mode === "with" ? diagram.withMermaid : diagram.withoutMermaid}
      />

      {/* Inline Quiz */}
      <InlineQuiz
        quiz={diagram.quiz}
        accent={diagram.accent}
        onAnswered={onQuizAnswered}
      />

      {/* CSS animations */}
      <style>{`
        @keyframes blinkBorder {
          0%, 100% { border-color: var(--border); box-shadow: none; }
          50% { border-color: var(--accent-rose); box-shadow: 0 0 12px var(--accent-rose-dim); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateY(-50%) translateX(-8px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
