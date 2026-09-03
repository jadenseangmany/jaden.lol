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
  layout = "row",
  external = false,
  tags,
}: {
  id: string;
  href?: string;
  title: string;
  kicker: string;
  summary?: string;
  meta?: string;
  whisper: string;
  accent: "meadow" | "sage" | "denim" | "pollen" | "split";
  featured?: boolean;
  layout?: "row" | "tile";
  external?: boolean;
  tags?: readonly string[];
}) {
  const isTile = layout === "tile";
  const body = isTile ? (
    <>
      <span className="case-card-field" aria-hidden="true" />
      <p className="whisper">{whisper}</p>
      <p className="case-card-kicker">{kicker}</p>
      <h3 className="bloom-title">{title}</h3>
      {summary ? <p className="case-card-summary">{summary}</p> : null}
      {meta ? <p className="meta meta-start">{meta}</p> : null}
    </>
  ) : (
    <>
      <div className="case-row-copy">
        <h3 className="bloom-title">{title}</h3>
        <p className="case-card-kicker">{kicker}</p>
        {tags && tags.length > 0 ? (
          <p className="case-row-tags">{tags.join(" · ")}</p>
        ) : null}
      </div>
      <div className="case-row-aside">
        <p className="whisper">{whisper}</p>
        {href ? (
          <span className="case-row-more" aria-hidden="true">
            Read more
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <BloomUnit
      id={id}
      variant={featured && isTile ? "split" : "meadow"}
      pinOnClick={!href}
      decodeAll
      className={cn(
        isTile ? "case-card" : "case-row",
        isTile && `case-card--${accent}`,
        isTile && featured && "is-featured",
      )}
    >
      {href ? (
        <Link
          href={href}
          className="case-card-link"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {body}
        </Link>
      ) : (
        <div className="case-card-link">{body}</div>
      )}
    </BloomUnit>
  );
}
