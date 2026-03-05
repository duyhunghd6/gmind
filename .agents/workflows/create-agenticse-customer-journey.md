---
description: Hướng dẫn lặp lại (iteration) biến PRDs thành Customer Journeys, xây dựng Storyboards với Flow Chart (Nodes/Arrows) và đối soát trực tiếp tới E2E Tests.
---

# /create-agenticse-customer-journey — Customer Journey & Storyboard Workflow

> **Mục đích:** Đọc hiểu PRDs, phân tích thành các User Journeys và hiện thực hóa thông qua Storyboards. Flowchart phải có điều kiện rẽ nhánh (Arrows), tích hợp phần Giải thích chi tiết (Guidance Section), hỗ trợ Icons/SVGs/Images tại các điểm chạm (Nodes). Cứ mỗi Storyboard là tiền đề để sinh ra các Screens thực tế, được dùng để viết Test Plan và kiểm soát `state-matrix-tracking-e2e`.
> **Cơ sở hạ tầng:** Dự án có hàng trăm Storyboards định nghĩa Data Model chung trong `apps/website/src/data/usecase-data.ts`.

---

## 1. Preconditions (Điều kiện tiên quyết)

- Nhận diện Agent Session trước đó từ báo cáo Handover (nếu có): `docs/design/design-system-handover.md` hoặc `docs/design/ux-state-matrix.md`.
- File danh sách PRDs cần phân tích (VD: `PRD-*.md`).
- Kỹ năng cần có: Khả năng đọc PRDs, trích xuất (extract) hành vi và vẽ Graph (Graphology, Mermaid hoặc JSON nodes/edges arrays).

---

## 2. Tiêu chuẩn của một Storyboard Hoàn chỉnh

1. **Nodes mang ý nghĩa Cảnh (Scene/Screen):**
   - Sự hiện diện của SVG, Icons, hoặc hình ảnh minh họa nhỏ.
   - Thể hiện rõ chi tiết ràng buộc của Product Requirements Document (PRD) trên mỗi Node, không chỉ là dòng text chung chung.
2. **Arrows mang thuật toán (Flow Chart & Condition Logic):**
   - Mũi tên dẫn từ Node sang Node hoặc xoay vòng (Loop, Retry).
   - Nội dung Mũi tên hiển thị điều kiện kiểm tra (Conditions, Switch, If/Else), hoặc sự kiện trigger để có thể chuyển đổi state.
3. **Guidance Section (Bảng điều khiển bên phải):**
   - Ở mỗi điểm chạm (Touchpoint/Node), nhấn vào sẽ hiện giải thích cơ chế, yếu tố cần xem xét (Considerations), những điều cần điều tra mở rộng (Investigating).
   - Đưa ra trường hợp sử dụng (Use case examples) cụ thể cho screen đó.
4. **State Matrix Tracking (E2E Alignment):**
   - Bước tiến (Steps) của Storyboard phải trực tiếp map được tỷ lệ 1:1 với E2E testing của Playwright/Cypress trong tương lai. Có step là có E2E.

---

## 3. Các Bước Thực Thi (Workflow Iterations)

// turbo-all

### Step 1: Đọc Handover Report & Môi trường hiện tại

```bash
# Agent kiểm tra lại các lần lập Usecase trước
cat docs/design/design-system-handover.md
cat docs/PRDs/core-gmind/PRD-*.md
```

- Phân tích: Hành trình người dùng nào còn thiếu sót hoặc chưa đúng PRD requirement.

### Step 2: Phân tích PRDs tạo Customer Journey

Từ nội dung PRD, Agent cần trích xuất Customer Journey bằng việc xác định:

1. Ai là người dùng (Role/Actor)?
2. Người dùng muốn đạt mục tiêu gì (Goal)?
3. Họ phải trải qua quy trình nào (Happy path & Error paths)?
   _(Output: Cập nhật hoặc viết mới `user_journeys.md` nếu cần lưu nháp)._

### Step 3: Map Customer Journey sang Flow Chart (Storyboard Data Model)

Agent không được chỉ liệt kê screen đơn điệu. Chỉnh sửa logic cấu trúc trong source code TypeScript (vd: `usecase-data.ts`, `storyboard-data.ts`):

- **Cấu hình Nodes:** Phải mapping với Screen Identifier, đính kèm SVG/Icon class.
- **Cấu hình Edges (Arrows):** Action phải kèm condition. Ví dụ: `Approve [If CI/CD Pass & RTM Green]`.
- **Cấu hình Guidance Info:** Object Node phải chứa key `mechanisms`, `considerations`, `examples` để cấp data cho khung Panel bên tay phải.

### Step 4: Thiết kế & Code Screen (React/Next.js UI)

Với file luồng `storyboard/page.tsx`, chỉnh sửa (nếu có requirement liên quan đến việc render Storyboard):

- Vẽ đường mũi tên (Arrows) hiển thị logic Condition.
- Khi Click vào Node, màn hình bên trái vẫn hiển thị Storyboard (hoặc co nhỏ thành column), Panel bên phải trượt ra hiện Guidance Section (tương tự như màn hình VSCode Sidebar).
- Hiển thị Icons (SVG) trên thẻ (Card) tại mỗi Node để dễ đọc.

### Step 5: Cập nhật Testing Plan & State Matrix (Tracking E2E)

- Map các Usecase ID (Ví dụ: `UC-X-Y`) lên `ux-state-matrix.md` hoặc E2E Test Matrix.
- Kiểm tra tính xác thực của luồng bằng lệnh Build hoặc truy cập Preview.
- Storyboard là "Source of truth" để người viết Code và người test Automation viết Test Assertions đối soát Screen.

```bash
# Ghi nhận trạng thái State tracking mới nhất
vi docs/design/ux-state-matrix.md
```

### Step 6: Viết Handover Walkthrough & Rời máy

- Khi hoàn thành 1 Iteration, Agent cần tạo `walkthrough.md` tổng kết Usecase nào đã được phân tích và map lên Codebase.
- Cập nhật lại `docs/design/design-system-handover.md` cho các Next Agents để chúng lặp lại workflow này cho những Use Cases dư còn lại trong backlog.
- Đóng gói bằng một Git Commit có chuẩn `Beads-ID: ds-usj-xxx`.

---

## 4. Quyền Hạn và Lưu Ý Đặc Biệt (Agentic Coding Constraints)

- **Tư duy thuật toán (Algorithmic Logic):** Storyboards là luồng rẽ nhánh, không phải là một danh sách phẳng (flat list). Hãy tận dụng Graphology, Mermaid.js hoặc thư viện liên quan nếu UI Render, hoặc Data Model phải có thuộc tính `condition`.
- **Rõ ràng và Trực quan (Intuitive):** Agent thực thi thay đổi CSS/UI phải luôn đảm bảo Icons to, chữ dễ đọc, mũi tên (Arrows) không đè chéo nhau che mắt người nhìn.
- Kế thừa (Inheritance): Liên tục đọc và update các Flow Chart cũ nếu chúng lỗi thời so với PRD mới đưa vào. Tương quan với Design System: Bất kỳ Action nào chưa có Component (vd nút Switch, Stepper) thì tạo task để tạo Component trong Design System.
