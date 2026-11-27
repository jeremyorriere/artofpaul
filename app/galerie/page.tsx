import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getGalleryData } from "@/services/gallery.service";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Découvrez les dessins originaux de Paul : portraits, animaux, paysages et personnages imaginés à la main.",
};

export default async function GaleriePage() {
  const data = await getGalleryData();

  return (
    <div className="pb-24">
      <Container className="pt-12 sm:pt-16 lg:pt-20" id="portfolio">
        <section className="mb-10 grid gap-8 border-b border-stone-300 pb-8 sm:mb-12 sm:pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Art of Paul <span className="px-2 text-orange-800">/</span> Portfolio
            </p>
            <h1 className="max-w-4xl text-balance font-serif text-5xl font-medium leading-[0.98] tracking-tight text-stone-950 sm:text-6xl lg:text-8xl">
              Des dessins
              <br className="hidden sm:block" /> faits pour{" "}
              <span className="text-orange-800">raconter.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:min-w-64 lg:flex-col lg:items-end">
            <p className="max-w-xs text-sm leading-6 text-stone-600 lg:text-right">
              Illustrations originales, personnages et histoires dessinés à la main.
            </p>
            <a
              href="https://www.instagram.com/art_ofpaul/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-orange-800"
            >
              <Instagram className="size-4" />
              @art_ofpaul
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </section>

        <GalleryGrid artworks={data.artworks} categories={data.categories} />

        <section className="mt-20 flex flex-col gap-5 border-t border-stone-300 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">À votre tour</p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-stone-950 sm:text-3xl">
              Une idée à transformer en dessin ?
            </h2>
          </div>
          <Button asChild size="lg" className="w-fit rounded-full bg-stone-950 px-6 text-white hover:bg-stone-800">
            <Link href="/commande">
              Parlons de votre projet <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </section>
      </Container>
    </div>
  );
}
