"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { syncUnitChars } from "@/components/bloom/chars";

const HOLD_MS = [4000, 5000, 6000, 7000, 8000] as const;
const SCRAMBLE_MS = 900;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function nextHold() {
  return HOLD_MS[(Math.random() * HOLD_MS.length) | 0] ?? 6000;
}

export function useSyncedScramble(
  rootRefs: RefObject<HTMLElement | null>[],
  onAdvance: () => void,
  token: string,
) {
  const onAdvanceRef = useRef(onAdvance);
  const rootsRef = useRef(rootRefs);

  useLayoutEffect(() => {
    onAdvanceRef.current = onAdvance;
    rootsRef.current = rootRefs;
  });

  useEffect(() => {
    const roots = rootsRef.current
      .map((ref) => ref.current)
      .filter((node): node is HTMLElement => node != null);
    if (roots.length === 0) return;

    const reduced = prefersReducedMotion();
    for (const root of roots) syncUnitChars(root, "all", reduced);

    let settleId = 0;
    let holdId = 0;
    const scrambleMs = reduced ? 0 : SCRAMBLE_MS;

    const armHold = () => {
      if (document.hidden) return;
      holdId = window.setTimeout(() => {
        onAdvanceRef.current();
      }, nextHold());
    };

    settleId = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("full-bloom")) {
        for (const root of roots) syncUnitChars(root, null, reduced);
      }
      armHold();
    }, scrambleMs);

    const onVisibility = () => {
      window.clearTimeout(holdId);
      if (!document.hidden) armHold();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(settleId);
      window.clearTimeout(holdId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [token]);
}
