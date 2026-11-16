import { z } from "zod";

export const customOrderSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.email("Email invalide."),
  phone: z.string().optional(),
  drawingType: z.enum(["Portrait", "Animal", "Paysage", "Manga", "Autre"]),
  format: z.enum(["A5", "A4", "A3", "CUSTOM"]),
  support: z.enum([
    "PAPIER_CLASSIQUE",
    "PAPIER_PREMIUM",
    "TOILE",
    "POSTER",
    "NUMERIQUE_HD",
  ]),
  peopleCount: z.coerce.number().int().min(1).max(8),
  description: z.string().min(20, "Ajoutez plus de détails sur votre projet."),
  referenceImages: z.array(z.string()).default([]),
  desiredDate: z.string().optional(),
  shippingAddress: z.string().optional(),
});

export type CustomOrderInput = z.infer<typeof customOrderSchema>;

