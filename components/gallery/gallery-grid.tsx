"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MediaImage } from "@/components/common/media-image";
import type { ArtworkCard, CategoryOption } from "@/types/app";
import { useFavorites } from "@/components/gallery/favorites-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  artworks: ArtworkCard[];
  categories: CategoryOption[];
}

export function GalleryGrid({ artworks, categories }: Readonly<GalleryGridProps>) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const activeCategory = categories.find((category) => category.slug === selectedCategory);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");

    return artworks.filter((artwork) => {
      const matchesCategory =
        selectedCategory === "all" ||
        artwork.category.toLocaleLowerCase("fr") === activeCategory?.name.toLocaleLowerCase("fr");
      const matchesSearch =
        normalizedQuery.length === 0 ||
        artwork.title.toLocaleLowerCase("fr").includes(normalizedQuery) ||
        artwork.category.toLocaleLowerCase("fr").includes(normalizedQuery) ||
        artwork.tags.some((tag) => tag.toLocaleLowerCase("fr").includes(normalizedQuery));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory?.name, artworks, query, selectedCategory]);

  const favoriteCount = useMemo(
    () => artworks.filter((artwork) => isFavorite(artwork.id)).length,
    [artworks, isFavorite],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex min-w-0 gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-xs font-medium transition",
                selectedCategory === "all"
                  ? "bg-stone-950 text-white"
                  : "text-stone-600 hover:bg-stone-200/70 hover:text-stone-950",
              )}
            >
              Tout
            </button>
            {categories.map((category) => {
              const active = selectedCategory === category.slug;
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  aria-pressed={active}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-2 text-xs font-medium transition",
                    active
                      ? "bg-stone-950 text-white"
                      : "text-stone-600 hover:bg-stone-200/70 hover:text-stone-950",
                  )}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-3 sm:justify-end sm:border-0 sm:pt-0">
          {favoriteCount > 0 ? (
            <span className="flex items-center gap-1.5 text-xs text-stone-500">
              <Heart className="size-3.5 fill-rose-500 text-rose-500" />
              {favoriteCount} favori{favoriteCount === 1 ? "" : "s"}
            </span>
          ) : null}
          <span className="text-xs text-stone-500">
            {String(filtered.length).padStart(2, "0")} dessin{filtered.length === 1 ? "" : "s"}
          </span>
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-full border border-stone-300 bg-[#fffdf8] px-3 text-stone-500 transition focus-within:border-stone-500 sm:w-56">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher un dessin"
              aria-label="Chercher un dessin"
              className="w-full bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="shrink-0 rounded-full p-1 transition hover:bg-white"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Aucun résultat</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-stone-950">
            Aucun dessin ne correspond à votre recherche.
          </h2>
          <p className="mt-2 text-sm text-stone-600">Essayez un autre mot ou explorez une autre catégorie.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-5 rounded-full"
            onClick={() => {
              setSelectedCategory("all");
              setQuery("");
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
          {filtered.map((artwork, index) => {
            const imageRatio = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]"][index % 3];

            return (
              <article key={artwork.id} className="group mb-7 inline-block w-full break-inside-avoid">
                <Dialog>
                  <div className="relative overflow-hidden rounded-sm bg-[#e8e4da]">
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Voir le dessin ${artwork.title} en grand format`}
                        className="relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-4"
                      >
                        <div className={cn("relative w-full", imageRatio)}>
                          <MediaImage
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            className="object-cover transition duration-700 ease-out group-hover:scale-105"
                          />
                          <span className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-[#fffdf8] text-stone-950 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <ArrowUpRight className="size-4" />
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(artwork.id)}
                      aria-label={isFavorite(artwork.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                      aria-pressed={isFavorite(artwork.id)}
                      className={cn(
                        "absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-[#fffdf8]/95 text-stone-600 opacity-100 shadow-sm backdrop-blur-sm transition hover:scale-105 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700",
                        isFavorite(artwork.id) && "text-rose-600 opacity-100",
                      )}
                    >
                      <Heart className={cn("size-4", isFavorite(artwork.id) && "fill-current")} />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-3">
                    <span>
                      <span className="block font-serif text-xl font-medium text-stone-950 transition-colors group-hover:text-orange-800">
                        {artwork.title}
                      </span>
                      <span className="mt-1 block text-xs text-stone-500">
                        {artwork.category} <span className="px-1">·</span> {artwork.year}
                      </span>
                    </span>
                    <span className="pt-1 text-[10px] tracking-[0.14em] text-stone-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <DialogContent className="max-w-5xl border border-stone-200 bg-[#f7f4ec] p-5 sm:p-8">
                    <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
                        <MediaImage src={artwork.imageUrl} alt={artwork.title} className="object-cover" />
                      </div>

                      <div className="flex flex-col justify-center gap-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-800">
                            {artwork.category} · {artwork.year}
                          </p>
                          <DialogTitle className="mt-3 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
                            {artwork.title}
                          </DialogTitle>
                        </div>

                        <DialogDescription className="text-base leading-7 text-stone-600">
                          Un dessin original de l’atelier, imaginé et réalisé à la main. Cette œuvre peut inspirer une création personnalisée autour de votre propre histoire.
                        </DialogDescription>

                        <div className="flex flex-wrap gap-2">
                          {artwork.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-stone-300 px-3 py-1 text-xs text-stone-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Button asChild className="gap-2 rounded-full">
                            <Link href="/commande">
                              Commander dans cet univers <ArrowUpRight className="size-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => toggleFavorite(artwork.id)}
                          >
                            <Heart className={cn("mr-2 size-4", isFavorite(artwork.id) && "fill-rose-500 text-rose-500")} />
                            {isFavorite(artwork.id) ? "Retirer des favoris" : "Garder en favori"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
