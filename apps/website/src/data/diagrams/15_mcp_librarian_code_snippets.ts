import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "15",
  group: "mcp",
  groupLabel: "MCP Server",
  title: "MCP API Librarian → Code Snippets",
  description: "LLM tìm best-practice code snippets qua MCP Librarian — không cần viết từ đầu.",
  accent: "rose",
  withLabel: "CÓ MCP Librarian",
  withoutLabel: "KHÔNG CÓ MCP Librarian",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant MCP as MCP API Librarian
    participant DB as Snippet Database

    Dev->>IDE: "Implement OAuth2 PKCE flow"
    IDE->>LLM: Prompt + Tools [MCP: librarian]

    LLM->>IDE: tool_call: librarian.search("oauth2 PKCE flow")
    IDE->>MCP: search("oauth2 PKCE flow")
    MCP->>DB: Query verified snippets
    DB-->>MCP: 3 snippets: generateCodeVerifier, exchangeToken, refreshToken
    MCP-->>IDE: Best-practice code + security notes
    IDE->>LLM: Verified snippets + security patterns

    Note over LLM: Dùng code đã verify → an toàn
    LLM->>IDE: Implement OAuth2 PKCE với code_verifier + code_challenge
    IDE->>Dev: ✅ Security best-practice — S256 challenge, CSRF protection`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Implement OAuth2 PKCE flow"
    IDE->>LLM: Prompt (KHÔNG có Librarian)

    Note over LLM: ⚠ Viết OAuth2 từ kiến thức training
    LLM->>IDE: Generate OAuth2 code
    Note over LLM: Có thể thiếu: CSRF protection, nonce validation
    IDE->>Dev: ⚠ Code "hoạt động" nhưng thiếu security patterns

    Dev->>Dev: Security review → phát hiện thiếu PKCE S256
    Dev->>Dev: Tự tìm RFC 7636 → implement code_challenge
    Note over Dev: ⚠ Security gap có thể bị exploit`,

  quiz: {
    question: "Trong diagram CÓ MCP phía trên, LLM gọi MCP Librarian tìm 'oauth2 PKCE flow' → nhận verified snippets kèm security notes (S256, CSRF protection). Diagram KHÔNG CÓ cho thấy LLM viết code thiếu security patterns. MCP Librarian khác gì so với Google Search khi tìm code snippets?",
    options: [
      "Google Search kết hợp với LLM verification (search → LLM review code quality → filter) cho kết quả tốt tương đương — LLM đủ thông minh để phân biệt code tốt/xấu từ search results, nên MCP Librarian chỉ thêm layer trung gian không cần thiết",
      "Khác biệt cốt lõi ở 'Curated Quality'. MCP Librarian fetch code trực tiếp từ Internal Design System hoặc Team's Best Practices, đảm bảo 100% tuân thủ Architecture. Trong khi Web Search trả về code StackOverflow cũ tiềm ẩn memory leaks/kém bảo mật.",
      "Với các LLM model hiện đại (GPT-4, Gemini Pro), chất lượng code generation từ parametric knowledge đã vượt qua cả verified snippets — vì model đã được train trên hàng triệu security-reviewed repositories, implicit knowledge đủ tối ưu",
      "MCP Librarian chỉ có hiệu quả khi snippet database đã có sẵn code cho use case cụ thể — với OAuth2 PKCE flow (use case niche), database có thể không có snippets phù hợp, và LLM phải fallback về Google Search giống như không có Librarian"
    ],
    correctIndex: 1,
    explanation: "MCP Librarian cung cấp code verified + curated: đã kiểm tra security, compatibility, best practices. Google Search trả về code từ nhiều nguồn — có thể outdated, insecure, hoặc sai.",
    theory: "Curated Knowledge vs Open Search: trong Agentic SE, độ tin cậy của code source rất quan trọng. MCP Librarian là ví dụ của 'verified knowledge base' — mỗi snippet đã qua review. Nguyên tắc: Agent nên ưu tiên sources có độ tin cậy cao."
  }
};
