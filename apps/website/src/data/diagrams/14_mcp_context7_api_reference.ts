import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "14",
  group: "mcp",
  groupLabel: "MCP Server",
  title: "MCP Context7 → API Reference",
  description: "LLM gọi Context7 để lấy API docs phiên bản mới nhất — tránh dùng API deprecated.",
  accent: "rose",
  withLabel: "CÓ MCP Context7",
  withoutLabel: "KHÔNG CÓ MCP Context7",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant MCP as MCP Context7
    participant Docs as API Documentation

    Dev->>IDE: "Implement Stripe payment checkout"
    IDE->>LLM: Prompt + Tools [MCP: context7]

    LLM->>IDE: tool_call: context7.resolve("stripe")
    IDE->>MCP: resolve("stripe")
    MCP->>Docs: Fetch latest Stripe API docs
    Docs-->>MCP: Stripe v2024-12 API reference
    MCP-->>IDE: API docs: checkout.sessions.create(...)
    IDE->>LLM: Latest Stripe API: v2024-12 endpoints + params

    Note over LLM: Dùng API mới nhất → code chính xác
    LLM->>IDE: Code: stripe.checkout.sessions.create(...)
    IDE->>Dev: ✅ Code dùng Stripe API phiên bản mới nhất`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Implement Stripe payment checkout"
    IDE->>LLM: Prompt (KHÔNG có Context7)

    Note over LLM: ⚠ Training data: Stripe API cũ (2023)
    LLM->>IDE: Code: stripe.charges.create(...)
    Note over LLM: Dùng API cũ (deprecated)
    IDE->>Dev: ⚠ Code dùng Charges API → DEPRECATED

    Dev->>Dev: Chạy → lỗi deprecation warning
    Dev->>Dev: Phải tự đọc docs Stripe → đổi sang Checkout Sessions
    Note over Dev: ⚠ Mất thời gian fix API deprecated`,

  quiz: {
    question: "Diagram KHÔNG CÓ MCP phía trên cho thấy LLM generate code dùng 'stripe.charges.create()' — API đã DEPRECATED; trong khi diagram CÓ MCP dùng Context7 fetch docs mới nhất và dùng 'checkout.sessions.create()' (API hiện hành). Vấn đề 'API Staleness' (API lỗi thời) nghiêm trọng như thế nào?",
    options: [
      "A. Không nghiêm trọng — các API lớn hiếm khi thay đổi breaking changes",
      "B. RẤT nghiêm trọng — LLM dùng API từ training data (cũ) → code compile được nhưng RUNTIME FAIL vì endpoint deprecated hoặc thay đổi",
      "C. Chỉ ảnh hưởng API miễn phí — API trả phí (Stripe, AWS) luôn backward-compatible vĩnh viễn",
      "D. LLM có khả năng tự detect API deprecated qua pattern matching trong code"
    ],
    correctIndex: 1,
    explanation: "API Staleness: LLM biết API từ training data → code 'nhìn đúng' nhưng dùng endpoint cũ → runtime fail. MCP Context7 giải quyết bằng cách fetch API docs MỚI NHẤT tại thời điểm code.",
    theory: "Context7 implement nguyên tắc 'Documentation as Context': thay vì LLM dùng parametric knowledge (nhớ), Context7 inject latest docs vào context window. Đây là dạng RAG cho API documentation — đảm bảo code luôn dùng API version mới nhất."
  }
};
