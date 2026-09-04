"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { CountList, Proof, n } from "@/components/listening-ui";
import { cn } from "@/lib/cn";
import {
  dayMonth,
  paintCovers,
  type HistoryWindow,
  type WindowId,
} from "@/lib/listening-history";
import type { CountRow } from "@/lib/spotify";

type CatalogRow = [id: string, name: string, artists: string, plays: number];

function trackUrl(id: string) {
  return /^[A-Za-z0-9]{22}$/.test(id)
    ? `https://open.spotify.com/track/${id}`
    : null;
}

function windowCaption(item: HistoryWindow) {
  const end = dayMonth(item.end);
  if (item.id === "today") return `The last day in this history, ${end}.`;
  if (item.id === "all") return `${dayMonth(item.start)} through ${end}.`;
  return `${item.label.toLowerCase()}, counted back from ${end}.`;
}

function rankQuery(query: string, rows: CatalogRow[]) {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  const words = needle.split(/\s+/).filter(Boolean);
  const scored: { row: CatalogRow; score: number }[] = [];
  for (const row of rows) {
    const hay = `${row[1]} ${row[2]}`.toLowerCase();
    let score = -1;
    if (row[1].toLowerCase().startsWith(needle) || hay.startsWith(needle)) score = 0;
    else if (hay.includes(needle)) score = 1;
    else if (words.every((word) => hay.includes(word))) score = 2;
    if (score < 0) continue;
    scored.push({ row, score });
  }
  scored.sort((a, b) => a.score - b.score || b.row[3] - a.row[3]);
  return scored.slice(0, 8).map((item) => item.row);
}

function useSpotifyCovers(ids: readonly string[], preset: Record<string, string> = {}) {
  const [extra, setExtra] = useState<Record<string, string>>({});
  const needed = ids
    .filter((id) => /^[A-Za-z0-9]{22}$/.test(id) && !preset[id] && !extra[id])
    .join(",");

  useEffect(() => {
    if (!needed) return;
    const ctrl = new AbortController();
    fetch(`/api/spotify/covers?ids=${needed}`, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : {}))
      .then((next: Record<string, string>) => {
        if (ctrl.signal.aborted) return;
        setExtra((prev) => ({ ...prev, ...next }));
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [needed]);

  return { ...preset, ...extra };
}

export function ListeningAsk() {
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<CatalogRow[] | null>(null);

  const matches = useMemo(() => {
    if (!catalog) return [];
    return rankQuery(query, catalog);
  }, [catalog, query]);

  const coverMap = useSpotifyCovers(matches.map((row) => row[0]));

  useEffect(() => {
    if (query.trim().length < 2 || catalog) return;
    let live = true;
    fetch("/listening-catalog.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { tracks?: CatalogRow[] } | null) => {
        if (live && json?.tracks) setCatalog(json.tracks);
      })
      .catch(() => {
        if (live) setCatalog([]);
      });
    return () => {
      live = false;
    };
  }, [catalog, query]);

  const searchRows: CountRow[] = matches.map((row) => ({
    id: row[0],
    name: row[1],
    artists: row[2],
    plays: row[3],
    minutes: 0,
    url: trackUrl(row[0]),
    image: coverMap[row[0]] ?? null,
  }));

  return (
    <section className="listening-ask" aria-label="Search listening history">
      <label className="listening-ask-field">
        <span className="listening-ask-label">check if i listened to a song</span>
        <span className="listening-ask-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="15" height="15">
            <circle
              cx="6.5"
              cy="6.5"
              r="4.25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              d="M9.6 9.6 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          id="listening-query"
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder="check if i listened to a song"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {query.trim().length >= 2 ? (
        catalog == null ? (
          <p className="listening-empty">Looking through the history.</p>
        ) : searchRows.length ? (
          <CountList rows={searchRows} />
        ) : (
          <p className="listening-empty">No plays of that in this history.</p>
        )
      ) : null}
    </section>
  );
}

export function ListeningExplorer({
  windows,
  covers,
}: {
  windows: HistoryWindow[];
  covers: Record<string, string>;
}) {
  const [selected, setSelected] = useState<WindowId>("year");
  const current =
    windows.find((item) => item.id === selected) ??
    windows.find((item) => item.id === "all") ??
    windows[0];
  const coverMap = useSpotifyCovers(
    current?.tracks.map((row) => row.id) ?? [],
    covers,
  );

  if (!current) return null;

  const painted = {
    ...current,
    tracks: paintCovers(current.tracks, coverMap),
    artists: paintCovers(current.artists, coverMap),
  };

  function onHorizonKey(event: KeyboardEvent<HTMLDivElement>) {
    const ids = windows.map((item) => item.id);
    const index = ids.indexOf(current.id);
    if (index < 0) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = ids[(index + 1) % ids.length];
      if (next) setSelected(next as WindowId);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = ids[(index - 1 + ids.length) % ids.length];
      if (next) setSelected(next as WindowId);
    }
  }

  return (
    <>
      <div
        className="horizon"
        role="radiogroup"
        aria-label="Listening window"
        onKeyDown={onHorizonKey}
      >
        {windows.map((item) => {
          const checked = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={checked}
              className={cn("horizon-mark", checked && "is-current")}
              onClick={() => setSelected(item.id as WindowId)}
            >
              <span className="horizon-tick" aria-hidden="true" />
              <span className="horizon-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <p className="listening-note">{windowCaption(painted)}</p>
      <Proof
        items={[
          { value: n(painted.minutes), label: "minutes" },
          { value: n(painted.qualifyingPlays), label: "plays over 30s" },
          { value: n(painted.uniqueTracks), label: "unique tracks" },
          { value: n(painted.uniqueArtists), label: "unique artists" },
        ]}
      />
      <div className="listening-split">
        <div>
          <h3>Tracks</h3>
          <CountList rows={painted.tracks} />
        </div>
        <div>
          <h3>Artists</h3>
          <CountList rows={painted.artists} thumbs={false} />
        </div>
      </div>
    </>
  );
}
