"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";


/* ---- 3-Level Menu Data ---- */
interface SubItem {
  href: string;
  label: string;
}

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  subs?: SubItem[];
}

interface Category {
  title: string;
  items: MenuItem[];
}

const menu: Category[] = [
  {
    title: "Design System",
    items: [
      {
        href: "/design-system",
        label: "Hub",
        icon: "🏠",
        subs: [
          { href: "/design-system#colors", label: "Màu sắc" },
          { href: "/design-system#spacing", label: "Thang Khoảng cách" },
          { href: "/design-system#typography", label: "Font" },
          { href: "/design-system#animations", label: "Hiệu ứng Chuyển động" },
          { href: "/design-system#cards", label: "Các biến thể Thẻ" },
          { href: "/design-system#buttons", label: "Nút (Buttons)" },
          { href: "/design-system#badges", label: "Nhãn trạng thái" },
          { href: "/design-system#grid-layout", label: "Bố cục Lưới" },
          { href: "/design-system#states", label: "Ma trận Trạng thái" },
          { href: "/design-system#flows", label: "Luồng Người dùng" },
        ],
      },
    ],
  },
  {
    title: "Screens",
    items: [
      {
        href: "/design-system/terminal",
        label: "Terminal",
        icon: "💻",
        subs: [
          { href: "/design-system/terminal#default", label: "Mặc định" },
          { href: "/design-system/terminal#mosaic", label: "Mosaic Layout" },
        ],
      },
      { href: "/design-system/git-graph", label: "Beads: Đồ thị Git", icon: "🌿" },
      { href: "/design-system/kanban", label: "Kanban", icon: "📋" },
      {
        href: "/design-system/knowledge-graph",
        label: "Knowledge Graph",
        icon: "🧠",
      },
      { href: "/design-system/approval", label: "Phê duyệt & RTM", icon: "✅" },
      { href: "/design-system/timeline", label: "Timeline", icon: "📅" },
      { href: "/design-system/components", label: "Components", icon: "🧩" },
    ],
  },
  {
    title: "Explorer",
    items: [
      { href: "/design-system/doc-viewer", label: "Doc Viewer", icon: "📄" },
      { href: "/design-system/explorer", label: "Gmind Explorer", icon: "🔍" },
      { href: "/design-system/beads-traversal", label: "Beads Traversal", icon: "🔗" },
    ],
  },
  {
    title: "Storyboard",
    items: [
      {
        href: "/design-system/storyboard",
        label: "Overview",
        icon: "🗺️",
        subs: [
          { href: "/design-system/storyboard/uc-01-pm-sprint-review", label: "UC-01: PM Sprint Review" },
          { href: "/design-system/storyboard/uc-02-pm-trace-approve", label: "UC-02: PM Trace & Approve" },
          { href: "/design-system/storyboard/uc-03-dev-code-search", label: "UC-03: Dev Code Search" },
          { href: "/design-system/storyboard/uc-04-dev-pick-task", label: "UC-04: Dev Pick Task" },
          { href: "/design-system/storyboard/uc-05-qa-bug-detection", label: "UC-05: QA Bug Detection" },
          { href: "/design-system/storyboard/uc-06-qa-code-review", label: "UC-06: QA Code Review" },
          { href: "/design-system/storyboard/uc-07-architect-spike", label: "UC-07: Architect Spike" },
          { href: "/design-system/storyboard/uc-08-release-deploy", label: "UC-08: Release Deploy" },
          { href: "/design-system/storyboard/uc-09-bug-triage-fix", label: "UC-09: Bug Triage Fix" },
          { href: "/design-system/storyboard/uc-10-bug-hotfix-verify", label: "UC-10: Hotfix Verify" },
        ],
      },
    ],
  },
];

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  /* Auto-expand the menu item matching current route */
  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const cat of menu) {
      for (const item of cat.items) {
        if (pathname === item.href || pathname.startsWith(item.href + "/")) {
          next[item.href] = true;
        }
      }
    }
    setExpanded((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const isActive = (href: string) => pathname === href;

  /* Persist sidebar scroll position across navigation */
  const sidebarRef = useRef<HTMLElement>(null);
  const SIDEBAR_SCROLL_KEY = "ds-sidebar-scroll";

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
    if (saved) el.scrollTop = parseInt(saved, 10);
  }, []);

  const handleSidebarScroll = useCallback(() => {
    const el = sidebarRef.current;
    if (el) sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(el.scrollTop));
  }, []);

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar" ref={sidebarRef} onScroll={handleSidebarScroll}>
        {menu.map((cat) => (
          <div key={cat.title} className="docs-sidebar__group">
            <div className="docs-sidebar__group-title">{"> " + cat.title}</div>

            {cat.items.map((item) => {
              const hasSubs = item.subs && item.subs.length > 0;
              const isOpen = expanded[item.href] ?? false;
              const itemActive = isActive(item.href);

              return (
                <div key={item.href}>
                  {/* Level 2: Menu Item */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href={item.href}
                      className={`docs-sidebar__item${itemActive ? " active" : ""}`}
                      onClick={() => hasSubs && toggle(item.href)}
                    >
                      <span style={{ marginRight: "8px" }}>{item.icon}</span>
                      {item.label}
                      {hasSubs && (
                        <span
                          className={`docs-sidebar__chevron${isOpen ? " open" : ""}`}
                        >
                          ▶
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Level 3: Sub Items */}
                  {hasSubs && (
                    <div
                      className={`docs-sidebar__subitems${isOpen ? " open" : ""}`}
                    >
                      {item.subs!.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="docs-sidebar__subitem"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </aside>
      <main className="docs-content">{children}</main>
    </div>
  );
}
