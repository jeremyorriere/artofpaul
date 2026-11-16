import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Panier",
  description: "Consultez votre panier, ajustez les quantités et estimez les frais de livraison.",
};

export default function PanierPage() {
  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <SectionHeading
        eyebrow="Panier"
        title="Préparez votre commande avant le paiement sécurisé."
        description="Modifiez les quantités, supprimez des articles et vérifiez le total avec frais de livraison automatiques."
      />
      <CartPage />
    </Container>
  );
}

