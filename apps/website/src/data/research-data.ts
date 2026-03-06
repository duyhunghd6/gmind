export interface ResearchItem {
  id: string;
  type: "spike" | "prd" | "reference";
  title: string;
  status: "completed" | "approved" | "pending";
  date: string;
  summary: string;
  conclusions: string[];
  impact: string;
  link: string;
}

export const researchItems: ResearchItem[] = [
  // ═══ PRDs (6 file mới từ core-gmind) ═══
  {
    id: "prd-00",
    type: "prd",
    title: "PRD-00: Tầm nhìn & Kiến trúc Gmind",
    status: "approved",
    date: "2026-03-04",
    summary:
      "Định nghĩa tầm nhìn tổng thể Gmind Platform: nền tảng quản lý vòng đời phần mềm tích hợp AI, 5+1 lớp kiến trúc (Lưu trữ, Công cụ Cốt lõi, Thực thi Agent, Xác minh, API Gateway, Web UI). Bản thiết kế gốc quy tụ mọi PRD con.",
    conclusions: [
      "Gmind = Nền tảng Agentic Software Engineering cho doanh nghiệp 2 Human + 18 AI Agent",
      "Kiến trúc 5+1 lớp: mỗi lớp hoạt động độc lập, giao tiếp qua Beads ID",
      "Nguyên tắc 'Agents đề xuất, Humans phê duyệt' xuyên suốt toàn hệ thống",
      "Tech stack: Rust core (beads_rust, FastCode) + Go CLI/API + Next.js Web UI",
    ],
    impact: "Bản thiết kế nền tảng — mọi PRD khác đều tham chiếu về đây",
    link: "docs/PRDs/core-gmind/PRD-00-Vision-and-Architecture.md",
  },
  {
    id: "prd-01",
    type: "prd",
    title: "PRD-01: Lớp Lưu trữ & Công cụ Đồ thị",
    status: "approved",
    date: "2026-03-04",
    summary:
      "Lưu trữ kết hợp: FrankenSQLite (trạng thái có cấu trúc, MVCC ghi đồng thời) + Zvec (tìm kiếm ngữ nghĩa cho tài liệu/chat). Công cụ Đồ thị xây dựng Knowledge Graph từ Beads ID, liên kết mọi thực thể (PRD, Plan, Task, Commit, PR, CI).",
    conclusions: [
      "FrankenSQLite dùng cột SQL first-class (indexed, type-safe) — KHÔNG dùng JSON blob",
      "JSONL là SSOT đồng bộ qua git — FrankenSQLite là cache cục bộ (tái tạo được)",
      "Graph Assembler duyệt song song 5+ nguồn dữ liệu tại thời điểm truy vấn",
      "12+ loại cạnh tự phát hiện: satisfies, implements, committed-for, discussed-in, v.v.",
    ],
    impact: "Định hướng thiết kế schema beads_rust và động cơ trí tuệ Knowledge Graph",
    link: "docs/PRDs/core-gmind/PRD-01-Storage-and-Graph-Engine.md",
  },
  {
    id: "prd-02",
    type: "prd",
    title: "PRD-02: Theo dõi Phổ quát & RTM",
    status: "approved",
    date: "2026-03-04",
    summary:
      "Hệ thống Theo dõi Phổ quát (Universal Tracking): Beads-ID là khoá chính xuyên suốt mọi lớp. ID cấp phần cho truy vết PRD ↔ Plan ↔ Task ↔ Commit. Trực quan hoá Ma trận Truy vết Yêu cầu (RTM) với coverage, gap analysis, impact analysis.",
    conclusions: [
      "Beads ID cấp phần: br-prdNN-sM cho mục PRD, br-plan-NN cho kế hoạch",
      "RTM 3 lớp: Mục PRD ↔ Phần tử Kế hoạch ↔ Task (truy vết đầy đủ)",
      "gmind coverage, gmind gaps, gmind impact — 3 lệnh RTM cốt lõi",
      "Chiến lược Dọn rác Lười: polling bảng events + garbage collection Zvec",
    ],
    impact: "Cho phép trực quan hoá Requirements Traceability Matrix đầu-cuối",
    link: "docs/PRDs/core-gmind/PRD-02-Universal-Tracking-and-RTM.md",
  },
  {
    id: "prd-03",
    type: "prd",
    title: "PRD-03: CLI & Quy trình Agent",
    status: "approved",
    date: "2026-03-04",
    summary:
      "gmind là Cổng API Ngữ cảnh duy nhất. Định nghĩa 8+ lệnh CLI: search, search-codebase, context, trace, coverage, impact, gaps, github. Áp dụng Nguyên tắc Bốn Mắt (Code Agent ≠ Reviewer Agent) và khoá tệp Lease Timeout.",
    conclusions: [
      "gmind search-codebase là điểm vào duy nhất cho Trí tuệ Mã nguồn (FastCode ẩn bên trong)",
      "Quy trình Agent: Phân loại → TimCode → NạpNgữCảnh → KhoáTệp → Code → XácMinh → Đóng",
      "Tag truy vết bắt buộc: --tag='implements:' và --tag='satisfies:' trên mọi task",
      "Beads-ID: Git Trailer trong mọi commit — không còn cú pháp #br-123",
    ],
    impact: "Định nghĩa chính xác quy tắc skill agent và bề mặt API CLI",
    link: "docs/PRDs/core-gmind/PRD-03-CLI-and-Agent-Execution.md",
  },
  {
    id: "prd-04",
    type: "prd",
    title: "PRD-04: WebUI & PM Workspace",
    status: "approved",
    date: "2026-03-04",
    summary:
      "Giao diện Web quản lý dự án tích hợp: Dashboard RTM (4 panel), Kanban Board, Knowledge Graph trực quan, và giao diện phê duyệt cho Human. Web UI giao tiếp qua Go REST API — không truy cập DB trực tiếp.",
    conclusions: [
      "4-panel Dashboard: Coverage Heatmap, Task Progress, Interactive Graph, Gap Analysis",
      "gmind serve: Go HTTP server, embed frontend via embed.FS, single binary distribution",
      "D3.js force-directed graph cho Knowledge Graph visualization",
      "Human Approval UI: review agent output, approve/reject/escalate qua web",
    ],
    impact: "Định nghĩa giao diện quản lý cho PM và Human reviewer",
    link: "docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md",
  },
  {
    id: "prd-05",
    type: "prd",
    title: "PRD-05: GSafe Workflow & Triển khai",
    status: "approved",
    date: "2026-03-04",
    summary:
      "Quy trình GSafe: ánh xạ SAFe 6.0 vào Agentic Software House. Continuous Exploration → PI Planning → Implementation → Verification. Workflow agent tự động hoá với cổng phê duyệt Human tại các điểm quyết định quan trọng.",
    conclusions: [
      "4 Activity CE: Hypothesize → Collaborate & Research → Architect → Synthesize",
      "Agent workflow: Spike → PRD → Plan → Task decomposition → Implementation",
      "RTE Agent điều phối, Dev Agent thực thi, QA Agent xác minh",
      "Human approval chỉ 1 lần cuối CE — không phải mỗi spike",
    ],
    impact: "Bản thiết kế quy trình vận hành GSafe cho toàn bộ dự án",
    link: "docs/PRDs/core-gmind/PRD-05-GSafe-Workflow-and-Implementation.md",
  },

  // ═══ Các Spike Đã hoàn thành ═══
  {
    id: "spike-frankensqlite",
    type: "spike",
    title: "FrankenSQLite vs DoltDB",
    status: "completed",
    date: "2026-02-28",
    summary:
      "Đánh giá beads_rust+FrankenSQLite so với DoltDB cho quản lý task. FrankenSQLite thắng ở: MVCC trong tiến trình (không qua giao thức MySQL), đồng bộ JSONL qua git (1 VCS thay vì 2), binary 5-8MB vs 30+MB, và cột SQL first-class thay JSON blob.",
    conclusions: [
      "✅ beads_rust thay thế DoltDB — lợi ích vượt trội hơn mất mát",
      "Cell-level merge không cần thiết — agent làm việc trên task riêng biệt (khác hàng)",
      "Cần migration 5 cột PM: qa_status, qa_verified_by, test_logs_ref, coverage, escalation_level",
      "API Gateway: nhúng FrankenSQLite vào gmind Go binary qua CGo/FFI",
    ],
    impact: "Loại bỏ phụ thuộc DoltDB — đơn giản hoá kiến trúc lưu trữ",
    link: "docs/researches/spikes/spike-frankensqlite-vs-doltdb.md",
  },
  {
    id: "spike-fastcode",
    type: "spike",
    title: "Tích hợp FastCode CLI",
    status: "completed",
    date: "2026-02-28",
    summary:
      "FastCode đã có pipeline hoàn chỉnh: Tree-sitter AST → Graph Builder → BM25/Vector Index → LLM Iterative Retrieval → Answer Generator. Zvec không còn cần cho trí tuệ mã nguồn — chỉ phục vụ tài liệu/chat.",
    conclusions: [
      "gmind search-codebase là điểm vào duy nhất — FastCode là chi tiết nội bộ",
      "Zvec được đơn giản hoá: chỉ Tài liệu + Lịch sử Chat (không còn AST node hay đồ thị code)",
      "2 lệnh search tách biệt: gmind search (docs/Zvec) vs gmind search-codebase (code/FastCode)",
      "Quy tắc skill agent đơn giản hoá — một lệnh duy nhất thay pipeline thủ công",
    ],
    impact: "Loại bỏ độ phức tạp trí tuệ mã nguồn của Zvec, tách biệt rõ ràng",
    link: "docs/researches/spikes/spike-fastcode-cli-integration.md",
  },
  {
    id: "spike-knowledge-graph",
    type: "spike",
    title: "Động cơ Knowledge Graph Beads",
    status: "completed",
    date: "2026-03-01",
    summary:
      "Beads ID là Nút Đồ thị Phổ quát — không chỉ là ID task. Mọi thực thể (PRD, Kế hoạch, Task, Commit, Chat, Ghi chú cuộc họp, Tệp code, PR, CI Run) liên kết qua Beads ID. gmind xây đồ thị tại thời điểm truy vấn từ 5+ nguồn dữ liệu, không lưu trùng lặp.",
    conclusions: [
      "gmind = Động cơ Truy vấn Đồ thị — duyệt song song FrankenSQLite, Git, Zvec, GitHub, YAML",
      "12+ loại cạnh tự phát hiện: satisfies, implements, committed-for, discussed-in, approved-by, code-touches, v.v.",
      "Zvec mở rộng thành Bộ Lập chỉ mục Dữ liệu Phi cấu trúc Phổ quát — index git commits, PRs, CI logs, ghi chú cuộc họp",
      "gmind trace = tính năng sát thủ — toàn bộ ngữ cảnh qua một lệnh duy nhất",
    ],
    impact: "Định nghĩa động cơ trí tuệ cốt lõi của nền tảng",
    link: "docs/researches/spikes/spike-beads-knowledge-graph.md",
  },
  {
    id: "spike-github",
    type: "spike",
    title: "Tích hợp Hệ sinh thái GitHub",
    status: "completed",
    date: "2026-02-28",
    summary:
      "Nghiên cứu sâu 3 phiên: GitHub Autolinks, Quy ước Commit (Git Trailers), tích hợp CI/CD, giới hạn API, chiến lược đồng bộ. Quyết định cuối: ưu tiên cục bộ dùng git + gh CLI — không dùng thư viện Go API, không webhooks.",
    conclusions: [
      "git + gh CLI thay thế thư viện Go API — không phụ thuộc bên ngoài",
      "Đồng bộ 3 tầng: Git cục bộ (90% trường hợp) → Theo sự kiện (CI đẩy) → Polling theo lịch (15-30 phút)",
      "Dữ liệu GitHub là ngữ cảnh ngữ nghĩa → thuộc về Zvec, không phải bảng SQL",
      "Chỉ thêm 3 cột vào bảng issues (URL PR mới nhất, trạng thái CI, run ID)",
      "ETag conditional requests ngăn vấn đề rate limit (2400/2500 trả về 304)",
    ],
    impact: "Đơn giản hoá tích hợp — bảo toàn kiến trúc ưu tiên cục bộ",
    link: "docs/researches/spikes/spike-github-integration.md",
  },
  {
    id: "spike-monorepo",
    type: "spike",
    title: "Monorepo Đa ngôn ngữ & Hệ thống Thiết kế",
    status: "completed",
    date: "2026-03-01",
    summary:
      "Gmind là Monorepo Đa ngôn ngữ (Go, Rust, TypeScript). Sử dụng Language-Native Workspaces (go.work, Cargo.toml, pnpm) + Turborepo làm Bộ điều phối Gốc. Design System chia sẻ qua packages/design-system/.",
    conclusions: [
      "Turborepo + pnpm là bộ điều phối gốc — không dùng Bazel (quá nặng cho agent)",
      "Thư mục Go/Rust có package.json tối thiểu để Turborepo ủy quyền script",
      "PRDs phân vùng tên dưới /docs/PRDs/{subsystem}/ — SSOT tại gốc",
      "4 trụ cột trình diễn: Trí tuệ Mã nguồn, Theo dõi SSOT, Xác minh SAFe 6.0, Hệ sinh thái Agent",
    ],
    impact: "Bản thiết kế cho cấu trúc repo và công cụ build",
    link: "docs/researches/spikes/spike-polyglot-monorepo-design.md",
  },
  {
    id: "spike-beads-id-docs",
    type: "spike",
    title: "Beads ID trong Tài liệu (Cấp phần)",
    status: "completed",
    date: "2026-03-01",
    summary:
      "Mở rộng Beads ID từ cấp task lên cấp phần tài liệu. Mục PRD, phần tử Kế hoạch được gán ID duy nhất qua YAML front matter. Cho phép RTM 3 lớp: Mục PRD ↔ Phần tử Kế hoạch ↔ Task.",
    conclusions: [
      "YAML front matter với beads-id mỗi phần: định dạng br-prdNN-sM",
      "Hai loại liên kết mới: satisfies (Kế hoạch→PRD) và implements (Task→Kế hoạch)",
      "Giai đoạn 1: dùng tag tạm (--tag='implements:br-plan-01')",
      "Giai đoạn 2: loại liên kết native trong beads_rust",
    ],
    impact: "Cho phép trực quan hoá Ma trận Truy vết Yêu cầu (RTM)",
    link: "docs/researches/spikes/spike-beads-id-in-docs.md",
  },
  {
    id: "spike-500-perf",
    type: "spike",
    title: "500 Vấn Đề Hiệu Suất Phát Triển Phần Mềm",
    status: "completed",
    date: "2026-03-01",
    summary:
      "Tổng hợp 500 vấn đề cụ thể từ nghiên cứu học thuật, phân loại theo 10 nhóm chủ đề chính (Quản lý Tri thức, Nợ Kỹ thuật, Lãnh đạo, Quy trình, Bảo mật, v.v.) để xây dựng framework đánh giá hiệu suất tổ chức phát triển phần mềm.",
    conclusions: [
      "500 vấn đề phân loại 10 nhóm: KM, Technical Debt, Leadership, Process, Security...",
      "Nguồn: NotebookLM Notebook tổng hợp từ academic papers về SE Management",
      "Framework đánh giá: mỗi vấn đề ánh xạ sang giải pháp của Gmind Platform",
      "Cơ sở cho Issue Satisfaction Matrix — đo coverage giải pháp",
    ],
    impact: "Danh mục đầy đủ vấn đề thực tiễn làm nền tảng cho Satisfaction Matrix",
    link: "docs/researches/spikes/spike-500-performance-issues.md",
  },
  {
    id: "spike-agile-workflows",
    type: "spike",
    title: "Đề xuất 20+ AI Workflows dựa trên Agile",
    status: "completed",
    date: "2026-03-05",
    summary:
      "Đề xuất 25 AI Workflows chuyên biệt phủ sóng 8+1 phương pháp Agile (Scrum, Kanban/Lean, XP, AUP/DAD, DSDM, FDD, TDD, RAD, SAFe 6.0). Mỗi workflow có prompt template riêng, từ Scrum Daily Standup Synthesis đến RAD UI Prototype Sketcher.",
    conclusions: [
      "25 workflow đề xuất cho 9 phương pháp Agile — mỗi phương pháp 2-4 workflow",
      "Top 5 ưu tiên: xp-continuous-refactoring, tdd-test-cases-bootstrap, rad-ui-prototype, scrum-story-slicer, fdd-domain-model",
      "Workflow JSON nằm tại apps/website/src/data/workflows/, đăng ký trong workflow-prompts.ts",
      "Chờ Human review để chọn lọc workflows có tính thực tiễn cao",
    ],
    impact: "Mở rộng hệ sinh thái AI Workflow từ 5 lên 25+ workflow chuyên biệt",
    link: "docs/researches/spikes/spike-agile-ai-workflows-proposal.md",
  },
  {
    id: "spike-docs-safe",
    type: "spike",
    title: "Document Lifecycle trong SAFe 6.0",
    status: "completed",
    date: "2026-02-28",
    summary:
      "Vòng đời tài liệu trong SAFe 6.0 Agentic: lên kế hoạch → viết → phê duyệt → tham chiếu → tạo PRDs → decompose thành Beads tasks. Source of truth = filesystem (git-tracked docs/), Zvec chỉ dùng cho semantic search.",
    conclusions: [
      "Zvec CHỈ dùng cho semantic search — KHÔNG phải nơi lưu trữ tài liệu",
      "Source of truth cho docs = filesystem (docs/ folder), tracked bởi git",
      "PM Web cần API endpoints để view/search/render docs từ filesystem",
      "Docs Journey: Draft → Review → Approved → Referenced → Decomposed",
    ],
    impact: "Xác định rõ vai trò Zvec vs filesystem cho quản lý tài liệu",
    link: "docs/researches/spikes/spike-docs-in-SAFe.md",
  },
  {
    id: "spike-roles-safe",
    type: "spike",
    title: "Vai trò trong SAFe 6.0 Framework",
    status: "completed",
    date: "2026-02-28",
    summary:
      "SAFe 6.0 tổ chức roles theo 4 tầng (Portfolio → Solution Train → ART → Team). Trong bối cảnh Agentic Software House (2 Human + 18 AI Agents), roles phân chia rõ: Human giữ quyền phê duyệt, Agent thực thi.",
    conclusions: [
      "4 tầng roles: Portfolio (Strategy), Solution Train (Coordination), ART (Delivery), Team (Execution)",
      "Human roles: Epic Owner, LPM, RTE — giữ quyền approve tại decision points",
      "Agent roles: Dev Agent, QA Agent, Architect Agent — thực thi theo skill rules",
      "RTE Agent điều phối cross-team dependencies và escalation workflow",
    ],
    impact: "Bản đồ vai trò cho Agentic Software House — ai làm gì, ai approve gì",
    link: "docs/researches/spikes/spike-roles-in-SAFe.md",
  },
  {
    id: "spike-rte-approval",
    type: "spike",
    title: "RTE Approval Workflow",
    status: "completed",
    date: "2026-03-02",
    summary:
      "Khi Dev SubAgent phát hiện rủi ro → kích hoạt buổi thảo luận với RTE Team → RTE phê duyệt phương án → nội dung phê duyệt trở thành execution context. Toàn bộ quy trình lưu với Beads ID, trở thành nodes trong Knowledge Graph.",
    conclusions: [
      "Trigger: Dev SubAgent phát hiện rủi ro → tạo discussion request với Beads ID",
      "MCP Agent Mail là cơ chế giao tiếp giữa Dev SubAgent và RTE Team",
      "Approval context trở thành node trong Knowledge Graph — truy vết được",
      "3 mức độ phê duyệt: Auto (low risk), RTE Review (medium), Human Escalation (high)",
    ],
    impact: "Định nghĩa workflow phê duyệt cho hệ thống multi-agent",
    link: "docs/researches/spikes/spike-rte-approval-workflow.md",
  },
  {
    id: "spike-plan-format",
    type: "spike",
    title: "Chuẩn hoá Format Plan Document",
    status: "completed",
    date: "2026-03-02",
    summary:
      "So sánh 3 phương án format cho Plan documents: (A) Structured Markdown + YAML markers, (B) Pure Beads Issues, (C) Hybrid. Quyết định: Phương án C (Hybrid) — MD file là human-readable, Beads Issues cho machine tracking.",
    conclusions: [
      "Phương án C (Hybrid) thắng: MD cho human, Beads cho machine — best of both worlds",
      "Plan MD file có YAML markers liên kết satisfies → PRD sections",
      "Beads Issues mirror MD sections — tự động sync khi parse",
      "Graph Assembler parse MD file để xây liên kết Plan ↔ PRD ↔ Task",
    ],
    impact: "Chuẩn hoá format cho mọi Plan document trong dự án",
    link: "docs/researches/spikes/spike-plan-document-format.md",
  },
  {
    id: "spike-satisfaction",
    type: "spike",
    title: "Issue Satisfaction Matrix",
    status: "completed",
    date: "2026-03-03",
    summary:
      "Ma trận đối chiếu 500 vấn đề hiệu suất với mức độ giải quyết (%) của mỗi PRD và Spike. Cho phép đo coverage: vấn đề nào đã được giải quyết bao nhiêu phần trăm bởi tài liệu/giải pháp nào.",
    conclusions: [
      "Matrix 500 hàng × 15 cột — mapping issue → PRD/Spike với % coverage",
      "Mỗi ô chứa % satisfaction và link trực tiếp đến dòng cụ thể trong tài liệu",
      "Top coverage: spike-beads-knowledge-graph (nhiều issue 100%), PRD-01-Overview (broad coverage)",
      "Gap analysis: nhiều issue chưa có giải pháp → input cho PRD tiếp theo",
    ],
    impact: "Công cụ đo lường coverage của giải pháp Gmind đối với 500 vấn đề thực tiễn",
    link: "docs/researches/spikes/spike-issue-satisfaction-matrix.md",
  },
  {
    id: "spike-webui-rtm",
    type: "spike",
    title: "Web UI RTM Dashboard",
    status: "completed",
    date: "2026-03-02",
    summary:
      "Wireframe chi tiết cho RTM Dashboard: 4 panel (Coverage Heatmap, Task Progress, Interactive Knowledge Graph, Gap Analysis). Tech stack: Go server (gmind serve) + Vanilla JS + D3.js, embed vào single binary qua embed.FS.",
    conclusions: [
      "4-panel dashboard: Coverage Heatmap, Task Progress, Interactive Graph, Gap Analysis",
      "gmind serve: Go HTTP server, REST API wrapper quanh gmind CLI commands",
      "D3.js force-directed graph cho Knowledge Graph visualization",
      "Dark theme, premium design — single binary distribution qua embed.FS",
    ],
    impact: "Wireframe chi tiết cho giao diện quản lý RTM — sẵn sàng implement",
    link: "docs/researches/spikes/spike-webui-rtm-dashboard.md",
  },

  // ═══ Spike Đang chờ ═══
  {
    id: "spike-graph-performance",
    type: "spike",
    title: "Hiệu năng Graph Assembler",
    status: "pending",
    date: "2026-03-01",
    summary:
      "Đo hiệu năng xây đồ thị tại thời điểm truy vấn với 1000+ Beads ID. Xác định có cần tầng cache cho Graph Assembler không.",
    conclusions: [
      "Đang chờ — cần triển khai Graph Assembler cốt lõi trước",
    ],
    impact: "Sẽ xác định chiến lược cache cho gmind trace",
    link: "docs/researches/spikes/spike-graph-assembler-performance.md",
  },
  {
    id: "spike-zvec-indexer",
    type: "spike",
    title: "Pipeline Lập chỉ mục Zvec",
    status: "pending",
    date: "2026-03-01",
    summary:
      "Chi tiết cách lập chỉ mục git commits, mô tả PR, CI logs vào Zvec — kích thước chunk, schema metadata, tự phát hiện Beads ID trong mỗi chunk.",
    conclusions: [
      "Đang chờ — phụ thuộc tích hợp Zvec với gmind",
    ],
    impact: "Định nghĩa pipeline Bộ Lập chỉ mục Dữ liệu Phi cấu trúc Phổ quát",
    link: "docs/researches/spikes/spike-zvec-indexer-pipeline.md",
  },
];
