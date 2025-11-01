import type { Metadata } from "next";
import { Geist_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaiTech - IA Accessible, Adaptive et Transformative pour l'Afrique",
  description: "Systèmes IA et outils d'automatisation pour entreprises africaines. Optimisez vos opérations, réduisez vos coûts, débloquez la croissance. Ingénierie de classe mondiale, insight local. Dakar, Sénégal.",
  keywords: ["IA Afrique", "Automatisation", "Intelligence Artificielle", "Sénégal", "Dakar", "LLM", "RAG", "Machine Learning", "Transformation digitale"],
  authors: [{ name: "SaiTech" }],
  openGraph: {
    title: "SaiTech - Intelligence Artificielle pour l'Afrique",
    description: "Rendons l'IA accessible, adaptive et transformative pour les entreprises africaines.",
    type: "website",
    locale: "fr_FR",
    siteName: "SaiTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaiTech - IA pour l'Afrique",
    description: "Systèmes intelligents et automatisation pour entreprises africaines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#F5F7FB' }}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
