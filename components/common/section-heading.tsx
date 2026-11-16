import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? <Badge className="w-fit" variant="secondary">{eyebrow}</Badge> : null}
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">{title}</h2>
        {description ? <p className="text-base leading-7 text-stone-600 sm:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}

