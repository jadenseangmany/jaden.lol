import { Matcha } from "@/components/Matcha";
import { site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Matcha · ${site.name}`,
  description: "Top matcha shops Jaden has visited.",
};

export default function MatchaIndexPage() {
  return (
    <main id="main">
      <Matcha />
    </main>
  );
}
