"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  badge?: number;
  disabled?: boolean;
  content: ReactNode;
}

interface TabPanelProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function TabPanel({ tabs, defaultTab }: TabPanelProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id || "");
  const tablistRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const idx = enabledTabs.findIndex((t) => t.id === active);
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % enabledTabs.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = enabledTabs.length - 1;
      } else {
        return;
      }
      setActive(enabledTabs[next].id);
      const btns = tablistRef.current?.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])');
      btns?.[next]?.focus();
    },
    [tabs, active]
  );

  return (
    <div className="tab-panel">
      <div className="tab-panel__bar" role="tablist" aria-label="Tab navigation" ref={tablistRef} onKeyDown={handleKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-panel__tab${active === tab.id ? " tab-panel__tab--active" : ""}${tab.disabled ? " tab-panel__tab--disabled" : ""}`}
            onClick={() => !tab.disabled && setActive(tab.id)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className="tab-panel__badge">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="tab-panel__content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-panel__pane${active === tab.id ? " tab-panel__pane--active" : ""}`}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={active !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

