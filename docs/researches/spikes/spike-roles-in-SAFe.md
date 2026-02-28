# Spike: Roles in SAFe 6.0 Framework

**Beads ID:** (pending — tạo khi cần track)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- SAFe 6.0 tổ chức roles theo 4 tầng (Portfolio → Solution Train → ART → Team)
- Trong bối cảnh Agentic Software House (2 Human + 18 AI Agents), roles được phân chia rõ ràng: Human giữ quyền phê duyệt, Agent thực thi

## Research Sessions

### Session 1 (2026-02-28)

**Findings:**

Tổng hợp từ SAFe 6.0 framework docs và SAFe-20-person-department-structure.md.

#### Sơ đồ tổ chức 4 tầng

```
+------------------------------------------------------------------+
|  [TIER 1] PORTFOLIO -- Strategy & Capital (Human only)           |
|                                                                  |
|  Epic Owner --------- Lead Epic, Lean Business Case              |
|  Enterprise Arch ---- Standardize tech stack across projects     |
|  LPM ---------------- Allocate budget, Value Streams             |
|                                                                  |
|  Artifacts: Strategic Themes, Portfolio Kanban, Lean Budgets     |
+-------------------------------+----------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|  [TIER 2] SOLUTION TRAIN -- Multi-ART coordination (>200 agents) |
|       (Skip if <50 agents -- Essential SAFe)                     |
|                                                                  |
|  STE ---------------- "Super RTE", coordinate multiple ARTs      |
|  Solution Manager --- Roadmap, coordinate Product Managers       |
|  Solution Architect - Overall architecture, NFR standards        |
+-------------------------------+----------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|  [TIER 3] ART -- Agile Release Train (5-12 teams, 50-125)       |
|                                                                  |
|  ART Leadership (3 roles):                                       |
|  +-- RTE ------------- Orchestrator, PI Planning, risk ROAM     |
|  +-- Product Manager - Program Backlog, Features, WSJF priority  |
|  +-- System Architect  Architecture Runway, API, DB, NFR        |
|                                                                  |
|  Business Owners ---- Stakeholders, PI Objectives approval       |
|                                                                  |
|  Artifacts: PI Objectives, Program Backlog, System Demo          |
+-------------------------------+----------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|  [TIER 4] TEAM -- Agile Team (5-11, cross-functional)            |
|                                                                  |
|  +-- Scrum Master --- Facilitate ceremonies, coach Agile         |
|  +-- Product Owner -- Team Backlog, User Stories, accept/reject  |
|  +-- Developers ----- Design, code, test, deliver               |
|  +-- QA/Testers ----- Unit, Integration, E2E, Security          |
|  +-- UX/Design ------ Lean UX, prototyping (if UI exists)       |
|                                                                  |
|  Artifacts: Sprint Backlog, Working Software, Sprint Report      |
+------------------------------------------------------------------+
```

#### Ánh xạ SAFe → Agentic (20-person config)

```
ROLE                       ASSIGNED TO           REASON
─────────────────────────  ────────────────────  ─────────────────────────
Epic Owner + LPM           [H] Human (CEO)       Investment decisions
Business Owner + Ent.Arch  [H] Human (CTO)       Business outcomes
─────────────────────────  ────────────────────  ─────────────────────────
RTE                        [A] Orchestrator      Coordination logic
Product Manager (PMO)      [A] PMO Agent         PRD, roadmap, WSJF
System Architect           [A] Architect Agent   Architecture, ADRs
─────────────────────────  ────────────────────  ─────────────────────────
Scrum Master (x3)          [A] SM Agent          Facilitate, coach
Product Owner (x3)         [A] PO Agent          Stories, backlog
Developer (x6)             [A] Dev Agent         Core AI capability
QA (x3)                   [A] QA Agent          Testing, audit
─────────────────────────  ────────────────────  ─────────────────────────
TOTAL: 2 Human [H] + 18 Agents [A] = 20
```

#### Escalation Ladder — Ai xử lý cái gì

```
Level 0: SELF-RESOLVE (Agent tự xử — Human KHÔNG cần làm gì)
├── Compiler warnings, formatting, simple imports
└── First-attempt test failures

Level 1: TEAM ESCALATION (SM/RTE xử lý — Human KHÔNG cần)
├── File conflicts cùng team, task dependency ordering
└── Agent idle/stuck (hook auto-pings)

Level 2: HUMAN INTERVENTION (Human cần vào cuộc)
├── Build/test errors agent sửa 3+ lần không được
├── Architecture conflicts giữa teams
└── External dependency issues

Level 3: HUMAN DECISION REQUIRED (Human PHẢI quyết định)
├── Plan Approval Gates (mọi role có "Require plan approval")
├── Phase transitions (CE → PI Planning → Execution → Release)
├── Budget/scope changes
└── Production deployment approval

Level 4: POST-SESSION TRIAGE (Human làm SAU KHI session kết thúc)
├── bd list --status=in_progress (check dang dở)
├── cargo test (verify remaining failures)
└── File unrecorded bugs to Beads for next sprint
```

#### Phase Boundary Ownership

```
PHASE                        COMMAND               ROLES INVOLVED
────────────────────────────  ─────────────────────  ────────────────────────────
1. Continuous Exploration    /gsafe:spawn-art       RTE + PMO + Architect
2. Continuous Integration   /gsafe:spawn-{team}    SM + PO + Dev + QA
3. Continuous Deployment    /gsafe:spawn-system    QA (cross-team) + DevOps
4. Release on Demand        Human manual           Human only
────────────────────────────  ─────────────────────  ────────────────────────────
Phase transition = Level 3 Human Decision Required
```

**Open Items:**

- (None — research complete for this scope)

## Recommendation

- Với quy mô ≤50 agents: dùng **Essential SAFe** (bỏ tầng Solution Train)
- **2 Human kiêm nhiệm** Portfolio roles (Epic Owner + LPM, Business Owner + Enterprise Arch)
- **3 Agent** cho ART Leadership (RTE, PMO, Architect)
- **15 Agent** cho 3 Feature Teams (5 agents mỗi team: SM + PO + Dev×2 + QA)
- Nguyên tắc cốt lõi: **Agents đề xuất, Humans phê duyệt** ở mọi Decision Gate

## Decision

- Đã áp dụng trong [SAFe-20-person-department-structure.md](../SAFe%206.0%20Framework/SAFe-20-person-department-structure.md)
- Cấu trúc Essential SAFe 3 tầng đã được Human approve
