import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/forms/custom-order-form";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { getPricingRules } from "@/services/order.service";

export const metadata: Metadata = {
  title: "Commande personnalisée",
  description: "Configurez votre dessin sur mesure : type, format, support, nombre de personnes et date souhaitée.",
};

export default async function CommandePage() {
  const pricingRules = await getPricingRules();

  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <SectionHeading
        eyebrow="Sur mesure"
        title="Configurez votre dessin personnalisé en quelques minutes."
        description="Choisissez le format, le support, ajoutez vos références et obtenez un prix instantané avant validation."
      />
      <CustomOrderForm pricingRules={pricingRules} />
    </Container>
  );
}

