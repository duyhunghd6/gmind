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
    title: "Shell",
    items: [
      {
        href: "/webui-pm-workspace",
        label: "PM Workspace",
        icon: "workspace",
        subs: [
          { href: "/webui-pm-workspace#surface-rtm-dashboard", label: "Dashboard" },
          { href: "/webui-pm-workspace#surface-board", label: "Board (Kanban)" },
          { href: "/webui-pm-workspace#surface-tasks", label: "Tasks" },
          { href: "/webui-pm-workspace#surface-task-detail", label: "Task Detail" },
          { href: "/webui-pm-workspace#surface-trace", label: "Trace" },
          { href: "/webui-pm-workspace#surface-docs", label: "Docs" },
          { href: "/webui-pm-workspace#surface-approval", label: "Approval" },
          { href: "/webui-pm-workspace#surface-search", label: "Search" },
        ],
      },
      { href: "/docs", label: "Doc Viewer", icon: "docs" },
      { href: "/search", label: "Gmind Explorer", icon: "search", subs: [{ href: "/search#doc", label: "Docs" }, { href: "/search#commit", label: "Commits" }, { href: "/search#task", label: "Tasks" }, { href: "/search#adr", label: "ADR" }, { href: "/search#chat", label: "Chat" }, { href: "/search#spike", label: "Spike" }] },
    ],
  },
  {
    title: "Work Screens",
    items: [
      { href: "/board", label: "Kanban", icon: "kanban", subs: [{ href: "/board#sprint", label: "Sprint Board" }, { href: "/board#release", label: "Release Board" }, { href: "/board#bug-triage", label: "Bug Triage" }] },
      { href: "/approval", label: "Phê duyệt & RTM", icon: "approval", subs: [{ href: "/approval#panels", label: "Approval Panels" }, { href: "/approval#rtm", label: "RTM Matrix" }, { href: "/approval#heatmap", label: "Coverage Heatmap" }] },
    ],
  },
  {
    title: "Evidence",
    items: [
      { href: "/terminal", label: "Terminal", icon: "terminal", subs: [{ href: "/terminal#default", label: "Mặc định" }, { href: "/terminal#mosaic", label: "Mosaic Layout" }] },
      {
        href: "/git-graph",
        label: "Beads: Đồ thị Git",
        icon: "git",
        subs: [
          { href: "/git-graph#gitflow", label: "Gitflow Chuẩn" },
          { href: "/git-graph#multi-agent", label: "Multi-Agent Worktree" },
          { href: "/git-graph#hotfix", label: "Hotfix Khẩn Cấp" },
          { href: "/git-graph#release-train", label: "Release Train" },
          { href: "/git-graph#monorepo", label: "Monorepo" },
          { href: "/git-graph#beads-prd-trace", label: "PRD Trace" },
          { href: "/git-graph#beads-deadlock", label: "Deadlock Fix" },
          { href: "/git-graph#beads-ds-comp", label: "DS Components" },
          { href: "/git-graph#beads-traversal", label: "Full Traversal" },
          { href: "/git-graph#beads-sprint-review", label: "Sprint Review" },
        ],
      },
      { href: "/timeline", label: "Timeline", icon: "timeline", subs: [{ href: "/timeline#file-lease", label: "File Lease" }, { href: "/timeline#activity-feed", label: "Activity Feed" }, { href: "/timeline#sprint-day", label: "Sprint Day" }] },
      { href: "/knowledge-graph", label: "Knowledge Graph", icon: "graph", subs: [{ href: "/knowledge-graph#simple", label: "Đơn giản" }, { href: "/knowledge-graph#ecosystem", label: "Hệ sinh thái" }, { href: "/knowledge-graph#sprint", label: "Sprint View" }] },
    ],
  },
  {
    title: "Planning",
    items: [
      { href: "/portfolio", label: "Portfolio View", icon: "portfolio" },
      { href: "/pi-planning", label: "PI Planning Sandbox", icon: "planning" },
    ],
  },
  {
    title: "Storyboard",
    items: [
      {
        href: "/storyboards",
        label: "Overview",
        icon: "storyboard",
        subs: [
          { href: "/storyboards/uc-01-pm-sprint-review", label: "UC-01: PM Sprint Review" },
          { href: "/storyboards/uc-02-pm-trace-approve", label: "UC-02: PM Trace & Approve" },
          { href: "/storyboards/uc-03-dev-code-search", label: "UC-03: Dev Code Search" },
          { href: "/storyboards/uc-04-dev-pick-task", label: "UC-04: Dev Pick Task" },
          { href: "/storyboards/uc-05-qa-bug-detection", label: "UC-05: QA Bug Detection" },
          { href: "/storyboards/uc-06-qa-code-review", label: "UC-06: QA Code Review" },
          { href: "/storyboards/uc-07-architect-spike", label: "UC-07: Architect Spike" },
          { href: "/storyboards/uc-08-release-deploy", label: "UC-08: Release Deploy" },
          { href: "/storyboards/uc-09-bug-triage-fix", label: "UC-09: Bug Triage Fix" },
          { href: "/storyboards/uc-10-bug-hotfix-verify", label: "UC-10: Hotfix Verify" },
        ],
      },
    ],
  },
  {
    title: "Showcase Only",
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
      {
        href: "/components",
        label: "Components",
        icon: "components",
        subs: [
          { href: "/components#buttons", label: "Buttons" },
          { href: "/components#badges", label: "Badges & Status" },
          { href: "/components#progress", label: "Progress Bars" },
          { href: "/components#avatar", label: "Avatar Stack" },
          { href: "/components#modal", label: "Modal" },
          { href: "/components#dropdown", label: "Dropdown" },
          { href: "/components#accordion", label: "Accordion" },
          { href: "/components#tabs", label: "Tab Panel" },
          { href: "/components#table", label: "Data Table" },
          { href: "/components#tooltip", label: "Tooltip" },
          { href: "/components#codeblock", label: "Code Block" },
          { href: "/components#cards", label: "Cards" },
          { href: "/components#promptcard", label: "Prompt Card" },
          { href: "/components#labels", label: "Section Labels" },
          { href: "/components#statusdot", label: "Status Dots" },
          { href: "/components#skeleton", label: "Skeleton" },
          { href: "/components#emptystate", label: "Empty State" },
          { href: "/components#errorbanner", label: "Error Banner" },
        ],
      },
    ],
  },
];
