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
    Calc-->>IDE: 793,472,770,262
    IDE->>LLM: Kết quả: 793,472,770,262

    LLM->>IDE: "847291 × 936482 = 793.472.770.262"
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
    question: "Sau khi quan sát 2 sequence diagrams CÓ/KHÔNG CÓ tool_call phía trên (LLM cho kết quả đúng 793.472.770.262 với calculator vs đoán sai), hãy trả lời: Tại sao LLM không thể tính chính xác phép nhân số lớn nếu không có tool_call?",
    options: [
      "Kiến trúc Transformer bị giới hạn số lượng phép tính. Với số quá lớn, LLM cần nhiều forward passes hơn dung lượng cho phép nên phát sinh lỗi.",
      "LLM hoạt động bằng cơ chế đoán từ (next-token prediction) dựa trên xác suất ngôn ngữ, hoàn toàn không có ALU để thực thi logic toán học thực sự.",
      "LLM dùng floating-point (FP16/BF16) để xử lý số. Khi nhân số quá lớn sẽ gây ra rounding error tương tự lỗi tràn bộ nhớ IEEE 754.",
      "Phép nhân số lớn yêu cầu nhớ nợ (carry) nhiều bước. Mỗi bước bị tách thành một token riêng khiến attention mechanism mất dần độ chính xác."
    ],
    correctIndex: 1,
    explanation: "LLM hoạt động bằng cách dự đoán token tiếp theo (next-token prediction), KHÔNG thực hiện phép tính toán thực. Khi gặp phép nhân số lớn, LLM 'đoán' kết quả dựa trên pattern — dẫn đến sai.",
    theory: "Tool Call (Function Calling) cho phép LLM gọi hàm bên ngoài (calculator, API, database) thay vì tự xử lý. Đây là cơ chế cốt lõi biến LLM từ 'trả lời bằng text' thành 'hành động trong thế giới thực'."
  }
};
