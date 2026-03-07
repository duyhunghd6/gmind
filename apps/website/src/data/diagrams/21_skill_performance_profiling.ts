import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "21",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Performance Profiling tự động",
  description: "Agent Skill chạy perf, flamegraph tự động — LLM thông thường chỉ đề xuất mà không thực thi.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/perf-profiler

    Dev->>IDE: "API endpoint /users chậm, cần profiling"
    IDE->>LLM: Prompt + Loaded Skill [perf-profiler]

    Note over LLM: SKILL.md: chạy profiler → generate flamegraph
    LLM->>IDE: tool_call: bash("perf record -g -- node server.js &")
    LLM->>IDE: tool_call: bash("ab -n 1000 -c 10 http://localhost:3000/users")
    LLM->>IDE: tool_call: bash("perf script | stackcollapse-perf.pl | flamegraph.pl > flame.svg")
    LLM->>IDE: tool_call: view_file("flame.svg")

    Note over LLM: Phân tích flamegraph → tìm bottleneck
    LLM->>IDE: "Bottleneck: JSON.parse() chiếm 45% CPU. Đề xuất: dùng streaming parser"
    IDE->>Dev: ✅ Flamegraph + root cause + solution`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "API endpoint /users chậm, cần profiling"
    IDE->>LLM: Prompt (KHÔNG có skill)

    LLM->>IDE: "Hãy dùng perf hoặc Chrome DevTools. Các bước: 1) Cài perf, 2) chạy record..."
    Note over LLM: Chỉ hướng dẫn text → Dev tự thực hiện
    IDE->>Dev: Hướng dẫn 10 bước

    Dev->>Dev: Tự cài perf → chạy → generate flamegraph → phân tích
    Note over Dev: ⚠ Mất 1 giờ setup + phân tích thủ công`,

  quiz: {
    question: "Diagram CÓ Agent Skill phía trên cho thấy Skill tự động chạy perf record + flamegraph.pl → tạo flamegraph.svg cho LLM phân tích bottleneck. Flamegraph cho thấy gì và tại sao nó hữu ích cho LLM hơn text log thuần?",
    options: [
      "A. Flamegraph là biểu đồ nhiệt độ CPU theo thời gian thực — mỗi màu thể hiện mức nhiệt của một CPU core khác nhau",
      "B. Flamegraph hiển thị CALL STACK theo thời gian — LLM có thể đọc text version (stackcollapse) để xác định hàm nào chiếm nhiều CPU nhất",
      "C. Flamegraph chỉ hoạt động với ngôn ngữ JVM-based (Java, Kotlin, Scala) vì cần JMX để thu thập profiling data",
      "D. LLM parse trực tiếp file flamegraph.svg bằng built-in SVG parser, đọc vector paths để hiểu cấu trúc call stack thay vì cần text version"
    ],
    correctIndex: 1,
    explanation: "Flamegraph hiển thị call stack: mỗi 'tầng' là function call, chiều rộng = % CPU time. Khi convert sang text (stackcollapse), LLM đọc được danh sách functions + % CPU → xác định bottleneck.",
    theory: "Observability: Agent Skills biến observability tools (profiler, tracer, metrics) thành workflows tự động. LLM không 'nhìn' hình ảnh nhưng đọc được structured output — đây là pattern 'visual-to-text conversion' trong Agentic SE."
  }
};
