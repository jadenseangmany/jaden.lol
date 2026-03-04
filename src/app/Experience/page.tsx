import ExperienceSection from "../../components/ExperienceSection";
import { FadeInStagger, FadeInItem } from "../../components/FadeIn";

export default function ExperiencePage() {
    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden pt-16">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>
            <ExperienceSection />
        </div>
    );
}
