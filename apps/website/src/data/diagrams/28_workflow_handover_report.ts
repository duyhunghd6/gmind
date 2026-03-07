import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "28",
  group: "workflow",
  groupLabel: "Workflows",
  title: "Handover Report cho Next Iteration",
  description: "Workflow tự động generate report tóm tắt những gì đã làm, chưa xong, và notes cho iteration tiếp theo.",
  accent: "amber",
  withLabel: "CÓ Workflow",
  withoutLabel: "KHÔNG CÓ Workflow",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant FS as File System

    Dev->>IDE: "/handover"
    IDE->>LLM: Load workflow: handover.md

    LLM->>IDE: tool_call: bash("git log --oneline -20")
    IDE->>LLM: 20 commits gần nhất

    LLM->>IDE: tool_call: bash("git diff --stat HEAD~20")
    IDE->>LLM: 15 files changed, +450 -120 lines

    LLM->>IDE: tool_call: view_file("task.md")
    IDE->>LLM: Checklist: 8/10 tasks done, 2 in-progress

    Note over LLM: Tổng hợp → generate report
    LLM->>IDE: tool_call: edit_file → Create HANDOVER.md
    Note over LLM: Report gồm: Done, In-Progress, Blockers, Next Steps

    LLM->>IDE: "Handover report đã tạo: 8 tasks done, 2 in-progress, 1 blocker noted"
    IDE->>Dev: ✅ HANDOVER.md — sẵn sàng cho next iteration`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Tóm tắt những gì đã làm hôm nay"
    IDE->>LLM: Prompt (KHÔNG có workflow)

    Note over LLM: ⚠ Không có context conversation cũ
    LLM->>IDE: "Tôi không biết bạn đã làm gì. Hãy mô tả."
    IDE->>Dev: Yêu cầu Dev tự viết

    Dev->>Dev: Tự nhớ lại → viết report thủ công
    Note over Dev: Quên: fix bug ở PR #42, skip 2 in-progress tasks
    Dev->>Dev: Report thiếu context → next person mất thời gian onboard
    Note over Dev: ⚠ Knowledge gap giữa các iterations`,

  quiz: {
    question: "Diagram CÓ Workflow phía trên cho thấy workflow tự động generate report gồm: những gì đã làm, chưa xong, blocked items, và notes cho iteration tiếp theo. Handover Report giải quyết vấn đề gì trong team development?",
    options: [
      "A. Handover Report tự động extract time-tracking data (commit timestamps, session duration) giúp project manager đánh giá velocity và planning accuracy — đây là reporting tool cho management layer, không phải knowledge transfer tool",
      "B. Knowledge Continuity — đảm bảo context KHÔNG BỊ MẤT giữa các iterations/sessions, giúp developer tiếp theo tiếp tục hiệu quả",
      "C. Handover Report đáp ứng compliance requirement: ISO 27001 Clause A.12.1.2 yêu cầu 'documented operating procedures' cho mọi operational changes — Agent-generated reports tự động fulfill compliance documentation mà không cần manual effort",
      "D. Handover Report là human-readable version của git log: tóm tắt các commits gần nhất thành paragraphs dễ đọc cho non-technical stakeholders. Nội dung tương đương git log --oneline nhưng được LLM rewrite thành plain language"
    ],
    correctIndex: 1,
    explanation: "Knowledge Continuity: mỗi session tạo 'context' (gì đã làm, gì chưa xong, gì bị block). Nếu không ghi lại → context bị mất → next session phải 'khám phá lại'. Handover Report bảo toàn context đó.",
    theory: "Agent Memory: Trong Agentic SE, mỗi phiên làm việc tạo ra tri thức (what worked, what didn't, what's next). gmind lưu trữ tri thức này trong Knowledge Items, task.md, và handover reports — tạo 'institutional memory' cho team."
  }
};
