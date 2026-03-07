import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "19",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Database Migration an toàn",
  description: "Agent Skill chứa migration patterns, rollback scripts, và checklist — đảm bảo migration không phá production.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/db-migration

    Dev->>IDE: "Thêm cột email vào bảng users (production)"
    IDE->>LLM: Prompt + Loaded Skill [db-migration]

    Note over LLM: SKILL.md: phải tạo UP + DOWN migration
    LLM->>IDE: Create: migrations/20260307_add_email.up.sql
    LLM->>IDE: Create: migrations/20260307_add_email.down.sql
    Note over LLM: SKILL.md: phải test trên staging trước
    LLM->>IDE: tool_call: bash("migrate -database staging up")
    LLM->>IDE: tool_call: bash("migrate -database staging verify")
    LLM->>IDE: "Migration OK trên staging. Chạy production?"
    IDE->>Dev: ✅ UP + DOWN scripts + tested on staging`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Thêm cột email vào bảng users (production)"
    IDE->>LLM: Prompt (KHÔNG có skill)

    LLM->>IDE: "ALTER TABLE users ADD COLUMN email VARCHAR(255);"
    Note over LLM: ⚠ Chỉ có UP — không có DOWN (rollback)
    IDE->>Dev: SQL migration (1 chiều)

    Dev->>Dev: Chạy trực tiếp trên production
    Dev->>Dev: Migration fail → lock bảng → downtime!
    Note over Dev: ⚠ Không có rollback script → phải fix manual`,

  quiz: {
    question: "Trong diagram CÓ Agent Skill phía trên, Skill tạo cả migration UP (thay đổi schema) và DOWN (rollback) scripts. So sánh với diagram KHÔNG CÓ Skill — LLM chỉ tạo UP migration. Tại sao cần cả UP lẫn DOWN scripts?",
    options: [
      "A. Tạo cả UP và DOWN giúp codebase nhìn chuyên nghiệp hơn khi code review, thể hiện team có quy trình migration bài bản",
      "B. DOWN script là ROLLBACK — nếu migration gây lỗi production, có thể revert schema về trạng thái trước đó AN TOÀN trong vài giây",
      "C. DOWN script dùng để undo bằng database transaction (BEGIN/ROLLBACK) — tương tự cơ chế rollback tự động của SQL engine",
      "D. DOWN script chỉ dùng khi muốn xoá toàn bộ database và tạo lại từ đầu trong quá trình development"
    ],
    correctIndex: 1,
    explanation: "Rollback Safety: mọi thay đổi production phải có khả năng revert. DOWN script cho phép 'undo' migration trong vài giây — thay vì fix manual mất hàng giờ khi production bị lỗi.",
    theory: "Defensive Programming: Agent Skills encode 'best practices' bắt buộc. Skill db-migration enforce: 1) UP+DOWN pair, 2) Test on staging, 3) Verify after apply. Đây là guard rails — LLM không thể 'quên' những bước quan trọng."
  }
};
