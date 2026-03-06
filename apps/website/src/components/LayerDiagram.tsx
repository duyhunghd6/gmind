"use client";

import { useState, useEffect, useCallback } from "react";

export interface LayerData {
  num: string;
  title: string;
  accent: string;
  tech: string;
  items: string[];
}

interface Props {
  layers: LayerData[];
}

export default function LayerDiagram({ layers }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [autoCycle, setAutoCycle] = useState(true);

  /* Auto-cycle through layers every 3s until user clicks */
  useEffect(() => {
    if (!autoCycle) return;
    let idx = 0;
    setSelectedIdx(0);
    const timer = setInterval(() => {
      idx = (idx + 1) % layers.length;
      setSelectedIdx(idx);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoCycle, layers.length]);

  const handleClick = useCallback(
    (idx: number) => {
      setAutoCycle(false);
      setSelectedIdx((prev) => (prev === idx ? null : idx));
    },
    [],
  );

  return (
    <div className="layer-diagram">
      {layers.map((layer, idx) => {
        const isSelected = selectedIdx === idx;
        const accentVar = `var(${layer.accent})`;

        return (
          <div key={layer.num}>
            {/* Connector line above (skip first) */}
            {idx > 0 && (
              <div className="layer-connector">
                <div
                  className={`layer-connector__line${
                    isSelected || selectedIdx === idx - 1 ? " active" : ""
                  }`}
                  style={
                    isSelected || selectedIdx === idx - 1
                      ? ({ "--layer-accent": accentVar } as React.CSSProperties)
                      : undefined
                  }
                >
                  <span>↑</span>
                  <span style={{ fontSize: "0.5rem" }}>│</span>
                  <span>↓</span>
                </div>
              </div>
            )}

            {/* Layer bar */}
            <div
              className={`layer-bar${isSelected ? " selected" : ""}`}
              style={{ "--layer-accent": accentVar } as React.CSSProperties}
              onClick={() => handleClick(idx)}
              role="button"
              tabIndex={0}
              aria-expanded={isSelected}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(idx);
                }
              }}
            >
              {/* Header row */}
              <div className="layer-bar__header">
                <span
                  className="layer-bar__number"
                  style={{ color: accentVar }}
                >
                  {layer.num}
                </span>
                <span className="layer-bar__title">{layer.title}</span>
                <span className="layer-bar__tech">{layer.tech}</span>
                <span className="layer-bar__chevron">▼</span>
              </div>

              {/* Expandable detail */}
              <div className="layer-bar__detail">
                <ul>
                  {layer.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
