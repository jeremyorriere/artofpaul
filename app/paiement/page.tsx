import type { Metadata } from "next";
import { CheckoutPanel } from "@/components/cart/checkout-panel";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Paiement",
  description: "Finalisez votre commande avec Stripe et recevez votre confirmation automatiquement.",
};

export default function PaiementPage() {
  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <SectionHeading
        eyebrow="Paiement"
        title="Finalisez votre commande en toute confiance."
        description="Le flux Stripe est prêt pour un paiement carte bancaire, avec confirmation et archivage côté espace client."
      />
      <CheckoutPanel />
    </Container>
  );
}

