"use client";

import { useState, useCallback } from "react";

interface DsIdBadgeProps {
  id: string;
  /** Use "sidebar" for the compact sidebar variant */
  variant?: "default" | "sidebar";
}

export default function DsIdBadge({ id, variant = "default" }: DsIdBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCopy();
      }
    },
    [handleCopy]
  );

  const cls = [
    "ds-id-badge",
    variant === "sidebar" && "ds-id-badge--sidebar",
    copied && "ds-id-badge--copied",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <code
      className={cls}
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      title={`Click để sao chép: ${id}`}
      tabIndex={0}
      role="button"
      aria-label={`Sao chép ID: ${id}`}
    >
      <span className="ds-id-badge__icon" aria-hidden="true">{copied ? "✓" : "🏷"}</span>
      {id}
    </code>
  );
}

