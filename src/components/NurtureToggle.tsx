"use client";

import { useEffect, useRef, useState } from "react";
import { useBloom, useBloomSnapshot } from "@/components/bloom/Bloom";
import { BloomText, releaseChar, scrambleChar } from "@/components/bloom/chars";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function NurtureToggle() {
  const { setFullBloom } = useBloom();
  const { fullBloom } = useBloomSnapshot();
  const rootRef = useRef<HTMLButtonElement>(null);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !fullBloom) return;
    root.querySelectorAll<HTMLElement>("[data-bloom-char]").forEach((el) => {
      if (!el.classList.contains("is-bloom")) scrambleChar(el, 0, true);
    });
  }, [fullBloom]);

  function onClick() {
    const visuallyOn =
      fullBloom || document.documentElement.classList.contains("full-bloom");
    const next = !visuallyOn;
    const root = rootRef.current;
    const reduced = prefersReducedMotion();
    if (next) {
      setBurst((count) => count + 1);
      root?.querySelectorAll<HTMLElement>("[data-bloom-char]").forEach((el, i) => {
        scrambleChar(el, reduced ? 0 : i * 32, reduced);
      });
    } else {
      root?.querySelectorAll<HTMLElement>("[data-bloom-char]").forEach((el, i) => {
        scrambleChar(el, reduced ? 0 : i * 24, reduced);
        window.setTimeout(() => releaseChar(el), reduced ? 0 : 280 + i * 24);
      });
    }
    setFullBloom(next);
  }

  return (
    <button
      ref={rootRef}
      type="button"
      className="nurture-toggle"
      aria-pressed={fullBloom}
      onClick={onClick}
    >
      {burst > 0 ? (
        <span className="nurture-burst" key={burst} aria-hidden="true" />
      ) : null}
      <span className="nurture-toggle-label">
        <BloomText text="nurture" />
      </span>
    </button>
  );
}
