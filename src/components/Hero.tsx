"use client";

import { useRef, useState, type RefObject } from "react";
import { BloomUnit } from "@/components/bloom/Bloom";
import { TreeMark } from "@/components/bloom/TreeMark";
import { HeroGreeting } from "@/components/HeroGreeting";
import { HeroRole } from "@/components/HeroRole";
import { StickyPill } from "@/components/PillNav";
import { useSyncedScramble } from "@/components/useScrambleCycle";
import {
  heroGreetings,
  nextHeroGreeting,
  nextHeroLineIndex,
} from "@/lib/content";

export function Hero() {
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const [greeting, setGreeting] = useState(heroGreetings[0]!);
  const [lineIndex, setLineIndex] = useState(0);

  useSyncedScramble(
    [greetingRef, roleRef] as RefObject<HTMLElement | null>[],
    () => {
      setGreeting((current) => nextHeroGreeting(current));
      setLineIndex((current) => nextHeroLineIndex(current));
    },
    `${greeting.id}:${lineIndex}`,
  );

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <BloomUnit id="name" variant="split" className="hero-name">
        <p className="whisper">( jaden )</p>
        <TreeMark className="hero-mark tree-mark" />
        <HeroGreeting greeting={greeting} rootRef={greetingRef} />
        <HeroRole index={lineIndex} rootRef={roleRef} />
      </BloomUnit>
      <StickyPill />
    </section>
  );
}
