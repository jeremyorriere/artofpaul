import { users } from "@/lib/demo-data";
import { OrderRepository } from "@/repositories/order.repository";
import { PricingRepository } from "@/repositories/pricing.repository";

const orderRepository = new OrderRepository();
const pricingRepository = new PricingRepository();

export async function getDashboardData() {
  const [dashboard, pricing] = await Promise.all([
    orderRepository.getDashboardData(),
    pricingRepository.listRules(),
  ]);

  return {
    ...dashboard,
    pricing,
    users,
  };
}

