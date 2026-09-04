import Link from "next/link";
import { BloomUnit } from "@/components/bloom/Bloom";
import type { TravelPlace } from "@/lib/travel";

export function TravelNote({ place }: { place: TravelPlace }) {
  return (
    <article className="page-main travel-note">
      <div className="frame">
        <Link href="/about#heading-countries" className="back-link">
          Countries
        </Link>
        <BloomUnit
          id={`travel-${place.id}`}
          variant="meadow"
          pinOnClick={false}
          className="case-hero"
        >
          <p className="whisper">( travel )</p>
          <p className="case-kicker">{place.region}</p>
          <h1 className="bloom-title">{place.name}</h1>
        </BloomUnit>
        {place.body.length > 0 ? (
          <div className="travel-body">
            {place.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="travel-empty">I have not written this one yet.</p>
        )}
      </div>
    </article>
  );
}
