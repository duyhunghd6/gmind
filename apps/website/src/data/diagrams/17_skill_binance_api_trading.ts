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
      "Binance API không thay đổi thường xuyên — endpoint testnet.binance.vision đã stable từ 2021 và HMAC-SHA256 là chuẩn signing duy nhất. LLM chỉ cần 1 lần prompt correction ('dùng testnet, không phải mainnet') là đủ chính xác",
      "Hệ thống Trading Finance yêu cầu rule-set cực nghiêm ngặt: HMAC-SHA256 signature, Testnet/Mainnet isolation. Agent Skill cung cấp knowledge framework này, triệt tiêu ảo giác (hallucination) để LLM tuân thủ chặt các chuẩn Authentication phức tạp.",
      "LLM có training data dồi dào về crypto APIs (GitHub repos, StackOverflow answers, tutorials) nên parametric knowledge đủ chính xác — vấn đề thực sự là LLM thiếu API key/secret để authenticate, không phải thiếu knowledge",
      "Agent Skill pre-generates trading code templates với optimized WebSocket connections cho low-latency execution — code LLM generate từ scratch dùng REST API có latency cao hơn 10-50ms, có thể miss price movements trong volatile market"
    ],
    correctIndex: 1,
    explanation: "Binance API thay đổi: endpoints mới, signing algorithms cập nhật, rate limits thay đổi. Agent Skill lưu trữ thông tin chính xác tại thời điểm viết — quan trọng hơn knowledge cũ từ training data.",
    theory: "Domain-Specific Knowledge: Agent Skills đóng gói 'expert knowledge' cho một domain cụ thể. Trong crypto, sai 1 endpoint (Testnet vs Mainnet) có thể gây mất tiền thật. Skill giảm rủi ro bằng cách cung cấp verified configuration."
  }
};
