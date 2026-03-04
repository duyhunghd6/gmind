---
description: Khởi tạo và liên tục tinh chỉnh hệ thống Design System theo hướng Agentic SE
---

# 📋 Workflow: Tạo GSAFe Design System (/create-gsafe-design-system)

> **MỤC ĐÍCH:** Workflow này tự động được kích hoạt khi dự án yêu cầu phát triển UI/UX, giúp biến đổi từ đặc tả (PRD) thành HTML Markups và cập nhật ma trận State Matrix để đảm bảo độ bao phủ (Coverage).

Là một Tác nhân AI, khi sử dụng rule này hãy bật behavior profile theo các chỉ định trong **skill `agenticse-design-system`**.

## Quy trình Phát triển Nhiều vòng lặp (SAFe 6.0 Iterations)

Quá trình xây dựng UI/UX không thành công trong 1 lần thử mà là một quá trình Refine (Tinh chỉnh) liên tục trải qua nhiều Vòng lặp (Iterations).

### Bước 1: Trước vòng lặp (Pre-Iteration Planning)

- **Hành động 1:** Bạn phải bắt đầu bằng việc đọc **Report Handover của vòng lặp trước** (nếu có) và **PRDs liên quan**.
- **Hành động 2:** Lên kế hoạch triển khai của vòng lặp hiện tại (Hôm nay sẽ thiết kế/refine những component nào).

### Bước 2: Thiết kế Mockup HTML (Execution)

- Bạn sử dụng skill `agenticse-design-system` để bắt đầu viết và chỉnh sửa HTML/CSS (tuân thủ design system tokens).
- Tinh chỉnh các Component (Vd: Glassmorphism, States like `:active`, `:disabled`).

### Bước 3: Kiểm soát Độ bao phủ qua State Matrix & IDs

1. **Lập Bản đồ ID (ID Mapping):** Chú ý rằng mọi tính năng/yêu cầu chi tiết trong PRD đều có một ID riêng (e.g. `br-prd01-s4`).
2. Khi bạn thiết kế các hạng mục trên Design System (DS), bạn cũng **phải định danh Universal ID cho các item DS** (e.g. `br-ds-button`, `br-ds-board-view`).
3. Cập nhật file `State Matrix` (Design System Handover) để biểu diễn **mức độ ánh xạ (coverage)**: Bao nhiêu `br-prd` ID đã được bao phủ bởi các `br-ds` ID có sẵn trên màn hình?

### Bước 4: Review Vòng Lặp & Cập nhật Handover

- Chỉ được cho là **HOÀN THÀNH Iteration** đối với một module khi `State Matrix` chỉ báo tỷ lệ rà soát (cover) đạt mức **≥ 90%** các yêu cầu PRD được cấp.
- Khi vòng lặp đã thỏa mãn (hoặc kết thúc timebox), hãy **cập nhật Handover Report** để chuẩn bị bối cảnh cho Agent trong Iteration tiếp theo nhận việc.

### Bước 5: Phê duyệt từ Con người (Human Approval & Git Committing)

- Sau khi được sự đồng ý của con người (Trạng thái Level 3 Gate / Verify pass), bạn tiến hành tạo Code Commit.
- **Rule Commit Bắt buộc:** Bất kỳ Git Commit nào cũng phải có Universal ID chứa bên trong Commit Message. Tuân thủ Rule tách commit nhóm được mô tả tại `GEMINI.md`.

_Ví dụ mẫu cho git commit message:_

```text
feat(ui): implement glassmorphism taskboard layout

Beads-ID: br-ds-board-view
```
