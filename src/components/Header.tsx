import Link from "next/link";
import { ModeHint } from "@/components/ModeHint";
import { NurtureToggle } from "@/components/NurtureToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/content";

export function Header() {
  return (
    <header className="site-header">
      <div className="frame header-inner">
        <Link className="wordmark" href="/">
          {site.wordmark}
          <span className="wordmark-tld">{site.tld}</span>
        </Link>
        <div className="header-utils">
          <a href={site.resumeHref} target="_blank" rel="noreferrer">
            resume
          </a>
          <a href={`mailto:${site.email}`}>email</a>
          <ModeHint>
            <NurtureToggle />
          </ModeHint>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
