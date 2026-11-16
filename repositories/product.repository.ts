import { prisma, withPrismaFallback } from "@/lib/db";
import { products } from "@/lib/demo-data";
import type { ProductCard } from "@/types/app";

type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number | string;
  support: string;
  active: boolean;
  category: { name: string };
};

export class ProductRepository {
  async listProducts(): Promise<ProductCard[]> {
    return withPrismaFallback(
      async () => {
        const records = (await prisma!.product.findMany({
          include: { category: true },
          orderBy: { createdAt: "desc" },
        })) as ProductRecord[];

        return records.map((record) => ({
          id: record.id,
          name: record.name,
          slug: record.slug,
          description: record.description,
          imageUrl: record.imageUrl,
          price: Number(record.price),
          category: record.category.name,
          support: record.support as ProductCard["support"],
          inStock: record.active,
        }));
      },
      () => products,
    );
  }
}

