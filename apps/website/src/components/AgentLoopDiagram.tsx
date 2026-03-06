"use client";

import { useState, useEffect, useCallback } from "react";

/* ──────── Data ──────── */
interface Step {
  arrow: string;
  from: string;
  to: string;
  text: string;
}

interface Phase {
  num: string;
  title: string;
  accent: string;
  emoji: string;
  steps: Step[];
  isLoop?: boolean;
}

const phases: Phase[] = [
  {
    num: "1",
    title: "Khởi tạo & Nạp Ngữ cảnh",
    accent: "var(--accent-cyan)",
    emoji: "📂",
    steps: [
      { arrow: "→", from: "CLI", to: "FS", text: "Nạp Project Codebase (cấu trúc file & metadata)" },
      { arrow: "→", from: "CLI", to: "FS", text: "Nạp .agents/rules — guardrails, style, hành vi" },
      { arrow: "→", from: "CLI", to: "FS", text: "Nạp .agents/skills — các hàm/công cụ tuỳ chỉnh" },
      { arrow: "→", from: "CLI", to: "FS", text: "Nạp .agents/workflows — quy trình đa bước" },
      { arrow: "→", from: "CLI", to: "MCP", text: "Khởi tạo kết nối MCP Servers (tool/data bên ngoài)" },
      { arrow: "⚡", from: "CLI", to: "", text: "Xây dựng System Prompt + Tool Definitions" },
    ],
  },
  {
    num: "2",
    title: "Chờ lệnh từ User",
    accent: "var(--accent-teal)",
    emoji: "⏳",
    steps: [
      { arrow: "←", from: "CLI", to: "User", text: "Sẵn sàng. Chờ nhập lệnh..." },
      { arrow: "→", from: "User", to: "CLI", text: "Nhập Prompt (ví dụ: \"Triển khai tính năng mới\")" },
      { arrow: "→", from: "CLI", to: "LLM", text: "Gửi System Context (Rules, Tools) + User Prompt" },
    ],
  },
  {
    num: "3",
    title: "Agent Loop — Xử lý Prompt",
    accent: "var(--accent-amber)",
    emoji: "🔄",
    isLoop: true,
    steps: [
      { arrow: "←", from: "LLM", to: "CLI", text: "LLM trả về: Thought Process + Tool Call" },
      { arrow: "→", from: "CLI", to: "FS", text: "Đọc/Ghi file hoặc Thực thi Skill" },
      { arrow: "→", from: "CLI", to: "MCP", text: "Gọi MCP tool / lấy dữ liệu bên ngoài" },
      { arrow: "→", from: "CLI", to: "LLM", text: "Gửi kết quả thực thi về LLM" },
      { arrow: "⟲", from: "LLM", to: "CLI", text: "Lặp lại cho đến khi task hoàn thành (retry_completion)" },
    ],
  },
  {
    num: "4",
    title: "Hoàn thành",
    accent: "var(--accent-teal)",
    emoji: "✅",
    steps: [
      { arrow: "←", from: "CLI", to: "User", text: "Hiển thị kết quả / Code đã được áp dụng thành công" },
    ],
  },
];

/* ──────── Component ──────── */
export default function AgentLoopDiagram() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    let idx = 0;
    setActiveIdx(0);
    const timer = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setActiveIdx(idx);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoCycle]);

  const handleClick = useCallback((idx: number) => {
    setAutoCycle(false);
    setActiveIdx((prev) => (prev === idx ? null : idx));
  }, []);

  /* participant badges */
  const participants = [
    { id: "User", label: "👨‍💻 User", color: "var(--accent-rose)" },
    { id: "CLI", label: "⚡ Gemini CLI", color: "var(--accent-cyan)" },
    { id: "FS", label: "📁 .agents/", color: "var(--accent-teal)" },
    { id: "MCP", label: "🔌 MCP", color: "var(--accent-amber)" },
    { id: "LLM", label: "🤖 Gemini LLM", color: "var(--accent-rose)" },
  ];

  return (
    <div>
      {/* Participant bar */}
      <div style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "16px",
        justifyContent: "center",
      }}>
        {participants.map((p) => (
          <span
            key={p.id}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "var(--surface-elevated)",
              border: `1px solid ${p.color}`,
              color: p.color,
              whiteSpace: "nowrap",
            }}
          >
            {p.label}
          </span>
        ))}
      </div>

      {/* Phases */}
      <div className="agent-loop">
        {phases.map((phase, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div key={phase.num}>
              {idx > 0 && (
                <div className="agent-loop__connector">
                  <div className={`agent-loop__connector-line${isActive || activeIdx === idx - 1 ? " active" : ""}`}
                    style={isActive || activeIdx === idx - 1 ? { "--phase-accent": phase.accent } as React.CSSProperties : undefined}
                  >
                    <span>↓</span>
                  </div>
                </div>
              )}

              <div
                className={`agent-loop__phase${isActive ? " active" : ""}`}
                style={{ "--phase-accent": phase.accent } as React.CSSProperties}
                onClick={() => handleClick(idx)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(idx);
                  }
                }}
              >
                <div className="agent-loop__phase-header">
                  <span
                    className="agent-loop__phase-num"
                    style={{
                      color: phase.accent,
                      background: `color-mix(in srgb, ${phase.accent} 12%, transparent)`,
                    }}
                  >
                    {phase.emoji} Giai đoạn {phase.num}
                  </span>
                  <span className="agent-loop__phase-title">{phase.title}</span>
                  {phase.isLoop && (
                    <span className="agent-loop__loop-badge">⟲ loop</span>
                  )}
                  <span className="agent-loop__phase-chevron">▼</span>
                </div>

                <div className="agent-loop__steps">
                  {phase.steps.map((step, i) => (
                    <div key={i} className={`agent-loop__step${isActive ? " highlight" : ""}`}>
                      <span
                        className="agent-loop__step-arrow"
                        style={{ color: phase.accent }}
                      >
                        {step.arrow}
                      </span>
                      {step.from && (
                        <span
                          className="agent-loop__step-label"
                          style={{
                            color: phase.accent,
                            background: `color-mix(in srgb, ${phase.accent} 10%, transparent)`,
                          }}
                        >
                          {step.from}{step.to ? ` → ${step.to}` : ""}
                        </span>
                      )}
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
