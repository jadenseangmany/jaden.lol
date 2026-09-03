import { BloomUnit, SectionHeading } from "@/components/bloom/Bloom";
import { CaseCard } from "@/components/CaseCard";
import { awards, education, papers, site, skills } from "@/lib/content";

export function About() {
  return (
    <div className="page-main about-page">
      <div className="frame">
        <div className="about-intro">
          <BloomUnit id="about-photo" variant="meadow" className="about-photo">
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.photo}
                alt={site.name}
                width={400}
                height={400}
              />
            }
          </BloomUnit>
          <BloomUnit id="about-name" variant="split" className="about-identity">
            <p className="whisper">( about )</p>
            <h1 className="bloom-title">{site.name}</h1>
            <p className="about-pronouns">{site.pronouns}</p>
          </BloomUnit>
        </div>
        <SectionHeading id="heading-education">Education</SectionHeading>
        <div className="case-list education-list">
          <div className="education-row">
            <div className="case-row-copy">
              <h3>{education.school}</h3>
              <p className="case-card-kicker">{education.dates}</p>
            </div>
            {education.degrees.map((degree) => (
              <p key={degree}>{degree}</p>
            ))}
          </div>
        </div>
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
        <SectionHeading id="heading-papers">Papers</SectionHeading>
        <div className="case-list paper-list">
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
        <SectionHeading id="heading-skills">Skills</SectionHeading>
        <div className="skills">
          {skills.map((row) => (
            <div className="skill-row" key={row.label}>
              <p className="skill-label">{row.label}</p>
              <p className="skill-items">{row.items}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
