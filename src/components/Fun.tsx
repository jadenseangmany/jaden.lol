import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { fun } from "@/lib/content";

export function Fun() {
  return (
    <section id="fun" className="section">
      <div className="frame">
        <SectionHeading id="heading-fun">Fun</SectionHeading>
        <div className="card-grid">
          {fun.map((item) => (
            <CaseCard
              key={item.id}
              id={item.id}
              href={item.href}
              title={item.title}
              kicker={item.kicker}
              summary={item.summary}
              whisper={item.whisper}
              accent={item.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
