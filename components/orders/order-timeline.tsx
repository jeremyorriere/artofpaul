import type { OrderStatus } from "@/types/app";
import { cn } from "@/lib/utils";

const steps: Array<{ status: OrderStatus; label: string; description: string }> = [
  { status: "PENDING", label: "En attente", description: "Commande confirmée, brief en file d'analyse." },
  { status: "IN_PROGRESS", label: "En cours", description: "L'artiste travaille sur votre création." },
  { status: "CLIENT_REVIEW", label: "Validation client", description: "Prévisualisation envoyée pour validation." },
  { status: "SHIPPED", label: "Expédiée", description: "Œuvre expédiée ou fichier prêt au téléchargement." },
  { status: "COMPLETED", label: "Terminée", description: "Commande finalisée et archivée." },
];

export function OrderTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
  const activeIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const active = index <= activeIndex;
        return (
          <div key={step.status} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border text-sm font-semibold",
                  active ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-white text-stone-400",
                )}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 ? (
                <div className={cn("mt-2 h-10 w-px", active ? "bg-stone-950" : "bg-stone-200")} />
              ) : null}
            </div>
            <div className="pt-1">
              <p className={cn("font-medium", active ? "text-stone-950" : "text-stone-500")}>{step.label}</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

