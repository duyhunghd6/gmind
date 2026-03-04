/* ───────────── Design System ID Registry (v2 — Granular) ───────────── */
/* Centralized source of truth for all DS element IDs.                    */
/* Format: ds:<type>:<sectionName-NNN>                                    */
/* IDs are granular — each section/scenario within a page gets its own.   */

export type DsType =
  | "hub"
  | "screen"
  | "comp"
  | "token"
  | "layout"
  | "state"
  | "flow"
  | "usecase"
  | "terminal"
  | "gitGraph"
  | "kanban"
  | "knowledgeGraph"
  | "approval"
  | "timeline"
  | "storyboard"
  | "docViewer"
  | "explorer"
  | "beadsTraversal";

export interface DsEntry {
  id: string;
  type: DsType;
  name: string;
  description: string;
}

export const DS_REGISTRY: DsEntry[] = [
  /* ══════════════════════════════════════════════════
     HUB — Main Design System page
     ══════════════════════════════════════════════════ */
  { id: "ds:hub:overview-001", type: "hub", name: "Hub Overview", description: "Trang chính Design System" },
  { id: "ds:hub:screenGrid-001", type: "hub", name: "Screen Grid", description: "Grid hiển thị tất cả screens" },

  /* ══════════════════════════════════════════════════
     SCREENS — Page-level IDs (kept for top-level h1)
     ══════════════════════════════════════════════════ */
  { id: "ds:screen:terminal-001", type: "screen", name: "Terminal", description: "Terminal Screen" },
  { id: "ds:screen:git-graph-001", type: "screen", name: "Đồ thị Git", description: "Git Graph Screen" },
  { id: "ds:screen:kanban-001", type: "screen", name: "Kanban Board", description: "Kanban Screen" },
  { id: "ds:screen:knowledge-graph-001", type: "screen", name: "Knowledge Graph", description: "Knowledge Graph Screen" },
  { id: "ds:screen:approval-001", type: "screen", name: "Phê duyệt & RTM", description: "Approval Screen" },
  { id: "ds:screen:timeline-001", type: "screen", name: "Timeline", description: "Timeline Screen" },
  { id: "ds:screen:components-001", type: "screen", name: "Components", description: "Components Catalog Screen" },
  { id: "ds:screen:doc-viewer-001", type: "screen", name: "Doc Viewer", description: "Doc Viewer Screen" },
  { id: "ds:screen:explorer-001", type: "screen", name: "Gmind Explorer", description: "Explorer Screen" },
  { id: "ds:screen:beads-traversal-001", type: "screen", name: "Beads Traversal", description: "Beads Traversal Screen" },
  { id: "ds:screen:storyboard-001", type: "screen", name: "Storyboard", description: "Storyboard Screen" },

  /* ══════════════════════════════════════════════════
     TERMINAL — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:terminal:agentConsole-001", type: "terminal", name: "Agent Console", description: "Scenario: gmind CLI, bd create, gh pr" },
  { id: "ds:terminal:deployPipeline-001", type: "terminal", name: "Deploy Pipeline", description: "Scenario: pnpm build, vercel deploy" },
  { id: "ds:terminal:debugSession-001", type: "terminal", name: "Debug Session", description: "Scenario: gmind debug --trace" },
  { id: "ds:terminal:cicdRun-001", type: "terminal", name: "CI/CD Run", description: "Scenario: GitHub Actions pipeline 8 steps" },
  { id: "ds:terminal:stateVariants-001", type: "terminal", name: "State Variants", description: "Success + Error side-by-side terminals" },
  { id: "ds:terminal:mosaicLayout-001", type: "terminal", name: "Mosaic Layout", description: "2×2 multi-agent layout" },

  /* ══════════════════════════════════════════════════
     GIT GRAPH — Section-level IDs (5 scenarios)
     ══════════════════════════════════════════════════ */
  { id: "ds:gitGraph:gitflow-001", type: "gitGraph", name: "Gitflow Chuẩn", description: "feature → develop → release → master" },
  { id: "ds:gitGraph:multiAgent-001", type: "gitGraph", name: "Multi-Agent Worktree", description: "3 agents, orchestrator merge" },
  { id: "ds:gitGraph:hotfixEmergency-001", type: "gitGraph", name: "Hotfix Khẩn Cấp", description: "Production fix → cherry-pick" },
  { id: "ds:gitGraph:releaseTrain-001", type: "gitGraph", name: "Release Train", description: "Multiple releases song song" },
  { id: "ds:gitGraph:monorepo-001", type: "gitGraph", name: "Monorepo Multi-Package", description: "Scoped branches per package" },
  { id: "ds:gitGraph:beadsPrdTrace-001", type: "gitGraph", name: "Beads: PRD Trace", description: "PRD-02 → br-plan-01 → bd-a1b2 → commits" },
  { id: "ds:gitGraph:beadsDeadlock-001", type: "gitGraph", name: "Beads: Deadlock Fix", description: "Bug bd-b05 → debug → hotfix → merge" },
  { id: "ds:gitGraph:beadsDsComp-001", type: "gitGraph", name: "Beads: DS Components", description: "ds:comp:* parallel branch development" },
  { id: "ds:gitGraph:beadsTraversal-001", type: "gitGraph", name: "Beads: Full Traversal", description: "PRD → Arch → Plan → Task → Commit → Deploy" },
  { id: "ds:gitGraph:beadsSprintReview-001", type: "gitGraph", name: "Beads: Sprint Review", description: "Sprint W10: 4 agents → tasks → merge" },

  /* ══════════════════════════════════════════════════
     KANBAN — Section-level IDs (3 boards)
     ══════════════════════════════════════════════════ */
  { id: "ds:kanban:sprintBoard-001", type: "kanban", name: "Sprint Board", description: "Sprint 2026-W10 — 12 tasks, 4 agents" },
  { id: "ds:kanban:releaseBoard-001", type: "kanban", name: "Release Board", description: "Release v1.0 checklist" },
  { id: "ds:kanban:bugTriage-001", type: "kanban", name: "Bug Triage", description: "Severity-based bug workflow" },

  /* ══════════════════════════════════════════════════
     APPROVAL — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:approval:panels-001", type: "approval", name: "Approval Panels", description: "3 task approval panels" },
  { id: "ds:approval:rtmMatrix-001", type: "approval", name: "RTM Matrix", description: "Requirements Traceability Matrix 10 rows" },
  { id: "ds:approval:coverageHeatmap-001", type: "approval", name: "Coverage Heatmap", description: "30-cell heatmap visualization" },

  /* ══════════════════════════════════════════════════
     TIMELINE — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:timeline:fileLease-001", type: "timeline", name: "File Lease", description: "5 trạng thái khóa tệp" },
  { id: "ds:timeline:activityFeed-001", type: "timeline", name: "Activity Feed", description: "14 agent events" },
  { id: "ds:timeline:sprintDay-001", type: "timeline", name: "Sprint Day Timeline", description: "11 entries, alternating layout" },

  /* ══════════════════════════════════════════════════
     STORYBOARD — Section-level IDs (6 journeys)
     ══════════════════════════════════════════════════ */
  { id: "ds:storyboard:pmOverview-001", type: "storyboard", name: "PM Overview", description: "5 screens, 4 transitions" },
  { id: "ds:storyboard:developer-001", type: "storyboard", name: "Developer", description: "5 screens, 4 transitions" },
  { id: "ds:storyboard:qaReview-001", type: "storyboard", name: "QA/Review", description: "4 screens, 3 transitions" },
  { id: "ds:storyboard:architect-001", type: "storyboard", name: "Architect", description: "3 screens, 2 transitions" },
  { id: "ds:storyboard:releaseMgmt-001", type: "storyboard", name: "Release Mgmt", description: "3 screens, 2 transitions" },
  { id: "ds:storyboard:bugTriage-001", type: "storyboard", name: "Bug Triage", description: "4 screens, 3 transitions" },
  { id: "ds:storyboard:crossJourney-001", type: "storyboard", name: "Cross-Journey Links", description: "4 inter-journey connections" },

  /* ══════════════════════════════════════════════════
     COMPONENTS — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:comp:card-001", type: "comp", name: "Card", description: "ve-card, ve-card--hero" },
  { id: "ds:comp:pillarCard-001", type: "comp", name: "PillarCard", description: "4 accent variants" },
  { id: "ds:comp:button-001", type: "comp", name: "Button", description: "primary / secondary / danger" },
  { id: "ds:comp:badge-001", type: "comp", name: "Badge", description: "4 color variants" },
  { id: "ds:comp:tooltip-001", type: "comp", name: "Tooltip", description: "CSS-only hover" },
  { id: "ds:comp:codeBlock-001", type: "comp", name: "CodeBlock", description: "Code highlight + copy" },
  { id: "ds:comp:promptCard-001", type: "comp", name: "PromptCard", description: "Gradient hover effect" },
  { id: "ds:comp:sectionLabel-001", type: "comp", name: "SectionLabel", description: "4 accent variants" },
  { id: "ds:comp:sectionDivider-001", type: "comp", name: "SectionDivider", description: "Horizontal rule" },
  { id: "ds:comp:terminal-001", type: "comp", name: "Terminal", description: "Terminal window component" },
  { id: "ds:comp:kanbanCard-001", type: "comp", name: "KanbanCard", description: "Draggable card" },
  { id: "ds:comp:kanbanColumn-001", type: "comp", name: "KanbanColumn", description: "Droppable column" },
  { id: "ds:comp:gitGraph-001", type: "comp", name: "GitGraph", description: "SVG commit graph" },
  { id: "ds:comp:stateToggle-001", type: "comp", name: "StateToggleBar", description: "6-state switcher" },

  /* ══════════════════════════════════════════════════
     TOKENS — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:token:colors-001", type: "token", name: "Colors", description: "Bảng màu chính" },
  { id: "ds:token:spacing-001", type: "token", name: "Spacing", description: "Thang khoảng cách (4px base)" },
  { id: "ds:token:typography-001", type: "token", name: "Typography", description: "DM Sans + Fira Code" },
  { id: "ds:token:animations-001", type: "token", name: "Animations", description: "fadeUp, fadeIn, slideInRight" },

  /* ══════════════════════════════════════════════════
     LAYOUTS — Section-level IDs
     ══════════════════════════════════════════════════ */
  { id: "ds:layout:grid-001", type: "layout", name: "Grid", description: "grid-2, grid-3" },
  { id: "ds:layout:glass-001", type: "layout", name: "Glassmorphism", description: "backdrop-filter: blur" },
  { id: "ds:layout:pathTree-001", type: "layout", name: "Path Tree", description: "File tree display" },
  { id: "ds:layout:terminalMosaic-001", type: "layout", name: "Terminal Mosaic", description: "2×2 layout" },
  { id: "ds:layout:kanbanBoard-001", type: "layout", name: "Kanban Board", description: "Column flex layout" },
  { id: "ds:layout:docsLayout-001", type: "layout", name: "Docs Layout", description: "2-column sidebar + content" },

  /* ══════════════════════════════════════════════════
     STATES & FLOWS
     ══════════════════════════════════════════════════ */
  { id: "ds:state:matrix-001", type: "state", name: "State Matrix", description: "Component state table" },
  { id: "ds:state:tokenUsage-001", type: "state", name: "Token Usage", description: "CSS token usage example" },
  { id: "ds:flow:explore-001", type: "flow", name: "Khám phá", description: "Trang chủ → 4 Trụ cột" },
  { id: "ds:flow:copyPrompt-001", type: "flow", name: "Sao chép Prompt", description: "Prompts → Sao chép" },
  { id: "ds:flow:research-001", type: "flow", name: "Nghiên cứu", description: "PRDs → Spike" },
  { id: "ds:flow:githubVisitor-001", type: "flow", name: "Khách GitHub", description: "README → website → copy" },
  { id: "ds:flow:pageStructure-001", type: "flow", name: "Cấu trúc Trang", description: "Navigation map" },
  { id: "ds:token:utilities-001", type: "token", name: "Utilities", description: "Radius, shadows" },

  /* ══════════════════════════════════════════════════
     USECASES — Individual detail pages
     ══════════════════════════════════════════════════ */
  { id: "ds:usecase:pmSprintReview-001", type: "usecase", name: "PM Sprint Review", description: "PM reviews sprint board and tracks progress" },
  { id: "ds:usecase:pmTraceApprove-001", type: "usecase", name: "PM Trace & Approve", description: "PM traces PRD → task → commit and approves" },
  { id: "ds:usecase:devCodeSearch-001", type: "usecase", name: "Dev Code Search", description: "Developer searches codebase and opens docs" },
  { id: "ds:usecase:devPickTask-001", type: "usecase", name: "Dev Pick Task", description: "Developer picks task from kanban and starts work" },
  { id: "ds:usecase:qaBugDetection-001", type: "usecase", name: "QA Bug Detection", description: "QA detects bug in activity feed and debugs" },
  { id: "ds:usecase:qaCodeReview-001", type: "usecase", name: "QA Code Review", description: "QA reviews approval panel and checks RTM" },
  { id: "ds:usecase:architectSpike-001", type: "usecase", name: "Architect Spike Discovery", description: "Architect reads docs and discovers related spikes" },
  { id: "ds:usecase:releaseDeploy-001", type: "usecase", name: "Release Deploy", description: "RM manages release board, git graph, and deploys" },
  { id: "ds:usecase:bugTriageFix-001", type: "usecase", name: "Bug Triage Fix", description: "QA triages bug, debugs, and creates hotfix" },
  { id: "ds:usecase:bugHotfixVerify-001", type: "usecase", name: "Bug Hotfix Verify", description: "QA verifies hotfix via git graph and approval" },
];

/* ── Helpers ── */

export function getDsId(id: string): DsEntry | undefined {
  return DS_REGISTRY.find((e) => e.id === id);
}

export function getDsByType(type: DsType): DsEntry[] {
  return DS_REGISTRY.filter((e) => e.type === type);
}

/** Map screen href → DS ID for quick lookup */
export const SCREEN_ID_MAP: Record<string, string> = {
  "/design-system": "ds:hub:overview-001",
  "/design-system/terminal": "ds:screen:terminal-001",
  "/design-system/git-graph": "ds:screen:git-graph-001",
  "/design-system/kanban": "ds:screen:kanban-001",
  "/design-system/knowledge-graph": "ds:screen:knowledge-graph-001",
  "/design-system/approval": "ds:screen:approval-001",
  "/design-system/timeline": "ds:screen:timeline-001",
  "/design-system/components": "ds:screen:components-001",
  "/design-system/doc-viewer": "ds:screen:doc-viewer-001",
  "/design-system/explorer": "ds:screen:explorer-001",
  "/design-system/beads-traversal": "ds:screen:beads-traversal-001",
  "/design-system/storyboard": "ds:screen:storyboard-001",
};
