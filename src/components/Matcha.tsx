import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { BloomUnit } from "@/components/bloom/Bloom";
import { cn } from "@/lib/cn";
import { matcha, type MatchaShop } from "@/lib/matcha";
import { site } from "@/lib/content";

export function resolveCover(shop: MatchaShop) {
  if (shop.image) return shop.image;
  for (const ext of ["jpg", "jpeg", "png", "webp"] as const) {
    if (existsSync(join(process.cwd(), "public/matcha", `${shop.id}.${ext}`))) {
      return `/matcha/${shop.id}.${ext}`;
    }
  }
  return null;
}

function MatchaCard({ shop }: { shop: MatchaShop }) {
  const photo = resolveCover(shop);
  return (
    <article id={shop.id} className={cn("matcha-card-wrap", shop.rank === 1 && "is-featured")}>
      <BloomUnit
        id={`matcha-${shop.id}`}
        variant={shop.accent === "split" ? "split" : "meadow"}
        pinOnClick={false}
        decodeAll
        className={cn(
          "case-card",
          "matcha-card",
          `case-card--${shop.accent}`,
          shop.rank === 1 && "is-featured",
        )}
      >
        <Link href={`/matcha/${shop.id}`} className="case-card-link">
          <span className="matcha-card-field" aria-hidden="true">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="matcha-card-photo"
                src={photo}
                alt=""
                width={640}
                height={400}
              />
            ) : null}
            <span className="matcha-rank stat-items">{shop.rank}</span>
          </span>
          <p className="case-card-kicker">{shop.location}</p>
          <h2 className="bloom-title">{shop.name}</h2>
          <p className="meta meta-start">
            Rank {shop.rank} of {matcha.length}
          </p>
        </Link>
      </BloomUnit>
    </article>
  );
}

export function Matcha() {
  return (
    <div className="page-main matcha-page">
      <div className="frame">
        <Link href="/#fun" className="back-link">
          Fun
        </Link>
        <BloomUnit
          id="matcha-hero"
          variant="meadow"
          pinOnClick={false}
          className="case-hero"
        >
          <p className="whisper">( matcha )</p>
          <p className="case-kicker">{site.name}</p>
          <h1 className="bloom-title">Matcha</h1>
          <p className="meta meta-start">
            {matcha.length} shops, ranked. Click a card to open the visit.
          </p>
        </BloomUnit>
        <div className="card-grid matcha-grid">
          {matcha.map((shop) => (
            <MatchaCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
}
