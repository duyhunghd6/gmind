"use client";

import { useEffect, useCallback, useRef } from "react";

/* ds:comp:modal-001 — Modal dialog with ESC/Enter/backdrop/X support */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  showFooter?: boolean;
}

export default function Modal({
  open,
  onClose,
  onConfirm,
  title,
  size = "md",
  children,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  showFooter = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ESC to close — listen for global ds:escape event */
  useEffect(() => {
    if (!open) return;
    const handleEscape = () => onClose();
    window.addEventListener("ds:escape", handleEscape);
    return () => window.removeEventListener("ds:escape", handleEscape);
  }, [open, onClose]);

  /* Also handle direct keydown for standalone usage */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Enter" && onConfirm) {
        e.preventDefault();
        onConfirm();
      }
    },
    [onClose, onConfirm]
  );

  /* Trap focus inside modal when open */
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    firstFocusable?.focus();
  }, [open]);

  /* Prevent body scroll when modal open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sizeClass = size !== "md" ? ` modal--${size}` : "";

  return (
    <div
      className={`modal-backdrop${open ? " modal-backdrop--open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={`modal${sizeClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{title}</h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Đóng hộp thoại"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {showFooter && (
          <div className="modal__footer">
            <button
              className="btn-secondary btn-sm"
              onClick={onClose}
              type="button"
            >
              {cancelLabel}
            </button>
            {onConfirm && (
              <button
                className="btn-primary btn-sm"
                onClick={onConfirm}
                type="button"
              >
                {confirmLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
