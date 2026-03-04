---
description: Hướng dẫn gán Universal Beads ID inline cho các file tài liệu Markdown (*.md)
---

# 📋 Workflow: Gán Universal Beads ID cho Tài liệu (Inline Markdown)

> **MỤC ĐÍCH:** Workflow này tự động được kích hoạt mỗi khi Agent có hành vi **Tạo mới / Chỉnh sửa / Xóa** các file tài liệu Markdown (`.md`) trong repo (PRD, Plan, Research, Spike...).

Khi bạn (LLM Agent) làm việc với các file tài liệu, bạn **BẮT BUỘC** phải gắn các định danh `beads-id` trực tiếp vào nội dung file bằng cú pháp HTML comment (Inline Markdown). Chúng ta sử dụng cách này thay vì YAML Front Matter để tiện lợi cho việc quản lý ở cấp độ dòng (line-level) và đoạn (section-level).

---

## 📌 Khai báo Inline Beads ID như thế nào?

Chúng ta lưu Beads ID dưới dạng **HTML Comments** ngay bên dưới các Heading (Tiêu đề) để quá trình phân tích (AST/Markdown parser) dễ dàng đọc được mà không làm rác quá trình đọc của con người.

### 1. Dành cho file PRD (Requirements)

Khi tạo mới hoặc tách một Section trong PRD, ngay dưới heading `##`, hãy chèn `beads-id`:

```markdown
## 1. Yêu cầu Hệ thống

<!-- beads-id: br-prd01-s1 -->

Nội dung của yêu cầu hệ thống...
```

_Quy chuẩn đặt tên (ID Convention):_ `br-prd{Số File}-s{Số Mục}` (vd: `br-prd01-s1`, `br-prd02-s4.1`).

### 2. Dành cho file Plan (Implementation Plan)

Mỗi thành phần trong file kế hoạch (Plan element) phải có ID riêng và phải liên kết (`satisfies`) ngược lại ID của PRD:

```markdown
### PLAN-01: Tích hợp FrankenSQLite

<!-- beads-id: br-plan-01 | satisfies: br-prd02-s1 -->

Mô tả chi tiết kế hoạch...
```

_Quy chuẩn đặt tên:_ `br-plan-{Số thứ tự}` (vd: `br-plan-01`).

### 3. Dành cho các tài liệu khác (Spike, Architecture, Vision)

Để định danh toàn bộ file, ở ngay **dòng đầu tiên** của file (hoặc dưới `# Tiêu đề chính`), hãy chèn:

```markdown
# Kiến trúc luồng xác thực

<!-- beads-id: br-arch-auth -->
```

---

## 🛠 Các Nguyên tắc khi LLM thao tác trên file

**1. KHI TẠO MỚI FILE:**

- Bạn phải tự động sinh ra các block `<!-- beads-id: ... -->` tương ứng ở đầu file và đầu mỗi section lớn.
- Nếu là tài liệu Plan, bắt buộc phải có phần `| satisfies: ...` trỏ về một PRD section cụ thể.

**2. KHI SỬA ĐỔI FILE (Modify):**

- **TUYỆT ĐỐI KHÔNG** được xóa bỏ hay làm thay đổi các thẻ `<!-- beads-id: ... -->` đã có sẵn, trừ trường hợp bạn đang đập đi xây lại hoàn toàn.
- Nếu bạn tạo thêm một Header/Section mới, bạn **CẦN TỰ ĐỘNG** sinh ra một mã `beads-id` mới cho section đó theo đúng sequence (ví dụ: trong file đang có `s1`, `s2` thì bạn tự sinh `s3` cho mục mới).

**3. KHI TÁCH FILE (Split / Refactor):**

- Cần BÊ NGUYÊN các comment định danh `<!-- beads-id: ... -->` sang file mới, giữ nguyên giá trị để luồng Requirements Traceability Matrix (RTM) không bị đứt gãy.

💡 **Lưu ý quan trọng cho Agent:** Bạn không cần phải gọi lệnh `bd create` hay API nào để xin ID của tài liệu. Các ID dạng `br-prd...`, `br-plan...` là do bạn (Agent) **TỰ QUY ƯỚC** (hardcoded) dựa theo bối cảnh trong tài liệu và được viết thẳng vào file. Hệ thống sau này sẽ tự động parse (quet) các tag HTML này.
