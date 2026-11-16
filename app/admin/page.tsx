import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { BarChart3, PackageSearch, Users2 } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { AdminConsole } from "@/components/dashboard/admin-console";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { orders } from "@/lib/demo-data";
import { getDashboardData } from "@/services/dashboard.service";
import { getGalleryData } from "@/services/gallery.service";

export const metadata: Metadata = {
  title: "Administration",
  description: "Dashboard admin : commandes, galerie, tarifs, utilisateurs et statistiques.",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const [dashboard, gallery] = await Promise.all([getDashboardData(), getGalleryData()]);

  return (
    <Container className="space-y-10 py-14 lg:py-20">
      <div className="flex flex-col gap-4 rounded-[36px] border border-stone-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Administration</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">Pilotage des ventes et de l’atelier</h1>
          <p className="mt-2 text-stone-600">
            {session?.user?.role === "ADMIN"
              ? `Connecté en tant que ${session.user.email}`
              : "Mode démonstration admin visible sans authentification complète."}
          </p>
        </div>
        <Badge variant="secondary">{session?.user?.role === "ADMIN" ? "Accès admin" : "Démo"}</Badge>
      </div>

      <StatsGrid metrics={dashboard.metrics} />

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><BarChart3 className="size-5" /> Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={dashboard.series} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><PackageSearch className="size-5" /> Top ventes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboard.topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-sm">
                <span className="font-medium text-stone-900">{product.name}</span>
                <span className="text-stone-500">{product.sales} ventes</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Users2 className="size-5" /> Console de gestion</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminConsole
            initialOrders={orders}
            initialPricing={dashboard.pricing}
            initialUsers={dashboard.users}
            initialGallery={gallery.artworks}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

