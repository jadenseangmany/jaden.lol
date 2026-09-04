import Link from "next/link";
import { BloomUnit, SectionHeading } from "@/components/bloom/Bloom";
import { Countries } from "@/components/Countries";
import { aiSummary, bio, education, site, skills } from "@/lib/content";

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
          <div className="about-copy">
            <BloomUnit id="about-name" variant="split" className="about-identity">
              <p className="whisper">( about )</p>
              <h1 className="bloom-title">{site.name}</h1>
              <p className="about-pronouns">{site.pronouns}</p>
            </BloomUnit>
          </div>
        </div>
        <section className="about-summary" aria-labelledby="about-ai-summary">
          <h2 id="about-ai-summary" className="about-summary-heading">
            {aiSummary.heading}
          </h2>
          <ul className="about-summary-list">
            {aiSummary.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <div className="about-bio">
          <p>{bio.intro}</p>
          <p>
            {bio.chat}
            <Link href="/matcha">matcha rankings</Link>
            !!!
          </p>
        </div>
        <Countries />
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
