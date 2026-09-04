import { SectionHeading } from "@/components/bloom/Bloom";
import { awards } from "@/lib/content";

export function Awards() {
  return (
    <section id="awards" className="section">
      <div className="frame">
        <SectionHeading id="heading-awards">Awards</SectionHeading>
        <div className="case-list award-list">
          {awards.map((award) => (
            <div className="award-row" key={award.id}>
              <h3>{award.title}</h3>
              {award.amount ? (
                <p className="case-card-kicker">{award.amount}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
