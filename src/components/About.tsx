import Link from "next/link";
import { BloomUnit, SectionHeading } from "@/components/bloom/Bloom";
import { Countries } from "@/components/Countries";
import { bio, education, personalFacts, site, skills } from "@/lib/content";

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
        <div className="about-bio">
          <p>{bio.intro}</p>
          <p>
            {bio.chat}
            <Link href="/matcha">matcha rankings</Link>
            !!!
          </p>
          <p className="about-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
        <div className="about-facts">
          {personalFacts.map((fact) => (
            <div className="about-fact" key={fact.label}>
              <p className="about-fact-label">{fact.label}</p>
              <p className="about-fact-value">
                {fact.label === "Fun fact"
                  ? `${fact.value} (see country list below)`
                  : fact.value}
              </p>
            </div>
          ))}
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
