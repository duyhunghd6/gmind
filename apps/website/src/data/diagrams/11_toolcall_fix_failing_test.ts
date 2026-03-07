import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "11",
  group: "code",
  groupLabel: "Code & Debugging",
  title: "Fix failing test",
  description: "LLM chạy npm test → đọc assertion error → sửa code theo actual vs expected.",
  accent: "teal",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Test as Test Runner

    Dev->>IDE: "Test bị fail, fix giúp"
    IDE->>LLM: Prompt + Tools [bash, view_file, edit_file]

    LLM->>IDE: tool_call: bash(npm test --verbose)
    IDE->>Test: npm test
    Test-->>IDE: FAIL: formatPrice(1000) expected "1,000đ" but got "1000đ"
    IDE->>LLM: Test fail: expected "1,000đ", got "1000đ" — thiếu format số

    LLM->>IDE: tool_call: view_file("src/utils/format.ts")
    IDE->>LLM: function formatPrice(n) returns n + "đ"

    Note over LLM: Thiếu Intl.NumberFormat → thêm thousand separator
    LLM->>IDE: tool_call: edit_file → dùng Intl.NumberFormat
    LLM->>IDE: tool_call: bash(npm test)
    Test-->>IDE: PASS: All 12 tests passed
    IDE->>Dev: ✅ Test pass — thêm number formatting`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Test bị fail, fix giúp"
    IDE->>LLM: Prompt (KHÔNG có tools)

    Note over LLM: ⚠ Không biết test nào fail, error gì
    LLM->>IDE: "Hãy chạy npm test và cho tôi biết error"
    IDE->>Dev: Yêu cầu Dev copy error

    Dev->>Dev: Chạy npm test → copy output
    Dev->>IDE: "formatPrice(1000) expected 1,000đ got 1000đ"
    LLM->>IDE: "Hãy paste code formatPrice cho tôi"
    Dev->>Dev: Tìm file → copy code → paste
    Dev->>IDE: Paste code
    LLM->>IDE: "Thêm Intl.NumberFormat"
    Note over Dev: 🔄 3 vòng copy-paste, LLM không tự verify`,

  quiz: {
    question: "Trong diagram CÓ tool_call phía trên, sau khi sửa formatPrice(), LLM tự chạy lại 'npm test' và xác nhận '12/12 tests passed' trước khi báo developer. So sánh với diagram KHÔNG CÓ tools (dev phải 3 vòng copy-paste, LLM không tự verify). Tại sao bước chạy lại test tự động quan trọng?",
    options: [
      "A. Chạy lại test tạo thêm tokens trong conversation history — giúp LLM có thêm 'evidence' trong context window cho các task tương tự trong tương lai, hoạt động như implicit few-shot learning từ chính output trước đó",
      "B. Verification Loop — LLM tự kiểm chứng code đã sửa ĐÚNG bằng cách chạy test, không phụ thuộc human confirm",
      "C. Test runner (Jest/Vitest) cần warm-up run đầu tiên để initialize module graph và JIT-compile TypeScript — kết quả run đầu tiên thường unreliable do cold start. Run thứ hai cho kết quả chính xác hơn nhờ hot cache",
      "D. IDE Agentic policy enforce 'Edit-Verify Contract': mỗi file modification (edit_file) PHẢI được follow bởi verification command (bash) trong cùng tool_call chain — nếu thiếu, IDE rollback edit và báo policy violation"
    ],
    correctIndex: 1,
    explanation: "Verification Loop: LLM sửa code → chạy test → nếu fail thì sửa tiếp → chạy test lại. Đây là tự kiểm chứng (self-verification) — LLM không dừng lại sau khi sửa mà đảm bảo kết quả đúng.",
    theory: "Self-Verification là nguyên tắc quan trọng trong Agentic SE: Agent KHÔNG chỉ làm, mà phải KIỂM TRA kết quả. Đây tương đương với 'Verification Gate' trong SAFe 6.0 — code agent ≠ reviewer agent."
  }
};
