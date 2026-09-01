"use client";

import { useEffect, useRef } from "react";
import { createCanopy } from "./canopy-scene";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CanopyBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const handle = createCanopy(root, {
      reduced: prefersReducedMotion(),
    });
    return () => handle.dispose();
  }, []);

  return <div className="canopy-root" ref={rootRef} aria-hidden="true" />;
}
