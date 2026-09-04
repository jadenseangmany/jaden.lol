"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useBloom } from "@/components/bloom/Bloom";

const STORAGE_KEY = "jaden.mode-hint";

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export function ModeHint({ children }: { children: ReactNode }) {
  const { cycleMode } = useBloom();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) || localStorage.getItem("jaden.bloom")) {
        return;
      }
    } catch {
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      markSeen();
      setVisible(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  function dismiss() {
    markSeen();
    setVisible(false);
  }

  return (
    <div className="mode-cluster" onClick={dismiss}>
      {children}
      {visible ? (
        <button
          type="button"
          className="mode-hint"
          onClick={(event) => {
            event.stopPropagation();
            dismiss();
            cycleMode();
          }}
        >
          <svg className="mode-hint-svg" viewBox="0 0 72 44" aria-hidden="true">
            <path className="mode-hint-line" d="M16 40 C 16 16, 50 12, 54 8" />
            <path className="mode-hint-head" d="M54 2 L60 10 L48 10 Z" />
          </svg>
          <span className="mode-hint-copy">try clicking here!</span>
        </button>
      ) : null}
    </div>
  );
}
