#!/usr/bin/env python3
"""Aggregate Spotify extended streaming history into privacy-stripped JSON.

Reads a zip from argv[1] (or ~/Downloads/my_spotify_data.zip).
Writes:
  src/data/listening-history.json  (totals, years, time windows)
  public/listening-catalog.json    (searchable track play counts)
Does not keep IP addresses, usernames, or raw events.
"""
from __future__ import annotations

import json
import sys
import zipfile
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

TZ = ZoneInfo("America/Los_Angeles")
PLAY_MS = 30_000
TOP_N = 25
ROOT = Path(__file__).resolve().parents[1]
HISTORY_OUT = ROOT / "src" / "data" / "listening-history.json"
CATALOG_OUT = ROOT / "public" / "listening-catalog.json"


def round_min(ms: int) -> int:
    return int(round(ms / 60_000))


def parse_ts(iso: str) -> datetime:
    return datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(TZ)


def hour_pt(iso: str) -> int:
    return parse_ts(iso).hour


def year_pt(iso: str) -> int:
    return parse_ts(iso).year


def empty_bucket() -> dict:
    return {
        "plays": 0,
        "qualifyingPlays": 0,
        "ms": 0,
        "skips": 0,
        "tracks": {},
        "artists": {},
        "uniqueTracks": set(),
        "uniqueArtists": set(),
    }


def add_play(bucket: dict, uri: str, title: str, artist: str, played: int, skipped: bool) -> None:
    bucket["plays"] += 1
    bucket["ms"] += played
    if skipped:
        bucket["skips"] += 1
    qualifying = played >= PLAY_MS
    if qualifying:
        bucket["qualifyingPlays"] += 1
    bucket["uniqueTracks"].add(uri)
    bucket["uniqueArtists"].add(artist)

    row = bucket["tracks"].get(uri)
    if row:
        row["plays"] += 1
        row["ms"] += played
        if qualifying:
            row["qualifying"] += 1
    else:
        tid = uri.replace("spotify:track:", "") if uri.startswith("spotify:track:") else uri
        bucket["tracks"][uri] = {
            "id": tid,
            "name": title,
            "artists": artist,
            "plays": 1,
            "qualifying": 1 if qualifying else 0,
            "ms": played,
            "url": (
                f"https://open.spotify.com/track/{uri.split(':')[-1]}"
                if uri.startswith("spotify:track:")
                else None
            ),
        }

    arow = bucket["artists"].get(artist)
    if arow:
        arow["plays"] += 1
        arow["ms"] += played
        if qualifying:
            arow["qualifying"] += 1
    else:
        bucket["artists"][artist] = {
            "id": artist,
            "name": artist,
            "artists": artist,
            "plays": 1,
            "qualifying": 1 if qualifying else 0,
            "ms": played,
            "url": None,
        }


def finalize_row(row: dict) -> dict:
    return {
        "id": row["id"],
        "name": row["name"],
        "artists": row["artists"],
        "plays": row["qualifying"],
        "minutes": round_min(row["ms"]),
        "url": row.get("url"),
        "image": None,
    }


def top_rows(mapping: dict, n: int, by: str) -> list[dict]:
    rows = sorted(mapping.values(), key=lambda r: (-r[by], -r["ms"]))[:n]
    return [finalize_row(r) for r in rows]


def summarize_window(bucket: dict, window_id: str, label: str, start: str, end: str) -> dict:
    return {
        "id": window_id,
        "label": label,
        "start": start,
        "end": end,
        "minutes": round_min(bucket["ms"]),
        "plays": bucket["plays"],
        "qualifyingPlays": bucket["qualifyingPlays"],
        "uniqueTracks": len(bucket["uniqueTracks"]),
        "uniqueArtists": len(bucket["uniqueArtists"]),
        "tracks": top_rows(bucket["tracks"], TOP_N, "qualifying"),
        "artists": top_rows(bucket["artists"], TOP_N, "qualifying"),
    }


def main() -> None:
    zip_path = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / "Downloads" / "my_spotify_data.zip")
    if not zip_path.exists():
        raise SystemExit(f"missing zip: {zip_path}")

    lifetime = empty_bucket()
    years: dict[int, dict] = defaultdict(empty_bucket)
    hours = [0] * 24
    platforms: dict[str, int] = defaultdict(int)
    countries: dict[str, int] = defaultdict(int)
    events: list[tuple[str, str, str, str, int, bool]] = []

    podcast_plays = 0
    podcast_ms = 0
    first_ts: str | None = None
    last_ts: str | None = None

    with zipfile.ZipFile(zip_path) as zf:
        names = sorted(
            n for n in zf.namelist()
            if n.endswith(".json") and "Streaming_History_Audio" in n
        )
        for name in names:
            print(f"reading {name.split('/')[-1]}", flush=True)
            with zf.open(name) as fh:
                rows = json.load(fh)
            for ev in rows:
                ts = ev.get("ts")
                if not ts:
                    continue
                if first_ts is None or ts < first_ts:
                    first_ts = ts
                if last_ts is None or ts > last_ts:
                    last_ts = ts

                played = int(ev.get("ms_played") or 0)
                if ev.get("episode_name"):
                    podcast_plays += 1
                    podcast_ms += played
                    continue

                title = ev.get("master_metadata_track_name")
                artist = ev.get("master_metadata_album_artist_name")
                uri = ev.get("spotify_track_uri") or f"{artist}::{title}"
                if not title or not artist:
                    continue

                skipped = bool(ev.get("skipped"))
                events.append((ts, uri, title, artist, played, skipped))
                add_play(lifetime, uri, title, artist, played, skipped)
                add_play(years[year_pt(ts)], uri, title, artist, played, skipped)
                hours[hour_pt(ts)] += played
                platform = str(ev.get("platform") or "unknown")
                platforms[platform.split()[0].lower()] += 1
                countries[str(ev.get("conn_country") or "??")] += 1

    if not first_ts or not last_ts:
        raise SystemExit("no plays in export")

    last_dt = parse_ts(last_ts)
    day_start = last_dt.replace(hour=0, minute=0, second=0, microsecond=0)
    window_starts = [
        ("today", "Today", day_start),
        ("week", "Past week", last_dt - timedelta(days=7)),
        ("month", "Past month", last_dt - timedelta(days=30)),
        ("sixMonths", "Past 6 months", last_dt - timedelta(days=183)),
        ("year", "Past year", last_dt - timedelta(days=365)),
    ]
    window_buckets = {key: empty_bucket() for key, _, _ in window_starts}

    for ts, uri, title, artist, played, skipped in events:
        dt = parse_ts(ts)
        for key, _, start in window_starts:
            if dt >= start:
                add_play(window_buckets[key], uri, title, artist, played, skipped)

    year_rows = []
    for y in sorted(years):
        b = years[y]
        year_rows.append({
            "year": y,
            "minutes": round_min(b["ms"]),
            "plays": b["plays"],
            "qualifyingPlays": b["qualifyingPlays"],
            "skips": b["skips"],
            "uniqueTracks": len(b["uniqueTracks"]),
            "uniqueArtists": len(b["uniqueArtists"]),
        })

    peak_hour = max(range(24), key=lambda h: hours[h])
    total_plays = lifetime["plays"]
    windows = {
        key: summarize_window(
            window_buckets[key],
            key,
            label,
            start.isoformat(),
            last_dt.isoformat(),
        )
        for key, label, start in window_starts
    }
    windows["all"] = summarize_window(lifetime, "all", "All-time", first_ts, last_ts)

    payload = {
        "source": "spotify-extended-streaming-history",
        "playThresholdSec": 30,
        "firstPlay": first_ts,
        "lastPlay": last_ts,
        "minutes": round_min(lifetime["ms"]),
        "plays": total_plays,
        "qualifyingPlays": lifetime["qualifyingPlays"],
        "skips": lifetime["skips"],
        "skipPct": round((lifetime["skips"] / total_plays) * 100) if total_plays else 0,
        "uniqueTracks": len(lifetime["uniqueTracks"]),
        "uniqueArtists": len(lifetime["uniqueArtists"]),
        "podcastPlays": podcast_plays,
        "podcastMinutes": round_min(podcast_ms),
        "meanPlayMin": round((lifetime["ms"] / total_plays) / 6000) / 10 if total_plays else 0,
        "peakHour": peak_hour,
        "hours": [round_min(v) for v in hours],
        "years": year_rows,
        "tracks": windows["all"]["tracks"],
        "artists": windows["all"]["artists"],
        "windows": windows,
        "platforms": dict(sorted(platforms.items(), key=lambda kv: -kv[1])[:8]),
        "countries": dict(sorted(countries.items(), key=lambda kv: -kv[1])[:8]),
    }

    catalog = [
        [row["id"], row["name"], row["artists"], row["qualifying"]]
        for row in lifetime["tracks"].values()
        if row["qualifying"] > 0
    ]
    catalog.sort(key=lambda r: -r[3])

    HISTORY_OUT.parent.mkdir(parents=True, exist_ok=True)
    HISTORY_OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    CATALOG_OUT.write_text(json.dumps({"tracks": catalog}, ensure_ascii=False, separators=(",", ":")))
    print(f"wrote {HISTORY_OUT} ({HISTORY_OUT.stat().st_size} bytes)")
    print(f"wrote {CATALOG_OUT} ({CATALOG_OUT.stat().st_size} bytes, {len(catalog)} tracks)")
    print(
        f"minutes={payload['minutes']} plays={payload['plays']} "
        f"qualifying={payload['qualifyingPlays']} years={len(year_rows)}"
    )
    for key, _, _ in window_starts:
        w = windows[key]
        print(f"  {w['label']}: {w['qualifyingPlays']} plays, {w['minutes']} min")


if __name__ == "__main__":
    main()
