import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "05",
  group: "toolcall",
  groupLabel: "Tool Call cơ bản",
  title: "Tỷ giá USD/VND",
  description: "Tỷ giá ngoại tệ thay đổi liên tục — LLM cần gọi API Forex để trả lời chính xác.",
  accent: "cyan",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Forex as Forex Rate API

    User->>IDE: "1000 USD bằng bao nhiêu VND?"
    IDE->>LLM: User Prompt + Available Tools [forex]

    Note over LLM: Tỷ giá = dữ liệu realtime → tool_call
    LLM->>IDE: tool_call: forex.convert("USD", "VND", 1000)
    IDE->>Forex: GET /convert?from=USD&to=VND&amount=1000
    Forex-->>IDE: {result: 25_480_000, rate: 25_480}
    IDE->>LLM: 1000 USD = 25.480.000 VND (tỷ giá: 25.480)

    LLM->>IDE: "1.000 USD = 25.480.000 VND (tỷ giá hôm nay: 25.480)"
    IDE->>User: ✅ Chính xác tại thời điểm truy vấn`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    User->>IDE: "1000 USD bằng bao nhiêu VND?"
    IDE->>LLM: User Prompt (KHÔNG có forex tool)

    Note over LLM: ⚠ Nhớ tỷ giá cũ từ training data
    LLM->>IDE: "1000 USD ≈ 24.500.000 VND (tỷ giá khoảng 24.500)"
    Note over LLM: Tỷ giá đã thay đổi → sai số ~ 1 triệu VND
    IDE->>User: ⚠ Sai gần 1 triệu VND — dùng tỷ giá cũ

    Note over User: Sai số lớn → ảnh hưởng giao dịch
    User->>User: Tự check trên Vietcombank → 25.480`,

  quiz: {
    question: "Quan sát sequence diagram CÓ tool_call phía trên: Developer hỏi → IDE chuyển cho LLM → LLM tự quyết định gọi tool_call: forex.convert() → IDE thực thi. Trong chuỗi này, tool_call được kích hoạt bởi ai?",
    options: [
      "Developer gõ command trực tiếp trong IDE terminal (/forex USD VND) và IDE route command đó thành tool_call — LLM không tham gia vào quyết định gọi tool nào mà chỉ format kết quả thành câu trả lời tự nhiên",
      "Trong Agentic Tool Calling, LLM được fine-tune để tự nhận diện intent từ user và sinh ra JSON Tool Request. Môi trường IDE/Backend chỉ đóng vai trò executor: parse request đó, gọi tool tương ứng, và gửi lại Observation cho LLM.",
      "IDE sử dụng rule-based routing engine: phân tích keywords trong prompt (ví dụ 'USD', 'VND' → forex tool) và pre-execute tools phù hợp TRƯỚC khi chuyển kết quả cùng prompt cho LLM — đây là pattern 'eager tool execution' giúp giảm latency",
      "Orchestrator layer (không phải LLM) quyết định tool nào cần gọi bằng cách match prompt với tool descriptions qua embedding similarity — LLM chỉ nhận kết quả tool execution và generate response, không trực tiếp emit tool_call"
    ],
    correctIndex: 1,
    explanation: "Trong Agent Loop, LLM phân tích prompt → quyết định cần tool nào → gửi tool_call request → IDE thực thi → trả kết quả về LLM. LLM là 'bộ não' quyết định, IDE là 'cánh tay' thực thi.",
    theory: "Đây là mô hình ReAct (Reasoning + Acting): LLM suy luận (Reason) rồi hành động (Act) thông qua tool_call. Vòng lặp Reason→Act→Observe→Reason lặp lại cho đến khi task hoàn thành. Mô hình này biến LLM từ chatbot thụ động thành Agent chủ động."
  }
};
