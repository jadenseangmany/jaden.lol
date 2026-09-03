import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/bloom/Bloom";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="frame">
        <SectionHeading id="heading-projects">Projects</SectionHeading>
        <div className="case-list">
          {projects.map((item) => (
            <CaseCard
              key={item.id}
              id={item.id}
              href={`/projects/${item.id}`}
              title={item.name}
              kicker={item.subtitle}
              whisper={item.whisper}
              accent={item.accent}
              tags={item.stack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
