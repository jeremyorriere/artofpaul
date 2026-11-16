"use client";

import { useEffect, useMemo, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, CalendarDays, Check, Clock3, FileImage, Loader2, Mail, Palette, Phone, ShieldCheck, Sparkles, User2 } from "lucide-react";
import { toast } from "sonner";
import { customOrderSchema, type CustomOrderInput } from "@/schemas/custom-order";
import { calculateCustomOrderPrice } from "@/lib/price";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import type { PricingRuleRecord } from "@/types/app";

interface CustomOrderFormProps {
  pricingRules: PricingRuleRecord[];
}

const drawingTypeOptions = [
  { label: "Portrait", value: "Portrait" },
  { label: "Animal", value: "Animal" },
  { label: "Paysage", value: "Paysage" },
  { label: "Manga", value: "Manga" },
  { label: "Autre", value: "Autre" },
];

const formatOptions = [
  { label: "A5", value: "A5" },
  { label: "A4", value: "A4" },
  { label: "A3", value: "A3" },
  { label: "Personnalisé", value: "CUSTOM" },
];

const supportOptions = [
  { label: "Papier classique", value: "PAPIER_CLASSIQUE" },
  { label: "Papier premium", value: "PAPIER_PREMIUM" },
  { label: "Toile", value: "TOILE" },
  { label: "Poster", value: "POSTER" },
  { label: "Version numérique HD", value: "NUMERIQUE_HD" },
];

const includedBenefits = [
  "Direction artistique personnalisée",
  "Étape de validation avant finalisation",
  "Fichier numérique HD offert pour les commandes premium",
  "Suivi de commande via l’espace client",
];

function FieldError({ message }: Readonly<{ message?: string }>) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-rose-600">{message}</p>;
}

export function CustomOrderForm({ pricingRules }: Readonly<CustomOrderFormProps>) {
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const form = useForm<CustomOrderInput>({
    resolver: zodResolver(customOrderSchema) as Resolver<CustomOrderInput>,
    defaultValues: {
      drawingType: "Portrait",
      format: "A4",
      support: "PAPIER_PREMIUM",
      peopleCount: 1,
      referenceImages: [],
    },
  });

  const watched = form.watch();
  const matchedRule = useMemo(
    () => pricingRules.find((rule) => rule.format === watched.format && rule.support === watched.support),
    [pricingRules, watched.format, watched.support],
  );
  const livePrice = calculateCustomOrderPrice(watched, matchedRule);
  const completedFields = useMemo(() => {
    const checklist = [
      watched.firstName?.trim(),
      watched.lastName?.trim(),
      watched.email?.trim(),
      watched.description?.trim(),
      watched.drawingType,
      watched.format,
      watched.support,
      watched.peopleCount ? String(watched.peopleCount) : "",
    ];

    return checklist.filter(Boolean).length;
  }, [
    watched.description,
    watched.drawingType,
    watched.email,
    watched.firstName,
    watched.format,
    watched.lastName,
    watched.peopleCount,
    watched.support,
  ]);
  const progress = Math.round((completedFields / 8) * 100);

  useEffect(() => {
    form.setValue("referenceImages", uploadedFiles);
  }, [form, uploadedFiles]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      const response = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Impossible d'enregistrer la demande.");
        return;
      }

      const data = (await response.json()) as { number: string };
      toast.success(`Commande ${data.number} enregistrée.`);
      form.reset();
      setUploadedFiles([]);
    } catch {
      toast.error("Une erreur est survenue pendant l'envoi de votre demande.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="overflow-hidden border-stone-200 bg-gradient-to-br from-white via-white to-stone-50">
        <CardHeader className="space-y-5 p-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-stone-600 shadow-sm">
            <Sparkles className="size-3.5 text-amber-500" /> Brief créatif premium
          </div>
          <CardTitle>Brief créatif</CardTitle>
          <CardDescription>
            Décrivez votre projet. Le prix se met à jour automatiquement selon le format, le support et le niveau d’urgence.
          </CardDescription>
          <div className="rounded-[28px] border border-stone-200 bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-stone-900">Progression du brief</p>
                <p className="mt-1 text-sm text-stone-500">{completedFields}/8 informations clés renseignées</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-stone-950">{progress}%</p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
              <div className="h-full rounded-full bg-stone-950 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-[32px] border border-stone-200 bg-white/90 p-6 shadow-sm">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-stone-950 text-white">
                  <User2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-950">1. Vos coordonnées</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">Nous utilisons ces informations pour échanger avec vous et confirmer les étapes du projet.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Ex. Marie" {...form.register("firstName")} />
                  <FieldError message={form.formState.errors.firstName?.message} />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Ex. Dupont" {...form.register("lastName")} />
                  <FieldError message={form.formState.errors.lastName?.message} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="vous@exemple.fr" {...form.register("email")} />
                  <FieldError message={form.formState.errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="06 00 00 00 00" {...form.register("phone")} />
                  <p className="mt-2 text-sm text-stone-500">Optionnel, utile pour les échanges rapides sur votre brief.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white/90 p-6 shadow-sm">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-stone-950 text-white">
                  <Palette className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-950">2. Direction artistique</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">Choisissez le type d’œuvre, le format et le support pour affiner l’estimation instantanée.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="drawingType">Type de dessin</Label>
                  <Select id="drawingType" {...form.register("drawingType")} options={drawingTypeOptions} />
                  <FieldError message={form.formState.errors.drawingType?.message} />
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select id="format" {...form.register("format")} options={formatOptions} />
                  <FieldError message={form.formState.errors.format?.message} />
                </div>
                <div>
                  <Label htmlFor="support">Support</Label>
                  <Select id="support" {...form.register("support")} options={supportOptions} />
                  <FieldError message={form.formState.errors.support?.message} />
                </div>
                <div>
                  <Label htmlFor="peopleCount">Nombre de personnes</Label>
                  <Input id="peopleCount" type="number" min={1} max={8} {...form.register("peopleCount", { valueAsNumber: true })} />
                  <p className="mt-2 text-sm text-stone-500">Le tarif s’ajuste automatiquement à partir de la 2e personne.</p>
                  <FieldError message={form.formState.errors.peopleCount?.message} />
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white/90 p-6 shadow-sm">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-stone-950 text-white">
                  <FileImage className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-950">3. Références et livraison</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">Décrivez l’ambiance, ajoutez vos références et précisez votre échéance souhaitée.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le sujet, l’émotion recherchée, les couleurs, le cadrage, le fond ou tout détail important."
                    {...form.register("description")}
                  />
                  <p className="mt-2 text-sm text-stone-500">Plus votre brief est précis, plus l’estimation et la direction artistique seront justes.</p>
                  <FieldError message={form.formState.errors.description?.message} />
                </div>
                <div>
                  <Label htmlFor="desiredDate">Date souhaitée</Label>
                  <Input id="desiredDate" type="date" {...form.register("desiredDate")} />
                </div>
                <div>
                  <Label htmlFor="shippingAddress">Adresse de livraison</Label>
                  <Input id="shippingAddress" placeholder="Adresse postale complète si nécessaire" {...form.register("shippingAddress")} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="referenceImages">Photos de référence</Label>
                  <div className="mt-2 rounded-[28px] border border-dashed border-stone-300 bg-stone-50/90 p-5">
                    <Input
                      id="referenceImages"
                      type="file"
                      multiple
                      accept="image/*"
                      className="border-0 bg-transparent px-0 py-0 shadow-none focus:ring-0"
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        const mockUrls = files.map((file) => `/uploads/${file.name}`);
                        setUploadedFiles(mockUrls);
                        toast.success(
                          files.length
                            ? `${files.length} image(s) sélectionnée(s). Branchez UploadThing via les variables d’environnement pour l’upload réel.`
                            : "Aucun fichier sélectionné.",
                        );
                      }}
                    />
                    <p className="mt-3 text-sm leading-6 text-stone-500">Ajoutez portraits, poses, ambiance, palette ou inspirations visuelles pour guider l’atelier.</p>
                    {uploadedFiles.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {uploadedFiles.map((file) => (
                          <span key={file} className="rounded-full bg-white px-3 py-2 text-xs font-medium text-stone-700 shadow-sm">
                            {file.split("/").pop()}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="h-14 w-full gap-2 text-base shadow-xl shadow-amber-100">
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer ma demande personnalisée"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6 xl:sticky xl:top-28 xl:self-start">
        <Card className="border-stone-200 bg-gradient-to-br from-white via-white to-stone-50">
          <CardHeader className="space-y-4 p-8">
            <CardTitle>Estimation instantanée</CardTitle>
            <CardDescription>Simulation dynamique basée sur vos options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-8 pt-0">
            <div className="rounded-[28px] bg-stone-950 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-300">Prix estimé</p>
              <p className="mt-2 text-4xl font-semibold">{formatPrice(livePrice)}</p>
              <p className="mt-3 text-sm leading-6 text-stone-300">Estimation fondée sur votre format, votre support et le nombre de personnes à illustrer.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-900">
                  <Palette className="size-4 text-amber-500" /> Support choisi
                </div>
                <p className="mt-2 text-sm text-stone-600">{supportOptions.find((option) => option.value === watched.support)?.label ?? "Papier premium"}</p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-900">
                  <User2 className="size-4 text-amber-500" /> Sujet
                </div>
                <p className="mt-2 text-sm text-stone-600">{watched.peopleCount || 1} personne(s) • {watched.drawingType}</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-dashed border-stone-300 bg-stone-50 p-5 text-sm leading-6 text-stone-600">
              <p className="font-medium text-stone-900">Base tarifaire actuelle</p>
              <p className="mt-2">
                {matchedRule
                  ? `Base ${formatPrice(matchedRule.basePrice)} • Supplément personne ${formatPrice(matchedRule.extraPersonPrice)} • Express ${formatPrice(matchedRule.rushFee)}`
                  : "Le prix est calculé à partir de la combinaison format/support la plus proche disponible."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-8">
            <CardTitle>Ce qui est inclus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-8 pt-0 text-sm leading-6 text-stone-600">
            {includedBenefits.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3">
                <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-3.5" />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-8">
            <CardTitle>Réassurance atelier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-8 pt-0 text-sm leading-6 text-stone-600">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-4 text-amber-500" />
              <p>Réponse et validation du brief directement par email après réception de votre demande.</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="mt-1 size-4 text-amber-500" />
              <p>Délais annoncés selon la charge atelier et les besoins express de votre projet.</p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 size-4 text-amber-500" />
              <p>Planification adaptée à vos échéances cadeaux, anniversaires ou événements spéciaux.</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 size-4 text-amber-500" />
              <p>Processus clair, validation intermédiaire et suivi sécurisé jusqu’à la livraison finale.</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-4 text-amber-500" />
              <p>Le téléphone reste facultatif, mais accélère les échanges lorsque le brief demande des précisions.</p>
            </div>
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 size-4 text-emerald-600" />
              <p>Chaque demande est relue avant chiffrage final pour garantir cohérence, faisabilité et qualité premium.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

