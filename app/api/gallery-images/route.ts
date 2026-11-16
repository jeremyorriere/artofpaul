import { NextResponse } from "next/server";
import { AppError, handleApiError } from "@/lib/errors";
import { ArtworkRepository } from "@/repositories/artwork.repository";
import type { ArtworkCard } from "@/types/app";

type GalleryImagePayload = {
  title?: string;
  category?: ArtworkCard["category"] | string;
  imageUrl?: string;
  tags?: string | string[];
};

const artworkRepository = new ArtworkRepository();

export async function GET() {
  try {
    const artworks = await artworkRepository.listArtworks();
    return NextResponse.json(artworks);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GalleryImagePayload;

    if (!body.title || !body.category || !body.imageUrl) {
      throw new AppError("Les champs titre, catégorie et image sont requis.", 422, "VALIDATION_ERROR");
    }

    let normalizedTags: string[] = [];
    if (Array.isArray(body.tags)) {
      normalizedTags = body.tags;
    } else if (typeof body.tags === "string") {
      normalizedTags = body.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    const created = await artworkRepository.createArtwork({
      title: body.title,
      category: body.category as string,
      imageUrl: body.imageUrl,
      tags: normalizedTags,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

