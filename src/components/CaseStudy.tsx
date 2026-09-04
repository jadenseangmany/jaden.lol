import Link from "next/link";
import { BloomUnit } from "@/components/bloom/Bloom";
import type { CaseSection, ProjectLink, Proof } from "@/lib/content";

function paragraphs(copy: CaseSection["copy"]) {
  return typeof copy === "string" ? [copy] : copy;
}

export function CaseStudy({
  backHref,
  backLabel,
  bloomId,
  title,
  kicker,
  meta,
  whisper,
  proof,
  stack,
  sections,
  links,
}: {
  backHref: string;
  backLabel: string;
  bloomId: string;
  title: string;
  kicker: string;
  meta?: string;
  whisper: string;
  proof: readonly Proof[];
  stack: readonly string[];
  sections: readonly CaseSection[];
  links?: readonly ProjectLink[];
}) {
  return (
    <article className="page-main case-study">
      <div className="frame">
        <Link href={backHref} className="back-link">
          {backLabel}
        </Link>
        <BloomUnit
          id={bloomId}
          variant="split"
          pinOnClick={false}
          className="case-hero"
        >
          <p className="whisper">{whisper}</p>
          <p className="case-kicker">{kicker}</p>
          <h1 className="bloom-title">{title}</h1>
          {meta ? <p className="meta meta-start">{meta}</p> : null}
        </BloomUnit>
        {links && links.length > 0 ? (
          <p className="case-links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </p>
        ) : null}
        {proof.length > 0 ? (
          <dl className="proof-row">
            {proof.map((item) => (
              <div key={`${item.value}-${item.label}`}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {sections.map((section) => (
          <section key={section.title} className="case-block">
            <h2>{section.title}</h2>
            {paragraphs(section.copy).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {stack.length > 0 ? (
          <p className="stack">{stack.join(" · ")}</p>
        ) : null}
      </div>
    </article>
  );
}
