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
const TZ = "America/Los_Angeles";

type Paging<T> = {
  items: T[];
  total?: number;
  next?: string | null;
};

type SpotifyImage = { url: string; height: number | null; width: number | null };

type SpotifyArtist = {
  id: string;
  name: string;
  genres?: string[];
  popularity?: number;
  followers?: { total: number };
  external_urls?: { spotify?: string };
  images?: SpotifyImage[];
};

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

type RecentlyPlayed = {
  played_at: string;
  track: SpotifyTrack;
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

function requiredEnv() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
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

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: env.refresh,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${env.id}:${env.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Spotify token ${res.status}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    access: json.access_token,
    exp: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

async function spotify<T>(
  path: string,
  fallback: T,
  cache: "revalidate" | "fresh" = "revalidate",
): Promise<T> {
  const token = await accessToken();
  if (!token) return fallback;
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...(cache === "fresh" ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
  });
  if (res.status === 204) return fallback;
  if (!res.ok) return fallback;
  return (await res.json()) as T;
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

function yearOf(date?: string) {
  if (!date) return null;
  const year = Number(date.slice(0, 4));
  return Number.isFinite(year) ? year : null;
}

function roundMin(ms: number) {
  return Math.round(ms / 60000);
}

function artistUrl(id: string, url?: string) {
  return url ?? `https://open.spotify.com/artist/${id}`;
}

function buildRecent(plays: RecentlyPlayed[]) {
  const hours = Array.from({ length: 24 }, () => 0);
  const tracks = new Map<string, CountRow & { ms: number }>();
  const artists = new Map<string, CountRow & { ms: number }>();
  let ms = 0;
  let longestMs = 0;
  const times: number[] = [];

  for (const play of plays) {
    const track = play.track;
    if (!track?.id) continue;
    const duration = track.duration_ms || 0;
    ms += duration;
    longestMs = Math.max(longestMs, duration);
    times.push(new Date(play.played_at).getTime());
    hours[hourInTz(play.played_at)] += duration;

    const current = tracks.get(track.id);
    if (current) {
      current.plays += 1;
      current.ms += duration;
    } else {
      tracks.set(track.id, {
        id: track.id,
        name: track.name,
        artists: artistLine(track.artists),
        plays: 1,
        minutes: 0,
        ms: duration,
        url: track.external_urls?.spotify ?? null,
        image: cover(track.album?.images),
      });
    }

    const share = duration / Math.max(track.artists.length, 1);
    for (const artist of track.artists) {
      if (!artist.id) continue;
      const row = artists.get(artist.id);
      if (row) {
        row.plays += 1;
        row.ms += share;
      } else {
        artists.set(artist.id, {
          id: artist.id,
          name: artist.name,
          artists: artist.name,
          plays: 1,
          minutes: 0,
          ms: share,
          url: artistUrl(artist.id),
          image: null,
        });
      }
    }
  }

  const spanMs = times.length >= 2 ? Math.max(...times) - Math.min(...times) : null;
  const peakHour = hours.reduce((best, value, hour) => {
    const current = hours[best] ?? 0;
    return value > current ? hour : best;
  }, 0);
  const finalize = (row: CountRow & { ms: number }): CountRow => ({
    id: row.id,
    name: row.name,
    artists: row.artists,
    plays: row.plays,
    minutes: roundMin(row.ms),
    url: row.url,
    image: row.image,
  });

  return {
    plays: plays.length,
    uniqueTracks: tracks.size,
    uniqueArtists: artists.size,
    repeats: Math.max(0, plays.length - tracks.size),
    repeatPct: plays.length ? Math.round(((plays.length - tracks.size) / plays.length) * 100) : 0,
    minutes: roundMin(ms),
    meanPlayMin: plays.length ? Math.round(ms / plays.length / 6000) / 10 : 0,
    longestMin: roundMin(longestMs),
    spanHours: spanMs != null ? Math.round((spanMs / 3600000) * 10) / 10 : null,
    peakHour,
    hours: hours.map((value) => roundMin(value)),
    tracks: [...tracks.values()]
      .sort((a, b) => b.plays - a.plays || b.ms - a.ms)
      .slice(0, 15)
      .map(finalize),
    artists: [...artists.values()]
      .sort((a, b) => b.ms - a.ms || b.plays - a.plays)
      .slice(0, 15)
      .map(finalize),
  };
}

function hourInTz(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  return Number.isFinite(hour) ? hour % 24 : 0;
}

function rangeMeta(key: "short" | "medium" | "long"): Pick<RangeStats, "label" | "window"> {
  if (key === "short") return { label: "4 weeks", window: "short_term" };
  if (key === "medium") return { label: "6 months", window: "medium_term" };
  return { label: "about a year", window: "long_term" };
}

function buildRange(
  key: "short" | "medium" | "long",
  tracks: SpotifyTrack[],
  artists: SpotifyArtist[],
): RangeStats {
  const liveTracks = tracks.filter((t) => t?.id);
  const liveArtists = artists.filter((a) => a?.id);
  const catalogMs = liveTracks.reduce((sum, t) => sum + (t.duration_ms || 0), 0);
  const pops = liveTracks.map((t) => t.popularity ?? 0);
  const explicit = liveTracks.filter((t) => t.explicit).length;
  const artistIds = new Set(liveTracks.flatMap((t) => t.artists.map((a) => a.id)));
  const albums = new Set(
    liveTracks.map((t) => t.album?.name).filter((name): name is string => Boolean(name)),
  );
  const genres = new Set(liveArtists.flatMap((a) => a.genres ?? []));
  const years = liveTracks.map((t) => yearOf(t.album?.release_date)).filter((y): y is number => y != null);
  const minutesByArtist = new Map<string, number>();
  for (const t of liveTracks) {
    const share = (t.duration_ms || 0) / Math.max(t.artists.length, 1);
    for (const a of t.artists) {
      minutesByArtist.set(a.id, (minutesByArtist.get(a.id) ?? 0) + share);
    }
  }

  return {
    ...rangeMeta(key),
    catalogMinutes: roundMin(catalogMs),
    avgPopularity: pops.length ? Math.round(pops.reduce((a, b) => a + b, 0) / pops.length) : 0,
    explicitPct: liveTracks.length ? Math.round((explicit / liveTracks.length) * 100) : 0,
    uniqueArtists: artistIds.size,
    uniqueAlbums: albums.size,
    uniqueGenres: genres.size,
    oldestYear: years.length ? Math.min(...years) : null,
    newestYear: years.length ? Math.max(...years) : null,
    meanDurationMin: liveTracks.length ? Math.round(catalogMs / liveTracks.length / 6000) / 10 : 0,
    tracks: liveTracks.slice(0, 15).map((t, i) => ({
      rank: i + 1,
      id: t.id,
      name: t.name,
      artists: artistLine(t.artists),
      minutes: roundMin(t.duration_ms || 0),
      popularity: t.popularity ?? 0,
      year: yearOf(t.album?.release_date),
      url: t.external_urls?.spotify ?? null,
      image: cover(t.album?.images),
    })),
    artists: liveArtists.slice(0, 15).map((a, i) => ({
      rank: i + 1,
      id: a.id,
      name: a.name,
      followers: a.followers?.total ?? 0,
      popularity: a.popularity ?? 0,
      genres: (a.genres ?? []).slice(0, 3).join(", "),
      url: artistUrl(a.id, a.external_urls?.spotify),
      image: cover(a.images),
      catalogMinutes: roundMin(minutesByArtist.get(a.id) ?? 0),
    })),
  };
}

let appTokenCache: { access: string; exp: number } | null = null;

async function clientCredentialsToken() {
  const env = requiredEnv();
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

export async function getListeningSnapshot(): Promise<ListeningSnapshot | null> {
  if (!spotifyConfigured()) return null;

  const [
    me,
    now,
    recent,
    savedTracks,
    savedAlbums,
    playlists,
    following,
    shows,
    shortTracks,
    mediumTracks,
    longTracks,
    shortArtists,
    mediumArtists,
    longArtists,
  ] = await Promise.all([
    spotify<{ display_name?: string; followers?: { total: number }; product?: string; external_urls?: { spotify?: string } }>("/me", {}),
    spotify<NowPlaying | Record<string, never>>("/me/player/currently-playing", {}, "fresh"),
    spotify<Paging<RecentlyPlayed>>("/me/player/recently-played?limit=50", { items: [] }),
    spotify<Paging<unknown>>("/me/tracks?limit=1", { items: [], total: 0 }),
    spotify<Paging<unknown>>("/me/albums?limit=1", { items: [], total: 0 }),
    spotify<Paging<unknown>>("/me/playlists?limit=1", { items: [], total: 0 }),
    spotify<{ artists?: { total?: number } }>("/me/following?type=artist&limit=1", {}),
    spotify<Paging<unknown>>("/me/shows?limit=1", { items: [], total: 0 }),
    spotify<Paging<SpotifyTrack>>("/me/top/tracks?time_range=short_term&limit=50", { items: [] }),
    spotify<Paging<SpotifyTrack>>("/me/top/tracks?time_range=medium_term&limit=50", { items: [] }),
    spotify<Paging<SpotifyTrack>>("/me/top/tracks?time_range=long_term&limit=50", { items: [] }),
    spotify<Paging<SpotifyArtist>>("/me/top/artists?time_range=short_term&limit=50", { items: [] }),
    spotify<Paging<SpotifyArtist>>("/me/top/artists?time_range=medium_term&limit=50", { items: [] }),
    spotify<Paging<SpotifyArtist>>("/me/top/artists?time_range=long_term&limit=50", { items: [] }),
  ]);

  const nowItem = "item" in now && now.item && now.item.id ? now.item : null;
  const nowPlaying =
    nowItem && "is_playing" in now && now.is_playing
      ? {
          name: nowItem.name,
          artists: artistLine(nowItem.artists ?? []),
          progressMin: roundMin(("progress_ms" in now ? now.progress_ms : 0) ?? 0),
          durationMin: roundMin(nowItem.duration_ms || 0),
          progressPct: nowItem.duration_ms
            ? Math.round((((("progress_ms" in now ? now.progress_ms : 0) ?? 0) / nowItem.duration_ms) * 100))
            : 0,
          url: nowItem.external_urls?.spotify ?? null,
          image: cover(nowItem.album?.images),
        }
      : null;

  const savedTrackCount = savedTracks.total ?? 0;
  const savedAlbumCount = savedAlbums.total ?? 0;
  const playlistCount = playlists.total ?? 0;
  const followedCount = following.artists?.total ?? 0;
  const showCount = shows.total ?? 0;

  return {
    profile: {
      name: me.display_name ?? "Spotify",
      followers: me.followers?.total ?? 0,
      product: me.product ?? "unknown",
      url: me.external_urls?.spotify ?? null,
    },
    nowPlaying,
    library: {
      savedTracks: savedTrackCount,
      savedAlbums: savedAlbumCount,
      playlists: playlistCount,
      followedArtists: followedCount,
      shows: showCount,
      total: savedTrackCount + savedAlbumCount + playlistCount + followedCount + showCount,
    },
    recent: buildRecent(recent.items ?? []),
    ranges: {
      short: buildRange("short", shortTracks.items ?? [], shortArtists.items ?? []),
      medium: buildRange("medium", mediumTracks.items ?? [], mediumArtists.items ?? []),
      long: buildRange("long", longTracks.items ?? [], longArtists.items ?? []),
    },
  };
}
