"use client";

import { useState } from "react";
import type { KanbanCard as KanbanCardData } from "@/data/kanban-data";

const PRIORITY_BADGE: Record<string, { bg: string; color: string }> = {
  P0: { bg: "rgba(255,123,114,0.15)", color: "#ff7b72" },
  P1: { bg: "rgba(255,166,87,0.15)", color: "#ffa657" },
  P2: { bg: "rgba(210,153,34,0.15)", color: "#d29922" },
  P3: { bg: "rgba(139,148,158,0.15)", color: "#8b949e" },
};

/* Shared interactive style */
const clickable: React.CSSProperties = {
  cursor: "pointer",
  transition: "opacity 150ms",
};

interface KanbanCardProps {
  card: KanbanCardData;
  isDragging?: boolean;
  dragHandleProps?: Record<string, unknown>;
}

export default function KanbanCard({ card, isDragging, dragHandleProps }: KanbanCardProps) {
  const badge = PRIORITY_BADGE[card.priority] || PRIORITY_BADGE.P3;
  const [showDetail, setShowDetail] = useState(false);
  const [showAssignee, setShowAssignee] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBeads, setShowBeads] = useState(false);

  return (
    <div
      className="kanban-card"
      style={{
        position: "relative",
        ...(isDragging ? { borderColor: "var(--accent-cyan)", boxShadow: "0 8px 24px rgba(0,229,255,0.2)", transform: "rotate(2deg)" } : {}),
      }}
    >
      {/* Drag Handle */}
      {dragHandleProps && (
        <div
          {...dragHandleProps}
          style={{
            position: "absolute", top: 6, right: 6,
            width: 20, height: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "grab", borderRadius: 3,
            color: "var(--text-dim, #8b949e)", fontSize: "0.75rem",
            opacity: 0.5, transition: "opacity 150ms, background 150ms",
          }}
          title="Kéo để di chuyển"
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "rgba(139,148,158,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.background = "transparent"; }}
        >
          ⠿
        </div>
      )}

      {/* Labels */}
      {card.labels && card.labels.length > 0 && (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px", paddingRight: 24 }}>
          {card.labels.map((label) => (
            <span key={label} style={{
              fontSize: "0.6rem", padding: "1px 6px", borderRadius: "3px",
              background: "rgba(139,148,158,0.15)", color: "var(--text-dim)",
              border: "1px solid rgba(139,148,158,0.1)",
            }}>
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Title — clickable */}
      <div
        className="kanban-card__title"
        style={{ ...clickable }}
        onClick={() => setShowDetail(!showDetail)}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-cyan)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
        title="Click để xem chi tiết"
      >
        {card.title}
      </div>

      {/* Detail popover */}
      {showDetail && (
        <div style={{
          margin: "6px 0", padding: "8px 10px", borderRadius: "6px",
          background: "var(--surface-elevated, #1c2333)", border: "1px solid var(--border)",
          fontSize: "0.7rem", lineHeight: 1.5, color: "var(--text-dim)",
        }}>
          <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>📝 {card.title}</div>
          {card.description && <div>{card.description}</div>}
          <div style={{ marginTop: 4 }}>
            <span style={{ color: badge.color }}>Priority: {card.priority}</span>
            {card.assignee && <span> · Assignee: {card.assignee}</span>}
            {card.beadsId && <span> · ID: {card.beadsId}</span>}
          </div>
          <div style={{ marginTop: 6, fontSize: "0.6rem", color: "var(--accent-cyan)", cursor: "pointer" }} onClick={() => setShowDetail(false)}>
            ✕ Đóng
          </div>
        </div>
      )}

      {/* Description */}
      {card.description && !showDetail && (
        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px", lineHeight: 1.4 }}>
          {card.description}
        </div>
      )}

      {/* Footer: Assignee + Priority + Beads ID + Due */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
        {/* Assignee — clickable */}
        {card.assignee && card.assignee !== "—" && (
          <span style={{ position: "relative" }}>
            <span
              style={{
                width: 20, height: 20, borderRadius: "50%",
                background: card.assigneeColor || "#8b949e",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.55rem", fontWeight: 700, color: "#fff",
                flexShrink: 0, cursor: "pointer",
                outline: showAssignee ? "2px solid var(--accent-cyan)" : "none",
              }}
              title={`${card.assignee} — click để xem`}
              onClick={() => setShowAssignee(!showAssignee)}
            >
              {card.assignee.slice(0, 2).toUpperCase()}
            </span>
            {showAssignee && (
              <div style={{
                position: "absolute", top: 24, left: 0, zIndex: 20,
                padding: "6px 10px", borderRadius: "6px", whiteSpace: "nowrap",
                background: "var(--surface-elevated, #1c2333)", border: "1px solid var(--border)",
                fontSize: "0.65rem", color: "var(--text)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>👤 {card.assignee}</div>
                <div style={{ color: "var(--text-dim)" }}>Role: Developer</div>
                <div style={{ color: "var(--text-dim)" }}>Status: 🟢 Online</div>
              </div>
            )}
          </span>
        )}

        {/* Priority badge */}
        <span style={{
          fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px",
          borderRadius: "3px", background: badge.bg, color: badge.color,
        }}>
          {card.priority}
        </span>

        {/* Beads ID — clickable */}
        {card.beadsId && (
          <span style={{ position: "relative" }}>
            <span
              style={{
                fontSize: "0.6rem", fontFamily: "var(--font-mono)",
                color: "var(--accent-cyan)", opacity: 0.7,
                cursor: "pointer", textDecoration: showBeads ? "underline" : "none",
              }}
              title={`${card.beadsId} — click để xem Beads`}
              onClick={() => setShowBeads(!showBeads)}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            >
              {card.beadsId}
            </span>
            {showBeads && (
              <div style={{
                position: "absolute", top: -60, left: 0, zIndex: 20,
                padding: "8px 10px", borderRadius: "6px", whiteSpace: "nowrap",
                background: "var(--surface-elevated, #1c2333)", border: "1px solid var(--border)",
                fontSize: "0.65rem", color: "var(--text)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                minWidth: 180,
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>🔗 {card.beadsId}</div>
                <div style={{ color: "var(--text-dim)" }}>Git worktree: <code>feat/{card.beadsId}</code></div>
                <div style={{ color: "var(--text-dim)" }}>Branch: <code>feature/{card.beadsId?.split("-")[0]}</code></div>
                <div style={{ color: "var(--text-dim)" }}>Commits: 3</div>
              </div>
            )}
          </span>
        )}

        {/* Due date — clickable */}
        {card.dueDate && (
          <span style={{ position: "relative", marginLeft: "auto" }}>
            <span
              style={{
                fontSize: "0.6rem", color: "var(--text-dim)",
                cursor: "pointer",
                background: showDatePicker ? "rgba(0,229,255,0.08)" : "transparent",
                padding: "1px 4px", borderRadius: "3px",
              }}
              title="Click để đổi deadline"
              onClick={() => setShowDatePicker(!showDatePicker)}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-cyan)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; }}
            >
              📅 {card.dueDate}
            </span>
            {showDatePicker && (
              <div style={{
                position: "absolute", bottom: 22, right: 0, zIndex: 20,
                padding: "8px 10px", borderRadius: "6px",
                background: "var(--surface-elevated, #1c2333)", border: "1px solid var(--border)",
                fontSize: "0.65rem", color: "var(--text)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                minWidth: 140,
              }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>📅 Chọn deadline</div>
                <input
                  type="date"
                  defaultValue="2026-03-10"
                  style={{
                    width: "100%", padding: "4px 6px", borderRadius: "4px",
                    border: "1px solid var(--border)", background: "var(--bg, #0d1117)",
                    color: "var(--text)", fontSize: "0.65rem",
                  }}
                />
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <button className="btn-primary btn-sm" style={{ fontSize: "0.6rem", padding: "2px 8px" }}>Lưu</button>
                  <button className="btn-secondary btn-sm" style={{ fontSize: "0.6rem", padding: "2px 8px" }} onClick={() => setShowDatePicker(false)}>Hủy</button>
                </div>
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
