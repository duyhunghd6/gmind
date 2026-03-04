"use client";

interface Branch {
  name: string;
  color: string;
  className: string;
}

interface Commit {
  id: string;
  branch: string;
  x: number;
  y: number;
  tag?: string;
}

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  branch: string;
}

interface GitGraphProps {
  branches: Branch[];
  commits: Commit[];
  connections: Connection[];
  width?: number;
  height?: number;
}

export default function GitGraph({
  branches,
  commits,
  connections,
  width = 600,
  height = 300,
}: GitGraphProps) {
  const branchMap = Object.fromEntries(branches.map((b) => [b.name, b]));

  return (
    <div className="git-graph">
      {/* Legend */}
      <div className="git-graph__legend">
        {branches.map((b) => (
          <div key={b.name} className="git-graph__legend-item">
            <span
              className="git-graph__legend-dot"
              style={{ background: b.color }}
            />
            {b.name}
          </div>
        ))}
      </div>

      {/* SVG Graph */}
      <svg
        className="git-graph__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Đồ thị Git: ${branches.map((b) => b.name).join(", ")}`}
      >
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const branch = branchMap[conn.branch];
          const d =
            conn.from.x === conn.to.x
              ? `M${conn.from.x},${conn.from.y} L${conn.to.x},${conn.to.y}`
              : `M${conn.from.x},${conn.from.y} C${conn.from.x},${(conn.from.y + conn.to.y) / 2} ${conn.to.x},${(conn.from.y + conn.to.y) / 2} ${conn.to.x},${conn.to.y}`;
          return (
            <path
              key={i}
              className={`git-graph__line git-graph__line--${branch?.className || "master"}`}
              d={d}
              style={branch ? { stroke: branch.color } : undefined}
            />
          );
        })}

        {/* Commit dots */}
        {commits.map((commit) => {
          const branch = branchMap[commit.branch];
          return (
            <g key={commit.id}>
              <circle
                className={`git-graph__dot git-graph__dot--${branch?.className || "master"}`}
                cx={commit.x}
                cy={commit.y}
                style={branch ? { fill: branch.color } : undefined}
              />
              {commit.tag && (
                <foreignObject
                  x={commit.x + 8}
                  y={commit.y - 26}
                  width="80"
                  height="24"
                  overflow="visible"
                >
                  <span className="git-graph__tag git-graph__tag--version">
                    {commit.tag}
                  </span>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
