import { NextResponse } from "next/server";
import { AppError, handleApiError } from "@/lib/errors";
import { ArtworkRepository } from "@/repositories/artwork.repository";
import type { ArtworkCard } from "@/types/app";

const artworkRepository = new ArtworkRepository();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<ArtworkCard>;

    if (!body.title && !body.category && !body.imageUrl) {
      throw new AppError("Au moins un champ doit être modifié.", 422, "VALIDATION_ERROR");
    }

    const updated = await artworkRepository.updateArtwork(id, {
      title: body.title,
      category: body.category,
      imageUrl: body.imageUrl,
      tags: body.tags,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await artworkRepository.deleteArtwork(id);

    return NextResponse.json({ id, deleted: true, message: "Œuvre supprimée avec succès." }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

