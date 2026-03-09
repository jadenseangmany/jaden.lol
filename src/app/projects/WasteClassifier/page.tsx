export default function WasteClassifierProject() {
    const proj = {
        title: "Waste Classifier",
        tools: "Python, Computer Vision",
        theme: "bg-[#F5F5F7] text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        points: [
            "Mentored an ACM project team that developed a computer vision model to automatically classify different waste types.",
            "Guided students through the entire machine learning lifecycle, from dataset collection and preprocessing to model training and evaluation.",
            "Utilized <strong>Python</strong> and standard computer vision libraries to construct the classification architecture."
        ]
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${proj.theme}`}>
            <h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3>
            <p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/jadenseangmany/acm-ai-team-2-su25" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
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
