import { CaseCard } from "@/components/CaseCard";
import { WorkMore } from "@/components/WorkMore";
import { SectionHeading } from "@/components/bloom/Bloom";
import { roleMeta, work } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="section">
      <div className="frame">
        <SectionHeading id="heading-work">Work</SectionHeading>
        <div className="card-grid">
          {work.map((job) => (
            <CaseCard
              key={job.id}
              id={job.id}
              href={`/work/${job.id}`}
              title={job.company}
              kicker={job.role}
              summary={job.summary}
              meta={roleMeta(job)}
              whisper={job.whisper}
              accent={job.accent}
            />
          ))}
        </div>
        <WorkMore />
      </div>
    </section>
  );
}
