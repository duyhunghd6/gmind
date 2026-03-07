import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "13",
  group: "mcp",
  groupLabel: "MCP Server",
  title: "MCP Figma → UI code pixel-perfect",
  description: "LLM gọi MCP Figma Server đọc design tokens, components trực tiếp — không cần developer copy-paste.",
  accent: "rose",
  withLabel: "CÓ MCP Figma",
  withoutLabel: "KHÔNG CÓ MCP Figma",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant MCP as MCP Figma Server
    participant Figma as Figma API

    Dev->>IDE: "Implement login form theo design Figma"
    IDE->>LLM: Prompt + Tools [MCP: figma]

    LLM->>IDE: tool_call: figma.getFileComponents("login-page")
    IDE->>MCP: getFileComponents("login-page")
    MCP->>Figma: GET /v1/files/[key]/components
    Figma-->>MCP: Components: Button, Input, Card
    MCP-->>IDE: Structured component data (JSON)
    IDE->>LLM: Design specs: padding=16px, radius=8px, color=#3B82F6

    Note over LLM: Có design tokens chính xác → code pixel-perfect
    LLM->>IDE: Generate code: CSS + React components
    IDE->>Dev: ✅ UI khớp 100% với Figma design`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Implement login form theo design Figma"
    IDE->>LLM: Prompt (KHÔNG có MCP Figma)

    Note over LLM: ⚠ Không truy cập được Figma
    LLM->>IDE: "Hãy mô tả design hoặc paste screenshot"
    IDE->>Dev: Yêu cầu mô tả thủ công

    Dev->>Dev: Mở Figma → inspect từng element
    Dev->>Dev: Copy: padding=16px, radius=8px, color=#3B82F6
    Dev->>IDE: Paste specs
    LLM->>IDE: Generate code (có thể sai vì specs không đầy đủ)
    Note over Dev: ⚠ Thiếu hover states, animation, responsive specs
    Dev->>Dev: So sánh → chỉnh sửa thủ công nhiều lần`,

  quiz: {
    question: "Trong diagram CÓ MCP phía trên, LLM gọi 'figma.getFileComponents()' qua MCP Figma Server — server này kết nối Figma API và trả về structured JSON. Đây không phải tool_call thông thường mà là MCP (Model Context Protocol). MCP khác gì so với tool_call thông thường?",
    options: [
      "A. MCP có tốc độ thực thi nhanh hơn tool_call thông thường",
      "B. MCP là GIAO THỨC CHUẨN kết nối LLM ↔ External Services — mỗi MCP Server đóng gói NHIỀU tools thành 1 service thống nhất",
      "C. MCP chỉ dành riêng cho Figma và design tools, không dùng cho service khác",
      "D. MCP thay thế toàn bộ tool_call — khi có MCP thì không cần tool_call nữa"
    ],
    correctIndex: 1,
    explanation: "MCP là protocol tiêu chuẩn (như USB cho AI): mọi service implement MCP spec → LLM kết nối được. Mỗi MCP Server expose nhiều tools. tool_call là cơ chế gọi hàm, MCP là cách đóng gói và kết nối.",
    theory: "MCP (Model Context Protocol) by Anthropic: giao thức chuẩn kết nối LLM với external services. MCP Server expose tools theo spec thống nhất → bất kỳ LLM nào support MCP đều dùng được. Tương tự USB-C: 1 chuẩn, nhiều thiết bị."
  }
};
