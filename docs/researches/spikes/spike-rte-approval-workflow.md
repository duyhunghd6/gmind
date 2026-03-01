# Spike: RTE Approval Workflow — Discussion, Approval, Execution Context

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Parent Spike:** spike-beads-knowledge-graph.md (Open Item #3)

## Hypothesis

- Khi Dev SubAgent phát hiện rủi ro trong quá trình implementation → cần kích hoạt buổi thảo luận với RTE Team
- RTE Team phê duyệt phương án → nội dung phê duyệt trở thành **cơ sở liên quan** (execution context) để agent tiếp tục code
- Toàn bộ quy trình cần được lưu lại với Beads ID — trở thành nodes trong Knowledge Graph
- MCP Agent Mail có thể là cơ chế giao tiếp giữa Dev SubAgent và RTE Team

## Research Sessions

### Session 1 (2026-03-02)

**Findings:**

#### A. RTE Approval Workflow — Full Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│  RTE Approval Workflow                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIGGER: Dev SubAgent phát hiện rủi ro                      │
│  ├── Beads ID: bd-x1y2 (task đang thực thi)                  │
│  ├── Risk description: "Icon set có thể conflict với ..."    │
│  └── Evidence: code analysis, dependency graph, etc.         │
│                                                              │
│  Step 1: ESCALATE — Tạo Discussion Thread                    │
│  ├── gmind escalate bd-x1y2 --risk="<description>"           │
│  ├── Tạo discussion thread với thread_id = bd-x1y2           │
│  ├── Notify RTE Team (via MCP Agent Mail hoặc channel)       │
│  └── Status: bd-x1y2 → "blocked:awaiting-rte"                │
│                                                              │
│  Step 2: DISCUSS — RTE Team tham gia                         │
│  ├── RTE members review risk evidence                        │
│  ├── Thảo luận phương án (chat/meeting)                      │
│  ├── Mọi message/comment lưu trong Zvec với beads_id         │
│  └── Có thể yêu cầu PMO involvement nếu impact lớn           │
│                                                              │
│  Step 3: APPROVE — RTE phê duyệt phương án                   │
│  ├── gmind approve bd-x1y2 --resolution="<decision>"         │
│  ├── Resolution text = EXECUTION CONTEXT cho agent           │
│  ├── Status: bd-x1y2 → "approved:rte-decision"               │
│  └── Approval lưu trong Zvec + FrankenSQLite                 │
│                                                              │
│  Step 4: RESUME — Agent tiếp tục code                        │
│  ├── Agent đọc approval context từ gmind trace bd-x1y2       │
│  ├── Implement theo phương án đã phê duyệt                   │
│  ├── Code commits reference RTE discussion                   │
│  └── Status: bd-x1y2 → "in-progress" (resumed)               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### B. Data Model — Lưu trữ Approval

**FrankenSQLite (structured):**

```sql
-- Thêm cột vào issues table
ALTER TABLE issues ADD COLUMN rte_status TEXT;
-- Values: NULL, 'escalated', 'discussing', 'approved', 'rejected'

ALTER TABLE issues ADD COLUMN rte_resolution TEXT;
-- Nội dung phê duyệt, free-text

ALTER TABLE issues ADD COLUMN rte_approved_at TEXT;
-- Timestamp phê duyệt

ALTER TABLE issues ADD COLUMN rte_approved_by TEXT;
-- Ai phê duyệt
```

**Zvec (unstructured):**

Mỗi message trong discussion thread được index với metadata:

```json
{
  "source_type": "rte-discussion",
  "source_ref": "discussion:bd-x1y2:msg-3",
  "beads_ids": ["bd-x1y2"],
  "author": "rte:lead-architect",
  "timestamp": "2026-03-01T20:00:00Z",
  "content": "Đồng ý dùng Material Icons v3. Cần ensure backward compat..."
}
```

#### C. gmind CLI Commands

| Command                                      | Mục đích                                       |
| -------------------------------------------- | ---------------------------------------------- |
| `gmind escalate <id> --risk="<description>"` | Kích hoạt RTE discussion, set status=escalated |
| `gmind approve <id> --resolution="<text>"`   | Ghi nhận phê duyệt, set status=approved        |
| `gmind reject <id> --reason="<text>"`        | Từ chối, yêu cầu approach mới                  |
| `gmind trace <id>` (existing)                | Hiển thị toàn bộ context kể cả RTE discussions |

**`gmind escalate` flow nội bộ:**

```
┌──────────────────────────────────────────────────────────────┐
│  gmind escalate bd-x1y2 --risk="Icon set conflict risk"      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Update FrankenSQLite:                                    │
│     br update bd-x1y2 --status=escalated                     │
│     br tag bd-x1y2 "rte:escalated"                           │
│                                                              │
│  2. Collect evidence context:                                │
│     ├── gmind trace bd-x1y2 (current subgraph)               │
│     ├── Related code files (FastCode)                        │
│     └── Risk description from --risk flag                    │
│                                                              │
│  3. Create notification:                                     │
│     ├── MCP Agent Mail: send to "rte-team" channel           │
│     ├── Include: risk + evidence + trace output              │
│     └── Thread ID = bd-x1y2                                  │
│                                                              │
│  4. Log to Zvec:                                             │
│     Index escalation event as rte-discussion chunk           │
│                                                              │
│  Output:                                                     │
│  "Escalated bd-x1y2 to RTE Team. Status: awaiting review."   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### D. Approval trở thành Execution Context

Khi agent `gmind trace bd-x1y2` sau khi RTE phê duyệt:

```
TRACE: bd-x1y2 "Change button icon"
│
├── status: approved (RTE decision 2026-03-01)
│
├── RTE CONTEXT:                              ← ĐÂY LÀ EXECUTION CONTEXT
│   ├── Risk: "Icon set may conflict with legacy theme"
│   ├── Decision: "Use Material Icons v3, ensure backward compat"
│   ├── Constraints:
│   │   ├── Must keep fallback icons for legacy theme
│   │   └── Add feature flag: ICON_SET_V3
│   └── Approved by: Lead Architect (2026-03-01 20:00)
│
├── implements: br-plan-42 "Redesign admin icons"
│   └── satisfies: br-prd01-s4.2
│
└── commits (waiting for agent to resume)
```

**Agent sử dụng context này thế nào:**

1. Đọc `RTE CONTEXT` section từ trace output
2. Apply constraints vào code implementation
3. Commits reference: `Beads-ID: bd-x1y2` + `RTE-Decision: Material Icons v3`
4. Nếu implementation vượt ngoài scope của RTE decision → escalate lại

#### E. Integration với SAFe 6.0 Roles

| SAFe Role         | Vai trò trong RTE Approval          | Cách tương tác                 |
| ----------------- | ----------------------------------- | ------------------------------ |
| Dev SubAgent      | Trigger escalation, resume after    | `gmind escalate/trace`         |
| RTE (Agent/Human) | Review risk, make decision          | Chat/meeting + `gmind approve` |
| PMO               | Notified if PRD impact              | `gmind trace` visibility       |
| Architect         | Technical decision on complex risks | Participate in discussion      |
| PO (Human)        | Final authority on scope changes    | Approve if scope changes       |

**Open Items:**

- (None — research complete)

## Recommendation

1. **4-step workflow**: Escalate → Discuss → Approve → Resume
2. **`gmind escalate`** và `gmind approve` là 2 commands chính — đơn giản, deterministic
3. **Approval = Execution Context** — agent đọc trực tiếp từ `gmind trace` output
4. **Dual storage**: FrankenSQLite (structured status) + Zvec (unstructured discussions)
5. **MCP Agent Mail** cho notifications cross-agent
6. **Constraints trong approval** giúp agent biết ranh giới implementation

## Decision

- (Chờ Human review)

## Open Items → Next Spikes

- Không có spike mới cần thiết — workflow đủ rõ để implement
