"use client";

import { useState, useCallback } from "react";
import DiagramGroupSection from "./DiagramGroupSection";
import SectionDivider from "./SectionDivider";
import { type DiagramGroup, DIAGRAM_KEYS_BY_GROUP } from "@/data/diagrams";

/* ──────── Constants ──────── */
const GROUPS: DiagramGroup[] = ["toolcall", "bash", "code", "mcp", "skill", "workflow", "subagent"];

const TOTAL_QUESTIONS = GROUPS.reduce((sum, g) => sum + DIAGRAM_KEYS_BY_GROUP[g].length, 0);

/* ──────── Component ──────── */
export default function DiagramSections() {
  const [unlockedGroupIdx, setUnlockedGroupIdx] = useState(0);
  const [globalCorrect, setGlobalCorrect] = useState(0);
  const [globalAnswered, setGlobalAnswered] = useState(0);

  const handleSectionComplete = useCallback((groupIdx: number) => {
    setUnlockedGroupIdx((prev) => Math.max(prev, groupIdx + 1));
  }, []);

  const handleQuizAnswer = useCallback((correct: boolean) => {
    setGlobalAnswered((a) => a + 1);
    if (correct) setGlobalCorrect((c) => c + 1);
  }, []);

  const pct = TOTAL_QUESTIONS > 0 ? (globalAnswered / TOTAL_QUESTIONS) * 100 : 0;
  const allPerfect = globalAnswered > 0 && globalCorrect === globalAnswered;

  return (
    <div>
      {/* Global sticky progress bar — sits right below navbar */}
      <div className="progress-sticky-bar" style={{
        position: "sticky",
        top: "72px",              /* navbar height: 48px inner + 24px padding */
        zIndex: 50,
        padding: "10px 16px",
        marginBottom: "20px",
        marginLeft: "-20px",      /* bleed into page padding */
        marginRight: "-20px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Left: label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{ fontSize: "1rem" }}>📊</span>
          <span className="progress-label" style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text)",
          }}>Tiến trình học</span>
        </div>

        {/* Right: progress bar + score */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {/* Progress bar track */}
          <div className="progress-track" style={{
            width: "140px",
            height: "6px",
            borderRadius: "3px",
            background: "var(--border)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              borderRadius: "3px",
              background: globalAnswered === TOTAL_QUESTIONS
                ? "var(--accent-teal)"
                : "var(--accent-cyan)",
              width: `${pct}%`,
              transition: "width 0.5s ease",
            }} />
          </div>

          {/* Score pill */}
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: "20px",
            background: allPerfect ? "var(--accent-teal-dim)" : "var(--surface-elevated)",
            border: allPerfect ? "1.5px solid var(--accent-teal)" : "1.5px solid var(--border)",
            color: allPerfect ? "var(--accent-teal)" : "var(--text-dim)",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}>
            ✅ {globalCorrect}/{TOTAL_QUESTIONS}
          </span>
        </div>
      </div>

      {/* Sequential sections */}
      {GROUPS.map((group, idx) => {
        if (idx > unlockedGroupIdx) return null;
        return (
          <div key={group}>
            {idx > 0 && <SectionDivider />}
            <DiagramGroupSection
              group={group}
              globalCorrect={globalCorrect}
              globalTotal={TOTAL_QUESTIONS}
              onSectionComplete={() => handleSectionComplete(idx)}
              onQuizAnswer={handleQuizAnswer}
            />
          </div>
        );
      })}

      {/* Next section locked hint */}
      {unlockedGroupIdx < GROUPS.length - 1 && (
        <div style={{
          padding: "20px",
          borderRadius: "10px",
          border: "1.5px dashed var(--border)",
          background: "var(--surface-elevated)",
          textAlign: "center",
          marginTop: "24px",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-dim)",
            fontWeight: 500,
          }}>
            🔒 Hoàn thành tất cả quiz trong section hiện tại để mở khoá section tiếp theo
          </span>
        </div>
      )}

      {/* All complete trophy */}
      {globalAnswered >= TOTAL_QUESTIONS && (
        <div style={{
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid var(--accent-teal)",
          background: "var(--accent-teal-dim)",
          textAlign: "center",
          marginTop: "24px",
          boxShadow: "0 0 30px var(--accent-teal-dim)",
        }}>
          <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🏆</span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            color: "var(--accent-teal)",
            fontWeight: 700,
          }}>
            Hoàn thành tất cả — {globalCorrect}/{TOTAL_QUESTIONS} câu đúng!
          </span>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .progress-sticky-bar {
            top: 72px !important;
            padding: 8px 12px !important;
            margin-left: -12px !important;
            margin-right: -12px !important;
            gap: 8px !important;
          }
          .progress-label {
            display: none !important;
          }
          .progress-track {
            width: 80px !important;
          }
        }
        @media (max-width: 480px) {
          .progress-track {
            width: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
