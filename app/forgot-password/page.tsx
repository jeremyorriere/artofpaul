import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/auth-forms";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: "Demandez une réinitialisation de mot de passe pour votre espace client.",
};

export default function ForgotPasswordPage() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl">
        <ForgotPasswordForm />
      </div>
    </Container>
  );
}

