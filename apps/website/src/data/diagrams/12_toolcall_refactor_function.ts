import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "12",
  group: "code",
  groupLabel: "Code & Debugging",
  title: "Refactor function an toàn",
  description: "LLM đọc callers, đọc tests, rồi mới refactor — đảm bảo không phá vỡ codebase.",
  accent: "teal",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System

    Dev->>IDE: "Refactor hàm processOrder() — tách logic validation"
    IDE->>LLM: Prompt + Tools [grep, view, edit]

    LLM->>IDE: tool_call: view_file("src/order.ts")
    IDE->>FS: Read order.ts (200 lines)
    IDE->>LLM: Full function context

    LLM->>IDE: tool_call: grep_search("processOrder", "src/")
    IDE->>FS: Find all callers
    FS-->>IDE: 5 files import processOrder
    IDE->>LLM: 5 callers — cần giữ interface

    LLM->>IDE: tool_call: view_file("tests/order.test.ts")
    IDE->>LLM: 8 test cases cho processOrder

    Note over LLM: Hiểu đầy đủ: code + callers + tests
    LLM->>IDE: tool_call: edit_file → tách validateOrder() + processOrder()
    LLM->>IDE: tool_call: edit_file → update 5 callers
    LLM->>IDE: tool_call: bash("npm test")
    IDE->>Dev: ✅ Refactor xong — 8/8 tests pass, 5 callers updated`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Refactor hàm processOrder() — tách logic validation"
    IDE->>LLM: Prompt + paste code processOrder (KHÔNG có tools)

    Note over LLM: ⚠ Chỉ thấy 1 file — không biết ai gọi
    LLM->>IDE: Tách validateOrder() + sửa processOrder()
    IDE->>Dev: Code refactored

    Dev->>Dev: Apply code → 5 file khác bị lỗi import!
    Dev->>IDE: "5 files gọi processOrder bị lỗi"
    Note over LLM: Không biết có callers → không update
    LLM->>IDE: "Hãy paste từng file để tôi sửa"
    Note over Dev: 🔄 Mất context lớn → refactor không an toàn`,

  quiz: {
    question: "Trong diagram CÓ tool_call phía trên, LLM làm 3 bước trước khi sửa code: (1) view_file đọc processOrder(), (2) grep_search tìm 5 callers, (3) view_file đọc 8 test cases — rồi mới refactor. Tại sao LLM cần đọc callers và tests TRƯỚC KHI refactor?",
    options: [
      "Tải trước lượng lớn thư viện giúp LLM đẩy data vào bộ nhớ KV-cache của AI. Bước này chỉ dùng cho mục đích ép hiệu năng sinh Output cuối cùng.",
      "Việc sửa hàm dễ gây lỗi lan rộng. Chủ động tìm Callers và Tests cấp cho Agent 'Context Awareness' (nhận thức ngữ cảnh) để lường trước 'Blast Radius' và sửa đồng bộ hóa.",
      "Để tăng chất lượng ra quyết định, LLM luôn cần được bơm nhồi hàng ngàn dòng code dư thừa để Prompt đủ dài thì Output mới khỏi bị chung chung.",
      "Công cụ bảo vệ của bản thân IDE ngăn chặn (Lock) các thao tác ghi nếu LLM không triệu hồi view_file ít nhất 3 lần để rà soát thư mục root trước đó."
    ],
    correctIndex: 1,
    explanation: "Blast Radius: mỗi thay đổi code ảnh hưởng đến callers, tests, và downstream code. LLM cần hiểu toàn bộ scope trước khi sửa — giống developer phải kiểm tra 'ai dùng hàm này?' trước khi refactor.",
    theory: "Context Awareness là điểm khác biệt lớn nhất giữa Agentic Coding và traditional prompting. Với tools (grep, view_file), LLM có khả năng 'đọc codebase' giống developer — thay vì chỉ thấy đoạn code được paste vào."
  }
};
