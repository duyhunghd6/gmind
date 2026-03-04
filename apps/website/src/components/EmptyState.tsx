"use client";

import { type ReactNode } from "react";

interface EmptyStateProps { icon?: string; title: string; desc?: string; children?: ReactNode; }

export default function EmptyState({ icon = "📭", title, desc, children }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <div className="empty-state__title">{title}</div>
      {desc && <div className="empty-state__desc">{desc}</div>}
      {children && <div className="empty-state__cta">{children}</div>}
    </div>
  );
}
