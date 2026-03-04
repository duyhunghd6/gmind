/* ─── Git Graph Scenario Data ─── */

export interface Branch {
  name: string;
  color: string;
  className: string;
}

export interface Commit {
  id: string;
  branch: string;
  x: number;
  y: number;
  tag?: string;
}

export interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  branch: string;
}

export interface GitScenario {
  id: string;
  label: string;
  description: string;
  branches: Branch[];
  commits: Commit[];
  connections: Connection[];
  width: number;
  height: number;
}

/* ─── 1. Gitflow chuẩn ─── */
const gitflow: GitScenario = {
  id: "gitflow",
  label: "Gitflow Chuẩn",
  description: "Luồng feature → develop → release → master với hotfix song song.",
  width: 600,
  height: 280,
  branches: [
    { name: "master", color: "#58a6ff", className: "master" },
    { name: "develop", color: "#d2a8ff", className: "develop" },
    { name: "feature/storage", color: "#3fb9a0", className: "feature-1" },
    { name: "hotfix/fix-mvcc", color: "#ff7b72", className: "hotfix" },
    { name: "release/v1.0", color: "#79c0ff", className: "release" },
  ],
  commits: [
    { id: "c1", branch: "master", x: 60, y: 40, tag: "v0.1" },
    { id: "c2", branch: "master", x: 200, y: 40 },
    { id: "c3", branch: "master", x: 520, y: 40, tag: "v1.0" },
    { id: "c4", branch: "develop", x: 120, y: 100 },
    { id: "c5", branch: "develop", x: 260, y: 100 },
    { id: "c6", branch: "develop", x: 360, y: 100 },
    { id: "c7", branch: "feature/storage", x: 180, y: 160 },
    { id: "c8", branch: "feature/storage", x: 280, y: 160 },
    { id: "c9", branch: "hotfix/fix-mvcc", x: 140, y: 220 },
    { id: "c10", branch: "release/v1.0", x: 440, y: 160 },
  ],
  connections: [
    { from: { x: 60, y: 40 }, to: { x: 200, y: 40 }, branch: "master" },
    { from: { x: 200, y: 40 }, to: { x: 520, y: 40 }, branch: "master" },
    { from: { x: 60, y: 40 }, to: { x: 120, y: 100 }, branch: "develop" },
    { from: { x: 120, y: 100 }, to: { x: 260, y: 100 }, branch: "develop" },
    { from: { x: 260, y: 100 }, to: { x: 360, y: 100 }, branch: "develop" },
    { from: { x: 360, y: 100 }, to: { x: 520, y: 40 }, branch: "develop" },
    { from: { x: 120, y: 100 }, to: { x: 180, y: 160 }, branch: "feature/storage" },
    { from: { x: 180, y: 160 }, to: { x: 280, y: 160 }, branch: "feature/storage" },
    { from: { x: 280, y: 160 }, to: { x: 360, y: 100 }, branch: "feature/storage" },
    { from: { x: 60, y: 40 }, to: { x: 140, y: 220 }, branch: "hotfix/fix-mvcc" },
    { from: { x: 140, y: 220 }, to: { x: 200, y: 40 }, branch: "hotfix/fix-mvcc" },
    { from: { x: 360, y: 100 }, to: { x: 440, y: 160 }, branch: "release/v1.0" },
    { from: { x: 440, y: 160 }, to: { x: 520, y: 40 }, branch: "release/v1.0" },
  ],
};

/* ─── 2. Multi-Agent Worktree ─── */
const multiAgent: GitScenario = {
  id: "multi-agent",
  label: "Multi-Agent Worktree",
  description: "3 Agents làm việc song song trên các worktree riêng biệt, Orchestrator merge kết quả.",
  width: 640,
  height: 300,
  branches: [
    { name: "main", color: "#58a6ff", className: "master" },
    { name: "agent/claude-01", color: "#3fb9a0", className: "feature-1" },
    { name: "agent/claude-02", color: "#d2a8ff", className: "develop" },
    { name: "agent/claude-03", color: "#f78166", className: "hotfix" },
    { name: "agent/qa-review", color: "#7ee787", className: "release" },
  ],
  commits: [
    { id: "m1", branch: "main", x: 40, y: 40 },
    { id: "m2", branch: "main", x: 320, y: 40 },
    { id: "m3", branch: "main", x: 560, y: 40, tag: "merged" },
    { id: "a1-1", branch: "agent/claude-01", x: 120, y: 110 },
    { id: "a1-2", branch: "agent/claude-01", x: 220, y: 110 },
    { id: "a1-3", branch: "agent/claude-01", x: 340, y: 110 },
    { id: "a2-1", branch: "agent/claude-02", x: 140, y: 170 },
    { id: "a2-2", branch: "agent/claude-02", x: 260, y: 170 },
    { id: "a2-3", branch: "agent/claude-02", x: 380, y: 170 },
    { id: "a3-1", branch: "agent/claude-03", x: 160, y: 230 },
    { id: "a3-2", branch: "agent/claude-03", x: 300, y: 230 },
    { id: "qa-1", branch: "agent/qa-review", x: 440, y: 170 },
    { id: "qa-2", branch: "agent/qa-review", x: 500, y: 110 },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 320, y: 40 }, branch: "main" },
    { from: { x: 320, y: 40 }, to: { x: 560, y: 40 }, branch: "main" },
    { from: { x: 40, y: 40 }, to: { x: 120, y: 110 }, branch: "agent/claude-01" },
    { from: { x: 120, y: 110 }, to: { x: 220, y: 110 }, branch: "agent/claude-01" },
    { from: { x: 220, y: 110 }, to: { x: 340, y: 110 }, branch: "agent/claude-01" },
    { from: { x: 340, y: 110 }, to: { x: 320, y: 40 }, branch: "agent/claude-01" },
    { from: { x: 40, y: 40 }, to: { x: 140, y: 170 }, branch: "agent/claude-02" },
    { from: { x: 140, y: 170 }, to: { x: 260, y: 170 }, branch: "agent/claude-02" },
    { from: { x: 260, y: 170 }, to: { x: 380, y: 170 }, branch: "agent/claude-02" },
    { from: { x: 380, y: 170 }, to: { x: 320, y: 40 }, branch: "agent/claude-02" },
    { from: { x: 40, y: 40 }, to: { x: 160, y: 230 }, branch: "agent/claude-03" },
    { from: { x: 160, y: 230 }, to: { x: 300, y: 230 }, branch: "agent/claude-03" },
    { from: { x: 300, y: 230 }, to: { x: 320, y: 40 }, branch: "agent/claude-03" },
    { from: { x: 380, y: 170 }, to: { x: 440, y: 170 }, branch: "agent/qa-review" },
    { from: { x: 440, y: 170 }, to: { x: 500, y: 110 }, branch: "agent/qa-review" },
    { from: { x: 500, y: 110 }, to: { x: 560, y: 40 }, branch: "agent/qa-review" },
  ],
};

/* ─── 3. Hotfix Khẩn Cấp ─── */
const hotfix: GitScenario = {
  id: "hotfix",
  label: "Hotfix Khẩn Cấp",
  description: "Sửa lỗi production → merge lên main → cherry-pick về develop.",
  width: 560,
  height: 240,
  branches: [
    { name: "main", color: "#58a6ff", className: "master" },
    { name: "develop", color: "#d2a8ff", className: "develop" },
    { name: "hotfix/CVE-2026", color: "#ff7b72", className: "hotfix" },
    { name: "feature/new-ui", color: "#3fb9a0", className: "feature-1" },
  ],
  commits: [
    { id: "h1", branch: "main", x: 40, y: 40, tag: "v2.1" },
    { id: "h2", branch: "main", x: 280, y: 40, tag: "v2.1.1" },
    { id: "h3", branch: "main", x: 480, y: 40 },
    { id: "h4", branch: "develop", x: 100, y: 110 },
    { id: "h5", branch: "develop", x: 200, y: 110 },
    { id: "h6", branch: "develop", x: 360, y: 110 },
    { id: "h7", branch: "develop", x: 480, y: 110 },
    { id: "h8", branch: "hotfix/CVE-2026", x: 120, y: 180 },
    { id: "h9", branch: "hotfix/CVE-2026", x: 200, y: 180 },
    { id: "h10", branch: "feature/new-ui", x: 300, y: 180 },
    { id: "h11", branch: "feature/new-ui", x: 400, y: 180 },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 280, y: 40 }, branch: "main" },
    { from: { x: 280, y: 40 }, to: { x: 480, y: 40 }, branch: "main" },
    { from: { x: 40, y: 40 }, to: { x: 100, y: 110 }, branch: "develop" },
    { from: { x: 100, y: 110 }, to: { x: 200, y: 110 }, branch: "develop" },
    { from: { x: 200, y: 110 }, to: { x: 360, y: 110 }, branch: "develop" },
    { from: { x: 360, y: 110 }, to: { x: 480, y: 110 }, branch: "develop" },
    { from: { x: 40, y: 40 }, to: { x: 120, y: 180 }, branch: "hotfix/CVE-2026" },
    { from: { x: 120, y: 180 }, to: { x: 200, y: 180 }, branch: "hotfix/CVE-2026" },
    { from: { x: 200, y: 180 }, to: { x: 280, y: 40 }, branch: "hotfix/CVE-2026" },
    { from: { x: 200, y: 180 }, to: { x: 360, y: 110 }, branch: "hotfix/CVE-2026" },
    { from: { x: 200, y: 110 }, to: { x: 300, y: 180 }, branch: "feature/new-ui" },
    { from: { x: 300, y: 180 }, to: { x: 400, y: 180 }, branch: "feature/new-ui" },
    { from: { x: 400, y: 180 }, to: { x: 480, y: 110 }, branch: "feature/new-ui" },
  ],
};

/* ─── 4. Release Train ─── */
const releaseTrain: GitScenario = {
  id: "release-train",
  label: "Release Train",
  description: "Multiple releases song song với feature windows khác nhau — CI/CD automation.",
  width: 680,
  height: 300,
  branches: [
    { name: "main", color: "#58a6ff", className: "master" },
    { name: "release/v2.0", color: "#79c0ff", className: "release" },
    { name: "release/v2.1", color: "#d29922", className: "develop" },
    { name: "feature/auth", color: "#3fb9a0", className: "feature-1" },
    { name: "feature/metrics", color: "#d2a8ff", className: "hotfix" },
    { name: "feature/search", color: "#f78166", className: "feature-2" },
  ],
  commits: [
    { id: "r1", branch: "main", x: 40, y: 40, tag: "v1.9" },
    { id: "r2", branch: "main", x: 340, y: 40, tag: "v2.0" },
    { id: "r3", branch: "main", x: 600, y: 40, tag: "v2.1" },
    { id: "r4", branch: "release/v2.0", x: 140, y: 110 },
    { id: "r5", branch: "release/v2.0", x: 260, y: 110 },
    { id: "r6", branch: "release/v2.1", x: 400, y: 110 },
    { id: "r7", branch: "release/v2.1", x: 520, y: 110 },
    { id: "r8", branch: "feature/auth", x: 100, y: 180 },
    { id: "r9", branch: "feature/auth", x: 180, y: 180 },
    { id: "r10", branch: "feature/metrics", x: 200, y: 250 },
    { id: "r11", branch: "feature/metrics", x: 300, y: 250 },
    { id: "r12", branch: "feature/search", x: 440, y: 180 },
    { id: "r13", branch: "feature/search", x: 540, y: 180 },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 340, y: 40 }, branch: "main" },
    { from: { x: 340, y: 40 }, to: { x: 600, y: 40 }, branch: "main" },
    { from: { x: 40, y: 40 }, to: { x: 140, y: 110 }, branch: "release/v2.0" },
    { from: { x: 140, y: 110 }, to: { x: 260, y: 110 }, branch: "release/v2.0" },
    { from: { x: 260, y: 110 }, to: { x: 340, y: 40 }, branch: "release/v2.0" },
    { from: { x: 340, y: 40 }, to: { x: 400, y: 110 }, branch: "release/v2.1" },
    { from: { x: 400, y: 110 }, to: { x: 520, y: 110 }, branch: "release/v2.1" },
    { from: { x: 520, y: 110 }, to: { x: 600, y: 40 }, branch: "release/v2.1" },
    { from: { x: 40, y: 40 }, to: { x: 100, y: 180 }, branch: "feature/auth" },
    { from: { x: 100, y: 180 }, to: { x: 180, y: 180 }, branch: "feature/auth" },
    { from: { x: 180, y: 180 }, to: { x: 260, y: 110 }, branch: "feature/auth" },
    { from: { x: 140, y: 110 }, to: { x: 200, y: 250 }, branch: "feature/metrics" },
    { from: { x: 200, y: 250 }, to: { x: 300, y: 250 }, branch: "feature/metrics" },
    { from: { x: 300, y: 250 }, to: { x: 260, y: 110 }, branch: "feature/metrics" },
    { from: { x: 400, y: 110 }, to: { x: 440, y: 180 }, branch: "feature/search" },
    { from: { x: 440, y: 180 }, to: { x: 540, y: 180 }, branch: "feature/search" },
    { from: { x: 540, y: 180 }, to: { x: 520, y: 110 }, branch: "feature/search" },
  ],
};

/* ─── 5. Monorepo Multi-Package ─── */
const monorepo: GitScenario = {
  id: "monorepo",
  label: "Monorepo Multi-Package",
  description: "Nhiều packages phát triển đồng thời — scoped branches theo package namespace.",
  width: 640,
  height: 320,
  branches: [
    { name: "main", color: "#58a6ff", className: "master" },
    { name: "pkg/core", color: "#3fb9a0", className: "feature-1" },
    { name: "pkg/cli", color: "#d2a8ff", className: "develop" },
    { name: "pkg/website", color: "#f78166", className: "hotfix" },
    { name: "pkg/design-system", color: "#d29922", className: "release" },
    { name: "ci/integration", color: "#7ee787", className: "feature-2" },
  ],
  commits: [
    { id: "m1", branch: "main", x: 40, y: 40 },
    { id: "m2", branch: "main", x: 300, y: 40 },
    { id: "m3", branch: "main", x: 560, y: 40, tag: "v1.0" },
    { id: "p1-1", branch: "pkg/core", x: 100, y: 110 },
    { id: "p1-2", branch: "pkg/core", x: 200, y: 110 },
    { id: "p1-3", branch: "pkg/core", x: 320, y: 110 },
    { id: "p2-1", branch: "pkg/cli", x: 140, y: 170 },
    { id: "p2-2", branch: "pkg/cli", x: 260, y: 170 },
    { id: "p2-3", branch: "pkg/cli", x: 380, y: 170 },
    { id: "p3-1", branch: "pkg/website", x: 180, y: 230 },
    { id: "p3-2", branch: "pkg/website", x: 340, y: 230 },
    { id: "p4-1", branch: "pkg/design-system", x: 220, y: 280 },
    { id: "p4-2", branch: "pkg/design-system", x: 360, y: 280 },
    { id: "ci-1", branch: "ci/integration", x: 440, y: 170 },
    { id: "ci-2", branch: "ci/integration", x: 500, y: 110 },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 300, y: 40 }, branch: "main" },
    { from: { x: 300, y: 40 }, to: { x: 560, y: 40 }, branch: "main" },
    { from: { x: 40, y: 40 }, to: { x: 100, y: 110 }, branch: "pkg/core" },
    { from: { x: 100, y: 110 }, to: { x: 200, y: 110 }, branch: "pkg/core" },
    { from: { x: 200, y: 110 }, to: { x: 320, y: 110 }, branch: "pkg/core" },
    { from: { x: 320, y: 110 }, to: { x: 300, y: 40 }, branch: "pkg/core" },
    { from: { x: 100, y: 110 }, to: { x: 140, y: 170 }, branch: "pkg/cli" },
    { from: { x: 140, y: 170 }, to: { x: 260, y: 170 }, branch: "pkg/cli" },
    { from: { x: 260, y: 170 }, to: { x: 380, y: 170 }, branch: "pkg/cli" },
    { from: { x: 380, y: 170 }, to: { x: 300, y: 40 }, branch: "pkg/cli" },
    { from: { x: 100, y: 110 }, to: { x: 180, y: 230 }, branch: "pkg/website" },
    { from: { x: 180, y: 230 }, to: { x: 340, y: 230 }, branch: "pkg/website" },
    { from: { x: 340, y: 230 }, to: { x: 300, y: 40 }, branch: "pkg/website" },
    { from: { x: 40, y: 40 }, to: { x: 220, y: 280 }, branch: "pkg/design-system" },
    { from: { x: 220, y: 280 }, to: { x: 360, y: 280 }, branch: "pkg/design-system" },
    { from: { x: 360, y: 280 }, to: { x: 300, y: 40 }, branch: "pkg/design-system" },
    { from: { x: 380, y: 170 }, to: { x: 440, y: 170 }, branch: "ci/integration" },
    { from: { x: 440, y: 170 }, to: { x: 500, y: 110 }, branch: "ci/integration" },
    { from: { x: 500, y: 110 }, to: { x: 560, y: 40 }, branch: "ci/integration" },
  ],
};

/* ─── 6. Beads: PRD→Plan→Task Chain ─── */
const beadsPrdTrace: GitScenario = {
  id: "beads-prd-trace",
  label: "Beads: PRD Trace",
  description: "Truy vết PRD-02 → br-plan-01 → bd-a1b2 → commit c8f2a1b. Mỗi nhánh = 1 Beads ID.",
  width: 600,
  height: 240,
  branches: [
    { name: "PRD-02", color: "#58a6ff", className: "git-graph__branch--blue" },
    { name: "br-plan-01", color: "#3fb9a0", className: "git-graph__branch--teal" },
    { name: "bd-a1b2", color: "#d29922", className: "git-graph__branch--amber" },
    { name: "commits", color: "#ff7b72", className: "git-graph__branch--rose" },
  ],
  commits: [
    { id: "prd-02", branch: "PRD-02", x: 40, y: 40, tag: "PRD-02" },
    { id: "prd-02-s1", branch: "PRD-02", x: 140, y: 40, tag: "§1 Storage" },
    { id: "prd-02-s2", branch: "PRD-02", x: 240, y: 40, tag: "§2 MVCC" },
    { id: "plan-01", branch: "br-plan-01", x: 140, y: 100, tag: "br-plan-01" },
    { id: "plan-01-t1", branch: "br-plan-01", x: 260, y: 100, tag: "FrankenSQLite" },
    { id: "task-a1b2", branch: "bd-a1b2", x: 260, y: 160, tag: "bd-a1b2" },
    { id: "task-a1b3", branch: "bd-a1b2", x: 380, y: 160, tag: "bd-a1b3" },
    { id: "c8f2a1b", branch: "commits", x: 380, y: 220, tag: "c8f2a1b" },
    { id: "d9e3b2c", branch: "commits", x: 500, y: 220, tag: "d9e3b2c" },
    { id: "merge-prd", branch: "PRD-02", x: 500, y: 40, tag: "✅ traced" },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 140, y: 40 }, branch: "PRD-02" },
    { from: { x: 140, y: 40 }, to: { x: 240, y: 40 }, branch: "PRD-02" },
    { from: { x: 240, y: 40 }, to: { x: 500, y: 40 }, branch: "PRD-02" },
    { from: { x: 140, y: 40 }, to: { x: 140, y: 100 }, branch: "br-plan-01" },
    { from: { x: 140, y: 100 }, to: { x: 260, y: 100 }, branch: "br-plan-01" },
    { from: { x: 260, y: 100 }, to: { x: 260, y: 160 }, branch: "bd-a1b2" },
    { from: { x: 260, y: 160 }, to: { x: 380, y: 160 }, branch: "bd-a1b2" },
    { from: { x: 380, y: 160 }, to: { x: 380, y: 220 }, branch: "commits" },
    { from: { x: 380, y: 220 }, to: { x: 500, y: 220 }, branch: "commits" },
    { from: { x: 500, y: 220 }, to: { x: 500, y: 40 }, branch: "commits" },
  ],
};

/* ─── 7. Beads: MVCC Deadlock Fix ─── */
const beadsDeadlockFix: GitScenario = {
  id: "beads-deadlock",
  label: "Beads: Deadlock Fix",
  description: "Bug bd-b05 → Debug → Hotfix → Test → Merge. Chuỗi fix với Beads truy vết.",
  width: 560,
  height: 200,
  branches: [
    { name: "main", color: "#8b949e", className: "git-graph__branch--dim" },
    { name: "bug/bd-b05", color: "#ff7b72", className: "git-graph__branch--rose" },
    { name: "fix/mvcc-lock", color: "#3fb9a0", className: "git-graph__branch--teal" },
  ],
  commits: [
    { id: "main-1", branch: "main", x: 40, y: 40, tag: "v2.0" },
    { id: "main-2", branch: "main", x: 160, y: 40 },
    { id: "bug-detect", branch: "bug/bd-b05", x: 160, y: 120, tag: "bd-b05 🐛" },
    { id: "debug", branch: "bug/bd-b05", x: 280, y: 120, tag: "debug" },
    { id: "fix-1", branch: "fix/mvcc-lock", x: 280, y: 180, tag: "fix commit" },
    { id: "fix-2", branch: "fix/mvcc-lock", x: 400, y: 180, tag: "test ✅" },
    { id: "merge", branch: "main", x: 500, y: 40, tag: "v2.0.1 ✅" },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 160, y: 40 }, branch: "main" },
    { from: { x: 160, y: 40 }, to: { x: 160, y: 120 }, branch: "bug/bd-b05" },
    { from: { x: 160, y: 120 }, to: { x: 280, y: 120 }, branch: "bug/bd-b05" },
    { from: { x: 280, y: 120 }, to: { x: 280, y: 180 }, branch: "fix/mvcc-lock" },
    { from: { x: 280, y: 180 }, to: { x: 400, y: 180 }, branch: "fix/mvcc-lock" },
    { from: { x: 400, y: 180 }, to: { x: 500, y: 40 }, branch: "fix/mvcc-lock" },
    { from: { x: 160, y: 40 }, to: { x: 500, y: 40 }, branch: "main" },
  ],
};

/* ─── 8. Beads: DS Component Worktree ─── */
const beadsDsComponents: GitScenario = {
  id: "beads-ds-comp",
  label: "Beads: DS Components",
  description: "Design System IDs → Component branches. ds:comp:card-001, ds:comp:button-001 phát triển song song.",
  width: 600,
  height: 240,
  branches: [
    { name: "ds:main", color: "#8b949e", className: "git-graph__branch--dim" },
    { name: "ds:comp:card-001", color: "#58a6ff", className: "git-graph__branch--blue" },
    { name: "ds:comp:button-001", color: "#3fb9a0", className: "git-graph__branch--teal" },
    { name: "ds:comp:terminal-001", color: "#d29922", className: "git-graph__branch--amber" },
    { name: "ds:layout:grid-001", color: "#bc8cff", className: "git-graph__branch--purple" },
  ],
  commits: [
    { id: "ds-init", branch: "ds:main", x: 40, y: 40, tag: "ds:hub" },
    { id: "card-1", branch: "ds:comp:card-001", x: 140, y: 100, tag: "card v1" },
    { id: "card-2", branch: "ds:comp:card-001", x: 260, y: 100, tag: "card hero" },
    { id: "btn-1", branch: "ds:comp:button-001", x: 180, y: 160, tag: "btn 3var" },
    { id: "term-1", branch: "ds:comp:terminal-001", x: 220, y: 220, tag: "terminal" },
    { id: "grid-1", branch: "ds:layout:grid-001", x: 300, y: 160, tag: "grid-2,3" },
    { id: "merge-ds", branch: "ds:main", x: 500, y: 40, tag: "ds:v1.5 ✅" },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 140, y: 100 }, branch: "ds:comp:card-001" },
    { from: { x: 140, y: 100 }, to: { x: 260, y: 100 }, branch: "ds:comp:card-001" },
    { from: { x: 260, y: 100 }, to: { x: 500, y: 40 }, branch: "ds:comp:card-001" },
    { from: { x: 40, y: 40 }, to: { x: 180, y: 160 }, branch: "ds:comp:button-001" },
    { from: { x: 180, y: 160 }, to: { x: 500, y: 40 }, branch: "ds:comp:button-001" },
    { from: { x: 40, y: 40 }, to: { x: 220, y: 220 }, branch: "ds:comp:terminal-001" },
    { from: { x: 220, y: 220 }, to: { x: 500, y: 40 }, branch: "ds:comp:terminal-001" },
    { from: { x: 40, y: 40 }, to: { x: 300, y: 160 }, branch: "ds:layout:grid-001" },
    { from: { x: 300, y: 160 }, to: { x: 500, y: 40 }, branch: "ds:layout:grid-001" },
    { from: { x: 40, y: 40 }, to: { x: 500, y: 40 }, branch: "ds:main" },
  ],
};

/* ─── 9. Beads: Full ID Traversal ─── */
const beadsFullTraversal: GitScenario = {
  id: "beads-traversal",
  label: "Beads: Full Traversal",
  description: "PRD → Architecture → Plan → Tasks → Commits → Deploy. Chuỗi Beads ID đầy đủ.",
  width: 650,
  height: 280,
  branches: [
    { name: "PRD", color: "#58a6ff", className: "git-graph__branch--blue" },
    { name: "Architecture", color: "#bc8cff", className: "git-graph__branch--purple" },
    { name: "Plan", color: "#3fb9a0", className: "git-graph__branch--teal" },
    { name: "Tasks", color: "#d29922", className: "git-graph__branch--amber" },
    { name: "Commits", color: "#ff7b72", className: "git-graph__branch--rose" },
    { name: "Deploy", color: "#8b949e", className: "git-graph__branch--dim" },
  ],
  commits: [
    { id: "prd", branch: "PRD", x: 40, y: 40, tag: "PRD-01" },
    { id: "arch", branch: "Architecture", x: 130, y: 100, tag: "ADR-001" },
    { id: "plan", branch: "Plan", x: 220, y: 160, tag: "br-plan-01" },
    { id: "task1", branch: "Tasks", x: 310, y: 220, tag: "bd-001" },
    { id: "task2", branch: "Tasks", x: 400, y: 220, tag: "bd-002" },
    { id: "commit1", branch: "Commits", x: 400, y: 270, tag: "feat:c1" },
    { id: "commit2", branch: "Commits", x: 490, y: 270, tag: "feat:c2" },
    { id: "deploy", branch: "Deploy", x: 580, y: 40, tag: "🚀 v1.0" },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 130, y: 100 }, branch: "Architecture" },
    { from: { x: 130, y: 100 }, to: { x: 220, y: 160 }, branch: "Plan" },
    { from: { x: 220, y: 160 }, to: { x: 310, y: 220 }, branch: "Tasks" },
    { from: { x: 310, y: 220 }, to: { x: 400, y: 220 }, branch: "Tasks" },
    { from: { x: 400, y: 220 }, to: { x: 400, y: 270 }, branch: "Commits" },
    { from: { x: 400, y: 270 }, to: { x: 490, y: 270 }, branch: "Commits" },
    { from: { x: 490, y: 270 }, to: { x: 580, y: 40 }, branch: "Commits" },
    { from: { x: 40, y: 40 }, to: { x: 580, y: 40 }, branch: "PRD" },
  ],
};

/* ─── 10. Beads: Sprint Review Aggregation ─── */
const beadsSprintReview: GitScenario = {
  id: "beads-sprint-review",
  label: "Beads: Sprint Review",
  description: "Sprint W10: 4 agents → 12 tasks → merge. Tổng hợp kết quả sprint từ Beads.",
  width: 600,
  height: 260,
  branches: [
    { name: "sprint/W10", color: "#8b949e", className: "git-graph__branch--dim" },
    { name: "agent/claude-01", color: "#58a6ff", className: "git-graph__branch--blue" },
    { name: "agent/claude-02", color: "#3fb9a0", className: "git-graph__branch--teal" },
    { name: "agent/claude-03", color: "#d29922", className: "git-graph__branch--amber" },
    { name: "agent/qa-reviewer", color: "#ff7b72", className: "git-graph__branch--rose" },
  ],
  commits: [
    { id: "sprint-start", branch: "sprint/W10", x: 40, y: 40, tag: "W10 start" },
    { id: "a1-1", branch: "agent/claude-01", x: 140, y: 100, tag: "bd-003" },
    { id: "a1-2", branch: "agent/claude-01", x: 260, y: 100, tag: "bd-004" },
    { id: "a2-1", branch: "agent/claude-02", x: 180, y: 160, tag: "bd-009" },
    { id: "a2-2", branch: "agent/claude-02", x: 300, y: 160, tag: "bd-010" },
    { id: "a3-1", branch: "agent/claude-03", x: 220, y: 220, tag: "bd-012" },
    { id: "qa-1", branch: "agent/qa-reviewer", x: 340, y: 220, tag: "review ✅" },
    { id: "qa-2", branch: "agent/qa-reviewer", x: 420, y: 220, tag: "review ✅" },
    { id: "sprint-end", branch: "sprint/W10", x: 540, y: 40, tag: "W10 done ✅" },
  ],
  connections: [
    { from: { x: 40, y: 40 }, to: { x: 140, y: 100 }, branch: "agent/claude-01" },
    { from: { x: 140, y: 100 }, to: { x: 260, y: 100 }, branch: "agent/claude-01" },
    { from: { x: 260, y: 100 }, to: { x: 540, y: 40 }, branch: "agent/claude-01" },
    { from: { x: 40, y: 40 }, to: { x: 180, y: 160 }, branch: "agent/claude-02" },
    { from: { x: 180, y: 160 }, to: { x: 300, y: 160 }, branch: "agent/claude-02" },
    { from: { x: 300, y: 160 }, to: { x: 540, y: 40 }, branch: "agent/claude-02" },
    { from: { x: 40, y: 40 }, to: { x: 220, y: 220 }, branch: "agent/claude-03" },
    { from: { x: 220, y: 220 }, to: { x: 340, y: 220 }, branch: "agent/qa-reviewer" },
    { from: { x: 340, y: 220 }, to: { x: 420, y: 220 }, branch: "agent/qa-reviewer" },
    { from: { x: 420, y: 220 }, to: { x: 540, y: 40 }, branch: "agent/qa-reviewer" },
    { from: { x: 40, y: 40 }, to: { x: 540, y: 40 }, branch: "sprint/W10" },
  ],
};

export const gitScenarios: GitScenario[] = [gitflow, multiAgent, hotfix, releaseTrain, monorepo, beadsPrdTrace, beadsDeadlockFix, beadsDsComponents, beadsFullTraversal, beadsSprintReview];
