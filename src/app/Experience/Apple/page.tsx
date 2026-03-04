export default function AppleExperience() {
    const exp = {
        company: "Apple",
        role: "Next-Gen Innovators Mentee",
        date: "August 2025 – Present",
        location: "San Diego, CA",
        theme: "bg-white text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        description: "Collaborated with an experienced Apple engineer to design an agentic mobile app prototyping platform for Swift apps. I developed an iOS build pipeline using remote runners to generate Xcode projects and distribute previews via TestFlight. The platform integrates MCP-based tool orchestration to coordinate AI planning, code generation, and deployment workflows, utilizing designed agentic execution layers with Google Antigravity to coordinate planning, memory, tool use, and testing.",
        github: "https://github.com/jadenseangmany/bonfire"
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="flex space-x-4 mt-4">
                <a href={exp.github} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    View on GitHub
                </a>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <p className={`text-xl font-medium leading-relaxed text-black`}>
                    <span dangerouslySetInnerHTML={{ __html: exp.description.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS)/g, '<strong>$1</strong>') }} />
                </p>
            </div>
        </div>
    );
}
