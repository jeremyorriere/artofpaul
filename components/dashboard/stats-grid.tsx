import { Card, CardContent } from "@/components/ui/card";
import type { DashboardMetric } from "@/types/app";

export function StatsGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="space-y-2 p-6">
            <p className="text-sm text-stone-500">{metric.label}</p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-3xl font-semibold text-stone-950">{metric.value}</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {metric.delta}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

