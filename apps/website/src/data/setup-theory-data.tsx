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

import React from "react";

export const setupGuides: SetupGuide[] = [
  {
    id: "setup-full-stack",
    title: "Installation",
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

export interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  subItems?: { id: string; title: string }[];
}

import AgileCycleSvg from "../../../../docs/assets/images/agile-explain-svg/agile-dev-life-cycle.svg";
import XpLifeCyclesSvg from "../../../../docs/assets/images/agile-explain-svg/xp-life-cycles.svg";
import DADSvg from "../../../../docs/assets/images/agile-explain-svg/disciplined-agile-delivery.svg";
import DSDMSvg from "../../../../docs/assets/images/agile-explain-svg/dynamic-systems-development-method-iterations.svg";
import FDDSvg from "../../../../docs/assets/images/agile-explain-svg/feature-driven-development.svg";
import RADSvg from "../../../../docs/assets/images/agile-explain-svg/rapid-application-development.svg";
import DADPhasesSvg from "../../../../docs/assets/images/agile-explain-svg/disciplined-agile-delivery-phases.svg";
import DSDMVariablesSvg from "../../../../docs/assets/images/agile-explain-svg/dynamic-systems-development-method-project-variables.svg";
import AgileCycle2Svg from "../../../../docs/assets/images/agile-explain-svg/agile-cycle.svg";
import XpComparisonsSvg from "../../../../docs/assets/images/agile-explain-svg/xp-comparisons.svg";
import XpFeedbackLoopsSvg from "../../../../docs/assets/images/agile-explain-svg/xp-feedback-loops.svg";
import XpLifecycle2Svg from "../../../../docs/assets/images/agile-explain-svg/xp-lifecycle.svg";
import XpPracticesSvg from "../../../../docs/assets/images/agile-explain-svg/xp-practices.svg";
import XpProsConsSvg from "../../../../docs/assets/images/agile-explain-svg/xp-pros-cons.svg";
import ScrumSDLC from "../../../../docs/assets/images/agile-explain-svg/scrum-software-dev-life-cycle.svg";
import TDDLifeCycle from "../../../../docs/assets/images/agile-explain-svg/tdd-life-cycle.svg";
import SAFeExplain from "../../../../docs/assets/images/agile-explain-svg/scaled-agile-framework-explain.svg";
import AgileValuesSvg from "../../../../docs/assets/images/agile-explain-svg/agile-values.svg";
import XpMethodologySvg from "../../../../docs/assets/images/agile-explain-svg/extreme-programming-xp-methodology.svg";
import XpLifeCycleAltSvg from "../../../../docs/assets/images/agile-explain-svg/xp-life-cycle-alt.svg";

const ImgView = ({ src, alt }: { src: any; alt: string }) => (
  <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem", width: "100%", textAlign: "center" }}>
    <img src={src?.src || src} alt={alt} style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border-color)", padding: "16px", background: "var(--bg-card)", objectFit: "contain" }} />
  </div>
);

export const theoryTopics: TheoryTopic[] = [
  {
    id: "theory-agile",
    title: "Vì sao chọn Agile & Scrum?",
    description: "Nền tảng của phát triển phần mềm linh hoạt, chia nhỏ công việc thành các đoạn ngắn (Sprint). Khác với mô hình Thác nước (Waterfall) truyền thống, Agile/Scrum tập trung vào khả năng thích ứng với thay đổi, liên tục giao nhận giá trị và hợp tác chặt chẽ với khách hàng.",
    subItems: [
      { id: "agile-intro", title: "Giới thiệu chung" },
      { id: "agile-vs-waterfall", title: "So sánh Agile và Waterfall" },
      { id: "agile-principles", title: "4 Nguyên tắc cốt lõi" },
      { id: "agile-method-scrum", title: "Phương pháp Scrum" },
      { id: "agile-method-kanban", title: "Kanban / Lean" },
      { id: "agile-method-xp", title: "XP (Tổng quan)" },
      { id: "agile-method-aup-dad", title: "AUP & DAD" },
      { id: "agile-method-dsdm-fdd", title: "DSDM & FDD" },
      { id: "agile-method-tdd-rad", title: "TDD & RAD" }
    ],
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text)" }}>
        
        <div id="agile-intro" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3.1. Giới thiệu chung</h3>
          <p style={{ lineHeight: "1.6", marginBottom: "0.5rem" }}>
            <b>Tuyên ngôn Agile (Agile Manifesto):</b> Đánh dấu một cuộc cách mạng thay đổi hoàn toàn nguyên trạng trong cách thức lập kế hoạch, phát triển, kiểm thử và phát hành phần mềm.
          </p>
          <p style={{ lineHeight: "1.6" }}>
            <b>Sự chuyển dịch:</b> Quét sạch những giáo điều (orthodoxy) cứng nhắc bị tích tụ nhiều năm; biến các phương pháp linh hoạt (Agile) thành một bản lề, một tiêu chuẩn mới để phát triển hệ thống trong toàn ngành công nghiệp.
          </p>
          <ImgView src={AgileCycleSvg} alt="Agile Methodology" />
          <ImgView src={AgileCycle2Svg} alt="Agile Cycle" />
        </div>

        <div id="agile-vs-waterfall" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3.2. So sánh Agile và Mô hình Truyền thống (Waterfall)</h3>
          
          <h4 style={{ color: "var(--text)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>1. Nhược điểm của mô hình truyền thống (theo giai đoạn nối tiếp)</h4>
          <p style={{ lineHeight: "1.6", color: "var(--text-dim)", marginBottom: "1rem" }}>Theo truyền thống, dự án tuân thủ nghiêm ngặt theo các giai đoạn dựa trên mức độ chắc chắn về hệ thống sắp được xây dựng, nhưng lại bộc lộ những điểm yếu chí mạng:</p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            <li><b>Thiếu sự linh hoạt:</b> Hoàn toàn bị động trước các thay đổi về yêu cầu của khách hàng.</li>
            <li><b>Lãng phí thời giờ:</b> Xây dựng hàng loạt các tính năng vô giá trị mà không có ai thực sự cần đến.</li>
            <li><b>Phản hồi quá muộn màng:</b> Người dùng cuối bị bịt mắt và không thể đưa ra lời nhận xét cho tới tận khi khâu lập trình hoàn tất.</li>
            <li><b>Độ ổn định mù mờ:</b> Trừ giai đoạn bàn giao cuối cùng ra thì không mảy may biết được độ ổn định của hệ thống đến đâu.</li>
          </ul>

          <h4 style={{ color: "var(--text)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>2. Cách tiếp cận của dự án Agile</h4>
          <p style={{ lineHeight: "1.6", color: "var(--text-dim)", marginBottom: "1rem" }}>Né tránh chia rẽ theo từng giai đoạn, dự án Agile băm nhỏ chu trình phát triển:</p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)", marginBottom: "1rem" }}>
            <li><b>Cấu trúc:</b> Dự án được chia nhỏ thành các "Bản phát hành" (releases) và "Vòng lặp ngắn" (iterations).</li>
            <li><b>Sản phẩm định kỳ:</b> Tới cuối một vòng lặp, nhóm tạo ra một hệ thống có đầy đủ chức năng trơn tru và có thể tung ra vận hành ngay lập tức.</li>
            <li><b>Thích ứng yêu cầu:</b> Không cần phải đóng chặt toàn bộ yêu cầu cấu trúc hệ thống từ đầu; thay vào đó, yêu cầu được tách làm các "Câu chuyện người dùng" (User Stories), được sắp xếp độ ưu tiên và đưa lên lịch sản xuất trong từng vòng lặp.</li>
          </ul>
        </div>

        <div id="agile-principles" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3.3. Bốn Nguyên tắc cốt lõi của Agile</h3>
          <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Mọi phương pháp tinh nhạy này đều phụng sự và duy trì theo 4 tôn chỉ xương sống:</p>
          
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "1rem" }}>
            <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
              <b>1. Cá nhân và sự tương tác</b> quan trọng hơn quy trình và công cụ.
            </div>
            <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
              <b>2. Phần mềm chạy tốt</b> quan trọng hơn tài liệu đầy đủ và cồng kềnh.
            </div>
            <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
              <b>3. Cộng tác với khách hàng</b> quan trọng và mang lại giá trị hơn hợp đồng.
            </div>
            <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
              <b>4. Phản hồi với sự thay đổi</b> được đặt lên trên việc bám sát kế hoạch mù quáng.
            </div>
          </div>
          <ImgView src={AgileValuesSvg} alt="Agile Values" />
        </div>

        {/* Scrum */}
        <div id="agile-method-scrum" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.4. Phương pháp Scrum</h3>
          <p style={{ lineHeight: "1.6", color: "var(--text-dim)", marginBottom: "1.5rem" }}>Hệ sinh thái Agile vận hành nhờ một loạt các phương pháp chuyên biệt, mỗi phương pháp lại mang những bộ quy tắc và "vũ khí" riêng để giải quyết các môi trường sản xuất khác nhau. Nổi bật nhất là Scrum.</p>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Là hệ phương pháp (framework) Agile phổ biến nhất thế giới hiện nay. Scrum thiết lập một bộ quy trình, công cụ và vai trò quy chuẩn, khắc nghiệt để bảo đảm sự tập trung tuyệt đối.</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)" }}>
              <li><b>Cách duy trì:</b> Chia thời gian dự án thành các chu kỳ cực ngắn thường từ 1 đến 4 tuần gọi là các <b>Sprints</b>.</li>
              <li><b>Công cụ nổi bật:</b> Product Backlog, Sprint Backlog, Daily Scrum, Burn-down chart.</li>
              <li><b>Thế mạnh:</b> Đặc biệt tỏa sáng trong việc <b>Quản lý dự án</b> chứ không đi sâu vào code như thế nào.</li>
            </ul>
            <ImgView src={ScrumSDLC} alt="Scrum Software Dev Life Cycle" />
          </div>
        </div>

        {/* Kanban / Lean */}
        <div id="agile-method-kanban" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.5. Phương pháp Kanban / Lean</h3>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Bắt nguồn từ hệ thống tối ưu hóa dây chuyền Toyota, Kanban là một cách tiếp cận trực quan vô cùng thanh lịch.</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)" }}>
              <li><b>Luồng chảy (Flow):</b> Hệ thống được gắn các khung cột trên bảng. Công việc là các thẻ chuyển động nhịp nhàng.</li>
              <li><b>Trọng lực:</b> Sinh ra quy luật duy nhất để tránh nghẽn cổ chai: <b>Giới hạn lượng công việc đang làm (WIP)</b>. Một cột không cho phép vượt giới hạn thẻ.</li>
            </ul>
          </div>
        </div>

        {/* XP Short */}
        <div id="agile-method-xp" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.6. Extreme Programming (XP) - Tổng quan</h3>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Nếu Scrum là vỏ bọc quản lý dự án, thì XP là "Linh hồn Kỹ thuật" cực đoan của Agile.</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)", marginBottom: "1rem" }}>
              <li><b>Tuyệt kỹ cơ bản:</b> Lập trình cặp (Pair Programming), Thiết kế tinh gọn, và Tích hợp liên tục (CI).</li>
              <li><b>Đích đến:</b> Tạo ra phần mềm ít bug cực hạn, nhào nặn code vững vàng để vượt qua thay đổi. (Sẽ đi sâu trực tiếp góc nhìn Agentic AI ở mục bên dưới).</li>
            </ul>
            <ImgView src={XpLifeCycleAltSvg} alt="XP Life Cycle Alternate" />
          </div>
        </div>

        {/* AUP & DAD */}
        <div id="agile-method-aup-dad" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.7. Agile Unified Process (AUP) & Disciplined Agile Delivery (DAD)</h3>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Các phương pháp đặc thù sinh ra dành cho các tập đoàn có bộ máy nặng nền.</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)", marginBottom: "1rem" }}>
              <li><b>AUP:</b> Phiên bản cắt gọt từ RUP, duy trì tỉ mỉ các bộ mô hình hóa.</li>
              <li><b>DAD:</b> Phủ lớp tính chất Agile trải dài dọc theo toàn bộ vòng đời sản phẩm.</li>
            </ul>
            <ImgView src={DADSvg} alt="Disciplined Agile Delivery" />
            <ImgView src={DADPhasesSvg} alt="Disciplined Agile Delivery - Phases" />
          </div>
        </div>

        {/* DSDM & FDD */}
        <div id="agile-method-dsdm-fdd" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.8. DSDM & Feature-Driven Development (FDD)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.3rem", color: "var(--accent-cyan)", marginBottom: "1rem" }}>Dynamic Systems Development Method (DSDM)</h4>
              <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>DSDM tuyệt đối không nhân nhượng về Tiến độ và Lên lịch. Function sẽ phải bị hi sinh nếu muốn giữ thời hạn.</p>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-dim)", marginBottom: "1rem" }}>
                <li><b>Nguyên tắc MoSCoW:</b> (Must have, Should have, Could have, Won't have).</li>
              </ul>
              <ImgView src={DSDMSvg} alt="DSDM Iterations" />
              <ImgView src={DSDMVariablesSvg} alt="DSDM Project Variables" />
            </div>
            
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.3rem", color: "var(--accent-cyan)", marginBottom: "1rem" }}>Feature-Driven Development (FDD)</h4>
              <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Mô hình này rất hay được áp dụng ở thế giới doanh nghiệp (Enterprise). Xoay quanh Lên mô hình hệ sinh thái tổng quát, sau đó chia làm hàng ngàn mảnh vụn tính năng nhỏ để phát triển.</p>
              <ImgView src={FDDSvg} alt="Feature Development" />
            </div>
          </div>
        </div>

        {/* TDD & RAD */}
        <div id="agile-method-tdd-rad" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>3.9. TDD & Rapid Application Development (RAD)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.3rem", color: "var(--accent-cyan)", marginBottom: "1rem" }}>Test-Driven Development (TDD)</h4>
              <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}><b>Nguyên tắc Đỏ - Xanh:</b> Cố tình chạy kịch bản kiểm thử báo lỗi (Red). Sau đó viết mã nguồn sửa lỗi đó (Green). Code đập tắt rủi ro từ lúc lọt lòng.</p>
              <ImgView src={TDDLifeCycle} alt="TDD Life Cycle" />
            </div>
            
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.3rem", color: "var(--accent-cyan)", marginBottom: "1rem" }}>Rapid Application Development (RAD)</h4>
              <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>Phát triển Mẫu thử (Prototyping): Tự tay thiết kế ngay bề mặt GUI bấm chạy được, đưa cho khách nhận phản hồi và mài dũa dần ra sản phẩm.</p>
              <ImgView src={RADSvg} alt="RAD Flow" />
            </div>
          </div>
        </div>

      </div>
    )
  },
  {
    id: "theory-xp-agentic",
    title: "XP cho Agentic Coding",
    description: "Khám phá vì sao Extreme Programming là khuôn khổ tương thích nhất để giao tiếp và kiểm soát Robot lập trình AI.",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text)" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Trong kỷ nguyên Agentic AI, hệ thống <b>Extreme Programming (XP)</b> cung cấp khuôn khổ cực đoan và tương thích nhất để giao tiếp và kiểm soát Robot lập trình (AI Agents). Bằng việc chia nhỏ vòng lặp phản hồi (Feedback Loops) và duy trì TDD vô cùng kỷ luật, mã nguồn sinh ra bởi AI được định vị rủi ro sớm nhất có thể trước khi hội tụ (merge) vào nhánh chính.
        </p>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>1. Giá trị và Nguyên tắc</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>XP được định hướng dựa trên tập hợp các giá trị và nguyên tắc xuyên suốt. Các yếu tố này là nền móng để Agentic AI thấu hiểu cách thức lập trình phần mềm có giá trị cao.</p>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>2. Các thực tiễn & Vòng lặp phản hồi XP</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>Cách XP kiểm soát rủi ro thông qua việc lồng ghép nhiều bộ Feedback Loops (từ cấp độ Giây/Phút cho đến Tháng).</p>
        <ImgView src={XpPracticesSvg} alt="Các thực tiễn XP" />
        <ImgView src={XpFeedbackLoopsSvg} alt="Vòng lặp phản hồi XP" />

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>3. Mô hình Lifecycle của XP</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>Quá trình một ý tưởng chuyển biến thành code production thông qua Release Plan và Iteration Plan.</p>
        <ImgView src={XpLifecycle2Svg} alt="XP Lifecycle" />
        <ImgView src={XpLifeCycleAltSvg} alt="XP Life Cycle Alternate" />

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>4. So sánh & Đánh giá XP</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>Sự kết hợp hoàn hảo giữa phương pháp thực tiễn của XP vào thực tế để giảm thiểu chi phí sửa đổi (Cost of Change).</p>
        <ImgView src={XpMethodologySvg} alt="XP Methodology" />
        <ImgView src={XpComparisonsSvg} alt="So sánh XP" />
        <ImgView src={XpProsConsSvg} alt="Ưu nhược điểm XP" />
      </div>
    )
  },
  {
    id: "theory-safe",
    title: "Vận hành SAFe 6.0 với GSAFe?",
    description: "Scaled Agile Framework (SAFe 6.0) thiết kế các Guardrails mạnh mẽ để hàng ngàn kỹ sư cùng hoạt động như một cỗ máy. GSAFe tích hợp thêm AI Agent để giảm thiểu toàn bộ lãng phí từ hoạt động thủ công.",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text)" }}>
        
        <div id="agile-scaled" style={{ scrollMarginTop: "80px" }}>
          <h3 style={{ color: "var(--accent-teal)", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Agile ở quy mô doanh nghiệp (Scaled Agile)</h3>
          <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}><b>Scaled Agile Framework (SAFe):</b> Áp dụng Agile cho các chương trình lớn và toàn bộ tổ chức. Nguyên tắc chính: Tư duy hệ thống, cái nhìn kinh tế, và phi tập trung hóa việc ra quyết định.</p>
          <ImgView src={SAFeExplain} alt="Scaled Agile Framework Explain" />
        </div>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "1rem" }}>
          <b>SAFe 6.0</b> (Scaled Agile Framework) giải quyết bài toán lớn: Làm thế nào đồng bộ hóa các luồng công việc phức tạp trong một hệ sinh thái mà không giẫm chân lên nhau. GSAFe tinh chỉnh framework này bằng cách thêm sức mạnh tự động hóa Agentic SE, lấy vòng đời <b>Universal Beads ID</b> làm cốt lõi để duy trì ma trận trạng thái.
        </p>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>1. Lean-Agile ở cấp độ Enterprise</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>Không phải là làm Scrum với đội nhóm lớn hơn, SAFe điều hướng văn hóa doanh nghiệp sang tư duy Lean: Tôn trọng con người, ám ảnh với chất lượng (built-in quality), cắt bỏ lãng phí (waste), luân chuyển giá trị không gián đoạn (Continuous Flow).</p>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>2. Khám phá Liên tục (Continuous Exploration)</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>Trước khi viết đoạn code đầu tiên, ý tưởng phải được kiểm chứng thông qua 4 pha (Activities):</p>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
            <b style={{ color: "var(--accent-indigo)" }}>A. Hypothesize:</b> Đặt giả thuyết kinh doanh ban đầu (Epic/Vision).
          </div>
          <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
            <b style={{ color: "var(--accent-indigo)" }}>B. Collaborate & Research:</b> Thực hiện Spikes (POC) để validate giả thuyết.
          </div>
          <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
            <b style={{ color: "var(--accent-indigo)" }}>C. Architect:</b> Lên Architecture Runway & ra quyết định ADRs.
          </div>
          <div style={{ padding: "16px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
            <b style={{ color: "var(--accent-indigo)" }}>D. Synthesize:</b> Viết PRDs tổng hợp thành các Backlog Items sẵn sàng.
          </div>
        </div>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>3. Triết lý Research Spikes</h3>
        <div style={{ padding: "20px", background: "rgba(244, 63, 94, 0.05)", borderLeft: "4px solid var(--accent-rose)", borderRadius: "4px", lineHeight: "1.6" }}>
          <b style={{ display: "block", marginBottom: "8px", color: "var(--accent-rose)" }}>Nguyên tắc CE tối thượng: "Spikes before Code"</b>
          Bất cứ câu hỏi hoặc rủi ro công nghệ nào cũng cần được cô lập thành các <b>Spike Reports</b> (Nghiên cứu/POC độc lập). Hàng chục Spikes được tạo ra để tích lũy kiến thức mà không tốn chi phí phát triển logic lỗi. Chỉ sau khi kết thúc CE mới chuyển qua khâu Implementation.
        </div>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>4. Đoàn tàu Phát hành (ART) & PI Planning</h3>
        <p style={{ lineHeight: "1.6", color: "var(--text-dim)" }}>
          Nhiều Scrum Teams độc lập liên kết chặt chẽ trên một <b>Agile Release Train (ART)</b> (50-125 người). <br/><br/>
          Sự kiện then chốt là <b>PI Planning</b> (Lập kế hoạch PI) kéo dài 2 ngày: Mọi người thống nhất Tầm nhìn (Vision), cam kết mục tiêu PI (PI Objectives), bóc tách xung đột/phụ thuộc chéo nhau (Dependencies) và đưa rủi ro vào sơ đồ <b>ROAM Board</b> (Resolved, Owned, Accepted, Mitigated).
        </p>

        <h3 style={{ color: "var(--accent-rose)", fontSize: "1.4rem", marginTop: "1rem", fontWeight: 600 }}>5. Quyền hạn Điều phối Tập trung</h3>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <div style={{ padding: "20px", background: "var(--accent-indigo-dim)", borderLeft: "4px solid var(--accent-indigo)", borderRadius: "4px" }}>
            <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>🚂</span>
            <b style={{ color: "var(--accent-indigo)", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>Release Train Engineer (RTE)</b>
            <span style={{ color: "var(--text-dim)", lineHeight: "1.5" }}>Super Scrum Master cấp độ Program. Điều hướng đoàn tàu ART, loại bỏ bế tắc quy mô lớn và điều khiển PI Planning.</span>
          </div>
          <div style={{ padding: "20px", background: "var(--accent-amber-dim)", borderLeft: "4px solid var(--accent-amber)", borderRadius: "4px" }}>
            <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>🎯</span>
            <b style={{ color: "var(--accent-amber)", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>Product Management (PMO)</b>
            <span style={{ color: "var(--text-dim)", lineHeight: "1.5" }}>Người làm chủ Program Backlog (Epic/Feature). Có quyền cao nhất đánh giá mức độ ưu tiên tính năng thông qua chỉ số WSJF.</span>
          </div>
          <div style={{ padding: "20px", background: "var(--accent-emerald-dim)", borderLeft: "4px solid var(--accent-emerald)", borderRadius: "4px" }}>
            <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>🏗️</span>
            <b style={{ color: "var(--accent-emerald)", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>System Architect</b>
            <span style={{ color: "var(--text-dim)", lineHeight: "1.5" }}>Cung cấp nền móng kỹ thuật chung (Architectural Runway) giúp các đội phát triển nhanh không sợ gãy vỡ hệ thống gốc.</span>
          </div>
        </div>
      </div>
    )
  }
];
