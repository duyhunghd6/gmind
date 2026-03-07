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
    question: "Diagram CÓ SubAgent phía trên cho thấy Antigravity tạo 10 Tasks riêng biệt — mỗi Task convert 1 file Go sang Rust với context riêng, không chia sẻ lẫn nhau. So sánh với diagram KHÔNG CÓ (convert tất cả 10 file trong 1 context chung). Tại sao cách chia nhỏ này giúp giảm hallucination?",
    options: [
      "Chiến thuật mở rộng ngang (Horizontal Scaling). Gọi hàng chục hàm API của LLM cùng lúc để tiết kiệm thời gian chờ đợi thay vì bắt người dùng gõ từng lệnh.",
      "Làm sạch Context Window bằng SubAgent. Ép mỗi Agent tự kỷ trong Sandbox với đúng 1 File duy nhất, tuyệt đối đứt đoạn Attention Bleeding để không bị lú lẫn râu ông nọ cắm cằm bà kia.",
      "Trang bị Model riêng biệt cho mỗi loại File. File Auth thì gọi Model tinh chỉnh bảo mật. File DB thì gọi Model trùm Data. SubAgent sinh ra để chọn Model cho đúng hệ.",
      "Lý do ăn tiền là có tích hợp vòng Feedback Loop. Mỗi Task tự động biết Build gõ lệnh Cargo Check ngay bên trong Context của Task để tự bắt lỗi chính mình."
    ],
    correctIndex: 1,
    explanation: "Mỗi SubAgent/Task nhận context riêng biệt. Khi convert file thứ 5, context KHÔNG chứa code của file 1-4. Điều này giữ context sạch, tập trung, giảm hallucination từ code nhiễu.",
    theory: "Context Window Isolation là nguyên tắc cốt lõi: thay vì nhét tất cả vào 1 context (gây token bloat + context dilution), chia thành N task nhỏ với context riêng. Antigravity gọi đây là 'browser_subagent' — tương đương SubAgent pattern nhưng implement qua tool_call."
  }
};
