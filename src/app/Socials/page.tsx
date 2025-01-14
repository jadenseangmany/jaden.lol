// page.tsx
import React from "react";

const Page = () => {
  const socials = [
    { name: "Instagram", link: "https://instagram.com/placeholder", buttonText: "Follow" },
    { name: "LinkedIn", link: "https://linkedin.com/in/jadenseangmany", buttonText: "Connect" },
    { name: "Discord", link: "http://discord.com/users/336738623661801473", buttonText: "Send friend request" },
    { name: "Email", link: "mailto:jadenseangmany@gmail.com", buttonText: "jadenseangmany@gmail.com" },
  ];

  return (
    <section id="socials" className="py-16 bg-gray-100 text-black">
      <div className="grid grid-cols-2 gap-4 px-8">
        {socials.map((social, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-blue-100 text-black" : "bg-black text-white"
            } text-center p-6 rounded-lg`}
          >
            <h3 className="text-xl font-bold">{social.name}</h3>
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-full"
            >
              {social.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;