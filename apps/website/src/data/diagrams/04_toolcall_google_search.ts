import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "04",
  group: "toolcall",
  groupLabel: "Tool Call cơ bản",
  title: "Tìm kiếm Google",
  description: "LLM cần thông tin mới nhất từ internet — Google Search tool cho phép truy cập web realtime.",
  accent: "cyan",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Google as Google Search API

    User->>IDE: "Next.js 16 có tính năng gì mới?"
    IDE->>LLM: User Prompt + Available Tools [google_search]

    Note over LLM: Thông tin mới → cần search web
    LLM->>IDE: tool_call: google.search("Next.js 16 new features 2026")
    IDE->>Google: GET /search?q=Next.js+16+new+features
    Google-->>IDE: Top 5 results với snippets
    IDE->>LLM: Search results: Turbopack stable, RSC streaming...

    LLM->>IDE: "Next.js 16 có: Turbopack mặc định, RSC Streaming cải tiến, ..."
    IDE->>User: ✅ Thông tin mới nhất từ web`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    User->>IDE: "Next.js 16 có tính năng gì mới?"
    IDE->>LLM: User Prompt (KHÔNG có search tool)

    Note over LLM: ⚠ Training data không có Next.js 16
    LLM->>IDE: "Next.js 15 (phiên bản tôi biết) có App Router, Turbopack beta..."
    Note over LLM: Đưa ra thông tin version cũ
    IDE->>User: ⚠ Thông tin lỗi thời — Next.js 15, không phải 16

    Note over User: Phải tự Google để tìm thông tin đúng
    User->>User: Google → đọc changelog → tìm features mới`,

  quiz: {
    question: "Trong diagram CÓ tool_call phía trên, LLM gọi google.search('Next.js 16 new features') → nhận kết quả mới nhất → trả lời chính xác. Quy trình 'tìm kiếm thông tin trước, rồi đưa vào context để trả lời' này là một dạng RAG. RAG (Retrieval-Augmented Generation) và tool_call: google_search có mối quan hệ như thế nào?",
    options: [
      "A. RAG và tool_call là hai architectural layers hoàn toàn độc lập: RAG xử lý ở inference pipeline (trước khi prompt đến LLM), còn tool_call xử lý ở output pipeline (sau khi LLM generate response) — chúng không bao giờ hoạt động trên cùng request",
      "B. RAG là kỹ thuật tổng quát 'truy xuất trước, sinh sau' — tool_call: google_search là MỘT cách triển khai RAG qua web search",
      "C. tool_call là phiên bản nâng cấp (successor) của RAG trong kiến trúc Agentic — RAG chỉ retrieve static documents, trong khi tool_call có thể gọi APIs dynamic. Vì vậy các hệ thống hiện đại đã migrate hoàn toàn từ RAG sang tool_call paradigm",
      "D. RAG yêu cầu pre-indexed corpus (vector embeddings đã tính trước) để thực hiện semantic search — Google Search trả về raw HTML/text chưa được vectorize, nên tool_call: google_search thuộc dạng Information Retrieval (IR) truyền thống, không phải RAG"
    ],
    correctIndex: 1,
    explanation: "RAG (Retrieval-Augmented Generation) là pattern: lấy thông tin liên quan TRƯỚC, rồi đưa vào context cho LLM generate câu trả lời. Google Search là một implementation của RAG — retrieve từ web.",
    theory: "Tool_call là cơ chế thực thi, RAG là pattern thiết kế. Khi LLM gọi google.search() → lấy kết quả → đưa vào context → sinh câu trả lời, đó chính là RAG thông qua tool_call. Các RAG khác: vector search, database query, document retrieval."
  }
};
