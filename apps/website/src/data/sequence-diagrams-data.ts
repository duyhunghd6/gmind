/**
 * Sequence Diagrams Data — File chuyên chứa các mermaid sequence diagrams
 * cho trang index (và các trang khác).
 *
 * Cách thêm diagram mới:
 *   1. Thêm entry vào mảng `sequenceDiagrams`
 *   2. Đảm bảo `id` là unique
 *   3. `mermaidCode` chứa cú pháp mermaid hợp lệ
 */

/* ──────── Types ──────── */
export interface SequenceDiagram {
  /** Unique identifier */
  id: string;
  /** Tên hiển thị */
  title: string;
  /** Mô tả ngắn */
  description: string;
  /** Category để nhóm và lọc */
  category: "agent-loop" | "mcp-comparison" | "skill-comparison" | "custom";
  /** Accent color token */
  accent: "cyan" | "teal" | "amber" | "rose";
  /** Mermaid code (sequenceDiagram syntax) */
  mermaidCode: string;
}

/* ──────── Diagrams ──────── */
export const sequenceDiagrams: SequenceDiagram[] = [
  /* ── 1. Agent Loop ── */
  {
    id: "agent-loop",
    title: "Luồng Coding Agent ↔ LLM",
    description:
      "Gemini CLI khởi tạo ngữ cảnh, chạy Agent Loop với LLM, và hoàn thành task.",
    category: "agent-loop",
    accent: "amber",
    mermaidCode: `sequenceDiagram
    autonumber
    actor User
    participant CLI as Gemini CLI
    participant FS as Local File System (.agents/)
    participant MCP_Server as MCP Servers
    participant LLM as Gemini LLM

    %% Initialization Phase
    Note over CLI,FS: 1. Initialization & Context Loading
    CLI->>FS: Load Project Codebase
    FS-->>CLI: Return file structure & metadata
    CLI->>FS: Load .agents/rules
    Note right of FS: Defines project guardrails, style, and behavior
    CLI->>FS: Load .agents/skills
    Note right of FS: Custom executable functions/tools
    CLI->>FS: Load .agents/workflows
    Note right of FS: Multi-step predefined processes
    CLI->>FS: Load .agents/MCP
    Note right of FS: Model Context Protocol configurations

    CLI->>MCP_Server: Initialize external tool/data connections via MCP
    Note over CLI: CLI builds system prompt & tool definitions

    %% Waiting Phase
    CLI->>User: Ready. Waiting for input...
    User->>CLI: Enter Prompt (e.g., "Implement a new feature")

    %% Agent Loop Phase
    Note over CLI,LLM: 2. Agent Loop (Process Prompt)
    CLI->>LLM: Send System Context (Rules, Available Tools) + User Prompt

    loop Until Task Complete
        LLM-->>CLI: LLM Response (Thought Process + Tool Call)

        alt Tool Call is a Skill/Workflow/MCP Action
            Note over CLI: Intercept tool call
            CLI->>FS: Read/Write files or Execute Skill
            FS-->>CLI: Local execution result
            CLI->>MCP_Server: Fetch external data / run MCP tool
            MCP_Server-->>CLI: MCP execution result
            CLI->>LLM: Send execution results back to LLM

        else Tool Call is retry_completion
            Note over LLM,CLI: Task finished or needs final verification
            LLM-->>CLI: tool_call: retry_completion
            Note over CLI: Loop terminates
        end
    end

    %% Completion Phase
    Note over CLI,User: 3. Completion
    CLI->>User: Display final response / Code applied successfully`,
  },

  /* ── 2. MCP Figma — CÓ MCP ── */
  {
    id: "mcp-figma-with",
    title: "MCP Figma — CÓ MCP",
    description:
      "LLM trực tiếp đọc design tokens, component specs từ Figma — không cần developer copy-paste.",
    category: "mcp-comparison",
    accent: "teal",
    mermaidCode: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant CLI as Agentic IDE
    participant MCP as MCP Figma Server
    participant Figma as Figma API
    participant LLM as Gemini LLM

    Dev->>CLI: "Implement login form theo design Figma"
    CLI->>LLM: User Prompt + Available Tools (incl. MCP Figma)
    LLM->>CLI: tool_call: figma.getFileComponents("login-page")
    CLI->>MCP: getFileComponents("login-page")
    MCP->>Figma: GET /v1/files/{key}/components
    Figma-->>MCP: Components: Button, Input, Card (colors, spacing, typography)
    MCP-->>CLI: Structured component data (JSON)
    CLI->>LLM: Component specs: padding=16px, radius=8px, color=#0EA5E9...

    LLM->>CLI: tool_call: figma.getStyleTokens("design-system")
    CLI->>MCP: getStyleTokens("design-system")
    MCP->>Figma: GET /v1/files/{key}/styles
    Figma-->>MCP: Design tokens (colors, typography, effects)
    MCP-->>CLI: Token data
    CLI->>LLM: Full design token set

    Note over LLM: LLM has EXACT design specs — no guessing
    LLM->>CLI: Generate code matching Figma pixel-perfect
    CLI->>Dev: ✅ Login form matches Figma design 100%`,
  },

  /* ── 3. KHÔNG CÓ MCP Figma ── */
  {
    id: "mcp-figma-without",
    title: "KHÔNG CÓ MCP Figma",
    description:
      "Developer tự đọc Figma, copy-paste giá trị, mô tả bằng lời — dễ sai, tốn thời gian.",
    category: "mcp-comparison",
    accent: "rose",
    mermaidCode: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant Browser as Figma (Browser)
    participant CLI as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>Browser: Mở Figma, inspect từng element
    Note over Dev,Browser: Đọc thủ công: padding, color, font-size, border-radius...
    Dev->>CLI: "Tạo login form, padding 16px, màu xanh, bo góc 8px, font Inter..."
    Note over Dev: ⚠ Có thể quên hoặc mô tả sai giá trị
    CLI->>LLM: User prompt (mô tả bằng text, KHÔNG có data cấu trúc)

    Note over LLM: LLM phải ĐOÁN các giá trị không được đề cập
    LLM->>CLI: Generate code (best-effort, có thể sai spacing/color)
    CLI->>Dev: Code output

    Dev->>Browser: So sánh thủ công với Figma
    Note over Dev: ❌ Sai màu? Sai padding? Sai font-weight?
    Dev->>CLI: "Sửa lại: padding phải 16px không phải 12px, màu #0EA5E9..."
    CLI->>LLM: Correction prompt
    LLM->>CLI: Code sửa lại
    Note over Dev,CLI: 🔄 Lặp lại nhiều lần cho đến khi khớp Figma`,
  },

  /* ── 4. UI Testing — CÓ Skill ── */
  {
    id: "ui-testing-with-skill",
    title: "UI Testing — CÓ Agent Skill + Browser Tools",
    description:
      "LLM tự mở browser, đọc DOM, tạo actions, chạy test tự động — không cần viết test thủ công.",
    category: "skill-comparison",
    accent: "teal",
    mermaidCode: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant CLI as Agentic IDE
    participant LLM as Gemini LLM
    participant Browser as Chrome (CDP)
    participant DOM as Page DOM

    Dev->>CLI: "Test login form: happy path + validation errors"
    CLI->>LLM: Prompt + Available Tools (incl. browser_open, DOM tools)

    Note over LLM: Đọc SKILL.md → hiểu UI testing patterns
    LLM->>CLI: tool_call: browser_open("http://localhost:3000/login")
    CLI->>Browser: Launch Chrome via CDP
    Browser-->>CLI: Page loaded

    LLM->>CLI: tool_call: browser_get_dom()
    CLI->>DOM: Query DOM tree
    DOM-->>CLI: Clickable elements: [#email-input, #password-input, #submit-btn]
    CLI->>LLM: DOM snapshot with interactive elements

    LLM->>CLI: tool_call: browser_type("#email-input", "test@example.com")
    CLI->>Browser: Type into email field
    LLM->>CLI: tool_call: browser_type("#password-input", "password123")
    CLI->>Browser: Type into password field
    LLM->>CLI: tool_call: browser_click("#submit-btn")
    CLI->>Browser: Click submit
    Browser-->>CLI: Navigation to /dashboard

    LLM->>CLI: tool_call: browser_screenshot()
    CLI->>Browser: Capture screenshot
    Browser-->>CLI: screenshot.png
    CLI->>LLM: Screenshot + current URL = /dashboard

    Note over LLM: ✅ Login success verified
    LLM->>CLI: Generate test report + E2E test file
    CLI->>Dev: ✅ 3/3 test cases passed, test file saved`,
  },

  /* ── 5. UI Testing — KHÔNG CÓ Skill ── */
  {
    id: "ui-testing-without-skill",
    title: "UI Testing — KHÔNG CÓ Skill + Browser Tools",
    description:
      "Developer viết test thủ công, LLM đoán DOM structure, không thể verify kết quả.",
    category: "skill-comparison",
    accent: "rose",
    mermaidCode: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant CLI as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>CLI: "Viết test cho login form"
    CLI->>LLM: Prompt (KHÔNG có browser tools, KHÔNG có DOM data)

    Note over LLM: ⚠ Không thể mở browser, không biết DOM thực tế
    LLM->>CLI: Generate test code (đoán selectors: "#email", "#password"...)
    Note over LLM: Dựa trên convention — có thể sai selector
    CLI->>Dev: Test file (chưa verify)

    Dev->>Dev: Chạy test thủ công
    Note over Dev: ❌ Selector sai? Element chưa render? Timing issue?
    Dev->>CLI: "Sửa selector: không phải #email mà là [data-testid='email-input']"
    CLI->>LLM: Correction
    LLM->>CLI: Test sửa lại

    Dev->>Dev: Chạy test lại
    Note over Dev: 🔄 Debug thủ công — không biết page trông thế nào
    Note over Dev: ⚠ Không có screenshot → khó debug visual issues`,
  },
];

/* ──────── Helpers ──────── */

/** Lấy diagrams theo category */
export function getDiagramsByCategory(
  category: SequenceDiagram["category"]
): SequenceDiagram[] {
  return sequenceDiagrams.filter((d) => d.category === category);
}

/** Lấy 1 diagram theo id */
export function getDiagramById(
  id: string
): SequenceDiagram | undefined {
  return sequenceDiagrams.find((d) => d.id === id);
}
