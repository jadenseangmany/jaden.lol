import { Listening, ListeningError, ListeningSetup } from "@/components/Listening";
import { site } from "@/lib/content";
import { getLifetimeHistory, windowTrackIds } from "@/lib/listening-history";
import { getListeningSnapshot, getTrackCovers, spotifyConfigured } from "@/lib/spotify";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Spotify Stats · ${site.name}`,
  description:
    "All-time Spotify minutes from extended history, plus windows, play counts, and a search through the catalog.",
};

export default async function ListeningPage() {
  const lifetime = getLifetimeHistory();
  let data = null;

  if (spotifyConfigured()) {
    try {
      data = await getListeningSnapshot();
    } catch {
      /* history still renders */
    }
  }

  if (!lifetime && !data && !spotifyConfigured()) {
    return (
      <main id="main">
        <ListeningSetup />
      </main>
    );
  }

  if (!lifetime && !data) {
    return (
      <main id="main">
        <ListeningError />
      </main>
    );
  }

  let covers: Record<string, string> = {};
  if (lifetime) {
    try {
      covers = await getTrackCovers(windowTrackIds(lifetime));
    } catch {
      covers = {};
    }
  }

  return (
    <main id="main">
      <Listening data={data} lifetime={lifetime} covers={covers} />
    </main>
  );
}
