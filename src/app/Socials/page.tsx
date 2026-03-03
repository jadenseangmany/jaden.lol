import React from "react";
import { FadeInStagger, FadeInItem } from "../../components/FadeIn";

export default function SocialsPage() {
  const socials = [
    { name: "LinkedIn", link: "https://linkedin.com/in/jadenseangmany", text: "linkedin.com/in/jadenseangmany" },
    { name: "GitHub", link: "https://github.com/jadenseangmany", text: "github.com/jadenseangmany" },
    { name: "Email", link: "mailto:jadenseangmany@gmail.com", text: "jadenseangmany@gmail.com" },
    { name: "Phone", link: "tel:8582828040", text: "858-282-8040" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white pt-32 pb-20 flex flex-col items-center px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 animate-glow pointer-events-none"></div>

      <FadeInStagger>
        <FadeInItem><h1 className="title-text mb-12 text-center text-white z-10">Socials</h1></FadeInItem>
        <FadeInItem>
          <div className="relative bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl max-w-3xl w-full border border-white/20 z-10">
            <div className="flex flex-col space-y-4">
              {socials.map((social, index) => (
                <FadeInItem key={index} className="w-full">
                  <a
                    href={social.link}
                    target={social.name !== "Phone" && social.name !== "Email" ? "_blank" : undefined}
                    rel={social.name !== "Phone" && social.name !== "Email" ? "noopener noreferrer" : undefined}
                    className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-2xl hover:bg-white/10 transition group border border-transparent hover:border-white/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2 sm:mb-0 mr-4 min-w-[100px] group-hover:text-blue-400 transition">{social.name}</h3>
                    <p className="text-gray-300 font-mono text-lg break-all text-right sm:text-left">{social.text}</p>
                  </a>
                </FadeInItem>
              ))}
            </div>
          </div>
        </FadeInItem>
      </FadeInStagger>
    </div>
  );
}