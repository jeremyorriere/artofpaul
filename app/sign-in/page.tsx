import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/forms/auth-forms";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous pour suivre vos commandes et accéder à l'administration.",
};

export default function SignInPage() {
  return (
    <Container className="grid gap-8 py-20 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Espace client</p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950">Suivez vos commandes, téléchargez vos fichiers et retrouvez votre historique.</h1>
        <p className="text-lg leading-8 text-stone-600">Compte démo : client@artofpaul.fr / demo1234 — Admin : admin@artofpaul.fr / demo1234</p>
        <div className="flex gap-4 text-sm text-stone-600">
          <Link href="/sign-up" className="underline underline-offset-4">Créer un compte</Link>
          <Link href="/forgot-password" className="underline underline-offset-4">Mot de passe oublié</Link>
        </div>
      </div>
      <SignInForm />
    </Container>
  );
}

