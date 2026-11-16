import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { getGalleryData } from "@/services/gallery.service";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Explorez les réalisations récentes de l'atelier : portraits, animaux, paysages, manga et collections premium.",
};

export default async function GaleriePage() {
  const data = await getGalleryData();

  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <SectionHeading
        eyebrow="Galerie"
        title="Un portfolio immersif pour découvrir la qualité de l'atelier."
        description="Filtrez les œuvres par catégorie, ouvrez-les en grand format et enregistrez vos favoris pour votre future commande."
      />
      <GalleryGrid artworks={data.artworks} categories={data.categories} />
    </Container>
  );
}

