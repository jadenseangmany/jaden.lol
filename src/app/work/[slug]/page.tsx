import { CaseStudy } from "@/components/CaseStudy";
import { getWork, nonprofitWork, roleMeta, site, work } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [...work, ...nonprofitWork].map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: site.name };
  return {
    title: `${item.company} · ${site.name}`,
    description: item.summary,
  };
}

export const dynamicParams = false;

export default async function WorkCasePage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <main id="main">
      <CaseStudy
        backHref="/#work"
        backLabel="Work"
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
