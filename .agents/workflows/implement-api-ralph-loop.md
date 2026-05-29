---
description: GSAFe API Ralph Loop workflow for implementing Go HTTP endpoints using a 3-subagent swarm (Planner, Dev, QA)
---

# /implement-api-ralph-loop — API Ralph Loop Workflow

<!-- beads-id: br-workflow-implement-api-ralph-loop -->

> **GSAFe Phase 3: Continuous Integration & Implementation**
> Mục đích: Triển khai API (Go HTTP/REST Endpoint) cho các giao diện WebUI thông qua quy trình 3 subagents (Planner, Dev, QA) nhằm đảm bảo sự nhất quán từ PRD đến code thực tế.
> Tham chiếu: [PRD-04: WebUI & PM Workspace](./docs/PRDs/core-gmind/PRD-04-WebUI-and-PM-Workspace.md) | [PRD-05: GSafe Workflow](./docs/PRDs/core-gmind/PRD-05-GSafe-Workflow-and-Implementation.md)

---

## 📌 Khi nào dùng workflow này

- Khi cần phát triển các API endpoints mới cho `gmind serve` mà WebUI (showcase hoặc core) yêu cầu.
- Khi cần chỉnh sửa cấu trúc dữ liệu SQLite (FrankenSQLite columns) hoặc thay đổi database query logic.
- Khi muốn tự động hóa luồng code-test-review cho backend Go bằng Swarm AI 3 thành viên: **Planner**, **Dev**, và **QA**.

---

## 🤖 Swarm AI: 3 Subagents Structure

Quy trình triển khai API áp dụng nguyên tắc **Four-Eyes Verification** (Thực thi và Kiểm tra độc lập) bằng cách chia nhiệm vụ cho 3 subagents:

1. **Planner Agent (Thiết kế & Hợp đồng API):**
   - Thiết kế Endpoint, Payload request/response JSON.
   - Định nghĩa tương tác dữ liệu (SQLite columns, Git, FastCode).
   - Output: `docs/design/contracts/api-{feature_name}/api-contract.md`.
2. **Dev Agent (Viết mã nguồn):**
   - Triển khai Go handlers, routers, database queries, migration.
   - Tuân thủ quy tắc: File code không vượt quá 400 lines (split file nếu cần).
   - Output: `.go` codebase files.
3. **QA Agent (Kiểm soát chất lượng):**
   - Viết các test case tự động (`go test`).
   - Chạy kiểm tra tĩnh (`golangci-lint`) và kiểm tra tích hợp thực tế.
   - Output: Test results & Quality assurance report.

---

## 🛠 Các bước thực hiện (Step-by-Step)

### Step 1: Khởi tạo & Đọc bối cảnh (Init & Context Discovery)

<!-- beads-id: br-workflow-api-ralph-init -->

1. Xác định Feature cần làm API và PRD liên quan (ví dụ: `webui-and-pm-workspace`).
2. Khởi tạo cấu trúc lưu trữ:
   - Thư mục hợp đồng: `docs/design/contracts/api-{feature_name}/`
   - Thư mục state: `docs/design/pipeline-state/api-{feature_name}/`
3. Đọc dữ liệu PRD liên quan để tìm các endpoint mong muốn và database schema requirements.

---

### Step 2: Thiết kế API Contract (Planner Subagent)

<!-- beads-id: br-workflow-api-ralph-plan -->

**Planner** đảm nhận thiết kế hợp đồng API để thống nhất giữa Frontend và Backend:

1. Tạo file hợp đồng `docs/design/contracts/api-{feature_name}/api-contract.md`.
2. Định dạng file `api-contract.md` bao gồm:
   - **Metadata:** Feature name, Beads ID liên quan.
   - **Endpoints List:** Danh sách HTTP Method, Path, Params, Request Body, Response JSON Schema.
   - **Database mappings:** Các bảng & cột FrankenSQLite liên quan (kể cả first-class PM columns mới).
   - **Traceability:** Gắn `satisfies: br-prdXX-sY` để đối chiếu với PRD.

*Planner checklist:*
- [ ] Endpoint định hình rõ ràng dạng REST.
- [ ] Response format sử dụng JSON chuẩn.
- [ ] Mapped đầy đủ SQLite columns cần thiết.

---

### Step 3: Triển khai Mã nguồn (Dev Subagent)

<!-- beads-id: br-workflow-api-ralph-dev -->

**Dev** nhận API Contract đã thống nhất và tiến hành code trên Go codebase:

1. Nhận context qua file `api-contract.md`.
2. Khóa file làm việc nếu cần để tránh xung đột.
3. Viết mã nguồn Go:
   - Khai báo routes trong HTTP server (`net/http` hoặc `chi` router của `gmind serve`).
   - Triển khai handlers và SQLite query logic.
   - Cập nhật database migration nếu có thêm first-class columns mới.
4. **Quy tắc quan trọng:** Bất kỳ file `.go` nào tạo mới hoặc sửa đổi đều phải giữ dung lượng dưới **400 dòng**. Nếu logic dài hơn, hãy chia nhỏ thành các file module riêng biệt.

---

### Step 4: Kiểm thử & Phê duyệt (QA Subagent)

<!-- beads-id: br-workflow-api-ralph-qa -->

**QA** độc lập kiểm tra kết quả từ Dev để bảo vệ chất lượng hệ thống trước khi tích hợp:

1. Tạo file test Go (ví dụ: `handler_test.go`).
2. Thực thi kiểm thử tự động:
   ```bash
   go test -v ./cli/gmind/cmd/...
   ```
3. Chạy linter kiểm tra chuẩn code:
   ```bash
   golangci-lint run
   ```
4. Xác minh rằng dữ liệu trả về thực sự khớp 100% với định dạng JSON quy định trong `api-contract.md`.

---

### Step 5: Đóng Task & Handoff (Version Control)

<!-- beads-id: br-workflow-api-ralph-commit -->

Khi QA xác nhận vượt qua toàn bộ chất lượng:

1. Trình bày báo cáo kết quả (evidence) cho Human.
2. Commit code tuân thủ định dạng commit của dự án:
   ```text
   feat(api): implement api endpoints for <feature>

   Detailed description of routes implemented.

   Beads-ID: br-plan-xxx, bd-xxx
   ```
3. Đóng Beads task liên quan.
