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
    question: "Trong diagram CÓ tool_call phía trên, LLM dùng grep_search('UserService') để tìm chính xác file tại src/services/user.service.ts, rồi view_file đọc routes.ts phát hiện typo '../service/' (thiếu 's'). Tại sao grep_search và view_file là 2 tools quan trọng nhất cho code debugging?",
    options: [
      "grep_search và view_file là O(1) lookup operations (indexed bởi IDE language server) nên trả kết quả gần như instant — các tools khác như bash hay edit_file cần disk I/O nên chậm hơn đáng kể, đây là lý do chúng được ưu tiên trong debugging",
      "Đứng trước codebase khổng lồ, Context Window của LLM là hữu hạn. Kết hợp grep_search để Regex toàn bộ codebase (Fast Retrieval) và view_file để đọc chi tiết line range (Deep Context), giúp tiết kiệm tokens và ngăn chặn context dilution triệt để.",
      "grep_search và view_file là 2 tools thuộc 'core tool set' bắt buộc — Agentic IDE spec (theo Anthropic và Google) quy định mọi IDE phải implement tối thiểu 2 tools này. Các tools khác (bash, edit) là optional extensions",
      "grep_search tích hợp regex pattern matching + semantic analysis có khả năng phát hiện common bugs (typo, wrong import path) tự động — LLM chỉ cần confirm fix suggestion từ grep engine mà không cần tự phân tích code"
    ],
    correctIndex: 1,
    explanation: "grep_search giúp LLM tìm WHERE (ở đâu trong codebase), view_file giúp LLM hiểu WHAT (nội dung code). Kết hợp lại, LLM có khả năng 'navigate' codebase giống developer dùng IDE.",
    theory: "Context Retrieval: LLM có context window giới hạn — không thể đọc toàn bộ codebase. grep_search + view_file là cơ chế 'lấy đúng context cần thiết' (selective context loading). Đây là nền tảng cho FastCode AST của gmind."
  }
};
