import type { DiagramEntry } from "./index";

export const diagram: DiagramEntry = {
  id: "20",
  group: "skill",
  groupLabel: "Agent Skills",
  title: "Docker Compose multi-service debug",
  description: "Agent Skill hiểu networking giữa containers — LLM thông thường đoán sai container names.",
  accent: "cyan",
  withLabel: "CÓ Agent Skill",
  withoutLabel: "KHÔNG CÓ Agent Skill",
  withMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM
    participant Skill as .agents/skills/docker-debug

    Dev->>IDE: "API không connect được Redis trong Docker Compose"
    IDE->>LLM: Prompt + Loaded Skill [docker-debug]

    Note over LLM: SKILL.md: đọc docker-compose.yml → hiểu network
    LLM->>IDE: tool_call: view_file("docker-compose.yml")
    IDE->>LLM: Services: api (port 3000), redis (port 6379), network: app-net

    LLM->>IDE: tool_call: bash("docker exec api ping redis -c 2")
    IDE->>LLM: ping: redis: Name or service not found
    Note over LLM: Container name ≠ service name
    LLM->>IDE: tool_call: bash("docker network inspect app-net")
    IDE->>LLM: redis container name: compose-redis-1

    LLM->>IDE: "Fix: dùng service name 'redis' (không phải container name). Kiểm tra cả network config."
    IDE->>Dev: ✅ Root cause: DNS resolution trong Docker network`,

  withoutMermaid: `sequenceDiagram
    autonumber
    actor Dev as Developer
    participant IDE as Agentic IDE
    participant LLM as Gemini LLM

    Dev->>IDE: "API không connect được Redis trong Docker Compose"
    IDE->>LLM: Prompt (KHÔNG có skill)

    Note over LLM: ⚠ Không biết cấu trúc docker-compose.yml
    LLM->>IDE: "Kiểm tra Redis host: có thể là 'localhost' hoặc 'redis'"
    Note over LLM: Đoán generic — thiếu context cụ thể
    IDE->>Dev: Gợi ý chung

    Dev->>Dev: Thử localhost → fail
    Dev->>Dev: Thử redis → fail
    Dev->>Dev: Google "docker compose redis connection" → mất 30 phút
    Note over Dev: ⚠ Vấn đề đơn giản nhưng debug lâu vì thiếu context`,

  quiz: {
    question: "Trong Docker Compose, tại sao LLM cần đọc docker-compose.yml TRƯỚC KHI debug networking?",
    options: [
      "A. Để LLM hiểu Docker version",
      "B. docker-compose.yml chứa SERVICE NAMES, NETWORKS, PORTS — đây là 'source of truth' cho cấu trúc multi-container, không thể đoán được",
      "C. Docker yêu cầu đọc file trước khi chạy lệnh",
      "D. Để LLM copy-paste config"
    ],
    correctIndex: 1,
    explanation: "docker-compose.yml là infrastructure-as-code: chứa topology (services, networks, volumes). LLM cần đọc file này để hiểu 'bản đồ' hệ thống — không thể đoán service names hay network config.",
    theory: "Infrastructure-as-Code (IaC): mọi configuration nên được mô tả trong files (docker-compose.yml, terraform, k8s manifests). Agent Skills dạy LLM đọc IaC files TRƯỚC KHI debug — giống developer phải đọc architecture docs trước."
  }
};
