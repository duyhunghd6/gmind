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
      "Tạo cả UP và DOWN scripts tuân theo Convention Over Configuration pattern — migration tools (Flyway, golang-migrate) BẮT BUỘC phải có cả 2 files mới accept migration, đây là technical requirement của tool chứ không phải requirement của database",
      "Theo nguyên tắc Safe Deployment (CI/CD), mỗi 'UP' schema migration đều đi kèm một 'DOWN' script logic đối ứng. Nếu release mới gây data mismatch, DevOps Agent có thể trigger lệnh rollback phục hồi hệ thống database state về mốc an toàn nguyên thủy.",
      "DOWN script thực chất là wrapper cho SQL transaction ROLLBACK — khi migration UP chạy trong BEGIN/COMMIT block, DOWN script tương đương với ROLLBACK statement. Database engine tự quản lý undo log nên DOWN script chỉ là syntactic sugar",
      "DOWN script cần thiết cho CI/CD pipeline: mỗi lần chạy test suite, pipeline tạo fresh database bằng cách chạy tất cả UP migrations, rồi chạy tất cả DOWN migrations để cleanup. Không có DOWN thì test database bị 'drift' qua các runs"
    ],
    correctIndex: 1,
    explanation: "Rollback Safety: mọi thay đổi production phải có khả năng revert. DOWN script cho phép 'undo' migration trong vài giây — thay vì fix manual mất hàng giờ khi production bị lỗi.",
    theory: "Defensive Programming: Agent Skills encode 'best practices' bắt buộc. Skill db-migration enforce: 1) UP+DOWN pair, 2) Test on staging, 3) Verify after apply. Đây là guard rails — LLM không thể 'quên' những bước quan trọng."
  }
};
