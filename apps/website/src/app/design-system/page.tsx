"use client";

import { useState, useCallback } from "react";
import DocsSidebar from "@/components/DocsSidebar";
import DocsToc from "@/components/DocsToc";
import TokensTab from "./TokensTab";
import ComponentsTab from "./ComponentsTab";
import StatesTab from "./StatesTab";
import FlowsTab from "./FlowsTab";

/* Right-sidebar TOC items per section */
const tocMap: Record<string, { id: string; label: string }[]> = {
  colors: [
    { id: "colors", label: "Bảng Màu" },
    { id: "spacing", label: "Khoảng cách" },
    { id: "typography", label: "Typography" },
    { id: "animations", label: "Animations" },
  ],
  spacing: [
    { id: "colors", label: "Bảng Màu" },
    { id: "spacing", label: "Khoảng cách" },
    { id: "typography", label: "Typography" },
    { id: "animations", label: "Animations" },
  ],
  typography: [
    { id: "colors", label: "Bảng Màu" },
    { id: "spacing", label: "Khoảng cách" },
    { id: "typography", label: "Typography" },
    { id: "animations", label: "Animations" },
  ],
  animations: [
    { id: "colors", label: "Bảng Màu" },
    { id: "spacing", label: "Khoảng cách" },
    { id: "typography", label: "Typography" },
    { id: "animations", label: "Animations" },
  ],
  cards: [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  buttons: [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  badges: [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  tooltips: [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  labels: [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  "code-block": [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  "prompt-card": [
    { id: "cards", label: "Cards" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "tooltips", label: "Tooltips" },
    { id: "labels", label: "Labels & Dividers" },
    { id: "code-block", label: "Code Block" },
    { id: "prompt-card", label: "Prompt Card" },
  ],
  "grid-layout": [
    { id: "grid-layout", label: "Grid System" },
    { id: "glass-effect", label: "Glassmorphism" },
    { id: "path-tree", label: "Path Tree" },
  ],
  "glass-effect": [
    { id: "grid-layout", label: "Grid System" },
    { id: "glass-effect", label: "Glassmorphism" },
    { id: "path-tree", label: "Path Tree" },
  ],
  "path-tree": [
    { id: "grid-layout", label: "Grid System" },
    { id: "glass-effect", label: "Glassmorphism" },
    { id: "path-tree", label: "Path Tree" },
  ],
  "state-matrix": [{ id: "state-matrix", label: "Ma trận Trạng thái" }],
  "user-flows": [{ id: "user-flows", label: "Luồng Người dùng" }],
};

export default function DesignSystemPage() {
  const [activeId, setActiveId] = useState("colors");

  const handleNavigate = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const tocItems = tocMap[activeId] || [];

  return (
    <div className="docs-layout">
      <DocsSidebar activeId={activeId} onNavigate={handleNavigate} />

      <div className="docs-content">
        {/* Tokens Section */}
        <TokensTab />

        {/* Components Section */}
        <ComponentsTab />

        {/* States Section */}
        <div id="state-matrix">
          <StatesTab />
        </div>

        {/* Flows Section */}
        <div id="user-flows">
          <FlowsTab />
        </div>
      </div>

      <DocsToc items={tocItems} activeId={activeId} onNavigate={handleNavigate} />
    </div>
  );
}
