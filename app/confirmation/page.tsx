import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Confirmation de commande",
  description: "Merci pour votre commande. Retrouvez son suivi depuis votre espace client.",
};

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;

  return (
    <Container className="py-20">
      <Card className="mx-auto max-w-2xl">
        <CardContent className="space-y-6 p-10 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-stone-950">Commande confirmée</h1>
            <p className="text-stone-600">Votre référence est <strong>{params.order ?? "ART-DEMO"}</strong>. Un email de confirmation peut être branché sur le webhook Stripe.</p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/compte">Voir mon suivi</Link></Button>
            <Button asChild variant="secondary"><Link href="/boutique">Continuer mes achats</Link></Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

