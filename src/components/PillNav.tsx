"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useBloomSnapshot } from "@/components/bloom/Bloom";
import { BloomText, syncUnitChars } from "@/components/bloom/chars";
import { useRouteCover } from "@/components/RouteCover";
import { nav } from "@/lib/content";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function activeFromPath(pathname: string) {
  if (pathname === "/about") return "nav-about" as const;
  if (pathname.startsWith("/work")) return "nav-work" as const;
  if (pathname.startsWith("/projects")) return "nav-projects" as const;
  return "nav-home" as const;
}

export function StickyPill() {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-12px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pill-slot">
      <div className="pill-sentinel" ref={sentinelRef} aria-hidden="true" />
      <div className={stuck ? "pill-float is-stuck" : "pill-float"}>
        <PillNav />
      </div>
    </div>
  );
}

export function PillNav() {
  const pathname = usePathname();
  const { go } = useRouteCover();
  const { mode } = useBloomSnapshot();
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [homeActive, setHomeActive] = useState<(typeof nav)[number]["id"]>(
    "nav-home",
  );
  const [hoveredId, setHoveredId] = useState<(typeof nav)[number]["id"] | null>(
    null,
  );
  const [glow, setGlow] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  const activeId = pathname === "/" ? homeActive : activeFromPath(pathname);

  const placeGlow = useCallback((id: string) => {
    const track = trackRef.current;
    const item = itemRefs.current.get(id);
    if (!track || !item) return;
    const trackBox = track.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    setGlow({
      left: itemBox.left - trackBox.left,
      width: itemBox.width,
      ready: true,
    });
  }, []);

  useLayoutEffect(() => {
    placeGlow(activeId);
  }, [activeId, placeGlow]);

  useEffect(() => {
    const onResize = () => placeGlow(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, placeGlow]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = nav
      .map((item) =>
        item.hash ? document.getElementById(item.hash.slice(1)) : null,
      )
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = nav.find((item) => item.hash === `#${visible.target.id}`);
        if (match) setHomeActive(match.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function decode(id: string, on: boolean) {
    const item = itemRefs.current.get(id);
    if (!item) return;
    syncUnitChars(item, on && mode === "hybrid" ? "all" : null, prefersReducedMotion());
  }

  return (
    <nav className="pill" aria-label="Primary">
      <div className="pill-track" ref={trackRef}>
        <span
          className="pill-glow"
          aria-hidden="true"
          data-bloom={mode === "nurture" ? "" : undefined}
          style={{
            opacity: glow.ready ? 1 : 0,
            width: glow.width,
            transform: `translateX(${glow.left}px)`,
          }}
        />
        {nav.map((item) => (
          <Link
            key={item.id}
            href={pathname === "/" && item.hash ? item.hash : item.href}
            data-active={activeId === item.id ? "" : undefined}
            data-bloom={mode === "hybrid" && hoveredId === item.id ? "" : undefined}
            ref={(node) => {
              if (node) itemRefs.current.set(item.id, node);
              else itemRefs.current.delete(item.id);
            }}
            onClick={(event) => {
              if (item.href !== "/about" || pathname === "/about") return;
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
              ) {
                return;
              }
              event.preventDefault();
              go("/about");
            }}
            onPointerEnter={() => {
              setHoveredId(item.id);
              decode(item.id, true);
            }}
            onPointerLeave={() => {
              setHoveredId(null);
              decode(item.id, false);
            }}
            onFocus={() => {
              setHoveredId(item.id);
              decode(item.id, true);
            }}
            onBlur={() => {
              setHoveredId(null);
              decode(item.id, false);
            }}
          >
            <span className="pill-sizer" aria-hidden="true">
              {item.label}
            </span>
            <span className="pill-label">
              <BloomText text={item.label} />
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
