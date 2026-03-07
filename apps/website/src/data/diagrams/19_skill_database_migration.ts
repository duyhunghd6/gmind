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
      "Đây là luật rập khuôn của các Tool CI/CD (như Flyway). Tool luôn báo lỗi nếu thư mục vắng mặt cặp file ngược chiều dù đôi khi chả có tác dụng gì ở DB thật.",
      "Theo tính toàn vẹn Safe Deployment, mọi mã thay đổi Schema (UP) đều phải đi kèm phương pháp lùi (DOWN). Agent cần DOWN Scripts làm nút Rollback khẩn cấp nếu dính lỗi đứt gãy Production.",
      "Mã DOWN thực ra là cú lừa hình thức bọc lấy SQL Transaction. Database engine nào cũng có Undo Log chìm tự động đảo chiều nên DOWN Scripts chỉ là lớp đường cú phá (Syntactic sugar).",
      "Dùng riêng biệt cho Tester và CI. Mỗi vòng Test sẽ vứt lại rác Database, lúc này Pipeline tự động dọn dẹp bằng cách kích hoạt cơ chế trừ khử rác của DOWN scripts."
    ],
    correctIndex: 1,
    explanation: "Rollback Safety: mọi thay đổi production phải có khả năng revert. DOWN script cho phép 'undo' migration trong vài giây — thay vì fix manual mất hàng giờ khi production bị lỗi.",
    theory: "Defensive Programming: Agent Skills encode 'best practices' bắt buộc. Skill db-migration enforce: 1) UP+DOWN pair, 2) Test on staging, 3) Verify after apply. Đây là guard rails — LLM không thể 'quên' những bước quan trọng."
  }
};
