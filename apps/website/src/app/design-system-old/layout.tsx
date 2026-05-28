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
        href: "/design-system-old",
        label: "Hub",
        icon: "🏠",
        subs: [
          { href: "/design-system-old#colors", label: "Màu sắc" },
          { href: "/design-system-old#spacing", label: "Thang Khoảng cách" },
          { href: "/design-system-old#typography", label: "Font" },
          { href: "/design-system-old#animations", label: "Hiệu ứng Chuyển động" },
          { href: "/design-system-old#cards", label: "Các biến thể Thẻ" },
          { href: "/design-system-old#buttons", label: "Nút (Buttons)" },
          { href: "/design-system-old#badges", label: "Nhãn trạng thái" },
          { href: "/design-system-old#grid-layout", label: "Bố cục Lưới" },
          { href: "/design-system-old#states", label: "Ma trận Trạng thái" },
          { href: "/design-system-old#flows", label: "Luồng Người dùng" },
        ],
      },
    ],
  },
  {
    title: "Screens",
    items: [
      {
        href: "/design-system-old/terminal",
        label: "Terminal",
        icon: "💻",
        subs: [
          { href: "/design-system-old/terminal#default", label: "Mặc định" },
          { href: "/design-system-old/terminal#mosaic", label: "Mosaic Layout" },
        ],
      },
      {
        href: "/design-system-old/portfolio",
        label: "Portfolio View",
        icon: "📈",
      },
      {
        href: "/design-system-old/pi-planning",
        label: "PI Planning Sandbox",
        icon: "🎯",
      },
      {
        href: "/design-system-old/git-graph",
        label: "Beads: Đồ thị Git",
        icon: "🌿",
        subs: [
          { href: "/design-system-old/git-graph#gitflow", label: "Gitflow Chuẩn" },
          { href: "/design-system-old/git-graph#multi-agent", label: "Multi-Agent Worktree" },
          { href: "/design-system-old/git-graph#hotfix", label: "Hotfix Khẩn Cấp" },
          { href: "/design-system-old/git-graph#release-train", label: "Release Train" },
          { href: "/design-system-old/git-graph#monorepo", label: "Monorepo" },
          { href: "/design-system-old/git-graph#beads-prd-trace", label: "PRD Trace" },
          { href: "/design-system-old/git-graph#beads-deadlock", label: "Deadlock Fix" },
          { href: "/design-system-old/git-graph#beads-ds-comp", label: "DS Components" },
          { href: "/design-system-old/git-graph#beads-traversal", label: "Full Traversal" },
          { href: "/design-system-old/git-graph#beads-sprint-review", label: "Sprint Review" },
        ],
      },
      {
        href: "/design-system-old/kanban",
        label: "Kanban",
        icon: "📋",
        subs: [
          { href: "/design-system-old/kanban#sprint", label: "Sprint Board" },
          { href: "/design-system-old/kanban#release", label: "Release Board" },
          { href: "/design-system-old/kanban#bug-triage", label: "Bug Triage" },
        ],
      },
      {
        href: "/design-system-old/knowledge-graph",
        label: "Knowledge Graph",
        icon: "🧠",
        subs: [
          { href: "/design-system-old/knowledge-graph#simple", label: "Đơn giản" },
          { href: "/design-system-old/knowledge-graph#ecosystem", label: "Hệ sinh thái" },
          { href: "/design-system-old/knowledge-graph#sprint", label: "Sprint View" },
        ],
      },
      {
        href: "/design-system-old/approval",
        label: "Phê duyệt & RTM",
        icon: "✅",
        subs: [
          { href: "/design-system-old/approval#panels", label: "Approval Panels" },
          { href: "/design-system-old/approval#rtm", label: "RTM Matrix" },
          { href: "/design-system-old/approval#heatmap", label: "Coverage Heatmap" },
        ],
      },
      {
        href: "/design-system-old/webui-pm-workspace",
        label: "PM Workspace",
        icon: "🧭",
        subs: [
          { href: "/design-system-old/webui-pm-workspace", label: "RTM Dashboard" },
          { href: "/design-system-old/webui-pm-workspace#surface-board", label: "SAFe Board" },
          { href: "/design-system-old/webui-pm-workspace#surface-tasks", label: "Task List" },
          { href: "/design-system-old/webui-pm-workspace#surface-tasks-detail", label: "Task Detail" },
          { href: "/design-system-old/webui-pm-workspace#surface-trace", label: "Trace Explorer" },
          { href: "/design-system-old/webui-pm-workspace#surface-docs", label: "Core Doc Viewer" },
          { href: "/design-system-old/webui-pm-workspace#surface-approval", label: "Approval Gates" },
          { href: "/design-system-old/webui-pm-workspace#surface-search", label: "Search Results" },
        ],
      },
      {
        href: "/design-system-old/timeline",
        label: "Timeline",
        icon: "📅",
        subs: [
          { href: "/design-system-old/timeline#file-lease", label: "File Lease" },
          { href: "/design-system-old/timeline#activity-feed", label: "Activity Feed" },
          { href: "/design-system-old/timeline#sprint-day", label: "Sprint Day" },
        ],
      },
      {
        href: "/design-system-old/components",
        label: "Components",
        icon: "🧩",
        subs: [
          { href: "/design-system-old/components#buttons", label: "Buttons" },
          { href: "/design-system-old/components#badges", label: "Badges & Status" },
          { href: "/design-system-old/components#progress", label: "Progress Bars" },
          { href: "/design-system-old/components#avatar", label: "Avatar Stack" },
          { href: "/design-system-old/components#modal", label: "Modal" },
          { href: "/design-system-old/components#dropdown", label: "Dropdown" },
          { href: "/design-system-old/components#accordion", label: "Accordion" },
          { href: "/design-system-old/components#tabs", label: "Tab Panel" },
          { href: "/design-system-old/components#table", label: "Data Table" },
          { href: "/design-system-old/components#tooltip", label: "Tooltip" },
          { href: "/design-system-old/components#codeblock", label: "Code Block" },
          { href: "/design-system-old/components#cards", label: "Cards" },
          { href: "/design-system-old/components#promptcard", label: "Prompt Card" },
          { href: "/design-system-old/components#labels", label: "Section Labels" },
          { href: "/design-system-old/components#statusdot", label: "Status Dots" },
          { href: "/design-system-old/components#skeleton", label: "Skeleton" },
          { href: "/design-system-old/components#emptystate", label: "Empty State" },
          { href: "/design-system-old/components#errorbanner", label: "Error Banner" },
        ],
      },
    ],
  },
  {
    title: "Explorer",
    items: [
      { href: "/design-system-old/doc-viewer", label: "Doc Viewer", icon: "📄" },
      {
        href: "/design-system-old/explorer",
        label: "Gmind Explorer",
        icon: "🔍",
        subs: [
          { href: "/design-system-old/explorer#doc", label: "📄 Docs" },
          { href: "/design-system-old/explorer#commit", label: "⏺ Commits" },
          { href: "/design-system-old/explorer#task", label: "📋 Tasks" },
          { href: "/design-system-old/explorer#adr", label: "📐 ADR" },
          { href: "/design-system-old/explorer#chat", label: "💬 Chat" },
          { href: "/design-system-old/explorer#spike", label: "🔬 Spike" },
        ],
      },
      {
        href: "/design-system-old/beads-traversal",
        label: "Beads Traversal",
        icon: "🔗",
        subs: [
          { href: "/design-system-old/beads-traversal#prd-section", label: "PRD Sections" },
          { href: "/design-system-old/beads-traversal#plan", label: "Plan Elements" },
          { href: "/design-system-old/beads-traversal#task", label: "Tasks" },
          { href: "/design-system-old/beads-traversal#commit", label: "Commits" },
        ],
      },
    ],
  },
  {
    title: "Storyboard",
    items: [
      {
        href: "/design-system-old/storyboard",
        label: "Overview",
        icon: "🗺️",
        subs: [
          { href: "/design-system-old/storyboard/uc-01-pm-sprint-review", label: "UC-01: PM Sprint Review" },
          { href: "/design-system-old/storyboard/uc-02-pm-trace-approve", label: "UC-02: PM Trace & Approve" },
          { href: "/design-system-old/storyboard/uc-03-dev-code-search", label: "UC-03: Dev Code Search" },
          { href: "/design-system-old/storyboard/uc-04-dev-pick-task", label: "UC-04: Dev Pick Task" },
          { href: "/design-system-old/storyboard/uc-05-qa-bug-detection", label: "UC-05: QA Bug Detection" },
          { href: "/design-system-old/storyboard/uc-06-qa-code-review", label: "UC-06: QA Code Review" },
          { href: "/design-system-old/storyboard/uc-07-architect-spike", label: "UC-07: Architect Spike" },
          { href: "/design-system-old/storyboard/uc-08-release-deploy", label: "UC-08: Release Deploy" },
          { href: "/design-system-old/storyboard/uc-09-bug-triage-fix", label: "UC-09: Bug Triage Fix" },
          { href: "/design-system-old/storyboard/uc-10-bug-hotfix-verify", label: "UC-10: Hotfix Verify" },
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

  const [currentHash, setCurrentHash] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isSubActive = (subHref: string) => {
    const { path, hash } = parseSubHref(subHref);
    if (pathname !== path) return false;
    if (!hash) {
      return currentHash === "" || currentHash === "#surface-dashboard";
    }
    return currentHash === hash;
  };

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
                          className={`docs-sidebar__subitem${isSubActive(sub.href) ? " active" : ""}`}
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
