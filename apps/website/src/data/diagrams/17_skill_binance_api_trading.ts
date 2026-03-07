import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "17",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Binance API Trading",
  description: "Agent Skill chứa API docs cập nhật + Testnet/Mainnet config + cipher signing — LLM thông thường không có.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/binance-api

    Dev->>IDE: "Viết script đặt lệnh mua BTC trên Binance Testnet"
    IDE->>LLM: Prompt + Loaded Skill [binance-api]

    Note over LLM: Đọc SKILL.md → hiểu Testnet endpoint, HMAC signing
    Note over LLM: Biết: base_url=testnet.binance.vision, API key format
    LLM->>IDE: Generate code: correct Testnet URL + HMAC-SHA256 signature
    Note over LLM: Dùng timestamp + recvWindow đúng chuẩn

    LLM->>IDE: tool_call: bash("python trade.py --testnet --pair BTCUSDT --side BUY --qty 0.001")
    IDE->>Dev: ✅ Order placed on Testnet — signature valid`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Viết script đặt lệnh mua BTC trên Binance Testnet"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Dùng API knowledge từ training (cũ)
    LLM->>IDE: Code với Mainnet URL (api.binance.com)
    Note over LLM: Sai Testnet URL, sai signing method
    IDE->>Dev: ⚠ Code dùng Mainnet → nguy hiểm nếu chạy thật!

    Dev->>Dev: Chạy → Authentication error
    Dev->>Dev: Tự đọc Binance docs → fix URL + signature
    Note over Dev: ⚠ Rủi ro: code có thể trade thật trên Mainnet`,

  quiz: {
    question: "Diagram CÓ Agent Skill cho thấy LLM dùng đúng Testnet endpoint (testnet.binance.vision) và HMAC-SHA256 signing; diagram KHÔNG CÓ cho thấy LLM dùng sai Mainnet URL (api.binance.com) — nguy hiểm nếu chạy thật! Tại sao Agent Skill quan trọng hơn việc LLM 'biết' Binance API từ training data?",
    options: [
      "Các đặc tả của API Binance không bao giờ thay đổi nên Endpoint Testnet đã ổn định nhiều năm nay. Chỉ cần nhắc nhẹ LLM một dòng Prompt là đủ chứ không cần Skill.",
      "Lĩnh vực Trading đòi hỏi tính chuẩn xác tuyệt đối (Ký HMAC-SHA256, Isolation mạng). Agent Skill nhúng bộ khung hệ thống (Framework) này để triệt tiêu hội chứng ảo giác của LLM.",
      "Dữ liệu huấn luyện của LLM về Crypto đã quá dư thừa và chính xác. Vấn đề duy nhất là không có đủ API Key để hoạt động chứ không phải thiếu kiến thức.",
      "Agent Skill tự tạo các socket siêu nhanh giúp triệt tiêu độ trễ mạng trong giao dịch HFT, thay vì để LLM tự chắp vá qua REST API chậm chạp."
    ],
    correctIndex: 1,
    explanation: "Binance API thay đổi: endpoints mới, signing algorithms cập nhật, rate limits thay đổi. Agent Skill lưu trữ thông tin chính xác tại thời điểm viết — quan trọng hơn knowledge cũ từ training data.",
    theory: "Domain-Specific Knowledge: Agent Skills đóng gói 'expert knowledge' cho một domain cụ thể. Trong crypto, sai 1 endpoint (Testnet vs Mainnet) có thể gây mất tiền thật. Skill giảm rủi ro bằng cách cung cấp verified configuration."
  }
};
