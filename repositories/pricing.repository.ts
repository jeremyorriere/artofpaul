import { prisma, withPrismaFallback } from "@/lib/db";
import { pricingRules } from "@/lib/demo-data";
import type { PricingRuleRecord } from "@/types/app";

type PricingRuleDbRecord = {
  id: string;
  name: string;
  format: string;
  support: string;
  basePrice: number | string;
  extraPersonPrice: number | string;
  rushFee: number | string;
};

export class PricingRepository {
  async listRules(): Promise<PricingRuleRecord[]> {
    return withPrismaFallback(
      async () => {
        const records = (await prisma!.pricingRule.findMany({
          orderBy: { createdAt: "desc" },
        })) as PricingRuleDbRecord[];

        return records.map((record) => ({
          id: record.id,
          name: record.name,
          format: record.format as PricingRuleRecord["format"],
          support: record.support as PricingRuleRecord["support"],
          basePrice: Number(record.basePrice),
          extraPersonPrice: Number(record.extraPersonPrice),
          rushFee: Number(record.rushFee),
        }));
      },
      () => pricingRules,
    );
  }
}

