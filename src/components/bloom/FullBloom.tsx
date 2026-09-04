"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { applyBloomDom, useBloom, useBloomSnapshot } from "./Bloom";
import { releaseAllChars, releaseChar, scrambleChar, wrapLooseText } from "./chars";

const CanopyBackground = dynamic(() => import("./CanopyBackground"), {
  ssr: false,
});

type WaveItem = {
  el: HTMLElement;
  y: number;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shellRoot() {
  return document.getElementById("top") ?? document.body;
}

function waveSpeed() {
  return Math.max(window.innerHeight, 640) / 1.85;
}

export function FullBloomDirector() {
  const { subscribeSettings, getSettingsSnapshot } = useBloom();
  const { fullBloom } = useBloomSnapshot();
  const [canopy, setCanopy] = useState(fullBloom);
  const waveY = useRef(0);
  const cursor = useRef(0);
  const items = useRef<WaveItem[]>([]);
  const active = useRef(false);
  const exiting = useRef(false);
  const raf = useRef(0);
  const exitTimer = useRef(0);

  useEffect(() => {
    function paint() {
      const viewTop = window.scrollY;
      const viewH = Math.max(window.innerHeight, 1);
      const y = waveY.current;
      let rest = 100;
      if (y >= viewTop + viewH) rest = 0;
      else if (y > viewTop) rest = (1 - (y - viewTop) / viewH) * 100;
      document.documentElement.style.setProperty(
        "--full-bloom-rest",
        `${rest}%`,
      );
    }

    function viewFront() {
      return window.scrollY + window.innerHeight;
    }

    function measure() {
      const root = shellRoot();
      wrapLooseText(root);
      const scrollY = window.scrollY;
      const next: WaveItem[] = [];
      root.querySelectorAll<HTMLElement>("[data-bloom-char]").forEach((el) => {
        if (el.closest(".nurture-toggle, .mode-toggle, .bloom-settings, .skill-items, .stat-items, .case-row-more, .case-row-aside, .case-row-tags, .whisper, .award-row, .award-list, .about-summary, .about-countries, .country-links, .listening-hours, .listening-ask, .horizon")) return;
        next.push({
          el,
          y: el.getBoundingClientRect().top + scrollY,
        });
      });
      next.sort((a, b) => a.y - b.y);
      items.current = next;
      cursor.current = 0;
      while (cursor.current < next.length) {
        const item = next[cursor.current];
        if (!item) break;
        const done =
          item.el.classList.contains("is-bloom") ||
          item.el.dataset.scrambling === "1";
        if (!done) break;
        cursor.current += 1;
      }
    }

    function markUnits(front: number) {
      const scrollY = window.scrollY;
      shellRoot()
        .querySelectorAll<HTMLElement>("[data-bloom-id]")
        .forEach((unit) => {
          const y = unit.getBoundingClientRect().top + scrollY;
          if (y <= front) unit.setAttribute("data-decode", "");
          else {
            unit.removeAttribute("data-decode");
            unit.removeAttribute("data-bloom");
          }
        });
    }

    function decodeUpTo(front: number, reduced: boolean) {
      const list = items.current;
      const viewTop = window.scrollY;
      let n = 0;
      while (cursor.current < list.length) {
        const item = list[cursor.current];
        if (!item || item.y > front) break;
        cursor.current += 1;
        const busy =
          item.el.classList.contains("is-bloom") ||
          item.el.dataset.scrambling === "1";
        if (busy) continue;
        const instant = reduced || item.y < viewTop - 8;
        scrambleChar(item.el, instant ? 0 : Math.min(n, 14) * 14, instant);
        if (!instant) n += 1;
      }
      markUnits(front);
    }

    function releaseAfter(front: number) {
      const list = items.current;
      for (let i = list.length - 1; i >= 0; i -= 1) {
        const item = list[i];
        if (!item || item.y <= front) break;
        releaseChar(item.el);
      }
      cursor.current = 0;
      while (cursor.current < list.length) {
        const item = list[cursor.current];
        if (!item || item.y > front) break;
        cursor.current += 1;
      }
      markUnits(front);
    }

    function clearExitTimer() {
      if (exitTimer.current) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = 0;
      }
    }

    function stop() {
      clearExitTimer();
      active.current = false;
      exiting.current = false;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      cursor.current = 0;
      items.current = [];
      waveY.current = 0;
      document.documentElement.style.setProperty("--full-bloom-rest", "100%");
      const root = shellRoot();
      root.querySelectorAll("[data-bloom-id]").forEach((unit) => {
        unit.removeAttribute("data-decode");
        unit.removeAttribute("data-bloom");
      });
      releaseAllChars(root);
      applyBloomDom(getSettingsSnapshot().mode);
      setCanopy(false);
    }

    function snapOn() {
      clearExitTimer();
      exiting.current = false;
      active.current = true;
      setCanopy(true);
      applyBloomDom("nurture");
      measure();
      waveY.current = viewFront();
      paint();
      decodeUpTo(Number.POSITIVE_INFINITY, true);
      startLoop();
    }

    function startLoop() {
      const reduced = prefersReducedMotion();
      let last = performance.now();

      const tick = (now: number) => {
        if (!active.current) return;
        const dt = Math.min(0.048, (now - last) / 1000);
        last = now;
        const speed = reduced ? Number.POSITIVE_INFINITY : waveSpeed();

        if (exiting.current) {
          const target = window.scrollY;
          if (waveY.current > target) {
            const step = Number.isFinite(speed) ? speed * dt : waveY.current - target;
            waveY.current = Math.max(target, waveY.current - step);
            paint();
            releaseAfter(waveY.current);
            raf.current = requestAnimationFrame(tick);
            return;
          }
          stop();
          return;
        }

        const target = viewFront();
        if (waveY.current < target) {
          const step = Number.isFinite(speed) ? speed * dt : target - waveY.current;
          waveY.current = Math.min(target, waveY.current + step);
        }
        paint();
        decodeUpTo(waveY.current, reduced);
        raf.current = requestAnimationFrame(tick);
      };

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(tick);
    }

    function startWave() {
      clearExitTimer();
      exiting.current = false;
      active.current = true;
      setCanopy(true);
      applyBloomDom("nurture");
      if (waveY.current <= window.scrollY) {
        waveY.current = window.scrollY;
      }
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        measure();
        paint();
        decodeUpTo(waveY.current, prefersReducedMotion());
        startLoop();
      });
    }

    function startExit() {
      if (prefersReducedMotion() || getSettingsSnapshot().mode === "simple") {
        stop();
        return;
      }
      exiting.current = true;
      active.current = true;
      setCanopy(true);
      applyBloomDom("nurture");
      waveY.current = viewFront();
      measure();
      startLoop();
      clearExitTimer();
      exitTimer.current = window.setTimeout(() => {
        if (exiting.current) stop();
      }, 2400);
    }

    function onScroll() {
      if (!active.current) return;
      paint();
    }

    let was = getSettingsSnapshot().fullBloom;
    if (was) snapOn();

    const unsub = subscribeSettings(() => {
      const on = getSettingsSnapshot().fullBloom;
      if (on === was) return;
      if (on) startWave();
      else if (getSettingsSnapshot().mode === "simple" || prefersReducedMotion()) {
        stop();
      } else {
        startExit();
      }
      was = on;
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, [getSettingsSnapshot, subscribeSettings]);

  return (
    <div className="full-bloom-veil" aria-hidden="true">
      {canopy ? <CanopyBackground /> : null}
      <div className="full-bloom-wash" />
      <div className="full-bloom-grain" />
    </div>
  );
}
