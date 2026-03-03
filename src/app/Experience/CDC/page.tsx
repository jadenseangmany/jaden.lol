export default function CDCExperience() {
    const exp = {
        company: "CDC: Centers for Disease Control and Prevention",
        role: "Software Engineering Undergraduate Researcher",
        date: "September 2024 – Present",
        location: "San Diego, CA",
        theme: "bg-white text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        description: "Built metaWEPP, a Snakemake/Python metagenomics pipeline for detecting and analyzing novel viruses, which was submitted to top research conferences and journals such as RECOMB and NAR Genomics and Bioinformatics. I tuned hyperparameters to add support for over 16 million reads, achieving 99% classification accuracy. Furthermore, I automated CI/CD with GitHub Actions, built Docker images, and parallelized workflows for a 2X speedup, while automating dataset discovery using Google BigQuery and Python to accelerate validation across 50+ datasets by 3X."
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://github.com/TurakhiaLab/metaWEPP" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    View GitHub
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
