import { NextResponse } from "next/server";
import { getOrdersForUser } from "@/services/order.service";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const orders = await getOrdersForUser();
    return NextResponse.json(orders);
  } catch (error) {
    return handleApiError(error);
  }
}

