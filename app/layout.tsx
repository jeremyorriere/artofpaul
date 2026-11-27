import type { Metadata } from "next";
import { Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const handwriting = Caveat_Brush({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Art of Paul | Dessins et BD sur commande",
    template: "%s | Art of Paul",
  },
  description:
    "Atelier d'illustration sur mesure : portraits de famille, couples, animaux, BD et aquarelles, avec paiement en ligne et suivi de commande.",
  icons: {
    icon: "/images/profil.jpg",
    apple: "/images/profil.jpg",
  },
  openGraph: {
    title: "Art of Paul | Dessins et BD sur commande",
    description:
      "Commandez un dessin personnalisé : portrait de famille, couple, animal, BD ou aquarelle, dessiné à la main par Pa'po.",
    url: "http://localhost:3000",
    siteName: "Art of Paul",
    locale: "fr_FR",
    type: "website",
    images: ["/og-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art of Paul",
    description: "Dessins sur commande, portfolio et boutique de Pa'po.",
    images: ["/og-cover.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${handwriting.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f4ec] text-stone-900">
        <Providers>
          <div className="relative flex min-h-full flex-col overflow-x-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 bg-[radial-gradient(ellipse_at_20%_0%,#bfe0f2_0%,rgba(191,224,242,0)_55%),radial-gradient(ellipse_at_85%_5%,#fcd9b0_0%,rgba(252,217,176,0)_50%)]" />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
