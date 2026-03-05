export interface TerminalLine {
  type?: "command" | "output" | "error" | "success" | "comment";
  prompt?: string;
  text: string;
}

export interface SetupGuide {
  id: string;
  title: string;
  description: string;
  
  // Single OS mode (Legacy)
  terminalLines?: TerminalLine[];
  
  // Multi OS mode
  hasOsTabs?: boolean;
  macOSTerminalLines?: TerminalLine[];
  linuxTerminalLines?: TerminalLine[];
  windowsTerminalLines?: TerminalLine[];
}

export interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown or plain text block
  roles?: { name: string; description: string; color: string }[];
  visualWorkflowSteps?: { title: string; desc: string; role: string; color: string }[];
}

export const setupGuides: SetupGuide[] = [
  {
    id: "setup-full-stack",
    title: "Cài đặt Toàn diện (Multi-OS)",
    description: "Hướng dẫn cài đặt Agent (Antigravity), công cụ index (FastCode CLI) và Gmind CLI cho các hệ điều hành khác nhau.",
    hasOsTabs: true,
    macOSTerminalLines: [
      { type: "comment", text: "# 1. Cài đặt Antigravity Agent" },
      { prompt: "$", type: "command", text: "brew install google-deepmind/tap/antigravity" },
      { type: "output", text: "==> Downloading https://ghcr.io/v2/google-deepmind/antigravity..." },
      { type: "success", text: "🍺 antigravity was successfully installed!" },
      { prompt: "$", type: "command", text: "export GEMINI_API_KEY=\"aizaSy...\"" },
      { type: "comment", text: "" },
      { type: "comment", text: "# 2. Cài đặt FastCode CLI (Bộ index AST cục bộ)" },
      { prompt: "$", type: "command", text: "brew install fastcode-ai/cli/fastcode" },
      { type: "success", text: "FastCode v2.1.0 installed." },
      { type: "comment", text: "" },
      { type: "comment", text: "# 3. Khởi tạo Gmind Project" },
      { prompt: "$", type: "command", text: "npm i -g @gmind/cli" },
      { prompt: "$", type: "command", text: "gmind init my-agent-workspace" },
      { type: "success", text: "✨ GSAFe project initialized successfully." }
    ],
    linuxTerminalLines: [
      { type: "comment", text: "# 1. Cài đặt Antigravity Agent" },
      { prompt: "$", type: "command", text: "curl -sL https://install.antigravity.dev | bash" },
      { type: "output", text: "Extracting binaries for Linux x86_64..." },
      { type: "success", text: "Antigravity installed in ~/.local/bin." },
      { prompt: "$", type: "command", text: "echo 'export GEMINI_API_KEY=\"aizaSy...\"' >> ~/.bashrc" },
      { type: "comment", text: "" },
      { type: "comment", text: "# 2. Cài đặt FastCode CLI" },
      { prompt: "$", type: "command", text: "sudo apt-get install rustc cargo && cargo install fastcode-cli" },
      { type: "success", text: "FastCode built and installed." },
      { type: "comment", text: "" },
      { type: "comment", text: "# 3. Khởi tạo Gmind Project" },
      { prompt: "$", type: "command", text: "npm i -g @gmind/cli" },
      { prompt: "$", type: "command", text: "gmind init my-agent-workspace" },
      { type: "success", text: "✨ GSAFe project initialized successfully." }
    ],
    windowsTerminalLines: [
      { type: "comment", text: "# 1. Cài đặt Antigravity Agent" },
      { prompt: ">", type: "command", text: "winget install Deepmind.Antigravity" },
      { type: "output", text: "Found Antigravity [Deepmind.Antigravity]" },
      { type: "success", text: "Successfully installed." },
      { prompt: ">", type: "command", text: "setx GEMINI_API_KEY \"aizaSy...\"" },
      { type: "comment", text: "" },
      { type: "comment", text: "# 2. Cài đặt FastCode CLI" },
      { prompt: ">", type: "command", text: "choco install fastcode" },
      { type: "success", text: "FastCode installed." },
      { type: "comment", text: "" },
      { type: "comment", text: "# 3. Khởi tạo Gmind Project" },
      { prompt: ">", type: "command", text: "npm i -g @gmind/cli" },
      { prompt: ">", type: "command", text: "gmind init my-agent-workspace" },
      { type: "success", text: "✨ GSAFe project initialized successfully." }
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
      { title: "Sprint Planning", desc: "PO và Team chọn mục tiêu từ Backlog.", role: "Toàn Team", color: "cyan" },
      { title: "Daily Standup", desc: "Đồng bộ tiến độ 15 phút mỗi ngày.", role: "Dev Team", color: "amber" },
      { title: "Sprint Review", desc: "Demo increment với khách hàng.", role: "PO", color: "cyan" },
      { title: "Retrospective", desc: "Cải tiến liên tục sau mỗi Sprint.", role: "Scrum Master", color: "teal" }
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
      { title: "Continuous Exploration", desc: "Nghiên cứu thị trường và thiết kế kiến trúc thông qua Spikes (Phase B, C, D).", role: "PMO / Architect", color: "indigo" },
      { title: "PI Planning", desc: "Lập kế hoạch 10 tuần, xác định rủi ro (ROAM) và dependency.", role: "RTE", color: "amber" },
      { title: "Program Execution", desc: "Chạy các ARTs song song, Agent rà soát chéo.", role: "Dev Teams", color: "emerald" },
      { title: "Inspect & Adapt", desc: "Phân tích nguyên nhân gốc rễ và demo diện rộng.", role: "Toàn tổ chức", color: "rose" }
    ]
  }
];
