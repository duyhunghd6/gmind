"use client";

import { useState } from "react";
import Link from "next/link";
import StateToggleBar, { type ScreenState } from "@/components/StateToggleBar";
import DsIdBadge from "@/components/DsIdBadge";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorBanner from "@/components/ErrorBanner";
import { docTree, docContents, type DocFile } from "@/data/doc-viewer-data";

function FileTreeNode({ node, depth, selected, onSelect }: { node: DocFile; depth: number; selected: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const isActive = node.id === selected;

  return (
    <div>
      <button
        onClick={() => { isFolder ? setOpen((o) => !o) : onSelect(node.id); }}
        style={{
          display: "flex", alignItems: "center", gap: "6px", width: "100%",
          padding: "4px 8px", paddingLeft: `${12 + depth * 16}px`,
          background: isActive ? "rgba(0,229,255,0.1)" : "transparent",
          border: "none", borderLeft: isActive ? "2px solid var(--accent-cyan)" : "2px solid transparent",
          color: isActive ? "var(--accent-cyan)" : "var(--text)", cursor: "pointer",
          fontSize: "0.75rem", textAlign: "left", borderRadius: "0 4px 4px 0",
        }}
      >
        <span style={{ opacity: 0.7 }}>{isFolder ? (open ? "📂" : "📁") : "📄"}</span>
        <span>{node.name}</span>
        {node.beadsId && <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", opacity: 0.6, marginLeft: "auto" }}>{node.beadsId}</span>}
      </button>
      {isFolder && open && node.children?.map((child) => (
        <FileTreeNode key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function DocViewerScreen() {
  const [state, setState] = useState<ScreenState>("default");
  const [selectedId, setSelectedId] = useState("prd-01");

  const doc = docContents[selectedId];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>📄 Document Viewer</h1>
        <DsIdBadge id="ds:screen:doc-viewer-001" />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8125rem", marginBottom: "16px" }}>
        File browser kiểu GitHub — duyệt docs, PRDs, ADRs, Spike Reports. Click Beads ID để trace trong Knowledge Graph.
      </p>

      <StateToggleBar activeState={state} onChange={setState} />

      {state === "default" && (
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "16px", minHeight: "500px" }}>
          {/* File Tree Sidebar */}
          <div className="ve-card" style={{ padding: "8px 0", overflow: "auto", maxHeight: "600px" }}>
            <div style={{ padding: "8px 12px", fontSize: "0.7rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Explorer</div>
            {docTree.map((node) => (
              <FileTreeNode key={node.id} node={node} depth={0} selected={selectedId} onSelect={setSelectedId} />
            ))}
          </div>

          {/* Content Panel */}
          <div className="ve-card" style={{ padding: "24px", overflow: "auto", maxHeight: "600px" }}>
            {doc ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{doc.title}</h2>
                  <Link href="/design-system/explorer" style={{ fontSize: "0.65rem", color: "var(--accent-cyan)", textDecoration: "none", opacity: 0.7 }}>🔍 Search</Link>
                </div>
                <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "20px", padding: "4px 8px", background: "rgba(0,229,255,0.06)", borderRadius: "4px", display: "inline-block" }}>
                  Beads ID: {doc.beadsId}
                </div>

                {doc.sections.map((sec) => (
                  <div key={sec.anchor} id={sec.anchor} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>{sec.title}</h3>
                      {sec.status && (
                        <span style={{
                          fontSize: "0.6rem", padding: "1px 6px", borderRadius: "3px",
                          background: sec.status === "covered" ? "rgba(63,185,160,0.15)" : sec.status === "partial" ? "rgba(210,153,34,0.15)" : "rgba(255,123,114,0.15)",
                          color: sec.status === "covered" ? "#3fb9a0" : sec.status === "partial" ? "#d29922" : "#ff7b72",
                        }}>
                          {sec.status}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/design-system/knowledge-graph"
                      style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}
                    >
                      🔗 {sec.beadsId} → View in Graph
                    </Link>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", lineHeight: 1.6, margin: 0 }}>{sec.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-dim)", fontSize: "0.8125rem" }}>
                ← Chọn một tài liệu từ cây bên trái
              </div>
            )}
          </div>
        </div>
      )}

      {state === "loading" && <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "16px" }}><div className="ve-card" style={{ padding: "16px" }}><Skeleton count={8} /></div><div className="ve-card" style={{ padding: "16px" }}><Skeleton variant="card" /><div style={{ marginTop: "16px" }}><Skeleton count={6} /></div></div></div>}
      {state === "empty" && <EmptyState icon="📄" title="Chưa có tài liệu" desc="Thêm file .md vào thư mục docs/ để bắt đầu." />}
      {state === "error" && <ErrorBanner title="Lỗi đọc tài liệu" message="Failed to parse markdown: invalid YAML front matter in PRD-02.md" onRetry={() => setState("default")} fullpage />}
      {state === "offline" && <div className="offline-banner"><span className="offline-banner__icon">📡</span>Đang hiển thị bản cache cục bộ<span className="offline-banner__timer">5s</span></div>}
      {state === "forbidden" && <div className="forbidden-gate"><div className="forbidden-gate__icon">🔒</div><div className="forbidden-gate__title">Documentation riêng tư</div><div className="forbidden-gate__desc">Cần quyền truy cập repository để xem tài liệu.</div><div className="forbidden-gate__code">HTTP 403</div></div>}
    </div>
  );
}
