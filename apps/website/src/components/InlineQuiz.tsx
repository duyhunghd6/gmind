"use client";

import { useState, useCallback, useMemo } from "react";
import type { QuizEntry } from "@/data/diagrams";

/* ──────── Props ──────── */
interface InlineQuizProps {
  quiz: QuizEntry;
  accent?: "cyan" | "teal" | "amber" | "rose";
  onAnswered?: (correct: boolean) => void;
}

/* ──────── Shuffle helper ──────── */
function shuffleWithMapping(options: string[], correctIndex: number) {
  const indices = options.map((_, i) => i);
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffled = indices.map((i) => options[i]);
  const newCorrectIndex = indices.indexOf(correctIndex);
  return { shuffled, newCorrectIndex };
}

/* ──────── Component ──────── */
export default function InlineQuiz({ quiz, accent = "cyan", onAnswered }: InlineQuizProps) {
  const { shuffled, newCorrectIndex } = useMemo(
    () => shuffleWithMapping(quiz.options, quiz.correctIndex),
    [quiz.options, quiz.correctIndex]
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswered?.(idx === newCorrectIndex);
  }, [answered, newCorrectIndex, onAnswered]);

  const isCorrect = selected === newCorrectIndex;

  return (
    <div
      className="quiz-card"
      style={{
        margin: "20px 0 28px",
        padding: "24px",
        borderRadius: "12px",
        border: answered
          ? `1.5px solid ${isCorrect ? "var(--accent-teal)" : "var(--accent-rose)"}`
          : `1.5px solid var(--accent-${accent})`,
        background: "var(--surface)",
        boxShadow: answered
          ? "none"
          : `0 0 24px var(--accent-${accent}-dim), 0 4px 12px rgba(0,0,0,0.08)`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: answered
          ? (isCorrect ? "var(--accent-teal)" : "var(--accent-rose)")
          : `var(--accent-${accent})`,
        transition: "background 0.3s ease",
      }} />

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        marginTop: "4px",
      }}>
        <span style={{
          fontSize: "1.2rem",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: `var(--accent-${accent}-dim)`,
        }}>🧠</span>
        <div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: `var(--accent-${accent})`,
            fontWeight: 700,
          }}>Kiểm tra kiến thức</span>
        </div>
      </div>

      {/* Question */}
      <p style={{
        fontSize: "1rem",
        lineHeight: 1.7,
        marginBottom: "16px",
        color: "var(--text)",
        fontWeight: 600,
      }}>{quiz.question}</p>

      {/* Options — shuffled */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: answered ? "18px" : "0" }}>
        {shuffled.map((opt, i) => {
          const isThis = selected === i;
          const isCorrectOption = i === newCorrectIndex;
          const isHovered = hoveredIdx === i;

          let bg = "var(--surface-elevated)";
          let borderColor = "var(--border)";
          let textColor = "var(--text)";
          let icon = "";
          let opacity = 1;
          let transform = "none";
          let fontWeight: number | string = 400;
          let boxShadow = "none";

          if (answered) {
            if (isCorrectOption) {
              bg = "rgba(20, 184, 166, 0.12)";
              borderColor = "var(--accent-teal)";
              textColor = "var(--accent-teal)";
              icon = "✅ ";
              fontWeight = 600;
              boxShadow = "0 0 12px var(--accent-teal-dim)";
            } else if (isThis && !isCorrectOption) {
              bg = "rgba(244, 63, 94, 0.12)";
              borderColor = "var(--accent-rose)";
              textColor = "var(--accent-rose)";
              icon = "❌ ";
              fontWeight = 500;
            } else {
              opacity = 0.4;
            }
          } else if (isHovered) {
            borderColor = `var(--accent-${accent})`;
            bg = `var(--accent-${accent}-dim)`;
            transform = "translateX(4px)";
            boxShadow = `0 2px 8px var(--accent-${accent}-dim)`;
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => !answered && setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              disabled={answered}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1.5px solid ${borderColor}`,
                background: bg,
                color: textColor,
                textAlign: "left",
                cursor: answered ? "default" : "pointer",
                fontSize: "0.9rem",
                fontWeight,
                fontFamily: "inherit",
                lineHeight: 1.5,
                opacity,
                transform,
                boxShadow,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {icon}{opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div style={{
          padding: "16px",
          borderRadius: "10px",
          background: isCorrect ? "rgba(20, 184, 166, 0.06)" : "rgba(244, 63, 94, 0.06)",
          border: `1px solid ${isCorrect ? "var(--accent-teal-dim)" : "var(--accent-rose-dim)"}`,
          animation: "fadeIn 0.4s ease",
        }}>
          <p style={{
            color: isCorrect ? "var(--accent-teal)" : "var(--accent-rose)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 700,
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            {isCorrect ? "✅ Chính xác!" : "❌ Chưa đúng — Đáp án đúng đã được highlight"}
          </p>
          <p style={{
            color: "var(--text)",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            marginBottom: "10px",
          }}>
            {quiz.explanation}
          </p>
          <div style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "10px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>💡</span>
            <p style={{
              color: "var(--text-dim)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              fontStyle: "italic",
              margin: 0,
            }}>{quiz.theory}</p>
          </div>
        </div>
      )}
    </div>
  );
}
