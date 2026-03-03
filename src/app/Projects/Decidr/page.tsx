export default function DecidrProject() {
    const proj = {
        title: "Decidr",
        tools: "APIs, Custom Algorithms",
        theme: "bg-gradient-to-b from-gray-900 to-black text-white",
        titleColor: "text-white",
        descColor: "text-gray-300",
        points: [
            "Developed a tool using multiple APIs and a custom weighted algorithm to determine the optimal dining location for large groups of friends.",
            "Aggregated data from mapping and restaurant rating services to evaluate options based on distance, price, and group preferences.",
            "Built during the Fall 2025 ACM Hackathon (Hack3)."
        ]
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${proj.theme}`}>
            <h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3>
            <p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/jadenseangmany/acmproj-hack3-fa25" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
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
