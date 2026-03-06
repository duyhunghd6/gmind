"use client";

import { useState, useEffect, useCallback } from "react";
import WithWithoutViewer from "./WithWithoutViewer";
import SectionLabel from "./SectionLabel";
import {
  type DiagramEntry,
  type DiagramGroup,
  GROUP_META,
  DIAGRAM_KEYS_BY_GROUP,
  loadDiagram,
  type DiagramKey,
} from "@/data/diagrams";

/* ──────── Props ──────── */
interface DiagramGroupSectionProps {
  group: DiagramGroup;
  globalCorrect?: number;
  globalTotal?: number;
  onSectionComplete?: () => void;
  onQuizAnswer?: (correct: boolean) => void;
}

/* ──────── Component ──────── */
export default function DiagramGroupSection({
  group,
  onSectionComplete,
  onQuizAnswer,
}: DiagramGroupSectionProps) {
  const [diagrams, setDiagrams] = useState<DiagramEntry[]>([]);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const meta = GROUP_META[group];
  const keys = DIAGRAM_KEYS_BY_GROUP[group];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all(keys.map((k: DiagramKey) => loadDiagram(k)))
      .then((results) => {
        if (!cancelled) {
          setDiagrams(results);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [group]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuizAnswered = useCallback((idx: number, correct: boolean) => {
    const newAnswered = answeredCount + 1;
    setAnsweredCount(newAnswered);
    if (correct) setCorrectCount((c) => c + 1);

    // Notify parent of quiz answer
    onQuizAnswer?.(correct);

    setTimeout(() => {
      setUnlockedCount((u) => Math.min(u + 1, diagrams.length));
      // Check if ALL quizzes in this section are now answered
      if (newAnswered >= diagrams.length) {
        onSectionComplete?.();
      }
    }, 1500);
  }, [answeredCount, diagrams.length, onQuizAnswer, onSectionComplete]);

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--text-dim)",
        }}>⏳ Đang tải diagrams...</span>
      </div>
    );
  }

  const total = diagrams.length;
  const allCorrect = answeredCount > 0 && correctCount === answeredCount;

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <SectionLabel text={meta.label} accent={meta.accent} />
        {/* Local score badge */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          padding: "5px 14px",
          borderRadius: "20px",
          background: allCorrect ? "var(--accent-teal-dim)" : "var(--surface-elevated)",
          border: `1.5px solid ${allCorrect ? "var(--accent-teal)" : "var(--border)"}`,
          color: allCorrect ? "var(--accent-teal)" : "var(--text-dim)",
          fontWeight: 700,
          transition: "all 0.3s ease",
        }}>
          ✅ {correctCount} / {total}
        </div>
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "20px" }}>
        {meta.description}
      </p>

      {/* Sequential diagrams */}
      {diagrams.slice(0, unlockedCount).map((d, i) => (
        <WithWithoutViewer
          key={d.id}
          diagram={d}
          onQuizAnswered={(correct) => handleQuizAnswered(i, correct)}
          isLast={i === total - 1}
        />
      ))}

      {/* Progress hint */}
      {unlockedCount < total && (
        <div style={{
          padding: "16px 20px",
          borderRadius: "10px",
          border: "1.5px dashed var(--border)",
          background: "var(--surface-elevated)",
          textAlign: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-dim)",
            fontWeight: 500,
          }}>
            📝 Trả lời quiz phía trên để mở khoá diagram tiếp theo ({unlockedCount}/{total})
          </span>
        </div>
      )}

      {/* All complete badge */}
      {unlockedCount >= total && answeredCount >= total && (
        <div style={{
          padding: "16px 20px",
          borderRadius: "10px",
          border: "1.5px solid var(--accent-teal)",
          background: "var(--accent-teal-dim)",
          textAlign: "center",
          boxShadow: "0 0 20px var(--accent-teal-dim)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--accent-teal)",
            fontWeight: 700,
          }}>
            🎉 Hoàn thành {meta.label} — {correctCount}/{total} câu đúng
          </span>
        </div>
      )}
    </div>
  );
}
