import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "29",
  group: "subagent",
  groupLabel: "SubAgent / Task",
  title: "Convert 10 files Go sang Rust",
  description: "Antigravity dùng tool_call tạo Task mới cho mỗi file — mỗi Task có context riêng, tránh làm loãng Context Window chính.",
  accent: "rose",
  withLabel: "CÓ SubAgent/Task",
  withoutLabel: "KHÔNG CÓ SubAgent/Task",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Task as SubAgent Task

    Dev->>IDE: "Convert 10 files *.go sang *.rs"
    IDE->>LLM: Prompt + tool: browser_subagent

    Note over LLM: Chia nhỏ: 1 file = 1 Task riêng biệt
    LLM->>IDE: tool_call: browser_subagent(Task 1 - convert auth.go)
    IDE->>Task: Spawn Task 1 (context riêng)
    Task-->>IDE: auth.rs (hoàn thành)

    LLM->>IDE: tool_call: browser_subagent(Task 2 - convert db.go)
    IDE->>Task: Spawn Task 2 (context riêng)
    Task-->>IDE: db.rs (hoàn thành)

    Note over LLM: ... Task 3-10 tương tự ...
    LLM->>IDE: tool_call: browser_subagent(Task 10 - convert main.go)
    IDE->>Task: Spawn Task 10 (context riêng)
    Task-->>IDE: main.rs (hoàn thành)

    Note over LLM: Context Window chính: sạch, chỉ chứa kết quả
    IDE->>Dev: 10/10 files converted thành công`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Convert 10 files *.go sang *.rs"
    IDE->>LLM: Prompt (KHÔNG có SubAgent/Task)

    Note over LLM: Phải xử lý tuần tự trong 1 context
    LLM->>IDE: Đọc auth.go (500 dòng vào context)
    LLM->>IDE: Viết auth.rs (500 dòng vào context)
    LLM->>IDE: Đọc db.go (400 dòng vào context)
    LLM->>IDE: Viết db.rs (400 dòng vào context)

    Note over LLM: Context Window: 1800 dòng code Go + Rust
    LLM->>IDE: Đọc handler.go (600 dòng)

    Note over LLM: Context tích lũy 2400+ dòng => LOÃNG
    LLM->>IDE: Viết handler.rs (lỗi: nhầm syntax Go vào Rust)

    Note over Dev: Token tiêu tốn x3, hallucination tăng dần
    LLM->>IDE: File 5-10: chất lượng giảm dần do context ô nhiễm
    IDE->>Dev: Kết quả: 4/10 đúng, 6/10 cần sửa tay`,

  quiz: {
    question: "Tại sao việc tạo SubAgent/Task riêng cho mỗi file giúp giảm hallucination khi convert code?",
    options: [
      "A. SubAgent chạy nhanh hơn vì dùng GPU riêng",
      "B. Mỗi Task có Context Window riêng — code Go file trước KHÔNG tồn tại trong context file sau",
      "C. SubAgent dùng model LLM khác mạnh hơn",
      "D. Task tự động chạy test nên phát hiện lỗi sớm"
    ],
    correctIndex: 1,
    explanation: "Mỗi SubAgent/Task nhận context riêng biệt. Khi convert file thứ 5, context KHÔNG chứa code của file 1-4. Điều này giữ context sạch, tập trung, giảm hallucination từ code nhiễu.",
    theory: "Context Window Isolation là nguyên tắc cốt lõi: thay vì nhét tất cả vào 1 context (gây token bloat + context dilution), chia thành N task nhỏ với context riêng. Antigravity gọi đây là 'browser_subagent' — tương đương SubAgent pattern nhưng implement qua tool_call."
  }
};
