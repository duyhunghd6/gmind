export interface PromptTemplate {
  id: string;
  name: string;
  category: "workflow" | "skill" | "agent-rule";
  description: string;
  usage: string;
  code: string;
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: "gsafe-research",
    name: "/gsafe-research",
    category: "workflow",
    description:
      "SAFe 6.0 Khám phá Liên tục — Chu trình CE 4 hoạt động. Tự động tạo Spike, thực hiện phiên nghiên cứu, và tổng hợp PRD theo pipeline: Đặt Giả thuyết → Nghiên cứu → Kiến trúc → Tổng hợp.",
    usage: "Gọi khi bắt đầu nghiên cứu mới hoặc tạo spike",
    code: `/gsafe-research

# Agent sẽ:
# 1. Kiểm tra spike hiện có tại docs/researches/spikes/
# 2. Tạo spike mới: spike-{topic}.md
# 3. Thực hiện phiên nghiên cứu (Giả thuyết → Phát hiện → Đề xuất)
# 4. Liên kết phát hiện với PRDs qua Beads ID
# 5. Đóng spike khi hoàn thành: bd close <spike-id>`,
  },
  {
    id: "gsafe-showcase",
    name: "/gsafe-showcase-website",
    category: "workflow",
    description:
      "Quy trình PI Planning & Triển khai cho Website Showcase Gmind. Điều phối phát triển Next.js trong monorepo, tuân thủ Design System đã chia sẻ và chuẩn thẩm mỹ Blueprint.",
    usage: "Gọi khi phát triển hoặc cập nhật website showcase",
    code: `/gsafe-showcase-website

# Các bước quy trình:
# 1. Khởi tạo/kiểm tra dự án Next.js tại apps/website/
# 2. Tích hợp tokens từ packages/design-system/
# 3. Xây dựng trang route với UI cao cấp
# 4. Kiểm tra build: pnpm run build
# 5. Tạo walkthrough.md`,
  },
  {
    id: "gmind-search-codebase",
    name: "gmind search-codebase",
    category: "agent-rule",
    description:
      'Bộ điều phối thống nhất cho Trí tuệ Mã nguồn. Agent CHỈ gọi lệnh này — gmind tự động ủy quyền cho FastCode (AST + Graph RAG + BM25). Giải quyết vấn đề "mất trí nhớ cục bộ" khi AI agent mất ngữ cảnh cấu trúc.',
    usage: "Agent phải gọi trước khi sửa bất kỳ code nào",
    code: `# Agent BẮT BUỘC gọi trước khi thay đổi code:
gmind search-codebase "auth middleware hoạt động thế nào?"

# Luồng nội bộ (ẩn với agent):
# 1. Kiểm tra fastcode binary (exec.LookPath)
# 2. Tự động index nếu cần: fastcode index --no-embeddings .
# 3. Truy vấn: fastcode query --repo . "<query>"
# 4. Trả về ngữ cảnh AST + Graph có cấu trúc

# Cờ tuỳ chọn:
gmind search-codebase "<query>" --force-reindex  # Bỏ qua cache
gmind search-codebase "<query>" --json           # Xuất JSON`,
  },
  {
    id: "gmind-context",
    name: "gmind context",
    category: "agent-rule",
    description:
      "Lấy ngữ cảnh toàn diện cho một task Beads — kết hợp trạng thái FrankenSQLite, tài liệu/lịch sử chat Zvec, và tuỳ chọn trí tuệ mã nguồn. Cờ --depth kiểm soát mức độ chi tiết để tối ưu token.",
    usage: "Agent gọi để hiểu đầy đủ task trước khi thực thi",
    code: `# Ngữ cảnh đầy đủ (mặc định):
gmind context br-123 --depth 0
# → Mô tả task + Code + Lịch sử chat + Tài liệu

# Ngữ cảnh tối thiểu (chỉ mô tả):
gmind context br-123 --depth 1
# → Chỉ mô tả task, bỏ qua chat logs

# Kèm dữ liệu GitHub:
gmind context br-123 --depth 0 --github
# → + Commits, trạng thái PR, kết quả CI`,
  },
  {
    id: "gmind-trace",
    name: "gmind trace",
    category: "agent-rule",
    description:
      "Truy vấn Đồ thị Tri thức — duyệt Knowledge Graph Beads xuyên 5+ nguồn dữ liệu (FrankenSQLite, Git, Zvec, GitHub, YAML). Xây đồ thị con liên kết tại thời điểm truy vấn, không lưu dữ liệu trùng lặp.",
    usage: "Truy vết toàn bộ lịch sử của bất kỳ thực thể Beads nào",
    code: `# Truy vết đầy đủ của một task:
gmind trace bd-x1y2
# → implements: br-plan-42
#   → satisfies: br-prd01-s4.2
#     → context: chat-session-23 (Zvec)
#   → commits (3): a1b2c3d, e4f5g6h, i7j8k9l
#   → PRs (1): #42 [đã merge] ✅ CI thành công
#   → task liên quan: bd-a1b2 [đóng], bd-c3d4 [mở]

# Truy vết ngược:
gmind trace bd-x1y2 --reverse
# → Task → Plan Element → PRD Section`,
  },
  {
    id: "beads-commit",
    name: "Quy ước Git Commit",
    category: "agent-rule",
    description:
      "Mọi commit BẮT BUỘC có Beads-ID: Git Trailer. Điều này liên kết commit với Beads task, cho phép theo dõi phổ quát và duyệt Knowledge Graph. GitHub Autolinks tự chuyển br-xxx thành link nhấp được.",
    usage: "Agent phải tuân thủ cho mọi git commit",
    code: `# Conventional Commits + Beads Trailer:
git commit -m "feat(storage): triển khai MVCC layer" \\
  --trailer "Beads-ID: br-a1b2"

# Nhiều tham chiếu:
git commit -m "fix(ui): căn chỉnh icon trên mobile" \\
  --trailer "Beads-ID: bd-x1y2" \\
  --trailer "Refs: br-plan-42"

# Truy vấn commit theo Beads ID:
git log --all --grep='Beads-ID: br-a1b2'`,
  },
  {
    id: "file-locking",
    name: "Khoá Tệp (Lease Timeout)",
    category: "agent-rule",
    description:
      'Đặt chỗ tệp qua MCP với tự động giải phóng Lease Timeout 15 phút. Ngăn xung đột ghi đa agent. Web UI hiển thị Cảnh báo Lease Timeout (nhấp nháy đỏ) để Human can thiệp khi agent "chết lâm sàng".',
    usage: "Agent phải khoá tệp trước khi sửa trong kịch bản đa agent",
    code: `# Khoá tệp trước khi chỉnh sửa:
mcp_agent_mail file_reservation \\
  --file="internal/storage/mvcc.go" \\
  --reason="br-123" \\
  --lease-timeout=15m

# Giải phóng sau khi hoàn thành:
mcp_agent_mail file_release \\
  --file="internal/storage/mvcc.go"

# Tự động giải phóng sau 15 phút nếu agent gặp sự cố`,
  },
  {
    id: "four-eyes",
    name: "Nguyên tắc Bốn Mắt",
    category: "agent-rule",
    description:
      'Sub-agent Code viết mã nhưng KHÔNG THỂ đóng task. Sub-agent Reviewer có quyền br close độc quyền. Sự tách biệt này đảm bảo "người viết ≠ người duyệt" — phản ánh quản lý thay đổi doanh nghiệp.',
    usage: "Được thực thi bởi phân quyền vai trò beads_rust",
    code: `# Sub-agent Code (KHÔNG THỂ đóng task):
# ✅ Có thể: sửa code, chạy test, khoá tệp
# ❌ Không thể: br close, phê duyệt merge, leo thang

# Sub-agent Reviewer (CÓ THỂ đóng task):
# ✅ Có thể: br close, phê duyệt merge, leo thang
# ✅ Có thể: review code, kiểm tra kết quả test

# Quy trình:
# 1. Code Agent → viết code + tests
# 2. Code Agent → br update bd-123 --status review_requested
# 3. Reviewer Agent → review, kiểm tra CI
# 4. Reviewer Agent → br close bd-123`,
  },
];
