"use client";

import { useRef, useCallback } from "react";

export type ScreenState = "default" | "loading" | "empty" | "error" | "offline" | "forbidden";

interface StateToggleBarProps {
  activeState: ScreenState;
  onChange: (state: ScreenState) => void;
}

const states: { id: ScreenState; label: string; icon: string }[] = [
  { id: "default", label: "Mặc định", icon: "✅" },
  { id: "loading", label: "Đang tải", icon: "⏳" },
  { id: "empty", label: "Trống", icon: "📭" },
  { id: "error", label: "Lỗi", icon: "❌" },
  { id: "offline", label: "Ngoại tuyến", icon: "📡" },
  { id: "forbidden", label: "Cấm", icon: "🔒" },
];

export default function StateToggleBar({ activeState, onChange }: StateToggleBarProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = states.findIndex((s) => s.id === activeState);
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % states.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + states.length) % states.length;
      } else {
        return;
      }
      onChange(states[next].id);
      const btns = groupRef.current?.querySelectorAll<HTMLElement>('[role="radio"]');
      btns?.[next]?.focus();
    },
    [activeState, onChange]
  );

  return (
    <div className="state-toggle-bar" role="radiogroup" aria-label="Chuyển đổi trạng thái" ref={groupRef} onKeyDown={handleKeyDown}>
      <span className="state-toggle-bar__label" id="state-toggle-label">Trạng thái:</span>
      {states.map((s) => (
        <button
          key={s.id}
          className={`state-toggle-bar__btn${activeState === s.id ? " state-toggle-bar__btn--active" : ""}`}
          onClick={() => onChange(s.id)}
          role="radio"
          aria-checked={activeState === s.id}
          aria-label={`${s.label} (${s.icon})`}
          tabIndex={activeState === s.id ? 0 : -1}
          type="button"
        >
          <span aria-hidden="true">{s.icon}</span> {s.label}
        </button>
      ))}
    </div>
  );
}

