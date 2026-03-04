"use client";

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  fullpage?: boolean;
}

export default function ErrorBanner({ title = "Đã xảy ra lỗi", message, onRetry, fullpage }: ErrorBannerProps) {
  return (
    <div className={`error-banner${fullpage ? " error-banner--fullpage" : ""}`}>
      <span className="error-banner__icon">⚠️</span>
      <div className="error-banner__text">
        <div className="error-banner__title">{title}</div>
        <div className="error-banner__desc">{message}</div>
      </div>
      {onRetry && (
        <button className="error-banner__retry" onClick={onRetry}>Thử lại</button>
      )}
    </div>
  );
}
