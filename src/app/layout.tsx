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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${geistSans.className} h-full antialiased`}
    >
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
