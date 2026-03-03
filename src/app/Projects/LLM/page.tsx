export default function LLMProject() {
    const proj = {
        title: "Lightweight LLM Platform",
        tools: "Swift, Rust, Tauri, Docker, AWS",
        theme: "bg-gradient-to-b from-[#0E1440] to-[#F5F5F7] text-black",
        titleColor: "text-white",
        descColor: "text-white",
        points: [
            "Built a desktop-native multi-modal LLM platform with prompt branching and multi-window PIP workflows.",
            "Integrated OpenAI, Claude, and Gemini APIs to run prompts across models for comparison and reliability analysis.",
            "Implemented orchestration layers to manage prompt routing, response aggregation, and concurrent model execution.",
            "Developed native macOS client in Swift and a Windows client using Tauri + Rust optimized for resource efficiency.",
            "Containerized backend with Docker, deployed via AWS App Runner, and orchestrated components using Kubernetes."
        ]
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${proj.theme}`}>
            <h3 className={`title-text mt-8 ${proj.titleColor}`}>{proj.title}</h3>
            <p className={`subtitle-text mt-2 ${proj.descColor}`}>{proj.tools}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/jadenseangmany/rainfy" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    View GitHub
                </a>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <ul className={`list-disc list-inside space-y-4 text-xl font-medium text-black`}>
                    {proj.points.map((point, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: point.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS|desktop-native multi-modal LLM platform|OpenAI, Claude, and Gemini APIs|orchestration layers|native macOS client in Swift|Windows client using Tauri \+ Rust|Docker|AWS App Runner|Kubernetes)/g, '<strong>$1</strong>') }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
