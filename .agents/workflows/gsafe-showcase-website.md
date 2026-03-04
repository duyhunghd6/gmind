---
description: SAFe 6.0 Workflow for Gmind Showcase Website Development
---

# /gsafe-showcase-website — Development Workflow

> **SAFe 6.0 Phase 2: PI Planning & Implementation**
> Mục đích: Xây dựng Website Showcase (`gmind.gscfin.com`) để trình diễn các kiến trúc cốt lõi của Monorepo: Code Intelligence, Universal Tracking, RTM, và Ecosystem.
> Tham chiếu: `docs/PRDs/apps-website/` (nếu có), hoặc kiến trúc thiết kế `docs/design/gmind-monorepo-website.html`.

---

## 1. Yêu cầu Cốt lõi của Website

Website không chỉ là landing page tĩnh mà còn là **Kho tư liệu tương tác (Interactive Hub)** để các lập trình viên khác học hỏi, copy prompts và hiểu nguyên lý Agentic SE.

**3 Trụ cột BẮT BUỘC hiển thị trên UI:**

1. **Universal Tracking (Beads-ID Lineage):** Hiển thị luồng dữ liệu minh họa từ PRD → Task → Code Commit → Test Results. (Giải thích nguyên lý JSONL sync của FrankenSQLite).
2. **Prompts & Workflows Factory:** Một section riêng cho phép user tham khảo các Prompt Templates cực tốt của Gmind (ví dụ: `gsafe-research`, `architect-review`). Có nút "Copy to Clipboard" cho 1-click apply.
3. **The 5-Layer AI Architecture:** Trình diễn cách gmind-CLI điều phối các Agent Layer 1, 2, 3 bằng sơ đồ tĩnh hoặc hoạt ảnh (GSAP/Framer Motion).

## 2. Tiêu chuẩn Kỹ thuật (Tech Stack)

- **Framework:** Next.js (App Router, SSG output để deploy Vercel).
- **Styling:** Tailwind CSS hoặc Vanilla CSS theo chuẩn `agenticse-design-system`. Ưu tiên giao diện Blueprint/Sci-Fi (Vibrant colors, dark mode, glassmorphism) như bản HTML mockup.
- **Biên dịch:** Sử dụng `pnpm` trong thư mục `apps/website/` kết nối với `Turborepo` root.
- **Data Layer:** Tách phần Prompts Template thành JSON/Markdown collections để dễ map/render components.
- **Ngôn ngữ hiển thị:** 🇻🇳 **TOÀN BỘ nội dung UI phải viết bằng tiếng Việt.** Chỉ dùng tiếng Anh cho tên kỹ thuật (CLI commands, tên biến, tên package) và code snippets. Headings, descriptions, labels, buttons, SEO metadata — tất cả phải bằng tiếng Việt.

## 3. Workflow Implementation Steps

// turbo-all

Các bước Agent cần tự động thực thi khi Human gọi lệnh `/gsafe-showcase-website`:

### Step 1: Khởi tạo Base Project (Nếu chưa có)

```bash
# Di chuyển vào đúng namespace
cd apps/website/

# Khởi tạo Next.js (bỏ qua nếu đã có package.json)
# Using 'npx -y create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm'
```

### Step 2: Khởi tạo Design System (packages/design-system)

Showcase Website không được nhồi nhét CSS loạn xạ. Cần tuân thủ cấu trúc của Monorepo:

1. Tạo thư mục `packages/design-system/` nếu chưa có.
2. Khởi tạo `package.json` cho design system để chia sẻ Tailwind config và CSS Variables.
3. Liên kết `apps/website/package.json` với `packages/design-system` qua `pnpm` workspace protocol (`workspace:*`).

### Step 3: Integrate Design System Mẫu

Sử dụng form mẫu thiết kế từ `docs/design/gmind-monorepo-website.html` để ánh xạ vào:

- Cấu hình CSS global (`src/app/globals.css`).
- Tailwind config / CSS Variables (Deep Slate/Blue, Cyan/Teal accents).
- Setup layout gốc (`src/app/layout.tsx`).

### Step 4: Xây dựng Cấu trúc Trang (Routes)

Tạo cấu trúc App Router:

- `src/app/page.tsx` (Hero Section + 4 Trụ cột cốt lõi).
- `src/app/prompts/page.tsx` (Trang chuyên biệt lưu trữ Prompt Templates + Copy button).
- `src/app/architecture/page.tsx` (Giải thích chi tiết Universal Tracking và FastCode AST).

### Step 5: Coding Components (Tối ưu UI/UX)

Yêu cầu Agent tuân thủ tính thẩm mỹ "Premium":

- Tránh nền trắng nhàm chán; sử dụng lưới Blueprint (Blueprint Grid Background).
- Micro-animations (Hover states, fade-in khi scroll lên).
- Code highlight box cho Prompts với nút "Copy" trực quan.

### Step 6: Verification & Review

Chạy thử build cục bộ dưới dạng `next build` bằng `pnpm` workspace để kiểm chứng Monorepo tích hợp đúng.
Sau khi hoàn thành, tạo `Walkthrough.md` và Notify Human.

---

## Output Mong Đợi (Definition of Done)

- [ ] Design System được tạo lập độc lập tại `packages/design-system/` và liên kết với website.
- [ ] Dự án Next.js nằm gọn trong `apps/website/`.
- [ ] Render thành công trang chủ với giao diện chuẩn Sci-fi Blueprint.
- [ ] Section `Prompts & Workflows` hoạt động với nút Copy.
- [ ] Section `Universal Tracking` được giải thích bằng UI timeline/diagram.
- [ ] Không có lỗi build/lint khi chạy từ `turborepo`.

---

## 7. Design System ID Convention (DS ID)

Mọi thành phần trong Design System đều có **ID duy nhất** hiển thị trực tiếp trên UI, cho phép agents và users tham chiếu nhanh khi debugging.

### Format

```
ds:<type>:<name-NNN>
```

| Type     | Ví dụ                    | Áp dụng cho            |
| -------- | ------------------------ | ---------------------- |
| `hub`    | `ds:hub:overview-001`    | Hub page               |
| `screen` | `ds:screen:terminal-001` | Các trang showcase     |
| `comp`   | `ds:comp:button-001`     | Components tái sử dụng |
| `token`  | `ds:token:colors-001`    | Design tokens          |
| `layout` | `ds:layout:grid-001`     | Layout patterns        |
| `state`  | `ds:state:matrix-001`    | State matrix           |
| `flow`   | `ds:flow:explore-001`    | User flows             |

### Files quan trọng

- **Registry:** `apps/website/src/data/ds-registry.ts` — Source of truth cho tất cả IDs
- **Badge Component:** `apps/website/src/components/DsIdBadge.tsx` — UI component hiển thị ID
- **Badge CSS:** `packages/design-system/components/ds-id-badge.css`

### Quy tắc khi thêm element mới

1. Thêm entry vào `DS_REGISTRY` trong `ds-registry.ts`
2. Nếu là screen, thêm vào `SCREEN_ID_MAP`
3. Sử dụng `<DsIdBadge id="ds:..." />` trong component JSX
4. Tăng số NNN (ví dụ: `002`, `003`) cho cùng type+name
