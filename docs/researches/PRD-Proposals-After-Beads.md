# Đề xuất Cập nhật PRD dựa trên Nghiên cứu Kiến trúc Native Beads

Sau khi phân tích tài liệu thiết kế nguyên bản và triết lý lõi của dự án **Beads** (bởi Steve Yegge), dưới góc nhìn của một chuyên gia nghiên cứu kiến trúc Agentic, tôi nhận thấy các PRD hiện tại (PRD-01, 02, 03) của hệ thống `gmind` đang có một số điểm "Over-engineering" (thiết kế quá mức) và bỏ lỡ một số tính năng mang tính cách mạng mà Beads nguyên bản đã cung cấp.

Dưới đây là các đề xuất điều chỉnh cốt lõi cần được cập nhật vào chuỗi PRD:

## 1. Kiến trúc Lưu trữ: Loại bỏ Dolt DB, Trả về Native SQLite + JSON-L (Sửa PRD-01 & 02)

- **Vấn đề hiện tại trong PRD**: PRD-01 và PRD-02 đang định hình việc sử dụng **Dolt DB** làm backend cho Beads để đạt được tính chất "Git-for-Data".
- **Triết lý của Beads**: Hạt nhân sức mạnh của Beads nằm ở sự tối giản (Small-footprint, drop-in upgrade). Beads NGUYÊN BẢN vốn dĩ giải quyết bài toán đồng bộ Git cực kỳ thanh lịch bằng cách:
  - Dùng **SQLite (`beads.db`)** lưu cục bộ để truy vấn siêu tốc (siêu nhẹ, không cần setup server).
  - Một tiến trình ngầm (daemon) liên tục đồng bộ thay đổi ra file văn bản **`issues.jsonl`** để commit lên Git. Git chịu trách nhiệm xử lý versioning và conflict thông qua file text này.
- **👉 ĐỀ XUẤT ĐIỀU CHỈNH**:
  - Gạch bỏ hoàn toàn Dolt DB khỏi kiến trúc để giảm độ trễ, giảm chi phí vận hành và rủi ro conflict hệ thống.
  - Sửa lại kiến trúc Storage Layer: Chỉ còn **Native Beads (SQLite + JSONL)** cho Task/State và **Zvec** cho Docs/Chat History.
  - Giao diện Web UI (Presentation Layer) thay vì kết nối với Dolt, sẽ đọc trực tiếp từ `beads.db` (do là CSDL local) hoặc thông qua Unix Socket `bd.sock`.

## 2. Agent Workflow: Đưa `bd ready` làm Trái Tim Điều Phối (Sửa PRD-03)

- **Vấn đề hiện tại trong PRD**: PRD-03 đang yêu cầu Agent gọi lệnh `bv --robot-triage` để lấy task ưu tiên một cách thụ động/tĩnh.
- **Triết lý của Beads**: "External memory for agents". Beads quản lý task dạng đồ thị phụ thuộc (Dependency Graph) cực kỳ tường minh (epic, subtask, blocked-by). Thay vì đọc một danh sách markdown phẳng dễ gây "ảo giác" (dementia), Agent làm việc theo tư duy truy vấn đồ thị.
- **👉 ĐỀ XUẤT ĐIỀU CHỈNH**:
  - Bổ sung lệnh `bd ready --json` vào chuẩn mực Workflow của Agent.
  - **Vòng lặp chuẩn (Work Loop)**: Bắt đầu phiên làm việc -> Gọi `bd ready --json` (Chỉ lấy các task không còn bị block) -> Nhận task ưu tiên cao nhất -> Đổi status thành `in_progress` -> Làm việc -> Gọi `bd close` -> Vòng lại `bd ready`.
  - Luồng này đảm bảo các Agent trong Swarm không bao giờ dẫm chân lên nhau và luôn tuân thủ Dependency Graph.

## 3. Chống rò rỉ công việc (Lost Work) & "Discovered Work" (Bổ sung Rule vào PRD-03)

- **Vấn đề hiện trường (Context Exhaustion)**: Gần cuối cửa sổ ngữ cảnh, các Agent (ví dụ Claude) bắt đầu có xu hướng lờ đi các lỗi chúng phát hiện ra (broken tests cũ, hàm deprecated) để nhanh chóng báo "Done" nhằm tiết kiệm Token. Điều này gây thất thoát công việc nghiêm trọng (Lost Work).
- **Triết lý Beads**: Cung cấp công cụ rớt việc lưu vào "ngăn xếp" (Queue/Beads) ngay lập tức.
- **👉 ĐỀ XUẤT ĐIỀU CHỈNH**:
  - Bổ sung quy tắc CỐT LÕI (Critical Rule) cho file `SKILL.md` của Agent: Bất cứ khi nào Agent đang thi hành một `bd-ID` mà phát hiện ra lỗi/vấn đề nằm NGOÀI phạm vi (out-of-scope), **tuyệt đối không được lờ đi và cũng không được tự ý sửa mót**.
  - Agent **bắt buộc** phải lập tức gọi lệnh `bd create <Tên_lỗi> --discovered-from <bd-ID_hiện_tại>` để ghi nhận vào hệ thống.
  - Sau đó, tiếp tục hoàn thành task chính.

## 4. Kiểm soát Phình to Bộ nhớ theo Thời gian (Bổ sung vào PRD-02)

- **Vấn đề hiện tại**: Dù PRD-02 đã đề xuất Garbage Collection riêng cho Zvec, nhưng bản thân SQLite của Beads và file `issues.jsonl` cũng sẽ phình to ra tới hàng nghìn Issue log sau cài tháng.
- **Triết lý Beads**: Tính năng "Memory Compaction" có sẵn thông qua lệnh `bd compact`. LLM sẽ thu thập các issue đã đóng từ lâu và tóm tắt chúng lại (decay memory), giữ DB gọn gàng như trí nhớ con người.
- **👉 ĐỀ XUẤT ĐIỀU CHỈNH**:
  - Tích hợp `bd compact` vào quy trình bảo trì (Maintenance Pipeline). Yêu cầu chạy định kỳ 1 tuần/lần trên hệ thống CI/CD hoặc qua một Agent bảo trì chuyên trách để "nén" các Issue đã `closed` quá 30 ngày.

---

**Tóm lại:** Kiến trúc mới (Zvec + Native Beads SQLite + gmind CLI) là một combo hoàn hảo. Bỏ Dolt DB sẽ giải phóng kiến trúc khỏi sức ì không cần thiết, giúp `gmind` bám sát triết lý "Vibe Coding" siêu nhẹ, siêu nhanh của kỷ nguyên Agentic 2026.
