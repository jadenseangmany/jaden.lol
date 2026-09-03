import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { leadership, leadershipPins } from "@/lib/content";

export function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="frame">
        <SectionHeading id="heading-leadership">Leadership</SectionHeading>
        <div className="case-list">
          {leadership.map((item) => (
            <CaseCard
              key={item.id}
              id={item.id}
              href={`/leadership/${item.id}`}
              title={item.company}
              kicker={item.role}
              whisper={item.whisper}
              accent={item.accent}
            />
          ))}
          {leadershipPins.map((item) => (
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
