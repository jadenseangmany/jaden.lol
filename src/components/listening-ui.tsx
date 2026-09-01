import type { CountRow } from "@/lib/spotify";
import type { ReactNode } from "react";

export function n(value: number) {
  return value.toLocaleString("en-US");
}

export function Proof({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="proof-row">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd className="stat-items">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Art({ src }: { src: string | null }) {
  if (!src) return <span className="listening-art is-empty" aria-hidden="true" />;
  return (
    // Spotify CDN covers. Decorative next to the title.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="listening-art" src={src} alt="" width={48} height={48} />
  );
}

function Row({ href, children }: { href: string | null; children: ReactNode }) {
  if (href) {
    return (
      <a className="listening-row" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return <div className="listening-row">{children}</div>;
}

export function CountList({
  rows,
  thumbs = true,
}: {
  rows: CountRow[];
  thumbs?: boolean;
}) {
  if (!rows.length) return <p className="listening-empty">No plays in this window.</p>;
  return (
    <ol className="listening-list">
      {rows.map((row, index) => (
        <li key={row.id}>
          <Row href={row.url}>
            <span className="listening-rank stat-items">{index + 1}</span>
            {thumbs ? <Art src={row.image} /> : null}
            <span className="listening-copy">
              <strong>{row.name}</strong>
              <span>{row.artists}</span>
            </span>
            <span className="listening-nums stat-items">
              <span>
                {n(row.plays)} {row.plays === 1 ? "play" : "plays"}
              </span>
              {row.minutes > 0 ? <span>{n(row.minutes)} min</span> : null}
            </span>
          </Row>
        </li>
      ))}
    </ol>
  );
}
