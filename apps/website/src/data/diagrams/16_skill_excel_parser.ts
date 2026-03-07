import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "16",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Phân tích báo cáo Excel (.xlsx)",
  description: "LLM không đọc được file binary — Agent Skill cung cấp script convert_excel_to_txt.py để xử lý.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/excel-parser
    participant Script as convert_excel_to_txt.py

    Dev->>IDE: "Phân tích doanh thu Q3 trong report.xlsx"
    IDE->>LLM: Prompt + Loaded Skill [excel-parser]

    Note over LLM: Đọc SKILL.md → biết cách xử lý .xlsx
    LLM->>IDE: tool_call: bash("python .agents/skills/excel-parser/scripts/convert_excel_to_txt.py report.xlsx --output /tmp/report.txt")
    IDE->>Script: Convert Excel → plaintext
    Script-->>IDE: /tmp/report.txt created (structured data)

    LLM->>IDE: tool_call: view_file("/tmp/report.txt")
    IDE->>LLM: Doanh thu Q3: 12.5 tỷ, chi phí: 8.2 tỷ, lợi nhuận: 4.3 tỷ

    LLM->>IDE: "Phân tích: Doanh thu Q3 tăng 15% so với Q2. Lợi nhuận ròng 34.4%..."
    IDE->>Dev: ✅ Phân tích chi tiết từ file Excel`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Phân tích doanh thu Q3 trong report.xlsx"
    IDE->>LLM: Prompt + file report.xlsx

    Note over LLM: ⚠ File .xlsx là binary — LLM không đọc được
    LLM->>IDE: "Tôi không thể đọc trực tiếp file .xlsx. Hãy export sang CSV hoặc copy data dạng text."
    IDE->>Dev: ❌ LLM từ chối — không xử lý được binary

    Dev->>Dev: Mở Excel → Export CSV → paste vào IDE
    Dev->>IDE: Paste data CSV
    LLM->>IDE: Phân tích dữ liệu
    Note over Dev: ⚠ Mất formatting, formula, multiple sheets`,

  quiz: {
    question: "Trong diagram CÓ Agent Skill phía trên, Skill cung cấp cả SKILL.md (hướng dẫn xử lý file .xlsx) và script 'convert_excel_to_txt.py' (công cụ chuyển đổi) — một gói kiến thức hoàn chỉnh. Agent Skill khác gì so với tool_call thông thường?",
    options: [
      "Tất cả Script trong Agent Skill đều được dịch mã máy (Compile) và lưu Cache từ trước. Đây là một cơ chế chạy Binary siêu tốc độ so với các lệnh Bash thuần.",
      "Agent Skill đống gói như 'Knowledge Capsule'. Bao gồm quy luật, mã mẫu và script để Agent 'nạp' Domain Knowledge xử lý bài toán tức thì.",
      "Skill bản chất là Alias nối chuỗi nhiều Tool Calls. Gọi 1 phát LLM sẽ kích nổ 3 Tool (Tải → Đổi → Đọc) ẩn bên dưới tự động hóa toàn bộ.",
      "Hai khái niệm trên giống hệt nhau. SKILL.md vỏ bọc để ghi tài liệu Readme, mục đích chỉ để con người đọc còn IDE vẫn bắt buộc chạy Bash Tool bên trong."
    ],
    correctIndex: 1,
    explanation: "Agent Skill = Knowledge Package: SKILL.md dạy LLM 'khi gặp file .xlsx thì dùng script X với args Y'. Đây là tri thức (knowledge), không chỉ là tool (công cụ).",
    theory: "Agent Skill cấu trúc: SKILL.md (entry point — LLM đọc để hiểu) + scripts/ (executable tools) + examples/ (reference). LLM đọc SKILL.md → hiểu context → quyết định dùng script nào với args nào. Đây là dạng 'programmatic knowledge transfer' cho AI."
  }
};
