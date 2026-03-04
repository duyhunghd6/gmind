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

  const cls = [
    "ds-id-badge",
    variant === "sidebar" && "ds-id-badge--sidebar",
    copied && "ds-id-badge--copied",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <code className={cls} onClick={handleCopy} title={`Click để sao chép: ${id}`}>
      <span className="ds-id-badge__icon">{copied ? "✓" : "🏷"}</span>
      {id}
    </code>
  );
}
