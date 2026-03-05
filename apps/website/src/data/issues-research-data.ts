export interface ResearchIssue {
  id: string;
  name: string;
  desc: string;
}

export interface ResearchCategory {
  id: string;
  title: string;
  severityLevel: "Critical" | "High" | "Medium";
  colorToken: "rose" | "amber" | "teal" | "indigo" | "cyan";
  issueCount: number;
  description: string;
  topIssues: ResearchIssue[];
}

export const performanceIssuesResearch: ResearchCategory[] = [
  {
    id: "cat-knowledge",
    title: "Mất mát Tri thức & Quản lý TT",
    severityLevel: "Critical",
    colorToken: "rose",
    issueCount: 50,
    description: "Nhóm nguyên nhân gốc rễ phổ biến nhất, khi 'Tacit knowledge' biến mất cùng nhân sự hoặc tài liệu lỗi thời.",
    topIssues: [
      { id: "iss-1", name: "Knowledge walkouts", desc: "Tri thức ngầm rời công ty khi developer kỳ cựu nghỉ việc." },
      { id: "iss-5", name: "Time to Proficiency gaps", desc: "Nhân viên mới mất rất lâu để đạt năng suất do thiếu tài liệu." },
      { id: "iss-8", name: "Documentation resistance", desc: "Văn hóa từ chối viết tài liệu vì cho rằng khó hoặc tốn thời gian." },
      { id: "iss-16", name: "Reinventing the wheel", desc: "Team không học từ dự án cũ, liên tục duplicate code." }
    ]
  },
  {
    id: "cat-agile-pm",
    title: "Quản lý Dự án & Nợ Kỹ thuật",
    severityLevel: "Critical",
    colorToken: "rose",
    issueCount: 50,
    description: "Các thất bại trong Agile và PM, thường liên quan đến định luật Brooks và phớt lờ kiến trúc dài hạn.",
    topIssues: [
      { id: "iss-51", name: "Brooks's Law Trap", desc: "Thêm nhân lực vào dự án trễ hạn chỉ làm nó chậm hơn do overhead giao tiếp." },
      { id: "iss-61", name: "Superficial Stand-ups", desc: "Daily meeting biến thành thủ tục báo cáo, không giải quyết vấn đề." },
      { id: "iss-72", name: "Over-reliance on Velocity", desc: "Đo lường bằng story points khuyến khích hành vi 'coding shortcut'." },
      { id: "iss-90", name: "Pragmatism Debt", desc: "Áp lực MVP tạo ra tech debt tàn phá tuổi thọ dự án." }
    ]
  },
  {
    id: "cat-socio-tech",
    title: "Socio-Technical & Nợ Xã hội",
    severityLevel: "High",
    colorToken: "amber",
    issueCount: 50,
    description: "Mối quan hệ phức tạp giữa cấu trúc tổ chức con người và kiến trúc phần mềm, dẫn tới đứt gãy tương tác.",
    topIssues: [
      { id: "iss-118", name: "Bùng nổ Kênh giao tiếp", desc: "Team size tăng → Số kênh giao tiếp tăng n(n-1)/2." },
      { id: "iss-119", name: "Conway's Law Violations", desc: "Cấu trúc tổ chức Silo tạo ra kiến trúc phần mềm phân mảnh." },
      { id: "iss-121", name: "Thiếu An toàn Tâm lý", desc: "Developer sợ bị trừng phạt nên che giấu lỗi lầm." }
    ]
  },
  {
    id: "cat-ai-arch",
    title: "AI, Kiến trúc & DX",
    severityLevel: "High",
    colorToken: "amber",
    issueCount: 50,
    description: "Sự phân rã kiến trúc (Architecture Erosion) và những rủi ro ngầm từ việc áp dụng AI/Công cụ thiếu kiểm soát.",
    topIssues: [
      { id: "iss-151", name: "AI Hallucination Bugs", desc: "LLM tạo code trông có vẻ đúng nhưng phá vỡ logic hệ thống." },
      { id: "iss-163", name: "Architecture Divergence", desc: "Code implement thực tế dần mâu thuẫn hoàn toàn với Design ban đầu." },
      { id: "iss-177", name: "Tool Fatigue", desc: "Developer mệt mỏi vì phải nhảy qua lại giữa 4-6 công cụ rời rạc." }
    ]
  },
  {
    id: "cat-cicd-qa",
    title: "QA, CI/CD & Observability",
    severityLevel: "Critical",
    colorToken: "rose",
    issueCount: 50,
    description: "Tắc nghẽn trong khâu kiểm thử, triển khai và khả năng quan sát hệ thống (Monitoring blind spots).",
    topIssues: [
      { id: "iss-270", name: "Brittle & Flaky Tests", desc: "Các bài test dễ vỡ (flaky) làm lãng phí 20% thời gian của Engineer." },
      { id: "iss-283", name: "Severe Feedback Delays", desc: "CI pipeline chậm (hàng giờ) làm drop 25% tỷ lệ deployment." },
      { id: "iss-289", name: "Alert Fatigue", desc: "Hàng ngàn cảnh báo monitoring gửi đến nhưng 76% không cần action (noise)." }
    ]
  },
  {
    id: "cat-turnover",
    title: "Turnover, Burnout & Leadership",
    severityLevel: "Critical",
    colorToken: "rose",
    issueCount: 50,
    description: "Sự kiệt sức của nhân sự (Burnout), tình trạng nghỉ việc dây chuyền và lỗi trong văn hóa lãnh đạo.",
    topIssues: [
      { id: "iss-307", name: "Domino Turnover", desc: "Sự ra đi của Key member kéo theo hàng loạt DevOps/Developer khác." },
      { id: "iss-318", name: "Unfunded Scope Changes", desc: "Bắt làm thêm Scope nhưng không được tăng thời gian → Burnout." },
      { id: "iss-328", name: "Knowledge Hoarding", desc: "Giữ khư khư tri thức để bảo vệ vị trí (Job Security)." }
    ]
  },
  {
    id: "cat-devops-safe",
    title: "DevOps & SAFe Scaling",
    severityLevel: "High",
    colorToken: "amber",
    issueCount: 50,
    description: "Những khó khăn khi scale mô hình Agile/DevOps lên cấp độ Enterprise (hàng trăm kỹ sư).",
    topIssues: [
      { id: "iss-384", name: "Unmanageable Dependencies", desc: "Scaling làm tăng dependencies kỹ thuật và giao tiếp theo cấp số nhân." },
      { id: "iss-386", name: "Lack of Shared Vision", desc: "Mất đồng bộ tầm nhìn giữa các Agile Release Trains." }
    ]
  },
  {
    id: "cat-requirements",
    title: "Requirements, Code Review & Security",
    severityLevel: "Critical",
    colorToken: "rose",
    issueCount: 50,
    description: "Đóng nghẽn tại Review, hổng bảo mật và sai lệch nghiêm trọng từ Requirement.",
    topIssues: [
      { id: "iss-401", name: "Ambiguous Requirements", desc: "Yêu cầu mập mờ buộc Dev phải 'đoán', dẫn tới rework 100%." },
      { id: "iss-414", name: "Code Review Bottleneck", desc: "PR khổng lồ nằm chờ hàng tuần gây tắc nghẽn merge code." },
      { id: "iss-434", name: "Security Degradation", desc: "Hệ thống bảo mật suy thoái theo thời gian do thiếu Continuous Alignment." }
    ]
  },
  {
    id: "cat-value-stream",
    title: "Value Stream & Modularity",
    severityLevel: "High",
    colorToken: "amber",
    issueCount: 50,
    description: "Sự lãng phí (Waste) trong dòng chảy giá trị: Handoffs, chờ đợi, và phân mảnh module.",
    topIssues: [
      { id: "iss-451", name: "Partially Completed Work", desc: "Code viết xong nhưng không được integrate tạo rủi ro tài chính khổng lồ." },
      { id: "iss-455", name: "Handoff Waste", desc: "Sự gián đoạn luồng thông tin khi bàn giao từ Team này sang Team khác." }
    ]
  },
  {
    id: "cat-kpi",
    title: "Gamification & KPIs",
    severityLevel: "Medium",
    colorToken: "teal",
    issueCount: 50,
    description: "Đo lường sai mục tiêu (Metric traps) và tạo ra môi trường làm việc độc hại do KPIs cứng nhắc.",
    topIssues: [
      { id: "iss-241", name: "Lines of Code Fallacy", desc: "Đo lường bằng lượng code dẫn tới mã nguồn cồng kềnh (Code bloat)." },
      { id: "iss-246", name: "Code Coverage Illusions", desc: "100% coverage không đồng nghĩa với Testing Effectiveness." }
    ]
  }
];
