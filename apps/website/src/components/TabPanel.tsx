"use client";

import { useState, type ReactNode } from "react";

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

  return (
    <div className="tab-panel">
      <div className="tab-panel__bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-panel__tab${active === tab.id ? " tab-panel__tab--active" : ""}${tab.disabled ? " tab-panel__tab--disabled" : ""}`}
            onClick={() => !tab.disabled && setActive(tab.id)}
            disabled={tab.disabled}
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
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
