export interface SubItem {
  href: string;
  label: string;
}

export interface MenuItem {
  href: string;
  label: string;
  icon: string;
  subs?: SubItem[];
}

export interface Category {
  title: string;
  items: MenuItem[];
}

export const menu: Category[] = [
  {
    title: "Design System",
    items: [
      {
        href: "/design-system",
        label: "Hub",
        icon: "hub",
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
      { href: "/design-system/terminal", label: "Terminal", icon: "terminal", subs: [{ href: "/design-system/terminal#default", label: "Mặc định" }, { href: "/design-system/terminal#mosaic", label: "Mosaic Layout" }] },
      { href: "/design-system/portfolio", label: "Portfolio View", icon: "portfolio" },
      { href: "/design-system/pi-planning", label: "PI Planning Sandbox", icon: "planning" },
      {
        href: "/design-system/git-graph",
        label: "Beads: Đồ thị Git",
        icon: "git",
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
      { href: "/design-system/kanban", label: "Kanban", icon: "kanban", subs: [{ href: "/design-system/kanban#sprint", label: "Sprint Board" }, { href: "/design-system/kanban#release", label: "Release Board" }, { href: "/design-system/kanban#bug-triage", label: "Bug Triage" }] },
      { href: "/design-system/knowledge-graph", label: "Knowledge Graph", icon: "graph", subs: [{ href: "/design-system/knowledge-graph#simple", label: "Đơn giản" }, { href: "/design-system/knowledge-graph#ecosystem", label: "Hệ sinh thái" }, { href: "/design-system/knowledge-graph#sprint", label: "Sprint View" }] },
      { href: "/design-system/approval", label: "Phê duyệt & RTM", icon: "approval", subs: [{ href: "/design-system/approval#panels", label: "Approval Panels" }, { href: "/design-system/approval#rtm", label: "RTM Matrix" }, { href: "/design-system/approval#heatmap", label: "Coverage Heatmap" }] },
      {
        href: "/design-system/webui-pm-workspace",
        label: "PM Workspace",
        icon: "workspace",
        subs: [
          { href: "/design-system/webui-pm-workspace#surface-rtm-dashboard", label: "Dashboard" },
          { href: "/design-system/webui-pm-workspace#surface-board", label: "Board (Kanban)" },
          { href: "/design-system/webui-pm-workspace#surface-tasks", label: "Tasks" },
          { href: "/design-system/webui-pm-workspace#surface-task-detail", label: "Task Detail" },
          { href: "/design-system/webui-pm-workspace#surface-trace", label: "Trace" },
          { href: "/design-system/webui-pm-workspace#surface-docs", label: "Docs" },
          { href: "/design-system/webui-pm-workspace#surface-approval", label: "Approval" },
          { href: "/design-system/webui-pm-workspace#surface-search", label: "Search" },
        ],
      },
      { href: "/design-system/timeline", label: "Timeline", icon: "timeline", subs: [{ href: "/design-system/timeline#file-lease", label: "File Lease" }, { href: "/design-system/timeline#activity-feed", label: "Activity Feed" }, { href: "/design-system/timeline#sprint-day", label: "Sprint Day" }] },
      {
        href: "/design-system/components",
        label: "Components",
        icon: "components",
        subs: [
          { href: "/design-system/components#buttons", label: "Buttons" },
          { href: "/design-system/components#badges", label: "Badges & Status" },
          { href: "/design-system/components#progress", label: "Progress Bars" },
          { href: "/design-system/components#avatar", label: "Avatar Stack" },
          { href: "/design-system/components#modal", label: "Modal" },
          { href: "/design-system/components#dropdown", label: "Dropdown" },
          { href: "/design-system/components#accordion", label: "Accordion" },
          { href: "/design-system/components#tabs", label: "Tab Panel" },
          { href: "/design-system/components#table", label: "Data Table" },
          { href: "/design-system/components#tooltip", label: "Tooltip" },
          { href: "/design-system/components#codeblock", label: "Code Block" },
          { href: "/design-system/components#cards", label: "Cards" },
          { href: "/design-system/components#promptcard", label: "Prompt Card" },
          { href: "/design-system/components#labels", label: "Section Labels" },
          { href: "/design-system/components#statusdot", label: "Status Dots" },
          { href: "/design-system/components#skeleton", label: "Skeleton" },
          { href: "/design-system/components#emptystate", label: "Empty State" },
          { href: "/design-system/components#errorbanner", label: "Error Banner" },
        ],
      },
    ],
  },
  {
    title: "Explorer",
    items: [
      { href: "/design-system/doc-viewer", label: "Doc Viewer", icon: "docs" },
      { href: "/design-system/explorer", label: "Gmind Explorer", icon: "search", subs: [{ href: "/design-system/explorer#doc", label: "Docs" }, { href: "/design-system/explorer#commit", label: "Commits" }, { href: "/design-system/explorer#task", label: "Tasks" }, { href: "/design-system/explorer#adr", label: "ADR" }, { href: "/design-system/explorer#chat", label: "Chat" }, { href: "/design-system/explorer#spike", label: "Spike" }] },
      { href: "/design-system/beads-traversal", label: "Beads Traversal", icon: "link", subs: [{ href: "/design-system/beads-traversal#prd-section", label: "PRD Sections" }, { href: "/design-system/beads-traversal#plan", label: "Plan Elements" }, { href: "/design-system/beads-traversal#task", label: "Tasks" }, { href: "/design-system/beads-traversal#commit", label: "Commits" }] },
    ],
  },
  {
    title: "Storyboard",
    items: [
      {
        href: "/design-system/storyboard",
        label: "Overview",
        icon: "storyboard",
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
