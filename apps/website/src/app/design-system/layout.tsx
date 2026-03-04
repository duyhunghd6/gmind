"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGlobalKeyboard } from "@/components/useGlobalKeyboard";


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
      {
        href: "/design-system/git-graph",
        label: "Beads: Đồ thị Git",
        icon: "🌿",
        subs: [
          { href: "/design-system/git-graph#gitflow", label: "Gitflow Chuẩn" },
          { href: "/design-system/git-graph#multi-agent", label: "Multi-Agent Worktree" },
          { href: "/design-system/git-graph#hotfix", label: "Hotfix Khẩn Cấp" },
          { href: "/design-system/git-graph#release-train", label: "Release Train" },
          { href: "/design-system/git-graph#monorepo", label: "Monorepo" },
          { href: "/design-system/git-graph#beads-prd-trace", label: "PRD Trace" },
          { href: "/design-system/git-graph#beads-deadlock", label: "Deadlock Fix" },
          { href: "/design-system/git-graph#beads-ds-comp", label: "DS Components" },
          { href: "/design-system/git-graph#beads-traversal", label: "Full Traversal" },
          { href: "/design-system/git-graph#beads-sprint-review", label: "Sprint Review" },
        ],
      },
      {
        href: "/design-system/kanban",
        label: "Kanban",
        icon: "📋",
        subs: [
          { href: "/design-system/kanban#sprint", label: "Sprint Board" },
          { href: "/design-system/kanban#release", label: "Release Board" },
          { href: "/design-system/kanban#bug-triage", label: "Bug Triage" },
        ],
      },
      {
        href: "/design-system/knowledge-graph",
        label: "Knowledge Graph",
        icon: "🧠",
        subs: [
          { href: "/design-system/knowledge-graph#simple", label: "Đơn giản" },
          { href: "/design-system/knowledge-graph#ecosystem", label: "Hệ sinh thái" },
          { href: "/design-system/knowledge-graph#sprint", label: "Sprint View" },
        ],
      },
      {
        href: "/design-system/approval",
        label: "Phê duyệt & RTM",
        icon: "✅",
        subs: [
          { href: "/design-system/approval#panels", label: "Approval Panels" },
          { href: "/design-system/approval#rtm", label: "RTM Matrix" },
          { href: "/design-system/approval#heatmap", label: "Coverage Heatmap" },
        ],
      },
      {
        href: "/design-system/timeline",
        label: "Timeline",
        icon: "📅",
        subs: [
          { href: "/design-system/timeline#file-lease", label: "File Lease" },
          { href: "/design-system/timeline#activity-feed", label: "Activity Feed" },
          { href: "/design-system/timeline#sprint-day", label: "Sprint Day" },
        ],
      },
      { href: "/design-system/components", label: "Components", icon: "🧩" },
    ],
  },
  {
    title: "Explorer",
    items: [
      { href: "/design-system/doc-viewer", label: "Doc Viewer", icon: "📄" },
      {
        href: "/design-system/explorer",
        label: "Gmind Explorer",
        icon: "🔍",
        subs: [
          { href: "/design-system/explorer#doc", label: "📄 Docs" },
          { href: "/design-system/explorer#commit", label: "⏺ Commits" },
          { href: "/design-system/explorer#task", label: "📋 Tasks" },
          { href: "/design-system/explorer#adr", label: "📐 ADR" },
          { href: "/design-system/explorer#chat", label: "💬 Chat" },
          { href: "/design-system/explorer#spike", label: "🔬 Spike" },
        ],
      },
      {
        href: "/design-system/beads-traversal",
        label: "Beads Traversal",
        icon: "🔗",
        subs: [
          { href: "/design-system/beads-traversal#prd-section", label: "PRD Sections" },
          { href: "/design-system/beads-traversal#plan", label: "Plan Elements" },
          { href: "/design-system/beads-traversal#task", label: "Tasks" },
          { href: "/design-system/beads-traversal#commit", label: "Commits" },
        ],
      },
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

/** Parse a sub-item href into pathname + hash */
function parseSubHref(href: string): { path: string; hash: string } {
  const idx = href.indexOf("#");
  if (idx === -1) return { path: href, hash: "" };
  return { path: href.slice(0, idx), hash: href.slice(idx) };
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const EXPANDED_KEY = "ds-sidebar-expanded";

  /* Initialize expanded state: restore from session + auto-expand current route */
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = sessionStorage.getItem(EXPANDED_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  /* Global keyboard: ESC dispatches ds:escape for any open modal */
  useGlobalKeyboard();

  /* Auto-expand the menu item matching current route (additive, never collapse) */
  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      for (const cat of menu) {
        for (const item of cat.items) {
          if (pathname === item.href || pathname.startsWith(item.href + "/")) {
            next[item.href] = true;
          }
        }
      }
      sessionStorage.setItem(EXPANDED_KEY, JSON.stringify(next));
      return next;
    });
  }, [pathname]);

  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      sessionStorage.setItem(EXPANDED_KEY, JSON.stringify(next));
      return next;
    });

  const isActive = (href: string) => pathname === href;

  /* Persist sidebar scroll position across navigation */
  const sidebarRef = useRef<HTMLElement>(null);
  const isRestoringScroll = useRef(false);
  const SIDEBAR_SCROLL_KEY = "ds-sidebar-scroll";

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
    if (saved) {
      isRestoringScroll.current = true;
      const timer = setTimeout(() => {
        el.scrollTop = parseInt(saved, 10);
        requestAnimationFrame(() => { isRestoringScroll.current = false; });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleSidebarScroll = useCallback(() => {
    if (isRestoringScroll.current) return;
    const el = sidebarRef.current;
    if (el) sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(el.scrollTop));
  }, []);

  /** Handle sub-item click: same-page hash → native; cross-page → router */
  const handleSubClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const { path, hash } = parseSubHref(href);

    if (pathname === path && hash) {
      /* Same page: set hash natively so hashchange event fires */
      window.location.hash = hash;
    } else {
      /* Different page: use Next.js router for SPA navigation */
      router.push(href);
    }
  }, [pathname, router]);

  return (
    <div className="docs-layout">
      <aside
        className="docs-sidebar"
        ref={sidebarRef}
        onScroll={handleSidebarScroll}
        role="navigation"
        aria-label="Design System menu"
      >
        {menu.map((cat) => (
          <div key={cat.title} className="docs-sidebar__group" role="group" aria-label={cat.title}>
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
                      aria-current={itemActive ? "page" : undefined}
                      aria-expanded={hasSubs ? isOpen : undefined}
                    >
                      <span style={{ marginRight: "8px" }} aria-hidden="true">{item.icon}</span>
                      {item.label}
                      {hasSubs && (
                        <span
                          className={`docs-sidebar__chevron${isOpen ? " open" : ""}`}
                          aria-hidden="true"
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
                      role="list"
                    >
                      {item.subs!.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className="docs-sidebar__subitem"
                          role="listitem"
                          onClick={(e) => handleSubClick(e, sub.href)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </aside>
      <main className="docs-content" role="main" aria-label="Nội dung Design System">{children}</main>
    </div>
  );
}
