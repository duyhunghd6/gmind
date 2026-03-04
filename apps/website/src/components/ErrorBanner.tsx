"use client";

import { useState } from "react";

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  fullpage?: boolean;
}

export default function ErrorBanner({ title = "Đã xảy ra lỗi", message, onRetry, onDismiss, fullpage }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`error-banner${fullpage ? " error-banner--fullpage" : ""}`} role="alert" aria-live="assertive">
      <span className="error-banner__icon" aria-hidden="true">⚠️</span>
      <div className="error-banner__text">
        <div className="error-banner__title">{title}</div>
        <div className="error-banner__desc">{message}</div>
      </div>
      {onRetry && (
        <button className="error-banner__retry" onClick={onRetry} type="button">Thử lại</button>
      )}
      <button
        className="error-banner__close"
        onClick={handleDismiss}
        aria-label="Đóng thông báo lỗi"
        type="button"
        style={{
          background: "none",
          border: "none",
          color: "var(--text-dim, #8b949e)",
          fontSize: "1.1rem",
          cursor: "pointer",
          padding: "4px 8px",
          marginLeft: "auto",
          borderRadius: "4px",
          transition: "color 150ms",
        }}
      >
        ✕
      </button>
    </div>
  );
}

