export default function ExperienceSection() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Data Engineer */}
      <div className="relative flex flex-col items-center justify-start min-h-[60vh] w-full max-w-4xl mx-auto bg-black text-white">
        <h3 className="title-text mt-8">Data Engineer</h3>
        <p className="subtitle-text mt-2">Intern @ Turakhia Lab</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full">
          Learn more
        </button>
      </div>

      {/* R&D Engineer */}
      <div className="relative flex flex-col items-center justify-start min-h-[60vh] w-full mx-auto bg-gradient-to-b from-[#0E1440] to-[#F5F5F7] text-black">
        <h3 className="title-text mt-8 text-white">R&D Engineer</h3>
        <p className="subtitle-text mt-2 text-white">Intern @ FastChar</p>
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-full">
          Learn more
        </button>
      </div>

      {/* Full Stack Developer */}
      <div className="flex flex-col items-center justify-end min-h-[60vh] w-full bg-gray-100 text-black">
        <h3 className="title-text mt-8">Full Stack Web Developer</h3>
        <p className="subtitle-text mt-2">ECE USC @ UCSD</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full">
          Learn more
        </button>
      </div>
    </div>
  );
}
