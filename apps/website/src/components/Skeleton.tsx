"use client";

interface SkeletonProps { variant?: "text" | "card" | "circle" | "bar"; width?: string; count?: number; }

export default function Skeleton({ variant = "text", width, count = 3 }: SkeletonProps) {
  const a11y = { role: "status" as const, "aria-label": "Đang tải...", "aria-busy": true as const };
  if (variant === "card") return <div className="skeleton skeleton--card" style={width ? { width } : undefined} {...a11y} />;
  if (variant === "circle") return <div className="skeleton skeleton--circle" {...a11y} />;
  if (variant === "bar") return <div className="skeleton skeleton--bar" style={width ? { width } : undefined} {...a11y} />;
  return (
    <div className="skeleton-group" {...a11y}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton skeleton--text${i === count - 1 ? " skeleton--text-short" : ""}`} style={width ? { width } : undefined} />
      ))}
    </div>
  );
}

