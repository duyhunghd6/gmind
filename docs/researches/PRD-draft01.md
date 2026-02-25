Dưới đây là đề xuất giải pháp kiến trúc tổng thể dựa trên các yêu cầu của bạn, kết hợp giữa quản lý trạng thái có cấu trúc, Graph RAG và giao tiếp đa tác nhân:

**1. Kiến trúc Hệ thống Lưu trữ (Storage Layer)**

- **Dolt & Beads (Bộ nhớ Quy trình & Trạng thái):** Bạn khởi tạo Beads với backend là Dolt (`.beads/dolt/`) ngay tại thư mục dự án `[1]`. Dolt hoạt động như một cơ sở dữ liệu SQL có quản lý phiên bản (Git for Data) `[2]`. Hệ thống quản trị dự án tự code của bạn có thể chạy dưới dạng một service kết nối thẳng vào Dolt thông qua chế độ `dolt sql-server` để thực hiện các luồng gán việc (assign task), truy vấn SQL tùy chỉnh và xây dựng giao diện xem docs `[1]`.
- **Zvec (Bộ nhớ Ngữ nghĩa RAG):** Tài liệu dự án (Markdown, HTML mockup, tài liệu kiến trúc) và lịch sử chat của tác nhân sẽ được đưa vào Zvec. Vì Zvec là một cơ sở dữ liệu vector in-process siêu tốc (lõi C++) chạy trực tiếp trên bộ nhớ cục bộ, nó loại bỏ hoàn toàn độ trễ mạng và rất lý tưởng để nhúng thẳng vào các CLI tool tự code `[3]`.
- **Graph RAG (Mã nguồn):** Sử dụng các công cụ phân tích cú pháp (như Tree-sitter) để biến codebase thành Cây cú pháp trừu tượng (AST) và trích xuất thành đồ thị phụ thuộc (nodes là class/hàm, edges là import/gọi hàm) tương tự như mô hình hoạt động của `codegraph-cli` ``. Các node này sau đó được nhúng (embed) vào Zvec để cho phép tìm kiếm lai (vừa theo ngữ nghĩa vector, vừa theo đồ thị).

**2. Chiến lược Định danh duy nhất (Universal Tracking)**
Để liên kết mọi thứ, hãy sử dụng **Beads ID** (ví dụ: `bd-123` hoặc `kw-1`) làm khóa chính (Primary Key) xuyên suốt hệ thống `[4, 5]`:

- **mcp_agent_mail:** Khi các tác nhân trao đổi hoặc khóa tệp, yêu cầu chúng sử dụng ID này. Ví dụ: gọi hàm `send_message(..., thread_id="bd-123", subject="[bd-123]...")` để tạo luồng tin nhắn, và `file_reservation_paths(..., reason="bd-123")` để thông báo lý do chiếm quyền chỉnh sửa tệp ``.
- **Git Commits:** Yêu cầu tác nhân luôn gắn `#bd-123` vào thông điệp commit để hệ thống backend có thể dùng hook liên kết commit với issue tương ứng.
- **Hệ quản trị View Docs:** Service của bạn sẽ parse các liên kết này từ Dolt DB và Zvec để render một giao diện toàn cảnh: click vào một task sẽ thấy docs liên quan, code diffs, và các đoạn hội thoại mail của AI.

**3. Xây dựng công cụ `gmind` CLI**
Bạn có thể code `gmind` (có thể bằng Python để dễ dùng thư viện Zvec `[3]`) đóng vai trò là "cổng thông tin" (API gateway) cho Claude:

- `gmind search <query>`: Quét qua Zvec để tìm docs, HTML mockups hoặc AST context.
- `gmind context <beads-id>`: Tự động gom nhóm toàn bộ context bao gồm mô tả task (từ Dolt DB), mã nguồn liên quan (từ Graph RAG), và lịch sử thảo luận (từ Zvec/mcp_agent_mail).
- CLI này nên trả về định dạng JSON hoặc Markdown tối ưu hóa token (ví dụ: TOON) để bảo vệ cửa sổ ngữ cảnh của tác nhân `[6]`.

**4. Viết Agent Skill (Quy trình cho Claude Code & Orchestrator)**
Bạn có thể đóng gói hướng dẫn vào một tệp kỹ năng (ví dụ: `.claude/skills/project_memory.md`) để chỉ định luồng làm việc cho các subagents:

- **Planning & Triage:** Yêu cầu tác nhân sử dụng lệnh `bv --robot-triage` (chế độ Robot của Beads Viewer) để lấy danh sách các tác vụ đang bị thắt cổ chai hoặc cần ưu tiên ``. Tuyệt đối dặn tác nhân chỉ dùng cờ `--robot-\*`để tránh khởi chạy giao diện TUI gây treo terminal`[6]`.
- **Execution:** Trước khi bắt tay vào code, tác nhân phải gọi `gmind context <id>` để nạp bối cảnh hệ thống, tài liệu thiết kế và lịch sử của issue.
- **Coordination:** Nếu phát sinh va chạm tệp hoặc cần phân quyền, tác nhân phải dùng `mcp_agent_mail` để đặt lease (độc quyền tệp) và gửi tin nhắn cập nhật cho nhóm ``.
- **Completion:** Khi xong việc, tác nhân sử dụng `bd close <id>` và update trạng thái qua Beads CLI để kích hoạt chu trình nén bộ nhớ (compaction) `[5]`.

Cách tiếp cận này giúp bạn phân tách rõ ràng lớp dữ liệu (Dolt/Zvec), lớp giao diện (Hệ quản trị Web), và lớp công cụ máy móc (Beads CLI, `gmind`, `mcp_agent_mail`), tạo thành một hệ thống bộ nhớ vững chắc cho đội ngũ kỹ sư AI của bạn.
