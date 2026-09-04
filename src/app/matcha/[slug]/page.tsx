import { MatchaVisit } from "@/components/MatchaVisit";
import { site } from "@/lib/content";
import { getMatcha, matcha } from "@/lib/matcha";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return matcha.map((shop) => ({ slug: shop.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/matcha/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const shop = getMatcha(slug);
  if (!shop) return { title: site.name };
  return {
    title: `${shop.name} · Matcha · ${site.name}`,
    description: `${shop.name}, ${shop.location}. Top ${shop.rank}.`,
  };
}

export const dynamicParams = false;

export default async function MatchaShopPage({
  params,
}: PageProps<"/matcha/[slug]">) {
  const { slug } = await params;
  const shop = getMatcha(slug);
  if (!shop) notFound();

  return (
    <main id="main">
      <MatchaVisit shop={shop} />
    </main>
  );
}
