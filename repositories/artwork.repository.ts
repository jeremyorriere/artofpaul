import { prisma, withPrismaFallback } from "@/lib/db";
import { artworks, categories } from "@/lib/demo-data";
import { slugify } from "@/lib/utils";
import type { ArtworkCard, CategoryOption } from "@/types/app";

type ArtworkRecord = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  category: { name: string };
};

type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
};

export class ArtworkRepository {
  async listArtworks(): Promise<ArtworkCard[]> {
    return withPrismaFallback(
      async () => {
        const records = (await prisma!.artwork.findMany({
          include: { category: true },
          orderBy: { createdAt: "desc" },
        })) as ArtworkRecord[];

        return records.map((record) => ({
          id: record.id,
          title: record.title,
          slug: record.slug,
          imageUrl: record.coverImage,
          category: record.category.name as ArtworkCard["category"],
          tags: record.tags,
          year: record.createdAt.getFullYear(),
          featured: record.featured,
        }));
      },
      () => artworks,
    );
  }

  async listCategories(): Promise<CategoryOption[]> {
    return withPrismaFallback(
      async () => {
        const records = (await prisma!.category.findMany({ orderBy: { name: "asc" } })) as CategoryRecord[];
        return records.map((record) => ({
          id: record.id,
          name: record.name,
          slug: record.slug,
        }));
      },
      () => categories,
    );
  }

  async createArtwork(data: {
    title: string;
    category: string;
    imageUrl: string;
    tags: string[];
  }): Promise<ArtworkCard> {
    return withPrismaFallback(
      async () => {
        let categoryRecord = await prisma!.category.findFirst({
          where: { name: data.category },
        });

        if (!categoryRecord) {
          categoryRecord = await prisma!.category.create({
            data: {
              name: data.category,
              slug: slugify(data.category),
            },
          });
        }

        const created = await prisma!.artwork.create({
          data: {
            title: data.title,
            slug: `${slugify(data.title)}-${Date.now()}`,
            coverImage: data.imageUrl,
            tags: data.tags,
            categoryId: categoryRecord.id,
            featured: false,
          },
          include: { category: true },
        });

        return {
          id: created.id,
          title: created.title,
          slug: created.slug,
          imageUrl: created.coverImage,
          category: created.category.name as ArtworkCard["category"],
          tags: created.tags,
          year: created.createdAt.getFullYear(),
          featured: created.featured,
        };
      },
      () => ({
        id: crypto.randomUUID(),
        title: data.title,
        slug: `${slugify(data.title)}-${Date.now()}`,
        imageUrl: data.imageUrl,
        category: data.category as ArtworkCard["category"],
        tags: data.tags,
        year: new Date().getFullYear(),
        featured: false,
      }),
    );
  }

  async updateArtwork(
    id: string,
    data: Partial<{
      title: string;
      category: string;
      imageUrl: string;
      tags: string[];
    }>,
  ): Promise<ArtworkCard> {
    return withPrismaFallback(
      async () => {
        let categoryId: string | undefined;

        if (data.category) {
          let categoryRecord = await prisma!.category.findFirst({
            where: { name: data.category },
          });

          if (!categoryRecord) {
            categoryRecord = await prisma!.category.create({
              data: {
                name: data.category,
                slug: slugify(data.category),
              },
            });
          }

          categoryId = categoryRecord.id;
        }

        const updated = await prisma!.artwork.update({
          where: { id },
          data: {
            title: data.title,
            slug: data.title ? `${slugify(data.title)}-${Date.now()}` : undefined,
            coverImage: data.imageUrl,
            tags: data.tags,
            categoryId,
          },
          include: { category: true },
        });

        return {
          id: updated.id,
          title: updated.title,
          slug: updated.slug,
          imageUrl: updated.coverImage,
          category: updated.category.name as ArtworkCard["category"],
          tags: updated.tags,
          year: updated.createdAt.getFullYear(),
          featured: updated.featured,
        };
      },
      async () => {
        const current = artworks.find((item) => item.id === id);
        return {
          id,
          title: data.title ?? current?.title ?? "Œuvre",
          slug: data.title ? `${slugify(data.title)}-${Date.now()}` : current?.slug ?? `oeuvre-${Date.now()}`,
          imageUrl: data.imageUrl ?? current?.imageUrl ?? "/artwork-1.svg",
          category: (data.category ?? current?.category ?? "Portrait") as ArtworkCard["category"],
          tags: data.tags ?? current?.tags ?? [],
          year: current?.year ?? new Date().getFullYear(),
          featured: current?.featured ?? false,
        };
      },
    );
  }

  async deleteArtwork(id: string): Promise<boolean> {
    return withPrismaFallback(
      async () => {
        const deleted = await prisma!.artwork.delete({
          where: { id },
        });
        return !!deleted;
      },
      () => true,
    );
  }
}
