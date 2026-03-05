---
beads-id: br-prd05
title: "PRD 05: Hướng dẫn Triển khai GSAFe 6.0 & Gmind Workflow"
sections:
  - anchor: "1-tong-quan-gsafe-workflow"
    title: "Tổng quan Quy trình GSAFe 6.0 trên Gmind"
    beads-id: br-prd05-s1
  - anchor: "2-luong-trien-khai-tieu-chuan"
    title: "Luồng Triển khai GSAFe Tiêu chuẩn"
    beads-id: br-prd05-s2
  - anchor: "3-agent-handoff-va-xac-minh"
    title: "Agent Handoff và Lớp Xác minh CI/CD"
    beads-id: br-prd05-s3
---

# PRD 05: Hướng dẫn Triển khai GSAFe 6.0 & Gmind Workflow

<!-- beads-id: br-prd05 -->

_Tài liệu này mang tính lưỡng dụng: Vừa là Hướng dẫn từng bước (Step-by-step Guide) cho người dùng/Agents, vừa là Đặc tả Yêu cầu (PRD) định hướng cho việc phát triển các tính năng hỗ trợ quy trình GSAFe 6.0 trên nền tảng Gmind._

---

## 1. Tổng quan Quy trình GSAFe 6.0 trên Gmind

<!-- beads-id: br-prd05-s1 -->

Quy trình GSAFe (Gmind Scaled Agile Framework for enterprise) là một biến thể tối ưu cho **Agentic Software Engineering** của SAFe 6.0. Nó kết hợp sự giám sát chặt chẽ của con người (Human-in-the-Loop) tại các cổng chuyển giao, cùng khả năng thực thi song song của bầy đàn AI (Agent Swarms) nhờ cơ chế Universal Tracking (Beads ID).

Quy trình này dựa trên 4 nguyên tắc lõi:

1. **Continuous Exploration (CE) qua Spikes:** Mọi nghiên cứu đều được ghi nhận (Activity B).
2. **Requirements Traceability Matrix (RTM):** Truy vết 3 tầng từ PRD (Yêu cầu) → Plan (Thiết kế) → Task (Thực thi) → Code Commit.
3. **Four-Eyes Verification:** Thực thi và Duyệt code phải do 2 Agent khác nhau (hoặc Human) thực hiện.
4. **Local-first SSOT:** FrankentSQLite đóng vai trò Single Source of Truth; RTM Dashboard là công cụ quản trị tổng quát trực quan.

---

## 2. Luồng Triển khai GSAFe Tiêu chuẩn (Step-by-Step)

<!-- beads-id: br-prd05-s2 -->

Luồng công việc sau mô phỏng quá trình từ khi khởi tạo một ý tưởng tới khi hoàn chỉnh việc lập trình và triển khai. Cấu trúc thực thi được mô tả dưới dạng Flow/Worktree như sau:

```text
[Start: Khởi tạo & Cài đặt]
  │
  ├──► Step 1: Chuẩn bị Môi trường Máy chủ (Platform Init)
  │    ├─ Create repo / clone Gmind workspace.
  │    ├─ Cài đặt các công cụ CLI lõi: `gmind`, `gsafe`, `fastcode`.
  │    └─ Chạy RTM Service (`gmind serve`) để mở Web RTM Board quản trị dự án.
  │
  ├──► Step 2: Khởi tạo Dự án Cụ thể (Project Init)
  │    └─ Gọi lệnh: `/init-gsafe-workflow`
  │       (Tự động setup cấu trúc thư mục, tạo file PRD mặc định, Plan mẫu).
  │
[Phase: Continuous Exploration (CE)]
  │
  ├──► Step 3: Nghiên cứu Kiến trúc & Yêu cầu (Research Spikes)
  │    ├─ Gọi lệnh: `/gsafe-research`
  │    ├─ Agent tạo các file `spike-*.md` lưu tại `docs/researches/spikes/`.
  │    └─ Tổng hợp (Synthesize) findings từ Spikes vào file PRD chính thức.
  │
  ├──► Step 4: Định danh Yêu cầu Điện toán (Universal Tracking)
  │    ├─ Cập nhật file PRD (ví dụ: `PRD-01-Storage.md`).
  │    └─ Gắn Inline Beads ID (`<!-- beads-id: br-prdXX-sY -->`) cho từng section.
  │       (Sử dụng workflow: `/arch-review-docs-add-beads`).
  │
  ├──► Step 5: Lập Kế hoạch & Rã việc (Plan & Decompose)
  │    ├─ Tạo file Plan (`docs/plans/plan-XX.md`) dựa trên PRD.
  │    ├─ Gán Element ID (`br-plan-XX`) và trỏ ngược về PRD (`satisfies: br-...`).
  │    └─ Lập trình viên/Agent gọi `bd create` để tạo Task thực thi.
  │       (Task trỏ về Plan qua `implements: br-plan-XX`).
  │
[Phase: Continuous Integration / Execution]
  │
  ├─►[ VÒNG LẶP ITERATION START ]
  │  │
  │  ├──► Step 6a: (Optional) Vòng lặp UI/UX Design System & Rà soát PRD (PRD <-> DS Feedback Loop)
  │  │    ├─ Nếu dự án có UI: Gọi lệnh `/create-gsafe-design-system` để tạo HTML mockup theo PRD.
  │  │    ├─ Gọi lệnh `/arch-review-prd-after-design-system` để đối chiếu State Matrix Coverage.
  │  │    ├─ Sinh Báo cáo Bàn giao (Handover Report) chỉ ra các khoảng trống giao diện (Gaps).
  │  │    └─ Hoàn thiện ngược lại PRD nếu phát hiện thiếu logic phụ trợ cho UI. (Feedback Loop).
  │  │
  │  ├──► Step 6b: Thực thi Mã nguồn & File Locking (Code Execution)
  │  │    ├─ Code Agent nhận task lấy context qua `gmind context <id>`.
  │  │    ├─ Khóa file làm việc qua MCP (`mcp_agent_mail file_reservation`).
  │  │    └─ Hoàn thiện mã nguồn theo Plan.
  │  │
  │  ├──► Step 7: Push & CI/CD Verification Gate
  │  │    ├─ Cập nhật Handover Report chuẩn bị kết thúc Iteration.
  │  │    ├─ Commit code (sau khi gom nhóm tasks theo rule).
  │  │    ├─ CI/CD test tự động (`golangci-lint`, `go test`).
  │  │    └─ LEVEL 3 APPROVAL GATE: Reviewer Agent hoặc Human phê duyệt.
  │  │
  │  └──◄ (Loop back if Fail/Rejected or Next Iteration)
  │
  └──► [ EXIT ITERATION: Merge & Đóng Task ]
```

---

## 3. Agent Handoff và Lớp Xác minh CI/CD

<!-- beads-id: br-prd05-s3 -->

Khi triển khai các quy trình trên bằng AI, các Agent sẽ bàn giao (handoff) trách nhiệm theo từng bước của Pipeline:

1. **PMO Agent:** Thực thi từ Step 2 đến Step 4 (Tạo repo, nghiên cứu Spikes, cập nhật PRD, gán ID).
2. **Scrum Master / Architect Agent:** Thực thi Step 5 (Tạo Plan, phân quyền, Decompose ra task List `bd-create`).
3. **Dev Agents:** Nhận task từ Step 6, lấy code context từ thư viện (sử dụng lệnh `gmind search-codebase`), implement tính năng.
4. **QA / Reviewer Agent:** Trấn giữ Step 7. Kiểm soát chất lượng tự động, kích hoạt luồng Escalation (nếu lỗi quá 3 lần sẽ gọi Human-in-the-loop để fix).

> **Note cho việc phát triển webui:** Để quản trị toàn bộ chu trình Worktree này, tính năng `RTM Dashboard` tại Gmind Web UI cung cấp góc nhìn Tree View trực quan nối trực tiếp từ Code Commit của Step 7 ngược về PRD Section của Step 4 dựa trên các Graph Metadata lấy từ FrankenSQLite.
