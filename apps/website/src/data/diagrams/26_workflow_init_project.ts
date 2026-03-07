import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "26",
  group: "workflow",
  groupLabel: "Workflows",
  title: "Khởi tạo Project với /init-project",
  description: "Workflow /slash-command tự động: git init, beads init, tạo GEMINI.md, cài rules — thay vì copy prompt dài.",
  accent: "amber",
  withLabel: "CÓ Workflow",
  withoutLabel: "KHÔNG CÓ Workflow",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System

    Dev->>IDE: "/init-project"
    IDE->>LLM: Load workflow: .agents/workflows/init-project.md

    Note over LLM: Workflow có 8 bước rõ ràng
    LLM->>IDE: Step 1: bash("git init")
    LLM->>IDE: Step 2: bash("beads init")
    LLM->>IDE: Step 3: edit_file → Tạo GEMINI.md với rules chuẩn
    LLM->>IDE: Step 4: bash("mkdir -p .agents/skills .agents/workflows .agents/rules")
    LLM->>IDE: Step 5: edit_file → Tạo .agents/rules/code-style.md
    LLM->>IDE: Step 6: edit_file → Tạo .gitignore
    LLM->>IDE: Step 7: bash("pnpm init && pnpm add -D typescript")
    LLM->>IDE: Step 8: bash("git add -A && git commit -m 'init: project setup'")

    IDE->>Dev: ✅ Project khởi tạo hoàn chỉnh — 8 bước tự động`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Khởi tạo project mới cho tôi"
    IDE->>LLM: Prompt (KHÔNG có workflow)

    Note over LLM: ⚠ Không biết chuẩn project của team
    LLM->>IDE: "OK, tôi sẽ tạo project. Bạn muốn dùng gì? React? Next.js? TypeScript?"
    IDE->>Dev: Hỏi lại → mất thời gian

    Dev->>IDE: "TypeScript, pnpm, git"
    LLM->>IDE: Tạo project cơ bản — KHÔNG có beads, KHÔNG có .agents/
    Note over LLM: Quên GEMINI.md, quên rules, quên workflows
    IDE->>Dev: ⚠ Project thiếu: beads, rules, skills, workflows
    Dev->>Dev: Phải setup thủ công → mất 30 phút`,

  quiz: {
    question: "Diagram CÓ Workflow phía trên cho thấy /init-project chạy nhiều bước tuần tự: git init → beads init → tạo GEMINI.md → cài rules — quy trình đa bước có thứ tự. Workflow /slash-command khác gì so với Agent Skill?",
    options: [
      "Không bao hàm sự khác biệt logic. Đây chỉ là quy ước phân chia quy củ: Workflow dành cho Task to của cả Đội Nhóm, Skill dành cho Task nhỏ của một Thành viên.",
      "Workflow quy định một ống dẫn dây chuyền (Pipeline) rập khuôn chạy theo Step thứ tự tuyệt đối. Nó khác biệt với Agent Skill vốn là món vũ khí (Toolkit) nhặt lên xài khi cần.",
      "Workflow là loại siêu Nông Cạn chỉ chạy đúng 1 Lần Khởi tạo. Còn mọi Task lặp đi lặp lại hàng ngày (Debug/Deploy) nhất quyết phải bắt LLM gọi Skill vì có trợ lực Caching.",
      "Workflow chỉ là File Text Markdown vô tri không có tác dụng chạy Code thực tế. Muốn thao tác động đậy màn hình thì chỉ có Skill mới sở hữu mớ Script hành động."
    ],
    correctIndex: 1,
    explanation: "Workflow = multi-step recipe (bước 1 → bước 2 → ... → bước N). Skill = knowledge package (SKILL.md + scripts). Workflow thường GỌI skills hoặc tools trong từng bước. Workflow kích hoạt bằng /command, Skill load tự động.",
    theory: "3 tầng tri thức trong .agents/: 1) Rules (nạp tự động mỗi phiên), 2) Skills (load on-demand khi cần), 3) Workflows (kích hoạt explicit bằng /command). Mỗi tầng phục vụ mục đích khác nhau — cùng nhau tạo thành 'Agent Knowledge Base'."
  }
};
