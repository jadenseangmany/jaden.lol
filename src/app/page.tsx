// src/app/page.tsx
import ExperienceSection from '../components/ExperienceSection';
import { FadeInStagger, FadeInItem } from '../components/FadeIn';

export default function Home() {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background glow effects for an Apple-like aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>

      {/* About Section */}
      <section id="about" className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 w-full bg-black text-white z-10">
        <FadeInStagger>
          <FadeInItem><h1 className="title-text mt-8">Hi I&apos;m Jaden.</h1></FadeInItem>
          <FadeInItem>
            <p className="subtitle-text mt-2 px-4">
              I like building things, learning, and reading webtoons.
            </p>
          </FadeInItem>

          <FadeInItem>
            <div className="flex space-x-4 mt-8 justify-center">
              <a href="mailto:jadenseangmany@gmail.com" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                Email me
              </a>
              <a href="https://linkedin.com/in/jadenseangmany" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-gray-600 text-gray-300 px-6 py-2 rounded-full text-lg font-medium hover:border-white hover:text-white transition">
                LinkedIn
              </a>
            </div>
          </FadeInItem>
        </FadeInStagger>
      </section>
    </div>
  );
}
