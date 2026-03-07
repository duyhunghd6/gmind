import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "23",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "i18n String Extraction",
  description: "Agent Skill tự động extract strings, generate PO/JSON files — thay vì tìm strings thủ công.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/i18n-extractor

    Dev->>IDE: "Extract tất cả strings cần dịch trong src/"
    IDE->>LLM: Prompt + Loaded Skill [i18n-extractor]

    LLM->>IDE: tool_call: bash("node .agents/skills/i18n-extractor/scripts/extract.js src/ --output locales/en.json")
    IDE->>LLM: Extracted 127 strings → locales/en.json

    LLM->>IDE: tool_call: view_file("locales/en.json")
    IDE->>LLM: login.title: Login, login.submit: Submit, ...

    LLM->>IDE: tool_call: edit_file → Replace hardcoded strings với t("login.title")
    LLM->>IDE: "Extracted 127 strings, replaced trong 23 files. Tạo locales/vi.json template."
    IDE->>Dev: ✅ i18n setup hoàn chỉnh — 127 strings extracted`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Extract tất cả strings cần dịch trong src/"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Phải đọc từng file để tìm strings
    LLM->>IDE: "Tôi sẽ đọc từng file và liệt kê strings..."
    Note over LLM: Context window giới hạn → không đọc hết 23 files
    LLM->>IDE: "Tìm được 45 strings trong 8 files đã đọc"
    IDE->>Dev: ⚠ Chỉ tìm 45/127 strings — bỏ sót 82

    Dev->>Dev: Phải review lại manual → mất nửa ngày`,

  quiz: {
    question: "Trong diagram CÓ Agent Skill phía trên, Skill dùng AST parser script để extract tất cả i18n strings chính xác; diagram KHÔNG CÓ Skill cho thấy LLM bỏ sót strings khi đọc code thủ công. Tại sao dùng SCRIPT chuyên dụng hiệu quả hơn để LLM tự đọc code?",
    options: [
      "Bởi vì kịch bản AST Parser có tính Quyết định, nó luôn trích xuất chính xác 100%. Còn LLM có hệ số Temperature nên chạy 10 lần ra 10 bản lỗi i18n khác nhau.",
      "Nhằm chống tràn Token Context Window và chống quên giữa chừng (Lost in the middle). Script hỗ trợ cày nát các file cực nhanh, rẻ và chuẩn tuyệt đối.",
      "Bộ phân tách từ Tokenizer của LLM thường xuyên bị nhầm lẫn dấu ngoặc kép của String Literals. Điều này khiến Attention Mechanism rớt mất nội dung chữ.",
      "Ngôn ngữ TypeScript/JSX chỉ có thể phân giải được nếu bộ cài Node.js trên máy quét của LLM phải trùng với Project gốc tới từng dấu chấm."
    ],
    correctIndex: 1,
    explanation: "Context Window: LLM có giới hạn tokens (128K-1M). Nếu codebase có 50+ files, LLM không thể đọc hết. Script chạy ngoài LLM → không bị giới hạn → extract 100% strings.",
    theory: "Complementary Roles: LLM giỏi suy luận (reasoning) nhưng bị giới hạn context. Scripts giỏi xử lý toàn bộ (exhaustive processing) nhưng không suy luận. Agent Skill kết hợp cả hai: script extract data → LLM phân tích và quyết định."
  }
};
