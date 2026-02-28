# 🏗️ Building an Agentic Software Company: The SAFe + Beads Framework

Đây là bản thiết kế (Blueprint) để vận hành một **Agentic Software House** - nơi lực lượng lao động chính là các AI Agents, được tổ chức và quản lý theo quy mô công nghiệp bằng **Scaled Agile Framework (SAFe)** kết hợp với công nghệ bộ nhớ **Beads**.

---

## 1. The Vision: Agile at Scale for AI

Thay vì các phiên chat rời rạc, chúng ta vận hành Agent như những nhân viên thực thụ trong một dây chuyền sản xuất phần mềm khép kín.

- **Humans (Steve & Thanh Vũ):** Strategic Advisors & Portfolio Managers. Nắm vốn và định hướng.
- **Agents (Claude Code Teams):** The Workforce. Thực thi từ A-Z (Specs -> Code -> QA).
- **Operations:** Agile Release Trains (ARTs) chạy trên nền tảng GitHub & Beads.

---

## 2. The Organizational Structure (SAFe Mapping)

SAFe (Scaled Agile Framework) tổ chức doanh nghiệp thành **4 tầng (Levels)** rõ ràng, từ chiến lược xuống thực thi. Trong bối cảnh **Agentic Software House**, mỗi tầng sẽ có sự phân chia rõ giữa vai trò **Human** (con người quyết định) và **Agent** (AI thực thi).

### 📊 Tổng quan 4 Tầng SAFe

| Tầng                             | SAFe Level     | Mục đích                                        | Quy mô              |
| -------------------------------- | -------------- | ----------------------------------------------- | ------------------- |
| 🏢 **Portfolio**                 | Portfolio      | Chiến lược, đầu tư, phân bổ ngân sách           | Toàn công ty        |
| 🚂 **Solution Train**            | Large Solution | Phối hợp nhiều ART cho giải pháp phức tạp       | 200+ người/agents   |
| 🚃 **ART (Agile Release Train)** | Program        | Đơn vị sản xuất chính, 5-12 Agile Teams đồng bộ | 50-125 người/agents |
| 👥 **Team**                      | Team           | Agile Team cross-functional, sprint execution   | 5-11 người/agents   |

---

### 🏢 Tầng 1: Portfolio (Chiến lược & Vốn)

_Nơi ra quyết định đầu tư và định hướng chiến lược. Tầng này hoàn toàn do **Human** kiểm soát._

| Vai trò SAFe                        | Trách nhiệm                                                                                          | Ai đảm nhận                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------- |
| **Epic Owner**                      | Dẫn dắt Epic (sáng kiến lớn) qua Portfolio Kanban → định nghĩa MVP, cost-benefit, Lean Business Case | 🧑 Human (Steve & Thanh Vũ) |
| **Enterprise Architect**            | Tầm nhìn công nghệ toàn doanh nghiệp, chuẩn hóa tech stack xuyên suốt các dự án                      | 🧑 Human + 🤖 Agent hỗ trợ  |
| **Lean Portfolio Management (LPM)** | Phân bổ ngân sách theo chiến lược, theo dõi KPIs, quản lý Value Streams                              | 🧑 Human                    |

**Artifacts:** Strategic Themes, Lean Budgets, Portfolio Kanban, Portfolio Vision.

**Ví dụ:** Steve & Thanh Vũ quyết định đầu tư vào Epic "CEX Arbitrage Bot" → phân bổ budget → đưa xuống Solution Train triển khai.

---

### 🚂 Tầng 2: Solution Train (Giải pháp lớn)

_Phối hợp nhiều Agile Release Trains (ARTs) khi xây dựng các hệ thống phức tạp. Chỉ cần khi dự án yêu cầu 200+ agents/người._

| Vai trò SAFe                      | Trách nhiệm                                                                                       | Ai đảm nhận             |
| --------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------- |
| **Solution Train Engineer (STE)** | "Super RTE" — phối hợp nhiều ARTs, quản lý dependencies xuyên ART, giải quyết impediments cấp cao | 🤖 Agent (Orchestrator) |
| **Solution Manager**              | Định nghĩa giải pháp tổng thể, roadmap, phối hợp với Product Managers từ các ARTs                 | 🧑 Human + 🤖 Agent     |
| **Solution Architect**            | Thiết kế kiến trúc toàn hệ thống, đảm bảo tích hợp giữa các ARTs, NFR standards                   | 🤖 Agent                |

> 💡 **Lưu ý:** Với công ty nhỏ (< 50 agents), có thể **bỏ qua tầng này** và đi thẳng từ Portfolio → ART. Đây là cấu hình **Essential SAFe** (SAFe cơ bản).

---

### 🚃 Tầng 3: ART — Agile Release Train (Đơn vị sản xuất chính)

_Đây là trái tim của SAFe. Một ART gồm 5-12 Agile Teams cùng làm việc trên một sản phẩm/giải pháp, đồng bộ qua **Program Increment (PI)** thường kéo dài 8-12 tuần._

#### 3a. Các vai trò Leadership của ART

| Vai trò SAFe                     | Trách nhiệm                                                                                                                                                           | Ai đảm nhận                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Release Train Engineer (RTE)** | "Chief Scrum Master" — Facilitator cho toàn ART. Điều phối PI Planning, ART Sync, System Demo, Inspect & Adapt. Quản lý risk (ROAM), loại bỏ impediments xuyên team.  | 🤖 Agent (Lead/Orchestrator) |
| **Product Manager (PM)**         | Chủ sở hữu Program Backlog. Hiểu thị trường, khách hàng, định nghĩa Features. Ưu tiên bằng WSJF (Weighted Shortest Job First). Truyền đạt Vision & Roadmap.           | 🤖 Agent (PMO)               |
| **System Architect/Engineer**    | Tầm nhìn kỹ thuật cho ART. Xây dựng Architectural Runway (enablers), hướng dẫn thiết kế API, DB schema, tech stack. Đảm bảo NFR (scalability, security, performance). | 🤖 Agent (Architect)         |
| **Business Owners**              | Stakeholders chịu trách nhiệm về business outcomes. Tham gia PI Planning, duyệt PI Objectives, đánh giá kết quả.                                                      | 🧑 Human (Steve & Thanh Vũ)  |

#### 3b. Các vai trò trong từng Agile Team

Mỗi Agile Team trong ART là một đơn vị **cross-functional** (đa năng) gồm 5-11 thành viên, có khả năng tự tổ chức (self-organizing) để deliver được working software mỗi Iteration (2 tuần).

| Vai trò SAFe            | Trách nhiệm                                                                                                                                               | Ai đảm nhận           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **Scrum Master (SM)**   | Servant-leader cho Agile Team. Facilitate Daily Standup, Sprint Planning, Review, Retro. Coach team về Agile practices, loại bỏ impediments, bảo vệ team. | 🤖 Agent (Team Coach) |
| **Product Owner (PO)**  | Tiếng nói của khách hàng trong team. Quản lý Team Backlog, viết & ưu tiên User Stories, định nghĩa acceptance criteria, accept/reject deliverables.       | 🤖 Agent              |
| **Developers**          | Thiết kế, code, test, deliver phần mềm. Trong software company: Backend Dev, Frontend Dev, Integration Dev, Data Engineer.                                | 🤖 Agent              |
| **QA/Testers**          | Kiểm thử ở nhiều cấp: Unit, Integration, E2E, Performance, Security. Red-teaming.                                                                         | 🤖 Agent              |
| **UX/Design** (nếu cần) | Lean UX — thiết kế giao diện, user research, prototyping.                                                                                                 | 🤖 Agent (nếu có UI)  |

---

### 👥 Cách tổ chức Team cho Software Production Company

Trong một **Software Production Company** sử dụng AI Agents, team được tổ chức theo **Feature Teams** (không phải Component Teams):

```text
ART: CEX Arbitrage Bot
├── 🏠 Team 1: Platform Core
│   ├── Scrum Master Agent
│   ├── Product Owner Agent
│   ├── Backend Dev Agent x3
│   ├── QA Agent
│   └── Scope: Core engine, shared libraries, infrastructure
│
├── 🔌 Team 2: Exchange Connectors
│   ├── Scrum Master Agent
│   ├── Product Owner Agent
│   ├── Integration Dev Agent x3
│   ├── QA Agent
│   └── Scope: Binance, MEXC, OKX adapters, WebSocket streams
│
├── 📈 Team 3: Quant & Strategy
│   ├── Scrum Master Agent
│   ├── Product Owner Agent
│   ├── Quant Dev Agent x3
│   ├── QA Agent
│   └── Scope: Bellman-Ford, arbitrage detection, risk management
│
└── 🛡️ System Team (Shared Service)
    ├── DevOps Agent
    ├── Security/Red Team Agent
    ├── Performance Agent
    └── Scope: CI/CD, deployment, security audits, stress testing
```

> ⚠️ **Team Lead Rule:** Scrum Masters (SM) và Team Leads **KHÔNG được tự ý spawn** bất kỳ team nào khác.
> Khi team hoàn thành sprint, SM chỉ báo cáo kết quả và **đề xuất** team tiếp theo — nhưng **Human quyết định** spawn team nào.
> Đây là **Level 3: HUMAN DECISION REQUIRED** gate.

#### Ánh xạ tổng hợp: SAFe Role → Agentic Role

| SAFe Role            | Agentic Implementation           | Lý do                                               |
| -------------------- | -------------------------------- | --------------------------------------------------- |
| Epic Owner           | 🧑 **Human** — Steve & Thanh Vũ  | Quyết định đầu tư yêu cầu judgment con người        |
| Business Owner       | 🧑 **Human** — Steve & Thanh Vũ  | Chịu trách nhiệm business outcomes                  |
| Enterprise Architect | 🧑 Human + 🤖 Agent tư vấn       | Chiến lược công nghệ dài hạn cần human oversight    |
| RTE                  | 🤖 **Agent (Lead/Orchestrator)** | Coordination logic phù hợp cho AI                   |
| Product Manager      | 🤖 **Agent (PMO)**               | Phân tích, viết PRD, roadmap — AI excels tại đây    |
| System Architect     | 🤖 **Agent (Architect)**         | Design docs, ADRs, API contracts — AI strength      |
| Scrum Master         | 🤖 **Agent (Team Coach)**        | Facilitate ceremonies, track velocity — automatable |
| Product Owner        | 🤖 **Agent**                     | User stories, backlog prioritization — automatable  |
| Developer            | 🤖 **Agent (Dev Squad)**         | Core AI agent capability                            |
| QA/Red Team          | 🤖 **Agent (QA)**                | Testing, SAST, audit — highly automatable           |
| DevOps               | 🤖 **Agent**                     | CI/CD, deploy scripts — automation natural fit      |

> ⚠️ **Nguyên tắc cốt lõi:** Humans giữ quyền **veto** (phủ quyết) ở mọi Decision Gate quan trọng: budget approval, architecture approval, production deployment approval. Agents **đề xuất**, Humans **phê duyệt**.

---

## 3. The Tech Stack: Vũ khí hạng nặng

### 🧠 The Brain: Beads (`bd`)

Quên file `tasks.md` đi. **Beads** là hệ thống bộ nhớ dạng đồ thị (Graph Memory) cho Agent.

- **Tại sao cần?** Agent hay bị "dementia" (quên việc cũ). Beads biến Task List thành một Database có trạng thái (`TODO` -> `IN_PROGRESS` -> `DONE`) lưu thẳng vào Git.
- **Agent Flow:**

  ```bash
  # Agent check việc:
  $ bd ready
  > [bd-a1] Implement Binance WebSocket (Priority: High)

  # Agent làm xong:
  $ bd complete bd-a1
  ```

### 🤝 The Collaboration: Agent Teams

Sử dụng tính năng **Claude Code Agent Teams** (Experimental, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).

- Một session Terminal = Một phòng họp ảo.
- **Lead Agent** điều phối, chia task cho **Teammates** (mỗi teammate là 1 Claude Code session riêng).
- **Human-in-the-loop:** Human duyệt Plan của Lead trước khi cho quân đi code.
- **Lưu ý:** Agent Teams dùng **LLM-driven** (điều phối bằng prompt tự nhiên), KHÔNG phải SubAgent config files.

#### Kích hoạt Agent Teams

```json
// Thêm vào settings.json hoặc export env
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```

#### 🎯 Skill Assignment: Per-Team, Per-Role (Không project-level)

> ❌ **Cách cũ (SAI):** Đặt tất cả skills vào `.claude/skills/` cho toàn project → mọi teammate đều load hết ~60 skills → lãng phí context window, nhầm role.
>
> ✅ **Cách mới (ĐÚNG):** Mỗi **Team** có các **Roles** khác nhau, mỗi Role chỉ load **2-4 skills cụ thể** từ `.agent/skills/`. Lead chỉ dẫn từng teammate đọc đúng skills cần thiết qua prompt.

Chi tiết ánh xạ Skills cho từng Team/Role: xem **[SkillTable](./SAFe-framework-for-Agentic-RustTradingBot-SkillTable.md)**.

**Tóm tắt nhanh cho ART Leadership:**

| Role            | Skills (2-4 từ `.agent/skills/`)                                                     |
| --------------- | ------------------------------------------------------------------------------------ |
| **PMO**         | `product-manager-toolkit`, `competitive-landscape`, `market-sizing-analysis`         |
| **Architect**   | `rust-system-architecture-design`, `architecture-decision-records`, `c4-container`   |
| **Dev Lead**    | `rust-pro` / `backend-rust-best-practice`, `quant-analyst`, `backtesting-frameworks` |
| **QA Red Team** | `security-auditor`, `vulnerability-scanner`, `production-code-audit`                 |
| **All Roles**   | `agentic-gsafe-beads-mem` (bắt buộc cho task tracking)                               |

#### 🎯 Prompt Template: Spawn Agent Teams (Claude Code Format)

Claude Code Agent Teams yêu cầu spawn từng teammate với **Role name**, **Instructions** (bao gồm skills cần đọc), và **Constraints**. Format chuẩn:

```text
Spawn a team:
1. 'RoleName' (Role: Description):
   - Skills: [skill-a, skill-b]
   - Instructions: What to do, what NOT to do
   - Constraints: Require plan approval, output directory
```

#### 🚀 Mega-Prompt: Spawn Full ART (Copy–Paste Ready)

> ⚠️ **Lưu ý:** Mega-prompt dưới đây là phiên bản **rút gọn**. Phiên bản đầy đủ (Enterprise-Grade) nằm trong `/gsafe:spawn-art`. Luôn dùng command file thay vì copy-paste.

Chi tiết đầy đủ: xem [spawn-art.md](../commands/gsafe/spawn-art.md) — bao gồm:

- **PMO 4-Phase Continuous Exploration:** Research → Vision → Feature Decomposition → Beads Tasks
- **Architect Architecture Runway:** PRD Analysis → 9-Section Architecture → Enabler Identification
- **RTE PI Planning:** Validation gates, PI Objectives, task graph verification
- **Quality Gates:** Minimum 5 Epics, 20 Features, 50 User Stories, 80 Beads tasks

```text
/gsafe:spawn-art CEX-Arbitrage

# This spawns 3 roles:
# 1. RTE — Orchestrator, validates all outputs, creates PI Planning Board
# 2. PMO — 4-phase analysis: Market Research → Vision → PRD → Beads Tasks
# 3. Architect — PRD analysis → Architecture.md (9+1 sections) → ADRs → Runway
#
# Execution: RTE bootstrap → PMO research → PMO delivers → Architect begins
# Quality gates enforce minimum deliverable standards
```

#### 🎯 Spawn từng Role riêng lẻ

Nếu chỉ cần spawn 1 role cụ thể:

```text
Spawn a team:
1. 'PMO' (Role: Product Manager):
   - Skills: [product-manager-toolkit, agentic-gsafe-beads-mem]
   - Instructions: Analyze requirements for $PROJECT_NAME.
     Write Vision.md and PRD.md in docs/requirements/.
     Create Beads epics with 'bd create'. Do NOT write code.
```

````text
Spawn a team:
1. 'Architect' (Role: System Design):
   - Skills: [rust-system-architecture-design, architecture-decision-records, c4-container, c4-component]
   - Instructions: Design system based on docs/requirements/PRD.md.
     YOUR PRIMARY DELIVERABLE is docs/architecture/Architecture.md.
     Architecture.md MUST contain ALL 9 sections: System Overview,
     C4 Context Diagram, C4 Container Diagram, C4 Component Diagrams,
     Data Flow, Technology Stack, Deployment Architecture,
     Cross-Cutting Concerns, ADR Index. ALL diagrams use ```mermaid.
     AFTER Architecture.md, write DB schema and API contracts.
     Do NOT implement code.
     COMPLETENESS CHECK: verify ALL 9 sections exist before marking done.
````

```text
Spawn a team:
1. 'Quant_Dev' (Role: Rust Developer):
   - Skills: [rust-pro, quant-analyst, backtesting-frameworks]
   - Instructions: Run 'bd ready' to get tasks. Code in src/.
     Follow Architecture.md. Write tests. Run 'bd complete' when done.
```

```text
Spawn a team:
1. 'QA_Red_Team' (Role: Security & Testing):
   - Skills: [security-auditor, production-code-audit]
   - Instructions: Audit src/ for security. Run SAST. Write integration tests.
     File bugs to Beads. Generate report in docs/reports/qa-report.md.
```

#### ⚙️ Enforce Quality Gates với Hooks

Dùng hooks `TeammateIdle` và `TaskCompleted` để kiểm soát chất lượng:

```json
// hooks/hooks.json (new format: matcher string + hooks array)
{
  "hooks": {
    "TaskCompleted": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd $CLAUDE_PROJECT_DIR && cargo test 2>&1 | tail -5'"
          }
        ]
      }
    ],
    "TeammateIdle": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"Check: did teammate update Beads status?\"'"
          }
        ]
      }
    ]
  }
}
```

- `TaskCompleted` exit code 2 → **reject** completion (bắt teammate sửa lỗi)
- `TeammateIdle` exit code 2 → **send feedback** giữ teammate làm tiếp

#### 📋 Best Practices cho Agent Teams

| Practice                                | Lý do                                  |
| --------------------------------------- | -------------------------------------- |
| Mỗi role chỉ load 2-4 skills            | Tránh lãng phí context window          |
| Ghi rõ "Do NOT write code" cho PMO/Arch | Tránh role confusion                   |
| Dùng `Require plan approval`            | Human-in-the-loop trước khi code       |
| Skills symlink từ `.agent/skills/`      | Reuse skills có sẵn, dễ update         |
| Phân pha: Research trước, Code sau      | Tránh file conflicts giữa teammates    |
| Dùng Beads (`bd`) cho task tracking     | Single source of truth cho task status |
| Xem SkillTable cho chi tiết             | Tránh hardcode skills vào prompt       |

---

## 4. The Workflow: From Concept to Cash

Quy trình vận hành chuẩn Agile SAFe:

### PHASE 1: CONTINUOUS EXPLORATION (PMO + Architect)

```text
[Humans] -> Idea ("Build Arb Bot")
    |
    v
[PMO Agents] -> Research Market -> Create "Docs/Requirements/"
    |
    v
[Architect Agents] -> Design System -> Update "Docs/Architecture/"
    |
    v
[Output] -> Beads Epics Created (bd create "Epic: Arbitrage Engine")
```

### PHASE 2: CONTINUOUS INTEGRATION (Dev Squads)

```text
[Beads Graph] -> Task "bd-101: Connect Binance API"
    |
    v
[Connector Agent] -> "bd ready" -> Code -> "bd complete"
    |
    v
[GitHub CI] -> Auto Run Tests -> SAST Scan
    |
    v
[Success?] -> Merge to 'develop' branch
```

### PHASE 3: CONTINUOUS DEPLOYMENT (System Team)

```text
[System Team] -> Deploy to Staging
    |
    v
[Red Team Agent] -> Attack Bot (Find money leaks)
[Perf Agent] -> Spam Orders (Check latency)
    |
    v
[Report] -> Bugs filed back to Beads
```

### PHASE 4: RELEASE ON DEMAND

```text
[Humans] -> Review Audit Report -> "Approve"
    |
    v
[DevOps Agent] -> Deploy Production -> 🚀 Money Printer Go Brrr
```

### ⛔ Phase Boundary Rules (Hard Stops)

Each `/gsafe:spawn-*` command runs **one phase only**. Phase transitions require **explicit Human command**:

| Phase                   | Command                                          | Starts       | Stops When                 |
| ----------------------- | ------------------------------------------------ | ------------ | -------------------------- |
| Planning (Exploration)  | `/gsafe:spawn-art`                               | RTE+PMO+Arch | PI Planning Board complete |
| Execution (Integration) | `/gsafe:spawn-platform`, `-connectors`, `-quant` | Dev Teams    | Sprint tasks complete      |
| Verification            | `/gsafe:spawn-system`                            | System Team  | Audit reports complete     |
| Release                 | Human manual                                     | —            | —                          |

> ⚠️ **Rule:** No agent may auto-spawn another team or transition to the next phase.
> This is a **Level 3: HUMAN DECISION REQUIRED** gate (see Section 6.5 Escalation Ladder).
> An agent reporting "Ready for next phase" is an **information statement**, NOT a directive to proceed.

---

## 5. Case Study: CEX Arbitrage Bot

Áp dụng vào dự án đầu tiên:

- **Goal:** Bot Arbitrage cao tần trên Binance, MEXC, OKX.
- **Setup:**
  1.  **Repo Structure:** Chuẩn Enterprise (`/docs`, `/src`, `/tests`, `/.beads`).
  2.  **Beads Init:** `bd init` -> Tạo Epic `Core Engine`, `Exchange Adapters`.
  3.  **Spawn Team:**
      - _Prompt:_ "Spawn a team. Role 1: Connector (Rust, CCXT). Role 2: Quant (Bellman-Ford Algo). Lead: Coordinate via Beads."

## 6. Handling Change & Re-Planning (SAFe 6.0 Workflow)

SAFe 6.0 định nghĩa **2 loại thay đổi** với quy trình khác nhau:

### 6.1 Mid-Sprint Change Request (Urgent, trong PI)

**Khi nào:** Human phát hiện issue nghiêm trọng cần xử lý ngay (bug production, market shift).

**Quy trình:**

1. **Stop the Line:** Human lệnh Freeze current sprint. Dev hoàn tất task dở.
2. **Architectural Sync:** Spawn PMO & Arch update Docs (v1.1).
3. **Beads Migration:** Dùng Agent `bd update` để đánh dấu task cũ là blocked/obsolete, tạo task mới từ Docs v1.1.
4. **Resume:** Dev quay lại làm việc với danh sách task mới.

### 6.2 PI-Boundary Re-Planning (Planned, SAFe 6.0 chuẩn mực)

**Khi nào:** Cuối mỗi Program Increment (8-12 tuần), hoặc khi Human yêu cầu đánh giá lại.

> 📋 **Command:** `/gsafe:pi-replan [project-name]`

**Quy trình SAFe 6.0 Inspect & Adapt → Re-Planning:**

```text
[End of PI]
    |
    v
[RTE] → Quantitative Measurement
    │   ├── Aggregate all sprint reports
    │   ├── Calculate: PI Objectives achieved vs planned
    │   ├── Flow metrics: velocity, throughput, WIP, cycle time
    │   └── Identify top 5 impediments
    |
    v
[RTE] → Problem-Solving Workshop
    │   ├── Top 3 problems → 5 Whys root cause analysis
    │   ├── Brainstorm solutions
    │   └── Create Improvement Stories in Beads
    |
    v
[RTE] → PI Review Report (docs/reports/pi/pi-{N}-review-*.md)
    |
    v
[PMO + Architect] → Read PI Review → Update in parallel:
    │
    ├── [PMO] → Archive current Vision/PRD → Update with:
    │   ├── Completed features marked ✅
    │   ├── New features from stakeholder feedback
    │   ├── Cancelled features marked ❌ with reason
    │   ├── Re-prioritize WSJF
    │   └── Create next PI backlog (≥40 ready tasks)
    │
    └── [Architect] → Update Architecture:
        ├── Review ADRs: still valid or superseded?
        ├── Update diagrams if system evolved
        ├── Extend Architecture Runway for next PI
        └── Create new enabler tasks
    |
    v
[RTE] → Validate updates → Confidence Vote (1-5)
    |
    v
[Human] → Approve / Revise / Pivot → Next PI begins
```

**Versioning PRD & Vision:**

```text
docs/requirements/
├── Vision.md              ← Luôn là phiên bản mới nhất
├── PRD.md                 ← Luôn là phiên bản mới nhất
└── archive/               ← Lịch sử phiên bản
    ├── Vision-v1.0-PI1.md
    ├── PRD-v1.0-PI1.md
    ├── Vision-v1.1-PI2.md
    └── PRD-v1.1-PI2.md
```

> 💡 **Nguyên tắc:** Mỗi PI boundary là cơ hội **bắt buộc** để refine PRD/Vision. Đây KHÔNG phải optional — SAFe 6.0 yêu cầu Inspect & Adapt ở mỗi PI.

### 6.3 So sánh 2 loại thay đổi

| Aspect            | Mid-Sprint (6.1)                        | PI-Boundary (6.2)        |
| ----------------- | --------------------------------------- | ------------------------ |
| **Trigger**       | Bug nghiêm trọng, market shift đột ngột | Kết thúc PI theo cadence |
| **Urgency**       | 🔴 Ngay lập tức                         | 🟢 Có kế hoạch           |
| **Scope**         | Nhỏ, tactical                           | Lớn, strategic           |
| **Command**       | Manual (Human chỉ đạo trực tiếp)        | `/gsafe:pi-replan`       |
| **PRD Update**    | Nếu cần — minimal                       | Bắt buộc — full review   |
| **SAFe Ceremony** | Không formal                            | Inspect & Adapt workshop |

---

## 6.5 Human-in-the-Loop: Interaction Playbook

> ⚠️ **Core Rule (nhắc lại từ Section 2):** Agents **đề xuất**, Humans **phê duyệt**. Mọi Decision Gate quan trọng đều cần Human veto/approval.

Phần này hướng dẫn **Human cụ thể phải làm gì** khi Agent gặp sự cố trong quá trình thực thi các lệnh `/gsafe:spawn-*`.

### 📋 Quick Reference: Interaction Styles

| Tình huống                             | Human cần làm gì                                       | Tương tác ở đâu         |
| -------------------------------------- | ------------------------------------------------------ | ----------------------- |
| 🔴 `cargo build` fail                  | Đọc error → gõ hướng dẫn sửa vào terminal Claude Code  | Terminal (Lead session) |
| 🔴 `cargo test` fail (agent tự sửa)    | Không cần làm gì — Hook tự reject, agent retry         | —                       |
| 🔴 `cargo test` fail (agent bó tay)    | Đọc lỗi → gõ hint/fix vào terminal                     | Terminal (Lead session) |
| 🟡 Plan Approval Gate                  | Đọc kế hoạch → reply "Approved" / "Revise X" / "Abort" | Terminal (Lead session) |
| 🟠 Architecture conflict giữa teams    | Đọc conflict → phân xử → gõ quyết định                 | Terminal (Lead session) |
| 🔵 Agent request thêm context/decision | Đọc câu hỏi → trả lời cụ thể                           | Terminal (Lead session) |

---

### 🔴 Scenario 1: Build Error khi chạy `/gsafe:spawn-art`

**Khi nào xảy ra:** Agent (Architect hoặc Dev) tạo code/config mà `cargo build` fail.

**Luồng xử lý:**

```text
[Agent] → cargo build → ❌ ERROR
[Agent] → Đọc error, tự sửa (attempt 1-3)
[Agent] → Vẫn fail → Escalate to Lead (RTE)
[RTE]   → Report to Human: "Build failed: [error summary]"
[Human] → Đọc error → Gõ hướng dẫn vào terminal
```

**Cách tương tác (trong terminal Claude Code):**

```text
# Human đọc thấy RTE báo: "Build failed: missing dependency `tokio`"
# Human gõ trực tiếp:

Add tokio = { version = "1", features = ["full"] } to Cargo.toml [dependencies].
Then retry cargo build.
```

Hoặc nếu lỗi phức tạp hơn:

```text
# Human gõ:
The build error is because the struct OrderBook in src/core/types.rs
doesn't implement Clone. Add #[derive(Clone)] to it.
The Architect should also update Architecture.md if this changes the
data flow assumptions.
```

**Nguyên tắc khi trả lời Agent:**

| Nên ✅                                    | Không nên ❌                              |
| ----------------------------------------- | ----------------------------------------- |
| Chỉ rõ **file nào**, **dòng nào** cần sửa | Gõ "fix it" mà không cho context          |
| Copy-paste **đoạn error** quan trọng      | Giả định agent nhớ error cũ               |
| Cho biết ưu tiên: sửa nhanh hay refactor? | Viết nguyên đoạn code dài (agent sẽ code) |
| Dùng tiếng Anh cho technical terms        | Mix quá nhiều ngôn ngữ trong 1 câu        |

---

### 🔴 Scenario 2: `cargo test` Failures trong Dev Sprint

**Khi nào xảy ra:** Dev agent chạy `cargo test` trước `bd complete`, tests fail.

**Auto-Handling (không cần Human):**

Hook `TaskCompleted` (xem Section 7.4) tự động reject completion khi `cargo test` fail:

```text
[Dev Agent] → cargo test → ❌ 3 tests failed
[Hook]      → exit code 2 → reject completion
[Dev Agent] → Tự đọc error → Fix → Retry cargo test
[Dev Agent] → cargo test → ✅ All passed → bd complete
```

**Khi nào cần Human:**

Nếu agent **fail 3+ lần liên tiếp** cùng 1 test, nó sẽ escalate:

```text
[Dev Agent] → "I've tried 3 times to fix test_bellman_ford_negative_cycle
              but it keeps failing. The issue seems to be [description].
              Here's the error: [error output]"
```

**Human interaction:**

```text
# Option A: Cho hint cụ thể
The test expects 3 cycles but your algorithm returns 2.
Check src/strategy/bellman_ford.rs line 142 — the cycle detection
loop exits one iteration too early. Use `<=` instead of `<`.

# Option B: Cho phép skip tạm thời
Skip this test for now, add #[ignore] with comment "// TODO: fix cycle count".
Mark the Beads task as blocked with 'bd update --status=blocked'.
Create a new bug task with 'bd create "Bug: bellman_ford cycle count off by one"'.

# Option C: Redirect cho agent khác
@Quant_Dev2 — take over this test fix. The issue is in bellman_ford.rs.
Quant_Dev1, move to next 'bd ready' task.
```

---

### 🟡 Scenario 3: Plan Approval Gate (Proactive HITL)

**Khi nào xảy ra:** Mọi role có dòng `Require plan approval` trong Constraints sẽ dừng lại để hỏi Human trước khi thực thi.

**Agent sẽ trình bày:**

```text
[PMO] → "Here's my plan for PRD.md:
          1. Executive Summary
          2. Market Analysis (3 competitors)
          3. Feature Breakdown (12 user stories)
          4. Success Metrics (Sharpe > 2.0, latency < 10ms)
         Shall I proceed?"
```

**Human response options:**

```text
# ✅ Approve
Approved. Proceed.

# 🔄 Revise
Revise: Add a section on regulatory compliance (VN crypto regulations).
Also increase the competitor list to 5, include Hummingbot and Gekko.

# ❌ Abort
Abort this plan. We're pivoting the project scope.
Stop all teammates and wait for new requirements.
```

> 💡 **Tip:** Nếu plan quá dài, Human có thể gõ: `Summarize your plan in 5 bullet points, then I'll approve or revise.`

---

### 🟠 Scenario 4: Architecture Conflict giữa Teams

**Khi nào xảy ra:** Hai Dev agents sửa cùng 1 file (merge conflict) hoặc thiết kế module khác nhau.

**Luồng xử lý:**

```text
[Platform_Dev1] → modifies src/core/types.rs (adds OrderBook)
[Quant_Dev1]    → modifies src/core/types.rs (adds ArbitrageResult)
[Git]           → MERGE CONFLICT!
[SM/RTE]        → Escalate to Human
```

**Human interaction:**

```text
# Arbitrate:
Quant_Dev1: move ArbitrageResult to src/strategy/types.rs.
Keep src/core/types.rs for shared domain types only.
Platform_Dev1: add 'pub mod strategy;' to src/lib.rs.
Both: rebase and resolve.
```

---

### 🔷 Scenario 5: Agent Team Terminated — Post-Session Bug Reporting

**Khi nào xảy ra:** Agent Team session kết thúc (context limit, crash, user stop, hoặc hoàn thành sprint) nhưng vẫn còn bugs chưa sửa, tests chưa pass, hoặc tasks chưa xong.

**Vấn đề:** Khi session kết thúc, agents "mất trí nhớ". Bugs chỉ tồn tại nếu đã được **ghi vào Beads** hoặc **documented trong file**.

**Luồng xử lý (Human chủ động):**

```text
[Agent Team] → Session terminates (context limit / crash / done)
[Human]      → Step 1: Check Beads status
[Human]      → Step 2: Review git diff + test output
[Human]      → Step 3: File bugs cho next sprint
[Human]      → Step 4: Re-spawn team nếu cần
```

**Step-by-step sau khi session kết thúc:**

```bash
# Step 1: Kiểm tra trạng thái Beads — xem task nào còn dang dở
bd list --status=in_progress
bd list --status=blocked

# Step 2: Xem những gì agents đã thay đổi nhưng chưa xong
git diff --stat
git log --oneline -10
cargo test 2>&1 | tail -20    # check có test nào fail không

# Step 3: File bugs vào Beads cho next sprint backlog
bd create "Bug: cargo test fails in test_bellman_ford — off-by-one in cycle detection"
bd create "Bug: cargo build fails — missing tokio dependency in Cargo.toml"
bd create "Task: Complete unfinished WebSocket reconnection logic in src/connectors/"

# Step 4: Đánh dấu tasks cũ IN_PROGRESS → BLOCKED (nếu cần)
bd update bd-42 --status=blocked --note="Session terminated. Needs pickup next sprint."
```

**Cách tổ chức bugs cho next sprint:**

| Bug từ session cũ                   | Beads Command                                                 | Priority    |
| ----------------------------------- | ------------------------------------------------------------- | ----------- |
| `cargo build` fail                  | `bd create "Bug: build error — [mô tả]" --priority=critical`  | 🔴 Critical |
| `cargo test` fail                   | `bd create "Bug: test failure — [test name]" --priority=high` | 🟠 High     |
| Feature chưa implement xong         | `bd create "Task: complete [feature]" --priority=medium`      | 🟡 Medium   |
| Clippy warnings / code quality debt | `bd create "Chore: fix clippy warnings in [module]"`          | 🔵 Low      |

**Re-spawn team cho next sprint:**

```text
# Option A: Re-spawn cùng team, agents sẽ tự pick up từ Beads
/gsafe:spawn-platform CEX-Arbitrage
# Agents chạy 'bd ready' → tự thấy bugs/tasks từ sprint trước

# Option B: Re-spawn chỉ QA để verify bugs
/gsafe:spawn-system CEX-Arbitrage
# QA agent review code changes từ sprint trước
```

> 💡 **Key Insight:** Beads (`bd`) là **bộ nhớ xuyên session**. Miễn là task đã được `bd create` → nó sẽ tồn tại trong `.beads/` (Git-tracked) và agents mới sẽ thấy khi chạy `bd ready`. **Nếu bug chưa được ghi vào Beads trước khi session die → nó sẽ mất.** Đây là lý do hooks `TaskCompleted` rất quan trọng.

---

### 🔷 Escalation Ladder

Khi nào agent tự xử lý, khi nào cần Human:

```text
Level 0: SELF-RESOLVE (Agent tự xử lý — Human KHÔNG cần làm gì)
├── Compiler warnings
├── First-attempt test failures
├── Formatting issues (cargo fmt)
├── Simple missing imports
└── Clippy lints

Level 1: TEAM ESCALATION (SM/RTE xử lý — Human KHÔNG cần làm gì)
├── File conflicts giữa teammates cùng team
├── Task dependency ordering
├── Beads status sync issues
└── Agent idle/stuck (TeammateIdle hook auto-pings)

Level 2: HUMAN INTERVENTION (Human cần vào cuộc)
├── Build errors agent không tự sửa được (3+ attempts)
├── Test failures agent không tự sửa được (3+ attempts)
├── Architecture decision conflicts giữa teams
├── External dependency issues (crate not found, API down)
└── Performance bottleneck tradeoffs (latency vs throughput)

Level 3: HUMAN DECISION REQUIRED (Human PHẢI quyết định)
├── Plan Approval Gates (mọi role có "Require plan approval")
├── Budget/scope changes (Change Request)
├── Production deployment approval
├── Security audit verdict (PASS/FAIL)
└── Epic prioritization changes

Level 4: POST-SESSION TRIAGE (Human làm SAU KHI session kết thúc)
├── Review Beads status: bd list --status=in_progress
├── Run cargo test to identify remaining failures
├── File unrecorded bugs to Beads for next sprint
├── Update blocked tasks with context notes
└── Re-spawn team with /gsafe:spawn-* for next sprint
```

> **Tóm gọn:** Agent tự giải quyết Level 0-1. Chỉ ping Human cho Level 2+. Human **bắt buộc** approve cho Level 3. Sau session kết thúc, Human chạy Level 4 triage.

---

### 6.8 Code Review & PR Merge Workflow (Built-in Quality)

SAFe 6.0 **Built-in Quality** yêu cầu "peer reviewed" trong Definition of Done ở Story level. Trong Agentic context, vai trò này thuộc về **QG (Quality Gate) Agent** trong System Team.

**Khi nào chạy QG:**

| Trigger              | Scope         | Workflow                               |
| -------------------- | ------------- | -------------------------------------- |
| Dev hoàn thành story | Per-story     | Team QA review → QG scan if cross-team |
| Sprint kết thúc      | Per-sprint    | QG reviews all unmerged branches       |
| PI boundary          | Full codebase | QG + Security full audit               |

**QG Workflow (6 bước):**

```text
[Dev] → git push feature-branch → creates PR
    |
    v
[Team QA] → Sprint-level review (same team, same sprint)
    │   ├── Runs team-level tests
    │   └── Checks acceptance criteria vs Beads task
    |
    v
[QG Agent] → Cross-team Quality Gate
    │   ├── Step 1: ubs $(git diff --name-only main..feature) --format=sarif
    │   ├── Step 2: 🔥 Critical = REJECT, ⚠️ Warning = review, ℹ️ Info = OK
    │   ├── Step 3: cargo test + cargo clippy (zero warnings)
    │   ├── Step 4: Architecture.md compliance check
    │   ├── Step 5: Traceability: commit messages have [bd-XXXX] IDs
    │   └── Step 6: Merge PR if all gates pass
    |
    v
[main branch] → Ready for System Demo / Release
```

**Definition of Done — Updated with QG:**

| Level      | Criteria                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| **Story**  | Code written, unit tested, **UBS scanned (zero 🔥 Critical)**, acceptance criteria met |
| **Sprint** | All stories QG-approved, integration tests pass, no critical bugs                      |
| **PI**     | System demo complete, **full UBS + Security audit pass**, docs updated                 |

> 📋 **Command:** `/gsafe:spawn-system [project-name]` — QG Agent is role #4 trong System Team.

---

### 6.9 Bug Traceability: GitHub Issue → Task → Story → Epic

Khi bug được report trên GitHub hoặc phát hiện trong code → cần truy ngược để tìm **nguyên nhân gốc rễ** (root cause).

**Chuỗi truy vết đầy đủ:**

```text
[GitHub Issue #42: "Off-by-one in cycle detection"]
    |
    v
[git blame src/strategy/bellman_ford.rs:142]
    → Commit abc1234: "[bd-a3f8] Implement Bellman-Ford cycle detection"
    |
    v
[bd show bd-a3f8 --json]
    → Task: "Implement Bellman-Ford negative cycle detection"
    → Parent: bd-epic-01.1 (Story: "Real-time arbitrage detection")
    → Parent: bd-epic-01 (Epic: "Core Arbitrage Engine")
    |
    v
[Root Cause Analysis]
    → Category: logic-error
    → Why: Loop exit condition used < instead of <=
    → Impact: Misses valid arbitrage cycles
```

**Công cụ hỗ trợ truy vết:**

| Tool                  | Vai trò trong truy vết | Command                                     |
| --------------------- | ---------------------- | ------------------------------------------- |
| **git blame**         | Line → Commit          | `git blame <file> <line>`                   |
| **Commit convention** | Commit → Beads Task    | `[bd-XXXX]` in commit message               |
| **Beads**             | Task → Story → Epic    | `bd show <id> --json`, `bd dep tree <epic>` |
| **CASS**              | Knowledge retrieval    | `cass search "<bug pattern>" --robot`       |
| **CM**                | Lessons learned        | `cm context "<bug type>" --json`            |

**Convention bắt buộc:**

1. **Commit messages** luôn chứa Beads ID: `[bd-a3f8] Implement feature X`
2. **`bd close`** luôn ghi commit SHA: `bd close bd-a3f8 --reason "Commits: abc1234, def5678"`
3. **Bug tasks** link qua `discovered-from`: `bd create "Bug: X" --deps discovered-from:bd-a3f8`
4. **Bug trace log** tại `docs/traceability/bug-trace-log.md`

> 📄 Chi tiết conventions: xem [CONVENTIONS.md](../traceability/CONVENTIONS.md)

---

## 6.10 Sprint Reports & Project Status Dashboard (2-Tier SAFe Structure)

SAFe framework defines báo cáo ở **nhiều tầng**, tương ứng với các ceremonies. Trong Agentic context, ta ánh xạ thành **2 Tiers**:

### 📐 SAFe Ceremony → Agentic Report Mapping

| SAFe Ceremony       | Khi nào                 | Ai Report     | Agentic Translation                        |
| ------------------- | ----------------------- | ------------- | ------------------------------------------ |
| **Sprint Review**   | Cuối mỗi session/sprint | SM per team   | Tier 1: Sprint Report                      |
| **ART Sync**        | Cross-team checkpoint   | RTE           | Tier 2: PI Review (phần cross-team status) |
| **PI System Demo**  | Cuối PI (8-12 tuần)     | RTE + all SMs | Tier 2: PI Review (phần integrated demo)   |
| **Inspect & Adapt** | Cuối PI                 | RTE           | Tier 2: PI Review (phần retrospective)     |

### 📁 Report Directory Structure

```text
docs/reports/
├── sprints/                                    ← Tier 1: Team-level
│   ├── sprint-art-2026-02-08.md
│   ├── sprint-platform-2026-02-08.md
│   ├── sprint-quant-2026-02-09.md
│   ├── sprint-connectors-2026-02-10.md
│   └── sprint-system-2026-02-11.md
└── pi/                                         ← Tier 2: ART-level
    ├── pi-1-review-2026-03-15.md               ← Aggregated from all sprints
    └── pi-2-review-2026-06-01.md
```

---

### 📝 Tier 1: Sprint Report (Team-Level)

**Ai tạo:** SM (hoặc RTE cho ART Leadership, DevOps cho System Team)
**Khi nào:** Trước khi session kết thúc — **BẮT BUỘC**.
**Vị trí file:** `docs/reports/sprints/sprint-{team}-{YYYY-MM-DD}.md`

**Template:**

```markdown
# Sprint Report: {Team Name} — {Date}

## Summary

| Metric          | Value              |
| --------------- | ------------------ |
| Tasks completed | X / Y              |
| Tests           | Z passed, W failed |
| Build status    | ✅ / ❌            |
| Clippy warnings | N                  |
| Beads updated   | Yes / No           |

## Completed Tasks

| Beads ID | Description                         | Status  |
| -------- | ----------------------------------- | ------- |
| bd-101   | Implement Binance WebSocket adapter | ✅ Done |

## Remaining / Blocked Tasks

| Beads ID | Description            | Blocker                |
| -------- | ---------------------- | ---------------------- |
| bd-103   | OKX reconnection logic | API rate limit unclear |

## Cargo Status

- `cargo build`: ✅ / ❌
- `cargo test`: X/Y passed
- `cargo clippy`: N warnings

## Notes for Next Sprint

- {Items requiring Human attention or cross-team coordination}
```

**Responsibility matrix:**

| Team              | Responsible Role  | Trigger                        |
| ----------------- | ----------------- | ------------------------------ |
| ART Leadership    | **RTE**           | Khi PMO + Architect hoàn thành |
| Platform Core     | **Platform_SM**   | Khi Dev + QA phase hoàn thành  |
| Exchange Connect. | **Connectors_SM** | Khi Dev + QA phase hoàn thành  |
| Quant & Strategy  | **Quant_SM**      | Khi Dev + QA phase hoàn thành  |
| System Team       | **DevOps**        | Khi tất cả 3 roles hoàn thành  |

---

### 📊 Tier 2: PI Review (ART-Level)

**Ai tạo:** RTE (via `/gsafe:pi-review`)
**Khi nào:** Cuối mỗi Program Increment (8-12 tuần), hoặc khi Human yêu cầu.
**Vị trí file:** `docs/reports/pi/pi-{N}-review-{YYYY-MM-DD}.md`

PI Review **aggregates** tất cả Sprint Reports và là báo cáo mà **Business Owners (Steve & Thanh Vũ)** đọc để ra quyết định chiến lược.

**Template:**

```markdown
# PI Review: PI-{N} — {Start Date} to {End Date}

## Executive Summary

Overall PI health: 🟢 / 🟡 / 🔴
PI Objectives met: X / Y (Z% achievement)

## PI Objectives Assessment

| PI Objective                     | Target | Actual | Status |
| -------------------------------- | ------ | ------ | ------ |
| Core arbitrage engine functional | 100%   | 85%    | 🟡     |
| All 3 exchange connectors live   | 3      | 2 done | 🟠     |
| Latency < 10ms p50               | 10ms   | 8ms    | 🟢     |

## Team Performance Summary

| Team                | Sprints | Tasks Done | Test Pass Rate | Velocity |
| ------------------- | ------- | ---------- | -------------- | -------- |
| Platform Core       | 3       | 38/42      | 95%            | 12.7/wk  |
| Exchange Connectors | 2       | 22/30      | 88%            | 11.0/wk  |
| Quant & Strategy    | 2       | 18/25      | 92%            | 9.0/wk   |
| System Team         | 1       | 8/8        | 100%           | 8.0/wk   |

## Cross-Team Dependencies & Risks

| Dependency                            | Status      | Impact if Delayed |
| ------------------------------------- | ----------- | ----------------- |
| Platform types → Quant uses OrderBook | ✅ Resolved | —                 |
| Connector API → Quant needs live data | 🟡 Partial  | Quant blocked     |

## Inspect & Adapt (I&A Workshop — SAFe 6.0)

### Part 1: Quantitative Measurement

| Flow Metric                     | PI Target | PI Actual | Trend |
| ------------------------------- | --------- | --------- | ----- |
| Lead Time (idea → done)         | ≤5 days   | 4.2 days  | 🟢 ↓  |
| Cycle Time (in-progress → done) | ≤2 days   | 2.8 days  | 🟡 ↑  |
| Throughput (stories/sprint)     | ≥15       | 12        | 🟠    |
| WIP (concurrent items)          | ≤8        | 6         | 🟢    |
| Flow Efficiency                 | ≥40%      | 35%       | 🟡    |

### Part 2: What Went Well / What Needs Improvement

- ✅ Agent teams self-resolved 90% of build errors (Level 0-1)
- ❌ OKX connector delayed due to unclear API docs

### Part 3: Problem-Solving Workshop (5 Whys)

**Problem:** OKX connector delayed by 2 sprints

| Why #          | Root Cause                                                   |
| -------------- | ------------------------------------------------------------ |
| Why 1          | API documentation was incomplete                             |
| Why 2          | No pre-research phase before development                     |
| Why 3          | Spawn-art PMO didn't include API feasibility assessment      |
| Why 4          | PMO instructions lacked competitive/technical research phase |
| **Root Cause** | **Continuous Exploration was too shallow**                   |

**Solution → Improvement Story:**
`bd create "Improvement: Add API feasibility spike to PMO Phase A" --tag=improvement`

### Part 4: Action Items & Improvement Stories for Next PI

| Action                                    | Beads ID  | Owner         | Priority | Type              |
| ----------------------------------------- | --------- | ------------- | -------- | ----------------- |
| Pre-research exchange API docs before dev | bd-imp-01 | Human (Steve) | High     | Process           |
| Add API feasibility spike to PMO Phase A  | bd-imp-02 | PMO           | High     | Improvement Story |
| Reduce WIP limit from 8 to 6 per team     | bd-imp-03 | RTE           | Medium   | Flow Optimization |

## Sprint Report Index

| Date       | Team                | Report                                               |
| ---------- | ------------------- | ---------------------------------------------------- |
| 2026-02-08 | Platform Core       | [Report](../sprints/sprint-platform-2026-02-08.md)   |
| 2026-02-09 | Exchange Connectors | [Report](../sprints/sprint-connectors-2026-02-09.md) |
```

---

### 📝 Tier 1.5: Sprint Retrospective Report (Team-Level Feedback Loop)

**Ai tạo:** SM (Scrum Master) cho mỗi team
**Khi nào:** Cuối mỗi sprint, **SAU** Sprint Report — BẮT BUỘC.
**Vị trí file:** `docs/reports/sprints/retro-{team}-{YYYY-MM-DD}.md`

> 💡 **SAFe 6.0:** Sprint Retrospective KHÁC Sprint Report. Report = "làm được gì", Retro = "làm SAO cho tốt hơn". Retro tạo ra **Improvement Stories** được đưa vào backlog sprint tiếp theo.

**Template:**

```markdown
# Sprint Retrospective: {Team Name} — {Date}

## What Went Well ✅

- {Practice, tool, or approach that worked}
- {Collaboration that was effective}

## What Needs Improvement ❌

- {Process bottleneck}
- {Communication gap}
- {Technical debt created}

## Root Cause Analysis (for top issue)

**Issue:** {Most impactful problem}
**5 Whys:**

1. Why? → {reason}
2. Why? → {deeper reason}
3. Why? → {root cause}

## Improvement Stories Created

| Beads ID | Improvement       | Sprint Target | Owner    |
| -------- | ----------------- | ------------- | -------- |
| bd-imp-X | {What to improve} | Sprint N+1    | {SM/Dev} |

## Metrics Comparison (vs Last Sprint)

| Metric                  | Last Sprint | This Sprint | Trend |
| ----------------------- | ----------- | ----------- | ----- |
| Velocity (story points) | X           | Y           | ↑/↓   |
| Cycle Time (avg days)   | X           | Y           | ↑/↓   |
| First-Pass Test Rate    | X%          | Y%          | ↑/↓   |
| Self-Resolved Errors    | X%          | Y%          | ↑/↓   |
```

**Quy trình Retro → Improvement pipeline:**

```text
[Sprint ends]
    |
    v
[SM] → Write Sprint Report (Tier 1) — WHAT was done
    |
    v
[SM] → Write Sprint Retrospective (Tier 1.5) — HOW to improve
    │
    ├── Identify top 3 issues
    ├── 5 Whys root cause for #1 issue
    └── Create Improvement Stories in Beads
    |
    v
[PO] → Prioritize Improvement Stories in next sprint backlog
    |
    v
[Dev] → Implement improvements alongside feature work
    |
    v
[SM] → Track improvement completion in next Retro
```

> ⚠️ **Anti-Pattern:** KHÔNG bao giờ bỏ qua Retro vì "thiếu thời gian". SAFe 6.0 coi Retrospective là engine of continuous improvement. Nếu skip Retro, technical debt và process debt sẽ tích lũy.

---

### 📈 Flow Metrics Dashboard (SAFe 6.0 — 8 Flow Properties)

SAFe 6.0 đo lường hiệu suất qua **8 Flow Properties**. Trong Agentic context, ta theo dõi các metrics này mỗi sprint:

| #   | Flow Metric             | Định nghĩa                                 | Cách đo trong Agentic                                 |
| --- | ----------------------- | ------------------------------------------ | ----------------------------------------------------- |
| 1   | **Flow Distribution**   | Ratio work types: feature/defect/debt/risk | `bd list --tag=feature`, `--tag=bug`, `--tag=enabler` |
| 2   | **Flow Velocity**       | Stories completed per sprint               | `bd list --status=done --since=sprint-start`          |
| 3   | **Flow Time**           | Time from "in-progress" to "done"          | Beads timestamps: `bd show [id]`                      |
| 4   | **Flow Load**           | WIP items at any point                     | `bd list --status=in_progress`                        |
| 5   | **Flow Efficiency**     | Active time / total time                   | (cycle time - wait time) / cycle time                 |
| 6   | **Flow Predictability** | Variance in sprint velocity                | StdDev of velocity across sprints                     |
| 7   | **Flow Quality**        | Escaped defects per sprint                 | Bugs found AFTER story marked "done"                  |
| 8   | **Flow Throughput**     | Value delivered per time unit              | Story points completed / sprint duration              |

**Cách tích hợp vào reports:**

- **Tier 1 (Sprint Report):** Include Flow Velocity, Flow Load, Flow Quality
- **Tier 1.5 (Sprint Retro):** Compare Flow metrics vs previous sprint
- **Tier 2 (PI Review):** Include tất cả 8 metrics, trend analysis across sprints

**Commands hỗ trợ:**

```bash
# Quick flow metrics summary
bd list --status=done | wc -l          # Flow Velocity
bd list --status=in_progress | wc -l   # Flow Load
bd list --tag=bug --status=done | wc -l  # Flow Quality (defects)
```

---

### 📊 Project Status Dashboard (`docs/STATUS.md`)

Một file **duy nhất** theo dõi sức khỏe tổng thể. Cập nhật bởi `/gsafe:status`.

```markdown
# Project Status: {Project Name}

> Last updated: {Date} by {Team/Human}

## Overall Health: 🟢 / 🟡 / 🔴

## Current PI: PI-{N} ({Start} → {End})

## Team Status

| Team                | Last Sprint   | Tasks Done | Tests | Build | Next Focus     |
| ------------------- | ------------- | ---------- | ----- | ----- | -------------- |
| ART Leadership      | 2026-02-08    | 8/8        | N/A   | N/A   | —              |
| Platform Core       | 2026-02-08    | 12/15      | 38/42 | ✅    | Fix 4 tests    |
| Exchange Connectors | (not started) | —          | —     | —     | Binance + MEXC |
| Quant & Strategy    | (not started) | —          | —     | —     | Bellman-Ford   |
| System Team         | (not started) | —          | —     | —     | CI/CD pipeline |

## Beads Summary

Total: N | Done: X | In Progress: Y | Blocked: Z | TODO: W

## Reports

| Type   | Date       | Team/PI       | Link                                            |
| ------ | ---------- | ------------- | ----------------------------------------------- |
| Sprint | 2026-02-08 | Platform Core | [Report](./reports/sprints/sprint-platform-...) |
| PI     | 2026-03-15 | PI-1          | [Review](./reports/pi/pi-1-review-...)          |
```

**Cách cập nhật:**

| Trigger                       | Ai cập nhật            | Command            |
| ----------------------------- | ---------------------- | ------------------ |
| Team hoàn thành sprint        | SM/RTE (trong session) | Agent tự update    |
| Human chạy triage sau session | Human                  | `/gsafe:status`    |
| Cuối PI (8-12 tuần)           | RTE                    | `/gsafe:pi-review` |

> 💡 **Commands:**
>
> - `/gsafe:status` — Scan Beads + cargo + sprint reports → cập nhật `docs/STATUS.md`
> - `/gsafe:pi-review` — Aggregate tất cả sprint reports → tạo PI Review document

---

## 7. Kế hoạch build Plugin `agentic-SAFe`

Để đóng gói quy trình thành công cụ tái sử dụng (Reusable Plugin), ta thực hiện các bước sau:

> **Lưu ý:** Plugin này **KHÔNG dùng SubAgents** (không có thư mục `agents/`). Thay vào đó, các lệnh `/gsafe:spawn-*` sẽ chỉ dẫn Lead tạo **Agent Teams teammates** qua prompt tự nhiên.

### Bước 1: Cấu trúc Plugin

```text
agentic-SAFe/
├── .claude-plugin/
│   └── plugin.json           # Manifest: name = "gsafe"
├── commands/
│   └── gsafe/                # /gsafe:* commands
│       ├── init.md           # /gsafe:init → Khởi tạo project SAFe
│       ├── spawn-art.md      # /gsafe:spawn-art → ART Leadership (3 roles, 4-phase CE)
│       ├── spawn-platform.md # /gsafe:spawn-platform → Platform Core (5 roles)
│       ├── spawn-connectors.md # /gsafe:spawn-connectors → Exchange Connectors (5 roles)
│       ├── spawn-quant.md    # /gsafe:spawn-quant → Quant & Strategy (5 roles)
│       ├── spawn-system.md   # /gsafe:spawn-system → System Team (4 roles, incl. QG)
│       ├── status.md         # /gsafe:status → Project Status Dashboard
│       ├── pi-replan.md      # /gsafe:pi-replan → PI Re-Planning (I&A → Update PRD/Vision)
│       └── pi-review.md      # /gsafe:pi-review → PI Review (ART-level)
├── skills/                   # 35 symlinks → .agent/skills/ (per-role)
└── hooks/
    ├── hooks.json            # Quality gates (new matcher format)
    └── scripts/
        └── check-beads.sh
```

**Cách Claude Code tìm đến đúng file:**

| User gõ                   | Claude Code tìm                      | Team / Ceremony             |
| ------------------------- | ------------------------------------ | --------------------------- |
| `/gsafe:init`             | `commands/gsafe/init.md`             | —                           |
| `/gsafe:spawn-art`        | `commands/gsafe/spawn-art.md`        | ART Leadership (4-phase CE) |
| `/gsafe:spawn-platform`   | `commands/gsafe/spawn-platform.md`   | Platform Core               |
| `/gsafe:spawn-connectors` | `commands/gsafe/spawn-connectors.md` | Exchange Connectors         |
| `/gsafe:spawn-quant`      | `commands/gsafe/spawn-quant.md`      | Quant & Strategy            |
| `/gsafe:spawn-system`     | `commands/gsafe/spawn-system.md`     | System Team (incl. QG)      |
| `/gsafe:status`           | `commands/gsafe/status.md`           | Status Dashboard            |
| `/gsafe:pi-review`        | `commands/gsafe/pi-review.md`        | PI Review (Tier 2)          |
| `/gsafe:pi-replan`        | `commands/gsafe/pi-replan.md`        | PI Re-Planning (I&A)        |

> **Quy tắc:** Thư mục con `gsafe/` trong `commands/` tạo namespace. File `.md` trong `commands/gsafe/` trở thành `/gsafe:tên-lệnh`. Claude Code auto-discovers tất cả file `.md` trong thư mục con.

### Bước 2: Manifest (`plugin.json`)

```json
{
  "name": "gsafe",
  "description": "GSCfin SAFe Framework for Agentic — Quantitative Trading Bot in Rust",
  "version": "1.0.0",
  "author": { "name": "GSCfin" },
  "repository": "https://github.com/GSCFin/agentic-SAFe",
  "license": "MIT"
}
```

### Bước 3: Nội dung các Command Files

Mỗi command file sử dụng format Agent Teams chuẩn:

```text
Spawn a team:
1. 'RoleName' (Role: Description):
   - Skills: [skill-a, skill-b]
   - Instructions: What to do
   - Constraints: What NOT to do, require plan approval
```

Xem chi tiết từng command trong thư mục `commands/gsafe/`:

- `init.md` — Khởi tạo SAFe project (dirs, templates, Beads)
- `spawn-art.md` — ART Leadership: RTE + PMO + Architect (3 roles). **Enterprise-Grade:** PMO runs 4-Phase Continuous Exploration (Research → Vision → Feature Decomposition → Beads Tasks). Architect does PRD analysis → 9+1-section Architecture.md + ADRs + Runway. RTE validates with quality gates (min 5 Epics, 20 Features, 50 Stories, 80 Beads tasks).
- `spawn-platform.md` — Platform Core: SM + PO + Backend Dev ×3 + QA (6 roles)
- `spawn-connectors.md` — Exchange Connectors: SM + PO + Integration Dev ×3 + QA (6 roles)
- `spawn-quant.md` — Quant & Strategy: SM + PO + Quant Dev ×3 + QA (6 roles)
- `spawn-system.md` — System Team: DevOps + Security + Performance + **QG (Quality Gate)** (4 roles). QG Agent runs UBS static analysis, reviews code against Architecture.md, verifies commit traceability ([bd-XXXX] convention), and merges PRs. See Section 6.8 for full workflow.
- `pi-replan.md` — **PI Re-Planning:** SAFe 6.0 Inspect & Adapt ceremony. RTE facilitates I&A workshop (5 Whys, problem-solving), PMO archives and updates Vision/PRD with versioning, Architect updates Architecture Runway. Runs at PI boundary (every 8-12 weeks).

> ⚠️ **Quan trọng:** Mỗi role chỉ load 2-4 skills cụ thể thay vì toàn bộ ~60 skills.
> Chi tiết ánh xạ: xem **[SkillTable](./SAFe-framework-for-Agentic-RustTradingBot-SkillTable.md)**.

### Bước 4: Hooks — Quality Gates

`hooks/hooks.json`:

```json
{
  "hooks": {
    "TaskCompleted": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/check-beads.sh"
          }
        ]
      }
    ],
    "TeammateIdle": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"Check: did teammate update Beads status?\"'"
          }
        ]
      }
    ]
  }
}
```

`hooks/scripts/check-beads.sh`:

```bash
#!/bin/bash
# Check nếu teammate đã update Beads trước khi hoàn thành
if command -v bd &>/dev/null; then
  PENDING=$(bd list --status=in_progress 2>/dev/null | wc -l)
  if [ "$PENDING" -gt 0 ]; then
    echo "⚠️ Còn $PENDING task IN_PROGRESS. Hãy 'bd complete' trước."
    exit 2  # exit 2 = reject completion
  fi
fi
echo "✅ All tasks updated."
exit 0
```

### Bước 5: Cài đặt & Kiểm thử

```bash
# 1. Test local
claude --plugin-dir ./agentic-SAFe

# 2. Kiểm tra commands hiện trong /help
#    Gõ /help → thấy:
#      /gsafe:init (plugin:gsafe)
#      /gsafe:spawn-art (plugin:gsafe)
#      /gsafe:spawn-platform (plugin:gsafe)
#      /gsafe:spawn-connectors (plugin:gsafe)
#      /gsafe:spawn-quant (plugin:gsafe)
#      /gsafe:spawn-system (plugin:gsafe)

# 3. Test từng command
#    /gsafe:init
#    /gsafe:spawn-art CEX-Arbitrage
#    /gsafe:spawn-platform CEX-Arbitrage

# 4. Khi ổn định → cài global
cp -r ./agentic-SAFe ~/.claude/plugins/agentic-SAFe
```

_(Mục tiêu: Đưa Plugin này vào quy trình onboarding chuẩn cho mọi dự án của công ty)_

---

## 8. Skill Mapping: Quantitative Trading System (Rust)

> 📋 **Bảng ánh xạ đầy đủ Skills → Teams → Roles:** Xem file **[SAFe-framework-for-Agentic-RustTradingBot-SkillTable.md](./SAFe-framework-for-Agentic-RustTradingBot-SkillTable.md)**.
>
> File SkillTable chứa:
>
> - Master Skill List (~60 skills được chọn lọc từ `.agent/skills/`)
> - Skill Assignment chi tiết cho từng Team (Portfolio, ART Leadership, Platform Core, Exchange Connectors, Quant & Strategy, System Team)
> - Mỗi Role chỉ load 3-4 core skills — không dùng project-level
> - Coverage Summary theo nhóm skills
