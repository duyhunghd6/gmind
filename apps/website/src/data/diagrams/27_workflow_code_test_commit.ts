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
    question: "Diagram CÓ Workflow phía trên cho thấy workflow enforce 4 gates: Code → Test Pass → User Approve → Commit. Nếu bất kỳ gate nào fail, pipeline dừng lại. Tại sao cần enforce thứ tự 'Code → Test → User Approval → Commit' nghiêm ngặt như vậy?",
    options: [
      "Workflow mang tính chất làm màu sao chép y xì lệnh chặn Git Hooks cài đặt tầng hạ tầng. Rút phích cắm Git Hooks thì Workflow cũng tự ngắt theo.",
      "Dịch chuyển Cửa Ải Chất Lượng về sớm (Shift-Left Quality Gate). Bắt ép Test qua cửa và Human gật đầu mới cho đi tiếp, tuyệt đối cấm tiệt rác thải tràn vào nhánh Master.",
      "Là tài liệu sống động nhắc nhở Developer làm theo nhưng không có tính răng đe. User cứ ra lệnh 'Đừng Test vội, Push luôn đi' là AI vẫn nhắm mắt làm ngoan ngoãn.",
      "Mẹo vặt tiết kiệm Token chữ. Ép LLM đọc Log Test trước sẽ giúp nó có đủ câu chữ xào nấu ra nội dung Commit Message nghe kêu hơn và đỡ phải đoán mò kết quả tỷ lệ Pass/Fail."
    ],
    correctIndex: 1,
    explanation: "Quality Gate: workflow tạo 'cổng chất lượng' tại mỗi bước. Code phải có test → test phải pass → user phải approve → mới commit. Nếu bất kỳ gate nào fail → dừng lại và fix.",
    theory: "Continuous Integration (CI) in Agentic SE: Workflow encode CI pipeline vào agent. Thay vì CI/CD server kiểm tra SAU KHI push, Agent kiểm tra TRƯỚC KHI commit (shift-left testing). Đây là 'Agent-side CI' — validation trước khi code rời khỏi IDE."
  }
};
