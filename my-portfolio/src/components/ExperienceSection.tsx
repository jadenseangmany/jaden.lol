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
        gradient="bg-gradient-to-b from-black to-blue-900"
      />

      {/* Full Stack Developer */}
      <div className="text-center py-16 bg-gray-100 text-black">
        <h3 className="text-2xl font-bold">Full Stack Web Developer</h3>
        <p className="mt-2">ECE USC @ UCSD</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
          Learn more
        </button>
      </div>
    </div>
  );
}
