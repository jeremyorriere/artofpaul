import Link from "next/link";
import { Instagram, Mail, Palette } from "lucide-react";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-950 text-stone-200">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
              <Palette className="size-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-stone-400">Art of Paul</p>
              <p className="text-lg font-semibold">Dessins sur commande</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-400">
            Un atelier haut de gamme pour transformer vos souvenirs, passions et univers en œuvres sensibles.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">Navigation</h3>
          <div className="grid gap-2 text-sm">
            <Link href="/galerie">Galerie</Link>
            <Link href="/boutique">Boutique</Link>
            <Link href="/commande">Commande personnalisée</Link>
            <Link href="/compte">Espace client</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">Contact</h3>
          <div className="space-y-3 text-sm text-stone-300">
            <a href="mailto:contact@artofpaul.fr" className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4" /> contact@artofpaul.fr
            </a>
            <a href="https://instagram.com" className="flex items-center gap-2 hover:text-white">
              <Instagram className="size-4" /> Instagram atelier
            </a>
            <p>Délais moyens : 10 à 21 jours</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

