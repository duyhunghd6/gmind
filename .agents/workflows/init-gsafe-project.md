---
description: Khởi tạo Project GSAFe 6.0 với các thiết lập chuẩn và thư mục làm việc cốt lõi
---

# 📋 Workflow: Khởi tạo cấu trúc GSAFe Project (/init-gsafe-workflow)

> **MỤC ĐÍCH:** Workflow này tự động được kích hoạt khi User (hoặc PMO Agent) gõ lệnh `/init-gsafe-workflow` để bắt đầu một chu trình phát triển mới theo GSAFe 6.0 trên nền tảng Gmind.

Là một Tác nhân AI, bạn hãy thực thi CÁC BƯỚC SAU đây một cách tuần tự (sử dụng terminal bash):

## Bước 1: Setup Workspace & Folder Structure

Tạo các thư mục cần thiết theo đúng kiến trúc Polyglot Monorepo của dự án:

```bash
// turbo-all
mkdir -p docs/PRDs/core-gmind
mkdir -p docs/plans
mkdir -p docs/researches/spikes
mkdir -p docs/architecture/adr
```

## Bước 2: Sinh file Khởi điểm (Boilerplate PRD)

Bạn hãy trực tiếp tạo file `docs/PRDs/core-gmind/PRD-00-Vision-and-Architecture.md` (nếu chưa có) hoặc nội dung Vision chuẩn để định hướng cho các Spike sau này, với cấu trúc có YAML metadata và thẻ `<!-- beads-id: br-prdXX-sY -->` theo chuẩn `arch-review-docs-add-beads`.

## Bước 3: Tạo File Kế hoạch (Boilerplate Plan)

Sinh một file Plan mẫu tại `docs/plans/plan-00-init.md`:

Viết vào đó nội dung chuẩn bị cho Phase "Continuous Exploration":

1. Mục tiêu (Objective).
2. Danh sách các Spike dự kiến sẽ chạy (Research backlog).
3. Đính kèm `<!-- beads-id: br-plan-00 | satisfies: br-prd00-s1 -->`.

## Bước 4: Khởi động Tracking Cục bộ (Nếu cần thiết / Trong scope lệnh bash)

Mặc dù bạn là tác nhân, bạn có thể nhắc Human (hoặc agent orchestrator) khởi tạo DB của beads_rust nếu project này hoàn toàn trống (bằng lệnh `bd init` nếu có) để bắt đầu lưu trữ JSONL. Tuy nhiên việc này thường được quản lý ở repo root.

## CÁC BƯỚC TIẾP THEO (Chỉ dẫn cho Human/Agent)

Sau khi hoàn tất khởi tạo cấu trúc:

1. Tác nhân sẽ báo cáo: "Đã khởi tạo xong GSAFe workspace."
2. Tác nhân gợi ý người dùng (User) tiến hành chạy lệnh `/gsafe-research` tương ứng với Bước 3 trong Chuỗi công việc GSAFe (Xem tham chiếu tại `PRD-05-GSafe-Workflow-and-Implementation.md`).
3. Đợi phê duyệt (Approve) từ người dùng để bắt đầu quy trình Nghiên cứu (Research Spikes).
