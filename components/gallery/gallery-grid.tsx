"use client";

import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Heart, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { MediaImage } from "@/components/common/media-image";
import type { ArtworkCard, CategoryOption } from "@/types/app";
import { useFavorites } from "@/components/gallery/favorites-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  artworks: ArtworkCard[];
  categories: CategoryOption[];
}

export function GalleryGrid({ artworks, categories }: Readonly<GalleryGridProps>) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesCategory =
        selectedCategory === "all" || artwork.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        artwork.title.toLowerCase().includes(query.toLowerCase()) ||
        artwork.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [artworks, query, selectedCategory]);

  const favoriteCount = useMemo(() => artworks.filter((artwork) => isFavorite(artwork.id)).length, [artworks, isFavorite]);

  return (
    <div className="space-y-8">
      <div className="rounded-[36px] border border-stone-200 bg-gradient-to-br from-white via-white to-stone-50 p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-600">
              <Sparkles className="size-3.5 text-amber-500" /> Sélection curatoriale
            </div>
            <div>
              <p className="text-sm text-stone-600">
                <span className="font-semibold text-stone-950">{filtered.length}</span> œuvre{filtered.length > 1 ? "s" : ""} visible{filtered.length > 1 ? "s" : ""}
                {favoriteCount > 0 ? <span className="ml-3 text-stone-500">• {favoriteCount} favori{favoriteCount > 1 ? "s" : ""}</span> : null}
              </p>
              <p className="mt-1 text-sm text-stone-500">Filtrez, explorez en grand format et conservez vos inspirations préférées.</p>
            </div>
          </div>

          <label className="flex h-12 items-center gap-3 rounded-full border border-stone-200 bg-white px-4 shadow-sm">
            <Search className="size-4 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une œuvre"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400 lg:w-72"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant={selectedCategory === "all" ? "default" : "secondary"} size="sm" onClick={() => setSelectedCategory("all")}>
            Tout voir
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="rounded-[36px] border-dashed p-10 text-center">
          <div className="mx-auto max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Aucun résultat</p>
            <h3 className="text-2xl font-semibold text-stone-950">Aucune œuvre ne correspond à votre recherche.</h3>
            <p className="text-sm leading-6 text-stone-600">Essayez une autre catégorie ou un mot-clé plus large pour explorer l’ensemble du portfolio.</p>
            <Button variant="secondary" onClick={() => { setSelectedCategory("all"); setQuery(""); }}>
              Réinitialiser les filtres
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((artwork) => (
          <Card key={artwork.id} className="group overflow-hidden border-stone-200/80 bg-white/95 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70">
            <Dialog>
              <div className="relative">
                <DialogTrigger asChild>
                  <button className="group block w-full text-left">
                    <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-stone-950/45 via-stone-950/10 to-transparent" />
                      <MediaImage
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-stone-800 shadow-sm backdrop-blur">
                        <Search className="size-3.5" /> Voir l’œuvre
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <button
                  type="button"
                  onClick={() => toggleFavorite(artwork.id)}
                  className={cn(
                    "absolute right-4 top-4 rounded-full border border-white/60 bg-white/80 p-2 backdrop-blur transition hover:scale-105",
                    isFavorite(artwork.id) && "bg-rose-500 text-white",
                  )}
                  aria-label={isFavorite(artwork.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart className={cn("size-4", isFavorite(artwork.id) && "fill-current")} />
                </button>
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{artwork.category}</p>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-600">{artwork.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-950">{artwork.title}</h3>
                <p className="line-clamp-2 text-sm leading-6 text-stone-600">{artwork.tags.join(" • ")}</p>
                <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3 text-sm text-stone-500">
                  <span>Pièce inspirante pour commande sur mesure</span>
                  <ArrowUpRight className="size-4 text-stone-400 transition group-hover:text-stone-900" />
                </div>
              </div>

              <DialogContent className="max-w-5xl border border-stone-200/80 bg-white/95 p-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="relative aspect-4/5 overflow-hidden rounded-[32px] bg-stone-100 shadow-lg shadow-stone-200/60">
                    <MediaImage src={artwork.imageUrl} alt={artwork.title} className="object-cover" />
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-stone-600">
                        <BadgeCheck className="size-3.5 text-emerald-600" /> Œuvre mise en avant
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{artwork.category}</p>
                        <DialogTitle className="mt-3 text-3xl font-semibold text-stone-950">{artwork.title}</DialogTitle>
                      </div>
                    </div>

                    <DialogDescription className="text-base leading-7 text-stone-600">
                      Une création originale réalisée dans l’univers visuel de l’atelier, pensée pour transmettre une émotion durable.
                    </DialogDescription>

                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm leading-6 text-stone-700">
                        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Année</p>
                        <p className="mt-2 text-base font-semibold text-stone-950">{artwork.year}</p>
                      </div>
                      <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm leading-6 text-stone-700">
                        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Catégorie</p>
                        <p className="mt-2 text-base font-semibold text-stone-950">{artwork.category}</p>
                      </div>
                    </div>

                    <div className="rounded-[28px] bg-stone-950 p-5 text-sm leading-6 text-stone-200 shadow-lg shadow-stone-200/60">
                      <p className="font-medium text-white">Inspiration sur mesure</p>
                      <p className="mt-2">Vous aimez cette direction artistique ? L’atelier peut créer une version personnalisée pensée pour votre histoire, votre animal ou votre univers.</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="gap-2">
                        <Link href="/commande">
                          Commander dans ce style
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="secondary" onClick={() => toggleFavorite(artwork.id)}>
                        <Heart className={cn("mr-2 size-4", isFavorite(artwork.id) && "fill-current text-rose-500")} />
                        {isFavorite(artwork.id) ? "Retirer des favoris" : "Enregistrer en favori"}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>
    </div>
  );
}

