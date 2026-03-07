import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "02",
  group: "toolcall",
  groupLabel: "Tool Call cơ bản",
  title: "Tra cứu thời tiết Hà Nội",
  description: "LLM cần dữ liệu realtime — tool_call kết nối API thời tiết lấy kết quả chính xác.",
  accent: "cyan",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant API as Weather API

    User->>IDE: "Thời tiết Hà Nội hôm nay thế nào?"
    IDE->>LLM: User Prompt + Available Tools [weather]

    Note over LLM: Cần dữ liệu realtime → gọi tool
    LLM->>IDE: tool_call: weather.getCurrent("Hanoi")
    IDE->>API: GET /current?city=Hanoi
    API-->>IDE: temp: 28°C, humidity: 75%, condition: Mưa nhẹ
    IDE->>LLM: Weather data: 28°C, ẩm 75%, mưa nhẹ

    LLM->>IDE: "Hà Nội hôm nay 28°C, độ ẩm 75%, có mưa nhẹ. Nên mang ô!"
    IDE->>User: ✅ Thông tin chính xác, realtime`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    User->>IDE: "Thời tiết Hà Nội hôm nay thế nào?"
    IDE->>LLM: User Prompt (KHÔNG có weather tool)

    Note over LLM: ⚠ Không có quyền truy cập dữ liệu realtime
    Note over LLM: Chỉ biết thông tin từ training data (cũ)
    LLM->>IDE: "Hà Nội tháng 3 thường khoảng 20-25°C, có thể có mưa phùn..."
    IDE->>User: ⚠ Thông tin chung chung, có thể sai

    Note over User: Phải tự mở app thời tiết để kiểm tra
    User->>User: Mở Weather app → thực tế 28°C, mưa nhẹ`,

  quiz: {
    question: "Trong diagram KHÔNG CÓ tool_call phía trên, LLM trả lời 'Hà Nội tháng 3 thường khoảng 20-25°C...' — thông tin chung chung và có thể sai. Khái niệm nào giải thích hạn chế này? Knowledge Cutoff là gì và tại sao nó ảnh hưởng đến khả năng trả lời của LLM?",
    options: [
      "LLM có khả năng inference dữ liệu thời tiết dựa trên seasonal patterns trong training data (mùa đông lạnh, mùa hè nóng), nhưng API rate limit của weather service giới hạn số lượng queries — nên cần caching layer trung gian",
      "Mô hình pre-trained có điểm dừng kiến thức tĩnh (knowledge cutoff) tại thời điểm hoàn tất huấn luyện. Để có thông tin realtime như thời tiết, kiến trúc Agentic bắt buộc tích hợp Tool Calling để full dữ liệu động từ external APIs.",
      "LLM được huấn luyện với historical weather data nên có parametric knowledge về climate patterns, nhưng sandbox environment của IDE chặn outbound network requests — vì vậy LLM không thể tự fetch data mới dù có internet",
      "LLM có thể dự đoán thời tiết chính xác bằng cách suy luận từ geographical data và seasonal trends — vấn đề thực sự là LLM không biết ngày hiện tại (current date) do thiếu system clock access, nên không khớp được prediction với đúng ngày"
    ],
    correctIndex: 1,
    explanation: "Knowledge Cutoff là thời điểm cuối cùng LLM được cập nhật dữ liệu huấn luyện. Sau đó, LLM KHÔNG tự biết gì mới — cần tool_call để lấy dữ liệu realtime.",
    theory: "Tool Call giải quyết bài toán Knowledge Cutoff bằng cách cho LLM 'cánh tay vươn ra ngoài' — gọi API weather, search, database để lấy thông tin mới nhất. Đây gọi là Grounding: neo LLM vào dữ liệu thực."
  }
};
