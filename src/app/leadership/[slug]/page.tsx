import { CaseStudy } from "@/components/CaseStudy";
import { getLeadership, leadership, roleMeta, site } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return leadership.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/leadership/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getLeadership(slug);
  if (!item) return { title: site.name };
  return {
    title: `${item.company} · ${site.name}`,
    description: item.summary,
  };
}

export const dynamicParams = false;

export default async function LeadershipCasePage({
  params,
}: PageProps<"/leadership/[slug]">) {
  const { slug } = await params;
  const item = getLeadership(slug);
  if (!item) notFound();

  return (
    <main id="main">
      <CaseStudy
        backHref="/#leadership"
        backLabel="Leadership"
        bloomId={`case-${item.id}`}
        title={item.company}
        kicker={item.role}
        meta={roleMeta(item)}
        whisper={item.whisper}
        proof={item.proof}
        stack={item.stack}
        sections={item.sections}
      />
    </main>
  );
}
