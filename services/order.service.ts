import { calculateCustomOrderPrice } from "@/lib/price";
import { OrderRepository } from "@/repositories/order.repository";
import { PricingRepository } from "@/repositories/pricing.repository";
import type { CustomOrderPayload } from "@/types/app";

const orderRepository = new OrderRepository();
const pricingRepository = new PricingRepository();

export async function getPricingRules() {
  return pricingRepository.listRules();
}

export async function quoteCustomOrder(payload: Pick<CustomOrderPayload, "format" | "support" | "peopleCount" | "desiredDate">) {
  const rules = await pricingRepository.listRules();
  const rule = rules.find(
    (item) => item.format === payload.format && item.support === payload.support,
  );

  return calculateCustomOrderPrice(payload, rule);
}

export async function createCustomOrder(payload: CustomOrderPayload) {
  const rules = await pricingRepository.listRules();
  const rule = rules.find(
    (item) => item.format === payload.format && item.support === payload.support,
  );

  return orderRepository.createCustomOrder(payload, rule);
}

export async function getOrdersForUser(email?: string) {
  return orderRepository.listOrdersForUser(email);
}

