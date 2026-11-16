import { NextResponse } from "next/server";
import { handleApiError, AppError } from "@/lib/errors";
import { quoteCustomOrder } from "@/services/order.service";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      format?: "A5" | "A4" | "A3" | "CUSTOM";
      support?: "PAPIER_CLASSIQUE" | "PAPIER_PREMIUM" | "TOILE" | "POSTER" | "NUMERIQUE_HD";
      peopleCount?: number;
      desiredDate?: string;
    };

    if (!body.format || !body.support) {
      throw new AppError("Format et support requis.", 422, "VALIDATION_ERROR");
    }

    const total = await quoteCustomOrder({
      format: body.format,
      support: body.support,
      peopleCount: Math.max(1, Number(body.peopleCount ?? 1)),
      desiredDate: body.desiredDate,
    });

    return NextResponse.json({ total });
  } catch (error) {
    return handleApiError(error);
  }
}

