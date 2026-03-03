# Spike: Document Lifecycle in SAFe 6.0 (Docs Journey)

**Beads ID:** (pending)
**Tác giả:** Researcher Agent + Human (Steve)
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- Tài liệu (\*.md files) trong SAFe 6.0 Agentic có vòng đời rõ ràng: được lên kế hoạch → viết → phê duyệt → tham chiếu → tạo ra PRDs → decompose thành Beads tasks
- Source of truth cho docs = **filesystem** (git-tracked `docs/`), Zvec chỉ dùng cho semantic search
- PM Web cần API endpoints để view/search/render docs

## Research Sessions

### Session 1 (2026-02-28)

**Findings:**

#### A. Vai trò chính xác của Zvec trong docs

Zvec **CHỈ dùng cho semantic search** — index nội dung `*.md` để phục vụ `gmind search <query>`.
Zvec **KHÔNG phải** nơi lưu trữ hay phục vụ đọc tài liệu trực tiếp.

```
Source of truth cho docs = filesystem (docs/ folder), tracked bởi git.
Zvec = search index only.
```

#### B. Docs Journey — Vòng đời tài liệu đầy đủ

```
+------------------------------------------------------------------+
|              PHASE 1: CONTINUOUS EXPLORATION                     |
|                                                                  |
|  1. IDEA (Human)                                                 |
|     +-- bd create "Epic: <name>" --> assign Beads ID             |
|                                                                  |
|  2. RESEARCH (PMO -- Activity B)                                 |
|     +-- Write: docs/researches/spikes/spike-{topic}.md           |
|     +-- Write: docs/researches/*.md (reference materials)        |
|     +-- Each spike has Beads ID, multi-session if needed         |
|     +-- NO separate approval per spike                           |
|                                                                  |
|  3. ARCHITECTURE (Architect -- Activity C)                       |
|     +-- Write: docs/architecture/Architecture.md (9 sections)    |
|     +-- Write: docs/architecture/adr/ADR-XXX-*.md                |
|     +-- Reference from spike reports + PRDs                      |
|                                                                  |
|  4. SYNTHESIZE (PMO + Architect -- Activity D)                   |
|     +-- Write: docs/requirements/Vision.md                       |
|     +-- Write: docs/PRDs/PRD-XX-*.md                             |
|     +-- PRDs REFERENCE back to spike reports + Beads Epics       |
|     +-- [!!] Level 3 Human Approval Gate (ONLY HERE)             |
|                                                                  |
|  5. TASK DECOMPOSITION (PMO --> Beads)                           |
|     +-- PRDs --> bd create "Feature: ..." --parent <epic-id>     |
|     +-- Features --> bd create "Story: ..." --parent <feat-id>   |
|     +-- Each Beads ID links back to PRD section                  |
+-------------------------------+----------------------------------+
                                |
                                | Human Approve
                                v
+------------------------------------------------------------------+
|              PHASE 2: CONTINUOUS INTEGRATION                     |
|                                                                  |
|  6. EXECUTION (Dev Agents)                                       |
|     +-- bd ready --> pick task --> code --> commit "[bd-XXX] msg"|
|     +-- Bug out of scope --> bd create "Bug: ..." --discovered   |
|                                                                  |
|  7. SPRINT REPORTS (SM Agent)                                    |
|     +-- docs/reports/sprints/sprint-{team}-{date}.md             |
|     +-- docs/reports/sprints/retro-{team}-{date}.md              |
|     +-- Retro --> bd create "Improvement: ..." --tag=improvement |
+-------------------------------+----------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|              PHASE 3-4: DEPLOY & PI BOUNDARY                     |
|                                                                  |
|  8. QA/AUDIT (QA Agents)                                         |
|     +-- docs/reports/qa-report.md                                |
|     +-- Bugs --> bd create "Bug: ..."                            |
|                                                                  |
|  9. PI REVIEW & ARCHIVE (RTE)                                    |
|     +-- docs/reports/pi/pi-{N}-review-{date}.md                  |
|     +-- PMO Archive: Vision.md --> archive/Vision-v1.0-PI1.md    |
|     +-- PMO Update: new PRDs for next PI                         |
|     +-- Return to CE Phase --> new cycle                         |
+------------------------------------------------------------------+
```

#### C. Cấu trúc docs/ trên filesystem

```
docs/
├── requirements/
│   ├── Vision.md                    ← Latest version
│   └── archive/
│       ├── Vision-v1.0-PI1.md
│       └── PRD-v1.0-PI1.md
├── PRDs/
│   ├── PRD-01-Overview.md
│   ├── PRD-02-Storage.md
│   └── PRD-03-CLI-and-Workflow.md
├── architecture/
│   ├── Architecture.md              ← 9 sections
│   └── adr/
│       └── ADR-001-storage-choice.md
├── researches/
│   ├── spikes/                      ← Spike reports (CE Activity B)
│   │   ├── spike-frankensqlite-vs-doltdb.md
│   │   ├── spike-roles-in-SAFe.md
│   │   └── spike-docs-in-SAFe.md
│   ├── SAFe 6.0 Framework/*.md      ← Reference materials
│   └── *.md                         ← Other research notes
├── reports/
│   ├── sprints/
│   │   ├── sprint-{team}-{date}.md
│   │   └── retro-{team}-{date}.md
│   └── pi/
│       └── pi-{N}-review-{date}.md
├── traceability/
│   └── bug-trace-log.md
└── STATUS.md                        ← Dashboard (duy nhất)
```

#### D. Document Linking Model — Beads ID làm Primary Key

```
REFERENCE TYPE             EXAMPLE                                 DIRECTION
─────────────────────────  ───────────────────────────────────────  ─────────────
Epic --> Spike              bd-epic-01 --> spike-*.md                Forward
Spike --> PRD               spike findings --> PRD-01 Section X      Forward
PRD --> Architecture        PRD-02 --> Architecture.md Section 1     Forward
Architecture --> Tasks      Architecture --> bd create "Feature"     Forward
Task --> Code               bd-a3f8 --> git commit "[bd-a3f8]"      Forward
Bug --> Task (reverse)      Bug --> --discovered-from bd-a3f8        Backward
Sprint Report --> Tasks     sprint-*.md --> list bd-101, bd-103      Aggregation
PI Review --> Sprints       pi-1-review --> index sprint reports     Aggregation
```

#### E. Giải pháp View Docs trong PM Web

PM Web (phân hệ web duy nhất) bao gồm backend API:

```
API ENDPOINT                     SOURCE            PURPOSE
───────────────────────────────  ────────────────  ───────────────────────────────────
GET /api/docs/tree                filesystem scan   Sidebar navigation (doc tree)
GET /api/docs/render?path=...    os.ReadFile       Goldmark --> HTML (rendered view)
GET /api/docs/raw?path=...       os.ReadFile       Raw markdown (editor/download)
GET /api/docs/meta?path=...      git log           Git history, Beads ID links
GET /api/docs/refs?beads_id=...  grep in docs/     Cross-ref: all docs mention ID
GET /api/docs/search?q=...       Zvec query        Semantic search
```

Key design decisions:

1. Source of truth = **filesystem** (git-tracked `docs/`), KHÔNG phải Zvec hay DB
2. **Goldmark** server-side rendering (nhất quán với beads_viewer reference)
3. Zvec chỉ search — index docs/, KHÔNG serve content
4. Beads ID parsing — extract `br-XXX` từ markdown → tạo cross-ref links
5. Git integration — mỗi doc hiển thị git log, commit lineage

**Open Items:**

- (None — research complete)

## Recommendation

1. **Document lifecycle theo SAFe 6.0 CE 4-activity model** — đã thống nhất
2. **Spike reports thay thế iteration reports** — đã áp dụng
3. **Zvec = search only**, filesystem = source of truth
4. **Go REST API + Goldmark** cho markdown rendering trong PM Web
5. **Beads ID** là primary key xuyên suốt mọi tài liệu

## Decision

Đã thống nhất với Human (2026-02-28):

- ✅ Spike model thay iteration report model
- ✅ `docs/researches/spikes/` là folder chính cho research
- ✅ Human approval chỉ 1 lần ở cuối CE (Activity D: Synthesize)
- ✅ PM Web dùng Goldmark server-side rendering cho \*.md viewing
- ✅ Zvec chỉ dùng cho semantic search, không serve content
