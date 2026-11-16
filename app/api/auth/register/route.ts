import { NextResponse } from "next/server";
import { handleApiError, AppError } from "@/lib/errors";
import { signUpSchema } from "@/schemas/auth";
import { UserRepository } from "@/repositories/user.repository";

const userRepository = new UserRepository();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("Données d'inscription invalides.", 422, "VALIDATION_ERROR");
    }

    const user = await userRepository.createUser(parsed.data);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      message: "Compte créé avec succès.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

