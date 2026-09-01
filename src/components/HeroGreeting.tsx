"use client";

import type { RefObject } from "react";
import { BloomText } from "@/components/bloom/chars";
import type { HeroGreeting as Greeting } from "@/lib/content";

export function HeroGreeting({
  greeting,
  rootRef,
}: {
  greeting: Greeting;
  rootRef: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <h1
      ref={rootRef}
      className="bloom-title hero-cycle"
      lang={greeting.lang}
      aria-live="polite"
    >
      <BloomText text={greeting.text} />
    </h1>
  );
}
