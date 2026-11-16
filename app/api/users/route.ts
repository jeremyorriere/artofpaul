import { NextResponse } from "next/server";
import { users } from "@/lib/demo-data";
import { AppError, handleApiError } from "@/lib/errors";
import type { UserSummary } from "@/types/app";

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<UserSummary>;

    if (!body.name || !body.email) {
      throw new AppError("Les champs nom et email sont requis.", 422, "VALIDATION_ERROR");
    }

    const created: UserSummary = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      role: body.role === "ADMIN" ? "ADMIN" : "CUSTOMER",
    };

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

