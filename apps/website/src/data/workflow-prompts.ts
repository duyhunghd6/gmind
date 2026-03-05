export interface WorkflowStep {
  id: string;
  title: string;
  role: "User" | "Agent" | "System" | "PMO / Architect" | "RTE" | "Dev Teams";
  description: string;
  input: string;
  output: string;
  loopGroup?: "Planning" | "Execution" | "None";
  promptText?: string;
  projectStateScenario?: string;
  loopCondition?: string;
  icon?: string;
  nextSteps?: { conditionLabel?: string; nextNodeId: string; isLoopBack?: boolean }[];
  guidanceContext?: string;
  exampleDetails?: string;
}

export interface AITrackingWorkflow {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export const aiWorkflows: AITrackingWorkflow[] = [
  {
    id: "wf-one-shot",
    title: "1. One-shot Coding",
    description: "Luồng cơ bản nhất: Người dùng yêu cầu toàn bộ trong một prompt, Agent trả về code hoàn chỉnh.",
    steps: [
      {
        id: "os-1",
        title: "Khởi tạo Yêu cầu (Prompt)",
        role: "User",
        description: "Người dùng mô tả rành rọt toàn bộ yêu cầu, bao gồm PRD, kiến trúc mạng, giao diện...",
        input: "Ý tưởng thô",
        output: "Prompt chi tiết",
        loopGroup: "None",
        projectStateScenario: "Tính năng nhỏ lẻ, viết script rời, fix 1 hàm đơn giản.",
        promptText: "Hãy xây dựng một ứng dụng web quản lý công việc (Todo App) bằng Next.js và Tailwind CSS. Yêu cầu tính năng:\n1. Thêm/Sửa/Xóa task.\n2. Lưu trữ tại LocalStorage.\n3. Giao diện Dark mode tối giản.\nTôi cần bạn trả về toàn bộ code các file cần thiết trong 1 lần duy nhất.",
        icon: "📝",
        nextSteps: [{ conditionLabel: "Gửi Prompt", nextNodeId: "os-2" }],
        guidanceContext: "Tại bước này, Agentic Workflow chỉ là zero-shot hoặc one-shot. Bạn cần định nghĩa cực kỳ rõ ràng Input/Output để LLM có thể làm đúng ngay từ lần đầu tiên. Context quá lớn sẽ dẫn đến Hallucination.",
        exampleDetails: "Ví dụ: Nếu yêu cầu viết Todo App, hãy định nghĩa luôn màu sắc, data structure (LocalStorage), thư viện UI (Tailwind)."
      },
      {
        id: "os-2",
        title: "Sinh Code & Tự QA",
        role: "Agent",
        description: "Agent tự động phân tích prompt, rã logic, code, và tự kiểm tra (QA) trước khi hoàn tất.",
        input: "Prompt chi tiết",
        output: "Mã nguồn hoàn chỉnh (Draft 1)",
        loopGroup: "None",
        icon: "⚙️",
        nextSteps: [{ conditionLabel: "Tạo xong Code", nextNodeId: "os-3" }],
        guidanceContext: "Agent có thể tự gọi các công cụ (Tools) như linter, type-checker ở background để đảm bảo mã nguồn trả về không bị lỗi cú pháp căn bản.",
        exampleDetails: "Hệ thống tự động sử dụng `tsc --noEmit` hoặc ESLint để validate trước khi đưa code cho người dùng."
      },
      {
        id: "os-3",
        title: "Hoàn thiện & Người dùng Khởi chạy",
        role: "User",
        description: "Người dùng copy code, chạy build kiểm tra.",
        input: "Mã nguồn (Draft 1)",
        output: "Ứng dụng chạy được",
        loopGroup: "None",
        icon: "🚀",
        guidanceContext: "Nếu code lỗi ở bước này, với One-shot coding, người dùng thường phải tự debug hoặc khởi tạo lại prompt mới từ đầu. Đây là hạn chế lớn nhất của One-shot.",
        exampleDetails: "Chạy `npm run dev` để kiểm tra kết quả cuối cùng."
      }
    ]
  },
  {
    id: "wf-vibe-coding",
    title: "2. Vibe Coding (Interactive)",
    description: "Code qua phản hồi tương tác (feedback loop). Agent viết nháp, người dùng đánh giá và tinh chỉnh liên tục.",
    steps: [
      {
        id: "vb-1",
        title: "Khởi tạo Ý tưởng (Prompt)",
        role: "User",
        description: "Mô tả sơ bộ về ý tưởng, không cần quá chi tiết.",
        input: "Khái niệm chung",
        output: "Prompt mở",
        loopGroup: "Planning",
        projectStateScenario: "Ứng dụng UI/UX cần tinh chỉnh thẩm mỹ liên tục, hoặc explore ý tưởng chưa rõ ràng.",
        promptText: "Tôi muốn làm một trang landing page cho ứng dụng học ngoại ngữ. Bạn có thể gợi ý cấu trúc và code thử phần Header đi kèm Hero Section được không?",
        icon: "💡",
        nextSteps: [{ conditionLabel: "Đưa ý tưởng", nextNodeId: "vb-2" }],
        guidanceContext: "Vibe coding tập trung vào việc thử nghiệm nhanh. Bạn không cần phải suy nghĩ quá sâu về logic hay kiến trúc rườm rà. Mục đích là để AI sinh ra một hình hài sơ khai, từ đó bạn có 'cảm giác' (vibe) để feedback.",
        exampleDetails: "Tập trung vào mô tả UI, màu sắc, cảm giác (nhẹ nhàng, năng động) thay vì cấu trúc database."
      },
      {
        id: "vb-2",
        title: "Phân tích PRDs & Lên kế hoạch (PLAN)",
        role: "Agent",
        description: "Phát thảo ý tưởng, lên Requirement ngắn gọn và kế hoạch triển khai.",
        input: "Prompt mở",
        output: "PRD nháp & Kế hoạch",
        loopGroup: "Planning",
        loopCondition: "Đồng ý Kế hoạch -> Chuyển sang Code",
        icon: "📝",
        nextSteps: [{ conditionLabel: "Duyệt Kế Hoạch", nextNodeId: "vb-3" }],
        guidanceContext: "AI sẽ chia nhỏ yêu cầu mờ nhạt của bạn thành các gạch đầu dòng có thể thực thi (actionable items). Ở bước này, bạn nên đọc lướt để xem AI có hiểu nhầm ý định của mình không.",
        exampleDetails: "Ví dụ: AI đề xuất Next.js, Framer Motion cho animation, Tailwind cho styling."
      },
      {
        id: "vb-3",
        title: "Rã việc (Tasks tracking) & Code nháp",
        role: "Agent",
        description: "Liệt kê các module cần làm, code thử bản Draft 1.",
        input: "Kế hoạch",
        output: "Mã nguồn (Draft 1)",
        loopGroup: "Execution",
        icon: "🔨",
        nextSteps: [{ conditionLabel: "Trải nghiệm UI", nextNodeId: "vb-4" }],
        guidanceContext: "Agent bắt đầu nhả ra hàng loạt file mã nguồn. Chú ý theo dõi quá trình này, nếu code đi chệch hướng, bạn có thể ngắt ngay lập tức để tiết kiệm token và thời gian.",
        exampleDetails: "Thấy AI bắt đầu cài đặt `passport.js` trong khi bạn chỉ cần UI? Hãy stop và sửa lại prompt."
      },
      {
        id: "vb-4",
        title: "Người dùng Vibe Check & Cập nhật",
        role: "User",
        description: "Người dùng xem kết quả, chỉnh sửa định hướng thiết kế.",
        input: "Trải nghiệm bản Draft 1",
        output: "Feedback tinh chỉnh",
        loopGroup: "Execution",
        promptText: "Màu sắc hiện tại hơi chói. Hãy đổi sang tone màu pastel nhẹ nhàng hơn (như xanh ngọc bích). Thêm một nút 'Học Thử Miễn Phí' to hơn ở giữa Hero Section.",
        icon: "👀",
        nextSteps: [{ conditionLabel: "Gửi Feedback", nextNodeId: "vb-5" }],
        guidanceContext: "Đây là cốt lõi của Vibe Coding. Bạn chạy thử, nhìn ngắm ứng dụng (vibe check) và phản hồi như thể đang nói chuyện với một Designer/Coder ngồi cạnh.",
        exampleDetails: "Hãy dùng các từ mô tả cảm xúc thẩm mỹ như: 'bo góc mềm hơn', 'tối lùi lại (dim) background', v.v."
      },
      {
        id: "vb-5",
        title: "Code lại & QA",
        role: "Agent",
        description: "Cập nhật mã nguồn theo feedback và kiểm tra lỗi.",
        input: "Feedback tinh chỉnh",
        output: "Mã nguồn (Draft N)",
        loopGroup: "Execution",
        loopCondition: "Chưa ưng ý -> Lặp lại Vibe Check",
        icon: "🔄",
        nextSteps: [
          { conditionLabel: "Chưa ưng -> Sửa tiếp", nextNodeId: "vb-4", isLoopBack: true },
        ],
        guidanceContext: "AI điều chỉnh chỉ những phần được yêu cầu. Đôi khi AI có thể làm vỡ component khác, hãy báo cho AI biết 'Nút A vừa bị mất sau khi cập nhật Header'.",
        exampleDetails: "Nếu vỡ layout quá nặng, bạn nên rollback lại commit trước đó thay vì cố bắt AI sửa tiếp lỗi của chính nó."
      }
    ]
  },
  {
    id: "wf-agentic-greenfield",
    title: "3. Agentic Coding (Greenfield)",
    description: "Phát triển dự án Mới hoàn toàn (Greenfield). Agent tự chủ định hướng kiến trúc từ đầu.",
    steps: [
      {
        id: "ag-1",
        title: "Giao phó Core Request",
        role: "User",
        description: "Đưa ra mục tiêu cốt lõi của dự án.",
        input: "Mục tiêu kinh doanh",
        output: "Core Request Prompt",
        loopGroup: "Planning",
        projectStateScenario: "Dự án mới tinh (Greenfield) từ con số 0, cần thiết lập kiến trúc chuẩn chỉnh và document đầy đủ.",
        promptText: "Hãy khởi tạo một dự án E-commerce Microservices bằng Golang. Sử dụng kiến trúc Clean Architecture. Dự toán cần có service: User, Product, Order. Viết PRD và Architecture Plan cho tôi trước khi code.",
        icon: "🎯",
        nextSteps: [{ conditionLabel: "Giao Task", nextNodeId: "ag-2" }],
        guidanceContext: "Bước cực kỳ quan trọng quyết định toàn bộ kiến trúc dự án. Trái với Vibe Coding, Agentic Coding đòi hỏi bạn phải tư duy hệ thống ngay từ đầu.",
        exampleDetails: "Nêu rõ ngôn ngữ (Golang/Rust/TS), kiến trúc (Microservices/Monolith), thư viện UI cốt lõi."
      },
      {
        id: "ag-2",
        title: "Viết PRD & Nghiên cứu Spikes",
        role: "Agent",
        description: "Tạo PRD nháp và thực hiện các luồng Spike (giả thuyết kỹ thuật).",
        input: "Core Request Prompt",
        output: "PRD & Spikes Markdown",
        loopGroup: "Planning",
        icon: "🔬",
        nextSteps: [{ conditionLabel: "Trình bày Plan", nextNodeId: "ag-3" }],
        guidanceContext: "Agent sẽ tự đi lùng sục best practices, viết các file `.md` mô tả thiết kế hệ thống, sơ đồ CSDL, cấu trúc thư mục.",
        exampleDetails: "Kiểm tra kỹ các file `Architecture.md` và `PRD.md` được sinh ra. Xem Agent có đề xuất sai design pattern không."
      },
      {
        id: "ag-3",
        title: "Duyệt Kiến trúc & Planning",
        role: "User",
        description: "Người dùng chốt Architecture và Plan.",
        input: "PRD & Spikes Markdown",
        output: "Approval / Feedback",
        loopGroup: "Planning",
        loopCondition: "Nếu Spike sai hướng -> Lặp lại Nghiên cứu",
        promptText: "Tôi đồng ý với thiết kế CSDL FrankenSQLite và kiến trúc Golang. Hãy bắt đầu implement module Auth trước tiên. Gán theo chuẩn Universal ID của Beads.",
        icon: "✅",
        nextSteps: [
          { conditionLabel: "Đồng ý", nextNodeId: "ag-4" },
          { conditionLabel: "Sai hướng", nextNodeId: "ag-2", isLoopBack: true }
        ],
        guidanceContext: "Bạn đóng vai trò là Product Manager (PM) kết hợp System Architect. Tuyệt đối không để Agent tự ý code nếu bạn chưa review bản vẽ thiết kế.",
        exampleDetails: "Phê duyệt hoặc phản biện ý tưởng: 'Dùng Redis ở đây là thừa, hãy đổi sang biến in-memory'."
      },
      {
        id: "ag-4",
        title: "Code tự chủ & Tracking",
        role: "Agent",
        description: "Tự tạo beads task, code, chạy tool kiểm thử và commit code theo từng cục UI/API.",
        input: "Approved Plan & Tasks",
        output: "Working Software Increments",
        loopGroup: "Execution",
        loopCondition: "Bug/Lỗi Test -> Agent tự lặp lại Code",
        icon: "🤖",
        nextSteps: [
          { conditionLabel: "Dev - Test - Commit", nextNodeId: "ag-4", isLoopBack: true } // Internal Loop
        ],
        guidanceContext: "Agent sẽ tự code, tự gõ command terminal, tự đọc lỗi terminal và tự sửa code. Nó hoạt động như một Senior Coder độc lập.",
        exampleDetails: "Theo dõi Agent chạy các lệnh Git, npm install, và chạy test tự động."
      }
    ]
  },
  {
    id: "wf-agentic-brownfield",
    title: "4. Agentic Coding (Brownfield)",
    description: "Phát triển trên dự án Đã có sẵn (Brownfield). Phụ thuộc lớn vào việc đọc/hiểu mã nguồn cũ.",
    steps: [
      {
        id: "ab-1",
        title: "Giao phó Bug / Feature Mới",
        role: "User",
        description: "Yêu cầu thay đổi luồng hiện tại.",
        input: "Bug Report / Feature Request",
        output: "Triaging Prompt",
        loopGroup: "Planning",
        projectStateScenario: "Codebase legacy (Brownfield) đang chạy, cần fix bug đau đầu hoặc đắp thêm tính năng nhỏ mà không làm vỡ app.",
        promptText: "Hệ thống Thanh toán hiện hành (payment.ts) đang thỉnh thoảng lỗi timeout do gọi API phía thứ 3. Hãy nghiên cứu codebase hiện tại, thêm cơ chế Retry và Circuit Breaker vào đó.",
        icon: "🐛",
        nextSteps: [{ conditionLabel: "Tạo Ticket", nextNodeId: "ab-2" }],
        guidanceContext: "Thách thức lớn nhất ở Brownfield là context. Agent phải được mớm context chuẩn xác hoặc tự biết cách tìm đường trong hàng vạn dòng code cũ.",
        exampleDetails: "Cung cấp file bị lỗi, mô hình lỗi (stack trace) hoặc ticket Jira cụ thể."
      },
      {
        id: "ab-2",
        title: "Đọc Codebase & Indexing",
        role: "Agent",
        description: "Dùng semantic search / grep để vét cạn module Thanh toán hiện có.",
        input: "Codebase Context",
        output: "Indexing & Traces",
        loopGroup: "Planning",
        loopCondition: "Chưa đủ Context -> Lặp lại trace code",
        icon: "🔍",
        nextSteps: [
          { conditionLabel: "Thiếu Context", nextNodeId: "ab-2", isLoopBack: true },
          { conditionLabel: "Đủ Context", nextNodeId: "ab-3" }
        ],
        guidanceContext: "Agent sử dụng các kỹ năng như Ripgrep để dò tìm code. Nó sẽ nhảy từ file này qua file khác để vẽ ra dependency graph.",
        exampleDetails: "Quá trình này tốn nhiều token. Cần khoanh vùng thư mục cụ thể để tránh Agent lang thang vào Node Modules."
      },
      {
        id: "ab-3",
        title: "Viết Plan & Đánh giá Rủi ro",
        role: "Agent",
        description: "Viết kế hoạch sửa code đảm bảo không phá vỡ logic thanh toán cũ.",
        input: "Indexing & Traces",
        output: "Modification Plan",
        loopGroup: "Execution",
        icon: "🛡️",
        nextSteps: [{ conditionLabel: "Plan Safe", nextNodeId: "ab-4" }],
        guidanceContext: "Agent phân tích những file nào sẽ ảnh hưởng bởi sự thay đổi. Trình bày Impact Assessment.",
        exampleDetails: "Agent sinh ra file `Modification_Plan.md` với các khối [NEW], [MODIFY], [DELETE]."
      },
      {
        id: "ab-4",
        title: "Thực thi & Validate",
        role: "Agent",
        description: "Viết code, chạy Test Suite cũ để đảm bảo pass toàn bộ luồng. Cập nhật mã nguồn an toàn.",
        input: "Modification Plan",
        output: "Committed Code (Bug Fixed)",
        loopGroup: "Execution",
        loopCondition: "Vỡ CI -> Hoàn tác và Code lại",
        icon: "🩺",
        nextSteps: [
          { conditionLabel: "Fix Failed", nextNodeId: "ab-3", isLoopBack: true }
        ],
        guidanceContext: "Năng lực quan trọng nhất của Agent là Regression Testing — đảm bảo sửa lỗi A không đẻ ra lỗi B.",
        exampleDetails: "Agent tự động chạy `npm run test` và phân tích log lỗi vỡ Assertions."
      }
    ]
  },
  {
    id: "wf-gsafe-full",
    title: "5. Agentic SE (GSAFe 6.0)",
    description: "Quy trình mức Doanh nghiệp: Yêu cầu tính truy vết 100%, Design System song hành và CI/CD nghiêm ngặt.",
    steps: [
      {
        id: "gs-1",
        title: "Khởi tạo Yêu cầu Cấp độ Doanh nghiệp",
        role: "User",
        description: "Đưa ra Epics lớn cần giải quyết.",
        input: "Business Epic",
        output: "Initiation Trigger",
        loopGroup: "None",
        projectStateScenario: "Dự án Doanh nghiệp với nhiều đội ngũ (Agile Release Train), cần tài liệu chặt chẽ và theo dõi RTM ma trận.",
        promptText: "/init-gsafe-workflow\nMục tiêu: Xây dựng Hệ thống Quản trị Nhân sự Tập trung. Khởi tạo quy trình Continuous Exploration (CE).",
        icon: "🏢",
        nextSteps: [{ conditionLabel: "Bắt đầu CE", nextNodeId: "gs-2" }],
        guidanceContext: "Tại GSAFe 6.0, một yêu cầu không đi thẳng vào code. Nó kích hoạt quy trình Continuous Exploration (CE) để khảo sát thị trường và khả thi kỹ thuật.",
        exampleDetails: "Sử dụng lệnh `/init-gsafe-workflow` để scaffolding thư mục dự án chuẩn SAFe."
      },
      {
        id: "gs-2",
        title: "CE Phase: Research & PRDs",
        role: "PMO / Architect",
        description: "Thực hiện nhiều Spikes. Tổng hợp PRD. So sánh độ phủ yêu cầu phần mềm.",
        input: "Business Market Specs",
        output: "Spike Reports, Master PRD",
        loopGroup: "Planning",
        icon: "📊",
        nextSteps: [{ conditionLabel: "Draft PRD", nextNodeId: "gs-3" }],
        guidanceContext: "Agent đóng vai trò PMO: Thực hiện hàng tá vòng Spike Research để xác thực giả thuyết kỹ thuật. Kết quả là các file markdown tại `/docs/researches/spikes`.",
        exampleDetails: "Ví dụ: `spike-evaluate-dolt-vs-sqlite.md`"
      },
      {
        id: "gs-3",
        title: "Phát triển Design System (nếu có UI)",
        role: "User",
        description: "Duyệt PRD và yêu cầu lên UI.",
        input: "Master PRD",
        output: "Mockups / Design System HTML",
        loopGroup: "Planning",
        promptText: "Hãy chạy workflow /create-gsafe-design-system để thiết kế Design System cho trang Dashboard Nhân sự dựa trên PRD-01.",
        icon: "🎨",
        nextSteps: [{ conditionLabel: "Tạo Design System", nextNodeId: "gs-4" }],
        guidanceContext: "GSAFe tách biệt Data Logic và UI Component. Cần có UI/UX Mockup và Design System Tokens (CSS) khớp 1-1 với PRD.",
        exampleDetails: "Sử dụng `/create-gsafe-design-system` workflow."
      },
      {
        id: "gs-4",
        title: "PRD/DS Coverage & Universal IDs",
        role: "System",
        description: "So khớp State Matrix của UI vs Logic PRD. Gán Beads ID (br-prd, br-ds) xuyên suốt.",
        input: "Master PRD, UI Mockups",
        output: "Aligned PRD (with Beads IDs)",
        loopGroup: "Planning",
        loopCondition: "Mâu thuẫn UI/Logic -> Vòng lại Refine PRD/DS",
        icon: "🔗",
        nextSteps: [
          { conditionLabel: "Đồng bộ", nextNodeId: "gs-5" },
          { conditionLabel: "Mâu thuẫn", nextNodeId: "gs-2", isLoopBack: true }
        ],
        guidanceContext: "Hệ thống RTM (Requirements Traceability Matrix) quét qua `.md` và `.tsx` để đảm bảo mọi feature đều được render trên UI.",
        exampleDetails: "Gán các mã định danh Beads ID như `br-prd-auth-login` vào source code."
      },
      {
        id: "gs-5",
        title: "Lập kế hoạch & Rã task (Plan)",
        role: "RTE",
        description: "Đánh ID planning. Cân nhắc sửa PRD nếu phát hiện luồng phụ bị lủng.",
        input: "Aligned PRD",
        output: "Implementation Plan, Beads Tasks",
        loopGroup: "Execution",
        icon: "📅",
        nextSteps: [{ conditionLabel: "Tạo Tasks", nextNodeId: "gs-6" }],
        guidanceContext: "Release Train Engineer (RTE) phá vỡ các khối PRD lớn thành các User Stories siêu nhỏ (Beads Tasks).",
        exampleDetails: "Tạo file `task.md` với hàng chục checkbox rõ ràng."
      },
      {
        id: "gs-6",
        title: "Code Execution (Vòng lặp Implement)",
        role: "Dev Teams",
        description: "Code qua mô hình phân tách Role (Code agent viết, QA agent duyệt).",
        input: "Beads Tasks",
        output: "CI/CD Gates Passed, Software Increment",
        loopGroup: "Execution",
        loopCondition: "Lỗi QA/Security Gate -> Lặp lại Code nháp",
        icon: "👷",
        nextSteps: [
          { conditionLabel: "Kiểm thử lỗi", nextNodeId: "gs-6", isLoopBack: true }
        ],
        guidanceContext: "Đội Dev AI chia làm Coder và Reviewer. Mã chỉ được hợp nhất (merge) khi qua toàn bộ các cổng CI/CD (lint, unit test, sec scan).",
        exampleDetails: "Đảm bảo mã nguồn được check bằng `golangci-lint` và `go test`."
      }
    ]
  }
];
