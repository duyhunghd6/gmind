# Spike: GitHub Ecosystem Integration for gmind

**Beads ID:** (pending)
**Tác giả:** Researcher Agent
**Phase:** Continuous Exploration — Activity B (Collaborate & Research)

## Hypothesis

- GitHub không chỉ là nơi lưu code mà là **hệ sinh thái hoàn chỉnh** (Issues, PRs, Actions, Checks, Releases, Packages) có thể tận dụng cho gmind
- Beads ID (`br-XXX`) có thể trở thành **universal key** liên kết mọi thứ: commits → Actions runs → test results → PRs → issues
- gmind có thể **đọc ngược** từ GitHub API để truy xuất lịch sử, enrichment context cho agents
- Ảnh hưởng của GitHub: thay đổi cách gmind lưu trữ, truy vấn, và hiển thị dữ liệu trên PM Web

## Research Sessions

### Session 1 (2026-02-28)

**Findings:**

#### A. GitHub Autolinks — Biến `br-XXX` thành clickable links tự động

GitHub hỗ trợ **Autolink References** — tự động biến prefix + ID thành link đến hệ thống bên ngoài.

**Cấu hình:**

```
Repository Settings → Integrations → Autolink references
  Reference prefix: br-
  Target URL: https://gmind.example.com/issues/<num>
  Format: Alphanumeric
```

**Kết quả:** Mọi nơi trên GitHub (commit messages, PR descriptions, issue comments) khi nhắc `br-a1b2` sẽ tự động trở thành link clickable đến gmind PM Web.

**API tương ứng (REST):**

```
POST /repos/{owner}/{repo}/autolinks
{
  "key_prefix": "br-",
  "url_template": "https://gmind.example.com/issues/<num>",
  "is_alphanumeric": true
}
```

> **Đánh giá:** ✅ Zero-effort, cấu hình 1 lần cho mỗi repo. Đây là bridge đơn giản nhất giữa GitHub ↔ gmind.

---

#### B. Commit Message Convention — Gắn Beads ID vào commits

**Hiện tại PRD-03 quy định:** `#br-123` trong commit message. Cần chuẩn hóa thêm.

**Đề xuất Conventional Commits + Git Trailers:**

```
feat(storage): implement FrankenSQLite MVCC layer

Implement page-level MVCC for concurrent agent writes.
Tested with 10 parallel writers, no data corruption.

Beads-ID: br-a1b2
Closes: br-c3d4
Refs: br-e5f6, br-g7h8
```

**Giải thích cấu trúc:**

| Phần                | Mục đích                                    |
| ------------------- | ------------------------------------------- |
| `feat(storage):`    | Conventional Commits — type + scope         |
| Body                | Mô tả chi tiết                              |
| `Beads-ID: br-a1b2` | Git Trailer — task đang thực hiện (primary) |
| `Closes: br-c3d4`   | Trailer — đóng task khi merge               |
| `Refs: br-e5f6`     | Trailer — tham chiếu liên quan              |

**Lợi ích:**

1. `git log --format='%(trailers:key=Beads-ID)` → parse tự động bằng git native
2. GitHub Autolinks biến `br-a1b2` thành clickable link
3. gmind có thể `git log` + parse trailers → build commit ↔ Beads mapping
4. CI/CD hooks validate: "Mọi commit PHẢI có `Beads-ID:` trailer"

**Go implementation cho parsing:**

```go
// Parse git trailers from commit message
func ParseBeadsTrailers(commitMsg string) map[string][]string {
    // git interpret-trailers --parse
    // hoặc dùng go-git: commit.Message → split "\n\n" → parse trailers
}
```

---

#### C. GitHub Actions — CI/CD gắn Beads ID

**Workflow tích hợp với gmind:**

```yaml
# .github/workflows/ci.yml
name: gmind CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: "1.22" }

      # Parse Beads-ID từ commit message
      - name: Extract Beads-ID
        id: beads
        run: |
          BEADS_ID=$(git log -1 --format='%(trailers:key=Beads-ID,valueonly)')
          echo "beads_id=$BEADS_ID" >> $GITHUB_OUTPUT

      # Run tests
      - name: Run Tests
        run: go test ./... -v -json > test-results.json

      # Upload test results as artifact
      - uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ steps.beads.outputs.beads_id }}
          path: test-results.json

      # Ghi test result vào Beads (FrankenSQLite)
      - name: Update Beads Status
        if: success()
        run: |
          br update ${{ steps.beads.outputs.beads_id }} \
            --status verified \
            --test-result pass \
            --ci-run-id ${{ github.run_id }}
```

**Key insight:** GitHub Actions artifacts có thể download qua REST API:

```
GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts
GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}
```

→ gmind PM Web có thể **embed test results** trực tiếp trong task view.

---

#### D. GitHub Checks API — Rich Status trên Commits/PRs

GitHub Checks API cho phép tạo **check runs** với annotations chi tiết trên từng commit.

**Use case cho gmind:**

```
POST /repos/{owner}/{repo}/check-runs
{
  "name": "gmind-verification",
  "head_sha": "<commit-sha>",
  "status": "completed",
  "conclusion": "success",
  "output": {
    "title": "Beads Task br-a1b2 Verified",
    "summary": "All tests passed. Coverage: 85%",
    "annotations": [
      {
        "path": "internal/storage/mvcc.go",
        "start_line": 42,
        "end_line": 42,
        "annotation_level": "notice",
        "message": "New MVCC implementation for br-a1b2"
      }
    ]
  }
}
```

**Lợi ích:**

1. PR hiển thị: ✅ gmind-verification → Beads Task br-a1b2 Verified
2. Line annotations trên code diff → reviewer thấy context Beads ID
3. Tích hợp với PRD-01 Section 4.3 "Ultimate Approval Panel"

---

#### E. GitHub REST/GraphQL API — Go Client Libraries

| Thư viện                  | API        | Use case                                       |
| ------------------------- | ---------- | ---------------------------------------------- |
| `google/go-github` (v83+) | REST v3    | CRUD issues, commits, PRs, Actions, Checks     |
| `shurcooL/githubv4`       | GraphQL v4 | Complex queries (batch commits + PRs + status) |
| `Khan/genqlient`          | GraphQL v4 | Type-safe, code-gen approach cho Go            |

**Recommended:** `google/go-github` cho MVP (REST đơn giản hơn), migrate sang GraphQL khi cần batch queries.

**Go dependency:**

```go
import "github.com/google/go-github/v83/github"
```

---

#### F. GitHub ↔ gmind Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     GITHUB REMOTE                                │
│                                                                  │
│  Repository ─────── Commits, Branches, Tags                      │
│  Pull Requests ──── Reviews, Merge status                        │
│  Actions ────────── CI/CD runs, Test results                     │
│  Issues ─────────── (optional, Beads is primary)                 │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                    git push/pull + gh CLI
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                   LOCAL MACHINE (Developer)                      │
│                                                                  │
│  ┌────────────────┐  ┌─────────────────┐  ┌────────────────┐     │
│  │ git CLI        │  │ gh CLI          │  │ gmind CLI      │     │
│  │ (local repo)   │  │ (GitHub API)    │  │ (orchestrator) │     │
│  └───────┬────────┘  └────────┬────────┘  └───────┬────────┘     │
│          │                    │                    │             │
│          └────────────────────┼────────────────────┘             │
│                               │                                  │
│                   ┌───────────▼──────────┐                       │
│                   │  Beads ID Resolver   │                       │
│                   │  br-XXX → {commits,  │                       │
│                   │   PRs, CI status}    │                       │
│                   └───────────┬──────────┘                       │
│                               │                                  │
│          ┌────────────────────┼────────────────────┐             │
│          ▼                    ▼                    ▼             │
│  ┌───────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ git log       │  │ gh pr list     │  │ gh run list    │       │
│  │ --grep=       │  │ --search=      │  │ (CI status)    │       │
│  │ 'Beads-ID:'   │  │ 'br-XXX'       │  │                │       │
│  └───────────────┘  └────────────────┘  └────────────────┘       │
│                                                                  │
│  Storage: .beads/issues.jsonl (git-tracked SSOT)                 │
│           .beads/beads.db (FrankenSQLite local cache)            │
└──────────────────────────────────────────────────────────────────┘
```

---

#### G. Ảnh hưởng của GitHub lên gmind — Impact Assessment

| Lĩnh vực                                | Ảnh hưởng                                                         | Mức độ        |
| --------------------------------------- | ----------------------------------------------------------------- | ------------- |
| **Storage (PRD-02)**                    | Thêm 4 bảng GitHub-related vào FrankenSQLite                      | 🟡 Moderate   |
| **API Gateway (PRD-01 Layer 5)**        | Thêm GitHub proxy endpoints                                       | 🟡 Moderate   |
| **PM Web (PRD-01 Layer 6)**             | Commit history + test results + PR links hiển thị trong task view | 🟢 High Value |
| **Agent Workflow (PRD-03)**             | CI hook validate `Beads-ID:` trailer, auto-update task status     | 🟢 High Value |
| **Verification Layer (PRD-01 Layer 4)** | GitHub Checks API → gmind check-run → annotated PR                | 🟢 High Value |
| **CLI (PRD-03)**                        | `gmind github-sync` command poll/sync GitHub data                 | 🟡 Moderate   |
| **Beads ID (core)**                     | Trở thành universal key xuyên GitHub ↔ gmind                      | 🟢 Critical   |

---

#### H. gmind CLI Commands cho GitHub Integration

```bash
# Sync GitHub data cho 1 Beads task
gmind github sync br-a1b2
# → Fetch: commits, PRs, test results, check runs liên quan

# Xem lịch sử commit gắn với Beads task
gmind github commits br-a1b2
# → Output: list commits có Beads-ID: br-a1b2 trong trailers

# Xem test results từ GitHub Actions
gmind github tests br-a1b2
# → Output: latest test run status, coverage, artifacts link

# Link GitHub PR với Beads task
gmind github link-pr br-a1b2 --pr=42
# → Ghi vào FrankenSQLite: pr_links table

# Cấu hình GitHub Autolinks cho repo
gmind github setup-autolinks
# → Gọi GitHub REST API: POST /repos/.../autolinks
```

---

#### I. New SQL Schema cho GitHub Data

```sql
-- Bảng liên kết commit ↔ Beads ID
CREATE TABLE github_commits (
    id INTEGER PRIMARY KEY,
    beads_id TEXT NOT NULL,       -- br-a1b2
    commit_sha TEXT NOT NULL,
    commit_message TEXT,
    author TEXT,
    authored_at DATETIME,
    github_url TEXT,
    FOREIGN KEY (beads_id) REFERENCES issues(id)
);
CREATE INDEX idx_github_commits_beads ON github_commits(beads_id);

-- Bảng liên kết PR ↔ Beads ID
CREATE TABLE github_pr_links (
    id INTEGER PRIMARY KEY,
    beads_id TEXT NOT NULL,
    pr_number INTEGER NOT NULL,
    pr_title TEXT,
    pr_state TEXT,               -- open, closed, merged
    pr_url TEXT,
    merged_at DATETIME,
    FOREIGN KEY (beads_id) REFERENCES issues(id)
);

-- Bảng lưu test results từ GitHub Actions
CREATE TABLE github_test_results (
    id INTEGER PRIMARY KEY,
    beads_id TEXT NOT NULL,
    run_id INTEGER NOT NULL,     -- GitHub Actions run ID
    status TEXT NOT NULL,         -- success, failure, cancelled
    conclusion TEXT,
    coverage REAL,
    test_count INTEGER,
    fail_count INTEGER,
    artifact_url TEXT,           -- link to download test artifacts
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beads_id) REFERENCES issues(id)
);

-- Bảng lưu check run status
CREATE TABLE github_check_runs (
    id INTEGER PRIMARY KEY,
    beads_id TEXT NOT NULL,
    check_run_id INTEGER NOT NULL,
    name TEXT,
    status TEXT,                  -- queued, in_progress, completed
    conclusion TEXT,              -- success, failure, neutral, ...
    details_url TEXT,
    output_title TEXT,
    output_summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beads_id) REFERENCES issues(id)
);
```

---

#### J. GitHub Webhooks — Real-time Updates (thay thế Polling)

Thay vì polling GitHub API, gmind có thể nhận **webhook events** real-time:

| Event          | Trigger             | gmind Action                                        |
| -------------- | ------------------- | --------------------------------------------------- |
| `push`         | Agent push commit   | Parse `Beads-ID:` trailer → update `github_commits` |
| `pull_request` | PR created/merged   | Link PR → Beads ID → update `github_pr_links`       |
| `check_run`    | CI pass/fail        | Update `github_check_runs` + `github_test_results`  |
| `workflow_run` | Actions complete    | Fetch artifacts → store test results                |
| `issues`       | Issue opened/closed | Sync GitHub Issues ↔ Beads (optional, 2-way)        |

**Go implementation:**

```go
// Webhook handler using google/go-github
func handleWebhook(w http.ResponseWriter, r *http.Request) {
    payload, err := github.ValidatePayload(r, webhookSecret)
    event, err := github.ParseWebHook(github.WebHookType(r), payload)

    switch e := event.(type) {
    case *github.PushEvent:
        for _, commit := range e.Commits {
            beadsID := parseBeadsTrailer(commit.GetMessage())
            if beadsID != "" {
                db.InsertGitHubCommit(beadsID, commit)
            }
        }
    case *github.CheckRunEvent:
        // Update check run status in FrankenSQLite
    }
}
```

> **Tradeoff:** Webhooks cần public endpoint. Với MVP local-first, dùng **polling + cron** đơn giản hơn. Webhooks cho production PM Web.

**Open Items:**

- Câu hỏi từ Human: xem Session 2 bên dưới

---

### Session 2 (2026-02-28) — Revision: DB Architecture, Scale, Sync, Search

**Bối cảnh:** Human đặt 4 câu hỏi quan trọng sau khi review Session 1. Các findings bên dưới **sửa lại** một số đề xuất của Session 1.

**Findings:**

#### K. ⚠️ REVISION — DB Consolidation: Không tạo 4 bảng SQL mới

**Vấn đề với Session 1:** Đề xuất thêm 4 bảng (`github_commits`, `github_pr_links`, `github_test_results`, `github_check_runs`) vào FrankenSQLite → **vi phạm nguyên tắc PRD-02**: chỉ sử dụng 2 DB (FrankenSQLite cho structured state + Zvec cho semantic search), tránh DB chồng chéo.

**PRD-02 Section 1 quy định rõ:**

```
FrankenSQLite = SSOT cho State & Issues (task status, assignee, priority)
Zvec = Bộ nhớ Ngữ nghĩa (docs, chat history, semantic search)
```

**Đề xuất sửa — 3 tầng lưu trữ GitHub data:**

```
╔══════════════════════════════════════════════════════════════════╗
║  TẦNG 1: Git Native (local, zero API)                            ║
║                                                                  ║
║  git log --format='%(trailers:key=Beads-ID)' → parse trực tiếp   ║
║  Không cần DB. Không cần API. Chạy local.                        ║
║  → Source of truth cho commit ↔ Beads mapping                    ║
╠══════════════════════════════════════════════════════════════════╣
║  TẦNG 2: FrankenSQLite (chỉ cross-ref nhẹ)                       ║
║                                                                  ║
║  Mở rộng bảng issues (có sẵn) — KHÔNG tạo bảng mới:              ║
║  ALTER TABLE issues ADD COLUMN github_pr_url TEXT DEFAULT '';    ║
║  ALTER TABLE issues ADD COLUMN github_last_run_status TEXT       ║
║                                           DEFAULT '';            ║
║  ALTER TABLE issues ADD COLUMN github_last_run_id INTEGER        ║
║                                           DEFAULT 0;             ║
║  → Chỉ lưu "snapshot" mới nhất, không lưu lịch sử                ║
╠══════════════════════════════════════════════════════════════════╣
║  TẦNG 3: Zvec (semantic search cho lịch sử đầy đủ)               ║
║                                                                  ║
║  Mỗi commit/PR/test-run → 1 Zvec document:                       ║
║  {                                                               ║
║    "type": "github_commit",                                      ║
║    "beads_id": "br-a1b2",                                        ║
║    "content": "feat(storage): implement MVCC...",                ║
║    "metadata": {"sha": "abc123", "author": "steve", ...}         ║
║  }                                                               ║
║  → Searchable bằng gmind search "MVCC commit br-a1b2"            ║
╚══════════════════════════════════════════════════════════════════╝
```

**Lợi ích so với Session 1:**

| Tiêu chí           | Session 1 (4 bảng SQL)          | Session 2 (Git + issues columns + Zvec) |
| ------------------ | ------------------------------- | --------------------------------------- |
| Số DB dùng         | 3 (FrankenSQLite mở rộng nhiều) | 2 (đúng PRD-02)                         |
| Schema complexity  | 4 bảng mới + indexes            | 3 cột thêm vào bảng có sẵn              |
| Lịch sử đầy đủ     | SQL queries phức tạp            | Zvec semantic search                    |
| Orphaned data risk | Cao (garbage collection khó)    | Thấp (Zvec lazy cleanup có sẵn)         |
| Planning context   | SQL chỉ structured query        | Zvec = ngôn ngữ tự nhiên search         |

> **Quy tắc mới:** GitHub data là **semantic context** (giống docs, chat history) → thuộc về **Zvec**. Chỉ có trạng thái hiện tại (latest PR, latest CI status) lưu vào FrankenSQLite issues table.

---

#### L. Scale — Liệu sync từ GitHub có quá tải cho dự án lớn?

**GitHub API Rate Limits (2026):**

| Loại authentication      | Rate limit                | Ghi chú                |
| ------------------------ | ------------------------- | ---------------------- |
| Personal Access Token    | **5,000 req/hr**          | Đủ cho hầu hết project |
| GitHub App (standard)    | **5,000 - 12,500 req/hr** | Scale theo số repo     |
| GitHub App (Enterprise)  | **15,000 req/hr**         | Cho tổ chức lớn        |
| `GITHUB_TOKEN` (Actions) | **1,000 req/hr/repo**     | Trong CI workflow      |

**Phân tích cho dự án tương đối lớn (ví dụ: 500 Beads tasks, 100 PRs, 50 Actions runs/ngày):**

```
Sync 1 Beads task = ~5 API requests:
  1x list commits (search by Beads-ID trailer)
  1x get PR (if linked)
  1x get latest check run
  1x get latest workflow run
  1x get artifact metadata

Sync full project = 500 tasks × 5 = 2,500 requests
→ Nằm trong giới hạn 5,000/hr ✅
```

**Giải pháp chống quá tải — Conditional Requests (ETag):**

```go
// GitHub API hỗ trợ ETag — request trả 304 Not Modified
// KHÔNG tính vào rate limit!
req.Header.Set("If-None-Match", cachedETag)

// Response:
// 304 Not Modified → dùng cache, KHÔNG tốn quota
// 200 OK → data mới, cập nhật cache + ETag
```

**Impact thực tế với ETag:**

```
Lần sync đầu tiên: 2,500 requests (full fetch)
Lần sync thứ 2+:   ~50-100 requests (chỉ data thay đổi)
                    2,400 requests trả 304 → KHÔNG tốn quota

→ Có thể sync MỖI 5 PHÚT mà không lo rate limit ✅
```

**Kết luận:** ✅ **Không quá tải** cho project quy mô trung bình-lớn (500+ tasks). Với project cực lớn (5,000+ tasks) → dùng GraphQL batch queries hoặc webhooks.

---

#### M. Tần suất Sync — Nên sync bao lâu 1 lần?

**Đề xuất 3 chiến lược song song:**

```
╔══════════════════════════════════════════════════════════════════╗
║  CHIẾN LƯỢC 1: Git-local First (KHÔNG cần API)                   ║
║                                                                  ║
║  Khi nào: Mỗi khi agent chạy gmind context br-XXX                ║
║  Cách:    git log --format='%(trailers:key=Beads-ID)' local      ║
║  Cost:    Zero API calls. Instant.                               ║
║  Data:    Commits + trailers từ local git repo                   ║
║                                                                  ║
║  → ĐÂY LÀ TẦNG CHÍNH. 90% use cases dùng cái này.                ║
╠══════════════════════════════════════════════════════════════════╣
║  CHIẾN LƯỢC 2: Event-driven (push-based)                         ║
║                                                                  ║
║  Khi nào: GitHub Actions CI xong → trigger update                ║
║  Cách:    CI step cuối gọi: br update br-XXX --test-result pass  ║
║  Cost:    Zero API calls (CI chạy trong GitHub, write local)     ║
║  Data:    Test results, CI status                                ║
║                                                                  ║
║  → Tầng thứ 2. CI tự push data vào Beads khi kết thúc.           ║
╠══════════════════════════════════════════════════════════════════╣
║  CHIẾN LƯỢC 3: Scheduled Background Sync (API-based)             ║
║                                                                  ║
║  Khi nào: Cronjob mỗi 15-30 phút (configurable)                  ║
║  Cách:    gmind github sync --all (dùng ETag conditional)        ║
║  Cost:    ~50-100 API calls/lần (nhờ ETag 304)                   ║
║  Data:    PRs, GitHub Issues, Workflow runs, Artifacts           ║
║                                                                  ║
║  → Tầng bổ sung. Fetch data chỉ có trên GitHub remote.           ║
╚══════════════════════════════════════════════════════════════════╝
```

**Tần suất khuyến nghị theo giai đoạn:**

| Giai đoạn      | Git-local   | Event-driven | Background Sync           |
| -------------- | ----------- | ------------ | ------------------------- |
| **MVP**        | ✅ Luôn bật | ✅ CI step   | ❌ Chưa cần               |
| **v1.0**       | ✅ Luôn bật | ✅ CI step   | ✅ Mỗi 30 phút            |
| **Production** | ✅ Luôn bật | ✅ CI step   | ✅ Mỗi 15 phút + Webhooks |

> **Nguyên tắc:** Ưu tiên **local data trước**, chỉ gọi API khi cần data chỉ có trên GitHub remote (PRs, Actions artifacts, GitHub Issues).

---

#### N. Search Integration — Tìm kiếm commits/issues/logs/actions theo Beads ID

**Câu hỏi:** Có thể sử dụng `gmind search` để tìm commits, issues, logs, actions results theo Beads ID cho planning context không?

**Trả lời: CÓ** — và đây chính là lý do dùng **Zvec** thay vì SQL tables cho GitHub data.

**Cách hoạt động:**

```
Agent gọi: gmind search "CI results for br-a1b2"

gmind search engine:
  1. Zvec semantic search → tìm documents match "CI results" + "br-a1b2"
  2. Trả về mix results:
     ├── github_commit: "feat(storage): implement MVCC [br-a1b2]"
     ├── github_test_run: "Tests passed, coverage 85% [br-a1b2]"
     ├── github_pr: "PR #42: MVCC Layer [br-a1b2] — merged"
     ├── doc: "docs/architecture/Architecture.md" (mentions br-a1b2)
     └── chat_history: "Agent discussed MVCC approach for br-a1b2"
```

**Zvec Document Types cho GitHub data:**

```json
// Commit document
{
  "doc_type": "github_commit",
  "beads_id": "br-a1b2",
  "content": "feat(storage): implement FrankenSQLite MVCC layer\n\nImplement page-level MVCC for concurrent agent writes.\nTested with 10 parallel writers, no data corruption.",
  "metadata": {
    "sha": "abc123def456",
    "author": "Steve",
    "date": "2026-02-28T10:30:00Z",
    "github_url": "https://github.com/org/repo/commit/abc123"
  }
}

// Test result document
{
  "doc_type": "github_test_run",
  "beads_id": "br-a1b2",
  "content": "CI Run #1234: All 47 tests passed. Coverage: 85.3%. Duration: 2m 30s. No linting errors.",
  "metadata": {
    "run_id": 1234,
    "status": "success",
    "coverage": 85.3,
    "test_count": 47,
    "fail_count": 0,
    "artifact_url": "https://github.com/org/repo/actions/runs/1234/artifacts"
  }
}

// PR document
{
  "doc_type": "github_pr",
  "beads_id": "br-a1b2",
  "content": "PR #42: Implement MVCC Layer for FrankenSQLite\n\nThis PR adds page-level MVCC support...\nReviewed by: CTO\nMerged: 2026-02-28",
  "metadata": {
    "pr_number": 42,
    "state": "merged",
    "merged_at": "2026-02-28T15:00:00Z"
  }
}
```

**Use cases cho Planning context:**

| Query mẫu                                            | Kết quả                                   | Giá trị cho Planning               |
| ---------------------------------------------------- | ----------------------------------------- | ---------------------------------- |
| `gmind search "why did br-a1b2 fail CI"`             | Test logs + error messages                | Debug context                      |
| `gmind search "all changes for br-a1b2"`             | Commits + PRs + docs                      | Impact assessment                  |
| `gmind search "test coverage storage module"`        | Test results + code coverage              | Quality metrics                    |
| `gmind context br-a1b2 --depth 2`                    | Beads task + commits + PRs + tests + docs | **Full traceability** cho planning |
| `gmind search "blocking issues for epic br-epic-01"` | Dependencies + test failures              | Sprint planning                    |

**Mở rộng `gmind context` — thêm GitHub enrichment:**

```bash
# Hiện tại (PRD-03):
gmind context br-a1b2 --depth 0
# → Task description + Code + Chat history

# Mở rộng (với GitHub integration):
gmind context br-a1b2 --depth 0 --github
# → Task description + Code + Chat history
#    + Latest commits (from git log local)
#    + Latest PR status (from Zvec cache)
#    + Latest CI result (from Zvec cache)
#    + Related GitHub Issues (if synced)
```

> **Key insight:** Mọi GitHub data được **index vào Zvec** → tự động searchable bằng ngôn ngữ tự nhiên. Agent có thể hỏi "tại sao task br-a1b2 fail test lần cuối?" và nhận đủ context mà **không cần query 5 bảng SQL khác nhau**.

---

#### O. Revised Architecture — Sau Session 2

```
╔══════════════════════════════════════════════════════════════════╗
║                        DATA SOURCES                              ║
║                                                                  ║
║  Git Local ────── git log (commits, trailers)                    ║
║  GitHub API ───── PRs, Actions, Checks (remote only)             ║
║  CI Pipeline ──── Test results pushed by Actions                 ║
╚════════════════════╦═══════════════════╦═════════════════════════╝
                     ║                   ║
        ┌────────────╨─────┐   ┌────────╨───────────┐
        │  FrankenSQLite   │   │      Zvec          │
        │  (State SSOT)    │   │  (Semantic Memory) │
        │                  │   │                    │
        │ issues table:    │   │ github_commit docs │
        │  +github_pr_url  │   │ github_pr docs     │
        │  +github_ci_stat │   │ github_test docs   │
        │  +github_run_id  │   │ docs/*.md          │
        │                  │   │ chat_history       │
        │ (3 cột thêm,     │   │ AST code nodes     │
        │  KHÔNG bảng mới) │   │                    │
         └────────┬─────────┘   └────────┬───────── ┘
                  │                      │
                 └──────────┬───────────┘
                            │
                   ┌────────▼────────┐
                   │   gmind CLI     │
                   │                 │
                   │ gmind search    │ ← Zvec semantic
                   │ gmind context   │ ← Both DBs
                   │ gmind github    │ ← Git local + API
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
                   │   PM Web API    │
                   │                 │
                   │ Task view +     │
                   │ GitHub enrichmt │
                   └─────────────────┘
```

**Open Items:**

- (None — Session 2 addressed all 4 Human questions)
- Câu hỏi mới từ Human: xem Session 3

---

### Session 3 (2026-02-28) — Simplification: Local-first, `git` + `gh` CLI Only

**Bối cảnh:** Human chỉ rõ:

1. ❌ **Không dùng Webhooks** — không phù hợp (không có central server nhận webhooks)
2. ✅ Ưu tiên **polling bằng `git` CLI + `gh` (GitHub CLI)** — chạy local
3. ✅ Hệ thống chạy **trên máy Human** (ThanhVV, HungBD), không server tập trung
4. ✅ Server chỉ cho **CI/CD + deploy** → mọi thứ khác đẩy lên GitHub
5. ✅ **FrankenSQLite/beads JSONL đã sync lên git** rồi — xem xét tận dụng
6. ❌ Zvec là **DB tạm local** — không cần đồng bộ lên git
7. ✅ Tích hợp sâu beads với git components

**Findings:**

#### P. ⚠️ REVISION — Loại bỏ Webhooks và Go API Client

**Loại bỏ hoàn toàn từ Session 1:**

| Đề xuất cũ                     | Lý do loại bỏ                          |
| ------------------------------ | -------------------------------------- |
| Webhook server (Section J)     | Không có central server để nhận events |
| `google/go-github` REST client | Quá phức tạp — `gh` CLI đã làm được    |
| `shurcooL/githubv4` GraphQL    | Không cần — `gh api graphql` đã hỗ trợ |
| 4 bảng SQL mới (Section I)     | Vi phạm PRD-02 — đã sửa ở Session 2    |
| GitHub Checks API write        | CI/CD tự handle — gmind chỉ **đọc**    |

**Thay thế bằng:** `git` CLI (local) + `gh` CLI (GitHub remote).

---

#### Q. Beads JSONL — Đã sync lên git, không cần làm thêm gì

**Xác nhận:** Beads **đã được thiết kế** để sync qua git natively.

> ⚠️ **Lưu ý:** beads_rust sử dụng **FrankenSQLite** (MVCC page-level concurrent writers) thay vì SQLite thường. Xem [spike-frankensqlite-vs-doltdb.md](spike-frankensqlite-vs-doltdb.md).

```
ThanhVV's machine                HungBD's machine
─────────────────                ─────────────────
FrankenSQLite (local cache)      FrankenSQLite (local cache)
    ↕ auto-sync (daemon)             ↕ auto-sync (daemon)
JSONL (git-tracked)   ←─────→   JSONL (git-tracked)
         └──── git push/pull ────┘
                    │
             GitHub Remote
          (issues.jsonl on git)
```

**Đã có sẵn — KHÔNG cần phát triển thêm:**

1. `bd create/update/close` → tự động export JSONL
2. `git add .beads/issues.jsonl && git push` → sync lên GitHub
3. `git pull` → daemon auto-import JSONL → rebuild FrankenSQLite local
4. Hash-based IDs (`bd-a3f2`) → không conflict khi 2 máy tạo issue cùng lúc

> **Kết luận:** FrankenSQLite (qua beads_rust) **đã sync lên git** qua JSONL — đây là kiến trúc core của beads. FrankenSQLite local chỉ là cache, JSONL trên git là source of truth. Không cần build thêm sync mechanism.

---

#### R. Cái gì sync lên git, cái gì ở local?

```
+------------------------------------------------------------------+
|  PUSH TO GITHUB (git-tracked)                                    |
|                                                                  |
|  docs/              <-- PRDs, spikes, architecture, reports      |
|  .beads/issues.jsonl <-- Beads task state (JSONL)                |
|  src/               <-- Source code                              |
|  .github/           <-- Actions workflows, PR templates          |
|  .agents/           <-- Agent skills, workflows, rules           |
|                                                                  |
+------------------------------------------------------------------+
|  KEEP LOCAL (not git-tracked)                                    |
|                                                                  |
|  .beads/beads.db    <-- FrankenSQLite cache (rebuild from JSONL) |
|  Zvec DB            <-- Semantic search index (temp, rebuild OK) |
|  .beads/config.yaml <-- API keys, secrets (.gitignore)           |
|  .beads/daemon.*    <-- Daemon PID, logs                         |
|                                                                  |
+------------------------------------------------------------------+
|  CI/CD SERVER ONLY                                               |
|                                                                  |
|  GitHub Actions     <-- Build, test, lint, deploy                |
|  Test artifacts     <-- JUnit reports, coverage                  |
|  Deploy scripts     <-- Production deployment                    |
+------------------------------------------------------------------+
```

> **Zvec là DB tạm** — rebuild được từ source files (`docs/*.md`, code AST). Nếu mất Zvec → chạy `gmind reindex` là xong. Không cần sync lên git. **FrankenSQLite** cũng rebuild được từ JSONL.

---

#### S. `gh` CLI — Công cụ duy nhất cần cho GitHub integration

**`gh` (GitHub CLI)** đã được cài sẵn trên macOS của developers. Có thể thay thế toàn bộ Go API client:

```bash
# ═══════════ TÌM COMMITS THEO BEADS ID ═══════════

# Local (zero API, instant):
git log --all --format='%H %s' --grep='Beads-ID: br-a1b2'
git log --all --format='%(trailers:key=Beads-ID,valueonly)' | grep 'br-a1b2'

# ═══════════ TÌM PRs THEO BEADS ID ═══════════

# Tìm PR mention br-a1b2:
gh pr list --search "br-a1b2" --json number,title,state,url
gh pr list --search "br-a1b2 in:title,body" --state all --json number,title,state,mergedAt

# ═══════════ TÌM ACTIONS RUNS THEO BEADS ID ═══════════

# List recent runs:
gh run list --limit 10 --json databaseId,status,conclusion,headBranch,displayTitle

# Xem detail 1 run:
gh run view <run-id> --json jobs

# Download artifacts:
gh run download <run-id> --name test-results

# ═══════════ TÌM ISSUES TRÊN GITHUB ═══════════

# Tìm GitHub Issues mention br-a1b2:
gh issue list --search "br-a1b2" --json number,title,state,url

# ═══════════ API TÙY Ý (low-level) ═══════════

# Nếu cần query phức tạp:
gh api repos/{owner}/{repo}/commits?per_page=100 --jq '.[].message'
gh api graphql -f query='{ repository(owner:"org", name:"repo") { ... } }'
```

**Lợi ích dùng `gh` CLI thay Go API Client:**

| Tiêu chí    | Go API Client         | `gh` CLI                |
| ----------- | --------------------- | ----------------------- |
| Cài đặt     | `go get` + build      | Đã có sẵn trên macOS    |
| Auth        | Code PAT/OAuth        | `gh auth login` (1 lần) |
| Complexity  | Import library + code | Shell command           |
| Output      | Go structs            | JSON (`--json`)         |
| Maintenance | Update dependency     | Auto-update via brew    |
| Rate limit  | Phải code retry logic | `gh` tự handle          |

---

#### T. `gmind github` — Thiết kế CLI đơn giản (chỉ wrapper `git` + `gh`)

```bash
# ═══════════ gmind github commands ═══════════

# Tra cứu mọi thứ liên quan tới 1 Beads task:
gmind github info br-a1b2
# Bên trong:
#   1. git log --grep='Beads-ID: br-a1b2' → commits
#   2. gh pr list --search "br-a1b2" → PRs
#   3. gh run list + filter by branch → CI/CD runs
# Output: tổng hợp đẹp, dùng cho planning context

# Tìm tất cả commits cho 1 task:
gmind github commits br-a1b2
# → exec: git log --all --grep='Beads-ID: br-a1b2'

# Tìm PRs liên quan:
gmind github prs br-a1b2
# → exec: gh pr list --search "br-a1b2" --state all --json ...

# Xem CI status mới nhất:
gmind github ci br-a1b2
# → exec: gh run list + filter → gh run view

# Setup GitHub Autolinks (1 lần):
gmind github setup-autolinks
# → exec: gh api POST repos/{owner}/{repo}/autolinks ...

# Tổng hợp context cho planning:
gmind github context br-a1b2
# → Kết hợp: beads task info + git commits + gh PRs + gh CI
# → Output format tối ưu cho agent context window
```

**Kiến trúc internal — chỉ exec shell commands:**

```go
// internal/github/client.go
// KHÔNG import google/go-github — chỉ dùng exec.Command

func GetCommitsForBeadsID(beadsID string) ([]Commit, error) {
    // git log --all --format='%H|||%an|||%s|||%(trailers:key=Beads-ID)'
    //   --grep='Beads-ID: <beadsID>'
    out, err := exec.Command("git", "log", "--all",
        "--format=%H|||%an|||%s", "--grep=Beads-ID: "+beadsID).Output()
    return parseGitLogOutput(out)
}

func GetPRsForBeadsID(beadsID string) ([]PR, error) {
    // gh pr list --search "beadsID" --state all --json number,title,...
    out, err := exec.Command("gh", "pr", "list",
        "--search", beadsID, "--state", "all",
        "--json", "number,title,state,url,mergedAt").Output()
    return parseJSON[[]PR](out)
}

func GetCIRunsForBeadsID(beadsID string) ([]CIRun, error) {
    // gh run list --json databaseId,status,conclusion,headBranch,...
    // + filter locally by commit message containing beadsID
    out, err := exec.Command("gh", "run", "list",
        "--limit", "20",
        "--json", "databaseId,status,conclusion,displayTitle").Output()
    return filterByBeadsID(out, beadsID)
}
```

---

#### U. Revised Architecture — Session 3 (Final)

```
+------------------------------------------------------------------+
|        ThanhVV / HungBD's Machine (LOCAL-FIRST)                  |
|                                                                  |
|  +--------------+  +--------------+  +---------------+           |
|  | beads (bd)   |  |  gmind CLI   |  |   gh CLI      |           |
|  | FrankenSQL   |  | context,     |  | PRs, runs,    |           |
|  | +JSONL sync  |  | search       |  | issues        |           |
|  +------+-------+  +------+-------+  +-------+-------+           |
|         |                 |                   |                  |
|         |       +---------v----------+        |                  |
|         |       |    Zvec (local)    |        |                  |
|         |       |  semantic search   |        |                  |
|         |       |  (temp, rebuild OK)|        |                  |
|         |       +--------------------+        |                  |
|         |                                     |                  |
|    git push/pull                    gh pr/run/api                |
|         |                                     |                  |
+---------+-------------------------------------+------------------+
          |                                     |
          +------------------+------------------+
                             |
                             v
              +--------------+--------------+
              |    GitHub Remote            |
              |                             |
              |  Source code                |
              |  docs/                      |
              |  .beads/issues.jsonl        |
              |  .github/ (Actions)         |
              |                             |
              |  GitHub Actions CI          |
              |  PR reviews                 |
              |  GitHub Issues              |
              +-----------------------------+
```

**So sánh Session 1 → Session 3:**

| Tiêu chí       | Session 1           | Session 3                       |
| -------------- | ------------------- | ------------------------------- |
| Webhook server | ✅ Có               | ❌ Loại bỏ                      |
| Go API Client  | `google/go-github`  | ❌ Loại — dùng `gh` CLI         |
| GraphQL Client | `shurcooL/githubv4` | ❌ Loại — dùng `gh api graphql` |
| DB mới         | 4 bảng SQL          | 0 bảng — 3 cột vào issues       |
| Authentication | PAT code in Go      | `gh auth login` (1 lần)         |
| Central server | Cần cho webhooks    | ❌ Không cần                    |
| Complexity     | Cao                 | **Thấp**                        |
| Dependencies   | 3 Go libraries      | 0 — chỉ shell exec              |

**Open Items:**

- (None — Session 3 simplified architecture per Human direction)

## Recommendation (Final — after Session 3)

1. **Phase 1 (Zero code):** Commit convention `Beads-ID:` Git Trailer + GitHub Autolinks (`gh api` setup 1 lần).
2. **Phase 2 (CI):** GitHub Actions extract `Beads-ID` từ commit → `br update` status.
3. **Phase 3 (`gmind github` commands):** Wrapper `git log` + `gh` CLI → `gmind github info/commits/prs/ci br-XXX`.
4. **Phase 4 (Search):** Index GitHub data (parsed từ `git log` + `gh`) vào Zvec → `gmind search "CI results br-a1b2"`.
5. **Phase 5 (PM Web):** Hiển thị traceability: task → commits → PR → CI (dùng `gh` output).

**Nguyên tắc kiến trúc (Final):**

- ✅ **Local-first** — chạy trên máy ThanhVV/HungBD, không server tập trung
- ✅ **`git` + `gh` CLI only** — không Go API library, không webhooks
- ✅ **Beads FrankenSQLite + JSONL sync sẵn** — FrankenSQLite là cache local, JSONL trên git là SSOT
- ✅ **Zvec = local temp DB** — rebuild được, không sync git
- ✅ **2 DB duy nhất** — đúng PRD-02
- ✅ **Mọi thứ đẩy lên GitHub** — trừ Zvec và FrankenSQLite cache

## Decision (chờ Human)

- Cần Human review:
  1. Approve kiến trúc local-first (`git` + `gh` CLI, không webhook/Go client)?
  2. Approve commit convention `Beads-ID:` Git Trailer?
  3. Approve phân loại: git-tracked (docs, JSONL, code) vs local-only (Zvec, FrankenSQLite cache)?

## Open Items → Next Spikes

1. **Spike: git hooks + pre-commit validation** — Enforce `Beads-ID:` trailer bắt buộc
2. **Spike: Zvec document schema cho GitHub data** — Cấu trúc documents cho commits/PRs/tests khi index vào Zvec
3. **Spike: `gmind github` CLI design** — Detailed command spec + output format
4. **Spike: CI Actions workflow mẫu** — Template `.github/workflows/ci.yml` cho gmind project
