import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "25",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Git Conflict Resolution",
  description: "Agent Skill phân tích merge conflicts — hiểu intent từ cả hai branches để resolve thông minh.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/git-resolver

    Dev->>IDE: "10 file bị merge conflict sau rebase, resolve giúp"
    IDE->>LLM: Prompt + Loaded Skill [git-resolver]

    LLM->>IDE: tool_call: bash("git diff --name-only --diff-filter=U")
    IDE->>LLM: 10 files with conflicts

    Note over LLM: SKILL.md: đọc git log cả 2 branches trước
    LLM->>IDE: tool_call: bash("git log --oneline main..feature -5")
    IDE->>LLM: Feature changes: refactor auth + add caching
    LLM->>IDE: tool_call: bash("git log --oneline feature..main -5")
    IDE->>LLM: Main changes: update deps + fix security

    Note over LLM: Hiểu intent cả hai → resolve thông minh
    LLM->>IDE: tool_call: edit_file → resolve 10 conflicts (giữ cả 2 changes)
    LLM->>IDE: tool_call: bash("npm test")
    IDE->>Dev: ✅ 10 conflicts resolved — tests pass`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "10 file bị merge conflict, resolve giúp"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Chỉ thấy conflict markers, không biết intent
    LLM->>IDE: "Paste file conflict cho tôi xem"
    Dev->>IDE: Paste 1 file (context window!)
    LLM->>IDE: Resolve 1 file (có thể đoán sai intent)

    Note over Dev: Còn 9 files → paste từng file
    Dev->>Dev: 🔄 Lặp 9 lần copy-paste
    Note over Dev: ⚠ LLM không biết context tổng thể → resolve sai`,

  quiz: {
    question: "Diagram CÓ Agent Skill phía trên cho thấy Skill đọc git log của CẢ feature branch và main branch trước khi resolve. Diagram KHÔNG CÓ Skill cho thấy LLM chỉ đọc conflict markers và chọn 1 bên. Tại sao cần đọc log CẢ HAI branches?",
    options: [
      "Đọc Log để tìm Branch nào sửa muộn nhất. Áp dụng luật 'Kẻ đến sau thắng' (LWW) xóa sạch Code cũ để giữ lại dòng chữ mới gõ của Developer.",
      "Nguyên lý Semantic Merge. Thay vì so sánh chữ vụn vặt, Agent soi lịch sử Commit để thấu hiểu 'Mưu đồ' (Intent) của người viết, từ đó dung hòa Logic hai bên thành Code mới.",
      "Đây là mánh lới kỹ thuật để lừa Git. Chạy Git Log để ép Git làm mới (Refresh) lại Index bộ nhớ, chống lỗi vặt khi chạy tiếp lệnh Merge ở khâu cuối.",
      "Làm toán đếm số dòng Code (LOC). Suy luận cực kỳ đơn giản: Branch nào gõ nhiều chữ hơn thì quan trọng hơn, khi đụng độ LLM sẽ bênh vực Branch to xác."
    ],
    correctIndex: 1,
    explanation: "Intent-Aware Resolution: conflict chỉ cho thấy 'code khác nhau', nhưng LLM cần hiểu 'TẠI SAO khác'. Git log cho biết intent → LLM resolve giữ ý đồ cả feature branch lẫn main branch.",
    theory: "Semantic Merge: Git resolve truyền thống chọn 'ours' hoặc 'theirs' — binary choice. Agent Skill cho phép Semantic Merge: hiểu intent → merge thông minh (giữ cả hai thay đổi nếu không xung đột về logic)."
  }
};
