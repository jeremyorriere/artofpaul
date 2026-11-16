import { NextResponse } from "next/server";
import { handleApiError, AppError } from "@/lib/errors";
import { customOrderSchema } from "@/schemas/custom-order";
import { createCustomOrder } from "@/services/order.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = customOrderSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("Le formulaire contient des champs invalides.", 422, "VALIDATION_ERROR");
    }

    const order = await createCustomOrder(parsed.data);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

