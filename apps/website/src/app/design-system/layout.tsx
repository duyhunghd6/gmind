"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGlobalKeyboard } from "@/components/useGlobalKeyboard";
import { menu } from "./design-system-menu";

/** Parse a sub-item href into pathname + hash */
const PM_WORKSPACE_PATH = "/design-system/webui-pm-workspace";
const pmSurfaceHashes = new Set([
  "#surface-rtm-dashboard",
  "#surface-board",
  "#surface-tasks",
  "#surface-task-detail",
  "#surface-trace",
  "#surface-docs",
  "#surface-approval",
  "#surface-search",
]);


const menuIconPaths: Record<string, React.ReactNode> = {
  hub: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /></>, terminal: <><path d="m4 7 5 5-5 5" /><path d="M11 17h9" /></>, portfolio: <><path d="M4 18V6" /><path d="M4 18h16" /><path d="m7 15 4-4 3 2 5-6" /></>, planning: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>, git: <><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /><path d="M8.5 8.5 15.5 15.5" /><path d="M7 9v8" /></>, kanban: <><path d="M4 5h16" /><path d="M8 5v15M16 5v15" /></>, graph: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="18" r="2" /><path d="m7 11 3.5-3M13.5 7 17 11M17 13l-3.5 3M10.5 17 7 13" /></>, approval: <path d="m4 12 5 5L20 6" />, workspace: <><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></>, timeline: <><path d="M5 5v14" /><path d="M9 7h10M9 12h7M9 17h10" /></>, components: <><path d="M4 4h7v7H4z" /><path d="M13 4h7v7h-7z" /><path d="M4 13h7v7H4z" /><path d="M13 13h7v7h-7z" /></>, docs: <><path d="M6 3h9l3 3v15H6z" /><path d="M9 12h6M9 16h6" /></>, search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, link: <><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></>, storyboard: <><path d="M4 5h16v14H4z" /><path d="M8 5v14M16 5v14M4 10h16M4 15h16" /></>,
};
function MenuIcon({ name }: { name: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-[8px] h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{menuIconPaths[name] ?? menuIconPaths.components}</svg>;
}
function Chevron({ open }: { open: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={`docs-sidebar__chevron${open ? " open" : ""} h-3 w-3`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>;
}

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

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem(EXPANDED_KEY);
        if (saved) setExpanded(JSON.parse(saved));
      } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  /* Global keyboard: ESC dispatches ds:escape for any open modal */
  useGlobalKeyboard();

  /* Auto-expand the menu item matching current route (additive, never collapse) */
  useEffect(() => {
    const timer = window.setTimeout(() => {
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
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      sessionStorage.setItem(EXPANDED_KEY, JSON.stringify(next));
      return next;
    });

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const routeWorkspaceHash = () => {
      const hash = window.location.hash;
      if (pmSurfaceHashes.has(hash) && pathname !== PM_WORKSPACE_PATH) {
        router.replace(`${PM_WORKSPACE_PATH}${hash}`, { scroll: false });
      }
    };
    routeWorkspaceHash();
    window.addEventListener("hashchange", routeWorkspaceHash);
    return () => window.removeEventListener("hashchange", routeWorkspaceHash);
  }, [pathname, router]);

  const [currentHash, setCurrentHash] = useState("");
  useEffect(() => {
    const syncCurrentHash = () => setCurrentHash(window.location.hash);
    syncCurrentHash();
    window.addEventListener("hashchange", syncCurrentHash);
    return () => window.removeEventListener("hashchange", syncCurrentHash);
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
      window.location.hash = hash;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      router.push(href, { scroll: !pmSurfaceHashes.has(hash) });
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link
                       href={item.href}
                       className={`docs-sidebar__item${itemActive ? " active" : ""}`}
                       onClick={() => hasSubs && toggle(item.href)}
                       aria-current={itemActive ? "page" : undefined}
                       aria-expanded={hasSubs ? isOpen : undefined}
                    >
                      <MenuIcon name={item.icon} />
                      {item.label}
                      {hasSubs && <Chevron open={isOpen} />}
                    </Link>
                  </div>

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
