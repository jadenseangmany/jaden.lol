export default function MastercardExperience() {
    const exp = {
        company: "Mastercard",
        role: "Mentorship Program Mentee",
        date: "September 2025 – Present",
        location: "Remote",
        theme: "bg-white text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        description: "Developed PromptShield, a privacy-focused Chrome Extension designed to block sensitive data from being accidentally submitted to LLMs like ChatGPT. I implemented real-time scanning using JavaScript/TypeScript to detect credit cards (validated via the Luhn algorithm), SSNs, API keys, and plaintext passwords before submission. The extension features a non-intrusive UI overlay utilizing HTML/CSS to warn users of detected risks, offering options to manually edit or automatically redact sensitive information. It was engineered to run 100% locally within the browser, ensuring zero data collection, transmission, or external analytics for maximum user privacy, and was successfully deployed and published to the Google Chrome Web Store."
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://chromewebstore.google.com/detail/promptshield/gkiefcfeocjiahbiojjpofipblamcanc" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    View PromptShield
                </a>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <p className={`text-xl font-medium leading-relaxed ${exp.titleColor === 'text-white' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span dangerouslySetInnerHTML={{ __html: exp.description.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS|JavaScript\/TypeScript)/g, '<strong>$1</strong>') }} />
                </p>
            </div>
        </div>
    );
}
