import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "18",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "LLM tự viết Agent Skills (Self-Improvement)",
  description: "LLM phát hiện pattern lặp lại → tự tạo SKILL.md + scripts → lần sau dùng lại. Self-improvement loop.",
  accent: "cyan",
  withLabel: "CÓ khả năng Self-Writing",
  withoutLabel: "KHÔNG CÓ Self-Writing",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System

    Dev->>IDE: "Convert SVG sang PNG (lần thứ 3 hỏi việc này)"
    IDE->>LLM: Prompt + context: đã hỏi 3 lần tương tự

    Note over LLM: Pattern lặp → tạo Skill để tái sử dụng
    LLM->>IDE: tool_call: bash("mkdir -p .agents/skills/svg-converter/scripts")
    LLM->>IDE: tool_call: edit_file → Viết SKILL.md hướng dẫn convert SVG
    LLM->>IDE: tool_call: edit_file → Viết scripts/convert.sh (dùng Inkscape/rsvg)

    Note over LLM: Skill đã tạo → dùng ngay
    LLM->>IDE: tool_call: bash(".agents/skills/svg-converter/scripts/convert.sh input.svg output.png")
    IDE->>Dev: ✅ Converted + Skill mới cho lần sau

    Note over IDE: Lần thứ 4: LLM tự đọc Skill → chạy script ngay`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Convert SVG sang PNG"
    IDE->>LLM: Prompt (lần 1)
    LLM->>IDE: "Dùng Inkscape: inkscape input.svg --export-png=output.png"

    Note over Dev: 2 tuần sau...
    Dev->>IDE: "Convert SVG sang PNG" (lần 2)
    LLM->>IDE: "Dùng rsvg-convert: rsvg-convert input.svg -o output.png"
    Note over LLM: ⚠ Trả lời KHÁC lần trước — không nhất quán

    Note over Dev: 1 tháng sau...
    Dev->>IDE: "Convert SVG sang PNG" (lần 3)
    LLM->>IDE: "Hãy dùng ImageMagick: convert input.svg output.png"
    Note over Dev: ⚠ Mỗi lần câu trả lời khác → không học được`,

  quiz: {
    question: "Khái niệm 'Self-Improvement' trong Agentic Coding nghĩa là gì?",
    options: [
      "A. LLM tự huấn luyện lại bằng dữ liệu mới",
      "B. LLM phát hiện pattern lặp → tạo Agent Skills + Rules để tái sử dụng — cải thiện qua TỪNG PHIÊN làm việc",
      "C. LLM tự update phiên bản mới hơn",
      "D. LLM học từ feedback của user"
    ],
    correctIndex: 1,
    explanation: "Self-Improvement: LLM không thay đổi weights (parametric knowledge), nhưng tạo Skills/Rules lưu trên disk → đọc lại ở phiên sau. Đây là 'external memory' cho AI — giống developer viết documentation cho chính mình.",
    theory: "Agent Memory Layer (gmind): LLM có 2 loại knowledge — Parametric (trong weights, không đổi) và Contextual (từ Skills, Rules, Workflows đọc mỗi phiên). Self-improvement = mở rộng Contextual Knowledge liên tục. Đây là 1 trong 4 trụ cột của gmind."
  }
};
