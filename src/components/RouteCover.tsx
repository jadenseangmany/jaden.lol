"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type RouteCoverApi = {
  go: (href: string) => void;
};

const RouteCoverContext = createContext<RouteCoverApi | null>(null);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useRouteCover() {
  const ctx = useContext(RouteCoverContext);
  if (!ctx) {
    throw new Error("useRouteCover must be used within RouteCoverProvider");
  }
  return ctx;
}

export function RouteCoverProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "cover" | "hold" | "reveal">(
    "idle",
  );

  const go = useCallback(
    (href: string) => {
      if (pathname === href) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      pending.current = href;
      setPhase("cover");
    },
    [pathname, router],
  );

  useEffect(() => {
    if (phase !== "cover") return;
    const id = window.setTimeout(() => {
      const href = pending.current;
      if (href) router.push(href);
      setPhase("hold");
    }, 640);
    return () => window.clearTimeout(id);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "hold") return;
    if (pending.current && pathname !== pending.current) {
      const id = window.setTimeout(() => {
        pending.current = null;
        setPhase("reveal");
      }, 1200);
      return () => window.clearTimeout(id);
    }
    pending.current = null;
    const frame = window.requestAnimationFrame(() => setPhase("reveal"));
    return () => window.cancelAnimationFrame(frame);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const id = window.setTimeout(() => setPhase("idle"), 720);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    router.prefetch("/about");
  }, [router]);

  return (
    <RouteCoverContext.Provider value={{ go }}>
      {children}
      <div className="route-cover" data-phase={phase} aria-hidden="true">
        <span className="route-cover-wash" />
        <span className="route-cover-grain" />
      </div>
    </RouteCoverContext.Provider>
  );
}
