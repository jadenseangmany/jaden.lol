"use client";

import { BloomUnit } from "@/components/bloom/Bloom";
import { Art } from "@/components/listening-ui";
import type { NowPlayingTrack } from "@/lib/spotify";
import { useEffect, useRef, useState } from "react";

function clock(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function liveProgress(track: NowPlayingTrack, syncedAt: number, now: number) {
  if (track.paused) {
    return Math.min(track.progressMs, track.durationMs || track.progressMs);
  }
  const elapsed = Math.max(0, now - syncedAt);
  const next = track.progressMs + elapsed;
  return track.durationMs ? Math.min(next, track.durationMs) : next;
}

export function ListeningNow({
  initial,
  enabled,
}: {
  initial: NowPlayingTrack | null;
  enabled: boolean;
}) {
  const [track, setTrack] = useState(initial);
  const [syncedAt, setSyncedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const trackRef = useRef(track);
  trackRef.current = track;

  useEffect(() => {
    if (!enabled) return;
    let timer = 0;
    let cancelled = false;

    async function pull() {
      try {
        const res = await fetch("/api/spotify/now", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { now: NowPlayingTrack | null };
        if (cancelled) return;
        setTrack(data.now);
        setSyncedAt(Date.now());
      } catch {
        /* keep last frame */
      }
    }

    function schedule() {
      const current = trackRef.current;
      const hidden = document.visibilityState === "hidden";
      const delay = hidden ? 30_000 : current && !current.paused ? 4_000 : 8_000;
      timer = window.setTimeout(async () => {
        await pull();
        if (!cancelled) schedule();
      }, delay);
    }

    void pull().then(() => {
      if (!cancelled) schedule();
    });

    function onVisibility() {
      if (document.visibilityState === "visible") void pull();
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  useEffect(() => {
    if (!track || track.paused) return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [track, track?.paused]);

  if (!track) return null;

  const progressMs = liveProgress(track, syncedAt, now);
  const pct = track.durationMs
    ? Math.min(100, (progressMs / track.durationMs) * 100)
    : 0;

  return (
    <BloomUnit
      id="listening-now"
      variant="meadow"
      pinOnClick={false}
      className="listening-now"
    >
      <Art src={track.image} />
      <div className="listening-now-copy">
        <p className="case-kicker">{track.paused ? "Paused" : "Now"}</p>
        <p className="bloom-title">{track.name}</p>
        <p className="meta meta-start">{track.artists}</p>
        <p className="meta meta-start stat-items">
          {clock(progressMs)} / {clock(track.durationMs)}
        </p>
        <div
          className="listening-now-bar"
          role="progressbar"
          aria-label="Track progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
        >
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
    </BloomUnit>
  );
}
