import { BloomUnit, SectionHeading } from "@/components/bloom/Bloom";
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
        <div className="about-block">
          <h3>{education.school}</h3>
          {education.degrees.map((degree) => (
            <p key={degree}>{degree}</p>
          ))}
          <p className="meta meta-start">{education.dates}</p>
        </div>
        <SectionHeading id="heading-awards">Awards</SectionHeading>
        <div className="award-list">
          {awards.map((award) => (
            <BloomUnit
              key={award.id}
              id={`award-${award.id}`}
              variant="meadow"
              className="award-row"
            >
              <h3 className="bloom-title">{award.title}</h3>
              {award.amount ? <p className="meta">{award.amount}</p> : null}
            </BloomUnit>
          ))}
        </div>
        <SectionHeading id="heading-papers">Papers</SectionHeading>
        <div className="paper-list">
          {papers.map((paper) => (
            <BloomUnit
              key={paper.id}
              id={`paper-${paper.id}`}
              variant="meadow"
              pinOnClick={false}
              className="paper-unit"
            >
              <a
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                className="paper-link"
              >
                <p className="whisper">( paper )</p>
                <p className="case-kicker">{paper.venue}</p>
                <h3 className="bloom-title">{paper.title}</h3>
                <p className="meta meta-start">{paper.year}</p>
              </a>
            </BloomUnit>
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
