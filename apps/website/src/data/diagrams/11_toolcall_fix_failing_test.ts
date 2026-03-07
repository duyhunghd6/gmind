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
      "Lệnh chạy Test sinh ra thêm lượng lớn Token log. Điều này vô tình tạo hiệu ứng Few-shot Learning ảo giúp LLM đoán mò tốt hơn trong task kế tiếp.",
      "Vòng lặp Agentic Verification Loop. Thay vì chờ người duyệt, Agent tự chạy Test Suite để kiểm chứng. Nếu Fail, nó tự đọc log để sửa tiếp thành chu trình khép kín.",
      "Test Runner luông cần phải khởi động (warm-up) ở vòng đầu tiên tải thư viện. Phải ép LLM chạy liên tiếp vòng 2 mới ra kết quả chính xác thực sự.",
      "Chính sách bảo mật IDE ép buộc 1 lệnh Edit phải đi kèm 1 lệnh Test liên tiếp. Nếu thiếu cặp cấu trúc này IDE sẽ chối từ không cho sửa mã nguồn."
    ],
    correctIndex: 1,
    explanation: "Verification Loop: LLM sửa code → chạy test → nếu fail thì sửa tiếp → chạy test lại. Đây là tự kiểm chứng (self-verification) — LLM không dừng lại sau khi sửa mà đảm bảo kết quả đúng.",
    theory: "Self-Verification là nguyên tắc quan trọng trong Agentic SE: Agent KHÔNG chỉ làm, mà phải KIỂM TRA kết quả. Đây tương đương với 'Verification Gate' trong SAFe 6.0 — code agent ≠ reviewer agent."
  }
};
