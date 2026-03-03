export default function ACMExperience() {
    const exp = {
        company: "ACM AI @ UCSD",
        role: "Full-stack Developer",
        date: "May 2025 – Present",
        location: "San Diego, CA",
        theme: "bg-black text-white",
        titleColor: "text-white",
        descColor: "text-gray-300",
        description: "Developed ACM AI's website, supporting 2,000+ members using React, MongoDB, Node.js, and Express.js. I also developed the AI Competitions platform, hosting 200+ national competitors and awarding over $5,000 in prizes, and refactored the competition logic to be configuration-driven, enabling easy support for new competitions. Additionally, I wrote several unit test suites and mocks using Jest that reduced manual verification time by approximately 2X."
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://ai.acmucsd.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    View Website
                </a>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <p className={`text-xl font-medium leading-relaxed ${exp.titleColor === 'text-white' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span dangerouslySetInnerHTML={{ __html: exp.description.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS)/g, '<strong>$1</strong>') }} />
                </p>
            </div>
        </div>
    );
}
