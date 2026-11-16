"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, CreditCard, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

const paymentHighlights = [
  {
    title: "Paiement Stripe sécurisé",
    description: "Encaissement chiffré, tunnel fiable et conformité carte bancaire.",
    icon: ShieldCheck,
  },
  {
    title: "Confirmation immédiate",
    description: "Votre commande est confirmée dès validation du paiement.",
    icon: BadgeCheck,
  },
  {
    title: "Suivi centralisé",
    description: "Retrouvez l’historique et les prochaines étapes dans votre espace client.",
    icon: CreditCard,
  },
];

export function CheckoutPanel() {
  const router = useRouter();
  const { items, subtotal, shippingFee, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const isEmpty = items.length === 0;

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, subtotal, shippingFee, total }),
      });

      const data = (await response.json()) as { url?: string; orderNumber?: string };

      if (!response.ok) {
        toast.error("Impossible d'initialiser le paiement.");
        return;
      }

      clearCart();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      router.push(`/confirmation?order=${data.orderNumber ?? "DEMO"}`);
    } catch {
      toast.error("Une erreur est survenue pendant la préparation du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="relative overflow-hidden border-stone-200 bg-gradient-to-br from-white via-white to-stone-50">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-amber-100/70 via-transparent to-stone-100/80" />
        <CardHeader className="relative space-y-4 p-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-stone-600 shadow-sm">
            <LockKeyhole className="size-3.5" />
            Tunnel sécurisé
          </div>
          <CardTitle>Paiement sécurisé</CardTitle>
          <CardDescription>
            Une expérience de paiement sobre, rassurante et conçue pour finaliser votre commande sans friction.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-6 p-8 pt-0">
          <div className="grid gap-4">
            {paymentHighlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="flex items-start gap-4 rounded-[28px] border border-stone-200/80 bg-white/90 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-white shadow-lg shadow-stone-200/70">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-950">{highlight.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{highlight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-dashed border-stone-300 bg-stone-50/90 p-5 text-sm leading-6 text-stone-600">
            <div className="flex items-center gap-2 font-medium text-stone-900">
              <Sparkles className="size-4 text-amber-500" />
              Ce que vous obtenez
            </div>
            <ul className="mt-3 space-y-2">
              <li>• Paiement par carte bancaire via Stripe</li>
              <li>• Confirmation automatique après validation</li>
              <li>• Historique consultable dans l’espace client</li>
              <li>• Base prête pour emails transactionnels</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium text-stone-600">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">SSL / HTTPS</span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Stripe Checkout</span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Confirmation immédiate</span>
          </div>

          <Button
            size="lg"
            className="h-14 w-full gap-2 text-base shadow-xl shadow-amber-100"
            onClick={handleCheckout}
            disabled={loading || isEmpty}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Préparation du paiement...
              </>
            ) : (
              <>
                Payer maintenant
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs leading-5 text-stone-500">
            {isEmpty
              ? "Ajoutez une œuvre ou une création au panier pour continuer."
              : "Vous serez redirigé vers Stripe pour finaliser votre paiement en toute sécurité."}
          </p>
        </CardContent>
      </Card>

      <Card className="h-fit xl:sticky xl:top-28">
        <CardHeader className="space-y-3 p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Récapitulatif</CardTitle>
              <CardDescription>
                {items.length} article{items.length > 1 ? "s" : ""} sélectionné{items.length > 1 ? "s" : ""}
              </CardDescription>
            </div>
            <div className="rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white">{formatPrice(total)}</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-8 pt-0">
          <div className="space-y-3 rounded-[28px] bg-stone-50 p-5">
            {isEmpty ? (
              <p className="text-sm leading-6 text-stone-500">Votre panier est vide pour le moment.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
                  <div>
                    <p className="font-medium text-stone-900">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">Quantité · {item.quantity}</p>
                  </div>
                  <span className="whitespace-nowrap font-medium text-stone-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))
            )}
          </div>

          <div className="rounded-[28px] border border-stone-200 p-5 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex justify-between text-stone-600">
              <span>Livraison</span>
              <span>{shippingFee === 0 ? "Offerte" : formatPrice(shippingFee)}</span>
            </div>
            <div className="mt-4 border-t border-stone-200 pt-4">
              <div className="flex justify-between text-base font-semibold text-stone-950">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                Taxes et frais inclus selon la configuration actuelle de votre boutique.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-stone-950 px-5 py-4 text-sm text-stone-100 shadow-lg shadow-stone-300/30">
            <div className="flex items-center gap-2 font-medium text-white">
              <ShieldCheck className="size-4 text-amber-300" />
              Réassurance paiement
            </div>
            <p className="mt-2 leading-6 text-stone-300">
              Le paiement est traité sur l’infrastructure Stripe. Aucune donnée bancaire sensible n’est stockée dans l’interface du site.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

