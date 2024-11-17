// src/app/page.tsx
import ExperienceSection from '../components/ExperienceSection';

export default function Home() {
  return (
    <div>
      {/* Experience Section */}
      <section id="experience">
        <ExperienceSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-100 text-black">
        <div className="grid grid-cols-2 gap-4 px-8">
          <div className="bg-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Outreach Instructor</h3>
            <p className="mt-2">Eta Kappa Nu @ UCSD</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
              Learn more
            </button>
          </div>
          <div className="bg-black text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold">Roblox Autofarm</h3>
            <p className="mt-2">Project @ V3million</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
              Learn more
            </button>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Mathlab Tutor</h3>
            <p className="mt-2">ASC @ Miramar College</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
              Learn more
            </button>
          </div>
          <div className="bg-black text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold">Connect 4 AI</h3>
            <p className="mt-2">Project @ jaden.lol</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
