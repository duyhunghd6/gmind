"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Terminal from "@/components/Terminal";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

type TerminalLine = { prompt?: string; text: string; type: "command" | "output" | "success" | "error" };

interface TerminalScenario {
  id: string;
  label: string;
  title: string;
  lines: TerminalLine[];
}

const scenarios: TerminalScenario[] = [
  {
    id: "agent-console",
    label: "Agent Console",
    title: "gmind — Agent Console",
    lines: [
      { prompt: "$", text: "gmind search-codebase \"FrankenSQLite driver\"", type: "command" },
      { text: "Đang tìm kiếm trong 2,847 files...", type: "output" },
      { text: "✓ Tìm thấy 12 kết quả trong 0.34s", type: "success" },
      { prompt: "$", text: "bd create \"Setup MVCC layer\" --tag=\"implements:br-plan-01\"", type: "command" },
      { text: "Đã tạo task bd-a1b2 (priority: P2)", type: "success" },
      { prompt: "$", text: "gmind gh pr --status", type: "command" },
      { text: "#42 feat(storage): add FrankenSQLite driver — Merged ✓", type: "success" },
      { text: "#43 fix(mvcc): resolve deadlock on concurrent writes — Open", type: "output" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy Pipeline",
    title: "deploy — Production Pipeline",
    lines: [
      { prompt: "$", text: "pnpm turbo build --filter=website", type: "command" },
      { text: "• Packages in scope: website, @gmind/design-system", type: "output" },
      { text: "✓ @gmind/design-system: build 1.2s", type: "success" },
      { text: "✓ website: build 8.7s (SSG 12 pages)", type: "success" },
      { prompt: "$", text: "vercel deploy --prod", type: "command" },
      { text: "🔗 Deploying to production...", type: "output" },
      { text: "✓ Deployed: https://gmind.gscfin.com (12.4s)", type: "success" },
      { prompt: "$", text: "gmind notify --channel=deploy \"v1.0 deployed to production\"", type: "command" },
      { text: "✓ Thông báo đã gửi tới #deploy channel", type: "success" },
    ],
  },
  {
    id: "debug",
    label: "Debug Session",
    title: "debug — MVCC Deadlock Investigation",
    lines: [
      { prompt: "$", text: "gmind debug --trace bd-a1b2", type: "command" },
      { text: "Tracing task bd-a1b2 (MVCC Layer)...", type: "output" },
      { text: "├─ PRD: PRD-02 §2.1 (Storage Layer)", type: "output" },
      { text: "├─ Plan: br-plan-01 (FrankenSQLite Setup)", type: "output" },
      { text: "├─ Commits: feat(storage) c8f2a1b", type: "output" },
      { text: "└─ Tests: storage_test.go — 13/15 PASSED", type: "output" },
      { text: "✗ 2 tests FAILED: TestMVCC_ConcurrentWrite, TestMVCC_Rollback", type: "error" },
      { prompt: "$", text: "go test -v -run TestMVCC_ConcurrentWrite ./storage/...", type: "command" },
      { text: "=== RUN   TestMVCC_ConcurrentWrite", type: "output" },
      { text: "    storage_test.go:142: deadlock detected after 5s timeout", type: "error" },
      { text: "--- FAIL: TestMVCC_ConcurrentWrite (5.01s)", type: "error" },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD Run",
    title: "ci — GitHub Actions Pipeline",
    lines: [
      { prompt: "▶", text: "Triggered by: push to main (c8f2a1b)", type: "output" },
      { prompt: "①", text: "Checkout repository... done (2s)", type: "success" },
      { prompt: "②", text: "Install dependencies... done (12s)", type: "success" },
      { prompt: "③", text: "Lint check... 0 errors, 2 warnings (4s)", type: "success" },
      { prompt: "④", text: "Unit tests... 42/42 passed (18s)", type: "success" },
      { prompt: "⑤", text: "Integration tests... 15/15 passed (34s)", type: "success" },
      { prompt: "⑥", text: "Build artifacts... SSG complete (9s)", type: "success" },
      { prompt: "⑦", text: "Security scan... 0 vulnerabilities (6s)", type: "success" },
      { prompt: "⑧", text: "Deploy preview... https://preview-abc.vercel.app", type: "success" },
      { text: "✓ Pipeline completed in 1m 25s — all 8 steps passed", type: "success" },
    ],
  },
];

export default function TerminalScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);

  const scenario = scenarios.find((s) => s.id === scenarioId) || scenarios[0];

  return (
    <div aria-label="Terminal Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>💻 Terminal</h1>
        <DsIdBadge id="ds:screen:terminal-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-terminal</code> + <code>ds-lay-terminal-mosaic</code> — Cửa sổ terminal với ANSI colors, cursor blink, mosaic layout.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gap: "16px" }}>
          {/* Scenario Tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {scenarios.map((s) => (
              <button
                key={s.id}
                className={`state-toggle-bar__btn${scenarioId === s.id ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => setScenarioId(s.id)}
                style={{ fontSize: "0.75rem" }}
              >
                {s.label}
              </button>
            ))}
            <DsIdBadge id={`ds:terminal:${scenarioId === "agent-console" ? "agentConsole" : scenarioId === "deploy" ? "deployPipeline" : scenarioId === "debug" ? "debugSession" : "cicdRun"}-001`} />
          </div>

          {/* Main Terminal */}
          <Terminal title={scenario.title} lines={scenario.lines} />

          {/* State Variants */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>State Variants</h3>
            <DsIdBadge id="ds:terminal:stateVariants-001" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Terminal title="Success" lines={[{ prompt: "$", text: "pnpm build", type: "command" }, { text: "✓ Build hoàn thành (12.3s)", type: "success" }]} state="success" />
            <Terminal title="Error" lines={[{ prompt: "$", text: "pnpm test", type: "command" }, { text: "✗ 2 tests failed", type: "error" }]} state="error" />
          </div>

          {/* Mosaic Layout */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>Mosaic Layout (2×2) — Multi-Agent</h3>
            <DsIdBadge id="ds:terminal:mosaicLayout-001" />
          </div>
          <div className="terminal-mosaic">
            <div className="terminal-mosaic__panel"><Terminal title="Claude-01 (Storage)" lines={[{ prompt: "$", text: "editing driver.go", type: "command" }, { text: "MVCC layer 78% complete", type: "output" }]} /></div>
            <div className="terminal-mosaic__panel"><Terminal title="Claude-02 (CLI)" lines={[{ prompt: "$", text: "testing gmind init...", type: "command" }, { text: "12/12 commands tested", type: "success" }]} state="success" /></div>
            <div className="terminal-mosaic__panel"><Terminal title="Claude-03 (CI)" lines={[{ prompt: "$", text: "running pipeline...", type: "command" }]} state="typing" /></div>
            <div className="terminal-mosaic__panel"><Terminal title="QA-Reviewer" lines={[{ text: "✗ regression in lease_test.go", type: "error" }, { text: "escalating to Level 2...", type: "output" }]} state="error" /></div>
          </div>
        </div>
      )}

      {state === "loading" && (
        <div className="ve-card" style={{ padding: "16px" }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <Skeleton variant="circle" /><Skeleton variant="bar" width="40%" />
          </div>
          <Skeleton variant="card" />
          <div style={{ marginTop: "12px" }}><Skeleton count={4} /></div>
        </div>
      )}

      {state === "empty" && (
        <EmptyState icon="💻" title="Chưa có phiên terminal" desc="Bắt đầu phiên terminal mới để xem output từ các Agent.">
          <button className="btn-primary">+ Phiên mới</button>
        </EmptyState>
      )}

      {state === "error" && (
        <ErrorBanner title="Không thể kết nối terminal" message="WebSocket connection refused. Kiểm tra terminal server đang chạy." onRetry={() => setState("default")} fullpage />
      )}

      {state === "offline" && (
        <div>
          <div className="offline-banner">
            <span className="offline-banner__icon">📡</span>
            WebSocket mất kết nối — Đang kết nối lại...
            <span className="offline-banner__timer">3s</span>
          </div>
          <div style={{ marginTop: "16px", opacity: 0.4 }}>
            <Terminal title="gmind — (Disconnected)" lines={[{ text: "Connection lost at 14:23:01", type: "error" }]} state="error" />
          </div>
        </div>
      )}

      {state === "forbidden" && (
        <div className="forbidden-gate">
          <div className="forbidden-gate__icon">🔒</div>
          <div className="forbidden-gate__title">Không có quyền truy cập</div>
          <div className="forbidden-gate__desc">Bạn cần quyền Agent Operator để truy cập Terminal Console.</div>
          <button className="btn-primary">Yêu cầu quyền</button>
          <div className="forbidden-gate__code">HTTP 403 — Forbidden</div>
        </div>
      )}
    </div>
  );
}
