"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
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

export function ListeningExplorer({
  windows,
  covers,
}: {
  windows: HistoryWindow[];
  covers: Record<string, string>;
}) {
  const [selected, setSelected] = useState<WindowId>("year");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<CatalogRow[] | null>(null);
  const [liveCovers, setLiveCovers] = useState<Record<string, string>>({});
  const fetchedIds = useRef(new Set<string>());

  const current =
    windows.find((item) => item.id === selected) ??
    windows.find((item) => item.id === "all") ??
    windows[0];

  const matches = useMemo(() => {
    if (!catalog) return [];
    return rankQuery(query, catalog);
  }, [catalog, query]);

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

  useEffect(() => {
    if (!current) return;
    const ids = [
      ...current.tracks.map((row) => row.id),
      ...matches.map((row) => row[0]),
    ].filter((id) => {
      if (!/^[A-Za-z0-9]{22}$/.test(id)) return false;
      if (covers[id] || liveCovers[id] || fetchedIds.current.has(id)) return false;
      return true;
    });
    if (!ids.length) return;
    ids.forEach((id) => fetchedIds.current.add(id));
    const ctrl = new AbortController();
    const timer = globalThis.setTimeout(() => {
      fetch(`/api/spotify/covers?ids=${ids.join(",")}`, { signal: ctrl.signal })
        .then((res) => (res.ok ? res.json() : {}))
        .then((next: Record<string, string>) => {
          setLiveCovers((prev) => ({ ...prev, ...next }));
        })
        .catch(() => {
          ids.forEach((id) => fetchedIds.current.delete(id));
        });
    }, 80);
    return () => {
      ctrl.abort();
      globalThis.clearTimeout(timer);
    };
  }, [covers, current, liveCovers, matches]);

  if (!current) return null;

  const mergedCovers = { ...covers, ...liveCovers };
  const painted = {
    ...current,
    tracks: paintCovers(current.tracks, mergedCovers),
    artists: paintCovers(current.artists, mergedCovers),
  };

  const searchRows: CountRow[] = matches.map((row) => ({
    id: row[0],
    name: row[1],
    artists: row[2],
    plays: row[3],
    minutes: 0,
    url: trackUrl(row[0]),
    image: mergedCovers[row[0]] ?? null,
  }));

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
      <section className="listening-ask" aria-label="Search listening history">
        <label htmlFor="listening-query" className="listening-ask-label">
          Check if I listened to
        </label>
        <input
          id="listening-query"
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder="a song"
          onChange={(event) => setQuery(event.target.value)}
        />
        {query.trim().length >= 2 ? (
          catalog == null ? (
            <p className="listening-empty">Looking through the history.</p>
          ) : searchRows.length ? (
            <CountList rows={searchRows} />
          ) : (
            <p className="listening-empty">No plays of that in this history.</p>
          )
        ) : (
          <p className="listening-caption">
            Type a title or artist. Counts are plays over 30 seconds, same as Wrapped.
          </p>
        )}
      </section>

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
