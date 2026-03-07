import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "03",
  group: "toolcall",
  groupLabel: "Tool Call cơ bản",
  title: "Tra cứu giá vàng hôm nay",
  description: "Giá vàng thay đổi từng phút — LLM không thể 'nhớ' được nếu không gọi API.",
  accent: "cyan",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant API as Gold Price API

    User->>IDE: "Giá vàng SJC hôm nay bao nhiêu?"
    IDE->>LLM: User Prompt + Available Tools [goldprice]

    Note over LLM: Dữ liệu tài chính = realtime → phải gọi tool
    LLM->>IDE: tool_call: goldprice.query("SJC", "VND")
    IDE->>API: GET /v1/price?type=SJC&currency=VND
    API-->>IDE: buy: 92_500_000, sell: 94_500_000, unit: VND/lượng
    IDE->>LLM: SJC mua: 92.5tr, bán: 94.5tr VND/lượng

    LLM->>IDE: "Giá vàng SJC hôm nay: Mua 92.5 triệu, Bán 94.5 triệu VND/lượng"
    IDE->>User: ✅ Giá chính xác tại thời điểm query`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    User->>IDE: "Giá vàng SJC hôm nay bao nhiêu?"
    IDE->>LLM: User Prompt (KHÔNG có goldprice tool)

    Note over LLM: ⚠ Training data: giá vàng cách đây nhiều tháng
    LLM->>IDE: "Giá vàng SJC khoảng 7x-8x triệu VND/lượng..."
    Note over LLM: Hoàn toàn sai — giá đã tăng mạnh
    IDE->>User: ❌ Giá SAI HOÀN TOÀN — dữ liệu cũ

    Note over User: Nếu tin → quyết định tài chính sai
    User->>User: Phải tự search Google để xác nhận`,

  quiz: {
    question: "Diagram CÓ tool_call phía trên cho thấy LLM trả lời 'Mua 92.5tr, Bán 94.5tr' (chính xác); diagram KHÔNG CÓ trả lời 'khoảng 7x-8x triệu' (SAI HOÀN TOÀN). Khi LLM cần trả lời về dữ liệu thay đổi liên tục (giá vàng, tỷ giá, cổ phiếu), giải pháp nào đúng nhất?",
    options: [
      "A. Huấn luyện lại LLM mỗi ngày để cập nhật dữ liệu mới nhất",
      "B. Dùng tool_call gọi API lấy dữ liệu realtime tại thời điểm truy vấn — đảm bảo chính xác tức thì",
      "C. Tăng kích thước model (parameters) để LLM 'nhớ' nhiều dữ liệu hơn",
      "D. Cung cấp toàn bộ lịch sử giá trong system prompt để LLM tham khảo"
    ],
    correctIndex: 1,
    explanation: "Tool_call gọi API tại thời điểm truy vấn để lấy dữ liệu mới nhất. Huấn luyện lại LLM tốn chi phí khổng lồ và vẫn bị outdated ngay lập tức.",
    theory: "Nguyên tắc Grounding: LLM nên được 'neo' vào nguồn dữ liệu đáng tin cậy (API, database) thay vì dựa vào parametric knowledge. Tool_call là cơ chế grounding phổ biến nhất."
  }
};
