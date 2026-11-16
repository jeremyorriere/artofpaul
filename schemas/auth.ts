import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Email invalide."),
  password: z.string().min(6, "Mot de passe trop court."),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.email("Email invalide."),
  password: z.string().min(6, "Mot de passe trop court."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Email invalide."),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

