"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { explorerItems, TYPE_META, type ExplorerItemType } from "@/data/explorer-data";

const FILTER_TYPES: { value: ExplorerItemType | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "doc", label: "📄 Docs" },
  { value: "commit", label: "⏺ Commits" },
  { value: "task", label: "📋 Tasks" },
  { value: "adr", label: "📐 ADR" },
  { value: "chat", label: "💬 Chat" },
  { value: "spike", label: "🔬 Spike" },
];

export default function ExplorerScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ExplorerItemType | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* Auto-select filter from URL hash (on mount + on hash change) */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && FILTER_TYPES.some((f) => f.value === hash)) {
        setFilter(hash as ExplorerItemType);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const filtered = useMemo(() => {
    let items = explorerItems;
    if (filter !== "all") items = items.filter((i) => i.type === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q) || i.beadsId?.toLowerCase().includes(q) || i.tags?.some((t) => t.includes(q)));
    }
    return items;
  }, [query, filter]);

  const selected = selectedId ? explorerItems.find((i) => i.id === selectedId) : null;

  return (
    <div aria-label="Gmind Explorer Screen">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🔍 Gmind Explorer</h1>
        <DsIdBadge id="ds:screen:explorer-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        Tìm kiếm thống nhất — docs, commits, tasks, ADR, agent chat sessions, spike reports. Click item → xem chi tiết.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div>
          {/* Search Bar */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="text"
                placeholder="Tìm kiếm docs, commits, tasks, ADR, chats..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px",
                  border: "1px solid var(--border)", background: "var(--surface)",
                  color: "var(--text)", fontSize: "0.8125rem", outline: "none",
                }}
              />
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "0.875rem", opacity: 0.5 }}>🔍</span>
            </div>
          </div>

          {/* Type Filters */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
            {FILTER_TYPES.map((f) => (
              <button
                key={f.value}
                className={`state-toggle-bar__btn${filter === f.value ? " state-toggle-bar__btn--active" : ""}`}
                onClick={() => setFilter(f.value)}
                style={{ fontSize: "0.7rem" }}
              >
                {f.label}
                {f.value !== "all" && <span style={{ opacity: 0.6, marginLeft: "4px" }}>({explorerItems.filter((i) => i.type === f.value).length})</span>}
              </button>
            ))}
          </div>

          {/* Results + Detail */}
          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px" : "1fr", gap: "16px" }}>
            {/* Results List */}
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "8px" }}>
                {filtered.length} kết quả {query && `cho "${query}"`}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "500px", overflow: "auto" }}>
                {filtered.map((item) => {
                  const meta = TYPE_META[item.type];
                  const isActive = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className="ve-card"
                      style={{
                        textAlign: "left", cursor: "pointer", padding: "12px 16px",
                        borderColor: isActive ? "var(--accent-cyan)" : undefined,
                        background: isActive ? "rgba(0,229,255,0.04)" : undefined,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span>{meta.icon}</span>
                        <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: "3px", background: `${meta.color}22`, color: meta.color }}>{meta.label}</span>
                        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text)" }}>{item.title}</span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: "0 0 6px 0", lineHeight: 1.4 }}>{item.excerpt}</p>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.65rem", color: "var(--text-dim)" }}>
                        {item.beadsId && <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>{item.beadsId}</span>}
                        <span>{item.date}</span>
                        {item.author && <span>· {item.author}</span>}
                        {item.status && <span style={{
                          padding: "1px 5px", borderRadius: "3px",
                          background: item.status === "done" ? "rgba(63,185,160,0.15)" : item.status === "in-progress" ? "rgba(210,153,34,0.15)" : "rgba(139,148,158,0.1)",
                          color: item.status === "done" ? "#3fb9a0" : item.status === "in-progress" ? "#d29922" : "var(--text-dim)",
                        }}>{item.status}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail Sidebar */}
            {selected && (
              <div className="ve-card" style={{ padding: "16px", alignSelf: "start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "1.25rem" }}>{TYPE_META[selected.type].icon}</span>
                  <button onClick={() => setSelectedId(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "0.875rem" }}>✕</button>
                </div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>{selected.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.5, marginBottom: "12px" }}>{selected.excerpt}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.75rem", marginBottom: "16px" }}>
                  {selected.beadsId && <div><span style={{ color: "var(--text-dim)" }}>Beads ID:</span> <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>{selected.beadsId}</span></div>}
                  <div><span style={{ color: "var(--text-dim)" }}>Date:</span> {selected.date}</div>
                  {selected.author && <div><span style={{ color: "var(--text-dim)" }}>Author:</span> {selected.author}</div>}
                  {selected.tags && <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>{selected.tags.map((t) => <span key={t} style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: "3px", background: "rgba(139,148,158,0.1)", color: "var(--text-dim)" }}>{t}</span>)}</div>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Link href="/design-system/knowledge-graph" style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", textDecoration: "none" }}>🧠 View in Knowledge Graph →</Link>
                  {selected.beadsId && <Link href="/design-system/beads-traversal" style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", textDecoration: "none" }}>🔗 Trace Beads ID →</Link>}
                  {(selected.type === "doc" || selected.type === "adr" || selected.type === "spike") && <Link href="/design-system/doc-viewer" style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", textDecoration: "none" }}>📄 Open in Doc Viewer →</Link>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {state === "loading" && <div className="ve-card" style={{ padding: "16px" }}><Skeleton variant="bar" width="100%" /><div style={{ marginTop: "16px" }}><Skeleton count={6} /></div></div>}
      {state === "empty" && <EmptyState icon="🔍" title="Không tìm thấy kết quả" desc="Thử tìm kiếm với từ khóa khác hoặc mở rộng bộ lọc." />}
      {state === "error" && <ErrorBanner title="Lỗi tìm kiếm" message="Zvec query timeout after 5000ms. Index may need rebuilding: gmind reindex" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Tìm kiếm offline — chỉ hiển thị cache cục bộ<span className="offline-banner__timer">3s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Cần quyền truy cập</div><div className="forbidden-gate__desc">Explorer yêu cầu quyền Observer trở lên.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
