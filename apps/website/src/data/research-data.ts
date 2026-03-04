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
  // ═══ PRDs ═══
  {
    id: "prd-01",
    type: "prd",
    title: "PRD-01: Tổng quan & Kiến trúc 5 Lớp",
    status: "approved",
    date: "2026-02-28",
    summary:
      "Định nghĩa kiến trúc hệ thống đầy đủ với 5+1 lớp: Lưu trữ (FrankenSQLite + Zvec), Công cụ Cốt lõi (gmind CLI, beads_rust, FastCode), Thực thi (AI Agents), Xác minh (CI/CD Gates), API Gateway (Go REST), và Trình bày (Web UI).",
    conclusions: [
      "AI agent KHÔNG THỂ tự đóng task — phải qua Lớp Xác minh trước",
      "Web UI giao tiếp qua Go REST API (nhúng FrankenSQLite) — không truy cập DB trực tiếp",
      "FastCode thay thế Zvec cho Trí tuệ Mã nguồn — Zvec chỉ phục vụ tài liệu/chat",
      "Trực quan RTM: Mục PRD ↔ Kế hoạch ↔ Task ↔ Commit có truy vết đầy đủ",
    ],
    impact: "Bản thiết kế nền tảng cho mọi PRD và công việc triển khai khác",
    link: "docs/PRDs/core-gmind/PRD-01-Overview.md",
  },
  {
    id: "prd-02",
    type: "prd",
    title: "PRD-02: Lớp Lưu trữ & Theo dõi Phổ quát",
    status: "approved",
    date: "2026-03-01",
    summary:
      "Lưu trữ kết hợp: FrankenSQLite (trạng thái có cấu trúc, MVCC ghi đồng thời) + Zvec (tìm kiếm ngữ nghĩa cho tài liệu/chat). Theo dõi Phổ quát qua Beads-ID là khoá chính xuyên suốt mọi lớp. ID cấp phần cho truy vết PRD ↔ Kế hoạch ↔ Task.",
    conclusions: [
      "FrankenSQLite dùng cột SQL first-class (indexed, type-safe) — KHÔNG dùng JSON blob",
      "JSONL là SSOT đồng bộ qua git — FrankenSQLite là cache cục bộ (tái tạo được)",
      "Beads ID cấp phần: br-prdNN-sM cho mục PRD, br-plan-NN cho kế hoạch",
      "Chiến lược Dọn rác Lười: polling bảng events + garbage collection Zvec",
      "Dữ liệu GitHub lưu trong Zvec dạng tài liệu ngữ nghĩa — chỉ lưu PR/CI mới nhất trong FrankenSQLite",
    ],
    impact: "Định hướng thiết kế schema beads_rust và luồng truy vấn gmind context",
    link: "docs/PRDs/core-gmind/PRD-02-Storage.md",
  },
  {
    id: "prd-03",
    type: "prd",
    title: "PRD-03: gmind CLI & Quy trình Agent",
    status: "approved",
    date: "2026-03-01",
    summary:
      "gmind là Cổng API Ngữ cảnh duy nhất. Định nghĩa 8+ lệnh CLI: search, search-codebase, context, trace, coverage, impact, gaps, github. Áp dụng Nguyên tắc Bốn Mắt (Code Agent ≠ Reviewer Agent) và khoá tệp Lease Timeout.",
    conclusions: [
      "gmind search-codebase là điểm vào duy nhất cho Trí tuệ Mã nguồn (FastCode ẩn bên trong)",
      "Quy trình Agent: Phân loại → TimCode → NạpNgữCảnh → KhoáTệp → Code → XácMinh → Đóng",
      "Tag truy vết bắt buộc: --tag='implements:' và --tag='satisfies:' trên mọi task",
      "Beads-ID: Git Trailer trong mọi commit — không còn cú pháp #br-123",
    ],
    impact: "Định nghĩa chính xác quy tắc skill agent và bề mặt API CLI",
    link: "docs/PRDs/core-gmind/PRD-03-CLI-and-Workflow.md",
  },

  // ═══ Các Spike Chính ═══
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
