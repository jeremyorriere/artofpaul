"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, signInSchema, signUpSchema, type SignInInput, type SignUpInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema) as Resolver<SignInInput>,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const result = await signIn("credentials", { ...values, redirect: false });
    setLoading(false);

    if (result?.error) {
      toast.error("Identifiants invalides. Utilisez client@artofpaul.fr / demo1234");
      return;
    }

    toast.success("Connexion réussie");
    router.push("/compte");
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Compte client ou administration.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="signin-email">Email</Label>
            <Input id="signin-email" type="email" {...form.register("email")} />
          </div>
          <div>
            <Label htmlFor="signin-password">Mot de passe</Label>
            <Input id="signin-password" type="password" {...form.register("password")} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema) as Resolver<SignUpInput>,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Impossible de créer le compte.");
      return;
    }

    toast.success("Compte créé. Vous pouvez vous connecter.");
    form.reset();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>Suivez vos commandes et téléchargez vos fichiers HD.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="signup-name">Nom complet</Label>
            <Input id="signup-name" {...form.register("name")} />
          </div>
          <div>
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" {...form.register("email")} />
          </div>
          <div>
            <Label htmlFor="signup-password">Mot de passe</Label>
            <Input id="signup-password" type="password" {...form.register("password")} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema) as Resolver<{ email: string }>,
  });

  const onSubmit = form.handleSubmit(() => {
    setSubmitted(true);
    toast.success("Si un compte existe, un email de réinitialisation sera envoyé.");
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>Prototype prêt pour connecter un service d’emailing.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="forgot-email">Email</Label>
            <Input id="forgot-email" type="email" {...form.register("email")} />
          </div>
          <Button type="submit" className="w-full">Envoyer un lien</Button>
          {submitted ? <p className="text-sm text-stone-500">Vérifiez votre boîte de réception.</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}

