import Link from 'next/link';
import { FadeInStagger, FadeInItem } from './FadeIn';

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Cubic Corporation",
      role: "Software Engineering Intern",
      location: "San Diego, CA",
      theme: "bg-gradient-to-b from-black to-[#0a0a1a] text-white",
      titleColor: "text-white",
      descColor: "text-gray-300",
      buttonType: "outline",
      link: "/experience/Cubic"
    },
    {
      company: "Mastercard",
      role: "Mentorship Program Mentee",
      location: "Remote",
      theme: "bg-gradient-to-b from-[#0E1440] to-[#1b2550] text-white",
      titleColor: "text-white",
      descColor: "text-gray-300",
      buttonType: "outline",
      link: "/experience/Mastercard"
    },
    {
      company: "Apple",
      role: "Next-Gen Innovators Mentee",
      location: "San Diego, CA",
      theme: "bg-gradient-to-b from-[#1a1a4e] to-[#2e2e6e] text-white",
      titleColor: "text-white",
      descColor: "text-gray-300",
      buttonType: "outline",
      link: "/experience/Apple"
    },
    {
      company: "CDC: Centers for Disease Control and Prevention",
      role: "Undergraduate Researcher",
      location: "San Diego, CA",
      theme: "bg-gradient-to-b from-[#2a3a5c] to-[#3d5278] text-white",
      titleColor: "text-white",
      descColor: "text-gray-200",
      buttonType: "outline",
      link: "/experience/CDC"
    },
    {
      company: "CSE Dept @ UCSD",
      role: "Teaching Assistant",
      location: "San Diego, CA",
      theme: "bg-gradient-to-b from-[#5a6f8f] to-[#8b9dc3] text-white",
      titleColor: "text-white",
      descColor: "text-gray-100",
      buttonType: "outline",
      link: "/experience/UCSD"
    },
    {
      company: "ACM AI @ UCSD",
      role: "Full-stack Developer",
      location: "San Diego, CA",
      theme: "bg-gradient-to-b from-[#c5ccd6] to-[#F5F5F7] text-black",
      titleColor: "text-black",
      descColor: "text-gray-700",
      buttonType: "blue",
      link: "/experience/ACM"
    }
  ];

  return (
    <div className="relative flex flex-col items-center w-full z-10">
      {experiences.map((exp, idx) => (
        <div key={idx} className={`relative flex flex-col items-center justify-center min-h-[60vh] w-full py-16 ${exp.theme}`}>
          <FadeInStagger>
            <FadeInItem><h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3></FadeInItem>
            <FadeInItem><p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p></FadeInItem>
            <FadeInItem><p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.location}</p></FadeInItem>

            <FadeInItem>
              <div className="flex space-x-4 mt-4 justify-center">
                {exp.buttonType === "blue" && (
                  <Link href={exp.link} className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    Learn more
                  </Link>
                )}
                {exp.buttonType === "outline" && (
                  <Link href={exp.link} className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    Learn more
                  </Link>
                )}
                {exp.buttonType === "white" && (
                  <Link href={exp.link} className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    Learn more
                  </Link>
                )}
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      ))}
    </div>
  );
}
