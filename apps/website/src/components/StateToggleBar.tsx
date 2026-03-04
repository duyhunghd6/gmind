"use client";

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
  return (
    <div className="state-toggle-bar">
      <span className="state-toggle-bar__label">Trạng thái:</span>
      {states.map((s) => (
        <button
          key={s.id}
          className={`state-toggle-bar__btn${activeState === s.id ? " state-toggle-bar__btn--active" : ""}`}
          onClick={() => onChange(s.id)}
        >
          {s.icon} {s.label}
        </button>
      ))}
    </div>
  );
}
