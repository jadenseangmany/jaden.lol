"use client";

import { useEffect, useRef, useState } from "react";
import { useBloom, useBloomSnapshot, type BloomMode } from "@/components/bloom/Bloom";
import { BloomText, releaseChar, scrambleChar } from "@/components/bloom/chars";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const MODE_HINT: Record<BloomMode, string> = {
  hybrid: "Hybrid. Hover blooms. Click to switch mode.",
  nurture: "Nurture. Page-wide canopy. Click to switch mode.",
  simple: "Simple. Vercel rest, grey hover. Click to switch mode.",
};

export function NurtureToggle() {
  const { cycleMode } = useBloom();
  const { mode } = useBloomSnapshot();
  const rootRef = useRef<HTMLButtonElement>(null);
  const skipIntro = useRef(true);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLElement>("[data-bloom-char]");
    if (skipIntro.current) {
      skipIntro.current = false;
      if (mode === "nurture") {
        chars.forEach((el) => el.classList.add("is-bloom"));
      }
      return;
    }
    const reduced = prefersReducedMotion();
    if (mode === "simple" || mode === "hybrid") {
      chars.forEach((el) => releaseChar(el));
      return;
    }
    chars.forEach((el, i) => {
      scrambleChar(el, reduced ? 0 : i * 28, reduced);
    });
    setBurst((count) => count + 1);
  }, [mode]);

  return (
    <button
      ref={rootRef}
      type="button"
      className="mode-toggle"
      aria-label={MODE_HINT[mode]}
      onClick={() => cycleMode()}
    >
      {burst > 0 && mode === "nurture" ? (
        <span className="nurture-burst" key={burst} aria-hidden="true" />
      ) : null}
      <span className="mode-toggle-label" data-mode={mode}>
        <BloomText key={mode} text={mode} />
      </span>
    </button>
  );
}
