// src/components/ExperienceSection.tsx
import JobCard from './JobCard';

export default function ExperienceSection() {
  return (
    <div>
      {/* Data Engineer */}
      <JobCard
        title="Data Engineer"
        subtitle="Intern @ Turakhia Lab"
        gradient="bg-black"
      />

      {/* R&D Engineer */}
      <JobCard
        title="R&D Engineer"
        subtitle="Intern @ FastChar"
        gradient=""
        buttonStyle="bg-white text-black"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #0E1440 30%, #F5F5F7 100%)',
            zIndex: -1,
          }}
        />
      </JobCard>
      {/* Full Stack Developer */}
      <div className="flex flex-col items-center justify-start min-h-[60vh] bg-gray-100 text-black">
        <h3 className="title-text mt-8">Full Stack Web Developer</h3>
        <p className="subtitle-text mt-2">ECE USC @ UCSD</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full">
          Learn more
        </button>
      </div>
    </div>
  );
}
