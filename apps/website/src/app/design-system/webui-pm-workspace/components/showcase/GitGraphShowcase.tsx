"use client";

import { useState, useEffect } from "react";
import DsIdBadge from "@/components/DsIdBadge";
import GitGraph from "@/components/GitGraph";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { gitScenarios } from "@/data/git-graph-data";

export function GitGraphShowcase({
  state = "default",
  onAction,
}: {
  state?: string;
  onAction?: (e: string, target?: string) => void;
}) {
  const [scenarioId, setScenarioId] = useState(gitScenarios[0].id);

  /* Auto-select scenario from URL hash (on mount + on hash change) */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && gitScenarios.some((s) => s.id === hash)) {
        setScenarioId(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const scenario = gitScenarios.find((s) => s.id === scenarioId) || gitScenarios[0];

  return (
    <div aria-label="Beads Git Graph Screen">
      {state === "default" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Scenario Tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {gitScenarios.map((s) => (
              <button
                key={s.id}
                className={`state-toggle-bar__btn${scenarioId === s.id ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => {
                  setScenarioId(s.id);
                  if (onAction) onAction("EVENT_HASH_NAVIGATE", s.id);
                }}
                style={{ fontSize: "0.75rem" }}
              >
                {s.label}
              </button>
            ))}
            <DsIdBadge
              id={`ds:gitGraph:${
                ({
                  "gitflow": "gitflow",
                  "multi-agent": "multiAgent",
                  "hotfix": "hotfixEmergency",
                  "release-train": "releaseTrain",
                  "monorepo": "monorepo",
                  "beads-prd-trace": "beadsPrdTrace",
                  "beads-deadlock": "beadsDeadlock",
                  "beads-ds-comp": "beadsDsComp",
                  "beads-traversal": "beadsTraversal",
                  "beads-sprint-review": "beadsSprintReview",
                } as Record<string, string>)[scenarioId] || scenarioId
              }-001`}
            />
          </div>

          {/* Description */}
          <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", fontStyle: "italic", margin: 0 }}>
            {scenario.description}
          </p>

          {/* Graph */}
          <div className="ve-card" style={{ padding: "16px" }}>
            <GitGraph
              branches={scenario.branches}
              commits={scenario.commits}
              connections={scenario.connections}
              width={scenario.width}
              height={scenario.height}
            />
          </div>

          {/* Branch Colors */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {scenario.branches.map((b) => (
              <span
                key={b.name}
                className="git-graph__tag"
                style={{
                  background: `${b.color}22`,
                  color: b.color,
                  border: `1px solid ${b.color}44`,
                  fontSize: "0.75rem",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {b.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "16px", fontSize: "0.7rem", color: "var(--text-dim)" }}>
            <span>🌿 {scenario.branches.length} branches</span>
            <span>⏺ {scenario.commits.length} commits</span>
            <span>🔗 {scenario.connections.length} connections</span>
          </div>
        </div>
      )}

      {state === "loading" && (
        <div className="ve-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="bar" width={`${60 + i * 20}px`} />
            ))}
          </div>
          <Skeleton variant="card" />
        </div>
      )}

      {state === "empty" && (
        <EmptyState
          icon="🌿"
          title="Chưa có lịch sử commit"
          desc="Repository trống. Tạo commit đầu tiên để bắt đầu tracking."
        >
          <button className="btn-primary">git init</button>
        </EmptyState>
      )}

      {state === "error" && (
        <ErrorBanner
          title="Không thể đọc git log"
          message="fatal: not a git repository — .git directory not found"
          onRetry={() => onAction && onAction("EVENT_REFRESH")}
          fullpage
        />
      )}

      {state === "offline" && (
        <div className="offline-banner">
          <span className="offline-banner__icon">📡</span>Không thể fetch remote branches
          <span className="offline-banner__timer">5s</span>
        </div>
      )}

      {state === "forbidden" && (
        <div className="forbidden-gate">
          <div className="forbidden-gate__icon">🔒</div>
          <div className="forbidden-gate__title">Repository riêng tư</div>
          <div className="forbidden-gate__desc">Bạn không có quyền truy cập repository này.</div>
          <div className="forbidden-gate__code">HTTP 403 — Forbidden</div>
        </div>
      )}
    </div>
  );
}
