import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "31",
  group: "subagent",
  groupLabel: "SubAgent / Task",
  title: "E2E Testing đa browser",
  description: "Tạo SubAgent cho mỗi browser/device — Chrome, Firefox, Safari test song song, không chia sẻ context lẫn nhau.",
  accent: "rose",
  withLabel: "CÓ SubAgent/Task",
  withoutLabel: "KHÔNG CÓ SubAgent/Task",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Task as SubAgent Task

    Dev->>IDE: "Chạy E2E test cho login flow trên 3 browsers"
    IDE->>LLM: Prompt + tool: browser_subagent

    Note over LLM: Mỗi browser = 1 Task riêng biệt
    LLM->>IDE: tool_call: browser_subagent(Task: Chrome E2E)
    IDE->>Task: Spawn Chrome test (context riêng)
    Task-->>IDE: Chrome: 15/15 pass

    LLM->>IDE: tool_call: browser_subagent(Task: Firefox E2E)
    IDE->>Task: Spawn Firefox test (context riêng)
    Task-->>IDE: Firefox: 14/15 pass (CSS bug found)

    LLM->>IDE: tool_call: browser_subagent(Task: Safari E2E)
    IDE->>Task: Spawn Safari test (context riêng)
    Task-->>IDE: Safari: 13/15 pass (2 WebKit issues)

    Note over LLM: Tổng hợp chỉ kết quả, không code chi tiết
    LLM->>IDE: Fix CSS bug cho Firefox, 2 WebKit issues
    IDE->>Dev: 3 browser tested, 3 bugs fixed`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Chạy E2E test cho login flow trên 3 browsers"
    IDE->>LLM: Prompt (KHÔNG có SubAgent)

    LLM->>IDE: Chạy Chrome test (logs 2000 tokens vào context)
    Note over LLM: Context: Chrome logs

    LLM->>IDE: Chạy Firefox test (logs 2000 tokens)
    Note over LLM: Context: Chrome + Firefox logs = 4000 tokens

    LLM->>IDE: Chạy Safari test (logs 2000 tokens)
    Note over LLM: Context: 6000+ tokens test logs

    Note over LLM: Phân tích 6000 tokens logs trong 1 context
    LLM->>IDE: Nhầm: fix Chrome bug thay vì Safari bug
    Note over Dev: Cross-contamination giữa test results
    IDE->>Dev: Sửa sai browser, cần chạy lại`,

  quiz: {
    question: "Diagram CÓ SubAgent phía trên tạo 3 SubAgent riêng cho Chrome, Firefox, Safari — mỗi SubAgent test trong context riêng. Diagram KHÔNG CÓ cho thấy logs 3 browsers trộn lẫn trong 1 context. 'Cross-contamination' trong context có nghĩa là gì khi test đa browser?",
    options: [
      "A. Cross-contamination xảy ra ở browser level: Chrome và Firefox share disk cache khi chạy trên cùng OS — test artifacts (cookies, localStorage, screenshots) từ Chrome test bị Firefox test đọc nhầm, gây false positive/negative results",
      "B. Test logs của Chrome/Firefox/Safari trộn lẫn trong 1 context — LLM nhầm bug của browser này với browser kia khi phân tích",
      "C. Test runner (Playwright/Selenium) sử dụng shared test fixtures: login credentials, test data, và browser state được chia sẻ qua global setup file — khi Chrome test modify shared state, Firefox test nhận modified state thay vì clean slate",
      "D. Cross-contamination ở rendering layer: khi 3 browser instances chạy đồng thời trên cùng display server, GPU texture memory được shared — CSS animations từ Chrome test can thiệp vào Firefox rendering pipeline gây visual regression false alarms"
    ],
    correctIndex: 1,
    explanation: "Khi 6000 tokens logs từ 3 browsers nằm chung context, LLM có thể nhầm 'Firefox CSS bug' với 'Safari WebKit issue'. SubAgent giữ mỗi browser trong context riêng → phân tích chính xác từng browser.",
    theory: "Cross-context Contamination là dạng hallucination phổ biến nhất trong Agentic Coding: LLM mix thông tin từ các task KHÁC NHAU trong cùng 1 context. Solution: Task Isolation — mỗi SubAgent có 'bức tường context' ngăn cách thông tin."
  }
};
