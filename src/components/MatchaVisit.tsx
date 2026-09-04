import Link from "next/link";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { BloomUnit } from "@/components/bloom/Bloom";
import { resolveCover } from "@/components/Matcha";
import { cn } from "@/lib/cn";
import { type MatchaShop } from "@/lib/matcha";

function visitPhotos(shop: MatchaShop) {
  const extras = [...shop.photos];
  const dir = join(process.cwd(), "public/matcha", shop.id);
  try {
    for (const file of readdirSync(dir)) {
      if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
      extras.push(`/matcha/${shop.id}/${file}`);
    }
  } catch {
    /* no visit folder yet */
  }
  return extras;
}

export function MatchaVisit({ shop }: { shop: MatchaShop }) {
  const cover = resolveCover(shop);
  const photos = visitPhotos(shop);

  return (
    <article className="page-main matcha-visit">
      <div className="frame">
        <Link href="/matcha" className="back-link">
          Matcha
        </Link>
        <BloomUnit
          id={`visit-${shop.id}`}
          variant={shop.accent === "split" ? "split" : "meadow"}
          className={cn("case-hero", "matcha-visit-hero", `case-card--${shop.accent}`)}
        >
          <span className="matcha-card-field matcha-visit-field" aria-hidden="true">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="matcha-card-photo"
                src={cover}
                alt=""
                width={1280}
                height={720}
              />
            ) : null}
          </span>
          <p className="whisper">( matcha )</p>
          <p className="case-kicker">{shop.location}</p>
          <h1 className="bloom-title">{shop.name}</h1>
          <p className="meta meta-start">
            Top {shop.rank}
          </p>
        </BloomUnit>
        <dl className="proof-row">
          <div>
            <dt>top</dt>
            <dd className="stat-items">{shop.rank}</dd>
          </div>
          <div>
            <dt>city</dt>
            <dd>{shop.location}</dd>
          </div>
        </dl>
        {shop.body.length > 0 ? (
          shop.body.map((paragraph) => (
            <section key={paragraph.slice(0, 24)} className="case-block">
              <p>{paragraph}</p>
            </section>
          ))
        ) : (
          <section className="case-block">
            <p>This visit is still being written.</p>
          </section>
        )}
        {shop.website ? (
          <p className="stack">
            <a href={shop.website} target="_blank" rel="noreferrer">
              {shop.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </p>
        ) : null}
        {photos.length > 0 ? (
          <div className="matcha-visit-gallery">
            {photos.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" width={640} height={480} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

