import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { involvement, leadership, roleMeta } from "@/lib/content";

export function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="frame">
        <SectionHeading id="heading-leadership">Leadership + Student Involvement</SectionHeading>
        <div className="card-grid">
          {leadership.map((item, index) => (
            <CaseCard
              key={item.id}
              id={item.id}
              href={`/leadership/${item.id}`}
              title={item.company}
              kicker={item.role}
              summary={item.summary}
              meta={roleMeta(item)}
              whisper={item.whisper}
              accent={item.accent}
              featured={index === 0}
            />
          ))}
          {involvement.map((item) => (
            <CaseCard
              key={item.id}
              id={item.id}
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
