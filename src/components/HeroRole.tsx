"use client";

import type { RefObject } from "react";
import { BloomText } from "@/components/bloom/chars";

export function HeroRole({
  text,
  rootRef,
}: {
  text: string;
  rootRef: RefObject<HTMLParagraphElement | null>;
}) {
  return (
    <p ref={rootRef} className="hero-role hero-cycle" aria-live="polite">
      <BloomText text={text} />
    </p>
  );
}
