export interface TerminalLine {
  type?: "command" | "output" | "error" | "success";
  prompt?: string;
  text: string;
}

export interface SetupGuide {
  id: string;
  title: string;
  description: string;
  terminalLines: TerminalLine[];
}

export interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown or plain text block
  roles?: { name: string; description: string; color: string }[];
}

export const setupGuides: SetupGuide[] = [
  {
    id: "setup-gmind",
    title: "Cài đặt & Khởi tạo Gmind",
    description: "Cài đặt Gmind CLI toàn cục và các dependencies lõi để chạy môi trường Agentic.",
    terminalLines: [
      { prompt: "$", type: "command", text: "npm install -g @gmind/cli" },
      { type: "output", text: "Fetching packages..." },
      { type: "success", text: "Installed @gmind/cli v1.4.2 globally." },
      { prompt: "$", type: "command", text: "gmind init my-agent-project" },
      { type: "output", text: "Creating workspace directory..." },
      { type: "output", text: "Initializing FrankenSQLite..." },
      { type: "success", text: "Project 'my-agent-project' ready." },
      { prompt: "$", type: "command", text: "cd my-agent-project && gmind serve" },
      { type: "output", text: "RTM Service started on port 8080" },
    ],
  },
  {
    id: "setup-fastcode",
    title: "Cài đặt FastCode (Phân tích Codebase)",
    description: "Công cụ FastCode dùng để build Abstract Syntax Tree (AST) phục vụ Semantic Search cho Agent.",
    terminalLines: [
      { prompt: "$", type: "command", text: "curl -sL https://get.fastcode.ai | bash" },
      { type: "output", text: "Detecting OS... MacOS ARM64" },
      { type: "output", text: "Downloading binaries..." },
      { type: "success", text: "FastCode installed successfully." },
      { prompt: "$", type: "command", text: "fastcode index --no-embeddings ." },
      { type: "output", text: "Indexing 452 files..." },
      { type: "success", text: "Index built in 1.2s." },
    ],
  }
];

export const theoryTopics: TheoryTopic[] = [
  {
    id: "theory-agile-scrum",
    title: "Agile & Scrum Cơ bản",
    description: "Nền tảng của phát triển phần mềm linh hoạt, chia nhỏ công việc thành các đoạn ngắn (Sprint).",
    content: "Agile Software Development là phương pháp phát triển phần mềm dựa trên sự lặp lại (iterative) và tăng dần (incremental). Scrum là một framework thực thi Agile phổ biến nhất, vận hành qua các vòng lặp 1-4 tuần gọi là Sprint. Khác với mô hình Thác nước (Waterfall) truyền thống, Agile/Scrum tập trung vào khả năng thích ứng với thay đổi, liên tục giao nhận giá trị và hợp tác chặt chẽ với khách hàng thông qua phản hồi liên tục.",
    roles: [
      { name: "Product Owner", description: "Người định hình sản phẩm, quản lý Product Backlog và tối đa hóa giá trị.", color: "cyan" },
      { name: "Scrum Master", description: "Người bảo vệ quy trình Scrum, loại bỏ trở ngại và hỗ trợ tổ chức.", color: "teal" },
      { name: "Development Team", description: "Nhóm tự quản lý, đa chức năng chịu trách nhiệm chuyển giao Increment có thể sử dụng được.", color: "amber" }
    ]
  },
  {
    id: "theory-safe-6",
    title: "SAFe 6.0 & GSAFe",
    description: "Scaled Agile Framework (SAFe) để mở rộng Agile lên cấp độ Doanh nghiệp (Enterprise).",
    content: "SAFe 6.0 là hệ thống quản trị Agile cho các tổ chức lớn. Nó đồng bộ hóa sự ăn khớp, cộng tác và chuyển giao cho nhiều nhóm phần mềm. GSAFe (Gmind Scaled Agile Framework for enterprise) là phiên bản tinh giản của hệ thống này dành cho môi trường Agentic, nhấn mạnh sự kết nối giữa các Roles thông qua Beads Universal ID. \n\nTrong SAFe, mọi quá trình phát triển bắt đầu bằng Continuous Exploration (CE) qua các Spikes, từ đó tổng hợp thành Requirement và Backlog rõ ràng trước khi thực thi PI Planning.",
    roles: [
      { name: "PMO / RTE", description: "Release Train Engineer, điều phối luồng công việc cấp cao và PI Planning.", color: "indigo" },
      { name: "Architect Agent", description: "Agent định hình Kiến trúc, chia nhỏ requirement từ PRD thành Plan.", color: "rose" },
      { name: "Dev / QA Agent", description: "Swarm AI Agent thực thi code và kiểm thử tự động, tuân thủ Nguyên tắc 4-mắt.", color: "emerald" }
    ]
  }
];
