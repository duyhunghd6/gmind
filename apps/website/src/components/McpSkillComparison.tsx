"use client";

import { useState } from "react";

/* ──────── Data ──────── */
interface Scenario {
  id: string;
  title: string;
  withLabel: string;
  withoutLabel: string;
  accent: string;
  withSteps: { icon: string; actor: string; text: string }[];
  withResult: string;
  withoutSteps: { icon: string; actor: string; text: string }[];
  withoutResult: string;
  withoutPain: string[];
}

const scenarios: Scenario[] = [
  {
    id: "mcp-figma",
    title: "MCP Figma",
    withLabel: "CÓ MCP Figma",
    withoutLabel: "KHÔNG CÓ MCP",
    accent: "var(--accent-cyan)",
    withSteps: [
      { icon: "👨‍💻", actor: "Dev", text: "\"Implement login form theo design Figma\"" },
      { icon: "🤖", actor: "LLM", text: "tool_call: figma.getFileComponents(\"login-page\")" },
      { icon: "🔌", actor: "MCP", text: "GET /v1/files/{key}/components → JSON" },
      { icon: "🤖", actor: "LLM", text: "tool_call: figma.getStyleTokens(\"design-system\")" },
      { icon: "🔌", actor: "MCP", text: "Design tokens: colors, typography, effects" },
      { icon: "🤖", actor: "LLM", text: "Generate code pixel-perfect (EXACT specs)" },
    ],
    withResult: "✅ Login form khớp Figma 100% — không cần sửa lại",
    withoutSteps: [
      { icon: "👨‍💻", actor: "Dev", text: "Mở Figma, inspect từng element thủ công" },
      { icon: "👨‍💻", actor: "Dev", text: "Copy: \"padding 16px, màu xanh, bo góc 8px...\"" },
      { icon: "🤖", actor: "LLM", text: "Generate code (đoán giá trị không được đề cập)" },
      { icon: "👨‍💻", actor: "Dev", text: "So sánh thủ công → sai màu, sai spacing" },
      { icon: "👨‍💻", actor: "Dev", text: "\"Sửa lại: padding 16px không phải 12px...\"" },
    ],
    withoutResult: "🔄 Lặp nhiều vòng sửa — tốn thời gian, dễ sai",
    withoutPain: [
      "Dev phải tự đọc & copy giá trị Figma",
      "LLM đoán giá trị → sai spacing/color",
      "Vòng lặp sửa-chạy-so nhiều lần",
    ],
  },
  {
    id: "ui-testing",
    title: "UI Testing Skill",
    withLabel: "CÓ Skill + Browser Tools",
    withoutLabel: "KHÔNG CÓ Skill",
    accent: "var(--accent-amber)",
    withSteps: [
      { icon: "👨‍💻", actor: "Dev", text: "\"Test login form: happy path + validation\"" },
      { icon: "🤖", actor: "LLM", text: "Đọc SKILL.md → hiểu UI testing patterns" },
      { icon: "🌐", actor: "Browser", text: "browser_open(\"localhost:3000/login\")" },
      { icon: "🌐", actor: "DOM", text: "browser_get_dom() → [#email, #password, #submit]" },
      { icon: "🤖", actor: "LLM", text: "browser_type, browser_click → thực thi E2E" },
      { icon: "🌐", actor: "Browser", text: "browser_screenshot() → verify visual result" },
    ],
    withResult: "✅ 3/3 test passed — test file + report tự động",
    withoutSteps: [
      { icon: "🤖", actor: "LLM", text: "Generate test code (đoán selectors: \"#email\"...)" },
      { icon: "👨‍💻", actor: "Dev", text: "Chạy test thủ công → ❌ selector sai" },
      { icon: "👨‍💻", actor: "Dev", text: "\"Sửa: không phải #email mà là [data-testid]\"" },
      { icon: "👨‍💻", actor: "Dev", text: "Chạy lại → timing issue, element chưa render" },
    ],
    withoutResult: "🔄 Debug thủ công — không biết page trông thế nào",
    withoutPain: [
      "LLM không mở được browser, đoán DOM",
      "Selector sai → debug thủ công nhiều vòng",
      "Không có screenshot → khó debug visual bugs",
    ],
  },
];

/* ──────── Component ──────── */
export default function McpSkillComparison() {
  const [activeScenario, setActiveScenario] = useState(0);

  const s = scenarios[activeScenario];

  return (
    <div>
      {/* Scenario Tabs */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
      }}>
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => setActiveScenario(idx)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              padding: "6px 16px",
              borderRadius: "6px",
              border: `1px solid ${activeScenario === idx ? sc.accent : "var(--border)"}`,
              background: activeScenario === idx
                ? `color-mix(in srgb, ${sc.accent} 12%, transparent)`
                : "var(--surface)",
              color: activeScenario === idx ? sc.accent : "var(--text-dim)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {idx === 0 ? "🔌" : "🧪"} {sc.title}
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid-2" style={{ alignItems: "stretch", gap: "16px" }}>
        {/* WITH */}
        <div className="ve-card" style={{
          borderLeft: `4px solid ${s.accent}`,
          position: "relative",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              padding: "3px 10px",
              borderRadius: "4px",
              color: "var(--accent-teal)",
              background: "var(--accent-teal-dim)",
              fontWeight: 700,
            }}>✅ {s.withLabel}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
            {s.withSteps.map((step, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "8px",
                fontSize: "0.8rem",
                alignItems: "flex-start",
              }}>
                <span style={{ flexShrink: 0, width: "20px", textAlign: "center" }}>{step.icon}</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  padding: "1px 6px",
                  borderRadius: "3px",
                  background: `color-mix(in srgb, ${s.accent} 10%, transparent)`,
                  color: s.accent,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}>{step.actor}</span>
                <span style={{ color: "var(--text-dim)" }}>{step.text}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: "8px 12px",
            borderRadius: "6px",
            background: "var(--accent-teal-dim)",
            border: "1px solid var(--accent-teal)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--accent-teal)",
          }}>
            {s.withResult}
          </div>
        </div>

        {/* WITHOUT */}
        <div className="ve-card" style={{
          borderLeft: "4px solid var(--accent-rose)",
          position: "relative",
          opacity: 0.85,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              padding: "3px 10px",
              borderRadius: "4px",
              color: "var(--accent-rose)",
              background: "var(--accent-rose-dim)",
              fontWeight: 700,
            }}>❌ {s.withoutLabel}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
            {s.withoutSteps.map((step, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "8px",
                fontSize: "0.8rem",
                alignItems: "flex-start",
              }}>
                <span style={{ flexShrink: 0, width: "20px", textAlign: "center" }}>{step.icon}</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  padding: "1px 6px",
                  borderRadius: "3px",
                  background: "var(--accent-rose-dim)",
                  color: "var(--accent-rose)",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}>{step.actor}</span>
                <span style={{ color: "var(--text-dim)" }}>{step.text}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: "8px 12px",
            borderRadius: "6px",
            background: "var(--accent-rose-dim)",
            border: "1px dashed var(--accent-rose)",
            fontSize: "0.8rem",
            color: "var(--accent-rose)",
            marginBottom: "10px",
          }}>
            {s.withoutResult}
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
            {s.withoutPain.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "2px" }}>
                <span style={{ color: "var(--accent-rose)" }}>•</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
