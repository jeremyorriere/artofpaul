import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/forms/auth-forms";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte client pour commander, payer et suivre vos dessins personnalisés.",
};

export default function SignUpPage() {
  return (
    <Container className="grid gap-8 py-20 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Nouveau client</p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950">Créez votre espace personnel pour centraliser vos commandes.</h1>
        <p className="text-lg leading-8 text-stone-600">Historique, téléchargement HD, suivi d’avancement et future fidélisation réunis au même endroit.</p>
        <Link href="/sign-in" className="text-sm text-stone-600 underline underline-offset-4">Déjà inscrit ? Se connecter</Link>
      </div>
      <SignUpForm />
    </Container>
  );
}

