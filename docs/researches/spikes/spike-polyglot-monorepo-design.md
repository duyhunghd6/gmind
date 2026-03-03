# Spike: Polyglot Monorepo & Design System Architecture

**Beads ID:** bd-polyglot-monorepo (spike task)
**Tác giả:** Architect Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

Gmind là một dự án **Polyglot Monorepo** đích thực, cho phép quản lý đồng bộ nhiều subsystems trong một repository duy nhất: các thành phần lõi CLI (`gmind-CLI`, `beads_rust`), các ứng dụng Web (`gmind-webui`, `website-showcase`), cũng như các tools phụ trợ.
Đồng thời, cần có một chiến lược quy hoạch **Design System** bài bản để tái sử dụng giao diện giữa các Web Projects, và một công cụ **Root Orchestrator** phù hợp để tránh việc overkill như Bazel nhưng vẫn đảm bảo trải nghiệm CI/CD tuyệt vời.

## Research Sessions

### Session 1: Phân tích các "Tinh tuý" cần Showcase

Website showcase (`gmind.gscfin.com` trên Vercel) sẽ là nơi trình diễn 4 trụ cột cốt lõi của Gmind:

1. **FastCode Code Intelligence:** Kiến trúc AST + Graph RAG, giải quyết bệnh "mất trí nhớ cục bộ" của tác nhân AI (khác biệt so với RAG truyền thống).
2. **SSOT Issue Tracking (FrankenSQLite):** Local-first database, JSONL git-friendly sync, commit lineage qua `Beads-ID:` trailer.
3. **Verification & SAFe 6.0:** Level 3 Approval Gates, liên kết RTM: `PRD ↔ Plan ↔ Task ↔ Commit`.
4. **Agent Ecosystem Orchestration:** 5 Layers architecture, Agent Skills Factory, File locking Lease Timeout (`mcp_agent_mail`).

### Session 2: Polyglot Tooling (Điều phối đa ngôn ngữ)

Việc ép buộc Gmind (Go, Rust, TS) vào một framework như Bazel là quá cồng kềnh cho Agent. Giải pháp đề xuất là **Language-Native Workspaces + Root Orchestrator**:

- **Workspaces Bản địa:** `go.work` cho Go, `Cargo.toml [workspace]` cho Rust, `pnpm-workspace.yaml` cho Node/TS.
- **Root Orchestrator:** Dùng **Turborepo** kết hợp với pnpm.
  - Tại mỗi thư mục Go và Rust (ví dụ `cli/gmind`), đặt một `package.json` siêu nhỏ định nghĩa các scripts: `"build": "go build ...", "test": "go test ..."`.
  - Từ root, Agent/Dev/CI chỉ cài gọi lệnh `pnpm run build` hoặc `pnpm test`, Turborepo sẽ gọi song song và cache toàn bộ kết quả dựa trên fingerprint của code. Cực kỳ tối ưu và dễ dùng cho AI.

### Session 3: Cấu trúc Monorepo & Design System

Để hỗ trợ việc tích hợp nhiều UI projects, **Design System** cần được lưu trữ ở cấp độ package chia sẻ. Các tài liệu quy chuẩn thiết kế (docs) vẫn nằm trong `docs/design`.

**Sơ đồ cấu trúc vật lý đề xuất:**

```text
/gmind
├── apps/
│   ├── website/             # Next.js website showcase (vercel: gmind.gscfin.com)
│   └── webui/               # React Dashboard (PM Tool) quản lý RTM, SAFe view
├── cli/
│   ├── gmind/               # Core Go API Gateway & Context CLI
│   ├── beads_rust/          # Rust CLI Issue Tracker
│   └── mcp_mail/            # Coordination Agent Mail (Go)
├── packages/
│   ├── design-system/       # Component Library / Design Tokens dùng chung cho các apps/
│   ├── fastcode/            # Internal dependency cho Code Intelligence (AST engine - Rust)
│   └── core-types/          # Shared TS/Go DTOs
├── .agents/
│   ├── skills/              # Agent skills
│   └── workflows/           # Agent workflows
└── docs/                    # (SSOT) Kiến trúc, Researches, Spikes
    ├── PRDs/                # Lưu trữ phân rã theo Subsystems để tránh nhầm lẫn
    │   ├── core-gmind/      # PRDs cho gmind CLI, fastcode, mcp_mail
    │   ├── apps-website/    # PRDs cho gmind.gscfin.com showcase
    │   └── apps-webui/      # PRDs cho PM Dashboard
    └── design/              # Lưu trữ các file thiết kế, mockups, HTML Component Showcase

### Session 4: Chiến lược lưu trữ PRD (SSOT Naming Convention)

Khi dự án Monorepo phình to, việc phân tán PRDs về từng folder local (ví dụ `apps/website/docs/PRDs/`) sẽ phá vỡ tính tập trung của **Tầng Dữ Liệu Zvec**. Hệ thống `gmind context` và Zvec indexer cần một Single Source of Truth duy nhất tại `/docs`.

Do đó, **Chiến lược Namespacing tại root** là bắt buộc:
Tất cả PRD vẫn nằm tại `/docs/PRDs/` nhưng được gom nhóm theo thư mục vật lý tương ứng với Subsystem (ví dụ: `apps-website/`, `core-gmind/`). Điều này mang lại 2 lợi ích:
1. Orchestrator / PMO vào thư mục `/docs/PRDs` là nhìn thấy ngay toàn cảnh hệ thống.
2. AI Agent khi đọc PRD sẽ tự động nhận biết context "thuộc vòng ảnh hưởng của subsystem nào" thông qua đường dẫn thư mục, hạn chế hiểu lầm yêu cầu (ví dụ: yêu cầu thêm nút bấm của website bị nhầm sang thêm lệnh của CLI).

1. Triển khai cấu trúc Monorepo như quy hoạch, bắt đầu bằng việc khởi tạo các thư mục rỗng.
2. **Tooling:** Thiết lập `pnpm` và `Turborepo` làm trình điều phối từ thư mục root. Cấu hình `go.work` và `Cargo.toml`.
3. **Design System:** Xây dựng các components theo chuẩn UI tokens tại `packages/design-system/`, giúp project management website và gmind showcase website giao diện đồng nhất.
4. Xóa bỏ các spike cũ (`spike-gmind-monorepo-website.md`, `spike-polyglot-monorepo-architecture.md`) để hợp nhất về file design duy nhất này.

## Decision

- Pending Human Approval - Xác nhận cấu trúc cây thư mục cuối cùng và công cụ Turborepo.
```
