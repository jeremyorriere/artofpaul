import { reviews } from "@/lib/demo-data";
import { ProductRepository } from "@/repositories/product.repository";

const productRepository = new ProductRepository();

export async function getShopData() {
  const products = await productRepository.listProducts();

  return {
    products,
    categories: Array.from(new Set(products.map((item) => item.category))),
    supports: Array.from(new Set(products.map((item) => item.support))),
    reviews,
  };
}

