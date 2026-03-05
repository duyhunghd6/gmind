# Spike: Đề xuất 20+ AI Workflows dựa trên Agile

**Beads ID:** gmind-1j9 (spike task)
**Tác giả:** Antigravity (Agent)
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- Gmind hiện có 5 workflow cơ bản, nhưng theo PRD-01, chúng ta đang ứng dụng đến 8 phương pháp Agile khác nhau (Scrum, Kanban/Lean, XP, AUP/DAD, DSDM, FDD, TDD, RAD) cùng SAFe 6.0.
- Nếu chúng ta tạo thêm nhiều AI Workflows chuyên biệt (Agentic SE) phủ sóng kỹ hơn cho các phương pháp này, nền tảng sẽ trở thành một hệ sinh thái hỗ trợ linh hoạt, đi sâu vào mảng kỹ thuật cốt tủy và quản lý luồng thay vì chỉ ở mức document review.
- Việc đề xuất thêm ít nhất 20 workflows mới sẽ tối đa hóa hiệu suất của AI, đưa Agentic SE làm trung tâm cho mọi hoạt động vòng đời phát triển phần mềm (SDLC).

## Research Sessions

### Session 1 (2026-03-05)

**Findings:**
Dựa vào phân tích nội dung PRD-01 (Mục 3 và Mục 6), ta có 8+1 phương pháp/khung quản lý. Dưới đây là đề xuất 25 AI Workflows phân bổ cho từng phương pháp:

#### 1. Scrum (Quản lý dự án tập trung)

- `/scrum-daily-standup-synthesis`: AI tổng hợp commit, Pull Requests và trạng thái task trên hệ thống để sinh báo cáo Daily Standup tự động cho toàn team (tránh họp dài dòng).
- `/scrum-sprint-backlog-analyzer`: AI phân tích độ phức tạp, scope và vận tốc team để đề xuất Sprint Backlog khả thi, cảnh báo sớm rủi ro "spillover" (tràn task sang sprint sau).
- `/scrum-retro-insights-generator`: Agent đọc metrics (burndown, defect rate) và feedback ẩn danh, sinh các Action Items đề xuất cải tiến cho buổi Sprint Retrospective.
- `/scrum-story-slicer`: Hỗ trợ Product Owner tự động băm nhỏ các User Story/Epic lớn thành các task kỹ thuật nhỏ gọn, sinh kèm đủ Acceptance Criteria.

#### 2. Kanban / Lean (Flow liên tục & Tối giản)

- `/kanban-wip-limit-optimizer`: AI phân tích dòng chảy (Flow Metrics), phát hiện nút thắt nghẽn (bottleneck) và tự động thay đổi gợi ý WIP limit động trên bảng Kanban.
- `/lean-value-stream-mapping`: Tracer tự động theo dõi tuổi thọ của một tính năng từ lúc có requirements đến khi lên Production, vạch ra các khoảng "Wait Time" trống (Waste) để cắt giảm.
- `/kanban-stale-card-alert`: Cảnh báo và tóm tắt rào cản kỹ thuật cho các Ticket nằm lỳ ở bến "In Progress" quá lâu, đồng thời gọi ý ghép cặp (Pair Programming) người phù hợp để giải vây.

#### 3. Extreme Programming (XP) (Kỹ thuật cực đoan)

- `/xp-ai-pair-programmer`: Agent đóng vai trò người lập trình cặp theo thời gian thực ngay trên IDE, review thuật toán, độ phức tạp và cảnh báo hổng bảo mật khi Dev đang gõ code.
- `/xp-continuous-refactoring-engine`: Scan toàn bộ codebase luân phiên vào giờ thấp điểm, phát hiện "Code Smells" và đệ trình các PR tái cấu trúc mã (Continuous Refactoring) đảm bảo chuẩn Gmind DS.
- `/xp-simple-design-checker`: Review các bản vẽ kiến trúc và PRD, kích hoạt quy tắc "YAGNI" (Bạn không cần nó đâu) để đề xuất chém bỏ các phần Over-engineering vô ích.

#### 4. AUP / DAD (Quy trình cho doanh nghiệp quy mô lớn)

- `/dad-architecture-model-generator`: Dịch xuôi từ PRD/User Story sang bộ biểu đồ mô hình kiến trúc UML, biểu đồ C4 tự động nhằm phục vụ kiểm định từ đội ngũ Enterprise Architect.
- `/aup-compliance-documentation-sync`: Tự động đồng bộ hóa tài liệu tuân thủ chuẩn ISO/Bảo mật (Compliance) mỗi khi có code push lên luồng Release, giải phóng Kỹ sư khỏi việc viết báo cáo.
- `/dad-governance-gate-reviewer`: Review tự động trạng thái Quality Gate như test coverage, security scan, architecture runway trước mỗi cổng phê duyệt phi tập trung.

#### 5. Dynamic Systems Development Method (DSDM) (Cố định thời hạn)

- `/dsdm-moscow-prioritization`: AI rà quét Backlog chéo với ma trận độ phụ thuộc, tự động gợi ý phân loại yêu cầu vào 4 cấp độ (Must, Should, Could, Won't have) dựa trên giá trị kinh doanh và Deadline sống còn.
- `/dsdm-timebox-enforcer`: Bot giám sát timebox nghiêm ngặt. Khi nhận thấy rủi ro chậm Deadline (cháy thời gian), tự động lập danh sách các function điểm "Could/Should have" cần đưa lên "Đoạn đầu đài" (Drop) để giải cứu dự báo tiến độ.

#### 6. Feature-Driven Development (FDD) (Phát triển xoay quanh Tính năng)

- `/fdd-domain-model-synthesizer`: Thu thập các thực thể lập trình (Entities) từ dự án cũ lẫn PRD mới nhằm duy trì một sơ đồ Domain Model tổng quát cập nhật biến động liên tục.
- `/fdd-feature-list-generator`: Phân rã tự động mô hình Domain lớn thành ngàn mảng tính năng cực nhỏ gọn (nhỏ hơn X ngày làm việc), đưa vào kho list sẵn sàng cho Chief Programmer.
- `/fdd-chief-programmer-assistant`: Trợ lý điều phối AI, phân công tính năng trực tiếp cho các Class Owner (chuyên gia từng phần) dựa vào biểu đồ nhiệt Commit History của họ.

#### 7. Test-Driven Development (TDD) (Kiểm thử dẫn lối)

- `/tdd-test-cases-bootstrap`: Căn cứ vào PRD và Acceptance Criteria, tạo tự động 100% vỏ bọc Unit Test và E2E Test (Trạng thái fail - RED) ngay lập tức; ép Dev phải hoàn thành logic để cho xanh (GREEN).
- `/tdd-mutation-testing-agent`: Tác tử AI đóng giả "Hacker/Người hậu đậu", tự động chế thêm bug (Mutations) vào code đang chạy nhằm xác nhận bộ Test Suite có thực sự bắt được lỗi không.
- `/tdd-red-green-refactor-loop`: Agent tự động chạy bài thi TDD cho các logic đơn giản: Tự viết mã để qua được test RED dễ, sau đó tự clean up đổi sang mã tối ưu (Refactor).

#### 8. Rapid Application Development (RAD) (Làm bản Nháp cực nhanh)

- `/rad-ui-prototype-sketcher`: Từ mô tả chữ (Text-to-UI) hay wireframe bút chì, dựng ngay một bản Prototype tĩnh bằng React component cho phép khách hàng click và tương tác sống.
- `/rad-feedback-to-code-interpreter`: Quét các feedback thả nháp của Khách hàng trên tool Prototype, tự dịch và render ngay lập tức ra các file code tĩnh chỉnh lại UI mà không cần qua khâu Design.

#### 9. SAFe 6.0 (Scaled Agile Enterprise)

- `/safe-pi-planning-dependency-mapper`: Vẽ biểu đồ chằng chịt mạng nhện phụ thuộc chéo giữa hàng chục team (Agile Release Train - ART) lúc PI Planning, tô đỏ các khu vực có nguy cơ đổ vỡ dây chuyền.
- `/safe-wsjf-auto-calculator`: Tự động tính điểm WSJF (Weighted Shortest Job First) phân theo từng hạng mục dựa vào Cost of Delay và Job Size nhằm xếp hạng Epic/Feature nhanh nhất toàn ART.

**Open Items:**

- Với 25 ý tưởng workflows trên, Team PMO và Kỹ sư trưởng (Human) sẽ cần review và chọn lọc ra các Workflows có tính thực tiễn và khả thi cao để ưu tiên Implement làm mẫu.
- Có cần định nghĩa kiến trúc chuẩn (Agent Prompt Template) cho các workflow này không?

## Recommendation

- **Lựa chọn & Thiết lập Mockup trước:** Đề xuất chọn ra 5 trong số 25 workflows trên (Mỗi môn phái 1 đại diện tốt nhất như: `xp-continuous-refactoring-engine`, `tdd-test-cases-bootstrap`, `rad-ui-prototype-sketcher`, `scrum-story-slicer`, `fdd-domain-model-synthesizer`) để tiến hành tạo template `.agents/workflows/` giả lập ban đầu.
- **Tích hợp:** Đưa danh sách đề xuất này vào tài liệu hướng dẫn hoặc quy chuẩn của nền tảng Gmind để mở rộng chân trời ứng dụng cho Agentic SE.

## Decision (nếu đã thống nhất với Human)

- [Chờ Human Review]

## Open Items → Next Spikes

- Chờ Human phản hồi để đưa vào implementation plan hoặc loại bỏ bớt các workflow không cần thiết.
