import type { Metadata, Viewport } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { club } from "@/data/club";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  // TODO: domaine définitif
  metadataBase: new URL("https://mbt-academy.fr"),
  title: {
    default: `${club.name} — ${club.tagline} à ${club.city}`,
    template: `%s | ${club.name}`,
  },
  description: `Cours de boxe à ${club.city} (Bruxelles), dès 15 ans, tous niveaux. Lundi et mercredi 19h30, sparring le samedi. Séance d'essai ${club.trialFree ? "offerte" : "sur réservation"}.`,
  openGraph: { siteName: club.name, locale: "fr_BE", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0e0d0c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${anton.variable} ${geist.variable} h-full antialiased`}>
      <head>
        {/* Active les animations d'apparition seulement si JS tourne. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
