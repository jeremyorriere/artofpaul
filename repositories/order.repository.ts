import { prisma, withPrismaFallback } from "@/lib/db";
import { dashboardMetrics, dashboardSeries, orders } from "@/lib/demo-data";
import { calculateCustomOrderPrice } from "@/lib/price";
import { generateOrderNumber } from "@/lib/utils";
import type {
  CustomOrderPayload,
  DashboardMetric,
  DashboardSeriesPoint,
  OrderSummary,
  PricingRuleRecord,
} from "@/types/app";

const drawingTypeMap = {
  Portrait: "PORTRAIT",
  Animal: "ANIMAL",
  Paysage: "PAYSAGE",
  Manga: "MANGA",
  Autre: "AUTRE",
} as const;

type OrderItemRecord = {
  name: string;
  quantity: number;
  unitPrice: number | string;
};

type OrderRecord = {
  id: string;
  number: string;
  total: number | string;
  status: string;
  createdAt: Date;
  estimatedDelivery?: Date | null;
  items: OrderItemRecord[];
};

type ProductSalesRecord = {
  name: string;
  _sum: {
    quantity: number | null;
  };
};

export class OrderRepository {
  async listOrdersForUser(userEmail?: string): Promise<OrderSummary[]> {
    if (!userEmail) return orders;

    return withPrismaFallback(
      async () => {
        const records = (await prisma!.order.findMany({
          where: { customer: { email: userEmail } },
          include: { items: true },
          orderBy: { createdAt: "desc" },
        })) as OrderRecord[];

        return records.map((record) => ({
          id: record.id,
          number: record.number,
          total: Number(record.total),
          status: record.status as OrderSummary["status"],
          createdAt: record.createdAt.toISOString(),
          deliveryDate: record.estimatedDelivery?.toISOString(),
          items: record.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
          })),
        }));
      },
      () => orders,
    );
  }

  async createCustomOrder(payload: CustomOrderPayload, rule?: PricingRuleRecord) {
    const total = calculateCustomOrderPrice(payload, rule);

    return withPrismaFallback(
      async () => {
        const customer = await prisma!.user.findUnique({ where: { email: payload.email } });

        const order = await prisma!.order.create({
          data: {
            number: generateOrderNumber(),
            total,
            status: "PENDING",
            notes: payload.description,
            estimatedDelivery: payload.desiredDate ? new Date(payload.desiredDate) : null,
            customerId: customer?.id,
            items: {
              create: [
                {
                  name: `${payload.drawingType} sur ${payload.support}`,
                  quantity: 1,
                  unitPrice: total,
                },
              ],
            },
            customOrder: {
              create: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phone: payload.phone,
                drawingType: drawingTypeMap[payload.drawingType],
                format: payload.format,
                support: payload.support,
                peopleCount: payload.peopleCount,
                description: payload.description,
                referenceImages: payload.referenceImages,
                desiredDate: payload.desiredDate ? new Date(payload.desiredDate) : null,
                shippingAddress: payload.shippingAddress,
                totalPrice: total,
                status: "PENDING",
              },
            },
          },
        });

        return {
          id: order.id,
          number: order.number,
          total,
          status: order.status,
        };
      },
      () => ({
        id: crypto.randomUUID(),
        number: generateOrderNumber(),
        total,
        status: "PENDING",
      }),
    );
  }

  async getDashboardData(): Promise<{
    metrics: DashboardMetric[];
    series: DashboardSeriesPoint[];
    topProducts: Array<{ name: string; sales: number }>;
  }> {
    return withPrismaFallback(
      async () => {
        const [orderCount, productSales] = await Promise.all([
          prisma!.order.count(),
          prisma!.orderItem.groupBy({
            by: ["name"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
          }) as Promise<ProductSalesRecord[]>,
        ]);

        return {
          metrics: [
            {
              label: "Commandes",
              value: orderCount.toString(),
              delta: "Live",
            },
          ],
          series: dashboardSeries,
          topProducts: productSales.map((item) => ({ name: item.name, sales: item._sum.quantity ?? 0 })),
        };
      },
      () => ({
        metrics: dashboardMetrics,
        series: dashboardSeries,
        topProducts: [
          { name: "Portrait signature A4", sales: 18 },
          { name: "Toile collector", sales: 11 },
          { name: "Pack numérique HD", sales: 9 },
        ],
      }),
    );
  }
}

