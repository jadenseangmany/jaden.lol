export default function ZippyProject() {
    const proj = {
        title: "Zippy",
        tools: "Gemini API",
        theme: "bg-black text-white",
        titleColor: "text-white",
        descColor: "text-gray-300",
        points: [
            "Developed a gamified learning platform during a hackathon to encourage students to submit homework on time.",
            "Integrated the <strong>Gemini API</strong> to automatically grade assignments and provide instantaneous feedback to users.",
            "Implemented complex engagement mechanics, including a point system, leaderboards, and a gacha gambling system to incentivize continuous learning."
        ]
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${proj.theme}`}>
            <h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3>
            <p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/jadenseangmany/Zippy" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    View GitHub
                </a>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <ul className={`list-disc list-inside space-y-4 text-xl font-medium ${proj.titleColor === 'text-white' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {proj.points.map((point, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
