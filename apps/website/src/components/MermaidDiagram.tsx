"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mermaid from "mermaid";

/* ──────── Props ──────── */
interface MermaidDiagramProps {
  code: string;
  className?: string;
}

/* ──────── Theme configs ──────── */
const DARK_THEME = {
  theme: "dark" as const,
  themeVariables: {
    background: "transparent",
    primaryColor: "#0e7490",
    primaryBorderColor: "#22d3ee",
    primaryTextColor: "#e2e8f0",
    secondaryColor: "#1e293b",
    secondaryBorderColor: "#475569",
    secondaryTextColor: "#cbd5e1",
    tertiaryColor: "#0f172a",
    tertiaryBorderColor: "#334155",
    tertiaryTextColor: "#94a3b8",
    noteBkgColor: "#1e293b",
    noteTextColor: "#e2e8f0",
    noteBorderColor: "#475569",
    lineColor: "#64748b",
    textColor: "#e2e8f0",
    actorBkg: "#0c4a6e",
    actorBorder: "#22d3ee",
    actorTextColor: "#e2e8f0",
    activationBkgColor: "#164e63",
    activationBorderColor: "#22d3ee",
    signalColor: "#94a3b8",
    signalTextColor: "#e2e8f0",
    labelBoxBkgColor: "#1e293b",
    labelBoxBorderColor: "#475569",
    labelTextColor: "#e2e8f0",
    loopTextColor: "#22d3ee",
    altSectionBkgColor: "#0f172a",
  },
};

const LIGHT_THEME = {
  theme: "base" as const,
  themeVariables: {
    background: "transparent",
    primaryColor: "#dbeafe",
    primaryBorderColor: "#0284c7",
    primaryTextColor: "#0f172a",
    secondaryColor: "#f1f5f9",
    secondaryBorderColor: "#94a3b8",
    secondaryTextColor: "#334155",
    tertiaryColor: "#f8fafc",
    tertiaryBorderColor: "#cbd5e1",
    tertiaryTextColor: "#475569",
    noteBkgColor: "#fef3c7",
    noteTextColor: "#1e293b",
    noteBorderColor: "#d97706",
    lineColor: "#475569",
    textColor: "#0f172a",
    actorBkg: "#dbeafe",
    actorBorder: "#0284c7",
    actorTextColor: "#0f172a",
    activationBkgColor: "#e0f2fe",
    activationBorderColor: "#0284c7",
    signalColor: "#475569",
    signalTextColor: "#0f172a",
    labelBoxBkgColor: "#f1f5f9",
    labelBoxBorderColor: "#94a3b8",
    labelTextColor: "#0f172a",
    loopTextColor: "#0284c7",
    altSectionBkgColor: "#f8fafc",
  },
};

const SEQUENCE_CONFIG = {
  mirrorActors: false,
  showSequenceNumbers: true,
  actorMargin: 60,
  messageMargin: 30,
  boxMargin: 8,
  noteMargin: 8,
  useMaxWidth: true,
  wrap: true,
};

/* ──────── Helpers ──────── */
let renderCounter = 0;

function getPrefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function initMermaid(isDark: boolean) {
  const cfg = isDark ? DARK_THEME : LIGHT_THEME;
  mermaid.initialize({
    startOnLoad: false,
    ...cfg,
    sequence: SEQUENCE_CONFIG,
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
  });
}

/* ──────── Component ──────── */
export default function MermaidDiagram({ code, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Listen for theme changes
  useEffect(() => {
    setIsDark(getPrefersDark());
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const renderDiagram = useCallback(async () => {
    if (!containerRef.current || !code) return;

    initMermaid(isDark);
    renderCounter += 1;
    const elementId = `mmd-${renderCounter}-${Date.now()}`;

    try {
      setError(null);
      containerRef.current.innerHTML = "";
      const { svg } = await mermaid.render(elementId, code);
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    } catch (err) {
      console.error("Mermaid render error:", err);
      setError(err instanceof Error ? err.message : "Lỗi render diagram");
      const tempEl = document.getElementById("d" + elementId);
      if (tempEl) tempEl.remove();
    }
  }, [code, isDark]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  if (error) {
    return (
      <div
        className={className}
        style={{
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid var(--accent-rose)",
          background: "var(--accent-rose-dim)",
          color: "var(--accent-rose)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
        }}
      >
        ⚠️ Lỗi mermaid: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        overflow: "auto",
        borderRadius: "10px",
        padding: "16px",
        background: isDark
          ? "rgba(15, 23, 42, 0.6)"
          : "rgba(241, 245, 249, 0.8)",
        border: "1px solid var(--border)",
        transition: "background 0.3s ease",
      }}
    />
  );
}
