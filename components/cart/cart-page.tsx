"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shippingFee, total } = useCart();

  if (items.length === 0) {
    return (
      <Card className="border-dashed border-stone-300 bg-white/90">
        <CardContent className="space-y-6 p-10 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-stone-100 text-stone-700">
            <ShoppingBag className="size-7" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-stone-950">Votre panier est vide.</p>
            <p className="text-sm leading-6 text-stone-500">Découvrez les œuvres disponibles ou créez une commande personnalisée.</p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/boutique">Voir la boutique</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/commande">Créer un brief</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden border-stone-200 bg-white/95 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-200/60">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-stone-950">{item.name}</p>
                <p className="text-sm text-stone-500">{item.category} • {item.support.replaceAll("_", " ")}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                  <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="size-4" />
                  </Button>
                  <span className="min-w-8 text-center text-sm font-medium text-stone-900">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="size-4" />
                  </Button>
                </div>

                <div className="w-24 text-right font-semibold text-stone-950">{formatPrice(item.price * item.quantity)}</div>

                <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50" onClick={() => removeItem(item.id)}>
                  <Trash2 className="size-4 text-rose-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-fit border-stone-200 bg-gradient-to-br from-white via-white to-stone-50 shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Récapitulatif</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">Votre commande</h2>
          </div>

          <div className="space-y-3 rounded-[28px] border border-stone-200 bg-white p-5 text-sm text-stone-600 shadow-sm">
            <div className="flex justify-between"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>Livraison</span><span>{shippingFee === 0 ? "Offerte" : formatPrice(shippingFee)}</span></div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-950"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>

          <div className="rounded-[28px] bg-stone-950 p-5 text-sm text-stone-200 shadow-lg shadow-stone-200/50">
            <p className="font-medium text-white">Paiement sécurisé</p>
            <p className="mt-2 leading-6 text-stone-300">Vous serez redirigé vers Stripe pour finaliser votre commande en toute sécurité.</p>
          </div>

          <Button asChild className="w-full gap-2 text-base shadow-xl shadow-amber-100" size="lg">
            <Link href="/paiement">
              Passer au paiement
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
