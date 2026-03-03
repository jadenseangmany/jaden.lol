import ExperienceSection from "../../components/ExperienceSection";
import { FadeInStagger, FadeInItem } from "../../components/FadeIn";

export default function ExperiencePage() {
    return (
        <div className="relative bg-black text-white min-h-screen pt-16 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>

            <div className="relative text-center py-12 z-10">
                <FadeInStagger className="w-full">
                    <FadeInItem>
                        <h1 className="text-5xl font-bold">Experience</h1>
                    </FadeInItem>
                    <FadeInItem>
                        <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                            A track record of shipping production code and learning from the best.
                        </p>
                    </FadeInItem>
                </FadeInStagger>
            </div>

            <ExperienceSection />
        </div>
    );
}
