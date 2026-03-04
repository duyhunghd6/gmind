"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import KanbanColumn from "@/components/KanbanColumn";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const initialData = {
  backlog: [
    { id: "t1", title: "Thiết kế API Gateway", meta: "bd-001 · P1" },
    { id: "t2", title: "Tạo schema migration", meta: "bd-002 · P2" },
    { id: "t3", title: "Viết docs cho mcp_mail", meta: "bd-007 · P3" },
  ],
  inProgress: [
    { id: "t4", title: "Implement FrankenSQLite driver", meta: "bd-003 · P0" },
  ],
  review: [
    { id: "t5", title: "Setup CI/CD pipeline", meta: "bd-004 · P1" },
    { id: "t6", title: "Viết unit tests cho Zvec", meta: "bd-005 · P2" },
  ],
  done: [
    { id: "t7", title: "Khởi tạo monorepo", meta: "bd-006 · P1 · ✓" },
    { id: "t8", title: "Setup pnpm workspace", meta: "bd-008 · P2 · ✓" },
  ],
};

type ColKey = keyof typeof initialData;

export default function KanbanScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [data, setData] = useState(initialData);
  const [moving, setMoving] = useState<{ card: string; from: ColKey } | null>(null);

  const handleCardClick = (cardId: string, col: ColKey) => {
    if (moving && moving.card === cardId) { setMoving(null); return; }
    setMoving({ card: cardId, from: col });
  };

  const handleColumnClick = (targetCol: ColKey) => {
    if (!moving || moving.from === targetCol) return;
    setData((prev) => {
      const card = prev[moving.from].find((c) => c.id === moving.card);
      if (!card) return prev;
      return {
        ...prev,
        [moving.from]: prev[moving.from].filter((c) => c.id !== moving.card),
        [targetCol]: [...prev[targetCol], card],
      };
    });
    setMoving(null);
  };

  const colNames: Record<ColKey, string> = { backlog: "Backlog", inProgress: "Đang làm", review: "Review", done: "Hoàn thành" };

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>📋 Kanban Board</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-kanban-column</code> + <code>ds-lay-kanban-board</code> — Click card → click column để di chuyển.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {moving && <div style={{ padding: "8px 12px", marginBottom: "12px", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
            📦 Đang di chuyển card — click vào cột đích để thả
          </div>}
          <div className="kanban-board">
            <div className="kanban-board__columns">
              {(Object.keys(data) as ColKey[]).map((col) => (
                <div key={col} onClick={() => handleColumnClick(col)} style={{ cursor: moving ? "pointer" : "default" }}>
                  <div className={`kanban-column${moving && moving.from !== col ? " kanban-column--drag-over" : ""}`}>
                    <div className="kanban-column__header">
                      <span className="kanban-column__title">{colNames[col]}</span>
                      <span className="kanban-column__count">{data[col].length}</span>
                    </div>
                    <div className="kanban-column__cards">
                      {data[col].map((card) => (
                        <div
                          key={card.id}
                          className="kanban-card"
                          onClick={(e) => { e.stopPropagation(); handleCardClick(card.id, col); }}
                          style={moving?.card === card.id ? { borderColor: "var(--accent-cyan)", boxShadow: "0 0 12px rgba(0,229,255,0.2)" } : {}}
                        >
                          <div className="kanban-card__title">{card.title}</div>
                          <div className="kanban-card__meta">{card.meta}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {state === "loading" && (
        <div style={{ display: "flex", gap: "16px" }}>
          {[1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, minWidth: 200 }}><Skeleton variant="card" /><div style={{ marginTop: 8 }}><Skeleton count={2} /></div></div>)}
        </div>
      )}

      {state === "empty" && <EmptyState icon="📋" title="Chưa có board nào" desc="Tạo board Kanban đầu tiên để bắt đầu quản lý dự án."><button className="btn-primary">+ Tạo board</button></EmptyState>}
      {state === "error" && <ErrorBanner title="Không thể tải board" message="Lỗi đọc dữ liệu từ FrankenSQLite. Database file may be corrupted." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Sync bị gián đoạn — thay đổi sẽ lưu local<span className="offline-banner__timer">Retry in 5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Yêu cầu quyền PM</div><div className="forbidden-gate__desc">Bạn cần vai trò Project Manager để truy cập Kanban Board.</div><div className="forbidden-gate__code">HTTP 403 — role:pm required</div></div>}
    </div>
  );
}
