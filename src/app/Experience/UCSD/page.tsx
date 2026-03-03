export default function UCSDExperience() {
    const exp = {
        company: "CSE Dept @ UCSD",
        role: "Teaching Assistant",
        date: "September 2025 – December 2025",
        location: "San Diego, CA",
        theme: "bg-black text-white",
        titleColor: "text-white",
        descColor: "text-gray-300",
        description: "Supported weekly labs for 250+ students on TypeScript and HTML/CSS, improving average project scores by 15%. I developed Python scripts to streamline grading and feedback, earning the highest course evaluations on record, and collaborated with instructional staff to iterate on lab design and align learning objectives across multiple sections."
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
