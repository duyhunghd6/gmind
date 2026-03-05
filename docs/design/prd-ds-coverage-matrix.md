# Ma Trận Ánh Xạ PRD và Design System (PRD-DS Coverage Matrix)

<!-- beads-id: br-ds-matrix-01 -->

> **Mục đích:** Bảng theo dõi (Tracking Matrix) định kỳ giúp kiểm soát độ bao phủ của Design System đối với các Yêu cầu Nghiệp vụ (PRD). File này là **đầu ra bắt buộc (output artifact)** của quy trình `/arch-review-prd-after-design-system`.
> **Cập nhật lần cuối:** 2026-03-05

## 1. Core PRDs to Design System Screens Mapping

Bảng này ánh xạ các tính năng cấp hệ thống trong PRD sang các màn hình giao diện cụ thể trong ứng dụng Showcase Design System (`apps/website/src/app/design-system/`).

| PRD Section ID | Tên Yêu cầu (PRD)              | Màn hình Design System (Screen ID / Link)                   | Trạng thái (Coverage) | Ghi chú                                           |
| :------------- | :----------------------------- | :---------------------------------------------------------- | :-------------------: | :------------------------------------------------ |
| `br-prd00-s4`  | Escalation Ladder (5 cấp độ)   | `br-ds-approval` / `br-ds-kanban`                           |      🟢 Covered       | Đã bổ sung UI cảnh báo Level 2 Escalation         |
| `br-prd01-s2`  | Knowledge Graph Engine         | `br-ds-knowledge-graph`                                     |      🟢 Covered       | Đã có 3 chế độ (Simple, Ecosystem, Sprint View)   |
| `br-prd02-s4`  | RTM - Mô hình 3 tầng truy vết  | `br-ds-beads-traversal`                                     |      🟢 Covered       | Hiển thị quá trình trace từ PRD xuống Commit      |
| `br-prd03-s1`  | API Gateway (CLI)              | `br-ds-terminal`                                            |      🟢 Covered       | Thể hiện output của `gmind` CLI                   |
| `br-prd03-s4`  | RTE Approval Workflow          | `br-ds-approval`                                            |      🟢 Covered       | Các Approval Panels có đầy đủ                     |
| `br-prd04-s1`  | PM Custom Fields (SQL Columns) | `br-ds-kanban`                                              |      🟢 Covered       | Thể hiện qua thẻ task trên Sprint/Release Board   |
| `br-prd04-s3`  | Các Giao diện Quản trị (SAFe)  | `br-ds-portfolio-view`, `br-ds-pi-planning`, `br-ds-kanban` |      🟢 Covered       | Đã cập nhật Portfolio View và PI Planning Sandbox |
| `br-prd04-s4`  | Level 3 Approval Gates         | `br-ds-approval`                                            |      🟢 Covered       | Tích hợp The Ultimate Approval Panel              |
| `br-prd04-s5`  | Đồ thị Tài liệu & Lịch sử HITL | `br-ds-git-graph` / `br-ds-explorer`                        |      🟢 Covered       | Khám phá tài liệu và truy vết Git Worktree        |
| `br-prd04-s6`  | RTM Dashboard                  | `br-ds-approval#heatmap`                                    |      🟢 Covered       | 4-panel dashboard hiển thị Coverage Heatmap       |
| `br-prd05-s2`  | Luồng Triển khai GSAFe         | `br-ds-storyboard`                                          |      🟢 Covered       | Toàn bộ các Use Case Storyboards liên quan        |

## 2. GSAFe Workflows to StoryBoards Mapping

Bảng này ánh xạ các quy trình Agile (SAFe) thành các Use Cases/Storyboards tương tác cụ thể.

| Storyboard ID             | Use Case (Luồng sự kiện) | Tương ứng với Bước trong PRD-05 | Đã Mockup HTML? | Yêu cầu Refine |
| :------------------------ | :----------------------- | :------------------------------ | :-------------: | :------------- |
| `uc-01-pm-sprint-review`  | PM Sprint Review         | Step 5 (Lập Kế hoạch)           |       ✅        |                |
| `uc-02-pm-trace-approve`  | PM Trace & Approve       | Step 7 (Verification Gate)      |       ✅        |                |
| `uc-03-dev-code-search`   | Dev Code Search          | Step 6b (Execution)             |       ✅        |                |
| `uc-04-dev-pick-task`     | Dev Pick Task            | Step 6b (Execution)             |       ✅        |                |
| `uc-05-qa-bug-detection`  | QA Bug Detection         | Step 7 (Verification Gate)      |       ✅        |                |
| `uc-06-qa-code-review`    | QA Code Review           | Step 7 (Verification Gate)      |       ✅        |                |
| `uc-07-architect-spike`   | Architect Spike          | Step 3 (Research Spikes)        |       ✅        |                |
| `uc-08-release-deploy`    | Release Deploy           | Post-Iteration                  |       ✅        |                |
| `uc-09-bug-triage-fix`    | Bug Triage Fix           | Lên kế hoạch Fix lỗi            |       ✅        |                |
| `uc-10-bug-hotfix-verify` | Hotfix Verify            | Xử lý Level 2/3 Escalation      |       ✅        |                |

## 3. Khoảng trống Yêu cầu (Missing Components / Logic)

- **Đã giải quyết tất cả các gaps:**
  - `br-ds-portfolio-view` đã được khởi tạo để đáp ứng PRD-04 (Portfolio View UI).
  - `br-ds-pi-planning` đã được khởi tạo để đáp ứng PRD-04 (PI Planning Sandbox, ROAM Board).
  - UI cảnh báo trạng thái Escalation đã được triển khai cho thẻ Kanban và Approval Panel (`br-prd00-s4`).

---

> Document maintained by AI Agent (`arch-review-prd-after-design-system` workflow).
