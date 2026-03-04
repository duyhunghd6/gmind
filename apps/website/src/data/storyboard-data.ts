/* ─── Storyboard — 24 Use Cases as a Graph ─── */

export interface StoryNode {
  id: string;
  screen: string;       // route path
  label: string;        // short title
  description: string;  // what user sees at this state
  journey: string;      // which user journey
  journeyColor: string;
  state?: string;       // optional screen state (e.g., "Sprint Board" preset)
}

export interface StoryEdge {
  source: string;
  target: string;
  action: string;       // user action label on edge
}

export const JOURNEY_COLORS: Record<string, string> = {
  "PM Overview": "#58a6ff",
  "Developer": "#3fb9a0",
  "QA/Review": "#ff7b72",
  "Architect": "#d29922",
  "Release Mgmt": "#bc8cff",
  "Bug Triage": "#f78166",
};

export const storyNodes: StoryNode[] = [
  // Journey 1: PM Overview
  { id: "s1", screen: "/design-system", label: "Hub", description: "PM mở trang chủ Design System, xem tổng quan các screens", journey: "PM Overview", journeyColor: JOURNEY_COLORS["PM Overview"] },
  { id: "s2", screen: "/design-system/kanban", label: "Kanban Sprint", description: "PM xem Sprint Board — 14 cards, 6 cột, WIP limits", journey: "PM Overview", journeyColor: JOURNEY_COLORS["PM Overview"], state: "Sprint Board" },
  { id: "s3", screen: "/design-system/knowledge-graph", label: "Graph: Ecosystem", description: "PM xem đồ thị 38 nodes — PRD→Plan→Task relationships", journey: "PM Overview", journeyColor: JOURNEY_COLORS["PM Overview"], state: "Hệ sinh thái" },
  { id: "s4", screen: "/design-system/beads-traversal", label: "Beads Trace", description: "PM trace PRD-02 §1 → br-plan-01 → bd-a1b2 → commit c8f2a1b", journey: "PM Overview", journeyColor: JOURNEY_COLORS["PM Overview"] },
  { id: "s5", screen: "/design-system/approval", label: "Approval Gate", description: "PM phê duyệt 3 tasks: MVCC Layer ✅, CLI Gateway ⏳, Lease Manager ❌", journey: "PM Overview", journeyColor: JOURNEY_COLORS["PM Overview"] },

  // Journey 2: Developer
  { id: "s6", screen: "/design-system/terminal", label: "Agent Console", description: "Dev mở terminal — chạy gmind search-codebase, bd create", journey: "Developer", journeyColor: JOURNEY_COLORS["Developer"], state: "Agent Console" },
  { id: "s7", screen: "/design-system/explorer", label: "Search Results", description: "Dev tìm kiếm 'FrankenSQLite' — 4 docs, 2 commits, 1 task khớp", journey: "Developer", journeyColor: JOURNEY_COLORS["Developer"] },
  { id: "s8", screen: "/design-system/doc-viewer", label: "PRD-02 Viewer", description: "Dev đọc PRD-02: Storage Layer — xem section Beads IDs", journey: "Developer", journeyColor: JOURNEY_COLORS["Developer"] },
  { id: "s9", screen: "/design-system/knowledge-graph", label: "Graph: Simple", description: "Dev click Beads ID br-prd02 — xem đồ thị 12 nodes liên quan", journey: "Developer", journeyColor: JOURNEY_COLORS["Developer"], state: "Đơn giản" },
  { id: "s10", screen: "/design-system/kanban", label: "Pick Task", description: "Dev chọn task bd-009 từ To Do column, kéo sang Đang Làm", journey: "Developer", journeyColor: JOURNEY_COLORS["Developer"], state: "Sprint Board" },

  // Journey 3: QA/Review
  { id: "s11", screen: "/design-system/timeline", label: "Activity Feed", description: "QA xem 14 events — phát hiện lỗi regression từ Claude-01", journey: "QA/Review", journeyColor: JOURNEY_COLORS["QA/Review"] },
  { id: "s12", screen: "/design-system/terminal", label: "Debug Session", description: "QA mở debug terminal — TestMVCC_ConcurrentWrite FAIL", journey: "QA/Review", journeyColor: JOURNEY_COLORS["QA/Review"], state: "Debug Session" },
  { id: "s13", screen: "/design-system/approval", label: "Code Review", description: "QA review Approval Panel — Tests, Diff, Beads ID, PRD link, CI", journey: "QA/Review", journeyColor: JOURNEY_COLORS["QA/Review"] },
  { id: "s14", screen: "/design-system/beads-traversal", label: "Check Coverage", description: "QA verify RTM coverage — 5/8 PRD sections covered, 2 gap", journey: "QA/Review", journeyColor: JOURNEY_COLORS["QA/Review"] },

  // Journey 4: Architect
  { id: "s15", screen: "/design-system/doc-viewer", label: "Architecture.md", description: "Architect đọc Architecture.md — 5-layer system design", journey: "Architect", journeyColor: JOURNEY_COLORS["Architect"] },
  { id: "s16", screen: "/design-system/knowledge-graph", label: "Graph: Ecosystem", description: "Architect review Ecosystem graph — agents, workflows, tests", journey: "Architect", journeyColor: JOURNEY_COLORS["Architect"], state: "Hệ sinh thái" },
  { id: "s17", screen: "/design-system/explorer", label: "Search Spikes", description: "Architect tìm 'spike FrankenSQLite' — 2 spike reports tìm thấy", journey: "Architect", journeyColor: JOURNEY_COLORS["Architect"] },

  // Journey 5: Release Mgmt
  { id: "s18", screen: "/design-system/kanban", label: "Release Board", description: "RM xem Release Board — 11 cards phân theo RC stages", journey: "Release Mgmt", journeyColor: JOURNEY_COLORS["Release Mgmt"], state: "Release Board" },
  { id: "s19", screen: "/design-system/git-graph", label: "Release Train", description: "RM xem Release Train scenario — cherry-pick, staging, production", journey: "Release Mgmt", journeyColor: JOURNEY_COLORS["Release Mgmt"], state: "Release Train" },
  { id: "s20", screen: "/design-system/timeline", label: "Deploy History", description: "RM xem timeline — deploy events, CI pipeline, hotfix history", journey: "Release Mgmt", journeyColor: JOURNEY_COLORS["Release Mgmt"] },

  // Journey 6: Bug Triage
  { id: "s21", screen: "/design-system/kanban", label: "Bug Board", description: "QA mở Bug Triage board — 13 bugs phân theo severity", journey: "Bug Triage", journeyColor: JOURNEY_COLORS["Bug Triage"], state: "Bug Triage" },
  { id: "s22", screen: "/design-system/terminal", label: "Debug Bug", description: "QA chạy debug command — find root cause in storage_test.go", journey: "Bug Triage", journeyColor: JOURNEY_COLORS["Bug Triage"], state: "Debug Session" },
  { id: "s23", screen: "/design-system/git-graph", label: "Hotfix Flow", description: "QA xem Hotfix Emergency scenario — cherry-pick to release", journey: "Bug Triage", journeyColor: JOURNEY_COLORS["Bug Triage"], state: "Hotfix Emergency" },
  { id: "s24", screen: "/design-system/approval", label: "Verify Fix", description: "QA verify hotfix — Tests pass, approve merge to production", journey: "Bug Triage", journeyColor: JOURNEY_COLORS["Bug Triage"] },
];

export const storyEdges: StoryEdge[] = [
  // Journey 1: PM
  { source: "s1", target: "s2", action: "Click Kanban icon" },
  { source: "s2", target: "s3", action: "Click task → View in Graph" },
  { source: "s3", target: "s4", action: "Click node → Trace Beads" },
  { source: "s4", target: "s5", action: "Click task → Approve" },

  // Journey 2: Developer
  { source: "s6", target: "s7", action: "Search results → Explorer" },
  { source: "s7", target: "s8", action: "Click doc result" },
  { source: "s8", target: "s9", action: "Click Beads ID in doc" },
  { source: "s9", target: "s10", action: "Click task node → Kanban" },

  // Journey 3: QA/Review
  { source: "s11", target: "s12", action: "Click error event → Terminal" },
  { source: "s12", target: "s13", action: "Submit for review" },
  { source: "s13", target: "s14", action: "Check RTM coverage" },

  // Journey 4: Architect
  { source: "s15", target: "s16", action: "View in Knowledge Graph" },
  { source: "s16", target: "s17", action: "Search related spikes" },
  { source: "s17", target: "s8", action: "Open spike doc" },

  // Journey 5: Release
  { source: "s18", target: "s19", action: "View release branches" },
  { source: "s19", target: "s20", action: "Check deploy timeline" },

  // Journey 6: Bug Triage
  { source: "s21", target: "s22", action: "Click bug → Debug" },
  { source: "s22", target: "s23", action: "View hotfix graph" },
  { source: "s23", target: "s24", action: "Approve hotfix" },

  // Cross-journey links
  { source: "s5", target: "s14", action: "Check coverage" },
  { source: "s10", target: "s6", action: "Open terminal" },
  { source: "s14", target: "s8", action: "View ADR doc" },
  { source: "s20", target: "s2", action: "Back to board" },
];
