import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "30",
  group: "subagent",
  groupLabel: "SubAgent / Task",
  title: "Refactor monorepo 50+ files",
  description: "Tách task refactor lớn thành nhiều SubAgent nhỏ — mỗi agent xử lý 1 module, tránh context window overflow.",
  accent: "rose",
  withLabel: "CÓ SubAgent/Task",
  withoutLabel: "KHÔNG CÓ SubAgent/Task",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Task as SubAgent Task

    Dev->>IDE: "Refactor: tách monolith thành 5 modules"
    IDE->>LLM: Prompt + tool: browser_subagent

    Note over LLM: Phân tích dependency graph
    LLM->>IDE: Plan: Module A(12 files), B(8), C(15), D(10), E(5)

    LLM->>IDE: tool_call: browser_subagent(Task: Refactor Module A)
    IDE->>Task: Spawn Task A (context: 12 files)
    Task-->>IDE: Module A refactored

    LLM->>IDE: tool_call: browser_subagent(Task: Refactor Module B)
    IDE->>Task: Spawn Task B (context: 8 files)
    Task-->>IDE: Module B refactored

    Note over LLM: Tasks C, D, E tương tự
    LLM->>IDE: Tổng hợp: update imports giữa modules
    IDE->>Dev: 50 files refactored, tests pass`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Refactor: tách monolith thành 5 modules"
    IDE->>LLM: Prompt (KHÔNG có SubAgent/Task)

    Note over LLM: Phải load tất cả 50 files vào context
    LLM->>IDE: Đọc file 1-10 (3000 tokens)
    LLM->>IDE: Đọc file 11-20 (3000 tokens)

    Note over LLM: Context: 6000+ tokens code
    LLM->>IDE: Sửa file 1-5 (thêm 2000 tokens)

    Note over LLM: Context: 8000+ tokens, bắt đầu quên file đầu
    LLM->>IDE: Sửa file 6-10 (nhầm import từ file 2)

    Note over LLM: Hallucination: quên thay đổi ở file 3
    LLM->>IDE: File 20+: mất đồng bộ giữa modules
    IDE->>Dev: Kết quả: build fail, circular imports`,

  quiz: {
    question: "Khi refactor 50+ files, tại sao chia thành SubAgent theo module hiệu quả hơn xử lý tuần tự?",
    options: [
      "A. SubAgent chạy song song nên nhanh hơn gấp 5 lần",
      "B. Mỗi SubAgent chỉ cần context của module mình — giảm token, tăng độ chính xác",
      "C. SubAgent tự động viết test cho mỗi module",
      "D. SubAgent dùng nhiều GPU hơn nên xử lý nhanh"
    ],
    correctIndex: 1,
    explanation: "Module A chỉ cần context 12 files, không cần 'biết' code của Module C. Chia nhỏ = context tập trung = LLM hiểu sâu hơn từng module thay vì hiểu nông 50 files.",
    theory: "Locality of Reference: LLM hoạt động tốt nhất khi context chỉ chứa thông tin liên quan trực tiếp. Token overhead từ code không liên quan không chỉ lãng phí tiền mà còn giảm attention accuracy — nguyên nhân chính gây 'context dilution hallucination'."
  }
};
