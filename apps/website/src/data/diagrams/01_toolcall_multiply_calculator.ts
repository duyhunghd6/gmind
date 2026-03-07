import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "01",
  group: "toolcall",
  groupLabel: "Tool Call cơ bản",
  title: "Bài toán nhân số lớn",
  description: "LLM không giỏi tính toán chính xác — tool_call: calculator giải quyết tức thì.",
  accent: "cyan",
  withLabel: "CÓ tool_call",
  withoutLabel: "KHÔNG CÓ tool_call",
  withMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Calc as Calculator Tool

    User->>IDE: "847291 nhân 936482 bằng bao nhiêu?"
    IDE->>LLM: User Prompt + Available Tools [calculator]

    Note over LLM: Nhận diện: bài toán tính toán → dùng tool
    LLM->>IDE: tool_call: calculator.multiply(847291, 936482)
    IDE->>Calc: multiply(847291, 936482)
    Calc-->>IDE: 793,548,523,162
    IDE->>LLM: Kết quả: 793,548,523,162

    LLM->>IDE: "847291 × 936482 = 793.548.523.162"
    IDE->>User: ✅ Kết quả chính xác 100%`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor User as Người dùng
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    User->>IDE: "847291 nhân 936482 bằng bao nhiêu?"
    IDE->>LLM: User Prompt (KHÔNG có calculator tool)

    Note over LLM: ⚠ Tự tính nhân số lớn bằng "suy luận"
    Note over LLM: Token prediction ≠ Arithmetic
    LLM->>IDE: "847291 × 936482 = 793,412,xxx,xxx (?)"
    IDE->>User: ❌ Kết quả SAI — LLM hallucinate số

    Note over User: Phải tự kiểm tra bằng máy tính
    User->>User: Mở calculator → phát hiện sai`,

  quiz: {
    question: "Sau khi quan sát 2 sequence diagrams CÓ/KHÔNG CÓ tool_call phía trên (LLM cho kết quả đúng 793.548.523.162 với calculator vs đoán sai), hãy trả lời: Tại sao LLM không thể tính chính xác phép nhân số lớn nếu không có tool_call?",
    options: [
      "A. LLM thực tế CÓ khả năng tính toán chính xác cho số nhỏ (2×3=6), nhưng kiến trúc Transformer giới hạn số lượng phép tính mỗi forward pass — nên với số lớn (847291×936482), LLM cần nhiều forward passes hơn capacity cho phép",
      "B. LLM predict token tiếp theo (next-token prediction), KHÔNG thực hiện phép tính — nên kết quả chỉ là 'đoán' dựa trên pattern",
      "C. LLM sử dụng floating-point precision (FP16/BF16) khi xử lý số — giống CPU tính toán, precision giảm khi số quá lớn dẫn đến kết quả bị rounding error, tương tự lỗi IEEE 754 overflow trong các ngôn ngữ lập trình",
      "D. LLM có khả năng arithmetic reasoning nhờ chain-of-thought, nhưng phép nhân số lớn yêu cầu multi-step carry propagation — mỗi bước carry là một token riêng và attention mechanism mất dần accuracy qua nhiều carry steps"
    ],
    correctIndex: 1,
    explanation: "LLM hoạt động bằng cách dự đoán token tiếp theo (next-token prediction), KHÔNG thực hiện phép tính toán thực. Khi gặp phép nhân số lớn, LLM 'đoán' kết quả dựa trên pattern — dẫn đến sai.",
    theory: "Tool Call (Function Calling) cho phép LLM gọi hàm bên ngoài (calculator, API, database) thay vì tự xử lý. Đây là cơ chế cốt lõi biến LLM từ 'trả lời bằng text' thành 'hành động trong thế giới thực'."
  }
};
