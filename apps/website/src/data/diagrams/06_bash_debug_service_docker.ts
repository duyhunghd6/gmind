import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "06",
  group: "bash",
  groupLabel: "Bash Shell",
  title: "Debug service bị crash",
  description: "LLM cần chạy lệnh hệ thống để chẩn đoán — bash_shell cho phép đọc logs, kiểm tra processes.",
  accent: "amber",
  withLabel: "CÓ bash_shell",
  withoutLabel: "KHÔNG CÓ bash_shell",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Shell as Bash Shell

    Dev->>IDE: "API server bị crash, tìm nguyên nhân giúp tôi"
    IDE->>LLM: Prompt + Available Tools [bash]

    Note over LLM: Chẩn đoán = đọc logs + kiểm tra process
    LLM->>IDE: tool_call: bash("docker logs api-server --tail 50")
    IDE->>Shell: docker logs api-server --tail 50
    Shell-->>IDE: "OOM Killed — memory limit 512MB exceeded"
    IDE->>LLM: Log: OOM Killed, memory exceeded 512MB

    LLM->>IDE: tool_call: bash("docker stats api-server --no-stream")
    IDE->>Shell: docker stats api-server --no-stream
    Shell-->>IDE: MEM USAGE: 498MB / 512MB (97.3%)
    IDE->>LLM: Memory usage: 498/512MB

    LLM->>IDE: "Root cause: Service bị OOM Kill. Đề xuất: tăng memory limit hoặc fix memory leak"
    IDE->>Dev: ✅ Xác định chính xác: OOM + gợi ý fix`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "API server bị crash, tìm nguyên nhân giúp tôi"
    IDE->>LLM: Prompt (KHÔNG có bash tool)

    Note over LLM: ⚠ Không thể đọc logs hay kiểm tra hệ thống
    LLM->>IDE: "Có thể do: 1) OOM, 2) Segfault, 3) Network timeout, 4) Config sai..."
    Note over LLM: Liệt kê 10+ nguyên nhân generic
    IDE->>Dev: ⚠ Danh sách đoán — Dev phải tự kiểm tra từng cái

    Dev->>Dev: Tự chạy docker logs → mất 15 phút tìm nguyên nhân`,

  quiz: {
    question: "Trong 2 diagrams phía trên, diagram CÓ bash tool cho thấy LLM trực tiếp chạy 'docker logs' và 'docker stats' trên hệ thống rồi đọc output. So sánh với các ví dụ tool_call API (gọi dịch vụ web bên ngoài) ở section trước, tool_call: bash có điểm khác biệt quan trọng gì?",
    options: [
      "Bash Tool chỉ đọc text thuần nên bị giới hạn phân tích. Còn API Tool trả về JSON cấu trúc rõ ràng nên luôn vượt trội hơn Bash trong mọi trường hợp Debug.",
      "Bash Tool cấp quyền host-level execution cho LLM (đọc/ghi file, chạy shell cục bộ). Sức mạnh vô hạn này đi kèm rủi ro bảo mật cực lớn so với giao tiếp API HTTP.",
      "Cả hai Tool chia sẻ chung Interface và chi phí vận hành. Điểm khác biệt duy nhất là Bash trả về Text còn API trả JSON đòi hỏi LLM phải parse thêm một bước.",
      "Bash an toàn tuyệt đối hơn API vì bắt buộc chạy trong Docker Sandbox của IDE. Lệnh được cô lập hoàn toàn, không thể phá hoại hệ thống thực nên không cần giám sát."
    ],
    correctIndex: 1,
    explanation: "Bash tool thực thi lệnh trên máy local (đọc file, chạy process, kiểm tra hệ thống). Đây là quyền mạnh nhất — vì vậy Agentic IDE thường yêu cầu user xác nhận trước khi chạy lệnh nguy hiểm.",
    theory: "Trong Agent Loop, mỗi tool_call: bash phải được IDE kiểm duyệt (sandbox/approval). Gemini CLI phân biệt 'safe commands' (read-only: ls, cat, grep) và 'unsafe commands' (write: rm, mv, deploy) để bảo vệ hệ thống."
  }
};
