import Link from 'next/link';
import { FadeInStagger, FadeInItem } from '../../components/FadeIn';

export default function ProjectsPage() {
    const projects = [
        {
            title: "Lightweight LLM Platform",
            tools: "Swift, Rust, Tauri, Docker, AWS",
            theme: "bg-gradient-to-b from-[#0E1440] to-[#F5F5F7] text-black",
            titleColor: "text-white",
            descColor: "text-white",
            buttonType: "white",
            link: "/Projects/LLM"
        },
        {
            title: "This or That - Decision Assistant",
            tools: "React, Next.js, Vercel",
            theme: "bg-white text-black",
            titleColor: "text-black",
            descColor: "text-gray-900",
            buttonType: "blue",
            link: "/Projects/DecisionHelper",
            github: "https://github.com/jadenseangmany/Decision-Helper-COGS180"
        },
        {
            title: "Waste Classifier",
            tools: "Python, Computer Vision",
            theme: "bg-black text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/Projects/WasteClassifier",
            github: "https://github.com/jadenseangmany/acm-ai-team-2-su25"
        },
        {
            title: "Decidr",
            tools: "APIs, Custom Algorithms",
            theme: "bg-gradient-to-b from-gray-900 to-black text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/Projects/Decidr",
            github: "https://github.com/jadenseangmany/acmproj-hack3-fa25"
        },
        {
            title: "Diabeatit",
            tools: "Unity, C#",
            theme: "bg-white text-black",
            titleColor: "text-black",
            descColor: "text-gray-900",
            buttonType: "blue",
            link: "/Projects/Diabeatit",
            github: "https://github.com/jadenseangmany/Diabeatit-Lunchbox-Minigame-SP25"
        },
        {
            title: "Zippy",
            tools: "Gemini API",
            theme: "bg-black text-white",
            titleColor: "text-white",
            descColor: "text-gray-300",
            buttonType: "outline",
            link: "/Projects/Zippy",
            github: "https://github.com/jadenseangmany/Zippy"
        }
    ];

    return (
        <div className="relative bg-black text-white min-h-screen pt-16 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>

            <div className="relative text-center py-12 z-10">
                <FadeInStagger>
                    <FadeInItem><h1 className="text-5xl font-bold">Projects</h1></FadeInItem>
                    <FadeInItem>
                        <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                            Things I've built to make life a little easier.
                        </p>
                    </FadeInItem>
                </FadeInStagger>
            </div>

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
