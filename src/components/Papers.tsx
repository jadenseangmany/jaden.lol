import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { papers } from "@/lib/content";

export function Papers() {
  return (
    <section id="papers" className="section">
      <div className="frame">
        <SectionHeading id="heading-papers">Papers</SectionHeading>
        <div className="case-list">
          {papers.map((paper) => (
            <CaseCard
              key={paper.id}
              id={`paper-${paper.id}`}
              href={paper.href}
              title={paper.title}
              kicker={paper.venue}
              whisper="( paper )"
              accent="meadow"
              external
            />
          ))}
        </div>
      </div>
    </section>
  );
}
