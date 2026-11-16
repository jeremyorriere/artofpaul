import { NextResponse } from "next/server";
import { ProductRepository } from "@/repositories/product.repository";
import { handleApiError } from "@/lib/errors";

const productRepository = new ProductRepository();

export async function GET() {
  try {
    const products = await productRepository.listProducts();
    return NextResponse.json(products);
  } catch (error) {
    return handleApiError(error);
  }
}

