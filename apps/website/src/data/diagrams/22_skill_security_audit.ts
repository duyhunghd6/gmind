import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "22",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Security Audit tự động",
  description: "Agent Skill chạy SAST/DAST tools, kiểm tra CVE database — phát hiện lỗ hổng mà code review thủ công bỏ sót.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/security-audit

    Dev->>IDE: "Kiểm tra security cho project trước khi release"
    IDE->>LLM: Prompt + Loaded Skill [security-audit]

    LLM->>IDE: tool_call: bash("npm audit --json")
    IDE->>LLM: 3 vulnerabilities: lodash CVE-2021-23337, express path traversal
    LLM->>IDE: tool_call: bash("semgrep --config=p/owasp-top-ten src/")
    IDE->>LLM: SQL injection at src/db.ts:42, XSS at src/api.ts:15
    LLM->>IDE: tool_call: bash("trivy fs --severity HIGH,CRITICAL .")
    IDE->>LLM: 2 HIGH severity in Docker image

    LLM->>IDE: "Tìm thấy 5 issues: 2 SQL injection, 1 XSS, 2 CVE dependencies. Fix plan: ..."
    IDE->>Dev: ✅ Audit report + fix recommendations`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "Kiểm tra security cho project trước khi release"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Review code bằng "mắt" — hạn chế
    LLM->>IDE: "Tôi thấy một vài vấn đề tiềm ẩn: 1) SQL query ở db.ts có thể bị injection..."
    Note over LLM: Chỉ phát hiện patterns rõ ràng, bỏ sót CVE
    IDE->>Dev: ⚠ Phát hiện 1/5 issues — bỏ sót 4

    Dev->>Dev: Release → bị khai thác SQL injection
    Note over Dev: ⚠ Security breach vì review không đầy đủ`,

  quiz: {
    question: "Diagram CÓ Agent Skill phía trên cho thấy Skill chạy 3 tools liên tiếp: npm audit (dependencies) → semgrep (code patterns) → trivy (container images). Tại sao cần chạy NHIỀU tools thay vì chỉ 1 tool mạnh nhất?",
    options: [
      "A. Chạy nhiều tools tạo ra report dài hơn và chi tiết hơn, giúp stakeholders dễ audit hơn trong compliance review",
      "B. Defense in Depth — mỗi tool phát hiện loại vulnerability khác nhau: npm audit (dependencies), semgrep (source code patterns), trivy (container images)",
      "C. Chỉ cần chạy 1 tool mạnh nhất (như Snyk) là đủ vì tool hiện đại đã tích hợp tất cả các loại scan vào một platform duy nhất",
      "D. Chạy nhiều tools giúp kết quả chính xác hơn nhờ cơ chế majority voting — nếu 2/3 tools đồng ý thì vulnerability là real"
    ],
    correctIndex: 1,
    explanation: "Defense in Depth: không có 1 tool nào cover 100% vulnerabilities. npm audit chỉ check dependencies, semgrep check code patterns, trivy check container. Kết hợp tất cả → coverage tối đa.",
    theory: "Security Layers: SAST (Static Analysis - semgrep), DAST (Dynamic Analysis - OWASP ZAP), SCA (Software Composition Analysis - npm audit), Container Scanning (trivy). Agent Skills orchestrate tất cả layers tự động."
  }
};
