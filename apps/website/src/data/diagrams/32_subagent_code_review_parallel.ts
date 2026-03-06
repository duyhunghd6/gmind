import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "32",
  group: "subagent",
  groupLabel: "SubAgent / Task",
  title: "Code Review + Fix song song",
  description: "SubAgent review code trong khi SubAgent khác fix lint — hai task song song với context riêng, tổng hợp kết quả cuối.",
  accent: "rose",
  withLabel: "CÓ SubAgent/Task",
  withoutLabel: "KHÔNG CÓ SubAgent/Task",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Task as SubAgent Task

    Dev->>IDE: "Review PR #42 va fix lint errors"
    IDE->>LLM: Prompt + tool: browser_subagent

    Note over LLM: 2 tasks song song
    LLM->>IDE: tool_call: browser_subagent(Task: Code Review PR)
    IDE->>Task: Spawn Review Task
    LLM->>IDE: tool_call: browser_subagent(Task: Fix Lint)
    IDE->>Task: Spawn Lint Fix Task

    Task-->>IDE: Review: 3 issues (security, perf, naming)
    Task-->>IDE: Lint: fixed 12 warnings, 0 errors

    Note over LLM: Tổng hợp 2 kết quả (gọn)
    LLM->>IDE: PR Review Summary + Lint clean
    IDE->>Dev: Review done: 3 issues + 12 lint fixes`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Review PR #42 va fix lint errors"
    IDE->>LLM: Prompt (KHÔNG có SubAgent)

    LLM->>IDE: Đọc PR diff (1500 tokens)
    Note over LLM: Bắt đầu review code
    LLM->>IDE: Found: SQL injection risk
    LLM->>IDE: Found: N+1 query

    Note over LLM: Context: PR diff + review notes
    LLM->>IDE: Chuyển sang lint: eslint --fix
    LLM->>IDE: Fix 12 warnings

    Note over LLM: Context: PR diff + review + lint output
    LLM->>IDE: Quay lại review: "Ô, quên issue thứ 3"
    Note over Dev: Context switching = quên context trước
    IDE->>Dev: Review thiếu: chỉ tìm 2/3 issues`,

  quiz: {
    question: "Parallel SubAgent tasks giải quyết vấn đề nào trong Agentic Coding?",
    options: [
      "A. Giảm chi phí cloud computing vì dùng ít GPU hơn",
      "B. Loại bỏ context switching — mỗi task giữ focus 100% vào nhiệm vụ riêng",
      "C. Tăng tốc vì LLM có cache chia sẻ giữa tasks",
      "D. Tự động merge code khi cả hai task xong"
    ],
    correctIndex: 1,
    explanation: "Khi review phải 'tạm dừng' để fix lint rồi quay lại, LLM mất focus và có thể quên observation trước đó. Parallel tasks = không có context switching, mỗi task vận hành độc lập.",
    theory: "Context Switching Cost trong LLM tương tự con người: khi chuyển giữa 2 task trong cùng 1 conversation, attention mechanism phải 're-attend' toàn bộ token — nhưng old context đã bị dilute bởi new tokens. Parallel SubAgent = Zero context switching cost."
  }
};
