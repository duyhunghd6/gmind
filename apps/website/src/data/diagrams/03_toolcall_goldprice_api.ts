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
      "Fine-tune LLM định kỳ hàng tuần bằng dữ liệu tài chính (Reuters, Bloomberg) để nạp giá vàng mới nhất trực tiếp vào model weights.",
      "Sử dụng Tool Calling để model chủ động gọi External API khi có truy vấn. Điều này bypass hoàn toàn giới hạn Knowledge Cutoff, giúp lấy live data tức thì.",
      "Dùng RAG pipeline kết nối với Vector Database chứa lịch sử giá vàng. Khi truy vấn, LLM tìm semantic match gần nhất để trả về mà không cần gọi API.",
      "Bơm (inject) tỷ giá vàng mới nhất vào System Prompt mỗi đầu phiên. Lúc khởi tạo LLM sẽ nắm giá chính xác mà không cần tool truy xuất ra ngoài."
    ],
    correctIndex: 1,
    explanation: "Tool_call gọi API tại thời điểm truy vấn để lấy dữ liệu mới nhất. Huấn luyện lại LLM tốn chi phí khổng lồ và vẫn bị outdated ngay lập tức.",
    theory: "Nguyên tắc Grounding: LLM nên được 'neo' vào nguồn dữ liệu đáng tin cậy (API, database) thay vì dựa vào parametric knowledge. Tool_call là cơ chế grounding phổ biến nhất."
  }
};
