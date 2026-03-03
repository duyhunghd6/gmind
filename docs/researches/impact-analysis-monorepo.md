# Phân tích Tác động (Impact Analysis): Chuyển đổi Monorepo & Design System

Dựa trên đề xuất cấu trúc mới (Namespaced PRDs & Polyglot Monorepo Workspace), dưới đây là chi tiết những hạng mục chúng ta **BẮT BUỘC phải thay đổi** để hệ thống không bị "gãy" (broken links, AI agent hiểu sai):

## 1. Di dời File & Thư mục Vật lý (Physical Migration)

**A. Storage hệ thống Code:**

- Cần di chuyển mã nguồn Go/Rust hiện tại (nếu đang để ở root hoặc rải rác) vào đúng vị trí: `cli/gmind`, `cli/beads_rust`, `packages/fastcode`.
- Khởi tạo Node project tại `packages/design-system/` (nơi chứa code thật của UI, e.g. Tailwind tokens, React components).

**B. Storage hệ thống PRDs:**

- Di chuyển 3 file PRD lõi hiện tại:
  `docs/PRDs/core-gmind/PRD-01-Overview.md`
  `docs/PRDs/core-gmind/PRD-02-Storage.md`
  `docs/PRDs/core-gmind/PRD-03-CLI-and-Workflow.md`
  👉 **Chuyển vào `docs/PRDs/core-gmind/`** (bởi vì nội dung của 3 file này thuần túy nói về CLI, DB, và Backend workflows).
- Tạo các thư mục rỗng cho dự án Web tương lai: `docs/PRDs/apps-website/` và `docs/PRDs/apps-webui/`.

## 2. Cập nhật Agent Workflows (Rất quan trọng)

AI Agents lấy rule hoạt động từ thư mục `.agents/workflows/`. Nếu không sửa, các agent sẽ tự động tạo PRD mới vứt lung tung ở root `/PRDs/`.

- **Cần sửa file `.agents/workflows/gsafe-research.md`:**
  Tại phần "Activity D: Synthesize", cập nhật lại cây thư mục mẫu và thêm prompt ép buộc Agent phải hỏi Human xem PRD này thuộc Subsystem nào trước khi tạo file vật lý.

## 3. Tìm & Thay thế Broken Links (Cross-references)

Mọi liên kết cứng (hyperlinks) trong các file markdown cũ trỏ về PRD sẽ bị hỏng.

- **Các file bị ảnh hưởng đã quét được:**
  - `docs/researches/beads_rust - For simple architect.md` (chứa link tới trực tiếp `.../docs/PRDs/core-gmind/PRD-02-Storage.md`)
  - `docs/researches/spikes/spike-issue-satisfaction-matrix.md` (chứa rất nhiều ma trận đánh giá trỏ link về dòng cụ thể của PRD-01, PRD-02).
  - Cây thư mục mẫu trong `docs/researches/spikes/spike-docs-in-SAFe.md`.
- **Giải pháp:** Cần chạy một tập lệnh (Python/Sed) để tự động Find & Replace chuỗi `docs/PRDs/core-gmind/PRD-` thành `docs/PRDs/core-gmind/PRD-` trên toàn bộ thư mục `docs/`.

## 4. Thiết lập Tooling Khởi tạo (Root Orchestrator Configuration)

Để Turborepo và Go/Rust làm việc được hòa bình với nhau trong nhánh Master:

1. **Tạo `go.work` ở root:** Khai báo `use ( ./cli/gmind ./cli/beads_rust )`.
2. **Tạo `pnpm-workspace.yaml` ở root:** Khai báo quản lý thư mục `apps/*` và `packages/*`.
3. **Tạo `turbo.json` ở root:** Định nghĩa caching rules cho các lệnh `build`, `test`, `lint`.
4. **Tạo `package.json` dummy:** Tại mỗi folder của Go/Rust (`cli/gmind/package.json`), định nghĩa `"scripts": { "build": "go build ..." }` để Turborepo có thể wrap lại và tối ưu hóa tác vụ.

---

**Tóm lại:** Nếu anh nhấn nút "Duyệt" (Level 3 Approval) cho kiến trúc này, task tiếp theo chúng ta cần làm là **"Thực thi Migration"** (bao gồm chạy tools đổi tên file PRD, sửa gsafe-research workflow, **cập nhật skill agenticse-design-system**, và tạo file setup Turborepo). Anh xác nhận để em tiến hành nhé?
