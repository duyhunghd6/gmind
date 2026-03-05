"use client";

import { useEffect, useMemo } from "react";
import Graph from "graphology";
import { SigmaContainer, useRegisterEvents, useSigma, ControlsContainer, ZoomControl, FullScreenControl } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/style.css";

/* ─── Data Types ─── */
interface GraphData {
  nodes: { id: string; label: string; type: string }[];
  edges: { source: string; target: string; type: string }[];
}

/* ─── Colors ─── */
const TYPE_COLORS: Record<string, string> = {
  prd: "#ff7b72",
  plan: "#d29922",
  task: "#3fb9a0",
  commit: "#d2a8ff",
  document: "#00e5ff",
  spike: "#f78166",
  agent: "#58a6ff",
  workflow: "#bc8cff",
  test: "#7ee787",
  release: "#79c0ff",
  adr: "#ffa657",
};

const EDGE_COLORS: Record<string, string> = {
  satisfies: "#d29922",
  implements: "#3fb9a0",
  blocks: "#ff7b72",
  triggers: "#bc8cff",
  validates: "#7ee787",
  "depends-on": "#58a6ff",
  references: "#8b949e",
};

/* ─── ForceAtlas2 Auto-Layout ─── */
function ForceLayout() {
  const { start, stop } = useWorkerLayoutForceAtlas2({
    settings: {
      gravity: 1,
      scalingRatio: 4,
      slowDown: 5,
      barnesHutOptimize: true,
    },
  });

  useEffect(() => {
    start();
    const timer = setTimeout(() => stop(), 4000);
    return () => { clearTimeout(timer); stop(); };
  }, [start, stop]);

  return null;
}

/* ─── Interactions: Hover + Click ─── */
function GraphEvents({ onSelect }: { onSelect: (id: string | null) => void }) {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    const graph = sigma.getGraph();

    registerEvents({
      enterNode: ({ node }) => {
        // Highlight neighbors
        const neighbors = new Set(graph.neighbors(node));
        neighbors.add(node);
        graph.forEachNode((n) => {
          graph.setNodeAttribute(n, "highlighted", neighbors.has(n));
        });
        sigma.refresh();
      },
      leaveNode: () => {
        graph.forEachNode((n) => {
          graph.setNodeAttribute(n, "highlighted", true);
        });
        sigma.refresh();
      },
      clickNode: ({ node }) => {
        onSelect(node);
      },
      clickStage: () => {
        onSelect(null);
      },
    });
  }, [sigma, registerEvents, onSelect]);

  return null;
}

/* ─── Main Viewer ─── */
export default function KnowledgeGraphViewer({ data, onSelect }: { data: GraphData; onSelect?: (id: string | null) => void }) {
  const graph = useMemo(() => {
    const g = new Graph();

    data.nodes.forEach((n, i) => {
      const angle = (2 * Math.PI * i) / data.nodes.length;
      g.addNode(n.id, {
        label: n.label,
        x: Math.cos(angle) * 100,
        y: Math.sin(angle) * 100,
        size: n.type === "prd" ? 16 : n.type === "plan" ? 13 : 10,
        color: TYPE_COLORS[n.type] || "#8b949e",
        type: "circle",
        highlighted: true,
        nodeType: n.type,
      });
    });

    data.edges.forEach((e, i) => {
      const key = `e-${i}`;
      if (!g.hasNode(e.source) || !g.hasNode(e.target)) return;
      g.addEdge(e.source, e.target, {
        color: EDGE_COLORS[e.type] || "#8b949e44",
        size: e.type === "blocks" ? 2 : 1.5,
        type: e.type === "implements" ? "arrow" : "line",
        edgeType: e.type,
        label: e.type,
      });
    });

    return g;
  }, [data]);

  return (
    <div style={{ height: 520, border: "1px solid var(--border, rgba(255,255,255,0.06))", borderRadius: "8px", overflow: "hidden", background: "var(--surface, #161b22)" }}>
      <SigmaContainer
        style={{ height: "100%", width: "100%" }}
        graph={graph}
        settings={{
          allowInvalidContainer: true,
          defaultNodeColor: "#8b949e",
          defaultEdgeColor: "#8b949e44",
          labelFont: "DM Sans, system-ui, sans-serif",
          labelColor: { color: "#c9d1d9" },
          labelSize: 11,
          labelRenderedSizeThreshold: 6,
          renderEdgeLabels: false,
          enableEdgeEvents: true,
          zIndex: true,
          nodeReducer: (node, data) => ({
            ...data,
            color: data.highlighted ? data.color : `${data.color}33`,
            label: data.highlighted ? data.label : "",
          }),
          edgeReducer: (_edge, data) => ({
            ...data,
          }),
        }}
      >
        <ForceLayout />
        <GraphEvents onSelect={onSelect || (() => {})} />
        <ControlsContainer position={"bottom-right"} className="sigma-controls-glass">
          <ZoomControl className="sigma-btn-glass" />
          <FullScreenControl className="sigma-btn-glass" />
        </ControlsContainer>
      </SigmaContainer>
    </div>
  );
}
