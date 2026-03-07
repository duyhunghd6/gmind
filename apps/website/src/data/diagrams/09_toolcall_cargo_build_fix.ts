import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "09",
  group: "code",
  groupLabel: "Code & Debugging",
  title: "Fix lỗi cargo build",
  description: "LLM chạy cargo build → đọc compiler error → sửa code chính xác. Không cần đoán.",
  accent: "teal",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System
    participant Cargo as cargo build

    Dev->>IDE: "Fix lỗi compile trong project Rust"
    IDE->>LLM: Prompt + Tools [bash, edit_file, view_file]

    LLM->>IDE: tool_call: bash(cargo build --stderr)
    IDE->>Cargo: cargo build
    Cargo-->>IDE: error[E0308]: mismatched types at src/handler.rs:42:5
    IDE->>LLM: Error E0308: mismatched types, src/handler.rs line 42

    LLM->>IDE: tool_call: view_file("src/handler.rs", lines=35-50)
    IDE->>FS: Read src/handler.rs:35-50
    FS-->>IDE: fn handle() -> String (return Ok(data))
    IDE->>LLM: Thấy return Ok(data), return type là String

    LLM->>IDE: tool_call: edit_file(handler.rs, line 42, fix return type)
    IDE->>FS: Edit file
    LLM->>IDE: tool_call: bash(cargo build --stderr)
    IDE->>Cargo: cargo build
    Cargo-->>IDE: Compiling... Finished successfully
    IDE->>Dev: ✅ Sửa xong — cargo build thành công`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Fix lỗi compile trong project Rust"
    IDE->>LLM: Prompt (KHÔNG có tools)

    Note over LLM: ⚠ Không biết cấu trúc project
    LLM->>IDE: "Hãy chạy cargo build và paste error cho tôi"
    IDE->>Dev: Yêu cầu Dev tự chạy

    Dev->>Dev: Chạy cargo build → copy error
    Dev->>IDE: Paste error: E0308 src/handler.rs:42
    LLM->>IDE: "Có thể return type sai. Hãy paste code dòng 35-50"
    Dev->>Dev: Mở file → copy code → paste
    Dev->>IDE: Code: fn handle() -> String (return Ok(data))

    Note over LLM: Giờ mới thấy code → phân tích
    LLM->>IDE: "Đổi Ok(data) thành data.to_string()"
    Note over Dev: 🔄 4 lượt copy-paste thay vì 0`,

  quiz: {
    question: "Trong diagram CÓ tool_call phía trên, LLM thực hiện: cargo build → đọc error E0308 → view_file xem code → edit_file sửa → cargo build lại → thành công. Vòng lặp 'build → đọc error → sửa → build lại' này minh hoạ pattern nào?",
    options: [
      "Waterfall Sequential — LLM thực hiện pipeline tuyến tính: đọc toàn bộ source code → phân tích tĩnh tìm lỗi → sửa tất cả lỗi cùng lúc → build 1 lần duy nhất cuối cùng. Không cần vòng lặp vì LLM đã phân tích đủ context ở bước đầu",
      "Mô hình Self-Correction Agent sử dụng Compiler Error làm Ground Truth Feedback. Lỗi stack-trace được inject ngược lại vào context window, giúp LLM nhận diện sai lầm syntax/type và lặp lại quá trình Code-Test-Fix cho đến khi build pass hoàn toàn.",
      "Test-Driven Development (TDD) — LLM viết unit test cho function handler TRƯỚC, rồi sửa code cho đến khi test pass. Cargo build chỉ là bước verify cuối cùng sau khi tất cả tests đã green, không phải trọng tâm của feedback loop",
      "Static Analysis Loop — LLM sử dụng clippy (Rust linter) kết hợp với AST parsing để phát hiện lỗi TRƯỚC khi compile. Cargo build trong diagram thực chất là clippy check, không phải full compilation — vì static analysis nhanh hơn và đủ để tìm type errors"
    ],
    correctIndex: 1,
    explanation: "LLM tạo vòng lặp: cargo build → đọc error → sửa code → cargo build lại → kiểm tra success. Compiler là 'oracle' cho LLM biết code đúng hay sai.",
    theory: "Compile Feedback Loop là dạng đặc biệt của ReAct: LLM dùng compiler/linter làm 'tool kiểm chứng'. Mỗi vòng lặp thu hẹp không gian lỗi cho đến khi code compile thành công. Đây là lý do Agentic Coding hiệu quả hơn traditional prompting."
  }
};
