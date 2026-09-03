import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { otherInvolvement } from "@/lib/content";

export function Involvement() {
  return (
    <section id="involvement" className="section">
      <div className="frame">
        <SectionHeading id="heading-involvement">Other Involvement</SectionHeading>
        <div className="case-list">
          {otherInvolvement.map((item) => (
            <CaseCard
              key={item.id}
              id={item.id}
              title={item.company}
              kicker={item.role}
              whisper={item.whisper}
              accent={item.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
