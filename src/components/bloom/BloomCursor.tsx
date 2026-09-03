"use client";

import { useEffect, useRef } from "react";
import { useBloomSnapshot } from "@/components/bloom/Bloom";

const CURSOR_CSS_PX = 56;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function isClickable(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a[href], button:not(:disabled), [data-pin='true'], [role='button'], [role='link']",
    ),
  );
}

function paintCursor(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  reduced: boolean,
  heat: number,
) {
  const dpr = ctx.canvas.width / size;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  const c = size / 2;
  const pulse = reduced
    ? 1
    : 0.94 + Math.sin(time * 2.1) * 0.06 + heat * 0.08;
  const glowScale = 0.38 + heat * 0.12;

  const glow = ctx.createRadialGradient(c, c, 0, c, c, size * glowScale);
  glow.addColorStop(
    0,
    `rgba(255, 248, 230, ${(0.4 + heat * 0.38) * pulse})`,
  );
  glow.addColorStop(
    0.12,
    `rgba(255, 221, 87, ${(0.2 + heat * 0.32) * pulse})`,
  );
  glow.addColorStop(
    0.32,
    `rgba(143, 191, 74, ${(0.13 + heat * 0.22) * pulse})`,
  );
  glow.addColorStop(
    0.58,
    `rgba(61, 154, 85, ${(0.07 + heat * 0.16) * pulse})`,
  );
  glow.addColorStop(1, "rgba(61, 154, 85, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(c, c);
  ctx.fillStyle = `rgba(247, 244, 238, ${(0.7 + heat * 0.16) * pulse})`;
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1.4, size * (0.04 + heat * 0.012)), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function BloomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useBloomSnapshot();

  useEffect(() => {
    const surface = canvasRef.current;
    const gfx = surface?.getContext("2d");
    if (!surface || !gfx) return;

    let raf = 0;
    let visible = false;
    let wantHot = false;
    let heat = 0;
    const started = performance.now();
    const canvas = surface;
    const ctx = gfx;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = CURSOR_CSS_PX * dpr;
      canvas.height = CURSOR_CSS_PX * dpr;
      canvas.style.width = `${CURSOR_CSS_PX}px`;
      canvas.style.height = `${CURSOR_CSS_PX}px`;
    }

    function setHot(next: boolean) {
      if (wantHot === next) return;
      wantHot = next;
      canvas.dataset.hot = next ? "true" : "false";
      document.documentElement.classList.toggle("bloom-cursor-hot", next);
    }

    function show(on: boolean) {
      if (visible === on) {
        canvas.dataset.on = on ? "true" : "false";
        return;
      }
      visible = on;
      canvas.dataset.on = on ? "true" : "false";
      document.documentElement.classList.toggle(
        "bloom-cursor",
        on && !isCoarsePointer(),
      );
      if (on && !raf) raf = requestAnimationFrame(loop);
    }

    function isOn() {
      return !isCoarsePointer() && mode !== "simple";
    }

    function sync() {
      show(isOn());
      resize();
    }

    function loop(now: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      const reduced = prefersReducedMotion();
      const target = wantHot ? 1 : 0;
      heat += (target - heat) * (reduced ? 1 : 0.22);
      if (Math.abs(heat - target) < 0.002) heat = target;
      paintCursor(
        ctx,
        CURSOR_CSS_PX,
        (now - started) / 1000,
        reduced,
        heat,
      );
      raf = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      setHot(isClickable(event.target));
      canvas.style.left = `${event.clientX}px`;
      canvas.style.top = `${event.clientY}px`;
      canvas.style.transform = "translate(-50%, -50%)";
      show(isOn());
    }

    sync();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove(
        "bloom-cursor",
        "bloom-cursor-hot",
      );
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="bloom-cursor-canvas"
      aria-hidden="true"
      data-on="false"
      data-hot="false"
    />
  );
}
