import Link from "next/link";
import { BloomUnit } from "@/components/bloom/Bloom";
import { cn } from "@/lib/cn";

export function CaseCard({
  id,
  href,
  title,
  kicker,
  summary,
  meta,
  whisper,
  accent,
  featured = false,
}: {
  id: string;
  href?: string;
  title: string;
  kicker: string;
  summary: string;
  meta?: string;
  whisper: string;
  accent: "meadow" | "sage" | "denim" | "pollen" | "split";
  featured?: boolean;
}) {
  const body = (
    <>
      <span className="case-card-field" aria-hidden="true" />
      <p className="whisper">{whisper}</p>
      <p className="case-card-kicker">{kicker}</p>
      <h3 className="bloom-title">{title}</h3>
      <p className="case-card-summary">{summary}</p>
      {meta ? <p className="meta meta-start">{meta}</p> : null}
    </>
  );

  return (
    <BloomUnit
      id={id}
      variant={featured ? "split" : "meadow"}
      pinOnClick={!href}
      decodeAll
      className={cn(
        "case-card",
        `case-card--${accent}`,
        featured && "is-featured",
      )}
    >
      {href ? (
        <Link href={href} className="case-card-link">
          {body}
        </Link>
      ) : (
        <div className="case-card-link">{body}</div>
      )}
    </BloomUnit>
  );
}
