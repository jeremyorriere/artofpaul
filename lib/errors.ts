import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly code = "APP_ERROR",
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }

  console.error("Unhandled API error", error);

  return NextResponse.json(
    { error: "Une erreur inattendue est survenue.", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}

