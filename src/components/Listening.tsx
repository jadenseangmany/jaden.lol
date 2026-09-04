import Link from "next/link";
import { BloomUnit, SectionHeading } from "@/components/bloom/Bloom";
import { ListeningAsk, ListeningExplorer } from "@/components/ListeningExplorer";
import { Art, Proof, n } from "@/components/listening-ui";
import {
  historyWindows,
  monthYear,
  type LifetimeHistory,
  type LifetimeYear,
} from "@/lib/listening-history";
import type { ListeningSnapshot } from "@/lib/spotify";

function YearList({ years }: { years: LifetimeYear[] }) {
  return (
    <ol className="listening-list listening-years">
      {years.map((row) => (
        <li key={row.year}>
          <div className="listening-row listening-year-row">
            <span className="listening-rank stat-items">{row.year}</span>
            <span className="listening-copy">
              <strong>{n(row.minutes)} min</strong>
              <span>
                {n(row.qualifyingPlays)} plays over 30s · {n(row.plays)} total
              </span>
            </span>
            <span className="listening-nums stat-items">
              <span>{n(row.uniqueTracks)} tracks</span>
              <span>{n(row.uniqueArtists)} artists</span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ListeningSetup() {
  return (
    <div className="page-main listening-page">
      <div className="frame">
        <Link href="/#fun" className="back-link">
          Spotify Stats
        </Link>
        <h1 className="visually-hidden">Spotify Stats</h1>
        <p className="case-block">
          This page reads Jaden’s Spotify account. It is waiting on a connection.
        </p>
      </div>
    </div>
  );
}

export function ListeningError() {
  return (
    <div className="page-main listening-page">
      <div className="frame">
        <Link href="/#fun" className="back-link">
          Spotify Stats
        </Link>
        <h1 className="visually-hidden">Spotify Stats</h1>
        <p className="case-block">
          Spotify did not return a snapshot. Try again in a minute.
        </p>
      </div>
    </div>
  );
}

export function Listening({
  data,
  lifetime,
  covers,
}: {
  data: ListeningSnapshot | null;
  lifetime: LifetimeHistory | null;
  covers: Record<string, string>;
}) {
  const hours = lifetime?.hours ?? data?.recent.hours ?? [];
  const hourMax = Math.max(1, ...hours);
  const peakHour = lifetime?.peakHour ?? data?.recent.peakHour ?? 0;
  const peakLabel = `${String(peakHour).padStart(2, "0")}:00`;
  const heroMinutes = lifetime?.minutes ?? data?.recent.minutes ?? 0;
  const windows = lifetime ? historyWindows(lifetime) : [];

  return (
    <div className="page-main listening-page">
      <div className="frame">
        <Link href="/#fun" className="back-link">
          Spotify Stats
        </Link>
        <h1 className="visually-hidden">Spotify Stats</h1>
        <div className="listening-lede">
          <p className="listening-hero-stat stat-items">{n(heroMinutes)}</p>
          <ListeningAsk />
        </div>
        <p className="listening-note">
          {lifetime
            ? `Minutes from Spotify extended history, ${monthYear(lifetime.firstPlay)} through ${monthYear(lifetime.lastPlay)}. A play counts after 30 seconds, same as Wrapped.${data ? "" : " The live snapshot is unavailable."}`
            : "Minutes across the last 50 plays. Spotify’s public API does not publish lifetime totals."}
        </p>

        {data?.nowPlaying ? (
          <BloomUnit
            id="listening-now"
            variant="meadow"
            pinOnClick={false}
            className="listening-now"
          >
            <Art src={data.nowPlaying.image} />
            <div>
              <p className="case-kicker">Now</p>
              <p className="bloom-title">{data.nowPlaying.name}</p>
              <p className="meta meta-start">{data.nowPlaying.artists}</p>
              <p className="meta meta-start stat-items">
                {data.nowPlaying.progressMin} / {data.nowPlaying.durationMin} min
                · {data.nowPlaying.progressPct}%
              </p>
            </div>
          </BloomUnit>
        ) : null}

        {lifetime ? (
          <>
            <SectionHeading id="heading-listening-all-time">All-time</SectionHeading>
            <Proof
              items={[
                { value: n(lifetime.minutes), label: "minutes" },
                { value: n(lifetime.qualifyingPlays), label: "plays over 30s" },
                { value: n(lifetime.plays), label: "all plays" },
                { value: n(lifetime.uniqueTracks), label: "unique tracks" },
                { value: n(lifetime.uniqueArtists), label: "unique artists" },
                { value: `${lifetime.skipPct}%`, label: "skip rate" },
                { value: String(lifetime.meanPlayMin), label: "mean play min" },
                { value: peakLabel, label: "peak hour PT" },
              ]}
            />
            <p className="listening-caption">Minutes by hour, Pacific time</p>
            <div
              className="listening-hours"
              role="img"
              aria-label={`Listening minutes by hour of day, Pacific time. Peak ${peakLabel}.`}
            >
              {hours.map((minutes, hour) => (
                <div key={hour} className="listening-hour">
                  <span
                    className="listening-hour-bar"
                    style={{ height: `${Math.max(4, (minutes / hourMax) * 100)}%` }}
                    title={`${String(hour).padStart(2, "0")}:00 · ${minutes} min`}
                  />
                  {hour % 6 === 0 ? (
                    <span className="listening-hour-label">{hour}</span>
                  ) : (
                    <span className="listening-hour-label is-quiet" />
                  )}
                </div>
              ))}
            </div>
            <SectionHeading id="heading-listening-years">By year</SectionHeading>
            <YearList years={lifetime.years} />
            <ListeningExplorer windows={windows} covers={covers} />
          </>
        ) : null}
      </div>
    </div>
  );
}
