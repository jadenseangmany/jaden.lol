"use client";

import { useRef, useState, type RefObject } from "react";
import { BloomUnit } from "@/components/bloom/Bloom";
import { HeroStreaks } from "@/components/bloom/HeroStreaks";
import { TreeMark } from "@/components/bloom/TreeMark";
import { HeroGreeting } from "@/components/HeroGreeting";
import { HeroRole } from "@/components/HeroRole";
import { StickyPill } from "@/components/PillNav";
import { useSyncedScramble } from "@/components/useScrambleCycle";
import { createGreetingCycle, createHeroLineCycle } from "@/lib/content";

export function Hero() {
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const greetingCycle = useRef(createGreetingCycle());
  const lineCycle = useRef(createHeroLineCycle());
  const [greeting, setGreeting] = useState(() => greetingCycle.current.current());
  const [line, setLine] = useState(() => lineCycle.current.current());

  useSyncedScramble(
    [greetingRef, roleRef] as RefObject<HTMLElement | null>[],
    () => {
      setGreeting(greetingCycle.current.next());
      setLine(lineCycle.current.next());
    },
    `${greeting.id}:${line}`,
  );

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <BloomUnit id="name" variant="split" className="hero-name">
        <HeroStreaks />
        <p className="whisper">( jaden )</p>
        <TreeMark className="hero-mark tree-mark" />
        <HeroGreeting greeting={greeting} rootRef={greetingRef} />
        <HeroRole text={line} rootRef={roleRef} />
      </BloomUnit>
      <StickyPill />
    </section>
  );
}
