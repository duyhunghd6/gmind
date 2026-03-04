"use client";

import { useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import TokensTab from "./TokensTab";
import ComponentsTab from "./ComponentsTab";
import StatesTab from "./StatesTab";
import FlowsTab from "./FlowsTab";

type TabId = "tokens" | "components" | "states" | "flows";

const tabs: { id: TabId; label: string }[] = [
  { id: "tokens", label: "Token Thiết kế" },
  { id: "components", label: "Thành phần" },
  { id: "states", label: "Ma trận Trạng thái" },
  { id: "flows", label: "Luồng Người dùng" },
];

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<TabId>("tokens");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      <header className="animate-fade-up">
        <SectionLabel text="Hệ thống Thiết kế" />
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>
          Design System Showcase
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", maxWidth: "750px", marginBottom: "2rem" }}>
          Tổng hợp token, thành phần, bố cục, ma trận trạng thái, và luồng người dùng.
          Mọi thành phần trên website đều xây dựng từ hệ thống thiết kế này.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "2rem" }}>
          📦 <code>packages/design-system/</code> → <code>tokens/</code> + <code>components/</code> + <code>layouts/</code>
        </p>
      </header>

      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "32px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "4px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: activeTab === tab.id ? "var(--surface-elevated)" : "transparent",
              border: activeTab === tab.id ? "1px solid var(--border-highlight)" : "1px solid transparent",
              borderRadius: "var(--radius)",
              color: activeTab === tab.id ? "var(--text)" : "var(--text-dim)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all var(--duration-fast) var(--ease-out)",
              minWidth: "120px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "tokens" && <TokensTab />}
      {activeTab === "components" && <ComponentsTab />}
      {activeTab === "states" && <StatesTab />}
      {activeTab === "flows" && <FlowsTab />}
    </div>
  );
}
