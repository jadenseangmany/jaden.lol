"use client";

import type { RefObject } from "react";
import { BloomText } from "@/components/bloom/chars";
import { site } from "@/lib/content";

export function HeroRole({
  index,
  rootRef,
}: {
  index: number;
  rootRef: RefObject<HTMLParagraphElement | null>;
}) {
  return (
    <p ref={rootRef} className="hero-role hero-cycle" aria-live="polite">
      <BloomText text={site.heroLines[index] ?? site.heroLines[0]} />
    </p>
  );
}
