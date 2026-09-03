import { CaseCard } from "@/components/CaseCard";
import { WorkMore } from "@/components/WorkMore";
import { SectionHeading } from "@/components/bloom/Bloom";
import { work } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="section">
      <div className="frame">
        <SectionHeading id="heading-work">Work</SectionHeading>
        <div className="case-list work-list">
          {work.map((job) => (
            <CaseCard
              key={job.id}
              id={job.id}
              href={`/work/${job.id}`}
              title={job.company}
              kicker={job.role}
              whisper={job.whisper}
              accent={job.accent}
            />
          ))}
          <WorkMore />
        </div>
      </div>
    </section>
  );
}
