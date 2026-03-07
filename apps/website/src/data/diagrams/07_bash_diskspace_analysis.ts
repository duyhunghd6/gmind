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
      "Batch Processing. LLM lên siêu kế hoạch sẵn cho cả 3 lệnh ngay từ đầu, thiết lập Tool Call chạy song song qua IDE để triệt tiêu thời gian phản hồi (round-trip time).",
      "Mô hình ReAct (Reasoning + Acting). LLM quan sát kết quả bước 1 để lập luận cho bước 2, rồi đào sâu vào bước 3. Quá trình chia rẽ tự động lập luận lặp lại liên tục.",
      "Recursive Decomposition. Agent tự nảy sinh ra các prompt nhỏ cho từng cấp thư mục phân nhánh và tự đệ quy gọi chính mình (self-invocation) theo dạng hình cây.",
      "Unix Pipeline Pattern. Đầu rã của lệnh trước được cắm thẳng vào lệnh sau trên cùng một string Tool Call duy nhất, ép IDE nối tiếp lệnh mà LLM không cần theo dõi."
    ],
    correctIndex: 1,
    explanation: "LLM dùng kết quả df → quyết định kiểm tra du /* → thấy /var lớn → drill down /var/*. Mỗi bước suy luận dựa trên observation từ bước trước. Đây là Iterative Tool Use trong ReAct pattern.",
    theory: "ReAct Loop: Reason (suy luận) → Act (gọi tool) → Observe (đọc kết quả) → Reason (suy luận tiếp). LLM lặp vòng này cho đến khi đủ thông tin để trả lời. Đây là sự khác biệt cốt lõi giữa chatbot (1 lượt) và Agent (n lượt)."
  }
};
