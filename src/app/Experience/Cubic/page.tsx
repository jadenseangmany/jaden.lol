export default function CubicExperience() {
    const exp = {
        company: "Cubic Corporation",
        role: "Software Engineering Intern",
        date: "June 2025 – December 2025",
        location: "San Diego, CA",
        theme: "bg-white text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        description: "Led full-stack development of a C# GUI interfacing with FPGA registers for real-time waveform masking. I built Python automation pipelines to convert register maps into XML, saving months of cumulative debugging time, and collaborated with hardware engineers using VHDL, Vivado, and ModelSim to validate RF systems. Additionally, I built automated firmware test builds that standardized technician testing and surfaced 5+ firmware defects per build."
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <p className={`text-xl font-medium leading-relaxed ${exp.titleColor === 'text-white' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span dangerouslySetInnerHTML={{ __html: exp.description.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS)/g, '<strong>$1</strong>') }} />
                </p>
            </div>
        </div>
    );
}
