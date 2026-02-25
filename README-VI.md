# gmind - Memory Management CLI cho Agentic Coding

**gmind** là một Command Line Interface (CLI) chuyên biệt được thiết kế để quản lý và điều phối bộ nhớ cho các tác tử AI (AI agents) trong hệ sinh thái Agentic Coding. Công cụ này thu hẹp khoảng cách giữa các phiên làm việc chủ động của tác tử và kiến thức dự án dài hạn bằng cách sử dụng phương pháp quản lý bộ nhớ lai (hybrid approach).

## 🚀 Phương pháp Lai (Hybrid Approach)

`gmind` sử dụng phương pháp quản lý bộ nhớ đa tầng và kết hợp, đảm bảo rằng các AI agents luôn có được bối cảnh (context) chính xác mà chúng cần, vào đúng thời điểm:

1.  **Agent Sessions (Ngữ cảnh ngắn hạn):** Theo dõi và quản lý bộ nhớ động của các phiên tương tác với tác tử, bao gồm lịch sử trò chuyện, trạng thái công việc hiện tại và bối cảnh không gian làm việc tức thời.
2.  **Project Documents (Ngữ cảnh tĩnh dài hạn):** Tích hợp với tài liệu dự án toàn diện (thư mục `docs/`, các quyết định kiến trúc, các tệp quy tắc) để làm nền tảng cho các tác tử trong thiết kế và nguyên tắc hệ thống tổng thể.
3.  **Codebase Analyst (Ngữ cảnh cấu trúc):** Phân tích và lập bản đồ cấu trúc mã nguồn, cho phép các tác tử hiểu được mối quan hệ giữa các module, component và các phần phụ thuộc khác nhau trong dự án thông qua Khôi phục Kiến trúc Phần mềm (SAR).
4.  **Tích hợp Beads CLI (Theo dõi lỗi dạng Đồ thị):** Tích hợp với `bd` (Beads), trình theo dõi vấn đề (issue tracker) dạng đồ thị phân tán, dựa trên git. Điều này cho phép các tác tử tương tác liền mạch với các phần phụ thuộc của tác vụ, báo cáo lỗi và các mốc quan trọng của dự án như một phần bộ nhớ làm việc của chúng.

## 📦 Các tính năng nổi bật

- **Hợp nhất Bối cảnh (Context Unification):** Tổng hợp bộ nhớ từ các sessions, tài liệu, mã nguồn và Beads thành một payload bối cảnh thống nhất cho các LLM.
- **Nền tảng Graph RAG:** Tận dụng kiến trúc tạo văn bản tăng cường truy xuất dựa trên đồ thị (Graph RAG) để kết nối các khái niệm riêng lẻ trong toàn bộ vòng đời dự án.
- **Tương thích MCP:** Được thiết kế để tích hợp mượt mà thông qua Model Context Protocol (MCP) như là một bộ Kỹ năng Tác tử (Agent Skills) chuyên dụng.
- **Hiệu suất cao:** Được tối ưu hóa tốc độ để giảm thiểu độ trễ trong Agent Flywheel.

## 📚 Tài liệu tham khảo

- [Nghiên cứu: Thách Thức Xây Dựng Memory_Graph RAG](docs/researches/Thách%20Thức%20Xây%20Dựng%20Memory_Graph%20RAG.md)
- [Nghiên cứu: Nghiên cứu bộ nhớ agentic coding MCP](docs/researches/Nghiên%20cứu%20bộ%20nhớ%20agentic%20coding%20MCP.md)
- [Tích hợp Beads CLI](docs/researches/beadsCLI-README.md)

## 🛠️ Hướng dẫn sử dụng

_(Hướng dẫn cài đặt và sử dụng sẽ được cập nhật khi CLI được phát triển)_

## 📄 Giấy phép

MIT License
