---
trigger: always_on
glob:
description: Quy tắc nghiên cứu theo SAFe 6.0 Continuous Exploration — Spike-based research, 4-activity CE cycle
---

# 📋 Research Rules — SAFe 6.0 Continuous Exploration

## Nguyên tắc cốt lõi

> **Research = Spikes.** Mỗi lần nghiên cứu (dù 1 hay 100 lần) tạo ra 1 Spike Report.
> Spikes tích lũy kiến thức → được tổng hợp thành PRDs trong Activity D (Synthesize).
> Spike KHÔNG cần Human approval riêng — chỉ cần approval khi Synthesize xong.

---

## 1. Spike Report — Mỗi lần nghiên cứu

Mỗi khi thực hiện **một phiên nghiên cứu** (Activity B: Collaborate & Research), agent tạo file:

```
./docs/researches/spikes/spike-{topic}.md
```

Tên file mô tả ngắn gọn topic nghiên cứu (kebab-case).

### Cấu trúc Spike Report

```markdown
# Spike: [Topic]

**Beads ID:** bd-xxx (spike task)
**Tác giả:** [Agent role / Human]
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- Giả thuyết cần validate qua spike này

## Research Sessions

### Session 1 (YYYY-MM-DD)

**Findings:**

- Kết quả nghiên cứu phiên 1

**Open Items:**

- Câu hỏi cần tiếp tục → Session 2

### Session 2 (YYYY-MM-DD)

**Findings:**

- Kết quả bổ sung từ phiên 2

**Open Items:**

- (Nếu còn → Session 3, nếu hết → chuyển sang Recommendation)

## Recommendation

- Đề xuất cụ thể dựa trên tổng hợp tất cả sessions

## Decision (nếu đã thống nhất với Human)

- Decision + Lý do (ghi thành ADR nếu là architectural decision)

## Open Items → Next Spikes

- Những gì chưa trả lời → tạo spike mới: `bd create "Spike: ..." --type=spike`
```

### Spike Workflow

```bash
# 1. Tạo Spike task trong Beads (mỗi phiên nghiên cứu)
bd create "Spike: Evaluate FrankenSQLite vs DoltDB" --type=spike

# 2. Nghiên cứu → viết spike report
# → docs/researches/spikes/spike-frankensqlite-vs-doltdb.md

# 3. Đóng spike khi xong
bd close <spike-id>
```

> 💡 **Hundreds of spikes is normal.** Nếu cần 100 lần research trước khi viết PRD →
> tạo 100 spike reports. Mỗi spike nhẹ, không cần approval riêng, tích lũy dần.

---

## 2. Đọc Spikes trước khi bắt đầu nghiên cứu mới

**TRƯỚC KHI** bắt đầu bất kỳ spike mới nào, agent **BẮT BUỘC** phải:

1. **Đọc tất cả Spike Reports trước đó** (tối thiểu phần Findings/Recommendation)
2. **Tổng hợp context** từ các spikes cũ để tránh lặp lại công việc
3. **Kiểm tra Open Items** từ spike trước → biến thành hypothesis cho spike mới

```bash
# Kiểm tra spike reports đã có
ls ./docs/researches/spikes/

# Đọc findings từ spikes gần nhất
cat ./docs/researches/spikes/spike-*.md
```

> ⚠️ **CẢNH BÁO:** Nếu bỏ qua bước đọc spikes → agent sẽ lặp lại nghiên cứu cũ, lãng phí token và thời gian. Đây là vi phạm quy trình.

---

## 3. Phân pha rõ ràng — KHÔNG implement code trong CE

Theo SAFe 6.0, Continuous Exploration gồm 4 activities:

| Activity                      | Tên SAFe            | Ai thực hiện    | Output                                          |
| ----------------------------- | ------------------- | --------------- | ----------------------------------------------- |
| **A. Hypothesize**            | Value Hypothesis    | Human + PMO     | Epic Hypothesis Statement (Beads Epic)          |
| **B. Collaborate & Research** | Market Research     | PMO             | `docs/researches/spikes/*.md`                   |
| **C. Architect**              | Architecture Runway | Architect       | `Architecture.md`, ADRs                         |
| **D. Synthesize**             | Feature Definition  | PMO + Architect | `Vision.md`, PRDs, ART Backlog (Beads Features) |

> 🔴 **RULE:** Trong phase Continuous Exploration, agent **KHÔNG ĐƯỢC PHÉP** viết code implementation. Chỉ được phép:
>
> - Viết Spike Reports (nghiên cứu)
> - Viết PRD / Vision / Architecture docs
> - Tạo Beads epics/tasks/spikes cho backlog
> - Phân tích reference code (đọc, không sửa)
> - Tạo diagrams, mockups, ADRs

---

## 4. CE Definition of Done

CE Phase hoàn thành khi đáp ứng **TẤT CẢ** tiêu chí sau:

- [ ] Vision.md đã viết và Human reviewed
- [ ] Ít nhất 1 PRD đã viết
- [ ] Architecture.md draft có (nếu applicable)
- [ ] ART Backlog có ≥ 1 Epic với Features decomposed
- [ ] Spike reports cho research đã đóng (`bd close`)
- [ ] Human đã **approve** để chuyển sang PI Planning Phase

> 💡 **Nguyên tắc:** "Agents đề xuất, Humans phê duyệt." — Chuyển phase = Level 3 Human Decision Required.
> Human approval chỉ cần **1 lần** ở cuối CE (sau Synthesize), KHÔNG phải mỗi spike.

---

## 5. Naming Convention

| Artifact           | Path                                        | Ví dụ                              |
| ------------------ | ------------------------------------------- | ---------------------------------- |
| Spike Report       | `./docs/researches/spikes/spike-{topic}.md` | `spike-frankensqlite-vs-doltdb.md` |
| Research Reference | `./docs/researches/*.md`                    | `FastCode-Integration-Research.md` |
| PRD                | `./docs/PRDs/PRD-XX-*.md`                   | `PRD-01-Overview.md`               |
| Architecture       | `./docs/architecture/Architecture.md`       | —                                  |
| ADR                | `./docs/architecture/adr/ADR-XXX-*.md`      | `ADR-001-storage-choice.md`        |
| Vision             | `./docs/requirements/Vision.md`             | —                                  |
