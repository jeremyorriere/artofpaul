import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrushCleaning,
  HeartHandshake,
  PackageCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { MediaImage } from "@/components/common/media-image";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reviews } from "@/lib/demo-data";
import { getGalleryData } from "@/services/gallery.service";

const heroStats = [
  ["250+", "commandes livrées"],
  ["4.9/5", "moyenne client"],
  ["10-21 j", "délais atelier"],
];

const atelierHighlights = [
  {
    icon: BrushCleaning,
    title: "Exécution fine",
    text: "Finitions précises, matières riches et rendu haut de gamme.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement",
    text: "Brief, validation intermédiaire et échanges fluides.",
  },
  {
    icon: PackageCheck,
    title: "Livraison soignée",
    text: "Emballage premium, version HD et suivi de commande.",
  },
];

const processSteps = [
  ["01", "Vous décrivez votre projet", "Formulaire détaillé avec format, support, date souhaitée et photos de référence."],
  ["02", "L'atelier prépare l'œuvre", "Validation du brief, estimation dynamique, création et mise à jour du statut."],
  ["03", "Vous recevez votre pièce", "Paiement en ligne, téléchargement HD ou expédition physique avec suivi."],
];

export default async function Home() {
  const { featured } = await getGalleryData();
  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paul Atelier",
    alternateName: "Art of Paul",
    jobTitle: "Artiste illustratrice",
    description:
      "Artiste spécialisée dans les dessins sur commande : portraits, animaux, paysages et illustrations manga premium.",
    url: "http://localhost:3000",
    image: "http://localhost:3000/og-cover.svg",
    sameAs: ["https://instagram.com"],
    knowsAbout: ["Portrait", "Illustration", "Art sur commande", "Dessin premium"],
  };

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.7),transparent)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }} />
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="animate-fade-up space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-sm text-stone-700 shadow-sm shadow-amber-100/70 backdrop-blur">
              <Sparkles className="size-4 text-amber-500" />
              Atelier artistique premium & commandes sur mesure
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-stone-600 shadow-sm backdrop-blur">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`hero-star-${index + 1}`} className="size-3.5 fill-current" />
                ))}
              </div>
              Expérience atelier très appréciée
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              Des dessins émotionnels créés sur commande pour raconter votre histoire.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Portraits, animaux, paysages, univers manga et éditions premium : chaque œuvre est pensée avec exigence, sensibilité et finition haut de gamme.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-13 gap-2 shadow-xl shadow-amber-100/80">
              <Link href="/commande">
                Commander un dessin <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-13 bg-white/90 shadow-sm backdrop-blur">
              <Link href="/galerie">Voir la galerie</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
            <span>Portraits • Animaux • Paysages • Manga</span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-stone-300 sm:block" />
            <span>Expédition soignée & version HD</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map(([value, label], index) => (
              <Card key={label} className={`animate-fade-up-delay-${Math.min(index + 1, 2)} bg-white/75 backdrop-blur`}>
                <CardContent className="space-y-1 p-5">
                  <p className="text-2xl font-semibold text-stone-950">{value}</p>
                  <p className="text-sm text-stone-500">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-fade-up-delay-2 relative">
          <div className="absolute -left-6 top-10 hidden rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-stone-600 shadow-lg backdrop-blur md:block">
            Série premium 2026
          </div>
          <div className="animate-float-soft absolute -right-4 top-12 hidden rounded-[28px] border border-white/80 bg-white/85 p-4 shadow-xl shadow-stone-200/60 backdrop-blur lg:block">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Signature atelier</p>
            <p className="mt-2 text-sm font-medium text-stone-900">Composition sensible, texture fine et lumière maîtrisée.</p>
          </div>
          <div className="absolute -bottom-6 left-6 z-10 hidden rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-xl shadow-stone-200/60 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Projet sur mesure</p>
            <p className="mt-2 text-sm font-medium text-stone-900">Brief validé • suivi atelier • livraison premium</p>
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-[40px] border border-white/60 bg-white shadow-2xl shadow-amber-100/70 ring-1 ring-white/40">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950/20 via-transparent to-white/10" />
            <Image src="/hero-art.svg" alt="Illustration artistique hero" fill priority className="object-cover" />
          </div>
        </div>
      </Container>

      <Container className="space-y-20">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="L'artiste"
            title="Une signature sensible entre réalisme, lumière et narration visuelle."
            description="Paul transforme des photos, souvenirs et idées en œuvres dessinées sur mesure, avec une attention particulière portée à l'émotion, aux textures et à la composition."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {atelierHighlights.map((item) => (
              <Card key={item.title} className="transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70">
                <CardContent className="space-y-4 p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Dernières œuvres"
              title="Une galerie pensée comme un portfolio d'atelier contemporain."
              description="Sélection de pièces récentes mêlant commande privée, collection premium et créations d'inspiration."
            />
            <Button asChild variant="secondary" className="hidden sm:inline-flex">
              <Link href="/galerie">Explorer toute la galerie</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((artwork) => (
              <Card key={artwork.id} className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70">
                <div className="relative aspect-4/5 bg-stone-100">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-stone-950/35 to-transparent" />
                  <MediaImage src={artwork.imageUrl} alt={artwork.title} className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <CardContent className="space-y-3 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{artwork.category}</p>
                  <h3 className="text-xl font-semibold text-stone-950">{artwork.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-stone-600">{artwork.tags.join(" • ")}</p>
                  <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-sm text-stone-500">
                    <span>Voir la direction artistique</span>
                    <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-stone-950" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[40px] border border-stone-200 bg-white/90 p-6 shadow-sm shadow-stone-200/60 backdrop-blur lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <SectionHeading
            eyebrow="Le processus"
            title="Une commande simple, guidée et transparente."
            description="Chaque projet suit un flux pensé pour rassurer le client et valoriser le travail de l'atelier."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {processSteps.map(([step, title, text]) => (
              <div key={step} className="rounded-[32px] bg-stone-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-stone-200/60">
                <p className="text-sm font-semibold text-amber-700">{step}</p>
                <h3 className="mt-4 text-xl font-semibold text-stone-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Avis clients"
            title="Une expérience aussi soignée que l'œuvre finale."
            description="Les clients apprécient autant la qualité artistique que la fluidité de commande et le suivi."
            align="center"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id} className="transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70">
                <CardContent className="space-y-4 p-6">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={`${review.id}-${index + 1}`} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-stone-600">“{review.content}”</p>
                  <div>
                    <p className="font-semibold text-stone-950">{review.author}</p>
                    <p className="text-sm text-stone-500">{review.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
