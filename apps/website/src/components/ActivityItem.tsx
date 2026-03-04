"use client";

interface ActivityItemProps {
  agent: string;
  action: string;
  time: string;
  detail?: string;
  variant?: "info" | "success" | "warning" | "error";
}

export default function ActivityItem({
  agent,
  action,
  time,
  detail,
  variant = "info",
}: ActivityItemProps) {
  return (
    <div className={`activity-item activity-item--${variant}`}>
      <div className="activity-item__indicator">
        <span className="activity-item__dot" />
        <span className="activity-item__line" />
      </div>
      <div className="activity-item__content">
        <div className="activity-item__header">
          <span className="activity-item__agent">{agent}</span>
          <span className="activity-item__action">{action}</span>
          <span className="activity-item__time">{time}</span>
        </div>
        {detail && <div className="activity-item__detail">{detail}</div>}
      </div>
    </div>
  );
}
