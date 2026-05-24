---
description: SAFe 6.0 Continuous Exploration workflow — 4-activity CE cycle before PI Planning
---

# /gsafe-research — Continuous Exploration Workflow

<!-- beads-id: br-workflow-gsafe-research -->

> **SAFe 6.0 Phase 1: Continuous Exploration**
> Mục đích: Hypothesize → Collaborate & Research → Architect → Synthesize — TRƯỚC KHI viết code.
> Tham chiếu: [SAFe-framework-for-Agentic-RustTradingBot.md](../../docs/researches/SAFe%206.0%20Framework/SAFe-framework-for-Agentic-RustTradingBot.md)

---

## Khi nào dùng workflow này

- Khi bắt đầu dự án mới hoặc feature lớn
- Khi cần nghiên cứu công nghệ, đánh giá reference code, hoặc thiết kế kiến trúc
- Khi Human yêu cầu "research" hoặc "explore" trước khi implement
- **KHÔNG dùng** khi đã approve xong và đang ở phase Implementation

---

## Nguyên tắc cốt lõi (Core Principle)

- **Research = Spikes.** Mỗi phiên nghiên cứu (dù là 1 hay 100 phiên) đều tạo ra chính xác 1 Spike Report.
- Spike tích lũy kiến thức → được tổng hợp thành PRDs trong Activity D (Synthesize).
- Spikes **KHÔNG** yêu cầu phê duyệt riêng biệt từ Human — phê duyệt chỉ cần thiết khi quá trình Synthesize hoàn tất ở cuối CE Phase.
- Việc có hàng chục hoặc hàng trăm spikes là hoàn toàn bình thường. Mỗi spike nên nhẹ nhàng, không cần xin phép trước và tích lũy dần dần.

---

## SAFe 6.0 CE — 4 Activities

| #   | Activity                   | Ai thực hiện    | Output artifact                                        |
| --- | -------------------------- | --------------- | ------------------------------------------------------ |
| A   | **Hypothesize**            | Human + PMO     | Epic Hypothesis Statement (Beads Epic)                 |
| B   | **Collaborate & Research** | PMO             | `docs/researches/*.md`, Spike Reports                  |
| C   | **Architect**              | Architect       | `docs/architecture/Architecture.md`, ADRs              |
| D   | **Synthesize**             | PMO + Architect | `Vision.md`, `PRD-XX.md`, ART Backlog (Beads Features) |

> ⛔ **Level 3 Human Approval Gate** chỉ ở cuối Activity D (Synthesize) — KHÔNG phải mỗi activity.

---

## Workflow Steps

### Step 1: Đọc context từ Spikes và CE artifacts trước đó

// turbo

```bash
# Liệt kê các Spike Reports hiện có
ls -la ./docs/researches/spikes/ 2>/dev/null || echo "No previous spikes found — this is the first CE cycle."

# Đọc kết quả từ các Spikes gần nhất
cat ./docs/researches/spikes/spike-*.md 2>/dev/null
```

**BẮT BUỘC thực hiện trước khi bắt đầu một Spike mới:**
1. **Đọc toàn bộ Spike Reports trước đó** (tối thiểu là phần Findings/Recommendation).
2. **Tổng hợp ngữ cảnh (Synthesize context)** từ các Spikes trước đó để tránh lặp lại công việc đã làm.
3. **Kiểm tra Open Items** từ các Spikes cũ → chuyển chúng thành giả thuyết (hypotheses) cho Spike mới.

> ⚠️ **WARNING:** Việc bỏ qua bước đọc Spike cũ sẽ dẫn đến việc lặp lại nghiên cứu, gây lãng phí tokens và thời gian. Đây là một vi phạm quy trình (Process Violation).

### Step 2: Xác định Activity hiện tại

Dựa trên CE artifacts đã tồn tại, xác định agent đang ở activity nào:

| Đã có gì?                             | Activity tiếp theo                                     |
| ------------------------------------- | ------------------------------------------------------ |
| Chưa có gì                            | **A: Hypothesize** — Tạo Epic Hypothesis               |
| Có Epic nhưng chưa research           | **B: Collaborate & Research** — Nghiên cứu, tạo Spikes |
| Có research nhưng chưa architecture   | **C: Architect** — Draft Architecture.md               |
| Có architecture nhưng chưa PRD/Vision | **D: Synthesize** — Viết Vision.md, PRDs, Backlog      |
| Có đủ tất cả                          | **CE Complete** — Chờ Human approve → PI Planning      |

### Step 3: Thực hiện CE Activity

Các hoạt động được phép và không được phép:

| ✅ Được làm                               | ❌ KHÔNG được làm                   |
| ----------------------------------------- | ----------------------------------- |
| Đọc và phân tích reference code           | Viết code implementation            |
| Viết/update PRDs và Architecture docs     | Sửa reference code                  |
| Tạo mermaid diagrams và mockups           | Push code to git                    |
| Phân tích trade-offs và alternatives      | Tạo go.mod hoặc project scaffolding |
| Viết ADRs (Architecture Decision Records) | Deploy hoặc build                   |
| Đánh giá tech stack, dependencies         | Run tests trên code chưa viết       |
| Tạo Spike reports cho research            | Tự ý chuyển sang PI Planning        |
| Tạo Beads Epics/Features (`bd create`)    | Close Beads tasks (`bd close`)      |

> 🔴 **RULE CỐT LÕI:** Trong suốt phase Continuous Exploration, Agent **TUYỆT ĐỐI KHÔNG** được phép viết code implementation. Chỉ được làm các việc được phép nêu trên.

#### Activity B: Spike Reports (Khi nghiên cứu)

Khi Human yêu cầu research một topic cụ thể, dùng **Spike** (SAFe 6.0: time-boxed research story):

```bash
# 1. Tạo Spike task trong Beads (chỉ thực hiện một lần cho mỗi phiên nghiên cứu)
bd create "Spike: Evaluate FrankenSQLite vs DoltDB" --type=spike

# 2. Nghiên cứu → ghi kết quả vào spike report
# Đường dẫn: docs/researches/spikes/spike-{topic}.md
# Tên file viết thường, nối nhau bằng dấu gạch ngang (kebab-case)

# 3. Đóng spike task sau khi hoàn thành nghiên cứu
bd close <spike-id>
```

> 💡 **Bình thường khi có hàng trăm Spikes:** Nếu bạn cần 100 phiên nghiên cứu trước khi viết một PRD → hãy tạo 100 Spike reports. Mỗi Spike là một tài liệu nhẹ nhàng, tích lũy dần dần và không yêu cầu Human approve riêng lẻ.

Spike report template (`docs/researches/spikes/spike-{topic}.md`):

```markdown
# Spike: [Topic]

**Beads ID:** bd-xxx (spike task)
**Author:** [Agent role / Human]
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- Giả thuyết cần validate qua spike này (The hypothesis to validate through this spike)

## Research Sessions

### Session 1 (YYYY-MM-DD)

**Findings:**

- Kết quả nghiên cứu phiên 1 (Results from session 1)

**Open Items:**

- Câu hỏi cần tiếp tục → Session 2 (Questions to continue investigating)

### Session 2 (YYYY-MM-DD)

**Findings:**

- Kết quả bổ sung từ phiên 2 (Additional findings from session 2)

**Open Items:**

- (Nếu còn → Session 3, nếu hết → chuyển sang Recommendation)

## Recommendation

- Đề xuất cụ thể dựa trên tổng hợp tất cả sessions (Specific recommendations)

## Decision (nếu đã thống nhất với Human)

- Decision + Lý do (Ghi nhận dưới dạng ADR nếu đây là quyết định kiến trúc)

## Open Items → Next Spikes

- Những gì chưa giải quyết → tạo spike mới: `bd create "Spike: ..." --type=spike`
```

#### Activity D: Synthesize (Tổng hợp → CE artifacts)

Khi đủ research + architecture → tổng hợp thành CE deliverables:

```
docs/requirements/
├── Vision.md              ← Product Vision (latest)
└── archive/               ← Lịch sử phiên bản
    ├── Vision-v1.0-PI1.md
    └── PRD-v1.0-PI1.md

docs/PRDs/
├── PRD-01-Overview.md
├── PRD-02-Storage.md
└── PRD-03-CLI-and-Workflow.md
```

### Quy chuẩn đặt tên (Naming Conventions)

| Artifact           | Path                                        | Example                            |
| ------------------ | ------------------------------------------- | ---------------------------------- |
| Spike Report       | `./docs/researches/spikes/spike-{topic}.md` | `spike-frankensqlite-vs-doltdb.md` |
| Research Reference | `./docs/researches/*.md`                    | `FastCode-Integration-Research.md` |
| PRD                | `./docs/PRDs/PRD-XX-*.md`                   | `PRD-01-Overview.md`               |
| Architecture       | `./docs/architecture/Architecture.md`       | —                                  |
| ADR                | `./docs/architecture/adr/ADR-XXX-*.md`      | `ADR-001-storage-choice.md`        |
| Vision             | `./docs/requirements/Vision.md`             | —                                  |

### Step 4: Trình bày CE Status cho Human

> ⚠️ **Level 3: HUMAN DECISION REQUIRED** — Chỉ khi Activity D (Synthesize) hoàn thành.

Trình bày **CE Definition of Done** checklist:

```markdown
## CE Definition of Done

- [ ] Vision.md đã viết và Human reviewed
- [ ] Ít nhất 1 PRD đã viết
- [ ] Architecture.md draft có (nếu applicable)
- [ ] ART Backlog có ≥ 1 Epic với Features decomposed
- [ ] Spike reports cho research đã đóng (bd close)
- [ ] **Human approve** chuyển sang PI Planning
```

**Human** quyết định:

- ✅ **"CE complete, move to PI Planning"** → chuyển sang Phase 2
- 🔄 **"Need more research on X"** → tạo thêm Spike, quay lại Activity B
- 🔄 **"Revise PRD/Architecture"** → quay lại Activity C hoặc D
- ❌ **"Pivot"** → thay đổi hướng, tạo Epic Hypothesis mới

---

## Phase Transition

Khi CE hoàn thành và được Human approve:

```
[CE Phase] ──Human Approve──> [PI Planning Phase]
                                │
                                ├── PI Planning (RTE)
                                ├── Task Decomposition (PMO)
                                ├── Architecture Runway (Architect)
                                └── Beads Task Creation (bd create)
```

> 💡 **Nhắc nhở:** "Agents đề xuất, Humans phê duyệt." Không agent nào được tự ý chuyển phase.

---

## Ví dụ sử dụng

```text
Human: /gsafe-research — nghiên cứu FrankenSQLite vs DoltDB

Agent: [Step 1] Kiểm tra CE artifacts...
       → Tìm thấy: 2 spike reports, PRD-01 draft
       → Chưa có: Architecture.md, Vision.md

Agent: [Step 2] Xác định activity:
       → Có research (spikes) nhưng chưa architecture → Activity C

Agent: [Step 3] Nhưng Human yêu cầu thêm research → Activity B
       → bd create "Spike: FrankenSQLite vs DoltDB" --type=spike
       → Nghiên cứu → viết docs/researches/spikes/spike-frankensqlite-vs-doltdb.md
       → bd close <spike-id>

Agent: Trình bày findings cho Human → chờ hướng dẫn tiếp
```
