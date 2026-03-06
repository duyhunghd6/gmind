"use client";

import { useState } from "react";
import MermaidDiagram from "./MermaidDiagram";
import { sequenceDiagrams, type SequenceDiagram } from "@/data/sequence-diagrams-data";

/* ──────── Component ──────── */
export default function SequenceDiagramSection() {
  const [activeId, setActiveId] = useState(sequenceDiagrams[0]?.id ?? "");

  const active = sequenceDiagrams.find((d) => d.id === activeId) ?? sequenceDiagrams[0];
  if (!active) return null;

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "16px",
        }}
      >
        {sequenceDiagrams.map((d) => (
          <TabButton
            key={d.id}
            diagram={d}
            isActive={d.id === active.id}
            onClick={() => setActiveId(d.id)}
          />
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          color: "var(--text-dim)",
          fontSize: "0.9rem",
          marginBottom: "12px",
          minHeight: "1.4em",
        }}
      >
        {active.description}
      </p>

      {/* Diagram */}
      <MermaidDiagram key={active.id} code={active.mermaidCode} />
    </div>
  );
}

/* ──────── Tab Button ──────── */
function TabButton({
  diagram,
  isActive,
  onClick,
}: {
  diagram: SequenceDiagram;
  isActive: boolean;
  onClick: () => void;
}) {
  const accentVar = `var(--accent-${diagram.accent})`;
  const accentDimVar = `var(--accent-${diagram.accent}-dim)`;

  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: "6px",
        border: isActive ? `1.5px solid ${accentVar}` : "1px solid var(--border-subtle, rgba(100,116,139,0.3))",
        background: isActive ? accentDimVar : "transparent",
        color: isActive ? accentVar : "var(--text-dim)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {diagram.title}
    </button>
  );
}
