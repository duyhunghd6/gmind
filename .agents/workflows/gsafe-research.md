---
description: SAFe 6.0 Continuous Exploration workflow — Iterative research phase before planning and implementation
---

# /gsafe-research — Continuous Exploration Workflow

> **SAFe 6.0 Phase 1: Continuous Exploration**
> Mục đích: Nghiên cứu, phân tích, và đề xuất rõ ràng TRƯỚC KHI viết code.
> Tham chiếu: [SAFe-framework-for-Agentic-RustTradingBot.md](../../docs/researches/SAFe%206.0%20Framework/SAFe-framework-for-Agentic-RustTradingBot.md)

---

## Khi nào dùng workflow này

- Khi bắt đầu dự án mới hoặc feature lớn
- Khi cần nghiên cứu công nghệ, đánh giá reference code, hoặc thiết kế kiến trúc
- Khi Human yêu cầu "research" hoặc "explore" trước khi implement
- **KHÔNG dùng** khi đã approve xong và đang ở phase Implementation

---

## Workflow Steps

### Step 1: Đọc context từ các Iteration Reports trước đó

// turbo

```bash
ls -la ./docs/iteration-reports/ 2>/dev/null || echo "No previous iterations found — this is the first research iteration."
```

- Nếu có iteration reports → **BẮT BUỘC** đọc tất cả trước khi tiếp tục
- Tổng hợp: Findings đã có, Decisions đã thống nhất, Open Questions cần trả lời
- Nếu không có → bỏ qua, đây là iteration đầu tiên

### Step 2: Xác định Scope cho iteration hiện tại

Trả lời 3 câu hỏi:

1. **Mục tiêu iteration này là gì?** (Objectives — tối đa 3 objectives rõ ràng)
2. **Input từ iteration trước?** (Open Questions → biến thành Objectives)
3. **Output kỳ vọng?** (Findings, Decisions, hoặc Draft documents)

### Step 3: Thực hiện nghiên cứu

Các hoạt động được phép:

| ✅ Được làm                               | ❌ KHÔNG được làm                   |
| ----------------------------------------- | ----------------------------------- |
| Đọc và phân tích reference code           | Viết code implementation            |
| Viết/update PRDs và Architecture docs     | Sửa reference code                  |
| Tạo mermaid diagrams và mockups           | Push code to git                    |
| Phân tích trade-offs và alternatives      | Tạo go.mod hoặc project scaffolding |
| Viết ADRs (Architecture Decision Records) | Deploy hoặc build                   |
| Đánh giá tech stack, dependencies         | Run tests trên code chưa viết       |

### Step 4: Tạo Iteration Report (CHỈ KHI HUMAN YÊU CẦU)

> ⚠️ **KHÔNG tự động tạo iteration report.** Chỉ tạo khi Human yêu cầu rõ ràng
> (VD: "tạo iteration report", "ghi lại kết quả nghiên cứu", "viết report").
> Nếu Human chỉ hỏi nghiên cứu đơn thuần → trả lời trực tiếp, không tạo report.

Khi được yêu cầu, tạo file `./docs/iteration-reports/iteration-XXX-research.md`:

// turbo

```bash
# Tạo thư mục nếu chưa có
mkdir -p ./docs/iteration-reports
```

Template:

```markdown
# Iteration XXX — [Tiêu đề]

**Ngày:** YYYY-MM-DD
**Tác giả:** [Agent role]
**Phase:** Continuous Exploration (SAFe 6.0)

## Mục tiêu (Objectives)

- [Câu hỏi 1]
- [Câu hỏi 2]

## Phát hiện (Findings)

- [Kết quả phân tích]

## Quyết định (Decisions Made)

- [Decision 1 — Lý do]

## Câu hỏi mở (Open Questions)

- [Câu hỏi chưa trả lời → input cho iteration tiếp]

## Đề xuất cho Iteration tiếp theo

- [Hướng nghiên cứu tiếp]
```

### Step 5: Review & Approval Gate

> ⚠️ **Level 3: HUMAN DECISION REQUIRED**

Sau khi hoàn thành iteration report:

1. **Trình bày** summary cho Human (tóm gọn Findings + Open Questions)
2. **Human** quyết định:
   - ✅ **"Next iteration"** → quay lại Step 1 với iteration mới
   - ✅ **"Research complete, move to Planning"** → chuyển sang Phase 2
   - 🔄 **"Revise"** → sửa iteration report theo feedback
   - ❌ **"Pivot"** → thay đổi hướng nghiên cứu hoàn toàn

---

## Tiêu chí hoàn thành Research Phase

Research Phase hoàn thành khi **TẤT CẢ** điều kiện sau được đáp ứng:

- [ ] Tối thiểu 3 Iteration Reports
- [ ] Tất cả Open Questions đã được trả lời hoặc deferred
- [ ] PRDs đã viết xong và được Human review
- [ ] Architecture draft có (nếu applicable)
- [ ] **Human approve** chuyển sang Planning Phase

---

## Phase Transition

Khi Research Phase hoàn thành và được Human approve:

```
[Research Phase] ──Human Approve──> [Planning Phase]
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
Human: /gsafe-research

Agent: [Step 1] Kiểm tra iteration reports trước...
       → Tìm thấy iteration-001, iteration-002
       → Đọc summary: đã phân tích Storage Layer, còn open question về Zvec integration

Agent: [Step 2] Iteration 003 objectives:
       1. Trả lời: Zvec integration strategy (CGo vs subprocess?)
       2. Evaluate: Tree-sitter Go bindings maturity
       3. Draft: Architecture.md Section 1-3

Agent: [Step 3] Nghiên cứu...

Agent: [Step 4] Tạo iteration-003-research.md

Agent: [Step 5] Trình bày summary cho Human → chờ approval
```
