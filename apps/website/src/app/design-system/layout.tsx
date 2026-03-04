"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const screens = [
  { href: "/design-system", label: "Hub", icon: "🏠" },
  { href: "/design-system/terminal", label: "Terminal", icon: "💻" },
  { href: "/design-system/git-graph", label: "Đồ thị Git", icon: "🌿" },
  { href: "/design-system/kanban", label: "Kanban", icon: "📋" },
  { href: "/design-system/knowledge-graph", label: "Knowledge Graph", icon: "🧠" },
  { href: "/design-system/approval", label: "Phê duyệt & RTM", icon: "✅" },
  { href: "/design-system/timeline", label: "Timeline", icon: "📅" },
  { href: "/design-system/components", label: "Components", icon: "🧩" },
];

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="docs-sidebar__group">
          <div className="docs-sidebar__group-title">{"> Screens"}</div>
          {screens.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`docs-sidebar__item${pathname === s.href ? " active" : ""}`}
            >
              <span style={{ marginRight: "8px" }}>{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>
      </aside>
      <main className="docs-content">
        {children}
      </main>
    </div>
  );
}
