import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "07",
  group: "bash",
  groupLabel: "Bash Shell",
  title: "Phân tích disk space đầy",
  description: "Server báo 'disk full' — LLM chạy df, du, find để xác định chính xác folder nào chiếm dung lượng.",
  accent: "amber",
  withLabel: "CÓ bash_shell",
  withoutLabel: "KHÔNG CÓ bash_shell",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Shell as Bash Shell

    Dev->>IDE: "Server báo disk full, giúp tìm folder chiếm nhiều nhất"
    IDE->>LLM: Prompt + Available Tools [bash]

    LLM->>IDE: tool_call: bash("df -h")
    IDE->>Shell: df -h
    Shell-->>IDE: /dev/sda1 95% used, 2.3G available
    IDE->>LLM: Disk 95% — còn 2.3GB

    LLM->>IDE: tool_call: bash("du -sh /* 2>/dev/null | sort -rh | head -5")
    IDE->>Shell: du -sh /* | sort -rh | head -5
    Shell-->>IDE: 45G /var, 12G /home, 8G /usr
    IDE->>LLM: /var chiếm 45GB

    LLM->>IDE: tool_call: bash("du -sh /var/* | sort -rh | head -5")
    IDE->>Shell: du -sh /var/*
    Shell-->>IDE: 38G /var/log, 4G /var/lib
    IDE->>LLM: /var/log chiếm 38GB!

    LLM->>IDE: "Root cause: /var/log chiếm 38GB. Đề xuất: rotate logs hoặc xoá logs cũ"
    IDE->>Dev: ✅ Tìm chính xác: /var/log 38GB`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Server báo disk full, giúp tìm folder chiếm nhiều nhất"
    IDE->>LLM: Prompt (KHÔNG có bash tool)

    Note over LLM: ⚠ Không thể chạy df, du, find
    LLM->>IDE: "Hãy thử chạy: df -h, sau đó du -sh /*, ..."
    Note over LLM: Chỉ có thể ĐỀ XUẤT lệnh — không tự chạy được
    IDE->>Dev: Danh sách lệnh để Dev tự chạy

    Dev->>Dev: Copy-paste từng lệnh → chạy → đọc output
    Dev->>IDE: "Output là: /var/log 38GB"
    IDE->>LLM: User paste output
    LLM->>IDE: "Vậy xoá logs trong /var/log"
    Note over Dev: 🔄 Quy trình 5 phút bị kéo dài 20 phút`,

  quiz: {
    question: "Trong diagram CÓ bash tool phía trên, LLM chạy 3 lệnh liên tiếp: df -h → du -sh /* → du -sh /var/*, mỗi lệnh dựa trên kết quả lệnh trước để drill down sâu hơn. Pattern reasoning + iterative tool use này gọi là gì?",
    options: [
      "A. Batch Processing — LLM gom tất cả lệnh và chạy đồng thời cùng lúc",
      "B. Chain of Thought + Iterative Tool Use — LLM suy luận từng bước , mỗi bước dùng observation từ bước trước để quyết định bước sau",
      "C. Recursive Algorithm — LLM gọi chính nó để xử lý lệnh con",
      "D. Pipeline Pattern — output lệnh này tự động trở thành input lệnh kia mà không cần LLM"
    ],
    correctIndex: 1,
    explanation: "LLM dùng kết quả df → quyết định kiểm tra du /* → thấy /var lớn → drill down /var/*. Mỗi bước suy luận dựa trên observation từ bước trước. Đây là Iterative Tool Use trong ReAct pattern.",
    theory: "ReAct Loop: Reason (suy luận) → Act (gọi tool) → Observe (đọc kết quả) → Reason (suy luận tiếp). LLM lặp vòng này cho đến khi đủ thông tin để trả lời. Đây là sự khác biệt cốt lõi giữa chatbot (1 lượt) và Agent (n lượt)."
  }
};
