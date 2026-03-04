import Link from 'next/link';
import { FadeInStagger, FadeInItem } from '../../components/FadeIn';

export default function ProjectsPage() {
    const projects = [
        {
            title: "Lightweight LLM Platform",
            tools: "Swift, Rust, Tauri, Docker, AWS",
            theme: "bg-gradient-to-b from-black to-[#0a0a1a] text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/projects/LLM",
            github: "https://github.com/jadenseangmany/rainfy"
        },
        {
            title: "This or That - Decision Assistant",
            tools: "React, Next.js, Vercel",
            theme: "bg-gradient-to-b from-[#0E1440] to-[#1b2550] text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/projects/DecisionHelper",
            github: "https://github.com/jadenseangmany/Decision-Helper-COGS180"
        },
        {
            title: "Waste Classifier",
            tools: "Python, Computer Vision",
            theme: "bg-gradient-to-b from-[#1a1a4e] to-[#2e2e6e] text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/projects/WasteClassifier",
            github: "https://github.com/jadenseangmany/acm-ai-team-2-su25"
        },
        {
            title: "Decidr",
            tools: "APIs, Custom Algorithms",
            theme: "bg-gradient-to-b from-[#2a3a5c] to-[#3d5278] text-white",
            titleColor: "text-white",
            descColor: "text-gray-200",
            buttonType: "outline",
            link: "/projects/Decidr",
            github: "https://github.com/jadenseangmany/acmproj-hack3-fa25"
        },
        {
            title: "Diabeatit",
            tools: "Unity, C#",
            theme: "bg-gradient-to-b from-[#5a6f8f] to-[#8b9dc3] text-white",
            titleColor: "text-white",
            descColor: "text-gray-100",
            buttonType: "outline",
            link: "/projects/Diabeatit",
            github: "https://github.com/jadenseangmany/Diabeatit-Lunchbox-Minigame-SP25"
        },
        {
            title: "Zippy",
            tools: "Gemini API",
            theme: "bg-gradient-to-b from-[#c5ccd6] to-[#F5F5F7] text-black",
            titleColor: "text-black",
            descColor: "text-gray-700",
            buttonType: "blue",
            link: "/projects/Zippy",
            github: "https://github.com/jadenseangmany/Zippy"
        }
    ];

    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden pt-16">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>

            <div className="relative flex flex-col items-center w-full z-10">
                {projects.map((proj, idx) => (
                    <div key={idx} className={`relative flex flex-col items-center justify-center min-h-[60vh] w-full py-16 ${proj.theme}`}>
                        <FadeInStagger>
                            <FadeInItem><h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3></FadeInItem>
                            <FadeInItem><p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p></FadeInItem>

                            <FadeInItem>
                                <div className="flex space-x-4 mt-8 justify-center">
                                    {proj.buttonType === "white" && (
                                        <>
                                            <Link href={proj.link} className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                                                Learn more
                                            </Link>
                                            <a href={proj.github || "https://github.com/jadenseangmany/rainfy"} target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black transition">
                                                GitHub
                                            </a>
                                        </>
                                    )}
                                    {proj.buttonType === "blue" && (
                                        <>
                                            <Link href={proj.link} className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                                                Learn more
                                            </Link>
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="bg-transparent border border-blue-600 text-blue-600 px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition">
                                                GitHub
                                            </a>
                                        </>
                                    )}
                                    {proj.buttonType === "outline" && (
                                        <>
                                            <Link href={proj.link} className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                                                Learn more
                                            </Link>
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black transition">
                                                GitHub
                                            </a>
                                        </>
                                    )}
                                </div>
                            </FadeInItem>
                        </FadeInStagger>
                    </div>
                ))}
            </div>
        </div>
    );
}
