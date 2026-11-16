"use client";

import Link from "next/link";
import { ArrowUpRight, BadgeCheck, PackageCheck, Search, ShoppingCart, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { MediaImage } from "@/components/common/media-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { ProductCard } from "@/types/app";

interface ShopGridProps {
  products: ProductCard[];
}

export function ShopGrid({ products }: Readonly<ShopGridProps>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { addItem } = useCart();

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const inStockCount = products.filter((product) => product.inStock).length;

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, products, query]);

  return (
    <div className="space-y-8">
      <div className="rounded-[36px] border border-stone-200 bg-gradient-to-br from-white via-white to-stone-50 p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-600">
              <Sparkles className="size-3.5 text-amber-500" /> Collection boutique
            </div>
            <div>
              <p className="text-sm text-stone-600">
                <span className="font-semibold text-stone-950">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""} visible{filtered.length > 1 ? "s" : ""}
                <span className="ml-3 text-stone-500">• {inStockCount} en stock</span>
              </p>
              <p className="mt-1 text-sm text-stone-500">Éditions prêtes à offrir, formats premium et sélection issue de l’univers de l’atelier.</p>
            </div>
          </div>

          <label className="flex h-12 items-center gap-3 rounded-full border border-stone-200 bg-white px-4 shadow-sm">
            <Search className="size-4 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Recherche d'un produit"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400 lg:w-72"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" variant={category === "all" ? "default" : "secondary"} onClick={() => setCategory("all")}>
            Tous les produits
          </Button>
          {categories.map((item) => (
            <Button key={item} size="sm" variant={category === item ? "default" : "secondary"} onClick={() => setCategory(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="rounded-[36px] border-dashed p-10 text-center">
          <div className="mx-auto max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Aucun produit trouvé</p>
            <h3 className="text-2xl font-semibold text-stone-950">Aucun article ne correspond à votre recherche.</h3>
            <p className="text-sm leading-6 text-stone-600">Réinitialisez les filtres pour retrouver toutes les éditions, œuvres et formats disponibles.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => { setCategory("all"); setQuery(""); }}>
                Réinitialiser les filtres
              </Button>
              <Button asChild>
                <Link href="/commande">Demander une création sur mesure</Link>
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-stone-200/80 bg-white/95 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-stone-950/35 to-transparent" />
              <MediaImage src={product.imageUrl} alt={product.name} className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                <Badge variant={product.inStock ? "success" : "secondary"}>{product.inStock ? "En stock" : "Rupture"}</Badge>
              </div>
              <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-stone-800 shadow-sm backdrop-blur">
                <PackageCheck className="size-3.5" /> Atelier & édition premium
              </div>
            </div>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">{product.support.replaceAll("_", " ")}</Badge>
                <div className="text-sm font-semibold text-stone-950">{formatPrice(product.price)}</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-950">{product.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{product.description}</p>
              </div>

              <div className="rounded-[24px] bg-stone-50 p-4 text-xs leading-5 text-stone-600">
                <div className="flex items-center gap-2 font-medium text-stone-900">
                  <BadgeCheck className="size-3.5 text-emerald-600" />
                  Sélection prête à offrir
                </div>
                <p className="mt-2">Production soignée, univers signature de l’atelier et ajout rapide au panier.</p>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Tarif</p>
                  <div className="mt-1 text-xl font-semibold text-stone-950">{formatPrice(product.price)}</div>
                </div>
                {product.inStock ? (
                  <Button onClick={() => addItem(product)} className="gap-2">
                    <ShoppingCart className="size-4" /> Ajouter
                  </Button>
                ) : (
                  <Button asChild variant="secondary" className="gap-2">
                    <Link href="/commande">
                      Sur mesure
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

