---
description: Vòng lặp rà soát, đối chiếu và cập nhật giữa PRD và Design System (State Matrix Tracking)
---

# 📋 Workflow: Rà soát & Đồng bộ PRD và Design System (/arch-review-prd-after-design-system)

> **MỤC ĐÍCH:** Workflow này tự động được kích hoạt định kỳ (SAFe Iterations) để đối chiếu giữa **Yêu cầu (PRDs)** và **Thực hiện Giao diện (Design System)**. Workflow tạo ra rào chắn đảm bảo mọi UI/UX Specs trong PRD đều có màn hình minh họa (Screen) và kịch bản (Storyboard) tương ứng thông qua tài liệu `prd-ds-coverage-matrix.md`.

Là một Tác nhân AI, bạn có nhiệm vụ thiết lập vòng lặp (Feedback Loop) giữa Spec và UI. Hoạt động này liên lạc mật thiết với skill `agenticse-design-system`.

---

## 📌 Các bước Thực thi Vòng lặp Rà soát

### Bước 1: Thu thập Context (Đọc hiểu Yêu cầu)

1. **Quét toàn bộ PRDs:** Đọc tất cả các file trong thư mục PRD của dự án (thường là `./docs/PRDs/` hoặc theo cấu hình GSAFe dự án).
2. **Quét các Spikes liên quan:** PRD thường link tới các file `spike-*.md` (nghiên cứu) chứa thông tin chi tiết về bài toán UI/UX. Hệ thống AI cần đọc để hiểu sâu nghiệp vụ.
3. **Phân tích SAFe 6.0 Rule:** Hiểu rằng vòng lặp này thuộc Phase **Continuous Exploration** hoặc **Continuous Integration**, cần chuẩn bị đẩy đủ Blueprint UI trước khi code logic.

### Bước 2: Phân tích Trạng thái Hiện tại của Design System

1. Dựa trên thư mục chứa Source Code của Giao diện (thường là `./apps/`, `./src/`, hoặc `./packages/design-system/`), Agent rà soát lại tập hợp các màn hình và components hiện có.
2. Quét mảng Component, Layout, StoryBoard, và các tương tác State.

### Bước 3: Cập nhật Ma trận Theo dõi (State Matrix Tracking)

1. Mở file `docs/design/prd-ds-coverage-matrix.md`.
2. Tạo/Cập nhật bảng Mapping giữa **PRD Universal IDs** (`br-prd04-s4`, v.v.) và **Design System IDs** (`br-ds-approval`, `br-sb-uc-01`, v.v.).
3. Tìm ra "Khoảng trống Yêu cầu" (Missing Components): Những PRD đòi hỏi giao diện nhưng chưa có trong Design System.
4. Gán nhãn độ bao phủ (% Coverage).

### Bước 4: Chuyển bước triển khai (Handoff & Next Steps)

1. Nếu phát hiện thiếu xót từ Matrix: Agent tự đề xuất thiết kế Mockup UI bổ sung bằng cách gọi workflow tạo UI (VD: `/create-gsafe-design-system`).
2. **Cập nhật Rolling Handover Report:** Viết đè (overwrite) vào một file báo cáo duy nhất tại `./docs/design/latest-ui-handover.md` để Agent mảng UI ở khâu tiếp theo có context làm việc ngay lập tức. Tính chất "Rolling" giúp repo không bị phình to bởi các file lịch sử lặp đi lặp lại.
3. **Tạo Task (Tuỳ chọn):** Nếu dự án dùng hệ thống quản lý (như `br`), tạo các task tương ứng cho những UI component còn thiếu.
4. Nếu PRD thiếu logic bổ trợ cho UI, Agent cảnh báo và đề xuất cập nhật ngược lại PRD (Hoàn thiện PRD dựa trên UI).

---

## 🛠 Định dạng Báo cáo Bàn giao (Rolling Handover Report)

Thay vì tạo ra hàng loạt file `iteration-0001`, `iteration-0002` gây rác dự án, chuẩn GSAFe 6.0 khuyến nghị sử dụng một file **Bàn giao xoay vòng (Rolling Handover)**. File này luôn thể hiện trạng thái mới nhất giữa 2 agents tại Phase phân tích. Lịch sử thay đổi đã được Git lưu trữ, không cần duplicate file.

**Tên file mặc định:** `./docs/design/latest-ui-handover.md` (Overwrite mỗi lần chạy)

```markdown
# Rolling Handover: PRD-DS Sync

**Ngày cập nhật cuối:** YYYY-MM-DD
**Phiên bản PRD truy vết:** (Context hiện tại)

## 1. Tóm tắt Độ bao phủ (Coverage Status)

- Số lượng Features yêu cầu UI trong PRD: 15
- Số lượng đã xuất hiện trong Design System: 13
- Tỷ lệ bao phủ State Matrix: 86%

## 2. Khoảng trống Yêu cầu được Phát hiện (Gaps)

- `[PRD-ID-1]`: Cần thiết kế màn hình/component A.
- `[PRD-ID-2]`: Cần thiết kế trạng thái B cho component C.

## 3. Kế hoạch Hành động cho Tác nhân UI (Next UI Agent Task)

1. Kích hoạt workflow thiết kế UI cho các khoảng trống trên.
2. Tập trung vào thư mục `[Đường-dẫn-chứa-Mockup]`.

## 4. Rủi ro / Vấn đề thiết kế cần giải quyết

- (Gợi ý cách hiển thị data phức tạp hoặc nhắc nhở về contrast/keyboard accessibility)
```

💡 **Lưu ý quan trọng cho Agent:** Vai trò của bạn ở Workflow này thiên về giám sát (Supervision) và lên kế hoạch (Planning). Artifact chính là file `prd-ds-coverage-matrix.md` (SSOT lâu dài) và file `latest-ui-handover.md` (Giao tiếp ngắn hạn).
