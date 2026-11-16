import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Download, Lock } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/layout/logout-button";
import { getOrdersForUser } from "@/services/order.service";
import { formatDate, formatPrice } from "@/lib/utils";
import { OrderTimeline } from "@/components/orders/order-timeline";

export const metadata: Metadata = {
  title: "Espace client",
  description: "Consultez l'historique, suivez vos commandes et téléchargez vos créations numériques.",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const orders = await getOrdersForUser(session?.user?.email ?? undefined);

  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <div className="flex flex-col gap-4 rounded-[36px] border border-stone-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Espace client</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">
            {session?.user?.name ? `Bonjour ${session.user.name}` : "Suivi des commandes"}
          </h1>
          <p className="mt-2 text-stone-600">
            {session?.user?.email ?? "Connectez-vous pour retrouver votre historique complet."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!session ? (
            <Button asChild><Link href="/sign-in">Se connecter</Link></Button>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>

      {!session ? (
        <Card>
          <CardContent className="flex items-center gap-4 p-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
              <Lock className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-stone-950">Mode démo actif</p>
              <p className="text-sm text-stone-600">Le tableau ci-dessous affiche des commandes exemples tant que vous n’êtes pas authentifié.</p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4">
                <span>{order.number}</span>
                <span className="text-base font-medium text-stone-500">{formatPrice(order.total)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-stone-900">Date</p>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="font-medium text-stone-900">Livraison estimée</p>
                  <p>{order.deliveryDate ? formatDate(order.deliveryDate) : "À définir"}</p>
                </div>
              </div>
              <OrderTimeline currentStatus={order.status} />
              <div className="space-y-2 rounded-[28px] bg-stone-50 p-5">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm text-stone-600">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full">
                <Download className="mr-2 size-4" /> Télécharger la version numérique
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

