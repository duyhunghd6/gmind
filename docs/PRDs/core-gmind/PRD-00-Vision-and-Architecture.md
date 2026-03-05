---
beads-id: br-prd00
title: "PRD 00: Tầm nhìn & Kiến trúc Tổng thể (Vision & Architecture)"
sections:
  - anchor: "1-boi-canh-van-de"
    title: "Bối cảnh & Vấn đề"
    beads-id: br-prd00-s1
  - anchor: "2-tong-quan-he-thong"
    title: "Tổng quan Hệ thống"
    beads-id: br-prd00-s2
  - anchor: "3-safe-roles-mapping"
    title: "Phân quyền Agent & SAFe Role Mapping"
    beads-id: br-prd00-s3
  - anchor: "4-escalation-ladder"
    title: "Escalation Ladder — 5 Cấp độ Xử lý Sự cố"
    beads-id: br-prd00-s4
---

# PRD 00: Tầm nhìn & Kiến trúc Tổng thể (Vision & Architecture)

<!-- beads-id: br-prd00 -->

## 1. Bối cảnh & Vấn đề (Problem Statement)

<!-- beads-id: br-prd00-s1 -->

Trong quá trình vận hành các đội ngũ AI đa tác nhân (Multi-agent Swarms), các tác nhân thường rơi vào trạng thái "mất trí nhớ cục bộ" hoặc thiếu tầm nhìn toàn cục do:

1. **RAG truyền thống (Semantic) thiếu cấu trúc:** Tìm kiếm vector thuần túy làm vỡ cấu trúc tham chiếu (imports/calls) của mã nguồn.
2. **Trạng thái phân mảnh:** Không có sự liên kết tự động giữa Tài liệu Yêu cầu (PRD), Trạng thái Công việc (Issue/Task), và Dòng mã thực tế (Code/Git).
3. **Lãng phí Token:** Nhồi nhét toàn bộ lịch sử chat hoặc hàng ngàn dòng code vào context window làm chậm tốc độ phản hồi và tăng chi phí.
4. **Xung đột đa tác nhân:** Thiếu cơ chế khóa tệp (file lease) và giao tiếp đồng bộ dẫn đến việc nhiều tác nhân ghi đè code lẫn nhau.

> ✅ **Nghiên cứu nền tảng (2026-02-28):** Đã phân tích **500+ vấn đề** ảnh hưởng hiệu suất phát triển phần mềm (10 categories: Knowledge Management, PM, AI in SE, Technical Debt...). gmind được thiết kế để giải quyết các vấn đề này thông qua Satisfaction Matrix. Xem [spike-500-performance-issues.md](../researches/spikes/spike-500-performance-issues.md), [spike-issue-satisfaction-matrix.md](../researches/spikes/spike-issue-satisfaction-matrix.md).

## 2. Tổng quan Hệ thống (System Architecture)

<!-- beads-id: br-prd00-s2 -->

Hệ thống `gmind` phân tách triệt để **5 lớp**: Dữ liệu (Storage — beads_rust/FrankenSQLite + Zvec), Giao thức kết nối (Routing/CLI), Thực thi (Agents), Xác minh (Verification CI/CD), và Trình bày (Presentation qua Go REST API). Code Intelligence được xử lý bởi **FastCode** (internal dependency của `gmind`, gọi qua `gmind search-codebase`).

> ✅ **Polyglot Monorepo (2026-03-02):** Gmind là dự án **Polyglot Monorepo** (Go + Rust + TypeScript). Root orchestrator: **Turborepo + pnpm**. Design System chia sẻ tại `packages/design-system/`. PRDs tập trung tại `docs/PRDs/` với namespacing theo subsystem (`core-gmind/`, `apps-website/`, `apps-webui/`). Xem [spike-polyglot-monorepo-design.md](../researches/spikes/spike-polyglot-monorepo-design.md).

```mermaid
graph TD
    subgraph StorageLayer["1. Storage Layer"]
        BR[("beads_rust / FrankenSQLite<br/>State & Issues SSOT")]
        Zvec[("Zvec Vector DB<br/>Docs & Chat History")]
    end

    subgraph ToolingLayer["2. Core Tooling Layer"]
        Beads["br CLI<br/>Issue Tracker"] --- BR
        Gmind["gmind CLI<br/>Context Synthesizer"] --- Zvec
        Gmind --- BR
        FastCode["fastcode CLI<br/>Code Intelligence (internal)"] -.-|"gmind search-codebase<br/>delegates internally"| Gmind
        Mail["mcp_agent_mail<br/>Messaging & File Locks"]
        GH["git + gh CLI<br/>GitHub Integration"]
    end

    subgraph ExecutionLayer["3. Execution / Agent Layer"]
        Claude["Claude / Sub-agents"] -->|"Search Docs & Fetch Context"| Gmind
        Claude -->|"Update State"| Beads
        Claude -->|"Coordinate"| Mail
        Claude -->|"Submit for Verification"| Verify
        Claude -->|"Query PRs, CI, Commits"| GH
    end

    subgraph VerificationLayer["4. Verification Layer - CI/CD Gate"]
        Verify["GitHub Actions CI<br/>Testing & Linting"]
        Verify -->|"Pass → Mark Complete"| Beads
        Verify -->|"Fail → Return to Agent"| Claude
    end

    subgraph GatewayLayer["5. API Gateway Layer"]
        GW["Go REST API<br/>Embedded FrankenSQLite"]
    end

    subgraph PresentationLayer["6. Web UI System - Beads Viewer PM Edition"]
        WebUI["Quản trị View Docs & Project Board"]
        Dashboard["1. Kanban Board & SAFe Views"] --- WebUI
        GateUI["2. Level 3 Approval Gates"] --- WebUI
        HitlGraph["3. HITL Document Graph"] --- WebUI
    end

    GH -->|"git + gh polling"| GitHub["GitHub Remote<br/>PRs, Actions, Issues"]
    WebUI -->|"Read/Write"| GW
    GW -->|"Query State"| BR
    GW -->|"Read Docs"| Zvec
```

## 3. Phân quyền Agent (Role-Based Authorization)

<!-- beads-id: br-prd00-s3 -->

> ✅ **Đã áp dụng theo khuyến nghị PO:** Phân chia rõ quyền hạn giữa các loại Sub-agent.

| Vai trò Agent          | Quyền hạn                                               |
| ---------------------- | ------------------------------------------------------- |
| **Sub-agent Code**     | Chỉ có quyền thao tác Execution (code, test, file lock) |
| **Sub-agent Reviewer** | Có quyền đánh `br close`, approve merge, escalate       |

- Sub-agent Code **không được phép** tự ý gọi `br close`. Chỉ Sub-agent Reviewer mới có quyền đóng task sau khi kiểm tra.
- Cơ chế này đảm bảo nguyên tắc **Four-Eyes Principle** (Hai người duyệt) — Agent viết code ≠ Agent duyệt code.

### 3.1. SAFe Role Mapping — Agentic Software House

<!-- beads-id: br-prd00-s3.1 -->

> ✅ **Thêm mới (2026-03-02):** Ánh xạ SAFe 6.0 roles sang Agentic config (2H + 18A). Xem [spike-roles-in-SAFe.md](../researches/spikes/spike-roles-in-SAFe.md).

| SAFe Role                        | Assigned To          | Quyền hạn trong gmind                               |
| -------------------------------- | -------------------- | --------------------------------------------------- |
| Epic Owner + LPM                 | Human (CEO)          | Investment decisions, L3 approvals                  |
| Business Owner + Enterprise Arch | Human (CTO)          | Business outcomes, architecture approvals           |
| RTE                              | Agent (Orchestrator) | Coordination, PI Planning, `gmind escalate/approve` |
| Product Manager (PMO)            | Agent (PMO)          | PRD, roadmap, WSJF priority, `gmind plan sync`      |
| System Architect                 | Agent (Architect)    | Architecture Runway, ADRs, NFR standards            |
| Scrum Master (×3)                | Agent (SM)           | Ceremonies, sprint tracking, L1 escalation          |
| Product Owner (×3)               | Agent (PO)           | Team backlog, user stories, accept/reject           |
| Developer (×6)                   | Agent (Dev)          | Code, test, file lock, `gmind search-codebase`      |
| QA (×3)                          | Agent (QA)           | Testing, audit, verification gate                   |

**Nguyên tắc cốt lõi:** Agents đề xuất, Humans phê duyệt. Phase transition = Level 3 Human Decision Required.

## 4. Escalation Ladder — 5 Cấp độ Xử lý Sự cố

<!-- beads-id: br-prd00-s4 -->

> ✅ **Thêm mới (2026-03-02):** Hệ thống phân 5 cấp escalation để xác định "ai xử lý cái gì". Xem [spike-roles-in-SAFe.md](../researches/spikes/spike-roles-in-SAFe.md), [spike-rte-approval-workflow.md](../researches/spikes/spike-rte-approval-workflow.md).

| Level | Tên                     | Ai xử lý            | Ví dụ                                                              |
| ----- | ----------------------- | ------------------- | ------------------------------------------------------------------ |
| L0    | Self-resolve            | Agent tự xử         | Compiler warnings, formatting, simple imports                      |
| L1    | Team Escalation         | SM/RTE Agent        | File conflicts cùng team, task dependency ordering                 |
| L2    | Human Intervention      | Human (CEO/CTO)     | Build errors agent sửa 3+ lần không được, architecture conflicts   |
| L3    | Human Decision Required | Human (phê duyệt)   | Phase transitions, budget/scope changes, plan approval gates       |
| L4    | Post-session Triage     | Human (sau session) | `bd list --status=in_progress`, `cargo test`, file unrecorded bugs |

**Agentic Config (Essential SAFe):** 2 Human (CEO + CTO kiêm Portfolio roles) + 18 AI Agents: 3 ART Leadership (RTE, PMO, Architect) + 15 Team Agents (3 teams × 5: SM + PO + Dev×2 + QA). Nguyên tắc: **Agents đề xuất, Humans phê duyệt.**
