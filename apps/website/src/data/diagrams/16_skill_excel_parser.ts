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
      "A. Agent Skill scripts được pre-compiled và cached bởi IDE runtime — khi LLM gọi skill lần đầu, IDE compile script; từ lần 2 trở đi chạy từ cache binary. Đây là lý do Skill nhanh hơn tool_call: cold start chỉ xảy ra 1 lần",
      "B. Skill là GÓI TRI THỨC gồm SKILL.md (hướng dẫn) + scripts/ (công cụ) + examples/ — dạy LLM CÁCH giải quyết một loại bài toán cụ thể",
      "C. Skill là alias/shortcut cho một chuỗi tool_calls đã được pre-configured — khi LLM gọi Skill 'excel-parser', IDE tự động expand thành 3 tool_calls (download → convert → read) mà LLM không cần biết internal implementation",
      "D. Skill bao gồm tool_call bên trong: SKILL.md chỉ là wrapper documentation, còn functionality thực sự nằm ở tool_call: bash() bên trong. Vì vậy Skill và tool_call là cùng một thứ — Skill chỉ thêm layer README cho LLM đọc trước"
    ],
    correctIndex: 1,
    explanation: "Agent Skill = Knowledge Package: SKILL.md dạy LLM 'khi gặp file .xlsx thì dùng script X với args Y'. Đây là tri thức (knowledge), không chỉ là tool (công cụ).",
    theory: "Agent Skill cấu trúc: SKILL.md (entry point — LLM đọc để hiểu) + scripts/ (executable tools) + examples/ (reference). LLM đọc SKILL.md → hiểu context → quyết định dùng script nào với args nào. Đây là dạng 'programmatic knowledge transfer' cho AI."
  }
};
