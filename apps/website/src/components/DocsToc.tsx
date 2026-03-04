"use client";

interface TocItem {
  id: string;
  label: string;
}

interface DocsTocProps {
  items: TocItem[];
  activeId?: string;
  onNavigate: (id: string) => void;
}

export default function DocsToc({ items, activeId, onNavigate }: DocsTocProps) {
  if (!items.length) return null;

  return (
    <aside className="docs-toc">
      <div className="docs-toc__title">{"> Trên trang này"}</div>
      {items.map((item) => (
        <button
          key={item.id}
          className={`docs-toc__item ${activeId === item.id ? "active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}
