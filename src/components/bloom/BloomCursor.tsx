"use client";

import { useEffect, useRef } from "react";
import { bloomCursorRadius } from "./Bloom";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function paintCursor(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  reduced: boolean,
) {
  const dpr = ctx.canvas.width / size;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  const c = size / 2;
  const pulse = reduced ? 1 : 0.92 + Math.sin(time * 2.1) * 0.08;

  const glow = ctx.createRadialGradient(c, c, 0, c, c, size * 0.48);
  glow.addColorStop(0, `rgba(255, 248, 230, ${0.42 * pulse})`);
  glow.addColorStop(0.12, `rgba(255, 221, 87, ${0.22 * pulse})`);
  glow.addColorStop(0.32, `rgba(143, 191, 74, ${0.14 * pulse})`);
  glow.addColorStop(0.58, `rgba(61, 154, 85, ${0.07 * pulse})`);
  glow.addColorStop(1, "rgba(61, 154, 85, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(c, c);

  ctx.fillStyle = `rgba(247, 244, 238, ${0.72 * pulse})`;
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1.6, size * 0.045), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function BloomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = canvasRef.current;
    const gfx = surface?.getContext("2d");
    if (!surface || !gfx) return;

    let raf = 0;
    let visible = false;
    const started = performance.now();
    const canvas = surface;
    const ctx = gfx;

    function radius() {
      return bloomCursorRadius() * 1.35;
    }

    function resize() {
      const r = radius();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.max(2, Math.round(r * 2));
      canvas.width = px * dpr;
      canvas.height = px * dpr;
      canvas.style.width = `${px}px`;
      canvas.style.height = `${px}px`;
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
      return !isCoarsePointer();
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
      paintCursor(
        ctx,
        canvas.clientWidth || radius() * 2,
        (now - started) / 1000,
        prefersReducedMotion(),
      );
      raf = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      const half = canvas.offsetWidth / 2;
      canvas.style.transform = `translate3d(${event.clientX - half}px, ${event.clientY - half}px, 0)`;
      show(isOn());
    }

    sync();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("bloom-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bloom-cursor-canvas"
      aria-hidden="true"
      data-on="false"
    />
  );
}
