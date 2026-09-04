import Link from "next/link";
import { SectionHeading } from "@/components/bloom/Bloom";
import { travelRegions } from "@/lib/travel";

export function Countries() {
  return (
    <section className="about-countries-block">
      <SectionHeading id="heading-countries">Countries</SectionHeading>
      <div className="country-regions">
        {travelRegions.map((region) => (
          <div className="country-region" key={region.id}>
            <h3>{region.label}</h3>
            <p className="country-links">
              {region.places.map((place) => (
                <Link key={place.id} href={`/travel/${place.id}`}>
                  {place.name}
                </Link>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
