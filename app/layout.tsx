import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Art of Paul | Dessins sur commande haut de gamme",
    template: "%s | Art of Paul",
  },
  description:
    "Atelier d'illustration sur mesure : portraits, animaux, paysages, manga et créations premium avec paiement en ligne et suivi de commande.",
  icons: {
    icon: "/images/profil.jpg",
    apple: "/images/profil.jpg",
  },
  openGraph: {
    title: "Art of Paul | Dessins sur commande haut de gamme",
    description:
      "Commandez un dessin personnalisé, découvrez la galerie et suivez vos commandes dans une expérience premium.",
    url: "http://localhost:3000",
    siteName: "Art of Paul",
    locale: "fr_FR",
    type: "website",
    images: ["/og-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art of Paul",
    description: "Dessins sur commande, galerie premium et boutique d'art.",
    images: ["/og-cover.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f4ec] text-stone-900">
        <Providers>
          <div className="relative flex min-h-full flex-col overflow-x-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-130 bg-[radial-gradient(circle_at_top,#fde68a_0%,rgba(255,255,255,0)_48%)]" />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
