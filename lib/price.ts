import type { CustomOrderPayload, PricingRuleRecord } from "@/types/app";

const formatMultiplier: Record<CustomOrderPayload["format"], number> = {
  A5: 1,
  A4: 1.4,
  A3: 1.85,
  CUSTOM: 2.4,
};

const supportMultiplier: Record<CustomOrderPayload["support"], number> = {
  PAPIER_CLASSIQUE: 1,
  PAPIER_PREMIUM: 1.2,
  TOILE: 1.65,
  POSTER: 1.15,
  NUMERIQUE_HD: 0.85,
};

export function calculateCustomOrderPrice(
  payload: Pick<CustomOrderPayload, "format" | "support" | "peopleCount" | "desiredDate">,
  rule?: PricingRuleRecord,
) {
  const base = rule?.basePrice ?? 95;
  const extraPersonPrice = rule?.extraPersonPrice ?? 28;
  const rushFee = rule?.rushFee ?? 35;
  const extraPeople = Math.max(0, payload.peopleCount - 1);
  const desiredDate = payload.desiredDate ? new Date(payload.desiredDate) : undefined;
  const rushWindowInDays = desiredDate
    ? (desiredDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    : Number.POSITIVE_INFINITY;

  const subtotal =
    base * formatMultiplier[payload.format] * supportMultiplier[payload.support] +
    extraPeople * extraPersonPrice;

  return Math.round(subtotal + (rushWindowInDays <= 10 ? rushFee : 0));
}

