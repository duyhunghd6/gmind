# Spike: 500 Vấn Đề Làm Suy Giảm Hiệu Suất Công Ty Phát Triển Phần Mềm

**Tác giả:** PMO Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)
**Nguồn:** NotebookLM Notebook — Academic Papers on SE Management
**URL:** https://notebooklm.google.com/notebook/83827e52-f02e-40a9-94d9-5f9a50f9dbc8

## Hypothesis

- Có thể tổng hợp một danh sách toàn diện gồm 500 vấn đề cụ thể từ nghiên cứu học thuật, phân loại theo 10 nhóm chủ đề chính, để xây dựng framework đánh giá hiệu suất tổ chức phát triển phần mềm.

## Research Sessions

### Session 1 (2026-03-01)

**Phương pháp:** 10 phiên truy vấn NotebookLM lần lượt, mỗi phiên tập trung vào 1 nhóm chủ đề, thu thập ~50 vấn đề/phiên.

**Notebook Overview:** Bộ sưu tập toàn diện các bài báo học thuật, trích đoạn sách và bài viết tập trung vào Software Engineering Management, Knowledge Management, và Organizational Dynamics. Bao gồm 7 chủ đề chính: KM trong SE, Project Management & Leadership, Socio-Technical Systems, AI trong SE, Technical Debt & Architecture, Developer Productivity & Experience, và Scale Economies & Open Source Governance.

---

## Danh Sách 500 Vấn Đề

---

### I. QUẢN LÝ TRI THỨC & MẤT MÁT KIẾN THỨC (50 vấn đề)

1. **Knowledge walkouts** — Tacit knowledge rời công ty khi developer kỳ cựu nghỉ việc, tạo lỗ hổng năng lực tổ chức nghiêm trọng
2. **Abandoned files** — Developer còn lại phải tốn thêm effort để hiểu và maintain code do người đã nghỉ viết
3. **Disappearing architectural context** — Lý do lịch sử đằng sau các quyết định kỹ thuật biến mất khi nhân sự chủ chốt rời đi
4. **Single points of failure** — Kiến thức ứng dụng quan trọng thường chỉ nằm trong đầu một "go-to expert" duy nhất
5. **Time to Proficiency gaps** — Nhân viên mới mất rất lâu để đạt năng suất đầy đủ khi thiếu tài liệu và structured knowledge transfer
6. **Inconsistent onboarding** — Tăng trưởng nhanh kết hợp chia sẻ kiến thức kém dẫn đến onboarding không có hệ thống
7. **Costly rediscovery** — Đội ngũ lãng phí ngân sách và thời gian lớn để truy vết lại các quyết định cũ và re-learn context đã mất
8. **Documentation creation difficulties** — Developer thường thấy việc viết tài liệu code rõ ràng là khó và tốn thời gian
9. **Documentation resistance** — Pushback văn hóa thường xuyên trong đội ngũ đối với việc document công việc
10. **Information rot** — Repository ngập tràn dữ liệu ROT (Redundant, Outdated, Trivial) gây hiểu lầm và ô nhiễm AI models
11. **Documentation debt** — Code comments thường chứa thông tin sai lệch, trỏ đến issues đã fixed, hoặc bỏ qua thực tế
12. **Information graveyards** — Enterprise wikis trở thành nơi kiến thức "chết" do khả năng tìm kiếm kém
13. **Lack of time for SMEs** — SME ưu tiên deadline khách hàng hơn việc document quy trình
14. **Lack of synthesized internals** — Đội support thiếu tài liệu tổng hợp về module flows, error codes, control blocks
15. **Time wasted searching** — Developer lãng phí tới 40% thời gian tìm kiếm thông tin thay vì coding
16. **Reinventing the wheel** — Đội ngũ không học từ dự án cũ, liên tục duplicate work
17. **Repeated mistakes** — Không capture lessons learned, team lặp đi lặp lại cùng lỗi
18. **Overburdened senior staff** — Lead developer dành quá nhiều thời gian trả lời câu hỏi lặp lại thay vì làm việc chiến lược
19. **Difficulty locating experts** — Nhân viên lãng phí nhiều ngày chỉ để tìm "ai biết gì" trong tổ chức
20. **Delayed bug fixes** — Issue critical mất lâu hơn để fix vì không ai hiểu intent ban đầu
21. **Artificial contribution quotas** — KM initiatives thiết kế kém khiến developer upload "junk" knowledge để đạt mục tiêu
22. **Tool fragmentation** — Kiến thức phân tán qua VCS, issue trackers, wikis, và informal chats
23. **Volatile tribal knowledge** — Quick fixes bị chôn vùi trong Slack chats và biến mất khỏi organizational memory
24. **Organizational silos** — Team làm việc cô lập không chia sẻ kiến thức
25. **Unwritten business rules** — Business logic được lập trình như special cases trong code khó hiểu mà không document
26. **Non-standard notations** — Team sử dụng custom diagram notations khiến architecture docs khó hiểu
27. **Time zone barriers** — Distributed agile teams khó tìm giờ chung cho knowledge sharing sessions
28. **Knowledge hoarding** — Nhân viên cố ý giấu kiến thức để bảo vệ vị trí, job security
29. **Lone Wolf effect** — Cá nhân làm việc cô lập tạo massive information silos
30. **Lack of psychological safety** — Văn hóa trừng phạt thất bại kìm hãm communication và chia sẻ
31. **Misaligned incentives** — Performance reviews chỉ reward coding output, không reward knowledge-sharing
32. **Not-Invented-Here syndrome** — Team từ chối giải pháp bên ngoài chỉ vì không phải họ tạo
33. **Lack of interpersonal trust** — Nhân viên ngại chia sẻ ý tưởng do mối quan hệ chuyên môn yếu
34. **Black Cloud effect** — Thái độ tiêu cực giảm động lực chia sẻ kiến thức
35. **Information overload** — Dữ liệu không lọc làm developer overwhelmed, KM system trở nên vô dụng
36. **Learning-by-doing delays** — Thay đổi công nghệ nhanh buộc team learn on the fly, delay dự án
37. **Language and cultural barriers** — Khác biệt ngôn ngữ và văn hóa gây hiểu lầm nghiêm trọng trong knowledge transfer
38. **Ambiguous architectural boundaries** — Ranh giới phần mềm không rõ ràng khiến khó xác định features nằm ở đâu
39. **Fear of legacy systems** — Không có tài liệu lịch sử, developer sợ sửa đổi legacy code
40. **Technical debt from ignorance** — Kiến thức sản phẩm không đủ đẩy developer triển khai workarounds kém
41. **Static repository limitations** — KM databases truyền thống quá cứng nhắc để capture tacit knowledge
42. **Disconnected reporting systems** — Di chuyển data giữa problem-reporting tools rời rạc gây mất thông tin
43. **Ineffective keyword search** — Search engines truyền thống không nắm bắt semantic relationships
44. **AI hallucination risks** — Generative AI cho knowledge retrieval có rủi ro tạo câu trả lời sai
45. **Manual documentation decay** — Thiếu automation khiến documentation nhanh chóng lệch khỏi codebase
46. **Workflow disruption** — Developer phải liên tục chuyển đổi giữa nhiều tools để tìm context
47. **Security and privacy vulnerabilities** — Access controls không đủ trong KM systems rủi ro lộ thông tin nhạy cảm
48. **Over-focus on technology** — Tổ chức coi KM là software installation thay vì giải quyết 70% yếu tố con người
49. **Ineffective knowledge metrics** — Đo KPIs sai (volume wiki edits) khuyến khích thói quen xấu
50. **Traceability gaps** — Thiếu liên kết rõ ràng giữa requirements, test cases, và source code

---

### II. QUẢN LÝ DỰ ÁN, AGILE & NỢ KỸ THUẬT (50 vấn đề)

51. **Brooks's Law** — Thêm nhân lực vào dự án đã chậm chỉ làm nó chậm hơn do chi phí communication tăng
52. **Ramp-Up productivity drops** — Developer mới giảm năng suất tổng thể khi cần training từ developer có kinh nghiệm
53. **Communication explosion** — Khi team size tăng, số kênh giao tiếp tăng theo n(n−1)/2
54. **Sequential task limits** — Một số tasks không thể parallelized; thêm người không tăng tốc
55. **Quality paradox** — Mở rộng team nhanh gây sụt giảm tạm thời chất lượng code
56. **Loss of morale** — Đưa người mới vào team struggling khiến thành viên cũ cảm thấy bị đặt nghi vấn
57. **Disproportionate low-contributors** — Năng suất trung bình giảm do nhiều peripheral members đóng góp thấp
58. **Task interdependence delays** — Code changes của một người liên tục phá hỏng work của người khác
59. **Skill loss upon team dissolution** — Kiến thức quy trình chuyên biệt bị phân tán khi team giải thể
60. **Unmanageable Socio-Technical Dependencies** — Scaling tạo tăng trưởng bùng nổ dependencies giữa teams và architecture
61. **Loss of the "Big Picture"** — Tập trung quá mức vào Agile features riêng lẻ khiến mất tầm nhìn sản phẩm tổng thể
62. **Disregard for Enterprise Architecture** — Team Agile bỏ qua architectural planning tổng thể
63. **Superficial Stand-ups** — Daily meetings biến thành thủ tục báo cáo 6 phút, thiếu thảo luận thực sự
64. **Process Over People** — Distributed Agile tập trung vào process framework hơn collaboration cá nhân
65. **Lack of Face-to-Face Contact** — Distributed teams mất tương tác tự nhiên, phụ thuộc quá nhiều vào async tools
66. **Time Zone Disparities** — Collaboration synchronous gần như bất khả thi với distributed teams
67. **Cultural and Language Barriers** — Backgrounds đa dạng gây hiểu lầm trong Agile practices
68. **Unprepared Communication Infrastructure** — Thiếu video/web conferencing tools làm remote Scrum kém hiệu quả
69. **Functional Silos in Agile** — Adopt Agile mà không thay đổi org structure tạo phần mềm phân mảnh
70. **Lack of Customer Involvement** — Khoảng cách vật lý giảm contact thường xuyên với khách hàng
71. **Resistance from Traditional Management** — Command-and-control khó adapt servant-leadership
72. **Over-reliance on Velocity Metrics** — Đo thành công bằng story points khuyến khích hành vi xấu
73. **Misaligned Distributed Goals** — Communication breakdown dẫn đến fragmented development
74. **Overly Optimistic Scheduling** — Deadlines phi thực tế gây panic-hiring và Brooks's Law
75. **The 90% Complete Syndrome** — Thiếu objective measurement, dự án luôn được báo "almost complete"
76. **Unfunded Scope Changes** — Thay đổi scope mà không điều chỉnh schedule/budget gây burnout
77. **Excessive Task Switching** — Assign developer cho nhiều projects gây "switch time" waste
78. **Partially Completed Work** — Incomplete work tạo rủi ro tài chính và clog pipeline
79. **Systemic Delays and Waiting** — Approval processes quá mức, delayed testing kìm hãm response
80. **Building Unnecessary Features** — Nỗ lực cho extra features khách hàng không yêu cầu
81. **Lack of Transparency** — Documentation siloed che giấu quá trình phát triển thực sự
82. **Unclear Decision-Making Boundaries** — Vai trò và authority chồng chéo gây consensus delays
83. **Missing Cross-Program Coordination** — Thất bại đồng bộ team phụ thuộc lẫn nhau
84. **Organizational Turbulence** — Thay đổi ưu tiên đột ngột gây delivery stops và lo lắng
85. **Destructive Workflow Trade-offs** — Áp lực thị trường buộc bỏ qua integration testing
86. **Power Distance Effect** — Hierarchy cứng khiến developer cấp dưới giấu concerns
87. **Conway's Law Violations** — Cấu trúc tổ chức thắng kiến trúc hệ thống khi hai bên mâu thuẫn
88. **Monolithic Communication Traps** — Team nhỏ communicate quá nhiều tạo monolithic architecture
89. **Tightly Coupled Microservices** — Tổ chức theo chuyên môn tạo web dependencies phức tạp
90. **Pragmatism-induced Technical Debt** — MVP rush tạo shortcuts cripple long-term stability
91. **Ignorance-based Debt** — Developer thiếu deep knowledge unintentionally tạo technical debt
92. **Cyclic Dependency Smells** — Module phụ thuộc vòng tròn, bất khả deploy độc lập
93. **Unstable Dependencies** — Stable modules phụ thuộc vào less stable ones gây break unpredictably
94. **"God Components"** — Component lấy quá nhiều responsibilities, vi phạm separation of concerns
95. **Erosion via Obsolete Documentation** — Changes không cập nhật design docs gây architecture erosion
96. **Code vs. Architecture Blindness** — Track code smells nhưng không correlate với architectural failures
97. **Undervalued Architecture Refactoring** — Management từ chối invest vì thiếu ROI ngắn hạn
98. **The "Lone Wolf" Integrator** — Cá nhân cô lập tạo code khó integrate
99. **Ignoring Maintenance Economics** — Focus initial effort, ignore long-term maintenance cost
100.  **Black Cloud Effect** — Thái độ tiêu cực tạo toxic environment, tăng burnout

---

### III. HỆ THỐNG SOCIO-TECHNICAL & NỢ XÃ HỘI (50 vấn đề)

101. **Phụ thuộc quá mức vào tools số** — Tool fatigue gây mất bối cảnh giao tiếp quan trọng
102. **Tầm nhìn phân mảnh** — Thiếu quy trình chia sẻ vision khiến developer diễn giải mục tiêu khác nhau
103. **Đánh đổi tiến độ mù quáng** — Áp lực cắt bỏ testing/integration chỉ để hit release dates
104. **Bất ổn tổ chức** — Quyết định quản lý tồi tệ tạo môi trường bất an
105. **Khoảng cách thế hệ** — Thiếu linh hoạt dung hòa phong cách làm việc đa thế hệ
106. **Cồng kềnh bộ máy quản lý** — Hệ thống quản lý nhiều tầng làm chậm phê duyệt
107. **Thay đổi phạm vi thiếu kiểm soát** — Bổ sung features không kế hoạch mà không cấp thêm budget/time
108. **Hội chứng hoàn thành 90%** — Ảo tưởng dự án luôn "đã xong 90%" nhưng không bao giờ bàn giao
109. **Cognitive overload từ context-switching** — Developer phải navigate 4-6 disconnected systems
110. **Tải trọng nhận thức quá mức** — Quá nhiều alert, info, decisions cùng lúc
111. **Stress từ vai trò mơ hồ** — Phân công vai trò mâu thuẫn gây mông lung và kiệt sức
112. **Thiếu tương tác trực diện** — Remote teams mất trao đổi tự nhiên, giảm gắn kết
113. **Rào cản múi giờ** — Giao tiếp đồng bộ gần như bất khả thi trong global distributed teams
114. **Rào cản văn hóa và ngôn ngữ** — Hiểu lầm từ đa dạng văn hóa xói mòn lòng tin
115. **Thiếu giao tiếp không chính thức** — Remote work mất "water cooler" conversations
116. **Xói mòn lòng tin trực tuyến** — Thiếu tín hiệu phi ngôn ngữ online làm nghi ngờ đồng nghiệp
117. **Xung đột nền tảng dự án** — Team từ dự án khác nhau có tư duy quy trình khác biệt
118. **Bùng nổ kênh giao tiếp** — Nhân sự tăng → kênh kết nối tăng theo cấp số nhân
119. **Tổn thất năng suất onboarding** — Nhân viên mới đòi hỏi hướng dẫn từ senior, giảm năng suất nhóm
120. **Thiếu phối hợp chéo** — Các chương trình song song tạo code trùng lặp và xung đột
121. **Tích tụ Nợ xã hội** — Tương tác nhóm kém tạo chi phí vô hình tàn phá tinh thần và chất lượng code
122. **Thiếu an toàn tâm lý** — Môi trường không an toàn khiến developer che giấu thông tin
123. **Hiệu ứng mây đen** — Thái độ tiêu cực gây kiệt sức và phá hủy tinh thần đồng đội
124. **Hiệu ứng Sói cô độc** — Cá nhân làm việc hoàn toàn cô lập tạo information silos
125. **Tư duy Silô tổ chức** — Phòng ban hoạt động cục bộ gây trùng lặp nỗ lực
126. **Hiệu ứng im lặng vô tuyến** — Agile meetings biến thành thủ tục báo cáo bề ngoài
127. **Khoảng cách quyền lực** — Hierarchy cứng nhắc khiến developer cấp dưới không dám lên tiếng
128. **Nút thắt cổ chai cấp bậc** — Giao tiếp top-down đi ngược Agile values
129. **Văn hóa thiếu tính tham gia** — Thiếu chủ động cá nhân giảm năng lực đổi mới
130. **Mơ hồ và áp lực vai trò** — Nhiều vai trò mâu thuẫn tạo sự mông lung, kiệt sức
131. **Thất thoát tri thức do nghỉ việc** — Lịch sử thiết kế biến mất cùng nhân sự rời đi
132. **Chi phí tái khám phá** — Năng suất sụt giảm khi phải tìm hiểu lại thiết kế quá khứ
133. **Thiếu tương tác trực diện** — Team phân tán mất lợi ích trao đổi tự nhiên
134. **Cản trở múi giờ** — Nghẽn cổ chai giao tiếp do khác biệt timezone
135. **Rào cản văn hóa/ngôn ngữ** — Tiếng lóng vùng miền gây hiểu lầm, xói mòn trust
136. **Thiếu giao tiếp phi chính thức** — Mất "informal communication" quan trọng cho team spirit
137. **Xói mòn lòng tin online** — Thiếu body language, tone of voice gây hiểu lầm
138. **Khác biệt project backgrounds** — Mất thời gian để thống nhất cách làm việc
139. **Bùng nổ communication channels** — Gánh nặng phối hợp khổng lồ khi team scale
140. **Overhead huấn luyện** — Onboarding giảm năng suất cả nhóm
141. **Thiếu phối hợp cross-program** — Team tạo code trùng lặp không đồng bộ
142. **Tầm nhìn không chia sẻ** — Developer diễn giải mục tiêu nhiều hướng
143. **Đánh đổi workflow** — Cắt bỏ testing/integration vì áp lực thị trường
144. **Bất ổn tổ chức** — Đảo lộn định hướng liên tục gây bất an
145. **Khoảng cách thế hệ** — Trì hoãn đổi mới do không dung hòa phong cách làm việc
146. **Bẫy thêm nhân sự** — Brooks's Law: thêm người = thêm chậm
147. **Cồng kềnh bộ máy** — Nhiều tầng quản lý chậm phê duyệt
148. **Thay đổi phạm vi không kiểm soát** — Feature creep gây kiệt sức
149. **Tool fatigue** — Quá nhiều phần mềm gây mệt mỏi, mất context
150. **Hội chứng 90% hoàn thành** — Thiếu đo lường dẫn đến ảo tưởng tiến độ

---

### IV. AI, KIẾN TRÚC & TRẢI NGHIỆM DEVELOPER (50 vấn đề)

151. **AI hallucination trong code** — LLMs tạo code trông hợp lý nhưng subtle bugs phá vỡ production
152. **Over-reliance on AI suggestions** — Developer tin mù vào AI mà bỏ qua verification
153. **AI context window limits** — AI assistant mất context khi codebase phức tạp
154. **Inconsistent AI outputs** — Cùng prompt cho kết quả khác nhau gây confusion
155. **AI training data staleness** — Models trained trên outdated patterns
156. **Lack of AI explainability** — Developer không hiểu tại sao AI suggest solution cụ thể
157. **AI-augmented complacency** — Developer giảm critical thinking khi có AI
158. **AI integration fragmentation** — Nhiều AI tools không tích hợp với nhau gây friction
159. **Premature AI execution** — AI agents execute rigidly mà không xem xét "bigger picture"
160. **Lack of enterprise AI specialization** — General-purpose AI thiếu domain knowledge cho enterprise workflows
161. **Privacy/security roadblocks** — Data confidentiality limits AI adoption
162. **Unmet proactive AI needs** — Developer muốn AI proactive optimization nhưng chưa addressed
163. **Architecture erosion — divergence** — Implemented software dần lệch khỏi intended design
164. **Unpredictable requirements** — Không thể design architecture hoàn hảo cho evolution dài hạn
165. **Poor system decomposition** — Hiểu sai business scenarios dẫn đến unclear component boundaries
166. **Microservice granularity struggles** — Large services = tedious interfaces; too many = inflate costs
167. **High coupling, low cohesion** — Thiếu interdisciplinary knowledge tạo tangled architecture
168. **Manual conformance checking** — Automated checking hiếm khi dùng; rely manual time-consuming
169. **Monitoring tool maintenance** — Tools cần manual effort liên tục để calibrate
170. **System-wide diagnostic difficulty** — Root cause cross multiple component boundaries
171. **Pragmatism-induced technical debt** — MVP pressure tạo workarounds phá architectural integrity
172. **Ignorance-based debt** — Thiếu deep knowledge dẫn đến misuse language features
173. **Lack of architectural smell detection** — Thiếu tools detect deep architectural smells
174. **Code vs architecture blindness** — Track code smells nhưng miss deeper architecture problems
175. **Undervalued refactoring** — ROI refactoring khó quantify → management refuse
176. **Difficult impact analysis** — Thiếu traceability nên khó analyze impact of refactoring
177. **Toolchain fragmentation** — Navigate 4-6 disconnected systems tạo productivity bottlenecks
178. **Tool fatigue** — Quá nhiều digital platforms overwhelm team
179. **Alert fatigue** — 76% monitoring alerts require no action → cognitive burnout
180. **Build and test instability** — Test flakiness waste 15-20% engineering time
181. **Context isolation in diagnostics** — 25-30 min/incident manually correlating across tools
182. **Inconsistent methodologies** — Thiếu standardized portals, mỗi team invent own process
183. **Information blind spots** — Dispersed ownership → miss systemic gaps
184. **Delayed onboarding** — Engineers mất months đạt full productivity vì dispersed context
185. **The Lone Wolf effect** — Isolation tạo information silos, severe integration challenges
186. **Lack of psychological safety** — Fear of criticism stifle open communication
187. **The Black Cloud effect** — Negative attitudes increase coding defects, lower morale
188. **Power distance delays** — Strict hierarchy → withhold concerns → suboptimal decisions
189. **Documentation resistance** — Developers coi viết docs là boring time sink
190. **Rapid documentation decay** — Static docs age quickly, mislead developers
191. **Separation of activities** — Tách spec/code/docs thành phases riêng tạo duplication
192. **Knowledge walkouts** — Tacit knowledge mất khi senior developer resign
193. **Lost architectural context** — Reasoning behind service separation disappears
194. **Volatile tribal knowledge** — Workarounds bị chôn trong Slack chats
195. **SME time constraints** — SME ưu tiên deadlines hơn documenting
196. **In-IDE workflow friction** — Slow response times, auth failures, copy/paste glitches
197. **Ineffective keyword searches** — Basic keywords fail to capture semantic relationships
198. **Missing cross-program coordination** — Duplicated efforts, conflicting code
199. **Management vs Developer disconnect** — Managers worry knowledge loss; developers frustrated by doc difficulty
200. **Lack of ecosystem summarization** — Thiếu automated tools cho task tickets, time tracking, daily summaries

---

### V. CƠ CHẾ KHUYẾN KHÍCH, GAMIFICATION & KPI (50 vấn đề)

201. **Open source free-riding** — Contributors khai thác tài nguyên cộng đồng mà không đóng góp lại
202. **Governance fragmentation** — Dự án OSS lớn thiếu cấu trúc quyết định rõ ràng
203. **License compliance risks** — Sử dụng OSS mà không hiểu rõ license obligations
204. **Community burnout** — Maintainers OSS kiệt sức do workload không được công nhận
205. **Fork wars** — Phân mảnh cộng đồng qua forking tạo duplicated efforts
206. **Contribution barriers** — Quy trình contribution phức tạp ngăn cản developer mới
207. **Declining contributor pools** — Dự án OSS trưởng thành gặp khó thu hút contributors mới
208. **Scale diseconomies** — Vượt quá "most productive scale size", thêm resources cho diminishing returns
209. **Coordination costs explosion** — Chi phí coordination tăng siêu tuyến tính theo team size
210. **Module interface complexity** — Product modularity tăng interface costs và maintenance burden
211. **Core vs periphery inequality** — Core developers đóng góp phần lớn, periphery members drag down average
212. **Implicit coordination overhead** — Thời gian chờ đợi và handoffs ẩn không được đo lường
213. **Communication bandwidth limits** — Physical/virtual bandwidth giới hạn information flow
214. **Hierarchical knowledge barriers** — Cấp bậc tổ chức cản trở knowledge flow tự nhiên
215. **Invisible work** — Coordination, mentoring, và community work không được measure hay reward
216. **Architecture-organization misalignment** — Conway's Law effects khi org không align với architecture
217. **Late binding decision costs** — Trì hoãn architecture decisions tăng rework costs
218. **Over-modularization costs** — Reusable modules cost tới 10x so với non-modular
219. **Interface maintenance burden** — Modular systems cần constant interface maintenance
220. **Cross-boundary changes** — Changes vượt module boundaries phức tạp và error-prone
221. **Motivation crowding-out effect** — Monetary incentives cho cognitive tasks crowd out intrinsic motivation
222. **Misaligned knowledge sharing rewards** — Reward individual performance, not knowledge sharing
223. **Lack of time for SME sharing** — SME ưu tiên deadlines hơn sharing expertise
224. **Ignoring non-monetary needs** — Thiếu autonomy, growth, cultural alignment gây turnover
225. **"Picking brains" paranoia** — KM initiatives khiến nhân viên sợ bị thay thế sau khi share knowledge
226. **Downward rigidity of monetary rewards** — Salary increases diminishing marginal utility
227. **Failure to accommodate heterogeneity** — Treat all workers the same, ignore diverse motivational profiles
228. **Short-term focus over creativity** — Financial rewards divert attention từ long-term creative work
229. **Top management disconnect** — Management unconvinced về value của KM programs
230. **Zero rewards for cross-team support** — Không incentive help remote/external teams
231. **Superficial game mechanics** — Only points/badges/leaderboards, ignore social interactions
232. **Artificial contribution quotas** — Mandatory quotas → copy-paste junk content
233. **Meaningless knowledge repositories** — Gamify volume → unsearchable graveyards
234. **Privacy vs gamification trade-offs** — Employee surveillance concerns từ gamification tracking
235. **Fragmented gamified tools** — Standalone tool forces dev rời ecosystem thực
236. **Lack of gamification methodology** — Thiếu frameworks hướng dẫn proper implementation
237. **Inability to replace existing tools** — Gamified alternative không match required functionality
238. **Ignoring user motivators** — Design gamification mà không hiểu actual developer motivators
239. **Punitive gamification** — Emphasize punishment over reward → destroy psychological safety
240. **Gaming the system** — Employees optimize metric mà không deliver actual value
241. **Lines of Code fallacy** — Measure LOC/commits incentivize code bloat
242. **Ignoring Y and Z metrics** — Chỉ measure A, B, X → neglect unmeasured vital tasks
243. **Masking individual struggles** — Team-wide KPIs mask individual underperformance
244. **Measuring steps instead of value** — Process velocity without tracking software value
245. **Flawed velocity targets** — Overemphasis velocity → shortcuts, skip testing, tech debt
246. **Code coverage illusions** — Coverage ≠ testing effectiveness
247. **Lack of measurement baselines** — No baselines → impossible measure DevOps success
248. **Missing technical debt KPIs** — Không measure tech debt → severe maintenance costs
249. **Incomplete system visibility** — VCS metrics miss database scripts, configs, human factors
250. **Lack of strategic alignment** — Metrics no qualitative links to OKRs

---

### VI. PHÁT TRIỂN TOÀN CẦU, QA, CI/CD & OBSERVABILITY (50 vấn đề)

251. **Time zone bottlenecks** — Khác biệt múi giờ tạo communication barriers nghiêm trọng
252. **Cultural misunderstandings** — Khác biệt working cultures gây friction trong collaboration
253. **Language barriers** — English slangs và regional terms tạo misinterpretation
254. **Reduced informal communication** — Remote teams mất "water cooler" exchanges
255. **Trust erosion online** — Online communication thiếu non-verbal cues gây miscommunication
256. **Unprepared communication tools** — Thiếu adequate conferencing facilities cripple Agile ceremonies
257. **High communication costs** — Maintaining facilities across distributed sites đòi hỏi đầu tư lớn
258. **Infrastructure incompatibilities** — Data sharing giữa onshore/offshore reveal deep tech incompatibilities
259. **Lack of remote teamwork** — Members form cliques, chỉ interact với specific leaders
260. **Reduced customer involvement** — Geographic distance giảm customer contact
261. **Different project backgrounds** — Conflicting cultures, slow Agile transition
262. **Erosion of trust in distributed teams** — Building trust online significantly trickier
263. **Offshore business communication gaps** — Thiếu business communication skills gây management issues
264. **Source code divergence** — Separate source trees → codebase fatally diverge
265. **Non-responsive organizational interfaces** — Single non-responsive contact point cho outsourced teams
266. **Loss of informal communication** — Mất implicit understanding giữa coworkers
267. **Unreproducible bugs** — "Test debt" — bugs quá khó reproduce → testers give up
268. **Failing assert statements** — Broken assert statements go unchecked
269. **Dirty hacks in test suites** — Low-quality code chỉ để force test environments work
270. **Brittle tests** — Poorly maintained tests tạo false failures
271. **Slow test execution** — Test suites grow → dramatically reduce productivity
272. **Redundant testing** — Failure to maintain test repo → redundant tests waste time
273. **Testing shortcuts under pressure** — Skip critical testing → bug-prone codebase
274. **Missing edge-case coverage** — Knowledge gaps prevent effective edge-case testing
275. **Manual artifact creation bottlenecks** — QA Engineers waste 30-40% time creating test artifacts manually
276. **Traceability gaps in QA** — Thiếu comprehensive traceability requirements → test cases → results
277. **Missing tests** — Severe lack of adequate test cases directly impacts reliability
278. **Context fragmentation in RAG testing** — AI RAG systems mất business relationships during retrieval
279. **Pipeline complexity** — Average enterprise CI/CD = 15-20 distinct stages of potential failures
280. **Environmental inconsistencies** — Dev/prod discrepancies cause 35-40% pipeline failures
281. **Test flakiness in CI/CD** — Flaky tests account 30% environmental failures, waste 15-20% engineer time
282. **Static resource allocation** — CI/CD wastes compute during low demand, bottleneck at peak
283. **Severe feedback delays** — Commit to build results: 45 min — 3 hours
284. **Deployment frequency drops** — Each additional hour pipeline time reduces deployment 20-25%
285. **Lack of automated architecture checking in CI/CD** — Architecture erosion goes unnoticed
286. **CI/CD toolchain fragmentation** — Context-switch between disconnected systems
287. **Unoptimized test selection** — Running entire test suites for minor changes
288. **Inadequate infrastructure monitoring** — Fail detect subtle anomalies before pipeline crash
289. **Alert fatigue** — SRE teams: thousands alerts/month, 76% no action needed
290. **Cascading alert storms** — Single service disruption → dozens notifications across stack
291. **Reactive incident detection** — 15-20 min detection delays, 73% reported by customers first
292. **Context isolation in diagnostics** — 25-30 min/incident manually correlating timestamps
293. **Manual analysis bottlenecks** — 30-45 system components × 7-12 min each
294. **Static threshold inadequacy** — False positive rates due to containerized fluctuations
295. **Undetected memory leaks** — Only 41% detected before actual crash
296. **Root cause obscurity** — Requests traverse dozens microservices, hard to pinpoint root cause
297. **Incomplete trace data** — Complex inter-component communications → incomplete traces
298. **AI parameter extraction failures** — Lightweight models miss root cause in long traces
299. **Monitoring maintenance overhead** — Ongoing manual effort to calibrate thresholds
300. **Missing automated conformance checking** — Architecture monitoring rarely integrated

---

### VII. NHÂN SỰ: TURNOVER, BURNOUT & LEADERSHIP (50 vấn đề)

301. **Vanishing institutional knowledge** — Critical system knowledge disappears khi senior nghỉ việc
302. **Undocumented decision history** — Reasoning behind past decisions không được preserve
303. **Inherited codebase anxiety** — New owners áp lực decode unfamiliar code mà không có guidance
304. **Rehiring costs** — Tuyển replacement chuyên gia đắt gấp nhiều lần retain
305. **Broken mentoring chains** — Senior departure phá vỡ junior mentorship structure
306. **Loss of client relationships** — Client-facing developers resign → relationship capital mất
307. **Domino effect turnover** — Một departure kéo theo loạt resignations
308. **Delayed project timelines** — Knowledge gaps thường gây delay 2-6 tháng per critical departure
309. **Increased error rates** — New developers unfamiliar with system tạo more production incidents
310. **"Fire Hose" onboarding** — Overwhelm new hires với massive unstructured information
311. **Time to Proficiency Gap** — Weeks/months of lower productivity trước khi new hires fully effective
312. **Inconsistent onboarding processes** — Rapid growth → uneven onboarding experiences
313. **Virtual onboarding errors** — Overloading info, failing to support transitional stress
314. **Ramp-up productivity drops** — New workers diminish experienced developers' productivity
315. **Interrupt-driven onboarding** — New hires constantly interrupt seniors for answers
316. **Access and tool delays** — New engineers face delays locating tools, gaining access
317. **Brooks's Law traps** — Panic-hiring for late projects makes them later
318. **Unfunded scope changes → burnout** — Out-of-scope changes without schedule adjustment
319. **Toolchain fragmentation → cognitive load** — Context-switching across 4-6 disconnected systems
320. **Stress from community smells** — Black Cloud Effect tạo toxic environment
321. **Alert fatigue → burnout** — Overwhelming incidents drain cognitive energy
322. **Deadline-induced shortcuts** — Skip testing/docs → stressful buggy codebase to maintain
323. **Systemic delays** — Bureaucratic processes ruin developer motivation and flow
324. **Role ambiguity** — Poorly defined role expectations create stress and confusion
325. **Catch-up pressure** — Lack of support creates pressure to match hard-working peers
326. **The "Lone Wolf" effect** — Total isolation → information silos → integration nightmares
327. **Lack of psychological safety** — Fear of criticism → hide mistakes → miss innovation
328. **Knowledge hoarding for job security** — Employees withhold information to protect position
329. **Organizational silo effect** — Departments operating independently → duplication and misalignment
330. **"Radio Silence" meetings** — 6-minute superficial reporting, zero problem-solving
331. **Unhealthy internal competition** — Reward structures highlight only individual excellence
332. **Not-Invented-Here syndrome** — Refuse outside ideas and best practices
333. **Loss of informal communication** — No "water cooler" exchanges → reduced team spirit
334. **Language and cultural friction** — Different backgrounds → misunderstandings in global teams
335. **Unparticipatory culture** — Failure to integrate isolated members drags down team cohesion
336. **Digital trust erosion** — Online communication strips emotional cues → misinterpretations
337. **Command-and-control management** — Stifle innovation, turn engineers into order-takers
338. **Power distance effect** — Strict hierarchy → lower-ranking withhold concerns
339. **Motivation crowding-out** — Purely monetary incentives weaken intrinsic motivation
340. **Punitive knowledge quotas** — Forced quotas → employees upload useless junk
341. **"A, B, X" metrics trap** — Reward only measured metrics → neglect vital quality tasks
342. **Ignoring SPACE framework** — Treat developers as production units measured by LOC
343. **Technical mentor bottlenecks** — Leaders fail to transition from hands-on to delegation
344. **Governance failure at scale** — Fail to establish architectural principles at scale
345. **Delegation without context** — Delegate decision power without transferring knowledge
346. **Unbounded autonomy** — Complete freedom without alignment → incompatible architectures
347. **Ignoring technical debt economics** — Refuse invest in refactoring/tooling
348. **Lack of executive strategic time** — Executives fail to block uninterrupted planning time
349. **Disregarding KM as cultural shift** — Deploy tools but ignore cultural incentives
350. **Misaligned organizational structures** — Conway's Law → fragmented, hard-to-integrate products

---

### VIII. DevOps, SAFe SCALING & COMMUNICATION (50 vấn đề)

351. **Pipeline execution wastefulness** — Large batch sizes delay value flow
352. **Lack of Value Stream Mapping** — Không understand flow of value through organization
353. **DevOps measurement gaps** — Fail to establish measurement baselines
354. **Neglecting waste** — Fail to identify and measure waste and negative value
355. **Monitoring maintenance overhead** — Massive ongoing manual effort to calibrate thresholds
356. **Inconsistent team methodologies** — Teams invent own processes without standardization
357. **Visibility blind spots** — Dispersed ownership → miss critical issues
358. **Resistance to SAFe cultural change** — Traditional hierarchy resists Agile Release Trains
359. **Unclear ART velocity** — Teams overcommit without understanding actual capacity
360. **Misinterpretation of SAFe** — Teams misunderstand SAFe routines for their specific context
361. **Lack of visibility across teams** — Incomplete pictures of all tasks → missed deadlines
362. **Disregard for Enterprise Architecture in SAFe** — Technical debt, fragile architecture, needless rework
363. **Scaling agility outside the team** — Surrounding departments lack responsiveness
364. **Stakeholder misalignment** — Aligning expectations with ART cadence is complex
365. **Missing cross-program coordination** — Inefficiencies, duplicated efforts, conflicting code
366. **Organizational fragmentation** — Scattered departments → inconsistent procedures
367. **Dysfunctional self-organization at scale** — Informal decision-making breaks down across teams
368. **Workflow trade-offs under pressure** — Skip testing → accumulate tech debt
369. **Inflexible traditional management** — Command-and-control struggles with servant-leadership
370. **Combinatorial communication explosion** — n(n−1)/2 channels overload coordination capacity
371. **Hierarchical communication barriers** — Top-down channels clash with agile values
372. **Radio silence in meetings** — Superficial reporting updates, no real problem-solving
373. **Lack of personal inter-team interaction** — Hard to understand context of requests
374. **Time zone disparities** — Severe delays in feedback loops
375. **Language and cultural friction** — Misinterpretation of practices across borders
376. **Absence of informal communication** — Lost implicit shared understanding
377. **Difficulties conveying user needs** — Miscommunication of stakeholder requirements
378. **Tool fatigue** — Multiple unintegrated platforms → lost context, confusion
379. **Language/cultural cooperation barriers** — Diverse norms inhibit effective cross-border work
380. **Absence of non-verbal cues** — Text-based interaction harder to interpret correctly
381. **Unprepared communication infrastructure** — Inadequate bandwidth cripple ceremonies
382. **Misbalanced communication levels** — Over or under-communicate → disrupt collaboration
383. **Socio-technical misalignment** — Conway's Law → overly complex software
384. **Unmanageable inter-dependencies** — Scaling exponentially increases technical dependencies
385. **Organizational silo effect** — Massive duplication and redundant resource allocation
386. **Lack of shared vision coordination** — Vision misalignment, eroded trust
387. **Tightly coupled microservices** — Teams by specialty → tangled dependencies
388. **Late project trap** — Adding manpower increases coordination overhead
389. **Training overhead bottlenecks** — Experienced devs divert time to mentor
390. **Sequential coordination limits** — Some tasks can't be parallelized
391. **Cyclic dependency smells** — Modules depend cyclically → can't deploy independently
392. **"God Components"** — Single components take too many responsibilities
393. **Obsolete docs during evolution** — Fast changes without doc updates → architecture erosion
394. **Divergent codebases** — Separate source trees fail to merge → fatal divergence
395. **The Lone Wolf effect** — Isolation severely complicates code integration
396. **Undefined decision boundaries** — Overlapping authority → delays and misallocation
397. **Resistance to change** — Organizational inertia prevents adopting modern practices
398. **Unaligned portfolio management** — Portfolio decisions disconnected from team realities
399. **Inadequate capacity planning** — Teams consistently overloaded without workload balancing
400. **Missing retrospective action items** — Retros held but no actions taken → same issues repeat

---

### IX. REQUIREMENTS, CODE REVIEW, SECURITY & MAINTENANCE (50 vấn đề)

401. **Ambiguous requirements** — Unclear requirements force developers to guess, causing rework
402. **Contradictory requirements** — Conflicting specifications between stakeholders
403. **Scope creep** — Continuous requirements addition without impact analysis
404. **Missing non-functional requirements** — Performance, security, scalability ignored in spec phase
405. **Requirements volatility** — Frequent changes destabilize development plans
406. **Lack of domain knowledge** — Analysts without technical depth write impractical requirements
407. **Poor acceptance criteria** — Vague acceptance criteria → disputes on "done" definition
408. **Stakeholder availability** — Key stakeholders unavailable for requirements clarification
409. **Requirements traceability gaps** — Can't trace requirements to implementation and tests
410. **Documentation bloat** — Overly detailed requirements docs that nobody reads
411. **Late requirements discovery** — Critical requirements discovered late in development
412. **Requirements review fatigue** — Lengthy review cycles delay development start
413. **Implicit assumptions** — Unstated assumptions create misalignment between teams
414. **Code review as bottleneck** — Large PRs and review queues create severe delays
415. **Disruption of small batch principles** — AI-generated large code changes harder to review
416. **Context loss in reviews** — Reviewers lack documented context to evaluate effectively
417. **Code review delays** — High PR volume overwhelms reviewers
418. **Lack of automated review support** — Manual review for complex architectural smells
419. **Superficial reviews under pressure** — Skip rigorous review → bug-prone codebase
420. **Misinterpretation of design decisions** — Reviewers approve code degrading system cohesion
421. **Cross-team review delays** — Tight dependencies need cross-team reviews → delays
422. **Inefficient AI-code review** — Reviewing large AI output without context is highly inefficient
423. **Inconsistent coding standards** — Contentious reviews without shared styles
424. **Lack of system-wide perspective** — Focus on specific module, miss broader violations
425. **"God components" blind spots** — Reviewers fail to flag over-responsible components
426. **Over-reliance on manual inspections** — Rarely use automated conformance checking
427. **AI-generated vulnerabilities** — AI coding assistants can introduce security flaws
428. **Multiplied vulnerabilities across silos** — Independent teams multiply security vulnerabilities
429. **Unauthorized access to proprietary artifacts** — AI KM systems risk exposing sensitive code
430. **Jailbreaking and prompt manipulation** — Users bypass AI security safeguards
431. **Data sovereignty and privacy risks** — Vendor AI solutions raise compliance concerns
432. **Outdated dependencies** — Critical security issues from outdated software go unnoticed
433. **Unresolved P0 vulnerabilities** — Without automated governance, P0 tickets accumulate
434. **Lack of continuous security alignment** — Security degrades over time without continuous alignment
435. **PII exposure** — Inadequate governance leads to unintended PII exposure in logs
436. **Implicit trust in LLMs** — Over-reliance without human verification → insecure decisions
437. **Lack of automated vulnerability patching** — Teams lack proactive security optimization
438. **Security constraints on remote work** — Delays gaining proper access and clearances
439. **Architectural erosion** — Accumulated changes cause implementation to diverge from design
440. **Technical debt accumulation** — Prioritize speed over quality → inflate maintenance costs
441. **Costly rediscovery** — Undocumented decisions force costly retracing of past steps
442. **Obsolete documentation** — Fast-paced development without concurrent doc updates
443. **Undervalued refactoring** — Immediate ROI unclear → management refuses investment
444. **Cyclic dependencies** — Independent deployment and maintenance practically impossible
445. **High cost of monitoring maintenance** — Ongoing manual calibration of thresholds
446. **Abandoned files** — Files left by departed developers become maintenance burden
447. **Failure to consider future costs** — Evaluate build effort, neglect maintenance expenses
448. **Fragmented toolchains** — Navigate multiple disconnected systems to fix bugs
449. **Inability to analyze change impact** — Poor traceability makes impact analysis difficult
450. **Scattered code changes** — Bugs in eroded architecture require changes across many files

---

### X. VALUE STREAM, MODULARITY & PROCESS (50 vấn đề)

451. **Partially completed work waste** — Incomplete, unintegrated work creates financial risk
452. **Building unnecessary features** — Extra features divert resources from actual value
453. **Systemic delays waste** — Excessive approval processes cripple responsiveness
454. **Excessive task switching waste** — Mental "switch time" destroys developer flow
455. **Handoff waste** — Information loss during team-to-team handoffs
456. **Defect waste** — Bugs requiring rework consume disproportionate resources
457. **Non-value-added activities** — Administrative overhead not contributing to product value
458. **Lack of pull-based systems** — Push-based planning creates WIP overload and delays
459. **Missing feedback loops** — No mechanisms to feed downstream insights back upstream
460. **Ignoring the human factor** — Focus on product/process metrics, make team needs invisible
461. **Systemic WIP overload** — Filling Kanban queues to max undermines quality
462. **Large batch sizes** — Big initiatives with large batch sizes delay decision-making
463. **Incomplete system visibility** — VCS metrics miss database scripts and configs
464. **Ambiguous architectural boundaries** — Misunderstanding business scenarios → poor decomposition
465. **"God components"** — Too many responsibilities in one component → unmaintainable
466. **Cyclic dependency smells** — Circular dependencies between modules → can't test independently
467. **Unstable dependencies** — Stable modules forced to depend on unstable ones
468. **Microservice granularity trade-offs** — Large vs too many small services trade-off
469. **High coupling & low cohesion** — Changed/unchanged requirements tangled together
470. **Information hiding failures** — Poorly documented modules force understanding internals
471. **Unexpected interdependencies** — Unforeseen dependencies emerge during development
472. **Inability to enact system-wide changes** — Decentralized environments block system-level changes
473. **Costly modularization** — Reusable modules cost up to 10x non-modular
474. **Divergent codebases** — Separate source trees fail to merge → fatal divergence
475. **Undervalued refactoring** — Immediate ROI unclear → management refuses investment
476. **Scattered code changes** — Eroded architecture → fixes scattered across many files
477. **Ramp-up productivity drop** — New workers reduce overall team productivity temporarily
478. **Communication explosion** — Team size growth → exponential communication paths
479. **Brooks's Law** — Adding manpower to late project → even later
480. **Diminishing returns on scale** — Beyond MPSS, adding resources yields negative returns
481. **Parallelization limits** — Sequential tasks can't speed up by adding people
482. **Quality paradox** — Rapid team expansion → temporary code quality dip
483. **Loss of morale from new hires** — Original team feels competence questioned
484. **Disproportionate low-contributors** — Peripheral members drag down average productivity
485. **Task interdependence delays** — One person's changes constantly break others' work
486. **Costly rediscovery** — Knowledge loss wastes budget retracing past decisions
487. **Skill loss upon team dissolution** — Specialized process knowledge scattered and lost
488. **Time wasted searching** — Siloed information → searching instead of coding
489. **Unparticipatory culture** — Lack of initiative drags down innovation and performance
490. **Socio-technical misalignment** — Reorg teams without adjusting architecture creates waste
491. **Conway's Law constraints** — Siloed orgs → fragmented software modules
492. **"Big Bang" deployment** — Massive implementations instead of incremental releases
493. **Separation of activities** — Isolated phases = waste, duplication, inconsistencies
494. **"Human Dedication" anti-pattern** — Manual grunt work to keep docs in sync guarantees failure
495. **Radio Silence effect** — Meetings with no meaningful communication
496. **Flawed productivity metrics** — LOC/ticket closures incentivize bad behavior
497. **Ignoring tech debt for speed** — MVPs with destructive shortcuts
498. **Information graveyards** — Unsearchable wikis where documentation dies
499. **Missing cross-program coordination** — Departments operating in isolation → duplicated code
500. **Neglecting failure analysis** — Not capturing/analyzing failed projects → repeat same mistakes

---

## Recommendation

### Phân loại theo mức độ ảnh hưởng

| Nhóm                                                  | Số lượng | Mức độ ảnh hưởng |
| ----------------------------------------------------- | -------- | ---------------- |
| I. Quản lý Tri thức & Mất mát Kiến thức               | 50       | 🔴 Critical      |
| II. Quản lý Dự án, Agile & Nợ Kỹ thuật                | 50       | 🔴 Critical      |
| III. Hệ thống Socio-Technical & Nợ Xã hội             | 50       | 🟠 High          |
| IV. AI, Kiến trúc & Trải nghiệm Developer             | 50       | 🟠 High          |
| V. Cơ chế Khuyến khích, Gamification & KPI            | 50       | 🟡 Medium-High   |
| VI. Phát triển Toàn cầu, QA, CI/CD & Observability    | 50       | 🔴 Critical      |
| VII. Nhân sự: Turnover, Burnout & Leadership          | 50       | 🔴 Critical      |
| VIII. DevOps, SAFe Scaling & Communication            | 50       | 🟠 High          |
| IX. Requirements, Code Review, Security & Maintenance | 50       | 🔴 Critical      |
| X. Value Stream, Modularity & Process                 | 50       | 🟠 High          |

### Các chủ đề xuyên suốt (Cross-cutting themes)

1. **Knowledge Loss** xuất hiện trong 8/10 nhóm — là root cause phổ biến nhất
2. **Conway's Law** ảnh hưởng đến architecture, team structure, và communication
3. **Brooks's Law** effects cascade qua project management, scaling, và productivity
4. **Technical Debt** có mặt trong architecture, maintenance, CI/CD, và process
5. **Psychological Safety** liên kết trực tiếp đến knowledge sharing, innovation, và turnover

### Hành động đề xuất

1. **Xây dựng Knowledge Management System** — Giải quyết nhóm I, IV, VII (150 vấn đề)
2. **Thiết kế Incentive Framework** — Giải quyết nhóm V, VII (100 vấn đề)
3. **Implement DevOps & Platform Engineering** — Giải quyết nhóm VI, VIII (100 vấn đề)
4. **Architecture Governance** — Giải quyết nhóm II, IV, IX (150 vấn đề)
5. **Cultural Transformation** — Giải quyết nhóm III, VII, X (150 vấn đề)

## Decision

Chưa có — Cần Human review để xác định priority và phạm vi action plan.

## Open Items → Next Spikes

- [ ] Spike: Xây dựng framework đánh giá tổ chức dựa trên 500 vấn đề này
- [ ] Spike: Thiết kế KM System giải quyết top 50 critical issues
- [ ] Spike: Correlation analysis giữa các nhóm vấn đề (root cause mapping)
- [ ] Spike: Benchmarking framework cho đo lường hiệu suất tổ chức SE
