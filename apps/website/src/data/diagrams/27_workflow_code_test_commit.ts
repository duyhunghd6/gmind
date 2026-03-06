import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "27",
  group: "workflow",
  groupLabel: "Workflows",
  title: "Code → Test → Commit → PR",
  description: "Workflow enforce: viết code → lên test plan → chạy test → hỏi user → commit + report handover.",
  accent: "amber",
  withLabel: "CÓ Workflow",
  withoutLabel: "KHÔNG CÓ Workflow",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Test as Test Runner
    participant Git as Git

    Dev->>IDE: "/code-and-ship"
    IDE->>LLM: Load workflow: code-and-ship.md

    Note over LLM: Step 1: Implement feature
    LLM->>IDE: tool_call: edit_file → implement feature code
    
    Note over LLM: Step 2: Write test plan
    LLM->>IDE: tool_call: edit_file → create test file
    
    Note over LLM: Step 3: Run tests
    LLM->>IDE: tool_call: bash("npm test")
    IDE->>Test: npm test
    Test-->>IDE: 5/5 tests PASSED ✅

    Note over LLM: Step 4: Ask user approval
    LLM->>Dev: "Tests passed 5/5. Commit và tạo PR?"
    Dev->>LLM: "OK, commit"
    
    Note over LLM: Step 5: Commit + Report
    LLM->>IDE: tool_call: bash("git add -A && git commit -m 'feat: add user auth'")
    LLM->>IDE: tool_call: edit_file → Generate handover report
    IDE->>Dev: ✅ Code + Tests + Commit + Handover Report`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Code feature auth cho tôi"
    IDE->>LLM: Prompt (KHÔNG có workflow)

    LLM->>IDE: tool_call: edit_file → implement feature
    IDE->>Dev: "Xong! Feature đã implement."
    Note over LLM: ⚠ KHÔNG viết test, KHÔNG chạy test

    Dev->>Dev: Push code → CI/CD fail vì no tests
    Dev->>IDE: "Viết test đi"
    LLM->>IDE: Viết test
    Dev->>IDE: "Chạy test đi"  
    LLM->>IDE: bash("npm test") → 2 tests fail
    Dev->>IDE: "Fix test đi"
    Note over Dev: 🔄 4 vòng hỏi-đáp thay vì 1 workflow tự động`,

  quiz: {
    question: "Tại sao Workflow enforce thứ tự 'Code → Test → User Approval → Commit'?",
    options: [
      "A. Đây là quy định bắt buộc của git",
      "B. Quality Gate Pattern — mỗi bước phải PASS trước khi tiếp tục. Đảm bảo không có untested code hoặc unauthorized commits",
      "C. Để LLM có thêm context",
      "D. Workflow chỉ là documentation, không enforce thực sự"
    ],
    correctIndex: 1,
    explanation: "Quality Gate: workflow tạo 'cổng chất lượng' tại mỗi bước. Code phải có test → test phải pass → user phải approve → mới commit. Nếu bất kỳ gate nào fail → dừng lại và fix.",
    theory: "Continuous Integration (CI) in Agentic SE: Workflow encode CI pipeline vào agent. Thay vì CI/CD server kiểm tra SAU KHI push, Agent kiểm tra TRƯỚC KHI commit (shift-left testing). Đây là 'Agent-side CI' — validation trước khi code rời khỏi IDE."
  }
};
