import { ArtworkRepository } from "@/repositories/artwork.repository";

const artworkRepository = new ArtworkRepository();

export async function getGalleryData() {
  const [artworks, categories] = await Promise.all([
    artworkRepository.listArtworks(),
    artworkRepository.listCategories(),
  ]);

  return {
    artworks,
    categories,
    featured: artworks.filter((item) => item.featured).slice(0, 3),
  };
}

