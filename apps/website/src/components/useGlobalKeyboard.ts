"use client";

import { useEffect, useCallback } from "react";

/**
 * Global keyboard handler for the Design System
 * ESC = dismiss/close/cancel active overlays
 * Enter = confirm active action (delegated to focused element)
 */
export function useGlobalKeyboard(onEscape?: () => void) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      /* ESC — dismiss any open overlay/popover/sidebar */
      if (e.key === "Escape") {
        /* Dispatch custom event so any open modal/popover can listen */
        window.dispatchEvent(new CustomEvent("ds:escape"));
        onEscape?.();
      }

      /* Enter — let the browser handle focused-element activation */
      /* No override needed: buttons/links already activate on Enter */
    },
    [onEscape]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
