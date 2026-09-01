import { About } from "@/components/About";
import { site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  description: `${site.name}. ${site.pronouns}. ${site.role}.`,
};

export default function AboutPage() {
  return (
    <main id="main">
      <About />
    </main>
  );
}
