export interface WorkflowStep {
  id: string;
  title: string;
  role: "User" | "Agent" | "System";
  description: string;
  promptText?: string;
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
        promptText: "Hãy xây dựng một ứng dụng web quản lý công việc (Todo App) bằng Next.js và Tailwind CSS. Yêu cầu tính năng:\n1. Thêm/Sửa/Xóa task.\n2. Lưu trữ tại LocalStorage.\n3. Giao diện Dark mode tối giản.\nTôi cần bạn trả về toàn bộ code các file cần thiết trong 1 lần duy nhất."
      },
      {
        id: "os-2",
        title: "Sinh Code & Tự QA",
        role: "Agent",
        description: "Agent tự động phân tích prompt, rã logic, code, và tự kiểm tra (QA) trước khi hoàn tất.",
      },
      {
        id: "os-3",
        title: "Hoàn thiện & Người dùng Khởi chạy",
        role: "User",
        description: "Người dùng copy code, chạy build kiểm tra.",
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
        promptText: "Tôi muốn làm một trang landing page cho ứng dụng học ngoại ngữ. Bạn có thể gợi ý cấu trúc và code thử phần Header đi kèm Hero Section được không?"
      },
      {
        id: "vb-2",
        title: "Phân tích PRDs & Lên kế hoạch (PLAN)",
        role: "Agent",
        description: "Phát thảo ý tưởng, lên Requirement ngắn gọn và kế hoạch triển khai.",
      },
      {
        id: "vb-3",
        title: "Rã việc (Tasks tracking) & Code nháp",
        role: "Agent",
        description: "Liệt kê các module cần làm, code thử bản Draft 1.",
      },
      {
        id: "vb-4",
        title: "Người dùng Vibe Check & Cập nhật",
        role: "User",
        description: "Người dùng xem kết quả, chỉnh sửa định hướng thiết kế.",
        promptText: "Màu sắc hiện tại hơi chói. Hãy đổi sang tone màu pastel nhẹ nhàng hơn (như xanh ngọc bích). Thêm một nút 'Học Thử Miễn Phí' to hơn ở giữa Hero Section."
      },
      {
        id: "vb-5",
        title: "Code lại & QA",
        role: "Agent",
        description: "Cập nhật mã nguồn theo feedback và kiểm tra lỗi.",
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
        promptText: "Hãy khởi tạo một dự án E-commerce Microservices bằng Golang. Sử dụng kiến trúc Clean Architecture. Dự toán cần có service: User, Product, Order. Viết PRD và Architecture Plan cho tôi trước khi code."
      },
      {
        id: "ag-2",
        title: "Viết PRD & Nghiên cứu Spikes",
        role: "Agent",
        description: "Tạo PRD nháp và thực hiện các luồng Spike (giả thuyết kỹ thuật).",
      },
      {
        id: "ag-3",
        title: "Duyệt Kiến trúc & Planning",
        role: "User",
        description: "Người dùng chốt Architecture và Plan.",
        promptText: "Tôi đồng ý với thiết kế CSDL FrankenSQLite và kiến trúc Golang. Hãy bắt đầu implement module Auth trước tiên. Gán theo chuẩn Universal ID của Beads."
      },
      {
        id: "ag-4",
        title: "Code tự chủ & Tracking",
        role: "Agent",
        description: "Tự tạo beads task, code, chạy tool kiểm thử và commit code theo từng cục UI/API.",
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
        promptText: "Hệ thống Thanh toán hiện hành (payment.ts) đang thỉnh thoảng lỗi timeout do gọi API phía thứ 3. Hãy nghiên cứu codebase hiện tại, thêm cơ chế Retry và Circuit Breaker vào đó."
      },
      {
        id: "ab-2",
        title: "Đọc Codebase & Indexing",
        role: "Agent",
        description: "Dùng semantic search / grep để vét cạn module Thanh toán hiện có.",
      },
      {
        id: "ab-3",
        title: "Viết Plan & Đánh giá Rủi ro",
        role: "Agent",
        description: "Viết kế hoạch sửa code đảm bảo không phá vỡ logic thanh toán cũ.",
      },
      {
        id: "ab-4",
        title: "Thực thi & Validate",
        role: "Agent",
        description: "Viết code, chạy Test Suite cũ để đảm bảo pass toàn bộ luồng. Cập nhật mã nguồn an toàn.",
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
        promptText: "/init-gsafe-workflow\nMục tiêu: Xây dựng Hệ thống Quản trị Nhân sự Tập trung. Khởi tạo quy trình Continuous Exploration (CE)."
      },
      {
        id: "gs-2",
        title: "CE Phase: Research & PRDs",
        role: "Agent",
        description: "Thực hiện nhiều Spikes. Tổng hợp PRD. So sánh độ phủ yêu cầu phần mềm.",
      },
      {
        id: "gs-3",
        title: "Phát triển Design System (nếu có UI)",
        role: "User",
        description: "Duyệt PRD và yêu cầu lên UI.",
        promptText: "Hãy chạy workflow /create-gsafe-design-system để thiết kế Design System cho trang Dashboard Nhân sự dựa trên PRD-01."
      },
      {
        id: "gs-4",
        title: "PRD/DS Coverage & Universal IDs",
        role: "Agent",
        description: "So khớp State Matrix của UI vs Logic PRD. Gán Beads ID (br-prd, br-ds) xuyên suốt.",
      },
      {
        id: "gs-5",
        title: "Lập kế hoạch & Rã task (Plan)",
        role: "Agent",
        description: "Đánh ID planning. Cân nhắc sửa PRD nếu phát hiện luồng phụ bị lủng.",
      },
      {
        id: "gs-6",
        title: "Code Execution (Vòng lặp Implement)",
        role: "Agent",
        description: "Code qua mô hình phân tách Role (Code agent viết, QA agent duyệt).",
      }
    ]
  }
];
