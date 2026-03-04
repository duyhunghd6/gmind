/* ─── Doc Viewer Mock Data ─── */

export interface DocFile {
  id: string;
  name: string;
  type: "folder" | "file";
  beadsId?: string;
  children?: DocFile[];
}

export interface DocContent {
  id: string;
  title: string;
  beadsId: string;
  sections: {
    anchor: string;
    title: string;
    beadsId: string;
    content: string;
    status?: "covered" | "partial" | "gap";
  }[];
}

export const docTree: DocFile[] = [
  {
    id: "prds", name: "PRDs", type: "folder", children: [
      { id: "prd-01", name: "PRD-01-Overview.md", type: "file", beadsId: "br-prd01" },
      { id: "prd-02", name: "PRD-02-Storage.md", type: "file", beadsId: "br-prd02" },
      { id: "prd-03", name: "PRD-03-CLI-Workflow.md", type: "file", beadsId: "br-prd03" },
    ],
  },
  {
    id: "architecture", name: "architecture", type: "folder", children: [
      { id: "arch-main", name: "Architecture.md", type: "file", beadsId: "br-arch-01" },
      {
        id: "adr-folder", name: "adr", type: "folder", children: [
          { id: "adr-001", name: "ADR-001-storage-choice.md", type: "file", beadsId: "br-adr-001" },
          { id: "adr-002", name: "ADR-002-github-integration.md", type: "file", beadsId: "br-adr-002" },
          { id: "adr-003", name: "ADR-003-code-intelligence.md", type: "file", beadsId: "br-adr-003" },
        ],
      },
    ],
  },
  {
    id: "researches", name: "researches", type: "folder", children: [
      {
        id: "spikes", name: "spikes", type: "folder", children: [
          { id: "spike-1", name: "spike-frankensqlite-vs-doltdb.md", type: "file", beadsId: "br-spike-001" },
          { id: "spike-2", name: "spike-github-integration.md", type: "file", beadsId: "br-spike-002" },
          { id: "spike-3", name: "spike-fastcode-cli-integration.md", type: "file", beadsId: "br-spike-003" },
          { id: "spike-4", name: "spike-beads-id-in-docs.md", type: "file", beadsId: "br-spike-004" },
          { id: "spike-5", name: "spike-zvec-indexer-pipeline.md", type: "file", beadsId: "br-spike-005" },
        ],
      },
    ],
  },
  {
    id: "requirements", name: "requirements", type: "folder", children: [
      { id: "vision", name: "Vision.md", type: "file", beadsId: "br-vision-01" },
    ],
  },
];

export const docContents: Record<string, DocContent> = {
  "prd-01": {
    id: "prd-01",
    title: "PRD 01: Giới thiệu & Tổng quan Hệ thống",
    beadsId: "br-prd01",
    sections: [
      {
        anchor: "1-boi-canh",
        title: "1. Bối cảnh & Vấn đề",
        beadsId: "br-prd01-s1",
        status: "covered",
        content: "Trong quá trình vận hành các đội ngũ AI đa tác nhân, các tác nhân thường rơi vào trạng thái \"mất trí nhớ cục bộ\" do RAG thiếu cấu trúc, trạng thái phân mảnh, lãng phí Token, và xung đột đa tác nhân.",
      },
      {
        anchor: "2-kien-truc",
        title: "2. Tổng quan Hệ thống",
        beadsId: "br-prd01-s2",
        status: "covered",
        content: "Hệ thống gmind phân tách 5 lớp: Dữ liệu (Storage — beads_rust/FrankenSQLite + Zvec), Giao thức (CLI), Thực thi (Agents), Xác minh (CI/CD), Trình bày (Go REST API).",
      },
      {
        anchor: "3-verification",
        title: "3. Lớp Xác minh CI/CD",
        beadsId: "br-prd01-s3",
        status: "covered",
        content: "AI Agent không thể tự ý đánh dấu Task Completion nếu Test chưa chạy pass. Bắt buộc đẩy code qua Verification Node trước khi được phép gọi br close.",
      },
      {
        anchor: "4-presentation",
        title: "4. Kiến trúc Giao diện Người dùng",
        beadsId: "br-prd01-s4",
        status: "partial",
        content: "Web UI giao tiếp qua Go REST API (embedded FrankenSQLite). Bao gồm: Portfolio View (CEO/CTO), ART View (RTE/PMO), Team View (Feature Team), PI Planning Interactive UI.",
      },
    ],
  },
  "prd-02": {
    id: "prd-02",
    title: "PRD 02: Lớp Lưu trữ & Chiến lược Định danh",
    beadsId: "br-prd02",
    sections: [
      {
        anchor: "1-storage",
        title: "1. Lớp Lưu trữ: Kiến trúc Hybrid SSOT",
        beadsId: "br-prd02-s1",
        status: "covered",
        content: "beads_rust + FrankenSQLite: In-process MVCC, JSONL git-friendly sync. Zvec: Docs & Chat History. FastCode: Code Intelligence (internal dependency).",
      },
      {
        anchor: "2-pm-fields",
        title: "2. Quản lý Project Tasks (PM Custom Fields)",
        beadsId: "br-prd02-s2",
        status: "covered",
        content: "First-class SQL columns thay JSON blob. PM metadata (assignee, priority, qa_status) là cột indexed, type-safe, queryable trực tiếp.",
      },
      {
        anchor: "3-tracking",
        title: "3. Universal Tracking Strategy",
        beadsId: "br-prd02-s3",
        status: "partial",
        content: "Beads ID là Primary Key xuyên suốt mọi layer. Section-level IDs (br-prd02-s1), dependency link types (satisfies, implements), RTM 3-layer model.",
      },
      {
        anchor: "4-sync",
        title: "4. Chiến lược Đồng bộ & Dọn Rác",
        beadsId: "br-prd02-s4",
        status: "gap",
        content: "Lazy Cleanup: beads_rust là SSOT, Zvec data orphan được dọn qua polling events table. Memory Compaction cho chat logs.",
      },
      {
        anchor: "5-github",
        title: "5. GitHub Sync Strategy",
        beadsId: "br-prd02-s5",
        status: "covered",
        content: "Local-first. docs/, .beads/issues.jsonl, src/ → git-tracked. FrankenSQLite DB, Zvec, FastCode cache → local-only (rebuild-able).",
      },
    ],
  },
  "adr-001": {
    id: "adr-001",
    title: "ADR-001: FrankenSQLite chosen over DoltDB",
    beadsId: "br-adr-001",
    sections: [
      {
        anchor: "context",
        title: "Context",
        beadsId: "br-adr-001-s1",
        content: "Cần chọn SSOT storage cho multi-agent PM system. Yêu cầu: MVCC concurrent writes, git-friendly sync, first-class SQL.",
      },
      {
        anchor: "decision",
        title: "Decision",
        beadsId: "br-adr-001-s2",
        content: "Chọn FrankenSQLite: In-process (5-8MB binary), page-level MVCC, JSONL git sync. DoltDB bị reject: 30MB+ binary, cần server process.",
      },
      {
        anchor: "consequences",
        title: "Consequences",
        beadsId: "br-adr-001-s3",
        content: "Positive: Zero-network latency, single VCS (git), type-safe columns. Negative: Cần implement JSONL export/import migration tool.",
      },
    ],
  },
};
