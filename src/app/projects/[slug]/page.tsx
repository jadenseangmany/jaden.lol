import { CaseStudy } from "@/components/CaseStudy";
import { getProject, projects, site } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) return { title: site.name };
  return {
    title: `${item.name} · ${site.name}`,
    description: item.summary,
  };
}

export const dynamicParams = false;

export default async function ProjectCasePage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) notFound();

  return (
    <main id="main">
      <CaseStudy
        backHref="/#projects"
        backLabel="Projects"
        bloomId={`case-${item.id}`}
        title={item.name}
        kicker={item.subtitle}
        meta={item.dates}
        whisper={item.whisper}
        proof={item.proof}
        stack={item.stack}
        sections={item.sections}
      />
    </main>
  );
}
