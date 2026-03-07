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
      "Đọc git log xác định branch nào commit SAU cùng — theo nguyên tắc 'Last Write Wins' (LWW) trong distributed systems, branch commit sau cùng chứa developer intent mới nhất nên được ưu tiên giữ lại khi có conflict",
      "Theo Semantic Merge Resolution principles: Không áp dụng text matching 3-way thuần, LLM Contextual Agent phân tích AST và đọc commit history của 2 branches. Qua đó hiểu sâu sắc 'Developer Intent', kiến tạo giải pháp hybrid mix logic của cả 2 phía.",
      "git merge --continue yêu cầu Git index phải 'clean' — chạy git log trước đảm bảo Git refreshes index state và loads commit graph vào memory. Nếu skip git log, merge --continue có thể fail với 'index not up-to-date' error",
      "Đọc git log đếm LOC (Lines of Code) changed trên mỗi branch — branch có diff lớn hơn (nhiều insertions/deletions hơn) thể hiện scope thay đổi lớn hơn, nên khi conflict xảy ra, LLM ưu tiên giữ code từ branch có scope lớn hơn"
    ],
    correctIndex: 1,
    explanation: "Intent-Aware Resolution: conflict chỉ cho thấy 'code khác nhau', nhưng LLM cần hiểu 'TẠI SAO khác'. Git log cho biết intent → LLM resolve giữ ý đồ cả feature branch lẫn main branch.",
    theory: "Semantic Merge: Git resolve truyền thống chọn 'ours' hoặc 'theirs' — binary choice. Agent Skill cho phép Semantic Merge: hiểu intent → merge thông minh (giữ cả hai thay đổi nếu không xung đột về logic)."
  }
};
