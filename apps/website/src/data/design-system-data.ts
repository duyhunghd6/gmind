/* ───────────── Design System Showcase Data ───────────── */

export const colorTokens = [
  { name: "--bg", value: "#0b1121", label: "Nền chính" },
  { name: "--surface", value: "#131c2f", label: "Bề mặt" },
  { name: "--surface-elevated", value: "#1e293b", label: "Bề mặt nổi" },
  { name: "--text", value: "#f8fafc", label: "Chữ chính" },
  { name: "--text-dim", value: "#94a3b8", label: "Chữ mờ" },
  { name: "--accent-cyan", value: "#0ea5e9", label: "Nhấn Cyan" },
  { name: "--accent-teal", value: "#14b8a6", label: "Nhấn Teal" },
  { name: "--accent-amber", value: "#f59e0b", label: "Nhấn Amber" },
  { name: "--accent-rose", value: "#f43f5e", label: "Nhấn Rose" },
];

export const spacingTokens = [
  { name: "--space-xs", value: "4px" },
  { name: "--space-sm", value: "8px" },
  { name: "--space-md", value: "16px" },
  { name: "--space-lg", value: "24px" },
  { name: "--space-xl", value: "40px" },
  { name: "--space-2xl", value: "60px" },
];

export const typographyTokens = [
  { name: "--font-body", value: '"DM Sans", system-ui, sans-serif', sample: "Aa Bb Cc 123" },
  { name: "--font-mono", value: '"Fira Code", monospace', sample: "const x = 42;" },
];

export const animationTokens = [
  { name: "fadeUp", duration: "600ms", easing: "ease-out", usage: "Hiệu ứng vào trang" },
  { name: "fadeIn", duration: "400ms", easing: "ease-out", usage: "Xuất hiện mờ dần" },
  { name: "slideInRight", duration: "500ms", easing: "ease-out", usage: "Trượt từ phải" },
  { name: "pulse-glow", duration: "3000ms", easing: "infinite", usage: "Chấm nhấp nháy navbar" },
];

export const stateMatrix = [
  {
    component: "PillarCard",
    states: {
      "Mặc định": "Nền --surface, viền --border, viền trái accent",
      "Di chuột": "Viền sáng, translateY(-2px), đổ bóng",
      "Nhấn/Sao chép": "—",
    },
  },
  {
    component: "CodeBlock",
    states: {
      "Mặc định": "Nền tối, chữ mono, viền --border",
      "Di chuột": "—",
      "Nhấn/Sao chép": "Nút → ✓ Đã sao chép (2 giây), màu --accent-teal",
    },
  },
  {
    component: "NavLink",
    states: {
      "Mặc định": "Chữ --text-dim, gạch chân 0%",
      "Di chuột": "Chữ --text, gạch chân 0→100%",
      "Nhấn/Sao chép": "Gạch chân 100%, màu --accent-cyan (trang hiện tại)",
    },
  },
  {
    component: "PromptCard",
    states: {
      "Mặc định": "Nền --surface, gradient trên ẩn",
      "Di chuột": "Viền sáng, translateY(-3px), gradient xuất hiện",
      "Nhấn/Sao chép": "scale(0.98), viền --accent-cyan, glow cyan / Disabled: opacity 0.5",
    },
  },
  {
    component: "ArchLayer",
    states: {
      "Mặc định": "Nền --surface, viền --border, số lớp mờ",
      "Di chuột": "Viền sáng, đổ bóng glow cyan",
      "Nhấn/Sao chép": "Viền --accent-cyan, glow mạnh / Disabled: opacity 0.5",
    },
  },
  {
    component: "Button",
    states: {
      "Mặc định": "Primary: nền cyan / Secondary: viền / Danger: viền rose",
      "Di chuột": "Primary: sáng hơn + glow / Secondary: nền surface / Danger: nền rose dim",
      "Nhấn/Sao chép": "scale(0.97), shadow đậm hơn / Disabled: opacity 0.45",
    },
  },
  {
    component: "Badge",
    states: {
      "Mặc định": "Pill mono — nền accent-dim, viền accent, chữ accent",
      "Di chuột": "—",
      "Nhấn/Sao chép": "—",
    },
  },
  {
    component: "Tooltip",
    states: {
      "Mặc định": "Ẩn (opacity 0, translateY 4px)",
      "Di chuột": "opacity 1, translateY 0, mũi tên chỉ hướng",
      "Nhấn/Sao chép": "—",
    },
  },
];

export const userFlows = [
  {
    name: "Luồng 1: Khám phá",
    path: "Trang chủ → Đọc 4 Trụ cột → Xem Kiến trúc 5+1 → Nhấn Kiến trúc",
    icon: "🧭",
  },
  {
    name: "Luồng 2: Sao chép Prompt",
    path: "Trang chủ → Prompts → Duyệt Quy trình/Quy tắc → Nhấn Sao chép",
    icon: "📋",
  },
  {
    name: "Luồng 3: Nghiên cứu",
    path: "Trang chủ → Nghiên cứu → Xem PRDs → Duyệt Spike (hoàn thành/đang chờ)",
    icon: "🔬",
  },
  {
    name: "Luồng 4: Khách GitHub",
    path: "GitHub README → gmind.gscfin.com → Hiểu nhanh 4 Trụ cột → Sao chép prompt",
    icon: "🐙",
  },
];
