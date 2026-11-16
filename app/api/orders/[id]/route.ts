import { NextResponse } from "next/server";
import { AppError, handleApiError } from "@/lib/errors";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status) {
      throw new AppError("Le statut est requis.", 422, "VALIDATION_ERROR");
    }

    return NextResponse.json({ id, status: body.status, persisted: false });
  } catch (error) {
    return handleApiError(error);
  }
}

