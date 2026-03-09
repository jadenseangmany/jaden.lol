import Image from "next/image";

export default function MastercardExperience() {
    const exp = {
        company: "Mastercard",
        role: "Mentorship Program Mentee",
        date: "September 2025 – Present",
        location: "Remote",
        theme: "bg-white text-black",
        titleColor: "text-black",
        descColor: "text-gray-900",
        description: "Mentored by an experienced Mastercard security engineer, I developed PromptShield, a privacy-focused Chrome Extension designed to block sensitive data from being accidentally submitted to LLMs like ChatGPT. I implemented real-time scanning using JavaScript/TypeScript to detect credit cards (validated via the Luhn algorithm), SSNs, API keys, and plaintext passwords before submission. The extension features a non-intrusive UI overlay utilizing HTML/CSS to warn users of detected risks, offering options to manually edit or automatically redact sensitive information. It was engineered to run 100% locally within the browser, ensuring zero data collection, transmission, or external analytics for maximum user privacy, and was successfully deployed and published to the Google Chrome Web Store."
    };

    return (
        <div className={`relative flex flex-col items-center min-h-screen w-full pt-32 pb-16 ${exp.theme}`}>
            <h3 className={`title-text mt-8 ${exp.titleColor}`}>{exp.company}</h3>
            <p className={`subtitle-text mt-2 ${exp.descColor}`}>{exp.role}</p>
            <p className={`text-sm mt-1 mb-6 font-medium ${exp.descColor} opacity-80`}>{exp.date} | {exp.location}</p>

            <div className="flex space-x-4 mt-4">
                <a href="https://chromewebstore.google.com/detail/promptshield/gkiefcfeocjiahbiojjpofipblamcanc" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">
                    View PromptShield on Chrome Web Store
                </a>
            </div>

            {/* Hero Thumbnail */}
            <div className="mt-12 max-w-3xl px-8 w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                    <Image
                        src="/images/promptshield img 1.png"
                        alt="PromptShield detecting sensitive data in ChatGPT"
                        width={1024}
                        height={640}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </div>

            <div className="mt-16 max-w-4xl px-8 text-left w-full">
                <p className={`text-xl font-medium leading-relaxed ${exp.titleColor === 'text-white' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span dangerouslySetInnerHTML={{ __html: exp.description.replace(/(metaWEPP|Snakemake|Python|GitHub Actions|Docker|Google BigQuery|React|MongoDB|Node\.js|Express\.js|Jest|TestFlight|Google Antigravity|C#|FPGA|XML|VHDL|Vivado|ModelSim|TypeScript|HTML\/CSS|JavaScript\/TypeScript)/g, '<strong>$1</strong>') }} />
                </p>
            </div>

            {/* How It Works */}
            <div className="mt-20 max-w-4xl px-8 w-full">
                <h4 className="text-3xl font-bold text-black mb-4">How It Works</h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                    PromptShield monitors the text you type into LLM chatboxes like ChatGPT in real-time. When it detects sensitive information—such as credit card numbers, Social Security numbers, email addresses, phone numbers, or API keys—it intercepts the submission and displays a warning overlay. Users can then choose to <strong>go back and edit</strong> their message or <strong>remove the sensitive data and send</strong> it safely.
                </p>
            </div>

            {/* Screenshots */}
            <div className="mt-12 max-w-5xl px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                        <Image
                            src="/images/promptshield img 2.png"
                            alt="PromptShield detecting multiple types of sensitive data including SSN, credit card, email, phone, and API keys"
                            width={1024}
                            height={640}
                            className="w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 text-center py-3 px-4">Detecting 5 types of sensitive data at once</p>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                        <Image
                            src="/images/promptshield img 1.png"
                            alt="PromptShield detecting a single credit card number"
                            width={1024}
                            height={640}
                            className="w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 text-center py-3 px-4">Detecting a single piece of sensitive data (credit card number)</p>
                    </div>
                </div>
            </div>

            {/* Why It Matters */}
            <div className="mt-20 max-w-4xl px-8 w-full">
                <h4 className="text-3xl font-bold text-black mb-4">Why It Matters</h4>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    As LLMs like ChatGPT become part of everyday workflows, a growing number of people are unknowingly pasting sensitive information—credit card numbers, Social Security numbers, passwords, and API keys—directly into AI chatboxes. This data can be stored, logged, or even leaked in future breaches, posing a serious privacy risk.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    This isn&apos;t just a hypothetical concern. In January 2026, <a href="https://www.politico.com/news/2026/01/27/cisa-madhu-gottumukkala-chatgpt-00749361" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800 transition">CISA reported that government employees were pasting sensitive data into ChatGPT</a>, highlighting how widespread this issue has become—even within organizations with strict data handling policies.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Older and less tech-savvy users are particularly at risk, as they may not fully understand how LLMs store and process data. PromptShield was built to address this gap—acting as a safety net that runs entirely in the browser, catching sensitive data before it ever leaves the user&apos;s machine.
                </p>
            </div>
        </div>
    );
}
