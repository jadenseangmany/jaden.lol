"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { BloomCursor } from "@/components/bloom/BloomCursor";
import { FullBloomDirector } from "@/components/bloom/FullBloom";
import { PillNav } from "@/components/PillNav";
import { RouteCoverProvider } from "@/components/RouteCover";

function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const node = document.getElementById(id);
    if (!node) return;
    const frame = window.requestAnimationFrame(() => {
      node.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <RouteCoverProvider>
      <HashScroll />
      <FullBloomDirector />
      <BloomCursor />
      {pathname !== "/" ? (
        <div className="pill-float is-stuck">
          <PillNav />
        </div>
      ) : null}
      {children}
    </RouteCoverProvider>
  );
}
