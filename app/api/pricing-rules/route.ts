import { NextResponse } from "next/server";
import { pricingRules } from "@/lib/demo-data";
import { AppError, handleApiError } from "@/lib/errors";
import type { PricingRuleRecord } from "@/types/app";

export async function GET() {
  try {
    return NextResponse.json(pricingRules);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PricingRuleRecord>;

    if (!body.name || !body.format || !body.support) {
      throw new AppError("Les champs nom, format et support sont requis.", 422, "VALIDATION_ERROR");
    }

    const created: PricingRuleRecord = {
      id: crypto.randomUUID(),
      name: body.name,
      format: body.format,
      support: body.support,
      basePrice: Number(body.basePrice ?? 0),
      extraPersonPrice: Number(body.extraPersonPrice ?? 0),
      rushFee: Number(body.rushFee ?? 0),
    };

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

