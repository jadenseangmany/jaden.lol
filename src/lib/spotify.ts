/**
 * Spotify Web API helpers for /listening.
 *
 * Lifetime minutes and play counts come from
 * src/data/listening-history.json (Spotify extended history).
 * This module is the live snapshot: last 50 plays, top 50 over
 * ~4 weeks / ~6 months / ~1 year, library totals, and now playing.
 *
 * Env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * One-time: npm run spotify:token
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1";

type Paging<T> = {
  items: T[];
  total?: number;
  next?: string | null;
};

type SpotifyImage = { url: string; height: number | null; width: number | null };

type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  popularity?: number;
  explicit?: boolean;
  external_urls?: { spotify?: string };
  artists: { id: string; name: string }[];
  album?: {
    name: string;
    release_date?: string;
    images?: SpotifyImage[];
  };
};

type NowPlaying = {
  is_playing: boolean;
  progress_ms: number | null;
  item: SpotifyTrack | null;
};

export type CountRow = {
  id: string;
  name: string;
  artists: string;
  plays: number;
  minutes: number;
  url: string | null;
  image: string | null;
};

export type RankedTrack = {
  rank: number;
  id: string;
  name: string;
  artists: string;
  minutes: number;
  popularity: number;
  year: number | null;
  url: string | null;
  image: string | null;
};

export type RankedArtist = {
  rank: number;
  id: string;
  name: string;
  followers: number;
  popularity: number;
  genres: string;
  url: string | null;
  image: string | null;
  catalogMinutes: number;
};

export type RangeStats = {
  label: string;
  window: string;
  catalogMinutes: number;
  avgPopularity: number;
  explicitPct: number;
  uniqueArtists: number;
  uniqueAlbums: number;
  uniqueGenres: number;
  oldestYear: number | null;
  newestYear: number | null;
  meanDurationMin: number;
  tracks: RankedTrack[];
  artists: RankedArtist[];
};

export type ListeningSnapshot = {
  profile: {
    name: string;
    followers: number;
    product: string;
    url: string | null;
  };
  nowPlaying: {
    name: string;
    artists: string;
    paused: boolean;
    progressMin: number;
    durationMin: number;
    progressPct: number;
    url: string | null;
    image: string | null;
  } | null;
  library: {
    savedTracks: number;
    savedAlbums: number;
    playlists: number;
    followedArtists: number;
    shows: number;
    total: number;
  };
  recent: {
    plays: number;
    uniqueTracks: number;
    uniqueArtists: number;
    repeats: number;
    repeatPct: number;
    minutes: number;
    meanPlayMin: number;
    longestMin: number;
    spanHours: number | null;
    peakHour: number;
    hours: number[];
    tracks: CountRow[];
    artists: CountRow[];
  };
  ranges: {
    short: RangeStats;
    medium: RangeStats;
    long: RangeStats;
  };
};

let tokenCache: { access: string; exp: number } | null = null;

function envValue(key: string) {
  const value = process.env[key]?.trim().replace(/^['"]|['"]$/g, "");
  return value || null;
}

function requiredEnv() {
  const id = envValue("SPOTIFY_CLIENT_ID");
  const secret = envValue("SPOTIFY_CLIENT_SECRET");
  const refresh = envValue("SPOTIFY_REFRESH_TOKEN");
  if (!id || !secret || !refresh) return null;
  return { id, secret, refresh };
}

export function spotifyConfigured() {
  return requiredEnv() !== null;
}

async function accessToken() {
  const env = requiredEnv();
  if (!env) return null;
  if (tokenCache && tokenCache.exp > Date.now() + 15_000) return tokenCache.access;

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.id}:${env.secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: env.refresh,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 180);
      console.error(`Spotify token ${res.status} ${detail}`);
      return null;
    }
    const json = (await res.json()) as { access_token: string; expires_in: number };
    tokenCache = {
      access: json.access_token,
      exp: Date.now() + json.expires_in * 1000,
    };
    return json.access_token;
  } catch (error) {
    console.error(
      "Spotify token request failed",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

async function spotify<T>(path: string, fallback: T): Promise<T> {
  const token = await accessToken();
  if (!token) return fallback;
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (res.status === 204) return fallback;
    if (!res.ok) {
      console.error(`Spotify ${path} ${res.status}`);
      return fallback;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(
      `Spotify ${path} failed`,
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
}

function cover(images?: SpotifyImage[]) {
  if (!images?.length) return null;
  return images[images.length - 1]?.url ?? images[0]?.url ?? null;
}

function thumb(images?: SpotifyImage[]) {
  if (!images?.length) return null;
  const ranked = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  const fit = ranked.find((img) => (img.width ?? 0) >= 64) ?? ranked[ranked.length - 1];
  return fit?.url ?? null;
}

function artistLine(artists: { name: string }[]) {
  return artists.map((a) => a.name).join(", ");
}

function roundMin(ms: number) {
  return Math.round(ms / 60000);
}

function rangeMeta(key: "short" | "medium" | "long"): Pick<RangeStats, "label" | "window"> {
  if (key === "short") return { label: "4 weeks", window: "short_term" };
  if (key === "medium") return { label: "6 months", window: "medium_term" };
  return { label: "about a year", window: "long_term" };
}

let appTokenCache: { access: string; exp: number } | null = null;

function clientEnv() {
  const id = envValue("SPOTIFY_CLIENT_ID");
  const secret = envValue("SPOTIFY_CLIENT_SECRET");
  if (!id || !secret) return null;
  return { id, secret };
}

async function clientCredentialsToken() {
  const env = clientEnv();
  if (!env) return null;
  if (appTokenCache && appTokenCache.exp > Date.now() + 15_000) return appTokenCache.access;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${env.id}:${env.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token: string; expires_in: number };
  appTokenCache = {
    access: json.access_token,
    exp: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

async function oembedCover(id: string) {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${id}`)}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

export async function getTrackCovers(
  ids: string[],
): Promise<Record<string, string>> {
  const clean = [
    ...new Set(ids.filter((id) => /^[A-Za-z0-9]{22}$/.test(id))),
  ].slice(0, 200);
  const out: Record<string, string> = {};
  if (!clean.length) return out;

  const token = (await clientCredentialsToken()) ?? (await accessToken());
  if (token) {
    for (let i = 0; i < clean.length; i += 50) {
      const chunk = clean.slice(i, i + 50);
      const res = await fetch(`${API}/tracks?market=US&ids=${chunk.join(",")}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { tracks?: Array<SpotifyTrack | null> };
      for (const track of data.tracks ?? []) {
        if (!track?.id) continue;
        const url = thumb(track.album?.images) ?? cover(track.album?.images);
        if (url) out[track.id] = url;
      }
    }
  }

  const missing = clean.filter((id) => !out[id]);
  for (let i = 0; i < missing.length; i += 8) {
    const chunk = missing.slice(i, i + 8);
    const found = await Promise.all(chunk.map(oembedCover));
    chunk.forEach((id, index) => {
      const url = found[index];
      if (url) out[id] = url;
    });
  }
  return out;
}

function emptyRecent(): ListeningSnapshot["recent"] {
  return {
    plays: 0,
    uniqueTracks: 0,
    uniqueArtists: 0,
    repeats: 0,
    repeatPct: 0,
    minutes: 0,
    meanPlayMin: 0,
    longestMin: 0,
    spanHours: null,
    peakHour: 0,
    hours: Array.from({ length: 24 }, () => 0),
    tracks: [],
    artists: [],
  };
}

function emptyRange(key: "short" | "medium" | "long"): RangeStats {
  return {
    ...rangeMeta(key),
    catalogMinutes: 0,
    avgPopularity: 0,
    explicitPct: 0,
    uniqueArtists: 0,
    uniqueAlbums: 0,
    uniqueGenres: 0,
    oldestYear: null,
    newestYear: null,
    meanDurationMin: 0,
    tracks: [],
    artists: [],
  };
}

export async function getListeningSnapshot(): Promise<ListeningSnapshot | null> {
  if (!spotifyConfigured()) return null;
  const token = await accessToken();
  if (!token) return null;

  const now = await spotify<NowPlaying | Record<string, never>>(
    "/me/player/currently-playing",
    {},
  );
  const nowItem = "item" in now && now.item && now.item.id ? now.item : null;
  const progress = "progress_ms" in now ? (now.progress_ms ?? 0) : 0;
  const nowPlaying = nowItem
    ? {
        name: nowItem.name,
        artists: artistLine(nowItem.artists ?? []),
        paused: !("is_playing" in now && now.is_playing),
        progressMin: roundMin(progress),
        durationMin: roundMin(nowItem.duration_ms || 0),
        progressPct: nowItem.duration_ms
          ? Math.round((progress / nowItem.duration_ms) * 100)
          : 0,
        url: nowItem.external_urls?.spotify ?? null,
        image: cover(nowItem.album?.images),
      }
    : null;

  return {
    profile: {
      name: "Spotify",
      followers: 0,
      product: "unknown",
      url: null,
    },
    nowPlaying,
    library: {
      savedTracks: 0,
      savedAlbums: 0,
      playlists: 0,
      followedArtists: 0,
      shows: 0,
      total: 0,
    },
    recent: emptyRecent(),
    ranges: {
      short: emptyRange("short"),
      medium: emptyRange("medium"),
      long: emptyRange("long"),
    },
  };
}
