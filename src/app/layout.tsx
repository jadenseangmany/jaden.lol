import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BloomProvider } from "@/components/bloom/Bloom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jaden Seangmany",
  description:
    "Software engineer. Systems at Capital One, research with the CDC, president of ACM AI at UC San Diego.",
  metadataBase: new URL("https://jaden.lol"),
};

const BOOT_SCRIPT = `(function(){try{var r=document.documentElement;var mode="simple";var raw=localStorage.getItem("jaden.bloom");if(raw){var p=JSON.parse(raw);if(p.mode==="hybrid"||p.mode==="nurture"||p.mode==="simple")mode=p.mode;else if(p.fullBloom===true||p.nurture===true)mode="nurture";}r.dataset.bloomMode=mode;r.classList.toggle("full-bloom",mode==="nurture");r.classList.toggle("bloom-simple",mode==="simple");var theme=localStorage.getItem("jaden.theme");r.dataset.theme=theme==="light"?"light":"dark";r.style.colorScheme=r.dataset.theme;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${geistSans.className} bloom-simple h-full antialiased`}
      data-bloom-mode="simple"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <BloomProvider>
          <SiteChrome>
            <div className="shell" id="top">
              <div className="shell-grid" aria-hidden="true" />
              <a className="skip-link" href="#main">
                Skip to content
              </a>
              <Header />
              {children}
              <Footer />
            </div>
          </SiteChrome>
        </BloomProvider>
      </body>
    </html>
  );
}
