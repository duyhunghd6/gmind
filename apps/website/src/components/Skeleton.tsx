"use client";

interface SkeletonProps { variant?: "text" | "card" | "circle" | "bar"; width?: string; count?: number; }

export default function Skeleton({ variant = "text", width, count = 3 }: SkeletonProps) {
  if (variant === "card") return <div className="skeleton skeleton--card" style={width ? { width } : undefined} />;
  if (variant === "circle") return <div className="skeleton skeleton--circle" />;
  if (variant === "bar") return <div className="skeleton skeleton--bar" style={width ? { width } : undefined} />;
  return (
    <div className="skeleton-group">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton skeleton--text${i === count - 1 ? " skeleton--text-short" : ""}`} style={width ? { width } : undefined} />
      ))}
    </div>
  );
}
