---
beads-id: br-prd-web-prompts
title: "PRD 01: Tinh chỉnh UI & Làm phong phú Nội dung Thư viện Prompt (Showcase)"
sections:
  - anchor: "1-ui-polish"
    title: "Tinh chỉnh UI & Giao diện"
    beads-id: br-prd-web-prompts-s1
  - anchor: "2-setup-refactor"
    title: "Cấu trúc lại hướng dẫn Cài đặt"
    beads-id: br-prd-web-prompts-s2
  - anchor: "3-agile-scrum"
    title: "Phát triển Phần mềm Linh hoạt (Agile)"
    beads-id: br-prd-web-prompts-s3
  - anchor: "4-safe-6"
    title: "Lý thuyết SAFe 6.0"
    beads-id: br-prd-web-prompts-s4
  - anchor: "5-500-issues"
    title: "Trực quan hóa 500 Vấn đề Năng suất"
    beads-id: br-prd-web-prompts-s5
  - anchor: "6-extreme-programming"
    title: "Lý thuyết Extreme Programming (XP)"
    beads-id: br-prd-web-prompts-s6
---

# PRD 01: Tinh chỉnh UI & Cải thiện Nội dung Prompts Library (Showcase)

<!-- beads-id: br-prd-web-prompts -->

## 1. Tinh chỉnh UI & Giao diện

<!-- beads-id: br-prd-web-prompts-s1 -->

- **Thanh cuộn Left-Sidebar:** Triển khai thanh cuộn webkit tùy chỉnh cho menu điều hướng bên trái, đảm bảo màu sắc nhất quán với hệ thống thiết kế hiện tại (điểm nhấn màu cyan/teal).
- **Khoảng cách Node:** Trong các phần xem Flowchart của `PromptViewer`, lề dọc (margin) giữa các node riêng lẻ phải được tăng lên gấp 5 lần (khoảng `15rem` hoặc `240px`) để mang lại cảm giác "hành trình" mở rộng, cuộn mượt mà thay vì một chuỗi chật chội.
- **Nút Copy:** Nút "Copy Prompt" nằm trong các node phải được đổi tên đơn giản thành "Copy" và tuân thủ nghiêm ngặt chuẩn phong cách thiết kế của hệ thống (màu sắc, padding, border-radius).

## 2. Cấu trúc lại: Phần Cài đặt & Thiết lập

<!-- beads-id: br-prd-web-prompts-s2 -->

Phần "Cài đặt Toàn diện" không được hiển thị dưới dạng chuỗi `WorkflowNode` theo hướng luồng flowchart nữa.

- Nó phải được cấu trúc lại hoàn toàn để có giao diện và trải nghiệm như một **Bài hướng dẫn Kỹ thuật / Tutorial** chuyên sâu.
- Nội dung nên chia thành các phần tài liệu cuộn dọc (ví dụ: Cài đặt Agent, FastCode CLI, Gmind Core) sử dụng typography phong phú, các khối mã đa hệ điều hành (multi-OS) và cấu trúc markdown thay vì các node liên kết dạng modal.

## 3. Phát triển Phần mềm Linh hoạt (Agile Software Development)

<!-- beads-id: br-prd-web-prompts-s3 -->

Giao diện hiển thị Agile/Scrum phải chuyển từ một "Workflow" bề mặt thành một bài viết/hướng dẫn chuyên nghiệp kể về các nền tảng của Phương pháp Phát triển Phần mềm Agile.

_Mục tiêu cốt lõi: Nêu bật các ưu điểm thực tế, sự hiệu quả và linh hoạt của Agile so với các phương pháp tiếp cận truyền thống._

**Nội dung Bài viết Chi tiết:**

### 3.1. Giới thiệu chung

- **Tuyên ngôn Agile (Agile Manifesto):** Đánh dấu một cuộc cách mạng thay đổi hoàn toàn nguyên trạng trong cách thức lập kế hoạch, phát triển, kiểm thử và phát hành phần mềm.
- **Sự chuyển dịch:** Quét sạch những giáo điều (orthodoxy) cứng nhắc bị tích tụ nhiều năm; biến các phương pháp linh hoạt (Agile) thành một bản lề, một tiêu chuẩn mới để phát triển hệ thống trong toàn ngành công nghiệp.

### 3.2. So sánh Agile và Mô hình Truyền thống (Waterfall)

**1. Nhược điểm của mô hình truyền thống (theo giai đoạn nối tiếp)**

Theo truyền thống, dự án tuân thủ nghiêm ngặt theo các giai đoạn dựa trên mức độ chắc chắn về hệ thống sắp được xây dựng, nhưng lại bộc lộ những điểm yếu chí mạng:

- **Thiếu sự linh hoạt:** Hoàn toàn bị động trước các thay đổi về yêu cầu của khách hàng.
- **Lãng phí thời giờ:** Xây dựng hàng loạt các tính năng vô giá trị mà không có ai thực sự cần đến.
- **Phản hồi quá muộn màng:** Người dùng cuối bị bịt mắt và không thể đưa ra lời nhận xét cho tới tận khi khâu lập trình hoàn tất.
- **Độ ổn định mù mờ:** Trừ giai đoạn bàn giao cuối cùng ra thì không mảy may biết được độ ổn định của hệ thống đến đâu.

**2. Cách tiếp cận của dự án Agile**

Né tránh chia rẽ theo từng giai đoạn, dự án Agile băm nhỏ chu trình phát triển:

- **Cấu trúc:** Dự án được chia nhỏ thành các "Bản phát hành" (releases) và "Vòng lặp ngắn" (iterations).
- **Sản phẩm định kỳ:** Tới cuối một vòng lặp, nhóm tạo ra một hệ thống có đầy đủ chức năng trơn tru và có thể tung ra vận hành ngay lập tức.
- **Thích ứng yêu cầu:** Không cần phải đóng chặt toàn bộ yêu cầu cấu trúc hệ thống từ đầu; thay vào đó, yêu cầu được tách làm các "Câu chuyện người dùng" (User Stories), được sắp xếp độ ưu tiên và đưa lên lịch sản xuất trong từng vòng lặp.

> _(Ghi chú UI: Chèn Biểu đồ so sánh "Waterfall vs Agile" tại đây)_
> ![Waterfall vs Agile](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000003.svg)

### 3.3. Bốn Nguyên tắc cốt lõi của Agile

Mọi phương pháp tinh nhạy này đều phụng sự và duy trì theo 4 tôn chỉ xương sống:

1. **Cá nhân và sự tương tác** quan trọng hơn quy trình và công cụ.
2. **Phần mềm chạy tốt** quan trọng hơn tài liệu đầy đủ và cồng kềnh.
3. **Cộng tác với khách hàng** quan trọng và mang lại giá trị hơn việc thương thảo hợp đồng giấy tờ.
4. **Phản hồi với sự thay đổi** luôn được đặt lên trên việc bám sát kế hoạch mù quáng.

> _(Ghi chú UI: Chèn Biểu đồ "4 Giá trị của Agile" tại đây)_

### 3.4. Các phương pháp phát triển Agile phổ biến

Hệ sinh thái Agile vận hành nhờ một loạt các phương pháp chuyên biệt, mỗi phương pháp lại mang những bộ quy tắc và "vũ khí" riêng để giải quyết các môi trường sản xuất khác nhau:

#### 1. Scrum

Là hệ phương pháp (framework) Agile phổ biến và nổi tiếng nhất thế giới hiện nay. Scrum thiết lập một bộ quy trình, công cụ và vai trò quy chuẩn, khắc nghiệt để bảo đảm sự tập trung tuyệt đối.

- **Cách duy trì:** Chia thời gian dự án thành các chu kỳ cực ngắn thường từ 1 đến 4 tuần gọi là các **Sprints**.
- **Công cụ nổi bật:** Dùng _Product Backlog_ để chứa toàn bộ ý tưởng; _Sprint Backlog_ cho số công việc cam kết làm ngay trong Sprint; các cuộc họp đứng _Daily Scrum_ diễn ra 15 phút mỗi sáng để rà soát chướng ngại vật; và biểu đồ _Burn-down_ dùng để theo dõi xem nhóm có thể đốt cháy xong lượng công việc trước hạn chót hay không.
- **Thế mạnh:** Scrum đặc biệt tỏa sáng trong việc **Quản lý dự án** chứ không đi sâu vào việc nhóm phải code như thế nào.

#### 2. Kanban / Lean

Bắt nguồn từ hệ thống tối ưu hóa dây chuyền sản xuất lắp ráp của Toyota, Kanban là một cách tiếp cận trực quan vô cùng thanh lịch.

- **Luồng chảy Công việc (Flow):** Hệ thống được gắn các khung cột (To Do, In Progress, Review, Done) trên bảng. Các công việc là các thẻ (cards) chuyển động nhịp nhàng qua từng cột như nước chảy.
- **Trọng lực:** Khác với Scrum bị giới hạn thời gian (sprint vòng lặp khép kín), Kanban không cần vòng lặp. Nó sinh ra quy luật duy nhất để tránh nghẽn cổ chai: **Giới hạn lượng công việc đang làm (WIP - Work in Progress)**. Tức là một cột không bao giờ được phép có trên 5 thẻ cùng lúc, buộc mọi người phải nhào vào giải quyết cho xong mới được rút thẻ mới.

#### 3. Extreme Programming (XP)

Nếu Scrum là cái vỏ bọc quản lý dự án, thì Extreme Programming (XP) là "Linh hồn Kỹ thuật" của Agile.

- **Tập trung:** XP đẩy các nguyên lý kỹ thuật phần mềm lên mức độ "Cực đoan" (Extreme).
- **Tuyệt kỹ:** Nó tung ra các quy định như _Lập trình Cặp (Pair Programming)_ - 2 người dùng chung 1 màn hình code để triệt tiêu lỗi; _Tích hợp Liên tục (CI)_ - gộp code nhiều lần mỗi ngày; và code bằng thiết kế đơn giản lặp đi lặp lại.
- **Đích đến:** Chuyên tâm tạo ra phần mềm ít bug cực hạn, có khả năng đập đi xây lại không chút sợ hãi trước những yêu cầu thay đổi đột ngột từ khách hàng.

#### 4. Agile Unified Process (AUP) & Disciplined Agile Delivery (DAD)

Các phương pháp đặc thù sinh ra dành cho các tập đoàn có bộ máy nặng nền.

- **AUP (Agile Unified Process):** Là một phiên bản đã cắt gọt bớt từ quy trình RUP khổng lồ cũ kỹ (Rational Unified Process). AUP cố gắng giữ lại sự nhẹ gọn của Agile nhưng vẫn duy trì rất tỉ mỉ những bộ mô hình hóa hệ thống phức tạp và bộ tài liệu hướng dẫn (hơi nặng về quy trình hơn các anh em Agile khác).
- **DAD (Disciplined Agile Delivery):** Tiến thêm một bước, DAD phủ lớp tính chất Agile trải dài dọc theo toàn bộ vòng đời sản phẩm, từ tư duy đầu tư ban đầu, tới quản trị vòng đời cho tới lúc vận hành kỹ thuật.

#### 5. Dynamic Systems Development Method (DSDM)

DSDM rất khắt khe: Nó tuyệt đối không nhân nhượng về Tiến độ và Lên lịch. Function sẽ phải bị hi sinh nếu muốn giữ thời hạn.

- **Nguyên tắc MoSCoW:** Đây là vũ khí đặc trưng của DSDM. Nhóm sẽ phải đánh mức độ nhẫn tâm cho các yêu cầu:
  - **M**ust have (Bắt buộc phải có để hệ thống chạy).
  - **S**hould have (Nên có nhưng có thể tìm cách lách qua).
  - **C**ould have (Có thì tốt, dùng để làm tính năng cho đẹp).
  - **W**on't have (Sẽ không thèm làm trong chu kỳ này).

#### 6. Feature-Driven Development (FDD)

Quyết sống chết dựa vào tính năng. Mô hình này rất hay được áp dụng ở thế giới doanh nghiệp (Enterprise).

- **Cách làm:** Trước hết, cả nhóm tập trung giải một bài toán quy hoạch rất to gọi là Lên mô hình hệ sinh thái tổng quát (Domain object model). Sau đó, dự án sẽ chia làm hàng ngàn mảnh vụn tính năng nhỏ và lao vào thiết kế và lập trình chỉ trong vài ngày tập trung theo chuẩn: 1 Chủ thiết kế - nhiều người thợ phụ.

#### 7. Test-Driven Development (TDD)

Bình thường người ta viết Code xong mới dùng Test để kiểm tra. Nhưng TDD đã lật ngược tư duy đó lại để giảm rủi ro xuống bằng không:

- **Nguyên tắc Đỏ - Xanh:** Lập trình viên CỐ TÌNH chạy các kịch bản kiểm thử (Test) biết trước là sẽ thất bại (Red). Sau đó họ mới được phép viết mã nguồn làm sao cho việc kiểm thử đấy báo thành công (Green). Tức là, ngay từ lúc lọt lòng, code đã ở trạng thái dập tắt được rủi ro dự tính sẵn.

#### 8. Rapid Application Development (RAD)

Đây là phương pháp ưu tiên việc "múa tay trong bị" dành cho những đối tác không biết họ thực sự muốn cái gì.

- **Phát triển Mẫu thử (Prototyping):** Không rườm rà tài liệu hay phân tích luồng. Tự tay thiết kế luôn ra ngay một bề mặt GUI (Giao diện) nguyên mẫu có khả năng bấm dùng thử, sau đó đem thẳng cái mô hình làm màu này cho đối tác xem xét và nhận gạch đá phản hồi để lặp lại tiến trình tinh chỉnh thành sản phẩm chạy xịn ngay lập tức.

### 3.5. Agile ở quy mô doanh nghiệp (Scaled Agile)

**Scaled Agile Framework (SAFe)**

- Áp dụng Agile cho các chương trình lớn và toàn bộ tổ chức.
- Nguyên tắc chính: Tư duy hệ thống, cái nhìn kinh tế, và phi tập trung hóa việc ra quyết định.

### 3.6. Công cụ hỗ trợ Agile

Sự hiện diện của các nền tảng kỹ thuật tự động hóa giúp gỡ bỏ hoàn toàn điểm tối khi triển khai Agile trên diện rộng:

- **SpiraTeam:** Giải pháp nền tảng ALM mạnh mẽ giúp quản lý vòng đời bộ bọc dự án Agile từ trong bụng thiết kế cho tới lúc giao tay người dùng.
- **Rapise:** Trợ thủ đắc lực trong lĩnh vực chạy tự động hóa các kịch bản kiểm thử (Automated testing), tăng tối đa tần suất quét bắt lỗi giúp kỹ sư tránh sụp đổ.

### 3.7. Các Biểu đồ Minh họa Trực quan

Các biểu đồ dưới đây cung cấp thêm ngữ cảnh về cách áp dụng chu trình Agile trên thực tế:

![Agile Methodology](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000001.svg)
![Supplementary Image 4](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000004.svg)
![Supplementary Image 5](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/03000005.png)
![Supplementary Image 6](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000006.svg)
![Supplementary Image 7](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000007.svg)
![Supplementary Image 8](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/03000008.svg)
![Supplementary Image 9](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/02000009.svg)
![Supplementary Image A](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/0300000A.svg)
![Supplementary Image B](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/0300000B.svg)
![Supplementary Image C](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/0300000C.svg)
![Supplementary Image D](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/0300000D.svg)
![Supplementary Image E](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain-svg/0300000E.svg)
![Supplementary Image F](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/0300000F.png)
![Supplementary Image 10](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/03000010.png)
![Supplementary Image 11](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/03000011.png)
![Supplementary Image 12](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/03000012.png)
![Supplementary Image 13](/Users/steve/duyhunghd6/gmind/docs/assets/images/agile-explain/03000013.png)

## 4. SAFe 6.0: Nhúng Tư duy Agile vào Quy mô Doanh nghiệp

<!-- beads-id: br-prd-web-prompts-s4 -->

Giao diện SAFe 6.0 cũng phải trở thành một bài hướng dẫn, tuân thủ nghiêm ngặt các kết quả nghiên cứu ngữ cảnh (`./docs/research-rules.md`).

**Dàn ý & Yêu cầu Nội dung:**

1. **Giới thiệu SAFe 6.0:** Lý do các doanh nghiệp khổng lồ cần các nhóm Agile bắt tay nhau đồng bộ.
2. **Tư duy Lean-Agile & Năng lực Cốt lõi (Core Competencies):** Quy chuẩn phát hành đồng loạt.
3. **Khám phá Liên tục (Continuous Exploration - CE):** Chu kỳ 4 hoạt động trọng điểm (Hypothesize, Collaborate & Research, Architect, Synthesize).
4. **Nhánh Nghiên Cứu (Research Spikes):** Khái niệm tích lũy kiến thức qua các báo cáo cô lập thay vì cắm đầu viết code ở khâu Phân tích Yêu cầu.
5. **Đoàn Tàu Phát hành Agile (ART) & Lên kế hoạch Chu kỳ lớn (PI Planning):** Nghệ thuật đồng bộ nhịp độ nhiều team tách biệt.
6. **Vai trò & Thành phẩm:** Kỹ sư Trưởng (RTE), PMO, Business Owners định hướng luồng chuyển từ Tầm nhìn (Vision) thành Kiến trúc cuối cùng của PRD.

## 5. 500 Vấn đề Năng suất Phần mềm

<!-- beads-id: br-prd-web-prompts-s5 -->

Phần "500 Vấn đề" phải được thiết kế lại hoàn toàn về mặt thị giác để tránh làm hoa mắt người đọc (Cognitive Overload).

- Các vấn đề sẽ được nhóm theo cấp bậc (hierarchically) hoặc hướng tâm.
- **Triển khai Trực quan:** Sử dụng dạng Cây Đa chiều (Tree Layout) hoặc Ma trận Tương tác (Interactive Grid) để chia cụm 500 vấn đề thành 10 phần có thể thu gọn, mỗi phần 50 mục.
- Việc click vào một danh mục phải trải nhẹ xuống cùng **Mức độ Tác động** đã gán giá trị trước (Critical, High, Medium) bằng bảng lưới để người dùng có thể quét mắt liên tục mà không bị nghẽn việc đọc.

## 6. Extreme Programming (XP): Linh hồn Kỹ thuật của Agile

<!-- beads-id: br-prd-web-prompts-s6 -->

Giao diện Extreme Programming (XP) trở thành tài liệu diễn giải nền tảng kỹ thuật và nguyên tắc thiết kế đằng sau bộ khung hoàn mỹ này.

**Nội dung Bài viết Chi tiết:**

### 6.1. Giới thiệu & Khởi nguồn

Khi kỷ nguyên hiện đại đẩy vòng lặp tính theo giờ, quản trị học truyền thống bị vứt lại phía sau. Extreme Programming (XP) vươn lên là một bộ khung tối thượng, tập trung dồn dập vào **Chất lượng Kỹ thuật Nội tại (Technical Excellence)**. Hệ phương pháp XP do Ken Beck khởi xướng sinh ra là để đập tan mọi nỗi sợ về biến động mã nguồn, xây dựng code xịn nhất ở tốc độ khủng khiếp nhất.

### 6.2. Quy trình & Các Vai trò Tác chiến

Chu trình sống của hệ thống chạy trên XP quét qua 5 bước:

- **Lập kế hoạch (Planning):** Lập trình viên định giá thời gian và khách hàng quyết ngay mức chi phí.
- **Thiết kế (Designing):** Định hình hình hài logic bằng nguyên tắc "Tính Đơn giản cao độ".
- **Lập trình (Coding):** Triển khai liên hồi Tích hợp Liên tục (CI) và Chuẩn chung định dạng.
- **Kiểm thử (Testing):** Hạt nhân vô đối của XP. Mọi thứ được định nghĩa là thành công chỉ khi và chỉ khi Tự động kiểm thử quét xanh (Green Tests) và Khách hàng cho qua.
- **Lắng nghe (Listening):** Chuyển nhịp và tiếp thu tiếng nói của hệ thống và thế giới thực.

> _(Ghi chú UI: Chèn Biểu đồ "Vòng đời XP" tại đây)_

Các vai trò chính:

- **Khách hàng Tại chỗ (Customers):** Người nắm giữ "chìa khóa bài toán kinh doanh" trực tiếp tham dự quá trình sinh code.
- **Kỹ sư Tác chiến (Programmers):** Lực lượng đa nhiệm chéo phân nhỏ kiến trúc thành mã lệnh.
- **Người Điều tiết (Trackers/Coaches):** Người chỉ huy giữ cho cỗ máy không trượt khỏi ray tâm lý và hành vi chuẩn mực của XP.

### 6.3. Giá trị & Nguyên tắc của XP

> _(Ghi chú UI: Chèn Biểu đồ "Giá trị & Nguyên tắc XP" tại đây)_

**5 Giá trị Kim cương:**

- **Giao tiếp (Communication):** Kéo rào cản phòng ban xuống, đẩy sự thấu hiểu lên.
- **Đơn giản (Simplicity):** Chỉ code những gì có ích lợi ngay hôm nay, từ chối việc lo xa vô cớ.
- **Phản hồi (Feedback):** Chỉnh sửa qua vòng xoay nhịp độ vài phút đến vài ngày.
- **Tôn trọng (Respect):** Một văn hóa tập thể nơi thành tựu làm nên tên tuổi chứ không phải chức danh.
- **Can đảm (Courage):** Sẵn sàng vứt bỏ và đập bỏ toàn bộ cụm mã tồi tàn để xây cái mới tốt hơn.

**5 Nguyên tắc Dẫn đường:**

- Tốc độ phản hồi cực đoan.
- Giả định ranh giới tính đơn giản là YAGNI ("Bạn Sẽ Không Cần Nó Đâu").
- Mọi biến đổi đều nhỏ từng li (Incremental changes).
- Ôm lấy rủi ro thay đổi chức năng.
- Tự hào về chất lượng hảo hạng của từng dòng code viết ra.

### 6.4. Các Chuẩn mực Thực tiễn Vàng

> _(Ghi chú UI: Chèn Biểu đồ "Các Thực tiễn XP" và "Vòng phản hồi XP" tại đây)_

XP đem 12 hoạt động thiết yếu rèn đến mức "Cực Đoan" (Extreme):

- **Phát triển Hướng Kiểm Thử (TDD):** Logic kiểm thử phải được viết và thấy Thất bại (Màu Đỏ) trước khi viết Logic thực thi code. Cú chốt làm giảm lượng Bug bằng không.
- **Trò chơi Khởi sự (Planning Game):** Cuộc ngã giá cực nhanh trong việc nhặt tính năng.
- **Khách Cùng Coding (On-site Customer):** Dân kinh doanh giải quyết khúc mắc logic nghiệp vụ tại chỗ với kỹ sư.
- **Lập Trình Cặp (Pair Programming):** Hai cái đầu - một luồng mã. Lập trình xoay vòng tiêu diệt tính độc quyền mã nguồn (Silos).
- **Trùng Tu Liên Tục (Code Refactoring):** Gọt đẩy mã lệnh thành bản giao hưởng gọn gàng nhất.
- **Tích Hợp Liên Tục Tập Trung (CI):** Mã sẽ được merge lên luồng chính bất cứ lúc nào chạy qua bài Test (Không đợi cuối ngày).
- **Phát Hành Vi Mô (Small Releases):** Launch sản phẩm trong nháy mắt.
- **Thiết Kế Đơn Giản Nhiệm Màu (Simple Design):** Chống não căng thẳng.
- **Bản Quyền Tập Thể (Collective Code Ownership):** Tất thảy mọi người đều tự do bửa sửa code lỗi ở mọi khu vực mà họ thấy chướng mắt.
- **Tiêu Chuẩn Đồng Hóa Code (Coding Standards):** 10 người code như 1.
- ..._Và thời gian làm việc phải là 40 giờ một tuần để giữ tính thanh lọc não bộ minh mẫn nhất._

### 6.5. Tương quan Đánh giá Ưu và Nhược

**Ưu điểm:** XP xây dựng ra những khối thành trì phần mềm đồ sộ bất di bất dịch, code sáng rõ, vận tốc phân phối ở tốc độ ánh sáng, loại bỏ hoàn toàn sốt ruột của khách hàng, triệt tiêu tăng ca không giới hạn, là đỉnh cao trong hợp tác làm việc.

**Nhược điểm:** Tính đòi hỏi gắt gao. Phải yêu cầu năng lực thực tế cao ở Kỹ sư, Khách hàng phải hy sinh thời gian chuyên biệt. Xảy ra sự xô xát cái tôi khi Lập trình cặp trong những ngày đầu, không thể áp dụng chuẩn mực cho các nhóm phân tán đa quốc gia do thiếu tương tác thực.

**Sự Hợp nhất (XP & Scrum):** Scrum là lớp vỏ bọc bên ngoài lo việc quản trị điều phối luồng quy trình công việc; và để "code được bên trong" – đó là đất diễn lẫy lừng của kỹ nghệ Extreme Programming. Đây là cặp bài trùng được vinh danh phổ biến nhất mọi thời đại trong ngành phần mềm.
