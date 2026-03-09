export default function DiabeatitProject() {
    const proj = {
        title: "Diabeatit",
        tools: "Unity, C#",
        theme: "bg-[#F5F5F7] text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        points: [
            "Collaborated directly with UCSD Health Sciences to develop an educational mini-game aimed at preventing Type II diabetes.",
            "Built the interactive game logic and visual interface entirely in the <strong>Unity</strong> engine utilizing <strong>C#</strong>.",
            "Deployed the game to the Preuss school, enabling young scholars and children to play, learn, and improve their health literacy."
        ]
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${proj.theme}`}>
            <h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3>
            <p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/jadenseangmany/Diabeatit-Lunchbox-Minigame-SP25" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    View on GitHub
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
