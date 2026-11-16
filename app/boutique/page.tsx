import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getShopData } from "@/services/shop.service";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Achetez des œuvres, tirages et formats numériques issus de l'univers de l'atelier.",
};

export default async function BoutiquePage() {
  const { products } = await getShopData();

  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <SectionHeading
        eyebrow="Boutique"
        title="Dessins disponibles, éditions prêtes à offrir et collections premium."
        description="Filtrez, recherchez et ajoutez au panier vos œuvres préférées en quelques clics."
      />
      <ShopGrid products={products} />
    </Container>
  );
}

