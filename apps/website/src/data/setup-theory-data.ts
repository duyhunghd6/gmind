export interface TerminalLine {
  type?: "command" | "output" | "error" | "success" | "comment";
  prompt?: string;
  text: string;
}

export interface SetupStep {
  id: string;
  title: string;
  role: string;
  description: string;
  input: string;
  output: string;
  macOSTerminalLines?: TerminalLine[];
  linuxTerminalLines?: TerminalLine[];
  windowsTerminalLines?: TerminalLine[];
}

export interface SetupGuide {
  id: string;
  title: string;
  description: string;
  steps: SetupStep[];
}

export interface TheoryWorkflowStep {
  id: string;
  title: string;
  role: string;
  description: string;
  input: string;
  output: string;
  loopGroup?: "None" | "Planning" | "Execution";
}

export interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown or plain text block
  roles?: { name: string; description: string; color: string }[];
  visualWorkflowSteps?: TheoryWorkflowStep[];
}

export const setupGuides: SetupGuide[] = [
  {
    id: "setup-full-stack",
    title: "Cài đặt Toàn diện (Multi-OS)",
    description: "Hướng dẫn cài đặt Agent (Antigravity), công cụ index (FastCode CLI) và Gmind CLI qua 3 bước.",
    steps: [
      {
        id: "install-agent",
        title: "1. Cài đặt Antigravity Agent",
        role: "System",
        description: "Cài đặt core Agent của Google Deepmind để chuẩn bị cho môi trường Agentic AI.",
        input: "Thiết bị Local",
        output: "Agent Binary",
        macOSTerminalLines: [
          { prompt: "$", type: "command", text: "brew install google-deepmind/tap/antigravity" },
          { type: "output", text: "==> Downloading ..." },
          { type: "success", text: "🍺 antigravity installed!" },
          { prompt: "$", type: "command", text: "export GEMINI_API_KEY=\"aizaSy...\"" }
        ],
        linuxTerminalLines: [
          { prompt: "$", type: "command", text: "curl -sL https://install.antigravity.dev | bash" },
          { type: "success", text: "Antigravity installed." },
          { prompt: "$", type: "command", text: "echo 'export GEMINI_API_KEY=\"aizaSy...\"' >> ~/.bashrc" }
        ],
        windowsTerminalLines: [
          { prompt: ">", type: "command", text: "winget install Deepmind.Antigravity" },
          { type: "success", text: "Successfully installed." },
          { prompt: ">", type: "command", text: "setx GEMINI_API_KEY \"aizaSy...\"" }
        ]
      },
      {
        id: "install-fastcode",
        title: "2. Cài đặt FastCode CLI",
        role: "System",
        description: "Công cụ Index AST cục bộ siêu tốc độ (lên đến 20M tokens/min).",
        input: "Agent Binary",
        output: "Semantic Indexer",
        macOSTerminalLines: [
          { prompt: "$", type: "command", text: "brew install fastcode-ai/cli/fastcode" },
          { type: "success", text: "FastCode v2.1.0 installed." }
        ],
        linuxTerminalLines: [
          { prompt: "$", type: "command", text: "sudo apt-get install rustc cargo && cargo install fastcode-cli" }
        ],
        windowsTerminalLines: [
          { prompt: ">", type: "command", text: "choco install fastcode" }
        ]
      },
      {
        id: "install-gmind",
        title: "3. Khởi tạo Gmind Project",
        role: "User",
        description: "Cài đặt CLI quản trị GSAFe và khởi tạo Workspace.",
        input: "Rỗng",
        output: "GSAFe Workspace",
        macOSTerminalLines: [
          { prompt: "$", type: "command", text: "npm i -g @gmind/cli" },
          { prompt: "$", type: "command", text: "gmind init my-agent-workspace" },
          { type: "success", text: "✨ GSAFe project initialized successfully." }
        ],
        linuxTerminalLines: [
          { prompt: "$", type: "command", text: "npm i -g @gmind/cli" },
          { prompt: "$", type: "command", text: "gmind init my-agent-workspace" }
        ],
        windowsTerminalLines: [
          { prompt: ">", type: "command", text: "npm i -g @gmind/cli" },
          { prompt: ">", type: "command", text: "gmind init my-agent-workspace" }
        ]
      }
    ]
  }
];

export const theoryTopics: TheoryTopic[] = [
  {
    id: "theory-agile",
    title: "Vì sao chọn Agile & Scrum?",
    description: "Nền tảng của phát triển phần mềm linh hoạt, chia nhỏ công việc thành các đoạn ngắn (Sprint). Khác với mô hình Thác nước (Waterfall) truyền thống, Agile/Scrum tập trung vào khả năng thích ứng với thay đổi, liên tục giao nhận giá trị và hợp tác chặt chẽ với khách hàng.",
    content: "Agile Software Development là phương pháp phát triển phần mềm dựa trên sự lặp lại (iterative) và tăng dần (incremental). Scrum là một framework thực thi Agile phổ biến nhất, vận hành qua các vòng lặp 1-4 tuần gọi là Sprint.",
    roles: [
      { name: "Product Owner", description: "Định hình sản phẩm, quản lý Product Backlog và tối đa hóa giá trị.", color: "cyan" },
      { name: "Scrum Master", description: "Bảo vệ quy trình Scrum, loại bỏ trở ngại và hỗ trợ tổ chức.", color: "teal" },
      { name: "Dev Team", description: "Nhóm tự quản lý, đa chức năng chịu trách nhiệm chuyển giao Increment.", color: "amber" }
    ],
    visualWorkflowSteps: [
      { id: "agile-1", title: "Sprint Planning", role: "Toàn Team", description: "PO và Team chọn mục tiêu từ Backlog.", input: "Product Backlog", output: "Sprint Goal", loopGroup: "Planning" },
      { id: "agile-2", title: "Daily Standup", role: "Dev Team", description: "Đồng bộ tiến độ 15 phút mỗi ngày.", input: "Daily Progress", output: "Impediments Identified", loopGroup: "Execution" },
      { id: "agile-3", title: "Sprint Review", role: "PO", description: "Demo increment với khách hàng.", input: "Working Increment", output: "Stakeholder Feedback", loopGroup: "Execution" },
      { id: "agile-4", title: "Retrospective", role: "Scrum Master", description: "Cải tiến liên tục sau mỗi Sprint.", input: "Sprint Experience", output: "Action Items", loopGroup: "Execution" }
    ]
  },
  {
    id: "theory-safe",
    title: "Vì sao chọn SAFe 6.0?",
    description: "Scaled Agile Framework (SAFe) để mở rộng Agile lên cấp độ Doanh nghiệp (Enterprise), đồng bộ hóa sự ăn khớp, cộng tác và chuyển giao cho nhiều nhóm phần mềm lớn.",
    content: "SAFe 6.0 giải quyết bài toán cốt lõi: Làm sao để 100+ kỹ sư phần mềm làm việc đồng bộ mà không giẫm chân lên nhau. \n\nGSAFe (Gmind Scaled Agile Framework for enterprise) là phiên bản tinh giản dành cho AI Agent, nhấn mạnh sự kết nối thông qua Beads Universal ID. Mọi thứ bắt đầu bằng Continuous Exploration (CE) qua các Spikes, từ đó tổng hợp thành Requirement rõ ràng trước khi PI Planning.",
    roles: [
      { name: "PMO / RTE", description: "Điều phối luồng công việc cấp cao và PI Planning.", color: "indigo" },
      { name: "Architect", description: "Định hình Kiến trúc hệ thống và guardrails.", color: "rose" },
      { name: "Agent Swarm", description: "Thực thi rà soát code tự động và CI/CD.", color: "emerald" }
    ],
    visualWorkflowSteps: [
      { id: "safe-1", title: "Continuous Exploration", role: "PMO / Architect", description: "Nghiên cứu thị trường và thiết kế kiến trúc thông qua Spikes (Phase B, C, D).", input: "Epic / Vision", output: "Master PRD, Spike Reports", loopGroup: "Planning" },
      { id: "safe-2", title: "PI Planning", role: "RTE", description: "Lập kế hoạch 10 tuần, xác định rủi ro (ROAM) và dependency.", input: "Master PRD", output: "PI Plan, ART Backlog", loopGroup: "Planning" },
      { id: "safe-3", title: "Program Execution", role: "Dev Teams", description: "Chạy các ARTs song song, Agent rà soát chéo.", input: "PI Plan", output: "System Demo Equivalent", loopGroup: "Execution" },
      { id: "safe-4", title: "Inspect & Adapt", role: "Toàn tổ chức", description: "Phân tích nguyên nhân gốc rễ và demo diện rộng.", input: "System Demo", output: "PI Improvements", loopGroup: "Execution" }
    ]
  }
];
