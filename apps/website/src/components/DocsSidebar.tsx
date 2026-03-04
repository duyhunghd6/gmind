"use client";

interface SidebarGroup {
  id: string;
  title: string;
  icon: string;
}

const groups: SidebarGroup[] = [
  { id: "tokens", title: "Token Thiết kế", icon: "🎨" },
  { id: "components", title: "Thành phần", icon: "🧩" },
  { id: "layouts", title: "Bố cục", icon: "📐" },
  { id: "states", title: "Trạng thái", icon: "📊" },
  { id: "flows", title: "Luồng", icon: "🔄" },
  { id: "advanced", title: "Nâng cao", icon: "🚀" },
];

interface DocsSidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export default function DocsSidebar({ activeId, onNavigate }: DocsSidebarProps) {
  const activeGroup = getGroupForId(activeId);

  return (
    <aside className="docs-sidebar" role="complementary" aria-label="Mục lục trang">
      <div className="docs-sidebar__group" role="navigation" aria-label="Navigation">
        <div className="docs-sidebar__group-title">{"> Navigation"}</div>
        {groups.map((group) => (
          <button
            key={group.id}
            className={`docs-sidebar__item ${activeGroup === group.id ? "active" : ""}`}
            onClick={() => onNavigate(getFirstIdForGroup(group.id))}
            aria-current={activeGroup === group.id ? "true" : undefined}
          >
            <span style={{ marginRight: "8px" }} aria-hidden="true">{group.icon}</span>
            {group.title}
          </button>
        ))}
      </div>
    </aside>
  );
}

/* Map any section id → its parent group */
function getGroupForId(id: string): string {
  const tokenIds = ["colors", "spacing", "typography", "animations"];
  const componentIds = ["cards", "buttons", "badges", "tooltips", "labels", "code-block", "prompt-card"];
  const layoutIds = ["grid-layout", "glass-effect", "path-tree"];
  const advancedIds = ["terminal", "git-graph", "kanban", "activity-feed", "tab-panel-demo", "prd-components"];

  if (tokenIds.includes(id)) return "tokens";
  if (componentIds.includes(id)) return "components";
  if (layoutIds.includes(id)) return "layouts";
  if (advancedIds.includes(id)) return "advanced";
  if (id === "state-matrix") return "states";
  if (id === "user-flows") return "flows";
  return "tokens";
}

/* First anchor id per group */
function getFirstIdForGroup(group: string): string {
  switch (group) {
    case "tokens": return "colors";
    case "components": return "cards";
    case "layouts": return "grid-layout";
    case "states": return "state-matrix";
    case "flows": return "user-flows";
    case "advanced": return "terminal";
    default: return "colors";
  }
}
