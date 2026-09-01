import { Hero } from "@/components/Hero";
import { Fun } from "@/components/Fun";
import { Leadership } from "@/components/Leadership";
import { Projects } from "@/components/Projects";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <hr className="rule" />
      <Work />
      <hr className="rule" />
      <Leadership />
      <hr className="rule" />
      <Projects />
      <hr className="rule" />
      <Fun />
    </main>
  );
}
