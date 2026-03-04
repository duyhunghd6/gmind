"use client";

import { useState, useCallback, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import KanbanCard from "@/components/KanbanCard";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { kanbanBoards, type KanbanColumnData } from "@/data/kanban-data";

export default function KanbanScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [boardId, setBoardId] = useState(kanbanBoards[0].id);
  const [columns, setColumns] = useState<KanbanColumnData[]>(kanbanBoards[0].columns);

  /* Auto-select board from URL hash (on mount + on hash change) */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      const b = kanbanBoards.find((x) => x.id === hash);
      if (b) {
        setBoardId(b.id);
        setColumns(b.columns.map((c) => ({ ...c, cards: [...c.cards] })));
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const board = kanbanBoards.find((b) => b.id === boardId) || kanbanBoards[0];

  const switchBoard = useCallback((id: string) => {
    setBoardId(id);
    const b = kanbanBoards.find((x) => x.id === id);
    if (b) setColumns(b.columns.map((c) => ({ ...c, cards: [...c.cards] })));
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      const srcCol = next.find((c) => c.id === source.droppableId);
      const dstCol = next.find((c) => c.id === destination.droppableId);
      if (!srcCol || !dstCol) return prev;

      const [moved] = srcCol.cards.splice(source.index, 1);
      dstCol.cards.splice(destination.index, 0, moved);
      return next;
    });
  }, []);

  // Stats
  const totalCards = columns.reduce((sum, c) => sum + c.cards.length, 0);
  const doneCards = columns.find((c) => c.id === "done")?.cards.length || 0;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>📋 Kanban Board</h1>
        <DsIdBadge id="ds:screen:kanban-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>@hello-pangea/dnd</code> — Drag-and-drop chuyên nghiệp. Kéo thả card giữa các cột, WIP limits, board switching.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* Board Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
            {kanbanBoards.map((b) => (
              <button
                key={b.id}
                className={`state-toggle-bar__btn${boardId === b.id ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => switchBoard(b.id)}
                style={{ fontSize: "0.75rem" }}
              >
                {b.label}
              </button>
            ))}
            <DsIdBadge id={`ds:kanban:${boardId === "sprint" ? "sprintBoard" : boardId === "release" ? "releaseBoard" : "bugTriage"}-001`} />
            <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--text-dim)" }}>
              {board.description}
            </span>
          </div>

          {/* Board Stats */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", fontSize: "0.7rem", color: "var(--text-dim)" }}>
            <span>📊 {totalCards} cards</span>
            <span>✅ {doneCards} hoàn thành</span>
            <span>📈 {totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0}% progress</span>
          </div>

          {/* Kanban Board */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
              <div className="kanban-board__columns">
                {columns.map((col) => {
                  const isOverWip = col.wipLimit !== undefined && col.cards.length > col.wipLimit;
                  return (
                    <div key={col.id} style={{ flex: "0 0 auto", minWidth: 260, maxWidth: 320 }}>
                      <div className={`kanban-column${isOverWip ? " kanban-column--drag-over" : ""}`}>
                        <div className="kanban-column__header">
                          <span className="kanban-column__title">{col.title}</span>
                          <span className="kanban-column__count">{col.cards.length}</span>
                          {col.wipLimit !== undefined && (
                            <span style={{
                              fontSize: "0.6rem",
                              padding: "1px 4px",
                              borderRadius: "3px",
                              background: isOverWip ? "rgba(255,123,114,0.15)" : "rgba(139,148,158,0.1)",
                              color: isOverWip ? "#ff7b72" : "var(--text-dim)",
                              marginLeft: "4px",
                            }}>
                              WIP {col.wipLimit}
                            </span>
                          )}
                        </div>
                        <Droppable droppableId={col.id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="kanban-column__cards"
                              style={{
                                minHeight: 60,
                                ...(snapshot.isDraggingOver ? { background: "rgba(0,229,255,0.04)", borderRadius: "6px" } : {}),
                              }}
                            >
                              {col.cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                  {(dragProvided, dragSnapshot) => (
                                    <div
                                      ref={dragProvided.innerRef}
                                      {...dragProvided.draggableProps}
                                    >
                                      <KanbanCard card={card} isDragging={dragSnapshot.isDragging} dragHandleProps={dragProvided.dragHandleProps as unknown as Record<string, unknown>} />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </DragDropContext>
        </div>
      )}

      {state === "loading" && (
        <div style={{ display: "flex", gap: "16px" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{ flex: 1, minWidth: 160 }}><Skeleton variant="card" /><div style={{ marginTop: 8 }}><Skeleton count={2} /></div></div>)}
        </div>
      )}

      {state === "empty" && <EmptyState icon="📋" title="Chưa có board nào" desc="Tạo board Kanban đầu tiên để bắt đầu quản lý dự án."><button className="btn-primary">+ Tạo board</button></EmptyState>}
      {state === "error" && <ErrorBanner title="Không thể tải board" message="Lỗi đọc dữ liệu từ FrankenSQLite. Database file may be corrupted." onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Sync bị gián đoạn — thay đổi sẽ lưu local<span className="offline-banner__timer">Retry in 5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Yêu cầu quyền PM</div><div className="forbidden-gate__desc">Bạn cần vai trò Project Manager để truy cập Kanban Board.</div><div className="forbidden-gate__code">HTTP 403 — role:pm required</div></div>}
    </div>
  );
}
