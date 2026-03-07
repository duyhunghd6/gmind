import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "24",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "API Client Generation từ OpenAPI",
  description: "Agent Skill đọc OpenAPI spec → generate typed API client tự động — thay vì viết thủ công.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/openapi-gen

    Dev->>IDE: "Generate TypeScript client cho Payment API"
    IDE->>LLM: Prompt + Loaded Skill [openapi-gen]

    LLM->>IDE: tool_call: bash("curl -o /tmp/spec.json https://api.payment.com/openapi.json")
    LLM->>IDE: tool_call: bash("openapi-typescript /tmp/spec.json -o src/api/payment.d.ts")
    IDE->>LLM: Generated typed definitions

    LLM->>IDE: tool_call: edit_file → Create src/api/paymentClient.ts with typed methods
    Note over LLM: Mỗi endpoint → typed function + error handling
    LLM->>IDE: "Generated 15 typed API methods từ 15 endpoints trong OpenAPI spec"
    IDE->>Dev: ✅ Typed client — createPayment(), getInvoice(), refund()...`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Generate TypeScript client cho Payment API"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Không biết OpenAPI spec của Payment API
    LLM->>IDE: "Hãy paste OpenAPI spec hoặc mô tả các endpoints"
    IDE->>Dev: Yêu cầu paste spec

    Dev->>Dev: Tìm docs → copy spec (rất dài)
    Dev->>IDE: Paste spec (vượt context window)
    LLM->>IDE: Generate một vài methods (thiếu vì spec bị cắt)
    Note over Dev: ⚠ Thiếu endpoints, thiếu types, thiếu error handling`,

  quiz: {
    question: "Diagram CÓ Agent Skill phía trên cho thấy Skill đọc OpenAPI spec → generate typed API client tự động, mỗi endpoint trở thành một typed function. Kiểu tạo code từ spec (OpenAPI, GraphQL schema) này thuộc loại automation nào?",
    options: [
      "AI-Augmented Generation — LLM đọc OpenAPI spec rồi dùng creative reasoning để generate 'better' code hơn spec quy định: thêm retry logic, caching layer, request batching vì LLM hiểu intent tốt hơn rigid schema-to-code mapping",
      "Đây là nguyên lý thiết kế Schema-Driven: Code OpenAPI Typescript interfaces, interceptors và Models sinh ra tự động từ OpenAPI specs / Swagger qua code generators. Đảm bảo tính nhất quán (Type-Safety) tuyệt đối, loại trừ hoàn toàn code hallucination từ model.",
      "Template-Based Codegen — tools như openapi-generator dùng Mustache/Handlebars templates cố định, output code cứng nhắc nhưng 100% chính xác. Approach này KHÔNG cần LLM vì hoàn toàn deterministic — Skill chỉ dùng script codegen, không involve AI",
      "Semantic Code Search — LLM tìm kiếm trong codebase hiện tại các API client patterns đã có (ví dụ: existing PaymentClient hoặc UserClient) rồi clone & adapt pattern đó cho Payment API mới, đảm bảo consistency với coding conventions của project"
    ],
    correctIndex: 1,
    explanation: "Schema-Driven Generation: code được derive trực tiếp từ OpenAPI spec (source of truth). Mỗi endpoint → 1 typed function. Đây là deterministic generation — không phụ thuộc 'sáng tạo' của LLM.",
    theory: "Agent Skills kết hợp 2 loại generation: 1) Deterministic (từ spec → code chính xác), 2) AI-driven (LLM suy luận thêm error handling, retry logic). Kết hợp này cho code vừa chính xác vừa thông minh."
  }
};
