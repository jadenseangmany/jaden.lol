"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { syncUnitChars, wrapLooseText } from "@/components/bloom/chars";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function EnterScramble({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    wrapLooseText(root);
    const reduced = prefersReducedMotion();
    syncUnitChars(root, "all", reduced);
    const id = window.setTimeout(() => {
      syncUnitChars(root, null, reduced);
    }, reduced ? 0 : 1100);
    return () => {
      window.clearTimeout(id);
      syncUnitChars(root, null, true);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
