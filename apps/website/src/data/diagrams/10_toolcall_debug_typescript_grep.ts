import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "10",
  group: "code",
  groupLabel: "Code & Debugging",
  title: "Debug TypeScript import lỗi",
  description: "LLM dùng grep_search + view_file để tìm đúng file lỗi — thay vì đoán path.",
  accent: "teal",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System

    Dev->>IDE: "Import UserService bị lỗi 'module not found'"
    IDE->>LLM: Prompt + Tools [grep_search, view_file, list_dir]

    LLM->>IDE: tool_call: grep_search("UserService", "src/")
    IDE->>FS: grep -r "UserService" src/
    FS-->>IDE: src/services/user.service.ts: export class UserService
    IDE->>LLM: Found at src/services/user.service.ts

    LLM->>IDE: tool_call: view_file("src/api/routes.ts", lines=1-10)
    IDE->>FS: Read routes.ts
    FS-->>IDE: import { UserService } from "../service/user.service"
    IDE->>LLM: Sai path: "../service/" (thiếu 's')

    LLM->>IDE: tool_call: edit_file → đổi "../service/" thành "../services/"
    IDE->>Dev: ✅ Fix: "../services/user.service" — import đúng path`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Import UserService bị lỗi 'module not found'"
    IDE->>LLM: Prompt (KHÔNG có search/view tools)

    Note over LLM: ⚠ Không biết cấu trúc thư mục
    LLM->>IDE: "Có thể file nằm ở: src/services/UserService.ts hoặc src/user/service.ts..."
    Note over LLM: ĐOÁN path → nhiều khả năng sai
    IDE->>Dev: Danh sách path đoán

    Dev->>Dev: Tự tìm file → phát hiện typo "service" vs "services"
    Dev->>IDE: "Path đúng là ../services/"
    LLM->>IDE: Fix import path
    Note over Dev: ⚠ LLM không thể tự tìm lỗi typo trong path`,

  quiz: {
    question: "Tại sao grep_search và view_file là hai tools quan trọng nhất cho code debugging?",
    options: [
      "A. Chúng nhanh hơn các tools khác",
      "B. grep_search TÌM vị trí code, view_file ĐỌC nội dung code — kết hợp cho LLM 'mắt' để nhìn codebase",
      "C. Chúng là tools duy nhất mà LLM có thể sử dụng",
      "D. Chúng tự động sửa code mà không cần LLM"
    ],
    correctIndex: 1,
    explanation: "grep_search giúp LLM tìm WHERE (ở đâu trong codebase), view_file giúp LLM hiểu WHAT (nội dung code). Kết hợp lại, LLM có khả năng 'navigate' codebase giống developer dùng IDE.",
    theory: "Context Retrieval: LLM có context window giới hạn — không thể đọc toàn bộ codebase. grep_search + view_file là cơ chế 'lấy đúng context cần thiết' (selective context loading). Đây là nền tảng cho FastCode AST của gmind."
  }
};
