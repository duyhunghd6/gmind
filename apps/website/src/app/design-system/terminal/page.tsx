"use client";

import { useState } from "react";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import Terminal from "@/components/Terminal";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";

const demoLines = [
  { prompt: "$", text: "gmind search-codebase \"FrankenSQLite driver\"", type: "command" as const },
  { text: "Đang tìm kiếm trong 2,847 files...", type: "output" as const },
  { text: "✓ Tìm thấy 12 kết quả trong 0.34s", type: "success" as const },
  { prompt: "$", text: "bd create \"Setup MVCC layer\" --tag=\"implements:br-plan-01\"", type: "command" as const },
  { text: "Đã tạo task bd-a1b2 (priority: P2)", type: "success" as const },
  { prompt: "$", text: "gmind gh pr --status", type: "command" as const },
  { text: "#42 feat(storage): add FrankenSQLite driver — Merged ✓", type: "success" as const },
  { text: "#43 fix(mvcc): resolve deadlock on concurrent writes — Open", type: "output" as const },
];

export default function TerminalScreen() {
  const [state, setState] = useState<ScreenState>("default");

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: "var(--text)" }}>💻 Terminal</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        <code>ds-comp-terminal</code> + <code>ds-lay-terminal-mosaic</code> — Cửa sổ terminal với ANSI colors, cursor blink, mosaic layout.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gap: "16px" }}>
          <Terminal title="gmind — Agent Console" lines={demoLines} />
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, marginTop: "8px" }}>State Variants</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Terminal title="Success" lines={[{ prompt: "$", text: "pnpm build", type: "command" }, { text: "✓ Build hoàn thành (12.3s)", type: "success" }]} state="success" />
            <Terminal title="Error" lines={[{ prompt: "$", text: "pnpm test", type: "command" }, { text: "✗ 2 tests failed", type: "error" }]} state="error" />
          </div>
          <h3 style={{ color: "var(--text)", fontSize: "0.875rem", fontWeight: 600, marginTop: "8px" }}>Mosaic Layout (2×2)</h3>
          <div className="terminal-mosaic">
            <div className="terminal-mosaic__panel"><Terminal title="Agent-01" lines={[{ prompt: "$", text: "editing driver.go", type: "command" }]} /></div>
            <div className="terminal-mosaic__panel"><Terminal title="Agent-02" lines={[{ prompt: "$", text: "running tests...", type: "command" }]} state="typing" /></div>
            <div className="terminal-mosaic__panel"><Terminal title="Agent-03" lines={[{ text: "✓ 42/42 passed", type: "success" }]} state="success" /></div>
            <div className="terminal-mosaic__panel"><Terminal title="QA" lines={[{ text: "✗ regression detected", type: "error" }]} state="error" /></div>
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
