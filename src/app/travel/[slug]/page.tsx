import { TravelNote } from "@/components/TravelNote";
import { site } from "@/lib/content";
import { getTravel, travel } from "@/lib/travel";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return travel.map((place) => ({ slug: place.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/travel/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = getTravel(slug);
  if (!place) return { title: site.name };
  return {
    title: `${place.name} · ${site.name}`,
    description: `${place.name}, ${place.region}.`,
  };
}

export const dynamicParams = false;

export default async function TravelPage({
  params,
}: PageProps<"/travel/[slug]">) {
  const { slug } = await params;
  const place = getTravel(slug);
  if (!place) notFound();

  return (
    <main id="main">
      <TravelNote place={place} />
    </main>
  );
}
