---
description: Khởi động Server Development cho Gmind Showcase Website và lấy URL
---

# /gsafe-showcase-website-startweb — Server Startup Workflow

> **Mục đích:** Khởi động Development Server cho dự án `apps/website` một cách an toàn và trả về URL chính xác cho người dùng (Human) xem trước giao diện.

---

## Workflow Implementation Steps

// turbo-all

Các bước Agent cần tự động thực thi khi Human gọi lệnh `/gsafe-showcase-website-startweb`:

### Step 1: Kiểm tra trạng thái dự án

Di chuyển vào đúng thư mục `apps/website` và đảm bảo package đã được cài đặt.

```bash
cd apps/website/
pnpm install
```

### Step 2: Khởi động Server tại Background

Sử dụng `pnpm run dev` kết hợp với tham số cổng cố định (ví dụ `-p 8080`) để đảm bảo luôn có một URL duy nhất, dễ dàng truy cập.

```bash
cd/apps/website/
# Lưu ý: Lệnh này sẽ chạy ngầm và block terminal nếu không chạy dạng background job
# Do script runner của Agent đã xử lý background tasks tự động, Agent chỉ cần gọi:
pnpm run dev -p 8080
```

### Step 3: Hiển thị URL cho Human

Sau khi lệnh server chạy thành công (trả về trạng thái Ready), Agent **BẮT BUỘC** phải in ra message phản hồi cho người dùng chứa URL tuyệt đối.

**Mẫu tin nhắn bắt buộc:**

```text
🚀 Server Gmind Showcase Website đã được khởi động!
Vui lòng xem giao diện tại đường link sau:
👉 http://localhost:8080
```

---

## Output Mong Đợi (Definition of Done)

- [ ] Lệnh `pnpm run dev -p 8080` chạy thành công mà không báo lỗi thiếu thư viện.
- [ ] Agent gửi tin nhắn chứa đường dẫn `http://localhost:8080` dưới dạng clickable link.
