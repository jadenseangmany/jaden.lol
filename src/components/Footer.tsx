import { BloomUnit } from "@/components/bloom/Bloom";
import { TreeMark } from "@/components/bloom/TreeMark";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="frame footer-inner">
        <div className="footer-links">
          <BloomUnit id="contact-email" variant="nav" pinOnClick={false}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </BloomUnit>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
        <BloomUnit id="footer-mark" variant="paper" className="footer-note">
          <TreeMark className="tree-mark" />
          <span className="bloom-title">jaden.lol</span>
        </BloomUnit>
      </div>
    </footer>
  );
}
