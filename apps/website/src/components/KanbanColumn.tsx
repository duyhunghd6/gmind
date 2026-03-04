"use client";

interface KanbanCardData {
  id: string;
  title: string;
  meta?: string;
}

interface KanbanColumnProps {
  title: string;
  cards: KanbanCardData[];
  state?: "default" | "hover" | "drag-over" | "disabled";
}

export default function KanbanColumn({
  title,
  cards,
  state = "default",
}: KanbanColumnProps) {
  const stateClass = state !== "default" ? `kanban-column--${state}` : "";

  return (
    <div className={`kanban-column ${stateClass}`}>
      <div className="kanban-column__header">
        <span className="kanban-column__title">{title}</span>
        <span className="kanban-column__count">{cards.length}</span>
        <button className="kanban-column__add-btn" aria-label="Thêm thẻ">
          +
        </button>
      </div>
      <div className="kanban-column__cards">
        {cards.map((card) => (
          <div key={card.id} className="kanban-card">
            <div className="kanban-card__title">{card.title}</div>
            {card.meta && (
              <div className="kanban-card__meta">{card.meta}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
