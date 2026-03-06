import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "08",
  group: "bash",
  groupLabel: "Bash Shell",
  title: "Remote SSH debug server",
  description: "LLM kết nối SSH vào server production để chẩn đoán live — không cần Dev rời IDE.",
  accent: "amber",
  withLabel: "CÓ bash_shell",
  withoutLabel: "KHÔNG CÓ bash_shell",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Shell as Bash Shell
    participant Server as Remote Server

    Dev->>IDE: "Server production response chậm, check giúp"
    IDE->>LLM: Prompt + Available Tools [bash]

    LLM->>IDE: tool_call: bash("ssh prod-server 'top -bn1 | head -15'")
    IDE->>Shell: ssh prod-server 'top -bn1 | head -15'
    Shell->>Server: SSH connection
    Server-->>Shell: CPU: 98.2% — process: node (PID 1234)
    Shell-->>IDE: top output
    IDE->>LLM: CPU 98.2% — node process PID 1234

    LLM->>IDE: tool_call: bash("ssh prod-server 'netstat -tlnp | grep 3000'")
    IDE->>Shell: ssh prod-server 'netstat -tlnp'
    Shell-->>IDE: tcp 0 0 0.0.0.0:3000 LISTEN 1234/node
    IDE->>LLM: Port 3000, PID 1234

    LLM->>IDE: "Node.js process PID 1234 chiếm 98% CPU trên port 3000. Có thể bị infinite loop hoặc memory leak"
    IDE->>Dev: ✅ Root cause: CPU spike do Node.js process`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Server production response chậm, check giúp"
    IDE->>LLM: Prompt (KHÔNG có bash/SSH tool)

    Note over LLM: ⚠ Không thể kết nối server
    LLM->>IDE: "Hãy SSH vào server và chạy: top, netstat, htop..."
    IDE->>Dev: Danh sách lệnh generic

    Dev->>Dev: Mở terminal khác → SSH → chạy lệnh
    Dev->>Dev: Copy output → paste vào IDE
    Dev->>IDE: "Output top: CPU 98%, node PID 1234"
    LLM->>IDE: "Có vẻ Node.js bị CPU spike"
    Note over Dev: 🔄 Context switching liên tục giữa IDE và terminal`,

  quiz: {
    question: "Khi LLM chạy lệnh trên remote server qua SSH, rủi ro bảo mật nào cần quan tâm nhất?",
    options: [
      "A. LLM có thể đọc được password của server",
      "B. LLM có quyền thực thi lệnh trên production — cần mechanism xác nhận (approval) cho lệnh nguy hiểm",
      "C. SSH connection không an toàn",
      "D. LLM có thể bị hack bởi server đích"
    ],
    correctIndex: 1,
    explanation: "LLM có quyền chạy bất kỳ lệnh nào qua bash → trên production server có thể gây hại (rm -rf, DROP TABLE). Agentic IDE cần approval gate: LLM đề xuất lệnh → user xác nhận → IDE mới thực thi.",
    theory: "Human-in-the-Loop: Trong Agentic Coding, các tool nguy hiểm (write, delete, deploy) phải qua bước xác nhận của human. Nguyên tắc 'Bốn Mắt' (Four Eyes): Agent đề xuất → Human phê duyệt. Đây là nền tảng an toàn cho Agentic SE."
  }
};
