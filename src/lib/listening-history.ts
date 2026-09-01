import type { CountRow } from "@/lib/spotify";
import raw from "@/data/listening-history.json";

export const WINDOW_ORDER = [
  "today",
  "week",
  "month",
  "sixMonths",
  "year",
  "all",
] as const;

export type WindowId = (typeof WINDOW_ORDER)[number];

export type LifetimeYear = {
  year: number;
  minutes: number;
  plays: number;
  qualifyingPlays: number;
  skips: number;
  uniqueTracks: number;
  uniqueArtists: number;
};

export type HistoryWindow = {
  id: string;
  label: string;
  start: string;
  end: string;
  minutes: number;
  plays: number;
  qualifyingPlays: number;
  uniqueTracks: number;
  uniqueArtists: number;
  tracks: CountRow[];
  artists: CountRow[];
};

export type LifetimeHistory = {
  source: string;
  playThresholdSec: number;
  firstPlay: string;
  lastPlay: string;
  minutes: number;
  plays: number;
  qualifyingPlays: number;
  skips: number;
  skipPct: number;
  uniqueTracks: number;
  uniqueArtists: number;
  podcastPlays: number;
  podcastMinutes: number;
  meanPlayMin: number;
  peakHour: number;
  hours: number[];
  years: LifetimeYear[];
  tracks: CountRow[];
  artists: CountRow[];
  windows?: Record<string, HistoryWindow>;
};

export function getLifetimeHistory(): LifetimeHistory | null {
  if (!raw || typeof raw !== "object") return null;
  return raw as LifetimeHistory;
}

export function historyWindows(history: LifetimeHistory): HistoryWindow[] {
  const windows = history.windows ?? {};
  const ordered = WINDOW_ORDER.map((id) => windows[id]).filter(
    (window): window is HistoryWindow => Boolean(window),
  );
  if (ordered.length) return ordered;
  return [
    {
      id: "all",
      label: "All-time",
      start: history.firstPlay,
      end: history.lastPlay,
      minutes: history.minutes,
      plays: history.plays,
      qualifyingPlays: history.qualifyingPlays,
      uniqueTracks: history.uniqueTracks,
      uniqueArtists: history.uniqueArtists,
      tracks: history.tracks,
      artists: history.artists,
    },
  ];
}

export function windowTrackIds(history: LifetimeHistory) {
  const ids = new Set<string>();
  for (const window of historyWindows(history)) {
    for (const track of window.tracks) ids.add(track.id);
  }
  return [...ids];
}

export function paintCovers(
  rows: CountRow[],
  covers: Record<string, string>,
): CountRow[] {
  return rows.map((row) => ({
    ...row,
    image: row.image ?? covers[row.id] ?? null,
  }));
}

export function monthYear(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

export function dayMonth(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}
