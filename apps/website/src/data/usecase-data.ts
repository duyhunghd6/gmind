/* ─── Usecase Data — 10 detailed use cases ─── */

export interface UsecaseStep {
  screen: string;       // route to DS screen
  screenLabel: string;  // short screen name
  action: string;       // what user does
  outcome: string;      // what happens
  state?: string;       // optional screen preset/state
}

export interface Usecase {
  id: string;           // URL slug
  dsId: string;         // DS registry ID
  title: string;
  journey: string;
  journeyColor: string;
  role: string;
  icon: string;
  summary: string;
  steps: UsecaseStep[];
  relatedUsecases: string[];  // IDs of related usecases
}

export const usecases: Usecase[] = [
  /* ── UC-01: PM Sprint Review ── */
  {
    id: "uc-01-pm-sprint-review",
    dsId: "ds:usecase:pmSprintReview-001",
    title: "PM Sprint Review",
    journey: "PM Overview",
    journeyColor: "#58a6ff",
    role: "Project Manager",
    icon: "📊",
    summary: "PM mở Design System Hub, xem tổng quan, chuyển sang Sprint Board để theo dõi tiến độ sprint, kiểm tra WIP limits và velocity.",
    steps: [
      { screen: "/design-system", screenLabel: "Hub", action: "Mở trang chủ Design System", outcome: "Xem tổng quan 11 screens, nhận diện nhanh trạng thái dự án" },
      { screen: "/design-system/kanban", screenLabel: "Kanban Sprint", action: "Click vào card Kanban Board", outcome: "Mở Sprint Board — 14 cards, 6 cột, WIP limits", state: "Sprint Board" },
      { screen: "/design-system/kanban", screenLabel: "Kanban Sprint", action: "Kiểm tra cột 'Đang Làm' — 2 cards, WIP 3", outcome: "Xác nhận không vượt WIP limit, 2 agents đang active" },
      { screen: "/design-system/kanban", screenLabel: "Kanban Sprint", action: "Review card bd-003 (FrankenSQLite driver)", outcome: "Xem chi tiết: P0, Claude-01, due Mar 7, labels: storage, core" },
    ],
    relatedUsecases: ["uc-02-pm-trace-approve", "uc-04-dev-pick-task"],
  },

  /* ── UC-02: PM Trace & Approve ── */
  {
    id: "uc-02-pm-trace-approve",
    dsId: "ds:usecase:pmTraceApprove-001",
    title: "PM Trace & Approve",
    journey: "PM Overview",
    journeyColor: "#58a6ff",
    role: "Project Manager",
    icon: "✅",
    summary: "PM trace hệ thống Beads ID từ PRD → Plan → Task → Commit, sau đó phê duyệt task thông qua Approval Gate.",
    steps: [
      { screen: "/design-system/knowledge-graph", screenLabel: "Knowledge Graph", action: "Mở đồ thị tri thức — preset Hệ sinh thái", outcome: "Xem 38 nodes: PRD → Plan → Task relationships", state: "Hệ sinh thái" },
      { screen: "/design-system/beads-traversal", screenLabel: "Beads Traversal", action: "Trace PRD-02 §1 → br-plan-01 → bd-a1b2", outcome: "Xem chuỗi liên kết: commit c8f2a1b connected" },
      { screen: "/design-system/approval", screenLabel: "Approval Gate", action: "Review 3 approval panels", outcome: "MVCC Layer ✅ approved, CLI Gateway ⏳ pending, Lease Manager ❌ rejected" },
      { screen: "/design-system/approval", screenLabel: "Approval Gate", action: "Click ✅ on CLI Gateway panel", outcome: "Approval status updated to 'Đã phê duyệt'" },
    ],
    relatedUsecases: ["uc-01-pm-sprint-review", "uc-06-qa-code-review"],
  },

  /* ── UC-03: Dev Code Search ── */
  {
    id: "uc-03-dev-code-search",
    dsId: "ds:usecase:devCodeSearch-001",
    title: "Dev Code Search",
    journey: "Developer",
    journeyColor: "#3fb9a0",
    role: "Developer (Agent)",
    icon: "🔍",
    summary: "Developer mở Agent Console, tìm kiếm 'FrankenSQLite' trong codebase, xem kết quả trong Explorer, đọc PRD-02 trong Doc Viewer.",
    steps: [
      { screen: "/design-system/terminal", screenLabel: "Agent Console", action: "Chạy `gmind search-codebase \"FrankenSQLite driver\"`", outcome: "12 kết quả trong 0.34s", state: "Agent Console" },
      { screen: "/design-system/explorer", screenLabel: "Gmind Explorer", action: "Xem search results — 4 docs, 2 commits, 1 task", outcome: "Click vào PRD-02 result" },
      { screen: "/design-system/doc-viewer", screenLabel: "Doc Viewer", action: "Đọc PRD-02: Storage Layer — section Beads IDs", outcome: "Tìm thấy Beads ID br-prd02 linked" },
      { screen: "/design-system/knowledge-graph", screenLabel: "Knowledge Graph", action: "Click Beads ID br-prd02 → xem đồ thị", outcome: "Xem 12 nodes liên quan trực tiếp", state: "Đơn giản" },
    ],
    relatedUsecases: ["uc-04-dev-pick-task", "uc-07-architect-spike"],
  },

  /* ── UC-04: Dev Pick Task ── */
  {
    id: "uc-04-dev-pick-task",
    dsId: "ds:usecase:devPickTask-001",
    title: "Dev Pick Task",
    journey: "Developer",
    journeyColor: "#3fb9a0",
    role: "Developer (Agent)",
    icon: "📋",
    summary: "Developer chọn task từ Sprint Board, kéo sang Đang Làm, mở terminal để bắt đầu code.",
    steps: [
      { screen: "/design-system/kanban", screenLabel: "Sprint Board", action: "Xem To Do column — 2 tasks available", outcome: "Identify bd-009 (Beads ID generator) as next task", state: "Sprint Board" },
      { screen: "/design-system/kanban", screenLabel: "Sprint Board", action: "Kéo bd-009 từ To Do → Đang Làm", outcome: "Card moves, WIP count updates: 2 → 3" },
      { screen: "/design-system/terminal", screenLabel: "Agent Console", action: "Chạy `bd create \"Setup MVCC layer\"`", outcome: "Task created bd-a1b2, lease acquired on driver.go", state: "Agent Console" },
      { screen: "/design-system/terminal", screenLabel: "Agent Console", action: "Bắt đầu coding — edit driver.go", outcome: "File lease: 15 min timeout, auto-renew enabled" },
    ],
    relatedUsecases: ["uc-01-pm-sprint-review", "uc-03-dev-code-search"],
  },

  /* ── UC-05: QA Bug Detection ── */
  {
    id: "uc-05-qa-bug-detection",
    dsId: "ds:usecase:qaBugDetection-001",
    title: "QA Bug Detection",
    journey: "QA/Review",
    journeyColor: "#ff7b72",
    role: "QA Reviewer",
    icon: "🐛",
    summary: "QA xem Activity Feed, phát hiện lỗi regression từ event log, mở Debug Session trong terminal để investigate.",
    steps: [
      { screen: "/design-system/timeline", screenLabel: "Activity Feed", action: "Xem 14 events — filter by 'error' variant", outcome: "Phát hiện: 'QA-Reviewer phát hiện lỗi regression'" },
      { screen: "/design-system/timeline", screenLabel: "File Lease", action: "Kiểm tra File Lease indicators", outcome: "Claude-01 đang lock driver.go (12:45 remaining)" },
      { screen: "/design-system/terminal", screenLabel: "Debug Session", action: "Chạy `go test -v -run TestMVCC_ConcurrentWrite`", outcome: "FAIL: deadlock detected after 5s timeout", state: "Debug Session" },
      { screen: "/design-system/terminal", screenLabel: "Debug Session", action: "Review stack trace and identify root cause", outcome: "Bug in storage_test.go:142 — concurrent write lock" },
    ],
    relatedUsecases: ["uc-06-qa-code-review", "uc-09-bug-triage-fix"],
  },

  /* ── UC-06: QA Code Review ── */
  {
    id: "uc-06-qa-code-review",
    dsId: "ds:usecase:qaCodeReview-001",
    title: "QA Code Review",
    journey: "QA/Review",
    journeyColor: "#ff7b72",
    role: "QA Reviewer",
    icon: "📝",
    summary: "QA review Approval Panel (tests, diff, PRD link), kiểm tra RTM coverage và verify truy vết Beads.",
    steps: [
      { screen: "/design-system/approval", screenLabel: "Approval Gate", action: "Review MVCC Layer panel — 15/15 tests passed", outcome: "Tests green, diff: +142/−38, CI: green" },
      { screen: "/design-system/approval", screenLabel: "RTM Matrix", action: "Kiểm tra Ma trận Truy vết — 10 rows", outcome: "5 covered, 3 partial, 2 gap identified" },
      { screen: "/design-system/approval", screenLabel: "Coverage Heatmap", action: "Xem heatmap — 30 sections", outcome: "Avg: 63%, Full: 10/30, Gaps: 3" },
      { screen: "/design-system/beads-traversal", screenLabel: "Beads Traversal", action: "Verify truy vết cho gap sections", outcome: "Confirm 2 PRD sections chưa có Plan/Task mapping" },
    ],
    relatedUsecases: ["uc-02-pm-trace-approve", "uc-05-qa-bug-detection"],
  },

  /* ── UC-07: Architect Spike Discovery ── */
  {
    id: "uc-07-architect-spike",
    dsId: "ds:usecase:architectSpike-001",
    title: "Architect Spike Discovery",
    journey: "Architect",
    journeyColor: "#d29922",
    role: "Architect",
    icon: "🏗️",
    summary: "Architect đọc Architecture.md, review Knowledge Graph ecosystem, tìm spike reports liên quan qua Explorer.",
    steps: [
      { screen: "/design-system/doc-viewer", screenLabel: "Doc Viewer", action: "Mở Architecture.md — 5-layer system design", outcome: "Read layer 2: Storage Layer implementation" },
      { screen: "/design-system/knowledge-graph", screenLabel: "Knowledge Graph", action: "Review Ecosystem graph — agents, workflows", outcome: "38 nodes visible, identify FrankenSQLite cluster", state: "Hệ sinh thái" },
      { screen: "/design-system/explorer", screenLabel: "Explorer", action: "Search 'spike FrankenSQLite'", outcome: "Found: spike-frankensqlite-vs-doltdb.md, spike-zvec-indexer.md" },
      { screen: "/design-system/doc-viewer", screenLabel: "Doc Viewer", action: "Open spike report and read Recommendation", outcome: "Decision: FrankenSQLite chosen over DoltDB per ADR-001" },
    ],
    relatedUsecases: ["uc-03-dev-code-search", "uc-08-release-deploy"],
  },

  /* ── UC-08: Release Deploy ── */
  {
    id: "uc-08-release-deploy",
    dsId: "ds:usecase:releaseDeploy-001",
    title: "Release Deploy",
    journey: "Release Mgmt",
    journeyColor: "#bc8cff",
    role: "Release Manager",
    icon: "🚀",
    summary: "RM manages Release Board, reviews release branches trong Git Graph, checks deploy timeline.",
    steps: [
      { screen: "/design-system/kanban", screenLabel: "Release Board", action: "Mở Release Board — 11 cards", outcome: "Review RC stages: Chưa bắt đầu → Chuẩn bị → Đang kiểm tra → Chờ phê duyệt", state: "Release Board" },
      { screen: "/design-system/git-graph", screenLabel: "Release Train", action: "Xem Release Train scenario", outcome: "Multiple releases song song — v2.0, v2.1 with feature windows", state: "Release Train" },
      { screen: "/design-system/timeline", screenLabel: "Deploy History", action: "Check deploy timeline events", outcome: "Review: CI/CD green → staging → production deploy history" },
      { screen: "/design-system/terminal", screenLabel: "Deploy Pipeline", action: "Execute `vercel deploy --prod`", outcome: "Deployed: https://gmind.gscfin.com (12.4s)", state: "Deploy Pipeline" },
    ],
    relatedUsecases: ["uc-01-pm-sprint-review", "uc-10-bug-hotfix-verify"],
  },

  /* ── UC-09: Bug Triage Fix ── */
  {
    id: "uc-09-bug-triage-fix",
    dsId: "ds:usecase:bugTriageFix-001",
    title: "Bug Triage Fix",
    journey: "Bug Triage",
    journeyColor: "#f78166",
    role: "QA / Developer",
    icon: "🔧",
    summary: "QA mở Bug Triage board, chọn P0 bug, debug trong terminal, tạo hotfix branch.",
    steps: [
      { screen: "/design-system/kanban", screenLabel: "Bug Board", action: "Mở Bug Triage — 13 bugs phân theo severity", outcome: "Identify P0: FrankenSQLite deadlock (bd-b05)", state: "Bug Triage" },
      { screen: "/design-system/terminal", screenLabel: "Debug Session", action: "Chạy debug command — find root cause", outcome: "Root cause: storage_test.go concurrent write lock", state: "Debug Session" },
      { screen: "/design-system/git-graph", screenLabel: "Hotfix Flow", action: "Xem Hotfix Emergency scenario", outcome: "Create hotfix/CVE-2026 branch → fix → cherry-pick", state: "Hotfix Emergency" },
      { screen: "/design-system/terminal", screenLabel: "Agent Console", action: "Push hotfix commit", outcome: "fix(mvcc): resolve deadlock — cherry-picked to release/v1.0" },
    ],
    relatedUsecases: ["uc-05-qa-bug-detection", "uc-10-bug-hotfix-verify"],
  },

  /* ── UC-10: Bug Hotfix Verify ── */
  {
    id: "uc-10-bug-hotfix-verify",
    dsId: "ds:usecase:bugHotfixVerify-001",
    title: "Bug Hotfix Verify",
    journey: "Bug Triage",
    journeyColor: "#f78166",
    role: "QA Reviewer",
    icon: "✅",
    summary: "QA verify hotfix qua Git Graph, chạy regression tests, approve merge to production.",
    steps: [
      { screen: "/design-system/git-graph", screenLabel: "Hotfix Flow", action: "Xem hotfix branch đã merge vào main", outcome: "Commit tagged v2.1.1 — cherry-pick verified", state: "Hotfix Emergency" },
      { screen: "/design-system/terminal", screenLabel: "CI/CD Run", action: "Xem CI pipeline — all 8 steps", outcome: "42/42 tests passed, 0 vulnerabilities, build 8.7s", state: "CI/CD Run" },
      { screen: "/design-system/approval", screenLabel: "Approval Gate", action: "Review Approval Panel for hotfix", outcome: "Tests passed ✅, PRD link verified, CI green" },
      { screen: "/design-system/approval", screenLabel: "Approval Gate", action: "Click ✅ to approve merge", outcome: "Hotfix approved → deployed to production" },
    ],
    relatedUsecases: ["uc-09-bug-triage-fix", "uc-08-release-deploy"],
  },
];

/** Map usecase slug → Usecase for quick lookup */
export const USECASE_MAP: Record<string, Usecase> = Object.fromEntries(
  usecases.map((uc) => [uc.id, uc])
);
