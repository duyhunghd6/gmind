---
trigger: always_on
glob:
description: Quy tắc nghiên cứu theo SAFe 6.0 Continuous Exploration — Mọi research phải qua iteration reports
---

# 📋 Research Rules — SAFe 6.0 Continuous Exploration

## Nguyên tắc cốt lõi

> **Research là quá trình lặp (Iterative).** Không bao giờ nghiên cứu xong trong 1 lần.
> Mỗi iteration tạo ra kiến thức mới, được lưu trữ và tích luỹ qua các Iteration Reports.

---

## 1. Iteration Report — Bắt buộc mỗi vòng nghiên cứu

Mỗi khi bắt đầu hoặc kết thúc **một vòng nghiên cứu**, agent PHẢI tạo file:

```
./docs/iteration-reports/iteration-XXX-research.md
```

Trong đó `XXX` là số thứ tự (001, 002, 003, ...).

### Cấu trúc Iteration Report

```markdown
# Iteration XXX — [Tiêu đề nghiên cứu]

**Ngày:** YYYY-MM-DD
**Tác giả:** [Agent role / Human]
**Phase:** Continuous Exploration (SAFe 6.0)

## Mục tiêu (Objectives)

- Câu hỏi nghiên cứu cần trả lời trong iteration này

## Phát hiện (Findings)

- Kết quả nghiên cứu, dữ liệu, phân tích

## Quyết định (Decisions Made)

- Các quyết định đã thống nhất (nếu có)

## Câu hỏi mở (Open Questions)

- Những gì chưa trả lời được → input cho iteration tiếp theo

## Đề xuất cho Iteration tiếp theo

- Hướng nghiên cứu tiếp, scope, ưu tiên
```

---

## 2. Đọc Summary trước khi bắt đầu Iteration mới

**TRƯỚC KHI** bắt đầu bất kỳ iteration mới nào, agent **BẮT BUỘC** phải:

1. **Đọc tất cả Iteration Reports trước đó** (tối thiểu phần Summary/Findings)
2. **Tổng hợp context** từ các iteration cũ để tránh lặp lại công việc
3. **Xác nhận Open Questions** từ iteration trước → biến thành Objectives cho iteration mới

```bash
# Kiểm tra iteration reports đã có
ls ./docs/iteration-reports/

# Đọc summary tới iteration gần nhất
cat ./docs/iteration-reports/iteration-*-research.md
```

> ⚠️ **CẢNH BÁO:** Nếu bỏ qua bước đọc summary → agent sẽ lặp lại nghiên cứu cũ, lãng phí token và thời gian. Đây là vi phạm quy trình.

---

## 3. Phân pha rõ ràng — KHÔNG implement code trong Research

Theo SAFe 6.0, quy trình sản xuất phần mềm chia thành 4 phase:

| Phase                         | Tên SAFe          | Ai thực hiện        | Output                                   |
| ----------------------------- | ----------------- | ------------------- | ---------------------------------------- |
| **1. Continuous Exploration** | Research & Vision | PMO + Architect     | Iteration Reports, PRDs, Architecture.md |
| **2. Planning**               | PI Planning       | RTE + All Teams     | PI Objectives, Task Backlog (Beads)      |
| **3. Continuous Integration** | Dev Sprints       | Dev Teams           | Working Software                         |
| **4. Continuous Deployment**  | Release           | System Team + Human | Production Deployment                    |

> 🔴 **RULE:** Trong phase Continuous Exploration (Research), agent **KHÔNG ĐƯỢC PHÉP** viết code implementation. Chỉ được phép:
>
> - Viết tài liệu nghiên cứu (Iteration Reports)
> - Viết PRD / Vision / Architecture docs
> - Tạo Beads epics/tasks cho backlog
> - Phân tích reference code (đọc, không sửa)
> - Tạo diagrams, mockups, ADRs

---

## 4. Tiêu chuẩn hoàn thành Research Phase

Research Phase được coi là **hoàn thành** khi đáp ứng **TẤT CẢ** tiêu chí sau:

- [ ] Tối thiểu **3 Iteration Reports** đã được tạo
- [ ] Tất cẩ **Open Questions** đã được trả lời hoặc đánh dấu "deferred"
- [ ] PRDs đã được viết và review bởi Human
- [ ] Architecture.md đã được draft (nếu applicable)
- [ ] Human đã **approve** để chuyển sang Planning Phase

> 💡 **Nguyên tắc:** "Agents đề xuất, Humans phê duyệt." — Chuyển phase = Level 3 Human Decision Required.

---

## 5. Naming Convention

| Artifact           | Path                                                 | Ví dụ                              |
| ------------------ | ---------------------------------------------------- | ---------------------------------- |
| Iteration Report   | `./docs/iteration-reports/iteration-XXX-research.md` | `iteration-001-research.md`        |
| PRD                | `./docs/PRDs/PRD-XX-*.md`                            | `PRD-01-Overview.md`               |
| Architecture       | `./docs/architecture/Architecture.md`                | —                                  |
| ADR                | `./docs/architecture/adr/ADR-XXX-*.md`               | `ADR-001-storage-choice.md`        |
| Research Reference | `./docs/researches/*.md`                             | `FastCode-Integration-Research.md` |
